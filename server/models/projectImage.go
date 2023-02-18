package models

type ProjectImage struct {
	ID        string `json:"id"`
	ProjectID int    `json:"project_id"`
	Image     string `json:"image" gorm:"type: varchar(255)"`
}
