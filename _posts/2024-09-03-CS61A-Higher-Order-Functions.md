---
title: 'CS61A: Higher-Order Functions'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-04 02:00:00 -0800
tags: ['CS61A', 'Control']
---

# Higher-Order Functions
- Allow to design functions with very general methods of computation
- A function that takes another function as an argument

## Generalizing Patterns with Arguments
- For certain problems, we may find a common structure among the solution and share the implementation across the differing problems.
    - For instance: the value of r^2 is shared by many area formulas (square, circle, polygons, etc)



```python
from math import pi, sqrt

def area_square(r):
    return r*r

def area_circle(r):
    return r * r * pi

def area_hexagon(r):
    return r * r * 3 * sqrt(3) / 2

print(area_hexagon(-10)) # Shapes cannot have negative
```

## Assertion 
- The `assert` keyword allows us to make assertion statements in python to enforce a certain condition for our code.
    - If the condition is met, nothing happens.
    - If not, an error occurs


```python
assert "1" == 1, "String cannot be compared to integers"
```


    ---------------------------------------------------------------------------

    AssertionError                            Traceback (most recent call last)

    Cell In[3], line 1
    ----> 1 assert "1" == 1, "String cannot be compared to integers"


    AssertionError: String cannot be compared to integers


- Knowing this, we can fix our code from before to account for negative inputs.


```python
from math import pi, sqrt

def area_square(r):
    assert r > 0, 'A length must be positive'
    return r*r

def area_circle(r):
    assert r > 0, 'A length must be positive'
    return r * r * pi

def area_hexagon(r):
    assert r > 0, 'A length must be positive'
    return r * r * 3 * sqrt(3) / 2

print(area_hexagon(-10)) # Shapes cannot have negative
```


    ---------------------------------------------------------------------------

    AssertionError                            Traceback (most recent call last)

    Cell In[4], line 15
         12     assert r > 0, 'A length must be positive'
         13     return r * r * 3 * sqrt(3) / 2
    ---> 15 print(area_hexagon(-10)) # Shapes cannot have negative


    Cell In[4], line 12, in area_hexagon(r)
         11 def area_hexagon(r):
    ---> 12     assert r > 0, 'A length must be positive'
         13     return r * r * 3 * sqrt(3) / 2


    AssertionError: A length must be positive


- However, this code is repetitive. Instead, we can generalize the procedure for all three operations.


```python
def area(r, shape_constant):
    assert r > 0, 'A length must be positive'
    return r * r * shape_constant

def area_square(r):
    return area(r, 1)

def area_circle(r):
    return area(r, pi)

def area_hexagon(r):
    return area(r, 3 * sqrt(3) / 2)

print(area_hexagon(10))
print(area_hexagon(-10))
```

    259.8076211353316



    ---------------------------------------------------------------------------

    AssertionError                            Traceback (most recent call last)

    Cell In[7], line 15
         12     return area(r, 3 * sqrt(3) / 2)
         14 print(area_hexagon(10))
    ---> 15 print(area_hexagon(-10))


    Cell In[7], line 12, in area_hexagon(r)
         11 def area_hexagon(r):
    ---> 12     return area(r, 3 * sqrt(3) / 2)


    Cell In[7], line 2, in area(r, shape_constant)
          1 def area(r, shape_constant):
    ----> 2     assert r > 0, 'A length must be positive'
          3     return r * r * shape_constant


    AssertionError: A length must be positive


# Generalizing Over Computational Processes
- Generalization applies over logical and computational processes (actions)
    - Common structures are typically more complex than numbers
    - Ex: Adding consecutive numbers with a certain expression


```python
def sum_naturals(n):
    """Sum the first N natural numbers
    >>> sum_naturals(5)
    15
    """
    total, k = 0, 1
    while (k <= n):
        total, k = total + k, k + 1
    return total

def sum_cubes(n):
    """Sum the first N cubes of natural numbers
    >>> sum_cubes(5)
    225
    """
    total, k = 0, 1
    while (k <= n):
        total, k = total + k ** 3, k + 1
    return total

sum_cubes(5)
```




    225



- The code above is generally the same with a small difference.
    - We can rewrite this with a higher-order function, by generalizing the process of adding consecutive terms.


```python
def identity(k):
    return k

def cube(k):
    return pow(k, 3)

def summation(n, term):
    """Sum the first N terms of a sequence.
    >>> summation(5, cube)
    225
    """
    total, k = 0, 1
    while (k <= n):
        total, k = total + term(k), k + 1
    return total

summation(5, cube)
```




    225



# Functions as Return Values
- Sort of like recursion where we return the output of another function recursively


```python
def make_adder(n):
    """Return a function that takes one argument K and return K + N
    >>> add_three = make_adder(3)
    >>> add_three(4)
    >>> 7
    """
    def adder(k):    # This function is defined within the frame of make_adder, and thus has access to names defined and bound in make_adder
        return k + n # Body of adder
    return adder # Body of make_adder
     
result = make_adder(3)(4)
result
```




    7



## Locally Defined Functions
- Functions defined within other function bodies are bound to names in a *local* frame (of the function that they are defined in)
- Consider:


```python
make_adder(3)(4)
```

- We can split this into two parts: the operator and the operand
    - operator: `make_adder(3)`
    - operand: `4`
    - The operator `make_adder(3)` is like any other operator; it evaluates to a function.
    - The operand is an expression that can evaluate to anything, in this case, 3.

## The Purpose of Higher-Order Functions
- **Functions are first-class:** Functions can be manipulated as values in Python. They can be passed as argumenst or be returned as return values.
- **Higher-Order Function:** A function that takes a function as an argument or returns a function as a return value.
    - Express more general methods of computation
    - Remove repetition from programs
    - Separate concerns among functions. (Each functions have one job)
        - Our functions become much more general -> applicable
    - The functions they take as arguments or return as values may be more specific, from one function to the next
