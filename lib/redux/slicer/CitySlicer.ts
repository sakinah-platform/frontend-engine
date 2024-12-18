import { sakinahAPI } from "@/lib/sakinahAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CityType = {
	id: number;
	name: string;
};

interface GenericState<T> {
	city: T[];
	loadingCity: boolean;
	error: string | null;
}

const initialState: GenericState<CityType> = {
	city: [],
	loadingCity: false,
	error: null,
};

export const fetchCity = createAsyncThunk(
	"master_data/city",
	async (): Promise<[CityType]> => {
		const response = await axios.get(`${sakinahAPI}/master_data/city`);
		return response.data.results;
	}
);

const citySlice = createSlice({
	name: "cities",
	initialState,
	reducers: {
		start(state) {
			state.loadingCity = true;
		},
		cityReducer(state, action: PayloadAction<CityType[]>) {
			state.loadingCity = false;
			state.city = [...state.city, ...action.payload];
		},
		failure(state, action: PayloadAction<string>) {
			state.loadingCity = false;
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCity.pending, (state) => {
			state.loadingCity = true;
		});
		builder.addCase(fetchCity.fulfilled, (state, action) => {
			console.log(action.payload);
			state.city = action.payload;

			state.loadingCity = false;
		});
		builder.addCase(fetchCity.rejected, (state) => {
			state.loadingCity = false;
		});
	},
});

// Export the reducer and actions
export const { start, cityReducer, failure } = citySlice.actions;
export default citySlice.reducer;
