<script lang="ts">
	import { browser } from '$app/environment';
	import { mobile } from '$lib/utils/mobile.svelte';
	import { onMount } from 'svelte';

	let pageVisible = $state(false);

	// setup page transition
	$effect(() => {
		if (browser) {
			// small delay to ensure smooth transition
			setTimeout(() => {
				pageVisible = true;
			}, 100);
		}
	});

	// load sketch
	onMount(() => {
		// this component manages its own sketch instance.
		const cleanup = window.mountBlobSketch('blob-container');

		return cleanup;
	});
</script>

<svelte:head>
	<title>Lucca Vitters</title>
	<script src="/libs/p5_v0.10.2.min.js" defer></script>
	<script src="/sketches/blob/blob.js" defer></script>
</svelte:head>

<!-- wrap content in a transition container -->
<div
	class="transition-all duration-700 ease-out {pageVisible
		? 'translate-y-0 opacity-100'
		: 'translate-y-4 opacity-0'}"
>
	{#if mobile.current}
		<!-- mobile layout - centered p5 sketch -->
		<main class="relative flex h-screen w-full items-center justify-center overflow-hidden">
			<!-- p5 sketch container -->
			<div id="blob-container" class="h-full w-full"></div>
		</main>
	{:else}
		<!-- desktop layout - left/right sections -->
		<main class="relative flex h-screen w-full overflow-hidden">
			<!-- left 1/3 -->
			<section class="h-full w-1/3"></section>

			<!-- right 2/3 -->
			<section class="h-full w-2/3">
				<!-- p5 sketch container -->
				<div id="blob-container" class="h-full w-full"></div>
			</section>
		</main>
	{/if}
</div>
