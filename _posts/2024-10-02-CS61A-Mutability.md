---
title: 'CS61A: Mutability'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-30 6:00:00 -0800
math: True
tags: ['CS61A', 'mutability']
---

# Objects
- Objects are values that behave like what it's supposed to represent
- Ex: `datetime` module


```python
from datetime import date
date
```




    datetime.date



- In datetime, `date` is a class that literally represents a date


```python
today = date.today()
go_home_date = date(2024, 11, 26)
str(go_home_date - today)
```




    '55 days, 0:00:00'



- Primary mechanism of how object behavior is defined is through their attributes
    - Attributes of an object are accessed through the dot expression:
    - `<name of object>.<name of attribute>`


```python
print("Today's year:", today.year)
print("Today's month:", today.month)
print("Today's date:", today.day)
```

    Today's year: 2024
    Today's month: 10
    Today's date: 2


- Attributes are not only bound to values, but also to the functions of a class.
    - These functional attributes are called methods
    - `<name of object>.<name of method>()`



```python
today.strftime('%A %B %d')
# %A : day of the week
# %B : Month of the year
# %d: Day of the month
```




    'Wednesday October 02'



- The date object contains information pertinent to the day of the week, the string representation of the month, and other such useful information, because it is precisely used to represent everything that comes with a date.

## Objects
- Objects represent information
    - Are composed of data and behavior that is bundled together to form an abstraction
- A type of object is called a class, and classes are first-class values in Python, meaning they may be passed in as values to functions.

## Object-oriented programming
- A method of organizing large programs by constructing them as an intricate connection of smaller objects that communicate with each other.
- Every value in python is an object and has attributes and methods.
    - A lot of data manipulation occurs through object methods.
    - Functions do one thing, objects are able to do many related things bundled together.

# Strings
- Strings are also objects with attributes themselves
    -`.upper()`, `.lower()`, and `.swapcase()` methods.


```python
s = "Hello"
print("Original:", s)
print("Uppercase:", s.upper())
print("Lowercase:", s.lower())
print("Swapcase:", s.swapcase())
```

    Original: Hello
    Uppercase: HELLO
    Lowercase: hello
    Swapcase: hELLO


- The string methods are functions, but they aren't general functions.
    - The methods all perform string operations, which means that they are particular to string types. They are not functions built into the language.
- Strings are an abstraction that allows us to represent text.
    - Strings may be encoded as numbers through a standard called `ASCII`. This standard is used across many programming languages.
        - Transmission characters are the ascii characters from 0x00 to 0x1F (first two rows). They are used for interchanging and feeding information.
        - The `ord()` function returns the given integer ASCII code for a character


```python
print("ASCII code for 'A':", ord("A"))
print("hex code for 'A':", hex(ord("A"))) # Row and column in ASCII table
```

    ASCII code for 'A': 65
    hex code for 'A': 0x41


- Strings may also be represented using the Unicode standard
    - The unicode standard accomodates for more characters outside of English, including things like Chinese scripts.
    - 109k+ characters and counting
    - 93 scripts
    - Supports bidirectional display order (left-to-right for English), and (right-to-left for Arabic, etc.)


```python
from unicodedata import name, lookup
print(name("比"))
lookup('BABY')
```

    CJK UNIFIED IDEOGRAPH-6BD4





    '👶'



# Mutation Operations
- The value of an object can change over the time of execution

## Some Objects can change
- Lists may change their contents as time goes on.


```python
suits = ['coin', 'string', 'myriad'] # Created in Asia with 3 suits
original_suits = suits
print("Migration to Europe, lost", suits.pop())
suits.remove('string')
print("Migration to Europe, lost string")
print("Current suits", suits)
suits.append('cup')
suits.extend(['sword', 'club'])
print("Added some Spanish suits,", suits)
suits[2] = 'spade'
suits[0:2] = ['heart', 'diamond']
print("The Italian and the French changed some more suits,", suits)
print("But wait, original suits also changed", original_suits)
```

    Migration to Europe, lost myriad
    Migration to Europe, lost string
    Current suits ['coin']
    Added some Spanish suits, ['coin', 'cup', 'sword', 'club']
    The Italian and the French changed some more suits, ['heart', 'diamond', 'spade', 'club']
    But wait, original suits also changed ['heart', 'diamond', 'spade', 'club']


- In the case above, both `original_suits` and `suits` were bound to the same list.
    - That is why, when the value associated with `suits` was changed, the same value for `original_suits` also changed.
- Thus, all names that refer to the same object are all affected by a particular mutation.
    - Mutation: A particular change to an object.
    - Only `mutable` types may have changes to their values.
- So far, only lists and dictionaries are mutable types.

## Mutation Can Happen Within a Function Call
- A function can change the value of any object in its scope. 


