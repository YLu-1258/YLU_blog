---
title: Inheritance
author: alex
badges: True
comments: True
categories: ['CS61B']
date: 2025-02-07 1:00:00 -0800
math: True
tags: ['CS61B', 'Data Structures', 'Inheritance', 'JAVA']
---

# A motivation for inheritance
- When programming similar classes may have similar attributes and implementations, such as `SLList`, `DLList`, `AList`. 
    - When we try to implement a function to take in the input of an `SLList`, `DLList`, or `AList`,we must have 3 versions of the function that each take in a different version of a list. This is called Method overloading.
- While method overloading works, it is highly repetitive.

## Inheritance interface
- Due to their high similarities, SLLists, DLLists, and ALists are all hyponyms of a more general list class.
- In order to represent this relationship, we create a type, `List61B` that embodies the the hypernym of all the other classes we implemented.
- The `List61B` type is called an **interface** in Java. It specifies what a list should be able to do, but it does not specify the implementation for the list.


```java
// This cannot be instantiated directly
public interface List61B<Item> {
    public void addFirst(Item x);
    public void addLast(Item y);
    public Item getFirst();
    public Item getLast();
    public Item removeLast();
    public Item get(int i);
    public void insert(Item x, int position);
    public int size();
    default public void print() {
        for (int i = 0; i < size(); i+=1) {
            System.out.println(get(i) + " ");
        }
    }
}
```

- The interface is something abstract, so it has no constructor as we would never instantiate a List61B object.
- We would them use List61B to impement our other data structures with the following code:


```java
public class AList<Item> implements List61B<Item>{...}
```

# Overriding
- When implementing the required functions defined in a superclass within a subclass, we have to override the method in the subclass with a `@Override` annotation.
    - The `@Override`annotation doesn't actually change anything with our code, it just tells te compiler that the method is intended to be overriden, so if any errors occur, the compiler will let us know what happened.
    - Ex: We made a typo with the overriden method name.
- If we override a method that does not exist in a superclass, we will be errored.
- A subclass can have extra methods. Our super class is just a barebones definition of what we should have.
    - Subclasses must override all methods.


```java
@Override
public void addFirst(Item x) {
    insert(x, 0);
}
```

- Here is our attempt at implementing the `AList` from `List61B`.


```java
public class AList<T> implements List61B<T> {
    private T[] array;
    private int size;
    private static final int RFACTOR = 2;
    private static final double DOWNSIZE_THRESHOLD = 0.25;

    public AList() {
        this.array = (T []) new Object[1000];
        this.size = 0;
    }

    private void resize(int new_size) {
        T[] temp;
        temp = (T []) new Object[new_size];
        System.arraycopy(this.array, 0, temp, 0, this.size);
        this.array = temp;
    }

    private void check_and_resize() {
        if (this.size == this.array.length) {
            resize(this.size * this.RFACTOR);
        }
    }

    @Override
    public void addFirst(T element) {
        insert(element, 0);
    }

    @Override
    public void addLast(T element) {
        if (this.size == this.array.length) {
            resize(this.size * this.RFACTOR);
        }
        this.array[this.size] = element;
        this.size++;
    }

    @Override
    public T removeLast() {
        T itemToReturn = this.array[this.size];
        this.array[this.size] = null;
        size--;
        if ((double) this.size/this.array.length < this.DOWNSIZE_THRESHOLD) {
            resize(this.size/2);
        }
        return itemToReturn;
    }

    @Override
    public void insert(T element, int index) {
        check_and_resize();
        for (int i = size; i>index; i--) {
            this.array[i] = this.array[i-1];
        }
        this.array[index] = element;
        this.size++;
    }

    @Override
    public T get(int i) {
        if (i >= this.size) {
            throw new IndexOutOfBoundsException("Index " + i + " is out of bounds for AList with size " + this.size);
        }
        return array[i];
    }

    @Override
    public T getLast() {
        return array[size-1];
    }

    @Override
    public T getFirst() {
        if (this.size == 0) {
            throw new IllegalStateException("List is empty!");
        }
        return array[0];
    }

    @Override
    public int size() {
        return size;
    }
}

AList<Integer> test = new AList<Integer>();
for (int i = 0; i < 10000; i++) {
    test.addLast(i);
}
```

