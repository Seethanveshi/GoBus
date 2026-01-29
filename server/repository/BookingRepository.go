package repository

import (
	"GoBus/server/database"
	"GoBus/server/dto"
	"GoBus/server/model"
	"errors"
	"strconv"

	"gorm.io/gorm"
)

type BookingRepository struct{}

func (r *BookingRepository) CreateBooking(tripID uint, userID uint, request dto.BookSeatsRequest) (*model.Booking, error) {
	returnBooking := &model.Booking{}

	err := database.DB.Transaction(func(tx *gorm.DB) error {

		booking := model.Booking{
			TripID:      tripID,
			UserID:      userID,
			Phone:       request.Contact.Phone,
			Email:       request.Contact.Email,
			TotalAmount: request.TotalAmount,
		}

		if err := tx.Create(&booking).Error; err != nil {
			return err
		}

		var count int64
		tx.Model(&model.BookingSeat{}).
			Joins("JOIN bookings ON bookings.id = booking_seats.booking_id").
			Where("bookings.trip_id = ? AND booking_seats.seat_id IN ?", tripID, request.SeatIDs).
			Count(&count)

		if count > 0 {
			return errors.New("One or more seats already booked")
		}

		for _, seatID := range request.SeatIDs {
			s := strconv.FormatUint(uint64(seatID), 10)
			traveller, ok := request.Travellers[s]
			if !ok {
				return errors.New("traveller details are missing")
			}

			err := tx.Create(&model.BookingSeat{
				BookingID: booking.ID,
				SeatID:    seatID,
				Name:      traveller.Name,
				Age:       traveller.Age,
				Gender:    traveller.Gender,
			}).Error

			if err != nil {
				return err
			}
		}

		*returnBooking = booking
		return nil
	})

	return returnBooking, err
}

func (r *BookingRepository) GetBookingHistory(userID uint) ([]dto.BookingHistoryResponse, error) {
	var results []dto.BookingHistoryResponse

	rows, err := database.DB.Raw(`
		SELECT 
			b.id AS booking_id,
			t.id AS trip_id,
			r.source,
			r.destination,
			bus.bus_name,
			bus.bus_number,
			bus.bus_type,
			t.travel_date,
			t.departure_time,
			t.arrival_time,
			b.total_amount,
			b.created_at
		FROM bookings b
		JOIN trips t ON t.id = b.trip_id
		JOIN routes r ON r.id = t.route_id
		JOIN buses bus ON bus.id = t.bus_id
		WHERE b.user_id = ?
		ORDER BY b.created_at DESC
	`, userID).Rows()

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var item dto.BookingHistoryResponse
		rows.Scan(
			&item.BookingID,
			&item.TripID,
			&item.Source,
			&item.Destination,
			&item.BusName,
			&item.BusNumber,
			&item.BusType,
			&item.TravelDate,
			&item.DepartureTime,
			&item.ArrivalTime,
			&item.TotalAmount,
			&item.BookedAt,
		)

		// fetch seats
		var seats []string
		database.DB.Raw(`
			SELECT s.seat_number
			FROM booking_seats bs
			JOIN seats s ON s.id = bs.seat_id
			WHERE bs.booking_id = ?
		`, item.BookingID).Scan(&seats)

		item.SeatNumbers = seats
		results = append(results, item)
	}

	return results, nil
}
