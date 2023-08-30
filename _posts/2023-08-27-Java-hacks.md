---
title: Week 1 Java hacks
description: What are the aspects of a class? What does the static keyword do in java?
author: alex
badges: True
comments: True
week: 2
categories: ['Java', 'hacks']
date: 2023-08-27 08:48:00 -0800
tags: ['notebooks', 'java', 'hacks', 'OOP']
render_with_liquid: False
type: hacks
---

# Java Class
Below are the different aspects of a Java class
![Java Class Anatomy](/assets/img/hacks/anatomy_of_a_class.png)

## Java Hello Hacks
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

### Java Object class
Here, in this class, I attempt to create a blueprint of all three object, ten create subclasses inheriting from the main class, while using static methods.


```java
public class Object{ // This is the class declaration
    private String name; // Here is a private attribute "name". Other classes and methods cannot access this attribute 
    Object () { // Here is a constructor taking 0 parameters
        this.set_name("I am just an object"); // We use the setters to set the private attribute
    }
    Object (String N) { // Here is a constructor taking 1 parameter
        this.set_name(N); // We use the setters to set the private attribute
    }

    public void set_name(String N) {
        this.name = N;
    }
    public String get_name(){
        return this.name;
    }

    public static void main(String[] args) {
        // Here, both obj1 and obj2 are instances of the class Object
        Object obj1 = new Object(); 
        Object obj2 = new Object("I am just another obect!");
        System.out.println(obj1.get_name());
        System.out.println(obj2.get_name());
    }
}

Object.main(null);
```

    I am just an object
    I am just another obect!


Here in the class, we could've used used the `protected` keyword to denote the name, This allows us to access the same variable in any subclasses that we have, if need be. In this case, we did not need to use the keyword since we had setters and getters. But if we have a subclass of a subclass, we would have to use these protected attributes.

### Person Class
Now, for the example of the person class, we extend from Object and create our other attributes


```java
public class Person extends Object {
    private int age;
    Person () {
        this.set_age(16);
        this.set_name("Alexander");
    }
    Person (int A) {
        this.set_age(A);
    }
    Person (String N) {
        this.set_name(N);
    }
    Person (String N, int A) {
        this.set_age(A);
        this.set_name(N);
    }
    public void set_age(int A) {
        this.age = A;
    }
    public int get_age(){
        return this.age;
    }
    public static void main(String[] args){
        Person p1 = new Person();
        Person p2 = new Person(16);
        Person p3 = new Person("Ethan");
        Person p4 = new Person("David", 17);
        System.out.println(p1.get_name() + ": " + p1.get_age());
        System.out.println(p2.get_name() + ": " + p2.get_age());
        System.out.println(p3.get_name() + ": " + p3.get_age());
        System.out.println(p4.get_name() + ": " + p4.get_age());
    }
}
Person.main(null);
```

    Alexander: 16
    I am just an object: 16
    Ethan: 0
    David: 17


Note that from above, when we didn't explicitly specify the values for an attribute, it ran the default constructors in the parent class `Object` instead.

### The other classes
For the other desert and location classes, we can just repeat what we did for the Person class.


```java
public class Dessert extends Object {
    private double cost;
    Dessert () {
        this.set_cost(15.99);
        this.set_name("Chocolate Cake");
    }
    Dessert (double C) {
        this.set_cost(C);
    }
    Dessert (String N) {
        this.set_name(N);
    }
    Dessert (String N, double C) {
        this.set_cost(C);
        this.set_name(N);
    }
    public void set_cost(double C) {
        this.cost = C;
    }
    public double get_cost(){
        return this.cost;
    }
    public static void main(String[] args){
        Dessert d1 = new Dessert();
        Dessert d2 = new Dessert(19.99);
        Dessert d3 = new Dessert("Cheesecake");
        Dessert d4 = new Dessert("Donut", 2.99);
        System.out.println(d1.get_name() + ": $" + d1.get_cost());
        System.out.println(d2.get_name() + ": $" + d2.get_cost());
        System.out.println(d3.get_name() + ": $" + d3.get_cost());
        System.out.println(d4.get_name() + ": $" + d4.get_cost());
    }
}
Dessert.main(null);
```

    Chocolate Cake: $15.99
    I am just an object: $19.99
    Cheesecake: $0.0
    Donut: $2.99


And now for the `Locations` class


