---
layout: post
title: Gulp-4.0-update-preview
date: 2015-02-03 22:02:12
tags:
---
Gulp 4.0 发布在即，[新首页已经上线](http://gulpjs.com/)，新版将会对任务系统做较大的修改，不再兼容3.X及之前版本的任务系统。<!--more-->
###新年新气象
- 新的任务系统(基于bach，替换掉了基于orchestrator 的任务系统)
- 移除`gulp.reset`
- `gulp.task`不再支持三个参数的用法
- `gulp.task`用字符串注册的任务必须死直接在命令行中调用的任务
- `gulp.task`可以接受单参数语法，这个必须是一个命名函数，函数名会被作为任务名
- 添加了`gulp.series`和`gulp.parallel`方法用于组合任务
- 添加了`gulp.tree`方法用于获取任务树，传入`{deep:true}`参数可以得到一个`archy`兼容的节点列表
- 添加了`gulp.registry`方法以定制注册表
- 添加了`gulp.symlink`方法，功能和`gulp.dest`一致，不过是以软链接的方式
- `gulp.dest`和`gulp.symlink`方法添加了`dirMode`参数允许对目标目录更好地控制
- `gulp.src`接收的文件匹配字符串会顺序解释，所以你可以写成这样 `gulp.src(['*.js', '!b*.js', 'bad.js'])`（排除所有以` b `开头的 JS 文件但是除了 `bad.js`）
- `gulp.src `方法添加了 `since` 选项，筛选在特定时间点之后修改过的文件（用于增量编译）
- 将命令行分离出来成为一个独立模块，以便节约带宽/空间。用 `npm install gulp -g `或 `npm install gulp-cli -g `都可以安装命令行，只是 `gulp-cli `不包含模块代码所以比较小
- 命令行添加了 `--tasks-json` 参数，可以导出整个任务树以供他用
- 命令行添加了 `--verify` 参数用以检查 `package.json `中是否包含黑名单插件（违背准则而被禁入官方插件列表的可怜娃们）。