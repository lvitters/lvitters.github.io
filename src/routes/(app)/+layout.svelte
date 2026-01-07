<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import { fade } from 'svelte/transition';

	let { children } = $props();

	let centered = $derived(page.url.pathname === '/' || page.url.pathname === '/about');
</script>

<Nav {centered} />

<!-- slight fade animation on route changes -->
{#key page.url.pathname}
	<div class="absolute inset-0 h-full w-full">
		{@render children()}
	</div>
{/key}
