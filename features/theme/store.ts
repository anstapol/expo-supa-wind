import { Platform } from "react-native";
import { create } from "zustand";
import { secureStorage } from "~/features/infra/secure-storage";
import type { ThemePreference } from "./types";

const PREFERENCE_KEY = "theme-preference";

type SetColorScheme = (value: "light" | "dark" | "system") => void;

function applyColorScheme(
	preference: ThemePreference,
	setColorScheme: SetColorScheme,
) {
	if (Platform.OS === "web" && preference === "system") {
		const isDark =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		setColorScheme(isDark ? "dark" : "light");
	} else {
		setColorScheme(preference);
	}
}

type ThemeState = {
	preference: ThemePreference;
	isLoaded: boolean;
};

type ThemeActions = {
	initialize: (setColorScheme: SetColorScheme) => void;
	setPreference: (
		preference: ThemePreference,
		setColorScheme: SetColorScheme,
	) => void;
};

type ThemeStore = ThemeState & { actions: ThemeActions };

export const useThemeStore = create<ThemeStore>((set) => ({
	preference: "system",
	isLoaded: false,

	actions: {
		initialize: async (setColorScheme) => {
			const stored = await secureStorage.getItem(PREFERENCE_KEY);
			const VALID_PREFS: readonly string[] = ["system", "light", "dark"];
			const preference: ThemePreference =
				stored && VALID_PREFS.includes(stored)
					? (stored as ThemePreference)
					: "system";
			applyColorScheme(preference, setColorScheme);
			set({ preference, isLoaded: true });
		},

		setPreference: async (preference, setColorScheme) => {
			applyColorScheme(preference, setColorScheme);
			set({ preference });
			await secureStorage.setItem(PREFERENCE_KEY, preference);
		},
	},
}));

export const useTheme = () => useThemeStore((s) => s.preference);
export const useThemeLoaded = () => useThemeStore((s) => s.isLoaded);
export const useThemeActions = () => useThemeStore((s) => s.actions);
