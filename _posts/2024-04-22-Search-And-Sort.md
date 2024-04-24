---
title: Binary Search and Merge Sort
description: Exploring the binary search and merge sort algorithms
toc: True
layout: post
type: hacks
comments: True
---

# BubbleSort
BubbleSort is an iterative sorting algorithm that sorts a collection of objects by swapping adjacent objects if they are in the incorrect order. The algorithm performs multiple passes over the array until it detects no swaps have been made, by which it then stops execution as the array has been sorted.

# BubbleSort Pseudo-code

```text
BUBBLESORT(A[], n)
    for i = 0 to n - 1
        for j = n downto i + 1
    if A[j] < A[j - 1]
        swap(A[j], A[j-1])
```

# BubbleSort Code
Given this incomplete code below, fill in the blanks so that the algorithm works as intended


```java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (I forgot what to put here) {
                if (arr[j] < arr[j - 1]) {
                    // Code here
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.print("Sorted array is: ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}

BubbleSort.main(null);

```

    Sorted array is: 11 12 22 25 34 64 90 

# Insertion Sort
Insertion Sort is probably the simplest of all sorting algorithms, and the most intuitive. We select a value and compare it to other values until it's properly sorted. This means we need to traverse through all the values in the array twice, once to select the value and once to compare it to the other values. Thus, you traverse through the array n times, then n times again. This allows us to figure out it's time complexity, which is O(n^2).

## Pseudocode
We start by selecting the second element of the array and compare it to the 1st. If our selected element is smaller than the 1st, we swap them. We repeat this over and over again until the list is sorted.

```text
INSERTION-SORT(Array)
    for index = 0 to length of Array, incrementing index by 1 every time
        value1 = Array[index]
        // Insert value1 into the sorted array
        compareIndex = index + 1
        while compareIndex < length of Array and Array[indexToSort] > key
            Array[indexToSort + 1] = Array[indexToSort]
            indexToSort = indexToSort - 1
            Array[indexToSort + 1] = key
```


```java
private static void printArray(int[] array) {
    for (int i:array) {
        System.out.print(i + " ");
    }
    System.out.println();
}

public class insertionSort {
    public static int[] insertionSort(int[] array) {
        for (int i=1; i<array.length; i++) {
            int key=array[i];
            int j=i-1;
            while (j>=0 && array[j] > key) {
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = key;
        }
        return array;
    }
}

int[] array = {5, 3, 7, 2, 8, 1, 9, 4, 0, 6};
printArray(insertionSort.insertionSort(array));
```

    0 1 2 3 4 5 6 7 8 9 


# Selection Sort
Selection Sort is an iterative sorting algoritm that repeatedly moves elements into their properly sorted locations in the array. In selection sort, our procedure keeps tracks of two subarrays, a sorted subarray, and an unsorted half. As we iterate through the array, we select the smallest element from the unsorted half of the array and append it to the sorted half. With each subsequent iteration, we are effectively constructing the array in increasing order.

```text
function Selection-Sort(A[],N)
    for i = 0 to N-1 do:
       Smallsub = i
       For j = i + 1 to N-1 do:
            If A[j] < A[Smallsub]
            Smallsub = J
       temp = A[I]
       A[I] = A[Smallsub]
       A[Smallsub] = temp
```

# Popcorn Hack

1. Given the pseudo-code for selection sort, rewrite the algorithm in Java such that it sorts in decreasing order, rather than increasing order.

# MergeSort
MergeSort is a sorting algorithm that relies on recursion to solve what is commonly known as a "divide-and-conquer" problem. Essentially, the problem of sorting an array (or any collection of objects really) can be broken down into sub problems which can be recursively solved to be combined into a final solution.

In the context of sorting, imagine an initial array of length n. We can reduce the "size" of the problem by passing a smaller size, maybe "n/2", back into our algorithm for a simpler calculation, reducing the complexity. We repeat this process until we hit a sub array of size 1, which is a trvially easy case: the "array" is already sorted. From this point and onwards, we use a procedure called merge to repeatedly re-combine these smaller elements into larger sorted elements, until we eventually get back to the original n length array which should be sorted.


