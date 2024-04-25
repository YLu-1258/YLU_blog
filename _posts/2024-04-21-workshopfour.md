---
title: 2D arrays Lesson
description: Exploring the uses and purpose of 2D arrays
toc: True
layout: post
type: hacks
comments: True
---

<h2>  8.1: Declaring + Initializing 2D Arrays; Determining their  </h2>

> Review: 
Arrays are a collection (list) of elements (primitive or object reference type data)  

So, a 2-Dimensional array is an array where the elements within that array are other arrays 

2D arrays can be better at storing certain types of information 

* Especially if the data represents a space, with rows and columns


Seating chart: 
| . | Column 1 | Column 2 | Column 3 | 
| - | - | - | - |
| Row 1 | Abby | Ben | Clara |  | 
| Row 2 | Ethan | Frank |  |  | 
| Row 3 | Isabelle | John | Kim | Leo | 

Note that this is a non-rectangular 2D array 

* Or if the data needs to be classified under categories 

| . | Month 1 | Month 2 | Month 3 | 
| - | - | - | - |
|  Winter | December | January | February |
|  Spring | March | April | May |
|  Summer | June | July | August |
|  Fall | Summer | October | November |

This is a rectangular 2D array. Non-rectangular 2D arrays are not a part of the CSA course


<h4> Declaring a 2D array </h2>

2D Arrays can be declared like this: 

``` datatype[][] nameofarray; ```

<h3> Initializing a 2D array </h3>

``` new datatype[r][c]; ```

r: number of rows (number of arrays)
<br>
c: number of columns (length of each array)


```java
public class Seasons {

    private String[][] Seasons = new String[2][3];

    // Or, if you already know what the elements should be:

    private String[][] Seasons2 = {
        {"December", "January", "February"},
        {"March", "April", "May"},
        {"June", "July", "August"},
        {"September", "October", "November"}
    };

}

```


### Size of 2D Arrays

The size of the 2D array is classified by number of rows by number of columns 

Number of rows can be found like this: 

``` r = trimestercourses.length ```

This would give the number of arrays within the 2D array, since each array is an element

For number of columns: 

``` c = trimestercourses[0].length ```

This finds the number of elements of the first array within the 2D array.


<h3> Accessing the Elements of a 2D Array </h3>

The elements of a 2D array can be accessed using index

``` seasons[0][2] ```


**Output: February**

the value in the first bracket is the index of the rows, or which array we are accessing. In this case, the 0th index means we are accessing the first array 

The value in the second bracket is the index within the array. So we are looking for the 2nd value within the first array.


To update the element of a 2D array, all you need to do is reference its location and change the value. 






```java
public class Seasons {

    private String[][] seasons = new String[2][3];

    private static String[][] seasons2 = {
        {"December", "January", "February"},
        {"March", "April", "May"},
        {"June", "July", "August"},
        {"September", "October", "November"}
    };

    public static void main(String[] args) {
        System.out.println(seasons2[0][2]);
        seasons2[0][2] = "Changed Value";  
        System.out.println(seasons2[0][2]);
    }
}

Seasons.main(null);


```

### Popcorn Hack:



```java
public class TrimesterGrades {

    private int[][] trimesterGrades = {
        {85, 90, 78, 92, 99}, // tri 1
        {92, 88, 91, 97, 80}, // tri 2
        {79, 85, 83, 95, 67}  // tri 3
    };

}
```

The 2D array keeps track of a students grade, grouped by each trimester. 
The student, currently in Trimester 3, retook a test in their 3rd period, which raised that grade to 90. 

Show how they would write code that changes the grade for the 3rd period class


```java
public class TrimesterGrades {

    private static int[][] trimesterGrades = {
        {85, 90, 78, 92, 99}, // tri 1
        {92, 88, 91, 97, 80}, // tri 2
        {79, 85, 83, 95, 67}  // tri 3
    };

    public static void main(String[] args) {
        trimesterGrades[2][2] = 90;
        for (int[] array : trimesterGrades) {
            for (int grade : array) {
                System.out.print(grade + " ");
            }
            System.out.println();
        }
    }
}

TrimesterGrades.main(null);
```

    85 90 78 92 99 
    92 88 91 97 80 
    79 85 90 95 67 


8.2 - Traversing 2D Arrays

- Learning Objective: Using nested + enhanced for loops to traverse arrays

- How to use a nested loop to traverse a 2d array
    - Have an outer loop to iterate through each row
    - Have an inner loop that iterates through each column
    - It traverses from left to right and goes up to down (ABCDE → FGHIJ)
![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/b93a73c1-8b76-4acb-a2f5-f51dc704f21c)


- How to use enhanced for loops
  - Get each row within the grid
  - Get each value within each row

![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/5f02267f-8a55-4248-8a9a-ca9be24fa2cd)


- How to traverse using row-major vs column-major order
- Row-major order: get each row and then get the columns in it
    - Make the outer loop for each row and the inner loop for the columns when using nested loops
    - Get each row in the grid and then get each letter in the row when using enhanced loops
- Column-major order: get each column and then get the rows in it
    - Can’t switch the row and col vars in the print statement
    - Have to switch the order that the row and column loops are in
    - Make the outer loop for each column and the inner loop for the row 

![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/dee9cdf9-9d6f-4b9c-b5e2-35cb9fa58c9b)


```java
public class RowMajorIndexing {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int rows = matrix.length;
        int cols = matrix[0].length;
        System.out.println("Row-major indexing:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int index = i * cols + j;
                System.out.println(matrix[i][j]);
            }
        }
    }
}
RowMajorIndexing.main(null)
```

    Row-major indexing:
    1
    2
    3
    4
    5
    6
    7
    8
    9



```java
public class ColumnMajorIndexing {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int rows = matrix.length;
        int cols = matrix[0].length;
        System.out.println("Column-major indexing:");
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                int index = i + j * rows;
                System.out.println(matrix[i][j]);
            }
        }
    }
}
ColumnMajorIndexing.main(null)
```

    Column-major indexing:
    1
    4
    7
    2
    5
    8
    3
    6
    9


- How to search for values in a 2d array
    - Use nested loops and in the inner loop make an if statement that returns True if a certain value is found
- Finding the max/min
    - Save the index of the extrema and in the inner loop have a comparison statement that determines that value

