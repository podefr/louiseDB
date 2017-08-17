# LouiseDB

LouiseDB is an in-memory database that uses JS data structures to store data, there are no DB schemas.
Reads and writes are done via JS function calls (getters and setters), there is no query language.
The database can only be used as a library, embedded into your software. To use it as a server, you can wrap it
into your own server, or use LouiseDB-server (coming soon to a github near you).

### Current features:
- In-memory database
- No Schema/No query language
- Read/write using JS functions
- Use database as a library (no CLI nor server)
- Support for transactions. All setters exhibit the ACID properties.

### Current Limitations:
- DB size is limited to maximum amount of memory that your node.js process can allocate

### Desired features for MVP:
- Immutability?
- Hot reload of JS setters and getters without restarting the data store and losing database state
- Persist database to disk.
- Restore database from disk/snapshot

### Desired features for second milestone:
- Distribute read/write across replicas for performance
- Allow REST access to getters and setters
- Introduce LouiseDB-server which runs LouiseDB in its own process and offers a REST API

### Desired features if time and implementation allow:
- Support for large datasets by distributing database across several systems