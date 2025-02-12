import React from "react";
import InputLabel from "./InputLabel";
// import TextInput from "./TextInput";
import InputError from "./InputError";
import { Textarea } from "flowbite-react";
// import { TextInput } from "flowbite-react";

interface TextareaFRProps {
	className?: string;
	label?: string;
	id?: string;
	// type?: string;
	name?: string;
	error?: string | null;
	touched?: boolean | null;
	handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	values?: string | null;
	placeholder?: string;
	readonly?: boolean;
	labelBold?: boolean;
	rows?: number;
}

const TextareaFR: React.FC<TextareaFRProps> = ({
	className = "col-12",
	label = "",
	id,
	// type = "text",
	name,
	error = null,
	touched = null,
	handleChange = null,
	handleBlur = null,
	values = null,
	placeholder = "",
	readonly = false,
	labelBold = false,
	rows = 4,
}) => {
	return (
		<div className={className}>
			{label && (
				<InputLabel
					htmlFor={id}
					value={label}
					className={labelBold ? "font-bold" : ""}>
					{label}
				</InputLabel>
			)}
			<Textarea
				id={id}
				name={name}
				value={values || ""}
				className={`mt-1 w-full ${error ? "is-invalid" : ""}`}
				autoComplete={name}
				onChange={handleChange || undefined}
				placeholder={placeholder}
				readOnly={readonly}
				onBlur={handleBlur || undefined}
				rows={rows}
			/>
			{(error || touched) && (
				<InputError message={error || undefined} className='mt-2' />
			)}
		</div>
	);
};

export default TextareaFR;
