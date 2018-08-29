//初始化数据
var pagearrnews = {
	'size' : 10, //默认条数
	'page' : 1  //默认第一页
};
var pagearrdelnews = {
	'size' : 10, //默认条数
	'page' : 1  //默认第一页
}

//var scroll = mui('.mui-scroll-wrapper').scroll();
//document.querySelector('.mui-scroll-wrapper').addEventListener('scroll',function (e) {
//　　console.log('scroll.y');
//})
setTimeout(function(){

},500);
//var viewobj = {
//	fenxiang : function(){
//			//分享到  -- 样式
//			var str111 = '<div class="fenxiang clearfix">'+
//							'<span class="fl">'+
//								'分享到'+
//							'</span>'+
//							'<ul class="clearfix fl">'+
//								'<li class="pengyouquan"><img src="img/pengyouquan.png" /></li>'+
//								'<li class="weixinhaoyou"><img src="img/weixin.png" /></li>'+
////								'<li><img src="img/qq.png" /></li>'+
////								'<li><img src="img/qq-kongjian.png" /></li>'+
//							'</ul>'+
//						'</div>';
//				return str111;
//		},
//		
//}

		//发送通知
//		var arr = ['personal.html','car.html','dianzhu.html','goods_detail.html'];
//		ca.sendNotice(arr,'login',{});

//localStorage.removeItem('userId') ;
if(typeof localStorage.getItem('userId') == 'object'){ //没有的话就登陆
//	mui.openWindow({
//		url:'login.html',
//		id:"login.html",
//		show:{
//	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
//	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
//	 }, 
//	});
	

}

//更新用户信息
function updateUserInfo(user_id){
//	console.log(xinwen.url+'/userInfo?user_id='+user_id);
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('信息非法，请重新登陆！');	
	}
