// guard so no multiple sketches are running
if (typeof sketchInitialized === 'undefined') {
	var sketchInitialized = true;

	var xT = 0.0;
	var blobs = [];
	var blobsLength = 20;

	function setup() {
		// assign sketch to proper container
		var container = document.getElementById('sketch-container');
		var canvas = createCanvas(container.offsetWidth, container.offsetHeight);
		canvas.parent('sketch-container');
		canvas.id('canvas');
		canvas.style('z-index', '1');
		colorMode(RGB, 360, 360, 360, 360);

		pushBlobs();
	}

	function draw() {
		// reset background each frame
		clear();
		background(360, 0);

		// move everything to center
		translate(width / 2, height / 2);

		// zoom out a bit
		scale(0.8);

		drawBlobs();
	}

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
		var zT = random(1);

		// init noise values for colors
		var rT = random(360);
		var gT = random(360);
		var bT = random(360);
		//var alT = random(360);

		this.draw = function () {
			// noise
			noiseMax = sin(zT);

			// map color noise values to RGB(A)
			var r = map(noise(rT), 0, 1, -30, 390);
			var g = map(noise(gT), 0, 1, -30, 390);
			var b = map(noise(bT), 0, 1, -30, 390);
			//var al = map(noise(alT), 0, 1, -30, 390);

			// apply colors
			noStroke(0);
			fill(r % 360, g % 360, b % 360);
			//fill(r % 360, g % 360, b % 360, al % 360);

			// draw blobs
			beginShape();
			for (var a = 0; a < TWO_PI; a += 0.08) {
				var xT = map(cos(a), -1, 1, 0, noiseMax);
				var yT = map(sin(a), -1, 1, 0, noiseMax);
				var r = map(noise(xT, yT, zT), 0, 1, 0, ra);
				var x = r * cos(a);
				var y = r * sin(a);
				vertex(x, y);
			}
			endShape(CLOSE);

			// increment noise values
			zT += random(0.001, 0.005);

			rT += random(0.001, 0.005);
			gT += random(0.001, 0.005);
			bT += random(0.001, 0.005);
			//alT += random(0.001, 0.005);
		};
	}

	function windowResized() {
		var container = document.getElementById('sketch-container');
		if (container) {
			resizeCanvas(container.offsetWidth, container.offsetHeight);
		}
	}
}