```python
def mystery(s):
    s[2:] = [] # We may also override certain slices of lists

four = [1,2,3,4]
print("Original length,", len(four))
mystery(four)
print("New length,", len(four))
```

    Original length, 4
    New length, 2


- When the mystery function is called, the parameter s is bound to the same list object as four.

# Tuples
- Tuples are immutable sequences.
    - Initialized using parathesis, or nothing at all, anything separated with commas is evaluated as a tuple.
    - A tuple may also be intialized using the `tuple()` constructor on any sequence


```python
(3,4,5,6)
```




    (3, 4, 5, 6)




```python
3,4,5,6
```




    (3, 4, 5, 6)




```python
strings = ["I", "like", "hashbrowns"]
tuple(strings)

```




    ('I', 'like', 'hashbrowns')



## Tuple operations
- We may create a single tuple with the value and a comma at the end
    - Ex: `2,`
- We may add tuples together to get larger tuples
    - Ex: `(3, 4) + (5, 6)`
- We may use the membership operator `is` to check if an element is in a tuple
    - Ex: `5 in (3, 4, 5)`
- We may also create slices of tuples
    - Ex: `(1,2,3,4,5)[2:]`

## Immutable nature of Tuples
- Because tuples are immutable, that means we can use them as keys within a dictionary, unlike a list


```python
{(1,2): 3}
```




    {(1, 2): 3}




- Immutable values such as tuples are protected from mutation.
    - However, the value that names are bound to can be changed still.
- Values of expressions can change if there are changes within names or objects.
- An immutable sequence may change if it contains a mutable value as an element
    - Like a list



```python
test_tuple = ([1,3],2)
test_tuple[0][1] = 4
test_tuple
```




    ([1, 4], 2)



## Mutation
- Sameness and Change
- Compound data objects such as lists have "identity" in addition to the pieces that it's composed by.
    - The object is still the same object even when the object's contents have been changed.
    - Two objects can also have the same contents, but be different objects.



```python
print("Same Object, contents changed:")
a = [10]
b = a
a.append(20)
print("Is a equal to b?", a == b)
print("Different Objects, content changed:")
a = [10]
b = [10]
print("Is a equal b?", a == b)
b.append(20)
print("What about now?", a == b)
```

    Same Object, contents changed:
    Is a equal to b? True
    Different Objects, content changed:
    Is a equal b? True
    What about now? False


### Identity Operators
- These operators allow us to figure out if something is the same
- **Identity**: 
    - `<expr 1> is <expr 2>`
    - evaluates to True if `<expr 1>` and `<expr 2>` evaluates to the same object
    - may also check for difference in objects with `is not`
- **Equality**
    - `<expr 1> == <expr 2>`
    - evaluates to True if `<expr 1>` and `<expr 2>` evaluates to the same values
    - `<expr 1>` and `<expr 2>` can be of different objects! Like the list example above
- Identical objects are always equal, ***BUT EQUAL VALUES AREN'T ALWAYS IDENTICAL!!!***
- When two things aren't the same (identical), changes to one do not affect the other.

## Mutable Default Arguments are Dangerous
- A default argument value is a part of a function value, not generated by a call.
    - This is because the default value is bound to the same value over each function call.
    - For all function calls of the same function, the default arguments are always bound to the same value, which could possibly change if it were a mutable object.


```python
def f(s=[]):
    s.append(5)
    return len(s)

print("First call:", f())
print("Second call:", f())
print("Third call:", f())
print("Fourth call:", f())
```

    First call: 1
    Second call: 2
    Third call: 3
    Fourth call: 4


# Mutable Functions
- Mutable values may be used to define mutable functions: functions with behaviors that vary over time.
    - Mutable functions do not always return the same return value for the same arguments.
    - This is because they are non-pure functions. Some side-effect happens as a result of calling the function, which could affect future calls to that function.
        - These functions represent a state, which is always changing.
        - The state is local, it is not defined anywhere else, it is just part of the function's behavior
- Using higher order functions, we may bundle specific functions with data, and that data can be mutable, making the function mutable as well.
- Mutable values induces behavior changes

## Mutable Values & Persistent Local State
- Values that persist across multiple function calls, and can be changed
    - We use a mutable value to achieve this.
    - The mutable is bound in a frame above the function call frame, so the function may always access that mutable value even across different function call frames.


```python
def make_withdraw_list(balance):
    b = [balance]
    def withdraw(amount):
        if (amount > b[0]):
            return 'Insufficient funds'
        b[0]-=amount
        return b[0]
    return withdraw

withdraw = make_withdraw_list(100)
print("Withdraw 25:", withdraw(25))
print("Withdraw 25:", withdraw(25))
print("Withdraw 60:", withdraw(60))
print("Withdraw 15:", withdraw(15))

```

    Withdraw 25: 75
    Withdraw 25: 50
    Withdraw 60: Insufficient funds
    Withdraw 15: 35

