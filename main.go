package main

import (
	"github.com/HarvestStars/cigar-bbs/db"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Setup("root", "123", "127.0.0.1:3306", "bbs")
	r := gin.Default()
	r.GET("/", Index)

	// auth 登录
	r.POST("/signup", SignUp)
	r.POST("/login", LogIn)
	r.POST("/admin", Admin)
	r.GET("/logout", LogOut)

	// post 发帖
	r.POST("/posts/read", readPost)
	r.POST("/posts/create", createPost)
	r.POST("/posts/update", updatePost)
	r.POST("/posts/delete", deletePost)

	// search 论坛内搜索
	r.POST("/search", search)
	r.Run(":8080")
}
