---
toc: True
comments: True
title: Unit 7 ArrayLists - Teacher notebook
description: Lesson on the College Board Unit 6 Arrays. This is the teacher notebook.
week: 10
type: hacks
authors: alex
---

## 7.1 Intro to ArrayLists

- An **ArrayList** is a utility from the ``java.util`` package

- To declare a variable, use the format `ArrayList<DataType> variableName = new ArrayList<DataType>(initial number of elements);`

- Unlike arrays, ArrayLists are mutable (can be resized after initialization)

- Functions as a more versatile array

    - Does technically take more space than an array but for the purposes of CSA it shouldn't matter
<br>
<br>

Difference between Array and Arraylist:


| Array | Arraylist |
| - | - |
| Fixed length | Resizable length |
| Fundamental Java Feature | Part of a Framework |
| An object with no methods | A Class with many methods |
| Not very flexible | Flexible |
| Can store primitives | Cannot store primitives - stores objects instead |

Example of Array: Basketball players on court

Example of Arraylist: Dodgeball players on court

### Question
When should we use ArrayLists vs Arrays?

Answer: We use arraylists when we want to store collection types or if we have a varying number of elements that must be stored. We should use arrays otherwise.

<br>
<br>
Showing how ArrayLists are mutable:


```java
import java.util.ArrayList;

class ArrayListExample { 
    public static void main(String[] args) 
    { 
        // Size of ArrayList 
        int n = 5; 
  
        // Declaring ArrayList with initial size n 
        ArrayList<Integer> arr1 = new ArrayList<Integer>(n); 
  
        // Declaring ArrayList without initial size
        ArrayList<Integer> arr2 = new ArrayList<Integer>(); 
  
        // Printing ArrayList 
        System.out.println("Array 1:" + arr1); 
        System.out.println("Array 2:" + arr2); 
  
        // Appending new elements to the end of the list 
        for (int i = 1; i <= n; i++) { 
            arr1.add(i); 
            arr2.add(i); 
        } 
  
        // Printing ArrayList 
        System.out.println("Array 1:" + arr1); 
        System.out.println("Array 2:" + arr2); 
    } 
}
ArrayListExample.main(null);
```

    Array 1:[]
    Array 2:[]
    Array 1:[1, 2, 3, 4, 5]
    Array 2:[1, 2, 3, 4, 5]


## 7.1 Popcorn Hack

Create an ArrayList that stores the integers 5, 8, 14, 18, 24, 39, and 56 and only print the numbers that are divisible by 3.


```java
import java.util.ArrayList;

public class DivisibleBy3 {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList();
        nums.add(5);nums.add(8);nums.add(14);nums.add(18);nums.add(24);nums.add(39);nums.add(56);

        for (int i = 0; i < nums.size(); i++) {
            if (nums.get(i) %3 == 0) {
                System.out.print(nums.get(i) + " ");
            }
        }
        // write code here
    }
}
DivisibleBy3.main(null);
```

    18 24 39 

### Vocabulary Refresher
- An **element** is a single value in the **array**

- The __**index**__ of an **element** is the position of the element in the **array** or **ArrayList**

    - The first index of an **ArrayList**, like **arrays** is also 0 
<br>
<br>
- The **length** of an **array** is the number of elements in the array.


## 7.2 Arraylist Methods
- add()
    - Adding a value to the ArrayList
    - Can be used to create an element at a specific index in the ArrayList - when this happens, everything at the positions of index and higher are moved to the right by 1 
- get()
    - Get the value of an index in the ArrayList
- set()
    - Change the value at an index in the ArrayList
- remove()
    - Delete the value at in index in the ArrayList
- clear()
    - Remove all values in an ArrayList
- size()
    - Get the length of the ArrayList


```java
import java.util.ArrayList;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> test = new ArrayList<>();
        System.out.println(test.size());
        test.add(1); //index 0
        test.add(2); // index 1
        test.add(3); // index 2
        test.add(4); // index 3
        test.add(5); // index 4
        test.add(6); // index 5
        test.add(7); // index 6

        System.out.println(test);

        int i = test.set(1, 200); // prints what used to be at index 1
        int x = test.remove(4); // prints what was removed

        System.out.println(i);
        System.out.println(x);
        System.out.println(test);
    }
}
Test.main(null);
```

    0
    [1, 2, 3, 4, 5, 6, 7]
    2
    5
    [1, 200, 3, 4, 6, 7]


