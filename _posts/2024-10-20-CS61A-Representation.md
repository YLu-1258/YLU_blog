---
title: 'CS61A: Representation'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-10-20 6:00:00 -0800
math: True
tags: ['CS61A', 'representation', 'OOP']
---

# String Representations
- An object value should behave like the kind of data it is meant to represent
    - Part of this ability is to provide a string representation of a program
- There are only two string representations of python objects.
    - The `str` representation is legible for humans
    - The `repr` representation is legible to the Python interpreter
- The `str` and `repr` strings are often the same, but not always

## The `repr` String for an Object
-  The `repr` function returns a Python expression (a string) that evaluates to an equal object
    - `repr(object) -> string`
        - Return the canonical string representation of the object.
        - For most object types, eval(repr(object)) == object
- Complicated objects such as classes or functions do not have a simple Python-readable string.
    - This is because not everything that is pertaining to the object could be described simply.
    - Ex: The `repr` of a function



```python
repr(max)
```




    '<built-in function max>'



## The `str` String for an Object
- Human interpretable strings are useful as well:
    - Sometimes, our programs and objects interact and communicate with the user.


```python
from fractions import Fraction
half = Fraction(1,2)
print("str representation:", repr(str(half)))
print("repr representation", repr(repr(half)))
```

    str representation: '1/2'
    repr representation 'Fraction(1, 2)'


- The result of calling `str` on the value of an expression displays what Python would print using the print expression.


```python
s = "Hello, World"
s
```




    'Hello, World'




```python
print(repr(s))
```

    'Hello, World'



```python
print(str(s))
```

    Hello, World



```python
repr(s)
```




    "'Hello, World'"



# F-Strings
- We may generate strings out of expressions within a string literal
    - In other words, we may embed expressions within a string to create a string that may vary in their content.
## String Interpolation in Python
- String interpolation is evaluating a string literal that contains expressions


```python
from math import pi
f"pi starts with {pi}..."
```




    'pi starts with 3.141592653589793...'



- When we evaluate an f-string literal, we incorporate a str string of the value of each sub-expression.
    - Sub-expressions are evaluated in the current environment.
- Expressions within an F-string are evaluated in the order that they appear in.

# Polymorphic Functions
- **Polymorphic Function**: A function that applies to many (poly) different forms (morph) of data
- Both `str` and `repr` are polymorphic functions, they apply to any object.
    - The way that this behavior is created in python is that `repr` invokes a zero-argument method `__repr__` on its argument.
    - The `str` function also invokes a zero-argument method `__str__` on its argument. 
    - In other words, `repr` asks the argument to display itself.
- The `str` and `repr` strings do not know how to obtain the `str` or `repr` representation of the object. It's the object itself that understands how to represent itself.
- Important Idea: We can defer the logic of the function to the methods of the argument itself.

## Implementing `repr` and `str`
- Slightly more complicated than just invoking `__repr__` or `__str__` on the argument.
    - If there is an instance attribute called `__repr__` it is ignored.
    - Only class attributes are found


```python
def repr(x):
    return type(x).__repr__(x)
```

- The breakdown of this code is that `type(x)` returns the class that defines the object. Thus, applying `__repr__` on the class would access the class attribute rather than the instance attribute. We also pass te instance into the `__repr__` function because the function accepts a `self` parameter. The `__repr__` that we call is not a bound method, but rather a function.
- The behavior of `str` is also complicated
    - The instance attribute `__str__` is ignored
    - If no `__str__` attribute is found, use the `repr` string.
    - This is implemented through interfaces

## Interfaces
- **Message passing:** Objects interact by looking up attributes on each other (passing messages)
- Attribute look-up rules enable different data types to respond to the same message
    - This is achived by giving each object the same name. This also creates a standard for communication.
- A **shared message** (attribute name) elicits similar behavior from different object classes is a powerful method of abstraction.
    - These shared messages forms an interface between different classes, types, and objects.
- Classes that implement `__repr__` and `__str__` methods that return Python-interpretable and human-readable strings implement an interface for producing string representations.
- At a higher level, as long as we have a collection of classes that have methods of the same name with similar behavior, we have effectively created an interface between the objects. 
- Example: Ratio


