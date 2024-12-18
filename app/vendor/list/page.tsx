"use client";

import { Footer } from "@/components/Footer";
import { MainNavbar } from "@/components/MainNavbar";
import { UpReveal } from "@/components/MotionTemplate";
import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import Image from "next/image";
import { SliderPhotos } from "@/components/SliderCard";
import { useEffect, useState } from "react";
import { DropdownWithSearch } from "@/components/MainDropdown";
import { dataDropdown } from "@/lib/dataSelect";
import { MainNavPagination } from "@/components/MainNavPagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchVendorCategory } from "@/lib/redux/slicer/CategorySlicer";
import { fetchVendor } from "@/lib/redux/slicer/VendorSlicer";
import { fetchCity } from "@/lib/redux/slicer/CitySlicer";

export default function ListVendor() {
	const [currentPage, setCurrentPage] = useState(1);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const { category, loadingCategory } = useSelector(
		(state: RootState) => state.categories
	);
	const { vendor, loadingVendor } = useSelector(
		(state: RootState) => state.vendors
	);
	const { city, loadingCity } = useSelector((state: RootState) => state.cities);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchVendorCategory());
		dispatch(fetchVendor());
		dispatch(fetchCity());
	}, [dispatch]);

	interface FilterValues {
		nama: string;
		kota: number[];
		harga: number[];
		category: number[];
	}
	// const kota = [
	// 	{ id: 1, name: "Garut" },
	// 	{ id: 2, name: "Kab. Tasikmalaya" },
	// 	{ id: 3, name: "Kota Tasikmalaya" },
	// ];
	// const harga = [
	// 	{ id: 1, nama: "$" },
	// 	{ id: 2, nama: "$$" },
	// 	{ id: 3, nama: "$$$" },
	// ];
	// const category = [
	// 	{ id: 1, title: "Attire" },
	// 	{ id: 2, title: "Catering" },
	// 	{ id: 3, title: "Souvenir" },
	// 	{ id: 4, title: "Hantaran" },
	// 	{ id: 5, title: "Hotel" },
	// 	{ id: 6, title: "Convention Hall" },
	// 	{ id: 7, title: "Decoration" },
	// 	{ id: 8, title: "Entertain" },
	// 	{ id: 9, title: "Garden" },
	// 	{ id: 10, title: "Invitation" },
	// 	{ id: 11, title: "Live Streaming" },
	// 	{ id: 12, title: "Mahar" },
	// 	{ id: 13, title: "MC" },
	// 	{ id: 14, title: "Photographer" },
	// 	{ id: 15, title: "Videographer" },
	// 	{ id: 16, title: "Wedding Organizer" },
	// ];

	const photos = [
		{
			title: "Every Venues and Vendors in town are ready to serve you",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-1.png",
		},
		{
			title: "A fairy-tale wedding does not need to be expensive",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-2.png",
		},
		{
			title: "Plan your wish for a fairy-tale wedding",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-3.png",
		},
		{
			title: "Every Venues and Vendors in town are ready to serve you",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-1.png",
		},
		{
			title: "A fairy-tale wedding does not need to be expensive",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-2.png",
		},
		{
			title: "Plan your wish for a fairy-tale wedding",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-3.png",
		},
	];

	return (
		<>
			<MainNavbar />
			<div className='px-3 py-2 lg:container mx-auto'>
				<div className='md:mx-16 mt-16 mb-8'>
					<UpReveal>
						{/* <BannerWithText url='/banner/bg-2.png'>
							<div className='pe-12 p-12 lg:p-28 font-bold text-lg lg:text-2xl'>
								Look! The Heaven Near Us
								<br />
								Let&apos;s explore our venues
							</div>
						</BannerWithText> */}
						<div className='mt-12 h-40 rounded-lg'>
							<SliderPhotos photos={photos} qty={3} />
						</div>
						<div className='md:mx-32 mb-4'>
							<Formik<FilterValues>
								initialValues={{
									nama: "",
									kota: [],
									harga: [],
									category: [],
								}}
								onSubmit={(values) => console.log(values)}>
								{({
									values,
									// errors,
									// touched,
									handleChange,
									handleBlur,
									handleSubmit,
									setFieldValue,
								}) => (
									<form onSubmit={handleSubmit}>
										<div className='relative p-2 sm:mx-8 bg-white shadow-lg rounded-lg bg-white my-3'>
											<input
												className='bg-white shadow-lg rounded-lg p-2 border border-primary w-full pr-16'
												placeholder='Cari Vendor..'
												name='nama'
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.nama}
											/>
											<button
												type='button'
												className='btn-primary absolute py-1 right-3 top-1/2 transform -translate-y-1/2'>
												<FontAwesomeIcon icon={faSearch} />
											</button>
										</div>
										<div className='flex gap-4 items-center'>
											<div className='grid grid-cols-2 sm:gap-4 gap-1 grow'>
												{loadingCategory || loadingCity ? (
													"Loading..."
												) : (
													<>
														{[
															{
																placeholder: "Kategori",
																idName: "category",
																data: category,
															},
															{
																placeholder: "Kota",
																idName: "kota",
																data: city,
															},
															// {
															// 	placeholder: "Harga",
															// 	idName: "harga",
															// 	data: harga,
															// },
														].map((item, i) => {
															// Narrow the type to ensure TypeScript treats it as number[]
															const dropdownValues = values[
																item.idName as keyof Omit<FilterValues, "nama">
															] as number[];

															return (
																<DropdownWithSearch
																	key={i}
																	placeholder={item.placeholder}
																	options={dataDropdown(
																		item.data,
																		"id",
																		"name"
																	)}
																	idName={item.idName}
																	values={dropdownValues} // Now explicitly typed as number[]
																	setFieldValue={setFieldValue}
																	isOpen={openDropdown === item.idName} // Check if this dropdown should be open
																	setOpenDropdown={() =>
																		setOpenDropdown(item.idName)
																	} // Open this dropdown
																	closeDropdown={() => setOpenDropdown(null)} // Close the dropdown
																/>
															);
														})}
													</>
												)}
											</div>
											<button
												onClick={() => handleSubmit}
												className='btn-primary px-5 place-self-end font-bold'>
												Filter
											</button>
										</div>
									</form>
								)}
							</Formik>
						</div>
						<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mx-16'>
							{loadingVendor
								? "Loading..."
								: vendor.length > 0
								? vendor?.map((item, i) => {
										// const urutan = i + 13 * currentPage - 12;
										return (
											<div
												className='shadow-lg rounded-tl-3xl rounded-br-3xl p-4 bg-white'
												key={i}>
												<div className='border-2 border-primary rounded-tl-3xl rounded-br-3xl rounded-lg'>
													<div className='relative w-82 min-h-40 max-h-64'>
														<Image
															// src={`/photos/vendor-${urutan % 7}.jpeg`}
															src={item.profile_image}
															alt='banner'
															fill
															className='shadow-lg object-cover rounded-tl-3xl rounded-tr-md rounded-bl-md border-b-2 border-primary'
														/>
													</div>
													<div className='relative p-5 -mt-10 text-sm capitalize'>
														<div className='absolute top-10 right-0 max-w-[20%]'>
															<div className='bg-tertiary p-1 rounded-bl-xl w-8 h-3'>
																{/* <div className='text-white text-center'>
															{Array.from({ length: (i % 3) + 1 }).map(
																(_, j) => (
																	<FontAwesomeIcon icon={faDollar} key={j} />
																)
															)}
														</div> */}
															</div>
														</div>
														<div className='font-alice text-lg bg-white rounded-full -ms-4 p-2 w-[95%] border-t-2 border-primary'>
															<span className='ms-2'>{item.name}</span>
														</div>
														<p>kategori {item.id}</p>
														<p>Kota {item.id}</p>
														{/* ## RATING
											<p className='text-tertiary'>
												{Array.from({ length: 5 }).map((item, i) => (
													<FontAwesomeIcon key={i} icon={faStar} />
												))}
											</p>
											<p>5/5 (1.999 Ulasan)</p> */}
														<button className='transition ease-out btn-outline-primary2 w-[90%] rounded-br-2xl text-sm mt-2'>
															Daftar Harga
														</button>
														<FontAwesomeIcon
															icon={faTag}
															className='text-primary absolute end-0 bottom-2 text-3xl border-white me-4'
														/>
													</div>
												</div>
											</div>
										);
								  })
								: "Vendor yang Anda cari tidak ada"}
						</div>
						{vendor?.length > 5 && (
							<MainNavPagination
								totalPage={5}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						)}
					</UpReveal>
				</div>
				<Footer />
			</div>
		</>
	);
}
