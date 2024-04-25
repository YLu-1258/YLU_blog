---
title: ArrayList
description: Arraylist student blog
toc: True
layout: post
type: hacks
comments: True
---

# Unit 7: ArrayList
> Mastering the concept of Java's ArrayList. AP Exam weighting: 2.5-7.5%.

# 7.1: ArrayList Intro

- ArrayLists are **dynamic**, meaning their size can grow or shrink as needed, but arrays are static in size
- Instead of creating a new array of a different size and copying the data from the initial array to the new one, we can use ArrayLists

|Arrays|ArrayLists|
|-------|---------|
|Fixed Length|Resizable Length|
|Fundamental Java feature|Part of a framework|
|An object with no methods|Class with many methods|
|Not as flexible|Designed to be very flexible|
|Can store primitive data|Not designed to store primitives|
||Slightly slower than arrays|
||Need an import statement|

In order to use the ArrayList class, the ArrayList class needs to be imported from the java util package. This can be done by writing import java.util.ArrayList at the top of the class file.


```java
import java.util.ArrayList;  // Import the ArrayList class

// Declare and initialize an ArrayList of integers
ArrayList<Integer> numbersList = new ArrayList<>();
```

ArrayList objects are created in the same fashion as other object classes. The primary difference with ArrayLists is that the element type of the ArrayList must be specified using angled bracket <>. In this example, E represents the data type that will be used in the ArrayList. This notation is called the **generic** type.
</br>
This can be replaced by an object data type:


```java
ArrayList<E> list = new ArrayList<E>();
```

We can actually declare ArrayLists without specifying the type that will be included in the ArrayList, but specifying the data type is smarter because it allows the compiler to find errors before run time, so its more efficient and easy to spot errors.


```java
ArrayList list = new ArrayList();
```

#### Quick lil popcorn hack

Create 2 ArrayLists, 1 called `studentName` and 1 called `studentAge`


```java
public class Student
{
    public static void main(String[] args)
    {
        ArrayList<String> studentName;
        ArrayList<Integer> studentAge;
        
    }
}
```

# 7.2: ArrayList Methods

### Learning Objectives

Students will be able to represent collections of related object reference data using `ArrayList` objects.

### Essential Knowledge

- Iteration statements provide a means to access all the elements stored within an `ArrayList`. This process is referred to as "traversing the `ArrayList`."

- The following `ArrayList` methods, including what they do and when they are used, are part of the Java Quick Reference:

    * `int size()` - Returns the count of elements within the list. Starts from 1
    * `boolean add(T obj)` - Appends the object `obj` to the end of the list and returns `true`.
    * `void add(int index, T obj)` - Inserts `obj` at the specified `index`, shifting elements at and above that position to the right (incrementing their indices by 1) and increasing the list's size by 1.
    * `T get(int index)` - Retrieves the element at the given `index` in the list.
    * `T set(int index, T obj)` - Replaces the element at the specified `index` with `obj` and returns the previous element at that index.
    * `T remove(int index)` - Deletes the element at the specified `index`, shifting all subsequent elements one index to the left, reducing the list's size by one, and returning the removed element.

- Java allows the generic `ArrayList<E>`, where the generic type `E` specifies the type of element.

- When `ArrayList<E>` is specified, the types of the reference parameters and return type when using the methods are type `E`.

- `ArrayList<E>` is preferred over `ArrayList` because it allows the compiler to find errors that would otherwise be found at runtime.

### Size of the `ArrayList`

* `int size();` : Returns the number of elements in the list.

Consider the following code:


```java
ArrayList<Integer> a1 = new ArrayList<>();
System.out.println(a1.size());
```

    0


### Adding Items to an `ArrayList`

* `boolean add(E obj);` : Appends `obj` to the end of the list and returns true.
* `void add(int index, E obj)` : Inserts `obj` at position `index`, as long as `index` is within the list's length. It moves each element in the list 1 index higher and adds 1 to the list's size.

Consider the following code:


```java
ArrayList<Double> a2 = new ArrayList<>();
a2.add(1.0);
a2.add(2.0);
a2.add(3.0);
a2.add(1, 4.0);
System.out.println(a2);
```

    [1.0, 4.0, 2.0, 3.0]


