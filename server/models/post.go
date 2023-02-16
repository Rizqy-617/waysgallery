package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Title       string      `json:"title" gorm:"type: varchar(255)"`
	Description string      `json:"description" gorm:"type: varchar(255)"`
	CreatedBy   int         `json:"-" gorm:"type: int"`
	User        User        `json:"user" gorm:"foreignKey:CreatedBy;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	PostImage   []PostImage `json:"post_image" gorm:"foreignKey:PostID"`
}

type PostResponse struct {
	gorm.Model
	Title       string      `json:"title" gorm:"type: varchar(255)"`
	Description string      `json:"description" gorm:"type: varchar(255)"`
	CreatedBy   int         `json:"-" gorm:"type: int"`
	User        User        `json:"user" gorm:"foreignKey:CreatedBy;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	PostImage   []PostImage `json:"post_image" gorm:"foreignKey:PostID"`
}

func (PostResponse) Tablename() string {
	return "post"
}
