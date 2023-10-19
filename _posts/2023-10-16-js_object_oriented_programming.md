---
toc: False
layout: post
title: Javascript Object Oriented Programming
description: Tech talk going over object oriented progamming in javascript
author: alex
type: ccc
week: 11
---

# Javascript class
- A class can be thought of as anything that you would consider an object in real life
    - Computer
    - Cat
    - Person
- Just like any of those objects a class will have attributes and actions that it can perform 
- This can be thought of as a "Has-a" relationship
    - Cat
        - Has a Tail
        - Has fur
        - Has the ability to make a sound

# Purpose of object oriented programming
- Classes are the building blocks of object oriented programming
- Classes can be used to help organize your code
    - Instead of looking through a 1000 line file of code to figure out what needs to be changed to make your dog walk to the left rather than to the right, you can just look in your 50 line class for dog and know exactly what needs to be changed
- Having organization in your code will make it so anyone can easily start working on your project with you
- Classes make it so you can reuse your code
    - Instead of coding 20 cats from scracth to add to your cat daycare app you can define a cat class and make 20 cat instances quickly

# Making a class
- A class in javascript is composed of three parts
    - A Constructor (constructor)
        - Defines what will be passed to this class and what this class will contain when it has been created
    - Attributes (this.*)
        - Variables associated with the class that may be used inside or outside of the class
    - Functions (see makeSound() below)
        - Functions that can be called from inside or outside the class to make the object do something
- Below is an example of the cat class from earlier


```python
%%js

class Cat{
    constructor(furColor, weight, breed, sound){
        // 'this' here is used to say that this attribute belongs to this class
        this.furColor = furColor;
        this.weight = weight;
        this.breed = breed;
        this.sound = sound;
    }
    
    makeSound() {
        console.log(this.sound);
        // Additional code to make sound goes here
    }

}

// define the variables we will pass into our cat class
var furColor = "Black";
var weight = 9;
var breed = "Bombay"
var sound = "meow"

// to make a new cat you need to call new and pass 
// all of the variables that the cat constructor is expecting
var cat = new Cat(furColor, weight, breed, sound);

// call a class function
cat.makeSound();
```


    <IPython.core.display.Javascript object>



```python
%%js
// Make a small class that could relate to your passion project here
```

# Extending a class
- Classes can extend other classes to generalize a group of similar classes
    - A laptop class and desktop class might extend a computer class
- These type of classes are known as parent and child classes or can be thought of as having an "is-a" relationship
    - A laptop is a computer
    - The computer is the parent class and the laptop is the child class
- Variables and functions defined in the parent class can be called with the child class


```python
%%js

class Pet{
    constructor(name, weight, breed){
        this.name = name;
        this.weight = weight;
        this.breed = breed;
    }

    print() {
        console.log(this.name, 
                    this.weight, 
                    this.breed, 
                    this.getSound());
    }
    
    getSound() {
        return "none";
        // Additional code to make sound goes here
    }
}


// use the extends keyword to say what the parent class of this class is
class Cat extends Pet{
    constructor(name, weight, breed, sound){
        // use super to call the parent constructor here
        super(name, weight, breed);
        this.sound = sound;
    }

    getSound() {
        return this.sound;
        // Additional code to make sound goes here
    }
}

class Dog extends Pet{
    constructor(name, weight, breed, sound){
        super(name, weight, breed);
        this.sound = sound;
    }

    getSound() {
        return this.sound;
        // Additional code to make sound goes here
    }
}

// define the variables we will pass into our pet class
var fishName = "Goldy";
var fishWeight = 0.1;
var fishBreed = "Gold Fish";
// construct fish
var fish = new Pet(fishName, fishWeight, fishBreed);

// define the variables we will pass into our cat class
var catName = "Ziggy";
var catWeight = 9;
var catBreed = "Bombay";
var catSound = "Meow";
// construct cat
var cat = new Cat(catName, catWeight, catBreed, catSound);

// define the variables we will pass into our dog class
var dogName = "Fido";
var dogWeight = 50;
var dogBreed = "Mutt";
var dogSound = "Bark";
// construct dog
var dog = new Dog(dogName, dogWeight, dogBreed, dogSound);

var animals = [fish, cat, dog]; // Use an array to store the animals
for (var animal of animals) {
    animal.print();
}
```


    <IPython.core.display.Javascript object>



```python
%%js
// Make a parent class and a child class related to your passion project
```

# Draw.io
- Draw.io is a tool that you can use right in vscode as an extension
- This tool can help you visualize the classes you have in your program and how they relate to eachother

<br>
![Draw_io_example]({{site.baseurl}}/images/draw_io_example.png)

![draw_io_example.png](draw_io_example.png)

- In this project we added multiple classes
- This draw io board shows that a parent class can also extend a class 
    - Game object is the parent of Character which is the parent of Dog and Monkey
    - You can go as many levels as you need to with this
- You can add all of the attributes and functions associated with each class as well making it much easier to see the structure of the program at a glance

# Hacks
- Take some of the separated features of your passion project that you have and make classes out of them
- See if any of the features have a structure that would benifit from making a parent class and child classes
- Make a Draw.io diagram of the program
