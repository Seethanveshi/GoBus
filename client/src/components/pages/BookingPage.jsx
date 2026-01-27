import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TravellerPage from '../booking/TravellerPage';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { tripDetails } from '../../store/TripSlice';
import BookingSummary from '../booking/BookingSummary';
import { clearSelectedSeats } from '../../store/SeatSlice';
import "../../styles/BookingPage.css"

function BookingPage() {
    const { tripId } = useParams();
    const trip = useSelector((state) => state.trip.trip)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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


    const selectedSeats = useSelector((state) => state.seats.selectedSeats)

    const [travellers, setTravellers] = useState({});
    const [contactDetails, setContactDetails] = useState({
        phone: "",
        email: "",
    });

    const totalAmount = selectedSeats.length * (trip.price || 0);

    if (loading) {
        return <div className="loading">Loading trip details...</div>
    }
    
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

        await api.post(`/trips/${tripId}/bookings`, payload);
        dispatch(clearSelectedSeats())
        

        alert("Booking confirmed 🎉");
        navigate("/");
    };

    return (
      <div className="booking-layout">
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