import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faGlobe, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const Footer = () => {
	return (
		<footer
			role='contentinfo'
			className='bg-primary2 text-white md:px-32 px-16 pt-3 pb-2 shadow-lg rounded-t-2xl shadow-lg'>
			<div className='text-center pb-1 bg-white rounded-full w-24 mx-auto'></div>
			<div className='text-white rounded-lg'>
				<div className='relative w-32 h-32 text-center mx-auto my-5'>
					<Image src={`/logo/PNG/primary_5.png`} alt='secondary_5' fill />
				</div>
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
		</footer>
	);
};
