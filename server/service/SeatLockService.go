package service

import (
	"GoBus/server/database"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type SeatLockService struct{}

func NewSeatLockService() *SeatLockService {
	return &SeatLockService{}
}

const seatLockTTL = 30 * time.Second

func (s *SeatLockService) LockSeats(tripID uint, seatIDs []uint, userID uint) error {
	lockedSeats := []string{}

	for _, seatID := range seatIDs {
		key := fmt.Sprintf("seat_lock:%d:%d", tripID, seatID)

		ok, err := database.RedisClient.SetNX(
			database.Ctx,
			key,
			userID,
			seatLockTTL,
		).Result()

		if err != nil {
			return err
		}

		if !ok {
			for _, k := range lockedSeats {
				database.RedisClient.Del(database.Ctx, k)
			}

			return fmt.Errorf("one or more seats already locked")
		}

		lockedSeats = append(lockedSeats, key)
	}

	return nil
}

func (s *SeatLockService) LockSeatsRequest(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	tripID, _ := strconv.ParseUint(c.Param("tripID"), 10, 64)

	var req struct {
		SeatIDs []uint `json:"seat_ids"`
	}

	if err := c.ShouldBindJSON(&req); err != nil || len(req.SeatIDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid seat selection"})
		return
	}

	err := s.LockSeats(uint(tripID), req.SeatIDs, userID)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "seats locked",
		"expires_in": 20,
	})
}

func (s *SeatLockService) VerifySeatLock(
	tripID uint,
	seatID uint,
	userID uint,
) error {
	key := fmt.Sprintf("seat_lock:%d:%d", tripID, seatID)

	val, err := database.RedisClient.Get(database.Ctx, key).Result()
	if err != nil {
		return fmt.Errorf("seat lock expired")
	}

	if val != strconv.Itoa(int(userID)) {
		return fmt.Errorf("seat lock owned by another user")
	}

	return nil
}

func (s *SeatLockService) UnlockSeat(tripID, seatID uint) {
	key := fmt.Sprintf("seat_lock:%d:%d", tripID, seatID)
	database.RedisClient.Del(database.Ctx, key)
}

func (s *SeatLockService) UnlockSeats(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	tripID, _ := strconv.ParseUint(c.Param("tripID"), 10, 64)

	var req struct {
		SeatIDs []uint `json:"seat_ids"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	for _, seatID := range req.SeatIDs {
		key := fmt.Sprintf("seat_lock:%d:%d", tripID, seatID)
		val, err := database.RedisClient.Get(database.Ctx, key).Result()
		if err == nil && val == strconv.Itoa(int(userID)) {
			s.UnlockSeat(uint(tripID), seatID)
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "seats unlocked"})
}