```java
public class Location extends Object {
    private int zip;
    private String state;
    Location () {
        this.set_name("San Diego");
        this.set_zip(92127);
        this.set_state("CA");
    }
    Location (String N, int Z, String S) {
        this.set_name(N);
        this.set_zip(Z);
        this.set_state(S);
    }
    public void set_zip(int Z) {
        this.zip = Z;
    }
    public void set_state(String S) {
        this.state = S;
    }
    public int get_zip(){
        return this.zip;
    }
    public String get_state(){
        return this.state;
    }
    public static void main(String[] args){
        Location loc1 = new Location();
        Location loc2 = new Location("Pittsburgh", 15227, "PA");
        System.out.println(loc1.get_zip() + ", " + loc1.get_name() + ", " + loc1.get_state());
        System.out.println(loc2.get_zip() + ", " + loc2.get_name() + ", " + loc2.get_state());
        loc2.set_name("Austin");
        loc2.set_zip(78652);
        loc2.set_state("TX");
        System.out.println("Modified location 2: " + loc2.get_zip() + ", " + loc2.get_name() + ", " + loc2.get_state());
    }
}
Location.main(null);
```

    92127, San Diego, CA
    15227, Pittsburgh, PA
    Modified location 2: 78652, Austin, TX


## Java Console Games
In this notebook, I will be trying to optimize and organize the code for the java console games. Upon seeing this problem, I got an idea to seperate the individual game functions all into their individual classes. This way, I could then define static methods within them to start playing games. These static methods would be shared by all members of the class, and I wouldn't need to initialize a new object just to use them.   

However, first we need to import some libraries that we need.


```java
import java.util.Scanner; //library for user input
import java.lang.Math; //library for random numbers
```

Now, let's work on a menu for our game, let's try using a recursive method.


```java
public class Game {
    private static int wins = 0;
    private static Scanner sc = new Scanner(System.in);
    private static boolean quit = false;

    public static void game_loop() {
        menu_string();
        System.out.println("Current Wins: " + wins);
        try {
            int choice = sc.nextInt();
            System.out.print("" + choice + ": ");
            game_selection(choice);
            if (quit) {
                return ;
            }
        } catch (Exception e) {
            sc.nextLine();
            System.out.println(e + ": Not a number, try again.");
        }
        game_loop();
    }
    public static void game_selection(int choice) {
        switch (choice) {
            case 0:
                System.out.println("Goodbye, hope you had fun");
                quit = true;
                break;
            case 1:
                System.out.println("Playing rock paper scissors");
                break;
            case 2:
                System.out.println("Playing higher or lower");
                boolean result = HORL.main(null);
                if (result) {
                    wins = wins + 1;
                }
                break;
            case 3:
                System.out.println("Playing tic tac toe");
                break;
            default:
                System.out.println("Invalid choice, try again");
                break;
                
        }

    }

    public static void menu_string(){
        String menuText = ""
                + "\033[45m\033[97m___________________________\n"  
                + "|~~~~~~~~~~~~~~~~~~~~~~~~~|\n"
                + "|          Menu!          |\n"
                + "|~~~~~~~~~~~~~~~~~~~~~~~~~|\n"
                + "| \033[91m0 - Exit\033[97m                |\n"    
                + "| \033[92m1 - Rock Paper Scissors\033[97m |\n"
                + "| \033[93m2 - Higher or Lower\033[97m     |\n"
                + "| \033[96m3 - Tic Tac Toe\033[97m         |\n"
                + "|_________________________|\u001B[0m\n"
                + "\n"
                + "Choose an option.\n"
                ;
        System.out.println(menuText);
    }
}

Game.game_loop();
```

    [45m[97m___________________________
    |~~~~~~~~~~~~~~~~~~~~~~~~~|
    |          Menu!          |
    |~~~~~~~~~~~~~~~~~~~~~~~~~|
    | [91m0 - Exit[97m                |
    | [92m1 - Rock Paper Scissors[97m |
    | [93m2 - Higher or Lower[97m     |
    | [96m3 - Tic Tac Toe[97m         |
    |_________________________|[0m
    
    Choose an option.
    
    Current Wins: 2
    2: Playing higher or lower
    In Higher-or-lower, the game will give you a random number (1-10) to guess within 3 tries
    Please Guess a number (1-10)
    Too low!
    Please Guess a number (1-10)
    Too low!
    Please Guess a number (1-10)
    You got it! Nice job!


## 

Now that we have gotten our menu to work recursively, we could work on optmizing our game.


```java
public class GameObject {
    protected static Scanner sc = new Scanner(System.in);
    protected static boolean game_win = false;
    protected static Random random = new Random();
}
```

Here is the code for my implementation of the "Higher or Lower game". As you can see, the implementation creates a seperate class for the game which inherits certain attributes from `GameObject`. 


```java
public class HORL extends GameObject {
    public static boolean main(String args[]) {
        System.out.println("In Higher-or-lower, the game will give you a random number (1-10) to guess within 3 tries");
        int answer = random.nextInt(10)+1;
        for (int i = 0; i < 3; i++) {
            System.out.println("Please Guess a number (1-10)");
            int guess = sc.nextInt();
            assert (guess <= 10 && guess >= 0) : "GUESS IN INVALID RANGE";
            if (guess == answer) {
                System.out.println("You got it! Nice job!");
                game_win = true;
                return game_win;
            } else if (guess > answer) {
                System.out.println("Too high!");
            } else {
                System.out.println("Too low!");
            }
        }
        game_win = false;
        return game_win;
    }
}
```
