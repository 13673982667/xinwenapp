
var fresh = function(){
//最新页面数据加载
//(function(){
var DropLoad = {
	obj: null, //dropload实例化对象
	init: function() {
		$('#content2').dropload({
			//scrollArea将被绑定scroll事件，需要设置为真正滚动的元素,默认为调用方法的元素对象，这里不需要改变。
			//scrollArea : window, 
			touchArea:$("#content2"),
			loadUpFn: function(me) {
				console.log('UP----LOAD');
				DropLoad.obj = me;
//				alert(3333)
				//上拉刷新获取第0页，以-1为刷新标识
				DATA.get(0, true);
			},
			loadDownFn: function(me) {
				console.log('DOWN----LOAD');
				DropLoad.obj = me;
				DATA.get(DATA.curPage);
				//不能直接调用resetload方法，否则将多次加载数据
			},
			// 提前加载距离
			threshold: 50
		});
	}
}
var DATA = {
	//		  param:null,//数据请求参数
	curPage: 0, //当前页面
	pageSize:10, //默认每页数据个数
	//获取数据 page默认为0 如果-1表示刷新
	/*
	 * @param page[Number] 获取第几页数据
	 * @param refresh[Boolean] 是否是刷新页面数据 
	 */
	get: function(page, refresh) {
		var _getPage = page || 0;
		$.ajax({
			type: "post",
			url: jl.url + 'r=live/index&page_size=10&page=' + _getPage,
			dataType: "json",
			cache: false,
			success: function(data) {
				if(data && data.code === 0) {
					data = data.data;
					DATA.curPage = _getPage;
					DATA.show(data, refresh);
				} else {
					tip(data['code'] + '请求数据异常');
				}
				DropLoad.obj && DropLoad.obj.resetload();
			}
		});
	},
	//渲染数据
	show: function(data, refresh) {
		var time = Math.floor(new Date().getTime()/1000);
		var arr = [];
		data = data.data;
		for(i in data){
			if(time - data[i].create_on > 5){
				arr.push(data[i]);
			}
		}
		if(data && arr.length > 0) {
			$('.networking2').hide();
			var s = '';
			var countNum = null;
			for(i in arr) {
				var _d = arr[i];
				countNum = _d.count >= 10000 ? countNum = _d.count / 10000 + "万" : countNum = _d.count;
					s += '<div class="live_coach" attr="' + _d.url + '" stream="' + _d.num + '"headImg="' + _d.imgnail + '" zhubo_id="' + _d.user_id + '"zb_url="' + _d['urlweb'] + '" type="' + _d.type + '">' +
								'<img onload="jl.imgAnim(this)" src="' + _d.thumb + '"/>' +
								'<i class="coach_status">直播</i>' +
								'<div class="mask1" >'+
									'<i class="nickname">' + _d.username + '</i>' +
//									'<i class="td"></i>'+
									'<i class="watch_num"><i class="td"></i>' + countNum + '人</i>' +
								'</div>'+
								'<p class="title test-ellipsis"><a class="iconfont icon-bf"></a>' + _d.name + '</p>' +
								'</div>';
			}
			if(refresh) {
				$("#dataList2").html(s);
			} else {
				$("#dataList2").append(s);
			}
			var Width = $(".live_coach img").width();
			$(".live_coach img").height(Width);
			$(".live_coach").height(Width);
			$(".live_coach p").css("top", Width + 2 + "px");
			//标识是否还有更多数据可以加载
			if(data.length < this.pageSize) {
				DropLoad.obj.noData(); //设置了noData之后不会再执行loadDownFn
			} else {
				DropLoad.obj.hasData();
				DATA.curPage++; //还有更多数据，则将curPage加1
			}
		} else {
			if(DATA.curPage == 0) {
				$("#dataList2").html(" ");
				this.noData(); //设置了noData之后不会再执行loadDownFn
			}
			DropLoad.obj.noData();
		}
	},
	//没有任何关注数据 
	noData: function() {
		$('.networking2').show();
	},
};

DropLoad.init();

		// 点击视频接口
		$("#dataList2").on('click', '.type', function() {
		  //plus.navigator.setFullscreen( true );
			_this = $(this);
			zb_cover = _this.find('.cover').attr('src');
			hisObj = {};

			//看直播地址
			zb_url = _this.attr('zb_url');
			//横竖屏
			ifLandscape = _this.attr('type');
			hisObj.user_id = my_user_id;
			hisObj.course_id = 0;
			hisObj.coach_id = $(this).attr('zhubo_id');
			hisObj.type = 0;
			
			streamNum = $(this).attr('stream');
//			var liveStatus;//判断主播是否在直播
			
			liveAjax();
			//	        clicked("live/live.html");

			return false;
		});
//	}
//})()


}


