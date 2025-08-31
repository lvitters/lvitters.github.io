<script lang="ts">
	import { onMount } from 'svelte';
	import Untiled1 from '$lib/assets/media/untiled/untiled_1.jpg?enhanced';
	import Untiled3 from '$lib/assets/media/untiled/untiled_3.jpg?enhanced';
	import Untiled4 from '$lib/assets/media/untiled/untiled_4.jpg?enhanced';
	import Untiled5 from '$lib/assets/media/untiled/untiled_5.jpg?enhanced';
	import UntiledLarge1 from '$lib/assets/media/untiled/untiled_large_1.jpg?enhanced';
	import UntiledLarge2 from '$lib/assets/media/untiled/untiled_large_2.jpg?enhanced';
	import UntiledLarge3 from '$lib/assets/media/untiled/untiled_large_3.jpg?enhanced';
	import UntiledLarge4 from '$lib/assets/media/untiled/untiled_large_4.jpg?enhanced';

	let cyclingImagesIndex = $state(0);

	$effect(() => {
		// cycle through images every 3 seconds
		const imageInterval = setInterval(() => {
			cyclingImagesIndex = (cyclingImagesIndex + 1) % 4; // 4 images for cycling
		}, 3000);

		return () => clearInterval(imageInterval);
	});

	const cyclingImages = [
		UntiledLarge1,
		UntiledLarge2,
		UntiledLarge3,
		UntiledLarge4
	];

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
	<!-- <script src="/sketches/untiled/untiled_full.js" defer></script> -->
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-[rgb(0,0,100)] px-6 pt-12 pb-5 text-white">
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

		<p class="pb-2 text-center">photography: Lars Gonikmann | Jennifer Braun</p>

		<div class="my-5"></div>

		<p class="mb-1 text-center">
			<a href="/untiled" class="text-[rgb(255,0,137)] underline hover:text-[rgb(137,0,255)]"
				>Enter here</a
			> (might be slow on your device)
		</p>

		<div class="my-5"></div>

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
				class="underline hover:text-[rgb(137,0,255)]"
				href="https://www.google.com/search?q=frieder+nake&oq=frieder+nake&aqs=chrome.0.69i59j0i512l2j69i60j69i61j69i60l2j69i61.1599j0j7&sourceid=chrome&ie=UTF-8"
				>Frieder Nake</a
			>
		</p>

		<div class="my-5"></div>

		<div class="flex flex-col gap-4 md:flex-row">
			<figure class="m-0 flex p-0">
				<enhanced:img src={Untiled1} alt="untiled" class="block h-auto max-h-screen w-auto" />
			</figure>

			<figure class="m-0 flex p-0">
				<enhanced:img src={Untiled5} alt="untiled" class="block h-auto max-h-screen w-auto" />
			</figure>
		</div>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Untiled4} alt="untiled" class="block w-full" />
		</figure>

		<div class="my-5"></div>

		<div class="flex flex-col gap-4 md:flex-row">
			<figure class="m-0 flex p-0">
				<enhanced:img
					src={cyclingImages[cyclingImagesIndex]}
					alt="untiled large"
					class="block h-auto max-h-screen w-auto"
				/>
			</figure>

			<figure class="m-0 flex p-0">
				<enhanced:img src={Untiled3} alt="untiled" class="block h-auto max-h-screen w-auto" />
			</figure>
		</div>

		<div class="my-5"></div>

		<!-- p5 sketch container
		<div id="untiled-full-container" class="mx-auto w-full md:w-4/5"></div>

		<div class="my-5"></div> -->
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
