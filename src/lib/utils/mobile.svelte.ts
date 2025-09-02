import { browser } from '$app/environment';

// custom mobile breakpoint
export const MOBILE_BREAKPOINT = 1000;

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
