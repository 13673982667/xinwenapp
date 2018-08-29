var pagearrguanzhu ={
	'size' : 10, //默认条数
	'page' : 1  //默认第一页
};
var  pagearrtuijian = {
	'size' : 10, //默认条数
	'page' : 1  //默认第一页
}


getNewsTuijianList();
//获取推荐 （修改为获取推荐的企业）
function getNewsTuijianList(user_id){
	if(!user_id){
		var user_id = getUserId();
	}
	pagearrtuijian.user_id = user_id;
	$.ajax({
		type : 'get',
		data : pagearrtuijian,
		datatype : 'json',
		url : xinwen.url+'/getTuijianUserList',
		success:function(res){
//			console.log('--'+JSON.stringify(res));
			if(res.code == 1){
				pagearrtuijian.page += 1; //页数加1
				for(var i=0; i<res.data.length; i++){
//					if(res.data[i]['is_guanzhu']){
//						var div1_span2 = '<span class="yiguanzhu fr" alt="'+res.data[i]['id']+'">已关注</span>';
//					}else{
//						var div1_span2 = '<span class="weiguanzhu fr" alt="'+res.data[i]['id']+'">关注</span>';
//					}
////					if(res.data[i]['user_id'] == localStorage.getItem('userId')){
////						div1_span2 = '';
////					}
//					if(res.data[i]['cover']){
//						var div3_img = '<img src="'+res.data[i]['cover']+'" />';
//					}
//					var str = $('<li>'+
//							'<div class="person tp-padding clearfix">'+
//								'<img src="'+res.data[i]['headimgurl']+'" class="touxiang fl" />'+
//								'<span class="nickname fl mui-control-item">'+res.data[i]['ban_name']+'</span>'+
//								div1_span2+
//							'</div>'+
//							'<div class="news tp-padding">'+
//								'<h1>'+res.data[i]['jianjie']+'</h1>'+
//							'</div>'+
//							'<div class="news-png ">'+
//								(div3_img || '')+
//							'</div>'+
//						'</li>');
					var str = viewobj.qiye(res.data[i]);
					str.attr('alt',res.data[i]['id']).on('tap',function(e){ //点击头像 跳转个人页面
						qiye_info($(this).attr('alt'));
						e.stopPropagation();  //阻止元素冒泡事件
					});
					str.find('.weiguanzhu').attr('alt',res.data[i]['id']).on('tap',function(e){ //关注
						e.stopPropagation();
						onGuanzhuqiye($(this));
					});
					str.find('.yiguanzhu').attr('alt',res.data[i]['id']).on('tap',function(e){ //取消关注
						e.stopPropagation();
						onGuanzhuqiye($(this));
					});
					
					$('.tuijian_').append(str);
				}
				_jiazai[1] = false;
			}else{
				
				_jiazai[1] = true;
				console.log('获取推荐文章失败了');
			}
		},
		error:function(res){
			_jiazai[1] = true;
			console.log('获取推荐文章失败');
		}
	});
}
//点击关注  或者 取消关注
function onGuanzhuqiye(obj){
	plus.nativeUI.showWaiting();  //显示等待框
	var moderator_id = obj.attr('alt');
	var user_id = localStorage.getItem('userId');
	if(!moderator_id || !user_id){
		return mui.toast('参数错误，刷新试试');
	}
	var data = {
		user_id : user_id,
		moderator_id : moderator_id,
	}
//	console.log(JSON.stringify(data));
	$.ajax({
		data : data,
		type : 'get',
		datatype : 'json',
		url : xinwen.url+'/onGuanzhuqiye',
		success : function(res){ // -1取消关注  1关注
//			console.log(JSON.stringify(res))
			setTimeout(function(){
				if(res.code == 1){
					mui.toast('关注成功');
					obj.addClass('yiguanzhu').removeClass('weiguanzhu').html('<span >-&nbsp;</span>关&nbsp;&nbsp;注');
				}else if(res.code == -1){
					mui.toast('已取消'); 
					obj.addClass('weiguanzhu').removeClass('yiguanzhu').html('<span>+&nbsp;</span>关&nbsp;&nbsp;注');
				}else{
					mui.toast(res.message);
				}
				plus.nativeUI.closeWaiting(); //关闭等待框
			},500);
		},
		error : function(res){
			mui.toast('关注失败');
		}
	});
}

