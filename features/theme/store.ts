import { create } from "zustand";
import { secureStorage } from "~/features/infra/secure-storage";
import type { ThemePreference } from "./types";

const STORAGE_KEY = "theme-preference";

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
			const stored = await secureStorage.getItem(STORAGE_KEY);
			const preference = (stored as ThemePreference) ?? "system";
			setColorScheme(preference);
			set({ preference, isLoaded: true });
		},

		setPreference: async (preference, setColorScheme) => {
			setColorScheme(preference);
			set({ preference });
			await secureStorage.setItem(STORAGE_KEY, preference);
		},
	},
}));

export const useTheme = () => useThemeStore((s) => s.preference);
export const useThemeLoaded = () => useThemeStore((s) => s.isLoaded);
export const useThemeActions = () => useThemeStore((s) => s.actions);
