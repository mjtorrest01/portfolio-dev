/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
	namespace App {
		interface Locals {
			locale: 'es' | 'en';
		}
		interface PageData {
			locale: 'es' | 'en';
			messages: Record<string, unknown>;
		}
	}
}

export {};
