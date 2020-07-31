package db

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string `gorm:"PRIMARY_KEY"`
	PassWord string
	Salt     string
}

type Goods struct {
	gorm.Model
	UserName string
	User     User `gorm:"association_foreignkey:Name"`
	Price    float32
	Brief    string `grom:"type:text"`
	Imgs     string `grom:"type:text"` //json格式的list
}

type Post struct {
	gorm.Model
	UserName string
	User     User   `gorm:"association_foreignkey:Name"`
	Ctx      string `grom:"type:text"`
	Imgs     string `grom:"type:text"` //json格式的list
}

type Session struct {
	gorm.Model
	User     User `gorm:"association_foreignkey:Name"`
	UserName string
	UUID     string
}
