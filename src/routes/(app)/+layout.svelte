<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();

	let centered = $derived(page.url.pathname === '/' || page.url.pathname === '/about');
</script>

<Nav {centered} />

{@render children()}
