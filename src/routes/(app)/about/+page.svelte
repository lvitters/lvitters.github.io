<script lang="ts">
	import { mobile } from '$lib/utils/mobile.svelte';

	// page transition effect
	let pageVisible = $state(false);
	$effect(() => {
		setTimeout(() => {
			pageVisible = true;
		}, 50);
	});

	// dynamic color
	let currentHue = $state(Math.random() * 360);
	let color = $derived(`hsl(${currentHue}, 90%, 70%)`);

	// set new hue
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
	<!-- mobile: full screen white background, Desktop: colored background with white content area -->
	<main
		class="relative h-screen w-screen overflow-hidden text-[17px] transition-all duration-1000 ease-in-out {mobile.current
			? ''
			: 'flex'}"
		style="background: {pageVisible ? 'white' : 'white'}; opacity: {pageVisible ? 1 : 0};"
	>
		<!-- left spacer - desktop only -->
		<section
			class={mobile.current ? 'hidden' : 'h-full w-1/3'}
			style="background: {color};"
		></section>

		<!-- main content area -->
		<section
			class="flex h-full justify-center overflow-y-auto bg-white transition-all duration-700 ease-out {mobile.current
				? 'w-full'
				: 'w-2/3'} {pageVisible ? 'opacity-100' : 'opacity-0'}"
		>
			<div
				class="font-consolas m-0 flex min-h-full w-full flex-col bg-white pt-12 pb-5 text-black {mobile.current
					? 'px-2'
					: 'px-6'}"
			>
				<article class="flex-1 px-5">
					<div class="mb-12"></div>

					<div class="mb-5 flex items-center justify-center text-center">
						<div class="flex-1 text-center">
							<div class="mt-1 text-xl">
								<div class={mobile.current ? 'flex flex-col items-center space-y-1' : ''}>
									<a
										href="mailto:lucca.vitters@gmail.com"
										class="dynamic-link underline"
										style="color: {color}">lucca.vitters@gmail.com</a
									>
									{#if !mobile.current}|{/if}
									<a
										href="https://github.com/lvitters"
										class="dynamic-link underline"
										style="color: {color}">github.com/lvitters</a
									>
									{#if !mobile.current}|{/if}
									<a
										href="https://soundcloud.com/katze203"
										class="dynamic-link underline"
										style="color: {color}">SoundCloud</a
									>
								</div>
							</div>
						</div>
					</div>

					<div class="my-8"></div>

					<p class="mb-4">
						Hey! I am a generative media artist based in Bremen, Germany. My work involves creating
						possibility spaces and emergent choreographies through code. With my background in
						computer science, I try to find ways of bringing my virtual entities to screens, to the
						web, to real world surfaces, and to physical installations.
						<br />
						<br />
						Here are some exhibitions I have been part of:
					</p>

					<div class="my-5"></div>

					<table class="border-collapse text-[10px] md:text-base">
						<tbody>
							<tr>
								<td class="py-1 pr-3">Master Exhibition</td>
								<td class="py-1 pr-3">19. + 20.06.25</td>
								<td class="py-1 pr-3">@ Speicher XIa</td>
								<td class="py-1">(RAUSCHEN)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Goldstücke</td>
								<td class="py-1 pr-3">02. - 06.10.24</td>
								<td class="py-1 pr-3">@ Gelsenkirchen</td>
								<td class="py-1">(RAYARRAY & untiled)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Illustratio</td>
								<td class="py-1 pr-3">20. - 21.09.24</td>
								<td class="py-1 pr-3">@ Kiel</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">SLS x ZfK</td>
								<td class="py-1 pr-3">27.04.24</td>
								<td class="py-1 pr-3">@ Spedition Bremen</td>
								<td class="py-1">(einHauchVonTüllv2.x)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Synesthesia Fest</td>
								<td class="py-1 pr-3">08. - 09.07.23</td>
								<td class="py-1 pr-3">@ HfK Bremen</td>
								<td class="py-1">(blob & untiled)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Hochschultage</td>
								<td class="py-1 pr-3">08. - 09.07.23</td>
								<td class="py-1 pr-3">@ HfK Bremen</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">RAYVE</td>
								<td class="py-1 pr-3">27.05.23</td>
								<td class="py-1 pr-3">@ HAG Quartier</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Iterations</td>
								<td class="py-1 pr-3">05. - 10.05.23</td>
								<td class="py-1 pr-3">@ Speicher XIa</td>
								<td class="py-1">(RAYARRAY)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Licht | Raum</td>
								<td class="py-1 pr-3">10. - 24.03.23</td>
								<td class="py-1 pr-3">@ HAG Quartier</td>
								<td class="py-1">(einHauchVonTüllv2.1)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Feeding Entities</td>
								<td class="py-1 pr-3">12. - 14.12.22</td>
								<td class="py-1 pr-3">@ Galerie Flut</td>
								<td class="py-1">(feedback_cube & untiled)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Fusion Festival</td>
								<td class="py-1 pr-3">29.06 - 03.07.22</td>
								<td class="py-1 pr-3">@ Seebühne</td>
								<td class="py-1">(einHauchVonTüllv2)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Plan:et C Gamma</td>
								<td class="py-1 pr-3">17. - 19.09.21</td>
								<td class="py-1 pr-3">@ Seebühne</td>
								<td class="py-1">(einHauchVonTüll)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">Irgendwo</td>
								<td class="py-1 pr-3">07.08.21</td>
								<td class="py-1 pr-3">@ Bremen</td>
								<td class="py-1">(einHauchVonTüll)</td>
							</tr>
							<tr>
								<td class="py-1 pr-3">08:15 - Zeit für Musterbrecher</td>
								<td class="py-1 pr-3">2019</td>
								<td class="py-1 pr-3">@ Bern/Luzern/Zürich</td>
								<td class="py-1">(Break the Pattern)</td>
							</tr>
						</tbody>
					</table>

					<div class="my-30"></div>
				</article>

				<!-- footer that sticks to bottom -->
				<footer class="mt-auto px-5">
					<p class="mb-4 text-center text-[10px]">
						Impressum: Lucca Vitters, Am Dobben 28, 28203 Bremen, +4915168112323
					</p>
				</footer>
			</div>
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
