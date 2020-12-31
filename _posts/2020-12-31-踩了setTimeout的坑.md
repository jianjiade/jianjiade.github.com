---
layout: post
title: 踩了setTimeout的坑
date: 2016-05-31 21:58:25
tags: [JavaScript,前端]
headerimg: http://7xt1yf.com1.z0.glb.clouddn.com/light.jpg
preview: 今天遇到了一个奇异的bug，setTimeout无效，原因竟然是这个。。。。。
---
今天测试说，蒹葭同学，uat环境有个bug，秒杀产品还没结束，但是前端显示的是已经结束了，你看一下。
我内心OS：妈蛋，又出bug了。
不过还是乖乖的去debug了一下代码，最后排查出来是设置的定时器没有生效，直接执行了。<!-- more -->

```
var timer = new Date('xxxx-xx-xx') - new Date('xxxx-xx-xx');
setTimeout(function(){
  //TODO some code
},timer)
```

但是TODO里的代码是直接运行了。
what fuck！！怎么会这样，定时器竟然没有起作用。
于是查了一下mdn文档。
mdn文档这样写道：

>Maximum delay value
Browsers including Internet Explorer, Chrome, Safari, and Firefox store the delay as a 32-bit signed integer internally. This causes an integer overflow when using delays larger than 2147483647, resulting in the timeout being executed immediately.

链接地址：[https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)

大致翻译过来意思就是：

>IE Chrome Safari Firefox 等32位的浏览器用延迟的时候，如果延迟的时间大于2147483647 毫秒的话，会导致超时，而立刻执行。

顺便说一句，2147483647 这个毫秒数正好是`2的31次方-1`
这样的话，就不难理解了，如果你设置的timer超过2的31次方，那么setTimeout就无效了，而立刻执行，这个也就解释了为什么设置的函数会立刻执行的原因了。
找到这个问题之后，也思考了下，为什么会出现这种炒鸡大的timer呢？原来是这个时间点都是接口restful下发的，没法控制，所以前端在兼容这个的时候，就采取了一个比较猥琐的办法，如果这个timer大于2147483647这个值，就赋值这个值，否则就是timer。
```
timer = timer > 2147483647 ? 2147483647 : timer;

```
😄😄最终“完美解决”bug了。
