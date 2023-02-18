package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	FindArtsByUserId(ID int) ([]models.Art, error)
	FindPostByUserId(ID int) ([]models.PostResponse, error)
	GetUser(ID int) (models.User, error)
	GetUserDetailById(ID int) (models.UserResponse, error)
	UpdateProfile(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}

func (r *repository) FindArtsByUserId(ID int) ([]models.Art, error) {
	var art []models.Art
	err := r.db.Where("created_by=?", ID).Find(&art).Error

	return art, err
}

func (r *repository) FindPostByUserId(ID int) ([]models.PostResponse, error) {
	var post []models.PostResponse
	err := r.db.Where("created_by=?", ID).Preload(clause.Associations).Find(&post).Error

	return post, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}

func (r *repository) GetUserDetailById(ID int) (models.UserResponse, error) {
	var user models.UserResponse
	err := r.db.First(&user, ID).Error
	return user, err
}

func (r *repository) UpdateProfile(user models.User) (models.User, error) {
	err := r.db.Model(&user).Updates(user).Error
	return user, err
}


