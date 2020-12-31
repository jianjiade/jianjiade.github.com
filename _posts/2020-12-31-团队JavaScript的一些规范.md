---
layout: post
title: 团队JavaScript的一些规范
date: 2016-08-21 22:31:29
tags:
---


### 命名规范
#### 全名总体规范
1. 尽量以英文名命名，避免出现拼写错误

	```
	//restful返回字段fistchar拼写错误
  var firstChar = city.fistchar.toUpperCase();
  //框架写错
  model.excute(...)
  //单词拼写不规范
  detailinfo.rainfos = pts.modeldata.boxs[0].rainfos;
  ```

2. 除非特殊情况，如约定，不得以拼音方式命名（包括注释）

	```
	 //周边
	 zbAction: function (e) {
	```

<!--more-->
3. 同一含义的命名，统一用一种英文单词，如gologin, gosign, 并且前后端命名一致

 	```
 	//是否登录
 	isLogin: function () {...
 	//去登录
   goSignin: function (e) {...
  ```

4. 尽量不要缩写，非要缩写，英文缩写按音节，并以辅音结尾
	[查看百度文库缩写](http://wenku.baidu.com/link?url=ml6os4CXN0DqPnwI5DWtMlzldz6dGqpoTa_G8lADWUBWyCoMwgFM23uNrrm1ygCSs1zbbacYN9vOuNcgOzG_VOLJuJRALpzy015QKL2xlqu)
5. 命名必须望文生意，可读性强

	```
	//好
	 getBoxResById: function (id) {
	//不好
	getRes:function(boxid){

	```

6. 禁止使用单字符命名

	```
	var p = this.getPassengerById(id);
	function a(){...};
	```

#### 文件及文件夹命名
1. 全部小写文件名.扩展名

	```
		citylist.js//注意文件名全小写，避免linux和window不同系统开发时，大小写敏感不一致问题
	```

2. 以.号分割，不得以_等其它分割符

	```
	//约定不要这样写
	require_config.js
	//推荐都用.分割
	require.config.js或者requireconfig.js
	```

4. 同一功能职责集的文件，拆分后，以相同前缀开始，如index.\*.js, booking.\*.js

	```
	index.js
	index.search.js //表示对index.js的功能扩展搜索功能
	index.siderbar.js//表示对index.js的功能扩展边栏功能
	```

#### 变量（包括实例变量）

```
//采用驼峰命名法
var ticketService = TicketService.getInstance();

//私有变量可以_开头，但尽量少用
var _index = $(e.currentTarget).index() + 1;

//通过选择器获取的dom节点引用，可以用$开头
var $bookingContainer = this.$el.find(...);

//多个变量声明时，推荐采用单var模式声明变量
var foo = 1,//多个变量竖向排列
	bar = 2,//推荐=号对齐
	coo;//未初始化的放在最后

//变量最好不要用动词开头
var getTicketCount = 2; //不好的写法
```

#### 方法
驼峰命名

```
/**
* 点击当地玩乐右边几个标签
* @param e
* @author jianjia.de
*/
activityCategoryAction: function (e) {
```

布尔型getter 以is等开头如isLogin()

```
 isLogin: function () {
            return islogin;
        },
```

其它getter 以get开头，如getSelectedCity()

```
 getSpotId: function () {
            return spotid;
        },
```


setter 以set开头，如setLogin()

```
setLogin: function (value) {
            islogin = value;
        },
```
private或protected方法可以用_开头，表示外部禁调用_开头的方法

```
getPassengerCount: function (ticketId) {
  ...//此处省略N行
  return this._getPassengerCount();
},
_getPassengerCount: function (ticketId) {
```

public方法不得以_开头，并且必须有多行注释

```
/**
* 获取票张数
* @param ticketId {number}
* @returns {*}
*/
getTicketCount: function (ticketId) {
  ...//此处省略N行
},
```

方法参数不得超过4个，否则要柯理化

```
//不好，参数太长了
function foo(arg1, arg2, arg3, arg4, arg5...){

//柯理化
function foo(options){
	var arg1 = options.arg1,
		arg2 = options.arg2,
		...
```

方法名最好用动词或以动词开头命名

```
//获取pageid
pageid: function (hash) {//不推荐写法，应该用getPageId
  var pageids = pageId.pageid;
  return pageids[hash] ? pageids[hash][0] : "";
}
```


方法名不要缩写

```
function getTid(){...}//不好
function getTicketId(){}//推荐
```

#### 常量
全部大写，并以_号分割如

```
 var MANUAL_SWITCH_TIP = '定位不到当前城市，可手动切换',
     MANUAL_ENABLE_GEO = '定位未开启<br />请到手机设置中开启定位服务';
```

字符常量， 如模拟枚举等，值与常量名一样

```
define({
    //订单页消息常量
    BOOKING_NOTIFICATION: {
        BOOKING_LOGIN_INFO_READY: 'BOOKING_LOGIN_INFO_READY',
```

#### 类名
 类名以大驼峰（帕斯卡）命名法，即以大写开头的驼峰命名法
 实例名小驼峰全名法，（单例）与类名一致

```
var TicketCityService = require('TicketCityService');
var ticketCityService = TicketCityService.getInstance();
```

### 代码格式规范
#### 注释
单行注释 // 注释内容（注意注释内容行首//后有个空格）
多行注释（注意注释内容行首\*后有个空格）
/**
 * 注释内容
 */

+ 注释保持简洁，可读性强，不要冗余
+ 单行注释过长也可另起一行
+ 模块文件， 必须包含@description,@author,可选@version,@createDate

	```
	/**
	 * @description 订单填写
	 * @author jianjia.de
	 */
	define(function (require) {
	```
+ 方法注释, 必须包含@description,@param，可选@return,@deprecated

	```
	/**
	* 渲染推荐门票数据
	* @param data 门票返回数据
	* @param city
	* @deprecated
	*/
	renderRecommendTicket: function (data, city) {
	```

+ public方法必须有且用多行注释，private/protected方法可用单行注释

	```
	//根据门票资源id, 获取这张票要填写几个出行人
	_getPassengerCount: function (ticketId) {
	```

+ model注释，必须包括@description,@author,@version

	```
	/**
	* @description:  首页精选门票
	* @author:       jianjia.de
	* @version 6.18
	*/
	TicketRecommendProductListModelV1: {
 ```
+ 如有链接请加上@link或@see

	```
	//@link http://conf.exmaple.com
   var AdSlider = require('AdSlider'),
   ```
+ 代码中注释，没必要留着的，要定期清理，除非某些需求必须先放着，以防产品变更
+ 方法内一律使用单行注释，当需要多行时，可用单行叠加
+ 待优化或修复的代码前加//TODO和//FIXME注释, 一般编辑器都会有提示

	```
	 for (var i = 0, len = cities.length; i < len; i++) {
	//Fixme jianjia.de 6.19验证一下，删除以下无用数据
	...

	<!--使用方法。TODO:@weiyh.6.20写到js里去,这模板太繁杂了。-->
  <%var useage = _.find(ticket.rainfos || [], function(item) {
        return item.subtcode == '13' && _.size(item.desclist);
    }), qkdesc = '';

	```
+ 测试用的一些注释，别提交上来

  ```
  ////////////test commit

	return TicketStore;
	```

#### 引号
+ 字符串统一用单引号，html片断统一用双引号

	```
	url: 'RecommendProductListV1QOC',
	var tpl='\<div class="xxx"\>{...}\</div\>'
	```
+ json对象的key如果不是关键字，统一不用加引号

	```
	var config = { buEvn : 'dev'}//buEvn没必要加此号，dev加单引号
	```

*在网上也有很多争论，大家可以参考道格拉斯大神的说法，双引号看起来很脏，而且要多敲一下shift;*

#### 数字

```
var count = 100;//整数
var price = 100.5;//小数
var price = 100.; //禁止省略小数
或var price=.5//禁止省略整数
var count = 0xf5;//可以用十六进制
var count = 4e23;//可以用科学计数
var count = 010;//禁止使用八进制写法
```

#### 对象直接量

```
//不好的写法
var obj = new Object();
obj.a =1; obj.b=2; obj.c=3;
//google和crockford推荐写法
var obj = {a:1, b:2, c:3};
//或者已有对obj时，用
_.extend(obj, {a:1,b:2,c:3};
```
#### 缩进
统一以4个空格缩进排版，请应用.editconfig配置

#### 空格
这说来话长长长，请应用webstorm默认配置，比如=号两边空格。
参考门票项目views/index.js为范本

#### 句末不要偷懒省略分号
在某些情况下，会出错或未按预期效果执行，如

```
var foo = abc//后面没加分号，导致压缩执行错误
(function(){})();
```
```
function abc(){
	return
	{a:1};//两个错1.return后没加;号2.{另起一行
}
```

#### 左{号不得另起一行
*这里是有争论，但是google等公司都明禁止此行为，说来也话长，大家先遵守了*

#### 对象最后一行以“,”结束
这点不强要求，但用React的童鞋必须加，但这已经是ES6规范，避免在新增时，版本控制多一条记录

```
var config = {
	key1:111,
	key2:222,
}
```

#### 单行长度

一般以笔记本全屏最长不需横向滚屏值为最大容忍值，这里估且约定为150，以不超过100行为最佳
*编辑器可以配置*
*横向滚屏对于纯键盘操作，简直是噩耗，而且代码一个长横条也很不美观*

#### 单文件行数
单个文件，最长行数约定最长容忍行数是1500行， 以不超过1000行最佳。
*编辑器可以配置*

#### 对齐
一般js编辑器都会自动对齐和缩进，比如花括号对齐，然而有些模板文件，因为解析不好，需要手工对齐

```
<%if(...){%>
	....
	<%arr.forEach(function(){
	...
	<%}}%>//这样写虽然没错，但很容易看走眼了，请把}号分开
```

还有很多，不穷举了, 用vi的某些少年，注意对齐

#### 块嵌套
块嵌套不宜过深，约定不得超过4层，以不超过3层最佳

```
//过多的枪套会让代码呈现麻花状，可读性变差
if(a){
	if(b){
		if(c){
			if(d){
				}
			}
	}
}
//可能改造写法如下
if(!a) return;//能return则return
if(!b) return;
if(c){
	if(d){
	}
}
```

#### 空行
+ 方法之间加空行

	```
	/**
	* 身份证后的X全部转成大写
	*/
	replaceX: function () {
	...
	},

	/**
	* 获取出行人数量
	* @param ticketId {number}
	* @returns {number}
	*/
	getPassengerCount: function (ticketId) {
	  ...
	},
	```

+ 方法内，代码逻辑相对独立的行，用空行隔开

	```
	/**
	* 精选推荐最后,点击查看{cityname}全部{total}条产品事件处理
	*/
	moreRecommendAction: function (e) {
	  e.preventDefault();
	  var data = this.recommendData;
	  if (!data) return;

	  var _cityInfo = this.getSelectedCity();
	  this.traceLog.log(Ubt.UBT_URL.INDEX.INDEX_MORE_RECOMMEND, {
	      hash: 'index',
	      cityid: _cityInfo.id
	  }, Ubt.UBT_KEY.HOME);

	  if (data.mcount === 0 && data.total > 10) {//直接查看cityname全部产品
	      this.listAction(1);
	      return;
	  }

	  if (data.isosea) {//国外：查看{国家}全部产品                
	      ...
	  } else if (data.total) {//国内：城市及周边
	     ...            
	  } else {//国内：城市周边
	     ...
	  }
	},
	```


+ 变量/常量归类var时，也用空行隔开

	```
	var Guider = require('cGuider'),

	var rightMenu = TicketConfig.h5.indexMenu, //首页右侧菜单
	   	 leftBack  = TicketConfig.h5.indexBack; //首页后退是否禁止

	var MANUAL_SWITCH_TIP = '定位不到当前城市，可手动切换',
   		MANUAL_ENABLE_GEO = '定位未开启<br />请到手机设置中开启定位服务';
   ```



### 常见写法规范
#### 事件
+ 尽量采用委托方式注册事件（都懂的）
+ 事件处理时e.preventDefault()一下，以防止如默认跳转。
+ 事件尽量注册在自定义的class或id下，而不是csser提供的样式名，以防样式变更引起bug

```
events: {
  "click .tkt-pop-container ul li": "loginTab",//不好，UI调整时，样式有可能会变
  "click .gomorecalendar": "goCalendar",//不好，自定义class与csser应用的class混杂
  "click #ticket-booking-moretickets": "goMoreTickets",//可以,但不推荐因为id是唯一的
  'click .js_checkInsu': 'checkInsu', //好，推荐
```
+ 事件回调函数统一用*action， 如果是序列节点，则以itemAction结尾

```
/**
* 精选特价点击处理
* @param e
*/
recommendItemAction: function (e) {
```

+ 相同/嵌套的节点，避免以不同的选择器，重复注册为不同的回调
	*现场演示更换优惠券代码*

#### amd/cmd写法
同一模块编写时，amd, cmd写法，只能用一种，否则打包后，在某些webview下会报错

```
//不行
+ define(['a'],function(a){ var b=require('b');...});//混着写H5ok,但是...呵
//可行
define(['a','b'],function(a,b){...});
define(function(require){var a=require('a'),b=require('b')});

```

#### 条件/循环语句中不要有赋值操作

```
if(a=b){...}
while(el=...){...}
```

#### 条件/循环语句后跟"{"

```
// 不好的写法
if(con)
	doSomething();
// 可以容忍的写法
if(con) doSomething();
// 推荐的写法1
if(con) {
	doSomething();
}
// 推荐写法2
con && doSomething();
```
*其它for, while, do..while, try..catch..finally同理*

#### 尽量使用原生新方法(es5)，而不是框架的方法

```
var arr = [1,2,100,3,20,9];
找出item>10的集合
//不推荐的写法
for(var i=0, tmp=[];i<arr.length;i++){
	if(arr[i]>10){
		tmp.push(arr[i]);
	}
}
// 推荐写法1
var tmp = arr.filter(function(item){return item>10});

// 推荐写法2
// 在不确定arr是否有值，并且是数组的情况下，可使用如下，但尽量用推荐1，效率高一些
var tmp = _.filter(arr,function(item){return item>10});
```
*其它find, some, every等es5新增的api都用起来*

#### 禁止使用eval和with
效率太差，underscore模板引擎就有这货，干死

#### 尽量少用try..catch
除非特殊情况，能不用try解决，尽量不要用，加了这货性能就变差了

#### 禁止放空异常

```
try{
	doSomething()
}catch(ex){
	//nocode here
}
```

#### 使用三等而不是双等

```
//举个小例子（被坑死的案例还有很多）
null==undefined;//true
new Object(1)==1;//true;
```

#### 选择器
尽量减少对dom节点的遍历，已选择过的节点，尽量在模块create/show的时候保存引用

```
//不好
var a = this.$el.find(x a);
var b = this.$el.find(x b);
var b2 = this.$el.find(x b);

//应该
var x = this.$el.find(a),
a=x.find(a),
b=x.find(b),
b2=b;
```

#### 全局全变
目前只允许ticket单全局变量，除非是框架已经挂好，如network
**污染全局变量，初学者容易范的错，老鸟有时也会阴沟翻床，可以用辅助工具检查**
**有些JS框架会采用命名空间的形式，来管理单全局变量，但我们项目约定不使用**

```
var myvar = 1;
myvar =2;
```
#### 及时清除记时器

```
setTimeout(function () {
    self.getGeoInfo(self.getGeoInfoOk, self.getGeoInfoError);
}, 300);

var tid = setTimeout(function () {
    self.getGeoInfo(self.getGeoInfoOk, self.getGeoInfoError);
    clearTimeout(tid);
}, 300);
```

#### 不要在原生原生方法，或框架级别的方法的原型链上加东西

```
建议把getURLParams写到项目的util里
AbstractStore.prototype.getURLParams = function () {
```

#### 配置抽离

一些常用的配置，请统一写到一个地方

```
var config = {
   logServerIP: '',//日志服务器IP
   logServerPort: '',//日志服务器端口
   logAble: false,//是否允许向服务端发送日志
   consoleAble: true,//是否允许向原生控制台打日志
   guiderPrintAble: false,//是否允许向facade打印日志
```

#### js和模板尽量分离

参考6.19的门票优惠券代码改造前，与改造后代码
模板只负责渲染,不要有过多的职责
模板文件过长，有相对逻辑独立的模块进行拆分
js文件尽量提示给模板渲染所需的所有字段，哪怕是组装出来的

*以下是出行人列表一段不要的模板代码*

```
<% if(!!template&&tickets.length==1){ %>

   <% var firstpassenger = passengers[0] || {};
       var ele;
       var language = 0;
       var viewlanguage = 0;
       if (!!template.name && !template.ename ){
           language = 1;
           viewlangusge = 1;
       }
       if (!!template.ename && !template.name){
           language = 2;
           viewlangusge = 2;
       }
       if (!!template.ename && !!template.name ){
           if(template.ename == template.name){
               language = 3;
           }else{
               language = 4;
           }
           viewlanguage = !!firstpassenger.ename && !firstpassenger.name ? 2 : 1;
       }
   %>
```

*以下推荐的js为模板准备的全部数据*

```
this.controldata.islogin = this.isLogin();
this.controldata.slide = this.isSlide();
this.controldata.showdetail = this.isShowDetail();//TODO 6.19 是否自动展开详情
this.controldata.isusecoupon = memcacheBooking.isusecoupon;
```


#### 避免重复代码
相同的代码，请不要copy过来用，即时是临时方案，也要记得重构, 写上todo

```
events: {
	returnHandler: function () {
	 Guider.apply({
	     hybridCallback: function () {
	         Guider.home();
	     },
	     callback: function () {
	         self.jump('/html5/');
	     }
	 });
	 return true;
	},
	homeHandler: function () {
	 Guider.apply({
	     hybridCallback: function () {
	         Guider.home();
	     },
	     callback: function () {
	         self.jump('/html5/');
	     }
	 });
	 return true;
	}
}
```


#### 巧用语法

```
//有点长
if (typeof json[key] === 'undefined' || json[key] === null) {
    ...
}
//简洁写法
if (!!json&&json[key]) {
    ...
}

//if写法
if(a){doSomething()};
//&&写法
a&&soSomething();
```


>感谢组里的同事一起合作写的，未完，还待补充。
