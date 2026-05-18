import {
	experimental_createQueryPersister,
	type PERSISTER_KEY_PREFIX,
} from "@tanstack/query-persist-client-core";

export const queryPersister = experimental_createQueryPersister({
	storage: {
		getItem: (key) => sessionStorage.getItem(key),
		setItem: (key, value) => sessionStorage.setItem(key, value),
		removeItem: (key) => sessionStorage.removeItem(key),
		entries: () =>
			Object.entries(sessionStorage).filter(([key]) =>
				key.startsWith("tanstack-query" satisfies typeof PERSISTER_KEY_PREFIX),
			),
	},
	maxAge: 1000 * 60 * 60 * 12, // 12 hours
});
