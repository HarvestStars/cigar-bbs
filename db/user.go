package db

import (
	"github.com/HarvestStars/cigar-bbs/util/common"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `gorm:"PRIMARY_KEY"`
	PassWord string
	Salt     string
}

func (u *User) Create() {
	DataBase.Model(u).Create(u)
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

func (u *User) PassWordCmp(pwd string) bool {
	if common.Sha1En(pwd+u.Salt) != u.PassWord {
		return false
	}
	return true
}