//获取关注文章
getNewsCollectList();
function getNewsCollectList(user_id){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return ;
	}
	pagearrguanzhu.user_id = user_id;
	$.ajax({
		type : 'get',
		data : pagearrguanzhu,
		datatype : 'json',
		url : xinwen.url+'/getNewsCollectList',
		success:function(res){
//			console.log(res);
//			console.log(JSON.stringify(res));
			if(res.code == 1){

				pagearrguanzhu.page += 1; //页数加1
				for(var i=0; i<res.data.length; i++){
				
					var str = viewobj.guanzhu(res.data[i]);
					
					$('.guanzhu_').append(str);
				}
			}else{
				_jiazai[0] = true;
//				$('.jiazaiguanzhu').html('没有更多了');
//				mui.toast(res.message);
			}
		},
		error:function(res){
			_jiazai[0] = true;
			console.log('获取关注文章失败');
	//					alert(res);
		}
	});
}
getLunbotu();
//获取关注轮播图
function getLunbotu(){
	$.ajax({
		type : 'get',
//		data : pagearrguanzhu,
		datatype : 'json',
		url : xinwen.url+'/getLunbotu',
		success:function(res){
			if(res.code == 1){
				var str = viewobj.gzlunbotu(res.data);
				$('.zhiding_').before(str);
				$('.tuijian_').before(str);
				mui('.mui-slider1').slider({
					  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
				});
			}
		}
	})
}
//获取置顶
getzhiding();
function getzhiding(){
	$.ajax({
		type : 'get',
//		data : pagearrguanzhu,
		datatype : 'json',
		url : xinwen.url+'/getzhiding',
		success:function(res){
			if(res.code == 1){
				for(var k in res.data){
					var str = viewobj.zhiding(res.data[k]);
					$('.zhiding_').append(str);
				}
			}
		}
	})
}
////跳转用户信息页面
//function user_info(obj){
//	mui.openWindow({
//		url:'geren-ziliao.html',
//		id:'geren-ziliao.html',
//		extras:{
//			user_id:obj.attr('alt')
//		}
//	});
//}
//
////点击分享  处理分享内容 调用分享
//function onfenxiang(jsstr,type){
//
//	if(!jsstr){
//		return;
//	}
//	var arr = JSON.parse(jsstr);
////	alert('data');
//	var data = {
//		news_id:arr.id, //获取文章信息
//		get_type : 'share',//类型为分享
//	}
//	
//	$.ajax({
//		type:"get",
//		url:xinwen.url+'/getNewsInfo',
//		dataType:"json",
//		data:data,
//		success:function(res){
////			alert(JSON.stringify(res.data[0]['w_cover']));
//			if(res.code == 1){
//				var data = {
//					news_id : arr.id,
//					title : res.data[0]['title'], //设置分享标题
//					content : res.data[0]['content'], 
//					shareImg : res.data[0]['w_cover'],//
//					shareLink : res.data[0]['news_url'],
//				}
//				if(!type){
//					fenxiang(data);
//				}
//				if(type == 'pengyouquan'){
//					
//					shareWeixinMessage(data);
//				}
//			}
//		},
//		error:function(res){
//			mui.toast('文章获取失败');
//			console.log('文章获取失败');
//		}
//	});
//}

////加载关注
//$('.jiazaiguanzhu').on('tap',function(){
//	$(this).html('正在加载');
//	getNewsCollectList();
//});
////加载推荐
//$('.jiazaituijian').on('tap',function(){
//	$(this).html('正在加载');
//	getNewsTuijianList();
//});

