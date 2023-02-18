package database

import (
	"fmt"
	"waysgallery/models"
	mysql "waysgallery/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Post{},
		&models.PostImage{},
		&models.Project{},
		&models.ProjectImage{},
		&models.Follow{},
		&models.Hired{},
		&models.Art{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}