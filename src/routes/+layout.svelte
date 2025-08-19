<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import { preloadCriticalResources } from '$lib/stores/loading';
	
	let { children } = $props();
	
	onMount(() => {
		if (browser) {
			preloadCriticalResources();
		}
	});
</script>

<LoadingScreen />
{@render children()}
