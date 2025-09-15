<script lang="ts">
	import { browser } from '$app/environment';
	import { mobile } from '$lib/utils/mobile.svelte';
	import { onMount } from 'svelte';

	// load blob sketch
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

				if (window.mountBlobSketch) {
					cleanup = window.mountBlobSketch('blob-container');
				} else {
					// Function not available yet, try again
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

	// track previous mobile state to avoid initial trigger
	let previousMobileState: boolean | null = null;

	// reinitialize sketch when mobile state changes
	$effect(() => {
		// watch mobile.current and reinitialize sketch when it changes
		const currentMobileState = mobile.current;

		// skip the initial run and only trigger on actual changes
		if (
			previousMobileState !== null &&
			previousMobileState !== currentMobileState &&
			browser &&
			window.mountBlobSketch
		) {
			// small delay to ensure DOM has updated
			setTimeout(() => {
				// force cleanup of any existing instance
				const container = document.getElementById('blob-container');
				if (container) {
					// clear the container completely
					container.innerHTML = '';

					// remove from p5 instances map if it exists
					if ((window as any).p5Instances) {
						const instances = (window as any).p5Instances;
						if (instances.has('blob-container')) {
							const instance = instances.get('blob-container');
							instance.remove();
							instances.delete('blob-container');
						}
					}

					// now remount the sketch
					window.mountBlobSketch('blob-container');
				}
			}, 100);
		}

		previousMobileState = currentMobileState;
	});
</script>

<svelte:head>
	<title>Lucca Vitters</title>
	<meta
		name="description"
		content="Lucca Vitters is a generative media artist based in Bremen, Germany, creating possibility spaces and emergent choreographies through code."
	/>
	<meta
		name="keywords"
		content="generative art, media art, creative coding, digital art, installations"
	/>

	<!-- open graph / social Media -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Lucca Vitters" />
	<meta
		property="og:description"
		content="Creating possibility spaces and emergent choreographies through code."
	/>
	<meta property="og:url" content="https://luccavitters.de" />

	<script src="/sketches/blob/blob.js" defer></script>
</svelte:head>

<!-- content container -->
<div>
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
