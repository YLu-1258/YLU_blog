---
title: 'CS61A: Containers'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-24 6:00:00 -0800
math: True
tags: ['CS61A', 'containers']
---

# Box-and-Pointer Notation
- Means of expressing lists within environmental diagrams

# The Closure Property of Data types.
- Sequential data is complicated to represent.
- A method for combining data values satisfies the *closure property* if:
    - The result of combination can itself be combined using the same method.
    - Think about closure under vector addition from EECS16A, same idea of closure, just applied differently.
- Closure is powerful as we can create hierarchical structures with it.
    - Every hierarchical structure is made of parts which themselves are also hierarchical structure.
    - Lists may contain other lists as arguments, we need to keep track of that.

# Box-and-Pointer Notation in Environment Diagrams
- In environmental diagrams, lists are represented as a row of index-labeled adjacent boxes, one per element.
    - Each box contains either a primitive or a pointer to a compound value.
    - A compound value can be another list, a function, or anything that has multiple parts.


```python
pair = [1, 2]
nested_list = [[1,2], [], [[3, False, None], [4, lambda: 5]]]
```

![List Environmental Diagram](/assets/img/CS61A/Sequences/ListEnvDiagram.png)

# Slicing
- A list operation that allows us to slice out a portion of a list based on their indicies.


```python
odds = [3, 5, 7, 9, 11]
print(odds[1:3]) # I want the elements of odds with indicies in range(1,3)
print(odds[:3]) # Excluding the starting or end value implies that the start value is 0 and the end value is the last element.
print(odds[1:])
print(odds[:]) # Returns a copy of the list
```

    [5, 7]
    [3, 5, 7]
    [5, 7, 9, 11]
    [3, 5, 7, 9, 11]


# Slicing Creates new Values
- When we make a slice of a list, a new list is produced that is separate from the original list. This means that any modifications made to the slice are not affected in the original  
![List Slices](/assets/img/CS61A/Sequences/ListSlices.png)  

# Processing Container Vlaues
- We may have to iterate over all of the values contained in the list or dictionary we are concerned with. There are built-in functions to help with this.

## Sequence Aggregation
- Built-in functions that take a sequence and returns a single value that is the agregate of all values in that sequence.  
- `sum(iterable[, start]) -> value`
    - Returns the sume of an iterable of numbers, plus the value of start (default = 0).  If iterable is empty, return start. 


```python
print(sum([2, 3, 4]))
print(sum([2, 3, 4], 5))
print(sum([[2, 3], [4]], [])) # We can also add iteratbles together
```

    9
    14
    [2, 3, 4]


- In `print(sum([[2, 3], 4[4]], []))` a default value of `[]` is provided instead of 0 in order to have no errors while adding the lists up.
- `max(iterable[, key=func]) -> value`
    - returns the maximum of the iterable, returns the largest argument with more than 1 arguments.
    - A function is applied to every value we are considering, and the maximum is based on the return values of calling those functions.


```python
print(max(range(5)))
print(max(0, 1, 2, 3, 4))
print(max(range(10), key=lambda x: 7-(x-4)*(x-2))) # A key is specified that applies the function to every valye of the input.
```

    4
    4
    3


- `all(iterable) -> bool`
    - Returns True if bool(x) is True for all values x in the iterable. If the iterable is empty, also return True.
- Also `min` and `any`.


```python
all([x < 5 for x in range(5)]) # Every nuber in range(5) is less than 5
```




    True



# Strings
- Strings are an abstraction that represents textual data.
    - They represent information and language that humans may read.
- Strings may also represent a given function or line of python code, which may be executed.


```python
from operator import add
exec('curry = lambda f: lambda x: lambda y: f(x, y)')
curry(add)(3)(4)
```




    7



- There are three main ways of expressing string literals:
    - Single quotes `'` (Can use double quotes in string without termination)
    - Double quotes `"` (Can use single quotes in string without termination)
    - Triple quotes `"""`
        - May span multiple lines, used for doc strings
- Other characters may be used, not just English.
- When a multi-line string is executed, line-feeds (\n) are used are used to represent every time a new line is created.
    - The backslash serves to escape the following character. The backslash and the character are just one sequence that represents something.
    - The length and access operations for a string are identical to that of an array's
        - `len(city)` and `city[3]`
