


if(localStorage.getItem('userId')){
	
}



$('#login').on('tap',function(){
	login('weixin');
});






	var auths = {};
	var obj = {};
	var weixin_data = {};
	function plusReady(){
		plus.oauth.getServices(function(services){
			for(var i in services){
				var service = services[i];
				auths[service.id] = service;
			}
		});
		
//		console.log("auths:"+JSON.stringify(auths));
	}
	if(window.plus){
		plusReady();
	}else{
		document.addEventListener("plusready",plusReady,false);
	}
	//登陆认证
	function login(id){
		console.log("-----登录认证------");
		console.log("auths:"+JSON.stringify(auths));
		var auth = auths[id];
		//类型标记
		if(id == "qq"){
			obj['type'] = 2;
		}else if(id == "weixin"){
			obj['type'] = 1;
		}else{
			obj['type'] = 3;
		}
		if(auth){
			var w = null;
			if(plus.os.name == "Android"){
				var w = plus.nativeUI.showWaiting();
			}
			document.addEventListener('pause',function(){
				setTimeout(function(){
					w&&w.close();w = null;
				},2000);
			},false);
			auth.login(function(){
				w&&w.close();w = null;
				console.log("登录认证成功:");
				console.log(JSON.stringify(auth.authResult));//获取位置  登陆认证
				//获取用户openid
				if(id == "weixin"){
					obj['login_name'] =  auth.authResult.unionid;
					weixin_data.open_id = auth.authResult.openid;
					weixin_data.token = auth.authResult.refresh_token;
				}else if(id == "qq"){
					obj['login_name'] =  auth.authResult.openid ;//微信为unionid，QQ为openid,微博为uid
				}else{
					obj['login_name'] = auth.authResult.uid;
				}
//				console.log(JSON.stringify(auth))
				userinfo(auth);
			},function(e){
				w&&w.close();w = null;
				console.log("登录认证失败:");
				console.log(e);
				console.log("["+e.code+"]"+e.message);
				console.log("登录失败");
			});
		}else{
			console.log("无效的登录认证通道!");
//        plus.nativeUI.alert("无效的登录登录认证通道!",null,"登录");
		}
	}
	//获取用户信息
	function userinfo(a){
		console.log("------获取用户信息------");
		a.getUserInfo(function(){
			console.log("获取用户信息成功:");
			//获取用户名 性别
			var nickname = a.userInfo.nickname||a.userInfo.name;
			var sex = a.userInfo.gender || a.userInfo.sex;
//			var img = a.userInfo.figureurl_qq_2 || a.userInfo.profile_image_url || a.userInfo.headimgurl.substring(0,a.userInfo.headimgurl.length-1)+96;
			var img = a.userInfo.figureurl_qq_2 || a.userInfo.profile_image_url || a.userInfo.headimgurl;
			localStorage.setItem('type',JSON.stringify(obj.type));/*本地存储状态和login_name*/
			localStorage.setItem('login_name',JSON.stringify(obj.login_name));
//			alert("欢迎“"+nickname+"”登录!");
			//截取较长的用户名
			var re = /[\u4e00-\u9fa5]/;
			if(re.test(nickname)){
				obj['username'] = nickname.substring(0,10);
			}else{
				obj['username'] = nickname.substring(0,20);
			}
			//性别判断
			obj['gender'] = sex;
			obj['img'] = img;
			if( sex == 1 || sex == '男' || sex == 'm' ) {
				obj['gender'] =  "男";
			}else{
				obj['gender'] =  "女";
			}
//			console.log(JSON.stringify(obj));  //获取用户信息
			weixin_data.gender = obj['gender'];
			weixin_data.type = "weixin";
			weixin_data.nickname = nickname;
			weixin_data.headimgurl = img;
			console.log('=='+JSON.stringify(weixin_data));
			//传递用户信息 
//			console.log(xinwen.url+'/userLogin');
//			alert(JSON.stringify(data));
//			console.log();
			$.ajax({ 
				type:"post",
				dataType:"json",
				url:xinwen.url+'/userLogin',
				data:weixin_data,
				timeout:5000,
				success:function (res) {
					localStorage.setItem('userId',res.data);//储存 user_id
//					updateUserInfo(res.data);  //更新用户信息
					
					if(res.code == 1){
//						console.log(res.data);
//						alert();
//						var arr = [plus.runtime.appid];
//						ca.sendNotice(arr,'login_ok',{});
//						shuaxin(); //刷新
						mui.back();
					}else{
						alert(res.msg); 
					}
					console.log("登录成功");
				},
				error:function(e){
					console.log(JSON.stringify(e))
					console.log("登录失败，请重新登录!");
				}
			});
		},function(e){
			console.log("获取用户信息失败:");
			console.log("["+e.code+"]"+e.message);
			mui.toast("["+e.code+"]"+e.message);
			plus.nativeUI.alert("["+e.code+"]"+e.message);
		});
	}