//分享到  -- 样式
function fenxiangdao(){
	var str = '<ul class="clearfix fl">'+
			'<li class="pengyouquan"><img src="img/pengyouquan.png" /></li>'+
			'<li class="weixinhaoyou"><img src="img/weixin.png" /></li>'+
//			'<li><img src="img/qq.png" /></li>'+
//			'<li><img src="img/qq-kongjian.png" /></li>'+
			'</ul>';
	return str;
}
//字符串截取  如果大于5位 就以  （安安...所多） 形式返回
function str_ex(str){
	if(!str.length ||str.length <= 5){
		return str;
	}
	var str1 = str.substr(0,2) + '...' + str.substr(str.length-2);
	return str1;
}

//搜索企业
$('.sousuo').siblings('input').on('input',function(){
	var val = $(this).val();
	if(val.length < 1){
		return ;
	}
	var user_id = localStorage.getItem('userId');
	
	mui('#slider').slider().gotoItem(1);//操作选项卡  
//	plus.nativeUI.showWaiting();  //显示等待框
//console.log('');
	$.ajax({
		type : 'get',
		data : {val:val},
		datatype : 'json',
		url : xinwen.url+'/getmoderatorsousuo?user_id='+user_id,
		success:function(res){
			$('.tuijian_').html('');
			if(res.code == 1){
//				pagearrtuijian.page += 1; //页数加1
				for(var i=0; i<res.data.length; i++){
//					if(res.data[i]['is_guanzhu']){
//						var div1_span2 = '<span class="yiguanzhu fr" alt="'+res.data[i]['id']+'">已关注</span>';
//					}else{
//						var div1_span2 = '<span class="weiguanzhu fr" alt="'+res.data[i]['id']+'">关注</span>';
//					}
////					if(res.data[i]['user_id'] == localStorage.getItem('userId')){
////						div1_span2 = '';
////					}
//					if(res.data[i]['cover']){
//						var div3_img = '<img src="'+res.data[i]['cover']+'" />';
//					}
//					var str = $('<li>'+
//							'<div class="person tp-padding clearfix">'+
//								'<img src="'+res.data[i]['headimgurl']+'" class="touxiang fl" />'+
//								'<span class="nickname fl mui-control-item">'+res.data[i]['ban_name']+'</span>'+
//								div1_span2+
//							'</div>'+
//							'<div class="news tp-padding">'+
//								'<h1>'+res.data[i]['jianjie']+'</h1>'+
//							'</div>'+
//							'<div class="news-png ">'+
//								(div3_img || '')+
//							'</div>'+
//						'</li>');

//					str.attr('alt',res.data[i]['id']).on('tap',function(e){ //点击头像 跳转个人页面
//						qiye_info($(this).attr('alt'));
//						e.stopPropagation();  //阻止元素冒泡事件
//					});
//					str.find('.weiguanzhu').on('tap',function(e){ //关注
//						e.stopPropagation();
//						onGuanzhuqiye($(this));
//					});
//					str.find('.yiguanzhu').on('tap',function(e){ //取消关注
//						e.stopPropagation();
//						onGuanzhuqiye($(this));
//					});
					var str = viewobj.qiye(res.data[i]);
					str.attr('alt',res.data[i]['id']).on('tap',function(e){ //点击头像 跳转个人页面
						qiye_info($(this).attr('alt'));
						e.stopPropagation();  //阻止元素冒泡事件
					});
					str.find('.weiguanzhu').attr('alt',res.data[i]['id']).on('tap',function(e){ //关注
						e.stopPropagation();
						onGuanzhuqiye($(this));
					});
					str.find('.yiguanzhu').attr('alt',res.data[i]['id']).on('tap',function(e){ //取消关注
						e.stopPropagation();
						onGuanzhuqiye($(this));
					});
					
					$('.tuijian_').html(str);
					
//					$('.tuijian_').append(str);
				}
				_jiazai[1] = false;
			}else{
				
				_jiazai[1] = true;
				console.log('获取推荐文章失败了');
			}
			setTimeout(function(){
//				plus.nativeUI.closeWaiting(); //关闭等待框
			},500);
		}
	});
});

