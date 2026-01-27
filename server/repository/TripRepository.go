package repository

import (
	"GoBus/server/database"
	"GoBus/server/model"
	"time"
)

type TripRepository struct{}

func (r *TripRepository) Search(source string, destination string, date time.Time) ([]model.Trip, error) {
	var trips []model.Trip

	start := date
	end := date.Add(24 * time.Hour)

	err := database.DB.Preload("Bus").Preload("Route").
		Joins("JOIN routes on routes.id = trips.route_id").
		Where("routes.source ILIKE ? AND routes.destination ILIKE ? AND trips.travel_date >= ? AND trips.travel_date < ?", source, destination, start, end).
		Find(&trips).Error

	return trips, err
}

func (r *TripRepository) GetTripById(tripID uint) (model.Trip, error) {
	var trip model.Trip

	err := database.DB.Preload("Bus").Preload("Route").
		Joins("JOIN routes on routes.id = trips.route_id").
		Where("trips.id = ?", tripID).
		First(&trip).Error

	return trip, err

}
