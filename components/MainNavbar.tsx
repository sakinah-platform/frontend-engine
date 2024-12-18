"use client";

import ApplicationLogo from "./ApplicationLogo";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

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

  return (
    <Navbar className="w-[95%] mx-auto rounded-b-2xl shadow" fluid rounded>
      <Navbar.Brand href="/">
        <div className="relative w-24 h-16">
          <ApplicationLogo className="object-cover" alt="Logo Navbar" />
        </div>
      </Navbar.Brand>

      <div className="flex md:order-2 items-center gap-3">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
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
        <Navbar.Link href="#" active>
          <button className="bg-primary text-white px-3 py-1 rounded-lg font-bold">
            Wedding Vendor
          </button>
          <div className="text-center pb-2 bg-primary mt-2 rounded-full w-16 mx-auto"></div>
        </Navbar.Link>
        <Navbar.Link href="#">Wedding Checklist</Navbar.Link>
        <Navbar.Link href="#">Wedding Calculator</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
