package models

type Follow struct {
	Follower      int  `json:"follower"`
	Following     int  `json:"following"`
	UserFollower  User `json:"-" gorm:"foreignKey:Follower"`
	UserFollowing User `json:"-" gorm:"foreignKey:Following"`
}
