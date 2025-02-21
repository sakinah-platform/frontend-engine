"use client";
import {
	// CountingText,
	UpReveal,
	// UpRevealWord,
} from "@/components/MotionTemplate";
import { SliderCard } from "@/components/SliderCard";
import { Key, useEffect, useState } from "react";
import { MainNavbar } from "@/components/Navbar/Main";
// import { categoryReducer } from "../lib/redux/slicer/CategorySlicer";
// import { Form, Formik } from "formik";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { TypeCategory } from "@/lib/redux/slicer/CategorySlicer";
import dynamic from "next/dynamic";
import { apiCall } from "@/lib/apiCall";
import { IconMenu } from "@/components/ImageLoader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
// 	faInstagram,
// 	faInstagramSquare,
// } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
	// const [template, setTemplate] = useState(0);
	// const { category, loadingCategory } = useSelector(
	// 	(state: RootState) => state.categories
	// );
	const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
	const [category, setCategory] = useState<TypeCategory[]>([]);
	// const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchCategory = async () => {
			const data = await apiCall<TypeCategory[]>("vendor_category");
			console.log("Fetched Category Data:", data);
			setCategory(data ?? []);
			setLoadingFetch(false);
		};

		fetchCategory();
	}, []);
	// useEffect(() => {
	// dispatch(fetchVendorCategory());
	// }, [dispatch]);

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
			title: "Semua Venue dan Vendor di setiap kota siap melayani Anda",
			desc: "Ini deskripsi untuk Venue dan Vendor",
			link: "#",
			image: "photo-1.png",
		},
		{
			title: "Solusi mudah untuk mewujudkan Pernikahan impianmu",
			desc: "Ini deskripsi untuk fitur",
			link: "#",
			image: "photo-2.png",
		},
		{
			title: "Kami bantu rencanakan pernikahan impian anda",
			desc: "This is the Description for Wedding Venues and Vendors feature",
			link: "#",
			image: "vendor-7.jpeg",
		},
	];

	const reviews = [
		{
			content:
				"Thank you for bringing my dream wedding to life! Prosesnya sangat smooth, dan kesabaran kalian terhadap setiap detail benar-benar kami hargai. Dekorasinya sangat memukau—teman-teman saya tidak berhenti membicarakan pernikahan kami yang berkesan!",
			photo: "testi-1.jpeg",
			bride: "Amy",
			groom: "Dicky",
			date: "August 2023",
		},
		{
			content:
				"A big thank you to all the teams that helped us execute our wedding. It was very good, even exceeded our expectations.",
			photo: "vendor-0.jpeg",
			bride: "Gina",
			groom: "Bayu",
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
			bride: "Zahra",
			groom: "Fakhri",
			date: "February 2024",
		},
	];

	// useEffect(() => {
	// 	dispatch(categoryReducer(category));
	// }, [categories]);
	const BannerText = dynamic(
		() => import("../components/BannerWithText").then((mod) => mod.default),
		{
			ssr: false,
			loading: () => <p>Loading...</p>,
		}
	);

	return (
		<>
			<MainNavbar />
			<div className='px-3 py-2 md:container mx-auto'>
				<div className='md:mx-16 mt-16'>
					<UpReveal>
						<BannerText url='/banner/bg-1.jpeg' className='bg-center'>
							<div className='pe-12 p-12 lg:p-28 font-bold text-lg lg:text-2xl'>
								Ciptakan moment pernikahan
								<br />
								yang tidak terlupakan
								<br />
								bersama Sakinah
							</div>
						</BannerText>
						<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl my-10'>
							Kami hadir untuk membantu Anda
							<br />
							<strong className={`font-alice`}>
								merencanakan pernikahan impian dengan mudah dan sempurna
							</strong>
						</div>
						<div className='rounded-lg shadow bg-white p-4 text-center'>
							{loadingFetch ? (
								"Loading..."
							) : (
								<>
									<div
										className={`font-alice font-bold underline underline-offset-4 md:text-lg lg:text-2xl`}>
										Layanan apa yang dibutuhkan untuk pernikahan Anda?
									</div>
									<div className='grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 justify-items-center mt-3 mb-2'>
										{category
											?.slice()
											?.sort((a: { name: string }, b: { name: string }) =>
												a.name.localeCompare(b.name)
											)
											?.map((item, i: Key | null | undefined) => (
												<a
													href={`/vendor/list?category=${item.id}`}
													className='flex shadow rounded-lg p-3 w-48 text-start items-center transition hover:bg-secondary2 hover:shadow-lg'
													key={i}>
													<div className='relative w-10 h-10'>
														<IconMenu
															src={item.icon}
															alt={`${item.name} icon`}
														/>
													</div>
													<span className='ms-2 text-md text-primary font-bold'>
														{item.name}
													</span>
												</a>
											))}
										<a
											href={`/vendor/list`}
											className='flex shadow rounded-lg p-3 w-48 text-start items-center transition hover:bg-secondary2 hover:shadow-lg'>
											<div className='relative w-10 h-10'>
												<IconMenu
													src={"/logo/PNG/submark_2.png"}
													alt={"Semua Kategori icon"}
												/>
											</div>
											<span className='ms-2 text-md text-primary font-bold'>
												Semua Kategori
											</span>
										</a>
									</div>
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
													priority={false}
												/>
											</div>
										</div>
										<div className={`${gapDiv} text-start`}>
											<div className='font-bold md:text-md lg:text-lg xl:text-2xl'>
												{item.title}
											</div>
											{/* <div className='text-md my-3'>{item.desc}</div> */}

											<button
												type='button'
												className='btn-primary font-bold mt-3'>
												Lihat selengkapnya
											</button>
										</div>
									</div>
								);
							})}
						</div>
						<div className='bg-primary2 my-3 xl:mx-24 sm:mx-auto text-center text-md md:text-lg lg:text-2xl py-8 overflow-hidden rounded-lg shadow-lg p-8 2xl:px-36 xl:px-8 lg:px-0 md:px-4 px-2'>
							<div className='font-bold text-white pb-5'>
								Cerita mereka tentang layanan kami
							</div>
							<SliderCard reviews={reviews} />
						</div>
						<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl p-10'>
							<div className='mb-3'>
								Karena kamu layak menjadikan pernikahan impianmu menjadi
								kenyataan
							</div>

							<div className='flex justify-center gap-2'>
								{Array.from({ length: 3 }).map((_, i) => (
									<div className='relative w-12 h-12' key={i}>
										<Image
											src={"/logo/PNG/tertiary_1.png"}
											alt={"bintang"}
											fill
											className='object-cover'
											priority={false}
										/>
									</div>
								))}
							</div>

							{/* <br /> */}
							{/* <a
								href='https://www.instagram.com/sakinahweddingplatform/'
								target='_blank'
								rel='noopener noreferrer'
								className='btn-primary py-2 px-4 rounded-full text-xl'>
								@sakinahweddingplatform
							</a> */}
							{/* <button type='button' className='btn-primary font-bold'>
								Daftar sekarang yuk
							</button> */}
						</div>
					</UpReveal>
				</div>
				<Footer />
			</div>
		</>
	);
}
