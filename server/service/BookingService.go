package service

import (
	"GoBus/server/dto"
	"GoBus/server/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BookingService struct {
	bookingRepository *repository.BookingRepository
}

func NewBookingService() *BookingService {
	return &BookingService{}
}

type BookSeatsRequest struct {
	SeatIDs []string `json:"seatIds"`
}

func (s BookingService) BookSeats(c *gin.Context) {
	tripID := c.Param("tripID")

	var bookSeatsRequest BookSeatsRequest
	if err := c.ShouldBindJSON(&bookSeatsRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	booking, err := s.bookingRepository.CreateBooking(tripID, bookSeatsRequest.SeatIDs)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	bookingDto := dto.BookingDto{
		BookingID: booking.ID,
		TripID:    booking.TripID,
	}

	c.JSON(http.StatusCreated, bookingDto)
}
