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

### Comparable object
First we create a comparable object for our flowers.


```java
public class Flower implements Comparable<Flower> {
    private int numberPetals;
    private String name;
    private String color;

    public Flower(int p, String n, String c) {
        this.numberPetals = p;
        this.name = n;
        this.color = c;
    }

    // Getters
    public int getNumberPetals() {
        return numberPetals;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    // Setters
    public void setNumberPetals(int numberPetals) {
        this.numberPetals = numberPetals;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return this.name;
    }

    @Override
    public int compareTo(Flower otherFlower) {
        return this.toString().compareTo(otherFlower.toString());
    }
}

public class GenerateNecklace {
    public static ArrayList<Comparable> generate() {
        // Create an ArrayList to store Flower objects
        ArrayList<Comparable> flowerNecklace = new ArrayList<>();

        // Add Flower objects to the ArrayList
        flowerNecklace.add(new Flower(5, "Rose", "Red"));
        flowerNecklace.add(new Flower(6, "Lily", "White"));
        flowerNecklace.add(new Flower(4, "Tulip", "Yellow"));
        flowerNecklace.add(new Flower(8, "Daisy", "Pink"));
        flowerNecklace.add(new Flower(3, "Sunflower", "Yellow"));
        flowerNecklace.add(new Flower(5, "Carnation", "Pink"));
        flowerNecklace.add(new Flower(7, "Orchid", "Purple"));
        flowerNecklace.add(new Flower(4, "Daffodil", "Yellow"));
        flowerNecklace.add(new Flower(6, "Peony", "Pink"));
        flowerNecklace.add(new Flower(5, "Hibiscus", "Red"));
        return flowerNecklace;
    }
}

ArrayList<Comparable> FlowerNecklace = GenerateNecklace.generate(); 
```


```java
public class BubbleSort {
    public static void bubbleSort(ArrayList<Comparable> list) {
        int n = list.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (list.get(j).compareTo(list.get(j + 1)) > 0) {
                    // Swap list[j] with list[j+1]
                    Comparable temp = list.get(j);
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }
}
ArrayList<Comparable> FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
BubbleSort.bubbleSort(FlowerNecklace);
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
```

    Flower Necklace before sort: [Rose, Lily, Tulip, Daisy, Sunflower, Carnation, Orchid, Daffodil, Peony, Hibiscus]
    Flower Necklace before sort: [Carnation, Daffodil, Daisy, Hibiscus, Lily, Orchid, Peony, Rose, Sunflower, Tulip]



```java
public class InsertionSort {
    public static void insertionSort(ArrayList<Comparable> list) {
        for (int i = 1; i < list.size(); i++) {
            Comparable key = list.get(i);
            int j = i - 1;
    
            while (j >= 0 && list.get(j).compareTo(key) > 0) {
                list.set(j + 1, list.get(j));
                j--;
            }
            list.set(j + 1, key);
        }
    }
}

ArrayList<Comparable> FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
InsertionSort.insertionSort(FlowerNecklace);
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
```

    Flower Necklace before sort: [Rose, Lily, Tulip, Daisy, Sunflower, Carnation, Orchid, Daffodil, Peony, Hibiscus]
    Flower Necklace before sort: [Carnation, Daffodil, Daisy, Hibiscus, Lily, Orchid, Peony, Rose, Sunflower, Tulip]



```java
public class SelectionSort {
    public static void selectionSort(ArrayList<Comparable> list) {
        int n = list.size();
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (list.get(j).compareTo(list.get(minIndex)) < 0) {
                    minIndex = j;
                }
            }
            // Swap the found minimum element with the first element
            Comparable temp = list.get(minIndex);
            list.set(minIndex, list.get(i));
            list.set(i, temp);
        }
    }
}

ArrayList<Comparable> FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
SelectionSort.selectionSort(FlowerNecklace);
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
```

    Flower Necklace before sort: [Rose, Lily, Tulip, Daisy, Sunflower, Carnation, Orchid, Daffodil, Peony, Hibiscus]
    Flower Necklace before sort: [Carnation, Daffodil, Daisy, Hibiscus, Lily, Orchid, Peony, Rose, Sunflower, Tulip]



