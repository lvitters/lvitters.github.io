<script lang="ts">
	let pageVisible = $state(false);

	$effect(() => {
		// small delay to ensure smooth transition
		setTimeout(() => {
			pageVisible = true;
		}, 50);
	});
</script>

<svelte:head>
	<meta name="description" content="About Lucca Vitters" />
</svelte:head>

<main class="relative flex h-screen w-screen overflow-hidden">
	<!-- wrap content in a transition container -->
	<div
		class="flex h-full transition-all duration-700 ease-out {pageVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<!-- left 1/3 -->
		<section class="h-full w-1/3"></section>

		<!-- right 2/3 -->
		<section class="h-full w-2/3">
			<div class="font-consolas m-0 min-h-screen bg-white px-7 pt-12 pb-5 text-black">
				<article class="px-5">
					<div class="text-2xs text-center">
						<div class="my-5"></div>

						<p class="mb-4">
							My name is Lucca Vitters. I study at <a
								href="https://digitalmedia-bremen.de/student-council/members/"
								class="text-black underline hover:text-blue-500">Hochschule für Künste</a
							>
							in Bremen, Germany.
							<br />
							I am a generative media artist opening up possibility spaces to create emergent choreographies.
							With my background in computer science, I am finding ways of bringing my virtual entities
							to screens, to the web, to real world surfaces, and to physical installations.
						</p>

						<div class="my-5"></div>
						<div class="my-5"></div>

						<div class="mb-2">
							<a href="https://github.com/lvitters" class="text-black underline hover:text-blue-500"
								>github.com/lvitters</a
							>
						</div>

						<div class="mb-2">
							<a
								href="mailto:lucca.vitters@gmail.com"
								class="text-black underline hover:text-blue-500">lucca.vitters@gmail.com</a
							>
						</div>

						<div class="mb-2">
							<a
								href="https://soundcloud.com/katze203"
								class="text-black underline hover:text-blue-500">SoundCloud</a
							>
						</div>

						<div class="my-5"></div>
						<div class="my-5"></div>
						<div class="my-5"></div>
						<div class="my-5"></div>

						<table class="mx-auto border-collapse text-left">
							<tbody>
								<tr>
									<td class="py-1 pr-4">08:15 - Zeit für Musterbrecher</td>
									<td class="py-1 pr-4">2019</td>
									<td class="py-1 pr-4">@ Bern/Luzern/Zürich</td>
									<td class="py-1">(Break the Pattern)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Irgendwo</td>
									<td class="py-1 pr-4">07.08.21</td>
									<td class="py-1 pr-4">@ Bremen</td>
									<td class="py-1">(einHauchVonTüll)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Plan:et C Gamma</td>
									<td class="py-1 pr-4">17. - 19.09.21</td>
									<td class="py-1 pr-4">@ Seebühne</td>
									<td class="py-1">(einHauchVonTüll)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Fusion Festival</td>
									<td class="py-1 pr-4">29.06 - 03.07.22</td>
									<td class="py-1 pr-4">@ Seebühne</td>
									<td class="py-1">(einHauchVonTüllv2)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Feeding Entities</td>
									<td class="py-1 pr-4">12. - 14.12.22</td>
									<td class="py-1 pr-4">@ Galerie Flut</td>
									<td class="py-1">(feedback_cube & untiled)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Licht | Raum</td>
									<td class="py-1 pr-4">10. - 24.03.23</td>
									<td class="py-1 pr-4">@ HAG Quartier</td>
									<td class="py-1">(einHauchVonTüllv2.1)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Iterations</td>
									<td class="py-1 pr-4">05. - 10.05.23</td>
									<td class="py-1 pr-4">@ Speicher XIa</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">RAYVE</td>
									<td class="py-1 pr-4">27.05.23</td>
									<td class="py-1 pr-4">@ HAG Quartier</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Hochschultage</td>
									<td class="py-1 pr-4">08. - 09.07.23</td>
									<td class="py-1 pr-4">@ HfK Bremen</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Synesthesia Fest</td>
									<td class="py-1 pr-4">08. - 09.07.23</td>
									<td class="py-1 pr-4">@ HfK Bremen</td>
									<td class="py-1">(blob & untiled)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">SLS x ZfK</td>
									<td class="py-1 pr-4">27.04.24</td>
									<td class="py-1 pr-4">@ Spedition Bremen</td>
									<td class="py-1">(einHauchVonTüllv2.x)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Illustratio</td>
									<td class="py-1 pr-4">20. - 21.09.24</td>
									<td class="py-1 pr-4">@ Kiel</td>
									<td class="py-1">(RAYARRAY)</td>
								</tr>
								<tr>
									<td class="py-1 pr-4">Goldstücke</td>
									<td class="py-1 pr-4">02. - 06.10.24</td>
									<td class="py-1 pr-4">@ Gelsenkirchen</td>
									<td class="py-1">(RAYARRAY & untiled)</td>
								</tr>
							</tbody>
						</table>

						<div class="my-5"></div>
					</div>
				</article>
			</div>
		</section>
	</div>
</main>
