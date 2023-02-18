package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/postgres"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func ArtRoutes(e *echo.Group) {
	artRepository := repositories.RepositoryArt(postgres.DB)
	h := handlers.HandlerArt(artRepository)

	e.GET("/art", middleware.Auth(h.GetArtByUserLogin))
	e.GET("/art/:id", middleware.Auth(h.GetArtByUserId))
	e.POST("/create-art", middleware.Auth(middleware.UploadFile(h.CreateArt)))
}