## MergeSort Pseudo-code
```text
MERGE-SORT(A, p, r)  
if p >= r               // zero or one element?  
    return   
q = ⌊p + r/2⌋            // midpoint of A[p,r]  
MERGE-SORT(A, p, q)     // recursively sort A[p,q]  
MERGE-SORT(A, q+1, r)   // recursively sort A[q+1:r]  
// Merge A[p:q] and A[q+1:r] into A[p:r].  
MERGE(A, p, q, r)  
```

## MergeSort Code


```java
class MergeSort {
    private static void mergeSort(ArrayList<Integer> array, int left, int right) {
        if (left < right) {
            int mid = (left+right-1)/2;
            mergeSort(array, left, mid);
            mergeSort(array, mid+1, right);
            merge(array, left, mid, right);
        }
    }

    private static void merge(ArrayList<Integer> array, int left, int mid, int right) {
        // create temp arrays
        ArrayList<Integer> leftSubArray = new ArrayList<Integer>();
        ArrayList<Integer> rightSubArray = new ArrayList<Integer>();

        for (int i = left; i <= mid; i++) {
            leftSubArray.add(array.get(i));
        }

        for (int j = mid+1; j <= right; j++) {
            rightSubArray.add(array.get(j));
        }

        int i = 0; int j = 0; int k = left;
        while (i < leftSubArray.size() && j < rightSubArray.size()) {
            if (leftSubArray.get(i) <= rightSubArray.get(j)) {
                array.set(k, leftSubArray.get(i));
                i++;
                k++;
            } else {
                array.set(k, rightSubArray.get(j));
                j++;
                k++;
            }
        }

        while (i < leftSubArray.size()) {
            array.set(k, leftSubArray.get(i));
            i++;
            k++;
        }

        while (j < rightSubArray.size()) {
            array.set(k, rightSubArray.get(j));
            j++;
            k++;
        }
    }

    public static void main(String args[]) {
        ArrayList<Integer> array = new ArrayList<Integer>();
        array.add(4); array.add(7); array.add(6); array.add(1); array.add(3); array.add(9); 
        System.out.println("Before array: " + array);
        mergeSort(array, 0, array.size()-1);
        System.out.println("After array: " + array);
    }

}

MergeSort.main(null);
```

    Before array: [4, 7, 6, 1, 3, 9]
    After array: [1, 3, 4, 6, 7, 9]


## Popcorn Hack
1. The current implementation of MergeSort sorts our array in increasing order (least to greatest). Can you adjust this implementation such that it sorts in the inverse order, that is, decreasing order (greatest to least)?


```java
// Code Here
```

# QuickSort
QuickSort is another divide-and-conquer algorithm that typically operates via recursion. While the sub-problems in mergesort was to repeatedly sort each subarray, the sub-problem in quicksort is to sort each individual element into their rightful place.  

| Vocab | Definition |
| - | - |
| Pivot | any element that we select to be sorted into the right position while partitioning the array into two halves |
| Partition | The act of splitting the array into two subarrays, reducing the complexity of the problem |

Essentially, the QuickSort algorithm selects a random pivot element with each function call. The algorithm then "partitions" the array around this pivot element, moving all elements lesser than the pivot below the pivot, and all elements greater than the pivot above the pivot. This is done using a procedure "partition" which also returns the index of the sorted pivot element. The index of the sorted pivot element is then used in subsequent calls of the algorithm, where quicksort is called to sort the two remaining unsorted subarrays, until the whole array is sorted.

## QuickSort Pseudo-code
```text
function Quick-Sort(A[], start, end)				
    if start >= end then					    	
        return						            						            
    pivot_index = partition(A[], start, end)	
    Quick-Sort(A[], start, pivot_index – 1)		
    QUICKSORT(A[], pivot_index + 1, end)		

function partition(A[], start, end)			
    pivot_value = A[end]				        
    pivot_index = start					        
    for index from start to end				
        if A[index] <= pivot_value			
            temp = A[index]        		    
            A[index] = A[pivot_index]	
            A[pivot_index] = temp			
            pivot_index = pivot_index + 1		    					            							        
    return pivot_index – 1					 
```


## Hacks

1) Based on the Pseudo-code, what do you think is the exit case for Quick-Sort and Merge-Sort?  

2) Given the Pseudo-code for Quick-Sort, implement the algorithm in Java where the pivot element uses the LAST value rather than the first value in the array  

3) Does the pivot we select for Quick-Sort matter?
