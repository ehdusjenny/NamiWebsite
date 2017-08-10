# Spring and Maven

**Spring** is a framework to support dependency injection, Aspect-Oriented Programming, Spring MVC web application, RESTful web service framework, support for JDBC, JPA, JMS, and more.

**Apache Maven** is a build automation tool based on the concept of project object model (POM). 

**POM** is an XML file that contains
* Project information: project version, description, developers, mailing lists, etc
* Configuration details: dependencies, plugins, executables, etc
Executing maven will look for a `pom.xml` file in the current directory.

Minimum configuration for a POM:
<div style="background-color: #d2def2">
```
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1</version>
</project>
```
</div>

The project's artifact name is `<groupId>:<artifactId>:<version>`.

For a medium to large scale Java project, the developer may have their own custom modules, each with their own configurations. You can use either `project inheritance` or `project aggregation`.

## Project Inheritance
An example of project inheritance is Maven's default POM called the [**Super POM**][superpom]. Your project will inherit configuration defined by Super POM unless you override them in your own `pom.xml` file. 

The default packaging type is `jar`, and the default repository for dependencies is `http://repo.maven.apache.org/maven2`.



[superpom]: http://maven.apache.org/ref/3.0.4/maven-model-builder/super-pom.html "Super POM"