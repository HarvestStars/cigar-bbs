package protocol

// UserReq 登录/注册 请求
type UserReq struct {
	UserName string `form:"UserName" json:"UserName"`
	PassWord string `form:"PassWord" json:"PassWord"`
}