var streamNum;
var _this;
var hisObj;
var liveStatus;//判断主播是否在直播
var zb_url;
var zb_cover;//主播封面图
function liveAjax() {
	$.ajax({
		type: "post",
		url: jl.url + "r=live/get-info",
		dataType: 'json',
		timeout: 5000,
		data: {
			stream: streamNum,
			start:0,
			end:7,
		},
		success: function(results) {
			liveStatus = results.status;
			//	      			//观看人数、和房间号steam的传递
			var gkCount = parseInt(_this.find("footer .watch_num").text());
			//	      			//主播信息传递
			var nickname = _this.find("footer .name").text();
			var headImg = _this.attr('headImg');
			var zhubo_id = _this.attr('zhubo_id');
			var imgUrl = '';
			
			for(var i = 0; i < results.data.length; i++) {
				if(results.data[i].id == zhubo_id) continue;
				imgUrl += results.data[i].id + '__' + results.data[i].img + ',';
			}
			imgUrl = imgUrl.substring(0, imgUrl.length - 1);
			
			if(liveStatus == 1){
				//直播观看历史、用户观看直播，向后台传数据
				$.ajax({
					type: "post",
					url: jl.url + "r=live/my-history" + md5(hisObj),
					dataType: 'json',
					data: hisObj,
					success: function(results) {
	//							console.log(results);
					},
					error: function(e) {
						console.log(e)
					}
				});
				
			}
			
			//由于延迟，用于判断是否在直播
			if(liveStatus == 1) {
				liveWV.show('pop-in');
				//把观众信息传到直播间
				liveWV.evalJS('sendData.audience("' + imgUrl + '");' +
					'sendData.showCount("' + gkCount + ',' + streamNum + '");' +
					'sendData.zhuboInfo("' + nickname + ',' + headImg + ',' + zhubo_id + ',' + zb_cover + '");' +
					'sendData.addEventTest();' +
					'sendData.judgeFollow(1,null);' +
					'sendData.defaults();' +
					'sendData.loading("' + zb_url + '","' + ifLandscape + '");' +
					'sendData.balance();');
			} else {
				clicked('personal/set_up/liveEnd.html#'+results.total+','+zhubo_id);
			}
		},
		error: function(e) {
			console.log(e);
			alert('网络错误，请检查网络设置。')
		}
	});
}

