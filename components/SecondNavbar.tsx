"use client";

import { Dropdown, Navbar } from "flowbite-react";

export const SecondNavbar = () => {
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
	// }
	// };

	return (
		<Navbar className='bg-secondary text-white text-lg' fluid rounded>
			<Navbar.Brand href='/'>
				<span className='font-timesNewRoman'>Wedding Platform</span>
			</Navbar.Brand>

			<div className='flex md:order-2 items-center gap-3'>
				<Dropdown
					arrowIcon={false}
					inline
					label={
						<button className='text-secondary bg-white px-2 py-1 font-bold rounded-lg'>
							LOGIN
						</button>
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
				</Dropdown>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link href='#'>
					<span className='text-white'>Wedding Vendor</span>
					<div className='text-center pb-1 bg-white mt-2 rounded-full w-8 mx-auto'></div>
				</Navbar.Link>
				<Navbar.Link href='#'>
					<span className='text-white'>Wedding Checklist</span>
				</Navbar.Link>
				<Navbar.Link href='#'>
					<span className='text-white'>Wedding Calculator</span>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};
