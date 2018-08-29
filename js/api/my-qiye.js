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
		uploadUrl: xinwen.url + '/upload_file_fengmian',
	})

});

//修改个性签名
window.addEventListener('qianming-back',function(e){
	if(public_ajax({jianjie:e.detail.title})){
		$('.personality').html(e.detail.title);
		mui.toast('修改成功');
	}
});
//修改点击事件
$('.up_qianming').on('tap',function(){
	mui.openWindow({
		url:'my-qiye-qianming.html',
		id :'my-qiye-qianming.html',
		extras:{
			text:$('.personality').html() == '未填写' ? '' : $('.personality').html()
		},
	});
});


//updateQiyeInfo();
//更新企业信息
function updateQiyeInfo(moderator_id){
	if(!moderator_id){
		mui.toast('更新信息失败');
		return;
	}

	$.ajax({
		type:"get",
		url:xinwen.url+'/getQiyeInfo?moderator_id='+moderator_id,
					dataType:"json",
	//				data:obj,
		success:function(res){
			if(res.code == 1){
//				console.log(JSON.stringify(res))
				$('.header-url').attr('src',res.data.headimgurl); //头像
				$('.nickname').html(res.data.ban_name); //
				$('.personality').html(res.data.jianjie || '未填写'); 
				
			}else{
				console.log('用户信息更新失败');
				mui.toast(res.message);
			}
		},
		error:function(res){
			mui.toast('信息更新失败');
			console.log('信息更新失败');
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
				ban_name:value
			};
			if(public_ajax(data)){
				$('.nickname').html(value);
				mui.toast('修改成功');
			}
		}
	});
})

function public_ajax(data){
	var isbool = false;
	if(!moderator_id){
		mui.toast('更新信息失败，请重新登录');
		return ; 
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/upQiyeInfo?moderator_id='+moderator_id,
		dataType:"json",
		data:data,
		async:false,
		success:function(e){
//			console.log(JSON.stringify(e));
			if(e.code == 1){
				isbool = true;
			}else{
				isbool = false;
				mui.toast(e.message);
			}
		},
		error:function(e){
			mui.toast(e);
//			console.log(JSON.stringify(e))
		}
	});
	return isbool;
}

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
	
	
}
