<script lang="ts">
	import RayArray from '$lib/components/RayArray.svelte';
	import FeedbackCube from '$lib/components/FeedbackCube.svelte';
	import EinHauchVonTullv2 from '$lib/components/EinHauchVonTullv2.svelte';
	import Untiled from '$lib/components/Untiled.svelte';
	import EinHauchVonTull from '$lib/components/EinHauchVonTull.svelte';

	let pageVisible = $state(false);
	let currentRayarrayImageIndex = $state(0);
	let currentTullImageIndex = $state(0);

	$effect(() => {
		// small delay to ensure smooth transition
		setTimeout(() => {
			pageVisible = true;
		}, 50);

		// cycle through images every 3 seconds
		const rayarrayInterval = setInterval(() => {
			currentRayarrayImageIndex = (currentRayarrayImageIndex + 1) % 5; // 5 preview images for RAYARRAY
		}, 3000);

		const tullInterval = setInterval(() => {
			currentTullImageIndex = (currentTullImageIndex + 1) % 4; // 5 preview images for RAYARRAY
		}, 3000);

		return () => {
			clearInterval(rayarrayInterval);
			clearInterval(tullInterval);
		};
	});

	// define images for projects that have multiple
	const rayarrayImages = [
		'/media/rayarray/rayarray_preview_1.jpg',
		'/media/rayarray/rayarray_preview_2.jpg',
		'/media/rayarray/rayarray_preview_3.jpg',
		'/media/rayarray/rayarray_preview_4.jpg',
		'/media/rayarray/rayarray_preview_5.jpg'
	];

	const tullImages = [
		'/media/einHauchVonTull/tull_7_preview.jpg',
		'/media/einHauchVonTull/tull_5_preview.jpg',
		'/media/einHauchVonTull/tull_1_preview.jpg',
		'/media/einHauchVonTull/tull_6_preview.jpg'
	];

	function scrollToSection(sectionId: string) {
		const section = document.getElementById(sectionId);
		const rightPanel = document.querySelector('.relative.z-10.h-full.w-2\\/3.overflow-y-auto');

		if (section && rightPanel) {
			// get the position of the section relative to the scrollable container
			const sectionTop = section.offsetTop;

			// smooth scroll to the section
			rightPanel.scrollTo({
				top: sectionTop + 1, // no offset
				behavior: 'smooth'
			});
		}
	}
</script>

<svelte:head>
	<title>Lucca Vitters</title>
	<script src="/libs/p5_v1.4.0.min.js"></script>
	<script src="/sketches/untiled/untiled_preview.js"></script>
</svelte:head>

<main class="font-consolas relative flex h-screen w-full text-[10px]">
	<!-- wrap content in a transition container -->
	<div
		class="flex h-full transition-all duration-700 ease-out {pageVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<!-- left 1/3 -->
		<section
			class="scrollable-section overflow-fix relative z-20 h-full w-1/3 overflow-x-visible overflow-y-auto pt-20 pl-8 text-left"
			style="width: calc(33.333% + 1rem);"
		>
			<!-- <div>RAUSCHEN (2025)</div>
			<div>Radio Angrezi Archive (2025)</div> -->
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('rayarray-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('rayarray-section') : null}
			>
				<img
					src={rayarrayImages[currentRayarrayImageIndex]}
					alt="RAYARRAY preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>RAYARRAY (2023)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('feedback-cube-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('feedback-cube-section') : null}
			>
				<img
					src="/media/feedback_cube/feedback_cube_preview.jpg"
					alt="feedback_cube preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>feedback_cube (2022)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('ein-hauch-von-tull-v2-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' '
						? scrollToSection('ein-hauch-von-tull-v2-section')
						: null}
			>
				<img
					src="/media/einHauchVonTullv2/tull2_3_preview.jpg"
					alt="Ein Hauch Von Tuell v2 preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>Ein Hauch von Tüll v2 (2022)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('untiled-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('untiled-section') : null}
			>
				<div id="untiled_preview_container" class="w-full" style="height: 100px;"></div>
				<div>untiled (2022)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('ein-hauch-von-tull-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('ein-hauch-von-tull-section') : null}
			>
				<img
					src={tullImages[currentTullImageIndex]}
					alt="Ein Hauch Von Tuell preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>Ein Hauch von Tüll (2021)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('available-rooms-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('available-rooms-section') : null}
			>
				<!-- stick out from container -->
				<div class="overflow-visible border-1">
					<img
						src="/media/rooms/rooms_cutoff_transparent.png"
						alt="available.rooms preview"
						class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
						style="transform: scale(1.05) translateX(.5%); transform-origin: bottom left; margin-top: -3vh;"
					/>
				</div>
				<div>available.rooms (2021)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('blob-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('blob-section') : null}
			>
				<img
					src="/media/blob/blob_preview.png"
					alt="blob preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>blob (2020)</div>
			</div>
			<div
				class="mb-1 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('break-the-pattern-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('break-the-pattern-section') : null}
			>
				<img
					src="/media/BreakThePattern/BreakThePattern_1.jpg"
					alt="Break the Pattern preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>Break the Pattern (2019)</div>
			</div>
			<div
				class="mb-5 cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => scrollToSection('image-blender-section')}
				onkeydown={(e) =>
					e.key === 'Enter' || e.key === ' ' ? scrollToSection('image-blender-section') : null}
			>
				<img
					src="/media/image_blender/image_blender_1.gif"
					alt="image_blender preview"
					class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
				/>
				<div>Image Blender (2017)</div>
			</div>
		</section>

		<!-- right 2/3 -->
		<section class="relative z-10 h-full w-2/3 overflow-y-auto pl-13 text-left">
			<!-- <div>RAUSCHEN (2025)</div>

			<div>Radio Angrezi Archive (2025)</div> -->

			<div id="rayarray-section">
				<RayArray />
			</div>

			<div id="feedback-cube-section">
				<FeedbackCube />
			</div>

			<div id="ein-hauch-von-tull-v2-section">
				<EinHauchVonTullv2 />
			</div>

			<div id="untiled-section">
				{#key 'untiled'}
					<Untiled />
				{/key}
			</div>

			<div id="ein-hauch-von-tull-section">
				<EinHauchVonTull />
			</div>

			<div id="available-rooms-section">
				<div>available.rooms (2021)</div>
			</div>

			<div id="blob-section">
				<div>blob (2020)</div>
			</div>

			<div id="break-the-pattern-section">
				<div>Break the Pattern (2019)</div>
			</div>

			<div id="image-blender-section">
				<div>Image Blender (2017)</div>
			</div>
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
		margin-right: -1rem; /* typical scrollbar width */
		padding-right: 1rem; /* restore padding to maintain content positioning */
	}

	.scrollable-section::-webkit-scrollbar {
		display: none; /* WebKit browsers */
	}
</style>
