---
title: Workshop 2 Hacks
description: Classes Workshop Hacks
toc: True
layout: post
type: hacks
comments: True
---

# Free Response Questions

## Question 1 - Pojos and Access Control:
Situation: The school librarian wants to create a program that stores all of the books within the library in a database and is used to manage their inventory of books available to the students. You decided to put your amazing code skills to work and help out the librarian!  

a. Describe the key differences between the private and public access controllers and how it affects a POJO  
* Methods and objects declraed with the private access controller are only accessable from within the particular class that it was specified in. Public members of a class are accessible even outside of the parent class.   

b. Identify a scenario when you would use the private vs. public access controllers that isn't the one given in the scenario above  
* Say I was creating a user authenticaion app. I have two attributes, a user biography, and a password hash. The password hash would mostly have a private access modifier as I would not want external code to be abl to access sensitive information. The user biography would likely be accessed by most applications on the frontend interface, so I might opt to keep it public. However, realistically, I would probably keep everything private and use setters and getters when necessary. The getters and setters then, would most likely be public so that outside classes can perform necessary actions.  

c. Create a Book class that represents the following attributes about a book: title, author, date published, person holding the book and make sure that the objects are using a POJO, the proper getters and setters and are secure from any other modifications that the program makes later to the objects  



```java
class Book {
    private String title;
    private String author;
    private int publishDateinUnixTime;
    private int uuidCurrentlyCheckingOutBook; // store as int so that there are no duplicate users with the same name having conflicts

    public Book (String t, String a, int p) { // Creation of a new book
        this.title = t;
        this.author = a;
        this.publishDateinUnixTime = p;
    }

    public Book (String t, String a, int p, int u) {  // Alternate constructor for if the book is added and is also checked out
        this.title = t;
        this.author = a;
        this.publishDateinUnixTime = p;
        this.uuidCurrentlyCheckingOutBook = u;
    }

    public void setTitle(String t) {
        this.title = t;
    }

    public void setAuthor(String a) {
        this.author = a;
    }

    public void setTitle(int d) {
        this.publishDateinUnixTime = d;
    }

    public void setUserCheckedOut(int u) {
        this.uuidCurrentlyCheckingOutBook = u;
    }

    public String getTitle() {
        return this.title;
    }

    public String getAuthor() {
        return this.author;
    }

    public int getPublishingDate() {
        return this.publishDateinUnixTime;
    }

    public int getUserCheckedOut() {
        return this.uuidCurrentlyCheckingOutBook;
    }
}

Book testBook = new Book("Pride and Prejudice", "Jane Austen", 0, 1920450);
System.out.println(testBook.getTitle());
System.out.println(testBook.getAuthor());
System.out.println(testBook.getPublishingDate());
System.out.println(testBook.getUserCheckedOut());
System.out.println("============================= \n UPDATING USER \n=============================");
testBook.setUserCheckedOut(1920451);
System.out.println(testBook.getTitle());
System.out.println(testBook.getAuthor());
System.out.println(testBook.getPublishingDate());
System.out.println(testBook.getUserCheckedOut());
```

    Pride and Prejudice
    Jane Austen
    0
    1920450
    ============================= 
     UPDATING USER 
    =============================
    Pride and Prejudice
    Jane Austen
    0
    1920451


## Question 2 - Writing Classes:

(a) Describe the different features needed to create a class and what their purpose is.  
* The features needed to create a class are **attributes**, **constructors**, and **methods**. Attributes are variables associated with a class that define the parameters that controls its actions. We can think of them as inputs to a function that allow the overall machine to work properly. The Constructor serves as a function that is ran at the moment of the instantiation of an object built from the class. Within the constructor, we can do a lot of preprocessing including setting attributes, performing operations on parameters, and also creating any additional parameters to be used. THe constructor, thus acts as a factory for our machine. The final part of the classes are the methods, which are essentially the functionalities of the class. These methods perform certain calculations and operations on the attributes that enables them to function properly.  

