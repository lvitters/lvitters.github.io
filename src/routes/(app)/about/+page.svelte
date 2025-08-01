<script lang="ts">
	let pageVisible = $state(false);
	let hue1 = $state(Math.random() * 360); // first random hue
	let hue2 = $state(Math.random() * 360); // second random hue
	let rotationAngle = $state(0);

	// create linear gradient that rotates around the screen edges
	let backgroundGradient = $derived(
		`linear-gradient(${rotationAngle}deg, hsl(${hue1}, 90%, 70%), hsl(${hue2}, 90%, 70%))`
	);

	$effect(() => {
		// small delay to ensure smooth transition
		setTimeout(() => {
			pageVisible = true;
		}, 50);
	});

	// separate effect for rotation animation
	$effect(() => {
		const rotationInterval = setInterval(() => {
			// rotate the gradient by 2 degrees every 50ms
			rotationAngle = (rotationAngle + 2) % 360;
		}, 50);

		// cleanup interval on component destroy
		return () => clearInterval(rotationInterval);
	});
</script>

<svelte:head>
	<meta name="description" content="About Lucca Vitters" />
</svelte:head>

<main
	class="relative flex h-screen w-screen overflow-hidden text-[10px] transition-all duration-1000 ease-in-out"
	style="background: {backgroundGradient}; opacity: {pageVisible ? 1 : 0};"
>
	<!-- wrap content in a transition container -->
	<div
		class="flex h-full transition-all duration-700 ease-out {pageVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<!-- left 1/3 -->
		<section class="left-column h-full bg-transparent"></section>

		<!-- right 2/3 -->
		<section class="right-column h-full overflow-y-auto bg-transparent">
			<main
				class="font-consolas m-0 min-h-screen border border-white/10 bg-white/10 px-7 pt-12 pb-5 text-black backdrop-blur-sm transition-all duration-700"
			>
				<article class="px-5">
					<div class="text-2xs">
						<div class="my-5"></div>

						<p class="mb-4">
							Hey! I am a generative media artist based in Bremen, Germany. My work involves
							creating up possibility spaces and emergent choreographies through code. With my
							background in computer science, I try to find ways of bringing my virtual entities to
							screens, to the web, to real world surfaces, and to physical installations.
						</p>

						<div class="my-5"></div>

						<div class="mb-4">
							<a href="https://github.com/lvitters" class="text-black underline hover:text-blue-500"
								>github.com/lvitters</a
							>
						</div>

						<div class="mb-4">
							<a
								href="mailto:lucca.vitters@gmail.com"
								class="text-black underline hover:text-blue-500">lucca.vitters@gmail.com</a
							>
						</div>

						<div class="mb-4">
							<a
								href="https://soundcloud.com/katze203"
								class="text-black underline hover:text-blue-500">SoundCloud</a
							>
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
					</div>
				</article>
			</main>
		</section>
	</div>
</main>

<style>
	/* left column */
	.left-column {
		width: calc(33.333% + 1rem);
	}

	.right-column {
		width: calc(66.667% - 1rem);
	}
</style>
