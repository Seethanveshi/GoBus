package router

import (
	"GoBus/server/service"

	"github.com/gin-gonic/gin"
)

func SeatRoute(r *gin.Engine) {
	seatService := service.NewSeatService()

	r.GET("/trips/:tripID/seats", seatService.GetSeatsByTrip)
}
