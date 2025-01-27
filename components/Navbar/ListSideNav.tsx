"use client";

import { MouseEventHandler } from "react";

import SubListSideNav from "./SubListSideNav";

interface SubMenuItem {
	text: string;
	route: string;
}

interface ListSideNavProps {
	subtitle?: string;
	text: string;
	route: MouseEventHandler<HTMLButtonElement> | string;
	icon?: string;
	subMenu?: SubMenuItem[];
	move?: boolean;
	active?: boolean;
	addClass?: string;
}

const ListSideNav = ({
	subtitle = "",
	text,
	route,
	icon,
	subMenu = [],
	move = false,
	active = false,
	addClass = "",
}: ListSideNavProps) => {
	// console.log(text, active);
	return (
		<>
			<li>
				{move ? (
					<a
						href={typeof route === "string" ? route : undefined}
						// onClick={typeof route !== "string" ? route : undefined}
						className={`${
							active
								? "border-e-4 border-e-sky-700 fw-bold text-gray-900 bg-gradient-to-r from-neutral-50 to-cyan-50"
								: "border-0 border-e-sky-0 text-gray-500 bg-gradient-to-r from-sky-0 to-neutral-0"
						} flex w-100 transition-all duration-700 items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${addClass}`}>
						{icon && (
							<span
								className={`w-5 h-5 ${
									active ? "text-sky-700" : "text-gray-500"
								} transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}>
								<i className={`fa-solid fa-${icon}`} />
							</span>
						)}
						<span className='ms-3'>{text}</span>
					</a>
				) : (
					<button
						onClick={typeof route === "function" ? route : undefined}
						className={`${
							active
								? "text-white bg-primary2 shadow-lg"
								: "text-gray-500 bg-white"
						} font-bold flex transition-all duration-200 items-center p-2 hover:bg-primary hover:text-white rounded-e-lg w-full ${addClass}`}>
						{icon && (
							<span
								className={`w-5 h-5 ${
									active ? "text-sky-700" : "text-gray-500"
								} transition duration-75 group-hover:text-gray-900 `}>
								<i className={`fa-solid fa-${icon}`} />
							</span>
						)}
						<span className='ms-4'>{text}</span>
					</button>
				)}
			</li>
			{subMenu &&
				subMenu.map((item, i) => (
					<SubListSideNav
						subtitle={subtitle}
						text={item.text}
						route={item.route}
						key={i}
					/>
				))}
		</>
	);
};

export default ListSideNav;
