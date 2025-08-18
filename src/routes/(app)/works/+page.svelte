<script lang="ts">
	import RayArray from '$lib/components/RayArray.svelte';
	import FeedbackCube from '$lib/components/FeedbackCube.svelte';
	import EinHauchVonTullv2 from '$lib/components/EinHauchVonTullv2.svelte';
	import Untiled from '$lib/components/Untiled.svelte';
	import EinHauchVonTull from '$lib/components/EinHauchVonTull.svelte';
	import Rooms from '$lib/components/Rooms.svelte';
	import Blob from '$lib/components/Blob.svelte';
	import BreakThePattern from '$lib/components/BreakThePattern.svelte';
	import ImageBlender from '$lib/components/ImageBlender.svelte';

	// for untiled_preview
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	let pageVisible = $state(false);
	let currentRayarrayImageIndex = $state(0);
	let currentTullImageIndex = $state(0);

	// mobile state management
	let isMobile = $state(false);
	let showDetailView = $state(false);
	let currentDetailSection = $state('');
	let detailViewVisible = $state(false);

	$effect(() => {
		// check if mobile on mount
		if (browser) {
			const checkMobile = () => {
				isMobile = window.innerWidth < 768;
			};
			checkMobile();
			window.addEventListener('resize', checkMobile);

			return () => {
				window.removeEventListener('resize', checkMobile);
			};
		}
	});

	let untiledPreviewSketchLoaded = false;

	const loadUntiledPreviewSketch = async () => {
		if (!browser || untiledPreviewSketchLoaded) return;

		untiledPreviewSketchLoaded = true;

		// load p5.js if not already loaded
		if (!(window as any).p5) {
			await new Promise((resolve) => {
				const script = document.createElement('script');
				script.src = '/libs/p5_v1.4.0.min.js';
				script.onload = resolve;
				document.head.appendChild(script);
			});
		}

		// load the untiled preview sketch script
		await new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = '/sketches/untiled/untiled_preview.js';
			script.onload = resolve;
			document.head.appendChild(script);
		});
	};

	$effect(() => {
		// small delay to ensure smooth transition and proper layout
		setTimeout(() => {
			pageVisible = true;
		}, 50);

		// cycle through images every 3 seconds
		const rayarrayInterval = setInterval(() => {
			currentRayarrayImageIndex = (currentRayarrayImageIndex + 1) % 5; // 5 preview images for RAYARRAY
		}, 3000);

		// cycle through images every 3 seconds
		const tullInterval = setInterval(() => {
			currentTullImageIndex = (currentTullImageIndex + 1) % 4; // 4 preview images for EinHauchVonTüll
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
		if (isMobile) {
			// on mobile, switch to detail view
			currentDetailSection = sectionId;
			showDetailView = true;

			// reset transition state and then trigger it
			detailViewVisible = false;
			setTimeout(() => {
				detailViewVisible = true;
			}, 50);

			// notify nav component about detail view state
			if (browser) {
				window.dispatchEvent(
					new CustomEvent('detailViewChange', {
						detail: { showDetailView: true, isMobile: true }
					})
				);
			}
		} else {
			// desktop behavior remains the same
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
	}

	function goBackToOverview() {
		showDetailView = false;
		currentDetailSection = '';
		detailViewVisible = false;

		// notify nav component about state change
		if (browser) {
			window.dispatchEvent(
				new CustomEvent('detailViewChange', {
					detail: { showDetailView: false, isMobile: isMobile }
				})
			);
		}
	}

	onMount(() => {
		// small delay to ensure layout is fully rendered
		setTimeout(() => {
			loadUntiledPreviewSketch();
		}, 100);
	});

	// listen for back navigation from nav component
	$effect(() => {
		if (browser) {
			const handleGoBack = () => {
				goBackToOverview();
			};

			window.addEventListener('goBackToOverview', handleGoBack);

			return () => {
				window.removeEventListener('goBackToOverview', handleGoBack);
			};
		}
	});

	// for untiled_preview
	const cleanup = () => {
		if (browser && window.cleanupUntiledPreviewSketch) {
			window.cleanupUntiledPreviewSketch();
			delete window.cleanupUntiledPreviewSketch;
		}
		if (browser) {
			window.untiledPreviewSketchInitialized = undefined;
		}
		untiledPreviewSketchLoaded = false;
	};

	beforeNavigate(cleanup);
	onDestroy(cleanup);
</script>

<svelte:head>
	<title>Lucca Vitters</title>
</svelte:head>

<main class="font-consolas relative flex h-screen w-full overflow-x-hidden text-[10px]">
	<!-- wrap content in a transition container -->
	<div
		class="flex h-full transition-all duration-700 ease-out {pageVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<!-- left 1/3 - overview section -->
		<section
			class="scrollbar-none relative z-20 h-full overflow-y-auto pt-20 text-left
			{isMobile
				? showDetailView
					? 'hidden'
					: 'w-full px-8'
				: 'w-1/3 overflow-x-visible pr-4 pl-8 md:w-[33.33vw]'}"
		>
			<!-- <div>RAUSCHEN (2025)</div>
			<div>Radio Angrezi Archive (2025)</div> -->
			<div class="mb-1">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('rayarray-section')}
				>
					<img
						src={rayarrayImages[currentRayarrayImageIndex]}
						alt="RAYARRAY preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('rayarray-section')}
				>
					RAYARRAY (2023)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('feedback-cube-section')}
				>
					<img
						src="/media/feedback_cube/feedback_cube_preview.jpg"
						alt="feedback_cube preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('feedback-cube-section')}
				>
					feedback_cube (2022)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('ein-hauch-von-tull-v2-section')}
				>
					<img
						src="/media/einHauchVonTullv2/tull2_3_preview.jpg"
						alt="Ein Hauch Von Tuell v2 preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('ein-hauch-von-tull-v2-section')}
				>
					Ein Hauch von Tüll v2 (2022)
				</button>
			</div>
			<div class="mb-1">
				<button
					id="untiled-preview-container"
					class="w-full cursor-pointer p-0 m-0 border-0 bg-transparent block"
					style="height: 90px; width: 100%; box-sizing: border-box;"
					aria-label="View untiled project details"
					onclick={() => scrollToSection('untiled-section')}
				></button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('untiled-section')}
				>
					untiled (2022)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('ein-hauch-von-tull-section')}
				>
					<img
						src={tullImages[currentTullImageIndex]}
						alt="Ein Hauch Von Tuell preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('ein-hauch-von-tull-section')}
				>
					Ein Hauch von Tüll (2021)
				</button>
			</div>
			<div class="mb-1">
				<!-- stick out from container -->
				<button
					class="cursor-pointer overflow-visible p-0 m-0 bg-transparent w-full block border-1"
					onclick={() => scrollToSection('available-rooms-section')}
				>
					<img
						src="/media/rooms/rooms_cutoff_transparent.png"
						alt="available.rooms preview"
						class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
						style="transform: scale(1.05) translateX(.5%); transform-origin: bottom left; margin-top: -3vh;"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('available-rooms-section')}
				>
					available.rooms (2021)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('blob-section')}
				>
					<img
						src="/media/blob/blob_preview.png"
						alt="blob preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('blob-section')}
				>
					blob (2020)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('break-the-pattern-section')}
				>
					<img
						src="/media/BreakThePattern/BreakThePattern_1.jpg"
						alt="Break the Pattern preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('break-the-pattern-section')}
				>
					Break the Pattern (2019)
				</button>
			</div>
			<div class="mb-5">
				<button
					class="cursor-pointer p-0 m-0 border-0 bg-transparent transition-opacity duration-300 hover:opacity-80 w-full block"
					onclick={() => scrollToSection('image-blender-section')}
				>
					<img
						src="/media/image_blender/image_blender_1.gif"
						alt="image_blender preview"
						class="h-auto w-full"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => scrollToSection('image-blender-section')}
				>
					Image Blender (2017)
				</button>
			</div>
		</section>

		<!-- right 2/3 - detail section -->
		<section
			class="relative z-10 h-full overflow-y-auto text-left
			{isMobile ? (showDetailView ? 'w-full pt-20' : 'hidden') : 'w-2/3 pl-5 md:w-[66.67vw]'}"
		>
			<!-- <div>RAUSCHEN (2025)</div>

			<div>Radio Angrezi Archive (2025)</div> -->

			{#if !isMobile || currentDetailSection === 'rayarray-section'}
				<div
					id="rayarray-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<RayArray />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'feedback-cube-section'}
				<div
					id="feedback-cube-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<FeedbackCube />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'ein-hauch-von-tull-v2-section'}
				<div
					id="ein-hauch-von-tull-v2-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<EinHauchVonTullv2 />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'untiled-section'}
				<div
					id="untiled-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					{#key 'untiled'}
						<Untiled />
					{/key}
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'ein-hauch-von-tull-section'}
				<div
					id="ein-hauch-von-tull-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<EinHauchVonTull />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'available-rooms-section'}
				<div
					id="available-rooms-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<Rooms />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'blob-section'}
				<div
					id="blob-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<Blob />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'break-the-pattern-section'}
				<div
					id="break-the-pattern-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<BreakThePattern />
				</div>
			{/if}

			{#if !isMobile || currentDetailSection === 'image-blender-section'}
				<div
					id="image-blender-section"
					class={isMobile && showDetailView
						? 'transition-all duration-700 ease-out ' +
							(detailViewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
						: ''}
				>
					<ImageBlender />
				</div>
			{/if}
		</section>
	</div>
</main>

<style>
	/* keep rooms overflow visible */
	.overflow-visible {
		overflow: visible !important;
	}

	/* hide scrollbar */
	.scrollbar-none {
		scrollbar-width: none !important;
		-ms-overflow-style: none !important;
	}

	.scrollbar-none::-webkit-scrollbar {
		display: none !important;
		width: 0 !important;
	}

	/* remove all white space around components on mobile */
	@media (max-width: 767px) {
		/* remove margins and padding from component containers */
		:global(main.font-consolas) {
			margin: 0 !important;
		}

		/* remove any spacing from component wrapper divs */
		:global(div[id$='-section']) {
			margin: 0 !important;
			padding: 0 !important;
		}

		/* remove body margins if any */
		:global(body) {
			margin: 0 !important;
		}
	}
</style>
