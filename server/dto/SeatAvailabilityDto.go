package dto

type SeatAvailabilityDto struct {
	SeatID     uint   `json:"seat_id"`
	SeatNumber string `json:"seat_number"`
	Available  bool   `json:"available"`
}
