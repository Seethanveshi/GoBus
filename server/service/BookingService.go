package service

import (
	"GoBus/server/dto"
	"GoBus/server/repository"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BookingService struct {
	bookingRepository *repository.BookingRepository
}

func NewBookingService() *BookingService {
	return &BookingService{
		bookingRepository: &repository.BookingRepository{},
	}
}

func (s BookingService) BookSeats(c *gin.Context) {
	tripID := c.Param("tripID")

	var bookSeatsRequest dto.BookSeatsRequest
	if err := c.ShouldBindJSON(&bookSeatsRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	value, _ := strconv.ParseUint(tripID, 10, 64)

	booking, err := s.bookingRepository.CreateBooking(uint(value), bookSeatsRequest)

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


func (s BookingService) GetBookingHistory(c *gin.Context) {
	bookings, err := s.bookingRepository.GetBookingHistory()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch booking history",
		})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
