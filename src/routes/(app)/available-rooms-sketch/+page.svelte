<script lang="ts">
	import { onMount } from 'svelte';

	// load rooms
	onMount(() => {
		let cleanup: (() => void) | null = null;
		let mounted = true;

		// async function to load p5 and initialize sketch
		const initializeSketch = async () => {
			// dynamically import p5 only in the browser
			const { default: p5 } = await import('p5');

			// make p5 available globally for the sketch files
			if (!(window as any).p5) {
				(window as any).p5 = p5;
			}

			const tryMount = () => {
				if (!mounted) return;

				if (window.mountRoomsSketch) {
					cleanup = window.mountRoomsSketch('rooms-sketch-container');
				} else {
					setTimeout(tryMount, 50);
				}
			};

			tryMount();
		};

		initializeSketch();

		return () => {
			mounted = false;
			if (cleanup) cleanup();
		};
	});
</script>

<svelte:head>
	<title>available.rooms sketch</title>
	<script src="/sketches/rooms/rooms.js" defer></script>
</svelte:head>

<!-- main container that mimics old body styling from former portfolio page -->
<div
	class="m-0 flex h-screen w-screen touch-none items-center justify-center overflow-hidden select-none"
>
	<!-- p5 sketch container -->
	<div id="rooms-sketch-container" class="h-full w-full touch-none select-none"></div>
</div>

<style>
</style>
