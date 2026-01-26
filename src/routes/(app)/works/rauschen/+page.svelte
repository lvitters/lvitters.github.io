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

<main class="m-0 min-h-screen bg-gray-300 px-4 pt-6 pb-5 text-black md:px-10 md:pt-12">
	<article>
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-bold">RAUSCHEN</h1>
				<div class="mt-1 text-xl font-medium text-black">
					<time>2025</time>
					<span> | emergent media system | Processing | OpenGL</span>
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
			Every digital image is a limited, but unimaginably large space of possibilities. All these
			possibilities together are its probability space. In a regular 24-bit image file, each pixel
			is defined by 256 shades each of red, green and blue, which comes out to 16,777,216 possible
			colours. For a one megapixel image (1,000 pixels wide and 1,000 pixels tall) there are
			16,777,216<sup>1,000,000</sup> permutations. That number far exceeds how many atoms there
			(probably) are in the observable universe (10<sup>80</sup>). Actually it is 7.87x10<sup
				>7,224,639</sup
			>
			times larger. Even if every atom in the universe was another universe full of atoms that are universes
			full of atoms and so on, we would have to go 90,309 levels deep to finally have as many atoms as
			there are permutations of a 24-bit megapixel image.
			<br />
			<br />
			Most of it is just meaningless noise. But how do we find the infinitely small rest of it? You know,
			the rest that contains (among other things) all photos, drawings or graphics ever made, will ever
			be made or could ever be made? Usually, we go at it from the other direction: We take a picture.
			We make a drawing. We create graphics. Yet we are always limited by the fact that meaning needs
			to exist first, either in the world or in our minds, to be found within the noise.
			<br />
			<br />
			Or we could just leave it up to chance.
			<br />
			<br />
			RAUSCHEN ("noise") is a real-time emergent media system exploring the probability space of a 1,000×1,000
			image. It generates textures with a variety of techniques such as white or Perlin noise and recursively
			feeds them into a modular palette of per-pixel algorithms. They each represent visual effects that,
			running in succession, synthesise exponentially random patterns. While contemporary image generation
			models try to impose meaning onto the noise based on their training data, RAUSCHEN aims to chart
			new areas hidden within the noise itself. In the end, a human decides what is worth keeping.
			<br />
			<br />
			How can we find meaning within all this noise?
		</p>

		<div class="my-5"></div>

		<div class="flex flex-col gap-4 md:flex-row">
			<figure class="m-0 flex-1 p-0">
				<video
					title="rauschen reel video"
					class="block h-auto w-full bg-gray-400 object-cover"
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
				<enhanced:img
					src={Rauschen1}
					alt="RAUSCHEN"
					class="block w-full bg-gray-400"
					loading="lazy"
				/>
			</figure>
		</div>

		<div class="my-5"></div>

		<div class="flex flex-col gap-4 md:flex-row">
			<enhanced:img src={Rauschen3} alt="RAUSCHEN" class="block bg-gray-400" loading="lazy" />
			<enhanced:img src={Rauschen4} alt="RAUSCHEN" class="block bg-gray-400" loading="lazy" />
		</div>

		<div class="my-5"></div>

		<figure class="m-0 flex-1 p-0">
			<enhanced:img
				src={Rauschen2}
				alt="RAUSCHEN"
				class="block w-full bg-gray-400"
				loading="lazy"
			/>
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
