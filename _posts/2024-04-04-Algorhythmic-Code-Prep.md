---
title: Algorhythmic Code Prep
description: The coding assignment for the algorhythmic coding assignment.
toc: True
layout: post
type: hacks
comments: True
---

## Learn All Sorts
I had previously implemented all of these sorts in a project with David and Ethan, so it was pretty easy to recreate this in plain old Java again.


```java
import java.util.ArrayList;

public class BubbleSort {
    public static void bubbleSort(ArrayList<Integer> list) {
        int n = list.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (list.get(j) > list.get(j + 1)) {
                    int temp = list.get(j);
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }

    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(64);
        list.add(25);
        list.add(12);
        list.add(22);
        list.add(11);

        System.out.println("List before sorting:");
        System.out.println(list);

        bubbleSort(list);

        System.out.println("List after sorting:");
        System.out.println(list);
    }
}

BubbleSort.main(null);
```

    List before sorting:
    [64, 25, 12, 22, 11]
    List after sorting:
    [11, 12, 22, 25, 64]



```java
import java.util.ArrayList;

public class SelectionSort {
    public static void selectionSort(ArrayList<Integer> list) {
        int n = list.size();
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (list.get(j) < list.get(minIndex)) {
                    minIndex = j;
                }
            }
            int temp = list.get(minIndex);
            list.set(minIndex, list.get(i));
            list.set(i, temp);
        }
    }

    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(64);
        list.add(25);
        list.add(12);
        list.add(22);
        list.add(11);

        System.out.println("List before sorting:");
        System.out.println(list);

        selectionSort(list);

        System.out.println("List after sorting:");
        System.out.println(list);
    }
}

SelectionSort.main(null);

```

    List before sorting:
    [64, 25, 12, 22, 11]
    List after sorting:
    [11, 12, 22, 25, 64]



```java
import java.util.ArrayList;

public class InsertionSort {
    public static void insertionSort(ArrayList<Integer> list) {
        for (int i = 1; i < list.size(); i++) {
            int key = list.get(i);
            int j = i - 1;

            while (j >= 0 && list.get(j) > key) {
                list.set(j + 1, list.get(j));
                j--;
            }
            list.set(j + 1, key);
        }
    }

    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(64);
        list.add(25);
        list.add(12);
        list.add(22);
        list.add(11);

        System.out.println("List before sorting:");
        System.out.println(list);

        insertionSort(list);

        System.out.println("List after sorting:");
        System.out.println(list);
    }
}

InsertionSort.main(null);
```

    List before sorting:
    [64, 25, 12, 22, 11]
    List after sorting:
    [11, 12, 22, 25, 64]



```java
import java.util.ArrayList;

public class MergeSort {
    public static void mergeSort(ArrayList<Integer> list) {
        if (list.size() > 1) {
            int mid = list.size() / 2;
            ArrayList<Integer> left = new ArrayList<>(list.subList(0, mid));
            ArrayList<Integer> right = new ArrayList<>(list.subList(mid, list.size()));

            mergeSort(left);
            mergeSort(right);

            merge(list, left, right);
        }
    }

    private static void merge(ArrayList<Integer> list, ArrayList<Integer> left, ArrayList<Integer> right) {
        int i = 0, j = 0, k = 0;
        while (i < left.size() && j < right.size()) {
            if (left.get(i) < right.get(j)) {
                list.set(k++, left.get(i++));
            } else {
                list.set(k++, right.get(j++));
            }
        }
        while (i < left.size()) {
            list.set(k++, left.get(i++));
        }
        while (j < right.size()) {
            list.set(k++, right.get(j++));
        }
    }

    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(64);
        list.add(25);
        list.add(12);
        list.add(22);
        list.add(11);

        System.out.println("List before sorting:");
        System.out.println(list);

        mergeSort(list);

        System.out.println("List after sorting:");
        System.out.println(list);
    }
}

MergeSort.main(null);
```

    List before sorting:
    [64, 25, 12, 22, 11]
    List after sorting:
    [11, 12, 22, 25, 64]



```java
import java.util.ArrayList;

public class QuickSort {
    public static void quickSort(ArrayList<Integer> list, int low, int high) {
        if (low < high) {
            int pi = partition(list, low, high);
            quickSort(list, low, pi - 1);
            quickSort(list, pi + 1, high);
        }
    }

    private static int partition(ArrayList<Integer> list, int low, int high) {
        int pivot = list.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (list.get(j) < pivot) {
                i++;
                int temp = list.get(i);
                list.set(i, list.get(j));
                list.set(j, temp);
            }
        }
        int temp = list.get(i + 1);
        list.set(i + 1, list.get(high));
        list.set(high, temp);

        return i + 1;
    }

    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(64);
        list.add(25);
        list.add(12);
        list.add(22);
        list.add(11);

        System.out.println("List before sorting:");
        System.out.println(list);

        quickSort(list, 0, list.size() - 1);

        System.out.println("List after sorting:");
        System.out.println(list);
    }
}

QuickSort.main(null);
```

    List before sorting:
    [64, 25, 12, 22, 11]
    List after sorting:
    [11, 12, 22, 25, 64]


## Implementation using Linked List
