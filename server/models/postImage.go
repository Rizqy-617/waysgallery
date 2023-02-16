package models

type PostImage struct {
	ID     int    `json:"id"`
	PostID int    `json:"-"`
	Image  string `json:"image" gorm:"type: varchar(255)"`
}
