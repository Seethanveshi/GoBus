import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchSeats = createAsyncThunk(
    "seats/fetchSeats",
    async(tripId) => {
        const res = await api.get(`/trips/${tripId}/seats`);
        return res.data
    }
)

const seatSlice = createSlice({
    name: "seatSlice",
    initialState : {
        seats : [],
        selectedSeats : [],
        loading : false,
        error : null
    },
    reducers : {
        toggleSeat(state, action) {
            const seat = action.payload
            const exists = state.selectedSeats.find(
                (s) => s.seat_id === seat.seat_id
            );
            
            if(exists) {
                state.selectedSeats = state.selectedSeats.filter(
                    (s) => s.seat_id !== seat.seat_id
                );
            }
            else{
                state.selectedSeats.push(seat)
            }
        },
        clearSelectedSeats(state){
            state.selectedSeats = [];
        },
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchSeats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSeats.fulfilled, (state, action) => {
                state.loading = false
                state.seats = action.payload
            })
            .addCase(fetchSeats.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
    },
});

export const {toggleSeat, clearSelectedSeats} = seatSlice.actions;
export default seatSlice.reducer;