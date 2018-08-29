//头像更改
$('#touxiang').on('tap', function(e) {

	//修改头像
	var arr = ['照相机', '相册'];
	castapp.actionSheet(arr, {
		succFn: function(data) {
//			alert('succ'+data);
			//手机上的图片路径
//			alert(data);
			//上传后的图片路径
			if(public_ajax({headimgurl:data})){
				$('.header-url').attr({src:data});
				mui.toast('修改成功');
			}
		},
		errFn: function(data) {
//			alert(data);
		},
		//是否开启上传
		isUpload: true,
		//上传地址
//		uploadUrl: xinwen.url + '/upload_file_fengmian_jiancai',
		uploadUrl: xinwen.url + '/upload_file_fengmian',
	})

});

//修改个性签名
window.addEventListener('qianming-back',function(e){
	if(public_ajax({personality:e.detail.title})){
		$('.personality').html(e.detail.title);
		mui.toast('修改成功');
	}
});
//修改点击事件
$('.up_qianming').on('tap',function(){
	mui.openWindow({
		url:'my-info-qianming.html',
		id :'my-info-qianming.html',
		extras:{
			text:$('.personality').html() == '未填写' ? '' : $('.personality').html()
		},
	});
});


updateUserInfo();
//更新用户信息
function updateUserInfo(){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		mui.toast('更新信息失败，请重新登录');
		return;
	}

	$.ajax({
		type:"get",
		url:xinwen.url+'/getUserInfo?user_id='+user_id,
					dataType:"json",
	//				data:obj,
		success:function(res){
			if(res.code == 1){
				$('.guanzhu-num').html(res.data.CollectionsNum); //关注人数
				$('.header-url').attr('src',res.data.headimgurl); //头像
				$('.nickname').html(res.data.user_name); //
				$('.sex').html(res.data.sex); //
				$('.city').html(res.data.province+' '+res.data.city); //
				$('.personality').html(res.data.personality || '未填写'); 
				$('.ymd').html((res.data.year||'1980')+'-'+(res.data.month||'01')+'-'+(res.data.day||'01')); 
				//权限
				switch (res.data.moderator_status){
					case 0:
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
					ModeratorStatus3();
						break;
				}
			}else{
				console.log('用户信息更新失败');
				mui.toast(res.message);
			}
		},
		error:function(res){
			mui.toast('信息更新失败');
			console.log('信息更新失败');
	//					alert(res);
	
		}
	});
}


//更新昵称
$('.up_nickname').on('tap',function(){
	mui.prompt(' ','请输入昵称，最多16个字','修改昵称',['取消','确定'],function(e){
		if (e.index == 1) {
			if(e.value == ''){
				mui.toast('昵称不能为空哦！');
				return;
			}
			if(e.value.length > 16){
				mui.toast('不能超过16个字');
				return;
			}
			value = e.value;
			var data = {
				user_name:value
			};
			if(public_ajax(data)){
				$('.nickname').html(value);
				mui.toast('修改成功');
			}
		}
	});
})
//更新手机
$('.up_phone').on('tap',function(){
	mui.prompt(' ','请输入手机号','修改手机',['取消','确定'],function(e){
		if (e.index == 1) {
			value = e.value;
			if(!(/^1[34578]\d{9}$/.test(value))){
				return mui.toast('手机号格式错误');
			}
			var data = {
				phone:value
			};
			if(public_ajax(data)){
				$('.phone').html(value);
				mui.toast('修改成功');
			}
		}
	});
})

