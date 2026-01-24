package database

import (
	"fmt"
	"log"

	"GoBus/server/config"
	"GoBus/server/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect(cfg *config.Config) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info)})
	if err != nil {
		log.Fatal("Failed to connect database", err)
	}

	log.Println("Database Connected")
	DB = db
}

func Migrate() {
	DB.AutoMigrate(
		&model.Bus{},
		&model.Seat{},
		&model.Route{},
		&model.Trip{},
	)
}
