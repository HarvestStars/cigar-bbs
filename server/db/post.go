package db

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	UserName string
	User     User   `gorm:"association_foreignkey:Name"`
	Ctx      string `grom:"type:text"`
	Imgs     string `grom:"type:text"` //json格式的list
}
