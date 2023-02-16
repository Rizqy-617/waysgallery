package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	authdto "waysgallery/dto/auth"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/pkg/bcrypt"
	jwtToken "waysgallery/pkg/jwt"
	"waysgallery/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error{
	dataFile := c.Get("dataFile").(string)

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "WaysGallery_Profile_picture"})

	if err != nil {
		fmt.Println(err.Error())
	}

	request := authdto.RegisterRequest{
		Email: c.FormValue("email"),
		Password: c.FormValue("password"),
		Fullname: c.FormValue("fullname"),
		Greeting: c.FormValue("greeting"),
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest,dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.User{
		Email: request.Email,
		Password: password,
		Fullname: request.Fullname,
		Greeting: request.Greeting,
		Avatar: resp.SecureURL,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError,dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	registerResponse := authdto.RegisterResponse{
		Email: data.Email,
		Message: "Register Successful",
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: registerResponse})
}

func (h *handlerAuth) Login(c echo.Context) error{
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.User{
		Email: request.Email,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := authdto.LoginResponse{
		Email: user.Email,
		Token: token,
		Message: "Succesfully Login",
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: loginResponse})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}