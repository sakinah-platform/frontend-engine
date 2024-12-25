import Image, { ImageProps } from "next/image";

type ApplicationLogoProps = Omit<ImageProps, "src"> & { alt?: string };

export default function ApplicationLogo({
	alt = "Application Logo",
	...props
}: ApplicationLogoProps) {
	return <Image {...props} src='/logo/PNG/secondary_1.png' alt={alt} fill />;
}
