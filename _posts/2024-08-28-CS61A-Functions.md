---
title: Functions
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-08-28 02:00:00 -0800
tags: ['CS61A', 'functions']
---

# Expressions
- Most things have a representation in Python. For example, Pi.
    - However, to properly use Pi, we have to first import it with a statement like `from math import pi`
- Additionally, Python also enables us the feature to assign values to a name through **assignment statements**
    - Ex: radius = 10
- Consider the Code:


```python
from math import pi
radius = 10
area, circ = pi * radius * radius, 2 * pi * radius
print("Area: " + str(area) + " Circumference: " + str(circ))
radius = 20
print("Area: " + str(area) + " Circumference: " + str(circ))
```

    Area: 314.1592653589793 Circumference: 62.83185307179586
    Area: 314.1592653589793 Circumference: 62.83185307179586


- Even though the value of radius was changed to 20, the python interpreter still only recalls the area of the circle when the radius was 10. The value of area is bounded to it at calculation
- Names may also be assigned to functions:


```python
print(type(max))
f = max
print(type(f))
# max = 7 If this line is called, max will no longer refer to the max function. It would be just a number   
print(max(1,2,3))
print(f(1,2,3))
```

    <class 'builtin_function_or_method'>
    <class 'builtin_function_or_method'>
    3
    3


- Operators that are placed in between the operands such as + or - are known as **infix operators**
    - Some infix operators have function names defined within the operator module
- There are three ways of binding values to a name:
    - Import the name
    - Assign the name
    - Define the name using `def`


```python
def square(x):
    return x * x

square(11)
```




    121



- Knowing how functions work, we could go back and revise our code to ensure that radius and are are always in sync.


```python
def area():
    return pi * radius * radius

area()
radius = 10
area()
```




    314.1592653589793



- The output of a function gets re-evaluated everytime it is called or appears as a call expression.
- Two main types of expressions: a primative expression, and a call expression

# Discussion Question 1
```python
>>> f = min
>>> f = max
>>> g, h = min, max
>>> max = g
>>> max(f(2,g(h(1,5), 3)), 4)
```
The first 4 lines essentially mkae f and h max operations, while g and max itself is finally converted to a min operation. Thus, the final result of this code would be 3.
