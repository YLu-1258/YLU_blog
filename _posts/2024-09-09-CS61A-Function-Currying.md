---
title: 'CS61A: Function Currying'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-09 12:00:00 -0800
tags: ['CS61A', 'functions']
---

# Function Currying
- We manipulate functions such that instead of posessing multiple arguments, they become a higher order function that accepts a single argument and returns other functions to proess the other arguments.


```python
from operator import add

def curry2(f):
    def g(x):
        def h(y):
            return f(x, y)
        return h
    return g

adder = curry2(add)
add_three = adder(3)
add_three(4)
```




    7



- The curried function `curry2` can also be expressed as a nested lambda function.


```python
curry2 = lambda f: lambda x: lambda y: f(x, y)
adder = curry2(add)
adder(3)(4)
```




    7


