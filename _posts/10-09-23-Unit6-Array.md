---
toc: True
comments: True
layout: post
title: Unit 6 Arrays - Teacher notebook
description: Lesson on the College Board Unit 6 Arrays. This is the teacher notebook.
week: 9
type: hacks
author: alex
---

## Intro into Arrays

- An **array** is a data structure used to implement a collection (list) of primitive or object reference data.

- An **element** is a single value in the **array**

- The __**index**__ of an **element** is the position of the element in the **array**

    - In java, the **first element** of an array is at **index 0**.

- The **length** of an **array** is the number of elements in the array.

    - **`length`** is a `public final` data member of an array

        - Since `length` is `public`, we can access it in **any class**!

        - Since `length` is `final` we cannot change an array's `length` after it has been created
    - In Java, the **last element** of an array named `list` is at **index** `list.length -1`

## A look into list Memory
`int [] listOne = new int[5];`

This will allocate a space in memory for 5 integers.

```
ARRAY: [0, 0, 0, 0, 0]
INDEX:  0  1  2  3  4
```

Using the keyword new uses the default values for the data type. The default values are as follows:

| Data Type | Default Value |
| --------- | ------------- |
| byte      | (byte) 0      |
| short     | (short) 0     |
| int       | 0             |
| double    | 0.0           |
| boolean   | false         |
| char      | '\u0000'      |

What do we do if we want to insert a value into the array?

`listOne[0] = 5;`

Gives us the following array:

```
ARRAY: [5, 0, 0, 0, 0]
INDEX:  0  1  2  3  4
```

What if we want to initialize our own values? We can use an initializer list!

`int [] listTwo = {1, 2, 3, 4, 5};`

Gives us the following array:

```
ARRAY: [1, 2, 3, 4, 5]
INDEX:  0  1  2  3  4
```

If we try to access an index outside of the range of existing indexes, we will get an error. But why? Remember the basis of all programming languages is memory. Because we are trying to access a location in memory that does not exist, java will throw an error (`ArrayIndexOutOfBoundsException`).

How do we print the array? Directly printing the array will not work, it just prints the value of the array in memory. We need to iterate through the array and print each value individually!


```java
/* lets take a look at the above */

int [] listOne = new int[5]; // Our list looks like [0, 0, 0, 0, 0]

listOne[2] = 33; // Our list looks like [0, 0, 33, 0, 0]
listOne[3] = listOne[2] * 3; // Our list looks like [0, 0, 33, 99, 0]

try {
    listOne[5] = 13; // This will return an error
} catch (Exception e) {
    System.out.println("Error at listOne[5] = 13");
    System.out.println(e);
}


System.out.println(listOne); // THIS DOES NOT PRINT THE LIST!! It prints the value in memory
System.out.println(listOne[4]); // This will actually print the vaules in the array
```

    Error at listOne[5] = 13
    java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
    [I@c0d29
    0


## Popcorn Hacks!

Write code to print out every element of listOne the following


```java
/* popcorn hacks go here */
for (int i = 0; i < listOne.length; i++) {
    System.out.print(listOne[i] + " ");
}
```

    0 0 33 99 0 

## Reference elements

Lists can be made up of elements other than the default data types! We can make lists of objects, or even lists of lists! Lets say I have a class `Student` and I want to make a list of all students in the class. I can do this by creating a list of `Student` objects.

```
Student [] classList;
classList new Student [3];
```

Keep in mind, however, that the list won't be generated with any students in it. They are initialized to `null` by default, and We need to create the students and then add them to the list ourselves.

```
classList[0] = new Student("Bob", 12, 3.5);
classList[1] = new Student("John", 11, 4.0);
classList[2] = new Student("Steve", 10, 3.75);
```

## Popcorn hacks!

Use a class that you have already created and create a list of objects of that class. Then, iterate through the list and print out each object using:
 1) a for loop
 2) a while loop


```java
/* Popcorn hacks go here */
public class Car {
    public String name;
    public String model;
    public String license;
    public int mileage;
    public Car() {
        this.name = "N/A";
        this.model = "N/A";
        this.license = "0000000";
        this.mileage = 0;
    }
    
    public Car(String name, String model, String license, int mileage) {
        this.name = name;
        this.model = model;
        this.license = license;
        this.mileage = mileage;
    }
}

Car [] carsList = new Car[2]; 
carsList[0] = new Car();
carsList[1] = new Car("Tesla", "3", "Q739SJF", 19000);

for (int i = 0; i < carsList.length; i++) {
    System.out.print(carsList[i] + " ");
}
System.out.print("\n");
int i = 0;
while (i < carsList.length) {
    System.out.print(carsList[i] + " ");
    i++;
}
```

    REPL.$JShell$22E$Car@4574051 REPL.$JShell$22E$Car@a90aeab 
    REPL.$JShell$22E$Car@4574051 REPL.$JShell$22E$Car@a90aeab 

## Enhanced for loops

The enhanced `for` loop is also called a for-each loop. Unlike a "traditional" indexed `for` loop with three parts separated by semicolons, there are only two parts to the enhanced `for` loop header and they are separated by a colon.

The first half of an enhanced `for` loop signature is the type of name for the variable that is a copy of the value stored in the structure. Next a colon separates the variable section from the data structure being traversed with the loop.

