package service

import (
	"GoBus/server/dto"
	"GoBus/server/model"
	"GoBus/server/repository"
	"GoBus/server/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	authRespository *repository.AuthRespository
}

func NewAuthService() *AuthService {
	return &AuthService{
		authRespository: &repository.AuthRespository{},
	}
}

func (s *AuthService) Register(c *gin.Context) {
	var registerDto dto.RegisterRequest
	if err := c.ShouldBindJSON(&registerDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(registerDto.Password), 10)

	user := model.User{
		UserName: registerDto.UserName,
		Email:    registerDto.Email,
		Password: string(hashed),
	}

	if err := s.authRespository.CreateUser(&user); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Registered Successfully"})
}

func (s *AuthService) Login(c *gin.Context) {
	var loginDto dto.LoginRequest
	if err := c.ShouldBindJSON(&loginDto); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := s.authRespository.FindByEmail(loginDto.Email)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDto.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := utils.GenerateJwtToken(user.ID, user.Role)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while generating token"})
		return
	}

	c.JSON(http.StatusOK, dto.AuthResponse{
		Token: token,
		User: dto.UserResponse{
			ID:       user.ID,
			UserName: user.UserName,
			Email:    user.Email,
			Role:     user.Role,
		},
	})
}
