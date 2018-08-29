



//接收添加会员页面关闭后的通知
window.addEventListener('huiyuan_back',function(event){
	
	getmoderatorUserList();
	
})


getmoderatorUserList()
//获取当前组下会员
function getmoderatorUserList(){
	$('.content-ul').html(''); //先清空
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return ;
	}
	$.ajax({
		type:"get",
		url:xinwen.url+'/getmoderatorUserList?user_id='+user_id,
		dataType:"json",
		success:function(res){
			if(res.code == 1){
				console.log(JSON.stringify(res));
				moderator_id = res.data['moderator_id'];
				for(var v in res.data[0]){
					var span = res.data[1] == 2 ? '<span class="fr delete_fs" alt="'+res.data[0][v]['id']+'">删除</span>' : '';
					var zhiding = res.data[0][v]['is_zhiding'] == 1 ? '<span class="zhiding">置顶</span>' : '';
					var str = $('<li>'+
					'<img src="'+res.data[0][v]['headimgurl']+'" class="head fl" />'+
					'<div class="fl desc">'+
					'<h3 class="nickname">'+'<span class="zd">'+zhiding+'</span>'+res.data[0][v]['user_name']+'</h3>'+
					'<p class="qianming">'+res.data[0][v]['personality']+'</p>'+
					'</div>'+
					span+ 
					'</li>');
					str.find('.delete_fs').on('tap',function(e){
						e.stopPropagation();
						delete_user(this);
					});
					str.attr('alt',res.data[0][v]['id']).on('tap',function(e){
						e.stopPropagation();
						user_info($(this).attr('alt'));
					});
					if(res.data[0][v]['is_zhiding'] == 1){
						str.find('.nickname').addClass('pad-left');      
					}
//					alert(res.data['zhiding'])
					if(res.data['zhiding'] == 1){
						str.on('longtap',function(e){
							e.stopPropagation();
							setUserZhiding(this);
						});
					}
					$('.content-ul').append(str);
				}
			}
		}
	});
}

//设置会员置顶
function setUserZhiding(obj){
	var btnArray = [{title:"置顶-取消"}];
	plus.nativeUI.actionSheet( {
		cancel:"取消",
		buttons:btnArray
	}, function(e){
		var index = e.index;
		if(index == 1){
			var user_id = $(obj).attr('alt');
			if(!moderator_id){
				return mui.toast('错误，刷新试试');
			}
			$.ajax({
				type:"get",
				url:xinwen.url+'/setUserZhiding?user_id='+user_id,
				data:{moderator_id:moderator_id},
				dataType:"json",
				success:function(res){
					if(res.code == 1){
						if(res.data == 1){
							$(obj).find('.zd').html('<span class="zhiding">置顶</span>');
							$(obj).find('.nickname').addClass('pad-left');      
						}else{
							$(obj).find('.zd').html('');
							$(obj).find('.nickname').removeClass('pad-left');  
						}
						mui.toast('操作成功');
					}else{
						return mui.toast('操作失败')
					}
				}
			})
		}
	} );
}

//删除这个会员
function delete_user(dom){
	mui.confirm('将移除会员。','确定要删除这个会员吗？',['取消','确定'],function(e){
		if(e.index == 1){
			var del_id = $(dom).attr('alt');
			var user_id = localStorage.getItem('userId');
			if(!user_id){
				return mui.toast('信息非法，请重新登陆！');	
			}
			var data = {
				del_id : del_id
			};
			$.ajax({
				type:"get",
				datatype:'json',
				url:xinwen.url+'/deleteMuser?user_id='+user_id,
				data:data,
				success:function(msg){
					if(msg.code == 1){ 
						$(dom).parents('li').remove();
					}else{
						mui.toast('出错了，刷新试试');
					}
				}
			});
		}
	})
}



