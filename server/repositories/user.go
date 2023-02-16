package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	// ChangePassword(user models.User) (models.User, error)
	// ChangeImage(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}

