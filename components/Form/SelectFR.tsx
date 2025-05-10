import ReactSelect, { MultiValue, SingleValue } from "react-select";

type Option = {
	value: string | number;
	label: string;
};

interface Select2FRProps {
	className?: string;
	label?: string;
	id: string;
	isMulti?: boolean;
	data: Option[];
	name: string;
	error?: string;
	touched?: boolean;
	handleChange: (value: SingleValue<Option> | MultiValue<Option>) => void; // Updated type for compatibility
	handleBlur: (
		e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	values: SingleValue<Option> | MultiValue<Option>;
	placeholder?: string;
	labelBold?: boolean;
}

const Select2FR: React.FC<Select2FRProps> = ({
	className = "col-md-6 col-sm-6",
	label,
	id,
	isMulti = false,
	data = [],
	name,
	error = "",
	touched = "",
	handleChange,
	handleBlur,
	values,
	placeholder = "",
	labelBold = false,
}) => {
	return (
		<div className={className}>
			{label && (
				<label
					htmlFor={id}
					className={`form-label ${labelBold ? "font-bold" : ""}`}>
					{label}
				</label>
			)}
			<ReactSelect
				isMulti={isMulti}
				name={name}
				id={id}
				options={data}
				className='basic-multi-select rounded-3 border border-dark'
				classNamePrefix={name}
				onChange={handleChange}
				onBlur={handleBlur}
				value={values}
				// value={
				// 	isMulti
				// 		? data.filter((option) => values?.includes(option.value)) // Multi-select
				// 		: data.find((option) => option.value === values) // Single-select
				// }
				placeholder={placeholder}
			/>
			{error && touched && (
				<div className='invalid-feedback d-block'>{error}</div>
			)}
		</div>
	);
};

export { Select2FR };
