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
