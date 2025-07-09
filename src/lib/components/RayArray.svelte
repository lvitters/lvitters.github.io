<script>
	let cyclingImagesIndex = $state(0);

	$effect(() => {
		// cycle through images every 3 seconds
		const imageInterval = setInterval(() => {
			cyclingImagesIndex = (cyclingImagesIndex + 1) % 5; // 5 preview images for RAYARRAY
		}, 3000);

		return () => clearInterval(imageInterval);
	});

	const cyclingImages = [
		'/media/rayarray/rayarray_preview_1.jpg',
		'/media/rayarray/rayarray_preview_2.jpg',
		'/media/rayarray/rayarray_preview_3.jpg',
		'/media/rayarray/rayarray_preview_4.jpg',
		'/media/rayarray/rayarray_preview_5.jpg'
	];
</script>

<svelte:head>
	<title>RAYARRAY</title>
	<meta name="description" content="RAYARRAY" />
</svelte:head>

<main
	class="font-consolas m-0 mx-auto min-h-screen max-w-[950px] bg-black px-0 pt-12 pb-5 text-white md:px-2"
>
	<article class="px-0 md:px-2">
		<div class="mb-5 flex items-center justify-center px-2 text-center md:px-0">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-2xl font-normal">RAYARRAY</h1>
				<div class="mt-1 text-sm text-white">
					<time class="text-sm">2023</time>
					<span> | kinetic light installation | Processing | Arduino</span>
				</div>
			</div>
		</div>

		<div class="text-2xs">
			<p class="mb-1 text-center">
				in collaboration with <a
					href="https://simonslang.de/"
					class="text-white underline hover:text-red-500">Simon Lang</a
				>
			</p>

			<p class="mb-1 text-center">
				many thanks to <a
					href="https://www.dennisppaul.de/"
					class="text-white underline hover:text-red-500">Dennis Paul</a
				>
				and
				<a href="https://rlfbckr.io/" class=" text-white underline hover:text-red-500"
					>Ralf Bäcker</a
				> for the coding guidance
			</p>

			<p class="mb-1 text-center">
				enter <a
					href="https://github.com/lvitters/RAYARRAY"
					class="text-white underline hover:text-red-500">RAYARRAY github page</a
				> for more details
			</p>

			<p class="pb-2 text-center">
				photos by <a href="https://benschl.com/" class="text-white underline hover:text-red-500"
					>Benjamin Schlemmer</a
				>
			</p>

			<div class="my-4"></div>

			<p class="mb-4">
				RAYARRAY is a modular kinetic light installation that reflects emergent collective agency by
				exploring generative choreographies.
			</p>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img src="/media/rayarray/rayarray_3.jpg" alt="RAYARRAY" class="block w-full" />
			</figure>

			<div class="my-4"></div>

			<p class="mb-4">
				RAYARRAY consists of an ARRAY of nodes that carry either a rotating mirror or a laser diode
				emitting a RAY. The rotation of the mirrors creates an emergent light sculpture that is
				continually generated through a range of behaviors in which the nodes act together or
				individually.
			</p>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img src="/media/rayarray/rayarray_4.jpg" alt="RAYARRAY" class="block w-full" />
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img src="/media/rayarray/rayarray_2.jpg" alt="RAYARRAY" class="block w-full" />
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img src={cyclingImages[cyclingImagesIndex]} alt="RAYARRAY" class="block w-full" />
			</figure>

			<div class="my-4"></div>
		</div>
	</article>
</main>
