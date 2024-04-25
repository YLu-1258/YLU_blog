---
title: Searching Algorithms
description: Exploring the binary search and other search algorithms
toc: True
layout: post
type: hacks
comments: True
---

# 7.5 Searching

## What does college board want you to know
- Differences in searching using arrayList and arrays
- Types of searches: sequential (linear) and binary
- Searching for a double vs int vs object

<br>

## Differences Reminder
- Answer all the question, they are popcorn hacks

### Arrays
- Query looks like array[index]
- array.length
- ``int[] array = new int[];``


### arrayList
- Query looks like arrayList.get(index)
- arrayList.size()
- ``ArrayList<Integer> arrayList = new ArrayList<Integer>();``

### Question 1
![question1](https://raw.githubusercontent.com/Codemaxxers/codemaxxerblog/main/images/question1.png)



```java
// Write the answer here
```

### Question 2
![question2](https://raw.githubusercontent.com/Codemaxxers/codemaxxerblog/main/images/question2.png)


```java
// Write the answer here
```

## Searching for a double vs int vs object

1. **Data Type Basics**:
   - `double` is used for decimal numbers (like 3.14 or 10.5).
   - `int` is for whole numbers (like 5 or -10).
   - `Object` is a generic type that can hold any kind of data.

2. **Comparing Values**:
   - With `double` and `int`, searching algorithms can directly compare values using simple checks like "Is this number greater than that number?"
   - With `Object`, the comparison might involve more steps, like checking specific properties of the objects.

3. **Performance Considerations**:
   - `double` and `int` use less memory and have simpler comparison logic, which can make searching faster.
   - `Object` might be slower due to the need for more complex comparison logic and potentially larger memory usage.

4. **Handling Null Values**:
   - With `Object`, you need to handle cases where the data is null (empty) to avoid errors during searching.

5. **Binary Search Advantage**:
   - Binary search works best on sorted data, and with `double` and `int`, the sorting and comparison are straightforward.
   - With `Object`, sorting and comparison might require more effort, especially for custom data types.

![gif](https://raw.githubusercontent.com/Codemaxxers/codemaxxerblog/main/images/search.gif)

## What is Linear Search?

Linear or Sequential Search is a simple searching algorithm that checks each element in a list one by one until it finds a match or reaches the end of the list.

- usually used when there is no specific order or structure to the data
- O(n), where n is the number of elements in the array

Return the position of key in arr or -1 if key is not in arr.

Return true if key is in arr; otherwise, return false.


```java
import java.util.ArrayList;

public class LinearSearch {

    // Iterative implementation for ArrayList<String>
    public static int iterativeLinearSearch(ArrayList<String> list, String target) {
        // Start from the first element of the list
        for (int i = 0; i < list.size(); i++) {

            // Compare each element with the target element until a match is found or the end of the list is reached
            if (list.get(i).equals(target)) {
                return i; // Element found at index i
            }
        }
        return -1; // Element not found
    }

    // Recursive implementation for ArrayList<String>
    private static int search(ArrayList<String> list, String target, int startIndex) {
        // Check if the startIndex is greater than or equal to the size of the list
        if (startIndex >= list.size())
            // If startIndex is out of bounds, return -1 -> target not found
            return -1;
    
        // Check if the string at the startIndex position in the list is equal to the target string
        if (list.get(startIndex).equals(target))
            // If the target string is found at startIndex, return the index
            return startIndex;
    
        // If the target string is not found at startIndex, recursively call the search method
        // with the incremented startIndex to continue searching in the rest of the list
        return search(list, target, startIndex + 1);
    }


    public static void example1(String[] args) {
        ArrayList<String> namesList = new ArrayList<>(Arrays.asList("Grace", "Emma", "Finn", "Theo", "Rachit", "Tanisha", "Vivian", "Aliya", "Justin"));

        int index = LinearSearch.iterativeLinearSearch(namesList, "Emma");
        if (index != -1) {
            System.out.println("Element found at index: " + index);
        } else {
            System.out.println("Element not found");
        }
    }

    public static void example2(String[] args) {
        ArrayList<String> namesList = new ArrayList<>(Arrays.asList("Grace", "Emma", "Finn", "Theo", "Rachit", "Tanisha", "Vivian", "Aliya", "Justin"));

        int index = LinearSearch.recursiveLinearSearch(namesList, "Vivian");
        if (index != -1) {
            System.out.println("Element found at index: " + index);
        } else {
            System.out.println("Element not found");
        }
    }
}

```


```java
// Example with Iterative Implementation
LinearSearch.example1(null);
```

    Element found at index: 1



```java
// Example with Recursive Implementation
LinearSearch.example2(null);
```

    Element found at index: 6


## Popcorn Hack
1. Implement linear search for an array list of integers

2. When is it preferred to use linear search over binary search?

(answer here)

<h2> Recursive algorithms </h2>

- a method that calls upon itself
- has a "base case" that is a conditional statement that skips the recursive call so algorithm stops at certain point 

<img src="https://i.imgur.com/Su3D1Cc.png" alt="recursive" width="600"/>

- useful when solving problems that can be broken down into smaller, repetitive problems 

<h4> Popcorn Hack </h4>

What are some examples of algorithms that would be useful to have recursion? 

<h2> Binary Search </h2>

- finds the index of an element of a <b>SORTED</b> array 
- why use it? can be faster than linear search which has O(n) complexity while binary has O(log N)
- how it works simply: (Divide and Conquer method 💪)

1. Start in the middle --> see if that number is lower or higher than the desired number

    a. if lower than disregard upper half section and only look at lower section

    b. if higher than disregard lower half and only look at upper section 

2. Find middle of that lower/higher section (those sections don’t include the original middle number) 

    a. if even number of numbers in that section, you can specify in algorithm whether want to use lower or higher number
    
3. Keep repeating process until find number 

    a. if desired number trying to find is not in the list → high and low are swapped incorrectly → return -1 


<h4>Simple example </h4>



```java
public class BinarySearch {
    static char[] arr = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'};

    public static String findMe(char target, int start, int end) {
        if (start > end) {
            return "Not Found";
        }

        // find middle number - java integer division automatically truncates
        int middle = (start + end) / 2;

        if (arr[middle] == target) {
            return "Found it at index " + middle;
        }

        // recursion spotted - search lower section
        if (arr[middle] > target) {
            return findMe(target, start, middle - 1);
        } 

        // recursion spotted part 2 - search higher section
        if (arr[middle] < target) {
            return findMe(target, middle + 1, end);
        }
        
        return "Not Found";
    }

    public static void main(String[] args) {
        char target = 'f';
        int start = 0;
        int end = arr.length - 1;
        System.out.println(findMe(target, start, end));
    }
}
BinarySearch.main(null);
```

    Found it at index 5


<h4> Popcorn Hack </h4>

What iteration did it find f?

## Hashmap searching

### Introduction to HashMap:
1. HashMap is a data structure that stores key-value pairs.
2. Keys are hashed to determine their storage location in the map.
3. Java's HashMap provides O(1) time complexity for get() and put() operations.
4. No keys can be the same, or else the old data is lost, and is replaced by the new one


```java
import java.util.HashMap;

public class HashMapSearching {
    public static void main(String[] args) {
        // Create a HashMap of students and their scores
        // Declaring the HashMap with <String, Integer> type
        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 85);
        scores.put("Bob", 90);
        scores.put("Charlie", 95);
        scores.put("Alice", 80);

        // Search for a student
        String name = "Alice";

        // containsKey() method is used to check if the key is present in the HashMap
        if (scores.containsKey(name)) {
            int score = scores.get(name);
            System.out.println(name + "'s score is: " + score);
        } else {
            System.out.println(name + " not found in the records.");
        }
    }
}

HashMapSearching.main(null);

```

    Alice's score is: 80


## Hashmaps with objects
- What is an Abstract Class Review
    * Abstract classes can't be made into objects
    * They enforce a structure for the subclasses generated by it

### Hacks for this part
1. Create a method to delete data based off the key


```java
import java.util.HashMap;

public abstract class Collectable implements Comparable <Collectable> {
	public final String masterType = "Collectable";
	private String type;	// extender should define their data type

	// enumerated interface
	public interface KeyTypes {
		String name();
	}
    
	protected abstract KeyTypes getKey();  	// this method helps force usage of KeyTypes

	// getter
	public String getMasterType() {
		return masterType;
	}

	// getter
	public String getType() {
		return type;
	}

	// setter
	public void setType(String type) {
		this.type = type;
	}
	
	// this method is used to establish key order
	public abstract String toString();

	// this method is used to compare toString of objects
	public int compareTo(Collectable obj) {
		return this.toString().compareTo(obj.toString());
	}

	// static print method used by extended classes
	public static void print(Collectable[] objs) {
		// print 'Object' properties
		System.out.println(objs.getClass() + " " + objs.length);

		// print 'Collectable' properties
		if (objs.length > 0) {
			Collectable obj = objs[0];	// Look at properties of 1st element
			System.out.println(
					obj.getMasterType() + ": " + 
					obj.getType() +
					" listed by " +
					obj.getKey());
		}

		// print "Collectable: Objects'
		for(Object o : objs)	// observe that type is Opaque
			System.out.println(o);

		System.out.println();
	}
}

public class Car extends Collectable {
    private String make;
    private String model;
    private int year;

    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

	@Override
    protected KeyTypes getKey() {
        return null; 
    }

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
    }

    public String toString() {
        return year + " " + make + " " + model;
    }
}

public class Garage {
    private static HashMap<String, Car> garage = new HashMap<>();

    public Garage() {
        garage.put("Lambo", new Car("Lamborghini", "Aventador", 2021));
        garage.put("Ferrari", new Car("Ferrari", "F8 Tributo", 2021));
        garage.put("Porsche", new Car("Porsche", "911 Turbo S", 2021));
        garage.put("McLaren", new Car("McLaren", "720S", 2021));
    }

    //print what's in my garage
    public void printGarage() {
        for (String key : garage.keySet()) {
            System.out.println(key + ": " + garage.get(key));
        }
    }

    public static void main(String[] args) {
        Garage myGarage = new Garage();
        myGarage.printGarage();

        // Removing a car from the garage tester code
        // String key = "Lambo";
        // Car car = garage.remove(key);
        // if (car == null) {
        //     System.out.println(key + " not found");
        // } else {
        //     System.out.println("Removed: " + key + ", " + car);
        // }
    }
}

Garage.main(null);
```

    Ferrari: 2021 Ferrari F8 Tributo
    Porsche: 2021 Porsche 911 Turbo S
    Lambo: 2021 Lamborghini Aventador
    McLaren: 2021 McLaren 720S


# HACKS (you should be able to do with chatgpt)

1. Is sequential/linear or binary more efficient? Why?
2. Why might you not always be able to use binary search?
3. Which of the following implements a method named contains for searching an array sequentially, confirming whether or not the array contains a requested element?


![](https://raw.githubusercontent.com/Codemaxxers/codemaxxerblog/main/images/4isanswer.jpg)

# Answer the comment in the code

public static int foo(int[] arr, int x) {

    for(int i = 0; i < arr.length; i++) {

        if(arr[i] == x) {

            return i;

        }

    }

    return -1;

}

Given the method defined above, how many times is the word "Indubitably!" output by the code below?

int[] vals = {1,4,51,3,14,91,130,14};

for(int i = 0; i < 20; i++) {

    if(foo(vals,i%4) < 0) {

        System.out.println("Indubitably!");

    }

}

### Answer:
