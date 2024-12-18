import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./redux/slicer/CategorySlicer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categorySlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
