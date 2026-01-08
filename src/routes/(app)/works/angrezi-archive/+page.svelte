<script>
	import ArchiveScreen from '$lib/assets/media/archive/angrezi_archive_screen.png';
</script>

<svelte:head>
	<title>Radio Angrezi Archive</title>
	<meta
		name="description"
		content="The Radio Angrezi Archive is a modular addition to Radio Angrezi's infrastructure. It serves
			as both a look through the history of Radio Angrezi before 2025, and since then as a platform to upload broadcasts by current participants, independent from
			any corporation's platforms."
	/>
</svelte:head>

<main class="m-0 min-h-screen bg-[rgb(255,255,0)] px-4 pt-6 pb-5 text-black md:px-10 md:pt-12">
	<article>
		<div class="mb-5 flex items-center justify-center text-center">
			<div class="flex-1 text-center">
				<h1 class="mb-0 pb-1 text-center text-4xl font-bold">Radio Angrezi Archive</h1>
				<div class="mt-1 text-xl font-medium text-black">
					<time>2025</time>
					<span> | SvelteKit | web app</span>
				</div>
			</div>
		</div>

		<p class="mb-1 text-center">
			leave this website for the <a
				href="https://archive.radioangrezi.de"
				class="text-black underline hover:text-[#ff69b4]">Radio Angrezi Archive</a
			>
		</p>

		<div class="my-5"></div>

		<p class="mb-4">
			The Radio Angrezi Archive is a modular addition to Radio Angrezi's infrastructure. It serves
			as both a look through the history of Radio Angrezi before 2025, as curated by former member <a
				href="https://peljhan.net/"
				class="text-black underline hover:text-[#ff69b4]">Patrick Peljhan</a
			>, and since then as a platform to upload broadcasts by current participants, independent from
			any corporation's platforms.
			<br />
			<br />
			Radio Angrezi itself is an experimental ground for sound, music, voice and live performance. It
			broadcasts weekly from its studio at Speicher XI (Bremen) on
			<a href="http://radioangrezi.de" class="text-black underline hover:text-[#ff69b4]"
				>radioangrezi.de</a
			>, as well as occasionally on 92,5 FM, receivable in the Bremen and the surrounding area. In
			addition, special broadcasts covering concerts, lectures, presentations and exhibition
			openings are produced regularly. Radio Angrezi is an autonomous student collective, spanning
			all disciplines, study departments and multiple languages. It is open for students, teachers
			and guests. It aims to rise questions, develop new conditions, shapes and formats, to perform
			and to broadcast collectively or individually, to listen, to observe and to discuss.
		</p>

		<div class="my-5"></div>

		<figure class="m-0 p-0">
			<a href="https://archive.radioangrezi.de">
				<img
					src={ArchiveScreen}
					alt="Angrezi Archive Screenshot"
					class="block w-full"
					loading="lazy"
				/></a
			>
		</figure>

		<div class="my-5"></div>
	</article>
</main>
