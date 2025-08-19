import { writable } from 'svelte/store';

export const isLoading = writable(true);
export const loadingProgress = writable(0);

// list of critical resources to preload
const criticalResources = [
	'/libs/p5_v1.4.0.min.js',
	'/libs/p5_v0.10.2.min.js',
	'/media/me.jpg',
	'/fonts/Consolas.ttf'
];

let loadedCount = 0;

export async function preloadCriticalResources() {
	const promises = criticalResources.map(async (url, index) => {
		try {
			if (url.endsWith('.js')) {
				// preload JavaScript files
				await new Promise((resolve, reject) => {
					const script = document.createElement('script');
					script.src = url;
					script.onload = resolve;
					script.onerror = reject;
					document.head.appendChild(script);
				});
			} else if (url.endsWith('.jpg') || url.endsWith('.png')) {
				// preload images
				await new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = resolve;
					img.onerror = reject;
					img.src = url;
				});
			} else if (url.endsWith('.ttf')) {
				// preload fonts
				await new Promise((resolve, reject) => {
					const font = new FontFace('Consolas', `url(${url})`);
					font.load().then(resolve).catch(reject);
				});
			}

			loadedCount++;
			loadingProgress.set((loadedCount / criticalResources.length) * 100);
		} catch (error) {
			console.warn(`Failed to preload ${url}:`, error);
			loadedCount++;
			loadingProgress.set((loadedCount / criticalResources.length) * 100);
		}
	});

	await Promise.all(promises);

	// add a small delay to ensure smooth transition
	setTimeout(() => {
		isLoading.set(false);
	}, 500);
}
