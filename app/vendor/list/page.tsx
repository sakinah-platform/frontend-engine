"use client";

import { BannerWithText } from "@/components/BannerWithText";
import { Footer } from "@/components/Footer";
import { Select2RS } from "@/components/Form/SelectRS";
import { MainNavbar } from "@/components/MainNavbar";
import { UpReveal, UpRevealWord } from "@/components/MotionTemplate";
import {
	faDollar,
	faSearch,
	faStar,
	faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import Image from "next/image";
import dataSelect from "../../../lib/dataSelect";
import InputRS from "@/components/Form/InputRS";
import { SliderPhotos } from "@/components/SliderCard";

export default function ListVendor() {
	const kota = [
		{ id: 1, title: "Garut" },
		{ id: 2, title: "Kab. Tasikmalaya" },
		{ id: 3, title: "Kota Tasikmalaya" },
	];
	const harga = [
		{ id: 1, title: "$" },
		{ id: 2, title: "$$" },
		{ id: 3, title: "$$$" },
	];
	const category = [
		{ id: 1, title: "Attire" },
		{ id: 2, title: "Catering" },
		{ id: 3, title: "Souvenir" },
		{ id: 4, title: "Hantaran" },
		{ id: 5, title: "Hotel" },
		{ id: 6, title: "Convention Hall" },
		{ id: 7, title: "Decoration" },
		{ id: 8, title: "Entertain" },
		{ id: 9, title: "Garden" },
		{ id: 10, title: "Invitation" },
		{ id: 11, title: "Live Streaming" },
		{ id: 12, title: "Mahar" },
		{ id: 13, title: "MC" },
		{ id: 14, title: "Photographer" },
		{ id: 15, title: "Videographer" },
		{ id: 16, title: "Wedding Organizer" },
	];

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
			<div className='px-3 py-2 md:container mx-auto'>
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
							<div className='relative p-2 mx-8 bg-white shadow-lg rounded-lg bg-white my-3'>
								<input
									className='bg-white shadow-lg rounded-lg p-2 border border-primary w-full pr-16'
									placeholder='Cari Vendor..'
								/>
								<button className='btn-primary absolute py-1 right-3 top-1/2 transform -translate-y-1/2'>
									<FontAwesomeIcon icon={faSearch} />
								</button>
							</div>
							<Formik
								initialValues={{
									kota: 0,
									harga: 0,
									category: 0,
								}}
								onSubmit={(values) => console.log(values)}>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									setFieldValue,
								}) => (
									<form onSubmit={handleSubmit}>
										<div className='md:flex gap-4 items-center'>
											<div className='grid grid-cols-3 gap-4 grow'>
												{[
													{
														placeholder: "Semua Kategori",
														idName: "category",
														data: category,
													},
													{
														placeholder: "Semua Kota",
														idName: "kota",
														data: kota,
													},
													{
														placeholder: "Semua Harga",
														idName: "harga",
														data: harga,
													},
												].map((item, i) => (
													<Select2RS
														key={i}
														className='rounded-lg shadow-lg border border-primary'
														placeholder={item.placeholder}
														id={item.idName}
														name={item.idName}
														error={
															(errors as Record<string, string | undefined>)[
																item.idName
															]
														}
														touched={
															!!(touched as Record<string, boolean>)[
																item.idName
															]
														}
														values={
															(values as Record<string, any>)[item.idName]
														}
														handleBlur={handleBlur}
														handleChange={(selectedOption) => {
															// Custom handleChange for react-select
															const value = selectedOption?.value; // Single-select case
															setFieldValue(item.idName, value); // Use Formik's setFieldValue
														}}
														data={dataSelect(item.data)}
													/>
												))}
											</div>
											<button
												onClick={() => handleSubmit}
												className='btn-primary px-5'>
												Filter
											</button>
										</div>
									</form>
								)}
							</Formik>
						</div>
						<div className='grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mx-16'>
							{Array.from({ length: 10 }).map((item, i) => (
								<div
									className='shadow-lg rounded-tl-3xl rounded-br-3xl p-4 bg-white border-4'
									key={i}>
									<div className='border-2 border-primary rounded-tl-3xl rounded-br-3xl rounded-lg'>
										<div className='relative w-82 h-48'>
											<Image
												src={"/banner/bg-2.png"}
												alt='banner'
												fill
												className='shadow object-cover rounded-tl-3xl'
											/>
										</div>
										<div className='relative p-5 -mt-10'>
											<div className='absolute top-10 right-0 max-w-[20%]'>
												<div className='bg-tertiary p-1 rounded-bl-xl'>
													<div className='text-white text-center'>
														<FontAwesomeIcon icon={faDollar} />
														<FontAwesomeIcon icon={faDollar} />
														<FontAwesomeIcon icon={faDollar} />
													</div>
												</div>
											</div>
											<div className='font-alice text-2xl capitalize bg-white rounded-full -ms-4 p-4 w-[95%]'>
												vendor {i + 1}
											</div>
											<p>kategori {i + 1}</p>
											<p>Kota {i + 1}</p>
											<p className='text-tertiary'>
												{Array.from({ length: 5 }).map((item, i) => (
													<FontAwesomeIcon key={i} icon={faStar} />
												))}
											</p>
											<p>5/5 (1.999 Ulasan)</p>
											<button className='btn-outline-primary w-[90%] rounded-br-2xl relative'>
												Daftar Harga
											</button>
											<FontAwesomeIcon
												icon={faTag}
												className='text-primary absolute end-0 bottom-0 text-4xl border-white me-4'
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</UpReveal>
				</div>
				<Footer />
			</div>
		</>
	);
}
