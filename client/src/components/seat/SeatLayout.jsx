import { useSelector } from "react-redux";
import Seat from "./Seat"
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function SeatLayout({seats, selectedSeats, onSeatClick}) {
    const { tripId } = useParams();
    const [lockedSeats, setLockedSeats] = useState([]);

    useEffect(() => {
        const fetchLockedSeats = async () => {
            const res = await api.get(`/trips/${tripId}/seats/locked`);
            setLockedSeats(res.data);
        };

        fetchLockedSeats();
    }, [tripId]);


    const lockedSeatMap = {};
        lockedSeats?.forEach(s => {
        lockedSeatMap[s.seat_id] = s.owned ? "owned" : "locked";
    });

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
                    lockedSeatMap = {lockedSeatMap}
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