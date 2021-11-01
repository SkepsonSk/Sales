# Specification

It is going to be a CRM app to facilitate the process of selling, helping the clients
and building business contacts. The APP will also have an API to make it easy to extend its functionality.

Functional requirements:
- finding clients in different sources;
- generating business opportunities;
- collecting business data like contacts, accounts etc...;
- creating and configuring orders manually by a consultant or via API;
- monitoring orders statuses;
- handling user cases.

Non-functional requirements:
- Node.js backend;
- Angular frontend;
- Keycloak as authorization server;
- Linux as operating system (not specified what distro yet - probably Debian);
- MariaDB as database system

---

##Object System:
- Easy data retrieval/create/edit/delete;
- Type independent (able to manipulate custom objects created by developers)

###Current plans:
#####Data Retrieval System (DRS):
- Simple GET retrieve(), should be used to retrieve set of data filtered by value of certain fields
