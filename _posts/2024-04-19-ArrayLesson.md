---
title: Array Lesson
description: Exploring the wonders of using arrays!
toc: True
layout: post
type: hacks
comments: True
---

# 6.1 - Intro to Arrays

Arrays are used to store one type of data, whether it is a primitive or reference data type. Arrays themselves are reference types. They are best thought of as a list of items with a fixed size, as arrays have a set size that cannot be changed (don't confuse this with ArrayLists which can also be thought of as a list - we'll learn about ArrayLists in
Unit 6).

Arrays are denoted by brackets {0}, with items separated by commas such as the following:

```java
int[] numbers = {1, 2, 3, 4, 5};
```

Before we can use arrays, we need to have an import statement, which is

```java
import java.util.Arrays;
```

# Making Arrays

There are two ways to make arrays: using a constructor and using a pre-initialized array.

## Constructor
As with other reference types, we can initialize arrays using a constructor. However, the constructor is slightly different from the constructors from Unit 5:

```java
dataType[] arrayName = new dataType[numberOfItems];
``` 

To create an array that holds 10 integers, we would do `int[] ourArray = new int[10];`
The items in the array are initialized differently depending on the data type.

- Integers are initialized to 0

- Doubles are initialized to 0.0

- Booleans are initialized to false

- All reference types are initialized to null

We will talk about filling constructed lists in the next topic when we discuss traversing arrays.

## Pre-initialized Array

We can also set an array to a pre-initialized array, similar to how we initialize strings. Here, we will initialize an array of 10 integers as follows:

```java
int[] ourArray = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
```

# Accessing Elements

We access elements in arrays using bracket notation as follows: arrayName[index]. The most important thing to know is that Java is a zero-indexed language, so the first item has index 0, and not 1.

Before we talk about the index of the last item, we need to discuss how to find the array length. The array length is actually an instance variable specific to that particular array denoted as arrayName.length (not to be confused with length) for Strings). Note that this is not a method, so there are no parentheses.

Therefore, the last item in the array can be accessed by using arrayName.length - 1. Do not confuse this with the constructor in which we use arrayName.length in brackets.

If we use an index outside the allowed range, we will get an ArrayIndexOutOfBoundsException.
Here is a question: how do we access the even numbers in arrayOne from above?




### answer
```java
2 = arrayOne[1]
4 = arrayOne[3]
6 = arrayOne[5]
8 = arrayOne[7]
10 = arrayOne[9]
``` 

## Key Terms to Remember and Review

- <mark>Arrays</mark>: `Arrays` are a collection of elements of the same data type, stored in contiguous memory locations. They have a fixed size and can be accessed using an index.

- <mark>array.length</mark>: The property "length" in an array refers to the number of elements it contains.

- <mark>ArrayIndexOutOfBoundsException</mark>: `ArrayIndexOutOfBoundsException` is an exception that occurs when trying to access an invalid index position in an array. It is thrown to indicate that the index used to access an array is either negative or greater than or equal to the size of the array.

- <mark>fixed size</mark>: `Fixed size` refers to a data structure or container whose size cannot be changed once it is created. Once initialized with a specific capacity or length, no additional elements can be added or removed from it.

- <mark>import java.util.Arrays</mark>: This term refers to a statement in Java that allows you to access the functionality of the Arrays class from the `java.util` package. It is used to import specific classes or entire packages into your program.

- <mark>Primitive data type </mark>: `Primitive data types` are basic data types provided by programming languages, such as integers, floating-point numbers, booleans, and characters. They represent simple values and have predefined characteristics.

- <mark>Reference Data Type </mark>: A `reference data type` is a data type that refers to an object in memory rather than directly storing the value. It stores the memory address where the object is located.

* <mark>Constructor</mark>: A constructor is a special method within a class that is used to initialize objects of that class. It is called automatically when an object is created and helps set initial values for its attributes.

# 6.2 - Traversing Arrays

Traversing an array means to access every value in the array. This is typically done using a for loop.

## Forward Traversal

To traverse an array in order, you can use the following for loop:

```java
for (int i = 0; i < array.length; i++) {
  // access or modify array elements
}
```

## Reverse Traversal

To traverse an array in reverse order, you can use the following for loop:

```java
for (int i = array.length - 1; i >= 0; i--) {
  // access or modify array elements
}
```

## Limited Traversal

If you only want to traverse a portion of the array, you can specify a different start and end index. For example, to traverse from the second element to the end, you can use:

```java
for (int i = 1; i < array.length - 1; i++) {
  // access or modify array elements
}
```

## Subsection

You can also traverse a specific subsection of the array. For example, to traverse from the third to seventh element, you can use:

```java
for (int i = 2; i < 7; i++) {
  // access or modify array elements
}
```

## Examples

Here's an example of how to double every element in an array:

```java
public static void doubleArray(int[] array) {
  for (int i = 0; i < array.length; i++) {
    array[i] *= 2;
  }
}
```

