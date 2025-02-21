import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface TypeCategory {
	// [x: string]: string;
	// title: string;
	id: number;
	name: string;
	icon: string;
}

interface GenericState<T> {
	category: T[];
	loadingCategory: boolean;
	error: string | null;
}

const initialState: GenericState<TypeCategory> = {
	category: [],
	loadingCategory: false,
	error: null,
};

export const fetchVendorCategory = createAsyncThunk(
	"master_data/vendor_category",
	async (): Promise<[TypeCategory]> => {
		const response = await axios.get(
			`${process.env.sakinahAPI}/master_data/vendor_category`
		);
		return response.data.results;
	}
);

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		start(state) {
			state.loadingCategory = true;
		},
		categoryReducer(state, action: PayloadAction<TypeCategory[]>) {
			state.loadingCategory = false;
			state.category = [...state.category, ...action.payload];
		},
		failure(state, action: PayloadAction<string>) {
			state.loadingCategory = false;
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchVendorCategory.pending, (state) => {
			state.loadingCategory = true;
		});
		builder.addCase(fetchVendorCategory.fulfilled, (state, action) => {
			// console.log(action.payload);
			state.category = action.payload;

			state.loadingCategory = false;
		});
		builder.addCase(fetchVendorCategory.rejected, (state) => {
			state.loadingCategory = false;
		});
	},
});

// Export the reducer and actions
export const { start, categoryReducer, failure } = categorySlice.actions;
export default categorySlice.reducer;
