package db

import "gorm.io/gorm"

type Session struct {
	gorm.Model
	User     User `gorm:"association_foreignkey:Name"`
	UserName string
	UUID     string
}

func (s *Session) Create() {
	DataBase.Model(s).Create(s)
}

func (s *Session) Delete() {
	DataBase.Model(&Session{}).Unscoped().Where("uuid = ?", s.UUID).Delete(s)
}

func (s *Session) IsLogIn() bool {
	var count int
	DataBase.Model(&Session{}).Where("uuid = ?", s.UUID).Count(&count)
	if count > 0 {
		return true
	}
	return false
}

func (s *Session) IsAdminSession() bool {
	DataBase.Model(&Session{}).Where("uuid = ?", s.UUID).First(s)
	var user User
	user.Name = s.UserName
	isAdmin := user.IsAdmin()
	if isAdmin {
		return true
	}
	return false
}
