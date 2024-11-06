---
title: 'CS61A: Efficiency'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-10-21 1:00:00 -0800
math: True
tags: ['CS61A', 'OOP', 'Efficiency']
---

# Measuring Efficiency
- Efficiency is the measure of how long our program would take to run.
- Ex: The recursive computation of the fibonacci sequence



```python
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n-2) + fib(n-1)
```

- For tree recursive algorithms, a way to measure the efficiency is to see how many function calls our program requires to compute the final return value.
    - Ex: fib(5) requires 15 function calls.
- We may implement a way to count how many calls fib requires.


```python
def count(f):
    def counted(n):
        counted.call_count += 1
        return f(n)
    counted.call_count = 0
    return counted

fib = count(fib)
fib(5)
print("Number of calls for fib(5):", fib.call_count)
fib.call_count = 0
fib(30)
print("Number of calls for fib(30):", fib.call_count)
```

    Number of calls for fib(5): 15
    Number of calls for fib(30): 2692537


- From this experiment, we can see that the jump in funtion calls from fib(5) to f(30) is very dramatic
    - The reason for this is we recompute the same values many times over. 
    - We can speed this up if we didn't perform so many redundant calculations!

# Memoization
- **Memoization**: A technique to speed up the running time of a program by storing/remembering the values that have been computed before.
- We may create another decorator function `memo` to memoize the results of our recursive function to make it more efficient


```python
def memo(f):
    cache = {} # Keys of the cache are arguments that map to return values
    def memoized(n):
        if n not in cache:
            cache[n] = f(n)
        return cache[n]
    return memoized # Same behavior as f if f is a pure function
```

- Our decorator works properly only for pure functions. If we had a non-pure function, then our decorator would not always execute our function.
- Only pure functions may be memoized and still have the behavior be the same, as the total number of function executions are changed.


```python
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n-2) + fib(n-1)
    

fib = count(fib)
counted_fib = fib
fib = memo(fib)
fib = count(fib)
```


```python
fib(30)
print(fib.call_count)
print(counted_fib.call_count)
```

    59
    31


- The process for the Memoized function is as below:
![Memoized Tree Recursion](assets/img/CS61A/Efficiency/MemoizedTreeRecursion.png)  
- For each value of n, `fib(n)` is called exactly once, and their value in the cache is accessed exactly once, except for n and n-1.

