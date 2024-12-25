import { SecondNavbar } from "@/components/SecondNavbar";
import { SliderCard } from "@/components/SliderCard";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Home() {
	const explains = [
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
	return (
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
							<div className={`${gapDiv} ${i % 2 != 0 ? "md:order-last" : ""}`}>
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
	);
}
