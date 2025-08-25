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
				if (!isMobile) p.camera(0, 0, 1500, 0, 0, 0, 0, 1, 0);
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

				// only move camera if not interacting with buttons
				// if (checkIgnoreOrbit()) {
				// 	p.orbitControl();
				// }

				p.orbitControl();

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

			// set HTML buttons using Tailwind, responsive for desktop and mobile
			function setButtons() {
				// --- fixed button dimensions for stability ---
				const buttonWidth = 60; // fixed width
				const buttonHeight = 60; // fixed height

				// --- calculate padding dynamically ---
				const paddingX = !isMobile ? p.windowWidth / 5 : p.windowWidth * 0.2; // desktop: 1/5 from edges, mobile: 20% between buttons
				const paddingY = !isMobile ? 0 : p.windowHeight * 0.15; // vertical padding for mobile from bottom

				// left button
				if (left == null) {
					left = p.createButton('<');
					// tailwind classes for html buttons
					left.class(
						'p5-button font-consolas absolute z-50 flex rounded-md border hover:text-[rgb(0,0,255)] border-white/20 bg-white/20 hover:bg-black/20 px-2 pt-0.5 text-[40px] backdrop-blur-sm transition-colors duration-200 cursor-pointer'
					);
					left.mousePressed(goLeft);
					left.style('width', buttonWidth + 'px'); // fix width
					left.style('height', buttonHeight + 'px'); // fix height
					// prevent orbitControl
					addButtonEvents(left);
				}

				// right button
				if (right == null) {
					right = p.createButton('>');
					right.class(
						'p5-button font-consolas absolute z-50 flex rounded-md border hover:text-[rgb(0,0,255)] border-white/20 bg-white/20 hover:bg-black/20 px-2 pt-0.5 text-[40px] backdrop-blur-sm transition-colors duration-200 cursor-pointer'
					);
					right.mousePressed(goRight);
					right.style('width', buttonWidth + 'px'); // fix width
					right.style('height', buttonHeight + 'px'); // fix height
					// prevent orbitControl
					addButtonEvents(right);
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

			// prevent events to go "through" button to canvas
			function addButtonEvents(btn) {
				btn.elt.addEventListener('touchstart', (e) => e.stopPropagation()); // mobile
				btn.elt.addEventListener('touchmove', (e) => e.stopPropagation()); // mobile drag
				btn.elt.addEventListener('touchend', (e) => e.stopPropagation()); // mobile
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

				// TODO: figure out how to extract lastModified from JSON <- not that important since the JSONS
				// have to be updated manually with the crawler anyways
				// let currentFile = loadJSON('crawler/data/' + cityName + '.json');
				// lastModified = new Date(currentFile.lastModified);

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

			// helper functions because button callback's can't have parameters
			function goLeft() {
				setCity(-1);
			}
			function goRight() {
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
