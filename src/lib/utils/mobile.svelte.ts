import { browser } from '$app/environment';

// mobile breakpoint - matches Tailwind's `md` breakpoint
export const MOBILE_BREAKPOINT = 768;

// global reactive mobile state using Svelte 5 runes, all components can import and use this directly
class MobileState {
	current = $state(browser ? window.innerWidth < MOBILE_BREAKPOINT : false);

	constructor() {
		if (browser) {
			const updateMobile = () => {
				this.current = window.innerWidth < MOBILE_BREAKPOINT;
			};

			window.addEventListener('resize', updateMobile);
		}
	}
}

export const mobile = new MobileState();