(b) Code:

Create a Java class BankAccount to represent a simple bank account. This class should have the following attributes:
- accountHolder (String): The name of the account holder.
balance (double): The current balance in the account.
Implement the following mutator (setter) methods for the BankAccount class:
- setAccountHolder(String name): Sets the name of the account holder.
- deposit(double amount): Deposits a given amount into the account.
- withdraw(double amount): Withdraws a given amount from the account, but only if the withdrawal amount is less than or equal to the current balance.
Ensure that the balance is never negative.


```java
class BankAccount {
    private String accountHolder;
    private double balance;

    public BankAccount (String a, double b) {
        this.accountHolder = a;
        this.balance = b;
    }

    @Override
    public String toString() {
        return "Account Holder: " + this.accountHolder + "\nBalance: $" + this.balance;
    }

    public void SetAccountHolder(String a) {
        this.accountHolder = a;
    }

    public void deposit (double amount) {
        this.balance+=amount;
        System.out.println("$" + amount + " Has been deposited."); // make sure that the user actually has money to withdraw
    }

    public void withdraw (double amount) {
        if (this.balance >= amount) {
            this.balance-=amount;
        } else { 
            System.out.println("Balance insufficient, transfer declined."); // make sure that the user actually has money to withdraw
        }
    }
}

BankAccount myBank = new BankAccount("Alexander Lu", 100000);
System.out.println(myBank.toString());
myBank.deposit(20000.14);
System.out.println(myBank.toString());
myBank.SetAccountHolder("Alexander Yixuan Lu");
System.out.println(myBank.toString());
myBank.withdraw(200000.0);
System.out.println(myBank.toString());
```

    Account Holder: Alexander Lu
    Balance: $100000.0
    $20000.14 Has been deposited.
    Account Holder: Alexander Lu
    Balance: $120000.14
    Account Holder: Alexander Yixuan Lu
    Balance: $120000.14
    Balance insufficient, transfer declined.
    Account Holder: Alexander Yixuan Lu
    Balance: $120000.14


## Question 3 - Instantiation of a Class

(a) Explain how a constructor works, including when it runs and what generally is done within a constructor.
* The Constructor serves as a function that is ran at the moment of the instantiation of an object built from the class. Within the constructor, we can do a lot of preprocessing including setting attributes, performing operations on parameters, and also creating any additional parameters to be used. The constructor, thus acts as a factory for our machine.

(b) Create an example of an overloaded constructor within a class. You must use at least three variables. Include the correct initialization of variables and correct headers for the constructor. Then, run the constructor at least twice with different variables and demonstrate that these two objects called different constructors. 


```java
class UserAuthenticationRequest{
    private int uuid;
    private String username;
    private String password;

    public UserAuthenticationRequest (int uuid, String password) {
        this.uuid = uuid;
        this.password = password;
    }

    public UserAuthenticationRequest (String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override 
    public String toString() {
        if (uuid != 0) {
            return "UUID: " + this.uuid + " Password: " + this.password;
        } else if (username != null && !username.isEmpty()) {
            return "Username: " + this.username + " Password: " + this.password;
        } else {
            return "Invalid Request";
        }
    }
}

UserAuthenticationRequest requestUUID = new UserAuthenticationRequest(1920450, "1234!");
UserAuthenticationRequest requestUsername = new UserAuthenticationRequest("Eris29", "1234!");
System.out.println("UUID Request\n=========================");
System.out.println(requestUUID);
System.out.println();
System.out.println("Username Request\n=========================");
System.out.println(requestUsername);
```

    UUID Request
    =========================
    UUID: 1920450 Password: 1234!
    
    Username Request
    =========================
    Username: Eris29 Password: 1234!


## Question 4 - Wrapper Classes:

