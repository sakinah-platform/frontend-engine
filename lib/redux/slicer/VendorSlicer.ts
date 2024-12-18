import { sakinahAPI } from "@/lib/sakinahAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface VendorType {
	// [x: string]: string;
	// title: string;
	id: number;
	name: string;
	profile_image: string;
	starting_price: number;
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
	async (): Promise<[VendorType]> => {
		const response = await axios.get(`${sakinahAPI}/master_data/vendors`);
		return response.data.results;
	}
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
			console.log(action.payload);
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
