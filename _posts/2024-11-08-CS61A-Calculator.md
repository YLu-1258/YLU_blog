---
title: 'CS61A: Calculator'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-11-08 1:00:00 -0800
math: True
tags: ['CS61A', 'Scheme', 'Calculator']
---

# Exceptions
- Exceptions allow us to raise an error for unexpected behaviors
- We may raise exceptions with the raise statement in Python:



```python
raise <expression>
```

- Expression must evaluate to a subclass of `BaseException` or an instance of one.
- Exceptions are objects too. They are constructred like other objects.
- Types of exceptions
    - `TypeError`: A function was passed the wrong number/type of argument
    - `NameError`: A name wasn't found
    - `KeyError`: A key wasn't found in a dictionary
    - `RecursionError`: Too many recursive calls


```python
abs("Hello")
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[1], line 1
    ----> 1 abs("Hello")


    TypeError: bad operand type for abs(): 'str'


- We may raise custom errors of our own with messages.
- Ex:


```python
raise TypeError("This is a custom error!")
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[2], line 1
    ----> 1 raise TypeError("This is a custom error!")


    TypeError: This is a custom error!


# Try Statements
- The reason that exceptions have types is that they both describe an error but also allows the language to handle expcetions differently.
- Default behavior of an exception is that the program halts and displays an error emssage
- Try statements allow the program to continue executing even with an exception. We just perform some alternative action if the error occurs


```python
try:
    <try suite>
except <exception class> as <name>:
    <except suite>
```

- If any exceptions occur within the try suite, the except suite would be ran immediately.
- We may also assign a name to the error to access it.
- Execution flow:
    - The `<try suite>` is executed first
    - If, during the course of executing the `<try suite>` an exception is raised that is not handled otherwise, and if the class of the exception inherits from `<exception class>`, then the `<except suite>` is executed, with `<name>` bound to the exception.

## Handling Exceptions
- Exception handling prevents a program from terminating:


```python
try:
    x = 1/0
except ZeroDivisionError as e:
    print('handling a', type(e))
    x = 0

print(x)
```

    handling a <class 'ZeroDivisionError'>
    0


- We may now handle unexpected user behavior: baby-proofing
- Ex: Reducing a Sequence to a Value:


```python
from operator import truediv

def reduce(f, s, initial):
    """Combine elements of s pairwise using f, starting with initial.
    
    >>> reduce(mul, [2 4 8], 1)
    8
    """
    if not s:
        return initial
    return reduce(f, s[1:], f(initial, s[0]))

def divide_all(n, ds):
    try:
        return reduce(truediv, ds, n) 
    except ZeroDivisionError:
        return float('inf')
    
print(divide_all(1024, [2, 4, 8]))
print(divide_all(1024, [2, 4, 0, 8]))
```

    16.0
    inf


- There is a separation of concerns here, reduce doesn't have to worry about what errors it may cause. Division would handle the case of a ZeroDivisionError.
    - This allows for a specialization of reduce.

# Programming Languages
- An interpreter is a program that takes code written in the programming language as input and executes the code to create the behavior of the program.
- Scheme is powerful but has few rules. Can be easily implemented in Python.
- Programs may be thought of as trees of expressions. Interpreters work through tree recursion.
- Computers execute programs written in various programming languages
    - **Machine Languages:** statements are interpreted by the hardware itself
        - A fixed set of instructions invoke operations implemented by the CPU.
        - Has limited access to its own memory, but has ways to access additional memory in caches, main memory, and computer disks.
        - Cannot change the programming language itself without changing the computer circuitry.
        - Harder to program in beacuse operations refer to specific hardware memory addresses and there are no abstraction mechanisms.
    - **High-level languages:** statements and expressions are interpreted by another program or compiled into another language.
        - Interpreting: reading the program and executing behavior
        - Compiling: Translating the language to machine language.
        - Provides means of abstraction such as naming, function definition, and objects.
        - Abstracts away system details to be independent of hardware and operating system.
            - THe same program can run on different operating systems or hardware.
- Modern languages mix compilation and interpretation. Statements are compiled just in time as if they were interpreted.
- High-level languages are built on other high level languages
    - Machine language is used to build the compiler for the C language (a higher level language) which is then used to create an interpreter for python.
- Python is compiled into python 3 byte code.

## Metalinguistic Abstraction
- Another type of abstration is to define a new language that is tailored to a particular type of application or problem domain.
    - Ex: Erlang was created for concurrent programs. It has built-in elements for expressing concurrent communication, and is used in cases such as chat servers with many simultaneous connections.
    - Ex: MediaWiki mark-up language was designed for generating static web pages. It has built-in elements for text formatting and cross-page linking. Used for blogging.
- A programming language has:
    - **Syntax:** THe legal statements and expressions in the language.
    - **Semantics:** The execution/evaluation rule for those statements and expressions.
- A new programming language requires:
    - **Specification:** A document taht describes the precise syntax and semantics of the language.
    - **Canonical Implementation:** An interpreter or compiler for the language. 

# Parsing
- To implemented a programming language, we must first parse the program text into a structure easy for interpretation
    - Scheme is a tree-based language.
    - Parsing converts scheme text into an expression tree so the program may be evaluated.

## Reading Scheme Lists
- We must read scheme lists and convert them into an interpretable structure.
- A scheme list is written as elements in  parenthesis, but each element can be a combination of other statements, or a primative expression.
- We must parse this string representation into a scheme representation.
    - In scheme, expressions are represented as Pairs (linked list)
- Parsing has two parts
    - A parser takes text and returns an expression.
    - Texts are converted into tokens using **Lexical analysis** which are then converted into an expression using **Syntactic analysis**.
    - Tokens are symbols representing atomic units of the programming language. 
    - Syntatic analysis is a tree-recursive processes that balances parenthesis and also returns a tree structure containing the tokens.
- Syntatic analysis identifies the hierarchical struct ure of an expression, which may be nested.
    - The base case are atomic symbols and numbers
    - Recursive calls are `scheme_read` calls on sub-expressions and combining them.
    - The `scheme_read` function only ends when the ending parenthesis is found.

# Evaluation
- The Eval function evaluates an expression in the language represented as a scheme_list.
    - It computes the value of an expression
    - It is a generic function that dispatches on the type of the expression (primitive or call).
- For a calculator program:
    - A number evaluates to itself
    - A scheme list applies the rest of the scheme list (evaluated arguments) to the operator (first argument)
    
# Interpreters
- Interpreters have a Read-Eval-print Loop
    - Print a prompt
    - Read text input from the user.
    - Parse the text input into an expression.
    - Evaluate the expression.
    - If any errors occur, report those errors, otherwise, print the value of the expression and repeat.
- Exceptions are raised within lexical analysis to ensure that the code is well formed.
- An interpreter should not halt on an error, but rather provide information about the error.
- Parsing and evaluation are both placed in a try statement that catches any errors.

