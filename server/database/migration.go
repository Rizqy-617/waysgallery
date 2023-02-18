package database

import (
	"fmt"
	"waysgallery/models"
	"waysgallery/pkg/postgres"
)

func RunMigration() {
	err := postgres.DB.AutoMigrate(
		&models.User{},
		&models.Post{},
		&models.PostImage{},
		&models.Project{},
		&models.ProjectImage{},
		&models.Follow{},
		&models.Hired{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}