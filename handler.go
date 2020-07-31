package main

import (
	"net/http"

	"github.com/HarvestStars/cigar-bbs/db"
	"github.com/HarvestStars/cigar-bbs/protocol"
	"github.com/HarvestStars/cigar-bbs/util/common"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func Index(c *gin.Context) {}

func SignUp(c *gin.Context) {
	var req protocol.UserReq
	c.BindJSON(&req)
	// 判断是否已经存在
	var user db.User
	isExisted := user.Exist(req.UserName)
	if !isExisted {
		// 账户不存在，则注册
		user.Name = req.UserName
		user.Salt = common.GetRandomBoth(4)
		user.PassWord = common.Sha1En(req.PassWord + user.Salt)
		user.Create()
		c.JSON(http.StatusOK, gin.H{"code": 200, "data": "账户创建成功", "error": ""})
	} else {
		c.JSON(http.StatusOK, gin.H{"code": 400, "data": "账户已存在，请登录", "error": ""})
	}
}

func LogIn(c *gin.Context) {
	var req protocol.UserReq
	c.BindJSON(&req)
	// 判断是否已经存在
	var user db.User
	isExisted := user.Exist(req.UserName)
	if isExisted {
		// 登录
		user.ReadByName(req.UserName)
		isOk := user.PassWordCmp(req.PassWord)
		if !isOk {
			c.JSON(http.StatusBadRequest, gin.H{"code": 400, "data": "用户名密码错误", "error": ""})
			return
		}

		// add session
		var s db.Session
		s.UUID = uuid.New().String()
		s.User = user
		s.Create()
		c.SetCookie("_sessionID", s.UUID, 3600, "/", "localhost", false, true)
		c.JSON(http.StatusBadRequest, gin.H{"code": 200, "data": "登录成功", "error": ""})
	} else {
		c.JSON(http.StatusOK, gin.H{"code": 400, "data": "账户不存在，请注册", "error": ""})
	}
}

func Admin(c *gin.Context) {
	sUUID, err := c.Cookie("_sessionID")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 400, "data": "权限不正确, 检查cookie", "error": ""})
	}
	var s db.Session
	s.UUID = sUUID

}

func LogOut(c *gin.Context) {
	sUUID, err := c.Cookie("_sessionID")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 400, "data": "无效请求, 检查cookie", "error": ""})
	}
	var s db.Session
	s.UUID = sUUID
	s.Delete()
	c.JSON(http.StatusOK, gin.H{"code": 200, "data": "注销成功", "error": ""})
}

func createPost(c *gin.Context) {
	sUUID, err := c.Cookie("_sessionID")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 400, "data": "无效请求", "error": ""})
	}
	var s db.Session
	s.UUID = sUUID
	s.IsLogIn()
	db.DataBase.Model(&db.Session{}).Where("uuid = ?", sUUID).First(&s)
	c.JSON(http.StatusOK, gin.H{"code": 200, "data": s.UserName, "error": ""})
}

func readPost(c *gin.Context) {}

func updatePost(c *gin.Context) {}

func deletePost(c *gin.Context) {}

func search(c *gin.Context) {}
