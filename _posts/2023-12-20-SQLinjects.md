---
title: SQL Injects
---

## What is a SQL Inject

Often times, web services provide users the choice to input data, which is then sent to the backend of the service. This data could then be processed and be stored in a database table for future use. A SQL Inject takes advantage of this relationship. Since every database interaction can be represented with an SQL query, if our input data happened to be a SQL fragment that completed the query to perform unexpected tasks, then isn't it possible for us to gain unauthorized access to the database? 

These are some of the notable SQL Inject breaches in the past years:
 - GhostShell attack (Targetted university records)
 - Turkish government (Breached government website to wipe national debt)
 - 7-Eleven breach (Stole credit card information from corporate systems)

### Popcorn Hack:  
Name three more ways of how an SQL Inject could be used for malicious actions, and what are the consequences of each action?

## What does an SQL Inject look like?
Pretend our school had a website has a simple function that returns a users information when they input their unique id and password (that only they know about). To retrieve this information, our backend has the following SQL query:

```sql
SELECT * FROM users_info WHERE uuid = 1920450 AND password="5994471abb01112afcc18159f6cc74b4f511b9980";
```

On the frontend, we may expect an html table that lists the information of the user who corresponds to the id that we inputted. Maybe something that looks like this

<table>
    <tr>
        <th>ID</th>
        <th>Student</th>
        <th>GPA</th>
        <th>Rank</th>
    </tr>
    <tr>
        <td>1920450</td>
        <td>Alexander Lu</td>
        <td>3.85</td>
        <td>79</td>
    </tr>
</table>  

If we were normal students, we should think this is enough security. Unique user IDs, hashed passwords, everthing is chill right?   

***WRONG!!!!***

### Performing the Inject
Now, knowing the name of the table, we could do a lot more with this feature. Even if I wasn't a student who knew his ID for a look up, I could still perform an SQL inject on this service. What if instead of an ID, I entered the following string as my query?

```sql
1927347 OR 1=1; --
```

This might not make sense the first time you see it, but lets place this into our last SQL query to see how it looks now.  

```sql
SELECT * FROM users_info WHERE uuid = 1927347 OR 1=1; -- AND password="5994471abb01112afcc18159f6cc74b4f511b9980";
```  

Let's break down each part of the string:
 - `1927347`: A random uuid that we supplied, THIS DOESN'T EVEN HAVE TO EXIST. You'll see why.
 - `OR`: A boolean condition in SQL, essentially makes it so that only one of the conditions must be met for the command (`SELECT * FROM users_info`) to execute properly.
   - Now do you see where we are going with this?
 - `1=1`: A simple arithmetic statement that is ***ALWAYS TRUE***
   - Even if our id isn't correct because the fact 1=1 is true for *every record of the table*, our database now thinks we want to return **every single row**.
 - `; --`: The semicolon finishes up our sql query, and the -- comments out the rest of the SQL query, maintaining the integrity of our statement and allowing the injected query to run properly.  

Our frontend now might look something like this:
<table>
    <tr>
        <th>ID</th>
        <th>Student</th>
        <th>GPA</th>
        <th>Rank</th>
    </tr>
    <tr>
        <td>1923498</td>
        <td>Alexander Lu</td>
        <td>3.85</td>
        <td>79</td>
    </tr>
    <tr>
        <td>1910483</td>
        <td>David Vasilev</td>
        <td>3.85</td>
        <td>77</td>
    </tr>
    <tr>
        <td>1899283</td>
        <td>Ethan Zhao</td>
        <td>4.00</td>
        <td>22</td>
    </tr>
    <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
    </tr>
</table>  

### Popcorn hack:  
Explain briefly, what a SQL inject is, in your own words, and how it functions:

## Methods of SQL Injects
<img src="/assets/img/Exploits_imgs/image.png">
