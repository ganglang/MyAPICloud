#### 问题1：用openFrame来做底部导航栏的切换时，底部导航栏的点击事件失效
原因：openFrame传入的rect参数的h设置成了'auto'，新开的frame将底部导航栏覆盖了，造成了点击失效。
