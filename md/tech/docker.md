# Docker

Terminology: Container

## Images and Containers
### What are they?

A Docker **container** is an isolated, lightweight runtime environment. It is a runtime instance of a Docker **image**, which is an executable package containing the application code, libraries, environment variables, and configuration files. Simply deploy these containers and have your app processes running in its own isolated environment in no time.
An image being run in a container is guaranteed to behave the same regardless of where it is deployed. No more worries about maintaining a consistent production environment.

### How does this work?

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
    <td></td>
  </tr>
</table>
To do:
Docker swarm vs Kubernetes (container orchestration)