package handlers

import (
	"net/http"
	followdto "waysgallery/dto/follow"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerFollow struct {
	FollowRepository repositories.FollowRepository
}

func HandlerFollow(FollowRepository repositories.FollowRepository) *handlerFollow {
	return &handlerFollow{FollowRepository}
}

func (h *handlerFollow) Follow(c echo.Context) error {
	request := new(followdto.Follow)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	follow := models.Follow{
		Follower: int(userId),
		Following: request.Following,
	}

	data, err := h.FollowRepository.Follow(follow)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerFollow) UnFollow(c echo.Context) error {
	request := new(followdto.Follow)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)


	unFollow, err := h.FollowRepository.UnFollow(int(userId), request.Following)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: followdto.FollowResponse{Follow: unFollow}})
}