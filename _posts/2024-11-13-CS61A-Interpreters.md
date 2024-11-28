---
title: 'CS61A: Interpreters'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-11-10 1:00:00 -0800
math: True
tags: ['CS61A', 'Scheme', 'Calculator', 'Interpreters']
---

# Interpreting Scheme
- There are two parts to an interpreter
    - **Eval:** The eval evaluates primitive and combined expressions. It calls apply to apply a procedure to certain arguments in expressions.
    - **Apply:**: Applys a specific procedure onto the provided arguments to retrieve a result.
- Both of these parts are mutually recursive, while eval is also recursive to itself.

## The Eval Function
- The base case of the eval function are primitive values (numbers), or values that are bound to symbols.
- The recursive calls must evaluate the operators and the operands themselves.
    - Eval is recursively called on all of the arguments until they are reduced down to a primitive. Special forms may also be arguments, and they are also evaluated.
    - The apply function is then called with the operator and the reduced arguments.

## The Apply Function
- The base case are built-in primitive procedures
- The recursive calls of Apply on a user-defined procedure will repeatedly call eval on the body of the user-defined procedure.

## Environments
- Eval must be given an environment so that it could properly look up names bound to symbols in that environment.
- The environments that are used by Eval are created when Apply is ran on a user-defined feature.

# Special Forms
- The scheme_eval function dispatches on expression forms, different actions are performed on different expressions:
    - Symbols are bound to values in the current environment.
    - Self-evaluating expressions are returned.
    - All other legal expressions in scheme are represented as Scheme lists, called combinations.
- Special forms are identified by the first list element. All other expressions that are not special forms are just call expressions.


```python
(if <predicate> <consequent> <alternative>)
(lambda (<formal-parameters>) <body>)
(define <name> <expression>)
```

- Ex: The following is a user-defined procedure that appends 3 to the end of a scheme list


```python
(define (demo s)
    (if (null? s)
        '(3) ; must be a list containing 3
        (cons (car s) (demo (cdr s)))
    )
)
```

# Logical Forms
- Logical special forms involve conditions and may only evaluate certain some sub-expressions.
    - **If** expression: 
        - `(if <predicate> <consequent> <alternative>)`
    - **And** and **or**:
        - `(and <e1> ... <en>)`
        - `(or <e1> ... <en>)`
        - And may short circuit if any of the expressions prematurely evaluates to false.
        - Or may short circuit and return the first value that happens to be true.
    - **Cond** expression:
        - `(cond (<p1 e1>) (<p2 e2>) ... (<pn en>) <else e>)`
        - Enables elif clauses.
- The value of an **if** expression is the value of a sub-expression
    - Evaluate the predicate.
    - Chose a sub-expression `<consequent>` or `alternative`, and evaluate that sub-expression in the place of the whole expression.
    - Keep in mind, the only things that are evaluated within an if statement is the predicate and the relevant sub-expression. The `if` keyword itself is not evaluated.
    - The other expression is never evaluated

# Quotation
- The quote special form evaluates to a quoted expression that is not evaluated.
    - The `<expression>` is the value of the expression.
    - `'<expression>` is shorthand for `(quote <expression>)`
- Ex:


```python
scm> (quote (+ 1 2))
(+ 1 2)
```

# Lambda Expression
- Lambda expressions evaluate to user-defined procedures.
    - Evaluating a lambda expression yields a new procedure.
    - A lambda expression has formal parameters and a body.
    - `(lambda (<formal-parameters>) <body>)`
- Ex:


```python
scm> (lambda (x) (* x x))
```

- Besides formals and a body, the first frame within the environment in which the lambda procedure was defined is bound to the environment.

## Frames and Environments
- A frame represents an environment by having a parent frame.
- We may `lookup` and `define` names.
- When names are evaluated, they are looked up in the current frame, followed by the parent frames, until the parent frame.

# Define Expressions
- Define expressions bound a symbol to a value in the first frame of the current environment.
    - `(define <name> <expression>)`
- Execution procedure:
    - Evaluate the `<expression>`.
    - Bind `<name>` to its value in the current frame.
- Ex:


```python
scm> (define x (+ 1 2))
x
scm> x
3
```

- Procedure definition with define is just shorthand for lambda expression. Thus, the following two expressions are complete equivalent and are interpreted the same way:
    - `(define (<name> <formal parameters>) <body>)`
    - `(define <name> (lambda (<formal parameters>) <body>))`
- Applying User-Defined Procedures
    - To apply a user-defined procedure, create a new frame where formal parameters are bound to argument values, and the parent is the `env` of the procedure (that is, the environment where the procedure was originally defined).
    - Evaluate the body of the procedure in the environment that starts with the new frame that was created.
- CS61A Scheme environments do not have return values attached to them.

# Dynamic Scope
- The way that names are looked up in Scheme and Python is called **lexical scope** (or **static scope**).
- **Lexical Scope:** The parent of a frame is the environment in which a procedure was *defined*
- **Dynamic Scope:** The paernt of a frame is the environment in which a procedure was *called*.
- Ex:
    - If we were to use lexical scoping, then the parent frame of f would be the global frame, so scheme would not be able to find the value that y represents.
    - If we were to to use dynamic scoping, then the parent frame of f would be g's frame, in which we assigned 7 to the symbol y, so we'd get 13.


```python
scm> (define f (lambda (x) (+ x y)))
f
scm> (define g (lambda (x y) (f (+ x x))))
g
scm> (g 3 7)
```
