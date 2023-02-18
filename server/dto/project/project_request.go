package projectdto

type CreateProjectRequest struct {
	Description string `json:"description" gorm:"type: varchar(255)" validate:"required"`
}
