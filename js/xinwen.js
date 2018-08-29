var xinwen = {
	url3:"http://172.20.10.6",
	url1:"http://192.168.1.110",
	url5:'http://xinwen.xylnqn.com', 
//	url:'http://192.168.0.139',
	url4:'http://fangyuan.ipds.cn/index.php',
	url:'http://xinwen2.xylnqn.com'
}
//localStorage.removeItem('userId');  
//默认分页
var pagearr = {
	'size' : 10, //默认条数
	'page' : 1 , //默认第一页
};
//默认上拉条件  true 为没有新数据 false 为有更多新数据
var is_dataState = false;
//默认头像 
var headimgurl = {
	headimgurl:'img/index-head.png' 
};
//获取用户id
function getUserId(){
	var user_id = localStorage.getItem('userId');

	if(user_id > 0){
		//验证用户是否合法  存在
//		if(is_User(user_id)){
			return user_id;
//		}

	}
	return false;
}


function public_ajax(data){
	var isbool = false;
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		mui.toast('更新信息失败，请重新登录');
		return ; 
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/upUserInfo?user_id='+user_id,
		dataType:"json",
		data:data,
		async:false,
		success:function(e){
			if(e.code == 1){
				isbool = true;
			}else{
				isbool = false;
//				mui.toast(e.message);
			}
		},
		error:function(e){
			console.log('更新信息失败'+JSON.stringify(e))
		}
	});
	return isbool;
}


//验证用户
function is_User(user_id){
	var authBoolean = false;
	if(typeof user_id == 'undefined'){
		return;
	}
	var data = {
		user_id : user_id,
	}
	$.ajax({
		type : 'get',
		async: false,
		url  : xinwen.url+'/is_User',
		data : data,
		datatype : 'json',
		success : function(res){
			authBoolean =  true;
		},
		error : function(res){
			authBoolean = false;
		}
	});

	return authBoolean;
}

//处理字符串尾数
function str_len(str,len){
	len = len||15;
	if(str.length<=len){
		return str;
	}
	return str.substr(0,len)+'...';
}

//发送刷新通知
function shuaxin(){
	//发送通知
	var arr = ['main.html','my.html'];
	ca.sendNotice(arr,'RefreshInfo',{});
}

