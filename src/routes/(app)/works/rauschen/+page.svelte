<script lang="ts">
	import RauschenReelPreview from '$lib/assets/media/rauschen/rauschen_reel_preview.png';
	import RauschenReel from '$lib/assets/media/rauschen/rauschen_reel.webm';
	import RauschenReelMP4 from '$lib/assets/media/rauschen/rauschen_reel.mp4';
	import Rauschen1 from '$lib/assets/media/rauschen/rauschen_1.jpg?enhanced';
	import Rauschen2 from '$lib/assets/media/rauschen/rauschen_2.jpg?enhanced';
	import Rauschen3 from '$lib/assets/media/rauschen/rauschen_3.jpg?enhanced';
	import Rauschen4 from '$lib/assets/media/rauschen/rauschen_4.jpg?enhanced';
</script>

<svelte:head>
	<title>RAUSCHEN</title>
	<meta
		name="description"
		content="RAUSCHEN is a generative media system exploring the possibility space of a 1000x1000 image."
	/>
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-gray-300 px-6 pt-12 pb-5 text-black">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-bold">RAUSCHEN</h1>
				<div class="mt-1 text-xl text-black">
					<time class="text-xl">2025</time>
					<span> | generative installation / performance | Processing | OpenGL</span>
				</div>
			</div>
		</div>

		<p class="mb-1 text-center">
			enter <a
				href="https://github.com/lvitters/RAUSCHEN"
				class="text-black underline hover:text-purple-500">RAUSCHEN github page</a
			> for more details
		</p>

		<p class="pb-2 text-center">
			photography: <a
				href="https://mikastoerkel.com/"
				class="text-black underline hover:text-purple-500">Mika Stoerkel</a
			>
			|
			<!-- <a
				href="https://portfolio.hfk-bremen.de/omar-zaki/"
				class="text-black underline hover:text-purple-500">Omar Zaki</a
			> -->
			Omar Zaki
		</p>

		<div class="my-5"></div>

		<p class="mb-4">
			RAUSCHEN (2025) is a real-time generative media system exploring the probability space of a
			1000x1000 image. Its emergent textures are produced from random grids of pixels that are
			recursively fed into a modular palette of shader programs. In contrast to current image
			generation models that try to diffuse their input noise into coherent results, RAUSCHEN
			exponentially in-fuses its procedural generation processes with patterns of randomness by
			mixing combinations of generative algorithms. In the end, a human decides what is worth
			keeping.
			<br />
			<br />
			How can we find our way through all this noise?
		</p>

		<div class="my-5"></div>

		<div class="flex flex-col gap-4 md:flex-row">
			<figure class="m-0 flex-1 p-0">
				<video
					title="rauschen reel video"
					class="block h-auto w-full object-cover"
					controls
					muted
					autoplay
					loop
					preload="auto"
					poster={RauschenReelPreview}
				>
					<source src={RauschenReel} type="video/webm" />
					<source src={RauschenReelMP4} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</figure>

			<figure class="m-0 flex-1 p-0">
				<enhanced:img src={Rauschen1} alt="RAUSCHEN" class="block w-full" loading="lazy" />
			</figure>
		</div>

		<div class="my-5"></div>

		<div class="flex flex-col gap-4 md:flex-row">
			<enhanced:img src={Rauschen3} alt="RAUSCHEN" class="block" loading="lazy" />
			<enhanced:img src={Rauschen4} alt="RAUSCHEN" class="block" loading="lazy" />
		</div>

		<div class="my-5"></div>

		<figure class="m-0 flex-1 p-0">
			<enhanced:img src={Rauschen2} alt="RAUSCHEN" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
