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
**Polymorphism** is a greek word meaning many-formed (poly=many, morph=form). In the context of programming, Polymorphic behavior is defined as being able to reference objects of different types at different points during compilation.  

One example of Java polymorphism, is our ability to store references to objects instantiated from any class AND its *subclasses* in a variable. Another example is for methods, where we override the behavior of a method in a subclass such that it differs from the parent class. We successfully perform polymorphism when we override non-static methods and execute them from the correct, corresponding class at runtime.  

Here is a simple example of polymorphism:


```java
// This is our Parent class
class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
}

// Subclass 1
class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

// Subclass 2
class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}

public class Main {
    public static void main(String[] args) {
        
        // Here we have reference variables circle and rectangle defined with static type "Shape"
        Shape circle = new Circle();            // Circle has dynamic type "Circle"
        Shape rectangle = new Rectangle();      // Rectangle has dynamic type "Rectangle"
        
        // Calling the draw() method
        circle.draw();    // Output: Drawing a circle
        rectangle.draw(); // Output: Drawing a rectangle
    }
}

```

Even though the circle and rectangle have identical data-types, the compiler knows to call the correct method at run-time. We have successfully performed polymorphism

### Popcorn hack
1. Create any example of polymorphism, perferably with a class from your project, with corresponding methods and attributes as well.

## Static and Dynamic types
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

    


In this case, there is a conflict between our **static** and **dynamic** types.
 - **Static type**: The variable's declared type of the variable at compilation, specified by the programmer.
 - **Dynamic type**: The type of the object actually assigned to the static type. This is often the type of the Constuctor of the object that is ran when the compiler attempts to instantiate a new object.  

Because the static type of "Double" doesn't match up with the dynamic type "Integer", we see the error that we get above.

### Popcorn hacks
1. Given these lines of code, identify the static and dynamic variables in each scenario
```java
Animal myPet = new Dog();
```
```java
Object1 thing = new Object2();
```
```java

```

However, in our above example, the `Integer` and `Double` classes are actually subclasses of the `Number` class. Although they act as separate classes, they override and add methods to the parent class `Number`. If we instantiate our number variable as type Number, then it's possible to store values of type 'Integer' or 'Double' at any point during compilation


```java
Number myNumber = new Integer(6);
System.out.println(myNumber);
myNumber = new Double(6.1);
System.out.println(myNumber);
```

    6
    6.1


## Compile-time vs Runtime methods



```java
import java.util.HashMap;
public class GraphObject {
    private int value;

    public GraphObject(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Integer.toString(this.value);
    }
}

public class GraphNode extends GraphObject {
    private HashMap<Integer,Integer> edges;

    public GraphNode(int value, HashMap<Integer,Integer> edges){
        super(value);
        this.edges = edges;
    }

    public HashMap<Integer,Integer> getEdges() {
        return this.edges;
    }

    public void addEdge(int targetId, int weight) {
        this.edges.put(targetId, weight);
    }

    public void removeEdge(int targetId) {
        this.edges.remove(targetId);
    }
    
    @Override
    public String toString() {
        return "GraphNode[value=" + super.toString() + ",edges=" + this.edges + "]";
    }
} 
HashMap<Integer, Integer> node1Connections = new HashMap<Integer, Integer>();
node1Connections.put(2, 7);
node1Connections.put(3, 2);
node1Connections.put(4, 10);
GraphObject node1 = new GraphNode(1, node1Connections);
System.out.println(node1.toString());
((GraphNode)node1).addEdge(5,6);        // Here, we downcast node1, which is a GraphObject, to what it references, which is GraphNode
// node1.addEdge(5,6);                  // This wouldn't work as the compiler attempts to find addEdge() in GraphObject, which it can't, throwing an error  
System.out.println(node1.toString());
```

    GraphNode[value=1,edges={2=7, 3=2, 4=10}]
    GraphNode[value=1,edges={2=7, 3=2, 4=10, 5=6}]



```java

```
