// blob_sketch.js - Revised for SvelteKit navigation support
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
		var container = document.getElementById('blob-container');
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
		window.cleanupBlobSketch = cleanupSketch;

		// Also handle browser navigation
		window.addEventListener('beforeunload', cleanupSketch);
		window.addEventListener('pagehide', cleanupSketch);
	}

	// prevent multiple sketches, but allow reinit if container is empty
	var container = document.getElementById('blob-container');
	if (
		typeof window.blobSketchInitialized === 'undefined' ||
		(container && !container.querySelector('canvas'))
	) {
		window.blobSketchInitialized = true;

		// use instance mode to prevent multiple instances of functions to be running
		var sketch = function (p) {
			var xT = 0.0;
			var blobs = [];
			var blobsLength = 20;

			p.setup = function () {
				// assign sketch to correct container
				var container = document.getElementById('blob-container');
				var canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
				canvas.parent('blob-container');
				canvas.id('canvas');
				canvas.style('z-index', '-1');
				p.colorMode(p.RGB, 360, 360, 360, 360);

				pushBlobs();
			};

			p.draw = function () {
				// reset background each frame
				p.clear();
				p.background(360, 0);

				// move everything to center
				p.translate(p.width / 2, p.height / 2);

				// zoom out a bit
				p.scale(0.8);

				drawBlobs();
			};

			function pushBlobs() {
				for (var i = 0; i < blobsLength; i++) {
					blobs.push(new Blob(i));
				}
			}

			function drawBlobs() {
				for (var i = blobs.length - 1; i > 0; i--) {
					var b = blobs[i];
					b.draw();
				}
			}

			function Blob(index) {
				// blob's radius, gets bigger with higher index
				var ra = index * 20;

				// noise
				var noiseMax = 0;
				var zT = p.random(1);

				// init noise values for colors
				var rT = p.random(360);
				var gT = p.random(360);
				var bT = p.random(360);
				//var alT = p.random(360);

				this.draw = function () {
					// noise
					noiseMax = p.sin(zT);

					// map color noise values to RGB(A)
					var r = p.map(p.noise(rT), 0, 1, -30, 390);
					var g = p.map(p.noise(gT), 0, 1, -30, 390);
					var b = p.map(p.noise(bT), 0, 1, -30, 390);
					//var al = p.map(p.noise(alT), 0, 1, -30, 390);

					// apply colors
					p.noStroke(0);
					p.fill(r % 360, g % 360, b % 360);
					//p.fill(r % 360, g % 360, b % 360, al % 360);

					// draw blobs
					p.beginShape();
					for (var a = 0; a < p.TWO_PI; a += 0.08) {
						var xT = p.map(p.cos(a), -1, 1, 0, noiseMax);
						var yT = p.map(p.sin(a), -1, 1, 0, noiseMax);
						var r = p.map(p.noise(xT, yT, zT), 0, 1, 0, ra);
						var x = r * p.cos(a);
						var y = r * p.sin(a);
						p.vertex(x, y);
					}
					p.endShape(p.CLOSE);

					// increment noise values
					zT += p.random(0.001, 0.005);

					rT += p.random(0.001, 0.005);
					gT += p.random(0.001, 0.005);
					bT += p.random(0.001, 0.005);
					//alT += p.random(0.001, 0.005);
				};
			}

			p.windowResized = function () {
				var container = document.getElementById('blob-container');
				if (container) {
					p.resizeCanvas(container.offsetWidth, container.offsetHeight);
				}
			};
		};

		// wait for container to exist before initializing sketch
		function initSketch() {
			var container = document.getElementById('blob-container');
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
		var container = document.getElementById('blob-container');
		if (!container) {
			window.blobSketchInitialized = undefined;
			cleanupSketch(); // Clean up if container doesn't exist
		}
	}
})();
