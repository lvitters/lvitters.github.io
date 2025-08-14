<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	interface Props {
		centered?: boolean;
	}

	let { centered = false }: Props = $props();
	
	// detect mobile - initialize correctly to prevent position flash
	let isMobile = $state(browser ? window.innerWidth < 768 : false);
	let isInDetailView = $state(false);
	let isVisible = $state(false);
	
	// listen for detail view state changes from works page
	$effect(() => {
		if (browser) {
			const handleDetailViewChange = (event: CustomEvent) => {
				isInDetailView = event.detail.showDetailView && event.detail.isMobile;
			};
			
			window.addEventListener('detailViewChange', handleDetailViewChange);
			
			return () => {
				window.removeEventListener('detailViewChange', handleDetailViewChange);
			};
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
			
			const checkMobile = () => {
				isMobile = window.innerWidth < 768;
			};
			// Don't call checkMobile() here since we already initialized above
			window.addEventListener('resize', checkMobile);
			
			return () => {
				window.removeEventListener('resize', checkMobile);
			};
		}
	});
	
	// determine if we should use mobile centering or desktop left-column centering
	let shouldCenterOnScreen = $derived(isMobile || page.url.pathname === '/rooms');
</script>

<nav
	class={`font-consolas absolute z-50 flex rounded-md border border-white/20 bg-white/20 px-2 pt-0.5 backdrop-blur-sm text-[10px] whitespace-nowrap ${
		!isMobile ? 'transition-all duration-500 ease-in-out' : ''
	} ${
		centered && !isMobile
			? 'top-1/2 -translate-y-1/2 flex-col items-start justify-center'
			: 'top-8 flex-row items-center'
	} ${
		isVisible ? 'opacity-100' : 'opacity-0'
	}`}
	style={shouldCenterOnScreen ? 'left: 50%; transform: translateX(-50%);' : 'left: calc(33.33vw / 2); transform: translateX(-50%);'}
>
	<div class="flex items-center space-x-2">
		<a 
			href="/" 
			class="cursor-pointer underline transition-colors {page.url.pathname === '/' ? 'text-[rgb(0,0,255)]' : 'text-black hover:text-[rgb(0,0,255)]'}"
		>
			Lucca Vitters
		</a>
		{#if page.url.pathname === '/works' && isInDetailView}
			<button
				onclick={goBackToOverview}
				class="cursor-pointer underline transition-colors text-[rgb(0,0,255)] ml-4"
			>
				← selected works
			</button>
		{:else}
			<a
				href="/works"
				class="cursor-pointer underline transition-colors {page.url.pathname === '/works' ? 'text-[rgb(0,0,255)]' : 'text-black hover:text-[rgb(0,0,255)]'} ml-4"
			>
				selected works
			</a>
		{/if}
		<div class="mx-2">|</div>
		<a
			href="/about"
			class="cursor-pointer underline transition-colors {page.url.pathname === '/about' ? 'text-[rgb(0,0,255)]' : 'text-black hover:text-[rgb(0,0,255)]'}"
		>
			about
		</a>
	</div>
</nav>
