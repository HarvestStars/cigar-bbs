var username=null;
var password=null;

$(document).ready(function () {
    var qs = Qs
    axios.defaults.headers.post['Content-Type'] = 
    'application/x-www-form-urlencoded;charset=UTF-8';  
    axios.defaults.withCredentials = true;

    // POST传参序列化 
    axios.interceptors.request.use((config) => {
        if(config.method === 'post') {
            config.data = qs.stringify(config.data);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    $(window).bind('beforeunload',function(){
        // var logout=new XMLHttpRequest();
        // logout.open("GET","http://localhost:8080/logout",true);
        // logout.send();
    });

    validateLogin();

    //isNewReply();

    //轮播设置
    $('.carousel').carousel({
        interval: 2000
    });
    //点击弹窗事件
    $("#registGo").click(function () {
        $("#registLabel").text("用户注册");
        $('#registModal').modal();
    });
    $("#loginGo").click(function () {
        $("#loginLabel").text("用户登录");
        $('#loginModal').modal();
    });
    $("#writeGo").click(function () {
        if (username==null){
            alert("请先登录用户！");
        }else {
            location.assign("/writeBlog.html?username="+username);
        }
    });
    $("#commentGo").click(function () {
       location.assign("/myComment.html");
    });

    //监听用户登录提交 
    $("#loginButton").click(function (){
        var name = document.getElementById("inputTel").value;
        var password = document.getElementById("inputPassword").value;
        axios.post('http://localhost:8080/login', {
            UserName:name,
            PassWord:password
        }).then((response) => {
            if (response.data.code == 200){
                location.assign("./index.html?username="+document.getElementById("inputTel").value);
            }else{
                bootbox.alert("账户未注册或密码错误！");
            }
          })
          .catch(function (error) {
            console.log(error)
          });
    })

    //用户注册信息提交
    $("#signUpButton").click(function (){
        var name = document.getElementById("inputTelRegist").value;
        var password = document.getElementById("inputPasswordRegist").value;
        axios.post('http://localhost:8080/signup', {
            UserName:name,
            PassWord:password
        }).then((response) => {
            if (response.data.code == 200){
                bootbox.alert("注册成功", function() {});
            }else{
                bootbox.alert("该用户已注册",function () {});
            }
          })
          .catch(function (error) {
            console.log(error)
          });
    })

        //用户注册信息提交
        $("#logout").click(function (){
            var logout=new XMLHttpRequest();
            logout.open("GET","http://localhost:8080/logout",true);
            logout.send();
            document.cookie = "_username=; _sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        })

    reqInfo();
});

//这个功能还没想好
function isNewReply() {
    var req=new XMLHttpRequest();
    req.open("GET","http://localhost:8080/isNewReply?username="+username,true);
    req.send();
    req.onreadystatechange=function () {
        if(req.readyState==4&&req.status==200){
            if (req.responseText=="1"){
                document.getElementById("message").style.display="inline-block";
            }
        }
    }

}

//检查用户是否登录
function validateLogin() {
    username=getCookie("_username");
    sessionID=getCookie("_sessionID");
    if(sessionID==null||sessionID==undefined||sessionID==""){}else{
        var xmlHttpIsLogin=new XMLHttpRequest();
        xmlHttpIsLogin.open("GET","http://localhost:8080/islogin?session="+sessionID,false);
        xmlHttpIsLogin.send();
        if (xmlHttpIsLogin.readyState==4 && xmlHttpIsLogin.status==200){
            document.getElementById("registGo").style.display="none";
            document.getElementById("loginGo").style.display="none";
            $("#welcome").text(" ："+username);
            document.getElementById("welcome").style.display="block";
            $("#commentGo").removeClass("commentGo");
        }
    }
    // }else {
    //     console.log("进入请求");
    //     var xmlHttpIsLogin=new XMLHttpRequest();
    //     xmlHttpIsLogin.open("GET","http://localhost:8080/userlogin?username="+username+"&"+"password="+password,false);
    //     xmlHttpIsLogin.send();
    //     if (xmlHttpIsLogin.readyState==4 && xmlHttpIsLogin.status==200){
    //         if(xmlHttpIsLogin.responseText=="1"){
    //             document.getElementById("registGo").style.display="none";
    //             document.getElementById("loginGo").style.display="none";
    //             $("#welcome").text(" ："+username);
    //             document.getElementById("welcome").style.display="block";
    //         }
    //     }
    // }
}

//获取地址栏参数
function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


page=null;
maxPage=null;

function reqInfo() {

  //分页实现
  var xmlHttpForMaxPage=new XMLHttpRequest();
  xmlHttpForMaxPage.open("GET","http://localhost:8080/maxPage",false);
  xmlHttpForMaxPage.send();
  if (xmlHttpForMaxPage.readyState==4 && xmlHttpForMaxPage.status==200){
      maxPage=Math.ceil(parseInt(xmlHttpForMaxPage.responseText)/15);
      console.log(maxPage);
  }

  page=getCookie("page");

  console.log("page: "+page);

  if (page==null||page==undefined||page==""){
      page=1;
  }

  console.log("page: "+page);

  for(var i=(page-1)*15+1;i<=15*page;i++){
      var xmlHttp=new XMLHttpRequest();
      xmlHttp.open("GET","http://localhost:8080/main?id="+i,false);
      xmlHttp.send();
      console.log(xmlHttp.responseText);
      if (xmlHttp.readyState==4 && xmlHttp.status==200){


          var post=JSON.parse(xmlHttp.responseText);

//                      document.getElementById("title_"+(i%15==0?15:i%15)).innerHTML=post[0]["title"];
//                      document.getElementById("author_"+(i%15==0?15:i%15)).innerHTML=post[0]["author"];
//                      document.getElementById("date_"+(i%15==0?15:i%15)).innerHTML=(parseInt(post[0]["createDate"]["year"])%100+2000)+"-"+(parseInt(post[0]["createDate"]["month"])+1)+"-"+post[0]["createDate"]["date"];
//                      document.getElementById("scan_"+(i%15==0?15:i%15)).innerHTML=post[0]["scan"];
//                      document.getElementById("save_"+(i%15==0?15:i%15)).innerHTML=post[0]["favor"];
          if(username==null||username==undefined||username==""){
              $("#mybody").append("<tr><td class='titleTd'><a id='title_"+(i+1)+"' href='"+"/blogShow.html?id="+i+"'>"+post[0]["title"]+"</a></td>"
                  +
                  "<td class='authorTd'><a id='author_"+i+"' href='"+"/blogShow.html?id="+i+"'>"+post[0]["author"]+"</a></td>"
                  +
                  "<td class='dateTd'><a id='date_"+i+"' href='"+"/blogShow.html?id="+i+"'>"+(parseInt(post[0]["createDate"]["year"]) % 100 + 2000) + "-" + (parseInt(post[0]["createDate"]["month"]) + 1) + "-" + post[0]["createDate"]["date"]+"</a></td>"
                  +
                  "<td class='scanTd'><a id='scan_"+i+"' href='"+"/blogShow.html?id="+i+"'>"+post[0]["scan"]+"</a></td>"
                  +
                  "<td class='saveTd'><a id='save_"+i+"' href='"+"/blogShow.html?id="+i+"'>"+post[0]["favor"]+"</a></td></tr>" );
          }else {
              $("#mybody").append("<tr><td class='titleTd'><a id='title_"+(i+1)+"' href='"+"/blogShow.html?id="+i+"&username="+username+"&password="+password+"'>"+post[0]["title"]+"</a></td>"
                  +
                  "<td class='authorTd'><a id='author_"+i+"' href='"+"/blogShow.html?id="+i+"&username="+username+"&password="+password+"'>"+post[0]["author"]+"</a></td>"
                  +
                  "<td class='dateTd'><a id='date_"+i+"' href='"+"/blogShow.html?id="+i+"&username="+username+"&password="+password+"'>"+(parseInt(post[0]["createDate"]["year"]) % 100 + 2000) + "-" + (parseInt(post[0]["createDate"]["month"]) + 1) + "-" + post[0]["createDate"]["date"]+"</a></td>"
                  +
                  "<td class='scanTd'><a id='scan_"+i+"' href='"+"/blogShow.html?id="+i+"&username="+username+"&password="+password+"'>"+post[0]["scan"]+"</a></td>"
                  +
                  "<td class='saveTd'><a id='save_"+i+"' href='"+"/blogShow.html?id="+i+"&username="+username+"&password="+password+"'>"+post[0]["favor"]+"</a></td></tr>" );
          }

      }else{
          break;
      }
  }
}

//点击下一页，向cookie中添加页面信息
function addCookieAndGoToNext() {
  if(page==maxPage){
      alert("当前是最后一页");
  }else {
      page++;
      document.cookie="page="+page;
  }
}

//点击上一页，向cookie中添加页面信息
function goPrePage() {
    if(page==1){
        alert("当前是第一页");
    }else {
        page--;
        document.cookie="page="+page;
    }
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie
function clearCookie(name) {
    setCookie(name, "", -1);
}