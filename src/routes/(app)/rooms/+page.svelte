<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		let cleanup: (() => void) | null = null;
		let mounted = true;
		
		// Wait for both the mount function and container to be available
		const waitForMountFunction = (): Promise<() => void> => {
			return new Promise((resolve) => {
				const checkAndMount = () => {
					if (!mounted) return; // Component unmounted, stop trying
					
					const container = document.getElementById('rooms-sketch-container');
					if (window.mountRoomsSketch && container) {
						const cleanup = window.mountRoomsSketch('rooms-sketch-container');
						resolve(cleanup);
					} else {
						// If mount function or container not available yet, wait a bit and try again
						setTimeout(checkAndMount, 50);
					}
				};
				checkAndMount();
			});
		};

		waitForMountFunction().then((cleanupFn) => {
			if (mounted) {
				cleanup = cleanupFn;
			} else if (cleanupFn) {
				// Component was unmounted while we were waiting, clean up immediately
				cleanupFn();
			}
		});
		
		// Return cleanup function
		return () => {
			mounted = false;
			if (cleanup) {
				cleanup();
			}
		};
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<script src="/libs/p5_v1.4.0.min.js" defer></script>
	<script src="/sketches/rooms/rooms.js" defer></script>
</svelte:head>

<!-- main container that mimics old body styling -->
<div class="m-0 flex h-screen w-screen items-center justify-center overflow-hidden touch-none select-none">
	<!-- p5 sketch container -->
	<div id="rooms-sketch-container" class="touch-none select-none h-full w-full"></div>
</div>

<style>
</style>
