

//function Map(){
//	// 百度地图API功能
//	var map = new BMap.Map("allmap");    // 创建Map实例
//	map.centerAndZoom(new BMap.Point(lng, lat), 17);  // 初始化地图,设置中心点坐标和地图级别
//	//添加地图类型控件
//	map.addControl(new BMap.MapTypeControl({
//		mapTypes:[
//          BMAP_NORMAL_MAP,
//          BMAP_HYBRID_MAP
//      ]}));	  
//	map.setCurrentCity(addressComponent.province);          // 设置地图显示的城市 此项是必须设置的
//	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
//}

function Map(){
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var geolocation = new BMap.Geolocation(); //获取当前坐标
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			//默认当前的坐标
//			address = {"lng":r.point.lng,"lat":r.point.lat};
			address = {"lng":'',"lat":''};
			var point = new BMap.Point(r.point.lng,r.point.lat); //定义中心点
			map.centerAndZoom(point,17);  		// 初始化地图,设置中心点坐标和地图级别
			var mk = new BMap.Marker(r.point);  //中间标注红点
			map.addOverlay(mk);  
//			var label = new BMap.Label("当前位置",{offset:new BMap.Size(20,-10)});
//      	mk.setLabel(label); //添加百度label
			
			map.addControl(new BMap.GeolocationControl());
//			map.panTo(r.point);
//					alert('您的位置：'+r.point.lng+','+r.point.lat);

			//点击地图
			var geoc = new BMap.Geocoder();  
			map.addEventListener("click", function(e){        
			    var pt = e.point;
			    geoc.getLocation(pt, function(rs){
			        var addComp = rs.addressComponents;
			        //点击的坐标
			        address = {'lng':rs.point.lng,'lat':rs.point.lat};
//			        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					var sel = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
					console.log(JSON.stringify(rs));
					//信息窗口
					var opts = {
					    width : 0,     // 信息窗口宽度    
					    height: 0,     // 信息窗口高度    
					    title : '',  // 信息窗口标题   
					}    
					straddress = sel;
					var infoWindow = new BMap.InfoWindow(sel, opts);  // 创建信息窗口对象    
					map.openInfoWindow(infoWindow, rs.point);      // 打开信息窗口
			    });        
			});
		}
		else {
//					alert('failed'+this.getStatus());
			mui.toast('定位失败')
		}        
	},{enableHighAccuracy: true})
}

$('.ok').on('tap',function(){
//	alert(JSON.stringify(address));
	var data = {
		ggid:ggid,
//		address:JSON.stringify(address),
		str_address:straddress ? straddress : ''
	}
	data = $.extend(data,address);
//	console.log(JSON.stringify(data));
//	return ;
	$.ajax({
		type:"get",
		url:xinwen.url+'/upgg',
		data:data,
		success:function(e){
			if(e.code == 1){
				mui.toast('ok')
			}else{
				mui.toast('')
			}
			//先通知
			var target = plus.webview.getWebviewById('guanggao.html')//mui的底部导航的界面id 就是url	
			mui.fire(target, 'address-back', {
				'data':data, //自定义事件参数
			});	
			mui.back();
		},
		error:function(){
			mui.toast('修改失败');
		}
	});
});

//map.getCenter()//获取中心点  