package service

import (
	"GoBus/server/model"
	"GoBus/server/repository"
	"GoBus/server/utils"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type SeatService struct {
	seatRepository  *repository.SeatRepository
	seatLockService *SeatLockService
	tripRepository  *repository.TripRepository
}

type AutoSeatCandidate struct {
	Seat   model.Seat
	Bucket string
}

func NewSeatService() *SeatService {
	return &SeatService{
		seatRepository:  &repository.SeatRepository{},
		seatLockService: &SeatLockService{},
	}

}

func (s *SeatService) GetSeatsByTrip(c *gin.Context) {
	tripID := c.Param("tripID")

	seats, err := s.seatRepository.GetSeatsByTrip(tripID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, seats)
}

func (s *SeatService) PickAutoSeat(seats []model.Seat) *AutoSeatCandidate {
	rand.Seed(time.Now().UnixNano())

	var low, medium []model.Seat

	for _, seat := range seats {
		score := utils.CalculateSeatScore(seat)
		bucket := utils.SeatBucket(score)

		if bucket == "LOW" {
			low = append(low, seat)
		} else if bucket == "MEDIUM" {
			medium = append(medium, seat)
		}
	}

	if len(low) > 0 {
		return &AutoSeatCandidate{
			Seat:   low[rand.Intn(len(low))],
			Bucket: "LOW",
		}
	}
	if len(medium) > 0 {
		return &AutoSeatCandidate{
			Seat:   medium[rand.Intn(len(medium))],
			Bucket: "MEDIUM",
		}
	}

	return nil
}

func (s *SeatService) CalculateAutoSelectPrice(baseFare int, bucket string) int {
	switch bucket {
	case "LOW":
		return int(float64(baseFare) * 0.90)
	case "MEDIUM":
		return int(float64(baseFare) * 0.95)
	default:
		return baseFare
	}
}

func (s *SeatService) AutoSelectSeat(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	tripID, _ := strconv.ParseUint(c.Param("tripID"), 10, 64)

	seats, err := s.seatRepository.GetAvailableSeats(uint(tripID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var unlockedSeats []model.Seat
	for _, seat := range seats {
		if !s.seatLockService.IsSeatLocked(uint(tripID), seat.ID) {
			unlockedSeats = append(unlockedSeats, seat)
		}
	}

	candidate := s.PickAutoSeat(unlockedSeats)
	if candidate == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Auto seat select not available"})
		return
	}

	trip, err := s.tripRepository.GetTripById(uint(tripID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	finalPrice := s.CalculateAutoSelectPrice(trip.Price, candidate.Bucket)

	var seatIDs []uint
	seatIDs = append(seatIDs, candidate.Seat.ID)
	err = s.seatLockService.LockSeats(uint(tripID), seatIDs, userID)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"seat": gin.H{
			"seat_id":     candidate.Seat.ID,
			"seat_number": candidate.Seat.SeatNumber,
		},
		"price":      finalPrice,
		"discount":   trip.Price - finalPrice,
		"expires_in": 60,
	})
}
