package dto

type BookingHistoryResponse struct {
	BookingID     uint     `json:"booking_id"`
	TripID        uint     `json:"trip_id"`
	Source        string   `json:"source"`
	Destination   string   `json:"destination"`
	BusName       string   `json:"bus_name"`
	BusNumber     string   `json:"bus_number"`
	BusType       string   `json:"bus_type"`
	TravelDate    string   `json:"travel_date"`
	DepartureTime string   `json:"departure_time"`
	ArrivalTime   string   `json:"arrival_time"`
	SeatNumbers   []string `json:"seat_numbers"`
	TotalAmount   int      `json:"total_amount"`
	BookedAt      string   `json:"booked_at"`
}
