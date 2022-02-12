---
layout: post
title: JavaScript中不引入第三方变量交换a和b的值
date: 2014-10-18 22:31:38
categories: 前端
tags: [JavaScript]
---
<div>在上一家公司面试的时候，面试官出了一个问题，如何不引入第三方变量交换a和b的值。当时的回答并不好，后来回去研究了下，发现还是蛮好玩的.</div><!--more--><div>1.最省字节法 <code>a = [b, b = a][0]</code></div><div>2.数值型可用 <code>a = a + b; b = a - b; a = a - b; </code></div><div>3.恶搞法1 <code>a = {a: b, b: b = a}</code></div><div>4.恶搞法2 <code>a = a * b; b = a / b; a = a / b;</code></div><div>5.其他方法 <code>a = [b][b = a, 0]</code></div><div>6.<code>[a,b] = [b,a]</code></div><div>7.<code>a = [b, b = a][+[]]</code></div><div>8.<code>b = a + 0 * (a = b)</code></div><div>9.<code>a = a ^ b; b = b ^ a; a = b ^ a;</code><br></div>
####暂时想到这么多，你们还有什么好的想法？####