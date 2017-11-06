# Object Oriented Programming Concepts

This tutorial assumes you know basic Java syntax.

### Topics to cover:
1. [Objects and Classes](http://www.nami.kim/#!/tech/oop_concepts#introductiontoobjects)
1. [Inheritance](http://www.nami.kim/#!/tech/oop_concepts#inheritance)
    * Superclasses and `extends`
    * Interfaces and `implements`
1. [Polymorphism](http://www.nami.kim/#!/tech/oop_concepts#polymorphism)
1. [Overriding](http://www.nami.kim/#!/tech/oop_concepts#overriding)
1. [Overloading](http://www.nami.kim/#!/tech/oop_concepts#overloading)
1. [Abstraction](http://www.nami.kim/#!/tech/oop_concepts#abstraction)
    * Abstract classes
1. [Encapsulation](http://www.nami.kim/#!/tech/oop_concepts#encapsulation)
    * Access modifiers: private, package-private, protected, and public

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
A class can have many **methods**, which are blocks of code designed to achieve a single goal. In this case, there are methods to run, jump and bite, as well as setting the mood of the dog. A class can also have **attributes**, which are the characteristics of object instances of the class.
Create a happy dog object called charles with the following declaration: `Dog charles = new Dog("Happy")`. Make this dog run with `charles.run()`. 

Calling the `main` method will print
<div style="background-color: #d2def2">
```
I am a dog and I am Happy.
I am running.
```
</div>

## Inheritance
Inheritance in Java can be done in two ways: extending a superclass, or implementing an interface. Let's first look at extending a superclass.

### extends
A class can *inherit* attributes and methods from another class. Let's say all animals can have emotions, run, jump and bite. When we want to create a `Cat` class, it seems a bit redundant to create the same methods that the Dog class already has. So let's create a **superclass** called `Animal` that encompasses all things that both dogs and cats can do.

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
}

public class Inheritance {
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

The `Dog` class inherits properties and methods from the `Animal` superclass, since a dog is also an animal. The same goes for the `Cat` class. This means a `Dog` object has a mood, can run, jump and bite. A `Cat` object also has a mood and can run, jump and bite. Calling `miku.run()` will call the `run()` method of the `Animal` class.
Properties and methods within the `Dog` class belong only to `Dog` instances. A `Dog` object can bark, but not a `Cat` object since it has no method to bark. Likewise, a `Cat` object can meow, but a `Dog` object cannot. 

Calling the `main` method will print
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

### implements
In Java, there is another type called **interfaces**. Interfaces can contain constants and method signatures, but *not the actual implementation*.
<div style="background-color: #d2def2">
```
public Interface Human {
    public int getAge();
    public int getHeightInCM();
}

public Interface Employee {
    public int getSalary();
    public String getPosition();
}

public class Nami implements Human, Employee{
    int age = 23;
    int heightInCM = 167;
    int salary = 90000;
    String position = "Software Developer";
    public int getAge() {
        return age;
    }
    public int getHeightInCM() {
        return heightInCM;
    }
    public int getSalary() {
        return salary;
    }
    public String getPosition() {
        return position;
    }
}
```
</div>
`Nami` is a class that implements two interfaces, `Human` and `Employee`. Then the `Nami` class has to implement all the methods from `Human` and `Employee` interfaces. A `Nami` Object **IS-A** `Human` and `Employee`.

Note that you cannot extend multiple classes, but you can implement multiple interfaces.

You can see interfaces as a type of **contract** - an interface does not care about the implementation as long as you deliver the method signatures.

## Polymorphism
Polymorphism is the ability for an object to take on many forms. In OOP, a parent interface/class reference can be used to refer to a child class object, i.e. the following, using the same example as above:
<div style="background-color: #d2def2">
```
public class InterfacePolymorphism {
    Nami nami = new Nami();
    Human namiHuman = nami;
    Employee namiEmployee = nami;
}
```
</div>
So three references `nami`, `namiHuman`, and `namiEmployee` are all pointing to the same object. 

Likewise for classes:
<div style="background-color: #d2def2">
```
public class ClassPolymorphism {
    Cat miku = new Cat();
    Animal catAnimal = miku;
}
```
</div>
## Overriding
With polymorphism comes another concept: overriding. A subclass inherits all methods from its superclass. A subclass can choose to **override** any of these methods, i.e.:
<div style="background-color: #d2def2">
```
public class Animal {
    public void run() {
        System.out.println("I am running.");
    }
}

public class Dog extends Animal {
    public void run() {
        System.out.println("I am running like a dog.");
    }
}

public class Overriding {
    public static void main(String[] args) {
        Dog charles = new Dog();
        charles.run();
    }
}
```
</div>
The above will print
<div style="background-color: #d2def2">
```
"I am running like a dog."
```
</div>
Now, what would print if you ran the following?
<div style="background-color: #d2def2">
```
Animal charles = new Dog();
charles.run();
```
</div>
The above will print
<div style="background-color: #d2def2">
```
I am running like a dog.
```
</div>
The object `charles` has a static type of `Animal`, which is determined at *compile time*. It has a dynamic type of `Dog`, which is determined at *runtime*. Method overrides are determined at runtime, and the dynamic binding has precedence over the static binding.

## Overloading
When two or more methods have the same method name, but with different input parameters.
For an example,
<div style="background-color: #d2def2">
```
public class FeedAnimals {
    public void feed(Dog dog) {
        System.out.println("I am feeding a dog.");
    }
    public void feed(Cat cat) {
        System.out.println("I am feeding a cat.");
    }
    public static void main(String[] args) {
        Cat cat = new Cat();
        Dog dog = new Dog();
        FeedAnimals fa = new FeedAnimals();
        fa.feed(cat);
        fa.feed(dog);
    }
}
```
</div>
will print
<div style="background-color: #d2def2">
```
I am feeding a cat.
I am feeding a dog.
```
</div>

Unlike overrides, overloaded method calls are resolved during compile time. Therefore, static binding has precedence over dynamic binding.
The following code
<div style="background-color: #d2def2">
```
public class FeedAnimals {
    public void feed(Animal animal) {
        System.out.println("I am feeding an animal.");
    }
    public void feed(Cat cat) {
        System.out.println("I am feeding a cat.");
    }
    public static void main(String[] args) {
        Animal cat = new Cat();
        FeedAnimals fa = new FeedAnimals();
        fa.feed(cat);
    }
}
```
</div>
will print
<div style="background-color: #d2def2">
```
I am feeding an animal.
```
</div>

## Abstraction
In OOP, Abstraction is a way of hiding implementation details that are irrelevant/unnecessary to the user by providing only the functionality details. This can be done using abstract classes as well as interfaces, which we've already discussed.

An **abstract class** is a class that *may* contain **abstract methods**, which are methods without implementation, unlike an interface where none of the methods can have implementations.
The following is an abstract class:
<div style="background-color: #d2def2">
```
public abstract class Character {
    String name;
    int age;

    public Character(String pName, int pAge) {
        name = pName;
        age = pAge;
    }

    public abstract void talk(String sentence);
}
```
</div>
To extend an abstract class, the subclass must either implement all the abstract methods it inherits, or declare itself as abstract.

An abstract class cannot be instantiated, i.e. you cannot declare:
<div style="background-color: #d2def2">
```
Character person = new Character();
```
</div>

## Encapsulation
Encapsulation is a process of binding or wrapping the data and the codes that operate on the data into a single entity. 

In Java, encapsulation is done through access modifiers. Access modifiers are used to set the access levels for classes, interfaces, variables, methods and contructors. They *encapsulate* their data/code so the outside world cannot access them.

### No modifier (package-private)
If you don't specify a modifier, then that class, variable, method or constructor is visible only to the package it belongs to. 

A **package** is a group of similar types of classes, interfaces, and sub-packages that work together. Common Java packages are *java*, *lang*, and *javax*.

An example code using no modifier:
<div style="background-color: #d2def2">
```
String returnHello() {
    return "Hello";
}
```
</div>

### private
A private method, variable, or constructor is accessible only within the class it belongs to. Classes and interfaces cannot be private.

Private is the most restrictive access control and provides the strongest encapsulation.

An example code using private:
<div style="background-color: #d2def2">
```
private String sentence;

public void setSentence(String pSentence) {
    sentence = pSentence;
}

public String getSentence() {
    return sentence;
}
```
</div>

`sentence` is private. It is only accessible through setter and getter methods. 

### protected
Protected variables, methods and constructors are accessible only by its subclasses in any package, and by any classes within its own package.

Classes, interfaces, and methods and fields in an interface cannot be declared protected.

An example code using protected:
<div style="background-color: #d2def2">
```
class Runner {
    protected void run() {
        //implementation
    }
}

class LongDistanceRunner extends Runner {
    public void run() {
        for (int i = 0; i < 3; i++) {
           super.run();
        }
    }
}
```
</div>

Note that `LongDistanceRunner` extends `Runner`, i.e. it is a subclass of `Runner`.
When a LongDistanceRunner object calls its `run()` function, the super class `Runner`'s `run()` function will be called three times.
The Runner's `run()` method cannot be called outside of its package or by a non-subclass.

### public
Public classes, methods, constructors, interfaces, or variables can be accessed anywhere. They are open to the world. 

For an example, the main method is always public since it needs to be called by a Java interpreter:
<div style="background-color: #d2def2">
```
public static void main(String[] args) {
    // ...
}
```
</div>

Note that to access something public in a different package, you must import it first.

Here's a simple table summarizing the accessibility of the modifiers:
<table style="width: 100%;">
  <tr>
    <th>Modifier</th>
    <th>Class</th>
    <th>Package</th> 
    <th>Subclass</th> 
    <th>World</th> 
  </tr>
  <tr>
    <th style="white-space: nowrap">private</th>
    <td>Y</td>
    <td>N</td>
    <td>N</td>
    <td>N</td>
  </tr>
  <tr>
    <th style="white-space: nowrap"><i>no modifier</i></th>
    <td>Y</td>
    <td>Y</td>
    <td>N</td>
    <td>N</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">protected</th>
    <td>Y</td>
    <td>Y</td>
    <td>Y</td>
    <td>N</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">public</th>
    <td>Y</td>
    <td>Y</td>
    <td>Y</td>
    <td>Y</td>
  </tr>
</table>

The main method of any java program is
<div style="background-color: #d2def2">
```
public static void main(String[] args) {
    // ...
}
```
</div>
It is public and static so that java can access it without initializing the class object. The `args` array contains the arguments passed to the java program.

<!-- ## Why OOP?
Here's a table showing the pros and cons of OOP:
<table style="width: 100%;">
  <tr>
    <th>Pros</th>
    <th>Cons</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
</table> -->

[//]: # (Add justifications for employing these principles)