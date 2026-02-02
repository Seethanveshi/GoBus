package model

import "gorm.io/gorm"

type Seat struct {
	gorm.Model
	BusID        uint   `gorm:"not null"`
	SeatNumber   string `gorm:"not null"`
	RowNumber    int
	SeatType     string
	Position     string
	NearToilet   bool	`gorm:"default:false"`
	ExtraLegroom bool	`gorm:"default:false"`
	Status       string `gorm:"not null; default:Not Booked"`
}
