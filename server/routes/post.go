package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/postgres"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func PostRoutes(e *echo.Group) {
	postRepository := repositories.RepositoryPost(postgres.DB)
	h := handlers.HandlerPost(postRepository)

	e.GET("/posts", h.FindPosts)
	e.GET("/post/:id", h.GetPost)
	e.POST("/post", middleware.Auth(middleware.UploadMultipleFile(h.CreatePost)))
}