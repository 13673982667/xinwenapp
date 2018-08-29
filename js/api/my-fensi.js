/**
 * 粉丝相关
 */

//
//function getFansInfo(user_id){  //获取粉丝信息
//	$.ajax({
//		type : 'get',
////		data : pagearr,  
//		datatype : 'json',
//		url : xinwen.url+'/getFansInfo?user_id='+user_id,
//		success:function(res){
////			console.log(JSON.stringify(res));
//			if(res.code == 1){
//				pagearr.page += 1; //页数加1
//				for(var i=0; i<res.data.length; i++){
//					if(res.data[i]['user_id'] == localStorage.getItem('userId')){
//						var span = $('');
//					}else if(res.data[i]['is_collect'] == 1){
//						var span = $('<span class="fr yiguanzhu">已关注</span>'); 
//					}else{
//						var span = $('<span class="fr weiguanzhu">关注</span>');
//					}
//
//					span = span.attr('alt',res.data[i]['user_id']).on('tap',function(e){
//							e.stopPropagation();
//							onCollect($(this));
//						});; //给id  给点击事件
//					if(res.data[i]['headimgurl'] == ''){ //设置默认头像
//						res.data[i]['headimgurl'] = headimgurl.headimgurl;
//					}
//
//					var img = $('<img src="'+res.data[i]['headimgurl']+'" class="head fl" />');
//					var h3 = $('<h3 class="nickname">'+res.data[i]['user_name']+'</h3>');
//					var p = $('<p class="qianming">'+res.data[i]['personality']+'</p>');
//					var div = $('<div class="fl desc"></div>').append(h3,p);
//					var li = $("<li></li>").append(img,div,span);
//					li.attr('alt',res.data[i]['user_id']).on('tap',function(e){
//							user_info($(this).attr('alt'));
//						});; //给id  给点击事件
//					$(".cache").before(li);
//				}
//			}else{
//				mui.toast('还没有粉丝哦!');
//			}
//		},
//		error:function(res){
//			console.log('获取粉丝失败');
//	//					alert(res);
//		}
//	});
//}
//localStorage.removeItem('userId')

//点击关注  或者 取消关注
function onCollect(obj){
	var collect_id = $(obj).attr('alt');
	var user_id = localStorage.getItem('userId');
	if(!collect_id || !user_id){
		return mui.toast('参数错误，刷新试试');
	}
	data = {
		user_id : user_id,
		collect_id : collect_id,
	}
	console.log(JSON.stringify(data));
	$.ajax({
		data : data,
		type : 'get',
		datatype : 'json',
		url : xinwen.url+'/onCollect',
		success : function(res){ // -1取消关注  1关注
//			console.log(JSON.stringify(res))
			if(res.code == 1){
				mui.toast('关注成功');
				$(obj).addClass('yiguanzhu').removeClass('weiguanzhu').html('已关注');
			}else if(res.code == -1){
				mui.toast('已取消');
				$(obj).addClass('weiguanzhu').removeClass('yiguanzhu').html('关注');
			}else{
				mui.toast(res.message);
			}
		},
		error : function(res){
			mui.toast('关注失败');
		}
	});
}


function getFansInfo(user_id){  //获取粉丝信息（获取企业粉丝）
	$.ajax({
		type : 'get',
//		data : pagearr,  
		datatype : 'json',
		url : xinwen.url+'/getMfansInfo?user_id='+user_id,
		success:function(res){
//			console.log(JSON.stringify(res));
			if(res.code == 1){
				pagearr.page += 1; //页数加1
				for(var i=0; i<res.data.length; i++){
					if(res.data[i]['user_id'] == localStorage.getItem('userId')){
						var span = $('');
					}else if(res.data[i]['is_collect'] == 1){
						var span = $('<span class="fr yiguanzhu">已关注</span>'); 
					}else{
						var span = $('<span class="fr weiguanzhu">关注</span>');
					}
					span = $('');
					span = span.attr('alt',res.data[i]['user_id']).on('tap',function(e){
							e.stopPropagation();
							onCollect($(this));
						});; //给id  给点击事件
					if(res.data[i]['headimgurl'] == ''){ //设置默认头像
						res.data[i]['headimgurl'] = headimgurl.headimgurl;
					}

					var img = $('<img src="'+res.data[i]['headimgurl']+'" class="head fl" />');
					var h3 = $('<h3 class="nickname">'+res.data[i]['user_name']+'</h3>');
					var p = $('<p class="qianming">'+res.data[i]['personality']+'</p>');
					var div = $('<div class="fl desc"></div>').append(h3,p);
					var li = $("<li></li>").append(img,div,span);
//					li.attr('alt',res.data[i]['user_id']).on('tap',function(e){
//							user_info($(this).attr('alt'));
//						});; //给id  给点击事件
					$(".cache").before(li);
				}
			}else{
				mui.toast('还没有粉丝哦!');
			}
		},
		error:function(res){
//			console.log(JSON.stringify(res));
			console.log('获取粉丝失败');
	//					alert(res);
		}
	});
}


