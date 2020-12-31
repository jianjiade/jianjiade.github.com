---
layout: post
title: 微信小程序系列「一」
date: 2016-10-27 00:48:45
tags: [WeChatApp, javascript, react]
---
2016年9月21日，在前端届的确是一个值得纪念的日子。这天，微信放出杀手锏，WeChatApp 又称微信小程序。但是就目前来看，有诸多不便，但是这个事情，依然有很大的意义。因为这是一个生态。从放出来这个消息，就开始关注。加上公司也有内测资格，所以准备写一些文章来聊聊weChatApp开发的一些情况，以及踩到的坑。
<!--more-->
首先提到的便是1M的大小限制🚫，其实这个看到1M的大小，觉得没什么，但是作为一个大的公司，那么多业务，总共就1M，那么就比较可怜了。算起来我们BU获得的大小容量就100Kb，100Kb是什么概念，纯代码大概只有3000行左右的代码。但是我们之前的代码压缩之后也有235kb呢。反正容量是一个限制。
其次：很多官方推荐的API也是不能用的。比如ES6，虽然后来开发工具支持了ES6，但是一些android 机是不支持ES6的，也是呵呵哒。还有官方推荐flex布局，但是在iOS 8及其以下是不支持flex布局的，那怎么办呢？官方给的解释是，自己去做兼容。
官方很容易改变API，很多官方组件还没上线呢，就已经废弃了。比如一下的截图：
![](https://raw.githubusercontent.com/iu2fish/_posts/master/media/14779317322951.jpg)
这个就比较尴尬了。很多在内测的公司，估计第一版就是按着官方的组件来的，结果还没上架，你就把官方的组件给废弃了，这是拿内测公司当小白鼠呢。但是，就算是当小白鼠，很多公司还是跪舔着争当小白鼠。
下面来说说开发中遇到的坑
##### setData 以数据来驱动view
在第一版的API中，setData是可以在onLoad的时候，设置数据的，但是更新一次api之后，在onload就不能设置setData了，但是官方的文档，并没有提到这个。还有在setData的时候，如果数据，有多层级。当数据有改变的时候，必须从外层开始设置，例如
```
obj:{
    innerObj:{}
}
```
如果在setData的时候写法这样的话，是无效的。
```
this.setData({
	innerObj:innerObj
})
```
这样是无效的。
还有在上面提到，在onload 的时候设置setData无效，那怎么办呢，就像我们的项目，必须设置的话，只能采取官方不推荐或者说，比较猥琐的解决方案。
```
this.data.obj = obj;
```
虽然官方不推荐，但是也没办法不是吗
setData在内部的一个队列方案，这个以后会详细的说，这一篇主要是说说小程序有哪些坑。现在有解决方案的，就把解决方案说一下，没有的话，就是吐槽吧。
#### 数据存储
每个微信小程序都可以有自己的本地缓存，可以通过 wx.setStorage（wx.setStorageSync）、wx.getStorage（wx.getStorageSync）、wx.clearStorage（wx.clearStorageSync）可以对本地缓存进行设置、获取和清理。本地缓存最大为10MB。
在第一版的api中，删除storage是不能指定key进行删除的。那么怎么删除指定的storage呢，只有把当前的key的value值设置为空了。
``` javascript
wx.setStorage({
  key:"key",
  data:""
})
```
这个确实也够猥琐的，不过后来的更新中，微信提供了，指定key的删除方法。
```javascript
wx.removeStorage(OBJECT)
```
![](https://raw.githubusercontent.com/iu2fish/_posts/master/media/14780057339213.jpg)

也提供了，同步删除的方法。
`wx.removeStorageSync(KEY)`
用法
![](https://raw.githubusercontent.com/iu2fish/_posts/master/media/14780058000923.jpg)
#### request请求并发限制
微信为了保证安全，在同时request请求的时候，做了限制，也就是同时并发5个请求，这个暂时无解。只能自己去封装队列来处理请求。
request没有cancel的事件，只要这个请求发出去了，是不能取消的。
#### 5层url跳转
微信也是为了安全考虑，限制了，页面跳转的限制，如果层级大于5个的话，不报错，页面就是白页，官方提供的wx.redirectTo去处理，而不是wx.navigateTo。
#### view的布局以及wxss
官方推荐flex布局，但是当使用form表单的时候，form表单支持flex的并不是很好，使用的时候，要注意。
`action-sheet` 这个东西，很适合做下面的筛选项，但是这个适合少量的数据，因为不能滚动而且自带的样式也是不好控制。呵呵哒。不过也被官方判了死刑，还未上线就被废弃。`modal lodding toast`，这3个组件已经被官方判了死刑了，还没上线就被废弃。
#### wxss的一些限制
第一版的时候，wxss不支持层级选择，后来更新的时候，官方把这句话给删除了，也不知道是推荐使用层级还是不支持，反正就是把不支持层级选择给删除了。官方的`changelist`也没提到这块。
`iconfont`能不能使用？可以，但是`ios`下有兼容性，如果使用在线的iconfont的话，ios不支持，所以为了包的容量，只能`base64`在本地了。

#### 另外一些别的坑，如业务交互
这块等下一篇再详细介绍