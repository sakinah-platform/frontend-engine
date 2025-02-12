import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface VendorType {
  // [x: string]: string;
  // title: string;
  id: number;
  name: string;
  profile_image: string;
  starting_price: number;
  category: string;
  city: string;
}

interface GenericState<T> {
  vendor: T[];
  loadingVendor: boolean;
  error: string | null;
}

const initialState: GenericState<VendorType> = {
  vendor: [],
  loadingVendor: false,
  error: null,
};

export const fetchVendor = createAsyncThunk(
  "master_data/vendors",
  async (
    params?: Record<string, string | number | undefined>
  ): Promise<[VendorType]> => {
    // Construct query parameters dynamically
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
    }

    const url = `${process.env.sakinahAPI}/master_data/vendors${
      queryParams.toString() ? `/?${queryParams.toString()}` : ""
    }`;

    const response = await axios.get(url);
    return response.data.results;
  }
  // async (): Promise<[VendorType]> => {
  // 	// const response = await axios.get(`${sakinahAPI}/master_data/vendors`);
  // 	const response = await axios.get(
  // 		`${process.env.sakinahAPI}/master_data/vendors`
  // 	);
  // 	return response.data.results;
  // }
);

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    start(state) {
      state.loadingVendor = true;
    },
    vendorReducer(state, action: PayloadAction<VendorType[]>) {
      state.loadingVendor = false;
      state.vendor = [...state.vendor, ...action.payload];
    },
    failure(state, action: PayloadAction<string>) {
      state.loadingVendor = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVendor.pending, (state) => {
      state.loadingVendor = true;
    });
    builder.addCase(fetchVendor.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.vendor = action.payload;

      state.loadingVendor = false;
    });
    builder.addCase(fetchVendor.rejected, (state) => {
      state.loadingVendor = false;
    });
  },
});

// Export the reducer and actions
export const { start, vendorReducer, failure } = vendorSlice.actions;
export default vendorSlice.reducer;
