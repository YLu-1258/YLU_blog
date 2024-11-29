---
title: 'CS61A: Aggregation'
author: alex
badges: True
comments: True
categories: ['CS61A']
date: 2024-11-25 1:00:00 -0800
math: True
tags: ['CS61A', 'SQL', 'Aggregation']
---

```python
%load_ext sql
%config SqlMagic.style = '_DEPRECATED_DEFAULT'
%sql sqlite:///cs61a.db
```

# Aggregation
- Aggregation functions can be used to perform aggregation over multiple rows.
- Simple `SELECT` statements contain column expressions that actually refer to the value of the column in each row of the table. 
    - `SELECT [columns] FROM [table] WHERE [expression] ORDER BY [expression]`
    - In fact, nearly everything we've been performing with `SELECT` has been of the value of the column in a given row.
    - The SELECT expression is evaluated per row.
- An aggregate function in the `[columns]` clause computes a value from a group of rows.
- Ex: Getting the max value of a column.



```sql
%%sql
CREATE TABLE animals AS
    SELECT "dog" AS kind, 4 AS legs, 20 AS weight UNION
    SELECT "cat", 4, 10 UNION
    SELECT "ferret", 4, 10 UNION
    SELECT "parrot", 2, 6 UNION
    SELECT "penguin", 2, 10 UNION
    SELECT "t-rex", 2, 12000;

SELECT MAX(legs) FROM animals;
```

     * sqlite:///cs61a.db
    Done.
    Done.





<table>
    <thead>
        <tr>
            <th>MAX(legs)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>4</td>
        </tr>
    </tbody>
</table>



- Ex: Select the sum of the weight of every animal


```sql
%%sql
SELECT SUM(weight) FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>SUM(weight)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>12056</td>
        </tr>
    </tbody>
</table>



- Aggregations may also be combined together
- Ex: Max weight and min weight.


```sql
%%sql
SELECT MAX(weight) - MIN(weight) AS difference FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>difference</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>11994</td>
        </tr>
    </tbody>
</table>



- Aggregations can also be used with `WHERE` clauses
- Ex: Exclude t-rex when calculating max weight difference.


```sql
%%sql
SELECT MAX(weight) - MIN(weight) AS difference FROM animals WHERE kind!="t-rex";
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>difference</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>14</td>
        </tr>
    </tbody>
</table>



- Ex: Average number of legs (`AVG`)


```sql
%%sql
SELECT AVG(legs) AS average_legs FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>average_legs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>3.0</td>
        </tr>
    </tbody>
</table>



- Ex: Get number of rows (`COUNT`)
    - We would use a particular column name in side count if we wanted a distinct count of each value within the column. ('DISTINCT')
    - `DISTINCT` may also be applied over other aggregation functions within a column:


```sql
%%sql
SELECT COUNT(*) AS num_of_rows, COUNT(DISTINCT legs) AS num_of_unique_legs, COUNT(DISTINCT weight) AS num_of_unique_weights FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>num_of_rows</th>
            <th>num_of_unique_legs</th>
            <th>num_of_unique_weights</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>6</td>
            <td>2</td>
            <td>4</td>
        </tr>
    </tbody>
</table>




```sql
%%sql
SELECT SUM(DISTINCT weight) AS sum_distinct_weight FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>sum_distinct_weight</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>12036</td>
        </tr>
    </tbody>
</table>



## Mixing Aggregate Functions and Single Values
- An aggregate function really selects a row in the table and also aggregate the value provided.
- Thus, whenever we use an aggregate function, we may retrieve a row that provides us with more information about that particular aggregate value.
    - This may or may not be useful. values may or may not be meaningful.


```sql
%%sql
SELECT MAX(weight), kind, legs FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>MAX(weight)</th>
            <th>kind</th>
            <th>legs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>12000</td>
            <td>t-rex</td>
            <td>2</td>
        </tr>
    </tbody>
</table>




```sql
%%sql
SELECT MIN(weight), kind, legs FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>MIN(weight)</th>
            <th>kind</th>
            <th>legs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>6</td>
            <td>parrot</td>
            <td>2</td>
        </tr>
    </tbody>
</table>




