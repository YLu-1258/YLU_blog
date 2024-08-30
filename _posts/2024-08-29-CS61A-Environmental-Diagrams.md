---
title: Environmental Diagrams
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-08-29 02:00:00 -0800
tags: ['CS61A', 'Environmental Diagrams']
---

# Environment Diagrams
- Used to keep track what goes on in the python interpreter.
- Memory that keeps track of bindings between names and values.
- Expressed in the form of pictures
- Operates in the form of frames. Each frame represents a subroutine, with the main program executing in the global frame.
| Code | Frames |
| - | - |
| Statements and expressions | Each name is bound to a value |
| Arrows indicate evaluation order | Within a frame, a name cannot be repeated (collisions). Must be counded to one value|

- Once a new binding is created, the name loses its original value.
- We can practice drawing the environmental diagrams at [this link](https://pythontutor.com/cp/composingprograms.html#mode=display)


# Some Cool Syntax
- For built-in functions, the formal parameters are not displayed. Formal paramters **are** displayed for user-defined functions. Ex:
```python
from operator import mul
def multiply(a,b):
    return a,b
```
Environmental Diagram:
```
Global Frame
    mul | func mul(...)
    multiply | func multiply(a,b)
```
- Local frames are named according to the name of the function they represent. Using the above example:
```python
from operator import mul
def multiply(a,b):
    return a,b

multiply(1,2)
```
```
Global frame // This is our global frame
    mul | func mul(...)
    multiply | func multiply(a,b)

multiply // This is a local frame
    a | 1 // Binding betwen argument name and value
    b | 2
    return value | 2 // The return value is not a binding! This is annotation
```

# Assignment Statements
- Assignment statements change the bindings between names and values in frames
- Execution rule for assignment statements
    - The expressions are evaluated from left to right
    - Once evaluated, the new values are then binded to the values on the left.

```python
a = 1               # Standard assignment
b = 2
b, a = a + b, b     # First a+b is evaluated to 3, then b evaluates as b, then 3 is assigned to b, and 2 is assigned to a.
```
- Sample environmental diagram for the following code:
```python
f = min
f = max
g, h = min, max
max = g
max(f(2,g(h(1,5),3)),4)
```
```
Global frame
f | function max // Max function has 2 names but there is still only 1 max function
g | function min
h | function max
max | function min
min | function min
```
