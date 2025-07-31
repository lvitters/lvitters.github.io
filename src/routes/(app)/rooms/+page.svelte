<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	const cleanup = () => {
		if (browser && window.cleanupRoomsSketch) {
			window.cleanupRoomsSketch();
			delete window.cleanupRoomsSketch;
		}
	};

	beforeNavigate(cleanup);
	onDestroy(cleanup);
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<script src="/libs/p5_v1.4.0.min.js"></script>
	<script src="/sketches/rooms/rooms.js"></script>
</svelte:head>

<!-- main container that mimics old body styling -->
<div class="m-0 flex h-screen w-screen items-center justify-center overflow-hidden">
	<!-- p5 sketch container -->
	<div id="rooms-sketch-container"></div>
</div>

<style>
</style>
