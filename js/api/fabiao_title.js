
mui.plusReady(function(){
	plus.webview.currentWebview().setStyle({
	    softinputMode: "adjustResize"  // 弹出软键盘时自动改变webview的高度
	});
})

$('.fabiao-back').on('tap',function(){
	mui.back();
//var btnArray = ['取消','放弃'];
//	mui.confirm(' ','放弃编辑？',btnArray,function(e){
//		if(e.index==0){
//			
//				 			 	 	
//		}else{
//			mui.back();
//		}
//	});
});


$('.fabiao-ok').on('tap',function(){
	//获取参数
	var title = $('#title').val();
	if(title.length == 0){
		mui.alert(" ",'内容不能为空');
		return;
	}
	//先通知
	var target = plus.webview.getWebviewById('fabiao.html')//mui的底部导航的界面id 就是url	
	mui.fire(target, 'fabiao-back', {
		'title':title //自定义事件参数
	});	
	mui.back();
});
