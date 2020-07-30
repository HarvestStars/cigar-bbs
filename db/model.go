package db

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName string `gorm:"PRIMARY_KEY"`
	PassWord string
	Salt     string
}

type Goods struct {
	gorm.Model
	UserID string
	User   User
	Price  float32
	Brief  string `grom:"type:text"`
	Imgs   string `grom:"type:text"` //json格式的list
}

type Post struct {
	gorm.Model
	UserID string
	User   User
	Ctx    string `grom:"type:text"`
	Imgs   string `grom:"type:text"` //json格式的list
}
