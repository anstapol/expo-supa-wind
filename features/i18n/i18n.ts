import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en";
import type { Locale } from "./types";

const SUPPORTED_LOCALES: readonly Locale[] = ["en"];

function isLocale(value: string): value is Locale {
	return SUPPORTED_LOCALES.includes(value as Locale);
}

function getDeviceLocale(): Locale {
	const deviceLocales = getLocales();
	const primary = deviceLocales[0]?.languageCode ?? "en";
	return isLocale(primary) ? primary : "en";
}

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
	},
	lng: getDeviceLocale(),
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
