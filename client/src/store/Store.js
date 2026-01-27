import { configureStore } from "@reduxjs/toolkit"
import seatReducer from "./SeatSlice"
import tripReducer from "./TripSlice"

export const store = configureStore({
    reducer: {
        seats : seatReducer,
        trip : tripReducer
    },
});
