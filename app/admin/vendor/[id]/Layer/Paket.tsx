"use client";
import FormEdit, { initVal } from "@/components/Form/FormEdit";
import ListSideNav from "@/components/Navbar/ListSideNav";
import { initializeButtonNavActive, useShowNav } from "@/lib/handleArray";
import { toastStateReducer } from "@/lib/redux/slicer/ProcessSlicer";
import { biodataOneChange } from "@/lib/redux/slicer/Profile/biodataSlice";
import { TypeVendorPackages } from "@/lib/redux/slicer/VendorSlicer";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";

export const Paket = ({
	vendorPackages,
}: {
	vendorPackages: TypeVendorPackages[];
}) => {
	const showNav = useShowNav();

	const [buttonNavActive, setButtonNavActive] = useState(() =>
		initializeButtonNavActive(vendorPackages)
	);

	const listData = [
		{
			type: "text",
			key: "name",
			value: "name",
			label: "Nama Paket",
			validate: Yup.string().required("Harus diisi"),
		},
		{
			type: "number",
			key: "price",
			value: "price",
			label: "Harga",
			validate: Yup.number().required("Harus diisi"),
		},
	];

	return (
		<>
			<div className='rounded-lg p-3 grid md:grid-cols-4 gap-4'>
				<div className='bg-white p-5 rounded-lg shadow'>
					<span className='font-bold text-primary'>List Paket</span>
					<ul className='space-y-2 font-medium pt-2 hidden lg:block'>
						{vendorPackages.length > 0
							? vendorPackages?.map((item, i) => (
									<div key={i}>
										{/* <span className='text-primary3 font-bold ms-5'>{item.name}</span> */}
										{/* {item.map((items, j) => ( */}
										<ListSideNav
											route={() => {
												showNav.navigateToTab(setButtonNavActive, i);
											}}
											text={item.name}
											// icon={item.icon}
											active={buttonNavActive[i]}
											key={i}
											addClass={
												buttonNavActive[i]
													? "rounded-tl-lg"
													: "rounded-s-lg shadow"
											}
										/>
										{/* ))} */}
									</div>
							  ))
							: "Belum ada"}
					</ul>
				</div>
				<div className='bg-white p-5 rounded-lg shadow col-span-3'>
					{vendorPackages?.map(
						(item, i) =>
							buttonNavActive[i] && (
								<div key={i}>
									<div className='grid md:grid-cols-2 gap-5'>
										{listData.map((items, j) => (
											<FormEdit
												items={{
													key: items.key,
													label: items.label,
													value: items.value,
													type: items.type,
												}}
												initVal={initVal({
													validate: items.validate,
													items: {
														key: items.key,
														label: items.label,
														value: items.value,
														type: items.type,
													},
													idPost: item.id,
													slicer: biodataOneChange,
													routePost: "",
													data: item,
												})}
												processReducer={toastStateReducer}
												labelBold
												formClass='col-12'
												key={j}
											/>
										))}
									</div>
									<>
										<span className={`font-bold`}>Galeri Paket</span>
										<div className='flex justify-start items-center gap-4'>
											{Array.from({ length: 5 }).map((item, i) => (
												<div
													key={i}
													className='transition-all ease-in-out delay-800 relative w-48 h-48 hover:w-72'>
													<Image
														src={`/photos/vendor-${i + 1}.jpeg`}
														alt={i.toString()}
														fill
														className='object-cover rounded'
													/>
												</div>
											))}
										</div>
									</>
									<FormEdit
										items={{
											type: "text",
											key: "description",
											value: "description",
											label: "Deskripsi",
										}}
										initVal={initVal({
											validate: Yup.string().required(),
											data: item,
											idPost: item.id,
											items: {
												type: "text",
												key: "description",
												value: "description",
												label: "Deskripsi",
											},
											slicer: biodataOneChange,
											routePost: "",
										})}
										processReducer={toastStateReducer}
										labelBold
										formClass='col-12'
									/>
									<FormEdit
										items={{
											type: "text",
											key: "terms_and_condition",
											value: "terms_and_condition",
											label: "Syarat dan Ketentuan",
										}}
										initVal={initVal({
											validate: Yup.string().required(),
											data: item,
											idPost: item.id,
											items: {
												type: "text",
												key: "terms_and_condition",
												value: "terms_and_condition",
												label: "Syarat dan Ketentuan",
											},
											slicer: biodataOneChange,
											routePost: "",
										})}
										processReducer={toastStateReducer}
										labelBold
										formClass='col-12'
									/>
								</div>
							)
					)}
				</div>
			</div>
		</>
	);
};
