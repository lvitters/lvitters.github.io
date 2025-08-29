(function () {
	// this map holds our running instances.
	const p5Instances = new Map();

	/**
	 * the main function to be called from a Svelte component.
	 * it handles the creation of a sketch and returns a cleanup function.
	 * @param {string} containerId the ID of the DOM element for the sketch.
	 * @returns {function} a function to be called to clean up the sketch instance.
	 */
	function mountUntiledFullSketch(containerId) {
		const container = document.getElementById(containerId);

		// guard against missing container or re-initialization.
		if (!container) {
			return () => {}; // Return empty cleanup function
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
			p.disableFriendlyErrors = true; // disables FES for better performance

			// grid
			var tiles = [];
			var tileSize;
			var gap;
			var tilesPerRow = 24; // full uses 20 tiles per row

			// switch between modes / shapes / blobs
			var areOverlapping = true;
			var areMorphing = false;
			var morphCounter = 0;
			var morphTime = 180;
			var mode = 1;
			const maxSwitchTime = 30; // in seconds
			var nextModeSwitch = 10; // init with 10 seconds
			var modeSwitchCounter = 0;
			var nextShapeSwitch = 10; // init with 10 seconds
			var shapeSwitchCounter = 0;
			var nextBlobSwitch = 10; // init with 10 seconds
			var blobSwitchCounter = 0;
			var nextRotationSwitch = 10; // init with 10 seconds
			var rotationSwitchCounter = 0;

			// global rotation
			var globalRotation = 0;
			var rotationMode = 1;
			var areRotating = false;
			var areRotatingRandomDirections = false;

			// blob mode
			var blobMode = 0;
			var areBlobbing;

			// global stroke thickness
			var strokeW; // strokeWeight
			var strT = 0; // strokeWeight noise value

			// lerping
			var lerpCount;
			const lerpTime = 480; // in frames

			// background color lerping
			var bgColor = 360;
			var bgColorTarget;

			// fill color alpha lerping
			var fillAlpha = 0;
			var fillAlphaTarget;

			// fill color brightness lerping
			var fillBrightness = 0;
			var fillBrightnessTarget;

			// stroke color brightness lerping
			var strokeBrightness = 0;
			var strokeBrightnessTarget;

			// stroke color alpha lerping
			var strokeAlpha = 100;
			var strokeAlphaTarget;

			// debug
			var debug = false;

			p.setup = function () {
				// get width of parent for sizing the sketch
				var containerWidth = container.clientWidth;
				var containerHeight = container.offsetHeight;

				var cnv = p.createCanvas(containerWidth, containerHeight);
				cnv.parent(container); //for positioning with css
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
				// rotationMode = 2;
				// applyRotationMode();							// set manual rotation mode
				randomRotationMode();
				// applyBlobMode(2); 							// for testing blobs
				randomBlobMode();
			};

			p.draw = function () {
				p.background(bgColor);

				timedEvents();

				incMorphCounter();

				// translate tiles to middle of their position in grid
				p.translate(tileSize / 2, tileSize / 2);

				computeLerping();

				drawTiles();

				if (debug) showDebug();
			};

			// push tiles to list
			function pushTiles() {
				tiles = [];
				
				// always determine columns by width (to fill width completely)
				var cols = Math.ceil(p.width / tileSize) + 2; // +2 for padding (-1 to +1)
				var rows = Math.ceil(p.height / tileSize) + 2; // +2 for padding (-1 to +1)
				
				for (var i = -1; i < cols - 1; i++) {
					for (var j = -1; j < rows - 1; j++) {
						tiles.push(new Tile(tileSize, i * tileSize, j * tileSize, tiles.length));
					}
				}
				// shuffle once at beginning in order to not get fish scale effect
				shuffleArrayRandomly(tiles);
			}

			// draw all tiles in list
			function drawTiles() {
				// reset bool
				areOverlapping = false;

				// change strokeWeight globally with noise
				strT += Math.random() * (0.005 - 0.0005) + 0.0005; //use JS native random function for performance
				strokeW = p.map(p.noise(strT), 0, 1, -10, tileSize * (2 / 3)); //map from -10 so that it will "stick" to 1 sometimes
				if (strokeW <= 2) strokeW = 2;

				// increment globalRotation
				globalRotation += 0.02;

				// display tiles and check for scale
				for (var i = 0; i < tiles.length; i++) {
					var b = tiles[i];
					b.draw();

					// are any tiles overlapping? (if the scale is over 1 and it is not only circles then they not overlapping); only set areOverlapping to true if it is false for performance
					if ((b.scale >= 1 || b.state == 1) && areOverlapping == false) areOverlapping = true;
				}
			}

			// determine grid
			function buildGrid() {
				// handle orientation-specific grid calculation
				if (p.width >= p.height) {
					// desktop/landscape: tilesPerRow determines horizontal tiles
					tileSize = p.width / tilesPerRow;
				} else {
					// mobile/portrait: calculate tile size to fill width while respecting vertical count
					var targetVerticalTiles = tilesPerRow;
					var approximateTileSize = p.height / targetVerticalTiles;
					
					// determine how many tiles would fit horizontally at this size
					var horizontalTiles = Math.floor(p.width / approximateTileSize);
					if (horizontalTiles < 1) horizontalTiles = 1; // ensure at least 1 tile
					
					// adjust tile size to perfectly fill width
					tileSize = p.width / horizontalTiles;
				}

				// determine size of gap
				gap = -(tileSize / 5);
			}

			// switch the shapes in time interval
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

			// increment counter to check if shapes are morphing or not (for rotationMode switching)
			function incMorphCounter() {
				// increment counter and reset after 3 seconds (180 frames)
				morphCounter++;
				if (morphCounter > morphTime) {
					morphCounter = 0;
					areMorphing = false;
				}
			}

			// change between modes and rotation modes after X seconds if some conditions are met
			function timedEvents() {
				modeSwitchCounter++;
				shapeSwitchCounter++;
				blobSwitchCounter++;
				rotationSwitchCounter++;

				// console.log(rotationSwitchCounter);

				// modes
				if (modeSwitchCounter > nextModeSwitch * 60) {
					randomMode();
					nextModeSwitch = p.floor(p.random(10, maxSwitchTime));
					modeSwitchCounter = 0;

					// console.log("next mode switch: + nextModeSwitch")
				}

				// shapes
				if (shapeSwitchCounter > nextShapeSwitch * 60) {
					// safety check: make sure tiles array exists and has elements
					if (tiles.length > 0 && tiles[0]) {
						switchShapes();
						if (tiles[0].state == 1) nextShapeSwitch = p.floor(p.random(10, maxSwitchTime));
						else nextShapeSwitch = p.floor(p.random(10, maxSwitchTime / 2)); // circles should be there for less time than squares
						shapeSwitchCounter = 0;
					}

					// console.log("next shape switch: " + nextShapeSwitch);
				}

				// blobs
				if (blobSwitchCounter > nextBlobSwitch * 60) {
					randomBlobMode();
					nextBlobSwitch = p.floor(p.random(10, maxSwitchTime));
					blobSwitchCounter = 0;

					// console.log("next blob switch: " + nextBlobSwitch);
				}

				// rotation modes
				// if only circles are there, and if the shapes aren't currently morphing or blobbing, switch between rotation modes
				// (to hide the transition between rotation and no rotation)
				if (rotationSwitchCounter > nextRotationSwitch * 60) {
					// console.log("waiting for conditions");
					if (
						tiles.length > 0 &&
						tiles[0] &&
						tiles[0].state == 0 &&
						areMorphing == false &&
						areBlobbing == false
					) {
						// console.log("conditions met");
						// try to set to rotationMode 1 (not rotating) half of the time because of the tiles in the mapping
						if (rotationMode != 1) {
							rotationMode = 1;
							applyRotationMode();
						} else {
							randomRotationMode();
						}
						nextRotationSwitch = p.floor(p.random(10, maxSwitchTime));
						rotationSwitchCounter = 0;
					}
					// console.log("next rotation switch: " + nextRotationSwitch);
				}

				// once every second, if no tiles are overlapping, shuffle the tiles so they will overlap differently
				// (because they are drawn on top of each other in the order of the array index)
				if (p.frameCount % 60 == 0 && !areOverlapping) {
					shuffleArrayRandomly(tiles);
				}

				// reset noise values for all tiles, only when there is no color (to mask the change), try this every 30 seconds
				if (
					strokeBrightnessTarget == 0 &&
					fillBrightnessTarget == 0 &&
					p.frameCount % (60 * 30) == 0
				)
					resetNoise();
			}

			// lerp value to target over time
			function lerpOverTime(value, target) {
				// console.log(lerpCount);
				if (value != target && lerpCount < lerpTime) {
					lerpCount++;
					var amt = lerpCount / lerpTime;
					var lerped = p.lerp(value, target, amt);
					value = p.floor(lerped);

					// keep lerp from "hanging" at the last digits
					if (target > value) value += 1;
					else if (target < value) value -= 1;
				} else {
					lerpCount = 0;
					value = target;
				}
				return value;
			}

			// lerp color values to their targets
			function computeLerping() {
				// console.log("bgColorTarget: " + bgColorTarget + "\n" + "fillAlphaTarget: " + fillAlphaTarget + "\n" +  "fillBrightnessTarget: " + fillBrightnessTarget + "\n" +  "strokeAlphaTarget: " + strokeAlphaTarget + "\n" +  "strokeBrightnessTarget: " + strokeBrightnessTarget);

				bgColor = lerpOverTime(bgColor, bgColorTarget);
				fillAlpha = lerpOverTime(fillAlpha, fillAlphaTarget);
				fillBrightness = lerpOverTime(fillBrightness, fillBrightnessTarget);
				strokeAlpha = lerpOverTime(strokeAlpha, strokeAlphaTarget);
				strokeBrightness = lerpOverTime(strokeBrightness, strokeBrightnessTarget);
			}

			// assign values depending on mode
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

			// go to next mode
			function nextMode() {
				if (mode < 10) mode += 1;
				else mode = 1;
				// console.log('mode: ' + mode);

				applyMode();
			}

			// go to random mode
			function randomMode() {
				mode = p.floor(p.random(1, 11));
				// console.log('mode: ' + mode);

				applyMode();
			}

			// switch between no rotation, global rotation and individual rotation
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

			// go to next rotation mode and apply
			function nextRotationMode() {
				if (rotationMode < 5) rotationMode += 1;
				else rotationMode = 1;
				// console.log('rotationMode: ' + rotationMode);
				applyRotationMode();
			}

			// go to random rotation mode and apply
			function randomRotationMode() {
				rotationMode = p.floor(p.random(1, 6));
				// console.log('rotationMode: ' + rotationMode);
				applyRotationMode();
			}

			// switch between no tiles changing shape, some tiles changing shape, and all tiles changing shapes
			function applyBlobMode() {
				// console.log("blobMode: " + blobMode);
				switch (blobMode) {
					case 1:
						// none changing shape with noise
						areBlobbing = false;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isBlobbing = false;
						}
						break;
					case 2:
						// some changing shape with noise
						areBlobbing = true;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							var rand = p.floor(p.random(2));
							if (rand < 1) b.isBlobbing = false;
							else b.isBlobbing = true;
						}
						break;
					case 3:
						// all changing shape with noise
						areBlobbing = true;
						for (var i = 0; i < tiles.length; i++) {
							var b = tiles[i];
							b.isBlobbing = true;
						}
						break;
				}
			}

			// go to random shape mode and apply
			function nextBlobMode() {
				if (blobMode < 3) blobMode += 1;
				else blobMode = 1;
				applyBlobMode();
			}

			// go to next noiseShaping mode and apply
			function randomBlobMode() {
				if (blobMode != 1)
					blobMode = 1; // no blobs for half the time
				else blobMode = p.floor(p.random(1, 4));
				applyBlobMode();
			}

			// check key presses
			p.keyPressed = function () {
				// circles
				if (p.key == '1') {
					for (var i = 0; i < tiles.length; i++) {
						var b = tiles[i];
						b.state = 0;
					}
				}

				// squares
				if (p.key == '2') {
					for (var i = 0; i < tiles.length; i++) {
						var b = tiles[i];
						b.state = 1;
					}
				}

				// cycle through modes (q key)
				if (p.keyCode == 81) {
					nextMode();
				}

				// random mode (w key)
				if (p.keyCode == 87) {
					randomMode();
				}

				// cycle through rotation modes (e key)
				if (p.keyCode == 69) {
					nextRotationMode();
				}

				// random rotation mode (r key)
				if (p.keyCode == 82) {
					randomRotationMode();
				}

				// cycle through shaping modes (t key)
				if (p.keyCode == 84) {
					nextBlobMode();
				}

				// random shaping mode (z key)
				if (p.keyCode == 90) {
					randomBlobMode();
				}

				// reset noise (n key)
				if (p.keyCode == 78) {
					resetNoise();
				}

				// order array by ascending index (a key)
				if (p.keyCode == 65) {
					orderArrayByAscendingIndex(tiles);
				}

				// shuffle array randomly (s key)
				if (p.keyCode == 83) {
					shuffleArrayRandomly(tiles);
				}

				// draw FPS (g key)
				if (p.keyCode == 71) {
					debug = !debug;
				}

				// easy fullscreen (f key)
				if (p.keyCode == 70) {
					var fs = p.fullscreen();
					p.fullscreen(!fs);
				}

				// screenshot (p key)
				if (p.keyCode == 80) {
					p.saveCanvas(
						'untiled_screenshot_' + p.width + 'x' + p.height + '_' + p.frameCount,
						'png'
					);
				}
			};

			// render how many FPS the sketch is running at
			function showDebug() {
				p.fill(255);
				p.noStroke();
				p.rect(30, 5, 60, 30);

				p.fill(0, 100, 100);
				p.textSize(20);
				p.text('fps: ' + p.floor(p.frameRate()), 0, 10);
			}

			// reset noise time value for all tiles
			function resetNoise() {
				// console.log('noise reset');

				for (var i = 0; i < tiles.length; i++) {
					var b = tiles[i];
					b.hT = 0;
					b.sT = 0;
				}
			}

			// randomize array in-place using Durstenfeld shuffle algorithm
			function shuffleArrayRandomly(array) {
				// console.log('array shuffled');

				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}

			// order array by index in ascending order (unused)
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

			// resize canvas on window resize
			p.windowResized = function () {
				// get width of parent for sizing the sketch
				var containerWidth = container.clientWidth;
				var containerHeight = container.offsetHeight;

				p.resizeCanvas(containerWidth, containerHeight);

				buildGrid();
				pushTiles();
			};

			// individual Tile
			function Tile(size, xPos, yPos, index) {
				// position
				this.index = index;
				this.pos = p.createVector(xPos, yPos);

				// size & scale
				this.size = size;
				this.scale = 1;
				this.scaleT = 0;
				this.lerpedScale = 0;

				// noise shape
				this.xT = Math.random() * 100; // use JS native random function for performance
				this.yT = Math.random() * 100; // use JS native random function for performance
				this.isBlobbing = false;

				// rotation
				this.rotation = 0;
				this.roT = 0;
				this.isRotating = false;

				// color
				this.fillCol;
				this.strokeCol;
				this.hue;
				this.sat;
				this.bri;
				this.hT = 0;
				this.sT = 0;

				// shape morphing
				this.circle = [];
				this.rect = [];
				this.morph = [];
				this.state = 1;

				// initialize the (two) possible shapes with vertices
				this.initShapes = function () {
					// create a circle using vectors pointing from center
					for (var angle = 0; angle < 360; angle += 9) {
						// note we are not starting from 0 in order to match the
						// path of a circle.
						var v = p5.Vector.fromAngle(p.radians(angle - 135));
						v.mult(this.size / 2);
						this.circle.push(v);
						// let's fill out morph ArrayList with blank PVectors while we are at it
						this.morph.push(p.createVector());
					}

					// a rect is a bunch of vertices along straight lines
					// create exactly 40 vertices to match circle
					for (var i = 0; i < 40; i++) {
						var progress = i / 40; // 0 to 1 around the perimeter
						var x, y;

						if (progress < 0.25) {
							// top side
							var t = progress * 4;
							x = p.lerp(-this.size / 2, this.size / 2, t);
							y = -this.size / 2;
						} else if (progress < 0.5) {
							// right side
							var t = (progress - 0.25) * 4;
							x = this.size / 2;
							y = p.lerp(-this.size / 2, this.size / 2, t);
						} else if (progress < 0.75) {
							// bottom side
							var t = (progress - 0.5) * 4;
							x = p.lerp(this.size / 2, -this.size / 2, t);
							y = this.size / 2;
						} else {
							// left side
							var t = (progress - 0.75) * 4;
							x = -this.size / 2;
							y = p.lerp(this.size / 2, -this.size / 2, t);
						}

						this.rect.push(p.createVector(x, y));
					}

					// console.log(this.rect.length + " " + this.circle.length);
				};

				// draw single element
				this.draw = function () {
					// do calculations
					this.compute();

					// set fill and stroke
					p.fill(this.fillCol);
					p.strokeWeight(strokeW);
					p.stroke(this.strokeCol);

					// draw shape
					p.push();
					p.translate(this.pos.x, this.pos.y);
					p.scale(this.lerpedScale);
					p.rotate(this.rotation);
					this.drawShape();
					p.pop();
				};

				this.compute = function () {
					// color
					this.hT += Math.random() * (0.005 - 0.0005) + 0.0005; //use JS native random function for performance
					this.sT += Math.random() * (0.005 - 0.0005) + 0.0005; //use JS native random function for performance
					this.hue = p.map(p.noise(this.hT), 0, 1, -60, 160);
					this.sat = p.map(p.noise(this.sT), 0, 1, 10, 100);

					// apply
					this.fillCol = p.color(this.hue, this.sat, fillBrightness, fillAlpha);
					this.strokeCol = p.color(this.hue, this.sat, strokeBrightness, strokeAlpha);

					// scale
					this.scaleT += Math.random() * 0.005; // use JS native random function for performance
					if (!this.isBlobbing) this.scale = p.map(p.noise(this.scaleT), 0, 1, 0.3, 2.5);
					else this.scale = p.map(p.noise(this.scaleT), 0, 1, 0.7, 3); // make blobs bigger for more overlapping
					this.lerpedScale = p.lerp(this.lerpedScale, this.scale, 0.05); // lerp to scale to mask transition

					// rotation
					this.roT += Math.random() * 0.008; // use JS native random function for performance
					if (this.isRotating) this.rotation = p.map(p.noise(this.roT), 0, 1, 0, 10);
					else if (areRotating && this.rotatingRight) this.rotation = globalRotation;
					else if (areRotating && !this.rotatingRight) this.rotation = -globalRotation;
					else this.rotation = 0;

					// inc blobbing noise
					this.xT += p.map(p.noise(this.yT), 0, 1, 0, 0.1);
					this.yT += 0.001;
				};

				this.drawShape = function () {
					// look at each vertex
					for (var i = 0; i < this.circle.length; i++) {
						var v1;
						// are we lerping to the circle or the rect?
						if (this.state == 0) {
							v1 = this.circle[i];
						} else if (this.state == 1) {
							v1 = this.rect[i];
						}
						// get the vertex we will draw
						var v2 = this.morph[i];
						// apply blobbing or not
						if (this.isBlobbing) {
							var offsetRadius = p.map(p.noise(this.xT + i * 0.1), 0, 1, -0.3, 0.3);
							var x = offsetRadius * p.cos(i);
							var y = offsetRadius * p.sin(i);
							v2.x += x;
							v2.y += y;
						}
						// lerp to the target
						v2.lerp(v1, 0.05);
					}

					// draw a polygon that makes up all the vertices
					p.beginShape();
					this.morph.forEach(function (v) {
						p.vertex(v.x, v.y);
					});
					p.endShape(p.CLOSE);

					// debug: draw red circles at each vertex
					// p.push();
					// p.fill(255, 100, 100);
					// p.noStroke();
					// this.morph.forEach(function (v) {
					// 	p.circle(v.x, v.y, 3);
					// });
					// p.pop();
				};

				// call initShapes at the end of constructor
				this.initShapes();
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
	window.mountUntiledFullSketch = mountUntiledFullSketch;
})();
