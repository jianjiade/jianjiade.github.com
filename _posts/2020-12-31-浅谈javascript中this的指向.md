---
layout: post
title: 浅谈JavaScript中this的指向
date: 2015-05-03 16:54:49
tags:
---
### 浅谈JavaScript中this的指向
#### 调用位置
在理解this的绑定过程之前，首先要理解`调用位置`。调用位置就是函数在代码中被调用的位置，而不是声明的位置。只有仔细分析调用位置才能回答这个问题，这个this到底引用什么？<!--more-->
通常来说，寻找调用位置，就是寻找`函数被调用的位置`，但是做起来并没有那么简单，因为某些编程模式可能会隐藏真正的调用位置。
最重要的是要分析`调用栈`(就是为了到达当前执行位置所调用的所有函数)。我们关心的调用位置就在当前正在执行的函数的前一个调用中。
下面我们来看看到底什么是调用栈和调用位置：
    
    function baz () {
        //当前调用栈是baz
        //因此，当前调用位置是全局作用域
        console.log("baz");
        bar();//bar 的调用位置
    }
    function bar () {
        //当前调用栈是baz-》bar
        //因此，当前调用位置在baz中
        console.log("bar");
        foo();
    }
    function foo(){
        //当前调用栈是baz-》bar-》foo
        //因此当前调用位置在bar中
        console.log("foo");
    }
    baz();//<---baz的调用位置

注意我们是如何分析出真正的调用位置的，因为它决定了this得绑定。
> 你可以把调用栈想象成一个函数调用链，就像我们在前面代码段的注释中所写的一样。但是这种方法非常麻烦并且容易出错。另一个查看调用栈的方法是使用浏览器的调试工具。绝大多数现代桌面浏览器都内置了开发者工具，其中包含JavaScript调试器。就本例来说，你可以在工具中给foo函数的第一行代码设置一个断点，或者直接在第一行代码之前插入一条debugger语句。运行代码是，调试器会在那个位置暂停，同时会展示当前函数调用列表，这就是你的调用栈。因此，如果你想要分析this的绑定，使用开发者工具得到调用栈，然后找到栈中第二个元素，这就是真正的调用位置。

#### 绑定规则
##### 1默认绑定
首先思考一下代码：
<pre>
	function foo(){
		console.log(this.a);
	}
	var a = 2;
	foo();
</pre>
声明在全局作用域中的变量就是对全局对象的一个同名属性。它们本质就是同一个东西。并不是通过复制得到的，就像一个硬币的两面一样。
接下来我们可以看到在调用`foo` 的时候`this.a`。 被解析成了全局变量`a`。为什么？因为本例中，函数调用时，应用了`默认绑定`(好像废话，怎么知道是默认绑定的？接下来会慢慢道来)因此指向全局对象。
那么怎么知道这里使用了`默认绑定`呢？可以通过分析调用位置来看看`foo()`是如何调用的，在代码中，`foo()`是直接使用不带任何修饰的函数引用调用的，因此只能使用`默认绑定`无法应用其他规则。
如果使用了`use strict`模式，那么全局对象则无法使用`默认绑定`，因此`this`将会绑定到`undefined`。

	function(){
		"use strict"
		console.log(this.a);
	}
	var a = 2;
	foo(); //this is undefined
这里有一个微妙但是非常重要的细节，虽然`this`的绑定规则完全取决于调用位置，但是只有`foo`运行在非`strict modle`下时，默认绑定才能绑定到全局对象。严格模式下与`foo`的调用位置无关：

	function foo (){
		console.log(this.a);
	}
	var a = 2;
	(function(){
		"use strict";
		foo(); //2
	})();

>通常来说不应该在代码中使用strict mode 和non-strict mode 。整个程序要么严格要么非严格，然而有时候，你可能会用到第三方库，其严格程度和你的代码有所不同，因此一定要注意这类兼容性细节。

