import Image from "next/image";
import { useState } from "react";

const ImageLoader = ({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className: string;
}) => {
	const [loading, setLoading] = useState<boolean>(true);
	return (
		<>
			{loading && <span>loading...</span>}
			<Image
				fill
				src={src}
				alt={alt}
				className={`${className} transition-opacity duration-300 ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={() => setLoading(false)}
				priority={false}
			/>
		</>
	);
};

export default ImageLoader;

export const IconMenu = ({ src, alt }: { src: string; alt: string }) => {
	const [loading, setLoading] = useState(true);

	return (
		<>
			{loading && <span>loading...</span>}
			<Image
				src={src}
				alt={alt}
				height={100}
				width={100}
				priority
				className={`object-cover transition-opacity duration-300 ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={() => setLoading(false)}
			/>
		</>
	);
};
