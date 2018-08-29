
var _obj;






$('.jiahao').on('tap',function(){
	
	addggimg($(this));
	
});

//判断有没有超过可允许添加的范围
function check_length(){
	var obj_len = $('.tianjia').length;
	if(obj_len > guanggaoleng){
		return false;
	}
	return true;
}

//添加广告图片
function addggimg(obj){
	var _self = obj;
	if(!moderator_id){
		return mui.toast('出错了，刷新试试');
	}
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('出错了，刷新试试');
	}
	if(!check_length()){
		return mui.toast('广告数量超过限制');
	}
	//添加广告图片
	var arr = ['照相机', '相册'];
	castapp.actionSheet(arr, {
		succFn: function(data) {
			//将添加的图片保存数据库
			var data = {
				moderator_id:moderator_id,
				ggimg : data
			}
			console.log(xinwen.url+'/addguanggaoimg?user_id='+user_id);
			$.ajax({
				type:"get",
				url:xinwen.url+'/addguanggaoimg?user_id='+user_id,
				dataType:"json",
				data:data,
				async:false,
				success:function(e){
					if(e.code == 1){
						var res = {
							id:e.data,
							ggimg:data.ggimg,
						}
						
						var str = view(res);
						var jiahao = jiahaoview();
						_self.after(str,jiahao);
						str.slideDown('slow');//添加动画
					}else if(e.code == 2){
						mui.toast('添加的广告数量超过限制');
					}else{
						console.log('---上传广告图片失败---');
						console.log(JSON.stringify(e));
					}
				}
			});
			
		},
		errFn: function(data) {
			return mui.toast('添加失败');
		},
		//是否开启上传
		isUpload: true,
		//上传地址
		uploadUrl: xinwen.url + '/upload_file_fengmian',
	})
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
					var str = view(e.data[x]);
					var jiahao = jiahaoview();
					$('.jiahao1').after(str,jiahao);
					str.css('display','block');//添加动画
				}
//				
			}
		}
	});
}

//渲染页面
function view(res){
	if(!res){
		return;
	}
	var str = $('<div class="tianjia tp-margin" style="display:none;">'+
			'<img class="cancle" src="img/cancle.png" alt="'+res.id+'"/>'+
			'<div class="mui-input-row text " style=" height: 100%;">'+
				'<div class="lianjie_img fl" alt="'+res.id+'" ><img src="'+res.ggimg+'" width="100%" height="100%"/></div>'+
				'<div class="news_url fl" alt="'+res.id+'" >'+(res.ggurl ? res.ggurl : '添加广告链接')+'</div>'+
			'</div>'+
		'</div>'
		 );
		str.find('.cancle').on('tap',function(){
		 	delguanggao($(this));
		}); //添加删除事件
		str.find('.lianjie_img').on('tap',function(){
		 	upggimg($(this));
		}); //修改图片
		str.find('.news_url').on('tap',function(){
		 	addggurl($(this));
		}); //添加广告链接
		return str;
}

//加号 内容
function jiahaoview(){
	 var jiahao = $('<div class="jiahao">'+
			'<img src="img/jiahao.png" />'+
		'</div>').on('tap',function(){
			addggimg($(this));
		});
	return jiahao;
}

//删除
function delguanggao(obj){
	var ggid = obj.attr('alt');
	if(!ggid){
		return ;
	}
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('出错了，刷新试试');
	}
	mui.confirm('删除后将无法显示','确定删除吗？',['取消','确定'],function(e){
		if(e.index == 1){
			var data = {
				ggid:ggid
			}
			$.ajax({
				type:"get",
				url:xinwen.url+'/delguanggao?user_id='+user_id,
				dataType:"json",
				data:data,
				success:function(res){
					if(res.code == 1){
						obj.parent('.tianjia').next('.jiahao').remove();
						obj.parent('.tianjia').remove();
						mui.toast('删除成功');
					}
				}
			});
		}
	})
}
//修改图片
function upggimg(obj){
	var arr = ['照相机', '相册'];
	castapp.actionSheet(arr, {
		succFn: function(data) {
			var ggid = obj.attr('alt');
			if(!ggid){
				return mui.toast('修改失败');
			}
			var user_id = localStorage.getItem('userId');
			if(!user_id){
				return mui.toast('出错了，刷新试试');
			}
			var data = {
				ggid:ggid,
				ggimg:data
			}
			$.ajax({
				type:"get",
				url:xinwen.url+'/upggimg?user_id='+user_id,
				dataType:"json",
				data:data,
				success:function(res){
					console.log(JSON.stringify(res));
					if(res.code == 1){
						obj.find('img').attr('src',data.ggimg);
						mui.toast('修改成功');
					}
				}
			});
		},
		errFn: function(data) {
			return mui.toast('添加失败');
		},
		//是否开启上传
		isUpload: true,
		//上传地址
		uploadUrl: xinwen.url + '/upload_file_fengmian',
	})
}
//添加广告链接
function addggurl(obj){ 
	var content = obj.html() == '添加广告链接' ? '' : obj.html();
	_obj = obj;
	mui.openWindow({
		url:'addtext.html',
		id:'addtext.html',
		show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
	    },
	    extras:{
			content:content,
			title:'添加广告链接',
			huidiao:'addtextback',
		}
	});
}

//另一个页面监听接收通知  修改广告链接
window.addEventListener('addtextback',function(event){
	var content = event.detail.content;
	var data = {
		ggurl:content,
		ggid:_obj.attr('alt')
	}
	upggurl(data,_obj);
//	_obj.html(content);
})

//修改广告链接
function upggurl(data,obj){
	if(!data){
		return;
	}
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return mui.toast('出错了，刷新试试');
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/upggurl?user_id='+user_id,
		dataType:"json",
		data:data,
		success:function(res){
			console.log(JSON.stringify(res));
			if(res.code == 1){
				obj.html(data.ggurl);
				mui.toast('修改成功');
			}else{
				mui.toast('失败');
			}
		}
	});
}
