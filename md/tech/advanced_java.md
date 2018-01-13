# Advanced Java

Summary/Notes taken from reading Effective Java<sup>TM</sup> by Joshua Bloch

This article highlights the best practices to employ while coding in Java (in most cases).

## Creating and Destroying Objects

In cases where objects with specific characteristics need to be created, static factory methods may be considered for clarity over constructors.

<table style="width: 100%;">
  <tr>
    <th></th>
    <th>static factory methods</th>
    <th>constructors</th> 
  </tr>
  <tr>
    <th style="white-space: nowrap">Control over method names</th>
    <td>In cases where objects with specific characteristics need to be created, static factory methods can have customized names to highlight the differences in what they return.</td>
    <td>Constructors cannot be named, and it's not clear in the class name what it returns, especially in cases where there are multiple constructors with different parameters.</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">Control over object creation</th>
    <td>With factory methods, you can choose to either return a new object or a saved object if an already existing object can be shared. This strict control over instances allows you to create singletons, as well as guarantee that no two objects will have equal properties. In the latter case, the client can use <pre>==</pre> instead of <pre>.equals()</pre> for improved performance.</td>
    <td>Constructors will always create new objects.</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">Control over return type</th>
    <td>Factory methods can return any subtype of the declared return type. This is useful for interface factory methods. Since interfaces cannot have implemented methods, factory methods can be put in a different non-instantiable (i.e. private constructor) class. Implementation details of the returned class subtypes are hidden this way (<i>encapsulation</i>). <b>Note: With Java 8, interfaces can have implemented methods (default methods), so need to look into how they'd work with this technique.</b></td>
    <td>Constructors must return the named instantiable class type.</td>
  </tr>
</table>

If only static factory methods are provided, i.e. constructors are private, then the given class cannot be subclassed. This may be a blessing in disguise, because it promotes [composition over inheritance](http://www.some_link_to_why_composition_is_better_than_inheritance.com).

A constructor with many parameters reduces readability. For an example:
<div class="code">
```
new NutritionFacts(3, 10, 20, 0, 55, 34)
```
</div>
It's not clear what the parameters are referring to. It is also impossible to opt-out of assigning certain parameters, unless you create constructors for all possible combinations of parameters (<i>telescoping constructor pattern</i>), like below: 
<div class="code">
```
NutritionFacts(int fat) { ... }
NutritionFacts(int fat, int calories) { ... }
NutritionFacts(int fat, int calories, int sugar) { ... }
...
```
</div>

To mediate this problem, you can design it so that the constructor takes in no parameters, but then require the user to call setter functions for each of the parameters. The problem with this is that it's harder to check for when the object is valid for use, and it's impossible to make the object immutable this way.

The cleanest and safest way to intialize an object with many parameters is to use the <i>Builder pattern</i>. A builder provides a constructor which takes in required parameters, and provides methods to set optional parameters. In the end, use the parameter-less `build()` method, which will return the actual object.
<div class="code">
```
public class MenuItem {
  private String name;
  private float price;
  private String description;
  private ArrayList<MenuItem> addOns;

  public static class Builder {
    // Required
	private String name;
	private float price;

	// Optional parameters
  	private String description;
  	private ArrayList<MenuItem> addOns = new ArrayList<>();

    public Builder(String name, float price) {
      this.name = name;
      this.price = price;
    }

    public Builder description(String description) {
      this.description = description;
      return this;
    }

    public Builder addOn(MenuItem addOn) {
      addOns.add(addOn);
      return this;
    }

    public MenuItem build() {
      return new MenuItem(this);
    }
  }

  private MenuItem(Builder builder) {
    name = builder.name;
    price = builder.price;
    description = builder.description;
    addOns = builder.addOns;
  }
}
```

The optional setter methods return the builder itself so the client may stack multiple methods on top of one another for better readability.

<div class="code">
```
MenuItem salad = new MenuItem.Builder("Green Salad", 5.50)
					   .description("Healthy side salad")
					   .build();

MenuItem padThai = new MenuItem.Builder("Pad Thai", 12.50)
                       .description("Stir-fried rice noodle")
                       .addOn(salad)
                       .build();
```
</div>

Builder pattern is very flexible. You can have multiple varargs, a single builder can build multiple objects, parameters can be tweaked between object creations to vary the objects. A base builder object with parameters already set can be passed to a method so the method can create variants on top of it.