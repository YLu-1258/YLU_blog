---
title: CS61A: Multiple Environments
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-08-31 02:00:00 -0800
tags: ['CS61A', 'Environmental Diagrams']
---

# Multiple Environments
## Tracing a User-Defined Function
<table>
    <tr>
        <th>Code</th>
        <th>Behind the Scenes</th>
    </tr>
    <tr>
        <td> Def Statement </td>
        <td> A new function is created! <br> The name is bounded to the function in the current frame </td>
    </tr>
    <tr>
        <td>Call expression</td>
        <td>Evaluate the operator and the operand <br> The functions is called on the arguments</td>
    </tr>
    <tr>
        <td> Performing the function call </td>
        <td> A new frame is created! <br> The function parameters are bound to the arguments <br> The body executes in the new environment </td>
    </tr>
</table>

## Multiple Environments in One Diagram
- Remember, the earlier the frame is, the more towards the bottom it is in the environmental diagram.
- For nested functions, we first evaluate whatever the operands of the function is.
    - We first draw a new frame for the operand function.
    - We then pass the return value of the operand function to the operator function.
- **<mark>Environment == Sequence of frames</mark>**
    - Only a global frame
    - local frame followed by a global frame.
    - we can find any given environment by following the parents of the frames.
- **Names have no meaning without an environment.**
    - Every expression is evaluated in the context of an environment.
        - This means that any name is evaluated to the value which is bound to that name in the earliest frame of the current environment containing the name.

### Names can have different meanings in different Environments
- This is because different environments have different combinations of frames.
    - Within each frame, there is a possibility of a particular name being defined to another value.
- It is important to note that a call expression and the actual function body are evaluated in seperate environments.
    - The call expression belongs to a parent frame (a "later" environment)
    - The function body creates another frame (an "earlier" environment)
    - Because of this, we have have functions that have the same name as their parameters.



```python

```
