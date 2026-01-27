package dto

type TravellerDTO struct {
	Name   string `json:"name"`
	Age    int    `json:"age"`
	Gender string `json:"gender"`
}

type BookSeatsRequest struct {
	SeatIDs    []uint                  `json:"seatIds"`
	Travellers map[string]TravellerDTO `json:"travellers"`
	Contact    struct {
		Phone string `json:"phone"`
		Email string `json:"email"`
	} `json:"contact"`
	TotalAmount int `json:"total_amount"`
}
