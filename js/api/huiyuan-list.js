
notModeratorUserList();

//获取没有加入圈子的用户
function notModeratorUserList(){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return ;	
	}
//	alert(user_id);
	$.ajax({
		type : 'get',
		url  : xinwen.url+'/notModeratorUserList',
		data : {user_id:user_id},
		datatype : 'json',
		success : function(res){
			if(res.code == 1){
				var data = res.data;
				for(var x in data){
					if(/^[A-Za-z]+$/.test(x)){  //是字母
						var li = $('<li data-group="'+x+'" class="mui-table-view-divider mui-indexed-list-group">'+x+'</li>');
						$('ul.mui-table-view').append(li);
						for(var z in data[x]){
							var li1 = $('<li data-value="" class="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left"><input type="checkbox" value="'+data[x][z]["id"]+'" />'+data[x][z]["user_name"]+'</li>');
							li.after(li1);
						}
					}else{ //其他
						for(var z in data[x]){
							var li1 = $('<li data-value="" class="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left"><input type="checkbox" value="'+data[x][z]["id"]+'" />'+data[x][z]["user_name"]+'</li>');
							$('.qita').after(li1);
						}
					}
				}
			}else{
				
			}
		}
	});
}

//添加会员
function tianjiahuiyuan(data){
	var user_id = localStorage.getItem('userId');
	if(!user_id){
		return ;	
	}
//	alert(data);
//console.log(xinwen.url+'/tianjiahuiyuan?user_id='+user_id);
	$.ajax({
		type : 'get',
		url  : xinwen.url+'/tianjiahuiyuan?user_id='+user_id,
		data : {res:data},
		datatype : 'json',
		success : function(res){
			if(res.code == 1){
				mui.toast('添加成功');
				var target = plus.webview.getWebviewById('my-bianji.html')
				mui.fire(target, 'huiyuan_back', {});
				
				mui.back()
			}else{
				
			}
		}
	});
}















