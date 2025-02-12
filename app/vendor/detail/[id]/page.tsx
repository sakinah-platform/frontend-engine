"use client";

import { Button1 } from "@/components/Button1";

import { SliderPhotos } from "@/components/SliderCard";
import { fetchDetailVendor } from "@/lib/redux/slicer/VendorDetailSlicer";
import { AppDispatch, RootState } from "@/lib/store";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchVendor } from "@/lib/redux/slicer/VendorSlicer";
import { Footer } from "@/components/Footer";
import { MainNavbar } from "@/components/Navbar/Main";
import { Button, Modal } from "flowbite-react";

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

export default function DetailVendor({
  params,
}: {
  params: Promise<{ id: number | string }>;
}) {
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
  // const photos = [
  // 	{
  // 		title: "Every Venues and Vendors in town are ready to serve you",
  // 		desc: "This is the Description for Wedding Venues and Vendors feature",
  // 		link: "#",
  // 		image: "photo-1.png",
  // 	},
  // 	{
  // 		title: "A fairy-tale wedding does not need to be expensive",
  // 		desc: "This is the Description for Wedding Venues and Vendors feature",
  // 		link: "#",
  // 		image: "photo-2.png",
  // 	},
  // 	{
  // 		title: "Plan your wish for a fairy-tale wedding",
  // 		desc: "This is the Description for Wedding Venues and Vendors feature",
  // 		link: "#",
  // 		image: "photo-3.png",
  // 	},
  // 	{
  // 		title: "Every Venues and Vendors in town are ready to serve you",
  // 		desc: "This is the Description for Wedding Venues and Vendors feature",
  // 		link: "#",
  // 		image: "photo-1.png",
  // 	},
  // 	{
  // 		title: "A fairy-tale wedding does not need to be expensive",
  // 		desc: "This is the Description for Wedding Venues and Vendors feature",
  // 		link: "#",
  // 		image: "photo-2.png",
  // 	},
  // 	{
  // 		title: "Plan your wish for a fairy-tale wedding",
  // 		desc: "This is the Description for Wedding Venues and Vendors feature",
  // 		link: "#",
  // 		image: "photo-3.png",
  // 	},
  // ];

  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);

  // const dispatch = useDispatch<AppDispatch>();
  const { vendor, loadingVendor } = useSelector(
    (state: RootState) => state.vendors
  );

  const selectedDetailVendor = Array.isArray(vendor) ? vendor[0] : vendor;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        // Wait for the idVendor promise to resolve
        const { id } = await params;

        // Dispatch the fetchVendor action with the resolved idVendor
        dispatch(fetchDetailVendor({ basePath: `${id}` }));
        dispatch(fetchDetailVendor({ basePath: `${id}/packages/` }));
      } catch (error) {
        console.error("Failed to fetch vendor:", error);
      }
    })();
  }, [params, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        // Wait for the idVendor promise to resolve
        const { id } = await params;

        // Dispatch the fetchVendor action with the resolved idVendor
        // dispatch(fetchDetailVendor({ basePath: id }));
        dispatch(fetchVendor({ basePath: id }));
      } catch (error) {
        console.error("Failed to fetch vendor:", error);
      }
    })();
  }, [params, dispatch]);

  const handleProductClick = (index: number) => {
    setCurrentPackageIndex(index);
    setOpenModal(true);
  };

  const totalItems = dataPackage.length;

  const updateVisibleItems = () => {
    if (window.innerWidth < 768) {
      setVisibleItems(1); // Untuk sm: 1 item
    } else if (window.innerWidth < 1024) {
      setVisibleItems(2); // Untuk md: 2 item
    } else {
      setVisibleItems(3); // Default: 3 item
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleItems < totalItems ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleModalPrev = () => {
    setCurrentPackageIndex((prevIndex) =>
      prevIndex === 0 ? dataPackageDesc.length - 1 : prevIndex - 1
    );
  };

  const handleModalNext = () => {
    setCurrentPackageIndex((prevIndex) =>
      prevIndex === dataPackageDesc.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    updateVisibleItems(); // Panggil saat komponen di-mount

    // Tambahkan event listener untuk perubahan ukuran
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  const socialMediaLinks = [
    {
      platform: "instagram",
      icon: faInstagram,
      value: selectedDetailVendor?.instagram,
      url: (username: string) => `https://www.instagram.com/${username}`,
    },
    {
      platform: "facebook",
      icon: faFacebook,
      value: selectedDetailVendor?.facebook,
      url: (username: string) => `https://www.facebook.com/${username}`,
    },
    {
      platform: "tiktok",
      icon: faTiktok,
      value: selectedDetailVendor?.tiktok,
      url: (username: string) => `https://www.tiktok.com/@${username}`,
    },
    {
      platform: "youtube",
      icon: faYoutube,
      value: selectedDetailVendor?.youtube,
      url: (channel: string) => `https://www.youtube.com/@${channel}`,
    },
    {
      platform: "email",
      icon: faEnvelope,
      value: selectedDetailVendor?.email,
      url: (email: string) => `mailto:${email}`,
    },
  ];

  return (
    <div className="bg-white">
      <MainNavbar />

      {loadingVendor ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50">
          <div className="text-center text-primary">
            Sebentar ya...
            <motion.div
              className="m-auto"
              animate={{
                rotate: [0, 180],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/logo/png/tertiary_1.png"
                alt="loader"
                width={150}
                height={150}
              />
            </motion.div>
          </div>
        </div>
      ) : (
        <div>
          <div className="h-[600px] md:h-[750px] flex justify-center items-center ">
            <div className="relative w-full h-[450px] md:h-[700px] rounded-t-full mt-20 md:mt-32 bg-secondary">
              <div className="absolute top-20 w-full h-[450px] md:h-[650px] rounded-t-full bg-white">
                <div className="flex flex-col relative text-center justify-center items-center h-full mt-20">
                  <div className="rounded-full absolute bg-secondary2 w-[210px] h-[210px] md:w-[310px] md:h-[310px] top-12"></div>
                  <div className=" rounded-full overflow-hidden w-48 h-48 md:w-72 md:h-72 absolute top-14">
                    <Image
                      src={
                        selectedDetailVendor?.profile_image ??
                        "/logo/png/tertiary_1.png"
                      }
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      className="w-full h-full"
                    />
                  </div>
                  <h1 className="text-xl md:text-3xl mt-[200px] md:mt-80 ">
                    {selectedDetailVendor?.name}
                  </h1>
                  <h1 className="text-lg md:text-2xl max-w-[1000px] px-4">
                    {selectedDetailVendor?.description}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-10 text-base md:text-xl justify-center items-center bg-white">
            {selectedDetailVendor?.galleries?.length > 0 && (
              <div className="mx-auto max-w-[750px] mt-12 h-40 rounded-lg">
                <SliderPhotos
                  photos={selectedDetailVendor?.galleries}
                  qty={3}
                />
              </div>
            )}
            <div className="container mt-36 flex flex-col md:flex-row justify-center gap-20 lg:gap-40 mx-20 px-10">
              <div className="max-w-[500px] text-gray-700">
                <span>{selectedDetailVendor?.about}</span>
              </div>

              {/* <div>
                {dataContact.map((items, i) => (
                  <div className="flex items-center gap-4 mb-4" key={i}>
                    <FontAwesomeIcon icon={items.icon} />
                    <span>{selectedDetailVendor?.[items.name]}</span>
                  </div>
                ))}
              </div> */}
              <div>
                {loadingVendor
                  ? "Loading..."
                  : socialMediaLinks
                      .filter((link) => link.value)
                      .map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 mb-4 cursor-pointer"
                          onClick={() =>
                            window.open(link?.url(link?.value), "_blank")
                          }
                        >
                          {link?.icon && <FontAwesomeIcon icon={link?.icon} />}
                          <span>{link?.value}</span>
                        </div>
                      ))}

                {/* {selectedDetailVendor?.instagram && (
              <div
                className="flex items-center gap-4 mb-4"
                onClick={() =>
                  router.push(
                    `https://www.instagram.com/${selectedDetailVendor?.instagram}`
                  )
                }
              >
                <FontAwesomeIcon icon={dataContact[0].icon} />
                <span>{selectedDetailVendor?.instagram}</span>
              </div>
            )}
            {selectedDetailVendor?.facebook && (
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={dataContact[1].icon} />
                <span>{selectedDetailVendor?.facebook}</span>
              </div>
            )}
            {selectedDetailVendor?.tiktok && (
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={dataContact[2].icon} />
                <span>{selectedDetailVendor?.tiktok}</span>
              </div>
            )}
            {selectedDetailVendor?.youtube && (
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={dataContact[3].icon} />
                <span>{selectedDetailVendor?.youtube}</span>
              </div>
            )}
            {selectedDetailVendor?.email && (
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={dataContact[4].icon} />
                <span>{selectedDetailVendor?.email} </span>
              </div>
            )} */}
              </div>
            </div>
          </div>

          {/* first div */}
          <div className="flex flex-col my-10 text-xl justify-center items-center bg-white">
            <div className="flex justify-center">
              <Button1
                text="Package"
                className="w-[300px] md:w-[500px] lg:w-[700px] text-sm md:text-lg"
              />
            </div>
            <div className="relative mt-16 w-full max-w-[270px] md:max-w-[750px] lg:max-w-[1020px] flex items-center">
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
                  {selectedDetailVendor?.packages?.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 rounded-lg flex-col mb-4 border shadow-lg mx-5 cursor-pointer w-[250px] lg:w-[300px] hover:bg-secondary2"
                      onClick={() => handleProductClick(index)}
                    >
                      <div className="rounded-t-lg overflow-hidden w-[250px] lg:w-[300px] h-72">
                        <Image
                          src={item?.galleries[0]?.image || dataPackage[0].img}
                          alt={item.name}
                          width={200}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-lg">{item.name}</p>
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

          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Terms of Service</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedDetailVendor?.packages[currentPackageIndex]?.name}
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-lg">
                    {
                      selectedDetailVendor?.packages[currentPackageIndex]
                        ?.description
                    }
                  </p>
                  <h3 className="text-lg font-semibold mt-6">Price</h3>
                  <p className="text-lg">
                    {selectedDetailVendor?.packages[currentPackageIndex]?.price}
                  </p>
                  <h3 className="text-lg font-semibold mt-6">Price</h3>
                  <p className="text-lg">
                    {selectedDetailVendor?.packages[currentPackageIndex]?.price}
                  </p>
                  <h3 className="text-lg font-semibold mt-6">
                    Therms and Condiion
                  </h3>
                  <p className="text-lg">
                    {
                      selectedDetailVendor?.packages[currentPackageIndex]
                        ?.terms_and_condition
                    }
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* second div */}
          {/* <div className="flex flex-col my-12 text-2xl justify-center items-center">
        <div className="flex justify-center ">
          <Button1
            text="Package Description"
            className="w-[300px] md:w-[500px] lg:w-[700px] text-sm md:text-lg"
          />
        </div>

        <div className="flex flex-col justify-center gap-10 max-w-[1000px]">
          {selectedProduct !== null && (
            <div className="flex flex-col items-start gap-6">
              <h1 className="flex mt-10 text-xl px-10 md:px-0">
                {dataPackageDesc[selectedProduct].title}
              </h1>
              <div className="flex flex-col md:flex-row items-start gap-12 px-10 md:px-0">
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

                <div className="flex flex-col">
                  <h3 className="text-lg mt-4">DEKORASI</h3>
                  <ul className="list-disc list-inside text-lg mt-4">
                    {dataPackageDesc[selectedProduct].decoration.map(
                      (decor, decorIndex) => (
                        <li key={decorIndex}>{decor}</li>
                      )
                    )}
                  </ul>

                  <h3 className="text-lg mt-4">CREW</h3>
                  <ul className="list-disc list-inside mt-4 text-lg">
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
      </div> */}
        </div>
      )}
      <Footer />
    </div>
  );
}
