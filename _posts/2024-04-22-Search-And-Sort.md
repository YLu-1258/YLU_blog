---
title: Binary Search and Merge Sort
description: Exploring the binary search and merge sort algorithms
toc: True
layout: post
type: hacks
comments: True
---

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
        System.out.println(array);
        mergeSort(array, 0, array.size()-1);
        System.out.println(array);
    }

}

MergeSort.main(null);
```

    [4, 7, 6, 1, 3, 9]
    [1, 3, 4, 6, 7, 9]


## Popcorn Hack
The current implementation of MergeSort sorts our array in increasing order (least to greatest). Can you adjust this implementation such that it sorts in the inverse order, that is, decreasing order (greatest to least)?
