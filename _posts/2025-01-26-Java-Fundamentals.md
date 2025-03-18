---
title: Java Fundamentals
author: alex
badges: True
comments: True
categories: ['CS61B']
date: 2025-01-26 1:00:00 -0800
math: True
tags: ['CS61B', 'JAVA']
---

# Static Vs. Non-Static Methods
- An object is an instance of any class.
- Each class may have instance variables that are unique to each instance object, or static variables that are common to the entire class.
    - It is good convention to refer to static elements with the Class rather than an instance.
- Instances may use both static and non-static attributes, while static methods may only access static attributes.
- Within an instance, instance attributes are referred to using the `this` keyword.
- A constructor is a method that is ran when instantiating an intsance.


```java
public class Dog {
    private String sound;
    private String name;
    private int weight;
    
    public Dog(String name, int weight) {
        this.weight = weight;
        this.name = name;
        if (weight > 20) {
            this.sound = "Aroooooo!";
        } else if (weight > 10) {
            this.sound = "woof!";
        } else {
            this.sound = "yip yip yip!";
        }
    }

    public void makeNoise() {
        System.out.println(this.sound);
    }

    public static Dog maxDog(Dog d1, Dog d2) {
        if (d1.weight > d2.weight) {
            return d1;
        }
        return d2;
    }

    @Override
    public String toString() {
        return "Dog(" + this.name + ", " + this.weight + ")";
    } 
}

Dog maya = new Dog("maya", 25);
Dog jim = new Dog("jim", 9);
maya.makeNoise();
System.out.println(Dog.maxDog(maya, jim));
```

    Aroooooo!
    Dog(maya, 25)


# References, Recursion, and Lists
- Java has both **arrays** and **lists**.
    - **Arrays:** A fixed-size collection of objects.
    - **Lists:** A dynamic-size collection of objects.
- All data within Java is stored as a sequence of bits.
    - Each data type takes up a different number of bits.
    - Java has 8 primitive types: **byte**, **short**, **int**, **long**, **float**, **double**, **boolean**, **char**.
- Whenever a variable of a type is declared, Java allocates a contiguous block of memory with enough bits to hold that variable.
    - Java does not expose the memory location of variables and objects. This means less control, but also a less range of errors that can be made (such as segmentation faults).

## The Golden Rule of Equals (GRoE)
- Whenever we pass by value, such as assigning a value to some variable, we copy the bits of that value to the new variable.
- Other than the eight primitive types, every other type in Java is a **reference** type.
- Process of object instantiation:
    - Java allocates memory for each instance variable of the class.
    - The constructor fills custom values for each instance variable.
    - Whenever a variable of a reference type is created, Java allocates 64 bytes to store not the object, but the address of the object in memory.
- When `null` is stored to a reference variable, we see all zeros.
- Ex: This is what the instance variable actually stores, an integer representation of the address of the object.


```java
System.out.println(maya.hashCode());
```

    1397079044


## Parameter Passing
- When parameters are passed to a function, the bits of the parameters are copied over. This is called **pass by value**. Java always passes by value.


```java
public static class Walrus {
    public int weight;
    public double tuskSize;
    
    public Walrus(int w, double ts) {
       weight = w;
       tuskSize = ts;
    }

    public String toString() {
       return String.format("weight: %d, tusk size: %.2f", weight, tuskSize);
    }
}

public class PassByValueFigure {
    public static void main(String[] args) {
           Walrus walrus = new Walrus(3500, 10.5);
           int x = 9;

           doStuff(walrus, x);
           System.out.println(walrus);
           System.out.println(x);
    }

    public static void doStuff(Walrus W, int x) {
           W.weight = W.weight - 100;
           x = x - 5;
    }
}

PassByValueFigure.main(null);
```

    weight: 3400, tusk size: 10.50
    9


- In this case, the value of x wasn't changed as doStuff manipulated a separate variable in its frame. The original bytes remained the same.
- However, the "W" in doStuff contains the same address as the "walrus" in the main method. Thus, they both refer to the same object, so any changes made to W is also applied to walrus.

## Instantion of Arrays
- Variables storing arrays are also reference variables.
- Ex:
    - The `new` keyword creates 5 memory segments with 32 bits each for each integer and returns a 32bit address that is stored in x that points to the array.


```java
int[] x = new int[]{1,2,3,4,5};
System.out.println(x.hashCode());
System.out.println(Arrays.toString(x));
```

    1974906852


    [1, 2, 3, 4, 5]


- If the reference to an object is lost or overriden, Java simply destroys the object.

## IntList
- A very simple list can be created after the linked-list structure:


```java
public class IntList {
    public int first;
    public IntList rest;

    public IntList(int first, IntList rest) {
        this.first = first;
        this.rest = rest;
    }

    @Override
    public String toString() {
        return "[" + this.toStringHelper() + "]";
    }
    public String toStringHelper() {
        if (rest != null) {
            return this.first + ", " + this.rest.toStringHelper();
        } else {
            return String.valueOf(this.first);
        }
    }

    public int size() {
        if (this.rest != null) {
            return 1 + this.rest.size();
        } else {
            return 1;
        }
    }

    public int iterativeSize() {
        int size = 1;
        IntList dummy = this;
        while (dummy.rest != null) {
            dummy = dummy.rest;
            size++;
        }
        return size;
    }

    public int get(int i) {
        if (i == 0) {
            return this.first;
        } else if (this.rest != null) {
            return this.rest.get(--i);
        } else {
            return -1;
        }
    }

    public void addFirst(int i) {
        rest = new IntList(first, rest);
        first = i;
    }
}

IntList L = new IntList(1, null);
L = new IntList(2, L);
L = new IntList(3, L);
L.addFirst(1);
L;
```




    [1, 3, 2, 1]


