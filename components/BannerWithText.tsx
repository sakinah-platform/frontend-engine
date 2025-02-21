import Image from "next/image";
import React, { useState } from "react";

const BannerWithText = ({
	url,
	children,
	className = "",
	alt = "Banner image",
}: {
	url: string;
	children?: React.ReactNode;
	className?: string;
	alt?: string;
}) => {
	const [loading, setLoading] = useState<boolean>(true);
	return (
		<div
			className={`relative rounded-lg shadow-md h-64 text-white flex items-center justify-between ${className}`}>
			{/* Optimized Background Image */}
			<Image
				src={url}
				alt={alt}
				layout='fill'
				className={`object-cover transition-opacity rounded-lg z-0 duration-300 ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={() => setLoading(false)}
				priority
			/>

			{/* Content Layer */}
			<div className='relative z-10 w-full h-full flex items-center justify-between p-6 bg-black/30 rounded-lg'>
				{children}
			</div>
		</div>
	);
};

export default BannerWithText;
