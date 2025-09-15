<script lang="ts">
	import RayArray2 from '$lib/assets/media/rayarray/rayarray_2.jpg?enhanced';
	import RayArray3 from '$lib/assets/media/rayarray/rayarray_3.jpg?enhanced';
	import RayArray4 from '$lib/assets/media/rayarray/rayarray_4.jpg?enhanced';
	import RayArrayPreview1 from '$lib/assets/media/rayarray/rayarray_preview_1.jpg?enhanced';
	import RayArrayPreview2 from '$lib/assets/media/rayarray/rayarray_preview_2.jpg?enhanced';
	import RayArrayPreview3 from '$lib/assets/media/rayarray/rayarray_preview_3.jpg?enhanced';
	import RayArrayPreview4 from '$lib/assets/media/rayarray/rayarray_preview_4.jpg?enhanced';
	import RayArrayPreview5 from '$lib/assets/media/rayarray/rayarray_preview_5.jpg?enhanced';

	let cyclingImagesIndex = $state(0);

	$effect(() => {
		// cycle through images every 3 seconds
		const imageInterval = setInterval(() => {
			cyclingImagesIndex = (cyclingImagesIndex + 1) % 5; // 5 preview images for RAYARRAY
		}, 3000);

		return () => clearInterval(imageInterval);
	});

	const cyclingImages = [
		RayArrayPreview1,
		RayArrayPreview2,
		RayArrayPreview3,
		RayArrayPreview4,
		RayArrayPreview5
	];
</script>

<svelte:head>
	<title>RAYARRAY</title>
	<meta
		name="description"
		content="RAYARRAY is a modular kinetic light installation that reflects emergent collective agency by
			exploring generative choreographies."
	/>
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-black px-6 pt-12 pb-5 text-white">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">RAYARRAY</h1>
				<div class="mt-1 text-xl text-white">
					<time class="text-xl">2023</time>
					<span> | kinetic light installation | Processing | Arduino</span>
				</div>
			</div>
		</div>
		<p class="mb-1 text-center">in collaboration with Simon Lang</p>

		<p class="mb-1 text-center">
			many thanks to <a
				href="https://www.dennisppaul.de/"
				class="text-white underline hover:text-red-500">Dennis Paul</a
			>
			and
			<a href="https://rlfbckr.io/" class=" text-white underline hover:text-red-500">Ralf Bäcker</a>
			for the guidance
		</p>

		<p class="mb-1 text-center">
			enter <a
				href="https://github.com/lvitters/RAYARRAY"
				class="text-white underline hover:text-red-500">RAYARRAY github page</a
			> for more details
		</p>

		<p class="pb-2 text-center">
			photography: <a href="https://benschl.com/" class="text-white underline hover:text-red-500"
				>Benjamin Schlemmer</a
			>
		</p>

		<div class="my-5"></div>

		<p class="mb-4">
			RAYARRAY is a modular kinetic light installation that reflects emergent collective agency by
			exploring generative choreographies.
		</p>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={RayArray3} alt="RAYARRAY" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<p class="mb-4">
			RAYARRAY consists of an ARRAY of nodes that carry either a rotating mirror or a laser diode
			emitting a RAY. The rotation of the mirrors creates an emergent light sculpture that is
			continually generated through a range of behaviors in which the nodes act together or
			individually.
		</p>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={RayArray4} alt="RAYARRAY" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={RayArray2} alt="RAYARRAY" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="relative m-0 p-0">
			{#each cyclingImages as image, index}
				<enhanced:img
					src={image}
					alt="RAYARRAY"
					class="block w-full {index === cyclingImagesIndex
						? 'opacity-100'
						: 'opacity-0'} {index === 0 ? 'relative' : 'absolute inset-0'}"
					loading="lazy"
				/>
			{/each}
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
