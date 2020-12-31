---
layout: post
title: Learning-Backbone-1
date: 2015-01-31 13:15:51
tags: [javascript,Backbone]
---
今天开始，进行Backbone的学习笔记了。
###模型###
Backbone模型包含应用程序里地数据以及数据相关的逻辑。例如：可以使用一个模型来表示一个待处理项，它包含了像title和compleated的属性。
可以看下面的代码：c
<pre>
var Todo = Backbone.Model.extend({});

var todo1 = new Todo();
console.log(JSON.stringify(todo1));

var todo2 = new Todo({
	title:"Check the attributes of both model instance in console.",
	compleated:true
});
console.log(JSON.stringity(todo2));
</pre>
