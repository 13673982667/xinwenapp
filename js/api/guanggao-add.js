


var viewobj = {
	li:function(res){
		if(!res){
			return;
		}
		var address = '';
		if(res.str_address && res.str_address!==''){
			address = '<div class="address">'+res.str_address+'</div>';
		}
		var ggurl = '';
		if(res.ggurl && res.ggurl!==''){
			ggurl =	'<div class="ggurl">'+res.ggurl+'</div>';
		}
		console.log(JSON.stringify(res));
		var str = $('<li class="mui-table-view-cell mui-media mui-col-xs-4"  alt="'+res.id+'" >'+
		            '<a>'+address+ggurl+
		                '<img class="mui-media-object" src="'+res.ggimg+'">'+
		            '</a>'+
		        '</li>');
		str.on('tap',function(){
			var ggid = $(this).attr('alt');
			openguanggao({ggid:ggid});
		});
		str.on('longtap',function(){ //长按删除
			var _this = $(this);
			mui.confirm('确定删除吗？','删除此广告',['取消','确定'],function(e){
				if(e.index == 1){
					delGuanggao(_this);
				}
			});
		});
		return str;
	},
};
//根据广告id删除广告
function delGuanggao(obj){
	var data = {
		ggid:obj.attr('alt'),
	};
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('出错了，刷新试试');
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/delGuanggao?user_id='+user_id,
		dataType:"json",
		data:data,
		async:false,
		success:function(e){
			if(e.code == 1){
				obj.remove();
			}else{
				mui.toast('error');
			}
		}
	});
}


//获取广告列表
function getguanggaolist(moderator_id){
	if(!moderator_id){
		return mui.toast('出错了，刷新试试');
	}
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('出错了，刷新试试');
	}
	var data = {
		moderator_id:moderator_id
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/getguanggaolist?user_id='+user_id,
		dataType:"json",
		data:data,
		async:false,
		success:function(e){
			if(e.code == 1){
				for(var x in e.data){
//					console.log(view(e.data[x]));
					var str = viewobj.li(e.data[x]);
					$('.img-content').append(str);
//					str.css('display','block');//添加动画
				}
//				
			}
		}
	});
}

//添加图片
//$('.button').on('tap',function(){
//	if(!moderator_id){
//		return mui.toast('出错了，刷新试试');
//	}
//	var user_id = localStorage.getItem('userId');
//	if(!user_id){
//		return mui.toast('出错了，刷新试试');
//	}
//	if(!check_length()){
//		return mui.toast('广告数量超过限制');
//	}
//	//添加广告图片
//	var arr = ['照相机', '相册'];
//	castapp.actionSheet(arr, {
//		succFn: function(data) {
//			//将添加的图片保存数据库
//			var data = {
//				moderator_id:moderator_id,
//				ggimg : data
//			}
//			console.log(xinwen.url+'/addguanggaoimg?user_id='+user_id);
//			$.ajax({
//				type:"get",
//				url:xinwen.url+'/addguanggaoimg?user_id='+user_id,
//				dataType:"json",
//				data:data,
//				async:false,
//				success:function(e){
//					if(e.code == 1){
//						var res = {
//							ggid:e.data,
//							ggimg:data.ggimg,
//						}
//						openguanggao(res);
//					}else if(e.code == 2){
//						mui.toast('添加的广告数量超过限制');
//					}else{
//						console.log('---上传广告图片失败---');
//						console.log(JSON.stringify(e));
//					}
//				}
//			});
//			
//		},
//		errFn: function(data) {
////			alert(JSON.stringify(data));
//			return mui.toast('添加失败'+JSON.stringify(data));
//		},
//		//是否开启上传
//		isUpload: true,
//		//上传地址
//		uploadUrl: xinwen.url + '/upload_file_fengmian',
//	})
//});
//判断有没有超过可允许添加的范围
function check_length(){
//	var obj_len = $('.img-content>li').length;
//	if(obj_len > guanggaoleng){
//		return false;
//	}
	return true;
}

function openguanggao(data){
	mui.openWindow({
		url:'guanggao.html',
		id:'guanggao.html',
		extras:data,
		show:{
			autoShow:false,
		},
	});
}

$('.button').on('tap',function(){
	$('#file').click();
});


var body_width = $('body').width();
var body_height = $(window).height();
$('#clipArea').photoClip({
	width: body_width,
	height: (body_height * 0.89),
	file: "#file",
	view: "#hit",
	ok: "#clipBtn",
	loadStart: function (e) {
		console.log("照片读取中"+JSON.stringify(e));
	},
	loadComplete: function (e) {
		console.log("照片读取完成"+JSON.stringify(e));
		dis();
	},
	clipFinish: function (e) {
//		console.log('dataURL'+JSON.stringify(e));
		disno();
		addggimg(e);
		
	}
})
//编辑退出
$('.bianjituichu').on('tap',function(e){
	disno();
})
//编辑显示
function dis(){
	$('.bianji').css('display','block')
	$('.bianji').animate({"top":0},500);
}
//编辑隐藏
function disno(){
	$('.bianji').animate({
		"top":plus.display.resolutionHeight},500,'linear',function(){$('.bianji').css('display','none')});
}

function addggimg(data){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('出错了，刷新试试');
	}
	//将添加的图片保存数据库
	var data = {
		moderator_id:moderator_id,
		ggimg : data
	}
	plus.nativeUI.showWaiting();  //显示等待框
	$.ajax({
		type:"post",
		url:xinwen.url+'/addguanggaoimg?user_id='+user_id,
		dataType:"json",
		data:data,
//		async:false,
		timeout:5000,
		success:function(e){
//			console.log(JSON.stringify(e));
			if(e.code == 1){
//				var res = {
//					ggid:e.data,
//					ggimg:data.ggimg,
//				}
//				openguanggao(res);
				$('.img-content').html('');
		    	getguanggaolist(moderator_id); //获取列表
			}else if(e.code == 2){
				mui.toast('添加的广告数量超过限制');
			}else{
				console.log('---上传广告图片失败---');
				console.log(JSON.stringify(e));
				mui.toast(JSON.stringify(e));
			}
			plus.nativeUI.closeWaiting(); //关闭等待框
		},
		error:function(){
			mui.toast('超时！换个小点的照片试试');
			plus.nativeUI.closeWaiting(); //关闭等待框
		}
	});
	setTimeout(function(){
		plus.nativeUI.closeWaiting(); //关闭等待框
	},5000);
}