//更新日期
document.getElementById("pickDateBtn").addEventListener('tap', function() {
	var dDate = new Date();
	dDate.setFullYear(1980, 0, 1);
	var minDate = new Date();
	minDate.setFullYear(1900, 0, 1);
	var maxDate = new Date();
	maxDate.setFullYear(castapp.getCurrentTime()[0], castapp.getCurrentTime()[1]-1, castapp.getCurrentTime()[2]);
	plus.nativeUI.pickDate(function(e) {
		var d = e.date;
		var data = {
			year:d.getFullYear(),
			month:(d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : d.getMonth() + 1,
			day:(d.getDate()) < 10 ? '0'+d.getDate() : d.getDate()
		};
		console.log(JSON.stringify(data));
		if(public_ajax(data)){
			$('.ymd').html(data.year + "-" + data.month + "-" + data.day);
			mui.toast('修改成功');
		}
//		console.log('您选择的日期是:' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
	}, function(e) {
		console.log( "您没有选择日期" );
	}, {
		title: "请选择日期",
		date: dDate,
		minDate: minDate,
		maxDate: maxDate
	});
})

//更新城市
//级联示例
var cityPicker = new mui.PopPicker({
	layer: 2
});
cityPicker.setData(cityData);
var showCityPickerButton = $('#showCityPicker');
//var cityResult = doc.getElementById('cityResult');
$('#showCityPicker').on('tap', function(event) {
	cityPicker.show(function(items) {
		data = {
			province:items[0].text,
			city:items[1].text,
		};
//		console.log("你选择的城市是:" + items[0].text + " " + items[1].text);
//		返回 false 可以阻止选择框的关闭
//		return false;
		if(public_ajax(data)){
			$('.city').html(items[0].text + " " + items[1].text);
			mui.toast('修改成功');
		}
	});
});

//性别
$('.up_sex').on('tap',function () {
	var btnArray = [{title:"男"},{title:"女"}];
	plus.nativeUI.actionSheet( {
		cancel:"取消",
		buttons:btnArray
	}, function(e){
		var index = e.index;
		if(index == 0){
			return ;
		}
		var text;
		switch (index){
			case 0:
				text = "取消";
				break;
			case 1:
				text = "男";
				break;
			case 2:
				text = "女";
				break;
		}
		
		if(text == $('.sex').html()){
			return;
		}
//		alert(public_ajax({sex:text}));
		if(public_ajax({sex:text})){
			$('.sex').html(text);
			mui.toast('修改成功');
		}
		
	} );
});


//获取用户权利  如果是
function ModeratorStatus3(){
	//获取广告参数
	$.ajax({
		type:"get",
		url:xinwen.url+'/getggconfig',
		dataType:"json",
		success:function(e){
			if(e.code == 1){
				$('.mui-table-view').append(viewobj.ggtime(e.data['time']));
				$('.mui-table-view').append(viewobj.ggimg(e.data['appguanggaoimg']));
			}
		}
	});
	
	
}

var viewobj = {
	ggtime : function(time){
		var str = $('<li class="mui-table-view-cell" >'+
						'<a class="mui-navigate-right">'+
							'修改app广告时间'+
							'<span class="fr ggtime">'+time+'秒</span>'+
						'</a>'+
					'</li>');
		str.on('tap',function(){
			//普通示例
			var userPicker = new mui.PopPicker();
			userPicker.setData([{
				value: '1',
				text: '1秒'
			},{
				value: '2',
				text: '2秒'
			},{
				value: '3',
				text: '3秒'
			},{
				value: '4',
				text: '4秒'
			},{
				value: '5',
				text: '5秒'
			},]);
//			var showUserPickerButton = doc.getElementById('showUserPicker');
//					var userResult = doc.getElementById('userResult');
			userPicker.show(function(items) {
				//修改时间
				upggtime(items[0].value);
			});
		});
		return str;
	},
	ggimg : function(appguanggaoimg){
		var str = $('<li class="mui-table-view-cell up_qianming" >'+
						'<a class="mui-navigate-right">'+
							'修改app广告底部'+
							'<span class="fr "></span>'+
						'</a>'+
					'</li>');
		str.on('tap',function(event){
			
		});
		return str;
	}
	
}

//修改广告时间
function upggtime(time){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		mui.toast('更新信息失败，请重新登录');
		return ; 
	}
	var data = {
		time:time
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/upggtime?user_id='+user_id,
		dataType:"json",
		data:data,
		success:function(e){
			if(e.code == 1){
				mui.toast('修改成功');
				$('.ggtime').html(time+'秒');
			}else{
				mui.toast('修改失败');
			}
		}
	});
}
