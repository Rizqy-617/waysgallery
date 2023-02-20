package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type HiredRepository interface {
	CreateHired(hired models.Hired) (models.Hired, error)
	GetHired(ID int) (models.Hired, error)
	UpdateHired(status string, orderBy int) (models.Hired, error)
	FindOffer(ID int) ([]models.Hired, error)
	FindOrder(ID int) ([]models.Hired, error)
}

func RepositoryHired(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateHired(hired models.Hired) (models.Hired, error) {
	err := r.db.Create(&hired).Error

	return hired, err
}

func (r *repository) UpdateHired(status string, orderBy int) (models.Hired, error) {
  var hired models.Hired
  r.db.Preload("UserOrderBy").Preload("UserOrderTo").First(&hired, orderBy)

  if status != hired.Status && status == "success" {
    var hired models.Hired
    r.db.First(&hired, hired.ID)
    r.db.Save(&hired)
  }

  hired.Status = status
  err := r.db.Save(&hired).Error
  return hired, err
}

func (r *repository) GetHired(ID int) (models.Hired, error) {
	var hired models.Hired
	err := r.db.Preload("UserOrderBy").Preload("UserOrderTo").First(&hired, ID).Error

	return hired, err
}

func (r *repository) FindOffer(ID int) ([]models.Hired, error) {
	var hireds []models.Hired
	err := r.db.Preload("UserOrderBy").Preload("UserOrderTo").Where("order_by=?", ID).Find(&hireds).Error

	return hireds, err
}

func (r *repository) FindOrder(ID int) ([]models.Hired, error) {
	var hireds []models.Hired
	err := r.db.Preload("UserOrderBy").Preload("UserOrderTo").Where("order_to=?", ID).Find(&hireds).Error

	return hireds, err
}