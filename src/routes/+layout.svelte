<script>
	import '../app.css';
	import { browser } from '$app/environment';

	let { children } = $props();

	// force remount on breakpoint changes by changing remountKey, in order for p5 sketches to remain after breakpoint change
	let remountKey = $state(0);
	let currentBreakpoint = $state(
		browser ? (window.innerWidth >= 1000 ? 'desktop' : 'mobile') : 'desktop'
	);
	if (browser) {
		const handleResize = () => {
			const newBreakpoint = window.innerWidth >= 1000 ? 'desktop' : 'mobile';
			if (newBreakpoint !== currentBreakpoint) {
				currentBreakpoint = newBreakpoint;
				// small delay to let any pending image requests complete
				setTimeout(() => {
					remountKey++; // force remount by changing remountKey
				}, 100);
			}
		};

		window.addEventListener('resize', handleResize);
	}
</script>

{#key remountKey}
	{@render children()}
{/key}
