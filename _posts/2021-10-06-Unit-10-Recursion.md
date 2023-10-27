---
title: APCSA lesson 9.6 Polymorphism
author: alex
badges: True
comments: True
categories: ['AP Prep', 'tutorials']
date: 2023-10-05 00:00:00 -0800
tags: ['notebooks', 'objects', 'oop', 'polymorphism']
week: 4
render_with_liquid: False
type: hacks
---

- down casting
- methods at compile v runtime

## What is Polymorphism?
Typically in Java, a reference variable storing an object instantiated from a child class can only store other objects of that class. If we try to store an object of another class, we'd get an error i.e.  

```java
Integer myNumber = new Integer(6);      // Instantiates an Integer object
System.out.println(myNumber);           // Would print Integer type 6 normally
myNumber = new Double(6.1);             // Compile error occurs, incompatible types
System.out.println(myNumber);           // This line is not reached
```  

But what if we want want a reference variable to store objects of other classes? We get an error


```java
Integer myNumber = new Integer(6);
System.out.println(myNumber);
myNumber = new Double(6.1);
System.out.println(myNumber);
```

    6



    |   myNumber = new Double(6.1);

    incompatible types: java.lang.Double cannot be converted to java.lang.Integer

    


However, the `Integer` and `Double` classes are actually subclasses of the `Number` class.


```java
Number myNumber = new Integer(6);
System.out.println(myNumber);
myNumber = new Double(6.1);
System.out.println(myNumber);
```

    6
    6.1



```java

```
