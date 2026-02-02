import React, { useEffect, useState } from "react";
import "../../styles/BookingPage.css"
import { useSelector } from "react-redux";

function BookingSummary({totalAmount, setTotalAmount, discount, setDiscount}) {
  const autoSeatSelectInfo = useSelector((state) => state.seats.autoSeatSelect)
  const autoSeatSelectDataInfo = useSelector((state) => state.seats.autoSeatSelectData)
  const trip = useSelector((state) => state.trip.trip)
  const selectedSeats = useSelector((state) => state.seats.selectedSeats)  

  useEffect(() => {
    setTotalAmount(selectedSeats.length * (trip.price || 0))

    if (autoSeatSelectInfo) {
      setDiscount(autoSeatSelectDataInfo.discount)
    } else {
      setDiscount(0);
    }
  }, [autoSeatSelectInfo, autoSeatSelectDataInfo, selectedSeats, trip, setTotalAmount])

  return (
    <div className="summary-card">
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Fare Details</h3>
      <div className="summary-row">
        <span>Base Fare ({selectedSeats.length} Seats)</span>
        <span>₹{totalAmount}</span>
      </div>
      {autoSeatSelectInfo ?  <div className="summary-row" style={{ color: '#7e7e7e', fontSize: '13px' }}>
        <span>Auto Seat Select Discount</span>
        <span>-{discount}</span>
      </div> : null}
      <div className="summary-row" style={{ color: '#7e7e7e', fontSize: '13px' }}>
        <span>Taxes & Fees</span>
        <span>₹0</span>
      </div>
      <div className="summary-row total-row">
        <span>Total Amount</span>
        <span style={{ color: '#d84e55' }}>₹{(totalAmount - discount).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default BookingSummary;