## Printing an ArrayList
- You can't print an **array** without a loop
- You can print **ArrayLists** with just one `System.out.println()`


```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args)
    {
        ArrayList<String> arr = new ArrayList<String>(); //initializes the arraylist object

        arr.add("I agree");
        arr.add(0, "You agree");
        System.out.println(arr);

        arr.set(0, "They agree");

        arr.add("I disagree");
        arr.remove(2);
        
        System.out.println();
        System.out.println(arr);
    }
}
Main.main(null);
```

    [You agree, I agree]
    
    [They agree, I agree]


## 7.2 Popcorn Hack

Finish the code below so that all duplicates in the ArrayList are removed.


```java
import java.util.ArrayList;
import java.util.HashMap;

public class RemoveDuplicates {
    public static void main(String[] args) {
        ArrayList<Integer> arr = new ArrayList<>(); // creating new arraylist of integers
        ArrayList<Integer> array = new ArrayList<>();
        // adding integers to the arraylist
        arr.add(1);
        arr.add(7);
        arr.add(9);
        arr.add(13);
        arr.add(3);
        arr.add(7);
        arr.add(9);
        arr.add(2);

        for (int i = 0; i < arr.size(); i++) {
            Integer element = arr.get(i);
            if (array.contains(element)) {
                arr.remove(i);
            } else {
                array.add(element);
            }
        }

        System.out.print(arr);
    }
}
RemoveDuplicates.main(null);
```

    [1, 7, 9, 13, 3, 9, 2]

## Array to ArrayList
- You can use the Arrays.asList() method to convert an existing **array** to an **ArrayList**


```java
public class ArrayListFromArray
{
    public static void main(String[] args)
    {
       String[] names = {"Kim", "Tay", "Tran", "Ethan", "Sheng", "Raymond"};
       ArrayList<String> namesList = new ArrayList<String>(Arrays.asList(names));
       System.out.println(namesList);
    }
}
ArrayListFromArray.main(null);
```

    [Kim, Tay, Tran, Ethan, Sheng, Raymond]


## 7.3 Traversing ArrayLists
- You can traverse an ArrayList the same way as an array, with some exceptions:

- Deleting elements in the ArrayList while iterating over the ArrayList needs to be carefully done
- Using an enhanced for loop can result in the ConcurrentModificationException error
    - Do not delete elements in an ArrayList while using an enhanced for loop


```java
public static void main(String[] args)
{
    ArrayList<Integer> arr = new ArrayList<>();        
    arr.add(1);
    arr.add(7);
    arr.add(9);
    arr.add(13);
    arr.add(3);
    arr.add(7);
    arr.add(9);
    arr.add(2);

    for (int i = 0; i < arr.size(); i++) //for loop, would work the same as with an array
    {
        System.out.print(arr.get(i) + " ");
    }
    System.out.println();

    for (Integer i : arr) //enhanced for loop without removing, same as an array
    {
        System.out.print(i + " ");
    }

}
main(null);
```

    1 7 9 13 3 7 9 2 
    1 7 9 13 3 7 9 2 