//关注页面数据加载
var guanzhu = function(){
 (function(){
var DropLoad = {
	obj: null, //dropload实例化对象
	init: function() {
		$('#content3').dropload({
			//scrollArea将被绑定scroll事件，需要设置为真正滚动的元素,默认为调用方法的元素对象，这里不需要改变。
			//scrollArea : window, 
			touchArea:$("#content3"),
			loadUpFn: function(me) {
				console.log('UP----LOAD');
				DropLoad.obj = me;
//				alert(3333)
				//上拉刷新获取第0页，以-1为刷新标识
				DATA.get(0, true);
			},
			loadDownFn: function(me) {
				console.log('DOWN----LOAD');
				DropLoad.obj = me;
				DATA.get(DATA.curPage);
				//不能直接调用resetload方法，否则将多次加载数据
			},
			// 提前加载距离
			threshold: 50
		});
	}
}
var DATA = {
	param:null,//数据请求参数
	curPage: 0, //当前页面
	pageSize:10, //默认每页数据个数
	//获取数据 page默认为0 如果-1表示刷新
	/*
	 * @param page[Number] 获取第几页数据
	 * @param refresh[Boolean] 是否是刷新页面数据 
	 */
	get: function(page, refresh) {
		var _getPage = page || 0;
		$.ajax({
			type: "post",
			url: jl.url + 'r=live/att-coach&page_size=10&page=' + _getPage + md5(DATA.param),
			dataType: "json",
			data:DATA.param,
			cache: false,
			success: function(data) {
				console.log("ffff")
				console.log(data)
				if(data && data.code === 0) {
					data = data.data;
					DATA.curPage = _getPage;
					DATA.show(data, refresh);
				} else {
					tip(data['code'] + '请求数据异常');
				}
				DropLoad.obj && DropLoad.obj.resetload();
			}
		});
	},
	//渲染数据
	show: function(data, refresh) {
		console.log(data)
		var time = Math.floor(new Date().getTime()/1000);
		var arr = [];
		data = data.list;
		for(i in data){
			if(time - data[i].create_on > 5){
				arr.push(data[i]);
			}
		}
		if(data && arr.length > 0) {
				$('.networking3').hide();
			var s = '';
			var countNum = null;
			for(i in arr) {
				var _d = arr[i];
				countNum = _d.count >= 10000 ? countNum = _d.count / 10000 + "万" : countNum = _d.count;
					s += '<div class="type" attr="' + _d.url + '" stream="' + _d.num +'"headImg="' + _d.img + '" zhubo_id="' + _d.user_id + '"zb_url="' + _d['urlweb'] + '" type="' + _d.type + '">'+
									'<i class="coach_status top_live">直播</i>'+
									'<img src="'+_d.thumb+'" />'+
									'<footer class="coach_msg">'+
										'<div class="coach_left">'+
											'<p class="name test-ellipsis">'+_d.username+'</p>'+
											'<p class="coach_title test-ellipsis">'+_d.name+'</p>'+
										'</div>'+
										'<div class="coach_right">'+
											'<span class="watch_num">'+countNum+'</span>'+
											'<span>人观看</span>'+
										'</div>'+
									'</footer>'+
								'</div>'
			}
			if(refresh) {
				$("#dataList3").html(s);
			} else {
				$("#dataList3").append(s);
			}
//			var Width = $(".live_coach img").width();
//			$(".live_coach img").height(Width);
//			$(".live_coach").height(Width);
//			$(".live_coach p").css("top", Width + 2 + "px");
			//标识是否还有更多数据可以加载
			if(data.length < this.pageSize) {
				DropLoad.obj.noData(); //设置了noData之后不会再执行loadDownFn
			} else {
				DropLoad.obj.hasData();
				DATA.curPage++; //还有更多数据，则将curPage加1
			}
		} else {
			if(DATA.curPage == 0) {
				$("#dataList3").html(" ");
				this.noData(); //设置了noData之后不会再执行loadDownFn
			}
			DropLoad.obj.noData();
		}
	},
	//没有任何关注数据 
	noData: function() {
		$('.networking3').show();
	},
};
var user_id = jl.UserId();
DATA.param = {user_id:user_id};
DropLoad.init();

		// 点击视频接口
		$("#dataList3").on('click', '.type', function() {
		  //plus.navigator.setFullscreen( true );
			_this = $(this);
			zb_cover = _this.find('.cover').attr('src');
			hisObj = {};

			//看直播地址
			zb_url = _this.attr('zb_url');
			//横竖屏
			ifLandscape = _this.attr('type');
			hisObj.user_id = my_user_id;
			hisObj.course_id = 0;
			hisObj.coach_id = $(this).attr('zhubo_id');
			hisObj.type = 0;
			
			streamNum = $(this).attr('stream');
//			var liveStatus;//判断主播是否在直播
			
			liveAjax();
			//	        clicked("live/live.html");

			return false;
		});
})()
}