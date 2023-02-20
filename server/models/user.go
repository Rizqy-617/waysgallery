package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Greeting string `json:"greeting" gorm:"type: varchar(255)"`
	Avatar   string `json:"image" gorm:"type: varchar(255)"`
	Art      string `json:"art" gorm:"type: varchar(255)"`
}

type UserResponse struct {
	gorm.Model
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Greeting string `json:"greeting"`
	Avatar   string `json:"image"`
	Art      string `json:"art"`
}

func (UserResponse) Tablename() string {
	return "users"
}
