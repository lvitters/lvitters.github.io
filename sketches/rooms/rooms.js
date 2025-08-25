(function () {
	// this map holds our running instances.
	const p5Instances = new Map();

	/**
	 * the main function to be called from a Svelte component.
	 * it handles the creation of a sketch and returns a cleanup function.
	 * @param {string} containerId the ID of the DOM element for the sketch.
	 * @returns {function} a function to be called to clean up the sketch instance.
	 */
	function mountRoomsSketch(containerId) {
		const container = document.getElementById(containerId);

		// guard against missing container or re-initialization.
		if (!container) {
			console.warn(`p5.js container with ID "${containerId}" was not found in the DOM.`);
			return () => {}; // return empty cleanup function
		}
		if (p5Instances.has(containerId)) {
			// already initialized, return existing cleanup
			return () => {
				if (p5Instances.has(containerId)) {
					const instance = p5Instances.get(containerId);
					instance.remove();
					p5Instances.delete(containerId);
				}
			};
		}

		// the actual p5 sketch logic
		const sketch = function (p) {
			p.disableFriendlyErrors = true;

			// reference to the canvas element for styling
			let canvasElement;

			// detect if mobile - using consistent 768px breakpoint
			let isMobile = window.innerWidth < 768;

			// camera state tracking
			let savedCameraPosition = { x: 0, y: 0, z: isMobile ? 3500 : 2000 };
			let savedCameraTarget = { x: 0, y: 0, z: 0 };
			let orbitControlEnabled = true;

			// array for shapes
			let shapes = [];

			// buttons
			let left;
			let right;

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

				// set initial camera position - more zoomed out depending on mobile or desktop
				if (!isMobile) p.camera(0, 0, 2000, 0, 0, 0, 0, 1, 0);
				else p.camera(0, 0, 3500, 0, 0, 0, 0, 1, 0);

				// get canvas element for direct styling
				canvasElement = document.getElementById('canvas');

				p.frameRate(30);
				p.colorMode(p.HSB, 360, 100, 100);

				setCity(0);

				setButtons();
			};

			p.draw = function () {
				p.background(255);
				p.smooth(4);

				// disable
				if (orbitControlEnabled) {
					p.orbitControl(1, 1, 0.5);
				}

				// recenter grid in canvas - slight offset to improve centering
				p.translate(
					(-sideLength / 2 + cellSize / 2) * scale,
					(-sideLength / 2 + cellSize / 2) * scale
				);

				drawShapes();
				drawName();
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
				setButtons();
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
				// update mobile detection on resize - using consistent 768px breakpoint
				isMobile = window.innerWidth < 768;
				p.resizeCanvas(container.offsetWidth, container.offsetHeight);
				setCity(0);
				setButtons();
			};

			// keyboard controls for testing
			p.keyPressed = function () {
				if (p.key === 'a' || p.key === 'A' || p.keyCode === p.LEFT_ARROW) {
					setCity(-1);
				} else if (p.key === 'd' || p.key === 'D' || p.keyCode === p.RIGHT_ARROW) {
					setCity(1);
				}
			};

			// custom touch handling to prevent orbit control on tap
			let touchStartPos = null;
			let isDragging = false;
			const DRAG_THRESHOLD = 10; // pixels before we consider it a drag

			// flag to track if we're in a button interaction
			let isButtonTouch = false;

			// after a touch has started
			p.touchStarted = function () {
				if (p.touches.length > 0) {
					const touch = p.touches[0];

					// check if touch is in button areas on mobile and allow button interaction
					if (isMobile) {
						const buttonWidth = 60;
						const buttonHeight = 60;
						const paddingX = p.windowWidth * 0.2;
						const paddingY = p.windowHeight * 0.1;
						const totalWidth = buttonWidth * 2 + paddingX;
						const xLeft = (p.windowWidth - totalWidth) / 2;
						const xRight = xLeft + buttonWidth + paddingX;
						const y = p.windowHeight - buttonHeight - paddingY;

						// if touch is in button area, don't intercept it
						if (touch.y > y && touch.y < y + buttonHeight) {
							if (
								(touch.x > xLeft && touch.x < xLeft + buttonWidth) ||
								(touch.x > xRight && touch.x < xRight + buttonWidth)
							) {
								// console.log('Touch in button area, allowing button interaction');
								isButtonTouch = true;
								return false; // prevent orbit control but don't set up drag tracking
							}
						}
					}

					isButtonTouch = false;
					touchStartPos = { x: touch.x, y: touch.y };
					isDragging = false;
					orbitControlEnabled = false; // disable orbit control on touch start
					// console.log('Touch started at:', touchStartPos.x, touchStartPos.y);
				}
				return false; // prevent default orbit control behavior
			};

			// after a touch has moved from the starting position
			p.touchMoved = function () {
				if (isButtonTouch) return; // ignore touch moves for button interactions

				if (p.touches.length > 0 && touchStartPos) {
					const currentPos = { x: p.touches[0].x, y: p.touches[0].y };
					const distance = Math.sqrt(
						Math.pow(currentPos.x - touchStartPos.x, 2) +
							Math.pow(currentPos.y - touchStartPos.y, 2)
					);

					if (distance > DRAG_THRESHOLD && !isDragging) {
						isDragging = true;
						orbitControlEnabled = true; // enable orbit control once dragging starts
						// console.log('Drag detected, enabling orbit controls');
					}
				}
			};

			// after the finger has been lifted
			p.touchEnded = function () {
				if (isButtonTouch) {
					// console.log('Button touch ended, ignoring');
					isButtonTouch = false;
					return;
				}

				// console.log('Touch ended, was dragging:', isDragging);
				touchStartPos = null;
				isDragging = false;
				orbitControlEnabled = true; // re-enable for next interaction
			};

			// set HTML buttons using Tailwind, responsive for desktop and mobile
			function setButtons() {
				// --- fixed button dimensions for stability ---
				const buttonWidth = 60; // fixed width
				const buttonHeight = 60; // fixed height

				// --- calculate padding dynamically ---
				const paddingX = !isMobile ? p.windowWidth / 5 : p.windowWidth * 0.2; // desktop: 1/5 from edges, mobile: 20% between buttons
				const paddingY = !isMobile ? 0 : p.windowHeight * 0.1; // vertical padding for mobile from bottom

				// left button
				if (left == null) {
					left = p.createButton('<');
					// tailwind classes for html buttons
					left.class(
						'p5-button font-consolas absolute z-50 flex rounded-md border hover:text-[rgb(0,0,255)] border-white/20 bg-white/20 hover:bg-black/20 px-2 pt-0.5 text-[40px] backdrop-blur-sm transition-colors duration-200 cursor-pointer'
					);
					left.elt.addEventListener('click', goLeft);
					left.elt.addEventListener('touchstart', (e) => {
						e.stopPropagation();
						// console.log('Left button touch start');
					});
					left.elt.addEventListener('touchend', (e) => {
						e.stopPropagation();
						goLeft();
						// console.log('Left button touch end');
					});
					left.style('width', buttonWidth + 'px'); // fix width
					left.style('height', buttonHeight + 'px'); // fix height
				}

				// right button
				if (right == null) {
					right = p.createButton('>');
					right.class(
						'p5-button font-consolas absolute z-50 flex rounded-md border hover:text-[rgb(0,0,255)] border-white/20 bg-white/20 hover:bg-black/20 px-2 pt-0.5 text-[40px] backdrop-blur-sm transition-colors duration-200 cursor-pointer'
					);
					right.elt.addEventListener('click', goRight);
					right.elt.addEventListener('touchstart', (e) => {
						e.stopPropagation();
						// console.log('Right button touch start');
					});
					right.elt.addEventListener('touchend', (e) => {
						e.stopPropagation();
						goRight();
						// console.log('Right button touch end');
					});
					right.style('width', buttonWidth + 'px'); // fix width
					right.style('height', buttonHeight + 'px'); // fix height
				}

				// --- position buttons ---
				if (!isMobile) {
					// desktop: vertically centered, left/right 1/5 from edges
					left.position(paddingX, p.windowHeight / 2 - buttonHeight / 2);
					right.position(
						p.windowWidth - buttonWidth - paddingX,
						p.windowHeight / 2 - buttonHeight / 2
					);
				} else {
					// mobile: bottom, horizontally centered
					const totalWidth = buttonWidth * 2 + paddingX; // total width with padding
					const xLeft = (p.windowWidth - totalWidth) / 2; // left button x
					const xRight = xLeft + buttonWidth + paddingX; // right button x
					const y = p.windowHeight - buttonHeight - paddingY; // y position for both

					left.position(xLeft, y);
					right.position(xRight, y);
				}

				// --- show/hide based on city index ---
				cityIndex <= 0 ? left.hide() : left.show();
				cityIndex >= cities.length - 1 ? right.hide() : right.show();
			}

			// helper functions because button callback's can't have parameters
			function goLeft() {
				// console.log('Left button clicked!');
				setCity(-1);
			}
			function goRight() {
				// console.log('Right button clicked!');
				setCity(1);
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

		// create the new p5 instance and store it.
		const p5Instance = new p5(sketch, container);
		p5Instances.set(containerId, p5Instance);

		// crucially, return the cleanup function
		return function cleanup() {
			if (p5Instances.has(containerId)) {
				const instance = p5Instances.get(containerId);
				instance.remove(); // p5.js's built-in cleanup
				p5Instances.delete(containerId);
			}
		};
	}

	// expose the mount function to the global scope.
	window.mountRoomsSketch = mountRoomsSketch;
})();
