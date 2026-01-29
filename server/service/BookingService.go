package service

import (
	"GoBus/server/database"
	"GoBus/server/dto"
	"GoBus/server/repository"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
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
	userID := c.MustGet("user_id").(uint)

	var bookSeatsRequest dto.BookSeatsRequest
	if err := c.ShouldBindJSON(&bookSeatsRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	value, _ := strconv.ParseUint(tripID, 10, 64)

	for _, seatID := range bookSeatsRequest.SeatIDs {
		key := fmt.Sprintf("seat_lock:%d:%d", value, seatID)

		val, err := database.RedisClient.Get(database.Ctx, key).Result()

		if err == redis.Nil {
			c.JSON(http.StatusConflict, gin.H{"error": "seat lock expired"})
			return
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "redis error"})
			return
		}
		if val != strconv.Itoa(int(userID)) {
			c.JSON(http.StatusForbidden, gin.H{"error": "seat locked by another user"})
			return
		}
	}

	booking, err := s.bookingRepository.CreateBooking(uint(value), userID, bookSeatsRequest)

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