#### 2隐式绑定
另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

    function foo () {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    obj.foo();//2

首先需要注意的是，`foo`的调用方式，及其后是如何被当作引用属性添加到obj中的，但是无论是直接在obj中定义还是先定义再添加属性，这个函数严格来说都不属于obj对象。
然而，调用位置会使用obj上下文来引用函数，因此你可以说函数被调用时obj对象拥有或者包含它。
无论你如何称呼这个模式，当foo被调用时，它的落脚点确实指向obj对象，当函数引用上下文时，`隐式绑定` 规则会把函数调用中的this绑定到这个上下文对象。因为调用foo时this被绑定到obj，因此this.a 和obj.a是一样的。

对象属性引用链中，只有最顶层或者说最后一层会影响调用位置。举例来说。

	function foo () {
		console.log( this.a );
	}
	var obj2 = {
		a: 2,
		foo:foo
	};
	var obj1 = {
		a:3,
		obj2: obj2
	};
	obj1.obj2.foo();//2

##### 隐式丢失
一个最常见的this绑定问题就是隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式。
思考下面的代码：

	function foo () {
		console.log( this.a );
	}
	var obj = {
		a:2,
		foo:foo
	};

	var bar = obj.foo;
	var a = "oops, global";
	bar();//"oops, global"

虽然bar是obj.foo的引用，但是实际上，它引用的是foo函数本身，因此此时的bar() 其实是一个不带任何修饰的函数调用，因此应用了默认的绑定。

一种更微妙，更常见并且更出乎意料的情况发上在传入回调函数时：

	function foo(){
		console.log( this.a );
	}
	function doFoo(fn){
		fn();
	}
	var obj = {
		a:1,
		foo:foo
	};
	var a = "b";
	doFoo( obj.foo );

参数传递其实就是一种隐式赋值。因此我们传入函数时，也会被隐式赋值，所以结果和上一个例子一样。
如果把函数传入语言内置的函数，而不是传入你自己声明的函数，会发生什么呢？结果是一样的，没有区别。

    function foo(){
        console.log( this.a );
    }
    var obj = {
        a:2,
        foo:foo
    }
    var a = 3;
    setTimeout( obj.foo, 1000); //3;

JavaScript环境中内置的setTimeout()函数实现和下面的代码类似：

    function setTimeout(fn, delay){
        fn();
    }

就像我们看到的那样，回调函数丢失this，绑定是非常常见的。除此之外，还有一种情况this的行为会出乎我们的意料：调用回调函数的函数可能会修改this。在一些流行的JavaScript的库中事件处理器通常会把回调函数的this强制绑定到触发事件的DOM元素上。这在一些情况下可能很有用，但是有时会让你感到非常郁闷。
无论哪种情况，this的改变都是意想不到的，实际上你无法控制回调函数的执行方式，因此就没有办法控制会影响绑定的调用位置。

### 3显式绑定
显式绑定呢，主要就是call和apply这两种方法了。
这两个方法是如何工作的呢？他们第一个参数是一个对象，他们会把这个对象绑定到this，接着在调用函数时指定这个this。因为你可以直接指定this的绑定对象，因此我们称之为显式绑定。
思考下面的代码：

    function foo(){
        console.log( this.a );
    }   
    var obj = {
        a:2
    }
    foo.call(obj);//2

通过foo.call这个方法我们可以在调用foo时强制把this绑定到obj上。
如果你传入一个原始值，字符串，布尔类型或者数字类型，来当作this的绑定对象，这个原始值会被转换成对象形式，也就是new String new Boolean，或者new Number。这个通常称为装箱。

>从this绑定的角度来说，call和apply是一样的，他们的区别体现在其他参数上。

可惜，显式绑定也是无法解决之前提到的绑定丢失的问题。但是显式绑定的一个变形可以解决这个问题。
看下面的代码：

    function foo(){
        console.log( this.a );
    }    
    var obj = {
        a:2
    }
    var bar = function (){
        foo.call( obj );
    }
    bar ();//2
    setTimeout( bar, 100);//2
    bar.call( window );//2

我们来看看这个变种到底是怎么工作的的。我们创建了函数bar，并在内部手动调用foo.call(obj),因此foo的this指向了obj。无论之后如何调用bar，它总会手动在obj上调用foo，这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。
硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回所收到的所有值：

    function foo (something){
        console.log(this.a, somethis);
        return this.a + something;
    }
    var obj = {
        a:2
    }
    var bar = function (){
        return foo.apply(obj, arguments);
    }
    var b = bar(3);//2 3
    console.log(b);//5

另一种使用方法是创建一个i可以重复使用的辅助函数：

    function foo (something){
        console.log(this.a , something);
        return this.a + something;
    }
    //简单地辅助绑定函数
    function bind(fn, obj){
        return function (){
            return fn.apply( obj, arguments);
        }
    }
    var obj = {
        a:2
    };
    var bar = bind(foo, obj);
    var b = bar (3);//2 3
    console.log(b); //5

由于硬绑定是一种非常常用的模式，所以在ES5中提供了内置的方法，Function.prototype.bind它的用法如下：

    function foo(something){
        console.log(this.a, something);
    }
    var obj = {
        a:2
    }
    var bar = foo.bind( obj );
    var b = bar (3); // 2 3
    console.log(b);//5

bind()会返回一个硬编码的新函数，他会把参数设置为this的上下文并调用原始函数。

API调用上下文
第三方库的很多函数以及JavaScript语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称之为“上下文”(content),其作用和bing意义，确保你的回调函数使用指定的this。

    function foo (el) {
        console.log(el, this.id);
    }
    var obj = {
        id:'ids'
    };
    var list = [1,2,3];
    list.forEach(foo, obj);//1 ids 2 ids 3 ids

这些函数实际上是通过call或者apply实现的显式绑定。

### 5new 绑定

使用new来调用函数的时候，或者说发生构造函数调用时，会自动执行下面的操作。
*创建一个全新的对象*
*这个新对象会被执行[[原型]]连接*
*这个新对象会绑定到函数调用的this*
*如果函数没有返回其他对象，那么new表达式中函数会自动返回这个新对象*

    function foo (a){
        this.a = a;
    }
    var bar = new foo(2);
    console.log(bar.a); // 2

使用new来调用foo时，我们会构造一个新对象并把它绑定到foo调用中得this上，new 是最后一种可以影响函数调用时this绑定行为的方法，我们称之为new 绑定。

>本文很多地方摘自 你不知道的JavaScript一书中得段落，这本书真的很不错，推荐大家购买。链接：京东 http://item.jd.com/11676671.html 亚马逊 http://www.amazon.cn/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript-%E7%BE%8E-%E8%BE%9B%E6%99%AE%E6%A3%AE/dp/B00W34DZ8K/ref=sr_1_1?ie=UTF8&qid=1438533763&sr=8-1&keywords=%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript








