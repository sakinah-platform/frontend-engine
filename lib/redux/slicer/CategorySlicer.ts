import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryType {
	[x: string]: string;
	title: string;
}

interface GenericState<T> {
	data: T[];
	loading: boolean;
	error: string | null;
}

const initialState: GenericState<CategoryType> = {
	data: [],
	loading: false,
	error: null,
};

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		start(state) {
			state.loading = true;
		},
		categoryReducer(state, action: PayloadAction<CategoryType[]>) {
			state.loading = false;
			state.data = [...state.data, ...action.payload];
		},
		failure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

// Export the reducer and actions
export const { start, categoryReducer, failure } = categorySlice.actions;
export default categorySlice.reducer;
