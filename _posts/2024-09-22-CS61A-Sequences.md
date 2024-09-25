---
title: 'CS61A: Sequences'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-22 6:00:00 -0800
math: True
tags: ['CS61A', 'sequences', 'lists']
---

# Lists
- Built-in dat type in Python.
    - Lists are created with a list literal
- Lists have a 0-based indexing system.
    - This means that the length of the list is always one more than the ending index
    - The index of a list is its offset from the beginning.
- The list index can be an evaluation that evalutes to an integer value to access any value from the List. Additionally, the value of each element in a list can be used to be combined into other values.
- The `len()` function returns the number of elements in a list.
- We can either use list accessing operators `[]` or the `getitem()` function to return a specific element by its index.


```python
odds = [41, 43, 47, 49]
print(odds[3])
print(odds[odds[3]-odds[2]])
print(len(odds))
```

    49
    47
    4


- Each element in a list literal can either be a primative type or some expression that evaluates to a value.
## Concatentation and reptition
- We may combine lists together to form a new list, and we can also have lists repeat themselves for a certain number of times.
    - Use the `+` infix operator to concatenate two lists
    - Use the `*` infix operator to repeat a list
    - The add and mul functions also work properly
- Lists may also be nested. A list may have lists as its elements.


```python
from operator import add, mul
digits = [1, 8, 2, 8]
print(([2, 7] + digits * 2) == add([2,7], mul(digits, 2)))
pairs = [[10, 20], [30, 40]]
print(pairs[1][0])
```

    True
    30


# Containers
- A list is a container that contains other values.
- There exist built-in operators that determine whether or not an element appears in a particular collection. We use the `in` infix operator
    - The element that we are looking for must exactly match the form in the list container.


```python
digits = [1, 8, 2, 8]
print(1 in digits)
print(not (5 in digits))
print([1,8] in digits)
```

    True
    True
    False


# For Statements
- A method of iterating over a sequence.


```python
def count(s, value):
    """Count the number of times that value occurs in sequence s.
    >>> count([1, 2, 1, 2, 1], 1)
    3
    """
    total, index = 0, 0
    while index < len(s):
        element = s[index]
        if value == element:
            total+=1
        index+=1
    return total

count([1,2,1,2,1], 1)
```




    3



- We may rewrite this process with a for loop, and simplify the amount of complexity that we have in our code.
    - We may just iterate over the element in the sequence, rather than keeping track of the element index at every iteration.


```python
def count(s, value):
    """Count the number of times that value occurs in sequence s.
    >>> count([1, 2, 1, 2, 1], 1)
    3
    """
    total = 0
    for element in s:
        if element == value:
            total+=1
    return total

count([1,2,1,2,1], 1)
```

## Sequence iteration:
- When the for statement creates a new name that is used for iterating over the container, that name is bound in the first frame of the current environment (a new frame is **NOT** created).
    - As the for loop executes, the variable is continuously rebounded to each subsequent value.

## For Statement Execution Procedure


```python
for <name> in <expression>:
    <suite>
```

The for loop follows these steps in order.
1) The header <expression> is evaluated, and returns an iterable value (sequence)
2) For each element in the sequence, in order:
    A. Bind <name> to that element in the current frame
    B. Execute the <suite>

## Sequence Unpacking in For Statements
- If we have a sequence of fixed-length sequences, we may unpack the values of each subsequence within the for-loop itself.
    - Each name is bound to a value.


```python
pairs = [[1, 2], [2, 2], [3, 2], [4, 4]]
same_count = 0
for x, y in pairs: # A name is assigned for each element in a fixed-length sequence
    if x == y:
        same_count = same_count + 1

same_count
```




    2



# Ranges
- Ranges are another sequence type for consecutive integers.
    - It is finite list of integers defined by a starting and ending value that is ordered in increasing order. 
    - A range includes the starting value, but execludes the ending value.
        - This makes it easy for us to calculate the length of a range. `Length = ending value - starting value`
        - Element selection is also made easier: `starting value + index`

- We may convert a range into a list by using the list constructor `list()`
- If only one parameter for range is specified, the range has a default starting value of 0, and treats the solo argument as the ending index.
- When a call to the range function is made in the interpreter, the return value is not a list, but the range function itself.
    - Ex: `range(5,8)` returns `range(5, 8)`


```python
print(list(range(-2, 2)))
range(5, 8)
```

    [-2, -1, 0, 1]





    range(5, 8)



- Sometimes in a for loop, the actual value of each element in a range doesn't matter. Instead, all we want to do is to iterate and perform a certain suite a number of times.


```python
def cheer():
    for _ in range(3): # The name is never used
        print('Go Bears!')

cheer()
```

    Go Bears!
    Go Bears!
    Go Bears!


# List Comprehensions
- List comprehension allows us to generate a list from some iterable sequence with conditions and processing.


```python
odds = [1, 3, 5, 7 ,9]
evens = [x+1 for x in odds]
divisible = [x for x in odds if 25 % x == 0]

def divisors(n):
    return [x for x in range(1, n+1) if n % x == 0]

divisors(117)
```




    [1, 3, 9, 13, 39, 117]


