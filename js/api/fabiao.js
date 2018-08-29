
//var lianjiecover = '';

//console.log(xinwen.url+'/upload_file_fengmian');
//dongyi.closeWaiting();
$('#xuanze').on('tap',function(e){  
//	$('#file').click();
})
//封面
$('.cover').on('tap',function(e){  
//	$('#file').click();
	getPhoto();
	/**
	 * actionSheet
	 * arr里面的title为要弹出的选项内容 
	 * 参数为json
	 * succFn 成功回调 
	 * errFn  失败回调
	 */
//	var arr = ['照相机','相册'];
//	castapp.actionSheet(arr,{
//		succFn:function(data){
////			console.log(data);
////			alert(data);
////			console.log(JSON.stringify(data))
//		        //手机上的图片路径
//		        $('#news_cover').attr({'src':data});
////			alert(data);
//			//上传后的图片路径
////			console.log('http://peipao.dongyixueyuan.com/'+data);
//		},
//		errFn:function(data){
//			alert(data);
//		},
//		//是否开启上传
//		isUpload:true,
//		//上传地址
//		uploadUrl:xinwen.url+'/upload_file_fengmian',
////		uploadUrl:"http://tzx.zzfyky.com/head_img/upload_file.php",
//	})
});

//添加标题
$('#add_title').on('tap',function(e){    
	e.stopPropagation();  //阻止冒泡
	var value = $(this).html() == '点击设置标题' ? '' : $(this).html();
	mui.openWindow({
		url:'fabiao_title.html',
		id:'fabiao_title.html',
		popGesture: 'close',
		show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
	    },
	    extras:{
	    	value:value,
	    }
	});
});
//添加内容
$('.news_content').on('tap',function(){
//		e.stopPropagation();  //阻止冒泡
	var content = $(this).html() == '添加原文简介'? '' : $(this).html();
//alert($(this).html());return
	mui.openWindow({
		url:'fabiao_content.html',
		id:'fabiao_content.html',
		popGesture: 'close',
		show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
	    },
	    extras:{
			content:content,
		}
	});
});
//添加原文链接
$('#news_url').on('tap',function(){
//		e.stopPropagation();  //阻止冒泡
	opennews_url();
});
function opennews_url(){
	mui.openWindow({
		url:'fabiao_url.html',
		id:'fabiao_url.html',
		popGesture: 'close',
		show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
	    },
	    
	});
}
//添加原文链接2
//$('.lianjie2_content').on('tap',function(){
////		e.stopPropagation();  //阻止冒泡
//	mui.openWindow({
//		url:'fabiao_url.html',
//		id:'fabiao_url.html',
//		popGesture: 'close',
//		extras:{class:'lianjie2_content'},
//		show:{
//	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
//	      aniShow:'slide-in-bottom',//页面显示动画，默认为”slide-in-right“；
//	    },
//	});
//});

//添加链接1 图片
//$('.lianjie1').on('tap',function(){
//	var arr = ['照相机','相册'];
//	castapp.actionSheet(arr,{
//		succFn:function(data){
//	        //手机上的图片路径
//	        $('.lianjie_img').css({"display":"block"}).find('img').attr({'src':data});
//		},
//		errFn:function(data){
//			//alert(data);
//		},
//		//是否开启上传
//		isUpload:true,
//		//上传地址
//		uploadUrl:xinwen.url+'/upload_file_fengmian',
//	})
//});

//链接2 加号
//$('.lianjie2').on('tap',function(){
//	var arr = ['照相机','相册'];
//	castapp.actionSheet(arr,{
//		succFn:function(data){
//	        //手机上的图片路径
//	        $('.lianjie2_img').css({"display":"block"}).find('img').attr({'src':data});
//	        $('.lianjie2-content').slideDown('slow');
//		},
//		errFn:function(data){
//			//alert(data);
//		},
//		//是否开启上传
//		isUpload:true,
//		//上传地址
//		uploadUrl:xinwen.url+'/upload_file_fengmian',
//	})
//});

