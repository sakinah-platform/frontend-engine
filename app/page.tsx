"use client";
import {
	CountingText,
	UpReveal,
	UpRevealWord,
} from "@/components/MotionTemplate";
import { SliderCard } from "@/components/SliderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faGlobe, faX } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { SecondNavbar } from "@/components/SecondNavbar";
import { useDispatch, useSelector } from "react-redux";
import { categoryReducer } from "../lib/redux/slicer/CategorySlicer";
import { AppDispatch, RootState } from "../lib/store";
import { Form, Formik } from "formik";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.css";
import "./globals.css";

export default function Home() {
	const [template, setTemplate] = useState(0);
	const categories = useSelector((state: RootState) => state.categories.data);
	const dispatch = useDispatch<AppDispatch>();

	type CategoriesType = {
		[x: string]: string;
		title: string;
	};

	type ExplainType = {
		title: string;
		desc: string;
		link: string;
		image: string;
	};

	const category: CategoriesType[] = [
		{ title: "Attire" },
		{ title: "Catering" },
		{ title: "Souvenir" },
		{ title: "Hantaran" },
		{ title: "Hotel" },
		{ title: "Convention Hall" },
		{ title: "Decoration" },
		{ title: "Entertain" },
		{ title: "Garden" },
		{ title: "Invitation" },
		{ title: "Live Streaming" },
		{ title: "Mahar" },
		{ title: "MC" },
		{ title: "Photographer" },
		{ title: "Videographer" },
		{ title: "Wedding Organizer" },
	];

	const explains: ExplainType[] = [
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

	useEffect(() => {
		dispatch(categoryReducer(category));
	}, [dispatch]);
	return (
		<>
			<div className='fixed top-20 end-0 bg-white shadow-lg px-4 py-2 rounded-s-lg border-s-2 border-y-2 border-primary z-10'>
				{Array.from({ length: 2 }).map((_, i) => (
					<button
						className={`px-2 py-1 rounded me-2 border-2 border-primary ${
							template == i ? "bg-primary text-white" : ""
						}`}
						onClick={() => setTemplate(i)}
						key={i}>
						Template {i + 1}
					</button>
				))}
			</div>
			{template == 0 ? (
				<>
					<MainNavbar />
					<div className='px-3 py-2 md:container mx-auto'>
						<div className='md:mx-16'>
							<UpReveal>
								<div className="bg-[url('/banner/bg-1.png')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md h-52 text-white flex items-center justify-between grid-cols-2">
									<div className='pe-12 p-12 lg:p-28 font-bold text-lg lg:text-2xl'>
										Let&apos;s create
										<br />
										your
										<span className='absolute lg:ms-4 ms-2 text-center'>
											<UpRevealWord
												words={["Greatest", "Awesome", "Perfect"]}
											/>
										</span>
										<span className='lg:ms-40 ms-28'>wedding</span>
										<br />
										WITH US!
									</div>
								</div>
								<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl my-10'>
									We have successfully help
									<strong className={`font-alice m-2`}>
										<CountingText from={1111} to={1357} /> thousands
									</strong>
									Bride and Groom
									<br />
									<strong className={`font-alice`}>
										Plan their fairy-tale wedding
									</strong>
								</div>
								<div className='rounded-lg shadow bg-white p-4 text-center'>
									<div
										className={`font-alice font-bold underline underline-offset-4 md:text-lg lg:text-2xl`}>
										What do you need?
									</div>
									<Formik
										initialValues={{
											categories: [] as number[],
										}}
										// validationSchema={{}}
										onSubmit={(values) => {
											// same shape as initial values
											console.log(values);
										}}>
										{({ values, setFieldValue }) => (
											<Form>
												<div className='grid lg:grid-rows-6 sm:grid-rows-12 sm:grid-flow-col gap-1 ms-10 mt-3'>
													{categories
														.slice()
														.sort((a, b) =>
															a.title[0].localeCompare(b.title[0])
														)
														.map((item, i) => (
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
																	{item.title}
																</label>
															</div>
														))}
												</div>
												<button
													type='submit'
													className='btn-primary font-bold lg:text-lg px-5 py-1.5 m-3'>
													Find
												</button>
											</Form>
										)}
									</Formik>
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
													<div className='relative w-82 h-48'>
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

													<button
														type='button'
														className='btn-primary font-bold'>
														Learn More
													</button>
												</div>
											</div>
										);
									})}
								</div>
								<div className='bg-gray-200 my-3 xl:mx-24 sm:mx-auto shadow text-center text-md md:text-lg lg:text-2xl py-8 overflow-hidden rounded-lg shadow-lg p-8 2xl:px-36 xl:px-8 lg:px-0 md:px-4 px-2'>
									<div className='font-bold pb-5'>
										Hear the testimony directly from our satisfied bride and
										groom
									</div>
									<SliderCard reviews={reviews} />
								</div>
								<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl py-10'>
									Because you deserve your own fairy-tale to come true
									<br />
									<button type='button' className='btn-primary font-bold'>
										Register Now
									</button>
								</div>
								<div className='bg-primary text-white md:px-32 px-16 pt-3 pb-2 shadow-lg rounded-t-2xl shadow-lg'>
									<div className='text-center pb-1 bg-white rounded-full w-24 mx-auto'></div>
									<div className='shadow-lg text-white rounded-lg mt-10'>
										<div className='text-3xl font-bold mt-3'>
											Wedding Platform
										</div>
										<span className='text-md'>Tagline Here</span>
										<hr />
										<div className='flex text-xs py-3 justify-between'>
											<div className='flex gap-8'>
												<span>
													<FontAwesomeIcon icon={faCopyright} /> 2024 Wedding
													Platform, Inc.
												</span>
												<ul className='flex flex-wrap items-center justify-center gap-5'>
													<li>- Privacy</li>
													<li>- Terms</li>
													<li>- Sitemap</li>
												</ul>
											</div>
											<div className='flex gap-2'>
												<span>
													<FontAwesomeIcon icon={faGlobe} />
													English (US)
												</span>
												<FontAwesomeIcon icon={faFacebook} />
												<FontAwesomeIcon icon={faX} />
												<FontAwesomeIcon icon={faInstagram} />
											</div>
										</div>
									</div>
								</div>
							</UpReveal>
						</div>
					</div>
				</>
			) : (
				<>
					<SecondNavbar />
					<div className="bg-[url('/banner/bg-2.png')] bg-no-repeat bg-center bg-cover h-72 text-white text-center">
						<div className='pe-12 p-12 lg:p-28 text-lg lg:text-3xl'>
							Everything you need to plan your <br /> fairy-tale wedding
						</div>
					</div>
					<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl my-24'>
						We have successfully help X.X million Bride and Groom
						<br />
						Plan their fairy-tale wedding
					</div>
					<div className='my-3 xl:mx-24 sm:mx-auto'>
						{explains?.map((item, i) => {
							const gapDiv = "m-5 sm:mx-6 lg:mx-28 my-3";
							return (
								<div
									className='grid sm:grid-cols-2 grid-cols-1 items-center lg:mx-24'
									key={i}>
									<div
										className={`${gapDiv} ${
											i % 2 != 0 ? "md:order-last" : ""
										}`}>
										<div className='relative w-82 h-48'>
											<Image
												src={`/photos/${item.image}`}
												alt={item.image}
												className='rounded-lg shadow object-cover'
												fill
											/>
										</div>
									</div>
									<div className={`${gapDiv} text-start`}>
										<div className='md:text-md lg:text-lg xl:text-2xl'>
											{item.title}
										</div>
										<div className='text-md my-3'>{item.desc}</div>

										<button
											type='button'
											className='text-white bg-secondary hover:bg-yellow-600 focus:ring-4 focus:ring-amber-700 font-bold rounded-lg text-sm md:text-md px-3 py-2'>
											Learn More
										</button>
									</div>
								</div>
							);
						})}
					</div>
					<div className='bg-gray-300 my-3 xl:mx-24 sm:mx-auto text-center text-md md:text-lg lg:text-2xl py-8 overflow-hidden p-8 2xl:px-36 xl:px-8 lg:px-0 md:px-4 px-2'>
						<div className='font-bold pb-5'>
							Hear the testimony directly from our satisfied bride and groom
						</div>
						<SliderCard reviews={reviews} />
					</div>
					<div className='text-center text-md md:text-lg lg:text-2xl xl:text-3xl my-10'>
						Because you deserve your own fairy-tale to come true
						<br />
						<button
							type='button'
							className='text-white bg-secondary hover:bg-yellow-600 focus:ring-4 focus:ring-amber-700 font-bold rounded-lg text-sm md:text-md px-3 py-2'>
							Register Now
						</button>
					</div>
					<div className='bg-black text-white px-16 pt-3 pb-0 shadow-lg'>
						<div className='text-3xl font-bold mt-3'>Wedding Platform</div>
						<span className='text-md'>Tagline Here</span>
						<hr className='mt-8' />
						<div className='flex text-xs py-3 justify-between'>
							<div className='flex gap-8'>
								<span>@C 2024 Wedding Platform, Inc.</span>
								<ul className='flex flex-wrap items-center justify-center gap-5'>
									<li>- Privacy</li>
									<li>- Terms</li>
									<li>- Sitemap</li>
								</ul>
							</div>
							<div className='flex gap-2'>
								<span>
									<FontAwesomeIcon icon={faGlobe} />
									English (US)
								</span>
								<FontAwesomeIcon icon={faFacebook} />
								<FontAwesomeIcon icon={faX} />
								<FontAwesomeIcon icon={faInstagram} />
							</div>
						</div>
					</div>
				</>
			)}
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
