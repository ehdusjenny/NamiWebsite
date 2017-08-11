# Spring

## Basics of Spring
**Spring** is a framework to support dependency injection, Aspect-Oriented Programming, Spring MVC web application, RESTful web service framework, support for JDBC, JPA, JMS, and more.

### Quick Integration of Spring
To add spring framework into your project, add it as a dependency in your [Maven][maven] POM file:
<div style="background-color: #d2def2">
```
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>4.3.10.RELEASE</version>
    </dependency>
</dependencies>
```
</div>

The spring-context module contains the core functionality of Spring, although there are other auxiliary modules.

### Dependency injection (DI)
**Dependency injection (DI)** is also known as **inversion of control (IoC)**. It is a process where objects define their dependencies via either:
1. constructor arguments,
1. arguments to a factory method, or
1. properties set on the object instance after it is constructed.

It is also called *inversion of control* because the responsibility of creating the dependencies and passing them to the object instance is given to an external component. In other words, the *control is inverted*. This allows you to create a clear separation between your project's functionalities (**modularity**). These modular components are also more *reusable*. 
This also decouples your code from dependencies so you can run tests in isolation.

Spring's **IoC container** is a term for Spring's component context that instantiates, assembles, configures, and manages objects and their life cycle from creation until destruction. These objects are called **beans**. 

Spring provides two types of containers:
1. `org.springframework.beans.factory.BeanFactory` is a simple container that supports only bean instantiation and wiring.
1. `org.springframework.context.ApplicationContext` provides support for bean instantiation/wiring, automatic `BeanPostProcessor` registration, automatic `BeanFactoryPostProcessor` registration, `MessageSource` access, and `ApplicationEvent` publication to event observers.

`ApplicationContext` is a sub-interface of `BeanFactory`. Essentially `ApplicationContext` adds more enterprise-specific functionality to `BeanFactory`.

The container manages beans by reading configuration metadata represented in XML, Java annotations, or Java code. 

With the configuration metadata and your business objects, the Spring container produces a fully configured system ready for use.

A business model typically contains service objects, data access objects (DAOs), presentation objects, and infrastructure objects.

### Example

`bikeStore.daos.Accounts`

<div style="background-color: #d2def2">
```
public class Accounts {
  ArrayList<Account> accounts;

  public Accounts() {
    // ...
  }

  public List<String> getUsernames() {
    // ...
  }
}
```
</div>

`bikeStore.daos.Items`

<div style="background-color: #d2def2">
```
public class Items {
  ArrayList<Item> items;

  public Items() {
    // ...
  }
}
```
</div>

`bikeStore.services.MainBikeServiceProvider`

<div style="background-color: #d2def2">
```
public class MainBikeServiceProvider {
  Accounts accounts;
  Items items;

  public MainBikeServiceProvider(Accounts pAccounts, Items pItems) {
    accounts = pAccounts;
    items = pItems;
  }
}
```
</div>

`services.xml`: 

<div style="background-color: #d2def2">
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bikeStore" class="bikeStore.services.MainBikeServiceProvider">
        <property name="pAccounts" ref="accounts"/>
        <property name="pItems" ref="items"/>
    </bean>

</beans>
```
</div>

`daos.xml`: 

<div style="background-color: #d2def2">
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accounts" class="bikeStore.daos.Accounts">
    </bean>
    <bean id="items" class="bikeStore.daos.Items">
    </bean>

</beans>
```
</div>

Term definition:
`bean id` attribute is a string used to identify the individual bean definition.
`bean class` attribute contains the fully qualified classname.
`property name` attribute refers to the name of the bean object property.
`property ref` attribute refers to the id of the bean.

To use the container, you can do the following:

<div style="background-color: #d2def2">
```
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
MainBikeServiceProvider service = context.getBean("bikeStore", MainBikeServiceProvider.class);

// use configured instance
List<String> userList = service.getUsernames();
```
</div>

### Aspect Oriented Programming (AOP)

[maven]: http://www.nami.kim/#!/tech/maven "Maven"