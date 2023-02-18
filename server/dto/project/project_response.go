package projectdto

import "waysgallery/models"

type DataResponse struct {
	Description string             `json:"description"`
	PostImage   []models.PostImage `json:"post_image"`
	Hired       models.Hired       `json:"hired"`
}

type ProjectResponse struct {
	Project interface{} `json:"project"`
}
