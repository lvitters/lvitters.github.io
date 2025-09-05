<script lang="ts">
	import { onMount } from 'svelte';

	// load untiled_full
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

				if (window.mountUntiledFullSketch) {
					cleanup = window.mountUntiledFullSketch('untiled-full-container');
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
	<meta name="description" content="untiled" />
	<script src="/sketches/untiled/untiled_full.js" defer></script>
</svelte:head>

<!-- main container that mimics old body styling from former portfolio page -->
<div
	class="m-0 flex h-screen w-screen touch-none items-center justify-center overflow-hidden bg-black select-none"
>
	<!-- p5 sketch container -->
	<div id="untiled-full-container" class="h-full w-full"></div>
</div>

<style>
</style>
