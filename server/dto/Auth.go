package dto

type RegisterRequest struct {
	UserName string `json:"user_name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type UserResponse struct {
	ID       uint   `json:"id"`
	UserName string `json:"user_name"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}

type AuthResponse struct {
	Token string       `json:"token"`
	User  UserResponse `json:"user"`
}
