---
title: 'CS61A: Lambda Expressions'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-09-08 12:00:00 -0800
tags: ['CS61A', 'Lambda Expressions']
---

# Lambda Expressions
- Expressions that evaluate to a function.
    - We can directly assign a name to a function without defining it in our frame with `def`


```python
x = 10
square = x * x              # This expression evaluates to a number
square = lambda x : x * x   # This expression evaluates to a function
square(10)
```




    121



- Lambda syntax:
    - `lambda <formal parameter> : <return value>`
    - "A function with formal parameter that returns the value of return value."
- The lambda expression is limited to only have a single expression as its return value.
    - Cannot have any additional statements.

## Lambda Expressions Versus Def Statements
<table>
    <tr>
        <th>Lambda</th>
        <th> Both </th>
        <th>Def</th>
    </tr>
    <tr>
        <td><code>square = lambda x: x * x</code></td>
        <td></td>
        <td>
            <code>
                def square(x):
                    return x * x
            </code>
        </td>
    </tr>
    <tr>
        <td> First creates a function with no name, then an assignment statement binds the function to the name</td>
        <td> Same parent (frame in which they were defined) </td>
        <td>Both binding and function creation happens as a byproduct of def statement (intrinsic naming)</td>
    </tr>
</table>
- Hence, the environmental diagrams for lambda functions and def statements are different.
    - Instead of writing a name for the lambda, we denote the function and the frame name as "λ".
    - However, names can still be bound to the function within a frame.

