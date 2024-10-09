---
title: 'CS61A: Iterators'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-10-04 6:00:00 -0800
math: True
tags: ['CS61A', 'iterators']
---

# Iterators
- Most forms of sequential data are implicity represented with an iterator.
- Iterators are a programming interface that are used in python to access the elements of various containers.
- A container provides an iterator that provides access to its element in some order
    - `iter(iterable)`
        - Returns an iterator over the elememts of the iterable.
    - `next(iterator)`
        - Returns the next element in an iterator
- The iterator in python knows the contents of a sequence, has a pointer to the current value, and also has a marker for what's next in the list.
    - Iterators basically mark out a position within the list.
    - Provides access to the element within that position, and everything after it.
    


```python
s = [3, 4, 5]
t = iter(s)
print("first call to next(t)", next(t))
print("second call to next(t)", next(t))
u = iter(s)
print("first call to next(u):", next(u))
print("third call to next(t):", next(t))
```

    first call to next(t) 3
    second call to next(t) 4
    first call to next(u): 3
    third call to next(t): 5


- A list is not an iterator, but we may create an iterator for a list
- An iterator only stores what is left to iterate over.



```python
s = [1,2,3,4,5]
t = iter(s)
next(t)
next(t)
print(list(t)) # Only [3,4,5] have not been accessed yet, they are the only values remaining in the iterator.
next(t) # Calling list on the remaining values in the iterator will also "iterate" over those values, we get an error on this line
```

    [3, 4, 5]



    ---------------------------------------------------------------------------

    StopIteration                             Traceback (most recent call last)

    Cell In[13], line 6
          4 next(t)
          5 print(list(t)) # Only [3,4,5] have not been accessed yet, they are the only values remaining in the iterator.
    ----> 6 next(t) # Calling list on the remaining values in the iterator will also "iterate" over those values, we get an error on this line


    StopIteration: 


## Dictionary Iteration
- We may get different views of objects in a dictionary.
- *iterables* are any values that can be passed to `iter()` to produce an iterator
- *iterators* are values returned from *iter* that may be passed to *next*
    - All iterators are mutable
    - Calling `next()` or some other function that access element(s) from the iterator, will mutate the iterator to point to the next unaccessed element.
- The dictionary, its keys, its values, and its items are all iterable values.
    - Order of items within a dictionary is the order in which they are added (Python 3.6+)
    - Historically, items appeared in an arbitrary order (Python 3.5 and earlier)



```python
d = {'one': 1, 'two': 2, 'three': 3}
d['zero'] = 0
k = iter(d.keys()) # or iter(d)
print(next(k))
print(next(k))
print(next(k))
print(next(k))
```

    one
    two
    three
    zero



```python
v = iter(d.values())
print(next(v))
print(next(v))
print(next(v))
print(next(v))
```

    1
    2
    3
    0



```python
i = iter(d.items()) # items within dictionaries represented as key-value pairs of tuples
print(next(i))
print(next(i))
print(next(i))
print(next(i))
```

    ('one', 1)
    ('two', 2)
    ('three', 3)
    ('zero', 0)


- If we make any additions or removals to the dictionary size while an iterator is active, that iterator would become invalid because the dictionary had been mutated
