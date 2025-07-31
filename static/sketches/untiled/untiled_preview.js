// untiled_preview.js - Revised for SvelteKit navigation support
(function () {
	// Store the p5 instance for cleanup
	let p5Instance = null;

	// Cleanup function
	function cleanupSketch() {
		if (p5Instance && p5Instance.remove) {
			p5Instance.remove();
			p5Instance = null;
		}

		// Also manually clean the container
		var container = document.getElementById('untiled_preview_container');
		if (container) {
			var canvas = container.querySelector('canvas');
			if (canvas) {
				canvas.remove();
			}
		}
	}

	// Register cleanup handlers
	function registerCleanup() {
		// Store cleanup function globally so SvelteKit can access it
		window.cleanupUntiledPreviewSketch = cleanupSketch;

		// Also handle browser navigation
		window.addEventListener('beforeunload', cleanupSketch);
		window.addEventListener('pagehide', cleanupSketch);
	}

	// prevent multiple sketches, but allow reinit if container is empty
	var container = document.getElementById('untiled_preview_container');
	if (
		typeof window.untiledPreviewSketchInitialized === 'undefined' ||
		(container && !container.querySelector('canvas'))
	) {
		window.untiledPreviewSketchInitialized = true;

		// use instance mode to prevent multiple instances of functions to be running
		var sketch = function (p) {
			p.disableFriendlyErrors = true; // disables FES for better performance

			//grid
			var tiles = [];
			var tileSize;
			var gap;
			var tilesPerRow = 14;

			//switch between modes / shapes
			var areOverlapping = true;
			var areMorphing = false;
			var morphCounter = 0;
			var morphTime = 180;
			var mode;
			var nextModeSwitch = 10; //init with 10 seconds
			var modeSwitchCounter = 0;
			var nextShapeSwitch = 10; //init with 10 seconds
			var shapeSwitchCounter = 0;
			const maxSwitchTime = 30; //in seconds

			//global stroke thickness
			var strokeW; //strokeWeight
			var strT = 0; //strokeWeight noise value

			//global rotation
			var globalRotation = 0;
			var rotationMode = 5;
			var areRotating = false;
			var areRotatingRandomDirections = false;

			//lerping
			var lerpCount;
			const lerpTime = 480; //in frames

			//background color lerping
			var bgColor = 360;
			var bgColorTarget;

			//fill color alpha lerping
			var fillAlpha = 0;
			var fillAlphaTarget;

			//fill color brightness lerping
			var fillBrightness = 0;
			var fillBrightnessTarget;

			//stroke color brightness lerping
			var strokeBrightness = 0;
			var strokeBrightnessTarget;

			//stroke color alpha lerping
			var strokeAlpha = 100;
			var strokeAlphaTarget;

			//debug
			var debug = false;

			p.setup = function () {
				//get width of parent for sizing the sketch
				var container = document.getElementById('untiled_preview_container');
				var parentWidth = container.clientWidth;
				var containerHeight = container.offsetHeight;

				var cnv = p.createCanvas(parentWidth, containerHeight); //limit for performance
				cnv.parent('untiled_preview_container'); //for positioning with css
				cnv.id('canvas');
				cnv.style('z-index', '-1');
				cnv.style('pointer-events', 'none');
				p.colorMode(p.HSB, 100, 100, 100, 100);
				p.rectMode(p.CENTER);
				p.frameRate(60);
				p.pixelDensity(); //use device pixel density for crisp rendering

				buildGrid();
				pushTiles();
				randomMode();
				applyRotationMode();
			};

			p.draw = function () {
				p.background(bgColor);

				timedEvents();

				incMorphCounter();

				//translate tiles to middle of their position in grid
				p.translate(tileSize / 2, tileSize / 2);

				computeLerping();

				drawTiles();

				if (debug) showDebug();
			};

			//push tiles to list
			function pushTiles() {
				tiles = [];
				for (var i = -1; i < p.width / tileSize + 1; i++) {
					for (var j = -1; j < p.height / tileSize + 1; j++) {
						tiles.push(new Tile(tileSize, i * tileSize, j * tileSize, tiles.length));
					}
				}
				//shuffle once at beginning in order to not get fish scale effect
				shuffleArrayRandomly(tiles);
			}

			//draw all tiles in list
			function drawTiles() {
				//reset bool
				areOverlapping = false;

				//change strokeWeight globally with noise
				strT += Math.random() * (0.005 - 0.0005) + 0.0005; //use JS native random function for performance
				strokeW = p.map(p.noise(strT), 0, 1, -10, tileSize * (2 / 3)); //map from -10 so that it will "stick" to 1 sometimes
				if (strokeW <= 2) strokeW = 2;

				//increment globalRotation
				globalRotation += 0.02;

				//display tiles and check for scale
				for (var i = 0; i < tiles.length; i++) {
					var b = tiles[i];
					b.draw();

					//are any tiles overlapping? (if the scale is over 1 and it is not only circles then they not overlapping); only set areOverlapping to true if it is false for performance
					if ((b.scale >= 1 || b.state == 1) && areOverlapping == false) areOverlapping = true;
				}
			}

			//determine grid
			function buildGrid() {
				//determine size of single element
				tileSize = p.width / tilesPerRow;

				//determine size of gap
				gap = -(tileSize / 5);
			}

			//switch the shapes in time interval
			function switchShapes() {
				areMorphing = true;
				if (tiles.length > 0 && tiles[0]) {
					// if (tiles[0].state == 1) console.log('circles');
					// else console.log('squares');
				}
				for (var i = 0; i < tiles.length; i++) {
					var b = tiles[i];
					b.state++;
					if (b.state > 1) {
						b.state = 0;
					}
				}
			}

			//increment counter to check if shapes are morphing or not (for rotationMode switching)
			function incMorphCounter() {
				//increment counter and reset after 3 seconds (180 frames)
				morphCounter++;
				if (morphCounter > morphTime) {
					morphCounter = 0;
					areMorphing = false;
				}
			}

			//change between modes and rotation modes after X seconds if some conditions are met
			function timedEvents() {
				modeSwitchCounter++;
				shapeSwitchCounter++;

				//modes
				if (modeSwitchCounter % (nextModeSwitch * 60) == 0) {
					randomMode();
					nextModeSwitch = p.floor(p.random(10, maxSwitchTime));
					modeSwitchCounter = 0;

					//console.log("next mode switch: + nextModeSwitch")
				}

				//shapes
				if (shapeSwitchCounter % (nextShapeSwitch * 60) == 0) {
					// Safety check: make sure tiles array exists and has elements
					if (tiles.length > 0 && tiles[0]) {
						switchShapes();
						if (tiles[0].state == 1) nextShapeSwitch = p.floor(p.random(10, maxSwitchTime));
						else nextShapeSwitch = p.floor(p.random(10, maxSwitchTime / 2)); //circles should be there for less time than squares
						shapeSwitchCounter = 0;
					}

					//console.log("next shape switch: " + nextShapeSwitch);
				}

				//rotation modes
				//if only circles are there, every x seconds, if the shapes aren't currently morphing, switch between rotation modes
				//(to hide the transition between rotation and no rotation)
				if (
					tiles.length > 0 &&
					tiles[0] &&
					tiles[0].state == 0 &&
					p.frameCount % 300 == 0 &&
					areMorphing == false
				) {
					randomRotationMode();
				}

				//once every second, if no tiles are overlapping, shuffle the tiles so they will overlap differently
				//(because they are drawn on top of each other in the order of the array index)
				if (p.frameCount % 60 == 0 && !areOverlapping) {
					shuffleArrayRandomly(tiles);
				}

				//reset noise values for all tiles, only when there is no color (to mask the change), try this every 30 seconds
				if (
					strokeBrightnessTarget == 0 &&
					fillBrightnessTarget == 0 &&
					p.frameCount % (60 * 30) == 0
				)
					resetNoise();
			}

			//lerp value to target over time
			function lerpOverTime(value, target) {
				//console.log(lerpCount);
				if (value != target && lerpCount < lerpTime) {
					lerpCount++;
					var amt = lerpCount / lerpTime;
					var lerped = p.lerp(value, target, amt);
					value = p.floor(lerped);

					//keep lerp from "hanging" at the last digits
					if (target > value) value += 1;
					else if (target < value) value -= 1;
				} else {
					lerpCount = 0;
					value = target;
				}
				return value;
			}

			//lerp color values to their targets
			function computeLerping() {
				//console.log("bgColorTarget: " + bgColorTarget + "\n" + "fillAlphaTarget: " + fillAlphaTarget + "\n" +  "fillBrightnessTarget: " + fillBrightnessTarget + "\n" +  "strokeAlphaTarget: " + strokeAlphaTarget + "\n" +  "strokeBrightnessTarget: " + strokeBrightnessTarget);

				bgColor = lerpOverTime(bgColor, bgColorTarget);
				fillAlpha = lerpOverTime(fillAlpha, fillAlphaTarget);
				fillBrightness = lerpOverTime(fillBrightness, fillBrightnessTarget);
				strokeAlpha = lerpOverTime(strokeAlpha, strokeAlphaTarget);
				strokeBrightness = lerpOverTime(strokeBrightness, strokeBrightnessTarget);
			}

			//assign values depending on mode
			function applyMode() {
				switch (mode) {
					case 1:
						bgColorTarget = 360;
						fillAlphaTarget = 0;
						fillBrightnessTarget = 0;
						strokeAlphaTarget = 100;
						strokeBrightnessTarget = 0;
						break;
					case 2:
						bgColorTarget = 360;
						fillAlphaTarget = 0;
						fillBrightnessTarget = 0;
						strokeAlphaTarget = 50;
						strokeBrightnessTarget = 0;
						break;
					case 3:
						bgColorTarget = 360;
						fillAlphaTarget = 50;
						fillBrightnessTarget = 0;
						strokeAlphaTarget = 0;
						strokeBrightnessTarget = 0;
						break;
					case 4:
						bgColorTarget = 360;
						fillAlphaTarget = 50;
						fillBrightnessTarget = 100;
						strokeAlphaTarget = 0;
						strokeBrightnessTarget = 0;
						break;
					case 5:
						bgColorTarget = 0;
						fillAlphaTarget = 0;
						fillBrightnessTarget = 0;
						strokeAlphaTarget = 100;
						strokeBrightnessTarget = 100;
						break;
					case 6:
						bgColorTarget = 0;
						fillAlphaTarget = 100;
						fillBrightnessTarget = 100;
						strokeAlphaTarget = 100;
						strokeBrightnessTarget = 0;
						break;
					case 7:
						bgColorTarget = 0;
						fillAlphaTarget = 100;
						fillBrightnessTarget = 100;
						strokeAlphaTarget = 0;
						strokeBrightnessTarget = 100;
						break;
					case 8:
						bgColorTarget = 0;
						fillAlphaTarget = 50;
						fillBrightnessTarget = 100;
						strokeAlphaTarget = 0;
						strokeBrightnessTarget = 100;
						break;
					case 9:
						bgColorTarget = 0;
						fillAlphaTarget = 0;
						fillBrightnessTarget = 100;
						strokeAlphaTarget = 50;
						strokeBrightnessTarget = 100;
						break;
					case 10:
						bgColorTarget = 0;
						fillAlphaTarget = 50;
						fillBrightnessTarget = 100;
						strokeAlphaTarget = 100;
						strokeBrightnessTarget = 0;
						break;
				}
			}

			//go to next mode
			function nextMode() {
				if (mode < 10) mode += 1;
				else mode = 1;
				// console.log('mode: ' + mode);

				applyMode();
			}

			//go to random mode
			function randomMode() {
				mode = p.floor(p.random(1, 11));
				// console.log('mode: ' + mode);

				applyMode();
			}

			//switch between no rotation, global rotation and individual rotation
			function applyRotationMode() {
				switch (rotationMode) {
					case 1:
						areRotating = false;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isRotating = false;
						}
						break;
					case 2:
						areRotating = false;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isRotating = true;
						}
						break;
					case 3:
						areRotating = true;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isRotating = false;
							b.rotatingRight = true;
						}
						break;
					case 4:
						areRotating = true;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isRotating = false;
							b.rotatingRight = false;
						}
						break;
					case 5:
						areRotating = true;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isRotating = false;
							if (p.random(2) < 1) b.rotatingRight = false;
							else b.rotatingRight = true;
						}
						break;
				}
			}

			//go to next rotation mode and apply
			function nextRotationMode() {
				if (rotationMode < 5) rotationMode += 1;
				else rotationMode = 1;
				// console.log('rotationMode: ' + rotationMode);
				applyRotationMode();
			}

			//go to random rotation mode and apply
			function randomRotationMode() {
				rotationMode = p.floor(p.random(1, 6));
				// console.log('rotationMode: ' + rotationMode);
				applyRotationMode();
			}

			//check key presses
			p.keyPressed = function () {
				//circles
				if (p.key == '1') {
					for (var i = 0; i < tiles.length; i++) {
						var b = tiles[i];
						b.state = 0;
					}
				}

				//squares
				if (p.key == '2') {
					for (var i = 0; i < tiles.length; i++) {
						var b = tiles[i];
						b.state = 1;
					}
				}

				//cycle through modes (q key)
				if (p.keyCode == 81) {
					nextMode();
				}

				//random mode (w key)
				if (p.keyCode == 87) {
					randomMode();
				}

				//cycle through rotation modes (e key)
				if (p.keyCode == 69) {
					nextRotationMode();
				}

				//random rotation mode (r key)
				if (p.keyCode == 82) {
					randomRotationMode();
				}

				//reset noise (n key)
				if (p.keyCode == 78) {
					resetNoise();
				}

				//order array by ascending index (a key)
				if (p.keyCode == 65) {
					orderArrayByAscendingIndex(tiles);
				}

				//shuffle array randomly (s key)
				if (p.keyCode == 83) {
					shuffleArrayRandomly(tiles);
				}

				//draw FPS (f key)
				if (p.keyCode == 70) {
					debug = !debug;
				}
			};

			//render how many FPS the sketch is running at
			function showDebug() {
				p.fill(255);
				p.noStroke();
				p.rect(30, 5, 60, 30);

				p.fill(0, 100, 100);
				p.textSize(20);
				p.text('fps: ' + p.floor(p.frameRate()), 0, 10);
			}

			//reset noise time value for all tiles
			function resetNoise() {
				// console.log('noise reset');

				for (var i = 0; i < tiles.length; i++) {
					var b = tiles[i];
					b.hT = 0;
					b.sT = 0;
				}
			}

			//randomize array in-place using Durstenfeld shuffle algorithm
			function shuffleArrayRandomly(array) {
				// console.log('array shuffled');

				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}

			//order array by index in ascending order (unused)
			function orderArrayByAscendingIndex(array) {
				// console.log('array ordered by ascending index');

				var temp = [];

				for (var i = 0; i < array.length; i++) {
					var b = array[i];
					temp[b.index] = b;
				}

				for (var i = 0; i < temp.length; i++) {
					array[i] = temp[i];
				}
			}

			//resize canvas on window resize
			p.windowResized = function () {
				p.setup();
			};

			//individual tile
			function Tile(size, xPos, yPos, index) {
				//position
				this.index = index;
				this.pos = p.createVector(xPos, yPos);

				//size & scale
				this.size = size;
				this.scale = 1;
				this.scaleT = 0;

				//rotation
				this.rotation = 0;
				this.roT = 0;
				this.isRotating = false;

				//color
				this.fillCol;
				this.strokeCol;
				this.hue;
				this.sat;
				this.bri;
				this.hT = 0;
				this.sT = 0;

				//shape morphing
				this.circle = [];
				this.square = [];
				this.morph = [];
				this.state = 1;

				//initialize the (two) possible shapes with vertices
				this.initShapes = function () {
					//create a circle using vectors pointing from center
					for (var angle = 0; angle < 360; angle += 9) {
						//note we are not starting from 0 in order to match the
						//path of a circle.
						var v = p5.Vector.fromAngle(p.radians(angle - 135));
						v.mult(this.size / 2);
						this.circle.push(v);
						//let's fill out morph ArrayList with blank PVectors while we are at it
						this.morph.push(p.createVector());
					}

					//a square is a bunch of vertices along straight lines
					//top of square
					for (var x = -this.size / 2; x < this.size / 2; x += this.size / 2 / 5) {
						this.square.push(p.createVector(x, -this.size / 2));
					}
					//right side
					for (var y = -this.size / 2; y < this.size / 2; y += this.size / 2 / 5) {
						this.square.push(p.createVector(this.size / 2, y));
					}
					//bottom
					for (var x = this.size / 2; x > -this.size / 2; x -= this.size / 2 / 5) {
						this.square.push(p.createVector(x, this.size / 2));
					}
					//left side
					for (var y = this.size / 2; y > -this.size / 2; y -= this.size / 2 / 5) {
						this.square.push(p.createVector(-this.size / 2, y));
					}
				};

				//draw single element
				this.draw = function () {
					//do calculations
					this.compute();

					//set fill and stroke
					p.fill(this.fillCol);
					p.strokeWeight(strokeW);
					p.stroke(this.strokeCol);

					//draw shape
					p.push();
					p.translate(this.pos.x, this.pos.y);
					p.scale(this.scale);
					p.rotate(this.rotation);
					this.drawShape();
					p.pop();
				};

				this.compute = function () {
					//color
					this.hT += Math.random() * (0.005 - 0.0005) + 0.0005; //use JS native random function for performance
					this.sT += Math.random() * (0.005 - 0.0005) + 0.0005; //use JS native random function for performance
					this.hue = p.map(p.noise(this.hT), 0, 1, -60, 160);
					this.sat = p.map(p.noise(this.sT), 0, 1, 10, 100);

					//apply
					this.fillCol = p.color(this.hue, this.sat, fillBrightness, fillAlpha);
					this.strokeCol = p.color(this.hue, this.sat, strokeBrightness, strokeAlpha);

					//scale
					this.scaleT += Math.random() * 0.005; //use JS native random function for performance
					this.scale = p.map(p.noise(this.scaleT), 0, 1, 0.2, 2.5);

					//rotation
					this.roT += Math.random() * 0.008; //use JS native random function for performance
					if (this.isRotating) this.rotation = p.map(p.noise(this.roT), 0, 1, 0, 10);
					else if (areRotating && this.rotatingRight) this.rotation = globalRotation;
					else if (areRotating && !this.rotatingRight) this.rotation = -globalRotation;
					else this.rotation = 0;
				};

				this.drawShape = function () {
					//look at each vertex
					for (var i = 0; i < this.circle.length; i++) {
						var v1;
						//are we lerping to the circle or the square?
						if (this.state == 0) {
							v1 = this.circle[i];
						} else if (this.state == 1) {
							v1 = this.square[i];
						}
						//get the vertex we will draw
						var v2 = this.morph[i];
						//lerp to the target
						v2.lerp(v1, 0.05);
					}

					//draw a polygon that makes up all the vertices
					p.beginShape();
					this.morph.forEach(function (v) {
						p.vertex(v.x, v.y);
					});
					p.endShape(p.CLOSE);
				};

				// Call initShapes at the end of constructor
				this.initShapes();
			}
		};

		// wait for container to exist before initializing sketch
		function initSketch() {
			var container = document.getElementById('untiled_preview_container');
			if (container) {
				p5Instance = new p5(sketch, container);
				registerCleanup(); // Register cleanup after creating the instance
			} else {
				setTimeout(initSketch, 100);
			}
		}

		initSketch();
	} else {
		// reset flag if container doesn't exist (we navigated away and back)
		var container = document.getElementById('untiled_preview_container');
		if (!container) {
			window.untiledPreviewSketchInitialized = undefined;
			cleanupSketch(); // Clean up if container doesn't exist
		}
	}
})();
