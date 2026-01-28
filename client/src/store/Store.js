import { configureStore } from "@reduxjs/toolkit"
import seatReducer from "./SeatSlice"
import tripReducer from "./TripSlice"
import authReducer from "./AuthSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        seats : seatReducer,
        trip : tripReducer
    },
});
