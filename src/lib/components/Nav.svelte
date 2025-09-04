<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	// what is this syntax?
	interface Props {
		centered?: boolean;
	}
	let { centered = false }: Props = $props();

	// use global mobile state - automatically reactive!
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
		if (!page.url.pathname.startsWith('/works')) {
			isInDetailView = false;
		}
	});

	// show nav after layout is set
	$effect(() => {
		if (browser) {
			setTimeout(() => {
				isVisible = true;
			}, 10);
		}
	});

	// determine if we should center on special sketch pages
	let isSketchPage = $derived(
		page.url.pathname === '/available-rooms-sketch' || page.url.pathname === '/untiled-sketch'
	);
</script>

<!-- using tailwind xl breakpoint (1280px) for text sizing -->
<nav
	class={`font-consolas absolute z-50 flex rounded-md border border-white/30 bg-white/30 px-2 pt-0.5 text-[14px] whitespace-nowrap backdrop-blur-sm lg:transition-all lg:duration-500 lg:ease-in-out xl:text-[17px] ${
		centered
			? 'max-lg:top-8 max-lg:flex-row max-lg:items-center lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:items-start lg:justify-center'
			: 'top-8 flex-row items-center'
	} ${isVisible ? 'opacity-100' : 'opacity-0'} ${
		isSketchPage
			? 'left-1/2 -translate-x-1/2'
			: 'max-lg:left-1/2 max-lg:-translate-x-1/2 lg:[left:calc((33.33vw-32px-16px)/2+32px)] lg:[transform:translateX(-50%)]'
	}`}
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
		{#if page.url.pathname.startsWith('/works') && isInDetailView}
			<a href="/works" class="ml-4 cursor-pointer text-[rgb(0,0,255)] underline transition-colors">
				← selected works
			</a>
		{:else if page.url.pathname === '/available-rooms-sketch'}
			<a
				href="/works/available-rooms"
				class="ml-4 cursor-pointer text-[rgb(0,0,255)] underline transition-colors"
			>
				← selected works
			</a>
		{:else if page.url.pathname === '/untiled-sketch'}
			<a
				href="/works/untiled"
				class="ml-4 cursor-pointer text-[rgb(0,0,255)] underline transition-colors"
			>
				← selected works
			</a>
		{:else}
			<a
				href="/works"
				class="ml-4 cursor-pointer underline transition-colors {page.url.pathname.startsWith(
					'/works'
				)
					? 'text-[rgb(0,0,255)]'
					: 'text-black hover:text-[rgb(0,0,255)]'} "
			>
				selected works
			</a>
		{/if}
		<div class="mx-0">|</div>
		<a
			href="/about"
			class="ml-2 cursor-pointer underline transition-colors {page.url.pathname === '/about'
				? 'text-[rgb(0,0,255)]'
				: 'text-black hover:text-[rgb(0,0,255)]'}"
		>
			about
		</a>
	</div>
</nav>
