package mysql

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseInit() {

	// database config from .env
	var DB_HOST = os.Getenv("MYSQL_HOST")
	var DB_USER = os.Getenv("MYSQL_USER")
	var DB_PASSWORD = os.Getenv("MYSQL_PASSWORD")
	var DB_DATABASENAME = os.Getenv("MYSQL_NAME")
	var DB_PORT = os.Getenv("MYSQL_PORT")

	// connected to database
	var err error
	// dsn := "DB_USER:DB_PASSWORD@tcp(DB_HOST:DB_PORT)/DB_DATABASENAME?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASENAME)
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	fmt.Println(DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASENAME)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Connected to Database")
}