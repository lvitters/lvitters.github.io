(function () {
	// store the p5 instance for cleanup
	let p5Instance = null;

	// cleanup function
	function cleanupSketch() {
		if (p5Instance && p5Instance.remove) {
			p5Instance.remove();
			p5Instance = null;
		}

		// also manually clean the container
		var container = document.getElementById('blob-container');
		if (container) {
			var canvas = container.querySelector('canvas');
			if (canvas) {
				canvas.remove();
			}
		}

		// reset the initialization flag
		window.blobSketchInitialized = undefined;

		// schedule reinitialization after cleanup
		setTimeout(tryReinit, 100);
	}

	function tryReinit() {
		var container = document.getElementById('blob-container');
		if (
			container &&
			!container.querySelector('canvas') &&
			typeof window.blobSketchInitialized === 'undefined'
		) {
			initializeSketch();
		}
	}

	function initializeSketch() {
		// prevent double initialization
		if (window.blobSketchInitialized) {
			return;
		}
		
		// check if there's already a canvas in the container and remove it
		var container = document.getElementById('blob-container');
		if (container) {
			var existingCanvas = container.querySelector('canvas');
			if (existingCanvas) {
				existingCanvas.remove();
			}
		}
		
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
				// var alT = p.random(360);

				this.draw = function () {
					// noise
					noiseMax = p.sin(zT);

					// map color noise values to RGB(A)
					var r = p.map(p.noise(rT), 0, 1, -30, 390);
					var g = p.map(p.noise(gT), 0, 1, -30, 390);
					var b = p.map(p.noise(bT), 0, 1, -30, 390);
					// var al = p.map(p.noise(alT), 0, 1, -30, 390);

					// apply colors
					p.noStroke(0);
					p.fill(r % 360, g % 360, b % 360);
					// p.fill(r % 360, g % 360, b % 360, al % 360);

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
					// alT += p.random(0.001, 0.005);
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
			} else {
				setTimeout(initSketch, 100);
			}
		}

		initSketch();
	}

	// store cleanup function globally so SvelteKit can access it
	window.cleanupBlobSketch = cleanupSketch;

	// prevent multiple sketches, but allow reinit if container is empty
	var container = document.getElementById('blob-container');
	if (
		typeof window.blobSketchInitialized === 'undefined' ||
		(container && !container.querySelector('canvas'))
	) {
		initializeSketch();
	}
})();