//跳转用户信息页面
function user_info(user_id){
	if(!user_id){
		return mui.toast('信息获取失败');
	}
	mui.openWindow({
		url:'geren-ziliao.html',
		id:'geren-ziliao.html',
		extras:{
			user_id:user_id
		},
		createNew:true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}
//跳转企业信息页面
function qiye_info(moderator_id){
	if(!moderator_id){
		return mui.toast('信息获取失败');
	}
	mui.openWindow({
		url:'qiye.html',
		id:'qiye.html',
		extras:{
			moderator_id:moderator_id
		},
		createNew:true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}
//跳转关注列表页面
function openguanzhu(user_id){
	if(!user_id){
		var user_id = localStorage.getItem('userId');
	}
	mui.openWindow({
		url:'wode-guanzhu.html',
		id:'wode-guanzhu.html',
		extras:{
			user_id:user_id
		},
		createNew:true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}

//跳转粉丝列表页面
function openfensi(user_id){
	if(!user_id){
		var user_id = localStorage.getItem('userId');
	}
	mui.openWindow({
		url:'my-fensi.html',
		id:'my-fensi.html',
		extras:{
			user_id:user_id
		},
		createNew:true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}
//打开登录
function openlogin(){
	mui.openWindow({
		url:'login.html',
		id:'login.html',
		show: {
			aniShow: 'none',
		}
//		createNew:true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}
//打开登录
function openlogin1(){
	mui.openWindow({
		url:'login/login.html',
		id:'login/login.html',
		show: {
			aniShow: 'none',
		}
//		createNew:true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}
//加载新闻链接页面
function opennews_info2(news_url,obj){
	mui.openWindow({  //加载新闻连接的页面
		url:'news_info2.html',
		id:'news_info2.html',
//		show:{
//			autoShow:false,
//		},
		styles:{
			zindex: 1,
		},
		extras:{
			news_url:news_url,
			news_arr:obj.attr('alt')
		}
	});
}
//加载广告页
function opennews_info(news_url,obj){
	mui.openWindow({  //加载广告页
		url:'news_info.html',
		id:'news_info.html',
		show:{
//			autoShow:false,
		},
		styles:{
			zindex: 1,
		},
		extras:{
			news_url:news_url,
			news_arr:obj.attr('alt')
		}
	});
}


//点击文章事件
function news_info(obj){
	var news_array = JSON.parse(obj.attr('alt'));
	if(news_array.news_url && news_array.news_url !=''){ //加载新闻连接的页面
//		mui.openWindow({
//			url:news_array.news_url,
//			id:news_array.news_url,
//			show:{
////				autoShow:false,
//			},
//			styles:{
//				popGesture: 'close', //右划关闭
//				titleNView: {
////					autoBackButton: 'true',  //左侧返回按钮
//					buttons:[{
//						text: '返回',
//						float: 'left',
//						onclick: function(){ //关闭
//							plus.webview.getWebviewById(news_array.news_url).close();
//						},
//					}],
//				},
//				zindex: 0 ,
//			}
//		})
//		opennews_info(news_array.news_url,obj)//加载广告页
		opennews_info2(news_array.news_url,obj);//加载新闻连接的页面
//		mui.openWindow({  //加载新闻连接的页面
//			url:'news_info2.html',
//			id:'news_info2.html',
//			show:{
//				autoShow:false,
//			},
//			styles:{
//				zindex: 1,
//				
//			},
//			extras:{
//				news_url:news_array.news_url,
//				news_arr:obj.attr('alt')
//			}
//		});
//		mui.openWindow({  //加载广告页
//			url:'news_info.html',
//			id:'news_info.html',
//			show:{
////				autoShow:false,
//			},
//			styles:{
//				zindex: 1,
//			},
//			extras:{
//				news_url:news_array.news_url,
//				news_arr:obj.attr('alt')
//			}
//		});
	}else{
		mui.toast('该文章还没有连接');	
	}
}















var shares=null,sharewx=null;
// 监听plusready事件  
document.addEventListener( "plusready", function(){
	// 扩展API加载完毕，现在可以正常调用扩展API
	plus.share.getServices( function(s){
		shares = s;
		for(var i in s){
			if('weixin'==s[i].id){
				sharewx=s[i];
			}
		}
		
//		console.log(JSON.stringify(sharewx));
	}, function(e){
		alert( "获取分享服务列表失败："+e.message );
	} );
}, false );


//分享
//function fenxiang(data){
//	if(!data){
//		return ;
//	}
//	
////	alert(xinwen.url+'GuanggaoView?news_id='+data.news_id);
//	castapp.share({
//		shareTitle : data.title || '', //标题
//		shareContent : data.content || '', //内容
//		shareImg : data.shareImg || 'http://xinwen.xylnqn.com/./public/uploads/20180315/0026c49aa15f88178e31a3d2318de6a5.JPG',
////		shareImg : 'http://xinwen.xylnqn.com/./public/uploads/20180315/0026c49aa15f88178e31a3d2318de6a5.JPG',
//		shareLink :  xinwen.url+'/GuanggaoView?news_id='+data.news_id
//	});
////	shareWeixinMessage(data);
//}

//分享到微信 朋友圈
function shareWeixinMessage(data,ex){
//	console.log(JSON.stringify(data));
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('请先登录');
	}
	sharewx.send( {
			href   : xinwen.url+'/GuanggaoView?news_id='+data.news_id+'&user_id='+user_id,				
			title  : data.title,     //标题
			content: data.content, //分享消息的文字内容
			pictures : [data.shareImg],                              //分享消息的图片
			thumbs : [data.shareImg],     //分享消息的缩略图

			extra  :{scene:ex}, //分享类型  朋友圈 好友 qq
		}, function(){
		mui.toast( "分享成功！" );
	}, function(e){
		console.log( "分享失败："+e.message );
	});
}

//点击分享  处理分享内容 调用分享
function onfenxiang(jsstr,type){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('请先登录');
	}
	if(!jsstr){
		return;
	}
	
	var arr = JSON.parse(jsstr);
	var data = {
		news_id:arr.id, //获取文章信息
		get_type : 'share',//类型为分享
		user_id : user_id
	}

	$.ajax({
		type:"get",
		url:xinwen.url+'/getNewsInfo',
		dataType:"json",
		data:data,
		success:function(res){
//			console.log(JSON.stringify(res));
			if(res.code == 1){
				var data = {
					news_id : arr.id,
					title : entityToString(res.data[0]['title']), //设置分享标题
					content : res.data[0]['content'] == '' ? '   分享自「方圆十里」' : entityToString(res.data[0]['content']), 
					shareImg : res.data[0]['w_cover'] == '' ? res.data[0]['headimgurl'] : res.data[0]['w_cover'],//
					shareLink : res.data[0]['news_url'],
				}
//				alert(JSON.stringify(data));
				
				if(!type){
					fenxiang(data);
				}else{
//					console.log(JSON.stringify(data));
					shareWeixinMessage(data,type);
				}
			}
		},
		error:function(res){
			mui.toast('文章获取失败1');
			console.log('文章获取失败');
		}
	});
}
var viewobj = {
	gzlunbotu:function(e){
		if(!e || e.length < 1){
			return '';
		}
		var str = img = img1 = xiabiao = xiabiao1 = '';
		img1 = '<div class="mui-slider-item mui-slider-item-duplicate">'+
					'<a href="'+e[e.length-1]['ggurl']+'"><img src="'+e[e.length-1]['ggimg']+'" /></a>'+
				'</div>';//循环轮播最后一张
		for(var k in e){
			xiabiao1 += '<div class="mui-indicator '+(k == 0 ? 'mui-active' : '')+'"></div>';
			img1 += '<div class="mui-slider-item">'+
						'<a href="'+e[k]['ggurl']+'"><img src="'+e[k]['ggimg']+'" /></a>'+
					'</div>';
		}
		img1 += '<div class="mui-slider-item mui-slider-item-duplicate">'+
					'<a href="'+e[0]['ggurl']+'"><img src="'+e[0]['ggimg']+'" /></a>'+
				'</div>'; //循环轮播第一张
				
		img = '<div class="mui-slider-group lunbotu  mui-slider-loop">'+img1+'</div>'
		xiabiao = '<div class="mui-slider-indicator">'+xiabiao1+'</div>'
		str = '<div class="mui-slider mui-slider1">'+img+xiabiao+'</div>';
		return str;
	},
	guanzhu : function(res){
		if(res['parent']){
			var parent = '<p>'+res['parent']['ban_name']+'</p>';
		}else{
			var parent = '';
		}
		var cover = '';
		if(res['cover']){
			cover = '<img src="'+res['cover']+'" alt="" class="right-img" />';
		}
		var str = $('<li class="mui-media">'+
						'<div class="top-con tp-padding">'+
					
							'<div class=" left-content">'+
								'<div class="content-top">'+
									'<h1>'+res['title']+'</h1>'+
									'<p>'+res['content']+'</p>'+
								'</div>'+
								'<div class="lz clearfix">'+
									'<div class="mui-pull-left imgaa"><img src="'+res['headimgurl']+'" /></div>'+
									'<div class="mui-pull-left">'+
										'<p>'+res['user_name']+'</p>'+
										parent+
									'</div>'+
								'</div>'+
							'</div>'+
							cover+
						'</div>'+
						'<div class="fenxiang clearfix tp-padding">'+
							'<span class="fl">'+
								'分享到'+
							'</span>'+
							'<ul class="clearfix fl">'+
								'<li class="pengyouquan"><img src="img/pengyouquan.png" /></li>'+
								'<li class="weixinhaoyou"><img src="img/weixin.png" /></li>'+
							'</ul>'+
						'</div>'+
					'</li>');	
		if(res['cover']){
			str.find('.left-content').css({"width":"calc(80% - 10px)"});
		}
		str.attr('alt',JSON.stringify(res)).on('tap',function(){ //点击跳转文章详情页面
			news_info($(this));
		});
		str.find('.pengyouquan').attr('alt',JSON.stringify(res)).on('tap',function(e){ //分享 到微信朋友圈
			onfenxiang($(this).attr('alt'),'WXSceneTimeline');
			e.stopPropagation();  //阻止元素冒泡事件
		});
		str.find('.weixinhaoyou').attr('alt',JSON.stringify(res)).on('tap',function(e){ //分享 到微信好友
			onfenxiang($(this).attr('alt'),'WXSceneSession');
			e.stopPropagation();  //阻止元素冒泡事件
		});
		str.find('.lz').attr('alt',res['user_id']).on('tap',function(e){ //点击头像 跳转个人页面
			user_info($(this).attr('alt'));
			e.stopPropagation();  //阻止元素冒泡事件
		});			
		return str;
	},
	zhiding:function(res){
		if(res['parent']){
			var parent = '<p>'+res['parent']['ban_name']+'</p>';
		}else{
			var parent = '';
		}
		var cover = '';
		if(res['cover']){
			cover = '<div style="width: 70px;"><img src="'+res['cover']+'" alt="" class="right-img" /></div>';
//			cover = '<img src="'+res['cover']+'" alt="" class="right-img" />';
		}
		var str = $('<li class="mui-media">'+
						'<div class="top-con tp-padding">'+
					
							'<div class=" left-content">'+
								'<div class="content-top">'+
									'<h1 style="text-indent: 33px;"><span class="zhiding">置顶</span>'+res['title']+'</h1>'+
									'<p>'+res['content']+'</p>'+
								'</div>'+
								'<div class="lz clearfix">'+
									'<div class="mui-pull-left imgaa"><img src="'+res['headimgurl']+'" /></div>'+
									'<div class="mui-pull-left">'+
										'<p>'+res['user_name']+'</p>'+
										parent+
									'</div>'+
								'</div>'+
							'</div>'+
							cover+
						'</div>'+
						'<div class="fenxiang clearfix tp-padding">'+
							'<span class="fl">'+
								'分享到'+
							'</span>'+
							'<ul class="clearfix fl">'+
								'<li class="pengyouquan"><img src="img/pengyouquan.png" /></li>'+
								'<li class="weixinhaoyou"><img src="img/weixin.png" /></li>'+
							'</ul>'+
						'</div>'+
					'</li>');	
		if(res['cover']){
			str.find('.left-content').css({"width":"calc(80% - 10px)"});
		}
		str.attr('alt',JSON.stringify(res)).on('tap',function(){ //点击跳转文章详情页面
			news_info($(this));
		});
		str.find('.pengyouquan').attr('alt',JSON.stringify(res)).on('tap',function(e){ //分享 到微信朋友圈
			onfenxiang($(this).attr('alt'),'WXSceneTimeline');
			e.stopPropagation();  //阻止元素冒泡事件
		});
		str.find('.weixinhaoyou').attr('alt',JSON.stringify(res)).on('tap',function(e){ //分享 到微信好友
			onfenxiang($(this).attr('alt'),'WXSceneSession');
			e.stopPropagation();  //阻止元素冒泡事件
		});
		str.find('.lz').attr('alt',res['user_id']).on('tap',function(e){ //点击头像 跳转个人页面
			user_info($(this).attr('alt'));
			e.stopPropagation();  //阻止元素冒泡事件
		});			
		return str;
	},
	qiye:function(res){
		if(res['is_guanzhu']){
			var div1_span2 = '<p class="yiguanzhu"><span >-&nbsp;</span>关&nbsp;&nbsp;注</p>';
		}else{
			var div1_span2 = '<p class="weiguanzhu"><span >+&nbsp;</span>关&nbsp;&nbsp;注</p>';
		}
		var str = $('<li class="mui-table-view-cell mui-media">'+
						'<div class="top-con tp-padding">'+
							'<img src="'+res['headimgurl']+'" alt="" class="right-img" />'+
							'<div class=" left-content ">'+
								'<div class="content-top tp-padding">'+
									'<h1 style="">'+res['ban_name']+'</h1>'+
									'<p>'+res['jianjie']+'</p>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="edit" style="">'+
									div1_span2+
						'</div> '+
					'</li>');
		return str;
	}
	
};

//html命名实体转换为字符
function entityToString(entity){
  var div=document.createElement('div');
  div.innerHTML=entity;
  var res=div.innerText||div.textContent;
//console.log(entity,'->',res);
  return res;
}

//有没有没看的消息
function is_look(){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return ; 
	}

	$.ajax({
		type:"get",
		url:xinwen.url+'/getNoLook?user_id='+user_id,
		dataType:"json",
//		data:data,
		success:function(res){
//			console.log(JSON.stringify(res));
			if(res.code == 1){
				$('.gz_is_look').css({"display":"inline-block"});
			}
		}	
	})
}
//让所有的圆点隐藏
function his_look(){
	$('.gz_is_look').css({"display":"none"});
}

////检查更新
//function checkupdate(){
//	 plus.runtime.getProperty(plus.runtime.appid, function(inf) {
//      ver = inf.version;
////      console.log(ver);
//      var client;
//      if(mui.os.ios) {client='ios';}
//      else{client='android';}
//          
//      $.ajax({
//		type:"get",
//		url:xinwen.url+'/getversion',
//		dataType:"json",
//		success:function(res){
////			console.log(JSON.stringify(res));
//			if(res.code == 1){
//				var version = res.data;
//				var btnArray = ['立即更新', '暂不更新'];
//				if(version != ver){
//						mui.confirm('最新版本是：V'+version+'，是否立即去体验？', '发现最新版本', btnArray, function(z) {
//                      if (z.index == 0) {
//                      plus.nativeUI.showWaiting("正在更新...");
//                         var url=xinwen.url+'/xinwen.apk';  // 下载文件地址
//							var dtask = plus.downloader.createDownload( url, {}, function ( d, status ) {
//							    if ( status == 200 ) { // 下载成功
//							        var path = d.filename;
//							        console.log(d.filename);
////								        //安装
//							       plus.runtime.install(path);
////							
//							    } else {//下载失败
//							        alert( "Download failed: " + status );  
//							    }
//							    plus.nativeUI.closeWaiting();
//							});
//							dtask.start(); 	
//                      }
//                  });
//				}
//								
//			}
//		}	
//	})
//    
//  })
//}







 