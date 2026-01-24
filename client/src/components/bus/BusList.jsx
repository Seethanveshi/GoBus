import React from 'react';
import BusCard from './BusCard';
import '../../styles/Bus.css';

function BusList({ trips, loading }) {
  return (
    <div className="bus-list-container">
      {
        loading == true ? (
          <div className="list-header">
            <span>Loading. . .</span>
          </div>
        ) : trips == null ? (
          <div className="list-header">
            <span>Search for buses to see available trips.</span>
          </div>
        ) : trips.length === 0 ? (
          <div className="list-header">
            <span>No buses found for the selected route and date.</span>
          </div>
        ) : (trips.map((trip) => (
          <BusCard key={trip.trip_id} trip={trip} />
        )))
      }
    </div>
  );
};

export default BusList;