import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import env from "./env";
import { secureStorage } from "./secure-storage";

export const supabase = createClient(
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

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