//
////提交
$('#onsubmit').on('tap',function(){
//function onsub(fengmian){
	var user_id = getUserId();
	if(user_id == null || !user_id){
		return mui.toast('请登陆！');
	}
//	console.log($('#news_cover').attr("src"));
//	alert($('.cover>img').attr("src"));
	var data = {
//		'news_cover'   : $('#news_cover').attr("src") == 'img/fengmian-bg.png' ? '' : $('#news_cover').attr("src"),
		'news_cover'   : $('.cover>img').attr("src") == 'img/add-img.png' ? '' : $('.cover>img').attr("src"),
		'news_content' : $('.news_content').html()  == '添加原文简介' ? '' : $('.news_content').html(),
		'news_url'     : $('#news_url').html() == '添加原文链接' ? '' : $('#news_url').html(),
		'news_title'   : $('#add_title').html(),
		'user_id'      : user_id,
		'is_look'      : $('input[name="is_look"]:checked').val(),
	};
	if(data.news_content == ''){
//		return mui.toast('亲，填写文章内容哦!');
	}
	if(data.news_title == '点击设置标题'){
		return mui.toast('亲，填写文章标题哦!！');
	}
	if(data.news_url == ''){
		return mui.toast('亲，填写链接哦!！');
	}
//	alert(data.news_cover);
	//有没有链接
//	if($('.lianjie_img').css('display') == 'block'){
//		data.lianjie = $('.lianjie_img').find('img').attr('src');
//		data.lianjie_content = $('#news_url').html() == '添加原文链接' ? '' : $('#news_url').html();
//	}
	
	//有没有链接2
//	if($('.lianjie2-content').css('display') == 'block'){
//		data.lianjie2 = $('.lianjie2_img').find('img').attr('src');
//		data.lianjie2_content = $('.lianjie2_content').html() == '添加原文链接' ? '' : $('.lianjie2_content').html();
//	}
	$.ajax({
		type : 'post',
		url  : xinwen.url+'/news_add',
		data : data,
		datatype : 'json',
		success : function(res){
			if(res.code == 1){
				//清空所有
				$('.news_content').html('添加原文简介');
				$('#add_title').html('点击设置标题');
				$('.cover>img').attr('src','img/add-img.png');
//				$('#news_cover').attr("src",'img/fengmian-bg.png');
				$('#news_url').html('添加原文链接');
//				$('.photo-clip-rotateLayer>img').attr("src",'img/fengmian-bg.png'); //剪裁插件的样式
				
				shuaxin(); //通知其他页面刷新
				var arr = [plus.runtime.appid]; //通知  nav-tab 切换页面
				ca.sendNotice(arr,'fabu_ok',{});
				mui.toast('发布成功');
			}else if(res.code == -2){
				mui.toast(res.message);
//				setTimeout(function(){
//						mui.prompt(' ','请输入手机号','绑定手机',['取消','确定'],function(e){
//							if (e.index == 1) {
//								value = e.value;
//								if(!(/^1[34578]\d{9}$/.test(value))){
//									return mui.toast('手机号格式错误');
//								}
//								var data = {
//									phone:value
//								};
//								if(public_ajax(data)){
//									mui.toast('绑定成功');
//								}
//							}
//						});
//				},0);
				
			}else{
				mui.toast(res.message);
			}
		},
		error : function(res){
//			console.log(JSON.stringify(res));
			mui.toast('错误');
		}
	});
//}
});

//标题
window.addEventListener('fabiao-back',function(e){
	$('#add_title').html(e.detail.title);
});
//原文简介
window.addEventListener('fabiao-content-back',function(e){
	$('.news_content').html(e.detail.content);
});
//添加链接
window.addEventListener('fabiao-url-back',function(e){
	var classname = e.detail.classname;
	if(classname){
		$('.'+classname).html(e.detail.news_url);
		return;
	}
	if(e.detail.title){
		$('#add_title').html(e.detail.title);
	}
	$('#news_url').html(e.detail.news_url);
});


