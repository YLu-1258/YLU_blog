---
title: ArrayLists
author: alex
badges: True
comments: True
categories: ['CS61B']
date: 2025-02-05 1:00:00 -0800
math: True
tags: ['CS61B', 'Data Structures', 'Arrays', 'ArrayLists', 'JAVA']
---

# Linked List Performance
- While the Linked List is performant in operations such as insertion, addition, and removal of nodes, it is much more inefficient at retrieving data.
    - inthis is because we only have pointers to the front and the back of a list for a DLList, which means in the worst case situation, if our index of interest was in the very middle, we would have to traverse `size/2` number of nodes before we arrive at what we are interested in.
- On the other hand, we know that arrays are much more performant at accessing data membeters, as array attributes are accessible by numerical means. This provides constant time for element access in an array.

# Array Based List
- I first try to implement a naive `AList` that supports the `addLast`, `getLast`, `get`, and `size` operations for array sizes up to 100.


```java
public class AList {
    private int[] array;
    private int size;

    public AList() {
        array = new int[100];
        size = 0;
    }

    public void addLast(int element) {
        array[size] = element;
        size++;
    }

    public void removeLast(int element) {
        array[size] = 0;
        size--;
    }

    public int get(int i) {
        if (i >= size) {
            return 0;
        }
        return array[i];
    }

    public int getLast() {
        return array[size-1];
    }

    public int size() {
        return size;
    }
}

AList test = new AList();
test.addLast(1);
test.addLast(2);
test.getLast();
```




    2



- However, a major draw back to this implementation is that the size of our ArrayList is fixed. If we have 100 items in our list, and try to add one more, our array would not be able to contain that element.
- The way to address this issue is that we should just create a new array to accomodate for more data, while copying over our old data into the new array. We "resize" the array.
    - We may modify our implementation in this manner:


```java
public void addLast(int element) {
    if (size == array.length) {
        int[] temp = new int[size+1];
        System.arraycopy(array, 0, temp, 0, size);
        array = temp;
    }
    array[size] = element;
    size++;
}
```

## Analyzing the Naive Resizing Array
- Right now, our `AList` only increases size by 1 every time we need to go over the limit.
    - With every resizing, we effectively have to create and fill the current size amount of memory boxes to fully migrate our data.
    - Inserting items over the limit into our `AList` is a task of quadradic complexity as the amount of new memory boxes we need to create increases.
- Thus, adding new memory boxes one by one is much too slow. Instead, if we opt for a geometric resizing method.
    - We now would increase the amount of memory boxes that we have through a multiplicative factor, rather than an additive method.
- The following represents an additive versus a geometric factor of allocating memory:


```java
public void resize(int new_size) {
    int[] temp = new int[new_size];
    System.arraycopy(array, 0, temp, 0, size);
    array = temp;
}
```


```java
public void addLastGeometric(int element) {
    if (size == array.length) {
        resize(size + RFACTOR);
    }
    array[size] = element;
    size++;
}
```


```java
public void addLastGeometric(int element) {
    if (size == array.length) {
        resize(size * RFACTOR);
    }
    array[size] = element;
    size++;
}
```

## Memory Performance
- There is a new issue with our current implementation. If we extend our array size by a massive amount, and then remove many elements, this leaves many memory boxes unused but also taken up by the data structure.
- We may then specify a certain usage ratio that represents how much of the Array is being occupied with data.
    - `Usage Ratio = size / array.length`
    - The array should be downsized once usage ratio is below a certain threshold. Typically, size is halaved when R decreases below than 0.25.
- Since we reduce the size of our ArrayList with removeLast, we can add a check in removeLast to implement this feature


```java
public void removeLast(int element) {
    array[size] = 0
    size--;
    if ((double) size/array.length < DOWNSIZE_THRESHOLD) {
        resize(size/2);
    }
}
```

## Generic ALists
- The method to implement a generic AList differs than our DLList because the Java array does not accept generics. We must use the following syntax:


```java
T[] array = (T []) new Object[8]
```

- We would also have to null out any items that we delete, so Java won't erase them so long as we have a reference to our list still.
- Our final implementation looks like this:


```java
public class AList<T> {
    private T[] array;
    private int size;
    private static final int RFACTOR = 2;
    private static final double DOWNSIZE_THRESHOLD = 0.25;

    public AList() {
        this.array = (T []) new Object[1000];
        this.size = 0;
    }

    private void resize(int new_size) {
        T[] temp = (T []) new Object[new_size];
        System.arraycopy(this.array, 0, temp, 0, this.size);
        this.array = temp;
    }

    public void addLast(T element) {
        if (this.size == this.array.length) {
            resize(this.size * this.RFACTOR);
        }
        this.array[this.size] = element;
        this.size++;
    }

    public T removeLast() {
        T itemToReturn = this.array[this.size];
        this.array[this.size] = null;
        size--;
        if ((double) this.size/this.array.length < this.DOWNSIZE_THRESHOLD) {
            resize(this.size/2);
        }
        return itemToReturn;
    }

    public T get(int i) {
        if (i >= this.size) {
            throw new IndexOutOfBoundsException("Index " + i + " is out of bounds for AList with size " + this.size);
        }
        return array[i];
    }

    public T getLast() {
        return get(size-1);
    }

    public T getFirst() {
        return get(0);
    }

    public int size() {
        return size;
    }
}

AList<Integer> test = new AList<Integer>();
for (int i = 0; i < 10000; i++) {
    test.addLast(i);
}
test.get(9999);
```




    9999




```java

```
