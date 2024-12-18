import {
	faChevronDown,
	faTrash,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface Option {
	id: unknown;
	label: string;
}

interface DropdownProps {
	placeholder: string;
	options: Option[];
	onSelect?: (option: Option) => void;
	idName: string;
	values: number[];
	setFieldValue: (field: string, value: number | number[]) => void;
	isOpen: boolean; // Check if this dropdown is open
	setOpenDropdown: () => void; // Open this dropdown
	closeDropdown: () => void; // Close the dropdown
}

export const DropdownWithSearch: React.FC<DropdownProps> = ({
	placeholder,
	options,
	idName,
	values,
	setFieldValue,
	isOpen,
	setOpenDropdown,
	closeDropdown,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	// const [isOpen, setIsOpen] = useState(false);
	const toggleDropdown = () => {
		if (isOpen) {
			closeDropdown(); // Close the dropdown if already open
		} else {
			setOpenDropdown(); // Open the dropdown
		}
	};

	// Filter options based on search term
	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleCheckboxChange = (optionId: number, checked: boolean) => {
		const updatedValues = checked
			? [...values, optionId]
			: values.filter((id) => id !== optionId);
		setFieldValue(idName, updatedValues);
	};

	return (
		<>
			<div className='relative'>
				<button
					className='btn-outline-primary text-primary2 bg-white w-full flex justify-between items-center shadow-lg'
					onClick={toggleDropdown}>
					<div>
						{values.length > 0 && (
							<span className='px-2 py-1 bg-primary text-white font-bold rounded-full me-2 text-xs'>
								{values.length}
							</span>
						)}
						{placeholder}
					</div>
					<FontAwesomeIcon icon={faChevronDown} />
				</button>
				{/* Dropdown List */}
				{isOpen && (
					<ul className='absolute mt-1 top-100 left-0 right-0 overflow-y-auto max-h-64 border border-primary z-50 bg-white rounded-md min-w-[200px]'>
						<li className='text-end text-red-800 text-sm cursor-pointer flex justify-between items-center pt-1 px-3'>
							{/* Tutup */}
							{values.length > 0 && (
								<span
									className='text-sm text-red-800 cursor-pointer'
									onClick={() => setFieldValue(idName, [])}>
									<FontAwesomeIcon icon={faTrash} className='me-2' />
									Hapus
								</span>
							)}
							<span className='ms-auto' onClick={toggleDropdown}>
								Tutup
								{/* <FontAwesomeIcon
									icon={faXmark}
								/> */}
							</span>
						</li>
						<li className='relative'>
							<input
								type='text'
								placeholder='Cari ...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full px-5 py-2 mt-1 rounded-md border border-primary shadow'
							/>
							{searchTerm && (
								<button
									type='button'
									onClick={() => setSearchTerm("")}
									className='absolute py-1 right-3 top-1/2 transform -translate-y-1/2 text-sm text-primary'>
									<FontAwesomeIcon icon={faXmarkCircle} />
								</button>
							)}
						</li>
						{/* <hr className='border border-primary shadow' /> */}
						{filteredOptions.map((option, i) => {
							const targetLabel = `checked-checkbox-${idName}-${option.id}`;
							return (
								<li
									key={i}
									className='mx-4 my-1 p-1 transition cursor-pointer hover:bg-secondary2 hover:rounded-lg'>
									<div className='flex items-center'>
										<input
											id={targetLabel}
											type='checkbox'
											value={Number(option.id)}
											checked={values.includes(Number(option.id))}
											onChange={(e) =>
												handleCheckboxChange(
													Number(option.id),
													e.target.checked
												)
											}
											className={`w-5 h-5 text-primary border-primary rounded${
												values.includes(Number(option.id)) ? "-full" : ""
											} transition hover:rounded-full focus:ring-amber-500 focus:ring-2`}
										/>
										<label
											htmlFor={targetLabel}
											className='ms-2 text-md lg:text-lg font-medium text-gray-900 w-full'>
											{option.label}
										</label>
									</div>
								</li>
							);
						})}
						{/* {filteredOptions.map((option) => (
							<li
								key={option.id}
								onClick={() => handleSelect(option)}
								style={{
									padding: "8px",
									cursor: "pointer",
									borderBottom: "1px solid #eee",
								}}>
								{option.label}
							</li>
						))} */}
						{filteredOptions.length === 0 && (
							<li style={{ padding: "8px", color: "#888" }}>
								No results found
							</li>
						)}
					</ul>
				)}
			</div>
		</>
	);
};
