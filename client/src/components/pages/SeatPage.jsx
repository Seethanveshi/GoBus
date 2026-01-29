import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SeatLayout from "../../components/seat/SeatLayout"
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedSeats, fetchSeats, toggleSeat } from "../../store/SeatSlice";
import "../../styles/Seat.css"
import api from "../../api/axios";

export default function SeatPage() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {seats, selectedSeats, loading} = useSelector((state) => state.seats)

  useEffect(() => {
    dispatch(fetchSeats(tripId))
    dispatch(clearSelectedSeats())
  }, [tripId, dispatch]);

  const handleBook = async () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat");
      return;
    }

    try {
      const seatIds = selectedSeats.map(s => s.seat_id)
      const res = await api.post(`/trips/${tripId}/seats/lock`, {
                                                                  seat_ids: seatIds,
                                                                }
                                )
      navigate(`/trips/${tripId}/bookingdetails`);
    } catch (error) {
      alert(error.response?.data?.error || "One or more selected seats are no longer available");
    }   
  };

  if (loading) return <p>Loading seats...</p>;

  return (
    <div className="seat-layout">
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
