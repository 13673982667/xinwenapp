var item2Show = false,item3Show = false;//子选项卡是否显示标志
document.querySelector('.mui-slider_content').addEventListener('slide', function(event) {

  if (event.detail.slideNumber === 1&&!item2Show) {
    //切换到第二个选项卡
    //根据具体业务，动态获得第二个选项卡内容；
    //改变标志位，下次直接显示
    item2Show = true;
  } else if (event.detail.slideNumber === 2&&!item3Show) {
    //切换到第三个选项卡
    //根据具体业务，动态获得第三个选项卡内容；
    var content = 'san';
    //显示内容
    document.getElementById("item3").innerHTML = content;
    //改变标志位，下次直接显示
    item3Show = true;
  } 
});



//关注页面事件
function guanzhu_show(){
	$('#guanzhu').addClass('active-tab').siblings('span').removeClass('active-tab');
	$('.guanzhu_').show();
	$('.tuijian_').hide();
	_this.refresh(true); //重置上拉刷新
	Fun = getNewsCollectList;
}
//推荐页面事件
function tuijian_show(){
	$('#tuijian').addClass('active-tab').siblings('span').removeClass('active-tab');
	$('.tuijian_').show();
	$('.guanzhu_').hide();
	_this.refresh(true); //重置上拉刷新
	Fun = getNewsTuijianList;
}



$('#guanzhu').on('tap',function(){ //点击关注
	guanzhu_show();
})
$('#tuijian').on('tap',function(){ //点击推荐
	tuijian_show();
})

//getNewsTuijianList(101);

//获取推荐文章
function getNewsTuijianList(user_id){
	if(!user_id){
		var user_id = getUserId();
	}
	pagearr.user_id = user_id;
	$.ajax({
		type : 'get',
		data : pagearr,
		datatype : 'json',
		url : xinwen.url+'/getNewsTuijianList',
		success:function(res){
			console.log(JSON.stringify(res));
			if(res.code == 1){
				pagearr.page += 1; //页数加1
				_this.endPullupToRefresh(false); 
				for(var i=0; i<res.data.length; i++){
					if(res.data[i]['is_guanzhu']){
						var div1_span2 = $('<span class="yiguanzhu fr"></span>').html('已关注');
					}else{
						var div1_span2 = $('<span class="guanzhu fr"></span>').html('关注');
					}
					
					if(res.data[i]['cover']){
						var div3_img = $('<img src="'+res.data[i]['cover']+'" />');
					}
					
					var div1_img = $('<img src="'+res.data[i]['headimgurl']+'" class="touxiang fl" />');
					var div1_span1 = $('<span class="nickname fl"></span>').html(res.data[i]['user_name']);

					
					var div2_h1 = $('<h1></h1>').html(res.data[i]['title']);
					
					
					
					var div1 = $('<div class="person tp-padding clearfix"></div>').append(div1_img,div1_span1,div1_span2);
					var div2 = $('<div class="news tp-padding"></div>').append(div2_h1);
					var div3 = $('<div class="news-png"></div>').append(div3_img);
					
					var li = $('<li></li>').append(div1,div2,div3);
					
					$('.tuijian_ ul').append(li);
					
				}
			}else{
				console.log('获取推荐文章失败了');
				mui.toast(res.message);
				_this.endPullupToRefresh(true); 
			}
		},
		error:function(res){
			console.log('获取推荐文章失败');
			_this.endPullupToRefresh(true); 
	//					alert(res);
		}
	});
}


//获取关注文章
function getNewsCollectList(user_id){
	if(!user_id){
		var user_id = getUserId();
	}
	pagearr.user_id = user_id;
	$.ajax({
		type : 'get',
		data : pagearr,
		datatype : 'json',
		url : xinwen.url+'/getNewsCollectList',
		success:function(res){
			console.log(JSON.stringify(res));
			if(res.code == 1){
				pagearr.page += 1; //页数加1
				for(var i=0; i<res.data.length; i++){
					_this.endPullupToRefresh(true); 
//					if(res.data[i]['is_guanzhu']){
//						var div1_span2 = $('<span class="yiguanzhu fr"></span>').html('已关注');
//					}else{
//						var div1_span2 = $('<span class="guanzhu fr"></span>').html('关注');
//					}
//					
//					if(res.data[i]['cover']){
//						var div3_img = $('<img src="'+res.data[i]['cover']+'" />');
//					}
//					
//					var div1_img = $('<img src="'+res.data[i]['headimgurl']+'" class="touxiang fl" />');
//					var div1_span1 = $('<span class="nickname fl"></span>').html(res.data[i]['user_name']);
//					var div1_span2 = $('<span class="yiguanzhu fr"></span>').html('已关注');
//					
//					var div2_h1 = $('<h1></h1>').html(res.data[i]['title']);
//					
//					
//					
//					var div1 = $('<div class="person tp-padding clearfix"></div>').append(div1_img,div1_span1,div1_span2);
//					var div2 = $('<div class="news tp-padding"></div>').append(div2_h1);
//					var div3 = $('<div class="news-png"></div>').append(div3_img);
//					
//					var li = $('<li></li>').append(div1,div2,div3);
//					
//					$('.guanzhu_ ul').append(li);
				}
			}else{
				mui.toast(res.message);
			}
		},
		error:function(res){
			console.log('获取推荐文章失败');
	//					alert(res);
		}
	});
}