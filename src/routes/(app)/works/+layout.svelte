<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { mobile } from '$lib/utils/mobile.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	// import preview images
	// @ts-ignore
	import RauschenPreview from '$lib/assets/media/rauschen/rauschen_preview.png?enhanced&w=1280;640;400';
	import FeedbackCubePreview from '$lib/assets/media/feedback_cube/feedback_cube_preview.jpg?enhanced';
	import Tull2_3Preview from '$lib/assets/media/einHauchVonTullv2/tull2_3_preview.jpg?enhanced';
	import UntiledPreview from '$lib/assets/media/untiled/untiled_preview.jpg?enhanced';
	import RoomsCutoffTransparent from '$lib/assets/media/rooms/rooms_cutoff_transparent.png?enhanced';
	import BlobPreview from '$lib/assets/media/blob/blob_preview.png?enhanced';
	import BreakThePattern1 from '$lib/assets/media/BreakThePattern/BreakThePattern_1.jpg?enhanced';
	import RayArrayPreview1 from '$lib/assets/media/rayarray/rayarray_preview_1.jpg?enhanced';
	import RayArrayPreview2 from '$lib/assets/media/rayarray/rayarray_preview_2.jpg?enhanced';
	import RayArrayPreview3 from '$lib/assets/media/rayarray/rayarray_preview_3.jpg?enhanced';
	import RayArrayPreview4 from '$lib/assets/media/rayarray/rayarray_preview_4.jpg?enhanced';
	import RayArrayPreview5 from '$lib/assets/media/rayarray/rayarray_preview_5.jpg?enhanced';
	import Tull1Preview from '$lib/assets/media/einHauchVonTull/tull_1_preview.jpg?enhanced';
	import Tull5Preview from '$lib/assets/media/einHauchVonTull/tull_5_preview.jpg?enhanced';
	import Tull6Preview from '$lib/assets/media/einHauchVonTull/tull_6_preview.jpg?enhanced';
	import Tull7Preview from '$lib/assets/media/einHauchVonTull/tull_7_preview.jpg?enhanced';
	import ImageBlender1 from '$lib/assets/media/image_blender/image_blender_1.webp';

	let { children } = $props();
	let currentRayarrayImageIndex = $state(0);
	let currentTullImageIndex = $state(0);

	// mobile state
	let showDetailView = $state(false);

	// reactive current route
	let currentRoute = $derived(page.url.pathname.split('/').pop() || '');
	let isWorkDetail = $derived(currentRoute !== 'works' && currentRoute !== '');

	// on mobile, /works should show overview, individual routes show detail
	let showMobileDetail = $derived(mobile.current && isWorkDetail);

	// setup cycling images
	$effect(() => {
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

	// handle mobile state based on route changes
	$effect(() => {
		if (mobile.current) {
			showDetailView = showMobileDetail;

			// notify nav component about detail view state
			if (browser) {
				window.dispatchEvent(
					new CustomEvent('detailViewChange', {
						detail: { showDetailView: showMobileDetail, isMobile: mobile.current }
					})
				);
			}
		}
	});

	// reset scroll position when route changes
	$effect(() => {
		if (browser && currentRoute) {
			const rightPanel = document.querySelector('.relative.z-10.overflow-y-auto');
			if (rightPanel) {
				rightPanel.scrollTop = 0;
			}
		}
	});

	// define cycling images
	const rayarrayImages = [
		RayArrayPreview1,
		RayArrayPreview2,
		RayArrayPreview3,
		RayArrayPreview4,
		RayArrayPreview5
	];

	const tullImages = [Tull7Preview, Tull5Preview, Tull1Preview, Tull6Preview];

	// navigation function
	function navigateToWork(workName: string) {
		goto(`/works/${workName}`);
	}

	// load untiled preview sketch
	onMount(() => {
		let cleanup: (() => void) | null = null;
		let resizeObserver: ResizeObserver | null = null;
		let mounted = true;

		// async function to load p5 and initialize sketch
		const initializeSketch = async () => {
			// dynamically import p5 only in the browser
			const { default: p5 } = await import('p5');

			// make p5 available globally for the sketch files
			if (!(window as any).p5) {
				(window as any).p5 = p5;
			}

			const tryMount = () => {
				if (!mounted) return;

				if (window.mountUntiledPreviewSketch) {
					const container = document.getElementById('untiled-preview-container');
					if (container && container.offsetParent !== null) {
						// only mount if container is visible (desktop)
						if (container.clientWidth > 0 && container.offsetHeight > 0) {
							cleanup = window.mountUntiledPreviewSketch('untiled-preview-container');

							// observe container for size changes
							resizeObserver = new ResizeObserver(() => {
								window.dispatchEvent(new Event('resize'));
							});
							resizeObserver.observe(container);
						} else {
							// container not ready yet, try again
							setTimeout(tryMount, 50);
						}
					} else {
						setTimeout(tryMount, 50);
					}
				} else {
					setTimeout(tryMount, 50);
				}
			};

			tryMount();
		};

		initializeSketch();

		return () => {
			mounted = false;
			if (cleanup) cleanup();
			if (resizeObserver) resizeObserver.disconnect();
		};
	});
</script>

<svelte:head>
	<script src="/sketches/untiled/untiled_preview.js" defer></script>
</svelte:head>

<main class="relative flex h-screen w-full overflow-x-hidden text-base">
	<!-- content container -->
	<div class="flex h-full">
		<!-- left 1/3 - overview section -->
		<section
			class="scrollbar-none relative z-20 h-full w-full overflow-y-auto px-4 pt-20 text-left md:px-10 xl:w-1/3 xl:overflow-x-visible xl:pr-4 xl:pl-8 {showMobileDetail
				? 'max-xl:hidden'
				: ''}"
		>
			<div class="mb-1">
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('rauschen')}
					aria-label="View RAUSCHEN project details"
				>
					<enhanced:img
						src={RauschenPreview}
						alt="RAUSCHEN preview"
						class="h-auto w-full bg-gray-300"
						sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('rauschen')}
				>
					RAUSCHEN (2025)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="m-0 box-border flex h-[60px] w-full cursor-pointer flex-row items-center justify-center bg-[rgb(255,255,0)] p-0 outline hover:text-[#0000ff] active:text-[#ff69b4]"
					style="box-shadow: 5px 5px;"
					onclick={() => navigateToWork('angrezi-archive')}
					aria-label="View Angrezi Archive project details"
				>
					<svg
						class="h-10 w-auto p-0 hover:fill-[#0000ff]"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 664.5 155.3"
					>
						<style type="text/css">
							.st0 {
								fill-rule: evenodd;
								clip-rule: evenodd;
							}
						</style>
						<path
							class="st0"
							d="M133 117.3c-15.7-6.8-36.3-16.9-53.8-26.4 -6.3-3.4-12.1-6.4-17.5-8.9 10.6-1.3 18.8-4.9 23.8-9.4 5.1-4.6 7-10.3 5.5-16.2C88.7 47.4 75.1 43.2 47 42.8c-18.7-0.3-36.5 1.4-37.2 1.4 -1.4 0.1-2.6 0.9-3.4 2s-1 2.6-0.5 3.9c0 0 0.5 1.4 1.2 3.9 -1.5-1-3.5-1-5.1 0 -2.1 1.4-2.6 4.3-1.1 6.3C1 60.5 13.6 78.8 21.2 98.4c0.3 0.9 0.6 1.8 0.8 2.6 0.9 2.8 1.7 5.2 2.2 6.8 0.3 0.8 0.5 1.5 0.7 2 1.6 4.7 5.4 3.7 5.9 3.5 1.3-0.4 4.1-1.8 2.7-6.6 -0.2-0.7-0.5-1.8-1-3.3 -0.8-2.7-1.8-5.4-2.8-8.1 -1.6-4.9-3.5-10.9-5.5-17.3 3.6 1.1 7.1 2 10.5 2.7 9.5 3.3 23.1 8.8 40.1 18.1 17.7 9.7 38.6 19.9 54.5 26.8 0.6 0.3 1.2 0.4 1.8 0.4 1.8 0 3.4-1 4.2-2.7C136.3 121 135.3 118.3 133 117.3zM37 71.9c-9.9-3.4-15.4-4.3-15.8-4.4 -0.1 0-0.2 0-0.3 0 -1.6-5-3.2-10-4.6-14.7 6.8-0.5 18.7-1.1 30.7-1 33.3 0.5 35.3 6.8 35.4 6.9 0.6 2.5-0.3 4.9-2.8 7.2C72.5 72.2 56.3 75.6 37 71.9z"
						/>
						<path
							class="st0"
							d="M145.2 72.2c-0.3-0.1-5.5-1.4-15.8-3l-6.5-48.4c-0.3-2-1.8-3.5-3.7-3.9 -2-0.3-3.9 0.6-4.8 2.4C93.7 59.7 95.5 79.8 95.6 80.6c0.3 2.5 2.5 4.3 4.9 4 2.5-0.2 4.3-2.5 4.1-4.9 0-0.1-0.1-1.5 0.1-4.4 6.3 0.6 11.8 1.2 16.5 1.8l4 30c0.3 2.3 2.3 3.9 4.5 3.9 0.2 0 0.4 0 0.6 0 2.5-0.3 4.2-2.6 3.9-5.1l-3.7-27.4c8.1 1.3 12.2 2.4 12.2 2.4 0.4 0.1 0.8 0.2 1.2 0.2 2 0 3.8-1.3 4.4-3.4C149 75.3 147.6 72.8 145.2 72.2zM106.2 66.3c1.5-7 4.3-16.7 9.7-29.2l4.1 30.7C115.9 67.3 111.3 66.8 106.2 66.3z"
						/>
						<path
							class="st0"
							d="M200.6 38.6c-15.2-11.1-42.1-4-43.2-3.7 -2.2 0.6-3.6 2.7-3.3 5 0.2 1.6 0.5 3.3 0.7 5.1 -1.2-1.3-3-1.8-4.7-1.3 -2.4 0.8-3.7 3.3-3 5.7 0.1 0.4 12.4 39.5 16.4 59.9 -3 1-6.3 2-9.8 3 -2.4 0.6-3.9 3.1-3.2 5.5 0.5 2 2.4 3.4 4.4 3.4 0.4 0 0.8 0 1.2-0.2 3.3-0.9 6.4-1.8 9.4-2.8 1.5 2.2 4 2 4.3 1.9 1-0.1 3.9-0.9 3.8-5 22.4-9.5 36.7-24.1 40-41.4C216.3 59.9 211.3 46.4 200.6 38.6zM204.8 72c-1.3 7-7.1 22.5-32.3 33.8 -0.1-0.9-0.2-1.8-0.4-2.7 -1-7.2-2.3-16.7-3.7-26.2 -1.9-13.7-3.9-27.4-4.8-34 8.4-1.6 23.5-2.8 31.6 3.1C203.1 51.7 206.7 61.6 204.8 72z"
						/>
						<path
							class="st0"
							d="M231.5 43.7c-2.5-0.5-4.8 1.1-5.3 3.6 -0.5 2.4-11.7 59.6-12.9 74.9 -0.2 2.5 1.7 4.7 4.1 4.9 0.1 0 0.3 0 0.4 0 2.3 0 4.3-1.8 4.5-4.2 1.2-14.8 12.7-73.3 12.8-73.9C235.6 46.6 234 44.2 231.5 43.7z"
						/>
						<path
							class="st0"
							d="M271.5 49.2c-3.4-10.5-10.5-11.2-13.4-11 -14.1 1-16.9 23.7-17.7 31.2 -1 8.4-1.2 16.6-1.2 21.7 -1.5 1.8-1.4 4.4 0.2 6 0.4 2.2 2.4 3.8 4.6 3.7 0 0 0 0 0 0 2.8 1.6 5.3 2.2 7.5 2.2 3 0 5.5-1.1 7.1-2.1C270.9 93.5 276.5 64.5 271.5 49.2zM253.9 93.4c-0.8 0.5-2.5 1.6-5.6-0.5 -0.4-22.2 3.5-45.1 10.5-45.6 1.7-0.1 3.1 1.5 4.1 4.7C267 64.6 261.7 88.5 253.9 93.4z"
						/>
						<path
							class="st0"
							d="M230.6 25.9c-2.8 0.8-4.5 3.4-3.9 5.8 0.7 2.3 3.6 3.6 6.4 2.7 2.8-0.8 4.5-3.4 3.9-5.8C236.3 26.3 233.4 25.1 230.6 25.9z"
						/>
						<path
							d="M358.6 83.8l-3.6-1.5c-0.4-3.2-0.9-6.4-1.4-9.7 -2-13.9-3.8-25-5.5-33.1 -3.1-15.4-4.9-18.2-8.2-19.1 -2.1-0.6-4.2 0.2-5.5 2 -5.5 7.3-32.2 64-35.2 70.4 -1.1 2.3-0.1 5 2.2 6 2.3 1.1 5 0.1 6-2.2 2.9-6.2 6.3-13.3 9.7-20.5l29.6 12.5c1.4 10.6 2.8 21.7 4.1 32.5 0.3 2.3 2.2 4 4.5 4 0.2 0 0.4 0 0.5 0 2.5-0.3 4.3-2.5 4-5 0-0.2-1.4-12.2-3.4-27.6 0.2 0 0.3 0 0.5 0 1.8 0 3.4-1 4.2-2.8C362 87.5 360.9 84.8 358.6 83.8zM321.1 68c6.4-13.2 12.7-25.9 16.7-33.5 2.1 8.8 4.8 25 7.5 43.7L321.1 68z"
						/>
						<path
							d="M375.2 128.2c-2.5 0-4.5-2-4.5-4.4L368 17.3c-0.1-2.2 1.5-4.1 3.6-4.6 2.2-0.4 4.3 0.7 5.1 2.8 0.9 2.2 18 45.2 28 79.6 5.6-25.8 16.4-71.3 26.4-92.4 1.1-2.3 3.8-3.2 6-2.2 2.3 1.1 3.2 3.8 2.2 6 -13.6 28.8-29.5 108.4-29.6 109.2 -0.4 2.1-2.3 3.6-4.4 3.7 -2.1 0-4-1.5-4.5-3.6 -4.5-20.5-15.2-50.9-23.1-72.2l2.1 80c0.1 2.5-1.9 4.6-4.4 4.7C375.3 128.2 375.3 128.2 375.2 128.2z"
						/>
						<path
							d="M491.7 11.4c-2.2-1.2-5-0.3-6.1 1.9 -0.5 1-1.2 2.2-1.9 3.6 0 0 0 0 0 0 -0.4 0.7-0.8 1.5-1.2 2.3 -0.1 0.2-0.2 0.4-0.3 0.6 -0.2 0.1-0.4 0.2-0.6 0.3 -0.5 0.4-13.6 9-27.2 20.8 -18.9 16.3-29.2 30.3-30.7 41.5 -0.8 5.7 0.6 10.8 4.2 14.9 1.8 2.1 4.2 3.2 6.8 3.2 0.4 0 0.7 0 1.1-0.1 6.3-0.7 14.2-8.3 24.8-24.5 -7.1 14.4-14.7 26.7-22.7 36.7 -14.2 17.7-29.8 28.5-46.5 32.1 -18 3.9-37.1-0.4-56.8-12.7 -15-9.4-24.7-20.2-24.8-20.3 -1.7-1.9-4.5-2-6.4-0.4 -1.9 1.7-2 4.5-0.4 6.4 0.4 0.5 10.5 11.7 26.5 21.8 16.4 10.3 33.1 15.6 49.1 15.6 5 0 9.9-0.5 14.7-1.6 40.7-8.8 73.9-53.5 98.5-132.9 0.7-1.3 1.3-2.4 1.7-3.3C494.8 15.3 494 12.6 491.7 11.4zM434.9 91.5C434.8 91.5 434.8 91.5 434.9 91.5c-1.9-2.2-2.6-4.7-2.2-7.8 1.9-13.7 23.5-33.2 40.1-46 -4.7 8.6-10 18.2-15.5 26.9C441.6 89.9 435.7 91.4 434.9 91.5z"
						/>
						<path
							d="M476.4 106.2c-0.4 0-0.9-0.1-1.3-0.2 -2.3-0.7-3.7-3-3.1-5.4 0.1-0.5 2.3-9.9 8.3-22.1 6.1-16 12.6-32.8 12.7-33 0.9-2.3 3.5-3.5 5.9-2.6 2.1 0.8 3.3 3 2.8 5.2 12.2-12.3 27-20.5 43.4-24.2 2.5-0.5 4.9 1 5.4 3.4 0.5 2.4-1 4.9-3.4 5.4C514.7 40 497 64.9 488.3 83c-2.9 7.7-5.7 15.1-7.6 20.3C480 105 478.2 106.2 476.4 106.2z"
						/>
						<path
							d="M521.1 99.3c-0.7 0-1.4 0-2-0.1 -7.7-0.8-12.9-5.9-14.5-14.4 -3.2-16.7 15.5-32 32.5-40 6.6-3.1 22.6-9.7 28.2-3 1.8 2.1 3 6-1.5 12.2 -14.6 20.1-41.7 22.7-49.7 23 -0.6 2-0.9 4-0.5 6.1 1.1 5.9 4.1 6.9 6.5 7.1 12.7 1.3 36.2-17.9 39.6-26 1-2.3 3.6-3.4 5.9-2.5 2.3 1 3.4 3.6 2.5 5.9C563.6 78.1 538.8 99.3 521.1 99.3zM556.8 47.8c-5.9 0.4-20.8 5.7-32.6 15.6 -1.2 1-2.6 2.3-4 3.8 10-1.4 26.6-5.7 36.1-18.7C556.5 48.3 556.6 48.1 556.8 47.8z"
						/>
						<path
							d="M536.6 127.8c-0.9 0-1.9-0.3-2.7-0.9 -1.9-1.4-2.4-3.9-1.3-5.9 0.5-0.8 5.9-10.1 18.9-20.3 22.7-23.6 47.8-48.5 60.6-61 -10.6 1-18.2 3.4-23 5.5 -7 3-10 6.1-10 6.1 -1.7 1.8-4.6 1.8-6.4 0.1 -1.8-1.7-1.9-4.6-0.2-6.4 0.6-0.6 14.5-14.9 50.4-14.9 0.3 0 0.6 0 1 0 1.8 0 3.5 1.1 4.2 2.8 0.7 1.7 0.3 3.7-1.1 4.9 -0.3 0.3-22.3 21.6-47 46.5 11.8-4.7 26.1-8.5 43.4-10 2.5-0.2 4.7 1.6 4.9 4.1 0.2 2.5-1.6 4.7-4.1 4.9 -32.7 3-54.1 14.3-67.1 24.5 -6.1 6.3-11.9 12.5-17.3 18.4C539 127.3 537.8 127.8 536.6 127.8z"
						/>
						<path
							d="M637 83.2c-2.2 0-4.2-1.7-4.5-4 -0.9-6.6 1.6-15.8 7.2-27.3 4-8.2 8.2-14.6 8.4-14.9 1.4-2.1 4.2-2.7 6.3-1.3 2.1 1.4 2.7 4.2 1.3 6.3 -4.4 6.7-15.5 26.1-14.2 36 0.3 2.5-1.4 4.8-3.9 5.1C637.4 83.2 637.2 83.2 637 83.2z"
						/>
						<path
							class="st0"
							d="M663.9 20.7c-0.8-1.5-3.7-2.1-7.1-1 -3.4 1.1-3.8 4-2.9 6.9 1 2.9 3.3 2.9 6.7 1.8C663.9 27.4 665.6 23.9 663.9 20.7z"
						/>
					</svg>
					Archive
				</button>
				<button
					class="mt-1 cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('angrezi-archive')}
				>
					(2025)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="relative m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('rayarray')}
					aria-label="View RAYARRAY project details"
				>
					{#each rayarrayImages as image, index}
						<enhanced:img
							src={image}
							alt="RAYARRAY preview"
							class="h-auto w-full bg-gray-300 {index === currentRayarrayImageIndex
								? 'opacity-100'
								: 'opacity-0'} {index === 0 ? 'relative' : 'absolute inset-0'}"
						/>
					{/each}
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('rayarray')}
				>
					RAYARRAY (2023)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('feedback-cube')}
					aria-label="View feedback_cube project details"
				>
					<enhanced:img
						src={FeedbackCubePreview}
						alt="feedback_cube preview"
						class="h-auto w-full bg-gray-300"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('feedback-cube')}
				>
					feedback_cube (2022)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('ein-hauch-von-tull-v2')}
					aria-label="View Ein Hauch von Tüll v2 project details"
				>
					<enhanced:img
						src={Tull2_3Preview}
						alt="Ein Hauch Von Tuell v2 preview"
						class="h-auto w-full bg-gray-300"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('ein-hauch-von-tull-v2')}
				>
					Ein Hauch von Tüll v2 (2022)
				</button>
			</div>
			<div class="mb-1">
				<!-- mobile: show static image -->
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80 xl:hidden"
					onclick={() => navigateToWork('untiled')}
					aria-label="View untiled project details"
				>
					<enhanced:img
						src={UntiledPreview}
						alt="untiled preview"
						class="h-auto w-full bg-gray-300"
					/>
				</button>
				<!-- desktop: show p5 sketch -->
				<button
					id="untiled-preview-container"
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 max-xl:hidden"
					style="height: 150px; width: 100%; box-sizing: border-box;"
					aria-label="View untiled project details"
					onclick={() => navigateToWork('untiled')}
				></button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('untiled')}
				>
					untiled (2022)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="relative m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('ein-hauch-von-tull')}
					aria-label="View Ein Hauch von Tüll project details"
				>
					{#each tullImages as image, index}
						<enhanced:img
							src={image}
							alt="Ein Hauch Von Tuell preview"
							class="h-auto w-full bg-gray-300 {index === currentTullImageIndex
								? 'opacity-100'
								: 'opacity-0'} {index === 0 ? 'relative' : 'absolute inset-0'}"
						/>
					{/each}
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('ein-hauch-von-tull')}
				>
					Ein Hauch von Tüll (2021)
				</button>
			</div>
			<div class="mb-1">
				<!-- stick out from container -->
				<button
					class="m-0 block w-full cursor-pointer overflow-visible border-1 bg-transparent p-0"
					onclick={() => navigateToWork('available-rooms')}
					aria-label="View available.rooms project details"
				>
					<enhanced:img
						src={RoomsCutoffTransparent}
						alt="available.rooms preview"
						class="h-auto w-full transition-opacity duration-300 hover:opacity-80"
						style="transform: scale(1.03) translateX(.6%) translateY(.3%); transform-origin: bottom left; margin-top: -3vh;"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('available-rooms')}
				>
					available.rooms (2021)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('blob')}
					aria-label="View blob project details"
				>
					<enhanced:img src={BlobPreview} alt="blob preview" class="h-auto w-full bg-gray-300" />
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('blob')}
				>
					blob (2020)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('break-the-pattern')}
					aria-label="View Break the Pattern project details"
				>
					<enhanced:img
						src={BreakThePattern1}
						alt="Break the Pattern preview"
						class="h-auto w-full bg-gray-300"
					/>
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('break-the-pattern')}
				>
					Break the Pattern (2019)
				</button>
			</div>
			<div class="mb-1">
				<button
					class="m-0 block w-full cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
					onclick={() => navigateToWork('image-blender')}
					aria-label="View Image Blender project details"
				>
					<img src={ImageBlender1} alt="image_blender preview" class="h-auto w-full bg-gray-300" />
				</button>
				<button
					class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
					onclick={() => navigateToWork('image-blender')}
				>
					image blender (2017)
				</button>
			</div>

			<!-- spacer -->
			<div class="h-12 md:h-5"></div>
		</section>

		<!-- right 2/3 - detail section -->
		<section
			class="relative z-10 overflow-y-auto text-left {showMobileDetail
				? 'h-fit min-h-full w-full pt-16'
				: 'max-xl:hidden'} xl:h-full xl:w-2/3 xl:pl-5"
		>
			{@render children()}
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
</style>
