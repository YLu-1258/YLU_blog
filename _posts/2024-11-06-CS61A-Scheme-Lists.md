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
(define x (cons 1 (cons 2 nil)))
```

- This creates a linked-list with the elements 1 and 2.
- To retrieve 1:


```python
(car x) # 1
```

- To retrieve the rest of the list:


```python
(cdr x) # (2)
```

- To retrieve 2:


```python
(car (cdr x)) # 2
```

- Lists in scheme are displayed as a collection of values:


```python
(cons 1 cons(2 cons(3 cons(4 nil))))
# This outputs
(1 2 3 4)
```

- Like our python implementation of a linked list, the list in scheme is also capable of nesting lists within lists.


```python
scm> (define s (cons 1 (cons 2 nil)))
scm> (define n (cons s (cons 3 (cons 4 nil))))
# n is now equivalent to
scm> n
((1 2) 3 4)
```

- Ex: What is (cons s (cons s nil))


```python
scm> (cons s (cons s nil))
((1 2) (1 2))
```

## Builtin List functions
- `list?`: Checks if an object is a list.
    - `nil`, the empty list, is a list.
- `null?`: Checks if a list is an empty list or not
- `list`: Creates a new linked list fwith the provided arguments.

# Symbolic Programming
- List introduces the idea of symbolic programming.
    - We manipulate lists of symbols which represent things in the real world as structured objects.
    - We may manipulate entire equations with lisp, instead of only evaluating equations.
- Symbols typically refer only to values.
    - In list, we may refer to the symbol itself.
    - Ex: 
        - `(define a 1)` a is a symbol for 1
        - `(define b 2)` b is a symbol for 2
        - `(list a b)`
            - This would give a list `(1 2)`, there is no existance of an "a" and "b". There are no symbols in this list.
- However, through quotation, we may refer to symbols directly.
    - We only use 1 single quote at the start.
    - Ex:
        - `(list 'a b)` would give a list `(a 2)` as we indicate that the expression `a` itself is the value. We do not evaluate `a`.
    - The `'` is short hand for the quote expression `(quote)`
- Quotation may be used/applied to combinations to form lists:


```python
scm> '(a b c)
(a b c)
scm> (car `(a b c))
a
scm> (cdr `(a b c))
(b c)
```

- Quoting a list would produce a list, but all expressions within the list are quoted as well.
- We may also quote a nested expression to create lists that has lists as some of its elements


```python
scm> '(1 (2 3) 4)
(1 (2 3) 4)
```

# List Processing
- There are various built-in list procedures
    - `(append s t)`: list the elements of s and t. Combines them into one list
    - `(map f s)`: call a procedure f on each element of a list s and list the results
    - `(filter f s)`: call a procedure f on each element of a list s and list the elements for which a true value is the result.
    - `(apply f s)`: call a procedure f with the elements of a list as its arguments.

# Example: Even Subsets
- A non-empty subset of a list s is a list containing some of the elements of s.
- Create a procedure that generates non-empty subsets of an integer list s that have an even sum
- For each element in the list we perform the following:
    - If the element is even, we just add that element to our solution
    - Additionally:
        - If the element is even, we append it to all even subsets of the rest of s
        - If the element is odd, we append it to all odd subsets of s
- Final solution is:
    - All even-subsets of the rest of s
    - All even-subsets constructed with the first element of s with the possible subsets of the rest of s.
- We stop recursing once the list is nil.


```python
(define (even-subsets s)
    (if (null? s)
        nil
        (append 
            (even-subsets (cdr s))
            (map (lambda (x) (cons (car s) x)) 
                (if (even? (car s))
                    (even-subsets (cdr s))
                    (odd-subsets (cdr s))
                )
            )
            (if (even? (car s)) (list (list (car s))) nil)
        )
    )
)

(define (odd-subsets s)
    (if (null? s)
        nil
        (append 
            (odd-subsets (cdr s))
            (map (lambda (x) (cons (car s) x)) 
                (if (even? (car s))
                    (odd-subsets (cdr s))
                    (even-subsets (cdr s))
                )
            )
            (if (odd? (car s)) (list (list (car s))) nil)
        )
    )
)
```

- We may reduce redundancy in the code by a higher order function


```python
(define (even-subsets s)
    (if (null? s)
        nil
        (append 
            (even-subsets (cdr s))
            (subset-helper even? s)
        )
    )
)

(define (odd-subsets s)
    (if (null? s)
        nil
        (append 
            (odd-subsets (cdr s))
            (subset-helper odd? s)
        )
    )
)

(define (subset-helper f s)
    (append (map (lambda (x) (cons (car s) x)) 
        (if (f (car s))
            (even-subsets (cdr s))
            (odd-subsets (cdr s))
        )
    )
    (if (f (car s)) (list (list (car s))) nil))
)
```

- Alternative method using filter


```python
(define (even-subsets s)
    (filter (lambda (x) (even? (apply + x))) (subsets s))
)

(define (subsets s)
    (if (null? s)
        nil
        (append 
            (subsets (cdr s))
            (list (list (car s)))
            (map (lambda (x) (cons (car s) x)) (subsets (cdr s)))
        )
    )
)
```
