// import FormEdit, { ListText } from "@/Components/ReactStrap/FormEdit";
// import InputRS from "@/Components/ReactStrap/Input";
// import SelectRS from "@/Components/ReactStrap/Select";
// import Select2RS from "@/Components/ReactStrap/Select2";
// import ToastProses from "@/Components/ReactStrap/ToastProses";
// import { encLaravel } from "@/Functions/crypt";
// import dataSelect, { getObjectValue } from "@/Functions/dataSelect";
// import sendDataGeneral from "@/Functions/sendDataGeneral";
// import { toastStateReducer } from "@/redux/slices/ProcessStateSlice";
// import {
//     biodataOneChange,
//     biodataOneChildChange,
// } from "@/redux/slices/Profile/biodataSlice";
// import { usePage } from "@inertiajs/react";
import FormEdit, { TypeItem } from "@/components/Form/FormEdit";
import { getObjectValue } from "@/lib/dataSelect";
import { toastStateReducer } from "@/lib/redux/slicer/ProcessSlicer";
import { biodataOneChange } from "@/lib/redux/slicer/Profile/biodataSlice";
import { TypeVendor } from "@/lib/redux/slicer/VendorSlicer";
import { RootState } from "@/lib/store";
import { Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToggleSwitch } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Biodata = ({ vendor }: { vendor: TypeVendor }) => {
	const [loading, setLoading] = useState(false);
	// const props = usePage().props;
	// const dispatch = useDispatch();
	const { city, loadingCity } = useSelector((state: RootState) => state.cities);
	const { category, loadingCategory } = useSelector(
		(state: RootState) => state.categories
	);
	// console.log("====================================");
	// console.log(vendor?.visibility);
	// console.log("====================================");
	// id: number;
	// name: string;
	// profile_image: string;
	// starting_price: number;
	// category: string;
	// city: string;
	const listData = [
		{
			key: "Biodata",
			values: [
				{ type: "text", key: "name", value: "name", label: "Nama Vendor" },

				// {
				// 	type: "text",
				// 	key: "no_hp",
				// 	value: "no_hp",
				// 	label: "No HP",
				// 	pattern: "[0-9]{,13}",
				// },
				{
					type: "select",
					key: "city",
					value: "city",
					label: "Kota Alamat",
				},
				// {
				// 	type: "number",
				// 	key: "starting_price",
				// 	value: "starting_price",
				// 	label: "starting_price",
				// },
			],
		},
		{
			key: "Kontak",
			values: [
				{
					type: "select",
					key: "category",
					value: "category",
					label: "Kategori",
				},
				{
					type: "text",
					key: "instagram",
					value: "instagram",
					label: "Instagram",
				},
				{
					type: "text",
					key: "facebook",
					value: "facebook",
					label: "Facebook",
				},
			],
		},
		{
			key: "Kontak",
			values: [
				{
					type: "email",
					key: "email",
					value: "email",
					label: "Email",
				},
				{
					type: "text",
					key: "tiktok",
					value: "tiktok",
					label: "Tiktok",
				},
				{
					type: "text",
					key: "youtube",
					value: "youtube",
					label: "Youtube",
				},
			],
		},
	];

	// useEffect(() => {
	//     setLoading(true);
	//     if (org && org?.length > 0) {
	//         setLoading(false);
	//     }
	//     // console.log(org);
	// }, [org]);

	const initVal = (
		// target: string,
		items: TypeItem
		// vendor: TypeVendor
		// biodataOneChange: any
	) => {
		let validate: Yup.AnySchema | null = null;
		let routePost = "link post";
		let idPost = vendor?.id;
		let slicer = biodataOneChange;

		// Determine slicer and routePost based on target
		// switch (target) {
		// 	case "Biodata":
		// 		slicer = biodataOneChange;
		// 		break;
		// 	case "Alamat":
		// 		// Additional logic for Alamat if needed
		// 		break;
		// 	case "Orang Terdekat":
		// 		slicer = biodataOneChildChange;
		// 		break;
		// 	default:
		// 		break;
		// }

		// Define validation schema based on item key

		switch (items.key) {
			case "city":
				validate = Yup.string()
					.oneOf(
						city.map((option) => option.name), // Extract allowed values
						"Harus ada yang dipilih"
					)
					.required("Harus ada yang dipilih");
				break;
			case "category":
				validate = Yup.string()
					.oneOf(
						category.map((option) => option.name), // Extract allowed values
						"Harus ada yang dipilih"
					)
					.required("Harus ada yang dipilih");
				break;
			// case "tanggal_lahir":
			// 	validate = Yup.date().required("Wajib diisi");
			// 	break;
			case "starting_price":
				validate = Yup.number().min(0);
				break;
			case "profile_image":
				validate = Yup.mixed()
					.required("Wajib Upload") // Ensure file upload is required
					.test(
						"fileFormat",
						"Hanya file PDF, PNG, JPG, atau JPEG yang diperbolehkan",
						(value: unknown) => {
							// Narrow the value to a file-like object
							if (!value || !(value instanceof File)) return false;
							return [
								"application/pdf",
								"image/png",
								"image/jpg",
								"image/jpeg",
							].includes(value.type);
						}
					)
					.test(
						"fileSize",
						"Ukuran file harus di bawah 4MB",
						(value: unknown) => {
							// Narrow the value to a file-like object
							if (!value || !(value instanceof File)) return false;
							return value.size <= 4194304; // 4MB in bytes
						}
					);
				break;

			// case "no_hp_dkt":
			// 	validate = Yup.string()
			// 		.test(
			// 			"valid-number",
			// 			"Harus angka, kurang dari 13 karakter, dan tidak boleh diawali '0' atau '62'",
			// 			(value) => {
			// 				if (!value) return true;
			// 				const stringValue = value.toString();
			// 				return (
			// 					/^[0-9]+$/.test(stringValue) &&
			// 					stringValue.length < 13 &&
			// 					!stringValue.startsWith("08") &&
			// 					!stringValue.startsWith("62")
			// 				);
			// 			}
			// 		)
			// 		.required("Wajib diisi");
			// 	break;
			default:
				validate = Yup.string().required("Wajib Diisi");
				break;
		}

		// Return the result with properly handled value extraction
		return {
			value: {
				[items.key]: items.value
					? items.value.includes(".")
						? getObjectValue(vendor, items.value)
						: vendor?.[items.value as keyof TypeVendor]
					: undefined, // Handle undefined `items.value`
			},
			valid: {
				[items.key]: validate,
			},
			routePost,
			idPost,
			slicer,
		};
	};

	// const AddressForm = ({ items }) => {
	//     const alamat = org.alamat;
	//     const [edit, setEdit] = useState(false);

	//     const handleSend = async (data) => {
	//         const form = new FormData();
	//         form.append("id", encLaravel(alamat.id));
	//         form.append("key", items.key);
	//         form.append("province_id", data.province_id);
	//         form.append("city_id", data.city_id);
	//         form.append("detail", data.detail);
	//         form.append("kode_pos", data.kode_pos);

	//         await sendDataGeneral({
	//             data: form,
	//             route: route("Kar.alamat.change"),
	//             slicer: biodataOneChange,
	//             prosesReducer: toastStateReducer,
	//             dispatch: dispatch,
	//         });
	//         setEdit(false);
	//     };
	//     return edit ? (
	//         <Formik
	//             initialValues={{
	//                 province_id: alamat.province_id,
	//                 city_id: alamat.city_id,
	//                 detail: alamat.detail,
	//                 kode_pos: alamat.kode_pos,
	//             }}
	//             onSubmit={(val) => handleSend(val)}
	//             validationSchema={Yup.object({
	//                 province_id: Yup.string().required("Harus diisi"),
	//                 city_id: Yup.string().required("Harus diisi"),
	//                 detail: Yup.string().required("Harus diisi"),
	//                 kode_pos: Yup.string()
	//                     .test(
	//                         "valid-number",
	//                         "Harus angka dan 5 karakter",
	//                         (value) => {
	//                             if (!value) return true;
	//                             const stringValue = value.toString();
	//                             return (
	//                                 /^[0-9]+$/.test(stringValue) &&
	//                                 stringValue.length === 5
	//                             );
	//                         }
	//                     )
	//                     .required("Harus diisi"),
	//             })}
	//         >
	//             {({
	//                 handleSubmit,
	//                 handleBlur,
	//                 handleChange,
	//                 values,
	//                 errors,
	//                 touched,
	//                 setFieldValue,
	//             }) => {
	//                 const isFormValid =
	//                     values.province_id &&
	//                     values.city_id &&
	//                     values.detail &&
	//                     /^[0-9]{5}$/.test(values.kode_pos) &&
	//                     !errors.province_id &&
	//                     !errors.city_id &&
	//                     !errors.detail &&
	//                     !errors.kode_pos;
	//                 return (
	//                     <form className="row" onSubmit={handleSubmit}>
	//                         <Select2RS
	//                             className="col-md-6 col-12"
	//                             label={"Provinsi"}
	//                             values={values.province_id}
	//                             data={dataSelect(
	//                                 props.provinces,
	//                                 "id",
	//                                 "title"
	//                             )}
	//                             name={"province_id"}
	//                             id={"province_id"}
	//                             error={
	//                                 touched.province_id && errors.province_id
	//                             }
	//                             touched={touched.province_id}
	//                             handleBlur={handleBlur}
	//                             handleChange={(selectedValue) => {
	//                                 setFieldValue(
	//                                     "province_id",
	//                                     selectedValue.value
	//                                 );
	//                                 setFieldValue("city_id", ""); // Clear city_id when province changes
	//                             }}
	//                         />
	//                         <Select2RS
	//                             className="col-md-6 col-12"
	//                             label={"Kota"}
	//                             values={values.city_id}
	//                             data={dataSelect(
	//                                 props.cities.filter(
	//                                     (item) =>
	//                                         item.province_id ===
	//                                         values.province_id
	//                                 ),
	//                                 "city_id",
	//                                 "title"
	//                             )}
	//                             name={"city_id"}
	//                             id={"city_id"}
	//                             error={touched.city_id && errors.city_id}
	//                             touched={touched.city_id}
	//                             handleBlur={handleBlur}
	//                             handleChange={(selectedValue) => {
	//                                 setFieldValue(
	//                                     "city_id",
	//                                     selectedValue.value
	//                                 );
	//                             }}
	//                         />
	//                         <InputRS
	//                             className="col-md-6 col-12"
	//                             label={`Alamat Lengkap (Tanpa Provinsi, Kota, Kode Pos)`}
	//                             values={values.detail}
	//                             name={"detail"}
	//                             id={"detail"}
	//                             error={touched.detail && errors.detail}
	//                             touched={touched.detail}
	//                             handleBlur={handleBlur}
	//                             handleChange={handleChange}
	//                         />
	//                         <InputRS
	//                             className="col-md-6 col-12"
	//                             label={`Kode Pos`}
	//                             values={values.kode_pos}
	//                             name={"kode_pos"}
	//                             id={"kode_pos"}
	//                             error={touched.kode_pos && errors.kode_pos}
	//                             touched={touched.kode_pos}
	//                             handleBlur={handleBlur}
	//                             handleChange={handleChange}
	//                         />

	//                         <div className="flex justify-end">
	//                             <button
	//                                 type="button"
	//                                 onClick={() => setEdit(!edit)}
	//                                 className="p-2.5 text-white bg-red-700 rounded-s-lg rounded-e-sm border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
	//                             >
	//                                 <i className="fa-solid fa-xmark"></i>
	//                             </button>
	//                             <button
	//                                 type="submit"
	//                                 className={`p-2.5 text-white rounded-e-lg rounded-s-sm ${
	//                                     isFormValid
	//                                         ? "border bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	//                                         : "bg-gray-500"
	//                                 }`}
	//                                 disabled={!isFormValid}
	//                             >
	//                                 <i className="fa-solid fa-check"></i>
	//                             </button>
	//                         </div>
	//                     </form>
	//                 );
	//             }}
	//         </Formik>
	//     ) : (
	//         <>
	//             <div className="row ms-auto text-end mt-1 pb-n3">
	//                 <button
	//                     type="button"
	//                     onClick={() => setEdit(!edit)}
	//                     className="col-auto mt-n3 ms-auto py-1 px-2 text-sm text-sky-700 border-2 border-sky-700 rounded-lg hover:bg-sky-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
	//                 >
	//                     <i className="fa-solid fa-pencil"></i>
	//                 </button>
	//             </div>
	//             {items.map((items1, i) => (
	//                 <div className="col-12 col-md-6" key={i}>
	//                     <ListText
	//                         itemKey={items1.key}
	//                         label={items1.label}
	//                         text={
	//                             items1.value.includes(".")
	//                                 ? getObjectValue(org, items1.value)
	//                                 : org[items1.value]
	//                         }
	//                     />
	//                 </div>
	//             ))}
	//         </>
	//     );
	// };

	return (
		<>
			<div className='bg-white rounded-lg shadow p-3 grid md:grid-cols-5 gap-4'>
				<div className='p-3 space-y-4'>
					<div className='relative w-36 h-36 mx-auto border-8 border-white rounded-full shadow-lg'>
						<Image
							className='object-cover rounded-full p-2 border border-primary2 shadow-lg'
							src={vendor?.profile_image ?? "/logo/PNG/secondary_1.png"}
							alt={`logo ${vendor?.name ?? "vendor"}`}
							fill
						/>
					</div>

					<label className='flex justify-between items-center cursor-pointer'>
						<span className='font-medium text-gray-900 dark:text-gray-300'>
							Tersedia
						</span>
						<ToggleSwitch checked={vendor?.availability} onChange={() => {}} />
					</label>
					<label className='flex justify-between items-center cursor-pointer'>
						<span className='me-auto font-medium text-gray-900 dark:text-gray-300'>
							Visibilitas
						</span>
						<span className='font-bold capitalize'>
							{vendor?.visibility} <FontAwesomeIcon icon={faChevronDown} />{" "}
						</span>
					</label>
				</div>
				{listData.map((item, i) => (
					<div
						className={`mb-2 ${
							!["Kontak"].includes(item.key) ? "lg:col-span-2" : ""
						}`}
						key={i}>
						{loading ? (
							<div role='status' className='max-w-sm animate-pulse'>
								<div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5'></div>
								<div className='h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4'></div>
								<span className='sr-only'>Loading...</span>
							</div>
						) : (
							<>
								{/* <div className='border-b-2 border-b-sky-800 fw-bold mb-3'>
								{item.key}
							</div> */}
								{/* <div className='row'> */}
								{item.key == "Alamat"
									? "cek"
									: // <AddressForm items={item.values} />
									  item.values.map((items, j) => (
											<FormEdit
												items={items}
												initVal={initVal(items)}
												processReducer={toastStateReducer}
												labelBold
												formClass='col-12'
												key={j}
											/>
									  ))}
								{/* </div> */}
							</>
						)}
					</div>
				))}
			</div>
			<div className='grid md:grid-cols-2 gap-4 my-4'>
				<div className='bg-white rounded-lg shadow p-3 gap-4'>
					<FormEdit
						items={{
							type: "text",
							key: "about",
							value: "about",
							label: "About",
						}}
						initVal={initVal({
							type: "text",
							key: "about",
							value: "about",
							label: "About",
						})}
						processReducer={toastStateReducer}
						labelBold
						formClass='col-12'
					/>
				</div>
				<div className='bg-white rounded-lg shadow p-3 gap-4'>
					<FormEdit
						items={{
							type: "text",
							key: "description",
							value: "description",
							label: "Deskripsi",
						}}
						initVal={initVal({
							type: "text",
							key: "description",
							value: "description",
							label: "Deskripsi",
						})}
						processReducer={toastStateReducer}
						labelBold
						formClass='col-12'
					/>
				</div>
			</div>
			<div className='bg-white rounded-lg shadow p-3'>
				<span className={`font-bold`}>Galeri</span>
				<div className='flex justify-start items-center gap-4'>
					{Array.from({ length: 5 }).map((item, i) => (
						<div
							key={i}
							className='transition-all ease-in-out delay-800 relative w-48 h-48 hover:w-72'>
							<Image
								src={`/photos/vendor-${i + 1}.jpeg`}
								alt={i.toString()}
								fill
								className='object-cover rounded'
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Biodata;
