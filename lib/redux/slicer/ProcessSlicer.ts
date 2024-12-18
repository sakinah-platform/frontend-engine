import { createSlice } from "@reduxjs/toolkit";

interface GenericState {
	processState: boolean;
	processMessageFailed: string | null;
}

const initialState: GenericState = {
	processState: false,
	processMessageFailed: "",
};

const processStateSlice = createSlice({
	name: "processState",
	initialState,
	reducers: {
		processCloseReducer: (state) => {
			state.processState = false;
		},
		processStateReducer: (state, action) => {
			state.processState = action.payload;
		},
		processMessageFailedReducer: (state, action) => {
			state.processMessageFailed = action.payload;
		},
	},
});

// Export the reducer and actions
export const {
	processCloseReducer,
	processStateReducer,
	processMessageFailedReducer,
} = processStateSlice.actions;
export default processStateSlice.reducer;
