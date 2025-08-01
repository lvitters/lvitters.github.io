<script lang="ts">
	interface Props {
		centered?: boolean;
	}

	let { centered = false }: Props = $props();
</script>

<nav
	class={`absolute z-50 ml-2 flex rounded-md border-r border-b border-white/20 bg-white/20 px-2 pt-0.5 backdrop-blur-sm transition-all duration-500 ease-in-out ${
		centered
			? 'top-1/2 -translate-y-1/2 flex-col items-start justify-center'
			: 'top-8 flex-row items-center gap-4'
	}`}
	style="left: calc(33.33vw / 2); transform: translateX(-50%);"
>
	<div class="font-consolas flex space-x-4 text-[10px]">
		<a href="/" class="cursor-pointer pr-5 text-[rgb(0,0,255)] underline transition-colors">
			Lucca Vitters
		</a>
		<a
			href="/works"
			class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
		>
			selected works
		</a>
		<div>|</div>
		<a
			href="/about"
			class="cursor-pointer text-black underline transition-colors hover:text-[rgb(0,0,255)]"
		>
			about
		</a>
	</div>
</nav>
