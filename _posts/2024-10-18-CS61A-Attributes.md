---
title: 'CS61A: Attributes'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-10-18 6:00:00 -0800
math: True
tags: ['CS61A', 'attributes']
---

# Attributes

## Method Calls
- Method calls differ from function calls because they are invoked with dot notation.
    - `<expression>.<name>`
    - The `<expression>` can be any valid Python expression that evaluates to the object in question
    - The `<name>` must be a simple name
    - The dot expression evaluates to the value of the attribute mapped to name in the object that is the value of the expression.
- A dot expression may either be a regular attribute or a method.
    - Invoking a method is still just a call expression, with the dot expression as the operator.
- A bound method is a method in which the "`self` argument is already filled in."
    - The method itself is bound to a particular object.
    - Thus, calling a bound method only affects the particular instance that the method is bound to. 

## Attribute Lookup
- Every time a dot expression is evaluated, the attribute must be looked up for the object.
- Looking for an attribute requires look up for different places.
    - This is because <mark> both instances and their classes can have attributes that may be looked up by dot expressions </mark>
- Look up process
    - Evaluate the `<expression>` to the left of the dot, which yields the object of the dot expression
    - `<name>` is matched against the instance attributes of that object; if an attribute with that name exists, its value is returned.
    - If not, `name` is looked up in the class, which yields a class attribute value
    - The value is returned unless it is a function, in which a bound method is returned instead.
        - The object is filled in as the self parameter.
- We may also access a class attribute by calling `<class>.<name>`
- There is also a built-in function called `get_attr`, which may look up an attribute using a string. The built-in function `has_attr` will check whether or not an instance has access to a particular attribute.
    - These built in functions look up names in the same way as a dot expression
- Looking up an attribute name within an object may return
    - One of its instance attributes
    - One of the attributes of the class


```python
from account import Account

tom_account = Account("Tom")
tom_account.deposit(10)
print("getattr(tom_account, 'balance')", getattr(tom_account, 'balance'))
print("hasattr(tom_account, 'deposit')", hasattr(tom_account, 'deposit'))
```

    30000
    30000
    getattr(tom_account, 'balance') 10
    hasattr(tom_account, 'deposit') True


## Class Attributes
```python
class <name>:
    <suite>
```
- When a class statement is executed, a new class is created and bound to the `<name>` in the first frame of the current environment 
- Within class creation, the assignment and def statements within the suite of a class creates the attributes of the class.
    - But these attributse are not names in frames.


```python
class Clown:
    nose = 'big and red'
    def dance():
        return 'No thanks'
    
print(Clown.nose)
print(Clown.dance())
```

    big and red
    No thanks


- The reason for creating class attributes are becuase they are "shared" across all instances of a class.
- Ex: The `Account` class has an instance attribute called `interest`, because the value of `interest` is shared across all instances of `Account`. 


```python
tom_account = Account('Tim')
jim_account = Account('Jim')
print("Tom interest:", tom_account.interest)
print("Jim interest:", jim_account.interest)
print("Account class interest:", Account.interest)
```

    Tom interest: 0.02
    Jim interest: 0.02
    Account class interest: 0.02


- The interest attribute is not part of the instance; but rather part of the class.

## Bound Methods
- Functions that are class attributes where the self-argument has been filled in with an instance of a class.

### Terminology: Attributes, Functions, and Methods
- All objets have attributes that are name-value pairs.
- A class is a type (or category) of objects.
- Classes are also objects with attributes
- Instance attribute: attribute of an instance
- Class attribute: attribute of the class of an instance
- A class attribute that is a function is a method.
- According to the Python object system, function are also objects, along with bound methods.
    - Dot expressions evaluate to bound methods for class attributes that are functions.

## Methods and Functions
- Bound methods couple together a function and the object of the method.
    - Object + Function = Bound Method
- The method of a class is a function, while the method of an instance is a bound method.


```python
print(type(Account.deposit))
print(type(tom_account.deposit))
```

    <class 'function'>
    <class 'method'>


- This distinction is important because it provides us with two ways of calling the function, either in the function form, or method form.


```python
Account.deposit(tom_account, 10) # Deposits 10 into tom_account
tom_account.deposit(10) # Deposits 10 into tom_account
```




    20



- Both methods do the same thing, except we explicity bind the `tom_account` instance to the self parameter through the class method, whereas the dot expression indirectly binds `tom_account` to self.

## Attribute Assignment
- Assignment statements with a dot expression on their left-hand side affect attributes for the object of that dot expression
    - If the object is an instance, then assignment sets an instance attribute
    - If the object is a class, then assignment sets a class attribute 
- Interestingly, with this behavior, we may "override" certain class attributes within an instance with a new instance attribute with the same name
    - Ex: Setting a special interest value for an instance.


```python
tom_account = Account("Tom")
bob_account = Account("Bob")
tom_account.interest = 0.08 # Creating a new instance attribute as tom_account is an instance
Account.interest = 0.04 # Updating an existing class attribute
Account.a = 1
print("New interest rate for tom_account:", tom_account.interest)
print("Class attribute for interest rate:", Account.interest)
print("Interest rate for bob_account:", bob_account.interest)
```

    New interest rate for tom_account: 0.08
    Class attribute for interest rate: 0.04
    Interest rate for bob_account: 0.04


- The class attributes for instances are not locked-in upon object construction.
    - Whenever the class attributes change for a class, the class attributes will update for each instance
    - This is because each instance retrieves the values of the class attributes directly from the class.
