# Entity Framework

Entity Framework (EF) is a .NET object-relational mapper that enables developers to work with data in the form of domain-specific objects and properties, without concerning themselves with the underlying database details (similar to Spring Hibernate, Java's equivalent).

Two layers and their subcomponents in an EF application:

- Modelling layer
	- <b>Conceptual model</b> consisting of domain-specific entity types and relationships, based on an Entity Data Model
	- <b>Database schema</b> that defines tables and relationships
	- <b>Mapping</b> between the conceptual model and the database schema
- Object layer

EF uses the mapping component of the modelling layer to transform operations against entity objects into equivalent operations in the database.

