<script lang="ts">
	import Tull23 from '$lib/assets/media/einHauchVonTullv2/tull2_3.jpg?enhanced';
	import Tull26 from '$lib/assets/media/einHauchVonTullv2/tull2_6.jpg?enhanced';
	import Tull28 from '$lib/assets/media/einHauchVonTullv2/tull2_8.jpg?enhanced';
	import Tull29 from '$lib/assets/media/einHauchVonTullv2/tull2_9.jpg?enhanced';
	import Tull210 from '$lib/assets/media/einHauchVonTullv2/tull2_10.jpg?enhanced';
	import Tull211 from '$lib/assets/media/einHauchVonTullv2/tull2_11.jpg?enhanced';
	import Tull212 from '$lib/assets/media/einHauchVonTullv2/tull2_12.jpg?enhanced';
	import Tull213 from '$lib/assets/media/einHauchVonTullv2/tull2_13.jpg?enhanced';
	import Tull2_1_1 from '$lib/assets/media/einHauchVonTullv2/tull2.1_1.jpg?enhanced';
	import Tull2_1_2 from '$lib/assets/media/einHauchVonTullv2/tull2.1_2.jpg?enhanced';
	import Tull2_1_3 from '$lib/assets/media/einHauchVonTullv2/tull2.1_3.jpg?enhanced';

	let cyclingImagesIndex = $state(0);

	$effect(() => {
		// cycle through images every 3 seconds
		const imageInterval = setInterval(() => {
			cyclingImagesIndex = (cyclingImagesIndex + 1) % 4; // 4 preview images for RAYARRAY
		}, 3000);

		return () => clearInterval(imageInterval);
	});

	const cyclingImages = [Tull210, Tull211, Tull212, Tull213];
</script>

<svelte:head>
	<meta name="description" content="Ein Hauch Von Tüll v2" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-[rgb(10,0,50)] px-6 pt-12 pb-5 text-white">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">Ein Hauch Von Tüll v2</h1>
				<div class="mt-1 text-xl text-white">
					<time class="text-xl">2022</time>
					<span> | @ Fusion festival | light installation | wood construction </span>
				</div>
			</div>
		</div>
		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull23} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull29} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="relative m-0 p-0">
			{#each cyclingImages as image, index}
				<enhanced:img
					src={image}
					alt="Ein Hauch Von Tüll"
					class="block w-full {index === cyclingImagesIndex
						? 'opacity-100'
						: 'opacity-0'} {index === 0 ? 'relative' : 'absolute inset-0'}"
					loading="lazy"
				/>
			{/each}
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull26} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull28} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<div id="v2-1" class="mb-5 flex items-center justify-center px-2 pt-12 text-center md:px-0">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">Ein Hauch von Tüll v2.1</h1>
				<div class="mt-1 text-xl text-white">
					<time class="text-xl">2023</time>
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
			<enhanced:img src={Tull2_1_3} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull2_1_2} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull2_1_1} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
