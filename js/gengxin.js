var wgtVer = null;
var wgtUrl;
function plusReady() {
    // ......
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        wgtVer = inf.version;
        console.log("当前应用版本：" + wgtVer);
        update_wgt();
    });
}
if(window.plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}
function update_wgt(){
    // 检测更新
    ca.get({
        url: xinwen.url+'/getversion',
        data: {
            act: 'app_version',
            ver: wgtVer
        },
        succFn: function(data) {
            var res = JSON.parse(data);
            if(data.wgtVer != res.data) {
                // 下载wgt文件
                wgtUrl = xinwen.url+'/xinwen.wgt';
                downWgt();
            }
        }
    });
}
 
function downWgt(){
//  plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
//          console.log("下载wgt失败！");
//          plus.nativeUI.alert("下载wgt失败！");
        }
//      plus.nativeUI.closeWaiting();
    }).start();
}
// 更新应用资源
function installWgt(path){
//  plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
//      plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart(); 
//      });
    },function(e){
//      plus.nativeUI.closeWaiting();
//      console.log("安装wgt文件失败["+e.code+"]："+e.message);
//      plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}