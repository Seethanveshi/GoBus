import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios"
import SeatLayout from "../../components/seat/SeatLayout"

export default function SeatPage() {
  const { tripId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const loadSeats = async () => {
    setLoading(true);
    const res = await api.get(`/trips/${tripId}/seats`);
    setSeats(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadSeats();
  }, [tripId]);

  const toggleSeat = (seat) => {
    if (!seat.available) return;

    setSelectedSeats((prev) =>
      prev.some((s) => s.seat_id === seat.seat_id)
        ? prev.filter((s) => s.seat_id !== seat.seat_id)
        : [...prev, seat]
    );
  };

  const bookSeats = async () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat");
      return;
    }

    await api.post(`/trips/${tripId}/bookings`, {
      seatIds: selectedSeats.map((s) => s.seat_id),
    });

    alert("Seats booked successfully 🎉");
    setSelectedSeats([]);
    loadSeats(); 
  };

  if (loading) return <p>Loading seats...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Select Seats</h2>

      <SeatLayout
        seats={seats}
        selectedSeats={selectedSeats}
        onSeatClick={toggleSeat}
      />

      <button
        onClick={bookSeats}
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
