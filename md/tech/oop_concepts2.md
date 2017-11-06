# Object Oriented Programming Concepts 2

This tutorial assumes you know basic Java syntax.

### Topics to cover:
1. [Multiple Inheritance in Java](http://www.nami.kim/#!/tech/oop_concepts2#multipleinheritanceinjava)

## Multiple Inheritance In Java
Multiple inheritance of superclasses is **not** allowed in Java to prevent the *Diamond Problem* from happening.

### Diamond Problem
Assume multiple inheritance is allowed in Java. Let's imagine the following situation:
<div style="background-color: #d2def2">
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
<div style="background-color: #d2def2">
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