```sql
%%sql
SELECT MIN(kind), weight, legs FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>MIN(kind)</th>
            <th>weight</th>
            <th>legs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>cat</td>
            <td>10</td>
            <td>4</td>
        </tr>
    </tbody>
</table>




```sql
%%sql
SELECT MAX(legs), weight, kind FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>MAX(legs)</th>
            <th>weight</th>
            <th>kind</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>4</td>
            <td>10</td>
            <td>cat</td>
        </tr>
    </tbody>
</table>



- This does not give us a meaningful value, as there are many animals with the maximum number of legs.


```sql
%%sql
SELECT AVG(weight), kind FROM animals;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>AVG(weight)</th>
            <th>kind</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2009.3333333333333</td>
            <td>cat</td>
        </tr>
    </tbody>
</table>



- This does not give us a meaningful value, as there are no animals with the average weight.

# Groups
- By default, aggregate functions use all rows of the table in one big group to compute the value.
    - Thus the result of the aggregate function only has one row.
- Select statements can define multiple groups.
    - Rows in a table can be grouped, and aggregation is performed on each group:


```python
SELECT [columns] FROM [table] GROUP BY [expression] HAVING [expression];
```

- The number of groups is the number of unique values of an expression
    - Find the max weight for animals with each number of legs.


```sql
%%sql
SELECT legs, MAX(weight) FROM animals GROUP BY legs
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>legs</th>
            <th>MAX(weight)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2</td>
            <td>12000</td>
        </tr>
        <tr>
            <td>4</td>
            <td>20</td>
        </tr>
    </tbody>
</table>



- Ex: Select the number of legs from each group in animals where we group by legs.
    - This retrieves the unique values of legs within the table


```sql
%%sql
SELECT legs FROM animals GROUP BY legs
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>legs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2</td>
        </tr>
        <tr>
            <td>4</td>
        </tr>
    </tbody>
</table>



- Ex: Compute the number of rows that exists for each group of legs


```sql
%%sql
SELECT legs, COUNT(*) AS num_of_rows FROM animals GROUP BY legs
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>legs</th>
            <th>num_of_rows</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>4</td>
            <td>3</td>
        </tr>
    </tbody>
</table>



- We may also group over multiple columns at the same time.
    - Ex: All unique combinations of legs and weight


```sql
%%sql
SELECT legs, weight FROM animals GROUP BY legs, weight;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>legs</th>
            <th>weight</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2</td>
            <td>6</td>
        </tr>
        <tr>
            <td>2</td>
            <td>10</td>
        </tr>
        <tr>
            <td>2</td>
            <td>12000</td>
        </tr>
        <tr>
            <td>4</td>
            <td>10</td>
        </tr>
        <tr>
            <td>4</td>
            <td>20</td>
        </tr>
    </tbody>
</table>



- Ex: Getting the lexicographically superior animal kind for every weignt to legs ratio


```sql
%%sql
SELECT max(kind) AS kind, weight/legs AS ratio  FROM animals GROUP BY weight/legs;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>kind</th>
            <th>ratio</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>ferret</td>
            <td>2</td>
        </tr>
        <tr>
            <td>parrot</td>
            <td>3</td>
        </tr>
        <tr>
            <td>penguin</td>
            <td>5</td>
        </tr>
        <tr>
            <td>t-rex</td>
            <td>6000</td>
        </tr>
    </tbody>
</table>



## Selecting Groups
- Rows in a table can be grouped, and aggregatoin is performed on each group
    - `SELECT [column] FROM [table] GROUP BY [expression] HAVING [expression];`
- A `HAVING` clause would filter the set of groups that are aggregated.
    - This is different than a where clause, as we may include aggregation within the Having
- Ex: Getting the leg to weight ratio along with the number of animals that satisfy that ratio only if there are more than one such animal that satisfy the ratoi


```sql
%%sql
SELECT weight/legs AS ratio, count(*) AS count FROM animals GROUP BY weight/legs HAVING COUNT(*)>1;
```

     * sqlite:///cs61a.db
    Done.





<table>
    <thead>
        <tr>
            <th>ratio</th>
            <th>count</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2</td>
            <td>2</td>
        </tr>
        <tr>
            <td>5</td>
            <td>2</td>
        </tr>
    </tbody>
</table>


