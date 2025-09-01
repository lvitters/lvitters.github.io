<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { mobile } from '$lib/utils/mobile.svelte';

	interface Props {
		centered?: boolean;
	}

	let { centered = false }: Props = $props();

	// Use global mobile state - automatically reactive!
	let isInDetailView = $state(false);
	let isVisible = $state(false);

	// listen for detail view state changes from works page
	$effect(() => {
		if (browser) {
			const handleDetailViewChange = (event: Event) => {
				const customEvent = event as CustomEvent;
				isInDetailView = customEvent.detail.showDetailView && customEvent.detail.isMobile;
			};

			window.addEventListener('detailViewChange', handleDetailViewChange);

			return () => {
				window.removeEventListener('detailViewChange', handleDetailViewChange);
			};
		}
	});

	// reset detail view when not on works page
	$effect(() => {
		if (page.url.pathname !== '/works') {
			isInDetailView = false;
		}
	});

	// function to go back to overview
	function goBackToOverview() {
		window.dispatchEvent(new CustomEvent('goBackToOverview'));
	}

	$effect(() => {
		if (browser) {
			// Show nav after layout is set
			setTimeout(() => {
				isVisible = true;
			}, 10);
		}
	});

	// determine if we should use mobile centering or desktop left-column centering
	let shouldCenterOnScreen = $derived(
		mobile.current || page.url.pathname === '/rooms' || page.url.pathname === '/untiled'
	);
	
	// nav-specific breakpoint for smaller text (1200px)
	let isNarrowScreen = $state(browser ? window.innerWidth < 1200 : false);
	
	$effect(() => {
		if (browser) {
			const updateNarrowScreen = () => {
				isNarrowScreen = window.innerWidth < 1200;
			};
			
			window.addEventListener('resize', updateNarrowScreen);
			updateNarrowScreen(); // Set initial value
			
			return () => {
				window.removeEventListener('resize', updateNarrowScreen);
			};
		}
	});
</script>

<nav
	class={`font-consolas absolute z-50 flex rounded-md border border-white/30 bg-white/30 px-2 pt-0.5 backdrop-blur-sm ${
		isNarrowScreen ? 'text-[14px]' : 'text-[17px]'
	} ${
		isNarrowScreen ? '' : 'whitespace-nowrap'
	} ${
		!mobile.current ? 'transition-all duration-500 ease-in-out' : ''
	} ${
		centered && !mobile.current
			? 'top-1/2 -translate-y-1/2 flex-col items-start justify-center'
			: 'top-8 flex-row items-center'
	} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
	style={shouldCenterOnScreen
		? 'left: 50%; transform: translateX(-50%);'
		: 'left: calc((33.33vw - 32px - 16px) / 2 + 32px); transform: translateX(-50%);'}
	ontouchstart={(e) => e.stopPropagation()}
>
	<div class="flex items-center space-x-2">
		<a
			href="/"
			class="cursor-pointer underline transition-colors {page.url.pathname === '/'
				? 'text-[rgb(0,0,255)]'
				: 'text-black hover:text-[rgb(0,0,255)]'}"
		>
			Lucca Vitters
		</a>
		{#if page.url.pathname === '/works' && isInDetailView}
			<button
				onclick={goBackToOverview}
				class="ml-4 cursor-pointer text-[rgb(0,0,255)] underline transition-colors"
			>
				{isNarrowScreen ? '← works' : '← selected works'}
			</button>
		{:else if page.url.pathname === '/rooms' || page.url.pathname === '/untiled'}
			<a href="/works" class="ml-4 cursor-pointer text-[rgb(0,0,255)] underline transition-colors">
				{isNarrowScreen ? '← works' : '← selected works'}
			</a>
		{:else}
			<a
				href="/works"
				class="cursor-pointer underline transition-colors {page.url.pathname === '/works'
					? 'text-[rgb(0,0,255)]'
					: 'text-black hover:text-[rgb(0,0,255)]'} ml-4"
			>
				{isNarrowScreen ? 'works' : 'selected works'}
			</a>
		{/if}
		<div class="mx-2">|</div>
		<a
			href="/about"
			class="cursor-pointer underline transition-colors {page.url.pathname === '/about'
				? 'text-[rgb(0,0,255)]'
				: 'text-black hover:text-[rgb(0,0,255)]'}"
		>
			about
		</a>
	</div>
</nav>