### Let's Look at an Example

Consider the following code:


```java
ArrayList<String> h = new ArrayList<>();

h.add("Hello");
h.add("Hello");
h.add("HeLLO");
h.add("Hello");
h.add(1, "Hola");

h.add(26.2);
h.add(new String("Hello"));
h.add(false);
```


    |   h.add(26.2);

    incompatible types: double cannot be converted to java.lang.String

    


Now, consider this code:


```java
ArrayList<String> g = new ArrayList<>();

g.add("Hello");
g.add("Hello");
g.add("HeLLO");
g.add("Hello");
g.add(1, "Hola");

g.add(new String("Hello"));

System.out.println(g);
```

    [Hello, Hola, Hello, HeLLO, Hello, Hello]


**Question:** Why does this code work?

The code works because all of the elements that are added to the ArrayList are the same type (String).

### Deleting Items from an `ArrayList`

`E remove(int index)` : Removes the element at position `index`, and moves the elements at position `index + 1` and higher to the left. It also subtracts one from the list's size. The return value is the element formerly at position `index`.


```java
// If you are confused of what list g is, look back at the previous code.
g.remove(3);
String former = g.remove(0);
System.out.println(former);
```

    Hello


### Updating Items in an `ArrayList`

`E set(int index, E obj)` : Replaces the element at position `index` with `obj` and returns the element formerly at position `index`.


```java
String helloFormer = g.set(1, "Bonjour");
System.out.println(helloFormer);
System.out.println(g);
```

    Hello
    [Hola, Bonjour, Hello, Hello]


### Accessing Items in an `ArrayList`

`E get(int index)` Returns the element at position `index` in the list.


```java
String hello = g.get(3);
System.out.println(hello);
System.out.println(g);
```

    Hello
    [Hola, Bonjour, Hello, Hello]


### Passing an `ArrayList` as a Method Parameter

The only time that it is wise to use `ArrayList` instead of `ArrayList<E>` is when it is as a function parameter and it is only using `ArrayList<>.get(E)` or `ArrayList<>.size()`. Consider the following code:


```java
private void accessOnly(ArrayList arr) {
    if (arr.size() > 0) {
        System.out.println(arr.get(0)); // Change the index to the one you want to access
    } else {
        System.out.println("Array is empty");
    }
}

ArrayList<Integer> myList = new ArrayList<Integer>();
accessOnly(myList);
```

    Array is empty


### Returning an `ArrayList` from a Method

In order for you to return an `ArrayList`, the data type must be specified, and the return type must be the same as the return value. Consider the following code:


```java
private ArrayList<String> returnTheSame() {
    ArrayList<String> arr = new ArrayList<String>(); // Initialize the ArrayList
    arr.add("Hello");
    return arr;
}

ArrayList<String> result = returnTheSame();
System.out.println(result);

```

    [Hello]


### Hacks

- The learning objective is that "Students will be able to represent collections of related object reference data using `ArrayList` objects." What does this mean to you?

- Answer the following questions:

    * Look back at *Size of the `ArrayList`*. What does the code output and why?

    It looks at the literal size of the list, which is how many elements are present within it, otherwise known as the length.

    * Look back at *Adding items to an `ArrayList`*. What does the code output and why? What type of function is `void`, and what will be the return value?

    Returns the arraylist with all of its elements that were previously added. a void function does not return anything.

    * Look back at Example 1. What two lines did we remove? Why?
    
    we removed the lines trying to add a double and a boolean to the arraylist, as it was specified to only contain string values.

    * If an `ArrayList` is being used as a parameter, what are the only two methods I can use from it? What would happen if I tried to use any other methods?
    
    you can only use get and size. it will only update the local array in the method and not the actual array.

- Using the Hack Helper, write code that will:

    * Add 2 items to the list.
    * Remove an item from the list anywhere of the user's choice.
    * Replace am item anywhere in the list of the user's choice.
    * Get the first and last element of the list, no matter the length.
    * Return the items added, removed, replaced, and the list's size, in one string.

### Hack Helper


