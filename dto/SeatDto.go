package dto

type SeatDto struct {
	SeatID     uint   `json:"seat_id"`
	BusID      uint   `json:"bus_id"`
	SeatNumber string `json:"seat_number"`
	Status     string `json:"status"`
}
