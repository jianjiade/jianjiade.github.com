---
layout: post
title: talk about sesionStorage VS localStorage
date: 2016-07-11 23:35:53
keywords:
- javascript
- sesionStorage
- localStorage
tags: [JavaScript, 前端]
---

最近业务上，有个需求，当一次回话结束，保存的信息，就要销毁。这个一看，正好是sessionStorage的用法，但是之前并没有了解锅sessionStorage，一直是使用localStorage，并且公司的框架封装好了localStorage的用法，所以，趁此机会了解一下sessionStorage的一些API。<!--more-->
说起localStorage和sessionStorage，总要说起我们的小甜饼，Cookie。顾名思义，cookie确实非常小，它的大小只有4K左右，是网景公司的前雇员Lou Montulli在1993年3月的发明。它主要用途是用来存放保存登录信息，比如你登录某个网站是可以看到『记住密码』，这通常就是通过在Cookie中存入一段辨别用户的数据来实现的。

### localStorage vs sessionStorage
localStorage 是html5 标准中新加入的技术，它并不是什么划时代的新东西。早在IE6的时代，就有一个userDate的东西用于本地存储，而当时考虑到浏览器的兼容性，更通用的方案是使用flash，而如今localStorage被大多数浏览器支持，更多的webview支持，尤其是移动端发展很快。

|特性|Chrome|Firefox|IE|Opera|Safari|
|----|----|----|----|----|----|
|localStorage|4|3.5|8|10.50|4|
|sessionStorage|5|2|8|10.50|4|

sessionStorage 与localStorage 的接口类似，但保存数据的生命周期与localStorage不同。session对于服务端的童鞋，应该比较了解，但是sessionStorage是个前端的概念。可以将一部分信息存在sessionStorage里，在这次回话结束，页面关闭，sessionStorage中的数据就会被清空。
localStorage则不同，它是持久化的，换句话说，如果不这是过期时间，localStorage是不会清空的，前提是，不要手动去清除。而sessionStorage则不是这样，页面关闭，会话结束，保存在sessionStorage的信息就会被清除。
除了这个不同，其他的操作API其实都是一样的，无论是sessionStorage还是localStorage，都有setItem，getItem，clear，removeItem这几个API，具体的见[mdn官方的文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

### 常用的API

#### setItem

setItem支持k-v这种存值，但是v只能是字符串，所以在存之前，必须要JSON.stringify一下呢。

````
localStorage.setItem('TEST','value');

````

#### getItem

getItem就比较简单了，只需要localStorage.getItem就可以了，例如：

````
localStorage.getItem('TESTR');
````

#### removeItem

removeItem这个就是移除某个键值的localStorage

````
localStorage.removeItem('TEST');
````

#### clear

clear 这个方法很常用，也很直接，就是直接清空缓存

````
localStorage.clear();

````

这就是localStorage最常见的几个API了，不过也是最底层的，但是一般公司不会直接这有去操作localStorage的，因为这个太野蛮了，一点都没封装，比如，直接使用setItem的话，是没设置过期时间的，前面也说到，localStorage的大小有5M左右，但是如果localStorage存放满了，过大了，这时候，用户继续存localStorage的话，怎么办？官方mdn文档没有说，但是也有小伙伴也过一篇文章[Always catch LocalStorage security and quota exceeded errors](http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors)，提到了，如何判断是否存满了

````
function isQuotaExceeded(e) {
  var quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

````

除了这些，还有一些特别的判断，还是要自己封装好一些自己常用的API，这有使用起来也不至于那么野蛮粗暴，接下来，等这个项目结束后，我会把封装一些常用的API，放在github上，目前项目提测了，等修完bug，就会来填这个坑。
期待吧~