```java
public static void main(String[] args)
{
    ArrayList<Integer> arr = new ArrayList<>();        
    arr.add(1);
    arr.add(7);
    arr.add(9);
    arr.add(13);
    arr.add(3);
    arr.add(7);
    arr.add(9);
    arr.add(2);

    for (Integer i : arr) //throws a ConcurrentModificationException
    {
        if (i % 2 == 0)
        {
            arr.remove(i);
        }
    }

}
main(null);
```


    ---------------------------------------------------------------------------

    java.util.ConcurrentModificationException: null

    	at java.base/java.util.ArrayList$Itr.checkForComodification(ArrayList.java:1013)

    	at java.base/java.util.ArrayList$Itr.next(ArrayList.java:967)

    	at .main(#12:13)

    	at .(#35:1)


## Popcorn Hack
Traverse the following ArrayList using a loop. Remove each element that is a multiple of 4.


```java
public static void main(String[] args)
{
    ArrayList<Integer> arr = new ArrayList<>();        
    arr.add(1);
    arr.add(7);
    arr.add(9);
    arr.add(80);
    arr.add(13);
    arr.add(3);
    arr.add(7);
    arr.add(8);
    arr.add(2);
    arr.add(16);

    int length = arr.size();
    for (int i = 0; i<length; ) {
        if (arr.get(i)%4 == 0) {
            arr.remove(i);
            length--;
        }
        i++;
    }
    
    System.out.print(arr);
}
main(null);
```

    [1, 7, 9, 13, 3, 7, 2]

## 7.4 Developing Algorithms Using ArrayLists
- For the most part, algorithms in ArrayLists and arrays are very similar.

## Popcorn Hacks
Find the maximum, minimum, and sum of an ArrayList.


```java
public static void main(String[] args)
{
    ArrayList<Integer> arr = new ArrayList<>();        
    arr.add(1);
    arr.add(7);
    arr.add(9);
    arr.add(80);
    arr.add(13);
    arr.add(3);
    arr.add(7);
    arr.add(8);
    arr.add(2);
    arr.add(16);

    int sum = 0;
    int min = Integer.MAX_VALUE;
    int max = Integer.MAX_VALUE+1;
    for (int i = 0; i<arr.size(); i++) {
        sum+=arr.get(i);
        if (arr.get(i) > max) {
            max = arr.get(i);
        } else if (arr.get(i) < min) {
            min = arr.get(i);
        }
    }
    System.out.println(min + " " + max + " " + sum);
}

main(null);
```

    2 80 146


## 7.5 Searching

- Searching in an ArrayList allows you to find an element, if it exists, an index is returned
- All that is needed to search any linear structure is a standard for loop and if block
- Typically, if the element is not found then -1 is returned, however a boolean value can also be used

#### Example of Linear Search


```java
import java.util.ArrayList;

public class LinearSearch {
    public static int linearSearch(ArrayList<Integer> list, int target) {
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) == target) {
                return i; // return index of target element if found
            }
        }
        return -1; // return -1 if the target element is not in the array
    }

    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(5);
        numbers.add(10);
        numbers.add(15);
        numbers.add(20);
        numbers.add(25);

        int target = 15; // target of search
        int result = linearSearch(numbers, target);

        if (result != -1) {
            System.out.println(target + " found at index " + result);
        } else {
            System.out.println(target + " not found in the ArrayList.");
        }
    }
}

LinearSearch.main(null);
```

- The linear search algorithm searches for a specific target value (15 in this example) within the ArrayList by iterating through its elements one by one
- It checks if the element at the current index (list.get(i)) is equal to the target value
- If a match is found, the index is returned; else, it continues the loop until the end of the ArrayList is reached

## Popcorn Hack

- Finish the code below, write code that checks if favoriteFlavor is in chipsBag
- Using a loop, print a message saying if favoriteFlavor is in the bag


```java
import java.util.ArrayList;
import java.util.Scanner;

public class FavoriteChip {
    public static void main(String[] args) {
        ArrayList<String> chipsBag = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);

        chipsBag.add("BBQ");
        chipsBag.add("Cheddar");
        chipsBag.add("Salt and Pepper");

        System.out.print("Enter your favorite chip flavor: ");
        String favoriteFlavor = scanner.nextLine();

        // implement your own search logic here
        for (int i = 0; i < chipsBag.size(); i++) {
            if (chipsBag.get(i).equalsIgnoreCase(favoriteFlavor)) {
                System.out.print(favoriteFlavor + " is in the bag of chips.");
                return ;
            }
        }
        System.out.print(favoriteFlavor + " is not in the bag of chips.");

    }
}
FavoriteChip.main(null);
```

    Enter your favorite chip flavor: cheddar is in the bag of chips.

## 7.6 Sorting
- There are 2 main sorting algorithms that Collegeboard focuses on, **selection sort** and **insertion sort**

### Selection sort
- Selection sort divides the ArrayList into two "subarrays," the first is sorted and the second is unsorted.
- Selection sort is easy to implement and is useful for sorting through small datasets.

#### Example of Selection sort


```java
import java.util.ArrayList;

public class SelectionSort {
    public static void main(String[] args) {
        ArrayList<Integer> arrayList = new ArrayList<>();
        arrayList.add(64);
        arrayList.add(25);
        arrayList.add(12);
        arrayList.add(22);
        arrayList.add(11);

        selectionSort(arrayList);

        System.out.println("Sorted ArrayList: " + arrayList);
    }

    public static void selectionSort(ArrayList<Integer> arr) {
        int n = arr.size();

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < n; j++) {
                if (arr.get(j) < arr.get(minIndex)) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the element at index i
            int temp = arr.get(i);
            arr.set(i, arr.get(minIndex));
            arr.set(minIndex, temp);
        }
    }
}
SelectionSort.main(null);
```

    Sorted ArrayList: [11, 12, 22, 25, 64]


- Start with an ArrayList, [64, 25, 12, 22, 11]

- We want to arrange these numbers in order from smallest to largest, like [11, 12, 22, 25, 64]

- selectionSort starts at the beginning of the list and looks for the smallest number in the whole list. In this case, it's 11

- It swaps 11 with the first number in the list (which is 64) so that 11 comes first

- Now, the list looks like [11, 25, 12, 22, 64]

- The function repeats this process for the remaining numbers, finding the next smallest (which is 12) and putting it in the second position

- This continues until all numbers are in order

- The final sorted list is [11, 12, 22, 25, 64]

### Insertion Sort
- In insertion sort, we assume that the first element is already sorted
- The second element is then taken and is either inserted before the first element or kept in place to make the first 2 elements sorted
- Insertion sort is adaptive as it does not need to perform as many comparisons and swaps as selection sort. If you expect the data to be partially ordered, insertion sort is the better option.

#### Example of Insertion Sort


```java
import java.util.ArrayList;

public class InsertionSort {
    public static void insertionSort(ArrayList<Integer> arr) {
        int n = arr.size();
        for (int i = 1; i < n; i++) {
            int key = arr.get(i);
            int j = i - 1;

            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr.get(j) > key) {
                arr.set(j + 1, arr.get(j));
                j = j - 1;
            }
            arr.set(j + 1, key);
        }
    }

    public static void main(String[] args) {
        ArrayList<Integer> arrayList = new ArrayList<>();
        arrayList.add(12);
        arrayList.add(11);
        arrayList.add(13);
        arrayList.add(5);
        arrayList.add(6);

        System.out.println("Original ArrayList: " + arrayList);

        insertionSort(arrayList);

        System.out.println("Sorted ArrayList: " + arrayList);
    }
}
InsertionSort.main(null);
```

    Original ArrayList: [12, 11, 13, 5, 6]
    Sorted ArrayList: [5, 6, 11, 12, 13]


- Start with an ArrayList of numbers, [12, 11, 13, 5, 6]

- We want to arrange these numbers in order from smallest to largest, like [5, 6, 11, 12, 13]

- insertionSort starts with the second element (11)

- It compares 11 to the elements on its left. It finds that 11 is smaller than 12, so it shifts 12 one position to the right to make space for 11

- The ArrayList now looks like [11, 12, 13, 5, 6]

- The function repeats this process for each element in the list. It moves 13 to the right place and then 5 and 6

- After sorting all the elements, the ArrayList is now sorted in ascending order: [5, 6, 11, 12, 13]

## 7.6 Popcorn Hack

Given an ArrayList of String objects, sort the following ArrayLists on ascending order of word length.

## 1)


```java
import java.util.ArrayList;

public class SortByLength {
    public static void main(String[] args) {
        ArrayList<String> words = new ArrayList<>(); // creating new arraylist
        
        // adding words to the list
        words.add("theater");
        words.add("connection");
        words.add("seasonal");
        words.add("feast");
        words.add("meeting");

        // add code for sorting by length here
        int n = words.size();
        for (int i = 1; i < n; i++) {
            String key = words.get(i);
            int keylength = words.get(i).length();
            int j = i - 1;

            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && words.get(j).length() > keylength) {
                words.set(j + 1, words.get(j));
                j = j - 1;
            }
            words.set(j + 1, key);
        }
        System.out.println(words);
    }
        
    }
    
SortByLength.main(null);

```

    [feast, theater, meeting, seasonal, connection]


## 2)


```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

class Student {
    String name;
    double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    public String toString() {
        return "Student[Name=" + this.name + ", GPA = " + this.gpa + "]";
    }
}

public class SortByGPA {
    public static void main (String[] args) {
        ArrayList<Student> students = new ArrayList<>(); // creating new arraylist to store student objects
        students.add(new Student("Derrek", 4.1));
        students.add(new Student("Alex", 4.2));
        students.add(new Student("Drew", 4.3));
        students.add(new Student("Jishnu", 4.4));
        students.add(new Student("David", 4.5));

        // write code for sorting here
        // No instructions were given for this problems, so I'm sorting based on GPA
        int N = students.size();                        // get size of students ArrayList
        for (int i = 1; i < students.size(); i++) {     // loop to find the correct index of each student
            Student currStudent = students.get(i);
            double currStudentGPA = students.get(i).gpa;
            for (int j = i-1; j >= 0; j--) {            // check previous indices to see if any swapping is required
                if (students.get(j).gpa < currStudentGPA) { // if a smaller value is found, swap
                    students.set(j+1, students.get(j));
                    students.set(j, currStudent);
                }
            }
        }
        System.out.println(students);
    }
}
SortByGPA.main(null);
```

    [Student[Name=David, GPA = 4.5], Student[Name=Jishnu, GPA = 4.4], Student[Name=Drew, GPA = 4.3], Student[Name=Alex, GPA = 4.2], Student[Name=Derrek, GPA = 4.1]]


## 7.7 Ethical Issues Around Data Collection

When collecting data in a Java program, data security is **VERY IMPORTANT**. This involves any program that deals with

- Necessary personal information
- Information that is associated with results

### Removing Data
- When collected data is no longer needed, be sure to remove the information from your application
- Removal of unnecessary data reduces risk of data breaches and protects sensitive information from unauthorized access

### Anonymizing Data

- When collecting user information, avoid asking for private information to identify users ie. phone numbers, social security numbers, etc.

> Collegeboard Example


```java
Scanner inputScanner = new Scanner(System.in);
String fullName = inputScanner.nextLine();

// implementation of code

int identifier = fullName.hashCode();
fullName = null;

// further implementation
```

In this example... 
- The user would type their full name in which it is used in the program
- After, the identifier equates to the hash value of the original string and the fullName is set to null
- Using the hash value instead of the actual name adds a degree of anonymity for the user
- Turning the fullName to null also indicates that the code no longer needs to store the name of the user

This minimizes the possible impact of the data by reducing the likelihood of unintentional exposure of the user's name within the program.

## Hacks for Unit 7
- Complete all questions and popcorn hacks
- Write a Java program that creates an ArrayList of integers. Create methods for adding, removing, setting, getting, etc numbers and also sort the list. Then, utilize user input to determine which methods will actually be run and enable the user to also determine the specific index that a number will be added, removed.



```java
import java.util.ArrayList;
import java.util.Scanner;
public class IntegerArrayList {
    private ArrayList<Integer> listOfIntegers;
    private Scanner input = new Scanner(System.in);

    public IntegerArrayList() {
        listOfIntegers = new ArrayList<Integer>();
    }

    public IntegerArrayList(Integer[] inputArray) {
        listOfIntegers = new ArrayList<Integer>(Arrays.asList(inputArray));
    }

    public void addElement(int value) {
        this.listOfIntegers.add(value);
    }

    public void removeElement(int value) {
        this.listOfIntegers.remove(value);
    }

    public void setElement(int index, int value) {
        this.listOfIntegers.set(index, value);
    }

    public void getElement(int index) {
        System.out.println(this.listOfIntegers.get(index));
    }

    public void sortList() {
        int N = this.listOfIntegers.size();
        for (int i = 1; i < N; i++) {
            Integer currentValue = this.listOfIntegers.get(i);
            for (int j = i-1; j>=0; j--) {
                if (this.listOfIntegers.get(j) > currentValue) {
                    this.listOfIntegers.set(j+1, this.listOfIntegers.get(j));
                    this.listOfIntegers.set(j, currentValue);
                }
            }
        }
        System.out.print("Sorted List: "); this.printList();
    }

    public void printList() {
        System.out.println(listOfIntegers);
    }

    public int menuSelection() {
        System.out.println("Please select your desired action (any other key exits):\n 1) Add a value \n 2) Remove a value \n 3) Setting a value \n 4) Getting a value \n 5) Sorting the list \n 6) Print the list");
        int userOption = input.nextInt();
        return userOption;
    }

    public void main() {
        boolean exit = false;
        while (!exit) {
            int userChoice = menuSelection();
            switch (userChoice) {
                case 1:
                    System.out.println("Please enter the value to add: ");
                    int valueToAdd = input.nextInt();
                    this.addElement(valueToAdd);
                    break;
                case 2:
                    System.out.println("Please enter the value to remove: ");
                    int valueToRemove = input.nextInt();
                    this.removeElement(valueToRemove);
                    break;
                case 3:
                    System.out.println("Please enter the index: ");
                    int index = input.nextInt();
                    System.out.println("Please enter the value to set: ");
                    int value = input.nextInt();
                    this.setElement(index, value);
                    break;
                case 4:
                    System.out.println("Please enter the index: ");
                    index = input.nextInt();
                    this.getElement(index);
                    break;
                case 5:
                    this.sortList();
                    break;
                case 6:
                    this.printList();
                    break;
                default:
                    exit = !exit;
            }
        }
    }
}

Integer testArray[] = {5,4,3,2,1};
IntegerArrayList testList = new IntegerArrayList(testArray);
testList.main();
```

    Please select your desired action (any other key exits):
     1) Add a value 
     2) Remove a value 
     3) Setting a value 
     4) Getting a value 
     5) Sorting the list 
     6) Print the list
    Please enter the value to add: 
    Please select your desired action (any other key exits):
     1) Add a value 
     2) Remove a value 
     3) Setting a value 
     4) Getting a value 
     5) Sorting the list 
     6) Print the list
    Please enter the value to remove: 
    Please select your desired action (any other key exits):
     1) Add a value 
     2) Remove a value 
     3) Setting a value 
     4) Getting a value 
     5) Sorting the list 
     6) Print the list
    Please enter the index: 
    Please enter the value to set: 
    Please select your desired action (any other key exits):
     1) Add a value 
     2) Remove a value 
     3) Setting a value 
     4) Getting a value 
     5) Sorting the list 
     6) Print the list
    Please enter the index: 
    1
    Please select your desired action (any other key exits):
     1) Add a value 
     2) Remove a value 
     3) Setting a value 
     4) Getting a value 
     5) Sorting the list 
     6) Print the list
    Sorted List: [1, 3, 4, 5, 82]
    Please select your desired action (any other key exits):
     1) Add a value 
     2) Remove a value 
     3) Setting a value 
     4) Getting a value 
     5) Sorting the list 
     6) Print the list


