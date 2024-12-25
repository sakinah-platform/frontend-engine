"use client";
// import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "../lib/redux/StoreProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// const geistSans = localFont({
// 	src: "../components/fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });
// const geistMono = localFont({
// 	src: "../components/fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

export const metadata = {
	title: "Sakindah Wedding Platform",
	description: "Platform for wedding organization and planning.",
	icons: {
		icon: "/logo/PNG/tertiary_1.png",
	},
};

export default function ClientRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);
	return (
		<div role='main'>
			{!isLoaded ? (
				<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50'>
					<div className='text-center text-primary'>
						Sebentar ya...
						<motion.div
							className='m-auto'
							animate={{
								rotate: [0, 180],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}>
							<Image
								src='/logo/png/tertiary_1.png'
								alt='loader'
								width={150}
								height={150}
							/>
						</motion.div>
					</div>
				</div>
			) : (
				<StoreProvider>{children}</StoreProvider>
			)}
		</div>
	);
}
