---
title: Workshop 1 FRQs
badges: True
comments: True
categories: ['APCSA', 'FRQs']
tags: ['APCSA', 'FRQs']
type: hacks
---

## Question 1: Primitive Types vs Reference Types (Unit 1)
Situation: You are developing a banking application where you need to represent customer information. You have decided to use both primitive types and reference types for this purpose.

(a) Define primitive types and reference types in Java. Provide examples of each.  
* **Primative Types:** The most basic types in Java, and are typically directly stored in the memory with no other processing. Examples of this are `int`, `double`, `char`, and `float`.  
* **Reference Types:** The next level of data types in Java. They do not directly store the value that they are associated with, but rather reference the location in the memory or heap of where the data is stored. Examples of this is `String`, `Array`, and other objects created in Java.

(b) Explain the differences between primitive types and reference types in terms of memory allocation and usage in Java programs.  

* Primative types tend to allocate less memory than reference types because they store the actual value in question, rather than a reference to the value. Thus, the size of the type is directly linked to the type of data itself, with int being 4 bytes, a boolean being 1 bit, and so on. For reference types though, the address of the value is stored instead, so it is typically always a 32 bit large variable. Because of this, primative types tend to be more memory efficient than reference types in Java programs, but reference types allows us greater flexibility to create more complex data structures.

(c) Code:

You have a method calculateInterest that takes a primitive double type representing the principal amount and a reference type Customer representing the customer information. Write the method signature and the method implementation. Include comments to explain your code.


```java
class Customer {
    private String name;        // Attributes of class Customer
    private double total;
    private int id;

    public Customer(String n, double t, int i) {
        this.name = n;
        this.total = t;
        this.id = i;
    }

    public void setName(String n) { // Setters for updating values
        this.name = n;
    }

    public void setTotal(double t) {
        this.total = t;
    }

    public void setId(int i) {
        this.id = i;
    }

    public String getName() {       // getters for retriving values
        return this.name;
    }

    public double getTotal() {
        return this.total;
    }

    public int getId() {
        return this.id;
    }
}

class CustomerUtils {
    public static void calculateInterest(double principle, Customer c) {    // static method to calculate the interest and set it to a particular customer, we use static to call it without instantiating an object. Nothing is returned so return type is void.
        double interestRate = 0.05;
        double interest = interestRate * principle;                         // Helper variable to help achieve that
        c.setTotal(c.getTotal() + interest);                                // the interest value is a primative while the Customer variable is a reference type
    }
}

Customer c1 = new Customer("Alexander", 100000.0, 127);
System.out.println("Name: " + c1.getName() + " Total: " + c1.getTotal() + " Id: " + c1.getId());
CustomerUtils.calculateInterest(25000.0, c1);
System.out.println("Name: " + c1.getName() + " Total: " + c1.getTotal() + " Id: " + c1.getId());    // The total has been increased with the interest from the principle.
```

    Name: Alexander Total: 100000.0 Id: 127
    Name: Alexander Total: 101250.0 Id: 127


# Question 3: Array (Unit 6)

Situation: You are developing a student management system where you need to store and analyze the grades of students in a class.

(a) Define an array in Java. Explain its significance and usefulness in programming.
An array in Java is a data structure that stores data consecutively in one big contiguous block of memory. The array is also one of the most fundamental forms of a collection object in Java, being able to store values of the same datatype and also being statically assigned a size upon being instantiated. This is useful and significant to programming because then we can store similar data next to each other, and be able to perform operations while making relationships between them (Ex: A set of student's grades can be expressed as an array, and then we can perform statistical analysis on it).

(b) Code:

You need to implement a method calculateAverageGrade that takes an array grades of integers representing student grades and returns the average of all the elements in the array. Write the method signature and the method implementation. Include comments to explain your code.


```java


public class Grades {
    public static double calculateAverageGrade(int[] grades) {
        int sum = 0;                            // integer to store total of array, is initialized with value 0
        for (int i = 0; i<grades.length; i++) { // loop over each index in array to access values and add them to sum
            sum+=grades[i];
        }
        return (double) sum/grades.length;      // divide by array length to get final answer
    }
}

int[] a = {1,2,3,4,4,4,1,2,2,3};
System.out.println("Grades: " + Grades.calculateAverageGrade(a));
```

    2.6


# Question 4
Situation: You are developing a scientific calculator application where users need to perform various mathematical operations.

(a) Discuss the purpose and utility of the Math class in Java programming. Provide examples of at least three methods provided by the Math class and explain their usage.
* In traditional Java, arithmetic operations are limited to the four basic arithmetic operations, exponentiation, and bitwise operations. The Math class provides additional fundtions and operations that would typically have to be implemented by hand in Java. Typically, it is better to use this class because the actual implementation of the methods would likely be faster than any implementation we can write in plain old Java. 
    * `Math.max(x,y)`: Finds the max value between two numerical types
    * `Math.sqrt(x)`: Finds the square root of a certain numerical number.
    * `Math.random()`: Returns a random number from 0 to 1. (Includes 0 but not 1).

(b) Code:

You need to implement a method calculateSquareRoot that takes a double number as input and returns its square root using the Math class. Write the method signature and the method implementation. Include comments to explain your code.


```java
import java.lang.Math;

public class Calculator {
    public static double calculateSquareRoot(double input) {
        return Math.sqrt(input);
    }
}

System.out.println("Square root of 4.4 is: " + Calculator.calculateSquareRoot(4.4));
```

    Square root of 4.4 is: 2.0976176963403033

