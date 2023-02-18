package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type ArtRepository interface {
	GetArtByUserLogin(ID int) ([]models.Art, error)
	GetArtByUserId(ID int) ([]models.Art, error)
	CreateArt(art models.Art) (models.Art, error)
}

func RepositoryArt(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetArtByUserLogin(ID int) ([]models.Art, error) {
	var art []models.Art
	err := r.db.Where("created_by=?", ID).Find(&art).Error

	return art, err
}

func (r *repository) GetArtByUserId(ID int) ([]models.Art, error) {
	var art []models.Art
	err := r.db.Where("created_by=?", ID).Find(&art).Error

	return art, err
}

func (r *repository) CreateArt(art models.Art) (models.Art, error) {
	err := r.db.Create(&art).Error

	return art, err
}