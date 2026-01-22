package model

import (
	"time"

	"gorm.io/gorm"
)

type Trip struct {
	gorm.Model
	BusID         uint      `gorm:"not null"`
	RouteID       uint      `gorm:"not null"`
	TravelDate    time.Time `gorm:"not null"`
	DepartureTime time.Time `gorm:"not null"`
	ArrivalTime   time.Time `gorm:"not null"`
	Price         int       `gorm:"not null"`

	Bus   Bus
	Route Route
}
