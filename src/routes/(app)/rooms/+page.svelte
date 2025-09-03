<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/rooms/sketch', { replaceState: true });
	});
</script>

<!-- Redirect to sketch page -->
<div class="flex h-screen items-center justify-center">
	<p>Loading sketch...</p>
</div>