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
	<meta name="description" content="RAUSCHEN" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-gray-300 px-6 pt-12 pb-5 text-black">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">RAUSCHEN</h1>
				<div class="mt-1 text-xl text-black">
					<time class="text-xl">2025</time>
					<span> | generative performance installation | Processing | OpenGL</span>
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
			RAUSCHEN is an emergent performance installation exploring the possibility space of a
			1000x1000 pixel image. It generates a random, but orderly grid of pixels or cells according to
			a range of RNG and noise algorithms. These regular textures are fed into a modular shader
			system, recursively feeding back its results into emergent textures of visual patterns and
			auditory noise, flashing by in quick succession. A control application constantly monitors its
			parameters and is abled to save the generated output textures to disk. It also provides the
			option to influence the pattern generation in order to perform a more curated visual
			experience. While current image generation models denoise their random input textures using
			techniques under the broad term diffusion, RAUSCHEN uses procedural generation methods in
			order to achieve the opposite effect, infusing its fundamental noise textures with structural
			patterns for now only recognisable by the viewer.
			<br />
			<br />
			Is this what being trained must feel like to an AI?
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
