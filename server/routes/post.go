package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/mysql"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func PostRoutes(e *echo.Group) {
	postRepository := repositories.RepositoryPost(mysql.DB)
	h := handlers.HandlerPost(postRepository)

	e.GET("/posts", middleware.Auth(h.FindPosts))
	e.GET("/post/:id", middleware.Auth(h.GetPost))
	e.POST("/post", middleware.Auth(middleware.UploadMultipleFile(h.CreatePost)))
	e.GET("/postCreator/:created_by", middleware.Auth(h.FindPostByCreator))
}