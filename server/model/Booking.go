package model

import "gorm.io/gorm"

type Booking struct {
	gorm.Model
	TripID uint `gorm:"not null"`
}
