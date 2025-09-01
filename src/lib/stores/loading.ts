import { writable } from 'svelte/store';

// import all critical resources as assets
import RauschenReel from '$lib/assets/media/rauschen/rauschen_reel.webm?url';
import Rauschen1 from '$lib/assets/media/rauschen/rauschen_1.jpg?enhanced';
import Rauschen2 from '$lib/assets/media/rauschen/rauschen_2.jpg?enhanced';
import Rauschen3 from '$lib/assets/media/rauschen/rauschen_3.jpg?enhanced';
import Rauschen4 from '$lib/assets/media/rauschen/rauschen_4.jpg?enhanced';
import RauschenPreview from '$lib/assets/media/rauschen/rauschen_preview.png?enhanced';
import RayArrayPreview1 from '$lib/assets/media/rayarray/rayarray_preview_1.jpg?enhanced';
import RayArrayPreview2 from '$lib/assets/media/rayarray/rayarray_preview_2.jpg?enhanced';
import RayArrayPreview3 from '$lib/assets/media/rayarray/rayarray_preview_3.jpg?enhanced';
import RayArrayPreview4 from '$lib/assets/media/rayarray/rayarray_preview_4.jpg?enhanced';
import RayArrayPreview5 from '$lib/assets/media/rayarray/rayarray_preview_5.jpg?enhanced';
import FeedbackCubePreview from '$lib/assets/media/feedback_cube/feedback_cube_preview.jpg?enhanced';
import Tull2_3Preview from '$lib/assets/media/einHauchVonTullv2/tull2_3_preview.jpg?enhanced';
import Tull7Preview from '$lib/assets/media/einHauchVonTull/tull_7_preview.jpg?enhanced';
import Tull5Preview from '$lib/assets/media/einHauchVonTull/tull_5_preview.jpg?enhanced';
import Tull1Preview from '$lib/assets/media/einHauchVonTull/tull_1_preview.jpg?enhanced';
import Tull6Preview from '$lib/assets/media/einHauchVonTull/tull_6_preview.jpg?enhanced';
import RoomsCutoffTransparent from '$lib/assets/media/rooms/rooms_cutoff_transparent.png?enhanced';
import BlobPreview from '$lib/assets/media/blob/blob_preview.png?enhanced';
import BreakThePattern1 from '$lib/assets/media/BreakThePattern/BreakThePattern_1.jpg?enhanced';
import ImageBlender1 from '$lib/assets/media/image_blender/image_blender_1.webp';

export const isLoading = writable(true);
export const loadingProgress = writable(0);
export const hasPreloaded = writable(false);

// list of critical resources to preload
const criticalResources = [
	'/fonts/Consolas.ttf',
	// RAUSCHEN component media (first thing users see)
	RauschenReel,
	Rauschen1.src,
	Rauschen2.src,
	Rauschen3.src,
	Rauschen4.src,
	// works page preview images
	RauschenPreview.src,
	RayArrayPreview1.src,
	RayArrayPreview2.src,
	RayArrayPreview3.src,
	RayArrayPreview4.src,
	RayArrayPreview5.src,
	FeedbackCubePreview.src,
	Tull2_3Preview.src,
	Tull7Preview.src,
	Tull5Preview.src,
	Tull1Preview.src,
	Tull6Preview.src,
	RoomsCutoffTransparent.src,
	BlobPreview.src,
	BreakThePattern1.src,
	ImageBlender1
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
			} else if (
				url.endsWith('.jpg') ||
				url.endsWith('.png') ||
				url.endsWith('.gif') ||
				url.endsWith('.webp')
			) {
				// preload images
				await new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = resolve;
					img.onerror = reject;
					img.src = url;
				});
			} else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
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
		hasPreloaded.set(true);
	}, 500);
}
