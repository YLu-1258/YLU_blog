---
title: 'CS61A: Defining Functions'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-08-29 02:00:00 -0800
tags: ['CS61A', 'functions']
---

# Defining Functions
- Assignment -> abstraction (names are associated to values.)
    - Functions give more flexibility as the names are dynamic. They change as the expression re-evaluates.
- This allows us to wrap something complex in a simple statement that we can reuse in our code.
- In python:
```python
>>> def <name>(<formal parameters>):
    return <return expression>
```
- Parameters are argument values passed into the function to be processed. (the name and arguments is the function signature)
- The return expression is evaluated with every call. 
 

# Execution procedure for def statements:
1. The function is created with a signature
2. Create the body of the function to be indented after the first line.
    - The body is not actually executed until the function is called.
    - Because of the above statement, the function body is not shown immediately in the environmental diagram.
3. The name of the function is bound to the function in the current frame.

# Calling User-Defined Functions
- Add a local frame to create a new environment.
- Bind the function's parameters to its arguments in the frame
- Execute the body of the function in the new environment (in the body of the function).
- Once a Function is called, we add a new frame to our environment.

# Names and Environments
- All expressions are evaluated in the context of an environment.
    - The environment is a memory that keeps track of the name-value bindings
- <mark>An environment is a sequence of frames</mark>
    - Frame: Bindings between names and values.
    - Local Frames are followed by global frames (local frame -> global frame)
- <mark> An name evaluates to the value bound to that name in the earliest frame of the environment where the name is found </mark>
    - In the case above, first check the local frame, then check the global frame.
- Ex:


```python
from operator import mul
def square(square): # There appears to be a conflict between the function name and its parameter
    return mul(square,square)

square(-2)
```

- And the global Frame

Global frame
    mul | func mul
    square | func square(square)

square
    square | -2     // Now this means something different than before
    return value | 4

- The reason that we do not interpret square as the function itself within the function is because we are able to find the name square bound to the value of -2 within the local frame (which we look at first before proceeding to the Global frame) 
