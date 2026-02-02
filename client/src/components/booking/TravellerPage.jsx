import React, { useEffect, useState } from "react";
import "../../styles/BookingPage.css"
import { useSelector } from "react-redux";

function TravellerPage({travellers, setTravellers, contactDetails, setContactDetails, handleConfirmBooking }) {
  const trip = useSelector((state) => state.trip.trip);
  const selectedSeats = useSelector((state) => state.seats.selectedSeats)
  const autoSeatSelectInfo = useSelector((state) => state.seats.autoSeatSelect)
  const autoSeatSelectDataInfo = useSelector((state) => state.seats.autoSeatSelectData)
  
  const [autoSeatSelect, setAutoSeatSelect] = useState(false)

  useEffect(() => {
    setAutoSeatSelect(autoSeatSelectInfo)
  }, [autoSeatSelectInfo, autoSeatSelectDataInfo])

  const handleTravellerChange = (seatId, field, value) => {
    setTravellers((prev) => ({
      ...prev,
      [seatId]: {
        ...prev[seatId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="traveller-page-container">
      <div className="booking-section-card">
        <h3>Journey Details</h3>
        <p style={{ fontWeight: 'bold' }}>{trip.route.source} → {trip.route.destination}</p>
        <p style={{ color: '#7e7e7e', fontSize: '14px' }}>{trip.bus.bus_name} | {trip.bus.bus_type}</p>
        <p>Travel Date: {trip.travel_date && new Date(trip.travel_date).toLocaleDateString('en-GB')} | Departure: {new Date(trip.departure_time).toLocaleTimeString()} |
           Arrival: {new Date(trip.arrival_time).toLocaleTimeString()}</p>
      </div>

      <div className="booking-section-card">
        <h2>Traveller Details</h2>
        {selectedSeats.map((seat) => (
          <div key={seat.seat_id} className="seat-form-row">
            {autoSeatSelect ? null : <h4>Seat Number: {seat.seat_number}</h4>}
            <div className="contact-inputs">
              <input 
                className="booking-input" 
                placeholder="Name" 
                onChange={(e) => handleTravellerChange(seat.seat_id, "name", e.target.value)} 
              />
              <input 
                className="booking-input" 
                type="number" 
                placeholder="Age" 
                onChange={(e) => handleTravellerChange(seat.seat_id, "age", Number(e.target.value))} 
              />
              <select className="booking-select" onChange={(e) => handleTravellerChange(seat.seat_id, "gender", e.target.value)}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="booking-section-card">
        <h2>Contact Information</h2>
        <div className="contact-inputs">
          <input 
            className="booking-input" 
            placeholder="Mobile Number" 
            value={contactDetails.phone} 
            onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })} 
          />
          <input 
            className="booking-input" 
            placeholder="Email Address" 
            value={contactDetails.email} 
            onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })} 
          />
        </div>
      </div>                                                                                                                                                                                                                                                                        

      <button onClick={handleConfirmBooking} className="confirm-btn">
        Confirm Booking
      </button>
    </div>
  );
}

export default TravellerPage