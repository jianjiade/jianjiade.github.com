---
layout: post
title: javascript 错误以及如何修复
date: 2015-02-02 20:01:38
tags:
---
<blockquote>
	原文《[JavaScript Errors and How to Fix Them](http://davidwalsh.name/fix-javascript-errors)》
	作者：Jani Hartikainen
	翻译：[涂鸦码农](http://weibo.com/newwave)
	译文：[译文地址](http://jinlong.github.io/2015/02/01/javascript-errors-and-how-to-fix-them/)
</blockquote>
JavaScript 调试是一场噩梦：首先给出的错误非常难以理解，其次给出的行号不总有帮助。有个查找错误含义，及修复措施的列表，是不是很有用？
以下是奇怪的 JavaScript 错误列表。同样的错误，不同的浏览器会给出不同的消息，因此有一些不同的例子。<!--more-->
###如何读懂错误？###
首先，让我们快速看下错误信息的结构。理解结构有助于理解错误，如果遇到列表之外的错误会减少麻烦。
Chrome 中典型的错误像这样：
<pre>
	Uncaught TypeError: undefined is not a function
</pre>
错误的结构如下：
1.<code>Uncaught TypeError：</code>这部分信息通常不是很有用。<code>Uncaught</code> 表示错误没有被 <code>catch </code>语句捕获，<code>TypeError</code> 是错误的名字。
2.<code>undefined is not a function:</code> 这部分信息，你必须逐字阅读。比如这里表示代码尝试使用 <code>undefined </code>，把它当做一个函数。
其它基于 webkit 的浏览器，比如 Safari ，给出的错误格式跟 Chrome 很类似。Firefox 也类似，但是不总包含第一部分，最新版本的 IE 也给出比 Chrome 简单的错误 - 但是在这里，简单并不总代表好。
以下是真正的错误。
####Uncaught TypeError: undefined is not a function####
相关错误：<code>number is not a function</code>, <code>object is not a function</code>, <code>string is not a function</code>, <code>Unhandled Error: ‘foo’ is not a function</code>, <code>Function Expected</code>
当尝试调用一个像方法的值时，这个值并不是一个方法。比如：
<pre>
	var foo = undefined;
	foo();
</pre>
如果你尝试调用一个对象的方法时，你输错了名字，这个典型的错误很容易发生。
<pre>
	var x = document.getElementByID('foo');
</pre>
由于对象的属性不存在，默认是 <code>undefined</code> ，以上代码将导致这个错误。
尝试调用一个像方法的数字，“number is not a function” 错误出现。
如何修复错误：确保方法名正确。这个错误的行号将指出正确地位置。
####Uncaught ReferenceError: Invalid left-hand side in assignment####
相关错误<code>Uncaught exception: RefenceError Cannot assign to 'functionCall()'</code>,<code>Uncaught exception:ReferenceError: Cannot addign to 'this'</code>
尝试给不能赋值的东西赋值，引起这个错误。
这个错误最常见的例子出现在<code>if</code>语句使用：
<pre>
	if(doSomethis() = 'somevalue');
</pre>
此例中，程序员意外的使用了单个等号，而不是双等号，‘left-hand side in assignmeng’提及了等号左手边的部分，因此你可以看到以上的例子，左手边包含不能赋值的东西，导致了这个错误。
如何修复错误：确保没有给函数结果赋值，或者给<code>this</code>关键字赋值
####Uncaught TypeError:Converting circular structure to JSON####
相关错误：<code>Uncaught exception:TypeError:JSON.stringify:Not an acyclic Object</code>,<code>TypeError:cyclic object value</code>,<code>Circular reference in value argument not supported</code>
把循环引用的对象，传给<code>JSON.stringify</code>总会引起错误。
<pre>
	var a = {};
	var b = {a : a}
	a.b = a;
	JSON.stringify(a);
</pre>
由于以上<code>a</code>和<code>b</code>循环引用彼此，结果对象无法转成JSON。
####Unexpected token####
相关错误：<code>Expected),missing ) after argument list</code>
Javascript 解释器预期的东西没有被包含。不匹配的圆括号或方括号通常引起这个错误。
错误信息可能有所不同，<code>Unexpected token]</code>或者<code>Expected {</code>等。
如何修复错误：有时候出现行号并不准确，因此很难修复。
1.[]{}()这几个符号不配对常常导致错误。检查所有的圆括号和方括号是否配对。行号指出的不仅是问题字符。
2.Unexpected / 跟正则表达式有关。此时行号通常是正确地。
3.Unexpected；对象或者数组字面量里面有这个；通常引起这个错误，或者函数调用的参数列表里有个分号。此时的行号通常也是正确地。
####Uncaught SyntaxError: Unexpected token ILLGAL####
相关错误：<code>Unterminated String Literal Invalid Line Terminator</code>
一个字符变量少了结尾的分号。

####Uncaught TypeError: Cannot read property ‘foo’ of null, Uncaught TypeError: Cannot read property ‘foo’ of undefined####
相关错误：<code>TypeError: someVal is null</code>,<code>Unable to get property ‘foo’ of undefined or null reference</code>
尝试读取<code>null</code>或者<code>undefined</code>,把它当成了对象。例如：
<pre>
	var someVal = null;
	console.log(someVal.foo);
</pre>
如何修复错误:通常由于拼写错误导致。检查错误指出的行号附近使用的变量名是否正确。
####Uncaught TypeError: Cannot set property ‘foo’ of null, Uncaught TypeError: Cannot set property ‘foo’ of undefined####
相关错误：<code>TypeError: someVal is undefined</code>,<code>Unable to set property ‘foo’ of undefined or null reference</code>
尝试写入<code>null</code>或者<code>undefined</code>,把它当成了一个对象，例如：
<pre>
	var someVal = null;
	someVal.foo = 1;
</pre>
如何修复错误：也是由于拼写错误导致，检查错误指出的行号附近的变量名。

####Uncaught RangeError: Maximum call stack size exceeded####
相关错误：<code>Related errors: Uncaught exception: RangeError: Maximum recursion depth exceeded, too much recursion, Stack overflow</code>
通常由程序逻辑bug导致的，导致函数的无线递归调用。
如何修复：检查递归函数中可能导致无限循环的bug。

####Uncaught URIError: URI malformed####
相关错误：<code>URIError: malformed URI sequence</code>
无效的<code>decodeURIComponent </code>调用导致。
如何修复错误：按照错误指出的行号，检查<code>decodeURIComponet</code>调用，它是正确地。

####XMLHttpRequest cannot load http://some/url/. No ‘Access-Control-Allow-Origin’ header is present on the requested resource####
相关错误：<code>Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at
http://some/url/</code>
错误肯定是使用 XMLHttpRequest 引起的。
如何修复：确保请求的URL是正确地，它遵守同源策略。最好的方法是从代码中找到错误信息指出的URL。

####InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable####
相关错误：<code>InvalidStateError, DOMException code 11</code>
代码调用的方法在当前状态无法调用，通常由<code>XMLHttpRequest</code>引起，在方法准备完毕之前调用它会引起错误。
<pre>
	var xhr = new XMLHttpRequest();
	xhr.setRequestHeader('some-header', 'val');
</pre>
这时就会出错，因为<code>setRequestHeader</code>方法只能在<code>xhr.open</code>方法之后调用。
如何修复：查看错误指出的行号，确保代码运行的时机正确，或者在它之前添加了不必要的调用

###结论###
我看过不少不用的javascript错误，比如PHP中声名狼藉的异常<code>Expected T_PAAMAYIM_NEKUDOTAYIM</code>.抛出更熟悉的错误才更有意义，现代浏览器不再抛出完全无用的错误，才会更有帮助。
