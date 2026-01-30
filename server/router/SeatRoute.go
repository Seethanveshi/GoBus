package router

import (
	"GoBus/server/middleware"
	"GoBus/server/service"

	"github.com/gin-gonic/gin"
)

func SeatRoute(r *gin.Engine) {
	seatService := service.NewSeatService()
	seatLockService := service.NewSeatLockService()

	r.GET("/trips/:tripID/seats", seatService.GetSeatsByTrip)

	secured := r.Group("/")
	secured.Use(middleware.AuthRequired())

	secured.POST("/trips/:tripID/seats/lock", seatLockService.LockSeatsRequest)
	secured.POST("/trips/:tripID/seats/unlock", seatLockService.UnlockSeats)
	secured.GET("/trips/:tripID/seats/locked", seatLockService.GetLockedSeats)
}