```java
public class QuickSort{
    public static void quickSort(ArrayList<Comparable> list, int low, int high) {
        if (low < high) {
            int pi = partition(list, low, high);
            quickSort(list, low, pi - 1);
            quickSort(list, pi + 1, high);
        }
    }
    
    private static int partition(ArrayList<Comparable> list, int low, int high) {
        Comparable pivot = list.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (list.get(j).compareTo(pivot) < 0) {
                i++;
                Comparable temp = list.get(i);
                list.set(i, list.get(j));
                list.set(j, temp);
            }
        }
        Comparable temp = list.get(i + 1);
        list.set(i + 1, list.get(high));
        list.set(high, temp);
        return i + 1;
    }
}

ArrayList<Comparable> FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
QuickSort.quickSort(FlowerNecklace, 0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
```

    Flower Necklace before sort: [Rose, Lily, Tulip, Daisy, Sunflower, Carnation, Orchid, Daffodil, Peony, Hibiscus]
    Flower Necklace before sort: [Carnation, Daffodil, Daisy, Hibiscus, Lily, Orchid, Peony, Rose, Sunflower, Tulip]



```java
public class MergeSort {
    public static void mergeSort(ArrayList<Comparable> list) {
        if (list.size() > 1) {
            int mid = list.size() / 2;
            ArrayList<Comparable> left = new ArrayList<>(list.subList(0, mid));
            ArrayList<Comparable> right = new ArrayList<>(list.subList(mid, list.size()));
    
            mergeSort(left);
            mergeSort(right);
    
            merge(list, left, right);
        }
    }
    
    private static void merge(ArrayList<Comparable> list, ArrayList<Comparable> left, ArrayList<Comparable> right) {
        int i = 0, j = 0, k = 0;
        while (i < left.size() && j < right.size()) {
            if (left.get(i).compareTo(right.get(j)) <= 0) {
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
}

ArrayList<Comparable> FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
MergeSort.mergeSort(FlowerNecklace);
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
```

    Flower Necklace before sort: [Rose, Lily, Tulip, Daisy, Sunflower, Carnation, Orchid, Daffodil, Peony, Hibiscus]
    Flower Necklace before sort: [Carnation, Daffodil, Daisy, Hibiscus, Lily, Orchid, Peony, Rose, Sunflower, Tulip]


## Implementation using Linked List
Linked list implementation is provided below and I also implemented merge sort for it.


```java
class FlowerNode {
    Flower flower;
    FlowerNode next;

    public FlowerNode(Flower flower) {
        this.flower = flower;
        this.next = null;
    }
}

public class FlowerNecklace {
    private FlowerNode head;
    private int size;

    public FlowerNecklace() {
        head = null;
        size = 0;
    }

    public void add(Flower flower) {
        FlowerNode newNode = new FlowerNode(flower);
        if (head == null) {
            head = newNode;
        } else {
            FlowerNode current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }

    @Override
    public String toString() {
        FlowerNode current = head;
        String res = "";
        while (current != null) {
            res += "(Name: " + current.flower.getName() + ", Petals: " + current.flower.getNumberPetals() + ", Color: " + current.flower.getColor() + ") -> ";
            current = current.next;
        }
        res+="null";
        return res;
    }

    public int size() {
        return size;
    }

    public FlowerNode getHead() {
        return head;
    }

    public void setHead(FlowerNode head) {
        this.head = head;
    }

}

public class GenerateLinkedNecklace {
    public static FlowerNecklace generate() {

        FlowerNecklace flowerNecklace = new FlowerNecklace();
        flowerNecklace.add(new Flower(5, "Rose", "Red"));
        flowerNecklace.add(new Flower(6, "Lily", "White"));
        flowerNecklace.add(new Flower(4, "Tulip", "Yellow"));
        flowerNecklace.add(new Flower(8, "Daisy", "Pink"));
        flowerNecklace.add(new Flower(3, "Sunflower", "Yellow"));
        flowerNecklace.add(new Flower(5, "Carnation", "Pink"));
        flowerNecklace.add(new Flower(7, "Orchid", "Purple"));
        flowerNecklace.add(new Flower(4, "Daffodil", "Yellow"));
        flowerNecklace.add(new Flower(6, "Peony", "Pink"));
        flowerNecklace.add(new Flower(5, "Hibiscus", "Red"));
        return flowerNecklace;
    }
}

GenerateLinkedNecklace.generate()
```




    (Name: Rose, Petals: 5, Color: Red) -> (Name: Lily, Petals: 6, Color: White) -> (Name: Tulip, Petals: 4, Color: Yellow) -> (Name: Daisy, Petals: 8, Color: Pink) -> (Name: Sunflower, Petals: 3, Color: Yellow) -> (Name: Carnation, Petals: 5, Color: Pink) -> (Name: Orchid, Petals: 7, Color: Purple) -> (Name: Daffodil, Petals: 4, Color: Yellow) -> (Name: Peony, Petals: 6, Color: Pink) -> (Name: Hibiscus, Petals: 5, Color: Red) -> null




