package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJwtToken(userID uint, role string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(30 * time.Minute).Unix(),
	}

	SECRET := []byte(os.Getenv("SECRET"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(SECRET)
}
