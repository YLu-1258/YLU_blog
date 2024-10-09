---
title: 'CS61A: Data Abstraction'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-29 6:00:00 -0800
math: True
tags: ['CS61A', 'data abstraction']
---

# Data Abstraction
- Compound objects combine objects together
    - A date: a year, a month, and a day
    - A geographic position: latitute and longitude
    - An *abstract data type* lets use manipulate compound objects as units
        - We may isolate two parts of any program that use data.
        - How data are represented (as parts)
        - How data are manipulated (as units)
- **Data Abstraction:** A methodology by which functions enforce an abstraction barrier between ***representation*** and ***use***.

## Rational Numbers
- May be expressed as a numerator divided by a denominator
    - We may always express rational numbres exactly using fractions.
    - We lose the exact representation if we use division.
- Assume that we can compose and decompose rational numbers:
    - rational(n, d) returns a rational number x
        - This is a constructor, which creates a new compound value.
    - numer(x) returns the numerator of x
    - denom(x) returns the denominator of x
        - These are selectors, which gets the parts of a compound value.
- Operations with the compound values may be expressed in terms of constructors and selectors

## Pairs
- Pairs are made of two values that are joined together that may be used as a unit.
    - One way to represent a pair is through a list.


```python
pair = [1, 2]  # List literal: Comma-separated expressions in brackets.
print("pair:", pair)
x, y = pair # List unpacking, x = pair[0], y = pair[1]
print("x:", x, "\ny:", y)
print("pair[0]:", pair[0], "\npair[1]:", pair[1]) # Element selection using the selection operator

from operator import getitem
print("getitem(pair, 0):", getitem(pair, 0), "\ngetitem(pair, 1):", getitem(pair, 1))
```

    pair: [1, 2]
    x: 1 
    y: 2
    pair[0]: 1 
    pair[1]: 2
    getitem(pair, 0) 1 
    getitem(pair, 1) 2


## Representing Rational Numbers
- We create a wrapper function `rational` that returns a list that contains the numerator and the denominator. 


```python
def rational(n, d):
    """Construct a rational number that represents N/D."""
    
    return [n, d] # Construct a list

def numer(x):
    """Return the numerator of rational number X."""

    return x[0] # Return first number, the numerator

def denom(x):
    """Return the denominator of rational number X."""

    return x[1] # Return second number, the denominator
```

- NOTE: For a rational number, the fraction representation should always be within the lowest terms with two relatively prime integers.
    - Use the gcd function to get the greatest common divisor.


```python
from fractions import gcd

def rational(n, d):
    """Construct a rational number that represents N/D."""
    greatest_common_divisor = gcd(n, d)
    return [n//greatest_common_divisor, d//greatest_common_divisor] # Construct a list
```

- By changing the constructor of the data abstraction, we directly manipulate all other returns and actions of related methods.
    - Data abstraction relates each individual part of a piece of data together, and enables us to abstract certain procedures away without affecting each operation at each level of abstraction.
    - In simpler words, changing the constructor changes the behavior of all other functions accordingly.


```python
lst = [1,2,3,4,5]
lst[1:]
```




    [2, 3, 4, 5]



# Abstraction Barriers
- Seperates each part of the program so that each part only needs to know so much about the rest of the program.
    - May make changes to one part of the program without breaking the overall program or creating inconsistencies.

<table>
    <tr>
        <th> Level of Abstraction </th>
        <th> Parts of the program that... </th>
        <th> Treat rationals as... </th>
        <th> Using... </th>
    </tr>
    <tr>
        <td> Uses </td>
        <td> Use rational numbers to perform computation </td>
        <td> Whole data values </td>
        <td> add_rational, mul_rational, rationals_are_equal, print_rational </td>
    </tr>
    <tr>
        <td> Implementation </td>
        <td> Create rationals or implement rational operations </td>
        <td> numerators and denominators </td>
        <td> rational, numer, denom </td>
    </tr>
    <tr>
        <td> Implementation </td>
        <td> Implement selectors and constructor for rationals </td>
        <td> Two-element lists </td>
        <td> list literals and element selection </td>
    </tr>
</table>

- There is an abstraction barrier between the uses of the rational numbers suite, versus the actual implementation.
    - When using the uses of the rational numbers suite, only the add_rational, mul_rational, rationals_are_equal, and print_rational functions should be considered, not the functions within the implementation layer.
- Introducing a change at any level of this list of abstractions will unfold and realize itself in all lower levels of abstraction.
    - Use abstraction barriers and select the appropriate abstraction for each level to ensure that our code implementation is consistent at each level.

# Data Representation
- Constructor and selector functions must work together to specify the right behavior.
    - Behavior condition: If we construct rational number x from numerator n and denominator d, then numer(x)/denom(x) must equal n/d.
    - Data abstraction uses selectors and constructors to define behavior.
    - If the behavior is correct, then the representation is valid.
    - Data abstraction may be recognized by its behavior.


```python
def rational(n, d):
    def select(name):
        if name == 'n':
            return n
        elif name == 'd':
            return d
    return select

def numer(x):
    return x('n')

def denom(x):
    return x('d')
```

- It is possible for us to completely re-implement the constructors and selectors in another manner, and the actual behavior of the rational numbers would not change.