- The `in` and `not in` operators work differently for strings compared to lists
    - In strings, these operators check for the occurence of a substring within the string.
    - This allows for us to check consecutive letters.


```python
city = 'Berkeley'
print(len(city))
city[3]
```

    8
    k


# Dictionaries
- Builtin Python data type.
    - Contains pairs of keys and values. We use a key to look up a value.
    - Written in curly braces and colons:
        - `{<key>: <value>}`
- Unlike lists, we do not look up values in dictionaries using numerical indicies, but rather with the key value.
    - Key-value mapping only goes one way. Only keys are mapped to values. We cannot access the key of a value.


```python
numerals = {'I': 1, 'V': 5, 'X': 10}
print("numerals:", numerals)
print("numeral for I:", numerals["I"])
print("numeral for V:", numerals["V"])
print("numeral for X:", numerals["X"])
```

    numerals: {'I': 1, 'V': 5, 'X': 10}
    numeral for I: 1
    numeral for V: 5
    numeral for X: 10


- Dictionaries are also sequences.
    - Sequences of keys, may be displayed as a list of keys


```python
keys = list(numerals)
keys
```




    ['I', 'V', 'X']



- We may also get a sequence containing all the values within the dictionary that we want.
    - Use `<dictionary>.values()`
    - This returns a `dict_values` object, which is unlike a list, so not all list operations apply to this new object
        - We may perform some operations on this, such as sum or iterating over the values.
        - However, other operations, such as index subscription, is not possible with this object.
    - This `dict_values` object may be converted to a list by using the `list()` constructor.


```python
values = numerals.values()
print(values)
for value in list(values):
    print(value)
```

    dict_values([1, 5, 10])
    1
    5
    10


- The items within a dictionary could be *arbitrarily complicated*, and could also be of different types.
    - The length of a dictionary refers to the number of keys that are present within the dictionary.


```python
d = {1: ['first', 'second'], 3: 'third'}
len(values)
```




    3



- A key within a dictionary can only be assigned to one value. If multiple are specified, the most recent assignment is the one that is kept:


```python
{1: "first", 1: "second"}
```




    {1: 'second'}



- The key of a dictionary cannot be a list or a dictionary itself. This is because these two types are *unhashable*. Additionally, they cannot be any mutable types
    - Anything can be a value.


```python
{[1]: 'first'}
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[17], line 1
    ----> 1 {[1]: 'first'}


    TypeError: unhashable type: 'list'


## Overview of contraints
- A key of a dictionary cannot be a list or a dictionary (or any *mutable type*)
    - Caused by Python's implementation of dictionaries
- Two keys cannot be equal; There can be at most one value for a given key
    - Caused by the principle of the abstraction of dictionaries

## Dictoinary Comprehensions
- Compact way for creating a dictionary similar to list comprehension:
    - `{<key expr>: <value expr> for <name> in <iter exp> if <filter exp>}`
- Evaluation Process:
    - Add a new frame with the current frame as the parent
    - Create a new empty `result dictionary` that is the value of the expression
    - For each element in the iterable value of `<iter exp>`:
        - Bind `<name>` to that element in the new frame that we created
        - If `<filter exp>` evaluates to a true value, then we add to the result dictionary an entry that pairs the value of `<key expr>` to the value of `<value expr>`


```python
{x*x : x for x in [1,2,3,4,5] if x > 2}
```




    {9: 3, 16: 4, 25: 5}



### Example: Indexing
- Implement `index`, which takes a sequence of `keys`, a sequence of `values`, and a two-argument `match` function. It returns a dictionary from `keys` to lists in which the list for a key k contains all `values` v for which `match`(k, v) is a true value.


```python
def index(keys, values, match):
    """Return a dictionary form keys k to a list of values v for which match(k, v) is a true value."""
    return {key : [value for value in values if match(key, value)] for key in keys}

index([7, 9, 11], range(30, 50), lambda k, v: v % k == 0)
```




    {7: [35, 42, 49], 9: [36, 45], 11: [33, 44]}


