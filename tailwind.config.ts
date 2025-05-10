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
				primary: "var(--primary)",
				primary2: "var(--primary2)",
				primary3: "var(--primary3)",
				secondary: "var(--secondary)",
				secondary2: "var(--secondary2)",
				tertiary: "var(--tertiary)",
			},
			fontFamily: {
				playfair: ['"Playfair DIsplay"'],
				alice: ['"Alice"'],
				timesNewRoman: ["Times New Roman"],
			},
			link: {
				base: "block py-2 pl-3 pr-4 md:p-0",
				active: {
					on: "bg-primary text-white px-3 py-1 rounded-lg font-bold",
					off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
				},
				disabled: {
					on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
					off: "",
				},
			},
			borderRadius: {
				"3xl": "3rem",
				"2xl": "2rem",
				xl: "1rem",
			},
		},
	},
	plugins: [plugin()],
} satisfies Config;
