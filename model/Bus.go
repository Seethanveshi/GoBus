package model

import "gorm.io/gorm"

type Bus struct {
	gorm.Model
	BusName    string `gorm:"not null"`
	BusNumber  string `gorm:"not null"`
	BusType    string `gorm:"not null"`
	TotalSeats int    `gorm:"not null"`
	Seats      []Seat `gorm:"constraint:OnUpdate:CASCADE, OnDelete:CASCADE"`
}
