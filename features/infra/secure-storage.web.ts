const storage = typeof window !== "undefined" ? window.localStorage : undefined;

export const secureStorage = {
	getItem(key: string) {
		return storage?.getItem(key) ?? null;
	},
	setItem(key: string, value: string) {
		storage?.setItem(key, value);
	},
	removeItem(key: string) {
		storage?.removeItem(key);
	},
};
