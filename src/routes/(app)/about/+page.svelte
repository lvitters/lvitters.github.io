<script lang="ts">
	import { browser } from '$app/environment';

	let pageVisible = $state(false);
	let isMobile = $state(browser ? window.innerWidth < 768 : false);

	// page transition effect
	$effect(() => {
		setTimeout(() => {
			pageVisible = true;
		}, 50);
	});

	// check if mobile
	$effect(() => {
		if (browser) {
			const checkMobile = () => {
				const newIsMobile = window.innerWidth < 768;
				if (newIsMobile !== isMobile) {
					isMobile = newIsMobile;
				}
			};

			// check immediately
			checkMobile();

			// also check on next tick to ensure DOM is ready
			setTimeout(checkMobile, 0);

			window.addEventListener('resize', checkMobile);

			return () => {
				window.removeEventListener('resize', checkMobile);
			};
		}
	});

	// dynamic color
	let currentHue = $state(Math.random() * 360);
	let color = $derived(`hsl(${currentHue}, 90%, 70%)`);

	$effect(() => {
		const interval = setInterval(() => {
			currentHue = (currentHue + 1) % 360;
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<meta name="description" content="About Lucca Vitters" />
</svelte:head>

<div>
	<!-- Mobile: full screen white background, Desktop: colored background with white content area -->
	<main
		class="relative h-screen w-screen overflow-hidden text-[17px] transition-all duration-1000 ease-in-out md:flex"
		style="background: {pageVisible ? 'white' : 'white'}; opacity: {pageVisible ? 1 : 0};"
	>
		<!-- Left spacer - desktop only -->
		<section class="hidden md:block md:h-full md:w-1/3" style="background: {color};"></section>

		<!-- Main content area -->
		<section
			class="flex h-full w-full justify-center overflow-y-auto bg-white transition-all duration-700 ease-out md:w-2/3 {pageVisible
				? 'opacity-100'
				: 'opacity-0'}"
		>
			<main
				class="font-consolas m-0 min-h-screen w-full bg-white px-2 pt-12 pb-5 text-black md:px-6"
			>
				<article class="px-5">
					<div class="mb-12"></div>

					<div class="mb-5 flex items-center justify-center text-center">
						<div class="flex-1 text-center">
							<div class="mt-1 text-xl">
								<div class={isMobile ? 'flex flex-col items-center space-y-1' : ''}>
									<a
										href="mailto:lucca.vitters@gmail.com"
										class="dynamic-link underline"
										style="color: {color}">lucca.vitters@gmail.com</a
									>
									{#if !isMobile}|{/if}
									<a
										href="https://github.com/lvitters"
										class="dynamic-link underline"
										style="color: {color}">github.com/lvitters</a
									>
									{#if !isMobile}|{/if}
									<a
										href="https://soundcloud.com/katze203"
										class="dynamic-link underline"
										style="color: {color}">SoundCloud</a
									>
								</div>
							</div>
						</div>
					</div>

					<div class="my-5"></div>

					<p class="mb-4">
						Hey! I am a generative media artist based in Bremen, Germany. My work involves creating
						possibility spaces and emergent choreographies through code. With my background in
						computer science, I try to find ways of bringing my virtual entities to screens, to the
						web, to real world surfaces, and to physical installations.
					</p>

					<div class="my-5"></div>

					<table class="border-collapse text-[10px] md:text-base">
						<tbody>
							<tr>
								<td class="py-1 pr-2">Master Exhibition</td>
								<td class="py-1 pr-2">19. + 20.06.25</td>
								<td class="py-1 pr-2">@ Speicher XIa</td>
								<td class="py-1">(RAUSCHEN)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Goldstücke</td>
								<td class="py-1 pr-2">02. - 06.10.24</td>
								<td class="py-1 pr-2">@ Gelsenkirchen</td>
								<td class="py-1">(RAYARRAY & untiled)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Illustratio</td>
								<td class="py-1 pr-2">20. - 21.09.24</td>
								<td class="py-1 pr-2">@ Kiel</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">SLS x ZfK</td>
								<td class="py-1 pr-2">27.04.24</td>
								<td class="py-1 pr-2">@ Spedition Bremen</td>
								<td class="py-1">(einHauchVonTüllv2.x)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Synesthesia Fest</td>
								<td class="py-1 pr-2">08. - 09.07.23</td>
								<td class="py-1 pr-2">@ HfK Bremen</td>
								<td class="py-1">(blob & untiled)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Hochschultage</td>
								<td class="py-1 pr-2">08. - 09.07.23</td>
								<td class="py-1 pr-2">@ HfK Bremen</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">RAYVE</td>
								<td class="py-1 pr-2">27.05.23</td>
								<td class="py-1 pr-2">@ HAG Quartier</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Iterations</td>
								<td class="py-1 pr-2">05. - 10.05.23</td>
								<td class="py-1 pr-2">@ Speicher XIa</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Licht | Raum</td>
								<td class="py-1 pr-2">10. - 24.03.23</td>
								<td class="py-1 pr-2">@ HAG Quartier</td>
								<td class="py-1">(einHauchVonTüllv2.1)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Feeding Entities</td>
								<td class="py-1 pr-2">12. - 14.12.22</td>
								<td class="py-1 pr-2">@ Galerie Flut</td>
								<td class="py-1">(feedback_cube & untiled)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Fusion Festival</td>
								<td class="py-1 pr-2">29.06 - 03.07.22</td>
								<td class="py-1 pr-2">@ Seebühne</td>
								<td class="py-1">(einHauchVonTüllv2)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Plan:et C Gamma</td>
								<td class="py-1 pr-2">17. - 19.09.21</td>
								<td class="py-1 pr-2">@ Seebühne</td>
								<td class="py-1">(einHauchVonTüll)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">Irgendwo</td>
								<td class="py-1 pr-2">07.08.21</td>
								<td class="py-1 pr-2">@ Bremen</td>
								<td class="py-1">(einHauchVonTüll)</td>
							</tr>
							<tr>
								<td class="py-1 pr-2">08:15 - Zeit für Musterbrecher</td>
								<td class="py-1 pr-2">2019</td>
								<td class="py-1 pr-2">@ Bern/Luzern/Zürich</td>
								<td class="py-1">(Break the Pattern)</td>
							</tr>
						</tbody>
					</table>

					<div class="my-5"></div>
				</article>
			</main>
		</section>
	</main>
</div>

<style>
	.dynamic-link {
		transition: color 1s ease; /* match the background timing */
	}

	.dynamic-link:hover {
		color: black !important;
		transition: color 0.15s ease;
	}
</style>
