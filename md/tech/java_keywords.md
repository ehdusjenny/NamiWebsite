# Java Specific Keywords

Keywords:
1. `static`
1. `final`
1. `extends`
1. `implements`
1. `synchronized`
1. Access modifiers

There are overlapping material between this article and [OOP Concepts][oop_concepts]. If you'd like to know just the *functionality* aspect of Java keywords, then stay here. If you'd like to have a complete overview of the keywords, check out the OOP Concepts article!

This article assumes you have basic Java syntax knowledge.

## static

## final

## extends
A class can *inherit* attributes and methods from another class. Let's say all animals can have emotions, run, jump and bite. When we want to create `Cat` abd `Dog` classes, it seems a bit redundant to create the same methods for both of them. Let's create a **superclass** called `Animal` that encompasses all things that both dogs and cats can do.

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

public class testing {
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
Properties and methods within the `Dog` class belong only to `Dog` instances. A `Dog` object can bark, but a `Cat` object cannot since it has no method to bark. Likewise, a `Cat` object can meow, but a `Dog` object cannot. 

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

## implements

## synchronized

## Access modifiers

[oop_concepts]: http://www.nami.kim/#!/tech/oop_concepts "OOP Concepts"