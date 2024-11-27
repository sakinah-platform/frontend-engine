"use client";

import { SetStateAction, useRef, useState } from "react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronCircleLeft,
	faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

type ReviewType = {
	content: string;
	photo: string;
	bride: string;
	groom: string;
	date: string;
};

export const SliderCard = ({ reviews }: { reviews: ReviewType[] }) => {
	const swiperRef = useRef<SwiperType>();
	return (
		<div className='flex'>
			<button
				className='p-4 text-white hover:text-stone-400'
				onClick={() => swiperRef.current?.slidePrev()}>
				<FontAwesomeIcon icon={faChevronCircleLeft} />
			</button>
			<Swiper
				modules={[Virtual, Navigation, Pagination]}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
				slidesPerView={1}
				centeredSlides={false}
				spaceBetween={30}
				// navigation={true}
				breakpoints={{
					768: {
						slidesPerView: 2,
					},
				}}
				virtual>
				{reviews.map((item, i) => (
					<SwiperSlide key={i} virtualIndex={i}>
						<div className='md:flex bg-[#AB9B9C] p-3 items-center justify-center rounded-lg shadow-md min-h-64'>
							<img
								className='lg:w-36 lg:h-36 md:w-20 md:h-20 sm:w-36 sm:h-36 max-w-32 max-h-32 object-cover mx-auto rounded-2xl p-2'
								src={`/photos/${item.photo}`}
								alt={item.photo}
							/>
							<div className='text-white'>
								<div className=' md:text-start text-center text-xs mb-4 lg:w-56 md:w-36 max-w-80 mx-auto'>
									"{item.content}"
								</div>
								<div className='text-center font-playfair text-md leading-none'>
									{item.bride} & {item.groom}
								</div>
								<span className='text-xs mt-0'>Married {item.date}</span>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<button
				className={`p-4 text-white hover:text-stone-400`}
				onClick={() => {
					swiperRef.current?.slideNext();
				}}>
				<FontAwesomeIcon icon={faChevronCircleRight} />
			</button>
		</div>
	);
};
