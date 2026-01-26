import { configureStore } from "@reduxjs/toolkit"
import seatReducer from "./SeatSlice"


export const store = configureStore({
    reducer: {
        seats : seatReducer,
    },
});
