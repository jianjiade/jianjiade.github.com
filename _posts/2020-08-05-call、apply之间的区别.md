---
layout: post
title: call、apply之间的区别
date: 2015-08-05 22:22:29
categories: 
---
在ECMAScript3 给Function的原型定义了2个方法，它们分别是Function.prototype.call和Function.prototype.apply。在实际的开发中，特别是一些函数式编程中，call和apply方法尤其有用。反正我也不懂什么是函数式编程，最近也出了一本JavaScript方面的书，函数式编程，有兴趣的同学可以自己去看看。<!--more-->
### call和apply的区别
先说下call和apply的区别，区别嘛，好像就是传入的参数不同，它的作用完全是一样的。
apply接受2个参数，第一个参数制定了函数体内this对象的指向。第二个参数为一个带下标的集合，这个集合可以为数组，可以为类数组，apply方法把这个集合中得元素作为参数传递给被调用的函数：

        var fun = function(a, b, c){
            alert([a, b, c]);
        }
        fun.apply(null, [1, 2, 3]);
        //输出的结果就是：[1, 2, 3]

这个栗子呢参数1 2 3 被放入数组中，一起传入fun，他们分别对应fun中的a b c。
call呢，我自己觉得它就是apply的语法糖，实例化了apply得方法。它的第一个参数也是代表函数体内的this的指向，从第二个参数开始往后，每个参数被依次传入函数。

        var fun = function(a, b, c){
            alert([a, b, c]);
        }
        fun.call(null, 1, 2, 3);
        //输出的结果就是:[1, 2, 3]

当调用一个函数时，JavaScript的解释器并不会计较形参和实参的数量，类型，以及顺序上得区别，JavaScript的参数在内部就是用一个数组来表示。从这个意义上，apply比call使用的频率高。因为，编写程序的时候，不用考虑参数的个数，只要一股脑儿的全部丢过去，就好了。call就是包装在apply的语法糖，如果明确地知道函数接收多少个参数，那么就可以一目了然的表达清楚要表达的，如果不是，apply是你最好的选择。
如果我们在传入的参数中，第一个是null无论是call或者apply那么函数体内的this都是window，但是如果在严格模式strict下，this还是null。看下面的栗子。

        var fun = function(a, b, c){
            alert(this === window);
        }
        fun.apply(null, [1, 2, 3]);
        //输出的结果就是：true

        var fun = function(a, b, c){
            'use strict'
            alert(this === null);
        }
        fun.call(null, 1, 2, 3);
        //输出的结果就是：true


有时候使用call或者apply的目的不在于指定this指向，而是另有用途。比如借用其他对象的方法。那么我们可以传入null来代替某个具体的对象：

        Math.max.apply(null, [1, 2, 3, 4, 5]); // 输出为5

### call和apply的用途
上面也提到过一些，之前关于this的那篇文章也有提到。
####改变this的指向
改变this的指向呢，上一篇详细的讲述了，这里就不多说了。
#### Function.prototype.bind
大部分现代浏览器都支持了Function.prototype.bind的方法，但是还是有部分浏览器不支持这个方法的，不支持怎么办呢，为了兼容这个浏览器没办法只能写hack了，可以自己手动的实现这个bind。

        Function.prototype.bind = function (content) {
            var self = this;
            return function (){
                return self.apply( content, arguments );
            }
        };
        var obj = {
            name: "蒹葭从风"
        };
        var fun = function (){
            alert( this.name );
        }.bind(obj);// 蒹葭从风
        fun();

通过Function.prototype.bind来包装fun函数，并且传入一个对象content当作参数，这个content对象就是我们想要修正的this对象。
#### 借用其他对象方法



