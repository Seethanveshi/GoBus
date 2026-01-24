package model

import "gorm.io/gorm"

type Route struct {
	gorm.Model
	Source      string `gorm:"not null"`
	Destination string `gorm:"not null"`
}