```java
public class HackHelper {
    private String manipulateList(ArrayList<Integer> array) {
        return null;
    }

    public static void main(String[] args) {
    }
}

HackHelper.main(null);
```

# 7.3: Traversing Arraylists

### Learning Objectives:
- With an Arraylist you can traverse objects using a for or while loop.

- Traversing objects is similar to iterating through objects.

### Essential Knowledge:
- Iteration statements can be used to access all the elements in an Arraylist. This is called traversing the Arraylist.

- Deleting elements during a traversal of an Arraylist requires special techniques to avoid skiping elements.

- The indicies of an Arraylist start at **0**; If you try to use any value lower than 0, you will get an **ArrayIndexOutOfBoundsException** error


```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> roster = new ArrayList<>();
        roster.add("Hello");
        roster.add("World");
        roster.add("Java");
        
        int sum = 0;
        for (int i = 0; i < roster.size(); i++) {
            String element = roster.get(i);
            if (element != null) {
                sum += element.length();
            }
        }
        System.out.println(sum);
    }
}

    
```

#### Breakdown:
- We are first declaring a new arraylist and adding a few elements.

- Next, we set the "sum" variable as 0.

- We set a for loop to traverse through the arraylist, iterating through all the indices in the arraylist and adding up the lengths of all the values.

- Lastly, we print it out.

#### Loop Conditions:

- There are a few different loop conditions you can use to traverse an Arraylist:
- Using different for-loop conditions
- Using a for-each loop:
  ```java
  for (String element : roster) {
      if (element != null) {
          sum += element.length();
      }
  }
  ```
- Using a while loop:
  ```java
  int i = 0;
  while (i < roster.size()) {
      String element = roster.get(i);
      if (element != null) {
          sum += element.length();
      }
      i++;
  }
  ```
- Using a Java 8 stream:
  ```java
  int sum = roster.stream()
                .filter(Objects::nonNull)
                .mapToInt(String::length)
                .sum();
  ```

#### Common mistakes:
- Using the Wrong Data Type: Ensure that you declare your ArrayList with the correct data type. Using the wrong data type can lead to type mismatches and errors.

- Incorrect Indexing: Be cautious when using a standard for loop. Off-by-one errors or accessing elements that don't exist can lead to runtime exceptions.

- Modifying the List During Iteration: Modifying an ArrayList (adding or removing elements) while iterating over it can lead to a ConcurrentModificationException. To avoid this, use an Iterator or create a copy of the list if modifications are needed.

- Not Checking for Null Elements: When using enhanced for loops or iterators, check for null elements if there's a possibility that your list contains them to avoid NullPointerExceptions.

- Inefficient Searching: If you need to find a specific element, avoid using a linear search within a loop. Use appropriate methods like contains() or indexOf() to find elements efficiently.

# 7.4: Developing Algorithms Using ArrayLists

### Learning Objectives

In the context of `ArrayList` objects, this module aims to teach the following skills:

a. Iterating through `ArrayLists` using `for` or `while` loops.

b. Iterating through `ArrayLists` using enhanced `for` loops.

In the realm of algorithms, within the context of specific requirements that demand the utilization of `ArrayList` traversals, students will be able to:

- Recognize established algorithms.
- Customize existing algorithms.
- Create new algorithms.

### Essential Knowledge

- Iteration statements provide a means to access all the elements stored within an `ArrayList`. This process is referred to as "traversing the `ArrayList`."

- The following methods related to `ArrayLists`, their functions, and appropriate use are covered in the Java Quick Reference:

    * `int size()` - Returns the count of elements within the list.
    * `boolean add(E obj)` - Appends the object `obj` to the end of the list and returns `true`.
    * `void add(int index, E obj)` - Inserts `obj` at the specified `index`, shifting elements at and above that position to the right (incrementing their indices by 1) and increasing the list's size by 1.
    * `E get(int index)` - Retrieves the element at the given `index` in the list.
    * `E set(int index, E obj)` - Replaces the element at the specified `index` with `obj` and returns the previous element at that index.
    * `E remove(int index)` - Deletes the element at the specified `index`, shifting all subsequent elements one index to the left, reducing the list's size by one, and returning the removed element.

