import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import BookingHistoryCard from '../booking/BookingHistoryCard'
import "../../styles/BookingHistory.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function BookingHistoryPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookingHistory = async() => {
            try {
                const res = await api.get(`bookings/history`)
                setBookings(res.data)
            } catch (err) {
                if (err.response.status == 401){
                    navigate("/auth/login")
                }
                console.error(err)
            } finally {
                setLoading(false)
            }
        };

        fetchBookingHistory();
    }, [])

    if (loading){
        return <p>Loading Bookings</p>
    }

    if (bookings == null || bookings.length === 0) {
        return <p>No Bookings Found</p>;
    }

    return (
        <div className="booking-history-container">
            <h2 className="history-title">My Bookings</h2>
            <div className="history-list">
                {bookings.map((b) => (
                    <BookingHistoryCard key={b.booking_id} booking={b} />
                ))}
            </div>
        </div>
    );
}

export default BookingHistoryPage