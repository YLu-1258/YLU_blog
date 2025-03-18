---
title: Asymptotics
author: alex
badges: True
comments: True
categories: ['CS61B']
date: 2025-02-07 1:00:00 -0800
math: True
tags: ['CS61B', 'Data Structures', 'Asymptotics', 'JAVA']
---

# Asymptotic Analysis
- We want to be able to characterize the runtime of two algorithms using a mathematically rigorous method.
    - One classification should be superior to another algorithm
- Consider the problem of finding duplicates in a list. We have a naive and a fast solution:


```java
public class RuntimeAnalysis {
    public static boolean naive(int[] array) {
        for (int i = 0; i < array.length; i++) {
            for (int j = i+1; i < array.length; j++) {
                if (array[i]==[array[j]]) {
                    return true;
                }
            }
        }
        return false;
    }

    public static boolean better(int array) {
        for (int i = 0; i < array.length-1; i++) {
            if (array[i+1] == array[i]) {
                return true;
            }
        }
        return false;
    }
}
```

# Technique 1
- We may directly measure the execution time in seconds of a program using some experimental method.
    - Use a physical stopwatch.
    - Use Unix `time` command.
    - Use the Princeton standard library which has a `stopwatch` class.
- Cons of this approach:
    - The analysis would take as long as the program execution. Could take a long time.
    - Runtimes vary on different machines, compilers, data, so we would get a different time every time.

# Technique 2A
- We may count the total number of operations completed by each algorithms instead. This is machine independent.
- However, this is still tedious to compute because there are a lot of operations we need to keep track of. With an arbitrary input size, we do not know the actual runtime of our program.

# Technique 2B
- For this to work with data with arbitrary lengths, we can calculate the counts in terms of the input size `N`.
- This is called **Symbolic Counting**. This enables us to see how the algorithm scales with input size. 
- If we calculate the symbolic counting of each operation in the fast approach vs the naive approach, we see that the fast approach performs much better than the slow approach in the worst case scenario.
- Some operations in the naive approach scales quadratically $N^2$, while the worst case scaling in the fast approach scales linearly $N$.
    - We observe that parabolas ($N^2$) always grow faster than lines ($N$).

# Asymptotic Behavior
- In runtime analysis, we are concerned about what happens for large values of $N$. Scalable algorithms have better asymptotic runtimes than those that scale poorly.
- Thus, we want to characterize the runtimes of our programs with a simple yet rigorous manner. Technique 2B demonstrates the superiority of an algorithm, but it is not simple nor mathematically rigourous.
    - We apply simplifications to solve these issues.

## Simplification 1: Consider Only the Worst Case.
- We only care about the worst case when we compare algorithms.
- We take the symbolic counts of various operations and observe the worst case count, or the fastest rate of growth operation and use that as our measure:
- Ex:
<table>
    <tr>
        <th>Operation</th>
        <th>Count</th>
    </tr>
    <tr>
        <td>less than (<)</td>
        <td>100N^2+3N</td>
    </tr>
    <tr>
        <td>greater than (>)</td>
        <td>N^3+1</td>
    </tr>
    <tr>
        <td>and (&&)</td>
        <td>5000</td>
    </tr>
</table>
- In this case, we would categorize our program as a cubic program as cubic functions always grow faster than any quadratic function.

## Simplification 2: 
- We pick a certain operation to act as a proxy for our overall runtime.
    - Typically this operation is the operation with the worst runtime scaling.
- The chosen operation is the **cost model**

## Simplification 3:
- We ignore all lower order terms as the higher order term dominates the growth.

## Simplification 4: Eliminate Multiplicative Constants
- Multiplicative constants are just constants. Functions with the same order but different multiplicative constants belong to the same family of functions or shapes.

# Simplified Analysis Process
- The simplified analysis process includes finding the cost model and figuring out its order of growth.
- Ex:


```java
int N = A.length;
for (int i = 0; i < N; i += 1)
   for (int j = i + 1; j < N; j += 1)
      if (A[i] == A[j])
         return true;
return false;
```

- In this example, we chose our cost model to be the comparison operator `==`
- We see that the inner loop is ran $i$ times for each $i$ up until $N-1$
    - This gives us a total of $\frac{N(N-1)}{2}$ operations that occur
    - Applying simplification rules, we get that this runs in $O(N^2)$

# Big-Theta
- We use big theta notation to categorize certain functions as belonging to a family of functions with a certain order of growth.
    - A function that has order of growth of something belongs to $\Theta(\text{something})$
- We may mathematically describe this relationship as:
    - For some function $R(N)$ with order of growth $f(N)$, we write that:
$$
    
    R(N) \in \Theta(f(N)) \text{ if there exists positive constants } k_1, k_2 \text{ such that }\\
    \exists N_0, \forall N>N_0,k_1\cdot f(N)\leq R(N)\leq k_2\cdot f(N) 
$$

## Big-O
- Big Theta represents a rough region/family of functions that correlates with our symptotic.
- Big-O represents an upper bound on whatever function we have, we disregard a lowerbound for our function.
- Ex:
    -  $N^3+3N^4\in\Theta(N^4)$
    -  $N^3+3N^4\in O(N^4)$
    -  $N^3+3N^4\in O(N^6)$
    -  $N^3+3N^4\in O(N^{N!})$
- A formal definition of this is:
$$
    
    R(N) \in O(f(N)) \text{ if there exists positive constant } k_1\text{ such that }\\
    \exists N_0, \forall N>N_0, R(N)\leq k_1\cdot f(N) 
$$
