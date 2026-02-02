package middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenstr, err := c.Cookie("token")

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		jwtSecret := []byte(os.Getenv("SECRET"))

		token, err := jwt.Parse(tokenstr, func(t *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Set("user_id", uint(claims["user_id"].(float64)))
		c.Set("role", claims["role"].(string))

		c.Next()

	}
}
