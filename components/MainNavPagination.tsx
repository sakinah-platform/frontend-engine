import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface NavPagType {
	totalPage: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}

export const MainNavPagination: React.FC<NavPagType> = ({
	totalPage,
	currentPage,
	setCurrentPage,
}) => {
	return (
		<nav className='shadow-lg rounded-tl-3xl rounded-br-3xl p-1 bg-white border-2 text-center mt-4 lg:mx-48'>
			<ul className='inline-flex -space-x-px text-sm text-center items-center flex-nowrap overflow-x-auto mx-auto gap-2 px-2 py-1 transition ease-in-out'>
				{currentPage > 1 && (
					<li>
						<button
							// href='#'
							onClick={() => setCurrentPage(currentPage - 1)}
							className='btn-outline-primary flex items-center justify-center  transition ease-in-out flex items-center justify-center border rounded-tl-lg rounded-br-lg rounded-sm py-1'>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
					</li>
				)}
				{Array.from({ length: totalPage }).map((_, i) => (
					<li key={i}>
						<button
							// href='#'
							onClick={() => setCurrentPage(i + 1)}
							className={`${
								currentPage == i + 1 ? "btn-primary" : "btn-outline-primary"
							} transition ease-in-out flex items-center justify-center border rounded-tl-lg rounded-br-lg rounded-sm py-1`}>
							{i + 1}
						</button>
					</li>
				))}
				{currentPage < totalPage && (
					<li>
						<button
							// href='#'
							onClick={() => setCurrentPage(currentPage + 1)}
							className='btn-outline-primary flex items-center justify-center  transition ease-in-out flex items-center justify-center border rounded-tl-lg rounded-br-lg rounded-sm py-1'>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
};
