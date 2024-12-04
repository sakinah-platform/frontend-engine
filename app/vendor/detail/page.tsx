"use client";

import { Button1 } from "@/components/Button1";
import Image from "next/image";
import React, { useState } from "react";

type Package = {
  img: string;
  name: string;
  price: string;
};

type PackageDesc = {
  title: string;
  img: string[];
  decoration: string[];
  crew: string[];
};
export default function DetailVendor() {
  const dataPackage: Package[] = [
    {
      img: "/images/wedding-detail.jpg",
      name: "Engagement",
      price: "Rp. 7.000.000",
    },
    {
      img: "/images/wedding-detail.jpg",
      name: "Siraman",
      price: "Rp. 7.000.000",
    },
    {
      img: "/images/wedding-detail.jpg",
      name: "Wedding Planner",
      price: "Rp. 7.000.000",
    },
    {
      img: "/images/wedding-detail.jpg",
      name: "TES 1",
      price: "Rp. 7.000.000",
    },
    {
      img: "/images/wedding-detail.jpg",
      name: "TES 2",
      price: "Rp. 7.000.000",
    },
    {
      img: "/images/wedding-detail.jpg",
      name: "TES 3",
      price: "Rp. 7.000.000",
    },
  ];
  const dataPackageDesc: PackageDesc[] = [
    {
      title: "Engagement",
      img: [
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
      ],
      decoration: [
        "Dekorasi standar Engagement",
        "Backdrop tunangan",
        "6 kursi crossback",
        "30 kursi + cover",
        "1 MC + 1 MUA (with Hair Do/Hijab)",
        "Sound System",
        "Photo (file only)",
      ],
      crew: ["Efektif 4 jam kerja", "3 wedding crew", "HT, Tools, & seragam"],
    },
    {
      title: "Siraman",
      img: [
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
      ],
      decoration: [
        "Dekorasi tradisional Siraman",
        "Tempat duduk adat",
        "Area penyiraman dengan bunga segar",
        "Pajangan bunga melati",
        "Lilin aroma terapi",
        "Lantai bambu atau tikar adat",
      ],
      crew: ["Efektif 5 jam kerja", "2 makeup artists", "4 wedding crew"],
    },
    {
      title: "Wedding Planner",
      img: [
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
        "/images/wedding-detail.jpg",
      ],
      decoration: [
        "Perencanaan konsep acara",
        "Dekorasi pernikahan full package",
        "Venue setup dengan tema khusus",
        "Bunga segar dan centerpiece",
        "Lighting artistik",
        "Photobooth dekorasi",
      ],
      crew: [
        "Koordinator utama",
        "2 asisten wedding planner",
        "Tim dekorasi 5 orang",
        "Tim teknis 3 orang",
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const handleProductClick = (index: number) => {
    setSelectedProduct(index);
  };

  const visibleItems = 3;
  const totalItems = dataPackage.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleItems < totalItems ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div>
      <div className="h-[750px] bg-black flex justify-center items-center">
        <div className="relative w-full h-[700px] mt-20 rounded-t-full bg-[#AB9B9C]">
          <div className="absolute top-20 w-full h-[650px] rounded-t-full bg-[#f5f5f5]">
            <div className="flex flex-col justify-center items-center h-full">
              <div className="rounded-full relative bg-[#AB9B9C] w-[310px] h-[310px] mt-28"></div>
              <div className="rounded-full overflow-hidden w-72 h-72 absolute">
                <Image
                  src="/images/wedding-detail.jpg"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>

              <h1 className="text-5xl mt-6">Pine House Organizer</h1>
              <h1 className="text-4xl">More than you wish...</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-20 text-2xl justify-center">
        <div className="flex flex-row justify-center gap-40">
          <div className="max-w-[500px] text-gray-700">
            <span>Hallo Couple</span>
            <p>
              Pernikahan adalah keputusan satu kali dalam seumur hidup. Tentunya
              kamu ingin mewujudkan impian pernikahan kamu dengan budget yang
              se-efisien mungkin.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-4">
              <i className="fas fa-envelope text-black"></i>{" "}
              <span>pinehouse@gmail.com</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <i className="fa-solid fa-phone text-gray-600 text-sm"></i>
              <span>082319781999</span>
            </div>
            <div className="flex items-center gap-4 mb-4 ">
              <i className="fab fa-instagram text-gray-600 text-xl"></i>
              <span>@pinehouse_organizer</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <i className="fab fa-facebook text-gray-600"></i>
              <span>@pinehouse_organizer</span>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-globe text-gray-600"></i>
              <span>pinehouse.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-30 text-2xl justify-center items-center">
        <div className="flex justify-center">
          <Button1 text="Package" className="w-[700px]" />
        </div>

        <div className="relative mt-20 max-w-[1000px] flex items-center">
          <button
            onClick={handlePrev}
            className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10 text-3xl text-gray-500 rounded-full px-4 py-[10px] hover:bg-gray-200"
          >
            &lt;
          </button>

          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
              }}
            >
              {dataPackage.map((item: Package, index: number) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-lg flex-col mb-4 border shadow-lg mx-5 cursor-pointer"
                  onClick={() => handleProductClick(index)}
                >
                  <div className="rounded-t-lg overflow-hidden w-72 h-72">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xl">{item.name}</p>
                    <p className="pt-1">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10 text-3xl text-gray-500 rounded-full px-4 py-[10px] hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="flex flex-col my-32 text-2xl justify-center items-center">
        <div className="flex justify-center ">
          <Button1
            text="Package Description"
            onClick={() => alert("Clicked!")}
            className="w-[700px]"
          />
        </div>

        <div className="flex flex-col justify-center gap-10 mt-10 max-w-[1000px]">
          {selectedProduct !== null && (
            <div className="flex flex-col items-start gap-12">
              <h1 className="flex mt-20 text-3xl">
                {dataPackageDesc[selectedProduct].title}
              </h1>
              <div className="flex flex-row items-start gap-12">
                <div className="w-auto flex rounded-lg flex-col mb-4 border shadow-lg p-4 w-90">
                  <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden bg-black p-2 self-center">
                    {dataPackageDesc[selectedProduct].img.map(
                      (image, imgIndex) => (
                        <div key={imgIndex} className="w-40 h-40 relative">
                          <Image
                            src={image}
                            alt={`Package image ${imgIndex + 1}`}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className=" flex flex-col">
                  <h3 className="text-xl mt-4">DEKORASI</h3>
                  <ul className="list-disc list-inside text-xl mt-4">
                    {dataPackageDesc[selectedProduct].decoration.map(
                      (decor, decorIndex) => (
                        <li key={decorIndex}>{decor}</li>
                      )
                    )}
                  </ul>

                  <h3 className="text-xl mt-4">CREW</h3>
                  <ul className="list-disc list-inside mt-4 text-xl">
                    {dataPackageDesc[selectedProduct].crew.map(
                      (crewMember, crewIndex) => (
                        <li key={crewIndex}>{crewMember}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
