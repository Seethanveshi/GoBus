import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TravellerPage from '../booking/TravellerPage';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { tripDetails } from '../../store/TripSlice';
import BookingSummary from '../booking/BookingSummary';
import { clearSelectedSeats } from '../../store/SeatSlice';
import "../../styles/BookingPage.css"
import useCountDown from '../../hooks/useCountDown';
import CountdownTimer from '../countdownTimer/CountdownTimer';

function BookingPage() {
    const { tripId } = useParams();
    const trip = useSelector((state) => state.trip.trip)
    const selectedSeats = useSelector((state) => state.seats.selectedSeats);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [travellers, setTravellers] = useState({});
    const [contactDetails, setContactDetails] = useState({
        phone: "",
        email: "",
    });
    const didStrictModeCleanup = useRef(false);

    const expiryTime = Number(localStorage.getItem("seat_lock_expiry") || 0);
    const timeLeft = useCountDown(expiryTime);

    useEffect(() => {
        if (!expiryTime || timeLeft === null) return;

        if(timeLeft === 0){
            alert("Seat lock expired. Please select seats again")
            localStorage.removeItem("seat_lock_expiry")
            navigate(`/trips/${tripId}/seats`, { replace: true });
        }
    }, [timeLeft, navigate])

    const safeTimeLeft = Math.max(timeLeft || 0, 0);
    const minutes = Math.floor((safeTimeLeft / 1000) / 60);
    const seconds = Math.floor((safeTimeLeft / 1000) % 60);

    const totalAmount = selectedSeats.length * (trip.price || 0);

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


    useEffect(() => {

        return () => {
            if (!didStrictModeCleanup.current) {
                didStrictModeCleanup.current = true;
                return;
            }

            if (selectedSeats.length === 0) return;

            console.log("executed unlock seats")
            const seatIds = selectedSeats.map(s => s.seat_id);
            api.post(`/trips/${tripId}/seats/unlock`, {
            seat_ids: seatIds,
            }).catch(() => {});
        };
    }, []);

    const handleConfirmBooking = async () => {
        for (const seat of selectedSeats) {
            const t = travellers[seat.seat_id];
            if (!t?.name || !t?.age || !t?.gender) {
                alert(`Enter details for seat ${seat.seat_number}`);
                return;
            }
        }

        if (!contactDetails.phone || !contactDetails.email) {
            alert("Enter contact details");
            return;
        }

        const payload = {
            seatIds: selectedSeats.map((s) => s.seat_id),
            travellers,
            contact: contactDetails,
            total_amount: totalAmount
        };
    
        try {
            await api.post(`/trips/${tripId}/bookings`, payload);
            dispatch(clearSelectedSeats())
            
            alert("Booking confirmed 🎉");
            navigate("/");
        } 
        catch (err) {
            if (err.response) {
                console.log("Executed")
                alert(err.response.data.error);
            } 
            else {
                alert("Server unreachable");
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading trip details...</div>
    }

    return (
      <div className="booking-layout">
        <div className="lock-timer-wrapper">
            <CountdownTimer 
                minutes={minutes} 
                seconds={seconds} 
                expiryTime={expiryTime} 
                currentSeconds={Math.floor(timeLeft / 1000)}
            />
        </div>

        <div className="left">
            <TravellerPage
            trip={trip}
            selectedSeats={selectedSeats}
            travellers={travellers}
            setTravellers={setTravellers}
            contactDetails={contactDetails}
            setContactDetails={setContactDetails}
            handleConfirmBooking={handleConfirmBooking}
            />
        </div>

        <div className="right">
            <BookingSummary
            trip={trip}
            selectedSeats={selectedSeats}
            totalAmount={totalAmount}
            />
        </div>
      </div>
    )
}

export default BookingPage