<script lang="ts">
	let slideIndex = [1, 1];

	// photo slideshow images
	const photoSlides = [
		'/media/BreakThePattern/BreakThePattern_1.jpg',
		'/media/BreakThePattern/BreakThePattern_2.jpg',
		'/media/BreakThePattern/BreakThePattern_3.jpg',
		'/media/BreakThePattern/BreakThePattern_4.jpg',
		'/media/BreakThePattern/BreakThePattern_5.jpg',
		'/media/BreakThePattern/BreakThePattern_6.jpg',
		'/media/BreakThePattern/BreakThePattern_7.jpg'
	];

	// screenshot slideshow images
	const designSlides = [
		'/media/BreakThePattern/BreakThePattern_screenshot_1.png',
		'/media/BreakThePattern/BreakThePattern_screenshot_2.png',
		'/media/BreakThePattern/BreakThePattern_screenshot_3.png',
		'/media/BreakThePattern/BreakThePattern_screenshot_4.png',
		'/media/BreakThePattern/BreakThePattern_screenshot_5.png',
		'/media/BreakThePattern/BreakThePattern_screenshot_6.png'
	];

	// slide through show
	function plusSlides(n: number, carouselIndex: number): void {
		const maxSlides = carouselIndex === 0 ? photoSlides.length : designSlides.length;
		slideIndex[carouselIndex] += n;

		if (slideIndex[carouselIndex] > maxSlides) {
			slideIndex[carouselIndex] = 1;
		}
		if (slideIndex[carouselIndex] < 1) {
			slideIndex[carouselIndex] = maxSlides;
		}
	}
</script>

<svelte:head>
	<meta name="description" content="Break the Pattern" />
</svelte:head>

<main class="font-consolas m-0 min-h-screen bg-[rgb(80,0,0)] px-7 pt-12 pb-5 text-white">
	<article class="px-5">
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-2xl font-normal">Break the Pattern</h1>
				<div class="mt-1 text-sm text-white">
					<time class="text-sm">2019</time>
					<span> | Processing | interactive installation</span>
				</div>
			</div>
		</div>

		<div class="text-2xs">
			<p class="mb-1 text-center">
				Made for <a
					href="https://markenfilm-space.de/portfolio/break-the-pattern/"
					class="text-white underline hover:text-[rgb(0,80,0)]">Markenfilm SPACE</a
				>.
			</p>

			<div class="my-5"></div>

			<p>
				As a project for a three month internship, Break the Pattern was created for
				<a href="https://www.mobiliar.ch/" class="text-white underline hover:text-blue-500"
					>die Mobiliar</a
				>
				in Switzerland. On several
				<a
					href="https://baernerbaer.ch/people/meine-tochter-ist-mit-mehlwurmbrei-aufgewachsen/"
					class="text-white underline hover:text-blue-500">events</a
				> across the country, Break the Pattern enabled visitors to experience the event's motto "08:15
				- Zeit für Musterbrecher" as an interactive digital installation. On a 5x2m LED wall, a Processing
				application created a dynamic image with randomness and noise picking up on the event's visual
				theme. In a set corridor in front of the installation, visitors were picked up by a depth camera.
				Their silhouettes would then be mirrored in the displayed patterns.
			</p>

			<div class="my-5"></div>

			<!-- video -->
			<div class="my-5">
				<div class="relative h-0 overflow-hidden" style="padding-bottom: 56.25%;">
					<iframe
						src="https://2024.markenfilm-space.de/wp-content/uploads/2024/09/190409_0850_Edit2.mp4"
						class="absolute top-0 left-0 h-full w-full border-0"
						title="Break the Pattern Video"
						allowfullscreen
					></iframe>
				</div>
			</div>

			<div class="my-5"></div>

			<!-- photo Carousel -->
			<div class="m-0 p-0">
				<div class="relative">
					<!-- slides -->
					{#each photoSlides as slide, index}
						<div class="slide" class:hidden={slideIndex[0] !== index + 1}>
							<div class="bg-opacity-50 absolute top-2 left-2 bg-black px-2 py-1 text-xs">
								{index + 1} / {photoSlides.length}
							</div>
							<img src={slide} alt="Break the Pattern Installation" class="block w-full" />
						</div>
					{/each}

					<!-- navigation buttons -->
					<button
						class="prev absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer px-4 py-3 text-2xl text-white hover:text-blue-500"
						on:click={() => plusSlides(-1, 0)}
					>
						{'<'}
					</button>
					<button
						class="next absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer px-4 py-3 text-2xl text-white hover:text-blue-500"
						on:click={() => plusSlides(1, 0)}
					>
						{'>'}
					</button>
				</div>
			</div>

			<div class="my-5"></div>

			<!-- screenshot carousel -->
			<div class="m-0 p-0">
				<div class="relative">
					<!-- slides -->
					{#each designSlides as slide, index}
						<div class="slide" class:hidden={slideIndex[1] !== index + 1}>
							<div class="bg-opacity-50 absolute top-2 left-2 bg-black px-2 py-1 text-xs">
								{index + 1} / {designSlides.length}
							</div>
							<img src={slide} alt="Break the Pattern Design" class="block w-full" />
						</div>
					{/each}

					<!-- navigation buttons -->
					<button
						class="prev absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer px-4 py-3 text-2xl text-white hover:text-blue-500"
						on:click={() => plusSlides(-1, 1)}
					>
						{'<'}
					</button>
					<button
						class="next absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer px-4 py-3 text-2xl text-white hover:text-blue-500"
						on:click={() => plusSlides(1, 1)}
					>
						{'>'}
					</button>
				</div>
			</div>
		</div>
	</article>
</main>

<style>
	.slide {
		position: relative;
	}

	.hidden {
		display: none;
	}
</style>
