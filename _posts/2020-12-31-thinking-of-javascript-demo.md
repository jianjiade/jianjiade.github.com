---
layout: post
title: 一个 JavaScript demo 的思考
date: 2015-08-29 13:44:44
tags:
---
周末无聊在群里吹水，单身狗的周末日常啊。<!--more-->

突然有小伙伴问了一个问题，看了下确实蛮有意思的：

    var f1 = function () {
      var n = 1;
      Add = function () {
        n += 1;
      }
      return function () {
        console.log (n);
      }
    }

    var a = f1(),
        b = f1(),
        c = f1();

    a();
    b();
    c();
    Add();
    a();
    b();
    c();

好了，大家猜猜输出的结果是啥。我第一眼看到就是，`1 1 1 2 2 2` 结果并不是。结果而是`1 1 1  1 1 2`，这个结果还是蛮出乎意料的。为什么是这个结果？首先想到的是，`Add()`这个函数是全局函数，因为在`f1`内部没有`var`定义，所以升级为全局变量，但是，这个不是关键。关键是之后的赋值操作。我们娓娓道来。

    var a = f1();

这个赋值语句意味着是这样的：

    var a = function () {
      var n = 1;
      Add = function(){
          n+=1;
          console.log(n)
      };
      return function(){
          console.log(n);
      }
    }

然后运行`a()`

同理

    var b = f1();

也是这样的，

    var b = function () {
      var n = 1;
      Add = function(){
          n+=1;
          console.log(n)
      };
      return function(){
          console.log(n);
      }
    }

同理

    var c = f1();

也是这样的，

    var c = function () {
      var n = 1;
      Add = function(){
          n+=1;
          console.log(n)
      };
      return function(){
          console.log(n);
      }
    }

但是当我们执行了后面一个赋值操作，之前的Add函数就变了，这是为什么呢，因为是全局变量。后面的操作会覆盖掉之前的定义，override掉。

所以就变成这样了

    var a = function () {
      var n = 1;

      return function(){
          console.log(n);
      }
    }

    var b = function () {
      var n = 1;

      return function(){
          console.log(n);
      }
    }

    var c = function () {
      var n = 1;
      Add = function(){
          n+=1;
          console.log(n)
      };
      return function(){
          console.log(n);
      }
    }


这个时候，你再执行之前的操作是不是就很好理解了？

    var a1 = a();
    var b1 = b();
    var c1 = c();
    a1();
    b1();
    c1();
    Add();
    a1();
    b1();
    c1();


所以结果是`1 1 1 1 1 2`。

你明白了吗？
有什么不对的地方在评论里讨论。

>感谢吹水群的@bailnl（百灵鸟），@vingo，@楚汉，以及群里各位吹水的童鞋。
