<script lang="ts">
	import { isLoading, loadingProgress } from '$lib/stores/loading';
	
	let progress = 0;
	
	loadingProgress.subscribe(value => {
		progress = value;
	});
</script>

<div class="fixed top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-[9999] font-consolas transition-opacity duration-500 {$isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
	<div class="text-center w-80">
		<div class="w-full h-1 bg-gray-200 rounded-sm overflow-hidden mb-5">
			<div class="h-full bg-black transition-all duration-300 ease-out rounded-sm" style="width: {progress}%"></div>
		</div>
		<p class="m-0 text-lg text-black">Loading... {Math.round(progress)}%</p>
	</div>
</div>