<script lang="ts">
	import { onMount } from 'svelte';

	let pageVisible = false;

	onMount(() => {
		// small delay to ensure smooth transition
		setTimeout(() => {
			pageVisible = true;
		}, 50);
	});
</script>

<svelte:head>
	<title>Lucca Vitters</title>
</svelte:head>

<main class="font-consolas relative flex h-screen w-screen overflow-hidden pt-20 text-[10px]">
	<!-- wrap content in a transition container -->
	<div
		class="flex h-full w-full transition-all duration-700 ease-out {pageVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<!-- left 1/3 -->
		<section class="h-full w-1/3 pl-13 text-left">
			<div>RAUSCHEN (2025)</div>
			<div>Radio Angrezi Archive (2025)</div>
			<div>RAYARRAY (2023)</div>
			<div>feedback_cube (2022)</div>
			<div>Ein Hauch von Tüll v2 (2022)</div>
			<div>untiled (2022)</div>
			<div>Ein Hauch von Tüll (2021)</div>
			<div>available.rooms (2021)</div>
			<div>blob (2020)</div>
			<div>Break the Pattern (2019)</div>
			<div>Image Blender (2017)</div>
		</section>

		<!-- right 2/3 -->
		<section class="h-full w-2/3 pl-13 text-left">
			<div>RAUSCHEN (2025)</div>
			<div>Radio Angrezi Archive (2025)</div>
			<div>RAYARRAY (2023)</div>
			<div>feedback_cube (2022)</div>
			<div>Ein Hauch von Tüll v2 (2022)</div>
			<div>untiled (2022)</div>
			<div>Ein Hauch von Tüll (2021)</div>
			<div>available.rooms (2021)</div>
			<div>blob (2020)</div>
			<div>Break the Pattern (2019)</div>
			<div>Image Blender (2017)</div>
		</section>
	</div>
</main>
