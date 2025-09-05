<script lang="ts">
	import { mobile } from '$lib/utils/mobile.svelte';

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
		class="relative h-screen w-screen overflow-hidden text-[17px] {mobile.current ? '' : 'flex'}"
		style="background: white;"
	>
		<!-- left spacer - desktop only -->
		<section
			class={mobile.current ? 'hidden' : 'h-full w-1/3'}
			style="background: {color};"
		></section>

		<!-- main content area -->
		<section
			class="flex h-full justify-center overflow-y-auto bg-white {mobile.current
				? 'w-full'
				: 'w-2/3'}"
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
						web, to real world surfaces, and to physical installations. <br /><br />
					</p>

					<div class="my-8"></div>

					<p class="text-sm md:text-base">
						Here are some exhibitions I have been part of:<br />
					</p>

					<div class="my-5"></div>

					<table class="border-collapse text-sm md:text-base">
						<tbody>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">19.06 + 20.06.25</td>
								<td class="py-2 align-top"
									><em>Master Exhibition @ Speicher XIa</em><br /><a
										href="/works/rauschen"
										class="dynamic-link underline"
										style="color: {color}">RAUSCHEN</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">02.10 - 06.10.24</td>
								<td class="py-2 align-top"
									><em>Goldstücke Gelsenkirchen</em><br /><a
										href="/works/rayarray"
										class="dynamic-link underline"
										style="color: {color}">RAYARRAY</a
									>
									&
									<a href="/works/untiled" class="dynamic-link underline" style="color: {color}"
										>untiled</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">20.09 + 21.09.24</td>
								<td class="py-2 align-top"
									><em>Illustratio Kiel</em><br /><a
										href="/works/rayarray"
										class="dynamic-link underline"
										style="color: {color}">RAYARRAY</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">27.04.24</td>
								<td class="py-2 align-top"
									><em>SLS x ZfK @ Spedition Bremen</em><br /><a
										href="/works/ein-hauch-von-tull-v2"
										class="dynamic-link underline"
										style="color: {color}">einHauchVonTüllv2.x</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">08.07 + 09.07.23</td>
								<td class="py-2 align-top"
									><em>Synesthesia Fest @ HfK Bremen</em><br /><a
										href="/works/blob"
										class="dynamic-link underline"
										style="color: {color}">blob</a
									>
									&
									<a href="/works/untiled" class="dynamic-link underline" style="color: {color}"
										>untiled</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">08.07 + 09.07.23</td>
								<td class="py-2 align-top"
									><em>Hochschultage @ HfK Bremen</em><br /><a
										href="/works/rayarray"
										class="dynamic-link underline"
										style="color: {color}">RAYARRAY</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">27.05.23</td>
								<td class="py-2 align-top"
									><em>RAYVE @ HAG Quartier</em><br /><a
										href="/works/rayarray"
										class="dynamic-link underline"
										style="color: {color}">RAYARRAY</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">05.05 - 10.05.23</td>
								<td class="py-2 align-top"
									><em>Iterations @ Speicher XIa</em><br /><a
										href="/works/rayarray"
										class="dynamic-link underline"
										style="color: {color}">RAYARRAY</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">10.03 - 24.03.23</td>
								<td class="py-2 align-top"
									><em>Licht | Raum @ HAG Quartier</em><br /><a
										href="/works/ein-hauch-von-tull-v2#v2-1"
										class="dynamic-link underline"
										style="color: {color}">einHauchVonTüllv2.1</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">12.12 - 14.12.22</td>
								<td class="py-2 align-top"
									><em>Feeding Entities @ Galerie Flut</em><br /><a
										href="/works/feedback-cube"
										class="dynamic-link underline"
										style="color: {color}">feedback_cube</a
									>
									&
									<a href="/works/untiled" class="dynamic-link underline" style="color: {color}"
										>untiled</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">29.06 - 03.07.22</td>
								<td class="py-2 align-top"
									><em>Fusion Festival</em><br /><a
										href="/works/ein-hauch-von-tull-v2"
										class="dynamic-link underline"
										style="color: {color}">einHauchVonTüllv2</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">17.09 - 19.09.21</td>
								<td class="py-2 align-top"
									><em>Plan:et C Gamma Festival</em><br /><a
										href="/works/ein-hauch-von-tull"
										class="dynamic-link underline"
										style="color: {color}">einHauchVonTüll</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">07.08.21</td>
								<td class="py-2 align-top"
									><em>Irgendwo Bremen</em><br /><a
										href="/works/ein-hauch-von-tull"
										class="dynamic-link underline"
										style="color: {color}">einHauchVonTüll</a
									></td
								>
							</tr>
							<tr>
								<td class="py-2 pr-8 text-right align-top whitespace-nowrap">2019</td>
								<td class="py-2 align-top"
									><em>08:15 - Zeit für Musterbrecher @ Bern/Luzern/Zürich</em><br /><a
										href="/works/break-the-pattern"
										class="dynamic-link underline"
										style="color: {color}">Break the Pattern</a
									></td
								>
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
