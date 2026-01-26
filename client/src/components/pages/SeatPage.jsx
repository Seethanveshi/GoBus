import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios"
import SeatLayout from "../../components/seat/SeatLayout"
import { useSelector, useDispatch } from "react-redux";
import { fetchSeats, bookSeats, toggleSeat } from "../../store/SeatSlice";

export default function SeatPage() {
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const {seats, selectedSeats, loading} = useSelector((state) => state.seats)

  useEffect(() => {
    dispatch(fetchSeats(tripId))
  }, [tripId, dispatch]);

  const handleBook = async () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat");
      return;
    }

    dispatch(
      bookSeats({tripId, seatIds: selectedSeats.map((s) => s.seat_id)})
      ).then(() => {
        dispatch(fetchSeats(tripId));
      });
  };

  if (loading) return <p>Loading seats...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Select Seats</h2>

      <SeatLayout
        seats={seats}
        selectedSeats={selectedSeats}
        onSeatClick={(seat) => dispatch(toggleSeat(seat))}
      />

      <button
        onClick={handleBook}
        style={{
          marginTop: 20,
          background: "#d84e55",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 20,
          cursor: "pointer",
        }}
      >
        Book Seats
      </button>
    </div>
  );
}
