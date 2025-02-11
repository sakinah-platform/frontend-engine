import React from "react";

export const BannerWithText = ({
	url,
	children,
	className,
}: {
	url: string;
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			style={{ backgroundImage: `url(${url})` }}
			className={`bg-no-repeat bg-center bg-cover rounded-lg shadow-md h-64 text-white flex items-center justify-between grid-cols-2 ${className}`}>
			{children}
		</div>
	);
};