(a) Provide a brief summary of what a wrapper class is and provide a small code block showing a basic example of a wrapper class.  
* A Wrapper class is essentially Java's way of using primative datatypes such as int, boolean, and char as actual objects instead of data in the code; hence the name wrapper. This also enables us to use primative types in more object oriented scenarios, such as the wrapper class for a collection type object like an ArrayList.
```java
Integer value = 25;
ArrayList<Integer> array = new ArrayList<Integer>(); // Collection of Wrapper Integer objects
array.add(value);                                    // If we used primative int, then java would autobox
```

(b) Create a Java wrapper class called Temperature to represent temperatures in Celsius. Your Temperature class should have the following features:

Fields:

A private double field to store the temperature value in Celsius.


Constructor:

A constructor that takes a double value representing the temperature in Celsius and initializes the field.


Methods:

getTemperature(): A method that returns the temperature value in Celsius.
setTemperature(double value): A method that sets a new temperature value in Celsius.
toFahrenheit(): A method that converts the temperature from Celsius to Fahrenheit and returns the result as a double value. 


```java
public class Temperature {
    private double celsius;

    public Temperature(double celsius) {
        this.celsius = celsius;
    }

    public double getTemperature() {
        return celsius;
    }

    public void setTemperature(double celsius) {
        this.celsius = celsius;
    }

    public double toFahrenheit() {
        return (celsius * 9 / 5) + 32;
    }

    public void addToTemperature(double amount) {
        celsius += amount;
    }

    public void subtractFromTemperature(double amount) {
        celsius -= amount;
    }

    public boolean isBoiling() {
        return celsius >= 100;
    }

    public boolean isFreezing() {
        return celsius <= 0;
    }
}
Temperature temp = new Temperature(25.0);
System.out.println("Current Temperature: " + temp.getTemperature() + " Celsius");
temp.setTemperature(30.0);
System.out.println("Updated Temperature: " + temp.getTemperature() + " Celsius");
System.out.println("Temperature in Fahrenheit: " + temp.toFahrenheit() + " Fahrenheit");
temp.addToTemperature(5.0);
System.out.println("After adding 5 degrees Celsius: " + temp.getTemperature() + " Celsius");
temp.subtractFromTemperature(10.0);
System.out.println("After subtracting 10 degrees Celsius: " + temp.getTemperature() + " Celsius");
System.out.println("Is the temperature boiling? " + temp.isBoiling());
System.out.println("Is the temperature freezing? " + temp.isFreezing());
```

    Current Temperature: 25.0 Celsius
    Updated Temperature: 30.0 Celsius
    Temperature in Fahrenheit: 86.0 Fahrenheit
    After adding 5 degrees Celsius: 35.0 Celsius
    After subtracting 10 degrees Celsius: 25.0 Celsius
    Is the temperature boiling? false
    Is the temperature freezing? false


## Question 5 - Inheritence:

Situation: You are developing a program to manage a zoo, where various types of animals are kept in different enclosures. To streamline your code, you decide to use inheritance to model the relationships between different types of animals and their behaviors.

(a) Explain the concept of inheritance in Java. Provide an example scenario where inheritance is useful.
* In Java, inheritance is the principle of creating subclasses that extends behaviors, methods, and attributes from a parent class. This particular feature is useful in many cases were we have to create objects that are similar to each other. An example is if you had a shipping comapny. We can create a parent class called `Transport`, which contains critical information like the Identitifaction of the vehicle, the deadline to deliver by, and the name of the driver. Subsequently, we can create different child classes to be used, like `Truck`, `Ship`, or `Plane`, each with their own additional unique attributes like fuel level, max speed in nautical miles, and altitude in meters, etc. This would reduce code redundancy because it ensures that the most important attributes are inherited across all objects.

(b) Code:

You need to implement a Java class hierarchy to represent different types of animals in the zoo. Create a superclass Animal with basic attributes and methods common to all animals, and at least three subclasses representing specific types of animals with additional attributes and methods. Include comments to explain your code, specifically how inheritance is used.



```java

```
