import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name : "AuthSlice",
    initialState : {
        user : null,
        token : localStorage.getItem("token")
    },
    reducers : {
        login(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token")
        },
    },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
