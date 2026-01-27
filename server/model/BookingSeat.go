package model

import "gorm.io/gorm"

type BookingSeat struct {
	gorm.Model
	SeatID    uint `gorm:"not null"`
	BookingID uint `gorm:"not null"`

	Name   string `gorm:"not null"`
	Age    int    `gorm:"not null"`
	Gender string `gorm:"not null"`
}
