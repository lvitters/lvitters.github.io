<script lang="ts">
	import { mobile } from '$lib/utils/mobile.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// on desktop, if someone lands on /works, redirect to /works/rauschen for consistency
		// this preserves the URL structure while showing the same content
		if (!mobile.current) {
			goto('/works/rauschen', { replaceState: true });
		}
	});
</script>
