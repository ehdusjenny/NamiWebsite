# Object Oriented Programming Concepts

This tutorial assumes you know basic Java syntax.

### Topics to cover:
1. Introduction to Objects and Classes
1. Inheritance
1. Polymorphism
1. Abstraction
1. Encapsulation

## Introduction to Objects
An **object** is a representation of anything that has a *state* and a *behaviour*. So an object can be a dog. 

A dog is (*state*):
1. happy, sad, excited

A dog can (*behaviour*):
1. run, jump, bite

The blueprint that defines what an object is and can do is called a **class**.
<div style="background-color: #d2def2">
```
public class Dog {
    String mood = "";
    public Dog(String pMood) {
        mood = pMood;
        System.out.println("I am a dog and I am " + this.mood + ".");
    }
    public void setMood(String pMood) {
        mood = pMood;
        System.out.println("I am " + this.mood + ".");
    }
    public void run() {
        System.out.println("I am running.");
    }
    public void jump() {
        System.out.println("I am jumping.");
    }
    public void bite() {
        System.out.println("I am biting.");
    }

    public static void main(String[] args) {
        Dog charles = new Dog("Happy");
        charles.run();
    }
}
```
</div>
This is a class defining what a dog can be and do. 
A class can have many **functions**, which are blocks of code designed to achieve a single goal. In this case, there are functions to run, jump and bite, as well as setting the mood of the dog. A class can also have **attributes**, which are the characteristics of object instances of the class.
Create a happy dog object called charles with the following declaration: `Dog charles = new Dog("Happy")`. Make this dog run with `charles.run()`. 

Calling the `main` function will print
<div style="background-color: #d2def2">
```
I am a dog and I am Happy.
I am running.
```
</div>

## Inheritance
A class can *inherit* attributes and methods from another class. Let's say all animals can have emotions, run, jump and bite. When we want to create a `Cat` class, it seems a bit redundant to create the same functions that the Dog class already has. So let's create a **superclass** called `Animal` that encompasses all things that both dogs and cats can do.

### Example 1
<div style="background-color: #d2def2">
```
public class Animal {
    String mood = "";
    public Animal(String pMood) {
        mood = pMood;
        System.out.println("I am an animal and I am " + this.mood + ".");
    }
    public void setMood(String pMood) {
        mood = pMood;
        System.out.println("I am " + this.mood + ".");
    }
    public void run() {
        System.out.println("I am running.");
    }
    public void jump() {
        System.out.println("I am jumping.");
    }
    public void bite() {
        System.out.println("I am biting.");
    }
}

public class Dog extends Animal {
    public void bark() {
        System.out.println("Ruff.");
    }
}

public class Cat extends Animal {
    public void meow() {
        System.out.println("Meow.");
    }
    public static void main(String[] args) {
        Cat miku = new Cat("Scared");
        miku.run();
        miku.meow();

        Dog charles = new Dog("Happy");
        charles.run();
        charles.bark();
    }
}
```
</div>

The `Dog` class inherits properties and methods from the `Animal` superclass, since a dog is also an animal. The same goes for the `Cat` class. This means a `Dog` object has a mood, can run, jump and bite. A `Cat` object also has a mood and can run, jump and bite. Calling `miku.run()` will call the `run()` function of the `Animal` class.
Properties and methods within the `Dog` class belong only to `Dog` instances. A `Dog` object can bark, but not a `Cat` object since it has no function to bark. Likewise, a `Cat` object can meow, but a `Dog` object cannot. 

Calling the `main` function will print
<div style="background-color: #d2def2">
```
I am an animal and I am Scared.
I am running.
Meow.
I am an animal and I am Happy.
I am running.
Ruff.
```
</div>

Inheritance can be seen as a one-way **IS-A** relationship; a dog IS AN animal. However, the inverse is not necessarily true; an animal is not necessarily a dog.

## Polymorphism
In Java, there is another type called **interfaces**. Interfaces can contain constants and method signatures, but *not the actual implementation*.
<div style="background-color: #d2def2">
```
public Interface Shape {
    
}
```
</div>
<Show interface example Shape, with Circle and Square implementing it>
`Circle` and `Square` classes implement the `Shape` interface, which means the `Circle` class and `Square` class have to implement the methods defined by the Shape class. It also inherits the constants. This is basically saying if your class is defining a shape, it should be able to compute its area and the perimeter.

### Polymorphism in Action:
Why is polymorphism useful? Here's an example.
<A function that can take in a superclass as input parameter>

Instead of worrying about the detailed implementations, you only need to look at the method signatures in the interfaces to make the right call.

Those two I believe are the most fundamental concepts of OOP. There are more that comes with it, such as [Abstraction][abstraction], [Encapsulation][encapsulation], [Overloading][overloading].

[abstraction]: https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html "Abstraction in Java"
[encapsulation]: https://en.wikipedia.org/wiki/Encapsulation_(computer_programming) "Encapsulation"
[overloading]: http://beginnersbook.com/2013/05/method-overloading/ "Overloading in Java"