# Iterface Inheritance
- The interface include sall method signatures, but the subclass provides those implementations.
- Inheritance is multigenerational, A sub class will inherit characteristics from all the classes above it.
- We may also specify default implementations in an interface using the `default keyword` 
    - We may only use the methods that we have defined within our interface. We may not create new attributes to help us, as this would violate the purpose of an interface (what if a certain list doesn't have an certain attribute).


```java
default pubic void print() {
    for (int i = 0; i < size(); i+=1) {
        System.out.println(get(i) + " ");
    }
}
```

- However the default implementation may be inefficient for lists of a certain type. Thus, we may override the default implementation as well.


```java
// Overriden print method for Linked List
// Added efficiency
@Override
public void print() {
    for (Node p = sentinel.next; p != null; p = p.next) {
        System.out.print(p.item + " ");
    }
}
```

- Java is able to distinguish which `print()` to call due to **dynamic method selection**


```java
List61B<String> lst = new SLList<String>();
```

- In the above snippet, the `lst` variable has a type of `List61B`, but the object it references has a type of `SLList`.
    - `List61B` is the static type of the variable. `SLList` is the dynamic type of the object.
    - This code makes sense because if our `SLList` implements the `List61B` interface, it has an "is-a" relationship with `List61B`. `SLList` is a `List61B`.
    - Since `SLList` is a dynamic type, the type that `lst` can refer to may change so long as the new type "is-a" `List61B`.
        - We may change `lst` to refer to an `AList`.
- Whenever Java runs a `overriden` method, it searches for the coresponding method signature in the objects dynamic type.
- **This dynamic typing fails to work for overloaded methods.**
    - Ex:


```java
public static void peek(List61B<String> list) {
    System.out.println(list.getLast());
}
public static void peek(SLList<String> list) {
    System.out.println(list.getFirst());
}

SLList<String> SP = new SLList<String>();
List61B<String> LP = SP;
SP.addLast("elk");
SP.addLast("are");
SP.addLast("cool");
peek(SP);
peek(LP);
```

- In the above code segment, the `peek` method has two overloaded versions, one for `List61B` and the other for `SLList`.
    - When we call `peek`, it only checks for the static type of the parameter we insert.
    - `peek` for SP would get the first element, while `peek` for LP would get the last element.

## Implementation vs Interface Inheritance
- Interface inheritance specifies what methods sub classes would be able to perform. Implementation inheritance specifies how the methods within subclasses may perform.
- Implementation inheritance may introduce additional complexity, and also allow conflicting implementations in multiple inheritance.

# Extends, Casting, High Order Functions
- Subclasses implement an interface, but they *extend* from a class.
    - The subclass may not access private members of a super class.
- When we extend from a class, the sub class inherits all methods and attributes from SLList, except for constructors.


```java
public class RotatingSLList<T> extends SLList<T>{
    public void rotateRight() {
        T oldBack = removeLast();
        addFirst(oldBack);
    }
}
```

## Constructor behavior
- Constructors are not directly inherited, but the constructor of the **superclass** is automatically called whenever our subclasses' constructor runs.
- The constructor may be explicitly called using `super()`. This also means that different constructors may be called if we pass in arguments into `super()`.
- Parent members and methods amy be called using the dot notation with `super`.


```java
public class VengefulSLList<Item> extends SLList<Item> {
	private SLList<Item> deletedItems;
	public VengefulSLList() {
       deletedItems = new SLList<Item>();
	}
  
	@Override
	public Item removeLast() {
    		Item oldBack = super.removeLast(); //calls Superclass’s version of removeLast()
    		deletedItems.addLast(oldBack);
    		return oldBack;
	}
 
	public void printLostItems() {
    		deletedItems.print();
	}
}

public static void main(String[] args) {
    	VengefulSLList<Integer> vs1 = new VengefulSLList<Integer>();
    	vs1.addLast(1);
    	vs1.addLast(5);
    	vs1.addLast(10);
    	vs1.addLast(13);      /* [1, 5, 10, 13] */
    	vs1.removeLast();     /* 13 gets deleted. */
    	vs1.removeLast();     /* 10 gets deleted. */
    	System.out.print("The fallen are: ");
    	vs1.printLostItems(); /* Should print 10 and 13. */
}
```

## The Object Class
- Every type in Java is a descendant of the `Object` class.
- This means that every type in java derives the following methods from `Object`:
    - `toString()`: Provides string representation of an object.
    - `hashCode()`: A unique number generated by converting the internal address of the object into an integer. This method is native as Java does not have access to memory addresses. If two objects are equal, then they have the same hashcode.
    - `equals(Object obj)`: Compares another object with the current object. Overriden to add custom conditions.
    - `finalize()`: Called right before an object is garbage collected. Called when the garbage collector determines that there are no more references to the object.
    - `getClass()`: Returns the class object of a given object.
    - `clone()`: Creates and returns a new object that is a clone of the current object.
    - `wait()`, `notify()`, `notifyAll()`: There are concurrency methods that are called when using multithreading in Java.

## Managing Complexty:
- Hierarchical abstraction:
    - Create layers of abstraction with clear abstraction barriers
- Design for hange
    - Organize programs around objects and let objects decide how things should run.
    - Hide information that is not needed by other objects.
- **Modules** are a set of methods that work together to perform some task or set of related tasks.
    - A module is **encapsulated** if its implementation is completely hidden. It can only be manipulated through programmed interfaces. Direct access is prevented.

# Casting
- **static (compile-time) type**: The type assigned at variable declaration, this never changes. This type is checked at compile time.
- **dynamic (runtime) type**: The type assigned at variable instantiation, this is the type of the object pointed at. This type is checked at runtime.

## Compile Time Type Checking and Expressions
- Expressions have compile time types. Expressions using the `new` keyword has the specified compile time type.


```java
SLList<Integer> sl = new VengefulSLList<Integer>();
```

- This is allowed because the compile-time type of the RHS expression is `VengefulSLList`, and `VengefulSLList` is a `SLList`, so assignment is allowed.


```java
VengefulSLList<Integer> vsl = new SLList<Integer>();
```

- This is not allowed because the compile-time type of the RHS expression is `SLList`, and `SLList` is not necessarily a `VengefulList`, so assignment is disallowed.
- Any method calls would have a compile-time type


```java
public static Dog maxDog(Dog d1, Dog d2) { … }

Poodle frank  = new Poodle("Frank", 5);
Poodle frankJr = new Poodle("Frank Jr.", 15);

Dog largerDog = maxDog(frank, frankJr);
Poodle largerPoodle = maxDog(frank, frankJr);
```

- The above code would not compile, as the java compiler expects `maxDog` to return a `Dog` type, but a `Dog` type is not necessarily a `Poodle` type.

## Casting
- Casting is the act of specifying a compile-time type for an expression.
    - Put the desired type in parenthesis before a given expression, which tells java to treat the object as a different type.
    - This does not change anything, as the object's inherant type at runtime is still the same.
- In the example below, if we did not cast the type of `x[0]` and `x[1]`, the compiler would scream at us and tell us that an object does not support infix addition.


```java
Object[] x = {"Hello ", "world!"};

System.out.println(x[0] + x[1]);
```


    |   System.out.println(x[0] + x[1]);

    bad operand types for binary operator '+'

      first type:  java.lang.Object

      second type: java.lang.Object

    



```java
Object[] x = {"Hello ", "world!"};

System.out.println((String) x[0] + (String) x[1]);
```

    Hello world!


# Higher Order Functions in Java
- A higher order function is a function that treats another a function as data.
    - Such as taking a function as an input.
- In Java, we cannot have a memory boxes contain pointers to a function. Thus, we must use an interface instead.


```java
public interface IntUnaryOperation {
    public int apply(int x);
}

public class TenX implements IntUnaryOperation {
    public int apply(int x) {
        return 10 * x;
    }
}

public class HoFDemo {
    public static int doTwice(IntUnaryOperation f, int x) {
        return f.apply(f.apply(x));
    }
}

HoFDemo.doTwice(new TenX(), 5);
```




    500



# Dynamic Method Selection
- Rules for dynamic method selectoin
    - Compilers allow memory boxes to hold any subtypes of itself.
    - Compilers allow calls based on static type
        - If a method is availible in the static type of the object, the compiler would allow the call to that object.
    - **Overridden non-static methods are selected at run time based on dynamic type    **
