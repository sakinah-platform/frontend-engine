import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface DetailVendorType {
  [key: string]: number | string | boolean;
  id: number;
  name: string;
  description: string;
  about: string;
  category: string;
  email: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  profile_image: string;
  availability: boolean;
  visibility: string;
}

interface GenericState<T> {
  detailVendor: T[];
  loadingDetailVendor: boolean;
  error: string | null;
}

const initialState: GenericState<DetailVendorType> = {
  detailVendor: [],
  loadingDetailVendor: false,
  error: null,
};

// export const fetchDetailVendor = createAsyncThunk(
//   "master_data/vendors/1",
//   async (): Promise<[DetailVendorType]> => {
//     const response = await axios.get(
//       `${process.env.sakinahAPI}/master_data/vendors/1`
//     );
//     return response.data.results;
//   }
// );

export const fetchDetailVendor = createAsyncThunk(
  "master_data/vendors",
  async (params?: {
    basePath?: string | number; // Optional base path
    queryParams?: Record<string, string | number | undefined>; // Query parameters
  }): Promise<[DetailVendorType]> => {
    const { basePath, queryParams } = params || {};

    // Construct query parameters dynamically
    const queryString = queryParams
      ? new URLSearchParams(
          Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = value.toString();
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";

    // Construct the final URL
    const url = `${process.env.sakinahAPI}/master_data/vendors${
      basePath ? `/${basePath}` : ""
    }${queryString ? `?${queryString}` : ""}`;

    const response = await axios.get(url);
    // console.log(basePath ? "ok" : queryString, url);

    return basePath ? response.data : response.data.results;
  }
);

const detailVendorSlice = createSlice({
  name: "detailVendor",
  initialState,
  reducers: {
    start(state) {
      state.loadingDetailVendor = true;
    },
    detailVendorReducer(state, action: PayloadAction<DetailVendorType[]>) {
      state.loadingDetailVendor = false;
      state.detailVendor = [...state.detailVendor, ...action.payload];
    },
    failure(state, action: PayloadAction<string>) {
      state.loadingDetailVendor = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailVendor.pending, (state) => {
      state.loadingDetailVendor = true;
    });
    builder.addCase(fetchDetailVendor.fulfilled, (state, action) => {
      console.log(action.payload);
      state.detailVendor = action.payload;

      state.loadingDetailVendor = false;
    });
    builder.addCase(fetchDetailVendor.rejected, (state) => {
      state.loadingDetailVendor = false;
    });
  },
});

// Export the reducer and actions
export const { start, detailVendorReducer, failure } =
  detailVendorSlice.actions;
export default detailVendorSlice.reducer;
