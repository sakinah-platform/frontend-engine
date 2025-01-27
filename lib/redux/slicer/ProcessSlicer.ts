import { createSlice } from "@reduxjs/toolkit";
import { MouseEventHandler } from "react";

export type ProccessProps = {
	data: "loading" | "success" | "failed";
	handleClose: MouseEventHandler<HTMLButtonElement>;
};
interface GenericState {
	processState: boolean;
	processMessageFailed: string | null;
	toastState: boolean;
}

const initialState: GenericState = {
	processState: false,
	processMessageFailed: "",
	toastState: false,
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
		toastStateReducer: (state, action) => {
			state.toastState = action.payload;
		},
		toastCloseReducer: (state) => {
			state.toastState = false;
		},
	},
});

// Export the reducer and actions
export const {
	processCloseReducer,
	processStateReducer,
	processMessageFailedReducer,
	toastStateReducer,
	toastCloseReducer,
} = processStateSlice.actions;
export default processStateSlice.reducer;
