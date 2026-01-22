package model

import "gorm.io/gorm"

type Seat struct {
	gorm.Model
	BusID      uint   `gorm:"not null"`
	SeatNumber string `gorm:"not null"`
}
