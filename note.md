#### 问题1：用openFrame来做底部导航栏的切换时，底部导航栏的点击事件失效
原因：openFrame传入的rect参数的h设置成了'auto'，新开的frame将底部导航栏覆盖了，造成了点击失效。
解决方案：设置新开的frame的高度为api.frameHeight-$api.dom(导航栏).offset().h

#### 问题2：index.html里的var headerH = $api.fixStatusBar(header);会在小米5c手机上将header设置成padding-top:24px，造成新开的frame不能完成填充空间
解决方案：对手机系统做判断，如果是ios系统才使用fixStatusBar这个方法(未检测是否好用)
```
if(api.systemType=='ios'){
  var headerH = $api.fixStatusBar(header);
  // 最新api.js为了适配iPhoneX增加的方法，修复底部Footer部分与iPhoneX的底部虚拟横条键重叠的问题；
  var footerH = $api.fixTabBar(footer);
}
```

#### 问题3：用$api.css(dom元素,"backgroundImage:none或图片路径")会出问题
解决方案：将backgroundImage改成background-image就好了


#### 问题4：使用swipe.js的插件来做轮播图，应该是要轮播4张图的，但只出现了一张图片。
解决方案：未有。

#### 问题5：使用openWin打开新的页面，页面闪烁或叠加等诸多问题。
原因：没引入api.css文件
解决方案：引入api.css文件
```
<link rel="stylesheet" type="text/css" href="../css/api.css"/>
```

#### 问题6：使用bMap模块来获取当前所在定位和当前所在城市，然后使用UICityList模块来显示城市列表，使用UICityList的open函数，当设置拿到的当前所在城市时不成功。
原因:执行UICityList的open函数时，还没获取到当前所在的城市。
解决方案：将UICityList的open函数放到bMap模块获取当前所在城市的成功回调函数里调用。
ps:api.startLocation这个方法似乎在安卓机上不管用。推荐用bMap

#### 问题7：personal.html使用addEventListener监听了事件，citylist使用sendEvent广播事件，从personal.html到citylist.html，在citylist.html里使用closeWin返回personal.html，结果报错:Can Not Find File:[object HTMLSpanElement].txt;当使用execScript方法也出现同样的问题。
原因:不明
解决方案:暂无
ps:先监听在广播，即使用addEventListener函数的页面要先打开，使用sendEvent的页面后打开，广播事件才可以收到，听说只有在window下才可以用，frame不行，未检测。
