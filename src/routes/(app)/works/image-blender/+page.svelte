<script>
	import ImageBlender1 from '$lib/assets/media/image_blender/image_blender_1.webp';
	import ImageBlender2 from '$lib/assets/media/image_blender/image_blender_2.webp';
	import ImageBlender3 from '$lib/assets/media/image_blender/image_blender_3.webp';
	import ImageBlender4 from '$lib/assets/media/image_blender/image_blender_4.webp';
	import ImageBlender6 from '$lib/assets/media/image_blender/image_blender_6.webp';
	import ImageBlender7 from '$lib/assets/media/image_blender/image_blender_7.webp';
	import ImageBlender8 from '$lib/assets/media/image_blender/image_blender_8.webp';
</script>

<svelte:head>
	<title>image blender</title>
	<meta
		name="description"
		content="This pixel sorting application allowed users to place two images next to each other on a canvas and blend
			them together by sorting their pixels by hue values."
	/>
</svelte:head>

<main class="m-0 min-h-screen px-4 pt-6 pb-5 text-black md:px-10 md:pt-12">
	<article>
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-bold">image blender</h1>
				<div class="mt-1 text-xl font-medium text-black">
					<time>2017</time>
					<span> | Processing</span>
				</div>
			</div>
		</div>

		<p>
			Inspired by Kim Asendorf's
			<a
				href="https://github.com/kimasendorf/ASDFPixelSort"
				class="text-black underline hover:text-[rgb(0,0,255)]">pixel sorting algorithm</a
			>. This application allowed users to place two images next to each other on a canvas and blend
			them together by sorting their pixels by hue values.
			<br />
			It was made as the final project for a Creative Coding class at NYU, starting my journey in Creative
			Coding.
		</p>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender1} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender2} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender3} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender4} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<!-- <div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/image_blender/image_blender_5.gif"
					alt="image_blender"
					class="block w-full"
				/>
			</figure> -->

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender6} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender7} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={ImageBlender8} alt="image_blender" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
