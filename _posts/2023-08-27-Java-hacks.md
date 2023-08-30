---
title: Week 1 Java hacks
description: What are the aspects of a class? What does the static keyword do in java?
author: alex
badges: True
comments: True
week: 1
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
import java.util.HashMap; //library for hashmaps
import java.util.ArrayList; //library for array lists
```

Now, let's work on a menu for our game, let's try using a recursive method.


```java
public class Game {
    private static int wins = 0;
    private static Scanner sc = new Scanner(System.in);
    private static boolean quit = false;
    private static boolean result;

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
                result = RPS.main(null);
                if (result) {
                    wins = wins + 1;
                }
                break;
            case 2:
                System.out.println("Playing higher or lower");
                result = HORL.main(null);
                if (result) {
                    wins = wins + 1;
                }
                break;
            case 3:
                System.out.println("Playing tic tac toe");
                result = TTT.main(null);
                if (result) {
                    wins = wins + 1;
                }
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
```

## Optimizing Games

Now that we have gotten our menu to work recursively, we could work on optmizing our game. The idea is that I could create a parent class called `GameObject` which will contain basic parameters of my games. I would then create subclasses inheriting from this `GameObject` class.


```java
public class GameObject {
    protected static Scanner sc = new Scanner(System.in);
    protected static boolean game_win = false;
    protected static Random random = new Random();
}
```

### Higher or Lower

Here is the code for my implementation of the "Higher or Lower game". As you can see, the implementation creates a seperate class for the game which inherits certain attributes from `GameObject`. 


```java
public class HORL extends GameObject {
    public static boolean main(String args[]) {
        game_win = false;
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

### Rock Paper Scissors


```java
public class RPS extends GameObject {
    private static boolean guessed = false;
    private static int user_guess;
    private static int computer_guess = random.nextInt(3)+1;
    private static HashMap<Integer, String> guess_map = new HashMap<Integer, String>();
    public static boolean main(String args[]) {
        game_win = false;
        guessed = false;
        guess_map.put(1,"Rock");
        guess_map.put(2,"Paper");
        guess_map.put(1,"Scissors");
        System.out.println("In rock paper scissors, the game will prompt you for your move, then compare it to a random move generated by the computer, standard rules apply");
        System.out.println("These are your choices:\n\t1) Rock\n\t2) Paper\n\t3) Scissors");
        while (!guessed){
            System.out.println("Please make your selection (1,2,3):");
            user_guess = sc.nextInt();
            try {
                if ((user_guess >= 1) && (user_guess <= 3)) {
                    guessed = true;
                }
            } catch (Exception e){
                ;
            }
        }
        if (user_guess == computer_guess) {
            System.out.println("It's a tie! Both players selected " + guess_map.get(user_guess));
            game_win = false;
        } else if (((user_guess==1) && (computer_guess==3)) || ((user_guess==2) && (computer_guess==1)) || ((user_guess==3) && (computer_guess==2))) {
            System.out.println("You win! You selected " + guess_map.get(user_guess) + " and the computer selected " + guess_map.get(computer_guess));
            game_win = true;
        } else {
            System.out.println("You lost! You selected " + guess_map.get(user_guess) + " and the computer selected " + guess_map.get(computer_guess));
            game_win = false;
        }
        guessed = false;
        return game_win;
    }
}
```

### Tic Tac Toe


```java
public class TTT extends GameObject {
    private static char game_state[] = {'-', '-', '-', '-', '-', '-', '-', '-', '-'};
    private static char curr_player = 'X';
    private static int user_choice;
    private static ArrayList<Integer> available_choices;
    public static boolean main(String[] args) {
        game_win = false;
        game_state = new char[] {'-', '-', '-', '-', '-', '-', '-', '-', '-'};
        curr_player = 'X';
        System.out.println("Welcome to Tic-Tac-Toe!");
        System.out.println("Choose an option:\n\t1. Play against the computer\n\t2. Play against another player");
        int choice = sc.nextInt();
        if (choice == 1) {
            player_v_computer();
        } else if (choice == 2) {
            player_v_player();
        } else {
            System.out.println("Invalid choice. Exiting the game.");
        }
        if (check_game() == 'X') {
            System.out.println("Player 1 has won!");
            game_win = true;
            return game_win;
        } else if (check_game() == 'O') {
            System.out.println("Player 2 has won!");
            return game_win;
        } else {
            System.out.println("Tie");
            return game_win;
        }
        
    }
    public static void player_v_player() {
        while (true) {
            available_choices = get_available_indices();
            if ((check_game() == 'X') || (check_game() == 'O') || (check_game() == '_')) {
                System.out.println(check_game());
                break;
            }
    
            print_state();

    
            System.out.println("Player " + curr_player + ", please select an available slot to place your marker:");
            user_choice = sc.nextInt();
    
            if (available_choices.contains(user_choice - 1)) {
                if (curr_player == 'X') {
                    game_state[user_choice - 1] = 'X';
                } else {
                    game_state[user_choice - 1] = 'O';
                }
                curr_player = (curr_player == 'X') ? 'O' : 'X';
            } else {
                System.out.println("Invalid slot, please pick again");
            }
        }
    }
    public static void player_v_computer(){
        while (true) {
            available_choices = get_available_indices();
            if ((check_game() == 'X') || (check_game() == 'O') || (check_game() == '_')) {
                System.out.println(check_game());
                break;
            }
            if (curr_player == 'X') {
                while (true) {
                    print_state();
                    System.out.println("Please select an available slot to place your marker:");
                    user_choice = sc.nextInt();
                    if (available_choices.contains(user_choice - 1)) {
                        game_state[user_choice-1] = 'X';
                        curr_player = 'O';
                        break;
                    } else {
                        System.out.println("Invalid slot, please pick again");
                    }
                }
            } else {
                int computer_choice = available_choices.get(random.nextInt(available_choices.size()));
                game_state[computer_choice] = 'O';
                curr_player = 'X';
            }
        }
    }
    // "X": Player X won
    // "O": Player O won
    // "_": Tie
    // "-": Nothing
    public static char check_game() {
        if ((game_state[0] == game_state[1] && game_state[1] == game_state[2]) ||
            (game_state[0] == game_state[4] && game_state[4] == game_state[8]) ||
            (game_state[0] == game_state[3] && game_state[3] == game_state[6])) {
            return game_state[0];
        } else if (game_state[3] == game_state[4] && game_state[4] == game_state[5]) {
            return game_state[3];
        } else if ((game_state[6] == game_state[7] && game_state[7] == game_state[8]) ||
                (game_state[6] == game_state[4] && game_state[4] == game_state[2])) {
            return game_state[6];
        } else if (game_state[1] == game_state[4] && game_state[4] == game_state[7]) {
            return game_state[1];
        } else if (game_state[2] == game_state[5] && game_state[5] == game_state[8]) {
            return game_state[2];
        }

        if (is_board_full()) {
            return '_';
        }
        return '-';
    }

    public static boolean is_board_full() {
        for (char element : game_state) {
            if (element == '-') {
                return false;
            }
        }
        return true;
    }

    public static void print_state(){
        System.out.println("     |     |     \t\t     |     |     ");
        System.out.println("  " + game_state[0] + "  |  " + game_state[1] + "  |  " + game_state[2] + "  \t\t" + "  1  |  2  |  3  ");
        System.out.println("_____|_____|_____\t\t_____|_____|_____");
        System.out.println("     |     |     \t\t     |     |     ");
        System.out.println("  " + game_state[3] + "  |  " + game_state[4] + "  |  " + game_state[5] + "  \t\t" + "  4  |  5  |  6  ");
        System.out.println("_____|_____|_____\t\t_____|_____|_____");
        System.out.println("     |     |     \t\t     |     |     ");
        System.out.println("  " + game_state[6] + "  |  " + game_state[7] + "  |  " + game_state[8] + "  \t\t" + "  7  |  8  |  9  ");
        System.out.println("     |     |     \t\t     |     |     ");
    }

    public static ArrayList<Integer> get_available_indices(){
        ArrayList<Integer> available_indices = new ArrayList<Integer>();
        for (int i = 0; i < game_state.length; i++) {
            if (game_state[i] == '-') {
                available_indices.add(i);
            }
        }
        return available_indices;
    }
}

```

Finally, we can play our game


```java
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
    
    Current Wins: 0
    1: Playing rock paper scissors
    In rock paper scissors, the game will prompt you for your move, then compare it to a random move generated by the computer, standard rules apply
    These are your choices:
    	1) Rock
    	2) Paper
    	3) Scissors
    Please make your selection (1,2,3):
    It's a tie! Both players selected Paper
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
    
    Current Wins: 0
    3: Playing tic tac toe
    Welcome to Tic-Tac-Toe!
    Choose an option:
    	1. Play against the computer
    	2. Play against another player
         |     |     		     |     |     
      -  |  -  |  -  		  1  |  2  |  3  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  -  |  -  		  4  |  5  |  6  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  -  |  -  		  7  |  8  |  9  
         |     |     		     |     |     
    Please select an available slot to place your marker:
         |     |     		     |     |     
      -  |  -  |  -  		  1  |  2  |  3  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  X  |  -  		  4  |  5  |  6  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  -  |  O  		  7  |  8  |  9  
         |     |     		     |     |     
    Please select an available slot to place your marker:
         |     |     		     |     |     
      -  |  O  |  -  		  1  |  2  |  3  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  X  |  -  		  4  |  5  |  6  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  X  |  O  		  7  |  8  |  9  
         |     |     		     |     |     
    Please select an available slot to place your marker:
         |     |     		     |     |     
      -  |  O  |  O  		  1  |  2  |  3  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      X  |  X  |  -  		  4  |  5  |  6  
    _____|_____|_____		_____|_____|_____
         |     |     		     |     |     
      -  |  X  |  O  		  7  |  8  |  9  
         |     |     		     |     |     
    Please select an available slot to place your marker:
    X
    Player 1 has won!
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
    
    Current Wins: 1
    2: Playing higher or lower
    In Higher-or-lower, the game will give you a random number (1-10) to guess within 3 tries
    Please Guess a number (1-10)
    Too high!
    Please Guess a number (1-10)
    Too low!
    Please Guess a number (1-10)
    You got it! Nice job!
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
    0: Goodbye, hope you had fun

