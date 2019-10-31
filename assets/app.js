window.PI=3.1415926;
Object.defineProperty(window,'PI2',{
    value:3.1415926087
});

//alert("index:"+window.PI);

    //分享
window.nativeToshare = function () {
    try {
        window.native.nativeAndroid();
    } catch(err){
    }
}
//视频
window.nativeToPay = function (data) {
    try {
        window.native.nativeAndroidPay(data);
    } catch(err){

    }
}
//会员卡
window.nativeToPayVip = function (data) {
    try {
        window.native.nativeAndroidPayVip(data);
    } catch(err){

    }
}
//返回首页
window.nativeToHome = function (data) {
    try {
        window.native.nativeAndroidToHome(data);
    } catch(err){

    }
}

//订单支付
window.navtiveToPayProduct = function (data) {
    try{
        window.native.onAndroidPay(data);
        //alert("window:"+window+" window.native:"+window.native);
    }catch(err){
        alert(err);
    }
}

//商品分享
window.navtiveShareProduct = function (data){
    try{
        window.native.onAndroidShare(data);
    }catch(err){
        alert(err);
    }
}

//跳转到app的钱包页面
window.nativeToWallet = function (){
    try{
        window.native.toAndroidWallet();
    }catch(err){
        alert(err);
    }
}


//跳转到app的账号设置页面
window.nativeToSetting = function (){
    try{
        window.native.toAndroidSetting();
    }catch(err){
        alert(err);
    }
}

//订单支付成功回调函数
window.paySuccess=function () {
    window.history.go(-1);
}

//订单支付失败回调函数
window.payFail=function () {
    alert("支付失败了");
}