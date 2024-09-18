export function getAPI (): string {
	return import.meta.env.VITE_API;
}

export function isDevelopment (): boolean {
	return !isProduction();
}

export function isProduction (): boolean {
	return import.meta.env.PROD;
}
