<script lang="ts">
	import { onMount } from 'svelte';

	let pageVisible = false;
	let currentRayarrayImageIndex = 0;

	onMount(() => {
		// small delay to ensure smooth transition
		setTimeout(() => {
			pageVisible = true;
		}, 50);

		// cycle through images every 3 seconds
		const rayarrayInterval = setInterval(() => {
			currentRayarrayImageIndex = (currentRayarrayImageIndex + 1) % 5; // 5 preview images for RAYARRAY
		}, 3000);

		return () => clearInterval(rayarrayInterval);
	});

	// define images for projects that have multiple
	const rayarrayImages = [
		'/media/rayarray/rayarray_preview_1.jpg',
		'/media/rayarray/rayarray_preview_2.jpg',
		'/media/rayarray/rayarray_preview_3.jpg',
		'/media/rayarray/rayarray_preview_4.jpg',
		'/media/rayarray/rayarray_preview_5.jpg'
	];
</script>

<svelte:head>
	<title>Lucca Vitters</title>
</svelte:head>

<main class="font-consolas relative flex h-screen w-screen overflow-hidden pt-20 text-[10px]">
	<!-- wrap content in a transition container -->
	<div
		class="flex h-full w-full transition-all duration-700 ease-out {pageVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<!-- left 1/3 -->
		<section
			class="scrollable-section overflow-fix relative z-20 h-full w-1/3 overflow-y-auto pl-8 text-left"
		>
			<!-- <div>RAUSCHEN (2025)</div>
			<div>Radio Angrezi Archive (2025)</div> -->
			<div class="mb-1">
				<img
					src={rayarrayImages[currentRayarrayImageIndex]}
					alt="RAYARRAY preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>RAYARRAY (2023)</div>
			</div>
			<div class="mb-1">
				<img
					src="/media/feedback_cube/feedback_cube_preview.jpg"
					alt="feedback_cube preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>feedback_cube (2022)</div>
			</div>
			<div class="mb-1">
				<img
					src="/media/einHauchVonTullv2/tull2_3_preview.jpg"
					alt="Ein Hauch Von Tuell v2 preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>Ein Hauch von Tüll v2 (2022)</div>
			</div>
			<!-- <div>untiled (2022)</div> -->
			<div class="mb-1">
				<img
					src="/media/einHauchVonTull/tull_1_preview.jpg"
					alt="Ein Hauch Von Tuell preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>Ein Hauch von Tüll (2021)</div>
			</div>
			<div class="mb-1">
				<!-- stick out from container -->
				<div class="overflow-visible border-1">
					<img
						src="/media/rooms/rooms_cutoff_transparent.png"
						alt="available.rooms preview"
						class="h-auto w-full max-w-xs transition-opacity duration-300"
						style="width: 105%; margin-top: -1.5rem;"
					/>
				</div>
				<div>available.rooms (2021)</div>
			</div>
			<div class="mb-1">
				<img
					src="/media/blob/blob_preview.png"
					alt="blob preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>blob (2020)</div>
			</div>
			<div class="mb-1">
				<img
					src="/media/BreakThePattern/BreakThePattern_1.jpg"
					alt="Break the Pattern preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>Break the Pattern (2019)</div>
			</div>
			<div class="mb-5">
				<img
					src="/media/image_blender/image_blender_1.gif"
					alt="image_blender preview"
					class="h-auto w-full max-w-xs transition-opacity duration-300"
				/>
				<div>Image Blender (2017)</div>
			</div>
		</section>

		<!-- right 2/3 -->
		<section class="relative z-10 h-full w-2/3 pl-13 text-left">
			<!-- <div>RAUSCHEN (2025)</div>
			<div>Radio Angrezi Archive (2025)</div> -->
			<div>RAYARRAY (2023)</div>
			<div>feedback_cube (2022)</div>
			<div>Ein Hauch von Tüll v2 (2022)</div>
			<div>untiled (2022)</div>
			<div>Ein Hauch von Tüll (2021)</div>
			<div>available.rooms (2021)</div>
			<div>blob (2020)</div>
			<div>Break the Pattern (2019)</div>
			<div>Image Blender (2017)</div>
		</section>
	</div>
</main>

<style>
	.overflow-visible {
		overflow: visible !important;
	}

	.scrollable-section {
		/* hide scrollbar for WebKit browsers */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		/* reclaim scrollbar space with negative margin */
		margin-right: -1rem; /* typical scrollbar width */
		padding-right: 1rem; /* restore padding to maintain content positioning */
	}

	.scrollable-section::-webkit-scrollbar {
		display: none; /* WebKit browsers */
	}
</style>
