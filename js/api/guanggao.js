




$('.gg_address').on('tap',function(){
	mui.openWindow({
		url:'address_map.html',
		id:'address_map.html',
		extras:{
			content : $('.gg_address').html() == '点击添加地址' ? '' : $('.gg_address').html(),
			ggid:ggid
		}
	});
	
	
});
