package dto

type BusDto struct {
	BusID      uint   `json:"bus_id"`
	BusName    string `json:"bus_name"`
	BusNumber  string `json:"bus_number"`
	BusType    string `json:"bus_type"`
	TotalSeats int    `json:"total_seats"`
}
