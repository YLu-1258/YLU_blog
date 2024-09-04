---
title: 'CS61A: Conditional Statements'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-02 02:00:00 -0800
tags: ['CS61A', 'Conditional']
---

# Statements
- **Statements** are executed by the interpreter to *perform an action*
- A **Compound Statement** is a statement that can span over multiple lines.
    - A **Clause** is a single header followed by a series of statements
        - The statements within a clause is known as the **Suite**
- An example of a compound statement is a function declaration.
    - The suite of a function is known as the function body.


```python
<header>:           // The first header determines the type of a statement
    <statement>
    <statement>
    ...
<separating header>:    // Headers of a clause "controls" the suite that follows
    <statement>
    <statement>
    ...
...
```

- When we execute a suite, we run the sequence of the statements within the suite in order.
- **Execution Rule:**
    - Execute the first statement
    - Unless instructed otherwise, execute the remaining statements.

## Conditional Statement
- **Execution rule for conditional statements:**
    1) Evaluate the header's expression  
    2) If the header's expression returns true, execute the suite and then skip the remaining clauses.  

- Only one suite gets executed in a conditional statement.
- **George Boole:** Logician. 
    - Boolean contexts are about expressions that either evaluate to true or false.
        - Ex: `x < 0` or `x == 0`
- False values in Python: `False`, `0`, `''`, `[]`, `None`
- True values in Python: `True`, Anything else



```python
def absolute_value(x):
    """Return the absolute value of x."""
    if (x<0):
        return -x
    elif x == 0:
        return 0
    else:
        return x

absolute_value(-2)
```




    2


