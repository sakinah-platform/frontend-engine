import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of an individual biodata item (customize as needed)
interface BiodataItem {
	[key: string]: any; // Replace `any` with specific field types if known
}

// Define the state type
interface BiodataState {
	biodata: BiodataItem[];
}

// Initial state
const initialState: BiodataState = {
	biodata: [],
};

const biodataSlice = createSlice({
	name: "biodata",
	initialState,
	reducers: {
		biodataReducer: (state, action: PayloadAction<BiodataItem[]>) => {
			state.biodata = action.payload;
		},
		biodataOneChange: (
			state,
			action: PayloadAction<{ key: number; data: BiodataItem }>
		) => {
			const { key, data } = action.payload;
			if (state.biodata[key]) {
				state.biodata[key] = data;
			}
		},
		biodataOneChildAdd: (
			state,
			action: PayloadAction<{ parent: number; data: any }>
		) => {
			const { parent, data } = action.payload;
			if (Array.isArray(state.biodata[parent])) {
				(state.biodata[parent] as unknown[]).push(data);
			}
		},
		biodataOneChildChange: (
			state,
			action: PayloadAction<{ parent: number; key: number; data: any }>
		) => {
			const { parent, key, data } = action.payload;
			if (Array.isArray(state.biodata[parent]) && state.biodata[parent][key]) {
				(state.biodata[parent] as unknown[])[key] = data;
			}
		},
	},
});

export const {
	biodataReducer,
	biodataOneChange,
	biodataOneChildAdd,
	biodataOneChildChange,
} = biodataSlice.actions;

export default biodataSlice.reducer;
