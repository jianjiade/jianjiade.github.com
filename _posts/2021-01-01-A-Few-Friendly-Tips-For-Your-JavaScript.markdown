---
layout: post
title:  "A few firendy tips for your javascript"
date:   2020-12-31 15:13:29 +0800
categories: 

---

JavaScript is a very loose programming language. By saying that I mean it’s so easy to write heaps of crap that still works, however it will be hard to maintain and to extend. In this post I’d love to present some quick and friendly tips for JavaScript beginners and it might be able to help you. Now relax and let’s get started.<!--more-->
### Know your target
Before you start writing any code, please spend a few minutes to figure out a simple question: which browsers will you write for?. Knowing your target (browser) can make a big difference because we all know the moderner the browser is, the more power you gain.

We all know how to loop an array:

```
var list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  var current = list[i];
  // more code omitted...
}

```

Later on you learned the power of jQuery, and then you started to make it simpler:

```
var list = [1, 2, 3];
$.each(list, function(index, value) {
  // more code omitted...
});

```

Now the problem is that a lot developers just don’t know that if you are targeting a browser which supports ES5, you have the full support of wrting
`Array.prototype.forEach`:

```
var list = [1, 2, 3];
list.forEach(function(element, index) {
  // more code omitted...
});

```

And if you dig a little bit more, you should find that even IE 9 supports ES5. This may not sound over exciting, but if you check this list, you can find a lot array functions natively supported. You can gain the power of map, reduce and filter etc. This means if you are NOT writing JavaScript for old browsers, you already have much more convenience. Happy?

Alright, let’s say you are still writing code for old browsers. Worry not, there’re [shims](https://github.com/es-shims/es5-shim) which can “trick” old browsers so that you can use ES5 functions on them.

Thus, know your enemy, know your browser.

### Be functional
Maybe you have heard of [functional programming](http://stackoverflow.com/questions/24279/functional-programming-and-non-functional-programming) already. This could be extremely handy when you write JavaScript.

A typical example is `Array.prototype.map`, which takes a function as input, and outputs a function in which each element is a projection of the elements from input function. Let’s have a look at the example below.

```
var oddNumbers = [1, 3, 5];
oddNumbers.forEach(function(x) {
  console.log(x);
}); // output 1, 3, 5
var evenNumbers = oddNumbers.map(function(x) {
    return x + 1;
  })
  .forEach(function(x) {
    console.log(x);
  }); // output 2, 4, 6

 ```

 As you can see that we map each number `x `in `oddNumbers` to `x + 1` so that we got the evenNumbers.
 Functional programming style is usually written in chained methods. Check the following example.

 ```
 [
  { name: 'product 1', price: 10 },
  { name: 'product 2', price: 20 },
  { name: 'product 3', price: 30 }
].filter(function(x) {
  return x.price > 10;
})
.map(function(x) {
  return x.price;
})
.reduce(function(x, y) {
  return x + y
}); // 50

```
In the code above, we first filter out products whose prices are greater than 10, then we create an array of prices on the fly, and finally we aggregate the prices to get the total price. This kind of pattern can be very powerful and flexible.

### Lint your JavaScript

If by now you still don’t know what lint is, you might already have produced a lot “bad code”. As I mentioned in the beginning, JavaScript (actually most dynamic script languages) is very loose, and unlike C#, Java, etc. you only see errors when it gets executed; in other words, you see runtime errors only. This could be quite annoying because some of those errors are human mistakes which are hard to detect by mortals’ eyes. JavaScript linting is a process that can help you avoid cheap errors and improve code quality, standard as well as consistency.

There’re many tools that can help you with linting, but I strongly recommend [ESLint](http://eslint.org/), since it supports future JavaScript standard such as ES6. You can, of course just install eslint and use it straightaway, but I challenge you to have a look at [Webpack](https://webpack.github.io/) or [Gulp](http://gulpjs.com/), and then find a way to make your linting process automatic, which means everytime you save a file, it will be scanned by ESLint.

In the meantime, I have a bonus for you. Go to have a look at the [ESLint config](http://ktei.github.io/2016/01/07/(https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)) provided by Airbnb. You can follow the readme file to configure your ESLint as strict as theirs. So easy to be professional, right?

Okay, these are just tips of Part 1. It shall be continued…

	转载自：http://ktei.github.io/2016/01/07/some-general-js-tips-1.html