- There exist established algorithms for `ArrayLists` that make use of traversals to:

    * Insert elements.
    * Remove elements.
    * Apply the same algorithms commonly used with 1D arrays.

## Popcorn Hacks:

Before you uncomment the code and run it, guess what the code will do based on what you've learned.

### Let's Look at an Example (Example 1)


```java
public class ArrayListExample {
    private double findMax(double[] values) {
        double max = values[0];
    
        for (int index = 1; index < values.length; index++) {
           if (values[index] > max) {
               max = values[index];
           }
        }
    
        return max;
    }
    
    public static void main(String[] args) {
        double[] nums = {1.0, 3.0, 2.0, 2.0, 1.0, 69.0, 2.0, 4.0, 6.0, 2.0, 5.0, 10.0};
        ArrayListExample example = new ArrayListExample();
        double max = example.findMax(nums);
        System.out.println("Maximum value: " + max);
    }
}

// ArrayListExample.main(null);
```

    Maximum value: 69.0


Take a closer look at the `findMax()` method. It takes in a list of doubles as parameters. It will then use a `for` loop to find the maximum value in the list. Now, using what we know, can we replace the list of doubles with an ArrayList of Doubles? We sure can! Take a look at how we can use ArrayList to do just that:


```java
public class ArrayListExample {
    private double findMax(ArrayList<Double> values) {
        double max = values.get(0);
    
        for (int index = 1; index < values.size(); index++) {
           if (values.get(index) > max) {
               max = values.get(index);
           }
        }
    
        return max;
    }
    
    public static void main(String[] args) {
        ArrayList<Double> nums = new ArrayList<>();
        nums.add(1.0);
        nums.add(3.0);
        nums.add(2.0);
        nums.add(2.0);
        nums.add(1.0);
        nums.add(69.0);
        nums.add(2.0);
        nums.add(4.0);
        nums.add(6.0);
        nums.add(2.0);
        nums.add(5.0);
        nums.add(10.0);
        
        ArrayListExample example = new ArrayListExample();
        double max = example.findMax(nums);
        System.out.println("Maximum value: " + max);
    }
}

ArrayListExample.main(null);
```

### Let's Look at an Example (Example 2)

Take a look at this code:


```java
public class ArrayListExample {
    private int findMin(int[] values) {
        //int min = Integer.MAX_VALUE;
        //for (int currentValue : values) {
        //    if (currentValue < min) {
        //        min = currentValue;
        //    }
        //}
        return min;
    }

    public static void main(String[] args) {
        int[] nums = {420, 703, 2034, 582, 1047, 4545};
        ArrayListExample example = new ArrayListExample();
        int min = example.findMin(nums);
        System.out.println("Minimum value: " + min);
    }
}

ArrayListExample.main(null);
```

Now, can we use ArrayLists to make this code better? We sure can! Take a look at the new and improved code that uses ArrayLists:


```java
public class ArrayListExample {
    private int findMin(ArrayList<Integer> values) {
        //int min = Integer.MAX_VALUE;
        //for (int currentValue : values) {
        //    if (currentValue < min) {
        //        min = currentValue;
        //    }
        //}
        return min;
    }

    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(420);
        nums.add(703);
        nums.add(2034);
        nums.add(582);
        nums.add(1047);
        nums.add(4545);
        ArrayListExample example = new ArrayListExample();
        int min = example.findMin(nums);
        System.out.println("Minimum value: " + min);
    }
}

ArrayListExample.main(null);
```

### 7.3-7.4 Hacks

- Answer the questions: 
    * Look back at the examples. What's similar? What's different?

    * Why do we use `ArrayList`? Why not just regular lists?

    Regular lists have fixed size in Java.

- Demonstrate at least two `ArrayList` methods that aren't `ArrayList<>.size()` and `ArrayList<>.get()`.

- Write the method `findSum()` using the Hack Helper and incorporating `ArrayList`.

### Hack Helper


```java
public class ArrayListHacks {
    private int findSum(ArrayList<Integer> values) {
        return 0;
    }

    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(0);
        nums.add(1);
        nums.add(2);
        nums.add(300);
        nums.add(5);
        nums.add(8);

        ArrayListHacks hacks = new ArrayListHacks();
        System.out.println(hacks.findSum(nums));
    }
}

ArrayListHacks.main(null);
```

    0


