---
title: Objects
author: alex
badges: True
comments: True
categories: ['AP Prep', 'tutorials']
date: 2023-10-05 00:00:00 -0800
tags: ['notebooks', 'objects', 'oop']
week: 4
render_with_liquid: False
type: hacks
---

### Java objects
-  In Java, objects are essentially instances of classes. They represent real-world entities or concepts and contain both data and behaviors, facilitating organized and modular software design.

### Common Types of Java Classes
In Java, classes are the fundamental building blocks of Object-Oriented Programming (OOP). They define the structure and behavior of objects, serving as templates or blueprints from which objects are created. Java programs typically consist of multiple classes, each designed to fulfill a specific role. One Java class that you should be familliar with is: 


1. Utility Classes: Utility classes contain static methods that provide common utility functions. These classes are not meant to be instantiated, and they often involve operations such as mathematical calculations, string manipulation, or date formatting. The Math class is an example of a utility class.
    - Java Arrays Class
    - Java HashMap Class
    - Java LinkedList Class


```java
import java.util.Arrays;

public class ArraySortExample {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 9, 1, 5, 6};
        Arrays.sort(numbers);
        System.out.println(Arrays.toString(numbers));
    }
}
String[] words = {"main"};
ArraySortExample.main(words);
```

    [1, 2, 5, 5, 6, 9]


<img src="image-4.png" alt="Alt text" width="600" height="500">

#### Java Objects
An object in Java is a basic unit of Object-Oriented Programming and represents real-life entities. `Objects are the instances of a class that are created to use the attributes and methods of a class.`  A typical Java program creates many objects, which as you know, interact by invoking methods. An object consists of : 

1. State: It is represented by attributes of an object. It also reflects the properties of an object.
2. Behavior: It is represented by the methods of an object. It also reflects the response of an object with other objects.

### Declaring Objects 

When an object of a class is created, the class is said to be instantiated. All the instances share the attributes and the behavior of the class. But the values of those attributes, i.e. the state are unique for each object. A single class may have any number of instances.

As we declare variables like (type name;). This notifies the compiler that we will use the name to refer to data whose type is type. With a primitive variable, this declaration also reserves the proper amount of memory for the variable. So for reference variables , the type must be strictly a concrete class name. In general, we can’t create objects of an abstract class or an interface.

### Initializing a Java Object 
The new operator instantiates a class by allocating memory for a new object and returning a reference to that memory. The new operator also invokes the class constructor. 


```java
public class Dog {
    public String Name; 
    public int Age;

    public void Bark(int times) {
        for (int i = 0; i < times; i++) {
            System.out.println("Bark"); 
        }
    }

    public static void main(String[] args) { 
        Dog dog = new Dog();

        dog.Bark(5);
    }
}
Dog.main(words);

```

    Bark
    Bark
    Bark
    Bark
    Bark


### Calling a non-void method
It's possible to call a non-void method on an object so that it returns a value, the type of which is specified with the method.


```java
public class Dog {
    public String Name; //instance variables
    public int Age;

    public Dog(String name, int age) { //construction method
        Name = name;
        Age = age;
    }

    public String getName() { //non-void method that returns a String
        return Name;
    }

    public static void main(String[] args) { //main code
        Dog d = new Dog("Larry", 4);
        System.out.println(d.getName());
    }
}

Dog.main(null);
```

    Larry


#### Popcorn Hacks
Modify the code below (the same code as above) to demonstrate one of the following:
- An additional Non-void method
- Multiple uses of the same Non-void method on different objects


```java
public class Dog {
    public String Name; //instance variables
    public int Age;

    public Dog(String name, int age) { //construction method
        Name = name;
        Age = age;
    }

    public String getName() { //non-void method that returns a String
        return Name;
    }

    public int getAge() {
        return Age;
    }

    public static void main(String[] args) { //main code
        Dog d1 = new Dog("Larry", 4);
        Dog d2 = new Dog("Daisy", 6);
        Dog d3 = new Dog("Joe", 10);
        Dog d4 = new Dog("David", 2);
        System.out.println(d1.getName() + " " + d1.getAge());
        System.out.println(d2.getName() + " " + d2.getAge());
        System.out.println(d3.getName() + " " + d3.getAge());
        System.out.println(d4.getName() + " " + d4.getAge());
    }
}

Dog.main(null);
```

    Larry 4
    Daisy 6
    Joe 10
    David 2


### String Objects
String objects are built-in objects in Java that you're probably pretty familiar with, but it also functions like a class, with the following properties:
- String objects can be initialized with the new keyword
- Method that acts upon String objects can't change the String itself, it is <b>inmmutable</b>. 
- String objects can be concatenated using the + operator, creating a new string that is the combination of the other two strings
- Escape sequences can be used to print characters that are otherwise unavailable, using the "\" (backslash) symbol
    - \" creates a double quote
    - \\\\ creates a regular backslash (I actually had to use 4 backslashes for this since markdown also recognizes this combination)
    - \n creates a newline



