---
layout: post
title: 在iPad 上click事件无效
date: 2014-11-03 19:38:10
tags: [JavaScript,bug,ipad,click,touchstart]
---
今天测试提了一个bug，在ipad上的click事件无效，要两次click才可以，查了下资料，发现要兼容下，才可以。<!--more-->
```
$('.documeng').on('click touchstart',function (e) {
	//do something
});
```
这样才可以。

[解决方案来自：stackoverflow](http://stackoverflow.com/questions/7892863/jquery-click-not-working-with-ipad)