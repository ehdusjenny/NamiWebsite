# (An Extremely Brief) Overview of LDAP

## Basic Terms
<b>Directory Servers</b>: A directory server is a server that hosts a database that stores information represented as trees of entries. It may be considered a type of NoSQL database.

## What is LDAP?
LDAP stands for Lightweight Directory Access Protocol. It is a protocol for accessing a directory in a directory server, and it runs on TCP/IP. These directories can contain anything, but generally only a small piece of information since write/update requests are slow for LDAP.

## Why LDAP?
LDAP is <b>lightweight</b>. The binary ASN.1 syntax used to encode LDAP messages is very compact and efficient to parse, compared to text-based protocols bloated by XML or JSON formatting. LDAP clients can use persistent connection, eliminating authentication overhead.

## When to use LDAP?
Consider using LDAP when you have a task that requires you to write/update infrequently, but read/query frequently. LDAP is designed for extremely fast reading/querying for a large dataset. Hence why LDAP is often used for, but not limited to, authentication.

## How to use LDAP?
LDAP queries are a series of key, value pairs. For an example, in an Active Directory, `givenName=Howard+city=Toronto` would return all directory objects that have the first name of Howard, and live in Toronto.
