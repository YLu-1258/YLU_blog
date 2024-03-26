---
toc: True
comments: True
layout: notebook
title: Classes
description: The difference in the application and use of Value and Reference types in Java.
authors: Kevin Du
courses: {'compsci': {'week': 1}}
type: hacks
---

1. **Class Instantiation**:
    - **Purpose**: Creating an object (instance) of a class.
    - **Syntax**: `ClassName objectName = new ClassName();`
    - **Explanation**:
        - `ClassName` refers to the name of the class you want to instantiate.
        - `objectName` is the reference variable that points to the newly created object.
        - `new ClassName()` allocates memory and initializes the object.

2. **Constructors**:
    - **Purpose**: Special methods used for object initialization.
    - **Default Constructor**:
        - Takes no arguments.
        - Initializes instance variables to default values (e.g., `0`, `null`, etc.).
    - **Parameterized Constructors**:
        - Accept one or more arguments.
        - Used to set initial values for instance variables.


```java
public class MyClass {
    private int value;

    // Parameterized constructor
    public MyClass(int initialValue) {
        value = initialValue;
    }
}
```

## Instantiation of Classes



```java
public class WordPair { 
    /** Constructs a WordPair object. */ 
    public WordPair(String first, String second) 
    { 
        /* implementation not shown */ 
    } 
    /** Returns the first string of this WordPair object. */ 
    public String getFirst() 
    { 
        /* implementation not shown */ 
    } /** Returns the second string of this WordPair object. */ 
    public String getSecond() 
    {
        /* implementation not shown */ 
    } 
}
public class WordPairList { 
    /** The list of word pairs, initialized by the constructor. */ 
    private ArrayList<WordPair> allPairs; 
    /** Constructs a WordPairList object as described in part (a). * Precondition: words.length >= 2 */ 
    public WordPairList(String[] words) 
    { 
        /* to be implemented in part (a) */ 
    } 
    /** Returns the number of matches as described in part (b). */ 
    public int numMatches() { 
        /* to be implemented in part (b) */
    } 
}
```


```java
public class WordPair {
    private String First;
    private String Second;
    /** Constructs a WordPair object. */ 
    public WordPair(String first, String second) 
    { 
        this.First = first;
        this.Second = second;
    } 
    /** Returns the first string of this WordPair object. */ 
    public String getFirst() 
    { 
        return this.First;
    } /** Returns the second string of this WordPair object. */ 
    public String getSecond() 
    {
        return this.Second;
    } 
}
public class WordPairList { 
    /** The list of word pairs, initialized by the constructor. */ 
    private ArrayList<WordPair> allPairs; 
    /** Constructs a WordPairList object as described in part (a). * Precondition: words.length >= 2 */ 
    public WordPairList(String[] words) 
    { 
        this.allPairs = new ArrayList<WordPair>(); //Some people miss this for some reason. You need an array list so that way you can add more pairs needed in the future.
        for (int i = 0; i<words.length;i++){ //Goes through each word
            for(int j = i+1;j<words.length;j++){ //This is the nested for loop; The i+1 makes it so that j doesn't overlap itself, otherwise, it would think that it was pairing with itself; Many people miss this surprisingly
                this.allPairs.add(new WordPair(words[i],words[j]));
            }
        }
    } 
    /** Returns the number of matches as described in part (b). */ 
    public int numMatches() { 
        int result = 0;
        for (WordPair wp:allPairs){ //this for iterates through each word pair in the allPairs arraylist
            if(wp.getFirst() == wp.getSecond()){ //This makes sure that the words are equal to each other to create a valid pair.
                result += 1; //This increments for every pair
            }
        }
        return result;
    } 
}

//Main Function
//Example 1:
String[] wordNums = {"one", "two", "three"}; 
WordPairList exampleOne = new WordPairList(wordNums);
//Example 2
String[] phrase = {"the", "more", "the", "merrier"}; 
WordPairList exampleTwo = new WordPairList(phrase);
//Example 3:
String[] moreWords = {"the", "red", "fox", "the", "red"}; 
WordPairList exampleThree = new WordPairList(moreWords);
System.out.println("Here are the results for example 2 and 3");
System.out.println(exampleOne.numMatches());
System.out.println(exampleTwo.numMatches());
System.out.println(exampleThree.numMatches());
```

    Here are the results for example 2 and 3
    0
    1
    2


# Overloaded Constructor

Below is an example of an overloaded constructor. It's identical to the code above, except now when creating a WordPairList object if we don't pass through any words, tester words will be given and used. 


