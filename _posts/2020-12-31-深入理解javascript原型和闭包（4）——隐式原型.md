---
layout: post
title:  深入理解JavaScript原型和闭包（4）——隐式原型
date:  2015-02-09 21:55:24
tags:  [JavaScript]
---
注意：本文不是JavaScript基础教程，如果你没有接触过原型的基本知识，应该先去了解一下，推荐看下《JavaScript高级程序设计第三版第6章：面向对象的程序设计》。
上文已经提到，每个函数function都有一个prototype，既原型。这里还要加上一句话，每个对象都有一个 `__proto__`,可以成为隐式原型。
这个`__proto__`是一个隐藏的属性，JavaScript不希望开发者用到这个属性，有的低版本浏览器甚至不支持这个属性值。<!--more-->
<pre>
var obj = {};
console.log(`obj.__proto__`);
</pre>
![enter image description here](http://images.cnitblog.com/blog/138012/201409/181508340651970.png)
上面截图看来，`obj.__proto__`和`Object.prototype` 的属性一样。这么巧。
答案就是一样。
obj这个对象本质是被Object函数创建的，因此`obj.__proto__ === Object.prototype`。我们可以用一个图来表示。
![enter image description here](http://images.cnitblog.com/blog/138012/201409/181509180812624.png)
即，每个对象都有一个`__proto__`属性，指向创建该对象的函数的prototype。

那么上图中得"Object prototype"也是一个对象，它的`__proto__`指向哪里？
好问题。
在说明"Object prototype"之前，先说一下自定义函数的prototype。自定义函数的prototype本质上就是和var obj = {} 是一样的，都是被Object创建，所以它的`__proto__` 指向的就是Object.prototype。
但是Object.prototype 确实一个特例，它的`__proto__`指向的是null，切记切记！
![enter image description here](http://images.cnitblog.com/blog/138012/201409/181510403153733.png)

还有函数也是一种对象，函数也有`__proto__`吗？
又一个好问题，当然有。
函数也不是从石头缝里蹦出来的，函数也是被创建出来的。谁创建了函数呢？Function 注意这个F是大写的。
且看下面代码
<pre>
function fn (x, y) {
	return x + y;
}
console.log(fn (10, 20));

var fn1 = new Function ('x', 'y', 'return x + y');
console.log(fn1(5,6));
</pre>
以上代码中，第一种方式是比较传统的函数创建方式，第二种是用new Function 创建。
首先，根本不推荐用第二种方式。
这里只是向大家演示，函数是被Function创建的。

好了，根据上面说的一句话，对象是`__proto__ `指向的是创建它的函数prototype，就会出现`Object.__proto__ === Function.prototype`。用一个图来表示。
![enter image description here](http://images.cnitblog.com/blog/138012/201409/181512068463597.png)
上图中，很明显的标出了:自定义函数`Foo.__prpto__`指向`Function.prototype`,`Object.__proto__ `指向Function.prototype,哎，怎么还有一个`Fnction.__proto__`指向`Function.prototype`？这不成了循环引用了？
对！是一个环形结构。
其实稍微想下也就明白了，Function也是一个函数，函数也是一种对象，也有`__proto__` 属性。既然是函数，那么一定是被Function创建。所以，Function是被自身创建的。所以他的`__proto__`指向了自身的prototype.
篇幅不少了，估计看的也烦了。快结束了。
最后一个问题:Function.prptotype指向的时对象，它的`__proto__`是不是也指向Object.prototype？
答案是肯定的。因为，Function.protype指向的对象也是一个普通的被Object创建的对象，所以也遵循基本的规则。
![enter image description here](http://images.cnitblog.com/blog/138012/201409/181512489403338.png)
Ok本节结束，是不是很乱？
乱很正常，那这一节就先乱着，下一节我们将请另一位老朋友来帮忙，把它理清楚。这位老朋友就是instanceof。
具体内容下节分享。

摘自：http://www.cnblogs.com/wangfupeng1988/p/3979290.html
