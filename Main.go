package main

import (
	"GoBus/config"
	"GoBus/database"
	"GoBus/router"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load .env file")
	}

	cfg := config.LoadConfig()
	database.Connect(cfg)
	database.Migrate()
	database.Seed()

	r := gin.Default()

	router.TripRoute(r)

	r.Run()
}
