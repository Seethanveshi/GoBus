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
	seatLockService   *SeatLockService
}

func NewBookingService(seatLockService *SeatLockService) *BookingService {
	return &BookingService{
		bookingRepository: &repository.BookingRepository{},
		seatLockService:   seatLockService,
	}
}

func (s BookingService) BookSeats(c *gin.Context) {
	tripID := c.Param("tripID")
	userID := c.MustGet("user_id").(uint)

	var bookSeatsRequest dto.BookSeatsRequest
	if err := c.ShouldBindJSON(&bookSeatsRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	value, _ := strconv.ParseUint(tripID, 10, 64)

	for _, seatID := range bookSeatsRequest.SeatIDs {
		err := s.seatLockService.VerifySeatLock(
			uint(value),
			seatID,
			userID,
		)
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{
				"error": err.Error(),
			})
			return
		}
	}

	booking, err := s.bookingRepository.CreateBooking(uint(value), userID, bookSeatsRequest)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	for _, seatID := range bookSeatsRequest.SeatIDs {
		s.seatLockService.UnlockSeat(uint(value), seatID)
	}

	bookingDto := dto.BookingDto{
		BookingID: booking.ID,
		TripID:    booking.TripID,
	}

	c.JSON(http.StatusCreated, bookingDto)
}

func (s BookingService) GetBookingHistory(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	bookings, err := s.bookingRepository.GetBookingHistory(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch booking history",
		})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
