---
layout: post
title: 深入理解javascript原型和闭包（3）——prototype原型
date: 2015-02-08 21:34:07
tags: [javscript]
---
既typeof之后的另一位老朋友。
prototype也是我们的老朋友，即使不了解的人，也应该都听过它的大名。如果它还是您的新朋友，我估计您也是javascript 的新朋友。

在第一节中说道，函数也是一种对象，它也是属性集合，也可以对函数进行自定义属性。<!--more-->
不用等咱们实验，javascript自己就先做了表率，人家就默认的给函数一个属性，prototype。对，每个函数都有一个属性叫做prototype。这个prototype的属性值是一个对象，（属性的集合，再次强调），默认的只有一个construction的属性，指向这个函数本身。<!--more-->
![enter image description here](http://images.cnitblog.com/blog/138012/201409/172121182841896.png)
如上图，SuperType是一个函数，右侧的方框就是它的原型。
原型既然作为对象，属性的集合，不可能就只弄个constructor来玩玩，肯定可以自定义的增加许多属性。例如：这个Object大哥，人家的prototype里面就有好几个其他属性。
![enter image description here](http://images.cnitblog.com/blog/138012/201409/172130097842386.png)
咦，有些方法怎么似曾相识？
对，别着急，之后会让你知道他们为何似曾相识。
接着往下说，你也可以自定义的方法中prototype中新增自己的属性
<pre>
	function Fn () {}
	Fn.prototype.name = 'iu2fish';
	Fn.prototype.getYear = function () {
		return 1990;
	}
</pre>
看到没有，这样就变成了
![enter image description here](http://images.cnitblog.com/blog/138012/201409/172138591437263.png)
没问题！
但是，这样做有何作用呢？解决这个问题，咱们还是先说说jquery吧。
<pre>
var $div = $('div');
$div.attr('myname', 'iu2fish');
</pre>
以上代码中，$('div')返回的时一个对象，对象被函数创建的。假设创建这一对象的函数是myjQuery。它其实是这样实现的。
<pre>
myjQuery.prototype.attr = function () {
	//……
};
$('div') = new myjQuery();
</pre>
不知道大家明白没？
如果用自己的代码来演示，就是这样
<pre>
function Fn ( ) { }
Fn.prototype.name = 'iu2fish';
Fn.prototype.getYear = function () {
	rerurn 1990;
}
var fn = new Fn ();
console.log(fn.name);
console,log(fn.getYear());
</pre>
即，Fn是一个函数，fn对象是从Fn函数new出来的，这样fn对象就可以调用Fn.prototype中得属性。
因为每个对象都有一个隐藏的属性"__proto__"，这个属性引用了创建这个对象的函数的prototype。即fn.__proto__ === Fn.prototype 这里的__proto__称为隐式原型，下回继续分解。

转自：http://www.cnblogs.com/wangfupeng1988/p/3978131.html
