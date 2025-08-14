<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	let isLoaded = false;

	const cleanup = () => {
		if (browser && window.cleanupUntiledFullSketch) {
			window.cleanupUntiledFullSketch();
			delete window.cleanupUntiledFullSketch;
		}
		if (browser) {
			window.untiledFullSketchInitialized = undefined;
		}
		isLoaded = false;
	};

	const loadSketch = async () => {
		if (!browser || isLoaded) return;
		
		isLoaded = true;
		
		// Load p5.js if not already loaded (different version for untiled)
		if (!window.p5) {
			await new Promise((resolve) => {
				const script = document.createElement('script');
				script.src = '/libs/p5_v1.4.0.min.js';
				script.onload = resolve;
				document.head.appendChild(script);
			});
		}

		// Load the untiled sketch script
		await new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = '/sketches/untiled/untiled_full.js';
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
	<meta name="description" content="untiled" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-white px-7 pt-12 pb-5 text-black">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-2xl font-normal">untiled</h1>
				<div class="mt-1 text-sm">
					<time class="text-sm">2022</time>
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

		<div id="untiled-full-container" class="mx-auto w-4/5"></div>

		<div class="my-5"></div>
	</article>
</main>
