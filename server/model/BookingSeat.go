package model

import "gorm.io/gorm"

type BookingSeat struct {
	gorm.Model
	SeatID    uint `gorm:"not null"`
	BookingID uint `gorm:"not null"`
}
