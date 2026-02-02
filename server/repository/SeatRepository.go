package repository

import (
	"GoBus/server/database"
	"GoBus/server/dto"
	"GoBus/server/model"
)

type SeatRepository struct{}

func (r *SeatRepository) GetSeatsByTrip(tripID string) ([]dto.SeatAvailabilityDto, error) {
	var trip model.Trip
	if err := database.DB.First(&trip, "id = ?", tripID).Error; err != nil {
		return nil, err
	}

	var seats []model.Seat
	if err := database.DB.Where("bus_id = ?", trip.BusID).Order("seats.id").Find(&seats).Error; err != nil {
		return nil, err
	}

	var bookedSeats []model.BookingSeat
	if err := database.DB.Joins("JOIN bookings ON bookings.id = booking_seats.booking_id").
		Where("bookings.trip_id = ?", tripID).Find(&bookedSeats).Error; err != nil {

		return nil, err
	}

	bookedMap := make(map[uint]bool)
	for _, seat := range bookedSeats {
		bookedMap[seat.SeatID] = true
	}

	var result []dto.SeatAvailabilityDto
	for _, seat := range seats {
		result = append(result, dto.SeatAvailabilityDto{
			SeatID:     seat.ID,
			SeatNumber: seat.SeatNumber,
			Available:  !bookedMap[seat.ID],
		})
	}

	return result, nil
}

func (r *SeatRepository) GetAvailableSeats(tripID uint) ([]model.Seat, error) {
	var seats []model.Seat

	err := database.DB.Raw(`
		SELECT s.*
		FROM seats s
		WHERE s.bus_id = (
			SELECT bus_id FROM trips WHERE id = ?
		)
		AND NOT EXISTS (
			SELECT 1
			FROM booking_seats bs
			JOIN bookings b ON b.id = bs.booking_id
			WHERE bs.seat_id = s.id
			AND b.trip_id = ?
		)
	`, tripID, tripID).Scan(&seats).Error

	return seats, err
}

// func (r *SeatRepository) GetAllSeats() {
// 	var seats []model.Seat

// 	err := database.DB.Find(&seats).Error

// 	if err != nil {
// 		log.Fatal(err.Error())
// 	}

// 	for _, seat := range seats {
// 		seatNoStr := strings.TrimPrefix(seat.SeatNumber, "S")
// 		seatNo, _ := strconv.Atoi(seatNoStr)

// 		if seatNo >= 1 && seatNo <= 16 {
// 			seat.Position = "front"
// 		} else if seatNo >= 17 && seatNo <= 28 {
// 			seat.Position = "middle"
// 		} else {
// 			seat.Position = "back"
// 		}

// 		if seat.ID%4 == 1 || seat.ID%4 == 0 {
// 			seat.SeatType = "window"
// 		} else {
// 			seat.SeatType = "aisle"
// 		}

// 		if seat.ID%4 == 1 {
// 			seat.RowNumber = 1
// 		} else if seat.ID%4 == 2 {
// 			seat.RowNumber = 2
// 		} else if seat.ID%4 == 3 {
// 			seat.RowNumber = 3
// 		} else {
// 			seat.RowNumber = 4
// 		}

// 		database.DB.Save(&seat)
// 	}

// }
