package db

import (
	"github.com/HarvestStars/cigar-bbs/server/util/common"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `gorm:"PRIMARY_KEY"`
	PassWord string
	Salt     string
	Admin    int // 1 means on admin
	Level    int // 0~9
}

func (u *User) Create() {
	DataBase.Model(&User{}).Create(u)
}

func (u *User) Exist(name string) bool {
	var count int
	DataBase.Model(u).Where("name = ?", name).Count(&count)
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

func (u *User) IsAdmin() bool {
	DataBase.Model(u).Where("name = ?", u.Name).Find(u)
	if u.Admin == 1 {
		return true
	}
	return false
}
