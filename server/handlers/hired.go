package handlers

import (
	"waysgallery/repositories"

	// "github.com/labstack/echo/v4"
)

type handlerHired struct {
	HiredRepository repositories.HiredRepository
}

func HandlerHired(HiredRepository repositories.HiredRepository) *handlerHired {
	return &handlerHired{HiredRepository}
}

// func (h *handlerHired) CreateHired(c echo.Context) error {

// }