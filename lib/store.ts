import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./redux/slicer/CategorySlicer";
import processStateSlice from "./redux/slicer/ProcessSlicer";
import vendorSlice from "./redux/slicer/VendorSlicer";
import citySlice from "./redux/slicer/CitySlicer";

export const makeStore = () => {
	return configureStore({
		reducer: {
			categories: categorySlice,
			vendors: vendorSlice,
			cities: citySlice,
			processState: processStateSlice,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
