package router

import (
	"GoBus/server/service"

	"github.com/gin-gonic/gin"
)

func BookingRouter(r *gin.Engine) {
	bookingService := service.NewBookingService()

	r.POST("/trips/:tripID/bookings", bookingService.BookSeats)
}
