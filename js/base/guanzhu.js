var index = 0;
var winW = $(window).width();
var liL = $('.sliding li').length; //选项卡个数
//				var liW = winW / liL;
var lineW = parseInt($('.h-line').css('width')); //line宽度
var left_margin = (document.documentElement.clientWidth - $('.nav_title').width()) / 2;  
var kongbai = $('.nav_title').width()-($('.nav_title li').width()*2); //中间空白距离
var liW = $('.nav_title li').width();//选项卡宽度
var clearTime;
var dir;
var ifLandscape; //判断横竖屏

var winWidth = 	$(window).width();
$('.type').width(winWidth -20);
$('.type').height(winWidth -20);
//---------sliding----------//
(function() {
//				$(".div-cooper").css('transform','rotateY(90deg)')
	//初始化
	function init() {
		layout();
		$('.h-line').css('display','inline-block');
		bind();
//					cooper() 合作弹窗
	}
	//布局相关
	//合作弹窗
//				function cooper(){
//					$(".cooper").css('transform','rotateY(-0deg)')//旋转
//					$(".coopera").click(function(){
//						clicked('personal/action_page/cooperation.html');
//						$(".cooper").animate({'opacity':'0'},0,function(){$(".div-cooper").remove()});
//						indexPage.evalJS("indexHide()");
//					})
//					$(".cooper-close").click(function(){
//						$(".cooper").animate({'transform':'rotateY(90deg)'},0,function(){$(".div-cooper").remove()})
//						indexPage.evalJS("indexHide()");
//					})
//				}
	function layout() {
		//更改头部样式

		$('.sliding li').removeClass('on').eq(index).addClass('on');
//					dir = index * liW + (liW - lineW) / 2

		dir = left_margin + (kongbai+liW)*index - (lineW - liW)/2;
		$('.h-line').css({
			'transform': 'translate3d(' + dir + 'px,0,0)',
			'-webkit-transform': 'translate3d(' + dir + 'px,0,0)'
		});
		//面板样式
		$('.content').css('width', liL * winW);
		$('.content>div').css('width', winW);
		$('.content').css({
			'transform': 'translate3d(' + (-index * winW) + 'px,0,0)',
			'-webkit-transform': 'translate3d(' + (-index * winW) + 'px,0,0)'
		});
		setTimeout(function() {
			$(".content>div").scrollTop(0);
		}, 400)
	}

	//事件绑定
	function bind() {
		//选项卡事件
		var _mark1 = 0;
		var _mark2 = 0;
		$('.sliding li').on('tap',function() {
				index = $(this).index();
				layout();  //更改样式
				if(!_mark1 && index == 2) {
//								fresh();
					_mark1 = 1;
				}
				if(!_mark2 && index == 0) {
//								guanzhu();
					_mark2 = 1;
				}
		})
		$('.content').swipeLeft(function(e) {
				console.log(e.target);
				//处理推荐页面有图片轮播图，图片swipe时会翻页现象
				if(e.target.className == "lunbotu") {
					return;
				}
				
				if(index < liL - 1) {
					index++;
					layout();
				}
				if(!_mark1 && index == 2){
					fresh();
					_mark1 = 1;
				}
				
			}).swipeRight(function(e) {
				console.log(e.target);
				//处理推荐页面有图片轮播图，图片swipe时会翻页现象
				if(e.target.className == "lunbotu") {
//				if(e.target.className == "swp-img") {
					return;
				}
				if(index > 0) {
					index--;
					layout();
				}
				if(!_mark2 && index == 0) {
//								guanzhu();
					_mark2 = 1;
				}
			})
			//window resize          
		$(window).resize(function() {
			clearTimeout(clearTime);
			clearTime = setTimeout(function() {
				//重新计算liw
				winW = $(window).width();
				liW = winW / liL;
				layout();
			}, 180)
		});
	}
	init();
})();


