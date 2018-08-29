

//发送验证码
var phone1;
var rand;
var mark = 1;
$(".yanzheng_btn").on('tap',function(){
	if(mark==0){
		mui.toast("请一分钟之后再点击",{duration:'long', type:'div' });return;
	}
	var phone = $("#phone").val();
	if(phone == ""){
		mui.toast("手机号码不能为空！");return;
	}
	var reg =  /^1[3|4|5|7|8][0-9]{9}$/
	if(reg.test(phone) == false){
		mui.toast("请输入正确的手机号码！");return;
	}
	if(mark){
      	mark = 0;
      	var interval;
      	var num = 60;
      	var _this = this;
      	interval = setInterval(function(){
      		$(_this).val("重新发送("+num+")秒").addClass("grey")
	        num --;
	        $(_this).attr('value',"重新发送("+num+")秒");
	        if(num <= 0){
	          	mark = 1;    
	          	$(_this).val("重新获取验证码").removeClass("grey");
          		clearInterval(interval);
          	}
        },1000);
    }
	ca.get({
    	url:xinwen.url+'/api/register/send',
    	data:{phone:phone},
    	succFn:function(result){
    		console.log(result);
    		var res=JSON.parse(result);
    		if(res.code == 0){
    			rand = res.rand;
    			mui.toast('发送成功');
    			phone1 = phone;
    		}else{
    			mui.toast(res.msg);
    		}
    	}
   	})  
})

//注册
$('.submit').on('tap',function(){
	var phone = $("#phone").val();
	var yanzheng = $("#yanzheng").val()
	var password1 = $("#password1").val();
	var password2 = $("#password2").val();
	var obj = {};
	var reg =  /^1[3|4|5|7|8][0-9]{9}$/
//	var rand = localStorage.getItem("rand");
	if(phone == ""){
		mui.toast("手机号码不能为空！");return;
	}
	if(phone != phone1){
		mui.toast("验证码错误！");return;
	}
	if(yanzheng == ""){
		mui.toast("请填写验证码！");return;
	}
	if(password1 == ""||password2 == ""){
		mui.toast("密码不能为空！");return;
	}
	if(password1.length < 5){
		mui.toast("密码不得少于6位");return;
	}
	if(reg.test(phone) == false){
		mui.toast("请输入正确的手机号码！");return;
	}
	if(password1 != password2){
		mui.toast("两次输入的密码不相同！");return;
	}
	if(yanzheng != rand){
		console.log(yanzheng+'-'+rand)
		mui.toast("您输入的验证码不正确！");return;
	}
	obj['phone'] = phone;
    obj['password'] = password2;
	plus.nativeUI.showWaiting();  //显示等待框
    ca.get({
      url:xinwen.url+'/api/register/register',
      data:obj,
      succFn: function (result) {
      	console.log(result)
      	var data = JSON.parse(result);
        if(data.code == 1){
        	//关闭登录
        	var login = plus.webview.getWebviewById('login/login.html');  //获取这个页面
			if(login){//如果有的话关闭
				login.close(); //关闭这个页面		
			}
        	setTimeout(function(){
        		mui.toast('恭喜您，注册成功')
				localStorage.setItem("userId",data.data);
				var arr = [plus.runtime.appid];
				ca.sendNotice(arr,'login_ok',{});
				ca.closeCurrentInterface();   
        	},500)
        }else if(data.code == -1){
           mui.toast('此手机号已被注册');
        }else{
           mui.toast('注册失败');
        }
        plus.nativeUI.closeWaiting(); //关闭等待框
      }
    })
});

