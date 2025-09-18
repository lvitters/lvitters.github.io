<script lang="ts">
	import { mobile } from '$lib/utils/mobile.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// on desktop (lg and above), redirect to /works/rauschen for consistency
		if (!mobile.current) {
			goto('/works/rauschen', { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>selected works</title>
	<meta name="robots" content="noindex" />
	<!-- <meta name="description" content="" /> -->
</svelte:head>
