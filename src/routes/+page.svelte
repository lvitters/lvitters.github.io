<script lang="ts">
	import { beforeNavigate } from '$app/navigation';

	// clean up only when navigating away (not on reload)
	beforeNavigate(() => {
		if (typeof window !== 'undefined' && (window as any).noLoop) {
			(window as any).noLoop();
		}
		const container = document.getElementById('sketch-container');
		if (container) {
			container.innerHTML = '';
		}
	});
</script>

<svelte:head>
	<title>Lucca Vitters</title>
	<script src="/libs/p5_v0.10.2.min.js"></script>
	<script src="/sketches/blob.js"></script>
</svelte:head>

<main class="relative flex h-screen w-screen overflow-hidden">
	<!-- <Nav centered={true} /> -->

	<!-- left 1/3 -->
	<section class="h-full w-1/3"></section>

	<!-- right 2/3 -->
	<section class="h-full w-2/3">
		<div id="sketch-container" class="h-full w-full"></div>
	</section>
</main>
