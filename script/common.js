var baseUrl='https://wapi.xks-live.com/x1'
var baseUrl2='https://wapi.xks-live.com/api'
//生成请求服务器的参数数据
function paramsData(data){
  var currenttime = (Number(Date.parse(Date())) / 1000).toString();
  Object.assign(data,{currenttime:currenttime})
  var str='';
  var sign;
  var newStr='';
  Object.keys(data).sort().map(function(value){
    str+=data[value]+'&';
    newStr=newStr+value+'='+data[value]+'&'
  });
  str=str+'xingkashow';
  sign=CryptoJS.MD5(str).toString();
  Object.assign(data,{sign:sign});
  newStr=newStr+'sign='+sign;
  return newStr;
}

//上拉刷新函数
function pullUpRefresh(callback){
  api.addEventListener({
      name: 'scrolltobottom',
      extra:{
        threshold:0
      }
  }, function(ret, err){
     var timer;
     clearTimeout(timer);
     var loadMore=$api.dom('.loadMore');
     $api.css(loadMore,'display:block');
     timer=setTimeout(function() {
       $api.css(loadMore,'display:none');
       callback();
     },3000)

  });

}

//页面跳转，打开新的窗口
function navToPage(path,param,isIn){
  if(path.length<5) return;
  var uid;
  var token;
  if(isIn){
    uid=api.pageParam.uid||$api.getStorage('uid');
    token=api.pageParam.token||$api.getStorage('token');
    Object.assign(param,{uid:uid,token:token});
    api.openWin({
        name: path,
        url: './'+path+'.html',
        pageParam:param
    });
  }else{
    api.openWin({
        name:'outlink',
        url: path
    });

  }


}

//头部
var header,headerHeight=0;
function fnReadyHeader(){
  header=$api.dom('#header');
  if(header){
    headerHeight=$api.offset(header).h;
  }
}

//脚部
var footer,footerHeight=0;
function fnReadyFooter(){
  footer=$api.dom('#footer');
  if(footer){
    footerHeight=$api.offset(footer).h;
  }
}

//打开需要已登录状态的新窗口
function fnReadyOpenWin(){
  var buttons=$api.domAll('.open-win');
  for(var i=0;i<buttons.length;i++){
    $api.attr(buttons[i],'tapmode','highlight');
    buttons[i].onclick=function() {
      var winName=$api.attr(event.target,'win');
      var needLogin=$api.attr(event.target,'needLogin');
      if(needLogin && !$api.getStorage('login')){
        winName='login';
      }
      api.openWin({
          name: winName,
          url: './'+winName+'.html',
          pageParam: api.pageParam
      });
    }
  }

  api.parseTapmode();
}

//打开窗口的对应的frame函数
function fnReadyOpenFrame() {
  var winName=api.winName;
  api.openFrame({
      name: winName+'_frame',
      url: './'+winName+'_frame.html',
      rect: {
          x: 0,
          y: headerHeight,
          w: api.winWidth,
          h: api.winHeight-headterHeight-footerHeight
      },
      pageParam:api.pageParam,
      bounces: true,
      bgColor: 'rgba(0,0,0,0)',
      vScrollBarEnabled: true,
      hScrollBarEnabled: true
  });
}

//返回上一页函数
function fnReadyReturnEvent(){
  var btns=$api.domAll('.return-btn');
  for(var i=0;i<btns.length;i++){
    $api.attr(btns[i],'tapmode','active');
    btns[i].onclick=function() {
      api.closeWin();  
    }
  }
}
