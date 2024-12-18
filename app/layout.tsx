import "./globals.css";
import Head from "next/head";

import ClientRootLayout from "./RootLayout";

export const metadata = {
	title: "Sakinah Wedding Platform",
	description:
		"Your path to a dream wedding. Platform for wedding organization and planning.",
	icons: {
		icon: "/logo/PNG/tertiary_1.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='id'>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<link rel='shortcut icon' href={metadata.icons.icon} />
			</Head>
			<body
				className='antialiased'
				data-new-gr-c-s-check-loaded={"14.1211.0"}
				data-gr-ext-installed=''>
				<ClientRootLayout data-new-gr-c-s-check-loaded='14.1211.0'>
					{children}
				</ClientRootLayout>
			</body>
		</html>
	);
}
