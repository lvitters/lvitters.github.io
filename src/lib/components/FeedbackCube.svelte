<script lang="ts">
	let cyclingImagesIndex = $state(0);

	$effect(() => {
		// cycle through images every 3 seconds
		const imageInterval = setInterval(() => {
			cyclingImagesIndex = (cyclingImagesIndex + 1) % 3; // 3 images for cycling
		}, 3000);

		return () => clearInterval(imageInterval);
	});

	const cyclingImages = [
		'/media/feedback_cube/feedback_cube_1.jpg',
		'/media/feedback_cube/feedback_cube_4.jpg',
		'/media/feedback_cube/feedback_cube_2.jpg'
	];
</script>

<svelte:head>
	<meta name="description" content="feedback_cube" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-[rgb(42,0,25)] px-6 pt-12 pb-5 text-white">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">feedback_cube</h1>
				<div class="mt-1 text-xl text-white">
					<time class="text-xl">2022</time>
					<span> | interactive installation | Processing | Max/MSP</span>
				</div>
			</div>
		</div>

		<p class="mb-1 text-center">
			in collaboration with <a
				href="http://www.chihimchik.com/"
				class="text-white underline hover:text-[rgb(238,130,238)]">Chi Him Chik</a
			>
		</p>

		<p class="mb-1 text-center">
			photos by <a
				href="https://www.jimiliu.com/"
				class="text-white underline hover:text-[rgb(238,130,238)]">Jimmy Liu</a
			>
		</p>

		<div class="my-5"></div>

		<p>
			feedback_cube is an interactive audiovisual installation driven by seeming randomness that
			explores the temporal associations of visual and auditory noise. The audio output is generated
			by Aiii - an audio improvisation machine - using data from the analysis of the installation's
			surroundings through its microphone input. The Processing sketch generates the visual content
			from Aiii's data and is in turn sending scrambled data points back to Aiii.
		</p>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img src={cyclingImages[cyclingImagesIndex]} alt="feedback_cube" class="block w-full" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img
				src="/media/feedback_cube/feedback_cube_5.jpg"
				alt="feedback_cube"
				class="block w-full"
			/>
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img
				src="/media/feedback_cube/feedback_cube_6.jpg"
				alt="feedback_cube"
				class="block w-full"
			/>
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<img
				src="/media/feedback_cube/feedback_cube_3.jpg"
				alt="feedback_cube"
				class="block w-full"
			/>
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<video
				src="media/feedback_cube/feedback_cube_reel.mp4"
				title="feedback_cube reel video"
				class="block h-auto w-full object-cover"
				controls
				muted
				loop
			>
				Your browser does not support the video tag.
			</video>
		</figure>

		<div class="my-5"></div>
	</article>
</main>
