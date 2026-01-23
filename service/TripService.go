package service

import (
	"GoBus/dto"
	"GoBus/repository"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type TripService struct {
	tripRepository *repository.TripRepository
}

func NewBusService() *TripService {
	return &TripService{}
}

func (s *TripService) Search(c *gin.Context) {
	source := c.Query("source")
	destination := c.Query("destination")
	dateStr := c.Query("date")

	date, err := time.Parse("2006-01-02", dateStr)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	trips, err := s.tripRepository.Search(source, destination, date)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var tripDtos []dto.TripDto

	for _, trip := range trips {
		busDto := dto.BusDto{
			BusID:      trip.BusID,
			BusName:    trip.Bus.BusName,
			BusNumber:  trip.Bus.BusNumber,
			BusType:    trip.Bus.BusType,
			TotalSeats: trip.Bus.TotalSeats,
		}

		routeDto := dto.RouteDto{
			RouteID:     trip.RouteID,
			Source:      trip.Route.Source,
			Destination: trip.Route.Destination,
		}

		tripDto := dto.TripDto{
			TripID:        trip.ID,
			Bus:           busDto,
			Route:         routeDto,
			TravelDate:    trip.TravelDate,
			DepartureTime: trip.DepartureTime,
			ArrivalTime:   trip.ArrivalTime,
			Price:         trip.Price,
		}

		tripDtos = append(tripDtos, tripDto)
	}

	c.JSON(http.StatusOK, tripDtos)
}
