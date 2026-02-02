package router

import (
	"GoBus/server/service"

	"github.com/gin-gonic/gin"
)

func AuthRouter(r *gin.Engine) {
	authService := service.NewAuthService()

	auth := r.Group("/auth")
	auth.POST("/signup", authService.Register)
	auth.POST("/login", authService.Login)
	auth.POST("/logout", authService.Logout)
}
