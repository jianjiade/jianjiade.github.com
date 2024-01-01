---
layout: post
title: 深入理解JavaScript原型和闭包1之一切都是对象
date: 2015-02-08 20:27:55
tags: [JavaScript]
---
#### 一切都是对象，这句话的重点是如何去理解对象这个概念####
当然了也不是所有的都是对象，值类型就不死对象。

首先，咱们还是先看看JavaScript中一个常用的函数---typeof()。typeof应该算是咱们的老朋友，还有谁没用过它？
typeof 函数输出的一共几种类型，在此列出：
<pre>
function show ( x ) {
	console.log( typeof (x) );  //undefined
	console.log( typeof ( 10 ) ); //number
	console.log(typeof ('abc')); //string
	console.log(typeof (true) ); //Boolean
	console.log( typeof ( function () {})); //Function
	console.log(typeof ([1, 'a', true])); //Object
	console.log(typeof ({'a':10, 'b':20})); //Object
	console.log(typeof (null)); // Object
	console.log( tyoeof (new Number ( 10))); //Object
}
show();
</pre><!--more-->
以上代码列出了typeof输出的几种类型标示。其中上面的四种(undefined，number，string，boolean)属于简单地值类型。不是对象，剩下的几种情况，函数，数组，对象，null，new Number（10）都是对象。他们是引用类型。
判断一个变量是不是对象非常简单，值类型的类型判断用typeof 引用类型的类型判断用 instanceof。
<pre>
var fn = function () {};
console.log( fn instanceof Object);//true
</pre>
好了，上面说了半天对象，各位可能也经常在工作中应对对象，在生活中还得应对生活中的对象。有些个心理不正常或者爱开玩笑的单身狗，还对于系统提示，找不到对象耿耿于怀。JavaScript中得对象，到底该如何定义呢？
####对象，若干属性的集合
java或者c#中得对象都是new 一个class 出来的。而且里面有字段，属性，方法，规定的非常严格。但是JavaScript就比较随意了，数组是对象，函数是对象，对象还是对象。对象里面的一切都是属性，只有属性，没有方法，那么这样的方法如何表示呢？----方法也是一种属性。因为它的属性表示为键值对的形式。
而且，更好玩的事情，JavaScript中得对象可以任意的扩展属性，没有class的约束，这个大家应该知道，就不再强调了
先说个最常见的例子：
<pre>
	var obj = {
			a : 10,
			b : function () {
				console.log( this.a + x);
			},
			c :{
				name: 'iu2fish',
				year: '1990'
			}
	};
</pre>
以上代码中，obj是一个自定义的对象，其中a，b，c就是它的属性，而且在c的属性值还是一个对象，它有name，year两个属性。
这个可能比较好理解，那么函数和数组，也可以这样定义属性吗？---当然不行，但是它可以用另外一种形式，总之函数/数组之流，只要是对象，它就是属性的集合。
以函数为例子：
<pre>
var fn = function () {
	console.log(100);
}

fn.a = 10;
fn.b = function () {
	console.log(123);
}
fn.c = {
	name: 'iu2fish',
	year: '1990'
}
</pre>
上段代码中，函数就作为对象被赋值了a,b,c三个属性，很明显，这就是属性的集合。
问：这个有用吗？
答：可以看看jQuery 的源码
在jQuery源码中，jQuery 或者 $ 这个变量其实是一个函数，不信可以叫咱们的老朋友typeof 验证一下。
<pre>
console.log( typeof ($));//function
console.log($.trim ('ABC'));
</pre>
验明正身，的确是个函数，那么咱们常用的$.trim()也是个函数，经常用，就不用验证了。
很明显，这就是在$或者jQuery函数加上一个trim属性，属性值也是函数，作用是截取前后空格。
JavaScript与java c#相比，首先最需要解释的就是弱类型，因为弱类型是最基本的用法，而且最常用，就不打算做一节来讲了。
其次，要解释的就是文本的内容，一切(引用类型)都是对象，对象是属性的集合。最需要了解的就是对象的概念，和java C# 完全不一样，所以切记切记
最后有个疑问，在typeof的输出类型中，function和object都是对象，为何却要输出两种答案呢？都叫做object不行吗？当然不行。
具体原因，且听下回分解。

转自:http://www.cnblogs.com/wangfupeng1988/p/3977987.html