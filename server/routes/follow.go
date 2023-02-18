package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/mysql"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func FollowRoutes(e *echo.Group) {
	followRepository := repositories.RepositoryFollow(mysql.DB)
	h := handlers.HandlerFollow(followRepository)

	e.POST("/follow", middleware.Auth(h.Follow))
	e.DELETE("/unfollow", middleware.Auth(h.UnFollow))
}