---
title: 'CS61A: Iteration'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-02 02:00:00 -0800
tags: ['CS61A', 'Iteration']
---

# Iteration
- The act of repeating things.
- In programming, we use loops to perform iteration.

## While Statements
- Compound statement that contains a condition (header) and a suite of expressions.
- **Execution Rule for While Statements:**
    1) Evaluate the header's expression  
    2) If it is a true value, then the whole suite is executed, then return to step 1.  


```python
i, total = 0, 0
while i < 3: # Boolean context
    i = i + 1
    total = total + i

print(i, total)
```

    3 6


## The Fibonacci Sequence
- 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, ...
- Every number within the fibonacci sequence is associated with its index.
 - The zeroth and first fibonacci numbers are 0 and 1 respectively.
- Tiles of length of fibonacci numbers will form the golden spiral.



```python
def fib(n):
    """Compute the nth Fibonacci number, for N >= 1."""
    pred, curr = 0, 1   # 0th and 1st Fibonacci numbers
    k = 1               # curr is the kth Fibonacci number
    while k < n:
        pred, curr = curr, pred+curr
        k = k + 1
    return curr

fib(0)
```




    1



# Discussion Question,
Given the following code, is this `fib` the same or different from the original `fib`?

This fib is different from the original fib, but still correctly prints out the sequence. Instead, this algorithm is capable of returning the zeroth element too


```python
def fib(n):
    """Compute the nth Fibonacci number, for N >= 1."""
    pred, curr = 1, 0   # 0th and 1st Fibonacci numbers
    k = 0              # curr is the kth Fibonacci number
    while k < n:
        pred, curr = curr, pred+curr
        k = k + 1
    return curr

fib(0)
```
