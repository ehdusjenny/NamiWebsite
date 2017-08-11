# Maven

## Basics of Maven
**Apache Maven** is a build automation tool based on the concept of project object model (POM). 

**POM** is an XML file that contains
* Project information: project version, description, developers, mailing lists, etc
* Configuration details: dependencies, plugins, executables, etc
Executing maven will look for a `pom.xml` file in the current directory.

Minimum configuration for a POM:
<div style="background-color: #d2def2">
```
<project>
  <modelVersion>1.0.0</modelVersion>
  <groupId>company.team.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1</version>
</project>
```
</div>

The project's artifact name is `<groupId>:<artifactId>:<version>`.

For a medium to large scale Java project, you may have your own custom modules, each with their own configurations. To configure dependencies between these projects, you can use either `project inheritance` or `project aggregation`.

## Project Inheritance
An example of project inheritance is Maven's default POM called the [**Super POM**][superpom]. Your project will inherit configuration defined by Super POM unless you override them in your own `pom.xml` file. 

The default packaging type is `jar`, and the default repository for dependencies is `http://repo.maven.apache.org/maven2`.

To inherit your own custom POM file:
<div style="background-color: #d2def2">
```
<project>
  <parent>
    <groupId>company.team.app</groupId>
    <artifactId>my-app</artifactId>
    <version>1</version>
	<!-- specify relative path if parent POM file is not in the parent directory -->
    <relativePath>../parent/pom.xml</relativePath>
  </parent>
  <modelVersion>1.0.0</modelVersion>
  <artifactId>my-module</artifactId>
</project>
```
</div>

## Project Aggregation/Composition
Instead of specifying the parent in the child projects, you can specify child projects in the parent. The parent project must specify the packaging type to `pom` and list the child projects to include under the `modules` tag.

<div style="background-color: #d2def2">
```
<project>
  <modelVersion>1.0.0</modelVersion>
  <groupId>company.team.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1</version>
  <packaging>pom</packaging>

  <modules>
  	<!-- path to the directory that contains the child POM -->
    <module>../my-module</module>
  </modules>
</project>
```
</div>

## Which one to use?
If your project has several Maven projects with similar configurations, you can refactor by pulling out those similar configurations and making a parent project. 

Aggregation/composition may be used to simplify the build tree. Instead of multi-level nested projects, you can specify all the modules your project needs at top level.

## Project Interpolation
If you find yourself using the same value multiple times in different locations, you can use custom and pre-defined variables.

<div style="background-color: #d2def2">
```
<project>
  <parent>
    <groupId>company.team.app</groupId>
    <artifactId>my-app</artifactId>
    <version>1</version>
  </parent>
  
  <modelVersion>1.0.0</modelVersion>
  <groupId>company.team.app</groupId>
  <artifactId>my-module</artifactId>
  <!-- The below variable is referring to the parent's version 1 -->
  <version>${project.parent.version}</version>

  <properties>
  	<!-- custom property mavenVersion can be referenced as ${mavenVersion} -->
    <mavenVersion>2.1</mavenVersion>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-artifact</artifactId>
      <version>${mavenVersion}</version>
    </dependency>
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-project</artifactId>
      <version>${mavenVersion}</version>
    </dependency>
  </dependencies>
</project>
```
</div>

Maven also has special build-in properties:
<table style="width: 100%;">
  <tr>
    <th>Properties</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td>${project.basedir}</td> 
    <td>The directory containing `pom.xml`</td>
  </tr>
  <tr>
    <td>${project.baseUri}</td> 
    <td>The URI of the directory containing the `pom.xml`</td>
  </tr>
  <tr>
    <td>${maven.home}</td>
    <td>The path to the current Maven home</td>
  </tr>
  <tr>
    <td>${maven.version}</td> 
    <td>The version number of the current Maven execution</td>
  </tr>
  <tr>
    <td>${maven.build.version}</td> 
    <td>The full build version of the current Maven execution</td>
  </tr>
</table>

[superpom]: http://maven.apache.org/ref/3.0.4/maven-model-builder/super-pom.html "Super POM"
[//]: # (Look into Josh Bloch's Effective Java discussing Aggregation vs Inheritance)