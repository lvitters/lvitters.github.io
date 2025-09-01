import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), enhancedImages(), sveltekit(), devtoolsJson()],
	build: {
		chunkSizeWarningLimit: 2000,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// split node_modules into separate chunks
					if (id.includes('node_modules')) {
						if (id.includes('p5')) return 'vendor-p5';
						if (id.includes('svelte')) return 'vendor-svelte';
						return 'vendor';
					}

					// split components into logical groups (numbered by priority - top components first)
					if (id.includes('src/lib/components/')) {
						const componentName = id.split('/').pop()?.replace('.svelte', '') || '';
						if (['Rauschen', 'Archive'].includes(componentName)) return 'components-1';
						if (['RayArray', 'FeedbackCube', 'EinHauchVonTullv2'].includes(componentName))
							return 'components-2';
						if (['Untiled', 'EinHauchVonTull', 'Rooms'].includes(componentName))
							return 'components-3';
						if (['Blob', 'BreakThePattern', 'ImageBlender'].includes(componentName))
							return 'components-4';
						return 'components-5';
					}
				}
			}
		}
	}
});
