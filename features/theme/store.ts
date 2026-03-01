import { Platform } from "react-native";
import { create } from "zustand";
import type { ThemePreference } from "./types";

const STORAGE_KEY = "theme-preference";

async function getStoredValue(key: string): Promise<string | null> {
	if (Platform.OS === "web") {
		return localStorage.getItem(key);
	}
	const SecureStore = await import("expo-secure-store");
	return SecureStore.getItemAsync(key);
}

async function setStoredValue(key: string, value: string): Promise<void> {
	if (Platform.OS === "web") {
		localStorage.setItem(key, value);
		return;
	}
	const SecureStore = await import("expo-secure-store");
	await SecureStore.setItemAsync(key, value);
}

type SetColorScheme = (value: "light" | "dark" | "system") => void;

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
			const stored = await getStoredValue(STORAGE_KEY);
			const preference = (stored as ThemePreference) ?? "system";
			setColorScheme(preference);
			set({ preference, isLoaded: true });
		},

		setPreference: async (preference, setColorScheme) => {
			setColorScheme(preference);
			set({ preference });
			await setStoredValue(STORAGE_KEY, preference);
		},
	},
}));

export const useTheme = () => useThemeStore((s) => s.preference);
export const useThemeLoaded = () => useThemeStore((s) => s.isLoaded);
export const useThemeActions = () => useThemeStore((s) => s.actions);
