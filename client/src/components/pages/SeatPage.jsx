import { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import SeatLayout from "../../components/seat/SeatLayout"
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedSeats, fetchSeats, toggleAutoSeatSelect, toggleSeat } from "../../store/SeatSlice";
import "../../styles/Seat.css"
import api from "../../api/axios";
import { tripDetails } from "../../store/TripSlice";

export default function SeatPage() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0)
  const trip = useSelector((state) => state.trip.trip)
  const [loading, setLoading] = useState(true)
  const [autoSeatSelect, setAutoSeatSelect] = useState(false)
  const [autoSeatSelectData, setAutoSeatSelectData] = useState()

  const {seats, selectedSeats} = useSelector((state) => state.seats)

  useEffect(() => {
    setTotalAmount(() => selectedSeats.length * (trip.price || 0));
  }, [selectedSeats]) 

  useEffect(() => {
    dispatch(fetchSeats(tripId))
    dispatch(clearSelectedSeats())
  }, [tripId, dispatch]);

  useEffect(() => {
      const fetchTrip = async () => {
          try {
              setLoading(true);
              const res = await api.get(`trips/${tripId}`)
              const data = res.data
              dispatch(tripDetails(data))
          } catch (err) {
              console.error('Failed to fetch trip:', err);
          } finally {
              setLoading(false);
          }
      }
      fetchTrip()
  }, [tripId, dispatch])

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
      const expiryIn = res.data.expires_in;
      const expiryTime = Date.now() + expiryIn * 1000;
      sessionStorage.setItem("seat_lock_expiry", expiryTime);

      navigate(`/trips/${tripId}/bookingdetails`);

    } catch (error) {
      alert(error.response?.data?.error || "One or more selected seats are no longer available");
    }   
  };


  const handleAutoSelect = async () => {
    try {
      const res = await api.post(
        `/trips/${tripId}/seats/auto-select`
      );

      const { seat, expires_in } = res.data;

      setAutoSeatSelectData(res.data)
      setAutoSeatSelect(true)

      const payload = {
        autoSeatSelect : true,
        autoSeatSelectData : res.data
      }

      dispatch(toggleAutoSeatSelect(payload))

      const expiryTime = Date.now() + expires_in * 1000;
      sessionStorage.setItem("seat_lock_expiry", expiryTime);

      dispatch(toggleSeat(seat));

      navigate(`/trips/${tripId}/bookingdetails`);
    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Auto seat selection unavailable"
      );
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

      <div>
        {
          selectedSeats?.length > 0 ?
            <div style={{display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <div className="total-row">
                <span>Total Amount</span>
                <span style={{ color: '#d84e55' }}>₹{totalAmount.toLocaleString()}</span>
              </div>
        
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

           : 

           <div style={{display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <div className="total-row">
                <span>Continue with auto select to get the discount</span>
              </div>
            
            <button
                onClick={handleAutoSelect}
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
                Auto Select
              </button>
          </div>
        }
      </div>
    </div>
  );
}
