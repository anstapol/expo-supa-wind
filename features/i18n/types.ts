import type en from "./translations/en";

type DotPaths<T, Prefix extends string = ""> = {
	[K in keyof T & string]: T[K] extends Record<string, unknown>
		? DotPaths<T[K], `${Prefix}${K}.`>
		: `${Prefix}${K}`;
}[keyof T & string];

export type TranslationKey = DotPaths<typeof en>;

export type Locale = "en";

export const LOCALES: { value: Locale; label: string }[] = [
	{ value: "en", label: "English" },
];
