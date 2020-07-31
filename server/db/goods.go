package db

import "gorm.io/gorm"

type Goods struct {
	gorm.Model
	UserName string
	User     User `gorm:"association_foreignkey:Name"`
	Price    float32
	Brief    string `grom:"type:text"`
	Imgs     string `grom:"type:text"` //json格式的list
}
