package models

type Post struct {
	ID int `json:"id" gorm:"primary_key:auto_increment"`
	
}