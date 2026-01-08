<script lang="ts">
	import BreakThePatternVideo from '$lib/assets/media/BreakThePattern/BreakThePattern_Markenfilm_reel.webm';
	import BreakThePatternVideoMP4 from '$lib/assets/media/BreakThePattern/BreakThePattern_Markenfilm_reel.mp4';
	import BreakThePattern1 from '$lib/assets/media/BreakThePattern/BreakThePattern_1.jpg?enhanced';
	import BreakThePattern2 from '$lib/assets/media/BreakThePattern/BreakThePattern_2.jpg?enhanced';
	import BreakThePattern3 from '$lib/assets/media/BreakThePattern/BreakThePattern_3.jpg?enhanced';
	import BreakThePattern4 from '$lib/assets/media/BreakThePattern/BreakThePattern_4.jpg?enhanced';
	import BreakThePattern5 from '$lib/assets/media/BreakThePattern/BreakThePattern_5.jpg?enhanced';
	import BreakThePattern6 from '$lib/assets/media/BreakThePattern/BreakThePattern_6.jpg?enhanced';
	import BreakThePattern7 from '$lib/assets/media/BreakThePattern/BreakThePattern_7.jpg?enhanced';
	import BreakThePatternScreenshot1 from '$lib/assets/media/BreakThePattern/BreakThePattern_screenshot_1.png?enhanced';
	import BreakThePatternScreenshot2 from '$lib/assets/media/BreakThePattern/BreakThePattern_screenshot_2.png?enhanced';
	import BreakThePatternScreenshot3 from '$lib/assets/media/BreakThePattern/BreakThePattern_screenshot_3.png?enhanced';
	import BreakThePatternScreenshot4 from '$lib/assets/media/BreakThePattern/BreakThePattern_screenshot_4.png?enhanced';
	import BreakThePatternScreenshot5 from '$lib/assets/media/BreakThePattern/BreakThePattern_screenshot_5.png?enhanced';
	import BreakThePatternScreenshot6 from '$lib/assets/media/BreakThePattern/BreakThePattern_screenshot_6.png?enhanced';

	let slideIndex = [1, 1];

	// photo slideshow images
	const photoSlides = [
		BreakThePattern1,
		BreakThePattern2,
		BreakThePattern3,
		BreakThePattern4,
		BreakThePattern5,
		BreakThePattern6,
		BreakThePattern7
	];

	// screenshot slideshow images
	const designSlides = [
		BreakThePatternScreenshot1,
		BreakThePatternScreenshot2,
		BreakThePatternScreenshot3,
		BreakThePatternScreenshot4,
		BreakThePatternScreenshot5,
		BreakThePatternScreenshot6
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
	<title>Break the Pattern</title>
	<meta
		name="description"
		content="Break the Pattern was an interactive digital installation enabling visitors to experience the event's '08:15
			- Zeit für Musterbrecher' motto."
	/>
</svelte:head>

<main class="m-0 min-h-screen bg-[rgb(80,0,0)] px-4 pt-6 pb-5 text-white md:px-10 md:pt-12">
	<article>
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-bold">Break the Pattern</h1>
				<div class="mt-1 text-xl font-medium text-white">
					<time>2019</time>
					<span> | Processing | interactive installation</span>
				</div>
			</div>
		</div>

		<p class="mb-1 text-center">
			Made for <a
				href="https://markenfilm-space.de/portfolio/break-the-pattern/"
				class="text-white underline hover:text-[rgb(0,80,0)]">Markenfilm SPACE</a
			>.
		</p>

		<div class="my-5"></div>

		<p>
			As a project for a three month internship, Break the Pattern was created for 'die Mobiliar' in
			Switzerland. On several events across the country, Break the Pattern enabled visitors to
			experience the event's motto "08:15 - Zeit für Musterbrecher" as an interactive installation.
			On a 5x2m LED wall, a Processing application created a dynamic image using randomness and
			noise picking up on the event's visual theme. In a corridor in front of the installation,
			visitors were picked up by a depth camera, where their silhouettes would be mirrored in the
			generated geometric patterns.
		</p>

		<div class="my-5"></div>

		<!-- video -->
		<div class="my-5">
			<video
				title="Break the Pattern Video"
				class="block h-auto w-full object-cover"
				controls
				muted
				autoplay
				loop
				preload="auto"
			>
				<source src={BreakThePatternVideo} type="video/webm" />
				<source src={BreakThePatternVideoMP4} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>

		<div class="my-5"></div>

		<!-- photo Carousel -->
		<div class="m-0 p-0">
			<div class="relative">
				<!-- slides -->
				{#each photoSlides as slide, index}
					<div class="slide" class:hidden={slideIndex[0] !== index + 1}>
						<div class="bg-opacity-50 absolute top-2 left-2 bg-black px-2 py-1 text-lg">
							{index + 1} / {photoSlides.length}
						</div>
						<enhanced:img
							src={slide}
							alt="Break the Pattern Installation"
							class="block w-full"
							loading="lazy"
						/>
					</div>
				{/each}

				<!-- navigation buttons -->
				<button
					class="prev absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer px-6 py-3 text-4xl text-white hover:text-blue-500"
					on:click={() => plusSlides(-1, 0)}
				>
					{'<'}
				</button>
				<button
					class="next absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer px-6 py-3 text-4xl text-white hover:text-blue-500"
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
						<div class="bg-opacity-50 absolute top-2 left-2 bg-black px-2 py-1 text-lg">
							{index + 1} / {designSlides.length}
						</div>
						<enhanced:img
							src={slide}
							alt="Break the Pattern Design"
							class="block w-full"
							loading="lazy"
						/>
					</div>
				{/each}

				<!-- navigation buttons -->
				<button
					class="prev absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer px-6 py-3 text-4xl text-white hover:text-blue-500"
					on:click={() => plusSlides(-1, 1)}
				>
					{'<'}
				</button>
				<button
					class="next absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer px-6 py-3 text-4xl text-white hover:text-blue-500"
					on:click={() => plusSlides(1, 1)}
				>
					{'>'}
				</button>
			</div>
		</div>

		<div class="my-5"></div>
	</article>

	<!-- mobile-only spacer -->
	<div class="h-12 md:hidden"></div>
</main>

<style>
	.slide {
		position: relative;
	}

	.hidden {
		display: none;
	}
</style>
