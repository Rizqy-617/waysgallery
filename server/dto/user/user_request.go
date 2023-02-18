package userdto

type UpdateUserRequest struct {
	Avatar   string `json:"avatar"`
	Fullname string `json:"fullname"`
	Greeting string `json:"greeting"`
}
