import i18n from "i18next";
import { create } from "zustand";
import type { Locale } from "./types";

type LocaleState = {
	locale: Locale;
};

type LocaleActions = {
	setLocale: (locale: Locale) => void;
};

type LocaleStore = LocaleState & { actions: LocaleActions };

export const useLocaleStore = create<LocaleStore>((set) => ({
	locale: "en",

	actions: {
		setLocale: (locale) => {
			i18n.changeLanguage(locale);
			set({ locale });
		},
	},
}));

export const useLocale = () => useLocaleStore((s) => s.locale);
export const useLocaleActions = () => useLocaleStore((s) => s.actions);
