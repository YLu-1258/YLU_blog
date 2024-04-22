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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public abstract class FlowerCollectable implements Comparable<FlowerCollectable> {
    public final String masterType = "FlowerCollectable";
	private String type;
    protected int numberPetals;
    protected String name;
    protected String color;

    // Are we selling or buying the Flower?
    // @NotEmpty
    // private String operation;

    public interface KeyTypes {
		String name();
	}
	protected abstract KeyTypes getKey();

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
	public int compareTo(FlowerCollectable obj) {
		return this.toString().compareTo(obj.toString());
	}

    // Essentially, we record who buys the Flower (id), what Flower they bought (name), cost of the share (cost), amount of the shares (shares), time of the transaction (time), and whether it was bought or sold (operation)
    public FlowerCollectable(String name, String color, Integer numberPetals) {
        this.name = name;
        this.color = color;
        this.numberPetals = numberPetals;
    }
}
```


```java
public class Flower extends FlowerCollectable implements Iterable<Flower> {
    public enum KeyType implements KeyTypes {petals, name, color}
    public static KeyTypes key = KeyType.name;
	public void setOrder(KeyTypes key) {Flower.key = key;}

    public Flower(int p, String n, String c) {
        super(n,c,p);
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

    public String toString() {
        if (KeyType.petals.equals(Flower.key)) {
            return "(" + Integer.toString(this.numberPetals) + ")";
        } else if (KeyType.name.equals(Flower.key)) {
            return "(" + this.name + ")";
        } else if (KeyType.color.equals(Flower.key)) {
            return "(" + this.color + ")";
        } else {
            return "Invalid Key";
        }
    }

    public int compareTo(Flower otherFlower) {
        return this.toString().compareTo(otherFlower.toString());
    }

	protected KeyTypes getKey() { return Flower.key; }

    public Iterator<Flower> iterator() {
        List<Flower> sortedList = new ArrayList<>(Arrays.asList(this));
        sortedList.sort(Comparator.naturalOrder());
        return sortedList.iterator();
    }
}
```


```java
public class FlowerIterator implements Iterable<Flower> {
    private List<Flower> FlowerList;

    public FlowerIterator(List<Flower> FlowerList) {
        this.FlowerList = FlowerList;
    }

    public Integer size() {
        return this.FlowerList.size();
    }

    public void setKeyType(Flower.KeyType keyType) {
        // Update keyType for all Flowers in the iterator
        for (Flower Flower : FlowerList) {
            Flower.setOrder(keyType);
        }
    }

    public Iterator<Flower> iterator() {
        return FlowerList.iterator();
    }

    @Override
    public String toString() {
        String res = "[";
        for (Flower flower : FlowerList) {
            res = res + "(" + flower.getName() + ", " + flower.getColor() + ", petals: " + flower.getNumberPetals() + "), ";
        }
        return res.substring(0,res.length()-2) + "]";
    }

    public void mergeSort(int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(left, mid);
            mergeSort(mid + 1, right);
            merge(left, mid, right);
        }
    }

    private void merge(int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        List<Flower> leftList = new ArrayList<>(this.FlowerList.subList(left, mid + 1));
        List<Flower> rightList = new ArrayList<>(this.FlowerList.subList(mid + 1, right + 1));

        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (leftList.get(i).compareTo(rightList.get(j)) <= 0) {
                this.FlowerList.set(k++, leftList.get(i++));
            } else {
                this.FlowerList.set(k++, rightList.get(j++));
            }
        }

        while (i < n1) {
            this.FlowerList.set(k++, leftList.get(i++));
        }