Inside the body of the loop you are able to access the value stored in the variable. A key point to remember is that you are unable to assign into the variable defined in the header (the signature)

You also do not have access to the indices of the array or subscript notation when using the enhanced `for` loop.

These loops have a structure similar to the one shown below:

```js
for (type declaration : structure )
{
    // statement one;
    // statement two;
    // ...
}
```

## Popcorn Hacks!

Create an array, then use a enhanced for loop to print out each element of the array.


```java
/* Popcorn hacks go here */
int [] nums = {1,2,3,4,5};
for (int num : nums) {
    System.out.print(num + " ");
}
```

    1 2 3 4 5 

## Min maxing

It is a common task to determine what the largest or smallest value stored is inside an array. in order to do this, we need a method that can ake a parameter of an array of primitive values (`int` or `double`) and return the item that is at the appropriate extreme.

Inside the method of a local variable is needed to store the current max of min value that will be compared against all the values in the array. you can assign the current value to be either the opposite extreme or the first item you would be looking at.

You can use either a standard `for` loop or an enhanced `for` loop to determine the max or min. Assign the temporary variable a starting value based on what extreme you are searching for.

Inside the `for` loop, compare the current value against the local variable, if the current value is better, assign it to the temporary variable. When the loop is over, the local variable will contain the approximate value and is still available and within scope and can be returned from the method.

## Popcorn Hacks!
Create two lists: one of ints and one of doubles. Use both a standard for loop and an enhanced for loop to find the max and min of each list.


```java
/* Popcorn hacks go here! */
int [] intList = {1,2,3,4,5,4,3,2,1};
double [] doubleList = {1.4,2.5,2.6,6.3,2.8,9.1};

int intmax=Integer.MAX_VALUE+1; int intmin = Integer.MAX_VALUE; double doublemax = -1 * Double.MAX_VALUE; double doublemin = Double.MAX_VALUE;

for (int i = 0; i < intList.length; i++) {
    if (intList[i] > intmax) {
        intmax = intList[i];
    } else if (intList[i] < intmin) {
        intmin = intList[i];
    }
}
System.out.println("Int MAX: " + intmax); System.out.println("Int MIN: " + intmin); int intmax=Integer.MAX_VALUE+1; int intmin = Integer.MAX_VALUE;

for (int i : intList) {
    if (i > intmax) {
        intmax = i;
    } else if (i < intmin) {
        intmin = i;
    }
}

System.out.println("Int MAX: " + intmax); System.out.println("Int MIN: " + intmin);

for (int i = 0; i < doubleList.length; i++) {
    if (doubleList[i] > doublemax) {
        doublemax = doubleList[i];
    } else if (doubleList[i] < doublemin) {
        doublemin = doubleList[i];
    }
}
System.out.println("Double MAX: " + doublemax); System.out.println("Double MIN: " + doublemin); double doublemax = -1 * Double.MAX_VALUE; double doublemin = Double.MAX_VALUE;

for (double i : doubleList) {
    if (i > doublemax) {
        doublemax = i;
    } else if (i < doublemin) {
        doublemin = i;
    }
}

##System.out.println("Double MAX: " + doublemax); System.out.println("Double MIN: " + doublemin);
```

    Int MAX: 5
    Int MIN: 1
    Int MAX: 5
    Int MIN: 1
    Double MAX: 9.1
    Double MIN: 2.8
    Double MAX: 9.1
    Double MIN: 2.8


## Hacks
Given an input of N integers, find A, the maximum, B, the minimum, and C the median.

Print the following in this order: A + B + C A - B - C (A + B) * C

Sample data:

INPUT:
5
1 2 3 4 5

OUTPUT:
9 1 18

INPUT:
9
2 4 6 8 10 10 12 14 16

OUTPUT:
28 6 180


```java
import java.util.Arrays;

public class Main {
    public static void hack1(int N, int[] nums) {
        Arrays.sort(nums);
        int min = nums[0];
        int max = nums[N - 1];
        int median;
        if (N % 2 == 0) {
            median = (nums[N / 2 - 1] + nums[N / 2]) / 2;
        } else {
            median = nums[N / 2];
        }
        System.out.print("Max: "+ max +" Median: " + median + " Min: " + min + "\n");
        System.out.print((min + max + median) + " " + (max - min - median) + " " + (max + min) * median + "\n");
    }

    public static void main(String[] args) {

        // Test the hack
        int[] nums1 = {1, 2, 3, 4, 5};
        hack1(nums1.length, nums1);
        
        int[] nums2 = {2, 4, 6, 8, 10, 10, 12, 14, 16};
        hack1(nums2.length, nums2);
    }
}

Main.main(null);
```

    Max: 5 Median: 3 Min: 1
    9 1 18
    Max: 16 Median: 10 Min: 2
    28 4 180



```java
// Find the N-th fibonacci num
public class Main {
    public static int hackFibo(int N) {
        int[] fibo = new int[N];
        fibo[0] = 1;
        fibo[1] = 1;
        for (int i = 2; i < N; i++) {
            fibo[i] = fibo[i-1] + fibo[i-2];
        }
        return fibo[N-1];
    }
    public static void main(String[] args) {

        // Test the hack
        System.out.println(hackFibo(7));
        System.out.println(hackFibo(20));
    }
}

Main.main(null);
```

    13
    6765



```java

```
