---
layout: post
title:  git clean 的基本用法
date:   2021-06-01 15:12:15 GMT+0800 (China Standard Time)
header-img: "img/Lamei-2.jpeg"
author:     "xqian"
categories: 

---

## git clean 的基本用法

    ### git 删除untracked的文件及目录

    #### 删除untracked files

    `git clean -f`

    #### 删除untracked folders 

    `git clean -fd`

    #### 连 gitignore 的untrack 文件/目录也一起删掉
    `git clean -xfd`

    #### 在用上述 git clean 前，墙裂建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
    
    ```
    git clean -nxfd
    git clean -nf
    git clean -nfd
    ```