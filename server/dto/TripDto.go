package dto

import "time"

type TripDto struct {
	TripID        uint      `json:"trip_id"`
	Bus           BusDto    `json:"bus"`
	Route         RouteDto  `json:"route"`
	TravelDate    time.Time `json:"travel_date"`
	DepartureTime time.Time `json:"departure_time"`
	ArrivalTime   time.Time `json:"arrival_time"`
	Price         int       `json:"price"`
}