//删除
$('.cancle').on('tap',function(){
	$(this).siblings('div.text').find('textarea').val('');
});

//链接2删除
$('.cancle2').on('tap',function(){
	$('.lianjie2-content').css({"display":"none"});
	$('.lianjie2_content').html('添加原文链接');
});

//编辑封面
//$('.edit').on('tap',function(e){
//	$('.bianji').css('display','block')
//	mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1);//1毫秒滚动到顶
//	$('.bianji').animate({"top":0},500);
////	e.stopPropagation();
////	mui.openWindow({
////		url:'imgup.html',
////		id:'imgup.html'
////	})
//});

//编辑退出
//$('.bianjituichu').on('tap',function(e){
//	$('#news_cover').attr({'src':$('#jiancai>img').attr('src')});
//	$('.bianji').animate({"top":plus.display.resolutionHeight},500,'linear',function(){$('.bianji').css('display','none')});
//	mui('.mui-scroll-wrapper').scroll().scrollTo(0,0);
//})

//
//var body_width = $('body').width();
//var body_height = $('body').height();
////alert((body_width * (9/16)));
//setTimeout(function(){
//	$('#jian').photoClip({
//		width: body_width + 5,
//		height: (body_width * (9/16))+10,
//		file: "#file",
//		view: "#hit",
//		ok: "#onsubmit",
//		loadStart: function (e) {
//			console.log("照片读取中"+JSON.stringify(e));
//		},
//		loadComplete: function (e) {
//			console.log("照片读取完成"+JSON.stringify(e));
//	//		$('#news_cover').attr({'src':e});
//			_this = this;
//		},
//		clipFinish: function (e) {
//	//		console.log('dataURL'+JSON.stringify(e));
//	//		$('#jiancai>img').attr('src',e);
//			var fengmian = e;
//			onsub(e);
//		}
//	})
//},500);

//
//$("#clipArea").on("touchstart", function(e) {
//  e.preventDefault();
//  startX = e.originalEvent.changedTouches[0].pageX,
//  startY = e.originalEvent.changedTouches[0].pageY;
//});
//$('#clipArea').on("touchmove",function(){ //cui
//	$('.lazy_cover,.lazy_tip').show();
//	clipImg();
//});

//底部选项卡被点击通知
window.addEventListener('tap_',function(event){
	//通过event.detail可获得传进来的参数内容
//	opennews_url(); //默认弹出添加链接界面
})
//选择图片
function getPhoto(){
	/**
	 * actionSheet
	 * arr里面的title为要弹出的选项内容 
	 * 参数为json
	 * succFn 成功回调 
	 * errFn  失败回调
	 */
	var arr = ['照相机','相册'];
	castapp.actionSheet(arr,{
		succFn:function(data){
//			console.log(data);
//			alert(data);
//			console.log(JSON.stringify(data))
		        //手机上的图片路径
//		        $('#news_cover').attr({'src':data});
				$('.cover').css({'display':'block'});
		        $('.cover>img').attr({'src':data});
//			alert(data);
			//上传后的图片路径
//			console.log('http://peipao.dongyixueyuan.com/'+data);
		},
		errFn:function(data){
			mui.toast('超时！换个小点的封面试试');
		},
		//是否开启上传
		isUpload:true,
		//上传地址
		uploadUrl:xinwen.url+'/upload_file_fengmian_jiancai',
//		uploadUrl:"http://tzx.zzfyky.com/head_img/upload_file.php",
	})
}
//删除封面
$('.cover').on('longtap',function(){
	var btnArray = [{title:"删除"}];
	plus.nativeUI.actionSheet( {
		cancel:"取消",
		buttons:btnArray
	}, function(e){
		var index = e.index;
		if(index == 1){
			$('.cover').find('img').attr('src','img/add-img.png');
		}
	});
});