```java
public class WordPairList { 
    /** The list of word pairs, initialized by the constructor. */ 
    private ArrayList<WordPair> allPairs; 
    /** Constructs a WordPairList object as described in part (a). * Precondition: words.length >= 2 */ 
    public WordPairList(String[] words) 
    { 
        this.allPairs = new ArrayList<WordPair>(); 
        for (int i = 0; i<words.length;i++){ 
            for(int j = i+1;j<words.length;j++){ 
                this.allPairs.add(new WordPair(words[i],words[j]));
            }
        }
    } 

    public WordPairList() 
    { 
        String[] testerWords = {"test", "testing", "best", "test", "hello"}; 
        this.allPairs = new ArrayList<WordPair>(); 
        for (int i = 0; i<testerWords.length;i++){ 
            for(int j = i+1;j<testerWords.length;j++){ 
                this.allPairs.add(new WordPair(testerWords[i],testerWords[j]));
            }
        }
    } 

    /** Returns the number of matches as described in part (b). */ 
    public int numMatches() { 
        int result = 0;
        for (WordPair wp:allPairs){ //this for iterates through each word pair in the allPairs arraylist
            if(wp.getFirst() == wp.getSecond()){ //This makes sure that the words are equal to each other to create a valid pair.
                result += 1; //This increments for every pair
            }
        }
        return result;
    } 
}

String[] words = {"the", "more", "the", "merrier"}; 
WordPairList exampleOne = new WordPairList(words);
WordPairList exampleTwo = new WordPairList();
System.out.println("Here are the results for the examples");
System.out.println(exampleOne.numMatches());
System.out.println(exampleTwo.numMatches());
```

    Here are the results for the examples
    1
    1


# Resources

GridWorld Case Study is a program that was previously used to supplement the AP CSA curriculum and was on the AP Exam from 2008 to 2014. While it is no longer tested, it is still a useful program to help prepare for the AP Exam as it provides a graphical environment that shows objects inhabiting and interacting with each other in a grid. For those interested, you can start [here](http://www.minich.com/education/wyo/java/apexam/gridworld_notes.php).


# Tips and Tricks

1. Common Points:
    - declared class header 
    - constructor
    - private instances 
    - declare headers for class methods
    - properly uses methods from given class
    - methods returns the right thing based on logic
2. Use meaningful variable names
3. For inheritence questions, pay attention to whether the attribute is of the parent or child class
4. Check your code with the examples provided
5. Super() must be in the first line of your constructor
6. Initialize your variables outside of the constructor and any method (to have the correct scope)
7. Point distribution, very few given for functioning code, just ensure you have the basic requirements

# Hacks:

Complete this FRQ **AND** write about a possible application in 3 sentences **AND** create an example of a real life application with that FRQ.

## Prompt

Problem Statement:

You are tasked with implementing a simple online shopping system. The system consists of classes to represent products, customers, and orders. Your task is to complete the missing methods and implement additional functionality as described in the comments.

Instructions:
- Review the provided classes: Product, Customer, Order.
- Complete the missing methods and implement additional functionality as per the comments within each class.
- Ensure that your implementations adhere to good coding practices, including proper encapsulation and error handling.
- Test your implementations thoroughly to verify correctness and robustness.

```java
public class Product {
    private String name;
    private double price;

    // TODO: Implement the Product class
}

// Customer.java
public class Customer {
    private String name;
    private String email;
    private String address;

    // TODO: Implement the Customer class
}

// Order.java
import java.util.ArrayList;

public class Order {
    private Customer customer;
    private ArrayList<Product> products;

    // TODO: Implement the Order class
}
```

## Your Task:

Complete the implementations of the Product, Customer, and Order classes according to the following specifications:

**Product Class:**

- Implement a constructor to initialize a product with a name and price.
- Implement getters and setters for the name and price attributes.

**Customer Class:**
- Implement a constructor to initialize a customer with a name, email, and address.
- Implement getters and setters for the name, email, and address attributes.

**Order Class:**
- Implement a method to add a product to the order.
- Implement a method to calculate the total price of the order.
- Ensure that each order is associated with a customer.

#### Additional Requirements:

Ensure that prices are non-negative and orders cannot be created without a customer.
Implement proper error handling and validation for invalid operations or inputs.
Document your code with clear comments to explain the purpose and functionality of each method.
Demonstrate the usage of your implementations with sample test cases in a separate class.

#### Note:

This question assesses your understanding of class design, constructors, methods, encapsulation, and error handling. Take your time to carefully analyze the requirements and design your solutions accordingly. Soley using AI for any part of the hack results in a 0 for the whole thing.


```java
// Use this to complete the FRQ for both (a) and (b). Point out specifically which parts are (a) and (b) and the features you have used (for example, if you used a nested for loop or an arraylist, point it out) (0.9)
```

### Write your application here and why you think its more applicable (0.05)


```java
// Use this to complete the Applications. Do not mix up the cells (0.05)
```