# Exponentiation
- Lets write an exponentiation function in two ways
- Goal: One more multiplication lets us double the problem size, we may cover twice as many exponents with every increase in function calls.
- **Method 1**: Incremental recursive definition of recursion
$$ b^n = \left\{ \begin{array}{cl}
1 & : \ \text{if } n = 0 \\
b \cdot b^{n-1} & : \ \text{otherwise}
\end{array} \right. $$

    


```python
def exp(b, n):
    if n == 0:
        return 1
    else:
        return b * exp(b, n-1)
```

- Method 1 does not achieve our goal for efficiency, as every increase in the exponent results in an additional function call that we have to perform.
- **Method 2**: Split by half every time
$$ b^{n} = \left\{ \begin{array}{cl}
1 & : \ \text{if } n = 0 \\
(b^{\frac{1}{2}n})^{2} & : \ \text{if n is even} \\
b \cdot b^{n-1} & : \ \text{if n is odd}
\end{array} \right. $$


```python
def exp_fast(b, n):
    square = lambda x: x * x
    if n == 0:
        return 1
    elif n % 2 == 0:
        return square(exp_fast(b, n//2))
        # return exp(b, n//2) * exp(b, n//2) DO NOT DO THIS, THIS IS INEFFICIENT
    elif n % 2 == 1:
        return b * exp_fast(b, n-1)
```

- `exp_fast` is an example of linear recursion, as only one function is called at each step of recursion.
- In the case that n is even, `exp_fast` reduces the problem size by half, which provides us with even greater efficiency.

### Efficiency Analysis
- We may plot the efficiencies of both implementations:


```python
import matplotlib.pyplot as plt
plt.style.use('ggplot')
plt.rc('font', size=16)

from timeit import repeat
from numpy import median, percentile

def plot_times(name, xs, n=15):
    f = lambda x: name + '(' + str(x) + ')'
    g = globals()

    samples = []
    for _ in range(n):
        times = lambda x: repeat(f(x), globals=g, number=1, repeat=n)
        samples.append([median(times(x)) for x in xs])
    ys = [10e3 * median(sample) for sample in zip(*samples)]

    plt.figure(figsize=(8, 8))
    plt.plot(xs, ys)
    plt.xlabel('n')
    plt.xlabel('miliseconds')
```

- The graph of the times for `exp`:


```python
exp_2 = lambda n: exp(2, n)
plot_times('exp_2', range(20, 1600, 10))
```


    
![png](output_16_0.png)
    


- The graph of the times for `exp_fast`:


```python
exp_fast_2 = lambda n: exp_fast(2, n)
plot_times('exp_fast_2', range(20, 1600, 10))
```


    
![png](output_18_0.png)
    


- By looking at the graph of runtime for `exp`, we observe that the implementation is **linear in n**.
- By looking at the graph of runtime for `exp_fast`, we observe that the implementation is **logarithmic in n**.
    - We see that everytime we double the input, it only takes a constant amount of of extra work.
    - This efficiency is due to us making recursive calls on n that are only half the size of each preceding call.

### Comparison between linear and logarithmic time
<table>
    <tr>
        <th>Linear Time</th>
        <th>Logarithmic Time</th>
    </tr>
    <tr>
        <td>Doubling the input <b>doubles</b> the time</td>
        <td>Doubling the input <b>increases</b> the time by a constant C</td>
    </tr>
    <tr>
        <td>1024x the input takes 1024x as much time</td>
        <td>1024x the input increases the time by only 10 times C</td>
    </tr>
</table>

# Orders of Growth
- Orders of growth of a function's execution time is a general category for the function.
    - Functions of the same orders of growth scale similarily.

## Exponential Time
- Ex: Tree-recursive functions take exponential time


```python
def fib(n):
    """Compute the nth fibonacci number tree-recursively"""
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)
```

- We observe that the running time of `fib` scales exponentially comapred to the input size n. 
    - This is because the fib function has to do around 60% more work to compute an n that is one larger than the previous term.


```python
fibo_ranges = lambda n: fib(n)
plot_times('fibo_ranges', range(1, 30, 1))
```


    
![png](output_22_0.png)
    


## Quadratic Time
- Ex: Functions that process all pairs of values in a sequence of length n takes quadratic time


```python
def overlap(a, b):
    """Count the total number of overlaps between one list and another"""
    count = 0
    for i in a:
        for j in b:
            if i == j:
                count+=1
    return count

overlap([3, 5, 7, 6], [4, 5, 6, 5])
```




    3



- We observe that the running time of `overlap` scales quadratically comapred to the input size n. 


```python
overlap_ranges = lambda n: overlap(list(range(n)), list(range(n)))
plot_times('overlap_ranges', range(20, 200, 10))
```


    
![png](output_26_0.png)
    


## Common Orders of Growth
- Exponential growth:
    - Ex: Recursive `fib`
    - Incrementing n multiplies *time* by a constant.
    - Typically Tree recursive algorithms have this characteristic, unless we memoize.
    - Time for input n+1: $$ a \cdot b^{n+1} = (a\cdot b^{n})\cdot b$$
- Quadratic growth.
    - Ex: `overlap`
    - Incrementing n increases time by n times a constant.
    - The amount of time added at each increment gets bigger and bigger, but not as much as exponential.
    - Time for input n+1: $$ a \cdot (n+1)^2 = (a\cdot n^2) + a \cdot (2n+1)$$
- Linear growth.
    - Ex: slow `exp`
    - Incrementing n increases time by a constant.
    - This is typically what memoization helps us achieve.
    - Time for input n+1: $$  $$
- Logarithmic growth.
    - Ex: `exp_fast`
    - Really, really useful is n is large.
    - Doubling n only increments time by a constant.
- Constant growth.
    - Ex: Looking up the value in a hashmap/dictionary
    - Increasing n doesn't affect time.
