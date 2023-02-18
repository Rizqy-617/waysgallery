package hireddto

type CreateHiredRequest struct {
	Title        string `json:"title" gorm:"type: varchar(255)" validate:"required"`
	Description  string `json:"description" gorm:"type: varchar(255)" validate:"required"`
	StartProject string `json:"startProject" gorm:"type: varchar(255)" validate:"required"`
	EndProject   string `json:"endProject" gorm:"type: varchar(255)" validate:"required"`
	Price        int    `json:"price" gorm:"type: int" validate:"required"`
	OrderTo      int    `json:"orderTo" gorm:"type: int" validate:"required"`
}

type UpdateHireRequest struct {
	Status string `json:"status" gorm:"type: varchar(255)" validate:"required"`
}