//	console.log(xinwen.url+'/userInfo?user_id='+user_id);
	$.ajax({
		type:"get",
		url:xinwen.url+'/userInfo?user_id='+user_id,
		dataType:"json",
	//	data:obj,
		success:function(res){
			if(res.code == 1){
				$('.my_edit').css({"display":"none"});
				$('.qiyeshezhi').css({"display":"none"});
//				alert(res.data.NewsNum);
				$('.bg-blur').css({'background':'url('+res.data.headimgurl+') no-repeat'});
//				$('.my-cart').css({'background':'url('+res.data.headimgurl+') no-repeat'});
				$('.guanzhu-num').html(res.data.CollectionsNum); //关注人数
//				$('.fensi-num').html(res.data.FansNum); //粉丝人数
				$('.fensi-num').html(res.data.MFansNum); //企业粉丝人数
				$('.nickname').html(res.data.user_name); //昵称
				$('.my-qianming').html(res.data.personality); //签名
				$('.headimgurl').attr('src',res.data.headimgurl); //头像
         		$('.bianji-num').html(res.data.ModeratorUserNum); //编辑
         		if(res.data.Moderator){ // 企业
         			$('.guanggaoshezhi').attr('alt',JSON.stringify(res.data.Moderator)).css({"display":"block"}); //广告设置功能
         			$('.dis').css({"display":"block"}); //全部文章
         			$('.qiyeshezhi').attr('alt',JSON.stringify(res.data.Moderator)).css({"display":"block"}).on('tap',function(){
         				openqiyeshezhi(this);
         			});//企业设置功能
         			$('.my_edit').css({"display":"block"});
         		}else if(res.data.ModeratorInfo){}else{}
         		
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


//访问统计
$('.fangwentongji').on('tap',function(){
	mui.openWindow({
		url:'tongji.html',
		id:'tongji.html'
	});
});


//getUserNewsList();  //更新我的文章
//getUserNewsList(1); //更新回收站文章（更换全部文章）
//用户文章
function getUserNewsList(isdelete){
	if(!user_id){
		var user_id = getUserId();
	}
	if(isdelete){
		pagearr = pagearrdelnews;
		pagearr.isdelete = 1;
	}else{
		pagearr = pagearrnews;
	}
//	console.log(JSON.stringify(pagearrdelnews));

	pagearr.is_look = true; //显示所有的
	pagearr.user_id = user_id;
//	console.log(JSON.stringify(pagearr))
console.log(pagearr.user_id);
	$.ajax({
		type : 'get',
		data : pagearr,
		datatype : 'json',
		url : xinwen.url+'/getUserNewsList',
		success:function(res){  
//			console.log(JSON.stringify(res));
			if(res.code == 1){
//				pagearr.page += 1; //页数加1
				if(isdelete){
					pagearrdelnews.page += 1;
				}else{
					pagearrnews.page += 1;
				}
				for(var i=0; i<res.data.length; i++){
					//右边操作栏
//					var right_edit = '<div class="mui-slider-right mui-disabled">'+
//										'<a class="mui-btn  edit-caozuo "  alt="'+res.data[i]['id']+'" >'+
//											'<span class="mui-icon mui-icon-trash"></span>'+
//										'</a>'+
//									'</div>';
//					var left_content = '<div class="mui-slider-handle">'+
//										'<p>'+(res.data[i]['is_look'] == 0 ? '<span class="simi">私密</span>' : '')+
//											res.data[i]['title'] +
//										'</p>'+
//										'<div class="all-img public-img-div">'+
//											(res.data[i]['cover'] ? ('<img src="'+res.data[i]['cover']+'"  class="public-img" />')  : '')+
//										'</div>'+
//									'</div>';
//									
//					if(res.data[i]['news_url'] && res.data[i]['news_url'] != '' && !isdelete){
////						var fenxiang = viewobj.fenxiang();
//					}else{
//						var fenxiang = '';
//					}
//					var li = $('<li class="mui-table-view-cell  content-li" ></li>').append(left_content,fenxiang);
//					//给每个li里面的操作添加事件
//					li.on('longtap',function(e){
//						e.stopPropagation();
//						if(isdelete){
//							edit_caozuo1($(this)); // 删除
//						}else{
//							edit_caozuo($(this)); // 删除
//						}
//					});
////					li.find('.fenxiang').attr('alt',JSON.stringify(res.data[i])).on('tap',function(e){
////						e.stopPropagation();
////						onfenxiang($(this).attr('alt'));
////					});
//					li.find('.pengyouquan').attr('alt',JSON.stringify(res.data[i])).on('tap',function(e){ //分享 到微信朋友圈
//						onfenxiang($(this).attr('alt'),'WXSceneTimeline');
//						e.stopPropagation();  //阻止元素冒泡事件
//					});
//					li.find('.weixinhaoyou').attr('alt',JSON.stringify(res.data[i])).on('tap',function(e){ //分享 到微信好友
//						onfenxiang($(this).attr('alt'),'WXSceneSession');
//						e.stopPropagation();  //阻止元素冒泡事件
//					});
//					li.attr('alt',JSON.stringify(res.data[i])).on('tap',function(e){
//						e.stopPropagation();
//						news_info($(this));
//					});
					var str = viewobj.guanzhu(res.data[i]);
					
					str.on('longtap',function(e){
						e.stopPropagation();
//						if(isdelete){
							edit_caozuo1($(this)); // 删除
//						}else{
//							edit_caozuo($(this)); // 删除
//						}
					});
					if(isdelete){
						$('.content-delete>ul').append(str);

					}else{
						$('.content-all>ul').append(str);
					}
				}
			}else{
				_jiazai = true;
				console.log('获取文章失败了');
//				mui.toast(res.message);
//				_this.endPullupToRefresh(true); 
			}
		},
		error:function(res){
			_jiazai = true;
			console.log('获取文章失败');
//			_this.endPullupToRefresh(true); 
		}
	});
}

//删除文章操作
function edit_caozuo(dom){
	mui.confirm('删除后别人将无法看到。','确定要删除这篇文章吗？',['取消','确定'],function(e){
		if(e.index == 1){
			plus.nativeUI.showWaiting();  //显示等待框
			var news_id = JSON.parse(dom.attr('alt')).id;
			var user_id = localStorage.getItem('userId');
			if(!user_id){
				return mui.toast('信息非法，请重新登陆！');	
			}
			var data = {
				news_id : news_id
			};
			$.ajax({
				type:"get",
				datatype:'json',
				url:xinwen.url+'/deleteNews?user_id='+user_id,
				data:data,
				success:function(msg){
					if(msg.code == 1){ 
						dom.remove();
						mui.toast('删除成功');
					}else{
						mui.toast('出错了，刷新试试');
					}
					plus.nativeUI.closeWaiting(); //关闭等待框
				}
			});

		}
	})
}
//彻底删除文章操作
function edit_caozuo1(dom){
	mui.confirm('删除后别人将无法看到。','确定要彻底删除这篇文章吗？',['取消','确定'],function(e){
		if(e.index == 1){
			plus.nativeUI.showWaiting();  //显示等待框
			var news_id = JSON.parse(dom.attr('alt')).id;
			var user_id = localStorage.getItem('userId');
			if(!user_id){
				return mui.toast('信息非法，请重新登陆！');	
			}
			var data = {
				news_id : news_id
			};
			$.ajax({
				type:"get",
				datatype:'json',
				url:xinwen.url+'/deleteNews1?user_id='+user_id,
				data:data,
				success:function(msg){
					if(msg.code == 1){ 
						dom.remove();
						mui.toast('删除成功');
					}else{
						mui.toast('出错了，刷新试试');
					}
					plus.nativeUI.closeWaiting(); //关闭等待框
				}
			});

		}
	})
}

//	$('.edit-caozuo').each(function(i,d){
//	console.log(typeof d);
//	$(d).on('tap',function(){alert()
//		var news_id = $(this).attr('alt');
//		mui.confirm('删除后别人将无法看到。','确定要删除这篇文章吗？',['取消','确定'],function(e){
//			if(e.index == 1){
//				
//	//			alert(news_id);
//			}
//		})
//	});
//})

//编辑
$('#my_edit').on('tap',function(){
	mui.openWindow({
		url:'my-bianji.html',
		id:'my-bianji.html',
	});
});
//我的信息
$('.my_info').on('tap',function(){
	var user_id = localStorage.getItem('userId');
//	alert(user_id);
	if(user_id > 0){
		mui.openWindow({
			url:'my-info.html',
			id:'my-info.html',
		});
	}else{
//		alert();
		console.log('没有登录');
		login('weixin');
	}
});
//打开企业设置
function openqiyeshezhi(obj){
	var m_ = $(obj).attr('alt');
	if(!m_){
		mui.toast('错误，刷新试试')
	}
	mui.openWindow({
		url:'my-qiye.html',
		id:'my-qiye.html',
		extras:{
			m_:m_
		},
	});
}

//关注
$("#Collections").on('tap',function(){
	openguanzhu();
}) 
//$('#wode-guanzhu.html').on('close', function(){
//	alert();
//});
//粉丝
$("#Fans").on('tap',function(){
	openfensi();
}) 

//回收站选项卡
$('div.head span').on('tap',function(){
	//每次点击刷新
	_self.refresh(true);  //重置上拉加载
	if($(this).index() == 0){ //文章
		shuaxin_index = 0; //刷新函数
	}else if($(this).index() == 1){ //回收站
		shuaxin_index = 1;
	}
	var div = $('.content');
	$(this).addClass('quanbu-active').siblings('span').removeClass('quanbu-active');
	div.css({"display":"none"}).eq($(this).index()).css({"display":"block"});
});

//广告设置
$('.guanggaoshezhi').on('tap',function(){
	var Moderator = $(this).attr('alt');
	if(!Moderator || Moderator == 'false'){
		return mui.toast('您没有权限');
	}
	mui.openWindow({
//		url:'guanggao.html',
//		id:'guanggao.html',
		url:'guanggao-add.html',
		id:'guanggao-add.html',
//		show:{
//	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
//	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
//	 	}, 
	 	extras:{
			content:Moderator,
		}
	});
});

//
//
////点击文章事件
//function news_info(obj){
//	var news_array = JSON.parse(obj.attr('alt'));
//	if(news_array.news_url && news_array.news_url !=''){ //加载新闻连接的页面
//		opennews_info2(news_array.news_url,obj);//加载新闻连接的页面
//		opennews_info(news_array.news_url,obj)//加载广告页
////		mui.openWindow({
////			url:news_array.news_url,
////			id:news_array.news_url,
////			styles:{
////				popGesture: 'close', //右划关闭
////				titleNView: {
//////					autoBackButton: 'true',  //左侧返回按钮
////					buttons:[{
////						text: '返回',
////						float: 'left',
////						onclick: function(){ //关闭
////							plus.webview.getWebviewById(news_array.news_url).close();
////						},
////					}],
////				},
////				zindex: 0 ,
////			}
////		})
////		mui.openWindow({  //加载广告页
////			url:'news_info.html',
////			id:'news_info.html',
////			show:{
////				autoShow:false,
////			},
////			styles:{
////				zindex: 1,
////			},
////			extras:{
////				news_arr:obj.attr('alt')
////			}
////		});
//	}else{
//		mui.toast('该文章还没有连接');	
//	}
//}

//点击分享  处理分享内容 调用分享
//function onfenxiang(jsstr){
//	if(!jsstr){
//		return;
//	}
//	var arr = JSON.parse(jsstr);
////	alert(arr.id);
//	var data = {
//		news_id:arr.id, //获取文章信息
//		get_type : 'share',//类型为分享
//	}
//	$.ajax({
//		type:"get",
//		url:xinwen.url+'/getNewsInfo',
//		dataType:"json",
//		data:data,
//		success:function(res){
//			if(res.code == 1){
//				var arr = {
//					
//					news_id : data.news_id,
//					title : res.data[0]['title'], //设置分享标题
//					content : res.data[0]['content'], 
//					shareImg : res.data[0]['w_cover'],
//					shareLink : res.data[0]['news_url'],
//				}
////				console.log('-----'+JSON.stringify(arr));
//				fenxiang(arr);
//			}
//		},
//		error:function(res){
//			mui.toast('文章获取失败');
//			console.log('文章获取失败');
//		}
//	});
//}