package service

import (
	"GoBus/server/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SeatService struct {
	seatRepository *repository.SeatRepository
}

func NewSeatService() *SeatService {
	return &SeatService{}
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
