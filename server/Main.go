package main

import (
	"GoBus/server/config"
	"GoBus/server/database"
	"GoBus/server/router"
	"log"
	"time"

	"github.com/gin-contrib/cors"
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

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.TripRoute(r)
	router.SeatRoute(r)
	router.BookingRouter(r)

	r.Run()
}
