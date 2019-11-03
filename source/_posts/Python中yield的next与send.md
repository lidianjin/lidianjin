---
title: Python中yield的next与send
date: 2019-11-03 15:47:40
tags: 
- Python
---
一个函数定义中包含`yield`关键字，那么这个函数就不再是一个普通函数，而是一个生成器(generator). `yield`在生成器中有中断的功能, 因此: 

- 生成器可以传出数据, 通过调用`next()`.
- 通过`send()`, 可以传入数据进行计算, 并返回.

本文通过2个例子, 分别讲这两个方法.

<!--more-->

- *环境: Ubuntu18.04, Python 3.6.8*

# 1. `next`

1. 先上代码和运行结果: 

   ```python
   def foo():
       """"""
       print("hello")
       while True:
           result = yield 4
           print(f"result: {result}")
   
   
   generator = foo()
   print(next(generator))
   print("-" * 10)
   print(next(generator))
   ```

   ```python
   hello
   4
   ----------
   result: None
   4
   ```

2. 下面开始分析. `generator = foo()`得到一个生成器对象. 此时`foo()`函数并未执行.

3. 直到调用`next(generator)`, `foo()`开始执行. `print("hello")`后, 进入while循环.

4. 先执行`yield 4`, 返回一个4, 然后产生一个**中断**. 此时, **并未赋值给`result`**.

5. 这时, 程序的输出为: 

   ```python
   hello
   4
   ```

6. 接下来, 继续执行`print("-" * 10)`, 输出`----------`.

7. 又调用`next(generator)`, 回到`yield`**产生中断的地方继续执行**, 即执行赋值操作.

8. 可是, **4已经被返回**, 所以赋值给`result`的是`None`.

9. 然后, 执行`print(f"{result}")`.

10. **继续执行while循环**, 又碰到`yield 4`, 返回4, 产生一个中断.

11. 这时, 程序的输出为:

    ```python
    result: None
    4
    ```

12. 小结: **调用next(), 是接着上一次调用next()的中断处, 继续执行**.



# 2. `send`

1. 先上代码和运行结果: 

   ```python
   def foo():
       """"""
       print("hello")
       while True:
           result = yield 4
           print(f"result: {result}")
   
   
   generator = foo()
   print(next(generator))
   print("-" * 10)
   print(generator.send(8))
   
   ```

   ```python
   hello
   4
   ----------
   result: 8
   4
   ```

2. 和上一个例子的**区别**, 在于最后一行`print(generator.send(8))`.

3. 从`print("-" * 10)`开始, 因为前面的代码和上一个例子一样.

4. 接下来, 执行`generator.send(8)`. 回到`yield`**产生中断的地方继续执行**, 即执行赋值操作.

5. 上面已经说过, **4已经被返回**. 这时候, **`send()`传进来的`8`会被赋值给`result`变量.**

6. 然后, 执行`print(f"{result}")`: 

   ```python
   result: 8
   ```

7. **继续执行while循环**, 又碰到`yield 4`, 返回4, 产生一个中断.

8. 打印`4`, 程序结束.

9. 小结: `send(value)`恢复执行并向生成器函数"发送"一个值. `value`参数将成为当前`yield`表达式的结果. 此外,  `send()`方法会返回生成器所产生的下一个值(这里返回4).

10. 提示: 当调用`send()`来**启动生成器**时, 它必须以`None`作为调用参数, 因为这时没有可以接收值的 yield 表达式. 否则, 会报错`TypeError: can't send non-None value to a just-started generator`.

    - 上面例子中, 在`send()`前已使用`next()`启动生成器.

11. 综上, 一个函数包含`yield`关键字, 它就是一个生成器. 调用`next()`, 可以从生成器中传出数据. 而调用`send()`, 可以向生成器中传入数据. 

12. 此外, Python中协程的实现, 也是基于`yield`的原理.



> 参考链接:

1. https://docs.python.org/zh-cn/3/reference/expressions.html?highlight=yield%20send#generator.send
2. https://blog.csdn.net/mieleizhi0522/article/details/82142856#commentBox

