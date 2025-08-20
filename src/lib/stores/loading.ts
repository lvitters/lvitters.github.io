import { writable } from 'svelte/store';

export const isLoading = writable(true);
export const loadingProgress = writable(0);

// list of critical resources to preload
const criticalResources = [
	// '/libs/p5_v1.4.0.min.js',
	// '/libs/p5_v0.10.2.min.js',
	'/fonts/Consolas.ttf',
	// RAUSCHEN component media (first thing users see)
	'/media/rauschen/rauschen_reel.mp4',
	'/media/rauschen/rauschen_1.jpg',
	'/media/rauschen/rauschen_2.jpg',
	'/media/rauschen/rauschen_3.jpg',
	'/media/rauschen/rauschen_4.jpg',
	// works page preview images
	'/media/rauschen/rauschen_preview.png',
	'/media/rayarray/rayarray_preview_1.jpg',
	'/media/rayarray/rayarray_preview_2.jpg',
	'/media/rayarray/rayarray_preview_3.jpg',
	'/media/rayarray/rayarray_preview_4.jpg',
	'/media/rayarray/rayarray_preview_5.jpg',
	'/media/feedback_cube/feedback_cube_preview.jpg',
	'/media/einHauchVonTullv2/tull2_3_preview.jpg',
	'/media/einHauchVonTull/tull_7_preview.jpg',
	'/media/einHauchVonTull/tull_5_preview.jpg',
	'/media/einHauchVonTull/tull_1_preview.jpg',
	'/media/einHauchVonTull/tull_6_preview.jpg',
	'/media/rooms/rooms_cutoff_transparent.png',
	'/media/blob/blob_preview.png',
	'/media/BreakThePattern/BreakThePattern_1.jpg',
	'/media/image_blender/image_blender_1.gif'
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
			} else if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif')) {
				// preload images
				await new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = resolve;
					img.onerror = reject;
					img.src = url;
				});
			} else if (url.endsWith('.mp4')) {
				// preload videos
				await new Promise((resolve, reject) => {
					const video = document.createElement('video');
					video.onloadeddata = resolve;
					video.onerror = reject;
					video.preload = 'auto';
					video.src = url;
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
