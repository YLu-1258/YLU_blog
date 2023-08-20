---
title: Intro to Numpy
author: alex
badges: True
comments: True
categories: ['numpy', 'data science']
date: 2022-08-20 01:57:00 -0800
tags: ['notebooks']
render_with_liquid: False
---

## NumPy

NumPy is the fundamental package for scientific computing with Python.

At the core of the NumPy package, is the `ndarray` object or n-dimensional array. In programming, array describes a collection of elements, similar to a list. The word n-dimensional refers to the fact that ndarrays can have one or more dimensions. 

Here I will directly convert a list to an ndarray using the `numpy.array()` constructor. To create a 1D ndarray, I can pass in a single list


```python
import numpy as np #using the alias np
array_data = np.array([1,2,3,4])
```


```python
print(array_data)
print(type(array_data))
```

    [1 2 3 4]
    <class 'numpy.ndarray'>


It's often useful to know the number of rows and columns in a ndarray. I can use the `ndarray.shape` attribute. 



```python
array_2D = np.array([[5, 10, 15],
                    [20, 25, 30]])
print(array_2D.shape) 

```

    (2, 3)


### Vectorization in NumPy
The NumPy library takes advantage of a processor feature called *Single Instruction Multiple Data (SIMD)* to process data faster. SIMD allows a processor to perform the same operation on multiple data points in a single processor cycle.

The concept of replacing for loops with operations applied to multiple data points at once is called **vectorization**, and ndarrays make vectorization possible.


```python
numbers = [[6, 5], [1, 3], [5, 6], [1, 4], [3, 7], [5, 8], [3, 5], [8, 4]]
print(*numbers, sep='\n')
```

    [6, 5]
    [1, 3]
    [5, 6]
    [1, 4]
    [3, 7]
    [5, 8]
    [3, 5]
    [8, 4]



```python
# Python for loops implementation
sums = []
for row in numbers:
  row_sum = row[0] + row[1]
  sums.append(row_sum)

print(sums)
```

    [11, 4, 11, 5, 10, 13, 8, 12]



```python
# NumPy
# Convert the list of lists to an ndarray
np_numbers = np.array(numbers)
sums = np_numbers[:,0] + np_numbers[:,1]
print(sums)

```

    [11  4 11  5 10 13  8 12]


When I selected each column, we used the syntax `ndarray[:,c]` where c is the column index I wanted to select. The colon selects all rows.


```python
# Select one or more data in ndarray
#print(np_numbers)
#print(np_numbers[1])
#print(np_numbers[2:])

#print(np_numbers[3,1])
#print(np_numbers[:,1])

# Select specific row
rows = [0, 2, 4]
print(np_numbers[rows, :])
```

    [[6 5]
     [5 6]
     [3 7]]


### Explore the numerical dataset
To explore two-dimensional (2D) ndarrays, I'll analyze New York City taxi trip data released by the city of New York.


```python
!wget -nc /content/ https://datasets21.s3-us-west-1.amazonaws.com/nyc_taxis.csv
```

    /content/: Scheme missing.
    --2023-08-20 01:54:35--  https://datasets21.s3-us-west-1.amazonaws.com/nyc_taxis.csv
    Resolving datasets21.s3-us-west-1.amazonaws.com (datasets21.s3-us-west-1.amazonaws.com)... 52.219.120.97, 3.5.163.189, 3.5.163.195, ...
    Connecting to datasets21.s3-us-west-1.amazonaws.com (datasets21.s3-us-west-1.amazonaws.com)|52.219.120.97|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 115517 (113K) [text/csv]
    Saving to: ‘nyc_taxis.csv’
    
    nyc_taxis.csv       100%[===================>] 112.81K   366KB/s    in 0.3s    
    
    2023-08-20 01:54:35 (366 KB/s) - ‘nyc_taxis.csv’ saved [115517/115517]
    
    FINISHED --2023-08-20 01:54:35--
    Total wall clock time: 0.7s
    Downloaded: 1 files, 113K in 0.3s (366 KB/s)



```python
!wget --help
```


```python
from csv import reader
#Load data into the notebook
with open('nyc_taxis.csv', 'r') as taxis_file:
  taxis = list(reader(taxis_file))

print(len(taxis))
print(len(taxis[0]))

```

    2014
    15



```python
import numpy as np
np_taxis = np.array(taxis)
```


```python
print(np_taxis[:3])
np_taxis.shape
```

    [['pickup_year' 'pickup_month' 'pickup_day' 'pickup_dayofweek'
      'pickup_time' 'pickup_location_code' 'dropoff_location_code'
      'trip_distance' 'trip_length' 'fare_amount' 'fees_amount'
      'tolls_amount' 'tip_amount' 'total_amount' 'payment_type']
     ['2016' '1' '1' '5' '0' '2' '4' '21.00' '2037' '52.00' '0.80' '5.54'
      '11.65' '69.99' '1']
     ['2016' '1' '1' '5' '0' '2' '1' '16.29' '1520' '45.00' '1.30' '0.00'
      '8.00' '54.30' '1']]





    (2014, 15)



