// See https://svelte.dev/docs/kit/types#app.d.ts
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
		cleanupBlobSketch?: () => void;
		blobSketchInitialized?: boolean;
		cleanupUntiledFullSketch?: () => void;
		untiledFullSketchInitialized?: boolean;
		cleanupUntiledPreviewSketch?: () => void;
		untiledPreviewSketchInitialized?: boolean;
		cleanupRoomsSketch?: () => void;
		roomsSketchInitialized?: boolean;
	}
}

export {};
