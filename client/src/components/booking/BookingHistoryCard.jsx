import React from 'react'
import "../../styles/BookingHistory.css"

function BookingHistoryCard({booking}) {
  return (
    <div className="history-card">
      <div className="card-header">
        <h3 className="route-text">
          {booking.source} → {booking.destination}
        </h3>
        <span className="price-tag">₹{booking.total_amount}</span>
      </div>

      <div className="card-body">
        <div className="info-group">
          <label>Bus Operator</label>
          <span>{booking.bus_name}</span>
        </div>
        <div className="info-group">
          <label>Travel Date</label>
          <span>{new Date(booking.travel_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="info-group">
          <label>Seats</label>
          <span>{booking.seat_numbers.join(", ")}</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="booked-on">
          Booked on: {new Date(booking.booked_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
        </div>
      </div>
    </div>
  );
}

export default BookingHistoryCard