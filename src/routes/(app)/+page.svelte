<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let isMobile = $state(browser ? window.innerWidth < 768 : false);
	let pageVisible = $state(false);
	let isLoaded = false;
	
	const loadSketch = async () => {
		if (!browser || isLoaded) return;
		
		isLoaded = true;
		
		// Load p5.js if not already loaded
		if (!window.p5) {
			await new Promise((resolve) => {
				const script = document.createElement('script');
				script.src = '/libs/p5_v0.10.2.min.js';
				script.onload = resolve;
				document.head.appendChild(script);
			});
		}

		// Load the blob sketch script
		await new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = '/sketches/blob/blob.js';
			script.onload = resolve;
			document.head.appendChild(script);
		});
	};
	
	$effect(() => {
		if (browser) {
			const checkMobile = () => {
				isMobile = window.innerWidth < 768;
			};
			// Don't call checkMobile() here since we already initialized above
			
			// small delay to ensure smooth transition
			setTimeout(() => {
				pageVisible = true;
			}, 100);
			
			window.addEventListener('resize', checkMobile);
			
			return () => {
				window.removeEventListener('resize', checkMobile);
			};
		}
	});

	onMount(() => {
		loadSketch();
	});
</script>

<svelte:head>
	<title>Lucca Vitters</title>
</svelte:head>

<!-- wrap content in a transition container -->
<div
	class="transition-all duration-700 ease-out {pageVisible
		? 'translate-y-0 opacity-100'
		: 'translate-y-4 opacity-0'}"
>
	{#if isMobile}
		<!-- mobile layout - centered p5 sketch -->
		<main class="relative flex h-screen w-full items-center justify-center overflow-hidden">
			<div id="blob-container" class="h-full w-full"></div>
		</main>
	{:else}
		<!-- desktop layout - left/right sections -->
		<main class="relative flex h-screen w-full overflow-hidden">
			<!-- left 1/3 -->
			<section class="h-full w-1/3"></section>

			<!-- right 2/3 -->
			<section class="h-full w-2/3">
				<div id="blob-container" class="h-full w-full"></div>
			</section>
		</main>
	{/if}
</div>
