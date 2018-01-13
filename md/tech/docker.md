# Docker - A Brief Summary

### Images and Containers
A Docker **container** is an isolated, lightweight runtime environment. It is a runtime instance of a Docker **image**, which is a package containing the application code, libraries, environment variables, and configuration files. Simply deploy these containers and have your app processes running in its own isolated environment in no time.

An image being run in a container is guaranteed to behave the same regardless of where it is deployed. No more worries about maintaining a consistent production environment!

### Containers vs VMs
<table style="width: 100%;">
  <tr>
    <th></th>
    <th>Virtual Machines</th>
    <th>Docker Containers</th>
  </tr>
  <tr>
    <th style="white-space: nowrap">Resource Efficiency</td>
    <td>Each VM has its own virtual operating system, which is resource heavy. The end result is a mix of OS settings, system-dependent libraries, and other hard-to-replicate configurations.</td> 
    <td>Docker containers share common resources using Copy-On-Write technique (discussed more below).</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">Isolation</td>
    <td>Since each VM is allocated its own set of resources, there is minimal sharing and you get more isolation.</td> 
    <td>There is a lot of resource sharing among Docker containers, which makes it lightweight but less isolated.</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">Speed</td>
    <td>A VM takes minutes to start.</td> 
    <td>A Docker container starts instantaneously.</td>
  </tr>
</table>

### How does this work?
There is a single persistent executable daemon that manages all the Docker container processes.

A file named `Dockerfile` contains config code defining everything you need to build your image.

An example `Dockerfile`:
<div class="code">
```
FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y curl
RUN curl www.somesite.com/my_project.py
RUN python my_project.py
```
</div>

This will first check if the base image `ubuntu:14.04` exists locally, if not will pull from Docker Hub by default. After, it will run the next four commands and run your Python program.

Docker images are layered. For an example, it could be a layer of Ubuntu, Apache2, Java 7, then your front-end code.

Lower layers can be re-used. If you have another application that uses Ubuntu, Apache2, and Java 8, you can take the same Ubuntu and Apache2 layer, and upgrade to Java 8 on top of that. 

Docker utilizes **copy-on-write (COW)** technique on their layers to be able to build and run containers fast. COW technique states that if a resource is to be duplicated but not modified, it's not necessary to create a new resource. The original resource will be shared until a modification takes place. This means that if you spawn a process running a new Docker container, the only thing you may need to write to disk is the higher layers (application code).


<sub>
To do:
Docker swarm vs Kubernetes (container orchestration)
</sub>