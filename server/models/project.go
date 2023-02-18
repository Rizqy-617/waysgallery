package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	HiredId      int            `json:"-"`
	Hired        Hired          `json:"hired" gorm:"foreignKey:HiredId"`
	Description  string         `json:"description" gorm:"type: text"`
	ProjectImage []ProjectImage `json:"image" gorm:"foreignKey:ProjectID"`
}
