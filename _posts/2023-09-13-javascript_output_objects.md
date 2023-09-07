---
title: JS Output w/ Objects
description: Quick launch into Variables, Functions, Arrays, Classes, Objects.
author: mortensen
layout: default
badges: True
comments: True
categories: ['Javascript', 'lessons']
tags: ['notebooks', 'javascript', 'lessons']
type: plans
week: 4
---

## JavaScript and Jupyter references
> JavaScript is the most important language you need to learn as a frontend developer.  Jupyter Notebooks is a convenient way to learn portions of the language without the overhead of creating a full Website.  Jupyter Notebooks have ChatGPT plugins to assist with design and troubleshooting problems.  This Notebook has colors on HTML pages that were designed with a dark mode background.

- JavaScript / Jupyter General References
    - [W3Schools HTML Reference](https://www.w3schools.com/html/default.asp)
    - [W3Schools JS Reference](https://www.w3schools.com/js/)
    - ChatGPT AI assistant for [Chrome/Jupyter](https://chrome.google.com/webstore/detail/chatgpt-jupyter-ai-assist/dlipncbkjmjjdpgcnodkbdobkadiejll) 
    - Theme setup for Jupyter [Article](https://linuxhint.com/change-theme-jupyter-notebook/).  Or do these commands from shell...
        - Install pip: pip install jupyterthemes
        - Revert to original theme: jt -r 
        - List themes: jt -l
        - Install with Theme, Name, Logo: jt -t onedork -T -N -kl
    - [Chrome Dev Tools](https://developer.chrome.com/docs/devtools/)

- Coding with jQuery
    - Jupyter Notebook [GitHub](https://github.com/nighthawkcoders/APCSP/blob/master/_notebooks/2022-09-19-PBL-javascript_tutorial.ipynb), wget: https://raw.githubusercontent.com/nighthawkcoders/APCSP/master/_notebooks/2022-09-19-PBL-javascript_tutorial.ipynb
    - Markdown [Fetch example](https://nighthawkcoders.github.io/APCSP/frontend/jquery) in GitHub project for [APCSP](https://github.com/nighthawkcoders/APCSP/blob/master/_posts/2023-06-01-jquery-sort.md)
    - HTML [Static example](https://flask.nighthawkcodingsociety.com/table/) in GitHub project for [flask_portfolio](https://github.com/nighthawkcoders/flask_portfolio/blob/main/templates/table.html)
 


### output using HTML and CSS
 Multiple cells are used to setup HTML in this lesson. Many of the JavaScript cells will use the output tag(s) to write into the HTML that has been setup.  
- %%html is used to setup HTML code block
- "style" tag enables visuals customization
- "div" tag is setup to receive data


```python
%%html
<html>
    <head>
        <style>
            #output {
                background-color: #ffffff;
                padding: 10px;
                border: 3px solid #ccc;
            }
        </style>
    </head>
    <body>
        <p id="data" hidden>
        </p>
        <div id="output">
            Hello!
        </div>
    </body>
</html>
```


<html>
    <head>
        <style>
            #output {
                background-color: #ffffff;
                padding: 10px;
                border: 3px solid #ccc;
            }
        </style>
    </head>
    <body>
        <p id="data" hidden>
        </p>
        <div id="output">
            Hello!
        </div>
    </body>
</html>



### other outputs explored
There are several ways to ouput the classic introduction message: "Hello, World!" 
- Before you go further, open Console on your Browser. <mark>JavaScript developer leaves Console open</mark> all the time!!!
- The function <mark>console.log()</mark> outputs to Console, this is often used for inspection or debugging.
- "Hello, World" is a String literal. This is the referred to as <mark>Static text</mark>, as it does not change.  Developer call this a <mark>hard coded string</mark>.
- <mark>"Hello, World" literal is a parameter</mark> to console.log(), element.txt() and alert().
- The element.textContent is part of <mark>Jupyter Notebook %%js magic</mark>.  This is convenient for Notebook and testing.
- The <mark>alert command outputs the parameter to a dialog box</mark>, so you can see it in this Jupyter notebook. The alert commands are shown, but are commented out as the stop run all execution of the notebook.
- Note, in a Web Application Debugging: An alert is often used for less savy Developers. Console is used by more savy developers; console often requires setting up a lot of outputs. Source level debugging is the most powerful solution for debugging and does not require alert or console commands.


```python
%%js // required to allow cell to be JavaScript enabled

console.log("JavaScript/Jupyter Output Intro");

// Browser Console output; debugging or tracing
console.log("Hello, World!");

// Set element in HTML above using DOM (Document Object Model)
document.getElementById("output").textContent = "Hello, World!";

// Jupyter built in magic element for testing and convenience of development
element.textContent = "Hello, World!";  // element is an output option as part of %%js magic

alert("Hello, World!");
```


    <IPython.core.display.Javascript object>


### multiple outputs using one variable
This second example is a new <mark>sequence of code</mark>, two or more lines of code forms a sequence.  This example defines a variable, thank goodness!!! In the previous example we were typing the string `"Hello, World" over and over`.  Observe with the variable `msg="Hello, World!";` we type the string once and now use `msg` over and over.
- The variable "var msg =" is used to capture the data
- The console.log(msg) outputs to console, be sure to Inspect it!
- The element.text() is part of Jupyter Notebooks and displays as output blow the code on this page. Until we build up some more interesting data for Web Site, we will not use be using the Python HTML, CSS technique.
- The alert(msg) works the same as previous, but as the other commands uses msg as parameter.


```python
%%js
console.log("Variable Definition");

var msg = "Hello, World Again!";

// Use msg to output code to Console and Jupyter Notebook
console.log(msg);  //right click browser select Inspect, then select Console to view
document.getElementById("output").textContent = msg;
element.append(msg);
alert(msg);

```


    <IPython.core.display.Javascript object>


### output showing use of a function
This example passes the defined variable "msg" to the newly defined "function logIt(output)".
- There are multiple steps in this code..
    - The "definition of the function": "function logIt(output) {}" and everything between curly braces is the definitions of the function. Passing a parameter is required when you call this function.
    - The "call to the function:"logIt(msg)" is the call to the function, this actually runs the function.  The variable "msg" is used a parameter when calling the logIt function.
- Showing reuse of function...
    - There are two calls to the logIt function
    - This is called Prodedural Abstraction, a term that means reusing the same code


```python
%%js
console.log("Function Definition");

/* Function: logIt
 * Parameter: output
 * Description: The parameter is "output" to console and jupyter page
*/
function logIt(msg) {
    console.log(msg); 
    element.append(msg);
    document.getElementById("output").textContent = msg;
    //alert(output);
}

// sequence of code build logIt parameter using concatenation
var msg = "Hello, Students!" // replaces content of variable
var classOf = "Welcome CS class of 2023-2024."
logIt(msg + "  " + classOf); // concatenation of strings
```


    <IPython.core.display.Javascript object>


### output showing Loosely typed data
<mark>JavaScript is a loosely typed language</mark>, meaning you don't have to specify what type of information will be stored in a variable in advance.  
- To define a variable you prefix the name with <mark>var or const</mark>.   The variable type is determined by JavaScript at runtime.
- Python and many interpretive languages are loosely typed like JavaScript.  This is considered programmer friendly.  
- Java which is a compiled language is strongly typed, thus you will see terms like <mark>String, Integer, Double, and Object</mark> in the source code. 
- In JavaScript, the <mark>typeof keyword</mark> returns the type of the variable.  Become familiar with type as it is valuable in conversation and knowing type help you understand how to modify data.  Each variable type will have built in methods to manage content within the data type.


```python
%%js
console.log("Examine Data Types");

// Function to add typeof to output
function getType(output) {
    return typeof output + ": " + output;
}

// Function defintion
function logIt(msg) {
    console.log(getType(msg));  // logs string
    console.info(msg);          // logs object
    document.getElementById("output").textContent = msg;
    element.append(getType(msg) + " ");  // adds to Jupyter output
    //alert(getType(msg));
}

// Common Types
element.append("Common Types ");
logIt("Mr M"); // String
logIt(1997);    // Number
logIt(true);    // Boolean

// Object Type, this definition is often called a array or list
element.append("Object Type, array ");
var scores = [
    90,
    80, 
    100
];  
logIt(scores);

// Complex Object, this definition is often called hash, map, hashmap, or dictionary
element.append("Object Type, hash or dictionary ");
var person = { // key:value pairs seperated by comma
    "name": "Mr M", 
    "role": "Teacher"
}; 
logIt(person);
logIt(JSON.stringify(person));  //method used to convert this object into readable format
```


    <IPython.core.display.Javascript object>


### Build a Person object, JSON, and show output
JavaScript and other languages have special properties and syntax to store and represent data.  In fact, a class in JavaScript is a special function.

- <mark>Definition of class allows for a collection of data</mark>, the "class Person" allows programmer to retain name, github id, and class of a Person.
- <mark>Instance of a class</mark>, the "const teacher = new Person("Mr M", "jm1021", 1977)" makes an object "teacher" which is an object representation of "class Person".
- <mark>Setting and Getting properties</mark> After creating teacher and student objects, observe that properties can be changed/muted or extracted/accessed.


```python
%%js
console.log("Person objects");

/* class: Person
 * Description: A collection of Person data
*/
class Person {
  /* method: constructor
   * parameters: name, ghID - GitHub ID, classOf - Graduation Class 
   * description: returns object when "new Person()" is called with matching parameters
   * assignment: this.name, this.ghID, ... are properties retained in the returned object
   * default: role uses a default property, it is set to "Student"
  */
  constructor(name, ghID, classOf, role="Student") {
    this.name = name;
    this.ghID = ghID;
    this.classOf = classOf;
    this.role = role;
  }

  /* method: setter
   * parameters: role - role in classroom
   * description: this.role is updated from default value to value contained in role parameter
  */
  setRole(role) {
    this.role = role;
  }
  
  /* method: getter
   * description: turns properties of object into JSON object
   * return value: JSON object
  */
  getJSON() {
    const obj = {type: typeof this, name: this.name, ghID: this.ghID, classOf: this.classOf, role: this.role};
    const json = JSON.stringify(obj);
    return json;
  }

  /* method: logIT
   * description: this Person object is logged to console
  */
  
  logIt() {
    //Person Object
    console.info(this);
       
    // HTML output
    document.getElementById("output").textContent = this.getJSON();

    //Log to Jupter
    element.append(this.role + " object in JSON: ");
    element.append(this.getJSON());  
    element.append(" ");


    //alert(this.getJSON());
  }
    
}

// make a new Person Object
const teacher = new Person("Mr M", "jm1021", 1977); // object type is easy to work with in JavaScript
// update role to Teacher
var role = "Teacher";
teacher.setRole(role); // set the role
teacher.logIt();  // log to console

// make a new Person Object
const student = new Person("Jane Doe", "jane", 2007); // object type is easy to work with in JavaScript
student.logIt(); // log to console
```


    <IPython.core.display.Javascript object>


### Build a Classroom Array/List of Persons, JSON, and show output
Many key elements are shown again.  New elements include...
- <mark>Building an Array</mark>, "var students" is an array of many persons
- Building a Classroom, this show <mark>forEach iteration</mark> through an array and <mark>.push adding</mark> to an array.  These are key concepts in all programming languages.


```python
%%js
console.log("Classroom object");

/* class: Person
 * Description: A collection of Person data
*/
class Person {
  /* method: constructor
   * parameters: name, ghID - GitHub ID, classOf - Graduation Class 
   * description: returns object when "new Person()" is called with matching parameters
   * assignment: this.name, this.ghID, ... are properties retained in the returned object
   * default: this.role is a default property retained in object, it is set to "Student"
  */
  constructor(name, ghID, classOf, role="Student") {
    this.name = name;
    this.ghID = ghID;
    this.classOf = classOf;
    this.role = role;
  }

  /* method: setter
   * parameters: role - role in classroom
   * description: this.role is updated from default value to value contained in role parameter
  */
  setRole(role) {
    this.role = role;
  }
  
  /* method: getter
   * description: turns properties of object into JSON object
   * return value: JSON object
  */
  getJSON() {
    const obj = {type: typeof this, name: this.name, ghID: this.ghID, classOf: this.classOf, role: this.role};
    const json = JSON.stringify(obj);
    return json;
  }

  /* method: logIT
   * description: this Person object is logged to console
  */
  logIt() {
    //Person Object
    console.info(this);
    // HTML output tag
    document.getElementById("output").textContent = this.getJSON();

    //Log to Jupter
    element.append("Person json <br>");
    element.append(this.getJSON() + "<br>"); 

    //alert(this.getJSON());
  }
    
}

/* class: Classroom
 * Description: A collection of Person objects
*/
class Classroom {
  /* method: constructor
   * parameters: teacher - a Person object, students - an array of Person objects
   * description: returns object when "new Classroom()" is called containing properties and methods of a Classroom
   * assignment: this.classroom, this.teacher, ... are properties retained in the returned object
  */
  constructor(teacher, students) {
    /* spread: this.classroom contains Teacher object and all Student objects
     * map: this.json contains of map of all persons to JSON
    */
    this.teacher = teacher;
    this.students = students;
    this.classroom = [teacher, ...students]; // ... spread option
    this.json = '{"classroom":[' + this.classroom.map(person => person.getJSON()) + ']}';
  }

  /* method: logIT
   * description: this Classroom object is logged to console
  */
  logIt() {
    //Classroom object
    console.log(this);

    // HTML output
    document.getElementById("data").textContent = this.json;
    document.getElementById("output").textContent = this.json;

    //Classroom json
    element.append("Classroom object in JSON: ");
    element.append(this.json);

    //alert(this.json);
  }
}

/* function: constructCompSciClassroom
 * Description: Create data for Classroom and Person objects
 * Returns: A Classroom Object
*/
function constructCompSciClassroom() {
    // define a Teacher object
    const teacher = new Person("Mr M", "jm1021", 1977, "Teacher");  // optional 4th parameter

    // define a student Array of Person objects
    const students = [ 
        new Person("Anthony", "tonyhieu", 2022),
        new Person("Bria", "B-G101", 2023),
        new Person("Allie", "xiaoa0", 2023),
        new Person("Tigran", "Tigran7", 2023),
        new Person("Rebecca", "Rebecca-123", 2023),
        new Person("Vidhi", "VidhiKulkarni", 2024)
    ];

    // make a CompSci classroom from formerly defined teacher and student objects
    return new Classroom(teacher, students);  // returns object
}

// assigns compsci to the object returned by "constructCompSciClassroom()" function
const compsci = constructCompSciClassroom();
// output of Objects and JSON in CompSci classroom
compsci.logIt();

```


    <IPython.core.display.Javascript object>


###  for loop to generate Table Rows in HTML output
This code extracts JSON text from HTML, that was placed in DOM in a previous JavaScript cell, then it parses text into a JavaScript object.  In addition, there is a for loop that iterates over the extracted object generating formated rows and columns in an HTML table.

- Table generation is broken into parts...
    - table data is obtained from a classroom array inside of the extracted object.  
    - the JavaScript for loop allows the construction of a new row of data for each Person hash object inside of the the Array.
    - in the loop a table row `<tr> ... </tr>` is created for each Hash object in the Array.
    - in the loop table data, a table column, `<td> ... </td>` is created for name, ghID, classOf, and role within the Hash object.
 
```
    ----------------
    |     HTML     |
    |     DOM      | 
    | data  output |  - ref: id="data", id="output"
    ----------------
       ⇓      ⇑
      get    set
    ----------------
    | JavaScript   | - get data: 
    |    code      |    const jsonText = document.getElementById("data").innerHTML;
    |getElementById| - set output: 
    ----------------    document.getElementById("output").innerHTML = htmlOut;

```


```python
%%js
console.log("Classroom Web Page");

// extract JSON text from output element in HTML page
const jsonText = document.getElementById("data").innerHTML;

// convert JSON text to a JavaScript Object to process
const classroom = JSON.parse(jsonText).classroom;
console.log(classroom);

// make an HTML Out format for pretty display
/* Template literals (`), can make HTML generation more concise;
 * the map functions generates row strings and the join method combines them;
 * this replaces longer and ugly for loop and string concatenation.
*/
const htmlOut = `
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>GitHub ID</th>
                <th>Class Of</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            ${classroom.map(row => `
                <tr>
                    <td>${row.name}</td>
                    <td>${row.ghID}</td>
                    <td>${row.classOf}</td>
                    <td>${row.role}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
`;

// assign/set htmlOut to output element in HTML page
document.getElementById("output").innerHTML = htmlOut;

// show raw HTML
console.log(htmlOut);
element.append(htmlOut);
```


    <IPython.core.display.Javascript object>


## Hacks
> Work with output and objects.
- Adapt this tutorial to your own work and interests, how many steps do you understand?
- Relate console output on last step to a previous hack
- Explain, how console.log can help find errors in code?
- Try out ChatGPT Jupyter features; though I prefer using Web and cut-copy-paste

