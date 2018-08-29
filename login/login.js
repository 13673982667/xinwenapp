//注册
$('#zhuce').click(function(){
	ca.newInterface({
		url: '../register/register.html',
		id: '../register/register.html'
	});
});

//登录
$('.lg').click(function(){
	var phone = $("#phone").val();
	var password = $("#password").val();
	if(phone ==""){
		mui.toast('账号不能为空');
		return;
	}
	if(password ==""){
		mui.toast('密码不能为空');
		return;
	}
	if(password.length < 8) {
		mui.toast("密码不得少于8位哦");
		return;
	}
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	if(reg.test(phone) == false) {
		mui.toast("请输入正确的手机号码！");
		return;
	}
	var data = {
		password : password,
		phone : phone
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/api/register/login',
		dataType : 'json',
		data:data,
		success : function(e){
			console.log(JSON.stringify(e));
			if(e.code == 1){
				localStorage.setItem('userId',e.data);//储存 user_id
				var arr = [plus.runtime.appid];
				ca.sendNotice(arr,'login_ok',{});
				setTimeout(function(){
					ca.closeCurrentInterface();
				},100);
				mui.toast("登录成功");
			}else{
				mui.toast('账号密码错误')
			}
		}
	});
})
//微信
$('.wx').on('tap', function() {  
	login('weixin');
});
//接收登录（注册）成功通知
//window.addEventListener('',function(){
//	ca.closeCurrentInterface();
//});
