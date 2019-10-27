---
title: vim一键执行Python代码
date: 2019-10-27 10:22:52
tags: 
categories: 
- VIM
---

Ubuntu下使用VIM来编写python代码，但是每次编写代码后要退出VIM再：`python xxx.py`才可以执行代码.

在VIM的配置文件中添加一些配置，可以编写完代码后不用退出,一键执行Python代码.

本文分为4个部分:  准备工作, VIM的配置文件在哪, 修改VIM的配置文件, 一键执行Python代码.
<!--more-->


# 1. 准备工作

- 系统: Ubuntu18.04
- VIM: version 8.0.1453

# 2. VIM的配置文件在哪

1. 首先,进入VIM,执行命令`:version`.往下拉,就可以找到如下代码:

   ```shell
      system vimrc file: "$VIM/vimrc"  # 系统配置文件,更改会影响所有的用户
        user vimrc file: "$HOME/.vimrc"  # 用户配置文件,只会影响当前用户
    2nd user vimrc file: "~/.vim/vimrc"
         user exrc file: "$HOME/.exrc"
          defaults file: "$VIMRUNTIME/defaults.vim"
     fall-back for $VIM: "/usr/share/vim"
   ```

2. 接下来,修改**用户配置文件**.但是,Ubuntu18.04默认情况下,VIM**没有**用户配置文件.

   - 解决方案: 在用户目录下,手动建立`.vimrc`文件.例如,`vim .vimrc`.
   - 提示: vimrc前有一个**点**.

3. 最后,简单测试一下,创建的`.vimrc`文件是否有效.

   - 在`.vimrc`文件中添加一行代码:

     ```shell
     set number "显示行号
     ```

   - 退出VIM,再重新进入,就会看到左侧有行号标识.如下:

     ```shell
      1 set number "显示行号
     ```

# 3. 修改VIM的配置文件

1. 在`.vimrc`中添加:

   ```shell
   " F5 to run sh/python3
   map <F5> :call CompileRunGcc()<CR>`
   func! CompileRunGcc()
       exec "w"
       if &filetype == 'sh'
           :!time bash %
       elseif &filetype == 'python'
           exec "!time python3.6 %"
       endif
   endfunc
   ```

2. 说明:

   - F5一键执行代码,可以自定义.
   - 一键执行shell脚本的部分,不需要可以去掉.
     - 需配置更多一键执行的文件类型,点击文末参考链接.
   - 注意: 
     - Python3.6改成自己对应的版本.
     - Ubuntu18.04默认安装Python2.7和Python3.6.

# 4. 一键执行Python代码

1. 首先,编写测试Python代码:

   ```python
   print("F5 OK")
   ```

2. 接着按F5一键运行:

   ```shell
   F5 OK
   
   real	0m0.081s
   user	0m0.066s
   sys	0m0.013s
   
   Press ENTER or type command to continue
   ```

3. 然后按Enter回到编辑界面.十分丝滑的体验!

   

> 参考链接

1. https://blog.csdn.net/diagnoa_wleng/article/details/82862237
   - 一键执行更多文件类型
2. https://www.cnblogs.com/hawkboy/articles/2991371.html
3. https://blog.csdn.net/cpongo3/article/details/93853914

