import React from "react";
import "../../styles/BookingPage.css"

function BookingSummary({selectedSeats, totalAmount }) {
  return (
    <div className="summary-card">
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Fare Details</h3>
      <div className="summary-row">
        <span>Base Fare ({selectedSeats.length} Seats)</span>
        <span>₹{totalAmount}</span>
      </div>
      <div className="summary-row" style={{ color: '#7e7e7e', fontSize: '13px' }}>
        <span>Taxes & Fees</span>
        <span>₹0</span>
      </div>
      <div className="summary-row total-row">
        <span>Total Amount</span>
        <span style={{ color: '#d84e55' }}>₹{totalAmount}</span>
      </div>
    </div>
  );
}

export default BookingSummary;
