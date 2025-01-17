"use client";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { fetchCity } from "@/lib/redux/slicer/CitySlicer";
import dataSelect from "@/lib/dataSelect";
import InputFR from "./InputFR";
import { Select2FR } from "./SelectFR";
import {
	ActionCreatorWithPayload,
	Dispatch,
	UnknownAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { MultiValue, SingleValue } from "react-select";
import { postData } from "@/lib/crudGeneral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TypeVendor } from "@/lib/redux/slicer/VendorSlicer";

export interface TypeItem {
	[x: string]: any;
	key: string;
	label: string;
	type?: string;
	value: string;
}
type TypeOption = {
	value: string | number;
	label: string;
};

interface TypeInitVal {
	value: { [x: string]: any };
	valid: { [x: string]: Yup.AnySchema };
	routePost: string;
	idPost: number;
	slicer: ActionCreatorWithPayload<
		{ key: number; data: any },
		"biodata/biodataOneChange"
	>;
}
// {
// 	[x: string]: any;
// 	idPost: number | string;
// 	value: Record<string, any>;
// 	routePost: string | undefined;
// 	slicer:
// 		| string
// 		| ActionCreatorWithPayload<
// 				{ key: number; data: TypeItem },
// 				"biodata/biodataOneChange"
// 		  >
// 		| undefined;
// 	valid: Record<string, Yup.AnySchema>;
// }

interface TypeFormEditProps {
	items: TypeItem;
	initVal: TypeInitVal;
	processReducer: ActionCreatorWithPayload<
		any,
		"processState/toastStateReducer"
	>;
	labelBold: boolean;
	formClass?: string;
}

interface TypeGetFormProps {
	items: TypeItem;
	value: string | TypeOption[] | null | undefined;
	error?: string;
	touched?: boolean;
	handleBlur: (e: React.FocusEvent<any>) => void;
	handleChange: (
		e: SingleValue<TypeOption> | MultiValue<TypeOption> | string
	) => void;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	formClass?: string;
}

const FormEdit: FC<TypeFormEditProps> = ({
	items,
	initVal,
	labelBold = false,
	processReducer,
	formClass = "col-12 w-full",
}) => {
	// const props = usePage().props;
	const dispatch = useDispatch();
	useEffect(() => {
		fetchCity();
	}, []);
	const [edit, setEdit] = useState(false);
	const { city, loadingCity } = useSelector((state: RootState) => state.cities);
	const { category, loadingCategory } = useSelector(
		(state: RootState) => state.categories
	);

	const GetForm: FC<TypeGetFormProps> = ({
		items,
		value,
		error,
		touched,
		handleBlur,
		handleChange,
		setFieldValue,
		formClass = "col-sm-10 col-12 grow",
	}) => {
		// const isReactSelectValue = (
		// 	val: any
		// ): val is SingleValue<TypeOption> | MultiValue<TypeOption> => {
		// 	return typeof val === "object" && ("value" in val || Array.isArray(val));
		// };

		// console.log(items, value);

		switch (items.key) {
			case "city":
				return !loadingCity ? (
					<Select2FR
						labelBold={true}
						className={formClass}
						label={`${items.label}`}
						values={value as SingleValue<TypeOption>}
						data={city.map((item) => ({
							value: String(item.name), // Ensure value is string or number
							label: item.name,
						}))}
						name={items.key}
						id={items.key}
						error={error}
						touched={touched}
						handleBlur={handleBlur}
						handleChange={(val) => {
							if (val && "value" in val) {
								setFieldValue("tempat_lahir", val?.value);
							}
						}}
					/>
				) : (
					"Loading..."
				);
			case "category":
				return !loadingCity ? (
					<Select2FR
						labelBold={true}
						className={formClass}
						label={`${items.label}`}
						values={value as SingleValue<TypeOption>}
						data={category.map((item) => ({
							value: String(item.name), // Ensure value is string or number
							label: item.name,
						}))}
						name={items.key}
						id={items.key}
						error={error}
						touched={touched}
						handleBlur={handleBlur}
						handleChange={(val) => {
							if (val && "value" in val) {
								setFieldValue("tempat_lahir", val?.value);
							}
						}}
					/>
				) : (
					"Loading..."
				);

			default:
				return (
					<InputFR
						labelBold={true}
						className={formClass}
						label={`${items.label} ${
							["no_hp", "no_hp_dkt"].includes(items.key)
								? "(Tanpa Menggunakan 0 dan +62"
								: ""
						}`}
						values={value as string}
						type={items.type}
						name={items.key}
						id={items.key}
						error={error}
						touched={touched}
						handleBlur={handleBlur}
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setFieldValue(items.key, e.target.value);
						}}
					/>
				);
				break;
		}
	};

	const handleSend = async (data: Record<string, any>) => {
		const form = new FormData();
		// form.append("id", initVal.idPost);
		// form.append("key", items.key);
		// form.append([items.key], data[items.key]);

		// await postData({
		// 	dataForm: form,
		// 	route: initVal.routePost,
		// 	slicer: initVal.slicer,
		// 	prosesReducer: processReducer,
		// 	dispatch: dispatch,
		//     start:
		// });
		setEdit(false);
	};

	return (
		<div className={`${formClass} mb-2`}>
			{edit ? (
				<Formik
					initialValues={initVal.value}
					onSubmit={(val) => handleSend(val)}
					validationSchema={Yup.object(initVal.valid)}>
					{({
						handleSubmit,
						handleBlur,
						handleChange,
						values,
						errors,
						touched,
						setFieldValue,
					}) => (
						<form onSubmit={handleSubmit}>
							<div className='block sm:flex items-end m-1'>
								<GetForm
									items={items}
									value={values?.[items.key]}
									error={
										typeof errors?.[items.key] === "string"
											? (errors[items.key] as string)
											: undefined
									}
									touched={
										typeof touched?.[items.key] === "string"
											? (touched[items.key] as boolean)
											: undefined
									}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
								<div
									className={`flex col-sm-4 col-12 text-sm font-medium justify-end md:justify-start ${
										errors[items.key] || touched[items.key] ? "mb-2" : ""
									}`}>
									<button
										type='button'
										onClick={() => setEdit(!edit)}
										className='p-2.5 text-white bg-red-700 rounded-s-lg rounded-e-sm border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
										<FontAwesomeIcon icon={faXmark} />
									</button>
									<button
										type='submit'
										className={`p-2.5 text-white bg-blue-700 rounded-e-lg rounded-s-sm border ${
											!errors[items.key]
												? "border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
												: "bg-gray-500"
										}`}
										disabled={typeof errors?.[items.key] === "string"}>
										<FontAwesomeIcon icon={faCheck} />
									</button>
								</div>
							</div>
						</form>
					)}
				</Formik>
			) : (
				<ListText
					itemKey={items.key}
					label={items.label}
					handleClick={() => {
						setEdit(!edit);
					}}
					text={initVal.value[items.key]}
					labelBold={labelBold}
					formClass={formClass}
				/>
			)}
		</div>
	);
};

interface ListTextProps {
	itemKey: string;
	label: string;
	handleClick?: () => void;
	text: string;
	formClass?: string;
	labelBold?: boolean;
}

export const ListText: FC<ListTextProps> = ({
	itemKey,
	label,
	handleClick = () => null,
	text,
	formClass = "col-12 col-lg-6",
	labelBold = false,
}) => {
	// Render without calling handleClick during render
	return (
		<div className={`${formClass} text-nowrap`}>
			<label htmlFor={itemKey} className={`${labelBold ? "font-bold" : ""}`}>
				{label}
			</label>
			<p
				className={`mt-1 block w-full border p-2 rounded-lg shadow-sm text-ellipsis overflow-hidden text-start hover:bg-sky-100 border-primary ${
					typeof handleClick === "function" ? "btn" : ""
				}`}
				onClick={handleClick} // Execute handleClick on click
			>
				{text}
			</p>
		</div>
	);
};

export default FormEdit;
// function sendDataGeneral(arg0: {
// 	data: FormData;
// 	route: string;
// 	slicer: string;
// 	prosesReducer: string;
// 	dispatch: Dispatch<UnknownAction>;
// }) {
// 	throw new Error("Function not implemented.");
// }
