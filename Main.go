package main

import (
	"GoBus/config"
	"GoBus/database"
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

	r := gin.Default()

	r.Run()

}
