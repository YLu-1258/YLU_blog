---
title: Java Console Games
description: These console games show many elements from College Board's Units.
author: mortensen
badges: True
comments: True
week: 2
categories: ['Java', 'hacks']
date: 2023-08-27 08:48:00 -0800
tags: ['notebooks', 'java', 'hacks', 'OOP']
render_with_liquid: False
type: plans
---

## Java Kernel for Jupyter Notebooks.
> [Install Java kernel readme}(https://github.com/SpencerPark/IJava).  Java will require an independent kernel in Jupyter Notebooks.  The instruction performed by the Teacher follows, but look to readme if you have troubles.

```bash
(base) id:~$ wget https://github.com/SpencerPark/IJava/releases/download/v1.3.0/ijava-1.3.0.zip  # download IJava kernel as zip
(base) id:~$ unzip ijava-1.3.0.zip # unzip downloaded IJava kernel
(base) id:~$ python install.py --user # install IJava kernel
(base) id:~$ jupyter kernelspec list # list kernels
Available kernels:
  java          /home/shay/.local/share/jupyter/kernels/java
  python3       /home/shay/.local/share/jupyter/kernels/python3
```

### Console Game Menu
> College Boards Units #1, #3, and #4 and Free Response Methods and Control Structures are built into these labs.  Of course, these games are very popular in beginning programming.  They are here for reference, as they were shared by a student.


```java
import java.util.Scanner; //library for user input
import java.lang.Math; //library for random numbers

public class ConsoleGame {
    public final String DEFAULT = "\u001B[0m";  // Default Terminal Color
    
    public ConsoleGame() {
        Scanner sc = new Scanner(System.in);  // using Java Scanner Object
        
        boolean quit = false;
        while (!quit) {
            this.menuString();  // print Menu
            try {
                int choice = sc.nextInt();  // using method from Java Scanner Object
                System.out.print("" + choice + ": ");
                quit = this.action(choice);  // take action
            } catch (Exception e) {
                sc.nextLine(); // error: clear buffer
                System.out.println(e + ": Not a number, try again.");
            }
            
        }
        sc.close();
    }

    public void menuString(){
        String menuText = ""
                + "\u001B[35m___________________________\n"  
                + "|~~~~~~~~~~~~~~~~~~~~~~~~~|\n"
                + "|\u001B[0m          Menu!          \u001B[35m|\n"
                + "|~~~~~~~~~~~~~~~~~~~~~~~~~|\n"
                + "| 0 - Exit                |\n"    
                + "| 1 - Rock Paper Scissors |\n"
                + "| 2 - Higher or Lower     |\n"
                + "| 3 - Tic Tac Toe         |\n"
                + "|_________________________|   \u001B[0m\n"
                + "\n"
                + "Choose an option.\n"
                ;
        System.out.println(menuText);
    }

    private boolean action(int selection) {
        boolean quit = false;
        switch (selection) {  // Switch or Switch/Case is Control Flow statement and is used to evaluate the user selection
            case 0:
                System.out.print("Goodbye, World!"); 
                quit = true; 
                break;
            case 1:
                rps();
                break;
            case 2:
                horl();
                break;
            case 3:
                ticTacToe();
                break;
                    
            default:
                //Prints error message from console
                System.out.print("Unexpected choice, try again.");
        }
        System.out.println(DEFAULT);  // make sure to reset color and provide new line
        return quit;
    }

    public void horl(){
        System.out.println("Higher or Lower");
        System.out.println("You have three guesses to guess the number I am thinking of between 1-8.");
        System.out.println("If you guess the number correctly, you win!");
        Scanner scHL = new Scanner(System.in);
        int randomG = (int) (Math.random() * 8) + 1;
        int guess = scHL.nextInt();
        for(int i = 3; i > 0; i--){
            if(guess == randomG){
                System.out.println("You win!");
                break;
            }
            else if(guess > randomG){
                System.out.println("The number is lower");
            }
            else if(guess < randomG){
                System.out.println("The number is higher");
            }
            guess = scHL.nextInt();
        }
        System.out.println("Game over.");
        scHL.close();
    }
                                                     
    public void rps(){
        System.out.println("Rock Paper Scissors");
        System.out.println("Type r for rock, p for paper, or s for scissors");
        Scanner scRPS = new Scanner(System.in);
        String userChoice = scRPS.nextLine().toLowerCase();
        Boolean quit = false;
        int random = (int) (Math.random() * 3);
        while(quit == false){
            if(userChoice.equals("r")){
                if(random == 1){
                    System.out.println("You chose rock \nThe computer chose paper \nYou lose!");
                }
                else if(random == 2){
                    System.out.println("You chose rock \nThe computer chose scissors \nYou win!");
                }
                else{
                    System.out.println("You chose rock \nThe computer chose rock \nIt's a tie!");
                }
                quit = true;
            }
            else if(userChoice.equals("p")){
                if(random == 1){
                    System.out.println("You chose paper \nThe computer chose paper \nIt's a tie!");
                }
                else if(random == 2){
                    System.out.println("You chose paper \nThe computer chose scissors \nYou lose!");
                }
                else{
                    System.out.println("You chose paper \nThe computer chose rock \nYou win!");
                }
                quit = true;

            }
            else if(userChoice.equals("s")){
                if(random == 1){
                    System.out.println("You chose scissors \nThe computer chose paper \nYou win!");
                }
                else if(random == 2){
                    System.out.println("You chose scissors \nThe computer chose scissors \nIt's a tie!");
                }
                else{
                    System.out.println("You chose scissors \nThe computer chose rock \nYou lose!");
                }
                quit = true;

            }
            else{
                System.out.println("Invalid input, try again");
                userChoice = scRPS.nextLine();
            }            
        }
        scRPS.close();
    }
    
    public void ticTacToe(){
        System.out.println("Tic Tac Toe");
        Scanner scTTT = new Scanner(System.in);
        String[] board = {"1", "2", "3", "4", "5", "6", "7", "8", "9"};
        String player = "X";
        String player2 = "O";
        int turn = 0;
        Boolean quit = false;
        System.out.println("Do you want to play against a friend or the computer?");
        System.out.println("Type 1 for friend, 2 for computer");
        int choice = scTTT.nextInt();
        //make tic tac toe using player1 and player2
        if(choice == 1){                
            System.out.println("Type the number of the square you want to place your piece in");
            while(quit == false){
                System.out.println("Player 1's turn (X)");
                System.out.println(board[0] + " | " + board[1] + " | " + board[2]);
                System.out.println(board[3] + " | " + board[4] + " | " + board[5]);
                System.out.println(board[6] + " | " + board[7] + " | " + board[8]);
                int move = scTTT.nextInt();
                if(board[move - 1].equals("X") || board[move - 1].equals("O")){
                    System.out.println("That square is already taken, try again");
                }
                else{
                    board[move - 1] = player;
                    turn++;
                    if(board[0].equals("X") && board[1].equals("X") && board[2].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[3].equals("X") && board[4].equals("X") && board[5].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[6].equals("X") && board[7].equals("X") && board[8].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[0].equals("X") && board[3].equals("X") && board[6].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[1].equals("X") && board[4].equals("X") && board[7].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[2].equals("X") && board[5].equals("X") && board[8].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[0].equals("X") && board[4].equals("X") && board[8].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[2].equals("X") && board[4].equals("X") && board[6].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(turn == 9){
                        System.out.println("It's a tie!");
                        quit = true;
                    }
                    else{
                        System.out.println("Player 2's turn (O)");
                        System.out.println(board[0] + " | " + board[1] + " | " + board[2]);
                        System.out.println(board[3] + " | " + board[4] + " | " + board[5]);
                        System.out.println(board[6] + " | " + board[7] + " | " + board[8]);
                        int move2 = scTTT.nextInt();
                        if(board[move2 - 1].equals("X") || board[move2 - 1].equals("O")){
                            System.out.println("That square is already taken, try again");
                        }
                        else{
                            board[move2 - 1] = player2;
                            turn++;
                            if(board[0].equals("O") && board[1].equals("O") && board[2].equals("O")){
                                System.out.println("Player 2 wins!");
                                quit = true;
                            }
                            else if(board[3].equals("O") && board[4].equals("O") && board[5].equals("O")){
                                System.out.println("Player 2 wins!");
                                quit = true;
                            }
                            else if(board[6].equals("O") && board[7].equals("O") && board[8].equals("O")){
                                System.out.println("Player 2 wins!");
                                quit = true;
                            }
                            else if(board[0].equals("O") && board[3].equals("O") && board[6].equals("O")){
                                System.out.println("Player 2 wins!");
                                quit = true;
                            }
                            else if(board[1].equals("O") && board[4].equals("O") && board[7].equals("O")){
                                System.out.println("Player 2 wins!");
                                quit = true;
                            }
                            else if(board[2].equals("O") && board[5].equals("O") && board[8].equals("O")){
                                System.out.println("Player 2 wins!");
                                quit = true;
                            }
                        }
                    }
                }
            }
        }
        if(choice == 2){
            String computer = "O";
            System.out.println("Type the number of the square you want to place your piece in");
            while(quit == false){
                System.out.println("Player 1's turn (X)");
                System.out.println(board[0] + " | " + board[1] + " | " + board[2]);
                System.out.println(board[3] + " | " + board[4] + " | " + board[5]);
                System.out.println(board[6] + " | " + board[7] + " | " + board[8]);
                int move = scTTT.nextInt();
                if(board[move - 1].equals("X") || board[move - 1].equals("O")){
                    System.out.println("That square is already taken, try again");
                }
                else{
                    board[move - 1] = player;
                    turn++;
                    if(board[0].equals("X") && board[1].equals("X") && board[2].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[3].equals("X") && board[4].equals("X") && board[5].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[6].equals("X") && board[7].equals("X") && board[8].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[0].equals("X") && board[3].equals("X") && board[6].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[1].equals("X") && board[4].equals("X") && board[7].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[2].equals("X") && board[5].equals("X") && board[8].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[0].equals("X") && board[4].equals("X") && board[8].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(board[2].equals("X") && board[4].equals("X") && board[6].equals("X")){
                        System.out.println("Player 1 wins!");
                        quit = true;
                    }
                    else if(turn == 9){
                        System.out.println("It's a tie!");
                        quit = true;
                    }
                    else{
                        System.out.println("Computer's turn (O)");
                        System.out.println(board[0] + " | " + board[1] + " | " + board[2]);
                        System.out.println(board[3] + " | " + board[4] + " | " + board[5]);
                        System.out.println(board[6] + " | " + board[7] + " | " + board[8]);
                        int move2 = (int)(Math.random() * 9) + 1;
                        if(board[move2 - 1].equals("X") || board[move2 - 1].equals("O")){
                            System.out.println("That square is already taken, try again");
                        }
                        else{
                            board[move2 - 1] = computer;
                            turn++;
                            if(board[0].equals("O") && board[1].equals("O") && board[2].equals("O")){
                                System.out.println("Computer wins!");
                                quit = true;
                            }
                            else if(board[3].equals("O") && board[4].equals("O") && board[5].equals("O")){
                                System.out.println("Computer wins!");
                                quit = true;
                            }
                            else if(board[6].equals("O") && board[7].equals("O") && board[8].equals("O")){
                                System.out.println("Computer wins!");
                                quit = true;
                            }
                            else if(board[0].equals("O") && board[3].equals("O") && board[6].equals("O")){
                                System.out.println("Computer wins!");
                                quit = true;
                            }
                            else if(board[1].equals("O") && board[4].equals("O") && board[7].equals("O")){
                                System.out.println("Computer wins!");
                                quit = true;
                            }
                            else if(board[2].equals("O") && board[5].equals("O") && board[8].equals("O")){
                                System.out.println("Computer wins!");
                                quit = true;
                            }
                        }
                    }
                }
            }
          
    }
        scTTT.close();
    }

    static public void main(String[] args)  {  
        new ConsoleGame(); // starting Menu object
    }


}
ConsoleGame.main(null);


```

    [35m___________________________
    |~~~~~~~~~~~~~~~~~~~~~~~~~|
    |[0m          Menu!          [35m|
    |~~~~~~~~~~~~~~~~~~~~~~~~~|
    | 0 - Exit                |
    | 1 - Rock Paper Scissors |
    | 2 - Higher or Lower     |
    | 3 - Tic Tac Toe         |
    |_________________________|   [0m
    
    Choose an option.
    


## Hacks
> To start the year, I want you to consider a simple Java console game or improve on the organization and presentation of the games listed.
- Make RPS, Tic-Tack-Toe, and Higher Lower into different cells and objects.  Document each cell in Jupyter Notebooks.  
- Simplify logic, particularly T-T-T.  What could you do to make this more simple? Java has HashMap (like Python Dictionary), Arrays (fixed size), ArraLists (Dynamic Size). 
- Run the menu using recursion versus while loop.  Try to color differently.
- Look over 10 units for College Board AP Computer Science A.  In your reorganized code blocks and comments identify the Units of Code Used. 
- Answer why you think this reorganization and AP indetification is important?   