## While Loop

While loops can also be used to traverse an array, but for loops are more common due to their conciseness. Here's the doubling example using a while loop:

```java
public static void doubleArray(int[] array) {
  int i = 0;
  while (i < array.length) {
    array[i] *= 2;
    i++;
  }
}
```

## Key Terms to Remember and Review

* <mark>Limited Traversal</mark>: Limited traversal refers to the process of accessing only a portion of a data structure, such as an array or list, instead of traversing through the entire structure. It allows for efficient retrieval and manipulation of specific elements within the data structure.

* <mark>Reverse Traversal</mark>: Reverse traversal involves accessing elements in reverse order, starting from the last element and moving towards the first element in a collection or data structure.

* <mark>Subsection</mark>: A subsection is a smaller part or division of a larger section. In programming, it refers to breaking down a complex problem into smaller, more manageable parts.

* <mark>Traversing</mark>: Traversing refers to the process of accessing each element in a data structure, such as an array or linked list, and performing some operation on it.

* <mark>while loop</mark>: A while loop is a control flow statement that allows a block of code to be executed repeatedly as long as a specified condition is true.

* <mark>for loop</mark>: A for loop is a control flow statement that allows a block of code to be executed repeatedly with a pre-defined loop variable, often used for iterating over collections or arrays.

* <mark>i++</mark>: A shorthand notation for incrementing a variable by 1.

* <mark>i < array.length</mark>: A common condition used in for loops to iterate over arrays, where i is the loop variable and array.length is the number of elements in the array.

* <mark>array[i]</mark>: Accessing an element of an array using the index i.

* <mark>array.length() - 1</mark>: The last index of an array, since array indices start at 0.


# 6.3 - Enhanced For Loops for Arrays

This is the general format for an "Enhanced For Loop" or a "for-each" loop:

```java
for(type element : arrayName) {
	// body of the loop
}
```

If you want to access each element in the array without changing the values (to summarize or count them), you can access them using a for-each loop:

```java
for (<type> <name> : <array>){
    <statement>;
    <statement>;
    …
}
```

Here is a quick way to declare an array, and then illustrate how a for-each loop could be used to access the array:

```java
int[] fallTemperatures = {55, 50, 59, 69, 48, 30, 48};
```

This initializes an array called fallTemperatures with 7 integer values.

```java
for (int i = 0; i < fallTemperatures.length; i++) {
    if (fallTemperatures[i] > 32) {
        above++;
    }
}
```

This is our traditional loop, which traverses the array and sums up all the temperatures that are above freezing (we assume there is a method called “above” that keeps a running count of how many days were above 32°). We can express this same process with a for-each loop:

```java
for (int i : fallTemperatures) {
    if (i > 32) {
        above++;
    }
}
```

with the general form of:

```java
for (<type> <name> : <array>) {
    <statement>;
    <statement>;
    …
}
```

Please note that for-each loops cannot modify values within an array, only examine each value in sequence. Here is another example of everything put together:

```java
class ForEachExample {
    public static void main(String[] args) {
        int[] even_numbers = {2, 4, 6, 8};
        for(int number : even_numbers){
            System.out.println(number);
            // Output: 2, 4, 6, 8
        }
    }
}
```

In this example, the `number` variable is used to loop through the `even_numbers` array. For each iteration, `number` is assigned the value of the current element in the array, and that value is printed out.

# Common Mistakes

- Here are some common mistakes when traversing arrays and using for-each loops in Java:

### Traversing Arrays:

- Off-by-One Errors: When using traditional for-loops to traverse arrays, a common mistake is to use the wrong boundaries for the loop. Remember that array indices in Java start at 0 and go up to array.length - 1. So, if you iterate up to array.length, you’ll get an ArrayIndexOutOfBoundsException.

- Modifying Array Length: The length of an array in Java is fixed at the time of creation. Trying to change the length of the array during traversal will lead to errors.

- Ignoring Returned Values: When using methods that return a value, such as arrayList.remove(index), it’s a mistake to ignore the returned value as it might be useful for the logic of your code.

### Using For-Each Loops:

- Modifying Elements: A common mistake is trying to modify the array or collection you’re iterating over with a for-each loop. The loop variable in a for-each loop is a copy of the current array element, not a reference to it. So changes to the loop variable don’t affect the original array.

- Tracking Index: For-each loops do not keep track of the index, so you cannot obtain the array index using a for-each loop. If you need to know the index of an element, a traditional for-loop might be more appropriate.

- Removing Elements: You cannot call remove() during a for-each loop. If you need to remove elements while traversing, consider using an Iterator.

- Iterating Backwards or in Multiple Steps: For-each loops only iterate forward over the array in single steps. If you need to iterate backwards or skip elements, a traditional for-loop is needed.

- Processing Two Arrays in Parallel: For-each loops cannot process two arrays at once. If you need to traverse two arrays in parallel, a traditional for-loop is more suitable.

