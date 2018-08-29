//默认分页
var pagearr = {
	'size' : 10, //默认条数
	'page' : 1 , //默认第一页
};

//更新个人信息
function upUserInfo(user_id){
	if(!user_id){
		return ;
	}
	$.ajax({
		type : 'get',
//		data : {}},
		datatype : 'json',
		url : xinwen.url+'/userInfo?user_id='+user_id,
		success:function(res){
			console.log(JSON.stringify(res.data));
			$('.nickname').html(res.data['user_name']);
			$('.head img').attr('src',res.data['headimgurl']);
//			$('.qianming').html(res.data['personality']);
			$('.bianji-num').html(res.data['NewsNum']);
			$('.guanzhu-num').html(res.data['CollectionsNum']);
			$('.fensi-num').html(res.data['FansNum']);
			$('.bg-blur').css({'background':'url('+res.data.headimgurl+') no-repeat'});
		}
	})
}

//更新文章
function getUserNewsList(user_id){
	if(!user_id){
		return ;
	}
	$.ajax({
		type : 'get',
		data : pagearr,
		datatype : 'json',
		url : xinwen.url+'/getUserNewsList?user_id='+user_id,
		success:function(res){  
//			console.log(JSON.stringify(res));
			if(res.code == 1){
				$('.xianshi').html('上拉刷新');
				
				pagearr.page += 1; //页数加1
				for(var i=0; i<res.data.length; i++){
//					var str = $('<div class="news_list">'+
//						'<p class="desc tp-padding">'+res.data[i]['title']+'</p>'+
//						'<p>'+
//						'	<img src="'+res.data[i]['cover']+'" />'+
//						'</p>'+
//						'<div class="fenxiang clearfix tp-padding">'+
//							'<span class="fl">'+
//								'分享到'+
//							'</span>'+
//							fenxiangdao()+
//						'</div>'+
//					'</div>');
//					str.find('.pengyouquan').attr('alt',JSON.stringify(res.data[i])).on('tap',function(e){ //分享 到微信朋友圈
//						onfenxiang($(this).attr('alt'),'WXSceneTimeline');
//						e.stopPropagation();  //阻止元素冒泡事件
//					});
//					str.find('.weixinhaoyou').attr('alt',JSON.stringify(res.data[i])).on('tap',function(e){ //分享 到微信好友
//						onfenxiang($(this).attr('alt'),'WXSceneSession');
//						e.stopPropagation();  //阻止元素冒泡事件
//					});
					var str = viewobj.guanzhu(res.data[i]);
					$('.xianshi').before(str);
					is_shuaxin = true;
				}
			}else{
				$('.xianshi').html('没有更多了');
				is_shuaxin = false;
				console.log('没有数据了');
//				mui.toast(res.message);
			}
		}
	});
}

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

//自动加载
//var scroll = mui('body').scroll(); //有这个页面底部会出现很高的空白
var is_shuaxin = true; //刷新条件  每次触发后为false
$('body').on('scroll',function(e){
	//	console.log(scroll.y);//窗体滚动高度
	var bodyHeight = plus.display.resolutionHeight;//手机高度
	var shuaxinH = $('.xianshi').height();    //刷新元素高度
	var topH    = $('.xianshi').offset().top; //元素距离顶部高度
	if(bodyHeight-shuaxinH >= topH && is_shuaxin){
		$('.xianshi').html('正在加载...');
		is_shuaxin = false;
		setTimeout(function(){
			getUserNewsList(user_id);
		},500);
//		console.log();
	}
});


//关注
$('.guanzhu-num').parent('li').on('tap',function(e){
//	alert(user_id);
	openguanzhu(user_id);
});
//编辑
$('.bianji-num').parent('li').on('tap',function(e){
	
});
//粉丝
$('.fensi-num').parent('li').on('tap',function(e){
	openfensi(user_id);
});
