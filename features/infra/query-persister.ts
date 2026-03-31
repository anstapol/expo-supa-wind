import {
	experimental_createQueryPersister,
	type PERSISTER_KEY_PREFIX,
} from "@tanstack/query-persist-client-core";
import { createMMKV } from "react-native-mmkv";

const mmkv = createMMKV({ id: "tanstack-query" });

const prefix: typeof PERSISTER_KEY_PREFIX = "tanstack-query";

export const queryPersister = experimental_createQueryPersister({
	storage: {
		getItem: (key) => mmkv.getString(key) ?? null,
		setItem: (key, value) => mmkv.set(key, value),
		removeItem: (key) => {
			mmkv.remove(key);
		},
		entries: () =>
			mmkv
				.getAllKeys()
				.filter((key) => key.startsWith(prefix))
				.map((key) => [key, mmkv.getString(key) ?? ""] as [string, string]),
	},
	maxAge: 1000 * 60 * 60 * 12, // 12 hours
});
