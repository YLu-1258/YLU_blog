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
There are many different ways of performing an SQL inject. Ultimately, it hinges on your knowledge of SQL syntax to game whatever query that your target has set up. Here are just some of the few strategies I've learned over the years, but you can gain addiitonal practice from doing CTF challenges.

### Using keyword OR
Essentially, this was the strategy that you saw above. The intuition behind this strategy is offering an alternate condition for a Given SQL statement to succeed, to bypass any authentication checks. Keep in mind that there might be additional query after the ineject, so we would require SQL comments like `--` to ensure our inject works properly.

### Using Union 
The `UNION` keyword in SQL is often used to join two SQL statements together, more specifically, the `SELECT` statement. What this allows us to do is to get the results of two seperate SELECT statements, and can be used to give us additional info on the database's structure by writing a new command. Take the SQL statement from above:  

```sql
SELECT * FROM users_info WHERE uuid = ... AND password='...';
```  

The statement created by the server only looks for info in the `users_info` table. But with union, we can add an additional query to the end of this. For this example, I'll be performing an inject on the uuid field. The inject will look something like this:

```sql
123' UNION SELECT name, sql from sqlite_master;--
```

Now the actual query looks like this:

```sql
SELECT * FROM users_info WHERE uuid ='123' UNION SELECT name, sql from sqlite_master;-- ... AND password=';
```  

Even if the first select statement doesn't return anything, our union statement will select the name and schema of the database in the backend. However, this command only works for an sqlite server, as we know the name of the table to be sqlite_master, and probably won't work for any services hosted through MySQL, MariaDB, Postgresql or etc.

### An Example I saw last week
<img src="/assets/img/Exploits_imgs/image.png">

### Protecting Against SQL injects
Obviously, if every company's database and services were fragile enough to be attacked with SQLinjects, the world would be in flames. There are many ways and methods to protect against these attacks.

#### Placing Limits on User Inputs
A common, and simple strategy to use is to place restrictions on what the user can input. Much of our SQLinjects rely on adding additional SQL statements and code to execute what we wish for it to do. Some of the following tactics could work to protect against SQL Injects:
 - Reducing the maximum input length
 - Restricting the use of special characters used for query (; - ' etc.) 
 - Validating user input (try not to use textboxes if you can, utilize selection boxes, dropdown menus, etc.)
 - Principle of least privilege
    - Do not give DELETE, INSERT, UPDATE permissions if not needed. Give the least authority on the databse that's required for the service to function.

### Parameterized Statements
Often in the backend, we may construct SQL Queries using string concatenation. ***DON'T DO THIS.*** While it is convinient, using parameterized statements are much more secure. considering the following two examples:


```python
import java.sql.*
// The user we want to find.
String email = "user@email.com";

// Connect to the database.
Connection conn = DriverManager.getConnection(URL, USER, PASS);
Statement stmt = conn.createStatement();

// Bad, bad news! Don't construct the query with string concatenation.
String sql = "SELECT * FROM users WHERE email = '" + email + "'";

// I have a bad feeling about this...
ResultSet results = stmt.executeQuery(sql);

while (results.next()) {
  // ...oh look, we got hacked.
}

```


```python
import java.sql.*
// Connect to the database.
Connection conn = DriverManager.getConnection(URL, USER, PASS);

// Construct the SQL statement we want to run, specifying the parameter.
String sql = "SELECT * FROM users WHERE email = ?";

// Generate a prepared statement with the placeholder parameter.
PreparedStatement stmt = conn.prepareStatement(sql);

// Bind email value into the statement at parameter index 1.
stmt.setString(1, email);

// Run the query...
ResultSet results = stmt.executeQuery(sql);

while (results.next())
{
    // ...do something with the data returned.
}
```

In the first example, we used regular string concatenation to construct our query. When we send our final query statement to the database manager, it just executes the query simply as it is, even if a malicious party injected harmful code into it. This is ***BAD***  

In the second example, we used parameterized statements and then proceeded to update our query statement with the desired value. This allows the databse driver to interpret the SQL statement before executing, which gives us the ability to prevent injected harmful code from running. The data is treated as data, not as SQL queries. This is ***GOOD***.  

From my knowledge, I believe our current spring inmplementation uses Object Relational Mapping to make Database entries act as Java objects. These implementations typically already use aprameterized statements, which serves to add a layer of security to our applications. However, ORM applications still allow you to concatenate strings for more complex SQL queries, which could still result in a vulnerability.  

There are alot more ways of securing against SQL attacks, like client-side validation, but you can research that on your own, **if you write a blog on it, it could be a good reason to add points to your hacks**.
