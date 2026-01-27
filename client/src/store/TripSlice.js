import { createSlice } from "@reduxjs/toolkit";


const tripSlice = createSlice({
    name : "tripSlice",
    initialState : {
        trip : {}
    },
    reducers : {
        tripDetails(state, action) {
            const trip = action.payload
            state.trip = trip
        }
    }
})

export const {tripDetails} = tripSlice.actions
export default tripSlice.reducer