# 7.5 Searching

### Learning Objectives
- Apply sequential/linear search algorithms to search for specific information in array or ``arraylist`` objects

### Essential Knowledge:
- Sequential/linear search alogorithms check each element in order untill the desired value is found or all elementsin the array or ``arraylist`` have been checked

### Search Process
- Linear searching fits a standard for loop perfectly! We need to specify each element, one at a time, and do not need to track the index after execution

- Inside the for loop, we retrieve the value from the structure at the specified index and compare it to the searched value

- If it matches we return the index, otherwise we keep looking!

### Searching Linear Structures

Linear structures are data structures such as Arrays or ArrayLists. Linear search algorithms are BEST used when we do not have any idea about the order of the data and so we need to look at each element to determine if what we are looking for is in fact inside the array or ``ArrayList``.

### Comparison Operators
- When looking at ``int`` values, the == operator is the tool to use!
- When searching for a ``double`` value, we need to make sure the value is close enough by doing some math!
- ``Object`` instances should always use the ``.equals(otheThing)`` method to check for a match!

### Searching an ``ArrayList`` of Double


```java
public int where(double magicNumber, ArrayList<Double> realNumbers, double delta)
{
    for (int index = 0; index < realNumbers.size(); index++)
    {
        if (Math.abs(magicNumber - realNumbers.get(index)) < delta)
        {
            return index;
        }
    }
    return -1;
}
```

### Searching an ``ArrayList`` of book for a ``String``


```java
public int findTheWord(String searchedPhrase, ArrayList<Book> myBooks)
{
    for (int index = 0; index < myBooks.size(); index++)
    {
        Book currentBook = myBooks.get(index);
        String currentPhrase = currentBook.getDescription();
        if(currentPhrase.equals(searchedPhrase))
        {
            return index;
        }
    }
    return -1;
}
```

