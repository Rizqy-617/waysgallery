package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type PostRepository interface {
	FindPosts() ([]models.Post, error)
	// FindPostByCreator(ID int) ([]models.Post, error)
	GetPost(ID int) (models.Post, error)
	CreatePost(post models.Post) (models.Post, error)
}

func RepositoryPost(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindPosts() ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Preload("PostImage").Preload("User").Find(&posts).Error

	return posts, err
}

func (r *repository) GetPost(ID int) (models.Post, error) {
	var post models.Post
	err := r.db.Preload("PostImage").Preload("User").First(&post, ID).Error

	return post, err
}

func (r *repository) CreatePost(post models.Post) (models.Post, error ) {
	err := r.db.Create(&post).Error

	return post, err
}