Remember, choosing between a traditional for-loop and a for-each loop depends on the specific requirements of your code. Each has its own use cases and advantages.

# FRQ - 2015 Free Response Question #1

- This question involves reasoning about one-dimensional and two-dimensional arrays of integers. You will write three static methods, all of which are in a single enclosing class, named DiverseArray (not shown). The first method returns the sum of the values of a one-dimensional array; the second method returns an array that represents the sums of the rows of a two-dimensional array; and the third method analyzes row sums.

(A) Write a static method arraySum that calculates and returns the sum of the entries in a specified one-dimensional array. The following example shows an array arr1 and the value returned by a call to arraySum.

![image](https://github.com/AniCricKet/musical-guacamole/assets/91163802/1e6d6cd0-445d-4c15-89dc-2b2846b5d1fb)


Complete method arraySum below. 


```java
class DiverseArray {
    public static int arraySum(int[] arr) {
        int sum = 0;
        for (int i = 0; i<arr.length; i++){
            sum+=arr[i];
        }
        return sum;
    }
}
int[] array = {1,1,1,1,1,1};
System.out.print("Sum of array: ");
System.out.print(DiverseArray.arraySum(array));

```

    Sum of array: 6

<img width="667" alt="image" src="https://github.com/AniCricKet/musical-guacamole/assets/91163802/84cb12be-b868-441a-96d0-51b12ff0d697">

(b) Write a static method rowSums that calculates the sums of each of the rows in a given twodimensional array and returns these sums in a one-dimensional array. The method has one parameter, a twodimensional array arr2D of int values. The array is in row-major order: arr2D[r][c] is the entry at row r and column c. The method returns a one-dimensional array with one entry for each row of arr2D such that each entry is the sum of the corresponding row in arr2D. As a reminder, each row of a two-dimensional array is a one-dimensional array. For example, if mat1 is the array represented by the following table, the call rowSums(mat1) returns the array {16, 32, 28, 20}. Assume that arraySum works as specified, regardless of what you wrote in part (a). You must use arraySum appropriately to receive full credit. Complete method rowSums below.


```java
class DiverseArray {
    public static int arraySum(int[] arr) {
        int sum = 0;
        for (int i = 0; i<arr.length; i++){
            sum+=arr[i];
        }
        return sum;
    }

    public static int[] rowSums(int[][] twoD) {
        int[] sums = new int[twoD.length];
        for (int i = 0; i<twoD.length; i++) {
            sums[i] = arraySum(twoD[i]);
        }
        return sums;
    }

    public static void main(String[] args) {
        int[][] array = { {1,2,3,4,5}, {6,7,8,9,0} };
        int[] result = DiverseArray.rowSums(array);
        System.out.print("Row sums of array: ");
        for (int i = 0; i<result.length; i++) {
            System.out.print(result[i] + " ");
        }
    }
}

DiverseArray.main(null);

```

    Row sums of array: 15 30 

![image](https://github.com/AniCricKet/musical-guacamole/assets/91163802/40654587-a7af-4918-ab01-5000ba097a9b)

(c) A two-dimensional array is diverse if no two of its rows have entries that sum to the same value. In the following examples, the array mat1 is diverse because each row sum is different, but the array mat2 is not diverse because the first and last rows have the same sum.Assume that arraySum and rowSums work as specified, regardless of what you wrote in parts (a) and (b). You must use rowSums appropriately to receive full credit. Complete method isDiverse below.


```java
class DiverseArray {
    public static int arraySum(int[] arr) {
        int sum = 0;
        for (int i = 0; i<arr.length; i++){
            sum+=arr[i];
        }
        return sum;
    }

    public static int[] rowSums(int[][] twoD) {
        int[] sums = new int[twoD.length];
        for (int i = 0; i<twoD.length; i++) {
            sums[i] = arraySum(twoD[i]);
        }
        return sums;
    }

    public static int countOccurence(int[] arr, int val) {
        int occurence = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                occurence++;
            }
        }
        return occurence;
    }

    public static boolean isDiverse(int[][] twoD) {
        int[] rowSums = rowSums(twoD);
        for (int i = 0; i < rowSums.length; i++) {
            if (countOccurence(rowSums, rowSums[i]) > 1) {
                return false;
            }
        }
        return true;

    }

    public static void main(String args[]) {
        int[][] array1 = { {1,2,3,4,5}, {6,7,8,9,0} };
        int[][] array2 = { {1,1,1,1,1}, {1,1,1,1,1} };
        System.out.print("Array 1 diverse? ");
        System.out.print(DiverseArray.isDiverse(array1) + "\n");
        System.out.print("Array 2 diverse? ");
        System.out.print(DiverseArray.isDiverse(array2));
    }
}

DiverseArray.main(null);
```

    Array 1 diverse? true
    Array 2 diverse? false
