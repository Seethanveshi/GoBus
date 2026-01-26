import React from 'react';
import '../../styles/Bus.css'
// import { Star } from 'lucide-react';
import { useNavigate } from 'react-router';

function BusCard ({ trip }) {
  const navigate = useNavigate()

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getDuration = (start, end) => {
    const diff = Math.abs(new Date(end) - new Date(start));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${mins}m`;
  };


  const navigateToSeatPage = () =>{
    navigate(`/trips/${trip.trip_id}/seats`)
  }

  return (
    <div className="bus-card">
      <div className="bus-details">
        <div className="bus-info">
          <h3 className="bus-name">{trip.bus.bus_name}</h3>
          <p className="bus-type">{trip.bus.bus_type} seater </p >
          <div className="bus-tags">
            <span className="tag">On Time</span>
            {/* <span className="tag">Free date change</span> */}
          </div>
        </div>

        <div className="time-column">
          <div className="time-row">
            <span className="time-main">{formatTime(trip.departure_time)}</span>
            <span className="time-sep">—</span>
            <span className="time-main">{formatTime(trip.arrival_time)}</span>
          </div>
          <p className="duration-text">{getDuration(trip.departure_time, trip.arrival_time)}</p>
        </div>

        <div className="price-column">
          <p className="price-label">Starts from</p>
          <p className="price-value">INR {trip.price}</p>
        </div>

        <div className="action-column">
          <button onClick={() => navigateToSeatPage()} className="view-seats-btn">View Seats</button>
        </div>
      </div>
    </div>
  );
};

export default BusCard;