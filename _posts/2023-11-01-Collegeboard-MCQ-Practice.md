---
title: 2014 Practice Exam MCQ
author: alex
badges: True
comments: True
categories: ['collegeboard', 'MCQ']
date: 2023-10-22 06:05:00 -0800
tags: ['MCQ', 'collegeboard', 'APPREP']
week: 11
render_with_liquid: False
type: hacks
---

## Q12 mystery method with substrings

![Q12](/assets/img/2014_MC/Q12.png)  

For this question, I had incorrectly thought that the program wouldn't compile because I didn't understand the substring method. I thought that the substring method's end index marked the last character that it would return from the string, but really, the last character grabbed by substring is `end_indice-1`, which would be within the bounds of the string. The correct answer should've been C.


```java
public String mystery(String input) {
    String output = "";
    for (int k = 1; k < input.length(); k = k+2) {
        output += input.substring(k, k+1);
    }
    return output;
}

mystery("computer");
```




    optr



# Q18 Generate random index for ArrayList
![Q12](/assets/img/2014_MC/Q18.png)  
In this question, I had confused the range of the random function. The random function will generate any value from 0 to 1, including 0 but excluding one. Multiplying this by the array size, and casting it to an integer primative ensures that the resutling index is within 0 to myList.size() - 1. `(int) (Math.Random()*myList.size())` would've been sufficient. 

# Q25 RBox interfaces
![Q25](/assets/img/2014_MC/Q25.png)  
In this question, I just had bad geometry. I failed to consider for the edge case where a rectangular box could have greater volume and surface area than another one, but not fit the other if even a single one of its dimensions were smaller. The collegeboard response provided such a scenario.

# Q30 RBox interfaces
![Q30](/assets/img/2014_MC/Q30.png)  
In this question, I had misread the code that was provided. The first substring begins at `howFar+1` which would be the 4th index, starting with "o" instead of "p". The right answer should've been "ilercom", and the second substring would end at `howFar-1`, which would be the second index at "m".


```java
public String scramble(String word, int howFar) {
    return word.substring(howFar + 1, word.length()) + word.substring(0, howFar);
}

scramble("compiler", 3)
```




    ilercom



# Q32 compute method with parameters n and k
![Q32](/assets/img/2014_MC/Q32.png)  
In this question, I had misread the code that was provided. I had thought the code within the loop said `answer*=i` but instead it says `answer*=n`. This is equivalent to $n^k$ not $n!$

# Q39 recur method with int parameter
![Q39](/assets/img/2014_MC/Q39.png)  
In this question, I had incorrectly traced the recursion to get to the right answer. The actual process would've been as follows:  

recur(27) --> recur(recur(9)) --> recur(18) --> recur(recur(6)) --> recur(12) --> recur(recur(4)) --> recur(8) --> 16

# Overall reflections

Overall, I believe I did pretty good with the collegeboard MCQ. I was able to correctly answer most of the questions, and the problems that I got wrong were largely just silly mistakes, instead of conceptual ones.
