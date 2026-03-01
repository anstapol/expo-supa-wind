import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
				success: "rgb(var(--color-success) / <alpha-value>)",
				danger: "rgb(var(--color-danger) / <alpha-value>)",
				warning: "rgb(var(--color-warning) / <alpha-value>)",
				info: "rgb(var(--color-info) / <alpha-value>)",
				background: "rgb(var(--color-background) / <alpha-value>)",
				surface: "rgb(var(--color-surface) / <alpha-value>)",
				foreground: "rgb(var(--color-foreground) / <alpha-value>)",
				muted: "rgb(var(--color-muted) / <alpha-value>)",
			},
		},
	},
	plugins: [],
} satisfies Config;
