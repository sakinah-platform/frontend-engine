import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./redux/slicer/CategorySlicer";
import processStateSlice from "./redux/slicer/ProcessSlicer";
import vendorSlice from "./redux/slicer/VendorSlicer";
import citySlice from "./redux/slicer/CitySlicer";
import detailVendorSlicer from "./redux/slicer/VendorDetailSlicer";
import authSlice from "./redux/slicer/AuthSlicer";

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authSlice,
			categories: categorySlice,
			vendors: vendorSlice,
			cities: citySlice,
			processState: processStateSlice,
			detailVendor: detailVendorSlicer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
