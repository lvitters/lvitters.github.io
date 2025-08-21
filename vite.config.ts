import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// split node_modules into separate chunks
					if (id.includes('node_modules')) {
						if (id.includes('p5')) return 'vendor-p5';
						if (id.includes('svelte')) return 'vendor-svelte';
						return 'vendor';
					}

					// split components into logical groups (numbered from bottom up)
					if (id.includes('src/lib/components/')) {
						const componentName = id.split('/').pop()?.replace('.svelte', '') || '';
						if (['ImageBlender', 'BreakThePattern', 'Blob'].includes(componentName))
							return 'components-1';
						if (['Rooms', 'EinHauchVonTull', 'Untiled'].includes(componentName))
							return 'components-2';
						if (['EinHauchVonTullv2', 'FeedbackCube', 'RayArray'].includes(componentName))
							return 'components-3';
						if (['Archive', 'Rauschen'].includes(componentName)) return 'components-4';
						return 'components-5';
					}
				}
			}
		}
	}
});
