---
layout: post
title: 深入理解JavaScript原型和闭包（2）——函数和对象的关系
date: 2015-02-08 21:10:03
tags: [JavaScript]
---
上文已经提到，函数就是对象的一种，因为通过instanceof 函数可以判断。
<pre>
var fn = function () {};
console.log(fn instanceof Object);
</pre>h
<!--more-->
对！函数是一种对象，但是函数却不像数组一样，你可以说数组是对象的一种，因为数组就是对象的一个子集一样。但是函数与对象之间，却不仅仅是一种包含和被包含的关系，函数和对象之间的关系比较复杂，甚至有一点鸡生蛋蛋生鸡的逻辑，这一节就缕一缕。
还是先看一个小例子。
<pre>
function Fn () {
	this.name = "iu2fish",
	this.year = 1990;
}

var fn1 = new Fn();
</pre>
上面的这个例子很简单，他能说明，对象可以通过函数来创建。对，也只能说明这一点。
但是，我要说-----对象都是通过函数创建的。===有些人可能反驳，不对！因为：
<pre>
var obj = {a: 10, b: 20};
var arr = [5, 'x', true];
</pre>
但是不好意思，这个真的是一种快捷方式，在编程语言中，一般叫做“语法糖”。
做语法糖做的最好的可谓是微软大哥，他把他们家c#那小子弄的不男不女，本想图个人见人爱，谁承想还得给别人解释，其实他是个男孩。
言归正传，其实以上代码的本质是：
<pre>
//var obj = {a: 10, b: 20};
//var arr = [5, ''x'', true];

var obj = new Object ();
obj.a = 10;
obj.b = 20;

var arr  = new Array();
arr[0] = 5;
arr[1] = 'x';
arr[2] = true;
</pre>
而其中的Object和Array都是函数
<pre>
console.log(typeof (Object)); //function
console.log(typeof (Array));//function
</pre>
所以，可以很负责人的说，对象都是通过函数来创建的。

现在是不是糊涂了，对象是函数创建的，而函数有时一种对象，天哪，函数和对象到底是什么关系啊？别着急，揭开这个谜底，还得先去了解一下另一位老朋友，prototype原型。

转自：http://www.cnblogs.com/wangfupeng1988/p/3978035.html
