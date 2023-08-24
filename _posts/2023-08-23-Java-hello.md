---
layout: post
title: Java Hello
description: A progressive journey through Java basics starting with the classic "Hello, World!" example.
courses: {'csa': {'week': 1, 'categories': ['3.A']}}
categories: ['C4.0']
comments: True
week: 1
date: 2023-08-23 09:08:00 -0800
type: ccc
---

## Hello, World!
This article shows the basic language structures and constructs of Java (aka anatomy).  In async order, it is critical to understand these examples and learn vocab for OOP and Creating Objects: 
- [Object Oriented Programming](https://youtu.be/Wok4Xw_5cyY) 
- [Creating Objects](https://youtu.be/C5Ks_u87Ltg)
- [Calling Methods](https://youtu.be/CPE_lYGCw3A)

### Static example
The class HelloStatic contains the classic "Hello, World!" message that is often used as an introduction to a programming language.  The "public static void main(String[] args)", or main method, is the default runtime method in Java and has a very specific and ordered definition (signature). 

The key terms in HelloStatic introduction:
- "class" is a blueprint for code, it is the code definition and must be called to run
- "method" or "static method" in this case, is the code to be run/executed, similar to a procedure
- "method definition" or "signature" are the keywords "public static void" in front of the name "main" and the parameters "String[] args" after the name.
- "method call" is the means in which we run the defined code



```java
// Define Static Method within a Class
public class HelloStatic {
    // Java standard runtime entry point
    public static void main(String[] args) {    
        System.out.println("Hello World!");
    }
}
// A method call allows us to execute code that is wrapped in Class
HelloStatic.main(null);   // Class prefix allows reference of Static Method
```

    Hello World!


### Dynamic Example
This example starts to use Java in its natural manner, using an object within the main method. This example is a very basic illustration of Object Oriente Programming (OOP). The main method is now used as a driver/tester, by making an instance of the class.  Thus, it creates an Object using the HelloObject() constructor.  Also, this Class contains a getter method called getHello() which returns the value with the "String hello".

The key terms in HelloStatic introduction:
- "Object Oriented Programming" focuses software design around data, or objects.
- "object" contains both methods and data
- "instance of a class" is the process of making an object, unique or instances of variables are created within the object
- "constructor" special method in class, code that is used to initialize the data within the object
- "getter" is a method that is used to extract or reference data from within the object. 


```java
// Define Class with Constructor returning Object
public class HelloObject {
    private String hello;   // instance attribute or variable
    public HelloObject() {  // constructor
        hello = "Hello, World!";
    }
    public String getHello() {  // getter, returns value from inside the object
        return this.hello;  // return String from object
    }
    public static void main(String[] args) {    
        HelloObject ho = new HelloObject(); // Instance of Class (ho) is an Object via "new HelloObject()"
        System.out.println(ho.getHello()); // Object allows reference to public methods and data
    }
}
// IJava activation
HelloObject.main(null);
```

    Hello, World!


### Dynamic Example with two constructors
This last example adds to the basics of the Java anatomy.  The Class now contains two constructors and a setter to go with the getter.  Also, observe the driver/tester now contains two objects that are initialized differently, 0 and 1 argument constructor.  Look at the usage of the "this" prefix.  The "this" keyword helps in clarification between instance and local variable.

The key terms in HelloDynamic introduction:
- "0 argument constructor" constructor method with no parameter ()
- "1 argument constructor" construct method with a parameter (String hello)
- "this keyword" allows you to clear reference something that is part of the object, data or method
- "local variable" is a variable that is passed to the method in this example, see the 1 argument constructor as it has a local variable "String hello"
- "dynamic" versus "static" is something that has option to change, static never changes.  A class (blueprint) and objects (instance of blueprint) are generally intended to be dynamic.  Constructors and Setters are used to dynamically change the content of an object.
- "Java OOP, Java Classes/Objects, Java Class Attributes, Java Class Methods, Java Constructors" are explained if more complete detail in W3 Schools: https://www.w3schools.com/java/java_oop.asp


```java


// Define Class
public class HelloDynamic { // name the first letter of class as capitalized, note camel case
    // instance variable have access modifier (private is most common), data type, and name
    private String hello;
    // constructor signature 1, public and zero arguments, constructors do not have return type
    public HelloDynamic() {  // 0 argument constructor
        this.setHello("Hello, World!");  // using setter with static string
    }
    // constructor signature, public and one argument
    public HelloDynamic(String hello) { // 1 argument constructor
        this.setHello(hello);   // using setter with local variable passed into constructor
    }
    // setter/mutator, setter have void return type and a parameter
    public void setHello(String hello) { // setter
        this.hello = hello;     // instance variable on the left, local variable on the right
    }
    // getter/accessor, getter used to return private instance variable (encapsulated), return type is String
    public String getHello() {  // getter
        return this.hello;
    }
    // public static void main(String[] args) is signature for main/drivers/tester method
    // a driver/tester method is singular or called a class method, it is never part of an object
    public static void main(String[] args) {  
        HelloDynamic hd1 = new HelloDynamic(); // no argument constructor
        HelloDynamic hd2 = new HelloDynamic("Hello, Nighthawk Coding Society!"); // one argument constructor
        System.out.println(hd1.getHello()); // accessing getter
        System.out.println(hd2.getHello()); 
    }
}
// IJava activation
HelloDynamic.main(null);
```

    Hello, World!
    Hello, Nighthawk Coding Society!


## Hacks
Build your own Jupyter Notebook meeting these College Board and CTE competencies.  It is critical to understand Static versus Instance Now, this is College Board requirement!!!
- Explain Anatomy of a Class in comments of program (Diagram key parts of the class).
- Comment in code where there is a definition of a Class and an instance of a Class (ie object)
- Comment in code where there are constructors and highlight the signature difference in the signature
- Call an object method with parameter (ie setters).


Additional requirements (Pick something)
1. Go through code progression of understanding Class usage and generating an Instance of a Class (Object). 
    a. Build a purposeful dynamic Class, using an Object, generate multiple instances: 
        - Person: Name and Age
        - Dessert: Type and Cost
        - Location: City, State, Zip
    b. Create a static void main tester method to generate objects of the class.
    c. In tester method, show how setters/mutators can be used to make the data in the Object dynamically change
3. Go through progression of understanding a Static Class.  Build a purposeful static Class, no Objects.
    - Calculate common operations on a Date field, age since date, older of two dates, number of seconds since date
    - Calculate stats functions on an array of values: mean, median, mode.