```java
public class Strings_demo {
    public static void main(String[] args) { //main code
        String s1 = "hello"; // The way you are probably used to for string objects
        String s2 = new String("hello"); // an alternate method to create the same string variable
        System.out.println(s1);// these two println statements should print the same thing
        System.out.println(s2);

        String s3 = s1+s2; // s3 is a concatenation of s1 and s2
        System.out.println(s3);
        System.out.println(s1); // the method doesn't actually change the String itself

        String s4 = new String("In order to type out a \\\\ string in Java String, you need 4 \\'s \n You need 3 \\'s and 1 \" to type out a \\\""); // a demonstration of the escape sequences
        System.out.println(s4);
    }
}
Strings_demo.main(null);
```

    hello
    hello
    hellohello
    hello
    In order to type out a \\ string in Java String, you need 4 \'s 
     You need 3 \ and 1 " to type out a \"


Here are some of the String methods we use:  
|Syntax|Definition|
|-|-|
|String(String str)|Constructs a new String object with the same sequence of characters as str|
|int length()|Returns the number of characters in the String|
|String substring(int from, in to)|Returns the substring beginning at from to one before to|
|String substring(int from)|Returns the substring beginning at from to the end|
|int indexOf(String str)|Returns the first occurence of str, returns -1 if not found|
|boolean equals(String other)|Returns true if this is equal to other and vice versa|
|int compareTo(String other)|Returns a value <0 if this is less than other, 0 if they are equal and a value >- if this is greater than other|


```java
public class Strings_demo_2 {
    public static void main(String[] args) { //main code
        String s1 = "hello"; // Strings for demonstration
        String s2 = new String("hihihellothere"); // Construction using the method
        System.out.println(s2.length());

        String s3 = s2.substring(4,9); // creating a substring of s1 from index 4 to 9-1
        System.out.println(s3);
        System.out.println(s1); // these should be the same

        System.out.println(s2.indexOf(s1)); //returns the first occurence of hello in hihihellothere (4)

        System.out.println(s2.equals(s1)); // returns if hello is the same as hihihellothere (it's not)
        System.out.println(s2.compareTo(s1)); // compares hihihellothere to hello, since it greater since h=h and i>e, this returns a positive number
        System.out.println(s1.compareTo(s2)); // the reversal of the above, returns a negative number
        System.out.println(s3.equals(s1)); // returns if hello is the same as hello (it's)
        System.out.println(s3.compareTo(s1)); // compares hello to hello, since they are the same, this returns a 0

        System.out.println(s1);// none of these methods affect the original strings, since Strings are immutatble
        System.out.println(s2);
        System.out.println(s3);
    }
}
Strings_demo_2.main(null);
```

    14
    hello
    hello
    4
    false
    4
    -4
    true
    0
    hello
    hihihellothere
    hello


#### Popcorn Hacks
Using the methods above, create a method that is able to return the position of a substring in a string and use s.o.pl to prove it.


```java
class findSubstring {
    public static void main(String args[]) {
        String s1 = "hihihellothere";           // This is the main string
        String s2 = "he";                       // This is our desired substring
        System.out.println(s1.indexOf(s2));
    }
}

findSubstring.main(null);
```

    4


### Wrapper Classes
You may remember the Wrapper classes from before, this will present two additional wrapper classes - Integer and Double

- Integer (not int - notice the non-shortend word and capitalization)
    - int is a primitive data type, and Integer is a wrapper class

|Syntax|Definition|
|-|-|
|Integer(int value)|Constructs a new Integer object representing the value|
|Integer.MIN_VALUE|the minimum  value represented by a int or Integer|
|Integer.MAX_VALUE|the maximum  value represented by a int or Integer|
|int intValue()|Returns the value of Integer as int|

- Double (not double)
    - double is a primitive data type, Double is a wrapper class

|Syntax|Definition|
|-|-|
|Double(double value)|Constructs a new Double object representing the value|
|double doubleValue()|Returns the value of the Double as a double|

(not the most exciting thing I know)

#### ok but why
In Java, Wrapper classes are used to convert between primitive data types (int, boolean) and only store a single value and Reference types (String, ArrayList).
It provides a way for us to use primitive datas as objects

#### Autoboxing and Unboxing
As of Java 5.0, autoboxing and unboxing are added

Autoboxing is the automatic process that Java compiler uses to convert primitive types and their respective Wrapper classes

Unboxing is the opposite, comverting Wrapper classes to primitive types



