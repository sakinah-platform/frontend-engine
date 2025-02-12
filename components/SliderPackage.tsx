"use client";

import { useRef } from "react";
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
import Image from "next/image";
import { TypeVendorPackages } from "@/lib/redux/slicer/VendorSlicer";

export const SliderPackage = ({
  dataPackage,
  handleClick,
}: {
  dataPackage: TypeVendorPackages[];
  handleClick: (index: number) => void;
}) => {
  const swiperRef = useRef<SwiperType>();
  return (
    <div className="flex">
      <button
        className="p-4 text-secondary hover:text-primary"
        onClick={() => swiperRef.current?.slidePrev()}
      >
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
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
        }}
        virtual
      >
        {dataPackage.map((item, i) => (
          <SwiperSlide key={i} virtualIndex={i}>
            <div
              key={i}
              className="flex-shrink-0 rounded-lg flex-col mb-4 border shadow-lg cursor-pointer hover:bg-secondary2"
              onClick={() => handleClick(i)}
            >
              {item?.galleries.length > 0 && (
                <div className="rounded-t-lg overflow-hidden  h-72">
                  <Image
                    src={item?.galleries?.[0].image}
                    alt={item.name}
                    width={200}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-lg">{item.name}</p>
                <p className="pt-1">{item.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`p-4 text-secondary hover:text-primary`}
        onClick={() => {
          swiperRef.current?.slideNext();
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>
    </div>
  );
};
