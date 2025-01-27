import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface TypeVendor {
	// [x: string]: string;
	// title: string;
	id: number;
	name: string;
	description: string;
	about: string;
	category: string;
	city: string;
	email: string;
	facebook: string;
	instagram: string;
	tiktok: string;
	youtube: string;
	profile_image: string;
	availability: boolean;
	// visibilty: string;
	visibility: "private" | "public";
	galleries: TypeVendorGalleries[];
	packages: TypeVendorPackages[];
	schedules: TypeVendorSchedules[];
	// starting_price: number;
	[key: string]: number | string | unknown;
}

type TypeVendorGalleries = {
	id: number;
	image: string;
};
export type TypeVendorPackages = {
	id: number;
	name: string;
	price: number;
	description: string;
};
type TypeVendorSchedules = {
	day: string;
	start_time: string;
	end_time: string;
};

interface GenericState<T> {
	vendor: T[];
	loadingVendor: boolean;
	error: string | null;
}

const initialState: GenericState<TypeVendor> = {
	vendor: [],
	loadingVendor: false,
	error: null,
};

export const fetchVendor = createAsyncThunk(
	"master_data/vendors",
	async (params?: {
		basePath?: string | number; // Optional base path
		queryParams?: Record<string, string | number | undefined>; // Query parameters
	}): Promise<[TypeVendor]> => {
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

const vendorSlice = createSlice({
	name: "vendors",
	initialState,
	reducers: {
		start(state) {
			state.loadingVendor = true;
		},
		vendorReducer(state, action: PayloadAction<TypeVendor[]>) {
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
