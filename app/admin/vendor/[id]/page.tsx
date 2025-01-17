"use client";

import { Footer } from "@/components/Footer";
import { MainNavbar } from "@/components/Navbar/Main";
import { UpReveal } from "@/components/MotionTemplate";
import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import Image from "next/image";
import { SliderPhotos } from "@/components/SliderCard";
import React, { useCallback, useEffect, useState } from "react";
import { DropdownWithSearch } from "@/components/MainDropdown";
import { dataDropdown } from "@/lib/dataSelect";
import { MainNavPagination } from "@/components/MainNavPagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchVendorCategory } from "@/lib/redux/slicer/CategorySlicer";
import { fetchVendor } from "@/lib/redux/slicer/VendorSlicer";
import { fetchCity } from "@/lib/redux/slicer/CitySlicer";
import ApplicationLogo from "@/components/ApplicationLogo";
import ListSideNav from "@/components/Navbar/ListSideNav";
import { initializeButtonNavActive } from "@/lib/handleArray";
import { Avatar, Dropdown } from "flowbite-react";
import Biodata from "./Layer/Biodata";

export default function AdminVendor({
	params,
}: {
	params: Promise<{ id: number | string }>;
}) {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		(async () => {
			try {
				// Wait for the idVendor promise to resolve
				const { id } = await params;

				// Dispatch the fetchVendor action with the resolved idVendor
				dispatch(fetchVendor({ basePath: id }));
			} catch (error) {
				console.error("Failed to fetch vendor:", error);
			}
		})();
	}, [params, dispatch]);

	const { vendor, loadingVendor } = useSelector(
		(state: RootState) => state.vendors
	);
	const selectedVendor = Array.isArray(vendor) ? vendor[0] : vendor;
	const listNav = [
		{
			label: "Menu",
			subNav: [
				{
					id: 1,
					text: "Profil",
					component:
						vendor && !loadingVendor ? (
							<Biodata vendor={selectedVendor} />
						) : null,
					// component: "null",
				},
				// {
				// 	id: 2,
				// 	text: "Galeri",
				// 	component: "null",
				// 	// component: <DataKerja org={biodata ?? org} regulator={regulator} />,
				// },
				{
					id: 3,
					text: "Paket",
					component: "null",
					// component: <Dokumen org={biodata ?? org} />,
				},
			],
		},
	];
	// const [currentPage, setCurrentPage] = useState(1);
	// const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const [buttonNavActive, setButtonNavActive] = useState(() =>
		initializeButtonNavActive(listNav[0].subNav)
	);

	const { category, loadingCategory } = useSelector(
		(state: RootState) => state.categories
	);
	// const { vendor, loadingVendor } = useSelector(
	// 	(state: RootState) => state.vendors
	// );
	const { city, loadingCity } = useSelector((state: RootState) => state.cities);

	useEffect(() => {
		dispatch(fetchVendorCategory());
		// dispatch(fetchVendor());
		dispatch(fetchCity());
		// console.log(vendor);
	}, [dispatch]);

	// const [showNav, setShowNav] = useState(screen > 450 ? true : false);
	// const [showNavDropdown, setShowNavDropdown] = useState(false);

	const navigateToTab = (index: number) => {
		nonActiveButtonNav(setButtonNavActive, index);
		activeButtonNav(setButtonNavActive, index);
		// setShowNav(false);
	};
	const activeButtonNav = useCallback(
		(
			setButton: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
			navIndex: number
		) => {
			setButton((prevVisibility) => ({
				...prevVisibility,
				[navIndex]: true,
			}));
		},
		[]
	);

	const nonActiveButtonNav = useCallback(
		(
			setButton: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
			navIndex: number
		) => {
			setButton((prevVisibility) =>
				Object.fromEntries(
					Object.keys(prevVisibility).map((key) => [
						Number(key),
						Number(key) === navIndex ? true : false,
					])
				)
			);
		},
		[]
	);

	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-4 bg-white'>
				<div className='justify-center rounded-lg mt-2'>
					<div className='p-2'>
						<div className='text-center mx-auto mx-3 relative w-36 h-8 m-4 ms-8'>
							<ApplicationLogo
								className='object-cover'
								alt='Logo Sakinah Secondary'
							/>
						</div>

						<div className='absolute end-10 top-5 md:order-2 items-center gap-3'>
							<Dropdown
								arrowIcon={false}
								inline
								label={
									<div className='p-1 rounded-full border border-white shadow-lg'>
										<Avatar
											className='object-cover rounded-full p-1 border border-primary2 shadow-lg'
											alt={selectedVendor?.name}
											img={selectedVendor?.profile_image}
											rounded
										/>
									</div>
								}>
								<Dropdown.Header>
									<span className='block text-sm'>Nama Vendor</span>
									{/* <span className='block truncate text-sm font-medium'>
										name@flowbite.com
									</span> */}
								</Dropdown.Header>
								<Dropdown.Item>
									<a href='/' target='_blank' rel='noopener noreferrer'>
										Home
									</a>
								</Dropdown.Item>
								{/* <Dropdown.Item>Settings</Dropdown.Item> */}
								{/* <Dropdown.Item>Earnings</Dropdown.Item> */}
								<Dropdown.Divider />
								<Dropdown.Item>Sign out</Dropdown.Item>
							</Dropdown>
						</div>
						<ul className='space-y-2 font-medium pt-2 hidden lg:block'>
							{listNav.map((item, i) => (
								<div key={i}>
									<span className='text-primary3 font-bold ms-5'>
										{item.label}
									</span>
									{item.subNav.map((items, j) => (
										<ListSideNav
											route={() => {
												navigateToTab(j);
											}}
											text={items.text}
											// icon={item.icon}
											active={buttonNavActive[j]}
											key={j}
										/>
									))}
								</div>
							))}
						</ul>
						<div className='block lg:hidden'>
							{/* <select
                                    className="bg-neutral-50 border-b-4 border-b-sky-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => {
                                        navigateToTab(e.target.value);
                                    }}
                                    value={buttonNavActive[0]}
                                >
                                    {listNav.length > 0 &&
                                        listNav.map((item, i) => (
                                            <option value={i} key={i}>
                                                {item.text}
                                            </option>
                                        ))}
                                </select> */}
						</div>
					</div>
				</div>
				{/* <ToastProses
                        data={toastState}
                        handleClose={() => dispatch(toastCloseReducer())}
                    /> */}

				<div className='justify-center bg-background rounded-lg shadow p-4 lg:col-span-4 xl:col-span-5'>
					{listNav[0].subNav.map(
						(item, i) =>
							buttonNavActive[i] && (
								<div className='md:mt-8' key={i}>
									<span className='text-primary2 font-bold text-lg'>
										{item.text}
									</span>
									<br />
									<div className='mt-5'>
										{loadingVendor ? "loading" : item.component}
									</div>
								</div>
							)
					)}
				</div>
			</div>
			{/* <MainNavbar />
			<div className='px-3 py-2 lg:container mx-auto'>
				<div className='md:mx-16 mt-16 mb-8'>
					<UpReveal>
						<BannerWithText url='/banner/bg-2.png'>
							<div className='pe-12 p-12 lg:p-28 font-bold text-lg lg:text-2xl'>
								Look! The Heaven Near Us
								<br />
								Let&apos;s explore our venues
							</div>
						</BannerWithText>
						<div className='mt-12 h-40 rounded-lg'>
							<SliderPhotos photos={photos} qty={3} />
						</div>
						<div className='md:mx-32 mb-4'>
							<Formik<FilterValues>
								initialValues={{
									nama: "",
									// harga: [],
									kota: 0,
									category: 0,
									// kota: [],
									// category: [],
								}}
								onSubmit={(values) => {
									console.log(values);
									const params: Record<string, string | number | undefined> = {
										...(values.nama ? { search: values.nama } : {}),
										...(values.kota ? { city: values.kota } : {}),
										...(values.category ? { category: values.category } : {}),
									};

									// Dispatch the fetchVendor action with dynamic params
									dispatch(fetchVendor(params));
								}}>
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
															// const dropdownValues = values[
															// 	item.idName as keyof Omit<FilterValues, "nama">
															// ] as number[];

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
																	// values={dropdownValues} // Now explicitly typed as number[]
																	values={
																		typeof values[
																			item.idName as keyof FilterValues
																		] === "number"
																			? (values[
																					item.idName as keyof FilterValues
																			  ] as number)
																			: null
																	} // Now explicitly typed as number[]
																	setFieldValue={setFieldValue}
																	// setFieldValue={handleChange}
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
																<div className='text-white text-center'>
															{Array.from({ length: (i % 3) + 1 }).map(
																(_, j) => (
																	<FontAwesomeIcon icon={faDollar} key={j} />
																)
															)}
														</div>
															</div>
														</div>
														<div className='font-alice text-lg bg-white rounded-full -ms-4 p-2 w-[95%] border-t-2 border-primary'>
															<span className='ms-2'>{item.name}</span>
														</div>
														<p>{item.category}</p>
														<p>{item.city}</p>
														## RATING
											<p className='text-tertiary'>
												{Array.from({ length: 5 }).map((item, i) => (
													<FontAwesomeIcon key={i} icon={faStar} />
												))}
											</p>
											<p>5/5 (1.999 Ulasan)</p>
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
			</div> */}
		</>
	);
}
