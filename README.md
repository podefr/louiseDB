# NoQLDB.js

NoQLDB stands for No Query Language Database.

It's a dumb in-memory database that uses JS data structures to store data.
Reads and writes are done via JS function calls.

Current features:
- In-memory database
- No Schema/No query language
- Read/write using JS functions

Desired features for MVP:
- Hot reload of JS setters and getters without restarting the data store and losing database state
- Persist database to disk.
- Restore database from disk/snapshot

Desired features for second milestone:
- Distribute read/write across replicas for performance
- Allow REST access to getters and setters

Desired features if time and implementation allow:
- Support for large datasets by distibuting database across several systems
- Support for transactions
- Immutability