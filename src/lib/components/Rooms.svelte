<script lang="ts">
</script>

<svelte:head>
	<meta name="description" content="rooms" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-white px-6 pt-12 pb-5 text-black">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">available.rooms</h1>
				<div class="mt-1 text-xl">
					<time class="text-xl">2021</time>
					<span> | p5.js | Python</span>
				</div>
			</div>
		</div>

		<p class="mb-1 text-center">
			<a href="/rooms" class="text-[rgb(0,0,255)] underline hover:text-[rgb(255,0,0)]">Enter here</a
			>
			(drag to move camera | scroll/pinch to zoom)
		</p>

		<div class="my-5"></div>

		<p class="mb-4">
			available.rooms scraped WG-Gesucht.de for all available rooms in shared flats for the 11 most
			populous German cities. It displays the snapshot from 2021 according to their relative size
			and price per m².
		</p>

		<div class="my-5"></div>

		<figure class="mx-0 my-10">
			<img src="/media/rooms/rooms_full.png" alt="rooms" class="block w-full md:mx-auto md:w-3/4" />
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
