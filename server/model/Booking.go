package model

import "gorm.io/gorm"

type Booking struct {
	gorm.Model
	TripID      uint   `gorm:"not null"`
	Phone       string `gorm:"not null"`
	Email       string `gorm:"not null"`
	TotalAmount int    `gorm:"not null"`
}
