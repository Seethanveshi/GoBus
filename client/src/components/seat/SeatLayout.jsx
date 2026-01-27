import { useSelector } from "react-redux";
import Seat from "./Seat"

function SeatLayout({seats, selectedSeats, onSeatClick}) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 50px)",
                gap: 12,
                marginTop: 20,
            }}
        >
            {seats.map((seat) => (
                <Seat 
                    key={seat.seat_id}
                    seat={seat}
                    isSelected={selectedSeats.some((s) => s.seat_id == seat.seat_id)}
                    onClick={() => onSeatClick(seat)}
                />
            ))}
        </div>
    );
}

export default SeatLayout