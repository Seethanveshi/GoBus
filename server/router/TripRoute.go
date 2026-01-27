package router

import (
	"GoBus/server/service"

	"github.com/gin-gonic/gin"
)

func TripRoute(r *gin.Engine) {
	tripService := service.NewBusService()

	r.GET("/trips", tripService.Search)
	r.GET("/trips/:tripID", tripService.GetTripById)
}
