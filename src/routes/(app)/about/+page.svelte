<script lang="ts">
	import { mobile } from '$lib/utils/mobile.svelte';
	import { fade } from 'svelte/transition';

	// dynamic color
	let currentHue = $state(Math.random() * 360);
	let color = $derived(`hsl(${currentHue}, 100%, 50%)`);

	// set new hue
	$effect(() => {
		const interval = setInterval(() => {
			currentHue = (currentHue + 1) % 360;
		}, 100);

		return () => clearInterval(interval);
	});

	type View = 'bio' | 'exhibitions' | 'talks' | 'impressum';
	let view = $state<View>('bio');

	const menuItems: { id: View; label: string }[] = [
		{ id: 'bio', label: 'bio' },
		{ id: 'exhibitions', label: 'exhibitions' },
		{ id: 'talks', label: 'talks & performances' },
		{ id: 'impressum', label: 'impressum & datenschutz' }
	];
</script>

<svelte:head>
	<title>about</title>
	<meta name="robots" content="noindex" />
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
				<!-- Internal Navigation -->
				<nav class="mb-8 px-5">
					<div
						class="flex flex-col items-center space-y-1 text-center md:flex-row md:justify-center md:space-y-0 md:space-x-3"
					>
						{#each menuItems as item, i}
							{#if i > 0}
								<span class="hidden md:inline">|</span>
							{/if}
							<button
								onclick={() => (view = item.id)}
								class="cursor-pointer text-xl {view === item.id
									? 'text-black underline'
									: 'dynamic-link'}"
								style={view === item.id ? '' : `color: ${color}`}
							>
								{item.label}
							</button>
						{/each}
					</div>
				</nav>

				<!-- Content Area with Transition -->
				<div class="relative flex-1 px-5">
					{#key view}
						<div
							class="absolute inset-x-0 top-0 px-5"
							in:fade={{ duration: 200 }}
							out:fade={{ duration: 200 }}
						>
							{#if view === 'bio'}
								<p class="mb-4">
									hey! I am a generative media artist and creative technologist based in Bremen,
									Germany, with an interest in exploring emergence by creating probability spaces
									with code. My entities live on the web, manifest in physical installations and
									roam real world surfaces through projections.
								</p>

								<div class="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
									<a
										href="mailto:lucca.vitters@gmail.com"
										class="dynamic-link text-xl underline"
										style="color: {color}">lucca.vitters@gmail.com</a
									>
									<a
										href="https://github.com/lvitters"
										class="dynamic-link text-xl underline"
										style="color: {color}">github.com/lvitters</a
									>
									<a
										href="https://soundcloud.com/katze203"
										class="dynamic-link text-xl underline"
										style="color: {color}">soundcloud.com/katze203</a
									>
								</div>
							{:else if view === 'exhibitions'}
								<table class="w-full border-collapse text-sm md:text-base">
									<tbody>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>24.09 - 27.09.25</td
											>
											<td class="py-2 align-top"
												><em>TRANSFORM 2025, Trier</em><br /><a
													href="/works/rauschen"
													class="dynamic-link underline"
													style="color: {color}">RAUSCHEN</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>19.06 + 20.06.25</td
											>
											<td class="py-2 align-top"
												><em>RAUSCHEN, Speicher XIa, Bremen</em><br /><a
													href="/works/rauschen"
													class="dynamic-link underline"
													style="color: {color}">RAUSCHEN</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>02.10 - 06.10.24</td
											>
											<td class="py-2 align-top"
												><em>Goldstücke, Gelsenkirchen</em><br /><a
													href="/works/rayarray"
													class="dynamic-link underline"
													style="color: {color}">RAYARRAY</a
												>
												&
												<a
													href="/works/untiled"
													class="dynamic-link underline"
													style="color: {color}">untiled</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>20.09 + 21.09.24</td
											>
											<td class="py-2 align-top"
												><em>Illustratio, Kiel</em><br /><a
													href="/works/rayarray"
													class="dynamic-link underline"
													style="color: {color}">RAYARRAY</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap">27.04.24</td>
											<td class="py-2 align-top"
												><em>SLS x ZfK, Spedition, Bremen</em><br /><a
													href="/works/ein-hauch-von-tull-v2"
													class="dynamic-link underline"
													style="color: {color}">einHauchVonTüllv2.x</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>08.07 + 09.07.23</td
											>
											<td class="py-2 align-top"
												><em>Synesthesia Fest, HfK, Bremen</em><br /><a
													href="/works/blob"
													class="dynamic-link underline"
													style="color: {color}">blob</a
												>
												&
												<a
													href="/works/untiled"
													class="dynamic-link underline"
													style="color: {color}">untiled</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>08.07 + 09.07.23</td
											>
											<td class="py-2 align-top"
												><em>Hochschultage, HfK, Bremen</em><br /><a
													href="/works/rayarray"
													class="dynamic-link underline"
													style="color: {color}">RAYARRAY</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap">27.05.23</td>
											<td class="py-2 align-top"
												><em>RAYVE, HAG Quartier, Bremen</em><br /><a
													href="/works/rayarray"
													class="dynamic-link underline"
													style="color: {color}">RAYARRAY</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>05.05 - 10.05.23</td
											>
											<td class="py-2 align-top"
												><em>Iterations, Speicher XIa, Bremen</em><br /><a
													href="/works/rayarray"
													class="dynamic-link underline"
													style="color: {color}">RAYARRAY</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>10.03 - 24.03.23</td
											>
											<td class="py-2 align-top"
												><em>Licht | Raum, HAG Quartier, Bremen</em><br /><a
													href="/works/ein-hauch-von-tull-v2#v2-1"
													class="dynamic-link underline"
													style="color: {color}">einHauchVonTüllv2.1</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>12.12 - 14.12.22</td
											>
											<td class="py-2 align-top"
												><em>Feeding Entities, Galerie Flut, Bremen</em><br /><a
													href="/works/feedback-cube"
													class="dynamic-link underline"
													style="color: {color}">feedback_cube</a
												>
												&
												<a
													href="/works/untiled"
													class="dynamic-link underline"
													style="color: {color}">untiled</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>29.06 - 03.07.22</td
											>
											<td class="py-2 align-top"
												><em>Fusion Festival, Lärz</em><br /><a
													href="/works/ein-hauch-von-tull-v2"
													class="dynamic-link underline"
													style="color: {color}">einHauchVonTüllv2</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>17.09 - 19.09.21</td
											>
											<td class="py-2 align-top"
												><em>Plan:et C Gamma Festival, Lärz</em><br /><a
													href="/works/ein-hauch-von-tull"
													class="dynamic-link underline"
													style="color: {color}">einHauchVonTüll</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap">07.08.21</td>
											<td class="py-2 align-top"
												><em>Irgendwo, Bremen</em><br /><a
													href="/works/ein-hauch-von-tull"
													class="dynamic-link underline"
													style="color: {color}">einHauchVonTüll</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap">2019</td>
											<td class="py-2 align-top"
												><em>08:15 - Zeit für Musterbrecher, Bern + Luzern + Zürich</em><br /><a
													href="/works/break-the-pattern"
													class="dynamic-link underline"
													style="color: {color}">Break the Pattern</a
												></td
											>
										</tr>
									</tbody>
								</table>
							{:else if view === 'talks'}
								<table class="w-full border-collapse text-sm md:text-base">
									<tbody>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap"
												>24.09 + 26.09.25</td
											>
											<td class="py-2 align-top"
												><em>artist talk + performance @ TRANSFORM 2025</em><br /><a
													href="/works/rauschen"
													class="dynamic-link underline"
													style="color: {color}">RAUSCHEN</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap">02.10.24</td>
											<td class="py-2 align-top"
												><em>artist talk @ Goldstücke</em><br /><a
													href="/works/rayarray"
													class="dynamic-link underline"
													style="color: {color}">RAYARRAY</a
												>
												&
												<a
													href="/works/untiled"
													class="dynamic-link underline"
													style="color: {color}">untiled</a
												></td
											>
										</tr>
										<tr>
											<td class="py-2 pr-8 text-right align-top whitespace-nowrap">12.12.22</td>
											<td class="py-2 align-top"
												><em>artist talk @ Feeding Entities</em><br /><a
													href="/works/feedback-cube"
													class="dynamic-link underline"
													style="color: {color}">feedback_cube</a
												>
												&
												<a
													href="/works/untiled"
													class="dynamic-link underline"
													style="color: {color}">untiled</a
												></td
											>
										</tr>
									</tbody>
								</table>
							{:else if view === 'impressum'}
								<div class="prose max-w-none">
									<h2 class="mt-8 mb-4 text-2xl font-bold">Impressum</h2>
									<p class="mb-4">
										Lucca Vitters<br />
										Am Dobben 28<br />
										28203 Bremen<br />
										+4915168112323<br />
										<a
											href="mailto:lucca.vitters@gmail.com"
											class="dynamic-link underline"
											style="color: {color}">lucca.vitters@gmail.com</a
										>
									</p>

									<h2 class="mt-12 mb-4 text-2xl font-bold">Datenschutz</h2>
									<h3 class="mt-8 mb-4 text-xl font-bold">1. Datenschutz auf einen Blick</h3>
									<h4 class="mt-6 mb-4 text-lg font-bold">Allgemeine Hinweise</h4>
									<p class="mb-4">
										Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
										personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
										Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
										werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
										unserer unter diesem Text aufgeführten Datenschutzerklärung.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Datenerfassung auf dieser Website</h4>
									<h5 class="mt-4 mb-2 text-base font-bold tracking-wider uppercase">
										Wer ist verantwortlich für die Datenerfassung auf dieser Website?
									</h5>
									<p class="mb-4">
										Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
										Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen
										Stelle“ in dieser Datenschutzerklärung entnehmen.
									</p>

									<h5 class="mt-4 mb-2 text-base font-bold tracking-wider uppercase">
										Wie erfassen wir Ihre Daten?
									</h5>
									<p class="mb-4">
										Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
										Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular
										eingeben.<br />
										Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
										durch unsere IT- Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
										Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
										automatisch, sobald Sie diese Website betreten.
									</p>

									<h5 class="text-md mt-4 mb-2 font-bold tracking-wider uppercase">
										Wofür nutzen wir Ihre Daten?
									</h5>
									<p class="mb-4">
										Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website
										zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens
										verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt
										werden können, werden die üb
									</p>

									<h5 class="mt-4 mb-2 text-base font-bold tracking-wider uppercase">
										Welche Rechte haben Sie bezüglich Ihrer Daten?
									</h5>
									<p class="mb-4">
										Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
										und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
										außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
										Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese
										Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht,
										unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
										personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
										Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
										<br />
										<br />
										Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an
										uns wenden.
									</p>

									<h3 class="mt-10 mb-4 text-xl font-bold">2. Hosting</h3>
									<h4 class="mt-6 mb-4 text-lg font-bold">
										Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
									</h4>
									<p class="mb-4">GitHub Inc.</p>
									<p class="mb-4">
										Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser
										Website erfasst werden, werden auf den Servern des Hosters / der Hoster
										gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta-
										und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und
										sonstige Daten, die über eine Website generiert werden, handeln.
										<br />
										<br />
										Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen
										und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren,
										schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen
										Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt
										wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit.
										a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies
										oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting)
										im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
										<br />
										<br />
										Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur
										Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug
										auf diese Daten befolgen. Wir setzen folgende(n) Hoster ein:
									</p>
									<p class="mb-4">
										GitHub, Inc.<br />
										88 Colin P. Kelly Jr. Street<br />
										San Francisco, CA 94107 USA
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Auftragsverarbeitung</h4>
									<p class="mb-4">
										Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben
										genannten Dienstes geschlossen. Hierbei handelt es sich um einen
										datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser
										die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen
										und unter Einhaltung der DSGVO verarbeitet.
									</p>

									<h3 class="mt-10 mb-4 text-xl font-bold">
										3. Allgemeine Hinweise und Pflichtinformationen
									</h3>
									<h4 class="mt-6 mb-4 text-lg font-bold">Datenschutz</h4>
									<p class="mb-4">
										Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr
										ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
										den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
										<br />
										Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
										Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
										können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben
										und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
										<br />
										Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation
										per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor
										dem Zugriff durch Dritte ist nicht möglich.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Hinweis zur verantwortlichen Stelle</h4>
									<p class="mb-4">
										Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
									</p>
									<p class="mb-4">
										Lucca Vitters<br />
										Am Dobben 28<br />
										28203 Bremen<br />
										<br />
										Telefon: +4915168112323<br />
										E-Mail: lucca.vitters@gmail.com<br />
										<br />
										Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
										gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
										Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Speicherdauer</h4>
									<p class="mb-4">
										Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer
										genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck
										für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen
										geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden
										Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
										die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder
										handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die
										Löschung nach Fortfall dieser Gründe.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">
										Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser
										Website
									</h4>
									<p class="mb-4">
										Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre
										personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9
										Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO
										verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die
										Übertragung personenbezogener Daten in Drittstaaten erfolgt die
										Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern
										Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr
										Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die
										Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die
										Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung
										oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir
										Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren
										verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen
										Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
										Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses
										nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall
										einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser
										Datenschutzerklärung informiert.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Empfänger von personenbezogenen Daten</h4>
									<p class="mb-4">
										Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen
										Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von
										personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben
										personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen
										einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu
										verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein
										berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben
										oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim
										Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden
										nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im
										Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame
										Verarbeitung geschlossen.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">
										Widerruf Ihrer Einwilligung zur Datenverarbeitung
									</h4>
									<p class="mb-4">
										Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
										möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die
										Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
										Widerruf unberührt.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">
										Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen
										Direktwerbung (Art. 21 DSGVO)
									</h4>
									<p class="mb-4">
										WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
										ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER
										BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN
										DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN
										GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG
										BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH
										EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR
										VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE
										VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN
										ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
										RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
										<br />
										<br />
										WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO
										HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER
										PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH
										FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN
										SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM
										ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">
										Beschwerderecht bei der zuständigen Aufsichtsbehörde
									</h4>
									<p class="mb-4">
										Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht
										bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
										Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
										Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher
										oder gerichtlicher Rechtsbehelfe.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Recht auf Datenübertragbarkeit</h4>
									<p class="mb-4">
										Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
										Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen
										Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
										Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
										verlangen, erfolgt dies nur, soweit es technisch machbar ist.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">Auskunft, Berichtigung und Löschung</h4>
									<p class="mb-4">
										Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht
										auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
										deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein
										Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren
										Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">
										Recht auf Einschränkung der Verarbeitung
									</h4>
									<p class="mb-4">
										Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen
										Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht
										auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
										<br />
										<br />
										- Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
										benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung
										haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
										zu verlangen.
										<br />
										<br />
										- Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht,
										können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
										<br />
										<br />
										- Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur
										Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben
										Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen
										Daten zu verlangen.
										<br />
										<br />
										- Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine
										Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht
										feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der
										Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
										<br />
										<br />
										Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen
										diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur
										Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der
										Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines
										wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats
										verarbeitet werden.
									</p>

									<h4 class="mt-6 mb-4 text-lg font-bold">SSL- bzw. TLS-Verschlüsselung</h4>
									<p class="mb-4">
										Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
										vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an
										uns als Seitenbetreiber senden, eine SSL- bzw. TLS- Verschlüsselung. Eine
										verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
										von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer
										Browserzeile.
										<br />
										<br />
										Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an
										uns übermitteln, nicht von Dritten mitgelesen werden.
									</p>

									<h3 class="mt-10 mb-4 text-xl font-bold">4. Datenerfassung auf dieser Website</h3>

									<h4 class="mt-6 mb-4 text-lg font-bold">
										Anfrage per E-Mail, Telefon oder Telefax
									</h4>
									<p class="mb-4">
										Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage
										inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage)
										zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
										Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
										<br />
										<br />
										Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
										sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
										vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
										auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
										Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1
										lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
										<br />
										<br />
										Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis
										Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder
										der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
										Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen
										– bleiben unberührt.
									</p>

									<p class="my-16">
										Quelle: <a
											href="https://www.e-recht24.de"
											class="underline hover:text-[rgb(0,0,255)]">https://www.e-recht24.de</a
										>
									</p>
								</div>
							{/if}
							<div class="my-20"></div>
						</div>
					{/key}
				</div>
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
