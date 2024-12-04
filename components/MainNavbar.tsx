"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationLogo from "./ApplicationLogo";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";

export const MainNavbar = () => {
  const auth: any = {
    user: {
      name: "Fikar",
      email: "fikar.6@gmail.com",
    },
  };

  const handleLogout = async () => {
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
  };
  return (
    <Navbar className="w-[95%] mx-auto rounded-b-2xl shadow" fluid rounded>
      <div className="flex items-center basis-1/3 gap-5">
        {/* <Navbar.Brand href="/">
          <ApplicationLogo className="object-cover h-12 w-24 " />
        </Navbar.Brand> */}
        <div className="relative flex grow">
          <input
            className="border-2 border-amber-800 rounded p-2 pr-10 grow h-9"
            placeholder="Cari..."
          />
          <button className="bg-amber-800 text-white px-2 rounded-md absolute end-0 mt-1 me-1">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="flex md:order-2 items-center gap-3">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
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
      {/* <Navbar.Collapse>
				<Navbar.Link href='#' active>
					Home
				</Navbar.Link>
				<Navbar.Link href='#'>About</Navbar.Link>
			</Navbar.Collapse> */}
    </Navbar>
  );
};
