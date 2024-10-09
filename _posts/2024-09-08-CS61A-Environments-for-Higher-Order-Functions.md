---
title: 'CS61A: Environments for Higher-Order Functions'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-08 12:00:00 -0800
tags: ['CS61A', 'Environmental Diagrams', 'Higher Order Functions']
---

# Higher Order Functions are enabled by Environments
**Higher-order Function:** A function that takes a function as an argument or returns a function as a return value.  


```python
def apply_twice(f, x):
    return f(f(x))

def square(x):
    return x * x

apply_twice(square, 3)
```




    81



## Runtime
- The functions `apply_twice` and `square` are bound to their names in the global frame
- apply_twice is called, the argument `x` is stored as 3, and `f` is stored as `square`, a new frame is created
- We evaluate the body, of `apply_twice`. We see that the function returns the output of function `f`.
- We first evaluate the result of operand, which is `f(x)`. We evaluate the body of `f=square` and create a new frame where `x` is stored as 3
- The operand returns a value of `9` to our outer function.
- We then evaluate the operator on the operand, which is `f(9)`. We create another frame and evaluate f(9), which finally returns 81, which is also returned by apply_twice.
- The return value of `apply_twice` is finally stored under the name of `result` in the global frame.

# Environments for Nested Definition


```python
def make_adder(n):
    def adder(k):
        return k + n
    return adder

add_three = make_adder(3)
add_three(4)
```




    7



## Runtime
- The name `make_adder` is bound to its function
- `make_adder(3)` is called. A new frame for `make_adder(3)` is created with a parent as the Global Frame.
- In the new frame, the name `n` is bound to 3, while `def adder(k):` binds the name `adder` to the function.
- `make_adder(3)` then returns `adder` as its return value, which is bound to the name of `add_three`.
- We then execute `add_three(4)` and a new frame is created, with a parent of `make_adder`
- The value 4 is bound to `k` in the `add_three` frame.
- `add_three` access the value of `n` because it is present in a later frame in an instance of `make_adder`.
- `add_three` returns the final value of `n` plus `k` which evaluates to 7. 

## Reflection
- By defining the parents of a function, we can easily trace out way back through our frames to access values from parent functions.
- In the example given above, we have an environment with 3 frames when we are executing the add_three function.
- All user-defined functions have a parent frame.
    - The parent is the frame in which the function was defined.

# How to Draw an Environment Diagram
- When a function is defined:
    - Create a function value `func <name>(<formal parameters>) [parent=<parent>]`
    - Parent is the current frame
    - Function name is bound to function value in the frame where the function is defined
- When a function is called:
    - Add a local frame with the name of the function called.
    - Copy the parent of the funciton to the local frame: `[parent=<label>]`
    - Bind `<formal parameters>` to the arguments within the local frame.
    - Execute function body in the environment that starts with the local frame.

# Local Names
- Formal parameters of functions have a local name
- Local names cannot be refered by frame that are not a child of the frame or in a different environment than the frame.

# Function Composition


```python
def square(x):
    return x * x

def triple(x):
    return 3 * x

def compose1(f, g):
    def h(x):           # This is function composition
        return f(g(x))
    return h

squiple = compose1(square, triple)
squiple(5)
```




    225


