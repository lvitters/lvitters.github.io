// see https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		mountBlobSketch: (containerId: string) => () => void;
		mountUntiledFullSketch: (containerId: string) => () => void;
		mountUntiledPreviewSketch: (containerId: string) => () => void;
		mountRoomsSketch: (containerId: string) => () => void;
		p5?: typeof import('p5');
	}
}

export {};
