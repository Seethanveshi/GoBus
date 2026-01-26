package repository

import (
	"GoBus/server/database"
	"GoBus/server/model"
	"errors"
	"strconv"

	"gorm.io/gorm"
)

type BookingRepository struct{}

func (r *BookingRepository) CreateBooking(tripID string, seatIDs []uint) (*model.Booking, error) {
	returnBooking := &model.Booking{}

	err := database.DB.Transaction(func(tx *gorm.DB) error {

		value, err := strconv.ParseUint(tripID, 10, 64)
		if err != nil {
			return err
		}
		booking := model.Booking{
			TripID: uint(value),
		}

		if err := database.DB.Create(&booking).Error; err != nil {
			return err
		}

		var count int64
		database.DB.Model(&model.BookingSeat{}).
			Joins("JOIN bookings ON bookings.id = booking_seats.booking_id").
			Where("bookings.trip_id = ? AND booking_seats.seat_id IN ?", tripID, seatIDs).
			Count(&count)

		if count > 0 {
			return errors.New("One or more seats already booked")
		}

		for _, seatID := range seatIDs {
			if err != nil {
				return err
			}

			database.DB.Create(&model.BookingSeat{
				BookingID: booking.ID,
				SeatID:    seatID,
			})
		}

		*returnBooking = booking
		return nil
	})

	return returnBooking, err
}
