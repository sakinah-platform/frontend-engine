import React, {
	forwardRef,
	useEffect,
	// useImperativeHandle,
	useRef,
} from "react";

// Define the props for the TextInput component
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: string;
	className?: string;
	isFocused?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ type = "text", className = "", isFocused = false, ...props }) => {
		const localRef = useRef<HTMLInputElement | null>(null);

		// Expose a `focus` method through the forwarded ref
		// useImperativeHandle(ref, () => ({
		// 	focus: () => localRef.current?.focus(),
		// }));

		// Focus the input if `isFocused` is true on mount or when it changes
		useEffect(() => {
			if (isFocused) {
				localRef.current?.focus();
			}
		}, [isFocused]);

		return (
			<input
				{...props}
				type={type}
				className={
					"rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " +
					className
				}
				ref={localRef}
			/>
		);
	}
);
TextInput.displayName = "TextInput";

export default TextInput;
