package models

type User struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Greeting string `json:"greeting" gorm:"type: varchar(255)"`
	Avatar   string `json:"avatar" gorm:"type: varchar(255)"`
}

type UserResponse struct {
	ID int `json:"id"`
	Fullname string `json:"fullname"`
	Email string `json:"email"`
}

func (UserResponse) Tablename() string {
	return "users"
}
