import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name : "AuthSlice",
    initialState : {
        user : JSON.parse(localStorage.getItem("user")) || null,
    },
    reducers : {
        login(state, action) {
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
