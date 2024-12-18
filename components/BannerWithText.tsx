import React from "react";

export const BannerWithText = ({
	url,
	children,
}: {
	url: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			style={{ backgroundImage: `url(${url})` }}
			className={`bg-no-repeat bg-center bg-cover rounded-lg shadow-md h-52 text-white flex items-center justify-between grid-cols-2`}>
			{children}
		</div>
	);
};
