import React from "react";
import InputLabel from "./InputLabel";
// import TextInput from "./TextInput";
import InputError from "./InputError";
import { TextInput } from "flowbite-react";

interface InputRSProps {
	className?: string;
	label?: string;
	id?: string;
	type?: string;
	name?: string;
	error?: string | null;
	touched?: boolean | null;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	values?: string | null;
	placeholder?: string;
	readonly?: boolean;
}

const InputRS: React.FC<InputRSProps> = ({
	className = "col-md-6 col-sm-6",
	label = "",
	id,
	type = "text",
	name,
	error = null,
	touched = null,
	handleChange = null,
	handleBlur = null,
	values = null,
	placeholder = "",
	readonly = false,
}) => {
	return (
		<div className={className}>
			{label && (
				<InputLabel htmlFor={id} value={label}>
					{label}
				</InputLabel>
			)}
			<TextInput
				id={id}
				type={type}
				name={name}
				value={values || ""}
				className={`mt-1 block w-full ${error ? "is-invalid" : ""}`}
				autoComplete={name}
				onChange={handleChange || undefined}
				placeholder={placeholder}
				readOnly={readonly}
				onBlur={handleBlur || undefined}
			/>
			{(error || touched) && (
				<InputError message={error || undefined} className='mt-2' />
			)}
		</div>
	);
};

export default InputRS;
