import { createClient } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { AppState } from "react-native";
import type { Database } from "~/features/database";
import env from "./env";
import { secureStorage } from "./secure-storage";

export const supabase = createClient<Database>(
	env.EXPO_PUBLIC_SUPABASE_URL,
	env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			storage: secureStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	},
);

/**
 * When detectSessionInUrl is false, setSession() fires SIGNED_IN instead of
 * PASSWORD_RECOVERY. We track the recovery type from the URL fragment so the
 * auth store can treat the next SIGNED_IN as a password recovery.
 */
let _pendingRecovery = false;

export function consumePendingRecovery(): boolean {
	const value = _pendingRecovery;
	_pendingRecovery = false;
	return value;
}

/** Extract tokens from a deep link URL and set the Supabase session. */
function handleDeepLinkSession(url: string) {
	const hashIndex = url.indexOf("#");
	const params =
		hashIndex !== -1 ? new URLSearchParams(url.substring(hashIndex + 1)) : null;

	const parsed = Linking.parse(url);
	const accessToken =
		(parsed.queryParams?.access_token as string | undefined) ??
		params?.get("access_token") ??
		undefined;
	const refreshToken =
		(parsed.queryParams?.refresh_token as string | undefined) ??
		params?.get("refresh_token") ??
		undefined;

	const type =
		(parsed.queryParams?.type as string | undefined) ??
		params?.get("type") ??
		undefined;

	if (type === "recovery") {
		_pendingRecovery = true;
	}

	if (accessToken && refreshToken) {
		supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: refreshToken,
		});
	}
}

// Handle the URL that launched the app (cold start)
Linking.getInitialURL().then((url) => {
	if (url) handleDeepLinkSession(url);
});

// Handle URLs when the app is already open (warm start)
Linking.addEventListener("url", ({ url }) => {
	handleDeepLinkSession(url);
});

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
