import { focusManager, QueryClient } from "@tanstack/react-query";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";
import { queryPersister } from "~/features/infra/query-persister";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 1000 * 60 * 5, // 5 minutes — persister handles long-term storage
			retry: 2,
			persister: queryPersister.persisterFn,
		},
		mutations: {
			retry: 0,
		},
	},
});

focusManager.setEventListener((handleFocus) => {
	const subscription = AppState.addEventListener(
		"change",
		(status: AppStateStatus) => {
			handleFocus(status === "active");
		},
	);
	return () => subscription.remove();
});
