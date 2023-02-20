package authdto

type RegisterRequest struct {
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: varchar(255)" validate:"required"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)" validate:"required"`
	Greeting string `json:"greeting" gorm:"type: varchar(255)" validate:"required"`
	Avatar   string `json:"image" gorm:"type: varchar(255)"`
	Art      string `json:"art" gorm:"type: varchar(255)"`
}

type LoginRequest struct {
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: varchar(255)" validate:"required"`
}
