import ReactSelect from "react-select";

type Option = {
	value: string | number;
	label: string;
};

interface Select2RSProps {
	className?: string;
	label?: string;
	id: string;
	isMulti?: boolean;
	data: Option[];
	name: string;
	error?: string;
	touched?: boolean;
	handleChange: (value: any) => void;
	handleBlur: (e: React.FocusEvent) => void;
	values: any; // Adjust as needed based on your form library (e.g., Formik or others)
	placeholder?: string;
}

const Select2RS: React.FC<Select2RSProps> = ({
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
}) => {
	return (
		<div className={className}>
			{label && (
				<label htmlFor={id} className='form-label'>
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
				value={
					isMulti
						? data.filter((option) => values?.includes(option.value)) // Multi-select
						: data.find((option) => option.value === values) // Single-select
				}
				placeholder={placeholder}
			/>
			{error && touched && (
				<div className='invalid-feedback d-block'>{error}</div>
			)}
		</div>
	);
};

export { Select2RS };
