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
		<section 
			class="hidden md:block md:w-1/3 md:h-full" 
			style="background: {color};"
		></section>

		<!-- Main content area -->
		<section 
			class="h-full overflow-y-auto w-full md:w-2/3 bg-white flex justify-center transition-all duration-700 ease-out {pageVisible
				? 'translate-y-0 opacity-100'
				: 'translate-y-4 opacity-0'}"
		>
			<main class="font-consolas w-full max-w-2xl px-6 pt-16 md:pt-12 pb-5 text-black">
				<article>
						<div class="mb-4"></div>

						<div class="mb-4"></div>

						<div class="mb-4"></div>

						<p class="mb-4">
							Hey! I am a generative media artist based in Bremen, Germany. My work involves
							creating possibility spaces and emergent choreographies through code. With my
							background in computer science, I try to find ways of bringing my virtual entities to
							screens, to the web, to real world surfaces, and to physical installations.
						</p>

						<div class="my-5"></div>

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

						<table class="border-collapse text-left">
							<tbody>
								<tr>
									<td class="py-1 pr-4">Master Exhibition</td>
									<td class="py-1 pr-4">19. + 20.06.25</td>
									<td class="py-1 pr-4">@ Speicher XIa</td>
									<td class="py-1">(RAUSCHEN)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Goldstücke</td>
									<td class="py-1 pr-4">02. - 06.10.24</td>
									<td class="py-1 pr-4">@ Gelsenkirchen</td>
									<td class="py-1">(RAYARRAY & untiled)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Illustratio</td>
									<td class="py-1 pr-4">20. - 21.09.24</td>
									<td class="py-1 pr-4">@ Kiel</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">SLS x ZfK</td>
									<td class="py-1 pr-4">27.04.24</td>
									<td class="py-1 pr-4">@ Spedition Bremen</td>
									<td class="py-1">(einHauchVonTüllv2.x)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Synesthesia Fest</td>
									<td class="py-1 pr-4">08. - 09.07.23</td>
									<td class="py-1 pr-4">@ HfK Bremen</td>
									<td class="py-1">(blob & untiled)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Hochschultage</td>
									<td class="py-1 pr-4">08. - 09.07.23</td>
									<td class="py-1 pr-4">@ HfK Bremen</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">RAYVE</td>
									<td class="py-1 pr-4">27.05.23</td>
									<td class="py-1 pr-4">@ HAG Quartier</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Iterations</td>
									<td class="py-1 pr-4">05. - 10.05.23</td>
									<td class="py-1 pr-4">@ Speicher XIa</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Licht | Raum</td>
									<td class="py-1 pr-4">10. - 24.03.23</td>
									<td class="py-1 pr-4">@ HAG Quartier</td>
									<td class="py-1">(einHauchVonTüllv2.1)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Feeding Entities</td>
									<td class="py-1 pr-4">12. - 14.12.22</td>
									<td class="py-1 pr-4">@ Galerie Flut</td>
									<td class="py-1">(feedback_cube & untiled)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Fusion Festival</td>
									<td class="py-1 pr-4">29.06 - 03.07.22</td>
									<td class="py-1 pr-4">@ Seebühne</td>
									<td class="py-1">(einHauchVonTüllv2)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Plan:et C Gamma</td>
									<td class="py-1 pr-4">17. - 19.09.21</td>
									<td class="py-1 pr-4">@ Seebühne</td>
									<td class="py-1">(einHauchVonTüll)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Irgendwo</td>
									<td class="py-1 pr-4">07.08.21</td>
									<td class="py-1 pr-4">@ Bremen</td>
									<td class="py-1">(einHauchVonTüll)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">08:15 - Zeit für Musterbrecher</td>
									<td class="py-1 pr-4">2019</td>
									<td class="py-1 pr-4">@ Bern/Luzern/Zürich</td>
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

	/* Make table text smaller on mobile to prevent overflow */
	@media (max-width: 767px) {
		table {
			font-size: 10px;
		}
	}
</style>
