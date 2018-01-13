# Object Oriented Programming Concepts 2

This tutorial assumes you know basic Java syntax.

### Topics to cover:
1. [Multiple Inheritance in Java](http://www.nami.kim/#!/tech/oop_concepts2#multipleinheritanceinjava)
1. [Marker Interfaces](http://www.nami.kim/#!/tech/oop_concepts2#markerinterfaces)
1. [Wrapper Classes](http://www.nami.kim/#!/tech/oop_concepts2#wrapperclasses)

## Multiple Inheritance In Java
Multiple inheritance of superclasses is **not** allowed in Java to prevent the *Diamond Problem* from happening.

### Diamond Problem
Assume multiple inheritance is allowed in Java. Let's imagine the following situation:
<div class="code">
```
public abstract class SuperClass {
	public abstract void someMethod();
}

public class ClassA extends SuperClass {
	@Override
	public void someMethod() {
		// ...
	}
}

public class ClassB extends SuperClass {
	@Override
	public void someMethod() {
		// ...
	}
}

public class ClassC extends ClassA, ClassB {
	public void otherMethod() {
		someMethod();
	}
}
```
</div>
When you call `otherMethod()` on a ClassC object, the compiler would not know which superclass method implementation it is referring to.

Multiple inheritances is allowed with interfaces. This is possible because the implementation is done by the caller, so there is no ambiguity in which implementation to call.

What if a class implements two interfaces that share the same method signature?
<div class="code">
```
public interface InterfaceA {
	void someMethod();
}

public interface InterfaceB {
	void someMethod();
}

public class ClassA implements InterfaceA, InterfaceB {
	@Override
	public void someMethod() {
		// ...
	}
}

public class Tester {
	public static void main(String[] args) {
		ClassA example = new ClassA();
		example.someMethod();
		((InterfaceA) example).someMethod();
		((InterfaceB) example).someMethod();
	}
}
```
</div>

All three calls to `someMethod()` runs the same `ClassA` implementation. In effect, the two `someMethod()` defined by two separate interfaces is one method and are not distinguishable. They are called `@Override`-equivalent.
Note that the two methods must meet the same requirements of method overriding and hiding - i.e. share exactly the same signature, i.e. same access modifier and return type. Otherwise, there would be a compilation error.

## Marker Interfaces
Marker interfaces are interfaces with no method signatures declared. Implementing these empty interfaces is a way of storing class metadata, ex. Serializable objects will behave as expected when serialized/deserialized. 

With Java annotations, one might think marker interfaces are useless, but marker interfaces has  one advantage over marker annotations: Marker interfaces define a type for the class, so you can catch errors at compile time instead of at runtime.

With both annotations and interfaces, you can enforce inheritance. Interface inheritance is done simply by using the `implements` keyword, and annotation inheritance is done by creating an annotation type with `@Inherited`:
<div class="code">
```
@Inherited
@OneAnnotation
@AnotherAnnotation
public @interface InheritedAnnotationType {
}
```

@InheritedAnnotationType
public someClass {
	// ...
}

public anotherClass extends someClass {
	// ...
}
</div>

In the above case, both `someClass` and `anotherClass`have annotations `@OneAnnotation` and `@AnotherAnnotation`. 

## Wrapper Classes

In Java, there are object representations of each of the eight primitive types, ex. Integer, Character, etc. These are called wrapper classes because they "wrap around" the primitive types. These classes are **final** and **immutable**, which means the classes cannot be extended and the instantiated object values cannot change (although they can point to a new object with a different value).

With Java 5 came *autoboxing* and *unboxing*, where the compiler makes automatic conversions between primitive types and corresponding wrapper classes so developers don't have to cast them manually.