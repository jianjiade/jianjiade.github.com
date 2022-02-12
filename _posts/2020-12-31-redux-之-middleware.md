---
layout: post
title: 'redux 之 middleware '
author: 蒹葭从风
tags:
  - redux
  - JavaScript
categories: []
date: 2017-06-04 22:58:00
---
在回调中分发一个 action ，reducer 收到 action 后，更新 state 并通知 view 重新渲染。单向数据流，看着没什么问题，但是，如果需要打印每一个 action 信息来调试，就得去改 dispatch 或者 reducer 实现，使其具有打印日志的功能。又比如，点击 button 后，需要先去服务端请求数据，只有等数据返回后，才能重新渲染 view ，此时我们希望 dispatch 或者 reducer 拥有异步请求的功能。再比如，需要异步请求数据返回后，打印一条日志，再请求数据，再打印日志，再渲染。
<!-- more -->
面对多样的业务场景，单纯的修改 dispatch 或者 reducer 的代码显然不具有普适性么，我们需要的是可以组合的，自由拔插的插件机制，这一点 redux 借鉴了koa里的 middleware 的思想，另外 redux 中的 reducer 更关心的是数据的转化逻辑，所以 middleware 就是为了增强 dispatch 而出现的。
展示了应用middleware 后 redux 处理事件的逻辑，每一个 middleware 处理一个相对独立的业务需求，通过串联不同的middleware 实现变化多样的功能。 

currying 的middleware 结构的好处主要有以下两点：
1. 易串联 currying 函数具有延迟执行的特性，通过不断currying 形成的middleware 可以 i累积参数，再配合 compose 的方式，很容易形成pipeline 来处理数据流。
2. 共享store 在 appleMiddleware 执行的过程中，store 还是旧的，但是 因为闭包的存在，applyMiddleware 完成后，所有middleware 内部拿到的store 是最新且相同的。

另外，我们会发现，applyMiddleware 的结构也是一个多层currying 函数，借助compose applyMiddleware 可以用来和其他插件加强createStore 函数。

## 给middleware 分发store 
通过如下方式创建一个普通的 store 
`let newstore = applyMiddleware(mid1, mid2,mid3,...)(createStore)(reducer, null)`;
上述代码执行后，applymiddleware 方法陆续得到了3个参数，第一个是middlewares 数组，第二个是redux 原生的 createStore 最后一个是reducer 。然后，我们可以看到applyMiddleware 利用createStore 和 reducer 创建了一个store。 而store 的getState 方法和 dispatch 方法又分别被直接和间接的赋值给middlewareAPI变量store：

```
const middlewareAPI = {
	getState: store.getState,
	dispatch: (action)=> dispatch(action)
};
chain = middlewares.map(middleware => middleware(middlewareAPI))
```

然后，让每个middleware 带着middleware API 这个参数分别执行一遍。执行完后，获得chain 数组，f1,f2,f3,…fx,...fn，它保存的对象是第二个箭头函数返回的匿名函数。因为是闭包，每个匿名函数可以访问相同的store， 即middleware API。