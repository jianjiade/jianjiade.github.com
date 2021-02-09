
const fs = require('fs');
const PinYin = require("pinyin");
const path = require('path');

function todo () {
    const list = process.argv[2];
    const pinyinList = PinYin(list, {
        style: PinYin.STYLE_NORMAL
    });
    const contain = template(list);

    const componentDir = path.resolve(__dirname, '../')

    console.log(componentDir);
    // return;
    const filePath = `${componentDir}/_posts/${list}.markdown`;
    fs.writeFile(filePath, contain,'utf8',function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('写入成功');
    })
}

todo();

module.exports = todo;

function template(title){
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
        }

    const pinyinList = PinYin(title, {
        style: PinYin.STYLE_NORMAL
    });
    const showTitle = pinyinList.join('-');
    const date = new Date();
    const dateString = date.Format("yyyy-MM-dd hh:mm:ss");
    const temp = `---
layout: post
title:  ${showTitle}
date:   ${dateString}
header-img: "img/Lamei-2.jpeg"
author:     "xqian"
categories: 

---

### ${title}
    `;

    return temp;
}


function format(){
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
        };
        
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
}


/**
 * 
 

 ---
layout: post
title:  "2021年1月最后一周的记录"
date:   2021-02-01 09:00:00 +0800
header-img: "img/Lamei-2.jpeg"
author:     "xqian"
categories: 

---


 */