```java
public class Unboxing_stream {
    public static void main(String[] args) { //main code
        int i1 = 10; // primitive data types
        double d1 = 25.5;

        Integer I1 = new Integer(i1); // Construction of the Wrapper classes version (superior)
        Double D1 = new Double(d1);

        System.out.println(i1); // The values correspond to their original values
        System.out.println(I1);
        System.out.println(d1);
        System.out.println(D1);

        int i2 = I1.intValue()+5; //usage of the intValue function
        System.out.println(i2);
        double d2 = D1.doubleValue()-1.3; //usage of the doubleValue function
        System.out.println(d2);

        System.out.println(Integer.MIN_VALUE); // the actual values of the MIN_VALUE and MAX_VALUE
        System.out.println(Integer.MAX_VALUE);

        Integer I2 = i1; // autoboxing bypasses the need for contructor methods
        Double D2 = d1;
        System.out.println(I2);
        System.out.println(D2);

        int i3 = I2+10; // unboxing without using any methods
        double d3 = D2-1.3;
        System.out.println(i3);
        System.out.println(d3);
    }
}
Unboxing_stream.main(null);
```

    10
    10
    25.5
    25.5
    15
    23.7
    -2147483648
    2147483647
    10
    25.5
    20
    24.2


### the Math class
Talking about the java object here, math offers several useful method for mathmatical usages.
- Math methods are static, they belong to the class instead of an object and can be used without creating an object
- the Math class is already imported as part of java.lang.Math
    - However, you can use the methods without using the Math prefix with the import command import static java.lang.Math.*  

|Syntax|Definition|
|-|-|
|static int abs(int x)|Returns the absolute value of a int|
|static double abs(double x)|Returns the absolute value of a double|
|static double pow(double base, double exponent)|Returns the value of base to the exponent power|
|static double random()|Returns a random double between 0.0 and 1.0|



```java
import static java.lang.Math.*; // implicit importation 

public class maths_demo {
    public static void main(String[] args) { //main code
        double a=12.5; // ints we will use
        int b=-5;
        int c=4;

        System.out.println(abs(a)); // prints the absolute values of a and b
        System.out.println(abs(b)); // should have no effect on a but b should be turned to its opposite (the positive number)

        System.out.println(pow(b,c)); // prints the result of b to c

        System.out.println(random()*10>4); // returns true if a random number from 0 to 10 is greater than 4, this should return different values with different runs.
    }
}

maths_demo.main(null);
```

    12.5
    5
    625.0
    true


#### Popcorn hacks
Create a variation of the number guessing game and try to use these methods in. Bonus points for creativity.


```java
import java.lang.Math;
import java.util.Scanner;

class NumberGuessing {
    public static void main (String args[]) {
        int number_to_guess = (int) ((Math.random()*10) + 0.5);
        int user_guess; int guesses = 0;
        Scanner scanner = new Scanner(System.in);
        while (true) {
            user_guess = scanner.nextInt();
            if (user_guess > number_to_guess) {
                System.out.println("Too high!");
            } else if (user_guess < number_to_guess) {
                System.out.println("Too low!");
            } else {
                System.out.println("Nice!, The number was " + number_to_guess + " took " + ++guesses + " guesses to guess!");
                break;
            }
            guesses++;
        }
    }
}

NumberGuessing.main(null);
```

    Too high!
    Too high!
    Nice!, The number was 8 took 3 guesses to guess!



```java
import java.util.ArrayList;
public class Scores {
    private static ArrayList<Integer> studentScores;
    public static void main (String args[]) {
        studentScores = new ArrayList<Integer>();
        studentScores.add(82); studentScores.add(92); studentScores.add(78); studentScores.add(95); studentScores.add(88); studentScores.add(91); 
        int sum = 0;
        for (int val : studentScores) {
            sum = sum + val;
        }
        System.out.println("Average of student scores: " + (double) sum/studentScores.size());
        studentScores.removeIf(score -> score < 80);
        studentScores.add(89);
        System.out.print("Here are the updated contents of the student scores arraylist: ");
        for (int val : studentScores) {
            System.out.print(val + " ");
        }
    }
}
Scores.main(null);

```

    Average of student scores: 87.66666666666667
    Here are the updated contents of the student scores arraylist: 82 92 95 88 91 89 


```java
import java.util.Random;

public class GenerateRandom {
    private static Random RNG = new Random();
    public static void main (String args[]) {
        for (int i = 0; i < 5; i++) {
            System.out.print((RNG.nextInt(99)+1) + " ");
        }
    }
}

GenerateRandom.main(null);
```

    3 65 37 67 40 


```java
System.out
```

## Hacks
> Complete all popcorn hacks
> ### [Quiz](https://docs.google.com/forms/d/e/1FAIpQLScr-jf31aGlkrNUrgu_xyyq29GOfruPDv7_YKKYyWpWqWH_9Q/viewform?usp=sf_link)
