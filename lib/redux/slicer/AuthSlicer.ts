import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface TypeUserSession  {
//     name: string;
//     email: string;
// }

interface TypeAuthState {
	user: string | null;
	token: string | null;
}

const initialState: TypeAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (
			state,
			action: PayloadAction<{ user: string; token: string }>
		) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
