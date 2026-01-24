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
	if err := database.DB.Where("bus_id = ?", trip.BusID).Find(&seats).Error; err != nil {
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
