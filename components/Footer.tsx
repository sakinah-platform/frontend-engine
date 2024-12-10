import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faGlobe, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
	return (
		<div className='bg-primary text-white md:px-32 px-16 pt-3 pb-2 shadow-lg rounded-t-2xl shadow-lg'>
			<div className='text-center pb-1 bg-white rounded-full w-24 mx-auto'></div>
			<div className='shadow-lg text-white rounded-lg mt-10'>
				<div className='text-3xl font-bold mt-3'>Wedding Platform</div>
				<span className='text-md'>Tagline Here</span>
				<hr />
				<div className='flex text-xs py-3 justify-between'>
					<div className='flex gap-8'>
						<span>
							<FontAwesomeIcon icon={faCopyright} /> 2024 Wedding Platform, Inc.
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
	);
};
