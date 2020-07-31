package db

import (
	"github.com/HarvestStars/YuePaoTalent/db"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `gorm:"PRIMARY_KEY"`
	PassWord string
	Salt     string
}

func (u *User) Create() {
	db.DataBase.Model(u).Create(u)
}

func (u *User) Exist(name string) bool {
	var count int
	DataBase.Model(&u).Where("name = ?", name).Count(&count)
	if count == 0 {
		// 账户不存在
		return false
	}
	return true
}

func (u *User) ReadByName(name string) {
	DataBase.Model(u).Where("name = ?", name).Find(u)
}
