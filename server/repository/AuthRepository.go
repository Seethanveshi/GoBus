package repository

import (
	"GoBus/server/database"
	"GoBus/server/model"
)

type AuthRespository struct{}

func (r *AuthRespository) FindByEmail(email string) (*model.User, error) {
	var User model.User
	err := database.DB.Where("email = ?", email).First(&User).Error
	return &User, err
}

func (r *AuthRespository) CreateUser(user *model.User) error {
	err := database.DB.Create(&user).Error
	return err
}
