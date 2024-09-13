---
title: 'CS61A: Functional Abstraction'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-09 12:00:00 -0800
tags: ['CS61A', 'lambda', 'environments']
---

# Lambda Function Environments
- A lambda function's parent is the frame where the lambda expression is evaluated (where lambda appears).


```python
a = 1
def f(g):
    a = 2
    return lambda y: a * g(y) # This lambda has is evaluated in the frame of f, so its parent is f, and hence a is 2

f(lambda y: a + y)(a) # Both a's here are called in the global frame, which refers to 1
```

# Return
- Returning means ending a function call and determining the value of the call expression
- Execution processes of f(x), a user-defined function
    - Call f(x)
    - Switch to a new environment
    - Execute the body of f
    - Switch back to the former environment
    - f(x) now has a value
- A function will only ever execute one return statement.



```python
def end(n,d):
    """Print the final digits of N in reverse order until D  is found.
    >>> end(34567, 5)
    7
    6
    5
    """
    while n:
        last, n= n % 10, n // 10
        print(last)
        if last == d:
            return
        
end(34567, 5)


```

    7
    6
    5



```python
def search(f):
    x = 0
    while True:
        if f(x):
            return x
        x+=1

search(lambda x : (x+1) % 21 == 0)
```




    20




```python
is_three = lambda x: x==3
square = lambda x: x * x
positive = lambda x: max(0, square(x) - 100)

def inverse(f):
    """return g(y) such that g(f(x)) = x"""
    return lambda y : search(lambda x: f(x) == y)

sqrt = inverse(square)
sqrt(256)
# sqrt(2) This would continue to run forever, as 2 is not a perfect square. 
```




    16



# Abstraction
- Assigning names to a computational process to recall the process without redefining the process' details.
- Names do not matter for correctness, but matter for composition.
    - Good names = good redability
    - Names should convey the meaning/purpose of a value that they are bound to
    - Type of value bound to the name should be documented within the function's docstring
    - Function names can either convey their effect, hehavior or value returned. 

# Errors & Tracebacks
- Three types of erros
    1) Syntax Errors: Detected before program starts executing, caused by improperly written expressions  
    2) Runtime Errors: Detected by interpreter while the program is running. A traceback is created that describes what line induced the error.  
    3) Logical/Behavorial Error: Not an error with Python, but the program just doesn't do what its meant to do.
