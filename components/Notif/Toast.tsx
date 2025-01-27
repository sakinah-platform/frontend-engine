import { ProccessProps } from "@/lib/redux/slicer/ProcessSlicer";
import {
	faCheckCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Toast } from "flowbite-react";
import React, { MouseEventHandler } from "react";

// type ToastVisibility = Record<string, boolean | Record<string, boolean>>;

type TemplateToastProps = {
	textColor?: string;
	handleClose: MouseEventHandler<HTMLButtonElement>;
	message: string;
	icon?: React.ReactNode;
};

const TemplateToast: React.FC<TemplateToastProps> = ({
	textColor = "white",
	handleClose,
	message,
	icon,
}) => {
	return (
		<div
			className='flex items-center w-full max-w-xs p-2 ms-2 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
			role='alert'>
			{icon && (
				<div
					className={`inline-flex items-center justify-center flex-shrink-0 p-1 text-${textColor}-500 rounded-lg dark:text-${textColor}-200`}>
					{icon}

					<span className='sr-only'> icon</span>
				</div>
			)}
			<div className={`ms-3 text-sm font-normal text-${textColor}-500`}>
				{message}
			</div>
			<button
				type='button'
				className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
				aria-label='Close'
				onClick={handleClose}>
				<span className='sr-only'>Close</span>
				<i className='fa-solid fa-xmark'></i>
			</button>
		</div>
	);
};

type MainToastProps = {
	textColor: string;
	message: string;
	icon?: React.ReactNode;
	bg: string;
	autoHide: boolean;
	show: boolean;
	handleClose: MouseEventHandler<HTMLButtonElement>;
};

const MainToast: React.FC<MainToastProps> = ({
	textColor,
	message,
	icon,
	show,
	handleClose,
}) => {
	return (
		show && (
			<div
				id='toast-bottom-left'
				className='fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-lg bottom-5 left-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800'
				role='alert'>
				{/* {autoHide ? ( */}
				<Toast>
					<TemplateToast
						textColor={textColor}
						handleClose={handleClose}
						message={message}
						icon={icon}
					/>
				</Toast>
				{/* ) : (
                <Toast>
                <TemplateToast
                textColor={""}
                handleClose={handleClose}
                message={""}
                />
				</Toast>
			)} */}
			</div>
			// );
		)
	);
};

export const ToastProses: React.FC<ProccessProps> = ({ data, handleClose }) => {
	let textColor = "gray";
	let bg = "secondary";
	let message = "";
	let icon: React.ReactNode | null = null;

	switch (data) {
		case "loading":
			icon = <Spinner />; // Spinner is used separately
			textColor = "gray";
			message = "Loading...";
			bg = "secondary";
			break;
		case "success":
			icon = <FontAwesomeIcon icon={faCheckCircle} size='2xl' />;
			textColor = "green";
			message = "Yohoo! Berhasil";
			bg = "success";
			break;
		case "failed":
			icon = <FontAwesomeIcon icon={faXmarkCircle} size='2xl' />;
			textColor = "red";
			message = "Ups, Gagal nih, coba cek lagi";
			bg = "danger";
			break;
		default:
			break;
	}

	return (
		<MainToast
			textColor={textColor}
			message={message}
			icon={icon}
			bg={bg}
			autoHide={true}
			show={["loading", "success", "failed"].includes(data)}
			handleClose={handleClose}
		/>
	);
};

export default MainToast;