```python
class Ratio:
    def __init__(self, n, d):
        self.numer = n
        self.denom = d

    def __repr__(self):
        return 'Ratio({0}, {1})'.format(self.numer, self.denom)
    
    def __str__(self):
        return '{0}/{1}'.format(self.numer, self.denom)
    
half = Ratio(1,2)
print(half)
print(repr(half))
```

    1/2
    Ratio(1, 2)


# Special Method Names
- Certain names are special because they have built-in behavior
- These names always start and end with two underscores
<table>
    <tr>
        <th>Special Method</th>
        <th>Behavior</th>
    </tr>
    <tr>
        <td><code>__init__</code></td>
        <td>Method invoked automatically when an object is constructed</td>
    </tr>
    <tr>
        <td><code>__repr__</code></td>
        <td>Method invoked to display an object as a Python expression</td>
    </tr>
    <tr>
        <td><code>__add__</code></td>
        <td>Method invoked to add one object to another</td>
    </tr>
    <tr>
        <td><code>__bool__</code></td>
        <td>Method invoked to convert an object to True or False</td>
    </tr>
    <tr>
        <td><code>__float__</code></td>
        <td>Method invoked to convert an object to a float (real number)</td>
    </tr>
</table>
- Ex: This piece of code...


```python
zero, one, two = 0, 1, 2
print(one + two)
print(bool(zero), bool(one))
```

    3
    False True


is the same as this


```python
print(one.__add__(two))
print(zero.__bool__(), one.__bool__())
```

    3
    False True


## Special Methods
- When we add instnaces of user-defined classes, we invoke either the `__add__` or `__radd__` method.
- `__add__` and `__radd__` are methods that both perform addition.
    - `__add__` is left hand addition
    - `__radd__` is right hand addition
> There is a subtle, yet important distinction between `__add__` and `__radd__`. The `__add__` method adds an object to another object when the instance itself is the expression to the left of the dot-expression. In other words, it is addition from the left-hand side. The `__radd__` method happens in the reverse, and adds an object to another object when the instance itself is the argument to the right and wrapped in parenthesis of the dot-expression. Here is an example of why this is helpful: <br> 
A class `myClass` creating an instance `myObj` could be created to handle the addition of a number to it, say 4: <br>
myObj + 4 <br>
However, if we attempted to add 4 onto `myObj` it would raise an error as the integer type does not have the implementation to add our object to an integer <br>
4 + myObj --> NotImplemented --> TypeError <br>
We can avoid this unwanted behavior (as some addition is commutative) by implementing the `__radd__` operation for `myClass`. Thus, when running 4 + myObj, python would first try to run `4.__add__(myObj)` to find the NotImplemented return value, but will then run `myObj.__radd__(4)`. This allows an interface that enables our class to avoid handle cases where the other object's implementation of addition does not support our current object's<br>
{: .prompt-tip }

- It is possible to also use `__radd__` to specify addition operations where the action is not commutative between different objects.
- We could now define the addition property for our ratio class.



```python
class Ratio:
    def __init__(self, n, d):
        self.numer = n
        self.denom = d

    def __repr__(self):
        return 'Ratio({0}, {1})'.format(self.numer, self.denom)
    
    def __str__(self):
        return '{0}/{1}'.format(self.numer, self.denom)
    
    def __add__(self, other):
        # Type Dispatching
        if isinstance(other, int):
            n = self.numer + self.denom * other
            d = self.denom
        elif isinstance(other, Ratio):
            n = self.numer * other.denom + self.denom * other.numer
            d = self.denom * other.denom
        elif isinstance(other, float):
            # Type Coercion
            return float(self) + other
        g = gcd(n, d)
        return Ratio(n//g, d//g)
    
    def __float__(self):
        return self.numer/self.denom
    
    __radd__ = __add__
    
def gcd(n, d):
    while n != d:
        n, d = min(n, d), abs(n-d)
    return n

print(Ratio(1, 3) + Ratio(1, 6))
print(Ratio(1,4) + 8)
print(3 + Ratio(1,7))
print(0.2 + Ratio(1,3))
```

    1/2
    33/4
    22/7
    0.5333333333333333


- In the `Ratio` implementation above, we implemented two important ideas:
    - **Type Casting:** We inspect the type of an argument and decide what to do.
    - **Type Coercion:** We take an object of one type and we convert it into another type to combine it with another value.
- By combining these two methods, we may create classes that we may have different classes interact with each other.