        while (j < n2) {
            this.FlowerList.set(k++, rightList.get(j++));
        }
    }

    public void quickSort(int low, int high) {
        if (low < high) {
            int pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }
    
    private int partition(int low, int high) {
        Flower pivot = this.FlowerList.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (this.FlowerList.get(j).compareTo(pivot) < 0) {
                i++;
                Flower temp = this.FlowerList.get(i);
                this.FlowerList.set(i, this.FlowerList.get(j));
                this.FlowerList.set(j, temp);
            }
        }
        Flower temp = this.FlowerList.get(i + 1);
        this.FlowerList.set(i + 1, this.FlowerList.get(high));
        this.FlowerList.set(high, temp);
        return i + 1;
    }

    public void selectionSort() {
        int n = this.FlowerList.size();
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (this.FlowerList.get(j).compareTo(this.FlowerList.get(minIndex)) < 0) {
                    minIndex = j;
                }
            }
            // Swap the found minimum element with the first element
            Flower temp = this.FlowerList.get(minIndex);
            this.FlowerList.set(minIndex, this.FlowerList.get(i));
            this.FlowerList.set(i, temp);
        }
    }

    public void insertionSort() {
        for (int i = 1; i < this.FlowerList.size(); i++) {
            Flower key = this.FlowerList.get(i);
            int j = i - 1;
    
            // Iteratively move all elements greater than the current key to ahead of the key.
            while (j >= 0 && this.FlowerList.get(j).compareTo(key) > 0) {
                this.FlowerList.set(j + 1, this.FlowerList.get(j));
                j--;
            }
            this.FlowerList.set(j + 1, key);
        }
    }

    public void bubbleSort() {
        int n = this.FlowerList.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (this.FlowerList.get(j).compareTo(this.FlowerList.get(j + 1)) > 0) {
                    // Swap list[j] with list[j+1]
                    Flower temp = this.FlowerList.get(j);
                    this.FlowerList.set(j, this.FlowerList.get(j + 1));
                    this.FlowerList.set(j + 1, temp);
                }
            }
        }
    }
}
```


```java
public class GenerateNecklace {
    public static FlowerIterator generate() {
        // Create an ArrayList to store Flower objects
        ArrayList<Flower> flowerNecklace = new ArrayList<>();

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
        FlowerIterator iterator = new FlowerIterator(flowerNecklace);
        return iterator;
    }
}
FlowerIterator FlowerNecklace = GenerateNecklace.generate(); 
```

## BubbleSort

The sort is very simple, basically, the algorithm first iterates through all the elements, and for each element, the algorithm attempts to sort the previous elements in order by swapping neighboring elements until the final array is sorted.




```java
FlowerIterator FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("KEY: Name");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("name"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.bubbleSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: color");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("color"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.bubbleSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: petals");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("petals"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.bubbleSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
```

    KEY: Name
    ============================
    Flower Necklace before sort: [(Rose, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Sunflower, Yellow, petals: 3), (Carnation, Pink, petals: 5), (Orchid, Purple, petals: 7), (Daffodil, Yellow, petals: 4), (Peony, Pink, petals: 6), (Hibiscus, Red, petals: 5)]
    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]


    KEY: color
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: petals
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Sunflower, Yellow, petals: 3), (Daffodil, Yellow, petals: 4), (Tulip, Yellow, petals: 4), (Carnation, Pink, petals: 5), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Peony, Pink, petals: 6), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Daisy, Pink, petals: 8)]


## Insertion Sort

This sort algorithm is simimlar to bubble sort except it iterates through all elements of the array and then iteratively moves all elements greater than the current key to their correct position in a sorted sub array.


```java
FlowerIterator FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("KEY: Name");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("name"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.insertionSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: color");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("color"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.insertionSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: petals");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("petals"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.insertionSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
```

    KEY: Name
    ============================
    Flower Necklace before sort: [(Rose, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Sunflower, Yellow, petals: 3), (Carnation, Pink, petals: 5), (Orchid, Purple, petals: 7), (Daffodil, Yellow, petals: 4), (Peony, Pink, petals: 6), (Hibiscus, Red, petals: 5)]


    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: color
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: petals
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Sunflower, Yellow, petals: 3), (Daffodil, Yellow, petals: 4), (Tulip, Yellow, petals: 4), (Carnation, Pink, petals: 5), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Peony, Pink, petals: 6), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Daisy, Pink, petals: 8)]


## Selection Sort

I found this code the easiest to understand because the algorithm works by essentially moving the smallest element found to the beginning of the unsorted sub array on each iteration.


```java
FlowerIterator FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("KEY: Name");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("name"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.selectionSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: color");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("color"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.selectionSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: petals");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("petals"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.selectionSort();
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
```

    KEY: Name
    ============================
    Flower Necklace before sort: [(Rose, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Sunflower, Yellow, petals: 3), (Carnation, Pink, petals: 5), (Orchid, Purple, petals: 7), (Daffodil, Yellow, petals: 4), (Peony, Pink, petals: 6), (Hibiscus, Red, petals: 5)]


    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: color
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: petals
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Sunflower, Yellow, petals: 3), (Daffodil, Yellow, petals: 4), (Tulip, Yellow, petals: 4), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Carnation, Pink, petals: 5), (Lily, White, petals: 6), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Daisy, Pink, petals: 8)]


## Quick Sort

QuickSort is definitely one of the more complex algorithms that I have implmented. Unlike the previous iteractive approaches, it is most intuitive to perform QuickSort in a recursive manner. We have a partition method that sorts a given pivot element within a subarray. After running this partition method, we run the quickSort algorithm again on the two subarray separated by the pivot.


```java
FlowerIterator FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("KEY: Name");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("name"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.quickSort(0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: color");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("color"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.quickSort(0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: petals");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("petals"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.quickSort(0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
```

    KEY: Name
    ============================
    Flower Necklace before sort: [(Rose, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Sunflower, Yellow, petals: 3), (Carnation, Pink, petals: 5), (Orchid, Purple, petals: 7), (Daffodil, Yellow, petals: 4), (Peony, Pink, petals: 6), (Hibiscus, Red, petals: 5)]


    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: color
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Peony, Pink, petals: 6), (Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Orchid, Purple, petals: 7), (Rose, Red, petals: 5), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3)]
    KEY: petals
    ============================
    Flower Necklace before sort: [(Peony, Pink, petals: 6), (Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Orchid, Purple, petals: 7), (Rose, Red, petals: 5), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3)]
    Flower Necklace after sort: [(Sunflower, Yellow, petals: 3), (Daffodil, Yellow, petals: 4), (Tulip, Yellow, petals: 4), (Carnation, Pink, petals: 5), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Peony, Pink, petals: 6), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Daisy, Pink, petals: 8)]


## MergeSort

This is the most simple algorithm for me to understand because it's the one I've been working with in the past few days for Algorhythmic. Essentially, the mergeSort algorithm splits the array into it's elementary elements and reassembles the final sorted array by merging all elementary elements.


```java
FlowerIterator FlowerNecklace = GenerateNecklace.generate(); 
System.out.println("KEY: Name");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("name"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.mergeSort(0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: color");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("color"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.mergeSort(0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
System.out.println("KEY: petals");
System.out.println("============================");
FlowerNecklace.setKeyType(Flower.KeyType.valueOf("petals"));
System.out.println("Flower Necklace before sort: " + FlowerNecklace);
FlowerNecklace.mergeSort(0, FlowerNecklace.size()-1);
System.out.println("Flower Necklace after sort: " + FlowerNecklace);
```

    KEY: Name
    ============================
    Flower Necklace before sort: [(Rose, Red, petals: 5), (Lily, White, petals: 6), (Tulip, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Sunflower, Yellow, petals: 3), (Carnation, Pink, petals: 5), (Orchid, Purple, petals: 7), (Daffodil, Yellow, petals: 4), (Peony, Pink, petals: 6), (Hibiscus, Red, petals: 5)]
    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]


    KEY: color
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daffodil, Yellow, petals: 4), (Daisy, Pink, petals: 8), (Hibiscus, Red, petals: 5), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Peony, Pink, petals: 6), (Rose, Red, petals: 5), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    KEY: petals
    ============================
    Flower Necklace before sort: [(Carnation, Pink, petals: 5), (Daisy, Pink, petals: 8), (Peony, Pink, petals: 6), (Orchid, Purple, petals: 7), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Lily, White, petals: 6), (Daffodil, Yellow, petals: 4), (Sunflower, Yellow, petals: 3), (Tulip, Yellow, petals: 4)]
    Flower Necklace after sort: [(Sunflower, Yellow, petals: 3), (Daffodil, Yellow, petals: 4), (Tulip, Yellow, petals: 4), (Carnation, Pink, petals: 5), (Hibiscus, Red, petals: 5), (Rose, Red, petals: 5), (Peony, Pink, petals: 6), (Lily, White, petals: 6), (Orchid, Purple, petals: 7), (Daisy, Pink, petals: 8)]


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
    public static FlowerNode mergeSort(FlowerNode head) {
        // Base case: if the list is empty or has only one element, it is already sorted
        if (head == null || head.next == null) {
            return head;
        }


        FlowerNode middle = getMiddle(head);
        FlowerNode nextOfMiddle = middle.next;
        middle.next = null;


        FlowerNode left = mergeSort(head);
        FlowerNode right = mergeSort(nextOfMiddle);

        // Merge the sorted halves
        return merge(left, right);
    }

    // Method to merge two sorted linked lists, pretty standard merge procedure
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

        // Return the head of the merged list, remember TO ACTUALLY SET THE HEAD BRO
        return dummy.next;
    }

    // Method to find the middle node of the linked list
    // GOD BLESS LEETCODE FOR THIS QUESTION BRUH
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