```java
public class MergeSortFlowerNecklace {
    // Method to perform merge sort on the given linked list
    public static FlowerNode mergeSort(FlowerNode head) {
        // Base case: if the list is empty or has only one element, it is already sorted
        if (head == null || head.next == null) {
            return head;
        }

        // Find the middle of the list
        FlowerNode middle = getMiddle(head);
        FlowerNode nextOfMiddle = middle.next;
        middle.next = null;

        // Recursively sort the left and right halves of the list
        FlowerNode left = mergeSort(head);
        FlowerNode right = mergeSort(nextOfMiddle);

        // Merge the sorted halves
        return merge(left, right);
    }

    // Method to merge two sorted linked lists
    private static FlowerNode merge(FlowerNode left, FlowerNode right) {
        FlowerNode dummy = new FlowerNode(null);
        FlowerNode tail = dummy;

        // Compare the values of the nodes and merge them in ascending order
        while (left != null && right != null) {
            if (left.flower.compareTo(right.flower) <= 0) {
                tail.next = left;
                left = left.next;
            } else {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }

        // Append any remaining elements from the left or right lists
        if (left != null) {
            tail.next = left;
        } else {
            tail.next = right;
        }

        // Return the head of the merged list
        return dummy.next;
    }

    // Method to find the middle node of the linked list
    private static FlowerNode getMiddle(FlowerNode head) {
        if (head == null) {
            return head;
        }
        FlowerNode slow = head;
        FlowerNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}

FlowerNecklace flowerNecklace = GenerateLinkedNecklace.generate();
System.out.println("Flower Necklace before sort: " + flowerNecklace);
flowerNecklace.setHead(MergeSortFlowerNecklace.mergeSort(flowerNecklace.getHead()));
System.out.println("Flower Necklace before sort: " + flowerNecklace);
```

    Flower Necklace before sort: (Name: Rose, Petals: 5, Color: Red) -> (Name: Lily, Petals: 6, Color: White) -> (Name: Tulip, Petals: 4, Color: Yellow) -> (Name: Daisy, Petals: 8, Color: Pink) -> (Name: Sunflower, Petals: 3, Color: Yellow) -> (Name: Carnation, Petals: 5, Color: Pink) -> (Name: Orchid, Petals: 7, Color: Purple) -> (Name: Daffodil, Petals: 4, Color: Yellow) -> (Name: Peony, Petals: 6, Color: Pink) -> (Name: Hibiscus, Petals: 5, Color: Red) -> null
    Flower Necklace before sort: (Name: Carnation, Petals: 5, Color: Pink) -> (Name: Daffodil, Petals: 4, Color: Yellow) -> (Name: Daisy, Petals: 8, Color: Pink) -> (Name: Hibiscus, Petals: 5, Color: Red) -> (Name: Lily, Petals: 6, Color: White) -> (Name: Orchid, Petals: 7, Color: Purple) -> (Name: Peony, Petals: 6, Color: Pink) -> (Name: Rose, Petals: 5, Color: Red) -> (Name: Sunflower, Petals: 3, Color: Yellow) -> (Name: Tulip, Petals: 4, Color: Yellow) -> null



```java

```


```java

```