I'll only work with a subset of the real data — approximately 90,000 yellow taxi trips to and from New York City airports between January and June 2016. This data set includes a 1/50th random sample.
Below is information about selected columns from the dataset:

* pickup_year: the year of the trip
pickup_month: the month of the trip (January is 1, December is 12)
* pickup_day: the day of the month of the trip
* pickup_location_code: the airport or borough where the trip started
* dropoff_location_code: the airport or borough where the trip ended
* trip_distance: the distance of the trip in miles
* trip_length: the length of the trip in seconds
* fare_amount: the base fare of the trip, in dollars
* total_amount: the total amount charged to the passenger, including all fees, tolls and tips

Detailed information on all columns could be found [here](https://s3.amazonaws.com/dq-content/289/nyc_taxi_data_dictionary.md).


```python
# Load CSV with NumPy
# Access the column by names
np_taxis = np.genfromtxt('nyc_taxis.csv',delimiter=',', names= True)
```

References:

[NumPy genfromtxt function - API Reference](https://numpy.org/doc/stable/reference/generated/numpy.genfromtxt.html0)

[Tutorial for genfromtxt](https://www.pythonpool.com/numpy-genfromtxt/)



```python
print(np_taxis.shape)
print(np_taxis[10]['pickup_location_code'])
```

    (2013,)
    4.0



```python
z = np.array([1,2])
print(z.shape)
```

    (2,)



```python
y = np.array([[1],[2]])
print(y.shape)
```

    (2, 1)



```python
# Access the column by index
np_taxis = np.genfromtxt('nyc_taxis.csv',delimiter=',', skip_header=1)
```


```python
print(np_taxis.shape)
```

    (2013, 15)



```python
print(np_taxis[10])
```

    [2.016e+03 1.000e+00 1.000e+00 5.000e+00 1.000e+00 4.000e+00 2.000e+00
     1.660e+01 1.467e+03 5.200e+01 8.000e-01 5.540e+00 0.000e+00 5.834e+01
     2.000e+00]



```python
np.set_printoptions(suppress=True)
```


```python
print(np_taxis[10])
```

    [2016.      1.      1.      5.      1.      4.      2.     16.6  1467.
       52.      0.8     5.54    0.     58.34    2.  ]



```python
print(np_taxis[1])
```

    [2016.      1.      1.      5.      0.      2.      1.     16.29 1520.
       45.      1.3     0.      8.     54.3     1.  ]



```python
# select 'pickup_location_code', 'dropoff_location_code','fare_amount', 'fees_amount'
cols = [5, 6, 9, 10]
print(np_taxis[:,cols])
```

    [[ 2.   4.  52.   0.8]
     [ 2.   1.  45.   1.3]
     [ 2.   6.  36.5  1.3]
     ...
     [ 2.   4.  52.   0.8]
     [ 2.   6.  34.5  1.3]
     [ 2.   0.  48.   1.3]]


### Get the Frequency Table of taxis based on the Pickup Location


```python
print(np.unique(np_taxis[:,6]))
```

    [0. 1. 2. 3. 4. 5. 6. 7.]



```python
unique, counts = np.unique(np_taxis[:,6], return_counts=True)
print(unique)
print(counts)
```

    [0. 1. 2. 3. 4. 5. 6. 7.]
    [ 31 261 285 308 930   2 194   2]



```python
print(np_taxis[:,-2])
```

    [69.99 54.3  37.8  ... 63.34 44.75 54.84]



```python
# elementwise calculation
# Calculate the mph of each trip
trip_distance_miles = np_taxis[:,7]
trip_length_seconds = np_taxis[:,8]

trip_length_hours = trip_length_seconds / 3600 # 3600 seconds is one hour

trip_mph = trip_distance_miles / trip_length_hours
print(trip_mph)
```

    [37.11340206 38.58157895 31.27222982 ... 22.29907867 42.41551247
     36.90473407]



```python
# Display the Descriptive analysis of the total taxi charge for your trip
total_amount = np_taxis[:,-2]
# measures of central tendency
mean = np.mean(total_amount)
median = np.median(total_amount)
  
# measures of dispersion
min = np.amin(total_amount)
max = np.amax(total_amount)
range = np.ptp(total_amount)
varience = np.var(total_amount)
sd = np.std(total_amount)
  
print("Descriptive analysis")
print("\n")
print("Measures of Central Tendency")
print("Mean =", mean)
print("Median =", median)
print("Measures of Dispersion")
print("Minimum =", min)
print("Maximum =", max)
print("Range =", range)
print("Varience =", varience)
print("Standard Deviation =", sd)
```

    Descriptive analysis
    
    
    Measures of Central Tendency
    Mean = 48.67809239940387
    Median = 47.89
    Measures of Dispersion
    Minimum = 0.31
    Maximum = 141.88
    Range = 141.57
    Varience = 266.02520798550114
    Standard Deviation = 16.310279212370986

