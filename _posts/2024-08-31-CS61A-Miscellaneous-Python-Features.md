---
title: Miscellaneous Python Features
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-08-31 02:00:00 -0800
tags: ['CS61A', 'Python']
---

# Overview
* Operators
* Multiple Return Values
* Docstrings
* Doctests
* Default Arguments

# Operators
- Shorthand notation for calling builtin functions.


```python
from operator import add, mul

(2+3*4+5) == add(add(2,mul(3,4)),5) # These are equivalent
```




    True



## Division (/ and //)
- Two types of division: **True Division** and **Integer Division**
    - **True Division (`/`,`truediv()`)**: Mathematically accurate, returns answer in a float.
    - **Integer Division (`//`,`floordiv()`)**: Returns the number of time the divisor multiplies into the dividend. In other words, it returns the answer in an integer, truncated.




```python
from operator import truediv, floordiv
print(2013 / 10 == truediv(2013,10))
print(2013 // 10 == floordiv(2013,10))
```

    True
    True


## Modulus (%)
- Returns an integer remainder, the remainder of the division operation.


```python
from operator import mod
2013 % 10 == mod(2013,10)
```




    True



# Multiple Return Values
- A function can return multiple values. Split the remainder into two values with a comma.


```python
def divide_exact(n,d):
    return n // d, n % d

quotient, remainder = divide_exact(2024,10)
print(quotient, remainder)
```

    202 4


- If we execute a python file with the `-i` flag, we are able to enter interactive mode, which gives us a python interpreter shell containing all the code that was defined in the source file.

# Docstrings
- 61A convention: formal parameters are capitalized in the docstrings

## Doctest
- Doctests are a string demonstrating how the function would behave when ran.
    - It emulates the interpreter environment.
- We can simulate the doc tests with the `python3 -m doctest -v <filename>` command.
    - If successful, nothing happens
    - If not, error
    - We can also add the `-v` flag after the doctest option to see more verbose information.
- The `-m doctest` essentially runs the python file with the doctest module.

## Default Values
- We can use the assignment operator `=` to assign a default value to a function.
    - If we call the function without defining that value, it will use the default value instead. We keep them towards the end as any arguments are automatically applied to the front arguments.


```python
def divide_exact(n=2024,d=10):
    """Returns the quotient and remainder of dividing N by D.
    >>> q, r = divide_exact(2024, 10)
    >>> q
    202
    >>> r
    3
    """ 
    return n // d, n % d
```
