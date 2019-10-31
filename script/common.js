var baseUrl='https://wapi.xks-live.com/x1'
var baseUrl2='https://wapi.xks-live.com/api'
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
