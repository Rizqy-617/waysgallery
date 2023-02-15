package authdto

type RegisterResponse struct {
	Email   string `json:"email"`
	Message string `json:"message"`
}

type LoginResponse struct {
	Email   string `json:"email"`
	Token   string `json:"token"`
	Message string `json:"message"`
}
