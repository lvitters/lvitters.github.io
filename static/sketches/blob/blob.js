(function () {
	// This map still holds our running instances.
	const p5Instances = new Map();

	/**
	 * The main function to be called from a Svelte component.
	 * It handles the creation of a sketch and returns a cleanup function.
	 * @param {string} containerId The ID of the DOM element for the sketch.
	 * @returns {function} A function to be called to clean up the sketch instance.
	 */
	function mountBlobSketch(containerId) {
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

	// The actual p5 sketch logic (remains mostly the same).
	const sketch = function (p) {
				const blobs = [];
				const blobsLength = 20;

				p.setup = function () {
					const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
					canvas.parent(container);
					canvas.style('z-index', '-1');
					p.colorMode(p.RGB, 360, 360, 360, 360);
					for (let i = 0; i < blobsLength; i++) {
						blobs.push(new Blob(i));
					}
				};

				p.draw = function () {
					p.clear();
					p.background(360, 0);
					p.translate(p.width / 2, p.height / 2);
					p.scale(0.8);
					for (let i = blobs.length - 1; i > 0; i--) {
						blobs[i].draw();
					}
				};

				p.windowResized = function () {
					p.resizeCanvas(container.offsetWidth, container.offsetHeight);
				};

				// The Blob class (unchanged)
				function Blob(index) {
					const ra = index * 20;
					let noiseMax = 0,
						zT = p.random(1),
						rT = p.random(360),
						gT = p.random(360),
						bT = p.random(360);
					this.draw = function () {
						noiseMax = p.sin(zT);
						const r = p.map(p.noise(rT), 0, 1, -30, 390),
							g = p.map(p.noise(gT), 0, 1, -30, 390),
							b = p.map(p.noise(bT), 0, 1, -30, 390);
						p.noStroke();
						p.fill(r % 360, g % 360, b % 360);
						p.beginShape();
						for (let a = 0; a < p.TWO_PI; a += 0.08) {
							const xT = p.map(p.cos(a), -1, 1, 0, noiseMax),
								yT = p.map(p.sin(a), -1, 1, 0, noiseMax);
							const radius = p.map(p.noise(xT, yT, zT), 0, 1, 0, ra);
							p.vertex(radius * p.cos(a), radius * p.sin(a));
						}
						p.endShape(p.CLOSE);
						zT += p.random(0.001, 0.005);
						rT += p.random(0.001, 0.005);
						gT += p.random(0.001, 0.005);
						bT += p.random(0.001, 0.005);
					};
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

	// Expose the single, powerful mount function to the global scope.
	window.mountBlobSketch = mountBlobSketch;
})();
