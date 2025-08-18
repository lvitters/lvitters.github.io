import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// use adapter-static
		adapter: adapter({
			// default options
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // use '404.html' for true SPAs, or 'index.html'
			precompress: false,
			strict: true
		})
	}
};

export default config;
