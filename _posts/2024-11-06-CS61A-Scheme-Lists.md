---
title: 'CS61A: Scheme Lists'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-11-06 1:00:00 -0800
math: True
tags: ['CS61A', 'Scheme']
---

# Lists
- Every list in Scheme is a linked list.
- Names for linked list:
    - **cons:** Two-argument procedure that creates a linked list
    - **car:** Procedure that returns the first element of a list
    - **cdr:** Procedure that returns the rest of a list
    - **nil:** The empty list.
- Scheme lists are written in parentheses with elements separated by spaces.
- Ex:


```python
(cons 1 (cons 2 nil))
```

- This creates a linked-
