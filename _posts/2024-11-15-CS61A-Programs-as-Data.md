---
title: 'CS61A: Programs as Data'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-11-15 1:00:00 -0800
math: True
tags: ['CS61A', 'Scheme']
---

# Programs as Data
- Scheme programs consist of expressions that can either be **primitive* or **combinations**.
- The built-in Scheme list data structure (a linked list) is used to represent combinations.
    - Thus, by using Scheme to construct lists, we may construct programs.
- Ex: Create and evaluate a scheme program using scheme.


```python
scm> (list 'quotient 10 2)
(quotient 10 2)
scm> (eval (list 'quotient 10 2))
5
```

- If we want to create such an expression, we must quote any procedures such that they are represented as a symbol, and not the procedure itself.
    - Eval would then evaluate the symbol.
- Ex: Write a scheme procedure to print out an expression that gives us the answer to a factorial.


```python
scm> (define (fact-expr n)
    (if (<= n 1) 
        1
        (list '* n (fact-expr (- n 1)))
    )
)
fact-expr
scm> (fact-expr 5)
(* 5 (* 4 (* 3 (* 2 1))))
scm> (eval (fact-expr 5))
120
```

- Ex: Write a sceme procedure to print out an expression that gives us the nth fibonacci number


```python
scm> (define (fib-expr n)
    (cond 
        ((= n 0) 0)
        ((<= n 1) 1)
        (else `(+ ,(fib-expr (- n 1)) ,(fib-expr (- n 2))))
    )
)
fib-expr
scm> (fib-expr 6)
(+ (+ (+ (+ (+ 1 0) 1) (+ 1 0)) (+ (+ 1 0) 1)) (+ (+ (+ 1 0) 1) (+ 1 0)))
scm> (eval (fib-expr 6))
8
```

# Quasiquotation
- Quasiquotation allows us to unquote part of an expression
    - Denoted in scheme using a backtick (`)
    - Use a comma (,) to unquote/escape


```python
scm> (define b 4)
b
scm> '(a ,(+ b 1))
(a (unquote (+ b 1)))
scm `(a ,(+ b 1))
(a 5)
```

- This technique is useful for generating scheme expressions
- Ex: constructing an adding procedure:


```python
scm> (define (make-add-procedure n) `(lambda (d) ,(+ d ,n)))
make-add-procedure
scm> (makeadd-procedure 2)
(lambda (d) (+ d 2))
```

- Ex: While statements
- What is the sum of the squares of even numbers less than 10, starting with 2?


```python
scm> (begin (define (f x total)
    (if (< x 10)
        (f (+ x 2) (+ total (* x x)))
        total
    )
)
(f 2 0))

120
```

- What is the sum of the numbers whose squares are less than 50, starting with 1?


```python
scm> (begin (define (f x total)
    (if (< (* x x) 50)
        (f (+ x 1) (+ total x))
        total
    )
)
(f 1 0))

28
```

- Now, we may write a write procedure to just generate this code for us.


```python
(define (sum-while initial-x condition add-to-total update-x)
   `(begin 
        (define (f x total)
            (if ,condition
                (f ,update-x (+ total ,add-to-total))
                total
            ))
        (f ,initial-x 0)
    )
) 
```


```python
scm> (sum-while 1 '(< (* x x) 50) 'x '(+ x 1))
(begin (define (f x total) (if (< (* x x) 50) (f (+ x 1) (+ total x)) total)) (f 1 0))
scm> (eval (sum-while 1 '(< (* x x) 50) 'x '(+ x 1)))
28
```
