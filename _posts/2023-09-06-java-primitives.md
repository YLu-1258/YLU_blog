---
title: U1 Primitive Data Types
author: alex
badges: True
comments: True
categories: ['Java', 'tutorials']
date: 2023-08-20 20:48:00 -0800
tags: ['notebooks', 'data_types']
week: 4
render_with_liquid: False
type: hacks
---

### Overview
College Board Unit 1 has a focus on primitive types of int, double, and boolean.  In Unit 1, String is mentioned, but it is NOT a primitive type.  A String is essentially a sequence of characters and is called a reference data type, where each character is represented by the primitive `char` data type.

This mini-lab covers a comprehensive overview of Java primitive types, input/output, and the use of wrapper classes and reference data types. The examples and explanations provided will greatly assist students in understanding these concepts and applying them in their own code.

The mini-lab "Hacks" covers the essential aspects of primitive types in a concise manner. It provides students with opportunities for hands-on practice and encourages them to think creatively with the suggested activities.

### Data Types
Unit 1 focuses on primitive data types.  Now is a good time to compare primitives with other Java data types.  Review and compare data types with a focus on those prefixed with an asterisk, as they are required knowledge by College Board and will be on the AP Exam.

[Primitive Data Types](https://www.geeksforgeeks.org/data-types-in-java/): These are the basic data types in Java, representing fundamental values.
- *boolean: Represents true or false values.
- byte: Represents a signed 8-bit integer value.
- short: Represents a signed 16-bit integer value.
- *int: Represents a signed 32-bit integer value.
- long: Represents a signed 64-bit integer value.
- float: Represents a single-precision 32-bit floating-point value.
- *double: Represents a double-precision 64-bit floating-point value.
- char: Represents a single Unicode character.

Reference Data Types: These are more complex data types that can hold a collection of values or represent custom-defined entities.
- *[String](https://www.geeksforgeeks.org/strings-in-java/): Represents a sequence of characters.
- *[Arrays](https://www.geeksforgeeks.org/arrays-in-java/): Represents a collection of elements of the same data type.
- *[Classes](https://www.geeksforgeeks.org/classes-objects-java/): In Java, classes can be used to define custom data structures and entities that may contain primitives, strings, enums, wrapper classes, or arrays. Programmers define their own reference data types to create abstract data types or data structures. A Users class or a Graph class for Graph Theory are custome data types.
- *[Collection Framework](https://www.geeksforgeeks.org/collections-in-java-2/#): Java provides built-in classes like ArrayList, Queue, Stack, and HashMap as part of the Collections framework. A collection is an object that can hold references to other objects.  The Generic type declaration (ie \<Integer\>) allows the prorgrammer to provide the type of Object that a collection will contain, 

Hybrid Data Types
- *[Wrapper Classes](https://www.youtube.com/watch?v=kog78g2fvqU): Represents primitive data types as oan bjects (e.g., Boolean, Integer, Double). They are classes but still behave like behavior of primitive types with regards to pass-by-value . Therefore, they are not considered true reference data types.
- [Enums](https://www.geeksforgeeks.org/enum-in-java/#): Enums: Represents a fixed set of constants that are immutable. Enums are useful for representing a predefined set of values (ie `public enum Suit {SPADES, CLUBS, HEARTS, DIAMONDS};`).  



```java
public class DefinePrimitives {
    public static void main(String[] args) {
      int anInt = 100;
      double aDouble = 89.9;
      boolean aBoolean = true;

      // not primitives but essential
      String aString = "Hello, World!";   // wrapper class shortcut assignment
      String aStringFormal = new String("Greetings, World!");
  
      System.out.println("anInt: " + anInt);
      System.out.println("aDouble: " + aDouble);
      System.out.println("aBoolean: " + aBoolean);
      System.out.println("aString: " + aString);
      System.out.println("aStringFormal: " + aStringFormal);
    }
  }
  DefinePrimitives.main(null)
```

### Input Primitive data
Input is a key concept to all programming.  The assignments in previous example are "static" or "hard coded".  The examples when you use input are supplied by the user.

Scanner is the java utility class for console input.


```java
// import the Scanner class from the java.util package.
import java.util.Scanner;

// class must alway have 1st letter as uppercase, CamelCase is Java Class convention
public class ScanPrimitives {
    public static void main(String[] args) {    
        Scanner input;

        // primitive int
        input = new Scanner(System.in);
        System.out.print("Enter an integer: ");
        try {
            int sampleInputInt = input.nextInt();
            System.out.println(sampleInputInt);
        } catch (Exception e) {  // if not an integer
            System.out.println("Not an integer (form like 159), " + e);
        } finally {
            input.close();
        }

        // primitive double
        input = new Scanner(System.in);
        System.out.print("Enter a double: ");
        try {
            double sampleInputDouble = input.nextDouble();
            System.out.println(sampleInputDouble);
        } catch (Exception e) {  // if not a number
            System.out.println("Not an double (form like 9.99), " + e);
        } finally {
            input.close();
        }

        // primitive boolean
        input =  new Scanner(System.in);
        System.out.print("Enter a boolean: ");
        try {
            boolean sampleInputBoolean = input.nextBoolean();
            System.out.println(sampleInputBoolean);
        } catch (Exception e) {  // if not true or false
            System.out.println("Not an boolean (true or false), " + e);
        } finally {
            input.close();
        }

        // wrapper class String
        input =  new Scanner(System.in);
        System.out.print("Enter a String: ");
        try {
            String sampleInputString = input.nextLine();
            System.out.println(sampleInputString);
        } catch (Exception e) { // this may never happen
            System.out.println("Not an String, " + e);
        } finally {
            input.close();
        }
    }
}
ScanPrimitives.main(null);
```

### Output Primitive Data
The second key to to all programming is Output.  All programming has means to format and combine data.  In these examples you see descriptions of the mathematical operation combine with the result of the operation.


```java
public class PrimitiveDivision {
    public static void main(String[] args) {
        int i1 = 7, i2 = 2;
        System.out.println("Integer Division");
        System.out.println("\tint output with concatenation: " + i1 + "/" + i2 + " = " + i1/i2);
        System.out.println(String.format("\tint output with format: %d/%d = %d",i1, i2, i1/i2));
        System.out.printf("\tint output with printf: %d/%d = %d\n",i1, i2, i1/i2);

        double d1 = 7, d2 = 2;
        System.out.println("Double Division");
        System.out.println("\tdouble output with concatenation: " + d1 + "/" + d2 + " = " + d1/d2);
        System.out.println(String.format("\tdouble output with format: %.2f/%.2f = %.2f",d1, d2, d1/d2));
        System.out.printf("\tdouble output with printf: %.2f/%.2f = %.2f\n",d1, d2, d1/d2);

        System.out.println("Casting and Remainders");
        System.out.printf("\tint cast to double on division: %d/%d = %.2f\n",i1, i2, i1/(double)i2);
        System.out.println("\tint using modulo for remainder: " + i1 + "/" + i2 + " = " + i1/i2 + " remainder " + i1%i2);
    }
}
PrimitiveDivision.main(null);
```

### Grade Calculator, putting Input and Output together
Primitive types rarely stand alone.  This lab uses the primitive type double, but it also introduces the wrapper class Double.  Also included is one of the most common Data Structures in Java, the ArrayList.  These items are put together to create a grade calculator.


```java
public class GradeCalculator {
    // introduction to Double wrapper class (object)
    ArrayList<Double> grades;   // similar to Python list

    // constructor, initializes ArrayList and call enterGrades method
    public GradeCalculator() {
        this.grades = new ArrayList<>();
        this.enterGrades();
    }

    // double requires test for zero versus threshold, DO NOT compare to Zero
    private boolean isZero(double value){
        double threshold = 0.001;
        return value >= -threshold && value <= threshold;
    }


    // enterGrades input method using scanner
    private void enterGrades() {
        Scanner input;

        while (true) {
            input = new Scanner(System.in);
            System.out.print("Enter a double, 0 to exit: ");
            try {
                double sampleInputDouble = input.nextDouble();
                System.out.println(sampleInputDouble);
                if (isZero(sampleInputDouble)) break;       // exit loop on isZero
                else this.grades.add(sampleInputDouble);    // adding to object, ArrayList grades
            } catch (Exception e) {  // if not a number
                System.out.println("Not an double (form like 9.99), " + e);
            }
            input.close();
        }
    }

    // average calculation 
    public double average() {
        double total = 0;   // running total
        for (double num : this.grades) {    // enhanced for loop
            total += num;   // shortcut add and assign operator
        }
        return (total / this.grades.size());  // double math, ArrayList grades object maintains its size
    }

    // static main method, used as driver and tester
    public static void main(String[] args) {
        GradeCalculator grades = new GradeCalculator(); // calls constructor, creates object, which calls enterGrades
        System.out.println("Average: " + String.format("%.2f", grades.average()));  // format used to standardize to two decimal points
    }
}
// IJava activation
GradeCalculator.main(null);
```

## Hacks
Build your own Jupyter Notebook meeting these College Board and CTE competencies
- Use Scanner example above to give a warning message and continue with input until correct data type is provided.  Kind of like a test with hints.
- Define in a Class the following data types
    - Demonstrate use of Primitives: int, double, boolean
    - Demonstrate use of Reference data type: String 
- Describe in comments how each data type choice is appropriate to the application
- Use Jupyter cell to perform an arithmetic expressions that uses casting, add comments that show how it produces desired result (ie `double convertedValue = (double) intValue;`).  Learn more by watching this [College Board video](https://apclassroom.collegeboard.org/8/home?apd=ovg96bpudo&unit=1)
- Perform compound assignment operator (ie `intValue += 5;`), add comments to describe the result of operation.

Expectations
1. Multiple inputs and outputs are required.
2. Jupyter NoteBook when committed to GitHub Pages must display Outputs
3. Building something that helps you study for another class or solve a problem of intest. Here are some ideas: MPG, GPA, Celsius to Fahrenheit, Primes in range of numbers, Points per Game 


