package router

import (
	"GoBus/server/middleware"
	"GoBus/server/service"

	"github.com/gin-gonic/gin"
)

func BookingRouter(r *gin.Engine) {
	bookingService := service.NewBookingService(&service.SeatLockService{})
	secured := r.Group("/")
	secured.Use(middleware.AuthRequired())

	secured.POST("/trips/:tripID/bookings", bookingService.BookSeats)
	secured.GET("/bookings/history", bookingService.GetBookingHistory)
}
