---
title: Print and None type
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-08-30 02:00:00 -0800
tags: ['CS61A', 'None', 'Print']
---

# Forethought
Consider
```python
>>> -2
-2
>>> print(-2)
-2
```
There is a difference in the two.

# The print function and the None value
- Python has rules for automatically displaying values of expressions

## The print function
- This function prints out the value. (Duh)
- It can also print out multiple values seperated by commas
```python
>>> print(1,2,3)
1 2 3
>>>
```
- The return value of print is a `None`!

## None indicates that nothing is returned
- The None value represents the absence of a value (nothing). When we run it in the python interpreter, literally nothing happens. This is because None itself is not automatically displayed by the interpreter.
```python
>>> None
>>>
```
- If we print None with the print function, we actually see the value
```python
>>> print(None)
None
>>>
```
- If a function is not defined to return a value, it will return `None`.


# Two types of Functions

## Pure functions
- Just return values
- Ex: `abs(x)`, `pow(a,b)`
- They are closed systems

## Non-Pure Functions
- Have other side effects
- Ex: Print returns None itself, but it also displays a value. (A consequence of calling the function)

## Interpreting Nested Print Expressions
```python
>>> print(print(1), print(2))
1
2
None None
```
1) We try to execute the outside print, which wants to print the return values of `print(1)` and `print(2)` seperated by white space.
2) We execute `print(1)` and `print(2)` to gain their return values
3) First, `print(1)` also prints "1" with a newline, then returns None.
4) Then, `print(2)` prints "2" with a newline, then returns None.
5) `print(print(1), print(2))` effectively becomes print(None, None), and returns None.
6) `None None` is printed
7) `None` is not displayed according to the rules of the Python interpreter.
