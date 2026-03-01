import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config;
