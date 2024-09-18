---
title: 'CS61A: Decorators'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-11 12:00:00 -0800
tags: ['CS61A']
---

# Decorators
- We can wrap functions with another function such that whenever we call the function itself, it is being used as an argument for the decorator function.


```python
def trace(fn):
    """Return a version of fn that first prints before it is called
    
    fn - a function of 1 argument
    """
    def traced(x):
        print('Calling', fn, 'on argument', x)
        return fn(x)
    return traced

# This is the same as calling square = trace1(square)
@trace
def square(x):
    return x * x

@trace
def sum_squares_up_to(n):
    k = 1
    total = 0
    while k <= n:
        total, k = total + square(k), k + 1
    return total

sum_squares_up_to(12)
```

    Calling <function sum_squares_up_to at 0x7f954cf2b0a0> on argument 12
    Calling <function square at 0x7f954cf2b2e0> on argument 1
    Calling <function square at 0x7f954cf2b2e0> on argument 2
    Calling <function square at 0x7f954cf2b2e0> on argument 3
    Calling <function square at 0x7f954cf2b2e0> on argument 4
    Calling <function square at 0x7f954cf2b2e0> on argument 5
    Calling <function square at 0x7f954cf2b2e0> on argument 6
    Calling <function square at 0x7f954cf2b2e0> on argument 7
    Calling <function square at 0x7f954cf2b2e0> on argument 8
    Calling <function square at 0x7f954cf2b2e0> on argument 9
    Calling <function square at 0x7f954cf2b2e0> on argument 10
    Calling <function square at 0x7f954cf2b2e0> on argument 11
    Calling <function square at 0x7f954cf2b2e0> on argument 12





    650


