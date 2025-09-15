<script>
	import Tull1 from '$lib/assets/media/einHauchVonTull/tull_1.jpg?enhanced';
	import Tull2 from '$lib/assets/media/einHauchVonTull/tull_2.jpg?enhanced';
	import Tull4 from '$lib/assets/media/einHauchVonTull/tull_4.jpg?enhanced';
	import Tull5 from '$lib/assets/media/einHauchVonTull/tull_5.jpg?enhanced';
	import Tull6 from '$lib/assets/media/einHauchVonTull/tull_6.jpg?enhanced';
	import Tull7 from '$lib/assets/media/einHauchVonTull/tull_7.jpg?enhanced';
	import Tull8 from '$lib/assets/media/einHauchVonTull/tull_8.jpg?enhanced';
	import Tull9 from '$lib/assets/media/einHauchVonTull/tull_9.jpg?enhanced';
</script>

<svelte:head>
	<title>Ein Hauch von Tüll</title>
	<meta name="description" content="A holographic light installation made from tull." />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-[rgb(0,40,0)] px-6 pt-12 pb-5 text-white">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-normal">Ein Hauch Von Tüll</h1>
				<div class="mt-1 text-xl text-white">
					<time class="text-xl">2021</time>
					<span> | @ Fusion festival | light installation | live performance</span>
				</div>
			</div>
		</div>

		<p class="mb-1 text-center">
			in collaboration with <a
				href="https://jcluq.art"
				class="text-white underline hover:text-[rgb(100,149,237)]">jcluq</a
			>
		</p>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull7} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull4} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull1} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-4"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull8} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull6} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull2} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull9} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<enhanced:img src={Tull5} alt="Ein Hauch Von Tüll" class="block w-full" loading="lazy" />
		</figure>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>
