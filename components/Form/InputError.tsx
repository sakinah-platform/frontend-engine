import React from "react";

interface InputErrorProps extends React.HTMLProps<HTMLParagraphElement> {
	message?: string | null;
	className?: string;
}

export default function InputError({
	message,
	className = "",
	...props
}: InputErrorProps): JSX.Element | null {
	return message ? (
		<p {...props} className={`text-sm text-red-600 ${className}`}>
			{message}
		</p>
	) : null;
}
