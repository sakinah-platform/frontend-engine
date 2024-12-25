"use client";

import ApplicationLogo from "./ApplicationLogo";

import { Navbar } from "flowbite-react";

export const MainNavbar = () => {
	// const handleLogout = async () => {
	// dispatch(processStateReducer("loading"));
	// try {
	//     const csrfToken = document.querySelector(
	//         'input[name="_token"]'
	//     ).value;
	//     axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
	//     const response = await axios.post(route("logout"), {
	//         headers: {
	//             "Content-Type": "multipart/form-data",
	//         },
	//     });
	//     console.log(response);
	//     if (response.status === 200) {
	//         dispatch(processStateReducer("success"));
	//         location.replace(route("login"));
	//     }
	// } catch (error) {
	//     dispatch(processMessageFailedReducer(error.response.data.message));
	//     console.error("Error response: ", error.response.data.message); // Log error to console
	// 	// }
	// };

	const linkNavbar = [
		{ title: "Wedding Vendor", link: "/", active: true },
		{ title: "Wedding Checklist", link: "#", active: false },
		{ title: "Wedding Calculator", link: "#", active: false },
	];

	return (
		<Navbar
			className='w-[95%] mx-auto rounded-b-2xl shadow fixed left-0 right-0 z-50'
			fluid
			rounded
			aria-hidden='true'
			role='navigation'>
			<Navbar.Brand href='/'>
				<div className='relative w-36 h-8 m-2'>
					<ApplicationLogo className='object-cover' alt='Logo Navbar' />
				</div>
			</Navbar.Brand>

			<div className='flex md:order-2 items-center gap-3'>
				<button className='bg-primary2 text-white px-3 py-1 rounded-lg font-bold'>
					Login
				</button>
				{/* <Dropdown
					arrowIcon={false}
					inline
					label={
						<Avatar
							alt='User settings'
							img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
							rounded
						/>
					}>
					<Dropdown.Header>
						<span className='block text-sm'>Bonnie Green</span>
						<span className='block truncate text-sm font-medium'>
							name@flowbite.com
						</span>
					</Dropdown.Header>
					<Dropdown.Item>Dashboard</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item>Earnings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item>Sign out</Dropdown.Item>
				</Dropdown> */}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				{linkNavbar.map((item, i) => (
					<Navbar.Link href={item.link} key={i}>
						{item.active ? (
							<>
								<button className='bg-primary2 text-white px-3 py-1 rounded-lg font-bold'>
									{item.title}
								</button>
								<div className='text-center pb-2 bg-primary2 mt-1 rounded-full w-12 mx-auto'></div>
							</>
						) : (
							<button className='hover:border-b-4 hover:border-primary hover:text-primary pb-4 rounded-lg'>
								{item.title}
								{/* <div className=' text-center pb-2 bg-primary2 mt-1 rounded-full w-12 mx-auto'></div> */}
							</button>
						)}
					</Navbar.Link>
				))}
			</Navbar.Collapse>
		</Navbar>
	);
};
