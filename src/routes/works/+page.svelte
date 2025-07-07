<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	// add class to body for this page to remove scrollbar
	$effect(() => {
		document.documentElement.className += ' overflow-hidden h-screen w-screen';
		document.body.className += ' overflow-hidden h-screen w-screen';

		return () => {
			document.documentElement.className = document.documentElement.className.replace(
				' overflow-hidden h-screen w-screen',
				''
			);
			document.body.className = document.body.className.replace(
				' overflow-hidden h-screen w-screen',
				''
			);
		};
	});
</script>

<svelte:head>
	<title>Lucca Vitters</title>
</svelte:head>

<main class="relative h-screen w-screen">
	<!-- <Nav /> -->
	<!-- sketch canvas -->
</main>
