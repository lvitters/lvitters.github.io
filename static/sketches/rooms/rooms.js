(function () {
	// This map holds our running instances.
	const p5Instances = new Map();

	/**
	 * The main function to be called from a Svelte component.
	 * It handles the creation of a sketch and returns a cleanup function.
	 * @param {string} containerId The ID of the DOM element for the sketch.
	 * @returns {function} A function to be called to clean up the sketch instance.
	 */
	function mountRoomsSketch(containerId) {
		const container = document.getElementById(containerId);

		// Guard against missing container or re-initialization.
		if (!container) {
			console.warn(`p5.js container with ID "${containerId}" was not found in the DOM.`);
			return () => {}; // Return empty cleanup function
		}
		if (p5Instances.has(containerId)) {
			// Already initialized, return existing cleanup
			return () => {
				if (p5Instances.has(containerId)) {
					const instance = p5Instances.get(containerId);
					instance.remove();
					p5Instances.delete(containerId);
				}
			};
		}

		// The actual p5 sketch logic
			const sketch = function (p) {
				p.disableFriendlyErrors = true;

				// reference to the canvas element for styling
				let canvasElement;

				// detect if mobile - using consistent 768px breakpoint
				let isMobile = window.innerWidth < 768;

				// custom camera controls
				let camera = {
					// camera position and orientation - adjusted for mobile
					distance: isMobile ? 4000 : 2500,
					position: { x: 0, y: 0, z: isMobile ? 4000 : 2500 }, // start facing front

					// target point to orbit around
					target: { x: 0, y: 0, z: 0 },

					// up vector for camera orientation
					up: { x: 0, y: 1, z: 0 },

					// mouse interaction
					isDragging: false,
					lastMouseX: 0,
					lastMouseY: 0,
					hasBeenMoved: false, // track if user has moved camera

					// smooth movement
					velocity: { x: 0, y: 0, distance: 0 },
					damping: 0.85,
					sensitivity: 0.003,

					// zoom - adjusted for mobile, increased max zoom out
					minDistance: isMobile ? 1500 : 800,
					maxDistance: isMobile ? 6500 : 5500,

					// camera tour animation
					tour: {
						active: true,
						startTime: 0,
						duration: 4000, // much shorter duration
						phase: 0 // current phase of the tour
					}
				};

				// buttons (now drawn on canvas) - responsive sizes
				let leftButton = {
					x: 0,
					y: 0,
					width: isMobile ? 100 : 80,
					height: isMobile ? 60 : 50,
					visible: true,
					hovered: false,
					text: '<'
				};
				let rightButton = {
					x: 0,
					y: 0,
					width: isMobile ? 100 : 80,
					height: isMobile ? 60 : 50,
					visible: true,
					hovered: false,
					text: '>'
				};

				// array for shapes
				let shapes = [];

				// array for cities
				let cities = [
					'Berlin',
					'Hamburg',
					'Munchen',
					'Koln',
					'Frankfurt-am-Main',
					'Stuttgart',
					'Dusseldorf',
					'Dortmund',
					'Essen',
					'Leipzig',
					'Bremen'
				];
				let cityJSONs = [];
				let cityIndex = 0;

				// displayed info
				let cityName;
				let lastModified = '07.04.21';

				// text
				let font;

				// json data
				let rooms = {};
				let numberOfRooms;

				// grid
				let cellSize = 5;
				let rows;
				let sideLength;
				let scale = 10;

				p.preload = function () {
					// load JSONs
					for (let i = 0; i < 11; i++) {
						cityJSONs[i] = p.loadJSON('/sketches/rooms/assets/' + cities[i] + '.json');
					}

					// font
					font = p.loadFont('/sketches/rooms/assets/Inconsolata-Regular.ttf');
				};

				p.setup = function () {
					// general settings
					let cnv = p.createCanvas(container.offsetWidth, container.offsetHeight, p.WEBGL);
					cnv.parent(container);
					cnv.id('canvas');

					// get canvas element for direct styling
					canvasElement = document.getElementById('canvas');

					p.frameRate(30);
					p.colorMode(p.HSB, 360, 100, 100);

					setCity(0);

					// initialize camera tour and store initial camera state
					camera.tour.startTime = p.millis();
					camera.initialPosition = { ...camera.position };
					camera.initialUp = { ...camera.up };
					camera.initialDistance = camera.distance;
				};

				p.draw = function () {
					p.background(255);
					p.smooth(4);

					// update camera with smooth movement
					updateCamera();

					// apply camera transform
					applyCameraTransform();

					// recenter grid in canvas - slight offset to improve centering
					p.translate(
						(-sideLength / 2 + cellSize / 2) * scale,
						(-sideLength / 2 + cellSize / 2) * scale
					);

					drawShapes();
					drawName();

					// reset camera transform for UI elements
					p.camera();
					p.resetMatrix();

					// draw UI buttons on top
					drawButtons();
				};

				// calculate grid according to number of rooms in JSON
				function calcGrid() {
					// get number of rooms from number of json objects in file
					numberOfRooms = Object.keys(rooms).length;
					// get number of rows (same as columns because grid is square)
					rows = p.floor(p.sqrt(numberOfRooms));
					// calc length of entire grid's side for centering to sketch
					sideLength = rows * cellSize;
				}

				// for every object in rooms add a Shape to shapes according to grid
				function pushShapes() {
					shapes = [];
					for (let i = 0; i < rows; i++) {
						for (var j = 0; j < rows; j++) {
							let index = j * rows + i;
							if (rooms[index]) {
								// safety check
								let roomSize = rooms[index].size;
								let roomPrice = rooms[index].price;
								shapes.push(new Shape(roomSize, roomPrice, i * cellSize, j * cellSize));
							}
						}
					}
				}

				// set current city name and rooms array
				function setCity(i) {
					// set cityIndex
					if (cityIndex >= 0 && cities.length - 1 >= cityIndex) {
						cityIndex = cityIndex + i;
					}

					// keep between 0 and 10
					if (cityIndex <= 0) {
						cityIndex = 0;
					} else if (cityIndex >= cities.length - 1) {
						cityIndex = cities.length - 1;
					}

					cityName = cities[cityIndex];
					rooms = cityJSONs[cityIndex];

					calcGrid();
					pushShapes();
				}

				// display all shapes in shapes[]
				function drawShapes() {
					for (var i = 0; i < shapes.length; i++) {
						var shape = shapes[i];
						shape.display(i);
					}
				}

				// draw infos next to grid
				function drawName() {
					p.textFont(font);
					p.textStyle(p.BOLD);

					// city name
					p.textSize(sideLength * 0.7);
					p.textAlign(p.LEFT, p.BOTTOM);
					p.fill(0);
					p.text(cityName + '.rooms', 0, -sideLength * 0.25);

					// last modified
					p.rotateZ((3 / 2) * p.PI);
					p.textAlign(p.RIGHT);
					p.textSize(sideLength * 0.5);
					p.text(lastModified, 0, -sideLength * 0.25);

					// number of rooms
					p.rotateZ((1 / 2) * p.PI);
					p.textAlign(p.RIGHT);
					p.textSize(sideLength);
					p.text(rows * rows, sideLength * scale, sideLength * scale + sideLength);
				}

				// called when window is resized
				p.windowResized = function () {
					p.resizeCanvas(container.offsetWidth, container.offsetHeight);
					// update mobile detection on resize - using consistent 768px breakpoint  
					isMobile = window.innerWidth < 768;
					// adjust camera settings for new screen size
					camera.minDistance = isMobile ? 1500 : 800;
					camera.maxDistance = isMobile ? 6500 : 5500;
				};

				// debounce to prevent rapid button clicks
				let lastButtonClick = 0;
				const buttonDebounceTime = 200; // 200ms between clicks

				// helper functions because button callback's can't have parameters
				function goLeft() {
					let now = p.millis();
					if (now - lastButtonClick > buttonDebounceTime) {
						setCity(-1);
						lastButtonClick = now;
					}
				}
				function goRight() {
					let now = p.millis();
					if (now - lastButtonClick > buttonDebounceTime) {
						setCity(1);
						lastButtonClick = now;
					}
				}

				// switch cities with arrow keys
				p.keyPressed = function () {
					if (p.keyCode == p.RIGHT_ARROW) {
						goRight();
					} else if (p.keyCode == p.LEFT_ARROW) {
						goLeft();
					}
				};

				// helper function to check if point is inside button
				function isPointInButton(x, y, button) {
					return (
						x >= button.x &&
						x <= button.x + button.width &&
						y >= button.y &&
						y <= button.y + button.height
					);
				}

				// mouse interaction for camera control
				p.mousePressed = function () {
					// check button clicks first - use direct coordinate check for reliability
					if (leftButton.visible && isPointInButton(p.mouseX, p.mouseY, leftButton)) {
						goLeft();
						return;
					}
					if (rightButton.visible && isPointInButton(p.mouseX, p.mouseY, rightButton)) {
						goRight();
						return;
					}

					// camera controls
					if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
						camera.isDragging = true;
						camera.lastMouseX = p.mouseX;
						camera.lastMouseY = p.mouseY;
					}
				};

				p.mouseReleased = function () {
					camera.isDragging = false;
				};

				p.mouseMoved = function () {
					// update button hover states and cursor on mouse move
					updateButtonHoverStates();
				};

				p.mouseDragged = function () {
					if (camera.isDragging) {
						// mark that user has interacted with camera
						camera.hasBeenMoved = true;
						camera.tour.active = false; // stop tour immediately when user takes control

						let deltaX = (p.mouseX - camera.lastMouseX) * camera.sensitivity;
						let deltaY = (p.mouseY - camera.lastMouseY) * camera.sensitivity;

						// add to velocity for smooth trackball rotation
						camera.velocity.x -= deltaX; // horizontal rotation (inverted)
						camera.velocity.y += deltaY; // vertical rotation

						camera.lastMouseX = p.mouseX;
						camera.lastMouseY = p.mouseY;
					}
				};

				// mouse wheel for zooming
				p.mouseWheel = function (event) {
					// mark that user has interacted with camera
					camera.hasBeenMoved = true;
					camera.tour.active = false; // stop tour when user zooms

					// ultra-fine steps for barely noticeable zoom increments
					camera.velocity.distance += event.delta * 0.2;
					return false; // prevent page scrolling
				};

				// update button hover states and cursor (called frequently)
				function updateButtonHoverStates() {
					// check hover states
					leftButton.hovered =
						leftButton.visible &&
						p.mouseX >= leftButton.x &&
						p.mouseX <= leftButton.x + leftButton.width &&
						p.mouseY >= leftButton.y &&
						p.mouseY <= leftButton.y + leftButton.height;

					rightButton.hovered =
						rightButton.visible &&
						p.mouseX >= rightButton.x &&
						p.mouseX <= rightButton.x + rightButton.width &&
						p.mouseY >= rightButton.y &&
						p.mouseY <= rightButton.y + rightButton.height;

					// update cursor style based on hover
					if (canvasElement) {
						if (leftButton.hovered || rightButton.hovered) {
							canvasElement.style.cursor = 'pointer';
						} else {
							canvasElement.style.cursor = 'default';
						}
					}
				}

				// set up button positions and visibility
				function updateButtons() {
					// position buttons - responsive for mobile
					if (isMobile) {
						// mobile: position buttons closer to edges and lower
						leftButton.x = 20;
						leftButton.y = container.offsetHeight * 0.8 - leftButton.height / 2;

						rightButton.x = container.offsetWidth - rightButton.width - 20;
						rightButton.y = container.offsetHeight * 0.8 - rightButton.height / 2;
					} else {
						// desktop: original positioning
						leftButton.x = container.offsetWidth / 8 - leftButton.width;
						leftButton.y = container.offsetHeight / 2 - leftButton.height / 2;

						rightButton.x = (container.offsetWidth / 8) * 7 - rightButton.width;
						rightButton.y = container.offsetHeight / 2 - rightButton.height / 2;
					}

					// update visibility
					leftButton.visible = cityIndex > 0;
					rightButton.visible = cityIndex < cities.length - 1;

					// update hover states and cursor
					updateButtonHoverStates();
				}

				function drawButtons() {
					updateButtons();

					// switch to 2D mode for UI
					p.push();
					p.resetMatrix();
					p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, 0, 1000);

					// translate to screen coordinates
					p.translate(-p.width / 2, -p.height / 2);

					// set text properties - responsive text size
					p.textAlign(p.CENTER, p.CENTER);
					if (font) p.textFont(font);
					p.textSize(isMobile ? 40 : 32); // larger on mobile for better touch targets

					// draw left button
					if (leftButton.visible) {
						drawButton(leftButton);
					}

					// draw right button
					if (rightButton.visible) {
						drawButton(rightButton);
					}

					p.pop();
				}

				function drawButton(button) {
					// just draw the text symbol - no background or border
					if (button.hovered) {
						p.fill(240, 100, 100); // blue on hover
					} else {
						p.fill(0, 0, 0); // black normally
					}

					p.noStroke();
					p.text(button.text, button.x + button.width / 2, button.y + button.height / 2);
				}

				function updateCamera() {
					// handle initial camera tour animation
					if (camera.tour.active && !camera.hasBeenMoved) {
						let elapsed = p.millis() - camera.tour.startTime;

						if (elapsed < camera.tour.duration) {
							// progress (0 to 1)
							let progress = elapsed / camera.tour.duration;

							// create overlapping smooth movements that blend together
							// use different frequencies and phases to create complex but smooth motion

							// horizontal orbit - more subtle
							let rotationY = Math.sin(progress * p.PI * 2) * 0.35; // Reduced from 0.6 to 0.35

							// vertical movement - more gentle
							let rotationX = Math.cos((progress + 0.25) * p.PI * 1.5) * 0.25; // Reduced from 0.4 to 0.25

							// subtle, pleasant zoom effect - less intense
							let zoomCycle = Math.sin(progress * p.PI * 2.5); // Same cycles
							let zoomMultiplier = 1 + zoomCycle * 0.08; // Reduced from 0.15 to 0.08

							// add a subtle spiral effect - toned down
							let spiralProgress = progress * p.PI * 2;
							rotationY += Math.cos(spiralProgress * 0.8) * 0.05; // Reduced from 0.1 to 0.05
							rotationX += Math.sin(spiralProgress * 0.8) * 0.04; // Reduced from 0.08 to 0.04

							// smooth envelope that fades to zero at the end for seamless return
							let envelope = Math.sin(progress * p.PI);
							rotationX *= envelope;
							rotationY *= envelope;

							// apply envelope to zoom for smooth return to original distance
							let zoomWithEnvelope = zoomCycle * envelope;

							// reset to initial state each frame
							camera.position = { ...camera.initialPosition };
							camera.up = { ...camera.initialUp };

							// apply rotations if any
							if (Math.abs(rotationX) > 0.001 || Math.abs(rotationY) > 0.001) {
								rotateCamera(rotationY, rotationX);
							}

							// apply subtle zoom with smooth envelope
							camera.distance = camera.initialDistance * (1 + zoomWithEnvelope * 0.08);

							// update position based on current distance - this should show the zoom
							let dir = normalizeVector(subtractVectors(camera.position, camera.target));
							camera.position = addVectors(camera.target, scaleVector(dir, camera.distance));
						} else {
							// animation finished, smoothly at original position
							camera.tour.active = false;
							camera.position = { ...camera.initialPosition };
							camera.up = { ...camera.initialUp };
							camera.distance = camera.initialDistance;
						}
					}

					// apply damping to velocities for user mouse input (but not during tour)
					if (!camera.tour.active) {
						camera.velocity.x *= camera.damping;
						camera.velocity.y *= camera.damping;
						camera.velocity.distance *= 0.85;

						// apply rotation velocities using trackball rotation
						if (Math.abs(camera.velocity.x) > 0.001 || Math.abs(camera.velocity.y) > 0.001) {
							rotateCamera(camera.velocity.x, camera.velocity.y);
						}

						// update distance
						camera.distance += camera.velocity.distance;
						camera.distance = p.constrain(camera.distance, camera.minDistance, camera.maxDistance);
					}

					// update position based on distance (unless tour is happening)
					if (!camera.tour.active) {
						let dir = normalizeVector(subtractVectors(camera.position, camera.target));
						camera.position = addVectors(camera.target, scaleVector(dir, camera.distance));
					}
				}

				function applyCameraTransform() {
					p.camera(
						camera.position.x,
						camera.position.y,
						camera.position.z, // camera position
						camera.target.x,
						camera.target.y,
						camera.target.z, // look at target
						camera.up.x,
						camera.up.y,
						camera.up.z // up vector
					);
				}

				// camera rotation functions
				function rotateCamera(deltaX, deltaY) {
					// get camera direction and right vector
					let forward = normalizeVector(subtractVectors(camera.target, camera.position));
					let right = normalizeVector(crossProduct(forward, camera.up));
					let up = normalizeVector(crossProduct(right, forward));

					// create rotation around the right axis (vertical mouse movement)
					if (Math.abs(deltaY) > 0.001) {
						let angle = deltaY;
						camera.position = rotatePointAroundAxis(camera.position, camera.target, right, angle);
						camera.up = rotateVectorAroundAxis(camera.up, right, angle);
					}

					// create rotation around the up axis (horizontal mouse movement)
					if (Math.abs(deltaX) > 0.001) {
						let angle = deltaX;
						camera.position = rotatePointAroundAxis(camera.position, camera.target, up, angle);
					}

					// update distance
					camera.distance = distance3D(camera.position, camera.target);
				}

				// vector math helper functions
				function addVectors(a, b) {
					return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
				}

				function subtractVectors(a, b) {
					return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
				}

				function scaleVector(v, s) {
					return { x: v.x * s, y: v.y * s, z: v.z * s };
				}

				function normalizeVector(v) {
					let len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
					if (len === 0) return { x: 0, y: 1, z: 0 };
					return { x: v.x / len, y: v.y / len, z: v.z / len };
				}

				function crossProduct(a, b) {
					return {
						x: a.y * b.z - a.z * b.y,
						y: a.z * b.x - a.x * b.z,
						z: a.x * b.y - a.y * b.x
					};
				}

				function distance3D(a, b) {
					let dx = a.x - b.x;
					let dy = a.y - b.y;
					let dz = a.z - b.z;
					return Math.sqrt(dx * dx + dy * dy + dz * dz);
				}

				function rotatePointAroundAxis(point, center, axis, angle) {
					// translate point to origin
					let p = subtractVectors(point, center);

					// rodrigues' rotation formula
					let cosA = Math.cos(angle);
					let sinA = Math.sin(angle);
					let dotProduct = p.x * axis.x + p.y * axis.y + p.z * axis.z;

					let result = {
						x: p.x * cosA + (axis.y * p.z - axis.z * p.y) * sinA + axis.x * dotProduct * (1 - cosA),
						y: p.y * cosA + (axis.z * p.x - axis.x * p.z) * sinA + axis.y * dotProduct * (1 - cosA),
						z: p.z * cosA + (axis.x * p.y - axis.y * p.x) * sinA + axis.z * dotProduct * (1 - cosA)
					};

					// translate back
					return addVectors(result, center);
				}

				function rotateVectorAroundAxis(vector, axis, angle) {
					let cosA = Math.cos(angle);
					let sinA = Math.sin(angle);
					let dotProduct = vector.x * axis.x + vector.y * axis.y + vector.z * axis.z;

					return {
						x:
							vector.x * cosA +
							(axis.y * vector.z - axis.z * vector.y) * sinA +
							axis.x * dotProduct * (1 - cosA),
						y:
							vector.y * cosA +
							(axis.z * vector.x - axis.x * vector.z) * sinA +
							axis.y * dotProduct * (1 - cosA),
						z:
							vector.z * cosA +
							(axis.x * vector.y - axis.y * vector.x) * sinA +
							axis.z * dotProduct * (1 - cosA)
					};
				}

				// Shape class
				class Shape {
					constructor(size, price, xPos, yPos) {
						// get price per m²
						this.relativePrice = price / size;

						// calc dimensions from size and price (in m²)
						this.side = p.sqrt(size) * scale;
						this.height = (this.relativePrice * scale) / 5;

						// calc color
						this.colorMap = p.map(this.relativePrice, 0, 35, 0, 360);
						this.color = p.color(this.colorMap, 100, 100);

						// position
						this.xPos = xPos * scale;
						this.yPos = yPos * scale;
						this.zPos = this.height / 2;
					}

					// display a box for this room
					display() {
						p.strokeWeight(0);
						p.fill(this.color);
						p.push();
						p.translate(this.xPos, this.yPos, this.zPos);
						p.box(this.side, this.side, this.height);
						p.pop();
					}
				}
			};

			// Create the new p5 instance and store it.
			const p5Instance = new p5(sketch, container);
			p5Instances.set(containerId, p5Instance);

		// **Crucially, return the cleanup function.**
		return function cleanup() {
			if (p5Instances.has(containerId)) {
				const instance = p5Instances.get(containerId);
				instance.remove(); // p5.js's built-in cleanup
				p5Instances.delete(containerId);
			}
		};
	}

	// Expose the mount function to the global scope.
	window.mountRoomsSketch = mountRoomsSketch;
})();