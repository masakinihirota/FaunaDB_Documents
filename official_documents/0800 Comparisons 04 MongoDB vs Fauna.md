MongoDB vs Fauna (or Mongo vs Fauna) | Fauna Documentation
https://docs.fauna.com/fauna/current/comparisons/compare-faunadb-vs-mongodb


# MongoDB vs Fauna (or Mongo vs Fauna)






Author: **Nathaniel May**, Senior Software Engineer, Fauna  
April 2019






Contents:






-   [Introduction](#introduction)
-   [Terminology](#terminology)
-   [Query APIs](#query-apis)
-   [Indexes](#indexes)
-   [Schema design](#schema-design)
-   [Transactional model](#transactional-model)
-   [Consistency models](#consistency-models)
-   [Storage](#storage)
-   [Security](#security)
-   [Fault tolerance](#fault-tolerance)
-   [Scalability](#scalability)
-   [Operations](#operations)
-   [Jepsen tests](#jepsen-tests)
-   [Summary](#summary)






## [](#introduction)Introduction






Fauna and MongoDB are both general-purpose databases that were built to address the ongoing need for a simple, scalable, and easy-to-manage database. The two technologies have some similarities: both support highly-available deployment models, horizontal scalability, and document-based schemas. However, they differ in their underlying transactional behavior, consistency guarantees, and available data-modeling paradigms. They differ further in their provisions for multi-tenancy, quality of service, and temporality.






MongoDB is currently the most widely-used NoSQL database, and its users celebrate its document-based data model and its horizontally-scalable distributed architecture. In order to achieve this scalability, the MongoDB architecture exchanges ACID transactions for eventual consistency, which weakens the safety guarantees it can provide.






Fauna was built to deliver the capabilities of a NoSQL system without sacrificing the safety of an RDBMS. Specifically, Fauna caters to enterprise workloads by prioritizing data integrity and correctness without compromising scalability, flexibility, or performance. Fauna is designed to be resistant to real-world failures, and data remains consistent even in the face of node outages, network partitions, and clock skews. Fauna’s Calvin-based architecture makes this high level of resiliency possible. Fauna is also attractive to developers: providing strong consistency guarantees and natively supporting both document structures and relational workloads. These qualities make Fauna a suitable choice for enterprises in many industries, such as financial services, e-commerce, telecommunications, and travel.






## [](#terminology)Terminology






For clarity, this page disambiguates the terminology that each technology uses to describe itself:













MongoDB






Fauna






Explanation






Document






Document






An individual record in the database.






Collection






Collection






A container for documents.






Standalone






Cluster






Fauna clusters with a single node are like a MongoDB standalone, but they do not require downtime or additional configuration to add nodes for replication or partitioning.






Replica Set






Cluster






Fauna clusters with no partitions are like a MongoDB replica set, but they do not require downtime or additional configuration to partition data.






_Not Applicable_






Replica






Fauna replicas contain a complete copy of the data in a single locality. Data within a replica is partitioned across one or many nodes. A cluster may contain one or more replicas.






Sharded Cluster






Cluster






A term referring to all of the processing, storage, and networking infrastructure that provisions the database, regardless of the presence of partitions or multiple replicas.






Primary






Query Coordinator






Any node in a Fauna cluster can be the query coordinator for a given request.






Secondary






_Not Applicable_






Fauna does not have any eventually-consistent replication members. All Fauna nodes can be read from and written to like MongoDB Primaries.






Shard Key






_Not Applicable_






MongoDB requires users to choose a permanent shard key that determines how data is related and distributed among physical shards. In Fauna, this distribution is always a hash of the document ID.






MongoS






Query Coordinator






In a MongoDB sharded cluster, the MongoS nodes keep a cached map of where each shard-key range lives. In a Fauna cluster, every node has a consistent copy of this information.






Config Server






Node






In a MongoDB sharded cluster, the config servers are the durable source of truth for the map of where each shard-key range of documents lives. In a Fauna cluster, every node has a consistent copy of this information.






Transaction






Transaction






MongoDB transactions are only available on replica set deployments. Fauna supports transactions on all cluster configurations across multiple partitions.






## [](#query-apis)Query APIs






MongoDB distinctly separates itself from SQL databases by providing a familiar object-oriented query language bearing similarities to Javascript. The language has queries for standard CRUD operations, and an aggregation pipeline for running computations on the database and returning results to the client. Aggregations can be issued by stringing together pipeline stages, calling the map-reduce function, or by using single-purpose aggregation methods. For databases using version 3.2 or higher, MongoDB also supports SQL queries with the BI Connector, a GUI interface with Compass, or an HTTP interface.






MongoDB also supports search engine functions and graph queries. Basic search engine capabilities have been supported via the [text search](https://docs.mongodb.com/manual/text-search/) feature since version 2.4. Text search returns weighted results with support for custom weighting, case and diacritic insensitivity, and custom delimiters across [15 different languages](https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages). Simple recursive graph queries have been supported via the `$graphLookup` feature since version 3.4. Queries can take recursively-defined paths across unsharded collections where the value of a foreign field matches the value of a field in the current document. `$graphLookup` returns an array of results and supports max depth and match restrictions.






Fauna supports [multiple query interfaces](https://fauna.com/blog/new-platform-apis-graphql-cql-sql) which all offer the ability to access and manipulate data with the same transactional, consistency, and security guarantees without the need to deploy extra software. Fauna provides Fauna Query Language (FQL) and GraphQL (beta) interfaces, each with unique benefits. Many queries may use similar logic to return complex results, and the highly composable, expression-oriented architecture of FQL allows developers to easily reuse common query segments. GraphQL has emerged as a popular and powerful abstraction that allows complex queries to be composed from simple calls without the need to change the underlying storage of the data. SQL and CQL interfaces are coming soon.






## [](#indexes)Indexes






Indexes in MongoDB are implemented with modified B+ trees in a similar fashion to other popular database technologies. Once indexes are loaded into memory they remain there with changes persisted to disk. Each node of the B+ tree stores a subset of a document’s values with a pointer to the rest of the document. These indexes provide support for both range queries and sorted results. MongoDB supports indexes that are unique, sparse, partial, and case-insensitive. Text indexes are a special type of index that allow for basic search engine queries that return weighted results.






In Fauna, indexes are implemented — similar to materialized views — such that the indexed fields are stored in a separate document. Indexes offer a variety of uses, such as: storing data with a specified order, storing a subset of an document’s fields (projection), persisting computations, and combining data from multiple collections. Indexed documents maintain referential integrity with source documents, so they are never out of sync. When a source document is needed, Fauna’s first-class support for relational workloads with transactions provides efficient access to both the index and source document in a single query. Fauna also supports unique constraints and serialized indexes, which both provide [strict serializability](https://docs.fauna.com/fauna/current/concepts/isolation_levels) to writes.






## [](#schema-design)Schema design






Schema design best practices in MongoDB rely on denormalization. A MongoDB schema should map application use cases—not the data’s relationships—to document and collection structures. In order to minimize database calls and take advantage of document atomicity, one document often contains all of the required information to load a page to a user. Data often needs to be duplicated across documents and collections to create a well-designed schema that supports simple, efficient reads. MongoDB does not provide support for referential integrity constraints, leaving enforcement to two-phase commit logic in the application, a background process, or transactions using MongoDB version 4.0 or higher without sharded collections.






MongoDB supports—but discourages—joins with the `$lookup` function. These joins are always left outer joins, and can use any field in the foreign document to return an array of results, but are unavailable on sharded collections. As of version 3.6, MongoDB supports non-materialized views by prepending aggregation pipeline stages to incoming queries, but does not support materialized views. Like other popular databases, an efficient MongoDB schema relies heavily on accompanying indexes for read performance.






Effective schema design in Fauna takes advantage of both the first-class support for relational modeling, and materialized indexes. Fauna supports the fully-denormalized document model, but referential integrity can be enforced in both transactions and indexes, thereby relieving application developers from implementing complicated logic to guarantee correctness. Furthermore, creating denormalized collections for each use case can unnecessarily increase storage utilization and I/O contention. By utilizing Fauna’s globally-consistent transactions and user-defined functions, developers can minimize their storage needs without compromising performance. For a detailed example, [this e-commerce application](https://docs.fauna.com/fauna/current/tutorials/ecommerce) uses effective Fauna schema design and is accompanied by full code examples.






## [](#transactional-model)Transactional model






MongoDB has always encouraged the use of denormalized schemas and embedded documents to ensure consistency via atomic document updates. This is still the preferred method even with the release of atomic multi-document transactions in version 4.0. The [MongoDB documentation](https://docs.mongodb.com/v4.0/core/write-operations-atomicity/) states that "in most cases, \[a\] multi-document transaction incurs a greater performance cost over single document writes and the availability of multi-document transaction\[s\] should not be a replacement for effective schema design." Multi-document transactions are not available for sharded clusters as of version 4.0.






Fauna uses the [mechanics of Calvin](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol) to efficiently achieve [ACID transactions in a distributed environment](https://fauna.com/blog/acid-transactions-in-a-globally-distributed-database) without clocks. Developers can safely build applications without writing code specific to the deployment model or internal mechanics of the database. This is unfortunately not so with popular NoSQL databases which follow the weaker BASE model. To achieve horizontal scalability, these technologies have surrendered ACID transactions for systems which are only basically available, with soft state, and eventual consistency. SQL systems simply forgo horizontal scalability altogether to provide developers with the safety of ACID operations. Fauna achieves both without compromise.






## [](#consistency-models)Consistency models






In order for MongoDB reads to be consistent, developers must prevent queries from including data that could be rolled back, and ensure that no writes will occur during the read. Documents can be rolled back if they have not yet replicated to a majority of nodes, so developers must issue queries with a [read concern](https://docs.mongodb.com/manual/reference/read-concern/) of `majority`, `snapshot`, or `linearizable` to avoid including results that are not durable. However, workloads that require a linearized view of the data are limited to queries that uniquely identify a single document. Multi-document transactions in version 4.0 or higher are required to view a consistent state in time across multiple documents. These transactions use [read locks](https://docs.mongodb.com/manual/faq/concurrency/) to ensure that no process will write to the documents until the entire set has been read by the transaction, and because transactions are not available on a sharded cluster as of version 4.0, there is no way to issue a consistent read across multiple documents on a sharded cluster. MongoDB encourages users to leverage its document-based schema to minimize the presence of these queries, and instead read from a single document.






All Fauna queries are consistent across all deployment models and offer [strong isolation levels](https://docs.fauna.com/fauna/current/concepts/isolation_levels). Write operations are strictly serializable unless they involve a non-serialized index, for which writes provide snapshot isolation. Reads are serializable by default, but can be strictly serializable by using the `/linearized` endpoint, or by including a no-op write. Fauna has a temporal storage engine which stores the history of all changes to documents for a default period of 30 days. This allows queries to observe data as it existed at a specific point in time, called a snapshot. All Fauna queries are issued with a snapshot time and never include any uncommitted writes, partially-applied writes, or writes that could be rolled back.






## [](#storage)Storage






MongoDB has a pluggable storage engine API, and uses WiredTiger as the default storage engine as of version 3.2. With WiredTiger, MongoDB offers both snappy and zlib compression levels, as well as encryption at rest with a supported key server.






Fauna embeds Cassandra’s storage engine and provides LZ4 compression. By default, Fauna stores the last 30 days of history for each documents, and temporal queries may use any point-in-time snapshot within that history. Temporal storage also provides simple recovery after accidental data loss and streamlined integration debugging.






## [](#security)Security






MongoDB offers support for SCRAM, x509, LDAP, and Kerberos authentication, role-based access control with user-defined roles, permissions on collection subsets via non-materialized views, TLS/SSL for the database and clients, encryption at rest, auditing controls, and tenant separation via databases. MongoDB does not enable authentication by default. There have been numerous reports of MongoDB databases being breached, with some having their data held for ransom because users failed to set passwords on their production systems.






MongoDB supports using x.509 certificates for replica set membership and client authentication. It is possible to accidentally issue a client x.509 certificate that grants full permission to the system regardless of existing role-based access controls, per known x.509 behavior. From the [MongoDB documentation](https://docs.mongodb.com/v4.0/tutorial/configure-x509-client-authentication/): "If a client x.509 certificate’s subject has the same O, OU, and DC combination as the Member x.509 Certificate, the client will be identified as a cluster member and granted full permission on the system."






Fauna offers support for authentication via secure access keys, attribute-based access controls, native document-level permissions, TLS/SSL for the database and clients, client/tenant separation via database hierarchies, priority workloads, as well as secure access tokens for direct client access to the database. Fauna clusters require authentication and cannot be left accidentally unprotected.






## [](#fault-tolerance)Fault tolerance






Node failures in MongoDB are handled by the replica set. Replication is eventually consistent, and is implemented via the capped oplog collection. Writes to a replica set are always issued to the currently-elected primary where data is written to the collection, and an idempotent statement is written to the oplog. Each secondary applies the operations by opening a tailable cursor on the primary’s oplog, and copies all changes since the last change recorded in that node’s copy of the oplog. Because of this eventually-consistent implementation of data replication, all reads on secondaries are assumed to be stale.






MongoDB’s secondary failures go unnoticed unless a majority of servers are unavailable. If the primary fails, a new primary is elected by the remaining nodes with a prioritized version of Raft, and the system continues to operate normally. Writes that use the default write concern of `w:1` and have been acknowledged will be rolled back if they have not replicated to any secondaries. The effect of this is lost data under normal operating conditions, if defaults have not been overridden. If a secondary becomes unavailable, it picks up where it left off when it comes online, if the last-seen operation is still in the primary’s oplog. If that operation is not in the primary’s oplog, it performs an initial sync and copies all data, then applies all operations that occurred during the copy, to return to a consistent point in time. Small oplogs on systems with high write volumes can leave secondaries unable to rejoin the replica set after a failure, which can lead to a loss of availability of the entire cluster.






All Fauna nodes are connected to all other nodes in the cluster. When a node in a Fauna replica becomes unavailable, reads are directed to a non-local copy until that node becomes available again. Because replication in Fauna is implemented with the [Calvin protocol](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol), all transactions are first made durable in the transaction log before being applied to data nodes, so that server outages do not affect correctness. If a node is down, the length of the transaction log is extended so that it can apply the transactions it missed when it comes back online. In order for the cluster to stay available for clients, a majority of servers for each of the log segments must remain available, and a single full copy of the data must exist across any number of replicas.






## [](#scalability)Scalability






MongoDB provides sharded clusters as a way to horizontally scale the largest of workloads across many replica sets. Creating a sharded cluster requires a small amount of downtime to deploy config servers, and to point application drivers to `mongos` processes instead of the data nodes. Using a sharded cluster requires creating a custom shard key for each collection that needs to span more than one shard. A well-designed shard key distributes write operations to minimize balancer activity, concentrates query results for performance, and has a high cardinality in order to prevent jumbo chunks that are difficult to move. Poorly-designed shard keys can cause serious performance issues, and in some cases, can affect the availability of the cluster. Some features are unavailable for sharded collections, such as joins with `$lookup`, graph queries with `$graphLookup`, and multi-document transactions as of version 4.0.






Geographically distributing a MongoDB deployment to reduce latency can be done by utilizing shard zones. Zones declare that certain shards contain subsets of the data based on ranges of the shard key. This distribution is tied directly to document field values, so that multiple read-write copies cannot be distributed across separate nodes.






Fauna leverages the Calvin protocol to maintain several consistent, full copies of the data, called replicas, with the ability to both read and write on every node. A replica consists of several geographically-aware nodes, each with a partition of the full dataset in a single local environment. Scaling deployments, by adding more full-copy replicas or adding more nodes to a single replica, requires no additional downtime, manual configuration, or changes to drivers. Partition boundaries are not tied to geography and are, by default, a hash of the document ID — but custom partitioning can be implemented with one or more partitioned term indexes, which can easily be changed or removed.






## [](#operations)Operations






MongoDB relies on Ops Manager, Cloud Manager, or the software behind MongoDB Atlas to apply complex changes to the database. All changes can, of course, be issued manually or via custom scripts through the shell. In order to guard users against human error, the more complex multi-step operations, such as adding a shard to a sharded cluster, issuing a rolling index build, or updating the whole cluster to the latest version, are all done through these secondary pieces of software. In an on-premise deployment, Ops Manager uses manually-installed automation agents that coordinate through the deployed Ops Manager application to apply changes.






MongoDB can add new shards to a cluster without downtime, because the balancer is a yielding process that copies data between shards with the goal of achieving an evenly-distributed cluster. The balancer process yields to production loads, and individual copy operations do not recover from majority node failures within a shard. Running the balancer during heavy workloads can create stale duplicate copies of existing documents, called orphaned documents, that are included in client queries until manually cleaned up. For this reason, MongoDB recommends scheduling the balancer to run regularly during off-peak load.






As of version 4.0, MongoDB does not offer any process throttling or priority workloads.






Fauna leverages internal database protocols, such as Raft and transactions, to apply deployment modifications without the use of outside software. Due to the nature of the Calvin protocol, these transactions are consistent, even in the face of node failures, making them safe to use for deployment modification. Changes to the deployment are issued in a single transaction with multiple steps that would leave a cluster in a final desired state. Fauna checks these transactions before applying them and fails if the end state is undesirable. For example, if the change would accidentally delete the last copy of a partition, the change would not apply.






Fauna nodes are partition-aware and can safely migrate their data to the other nodes in the replica, even during production load, without any risk to the integrity of the data. Because of this, deployments can be increased and decreased in size without downtime. If an existing node is replaced with a new node within the same transaction, Fauna optimizes this case to simply move all data to the incoming node before exiting the cluster.






Fauna offers priority workloads with its [quality of service API](https://fauna.com/blog/prioritize-workloads-with-quality-of-service-api). This allows administrators to set priorities at the database or client level. In the event of hardware contention, these priorities determine how much hardware each process has available to it. For example, the production clients might have a priority of 100, and the analytics clients might have a priority of 10. In the event of hardware contention, production workloads would have 10x the resources that the analytics workloads would have.






## [](#jepsen-tests)Jepsen tests






MongoDB has worked with Jepsen three times since 2015 to verify specific behaviors on certain deployment models. The latest [Jepsen report](http://jepsen.io/analyses/mongodb-3-6-4) covers versions 3.6.4 and 4.0.0 and was intended to show that sharded clusters offer comparable safety to non-sharded deployments, to test causal consistency support, and to show that when majority read concern and majority write concern are both used, sessions prevent anomalies. The final report resulted in MongoDB adding tests into their continuous integration, but instead of changes to the product, issues have resulted in more carefully-worded documentation to describe the exact steps a user must go through in order to achieve the advertised consistency guarantees. With the default read and write concerns, MongoDB does not achieve many of its consistency claims. The report describes MongoDB write acknowledgement as the following: "… a successful response is merely a suggestion that the write has probably occurred, or might later occur, or perhaps will occur, be visible to some clients, then un-occur, or perhaps nothing will happen whatsoever." MongoDB responded that this is how the [system was designed](https://jira.mongodb.org/browse/SERVER-35316?focusedCommentId=2008354&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-2008354) to function.






Fauna’s goal with Jepsen has been to conduct an exhaustive investigation to identify and fix any errors in the implementation, integrate the resulting tests into continuous integration, and to have a trusted third party verify both public consistency claims and the effectiveness of the core architecture. The current Fauna [Jepsen report](https://fauna.com/blog/faunadbs-official-jepsen-results), which covers versions 2.5.4 and 2.6.0 and represents three months of detailed work, clearly shows Fauna’s commitment to providing users with a seamlessly-correct datastore.






> "Fauna is based on peer-reviewed research into transactional systems, combining Calvin’s cross-shard transactional protocol with Raft’s consensus system for individual shards. We believe Fauna’s approach is fundamentally sound…Calvin-based systems like Fauna could play an important future role in the distributed database landscape."






— [jepsen.io](http://jepsen.io/analyses/faunadb-2.5.4)






## [](#summary)Summary






MongoDB and Fauna both claim to be top-tier technologies for any mission-critical enterprise application. The eventually-consistent nature of MongoDB allows for the loss of committed writes during expected node failures, prevents data consistency from being enforceable in a sharded environment, makes developers responsible for the referential integrity and durability of data, imposes restrictions on which nodes can take writes, and significantly limits the functionality available to sharded cluster deployments. In contrast, the strongly-consistent nature of Fauna provided by the Calvin protocol prevents failures from affecting data integrity, provides always-consistent operations, gives users the ability to read and write on any node, and provides applications with a safe, scalable, distributed environment.