### Challenge
You are given an ArrayList of `Student` objects. Each `Student` has a name (String) and a GPA (double). Create a program that sorts the `Student` objects in descending order of GPA.


```java
// Challenge
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

class Student {
    String name;
    double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    public String toString() {
        return "Student[Name=" + this.name + ", GPA = " + this.gpa + "]";
    }
}

public class SortByGPA {
    public static void main (String[] args) {
        ArrayList<Student> students = new ArrayList<>(); // creating new arraylist to store student objects
        students.add(new Student("Derrek", 4.1));
        students.add(new Student("Alex", 4.2));
        students.add(new Student("Drew", 4.3));
        students.add(new Student("Jishnu", 4.4));
        students.add(new Student("David", 4.5));

        // write code for sorting here
        // No instructions were given for this problems, so I'm sorting based on GPA
        int N = students.size();                        // get size of students ArrayList
        for (int i = 1; i < students.size(); i++) {     // loop to find the correct index of each student
            Student currStudent = students.get(i);
            double currStudentGPA = students.get(i).gpa;
            for (int j = i-1; j >= 0; j--) {            // check previous indices to see if any swapping is required
                if (students.get(j).gpa < currStudentGPA) { // if a smaller value is found, swap
                    students.set(j+1, students.get(j));
                    students.set(j, currStudent);
                }
            }
        }
        System.out.println(students);
    }
}
SortByGPA.main(null);
```

    [Student[Name=David, GPA = 4.5], Student[Name=Jishnu, GPA = 4.4], Student[Name=Drew, GPA = 4.3], Student[Name=Alex, GPA = 4.2], Student[Name=Derrek, GPA = 4.1]]



```java

```
