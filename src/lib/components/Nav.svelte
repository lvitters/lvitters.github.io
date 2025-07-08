<script lang="ts">
	interface Props {
		centered?: boolean;
	}

	let { centered = false }: Props = $props();
</script>

<nav
	class={`absolute transition-all duration-500 ease-in-out ${
		centered
			? 'top-1/2 left-8 flex -translate-y-1/2 flex-col items-start justify-center'
			: 'top-8 left-8 flex flex-row items-center gap-4'
	}`}
>
	<div class="font-consolas flex space-x-4 text-[10px]">
		<a href="/" class="cursor-pointer px-5 text-[rgb(0,0,255)] underline transition-colors">
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
