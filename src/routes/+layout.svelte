<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import { preloadCriticalResources, hasPreloaded } from '$lib/stores/loading';
	
	let { children } = $props();
	
	onMount(() => {
		if (browser && !$hasPreloaded) {
			preloadCriticalResources();
		}
	});
</script>

<LoadingScreen />
{@render children()}
