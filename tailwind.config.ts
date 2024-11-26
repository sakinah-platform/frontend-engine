import type { Config } from "tailwindcss";
import { content, plugin } from "flowbite-react/tailwind";
// // import { Playfair_Display } from "next/font/google";

// const playfair = Playfair_Display({ subsets: ["latin"] });
export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		content(),
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				playfair: ['"Playfair DIsplay"'], // Correctly assign fontFamily
			},
		},
	},
	plugins: [plugin()],
} satisfies Config;
