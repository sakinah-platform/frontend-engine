import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface TypeVendorDetail {
	[key: string]: number | string | boolean | object;
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
	packages: TypeVendorPackages[];
}

export interface TypeVendorPackages {
	id: number;
	name: string;
	price: number;
	description: string;
	// first_image: string;
	galleries: TypeVendorPackagesGalleries[];
	terms_and_condition: string;
}

export interface TypeVendorPackagesGalleries {
	id: number;
	name: string;
	image: string;
}
interface GenericState<T> {
	detailVendor: T | null; // Now allows a single object or null
	vendorPackages: TypeVendorPackages[]; // Separate array for packages
	loadingDetailVendor: boolean;
	error: string | null;
}

const initialState: GenericState<TypeVendorDetail> = {
	detailVendor: null, // Initially null, not an array
	vendorPackages: [],
	loadingDetailVendor: false,
	error: null,
};

export const fetchDetailVendor = createAsyncThunk(
	"master_data/vendors",
	async (params?: {
		basePath?: string | number; // Optional base path
		queryParams?: Record<string, string | number | undefined>; // Query parameters
	}): Promise<TypeVendorDetail | TypeVendorPackages> => {
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

		// Return different data structures based on basePath presence
		return basePath
			? (response.data as TypeVendorDetail)
			: (response.data.results as TypeVendorPackages);
	}
);

const detailVendorSlice = createSlice({
	name: "detailVendor",
	initialState,
	reducers: {
		start(state) {
			state.loadingDetailVendor = true;
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
			// console.log(action.payload);
			if (Array.isArray(action.payload)) {
				// If payload is an array, it's vendor packages
				state.vendorPackages = action.payload;
				// console.log("vendorPackages", action.payload);
			} else {
				// If payload is an object, it's vendor details
				state.detailVendor = action.payload as TypeVendorDetail;
				// console.log("vendorDetail", action.payload);
			}
			state.loadingDetailVendor = false;
		});

		builder.addCase(fetchDetailVendor.rejected, (state) => {
			state.loadingDetailVendor = false;
		});
	},
});

export const { start, failure } = detailVendorSlice.actions;
export default detailVendorSlice.reducer;
