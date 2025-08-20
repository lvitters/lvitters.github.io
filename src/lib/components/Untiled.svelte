<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		let cleanup: (() => void) | null = null;
		let mounted = true;

		// Async function to load p5 and initialize sketch
		const initializeSketch = async () => {
			// Dynamically import p5 only in the browser
			const { default: p5 } = await import('p5');
			
			// Make p5 available globally for the sketch files
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

<main class="font-consolas m-0 min-h-screen bg-white px-6 pt-12 pb-5 text-black">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">untiled</h1>
				<div class="mt-1 text-xl">
					<time class="text-xl">2022</time>
					<span> | p5.js | generative</span>
				</div>
			</div>
		</div>
		<p class="mb-4">
			Emergence occurs when an entity is observed to have properties its parts do not have on their
			own. This program generates emergent visuals from the interaction between ever changing simple
			geometric tiles.
		</p>

		<div class="my-5"></div>

		<p class="mb-4">
			"Now, I was sitting at my desk at home, observing on screen your work as it was developing and
			changing, in a very calm way, the pure joy and surprise of colors and forms in slow and steady
			movements, surprises here and there, interplay without end, pure meditation, all based on the
			simple regular grid, but rich and richer in what was happening in detail. [...] I was
			wondering, would I have to observe and admire your work all day before something would seem to
			be repeating? You have created a marble." - <a
				class="underline hover:text-[rgb(0,0,255)]"
				href="https://www.google.com/search?q=frieder+nake&oq=frieder+nake&aqs=chrome.0.69i59j0i512l2j69i60j69i61j69i60l2j69i61.1599j0j7&sourceid=chrome&ie=UTF-8"
				>Frieder Nake</a
			>
		</p>

		<div class="my-5"></div>

		<!-- p5 sketch container -->
		<div id="untiled-full-container" class="mx-auto w-full md:w-4/5"></div>

		<div class="my-5"></div>
	</article>
</main>
