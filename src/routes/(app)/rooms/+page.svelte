<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	let isLoaded = false;

	const cleanup = () => {
		if (browser && window.cleanupRoomsSketch) {
			window.cleanupRoomsSketch();
			delete window.cleanupRoomsSketch;
		}
		if (browser) {
			window.roomsSketchInitialized = undefined;
		}
		isLoaded = false;
	};

	const loadSketch = async () => {
		if (!browser || isLoaded) return;
		
		isLoaded = true;
		
		// Load p5.js if not already loaded
		if (!window.p5) {
			await new Promise((resolve) => {
				const script = document.createElement('script');
				script.src = '/libs/p5_v1.4.0.min.js';
				script.onload = resolve;
				document.head.appendChild(script);
			});
		}

		// Load the rooms sketch script
		await new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = '/sketches/rooms/rooms.js';
			script.onload = resolve;
			document.head.appendChild(script);
		});
	};

	onMount(() => {
		loadSketch();
	});

	beforeNavigate(cleanup);
	onDestroy(cleanup);
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- main container that mimics old body styling -->
<div class="m-0 flex h-screen w-screen items-center justify-center overflow-hidden">
	<!-- p5 sketch container -->
	<div id="rooms-sketch-container"></div>
</div>

<style>
</style>
