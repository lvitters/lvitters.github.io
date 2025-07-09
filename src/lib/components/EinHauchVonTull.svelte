<script>
	let cyclingImagesIndex = $state(0);

	$effect(() => {
		// cycle through images every 3 seconds
		const imageInterval = setInterval(() => {
			cyclingImagesIndex = (cyclingImagesIndex + 1) % 4; // 4 preview images for RAYARRAY
		}, 3000);

		return () => clearInterval(imageInterval);
	});

	const cyclingImages = [
		'/media/einHauchVonTullv2/tull2_10.jpg',
		'/media/einHauchVonTullv2/tull2_11.jpg',
		'/media/einHauchVonTullv2/tull2_12.jpg',
		'/media/einHauchVonTullv2/tull2_13.jpg'
	];
</script>

<svelte:head>
	<title>Ein Hauch von Tüll</title>
	<meta name="description" content="Ein Hauch Von Tüll" />
</svelte:head>

<main
	class="font-consolas max-w-[950p m-0 mx-auto min-h-screen bg-[rgb(0,40,0)] px-0 pt-12 pb-5 text-white md:px-2"
>
	<article class="px-0 md:px-2">
		<div class="mb-5 flex items-center justify-center px-2 text-center md:px-0">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-2xl font-normal">Ein Hauch Von Tüll</h1>
				<div class="mt-1 text-sm text-white">
					<time class="text-sm">2021</time>
					<span> | @ Fusion festival | light installation | live performance</span>
				</div>
			</div>
		</div>

		<div class="text-2xs">
			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_7.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_4.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_1.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_8.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_6.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_2.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_9.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTull/tull_5.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-4"></div>
		</div>
	</article>
</main>
