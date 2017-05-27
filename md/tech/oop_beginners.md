# Object Oriented Programming for Beginners

What is a programming language? Programming language is a human-friendly language designed to communicate with machines and give machines instructions.

This tutorial we'll be covering an Object Oriented Language - Java. This tutorial requires you to have a very basic programming background.

### Topics to cover:
1. Introduction to Objects
1. Inhertance
1. polymorphism

## Introduction to Objects
An **object** is a representation of anything that has a <span class="blue">*state*</span> and <span class="red">*behaviour*</span>. So an object can be a dog, a dog is <span class="blue">happy</span>, <span class="blue">sad</span>, <span class="blue">excited</span>, etc, and the dog can <span class="red">run</span>, <span class="red">jump</span>, <span class="red">bite</span>, etc.

<Create a little Java app that shows images of dogs doing things corresponding to the function>

So you can create a dog object and do all kinds of dog things.

The blueprint that defines what an object <span class="blue">is</span> and can <span class="red">do</span> is called a **class**.

## Inheritance
A class can *inherit* attributes and methods from another class.

### Example 1
<Animal superclass with animal specific methods (emotion and bite)>
<Change dog class to have only dog specific methods, inheriting the animal superclass attributes and methods>

The `Dog` class inherits properties and methods from the `Animal` class, since a dog is also an animal. 

Properties and methods within the `Dog` class are specific to dogs. `Cat` and `Fish` classes do not have properties and methods that dogs have. However, `Cat`, `Fish`, and `Dog` classes all share the same `Animal` properties and methods. 

### Example 2
<Student class extending a Person class>
Within McGill, a registered person is either a staff member or a student.
A student is a person, so the `Student` class inherits everything from the `Person` class. Inheritance can be seen as a one-way **IS-A** relationship; a student IS A person. However, the inverse is not necessarily true; a person is not necessarily a student.

The `Person` class has a property called `ID`, so both staff members and students have an `ID` associated with them.

Students can take courses, a staff member cannot. So course-taking functionality only belongs to the Student class.

### Inheritance in Action:
Both students and staff members can be granted access to rooms. So it makes sense to add that functionality to the Person class.

<Example code + calling the method as both objects>

## Polymorphism
In Java, there is another type called **interfaces**. Interfaces can contain constants and method signatures, but *not the actual implementation*.
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