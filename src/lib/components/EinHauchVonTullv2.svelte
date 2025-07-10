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
	<meta name="description" content="Ein Hauch Von Tüll v2" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-[rgb(10,0,50)] px-7 pt-12 pb-5 text-white">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-2xl font-normal">Ein Hauch Von Tüll v2</h1>
				<div class="mt-1 text-sm text-white">
					<time class="text-sm">2022</time>
					<span> | @ Fusion festival | light installation | wood construction </span>
				</div>
			</div>
		</div>

		<div class="text-2xs">
			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2_3.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2_9.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src={cyclingImages[cyclingImagesIndex]}
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2_6.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2_8.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<div class="mb-5 flex items-center justify-center px-2 pt-12 text-center md:px-0">
				<div class="flex-1 text-center">
					<h1 class="mb-0 pb-1 text-center text-2xl font-normal">Ein Hauch von Tüll v2.1</h1>
					<div class="mt-1 text-sm text-white">
						<time class="text-sm">2023</time>
						<span> | @ Licht|Raum </span>
					</div>
				</div>
			</div>

			<div class="my-5"></div>

			<p class="mb-1 text-center">
				in collaboration with <a
					href="https://jcluq.art"
					class="text-white underline hover:text-[rgb(100,149,237)]">jcluq</a
				>
			</p>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2.1_3.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2.1_2.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>

			<figure class="m-0 p-0">
				<img
					src="/media/einHauchVonTullv2/tull2.1_1.jpg"
					alt="Ein Hauch Von Tüll"
					class="block w-full"
				/>
			</figure>

			<div class="my-5"></div>
		</div>
	</article>
</main>