### Why does order sometimes matter?
- When searching for a value to **REMOVE** from a list, if we search forward we have to make sure to adjust the loop control variable (index), or we might skip what we are looking for when removing!
- Iterating forward (From index 0):
![image](https://github.com/rohinsood/csa/assets/69406769/39a9c86f-d883-498d-b145-bed206e9e694)
![image](https://github.com/rohinsood/csa/assets/69406769/1064f39f-f90c-478a-b441-283cc9079b43)
![image](https://github.com/rohinsood/csa/assets/69406769/f7a2bf57-37fd-486b-ac05-8073a87438e8)

- Iterating backward (From the last index):
![image](https://github.com/rohinsood/csa/assets/69406769/7ca7164a-1b18-4860-914b-918ef4ab76fa)
![image](https://github.com/rohinsood/csa/assets/69406769/fb6396db-7452-458e-959d-6457146194b9)
![image](https://github.com/rohinsood/csa/assets/69406769/f4f42afc-8109-4932-96d7-50b6d52c1048)
![image](https://github.com/rohinsood/csa/assets/69406769/8deda862-38bb-44e1-9a7b-575ce129fd5f)



```java
import java.util.ArrayList;

public class ColorRemoval {
    public static void removeTargetForward(ArrayList<String> colors, String target) {
        // Start from the 0 index and iterate backwards
        for (int i = 0; i < colors.size(); i++) {
            if (colors.get(i).equals(target)) {
                colors.remove(i); // Remove the element if it matches the target
            }
        }
    }

    public static void removeTargetReverse(ArrayList<String> colors, String target) {
        // Start from the last index and iterate backwards
        for (int i = colors.size() - 1; i >= 0; i--) {
            if (colors.get(i).equals(target)) {
                colors.remove(i); // Remove the element if it matches the target
            }
        }
    }

    public static void main(String[] args) {
        // Example usage
        ArrayList<String> colorList = new ArrayList<>();
        colorList.add("blue");
        colorList.add("green");
        colorList.add("red");
        colorList.add("red");
        colorList.add("yellow");

        String targetColor = "red";

        System.out.println("~~~FORWARD~~~");
        System.out.println("Before removal: " + colorList);
        removeTargetForward(colorList, targetColor);
        System.out.println("After removal: " + colorList);

        // Resetting the list
        colorList.clear();
        colorList.add("blue");
        colorList.add("green");
        colorList.add("red");
        colorList.add("red");
        colorList.add("yellow");

        System.out.println("~~~REVERSE~~~");
        System.out.println("Before removal: " + colorList);
        removeTargetReverse(colorList, targetColor);
        System.out.println("After removal: " + colorList);
    }
}

ColorRemoval.main(null);

```

    ~~~FORWARD~~~
    Before removal: [blue, green, red, red, yellow]
    After removal: [blue, green, red, yellow]
    ~~~REVERSE~~~
    Before removal: [blue, green, red, red, yellow]
    After removal: [blue, green, yellow]


# 7.6 Sorting

### Learning Objectives
- Apply selection sort and insertion sort algorithms to sort the elements of array or ``ArrayList`` objects.

### Essential Knowledge:
- Selection sort and insertion sort are iterative sorting algorithms that can be used to sort elements in an array or ``ArrayList``.



## Selection Sort
> This is one of the easiest sorts to demonstrate. The selection sort identifies either the maximum or minimum of the compared values and iterates over the structure checking if the item stored at the index matches that condition, if so, it will swap the value stored at that index and continue. This implementation uses a helper method to perform the swap operation since variables can hold only one value at a time!

Example:


```java
// with normal arrays
for (int outerLoop = 0; outerLoop < myDucks.length; outerLoop ++)
{
    int minIndex = outerLoop;
    for (int inner = outerLoop +1; inner < myDucks.length; inner++)
    {
        if (myDucks[inner].compareT(myDucks[minIndex]) < 0)
        {
            minIndex = inner;
        }
    }
    if (minIndex != outerLoop)
    {
        swapItems(minIndex, outerloop, myDucks);
    }
}

// with array lists
for (int outerLoop = 0; outerLoop < myDucks.size(); outerLoop++) {
    int minIndex = outerLoop;
    for (int inner = outerLoop + 1; inner < myDucks.size(); inner++) 
    {
        if (myDucks.get(inner).compareT(myDucks.get(minIndex)) < 0) 
        {
            minIndex = inner;
        }
    }
    if (minIndex != outerLoop) {
        swapItems(minIndex, outerLoop, myDucks); 
    }
}
/*
This code performs a selection sort on the myDucks ArrayList, ordering its elements based on the compareT method. 
During each iteration of the outer loop, it finds the index of the minimum element in the unsorted portion of the list and swaps it with the first element of the unsorted portion.
 */ 
```

## Insertion Sort Algorithm
> The insertion sort is characterized by building a sorted structure as it proceeds. It inserts each value it finds at the appropriate location in the data structure. This is often accomplished by using a while loop as the inner loop.

Example:


```java
for (int outer = 1; outer < randomList.size(); outer++)
{
    DebugDuck tested = randomList.get(outer);
    int inner = outer -1;

    while ( innter >= 0 && tested.compareTo(randomList.get(inner)) < 0)
    {
        ramdomList.set(inner +1, randomList.get(inner));
        inner--;
    }
    randomList.set(inner +1, tested)
}
// This code arranges a list of DebugDuck objects in order using the insertion sort method, 
// by moving through the list and putting each item in its proper place one by one.
```

# 7.7: Ethical Issues around Data Collection

### Learning Objectives:
- Explaining the risks of privacy from collecting and storing personal data on computer systems.

### Essential Knowledge:
- When using the computer, personal privacy is at risk. Programmers should attempt to safeguard personal privacy.

#### Privacy Protection:
- A simple way to protect privacy is to delete personal user info after done using it.
- Another way is to minimize the amount of data used by the program in order to protect privacy.
- Anonymizing personal data via the object method *hashCode()* is another way.

## 7.5-7.7 Hacks:
- Write code to remove an element of an ArrayList moving from the first index to the last index, without skipping any like in the example. 
- Then use an insertion sort algorithm to sort the ArrayList you created.


## Complete the hacks in the cell below
