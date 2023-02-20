package userdto

type UpdateUserRequest struct {
	Avatar   string `json:"image"`
	Art      string `json:"art"`
	Fullname string `json:"fullname"`
	Greeting string `json:"greeting"`
}
