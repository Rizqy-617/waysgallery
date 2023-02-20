package main

import (
	"fmt"
	"log"
	"os"
	"waysgallery/database"
	"waysgallery/pkg/mysql"
	"waysgallery/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	e := echo.New()

	PORT := os.Getenv("PORT")
	VERSION := os.Getenv("API_VERSION")

	mysql.DatabaseInit()

	database.RunMigration()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods:  []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders:  []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	routes.RouteInit(e.Group("/api/v1"))

	e.Static("/uploads", "./uploads")


	fmt.Println("Server is running on http://" + ":" + PORT + "/api/" + VERSION)
	e.Logger.Fatal(e.Start(":" + PORT))
}