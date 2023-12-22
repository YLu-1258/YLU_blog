---
title: 2015 Practice Exam MCQ
author: alex
badges: True
comments: True
categories: ['collegeboard', 'MCQ']
date: 2023-12-21 06:05:00 -0800
tags: ['MCQ', 'collegeboard', 'APPREP']
week: 17
render_with_liquid: False
type: hacks
---

## Overall Score and Reflection
![Alt text](/assets/img/2015_MC/total.png)
Overall, I think I did pretty good on this Exam. I did get pretty close to the 40 minute time limit, but that's because I tried to solve each and every problem by myself, without external help from any other outside sources. The student lessons that we had in class was really helpful for this assignment, as I was able to remember all the important concepts like polymorphism, Array structures, classes and methods, and etc. I think that the two things that I could improve on is to read each question more carefully, (a tendency I'm still tryiung to fix from CSP) and also to practice a lot of similar questions from other online resources, which is also what got me the 5 in AP CSP.

## Questions that I got wrong
Below are the reflections for all the questions that I got wrong on this assignment

### Q9 Generate random value of number cubes
![Alt text](/assets/img/2015_MC/Q9.png)
My main pitfall with this problem was that I remembered incorrectly that casting a double to an int type in Java would round up. Because the random function generates any random number between 0 (inclusive) to 1 (exclusive), I thought that I just needed to find the sum of the two random() calls multiplied by 6. However, when casting to int, Java actually just truncates the double of it's decimal digits, which would be the equivalent of a floor function in math. Thus, the random function multiplied by 6 and then casted to an integer would always return a value between 0 and 5 inclusive. To account for this, we needed to add 2 to round each "random dice" to a range of 1-6, which would be what option **E** describes.

### Q19 Loop that prints nothing
![Alt text](/assets/img/2015_MC/Q9.png)
This problem was a small oversight on my part. I should've realized that because x starts with an odd number 1, that adding 2 each time to the variable will always result in an odd number. So when the conditional `if (x % 2 == 0)` executes, it will always fail no matter where the loop is in its execution. Thus, it wouldn't matter what we had as the condition, so one again, option **E** is right.

### Q21 whatsItDo with String parameter and substrings
![Alt text](/assets/img/2015_MC/Q21.png)
I got this problem wrong because I misinterpreted how the substring method in Java works. I had thought that the substring method took the first and last index exclusive, but alas, like every other Java method, it only includes the first arguemnt and excludes the last argument. Thus, instead of printing out the first word as "WATCH", it should've been "WATC". Thus, the right answer would've been **D**.

### Q22 Print values in 2D int array
![Alt text](/assets/img/2015_MC/Q21.png)
I got this problem incorrect because I confused myself with the row-major and column-major logic. The reason why my answer was wrong, is because it iterated over each column of the 2-D array, rather than each row. What this does, is that it prints the numbers and elements of the array in the order of the columns, so 142536, rather than the desired output, which is 123456. The correct answer would've been **A**. Option **A** utilizes a for-each loop to iterate over each row in the 2d array. It then uses another for-each loop to iterate over each element of each row in the 2d array, which gives us the row-major approach to iterate the 2D array, giving us the correct output of 123456.

### Q35 Iterative binarySearch of 1D int array
![Alt text](/assets/img/2015_MC/Q35.png)
I got this question wrong because I divided wrong. Yup. Essentially, binary search works by dividing the number of elements that we need to check by two with ever iteration. I just performed an arithmetic error towards the end when I accidentally rounded one of the intermediary steps too much. Because of this, I got a final answer of 6 rather than 5. To avoid these types of problems, I just need to review my artihmetic in future practices and exams to make sure that I calculate my answer correctly. For this question, the correct answer was thus, **C**

## Other questions of note that I found interesting

These are some of the other questions that took me a bit longer than usual to solve

### Q3 A and B Classes with show method
![Alt text](/assets/img/2015_MC/Q3.png)
I believe that this was one of two polymorphism problems in the entire exam. The main reason why I chose to highlight this question was because of it's simplicity, but also it's importance in shocasing how Polymorphism in Java works. Initially, I misinterpreted this problem because I thought it was testing me on down-casting. However, we really only use downcasting if we instantiate a variable of the type of a child object with it's parent. In this case, B is a child of A, so even if we create an object A, and assign it an object of type B, involking the show command will have the compiler running the child class B's version of the show command. And thus, option B is correct.

### Q5 Compound Boolean expression with x and y
![Alt text](/assets/img/2015_MC/Q5.png)
This question was interesting and fun because it was a logical puzzle. To do this, I intuitively considered the problem from the perspective of x first. If the overall statement were to be true, then both logical propositions, `x` and `( x || y)` must be true to satisfy the AND condition. If `x` is true, then both conditions are satisified. Thus, whenever x is true, then the whole expression is true. On the other hand, if x is false, then the overall statement would also be automatically false. This is because x automatically becomes false, which does not satisfy the AND ccondition. From these two inferences, we can see that it really doesn't matter what the value of y is, because x essentially dominates the whole expression. Thus, the right answer to this question was `A`