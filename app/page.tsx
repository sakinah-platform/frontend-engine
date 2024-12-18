"use client";
import {
	CountingText,
	UpReveal,
	UpRevealWord,
} from "@/components/MotionTemplate";
import { SliderCard } from "@/components/SliderCard";
import { useEffect } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { useDispatch, useSelector } from "react-redux";
// import { categoryReducer } from "../lib/redux/slicer/CategorySlicer";
import { AppDispatch, RootState } from "../lib/store";
import { Form, Formik } from "formik";
import Image from "next/image";
import { BannerWithText } from "@/components/BannerWithText";
import { Footer } from "@/components/Footer";
import { fetchVendorCategory } from "@/lib/redux/slicer/CategorySlicer";

export default function Home() {
	// const [template, setTemplate] = useState(0);
	const { category, loadingCategory } = useSelector(
		(state: RootState) => state.categories
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchVendorCategory());
	}, [dispatch]);

	type ExplainType = {
		title: string;
		desc: string;
		link: string;
		image: string;
	};

	// const category: CategoriesType[] = [
	// 	{ title: "Attire" },
	// 	{ title: "Catering" },
	// 	{ title: "Souvenir" },
	// 	{ title: "Hantaran" },
	// 	{ title: "Hotel" },
	// 	{ title: "Convention Hall" },
	// 	{ title: "Decoration" },
	// 	{ title: "Entertain" },
	// 	{ title: "Garden" },
	// 	{ title: "Invitation" },
	// 	{ title: "Live Streaming" },
	// 	{ title: "Mahar" },
	// 	{ title: "MC" },
	// 	{ title: "Photographer" },
	// 	{ title: "Videographer" },
	// 	{ title: "Wedding Organizer" },
	// ];

	const explains: ExplainType[] = [
		{
			title: "Semua Venue dan Vendor di tiap kota siap melayani Anda",
			desc: "Ini deskripsi untuk Venue dan Vendor",
			link: "#",
			image: "photo-1.png",
		},
		{
			title: "Pernikahan impianmu lebih mudah tercapai",
			desc: "Ini deskripsi untuk fitur",
			link: "#",
			image: "photo-2.png",
		},
		{
			title: "Kita rencanain pernikahan impianmu",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "photo-3.png",
		},
	];

	const reviews = [
		{
			content:
				"Thank you so much for making my dream wedding come true. Thank you for making my wedding easier and for being patient with my many demands. The decorations were so beautiful that even my friends asked who made the decorations.",
			photo: "testi-1.png",
			bride: "Amy",
			groom: "Dicky",
			date: "August 2023",
		},
		{
			content:
				"A big thank you to all the teams that helped us execute our wedding. It was very good, even exceeded our expectations.",
			photo: "testi-2.png",
			bride: "Hinata",
			groom: "Naruto",
			date: "December 2023",
		},
		{
			content:
				"Thank you so much for making my dream wedding come true. Thank you for making my wedding easier and for being patient with my many demands. The decorations were so beautiful that even my friends asked who made the decorations.",
			photo: "testi-3.png",
			bride: "Fio",
			groom: "Ales",
			date: "January 2024",
		},
		{
			content:
				"A big thank you to all the teams that helped us execute our wedding. It was very good, even exceeded our expectations.",
			photo: "testi-4.png",
			bride: "Yuli",
			groom: "Samsul",
			date: "February 2024",
		},
	];

	// useEffect(() => {
	// 	dispatch(categoryReducer(category));
	// }, [categories]);
	return (
		<>
			<MainNavbar />
			<div className='px-3 py-2 md:container mx-auto'>
				<div className='md:mx-16 mt-16'>
					<UpReveal>
						<BannerWithText url='/banner/bg-1.png'>
							<div className='pe-12 p-12 lg:p-28 font-bold text-lg lg:text-2xl'>
								Yuk! ciptain
								<br />
								pernikahan
								<span className='absolute lg:ms-3 ms-1 text-center'>
									<UpRevealWord words={["Keren", "Mengagumkan", "Sempurna"]} />
								</span>
								{/* <span className='lg:ms-40 ms-28'>wedding</span> */}
								<br />
								bersama Sakinah
							</div>
						</BannerWithText>
						<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl my-10'>
							Kami sudah berhasil membersamai
							<strong className={`font-alice m-2`}>
								<CountingText from={1111} to={1357} />
							</strong>
							Pengantin
							<br />
							<strong className={`font-alice`}>
								Merencanakan pernikahan impian mereka
							</strong>
						</div>
						<div className='rounded-lg shadow bg-white p-4 text-center'>
							{loadingCategory ? (
								"Loading..."
							) : (
								<>
									<div
										className={`font-alice font-bold underline underline-offset-4 md:text-lg lg:text-2xl`}>
										Kategori apa saja yang mau Anda cari?
									</div>
									<Formik
										initialValues={{
											categories: [] as number[],
										}}
										// validationSchema={{}}
										onSubmit={(values) => {
											// same shape as initial values
											console.log(values);
											location.replace("/vendor/list");
										}}>
										{({ values, setFieldValue }) => (
											<Form>
												<div
													className={`grid ${
														category.length > 5
															? "lg:grid-rows-6 sm:grid-rows-12 sm:grid-flow-col"
															: ""
													}  gap-1 ms-10 mt-3`}>
													{/* {categories */}
													{category
														?.slice()
														?.sort((a, b) => a.name[0].localeCompare(b.name[0]))
														?.map((item, i) => (
															<div className='flex items-center' key={i}>
																<input
																	id={`checked-checkbox-${i}`}
																	type='checkbox'
																	value={i}
																	checked={values.categories.includes(i)}
																	onChange={(e) => {
																		if (e.target.checked) {
																			// Add to categories
																			setFieldValue("categories", [
																				...values.categories,
																				i,
																			]);
																		} else {
																			// Remove from categories
																			setFieldValue(
																				"categories",
																				values.categories.filter(
																					(category) => category !== i
																				)
																			);
																		}
																	}}
																	className={`w-5 h-5 text-primary border-primary rounded${
																		values.categories.includes(i) ? "-full" : ""
																	} hover:rounded-full focus:ring-amber-500 focus:ring-2`}
																	name='categories[]'
																/>
																<label
																	htmlFor={`checked-checkbox-${i}`}
																	className='ms-2 text-md lg:text-lg font-medium text-gray-900'>
																	{item.name}
																</label>
															</div>
														))}
												</div>
												<button
													type='submit'
													className='btn-primary font-bold lg:text-lg px-5 py-1.5 m-3'>
													Cari
												</button>
											</Form>
										)}
									</Formik>
								</>
							)}
						</div>
						<div className='my-3 xl:mx-24 sm:mx-auto'>
							{explains?.map((item, i) => {
								const gapDiv = "m-5 sm:mx-6 lg:mx-8 my-3";
								return (
									<div
										className='grid sm:grid-cols-2 grid-cols-1 items-center lg:mx-24'
										key={i}>
										<div
											className={`${gapDiv} ${
												i % 2 != 0 ? "md:order-last" : ""
											}`}>
											<div className='relative w-82 h-48 '>
												<Image
													src={`/photos/${item.image}`}
													alt={item.image}
													className='rounded-lg shadow object-cover'
													fill
												/>
											</div>
										</div>
										<div className={`${gapDiv} text-start`}>
											<div className='font-bold md:text-md lg:text-lg xl:text-2xl'>
												{item.title}
											</div>
											<div className='text-md my-3'>{item.desc}</div>

											<button type='button' className='btn-primary font-bold'>
												Kepoin yuk!
											</button>
										</div>
									</div>
								);
							})}
						</div>
						<div className='bg-gray-200 my-3 xl:mx-24 sm:mx-auto shadow text-center text-md md:text-lg lg:text-2xl py-8 overflow-hidden rounded-lg shadow-lg p-8 2xl:px-36 xl:px-8 lg:px-0 md:px-4 px-2'>
							<div className='font-bold pb-5'>
								{/* Hear the testimony directly from our satisfied bride and groom */}
								Nih kata pengantin yang puas dengan pelayanan kami
							</div>
							<SliderCard reviews={reviews} />
						</div>
						<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl p-10'>
							{/* Because you deserve your own fairy-tale to come true */}
							Karena kamu sangat pantas untuk menjadikan pernikahan impianmu
							menjadi nyata
							<br />
							<button type='button' className='btn-primary font-bold'>
								Daftar sekarang yuk
							</button>
						</div>
					</UpReveal>
				</div>
				<Footer />
			</div>
		</>
	);
}

{
	/* <Carousel>
		{[...Array(4)].map((_, i) => (
			<img src={`/banner/bg-1.png`} alt='' key={i} />
		))}
	</Carousel> */
}
