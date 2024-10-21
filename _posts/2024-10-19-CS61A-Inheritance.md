---
title: 'CS61A: Inheritance'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-10-19 6:00:00 -0800
math: True
tags: ['CS61A', 'inheritance', 'OOP']
---

# Inheritance
- A method for relating classes together.
- A common use case is two similar classes that differ in their degree of specialization
- The specialized class has same attributes as a general class, but it could also have special behavior
- In python:
```python
class <name>(<base class>):
    <suite>
```
- Basically, the sub class "shares" attributes with the base class.
    - Of course, the sub class may overwrite certain attributes in the base class.
    - In the definition of the sub class, we only write all the difference the sub class has from the base class.
-Ex: Creating a CheckingAccount is that is a specialized type of Account.


```python
from account import Account
class CheckingAccount(Account):
    """A bank account that charges for withdrawals."""
    interest = 0.01
    withdraw_fee = 1
    def withdraw(self, amount):
        return super().withdraw(amount + self.withdraw_fee)
        # return Account.withdraw(self, amount + self.withdraw_fee)

ch = CheckingAccount("Tom")
```

- Notice that for the implementation of withdraw, we could've returned `Account.withdraw(self, amount + self.withdraw_fee)` instead.
    - The reason that we include `self` in the method statement is because we are calling a the function withdraw of the Account class, and not the bound method of an instance.
    


```python
ch.interest
```




    0.01



- Here, we see that the interest attribute for the CheckingAccount is different that the original interest of a regular account


```python
ch.deposit(20)
```




    20



- Even though the deposit method was not specified in the subclass implementation, our subclass still knows to inherit this method from our base class.


```python
ch.withdraw(5)
```




    14



- Since we overwrite the behavior of the withdraw method in the subclass, we see that change reflected in this code
- The reason why we invoke the Account.withdraw() method instead, is so that if future changes were made to the withdraw() method in Account, they would also be reflected in CheckingAccount.

## Looking Up Attribute Names on Classes
- Thorugh inheritance, the base class attributes are not copied over into the subclass
- Thus, the attribute lookup process is as follows:
    - First look for the name within our instance
    - Then look for attributes within the class, and return the value if found.
    - Otherwise, look for the name in the base class, if there is one.
- The second and third steps are recursive, as we may have many classes chained together in recursion. We will recursively look through all the inherited classes until the name is found or we hit the final base class.  

## Tracing the lookup process


```python
# Calls Account.__init__
# We do not find the name __init__ in CheckingAccount, so we look for it in the base class Account
ch = CheckingAccount('Tom')
# Returns  CheckingAccount.interest
# The name interest is found in CheckingAccount first, so that value is returned instead of Account.interest
interest = ch.interest
# Calls Account.deposit()
# The name deposit is not found within the ch instance or CheckingAccount, but it is found within Account
new_balance = ch.deposit(20)
# Calls CheckingAccount.withdraw 
# The name withdraw is found within CheckingAccount class 
newer_balance = ch.withdraw(5)
print(ch, interest, new_balance, newer_balance) 
```

    <__main__.CheckingAccount object at 0x7ff6feda7a90> 0.01 20 14


# Object-Oriented Design
## Designing for Inheritance
- DRY: use existing implementations.
- Attributes that have been override should still be accessible via class objects.
    - In the subclass, we give attributes the same name as the base class to override them.
    - We should still be able to access the OG methods in the base class.
- Look up attributes on instances whenever possible
    - This makes our implementation dynamic, as we can now ensure that the methods and attributes of each instance are based on that instance's attributes.
    - This enables specialized instances.

## Inheritance and Composition
- **Composition:** The act of having another object as an attribute.
- Object-orienting programming metaphor: Treat objects like real things in the world.
- Inheritance serves to represent *is-a* relationships.
    - Essentially, the subclass IS a type of a base class.
- Composition serves to represent *has-a* relationships.
    - Essentially, the object serves to wrap other objects of either the same or a different type within itself.
- Example of Compostion: A bank.


```python
class Bank:
    """A bank *has* accounts.
    >>> bank = Bank()
    >>> john = bank.open_account('John', 10)
    >>> jack = bank.open_account('Jack', 10, CheckingAccount)
    >>> john.interest
    0.02
    >>> jack.interest
    0.01
    >>> bank.pay_interest()
    >>> john.balance
    10.2
    """
    def __init__(self):
        self.accounts = []
    
    def open_account(self, holder, amount, kind=Account):
        account = kind(holder)
        account.deposit(amount)
        self.accounts.append(account)
        return account
    
    def pay_interest(self):
        for account in self.accounts:
            account.deposit(account.balance*account.interest)
```




```python
class A:
    z = -1
    def f(self, x):
        return B(x-1)
    
class B(A):
    n = 4
    def __init__(self, y):
        if y:
            self.z = self.f(y)
        else:
            self.z = C(y+1)

class C(B):
    def f(self, x):
        return x
    
a = A()
b = B(1)
b.n = 5
```

```python
>>> C(2).n
4
>>> a.z == C.z
a.z = -1
C.z = -1
True
>>> a.z == b.z
a.z = -1
b.z = B(0)
False
>>> "Which of the following returns an integer?"
b.z = B(0)
b.z.z = B(0).z = C(1)
b.z.z.z = C(1).z = 1 this one
b.z.z.z.z = Error
```

# Multiple Inheritance
- **Multiple Inheritance**: A subclass may have multiple base classes.
- Ex: Savings Account


```python
class SavingsAccount(Account):
    deposit_fee = 2
    def deposit(self, amount):
        return Account.deposit(self, amount - self.deposit_fee)
```

- But lets say we want to create a new account with a low interest rate of 1%, a $1 fee for withdrawals, and a $2 fee for deposits, but a free dollar when you open the account


```python
class AsSeenOnTvAccount(CheckingAccount, SavingsAccount):
    def __init__(self, account_holder):
        self.holder = account_holder
        self.balance = 1
```

- For the name-ambiguity in multiple inheritance, the name is resolved in the following process:
    - instance -> AsSeenOnTvAccount -> CheckingAccount -> SavingsAccount -> Account -> object
    - This is because both CheckingAccount
