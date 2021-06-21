MongoDB vs Fauna (or Mongo vs Fauna) | Fauna Documentation
https://docs.fauna.com/fauna/current/comparisons/compare-faunadb-vs-mongodb

# MongoDB vs Fauna (or Mongo vs Fauna)

 MongoDB vs Fauna (またはMongo vs Fauna)

Author: **Nathaniel May**, Senior Software Engineer, Fauna  
April 2019

2019年4月

Contents:

内容

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

---

- [はじめに](#introduction)
- [用語解説](#terminology)
- [クエリAPI](#query-apis)
- [インデックス](#indexes)
- [スキーマ設計](#スキーマ設計)
- [トランザクションモデル](#transactional-model)
- [一貫性モデル](#consistency-models)
- [ストレージ](#storage)
- [セキュリティ](#security)
- [フォールトトレランス](#fault-tolerance)
- [スケーラビリティ](#scalability)
- [オペレーション](#operations)
- [Jepsenテスト](#jepsen-tests)
- [まとめ](#summary)

## [](#introduction)Introduction

はじめに

Fauna and MongoDB are both general-purpose databases that were built to address the ongoing need for a simple, scalable, and easy-to-manage database. The two technologies have some similarities: both support highly-available deployment models, horizontal scalability, and document-based schemas. However, they differ in their underlying transactional behavior, consistency guarantees, and available data-modeling paradigms. They differ further in their provisions for multi-tenancy, quality of service, and temporality.

FaunaとMongoDBはどちらも汎用データベースで、シンプルで拡張性が高く、管理しやすいデータベースを求める声に応えて作られました。この2つの技術には、可用性の高いデプロイメントモデル、水平方向のスケーラビリティ、ドキュメントベースのスキーマをサポートしているという共通点があります。しかし、基本的なトランザクションの動作、一貫性の保証、利用可能なデータモデリングのパラダイムなどが異なります。さらに、マルチテナンシー、サービス品質、一時性の規定にも違いがあります。

MongoDB is currently the most widely-used NoSQL database, and its users celebrate its document-based data model and its horizontally-scalable distributed architecture. In order to achieve this scalability, the MongoDB architecture exchanges ACID transactions for eventual consistency, which weakens the safety guarantees it can provide.

MongoDBは現在最も広く利用されているNoSQLデータベースであり、ユーザーはそのドキュメントベースのデータモデルと水平方向にスケーラブルな分散アーキテクチャを高く評価しています。このスケーラビリティを実現するために、MongoDB のアーキテクチャは ACID トランザクションを最終的な一貫性と交換しており、これにより提供できる安全性の保証が弱くなっています。

Fauna was built to deliver the capabilities of a NoSQL system without sacrificing the safety of an RDBMS. Specifically, Fauna caters to enterprise workloads by prioritizing data integrity and correctness without compromising scalability, flexibility, or performance. Fauna is designed to be resistant to real-world failures, and data remains consistent even in the face of node outages, network partitions, and clock skews. Fauna’s Calvin-based architecture makes this high level of resiliency possible. Fauna is also attractive to developers: providing strong consistency guarantees and natively supporting both document structures and relational workloads. These qualities make Fauna a suitable choice for enterprises in many industries, such as financial services, e-commerce, telecommunications, and travel.

Faunaは、RDBMSの安全性を犠牲にすることなく、NoSQLシステムの機能を提供するために構築された。特に、Fauna はスケーラビリティ、柔軟性、パフォーマンスを犠牲にすることなく、データの整合性と正確性を優先することで、エンタープライズワークロードに対応している。Faunaは、実際の障害に強い設計になっており、ノードの停止、ネットワークの分割、クロックスキューに直面しても、データの一貫性を保つことができる。FaunaのCalvinベースのアーキテクチャは、この高レベルの耐障害性を可能にしている。強力な一貫性保証を提供し、ドキュメント構造とリレーショナルワークロードの両方をネイティブにサポートするFaunaは、開発者にとっても魅力的だ。これらの品質により、Fauna は、金融サービス、電子商取引、通信、旅行など、さまざまな業界の企業に適した選択肢となっている。

## [](#terminology)Terminology

用語集

For clarity, this page disambiguates the terminology that each technology uses to describe itself:

このページでは、わかりやすくするために、各テクノロジーが使用している用語を区別しています。

|MongoDB | Fauna | Explanation | 
|--|--|--|
|Document | Document | An individual record in the database. | 
|Collection | Collection | A container for documents. | 
|Standalone | Cluster | Fauna clusters with a single node are like a MongoDB standalone, but they do not require downtime or additional configuration to add nodes for replication or partitioning. | 
|Replica Set | Cluster | Fauna clusters with no partitions are like a MongoDB replica set, but they do not require downtime or additional configuration to partition data. | 
|_Not Applicable_ | Replica | Fauna replicas contain a complete copy of the data in a single locality. Data within a replica is partitioned across one or many nodes. A cluster may contain one or more replicas. | 
|Sharded Cluster | Cluster | A term referring to all of the processing, storage, and networking infrastructure that provisions the database, regardless of the presence of partitions or multiple replicas. | 
|Primary | Query Coordinator | Any node in a Fauna cluster can be the query coordinator for a given request. | 
|Secondary | _Not Applicable_ | Fauna does not have any eventually-consistent replication members. All Fauna nodes can be read from and written to like MongoDB Primaries. | 
|Shard Key | _Not Applicable_ | MongoDB requires users to choose a permanent shard key that determines how data is related and distributed among physical shards. In Fauna, this distribution is always a hash of the document ID. | 
|MongoS | Query Coordinator | In a MongoDB sharded cluster, the MongoS nodes keep a cached map of where each shard-key range lives. In a Fauna cluster, every node has a consistent copy of this information. | 
|Config Server | Node | In a MongoDB sharded cluster, the config servers are the durable source of truth for the map of where each shard-key range of documents lives. In a Fauna cluster, every node has a consistent copy of this information. | 
|Transaction | Transaction | MongoDB transactions are only available on replica set deployments. Fauna supports transactions on all cluster configurations across multiple partitions. | 

---

|MongoDB | Fauna | 説明 | 
|--|--|--|
|ドキュメント | ドキュメント | データベース内の個々のレコード。| 
|コレクション | コレクション | ドキュメントのコンテナ。| 
|スタンドアロン | クラスター | 単一のノードを持つFaunaクラスターは、MongoDBのスタンドアロンのようなものですが、レプリケーションやパーティショニングのためにノードを追加するためのダウンタイムや追加設定は必要ありません。| 
|レプリカセット | クラスター |  パーティションのない Fauna クラスターは MongoDB レプリカセットのようなものですが、データをパーティショニングするためのダウンタイムや追加設定は必要ありません。| 
|_Not Applicable_ | レプリカ | Fauna レプリカは、単一のロケールにデータの完全なコピーを含んでいます。レプリカ内のデータは、1つまたは複数のノードに分割されます。クラスタには 1 つ以上のレプリカが含まれます。| 
|シャード化されたクラスター | クラスター | パーティションや複数のレプリカの有無にかかわらず、データベースを規定するすべての処理、ストレージ、ネットワークのインフラストラクチャを指す用語です。| 
|プライマリ | クエリコーディネータ | Fauna クラスタ内のどのノードでも、特定のリクエストに対するクエリコーディネータになることができます。| 
|セカンダリ |  _Not Applicable_ |  Fauna には最終的に一貫性のあるレプリケーションメンバーは存在しません。すべての Fauna ノードは MongoDB プライマリのように読み書きできる。| 
|シャードキー |  _Not Applicable_ |  MongoDBでは、データの関連付けや物理的なシャード間の分散方法を決定する永久的なシャードキーをユーザーが選択する必要がある。Fauna では、この分散は常にドキュメント ID のハッシュです。| 
|MongoS | クエリコーディネータ | MongoDBのシャード化されたクラスタでは、MongoSのノードは各シャードキーの範囲がどこにあるかのマップをキャッシュしておく。Fauna クラスタでは、すべてのノードがこの情報の一貫したコピーを持っています。| 
|コンフィグサーバー | ノード | MongoDB シャーデッドクラスターでは、コンフィグサーバーが、各シャードキーの範囲のドキュメントがどこにあるかというマップの永続的な情報源となります。Fauna クラスタでは、すべてのノードがこの情報の一貫したコピーを持っています。| 
|トランザクション | トランザクション | MongoDB のトランザクションはレプリカセット構成でのみ利用可能です。Fauna は、複数のパーティションにまたがるすべてのクラスタ構成でトランザクションをサポートします。| 

## [](#query-apis)Query APIs

クエリ API

MongoDB distinctly separates itself from SQL databases by providing a familiar object-oriented query language bearing similarities to Javascript. The language has queries for standard CRUD operations, and an aggregation pipeline for running computations on the database and returning results to the client. Aggregations can be issued by stringing together pipeline stages, calling the map-reduce function, or by using single-purpose aggregation methods. For databases using version 3.2 or higher, MongoDB also supports SQL queries with the BI Connector, a GUI interface with Compass, or an HTTP interface.

MongoDBは、Javascriptに似た親しみやすいオブジェクト指向のクエリ言語を提供することで、SQLデータベースとは一線を画しています。この言語には、標準的な CRUD 操作のためのクエリと、データベース上で計算を実行してクライアントに結果を返すための集約パイプラインがあります。アグリゲーションは、パイプラインのステージをつなぎ合わせて発行したり、map-reduce関数を呼び出したり、単一目的のアグリゲーションメソッドを使用したりすることができます。バージョン3.2以上のデータベースの場合、MongoDBは、BIコネクターによるSQLクエリ、CompassによるGUIインターフェイス、HTTPインターフェイスもサポートしています。

MongoDB also supports search engine functions and graph queries. Basic search engine capabilities have been supported via the [text search](https://docs.mongodb.com/manual/text-search/) feature since version 2.4. Text search returns weighted results with support for custom weighting, case and diacritic insensitivity, and custom delimiters across [15 different languages](https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages). Simple recursive graph queries have been supported via the `$graphLookup` feature since version 3.4. Queries can take recursively-defined paths across unsharded collections where the value of a foreign field matches the value of a field in the current document. `$graphLookup` returns an array of results and supports max depth and match restrictions.

また、MongoDBは検索エンジン機能やグラフクエリにも対応しています。基本的な検索エンジン機能は、バージョン2.4以降、[テキスト検索](https://docs.mongodb.com/manual/text-search/)機能でサポートされています。テキスト検索は、カスタムの重み付け、大文字小文字の区別のない検索、[15種類の言語](https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages)に対応したカスタムの区切り文字を使って重み付けした結果を返します。バージョン 3.4 以降、`$graphLookup` 機能により、単純な再帰的グラフクエリがサポートされています。クエリは、外部フィールドの値が現在のドキュメントのフィールドの値と一致する、シャードされていないコレクションに対して再帰的に定義されたパスを取ることができます。$graphLookup` は結果の配列を返し、最大深度とマッチの制限をサポートします。

Fauna supports [multiple query interfaces](https://fauna.com/blog/new-platform-apis-graphql-cql-sql) which all offer the ability to access and manipulate data with the same transactional, consistency, and security guarantees without the need to deploy extra software. Fauna provides Fauna Query Language (FQL) and GraphQL (beta) interfaces, each with unique benefits. Many queries may use similar logic to return complex results, and the highly composable, expression-oriented architecture of FQL allows developers to easily reuse common query segments. GraphQL has emerged as a popular and powerful abstraction that allows complex queries to be composed from simple calls without the need to change the underlying storage of the data. SQL and CQL interfaces are coming soon.

Fauna は [multiple query interfaces](https://fauna.com/blog/new-platform-apis-graphql-cql-sql) をサポートしています。これらはすべて、追加のソフトウェアを導入することなく、同じトランザクション、一貫性、セキュリティの保証でデータにアクセスして操作する機能を提供します。Fauna は、Fauna Query Language (FQL) と GraphQL (beta) インターフェースを提供し、それぞれ独自の利点があります。多くのクエリは、複雑な結果を返すために似たようなロジックを使用することがありますが、FQLの高度に合成可能な式指向のアーキテクチャにより、開発者は共通のクエリセグメントを容易に再利用することができます。GraphQLは、データの基礎となるストレージを変更することなく、単純な呼び出しから複雑なクエリを構成することができる、人気のある強力な抽象化手法として登場しました。SQLとCQLのインターフェースは近日公開予定です。

## [](#indexes)Indexes

インデックス

Indexes in MongoDB are implemented with modified B+ trees in a similar fashion to other popular database technologies. Once indexes are loaded into memory they remain there with changes persisted to disk. Each node of the B+ tree stores a subset of a document’s values with a pointer to the rest of the document. These indexes provide support for both range queries and sorted results. MongoDB supports indexes that are unique, sparse, partial, and case-insensitive. Text indexes are a special type of index that allow for basic search engine queries that return weighted results.

MongoDB のインデックスは、他の一般的なデータベース技術と同様に修正された B+ 木で実装されています。インデックスはいったんメモリに読み込まれるとそこに残り、 変更はディスクに保存されます。B+ ツリーの各ノードには、ドキュメントの値のサブセットが格納され、ドキュメントの残りの部分へのポインタも格納されます。これらのインデックスは、範囲指定のクエリとソートされた結果の両方をサポートします。MongoDB は、ユニーク、スパース、パーシャル、そして大文字小文字を区別しないインデックスをサポートしています。テキストインデックスは特殊なタイプのインデックスで、重み付けされた結果を返す基本的な検索エンジンのクエリを可能にします。

In Fauna, indexes are implemented — similar to materialized views — such that the indexed fields are stored in a separate document. Indexes offer a variety of uses, such as: storing data with a specified order, storing a subset of an document’s fields (projection), persisting computations, and combining data from multiple collections. Indexed documents maintain referential integrity with source documents, so they are never out of sync. When a source document is needed, Fauna’s first-class support for relational workloads with transactions provides efficient access to both the index and source document in a single query. Fauna also supports unique constraints and serialized indexes, which both provide [strict serializability](https://docs.fauna.com/fauna/current/concepts/isolation_levels) to writes.

Fauna では、インデックスはマテリアライズド・ビューと同じように実装されており、インデックス対象のフィールドは別のドキュメントに格納されます。インデックスには、特定の順序でデータを格納する、ドキュメントのフィールドのサブセットを格納する（プロジェクション）、計算を永続化する、複数のコレクションのデータを結合するなど、さまざまな用途があります。インデックス付きドキュメントは、ソースドキュメントとの参照整合性を維持しているため、同期が取れないことはありません。ソースドキュメントが必要な場合、Fauna はトランザクションを伴うリレーショナルワークロードを第一級にサポートしているため、1 つのクエリでインデックスとソースドキュメントの両方に効率的にアクセスできます。また、Fauna は一意の制約と直列化されたインデックスをサポートしており、どちらも書き込みに対して [strict serializability](https://docs.fauna.com/fauna/current/concepts/isolation_levels) を提供する。

## [](#schema-design)Schema design

スキーマ設計

Schema design best practices in MongoDB rely on denormalization. A MongoDB schema should map application use cases—not the data’s relationships—to document and collection structures. In order to minimize database calls and take advantage of document atomicity, one document often contains all of the required information to load a page to a user. Data often needs to be duplicated across documents and collections to create a well-designed schema that supports simple, efficient reads. MongoDB does not provide support for referential integrity constraints, leaving enforcement to two-phase commit logic in the application, a background process, or transactions using MongoDB version 4.0 or higher without sharded collections.

MongoDB のスキーマ設計のベストプラクティスは非正規化にあります。MongoDB のスキーマは、データのリレーションではなくアプリケーションのユースケースをドキュメントやコレクションの構造にマッピングする必要があります。データベースの呼び出しを最小限にしてドキュメントのアトミック性を活用するために、1つのドキュメントにユーザーにページを見せるために必要な情報がすべて含まれていることがよくあります。シンプルで効率的な読み込みをサポートするような優れた設計のスキーマを作るためには、データをドキュメントやコレクションに重複させる必要があります。MongoDB は参照整合性制約をサポートしていないので、アプリケーションの二相コミットロジックやバックグラウンドプロセス、あるいは MongoDB バージョン 4.0 以降のシャード型コレクションを使わないトランザクションに適用します。

MongoDB supports—but discourages—joins with the `$lookup` function. These joins are always left outer joins, and can use any field in the foreign document to return an array of results, but are unavailable on sharded collections. As of version 3.6, MongoDB supports non-materialized views by prepending aggregation pipeline stages to incoming queries, but does not support materialized views. Like other popular databases, an efficient MongoDB schema relies heavily on accompanying indexes for read performance.

MongoDB は、`$lookup` 関数を使った結合をサポートしていますが、推奨はしていません。これらの結合は常に左外部結合で、外部ドキュメントの任意のフィールドを使って結果の配列を返すことができますが、 シャーデッドコレクションでは使えません。バージョン 3.6 の時点で、MongoDB は集約パイプラインのステージを入力クエリの前に追加することで非物質化ビューをサポートしていますが、物質化ビューはサポートしていません。他の一般的なデータベースと同様、MongoDB の効率的なスキーマは、読み取りパフォーマンスのために付随するインデックスに大きく依存しています。

Effective schema design in Fauna takes advantage of both the first-class support for relational modeling, and materialized indexes. Fauna supports the fully-denormalized document model, but referential integrity can be enforced in both transactions and indexes, thereby relieving application developers from implementing complicated logic to guarantee correctness. Furthermore, creating denormalized collections for each use case can unnecessarily increase storage utilization and I/O contention. By utilizing Fauna’s globally-consistent transactions and user-defined functions, developers can minimize their storage needs without compromising performance. For a detailed example, [this e-commerce application](https://docs.fauna.com/fauna/current/tutorials/ecommerce) uses effective Fauna schema design and is accompanied by full code examples.

Fauna での効果的なスキーマ設計は、ファーストクラスのリレーショナルモデリングのサポートとマテリアライズドインデックスの両方を利用している。Fauna は完全に非正規化されたドキュメントモデルをサポートしているが、トランザクションとインデックスの両方で参照整合性を強制することができるため、アプリケーション開発者は正しさを保証するための複雑なロジックを実装する必要がない。さらに、ユースケースごとに非正規化されたコレクションを作成すると、ストレージの使用量や I/O 競合が不必要に増加してしまう。Faunaのグローバルに一貫したトランザクションとユーザー定義関数を利用することで、開発者はパフォーマンスを損なうことなく、ストレージの必要性を最小限に抑えることができます」と述べています。詳細な例として、[この電子商取引アプリケーション](https://docs.fauna.com/fauna/current/tutorials/ecommerce)は、効果的な Fauna スキーマ設計を使用しており、完全なコード例が添付されています。

## [](#transactional-model)Transactional model

トランザクショナルモデル

MongoDB has always encouraged the use of denormalized schemas and embedded documents to ensure consistency via atomic document updates. This is still the preferred method even with the release of atomic multi-document transactions in version 4.0. The [MongoDB documentation](https://docs.mongodb.com/v4.0/core/write-operations-atomicity/) states that "in most cases, \[a\] multi-document transaction incurs a greater performance cost over single document writes and the availability of multi-document transaction\[s\] should not be a replacement for effective schema design." Multi-document transactions are not available for sharded clusters as of version 4.0.

MongoDB は、非正規化スキーマと埋め込みドキュメントを使って、アトミックなドキュメント更新による一貫性を確保することを常に推奨してきました。バージョン 4.0 でアトミックなマルチドキュメントトランザクションがリリースされた今でも、この方法が推奨されています。MongoDB documentation](https://docs.mongodb.com/v4.0/core/write-operations-atomicity/) によると、"in most case, ˶‾᷄ -̫ ‾᷅˵˵, in a multiple-document transaction incursurs a greater performance cost than single document write, and the availability of multi-document transaction˶‾᷅˵, should not be replace for effective schema design." となっています。バージョン4.0では、シャード化されたクラスターではマルチドキュメントトランザクションは利用できません。

Fauna uses the [mechanics of Calvin](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol) to efficiently achieve [ACID transactions in a distributed environment](https://fauna.com/blog/acid-transactions-in-a-globally-distributed-database) without clocks. Developers can safely build applications without writing code specific to the deployment model or internal mechanics of the database. This is unfortunately not so with popular NoSQL databases which follow the weaker BASE model. To achieve horizontal scalability, these technologies have surrendered ACID transactions for systems which are only basically available, with soft state, and eventual consistency. SQL systems simply forgo horizontal scalability altogether to provide developers with the safety of ACID operations. Fauna achieves both without compromise.

Fauna は [Calvin の仕組み](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol) を利用して、クロックを使わずに [分散環境での ACID トランザクション](https://fauna.com/blog/acid-transactions-in-a-globally-distributed-database) を効率的に実現しています。開発者は、デプロイメントモデルやデータベースの内部機構に特化したコードを書くことなく、安全にアプリケーションを構築することができます。これは残念ながら、より弱いBASEモデルに従った人気のNoSQLデータベースではそうではありません。水平方向のスケーラビリティを実現するために、これらの技術はACIDトランザクションを放棄し、ソフトステートと最終的な一貫性を備えた、基本的に利用可能なシステムに変更しました。SQLシステムでは、ACIDオペレーションの安全性を開発者に提供するために、水平方向のスケーラビリティを完全に放棄しています。Fauna は妥協することなくその両方を実現します。

## [](#consistency-models)Consistency models

一貫性のモデル

In order for MongoDB reads to be consistent, developers must prevent queries from including data that could be rolled back, and ensure that no writes will occur during the read. Documents can be rolled back if they have not yet replicated to a majority of nodes, so developers must issue queries with a [read concern](https://docs.mongodb.com/manual/reference/read-concern/) of `majority`, `snapshot`, or `linearizable` to avoid including results that are not durable. However, workloads that require a linearized view of the data are limited to queries that uniquely identify a single document. Multi-document transactions in version 4.0 or higher are required to view a consistent state in time across multiple documents. These transactions use [read locks](https://docs.mongodb.com/manual/faq/concurrency/) to ensure that no process will write to the documents until the entire set has been read by the transaction, and because transactions are not available on a sharded cluster as of version 4.0, there is no way to issue a consistent read across multiple documents on a sharded cluster. MongoDB encourages users to leverage its document-based schema to minimize the presence of these queries, and instead read from a single document.

MongoDB の読み込みに一貫性を持たせるためには、開発者はクエリにロールバック可能なデータが含まれないようにし、読み込み中に書き込みが発生しないようにしなければなりません。ドキュメントは、まだ過半数のノードに複製されていないとロールバックされる可能性があるので、開発者は[read concern](https://docs.mongodb.com/manual/reference/read-concern/)に `majority`, `snapshot`, `linearizable` を指定してクエリを発行し、耐久性のない結果を含めないようにしなければなりません。ただし、データのリニアライズドビューを必要とするワークロードは、単一のドキュメントを一意に識別するクエリに限定されます。バージョン4.0以降のマルチドキュメントトランザクションは、複数のドキュメント間で時間的に一貫した状態を見るために必要です。これらのトランザクションでは [read lock](https://docs.mongodb.com/manual/faq/concurrency/) を使って、トランザクションでセット全体が読み込まれるまではどのプロセスもドキュメントに書き込めないようにしています。バージョン 4.0 ではシャード化されたクラスタでトランザクションが使えないので、シャード化されたクラスタで複数のドキュメントに一貫した読み込みを発行する方法はありません。MongoDB では、ドキュメントベースのスキーマを活用してこのようなクエリの存在を最小限にし、代わりに単一のドキュメントから読み取ることを推奨しています。

All Fauna queries are consistent across all deployment models and offer [strong isolation levels](https://docs.fauna.com/fauna/current/concepts/isolation_levels). Write operations are strictly serializable unless they involve a non-serialized index, for which writes provide snapshot isolation. Reads are serializable by default, but can be strictly serializable by using the `/linearized` endpoint, or by including a no-op write. Fauna has a temporal storage engine which stores the history of all changes to documents for a default period of 30 days. This allows queries to observe data as it existed at a specific point in time, called a snapshot. All Fauna queries are issued with a snapshot time and never include any uncommitted writes, partially-applied writes, or writes that could be rolled back.

すべての Fauna クエリはすべてのデプロイメントモデルで一貫しており、[強力な分離レベル](https://docs.fauna.com/fauna/current/concepts/isolation_levels)を提供します。書き込み操作は、シリアル化されていないインデックスが含まれていない限り、厳密にシリアル化可能で、書き込みはスナップショット分離を提供します。読み込みはデフォルトではシリアライズ可能ですが、`/linearized`エンドポイントを使用するか、あるいはno-op writeを含めることで厳密にシリアライズ可能になります。Fauna にはテンポラリストレージエンジンがあり、ドキュメントに対するすべての変更の履歴をデフォルトの 30 日間保存する。これにより、スナップショットと呼ばれる特定の時点でのデータを観察することができます。すべての Fauna クエリはスナップショットの時間で発行され、コミットされていない書き込み、部分的に適用された書き込み、ロールバックされる可能性のある書き込みは含まれません。

## [](#storage)Storage

ストレージ

MongoDB has a pluggable storage engine API, and uses WiredTiger as the default storage engine as of version 3.2. With WiredTiger, MongoDB offers both snappy and zlib compression levels, as well as encryption at rest with a supported key server.

MongoDB にはプラグイン可能なストレージエンジンの API があり、バージョン 3.2 からはデフォルトのストレージエンジンとして WiredTiger を使っています。WiredTigerでは、MongoDBはsnappyとzlibの両方の圧縮レベルを提供しており、サポートされているキーサーバーを使った静止時の暗号化も可能である。

Fauna embeds Cassandra’s storage engine and provides LZ4 compression. By default, Fauna stores the last 30 days of history for each documents, and temporal queries may use any point-in-time snapshot within that history. Temporal storage also provides simple recovery after accidental data loss and streamlined integration debugging.

FaunaはCassandraのストレージエンジンを組み込み、LZ4圧縮を提供する。デフォルトでは、Faunaは各ドキュメントの過去30日間の履歴を保存し、一時的なクエリはその履歴内の任意のポイントインタイムスナップショットを使用することができる。また、テンポラルストレージは、偶発的にデータが失われた場合の簡単なリカバリーと、統合のデバッグの効率化を実現します。

## [](#security)Security

セキュリティ

MongoDB offers support for SCRAM, x509, LDAP, and Kerberos authentication, role-based access control with user-defined roles, permissions on collection subsets via non-materialized views, TLS/SSL for the database and clients, encryption at rest, auditing controls, and tenant separation via databases. MongoDB does not enable authentication by default. There have been numerous reports of MongoDB databases being breached, with some having their data held for ransom because users failed to set passwords on their production systems.

MongoDB は、SCRAM、x509、LDAP、Kerberos 認証のサポート、ユーザー定義のロールによるアクセス制御、非実体化ビューによるコレクションサブセットへの権限付与、データベースとクライアントの TLS/SSL、保存時の暗号化、監査制御、データベースによるテナント分離を提供します。MongoDBはデフォルトでは認証を有効にしません。MongoDBデータベースへの侵入が多数報告されており、ユーザーが本番システムにパスワードを設定しなかったために、データが身代金として要求された例もあります。

MongoDB supports using x.509 certificates for replica set membership and client authentication. It is possible to accidentally issue a client x.509 certificate that grants full permission to the system regardless of existing role-based access controls, per known x.509 behavior. From the [MongoDB documentation](https://docs.mongodb.com/v4.0/tutorial/configure-x509-client-authentication/): "If a client x.509 certificate’s subject has the same O, OU, and DC combination as the Member x.509 Certificate, the client will be identified as a cluster member and granted full permission on the system."

MongoDBでは、レプリカセットのメンバーシップとクライアントの認証にx.509証明書の使用をサポートしています。x.509証明書を発行すると、既存のロールベースのアクセス制御にかかわらず、システムに完全な権限を与えるというx.509の既知の動作を誤って行ってしまう可能性があります。MongoDB documentation](https://docs.mongodb.com/v4.0/tutorial/configure-x509-client-authentication/)より。"クライアントの x.509 証明書のサブジェクトがメンバーの x.509 証明書と同じ O、OU、DC の組み合わせである場合、クライアントはクラスタメンバーとして認識され、システムに対するフルパーミッションが付与されます。"

Fauna offers support for authentication via secure access keys, attribute-based access controls, native document-level permissions, TLS/SSL for the database and clients, client/tenant separation via database hierarchies, priority workloads, as well as secure access tokens for direct client access to the database. Fauna clusters require authentication and cannot be left accidentally unprotected.

Faunaは、セキュアアクセスキーによる認証、属性ベースのアクセスコントロール、ネイティブドキュメントレベルのパーミッション、データベースとクライアントのTLS/SSL、データベース階層によるクライアントとテナントの分離、優先ワークロード、さらにクライアントがデータベースに直接アクセスするためのセキュアアクストークンをサポートしています。Faunaクラスターには認証が必要で、誤って無防備な状態にしておくことはできません。

## [](#fault-tolerance)Fault tolerance

フォールト・トレランス

Node failures in MongoDB are handled by the replica set. Replication is eventually consistent, and is implemented via the capped oplog collection. Writes to a replica set are always issued to the currently-elected primary where data is written to the collection, and an idempotent statement is written to the oplog. Each secondary applies the operations by opening a tailable cursor on the primary’s oplog, and copies all changes since the last change recorded in that node’s copy of the oplog. Because of this eventually-consistent implementation of data replication, all reads on secondaries are assumed to be stale.

MongoDB のノードの障害は、レプリカセットで処理されます。レプリケーションは最終的には一貫性があり、 キャップ付きの oplog コレクションで実装されています。レプリカセットへの書き込みは、常にその時点で選択されているプライマリに発行されます。データはコレクションに書き込まれ、 idempotent statement が oplog に書き込まれます。各セカンダリは、プライマリのoplogにテール可能なカーソルを開いて操作を適用し、そのノードのoplogのコピーに記録された最後の変更以降のすべての変更をコピーします。このように最終的に一貫性のあるデータレプリケーションを実装しているので、セカンダリのすべての読み込みは古くなっているとみなされます。

MongoDB’s secondary failures go unnoticed unless a majority of servers are unavailable. If the primary fails, a new primary is elected by the remaining nodes with a prioritized version of Raft, and the system continues to operate normally. Writes that use the default write concern of `w:1` and have been acknowledged will be rolled back if they have not replicated to any secondaries. The effect of this is lost data under normal operating conditions, if defaults have not been overridden. If a secondary becomes unavailable, it picks up where it left off when it comes online, if the last-seen operation is still in the primary’s oplog. If that operation is not in the primary’s oplog, it performs an initial sync and copies all data, then applies all operations that occurred during the copy, to return to a consistent point in time. Small oplogs on systems with high write volumes can leave secondaries unable to rejoin the replica set after a failure, which can lead to a loss of availability of the entire cluster.

MongoDBのセカンダリが故障しても、大部分のサーバーが使えなくならない限り気づかれません。プライマリが故障した場合は、残りのノードで優先順位をつけた Raft を使って新しいプライマリが選出され、システムは通常通り動作します。デフォルトの write concern (w:1)を使用した書き込みで、確認された書き込みは、セカンダリにレプリケートされていない場合、ロールバックされます。これにより、デフォルトが上書きされていない場合、通常の動作状態ではデータが失われることになります。セカンダリが利用できなくなった場合、最後に見た操作がプライマリのoplogに残っていれば、オンラインになったときにその操作の続きを行います。その操作がプライマリのオプログにない場合は、最初の同期を実行してすべてのデータをコピーし、コピー中に発生したすべての操作を適用して、一貫した時点に戻ります。書き込み量が多いシステムでは、オプログが小さいと、障害発生後にセカンダリがレプリカセットに再参加できず、クラスタ全体の可用性が損なわれる可能性があります。

All Fauna nodes are connected to all other nodes in the cluster. When a node in a Fauna replica becomes unavailable, reads are directed to a non-local copy until that node becomes available again. Because replication in Fauna is implemented with the [Calvin protocol](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol), all transactions are first made durable in the transaction log before being applied to data nodes, so that server outages do not affect correctness. If a node is down, the length of the transaction log is extended so that it can apply the transactions it missed when it comes back online. In order for the cluster to stay available for clients, a majority of servers for each of the log segments must remain available, and a single full copy of the data must exist across any number of replicas.

すべてのFaunaノードは、クラスタ内の他のすべてのノードに接続されています。Faunaレプリカのノードが利用できなくなると、そのノードが再び利用できるようになるまで、読み取りは非ローカルなコピーに向けられる。Faunaのレプリケーションは[Calvin protocol](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol)で実装されているため、すべてのトランザクションはデータノードに適用される前にまずトランザクションログで耐久性を持たせ、サーバの停止が正しさに影響しないようにしている。ノードがダウンした場合は、トランザクション・ログの長さが延長され、オンラインに戻ったときにミスしたトランザクションを適用できるようになります。クラスタがクライアントから利用可能な状態を維持するためには、各ログセグメントの過半数のサーバが利用可能な状態を維持し、任意の数のレプリカにデータのフルコピーが1つ存在する必要があります。

## [](#scalability)Scalability

スケーラビリティ

MongoDB provides sharded clusters as a way to horizontally scale the largest of workloads across many replica sets. Creating a sharded cluster requires a small amount of downtime to deploy config servers, and to point application drivers to `mongos` processes instead of the data nodes. Using a sharded cluster requires creating a custom shard key for each collection that needs to span more than one shard. A well-designed shard key distributes write operations to minimize balancer activity, concentrates query results for performance, and has a high cardinality in order to prevent jumbo chunks that are difficult to move. Poorly-designed shard keys can cause serious performance issues, and in some cases, can affect the availability of the cluster. Some features are unavailable for sharded collections, such as joins with `$lookup`, graph queries with `$graphLookup`, and multi-document transactions as of version 4.0.

MongoDB には、大規模なワークロードを多数のレプリカセットに分散させて水平方向に拡張する方法としてシャーデッドクラスターがあります。シャーデッドクラスターを作るには、わずかなダウンタイムが必要です。設定サーバーを導入したり、アプリケーションのドライバをデータノードではなく `mongos` プロセスに向けたりします。シャーデッド・クラスターを使用するには、複数のシャードにまたがる必要があるコレクションごとに、カスタム・シャードキーを作成する必要があります。適切に設計されたシャードキーは、バランサーの活動を最小限にするために書き込み操作を分散させ、パフォーマンスのためにクエリ結果を集中させ、移動が困難なジャンボチャンクを防ぐために高いカーディナリティを持っています。シャードキーの設計が悪いと、深刻なパフォーマンスの問題が発生し、場合によってはクラスターの可用性にも影響します。バージョン 4.0 では、シャード化されたコレクションでは利用できない機能もあります。たとえば `$lookup` を使った結合や `$graphLookup` を使ったグラフクエリ、マルチドキュメントトランザクションなどがあります。

Geographically distributing a MongoDB deployment to reduce latency can be done by utilizing shard zones. Zones declare that certain shards contain subsets of the data based on ranges of the shard key. This distribution is tied directly to document field values, so that multiple read-write copies cannot be distributed across separate nodes.

MongoDB の配置を地理的に分散させてレイテンシーを減らすには、シャードゾーンを利用します。ゾーンは、特定のシャードがシャードキーの範囲に基づいてデータのサブセットを含むことを宣言します。この分散はドキュメントのフィールド値と直接結びついているため、複数の読み書き可能なコピーを別々のノードに分散させることはできません。

Fauna leverages the Calvin protocol to maintain several consistent, full copies of the data, called replicas, with the ability to both read and write on every node. A replica consists of several geographically-aware nodes, each with a partition of the full dataset in a single local environment. Scaling deployments, by adding more full-copy replicas or adding more nodes to a single replica, requires no additional downtime, manual configuration, or changes to drivers. Partition boundaries are not tied to geography and are, by default, a hash of the document ID — but custom partitioning can be implemented with one or more partitioned term indexes, which can easily be changed or removed.

FaunaはCalvinプロトコルを利用して、レプリカと呼ばれるデータの一貫性のある完全なコピーを複数保持し、すべてのノードで読み取りと書き込みの両方ができるようにしている。レプリカは、地理的に認識された複数のノードで構成され、それぞれが単一のローカル環境で完全なデータセットのパーティションを持つ。フルコピーのレプリカを増やしたり、1つのレプリカにノードを追加したりして展開を拡張しても、ダウンタイムや手動設定、ドライバーの変更などは一切必要ありません。パーティションの境界は地理的な条件に縛られず、デフォルトではドキュメントIDのハッシュですが、1つまたは複数のパーティション化された用語インデックスを使ってカスタムパーティショニングを実装することができ、その変更や削除も容易です。

## [](#operations)Operations

運用

MongoDB relies on Ops Manager, Cloud Manager, or the software behind MongoDB Atlas to apply complex changes to the database. All changes can, of course, be issued manually or via custom scripts through the shell. In order to guard users against human error, the more complex multi-step operations, such as adding a shard to a sharded cluster, issuing a rolling index build, or updating the whole cluster to the latest version, are all done through these secondary pieces of software. In an on-premise deployment, Ops Manager uses manually-installed automation agents that coordinate through the deployed Ops Manager application to apply changes.

MongoDBは、複雑な変更をデータベースに適用する場合、Ops Manager、Cloud Manager、またはMongoDB Atlasの背後にあるソフトウェアに依存します。もちろん、すべての変更は手動で行うことも、シェルを使ったカスタムスクリプトで行うこともできます。ヒューマンエラーを防ぐために、シャード化されたクラスターにシャードを追加したり、ローリングインデックスビルドを発行したり、クラスター全体を最新バージョンに更新したりといった複雑なマルチステップの操作は、すべてこれらの二次的なソフトウェアを介して行われます。オンプレミスのデプロイメントでは、Ops Managerは手動でインストールされたオートメーション・エージェントを使用し、デプロイされたOps Managerアプリケーションを通じて調整して変更を適用します。

MongoDB can add new shards to a cluster without downtime, because the balancer is a yielding process that copies data between shards with the goal of achieving an evenly-distributed cluster. The balancer process yields to production loads, and individual copy operations do not recover from majority node failures within a shard. Running the balancer during heavy workloads can create stale duplicate copies of existing documents, called orphaned documents, that are included in client queries until manually cleaned up. For this reason, MongoDB recommends scheduling the balancer to run regularly during off-peak load.

MongoDBはダウンタイムなしに新しいシャードをクラスタに追加することができます。バランサーは、均等に分散されたクラスタを実現することを目標にシャード間でデータをコピーする降伏プロセスだからです。バランサーのプロセスは本番の負荷に屈してしまい、個々のコピー操作ではシャード内の多数のノードが故障しても回復しません。作業負荷が高いときにバランサーを動かすと、既存のドキュメントの古い重複コピーができてしまいます。これを「オーファンドキュメント」と呼び、手動でクリーンアップするまでクライアントのクエリに含まれてしまいます。このような理由から、MongoDB ではバランサーを定期的に稼働させ、負荷が低いときに実行することを推奨しています。

As of version 4.0, MongoDB does not offer any process throttling or priority workloads.

バージョン4.0の時点で、MongoDBはプロセスのスロットルや優先ワークロードを提供していない。

Fauna leverages internal database protocols, such as Raft and transactions, to apply deployment modifications without the use of outside software. Due to the nature of the Calvin protocol, these transactions are consistent, even in the face of node failures, making them safe to use for deployment modification. Changes to the deployment are issued in a single transaction with multiple steps that would leave a cluster in a final desired state. Fauna checks these transactions before applying them and fails if the end state is undesirable. For example, if the change would accidentally delete the last copy of a partition, the change would not apply.

Faunaは、Raftやトランザクションなどの内部のデータベースプロトコルを活用して、外部のソフトウェアを使わずにデプロイメントの変更を適用します。Calvinプロトコルの性質上、これらのトランザクションは、ノードが故障した場合でも一貫性があり、配備の変更に安心して使用できる。配置の変更は、クラスタを最終的に望ましい状態にするための複数のステップを持つ単一のトランザクションで発行される。Faunaはこれらのトランザクションを適用する前にチェックし、最終的な状態が望ましくない場合は失敗する。例えば、変更によってパーティションの最後のコピーが誤って削除されてしまう場合、変更は適用されない。

Fauna nodes are partition-aware and can safely migrate their data to the other nodes in the replica, even during production load, without any risk to the integrity of the data. Because of this, deployments can be increased and decreased in size without downtime. If an existing node is replaced with a new node within the same transaction, Fauna optimizes this case to simply move all data to the incoming node before exiting the cluster.

Faunaのノードはパーティションを認識しており、本番負荷時でもデータの整合性を損なうことなく、レプリカの他のノードにデータを安全に移行することができる。このため、ダウンタイムなしにデプロイメントの規模を拡大・縮小することができます。同じトランザクション内で既存のノードが新しいノードに置き換えられた場合、Fauna はこのケースを最適化して、すべてのデータを単に新しいノードに移動してからクラスタを終了する。

Fauna offers priority workloads with its [quality of service API](https://fauna.com/blog/prioritize-workloads-with-quality-of-service-api). This allows administrators to set priorities at the database or client level. In the event of hardware contention, these priorities determine how much hardware each process has available to it. For example, the production clients might have a priority of 100, and the analytics clients might have a priority of 10. In the event of hardware contention, production workloads would have 10x the resources that the analytics workloads would have.

Faunaは、[Quality of Service API](https://fauna.com/blog/prioritize-workloads-with-quality-of-service-api)で優先ワークロードを提供します。これにより、管理者はデータベースやクライアントのレベルで優先順位を設定することができます。ハードウェアの競合が発生した場合、この優先順位によって各プロセスが利用できるハードウェアの数が決定される。たとえば、本番用クライアントの優先度を100、分析用クライアントの優先度を10に設定することができます。ハードウェアの競合が発生した場合、本番用ワークロードは分析用ワークロードの10倍のリソースを持つことになります。

## [](#jepsen-tests)Jepsen tests

Jepsenのテスト

MongoDB has worked with Jepsen three times since 2015 to verify specific behaviors on certain deployment models. The latest [Jepsen report](http://jepsen.io/analyses/mongodb-3-6-4) covers versions 3.6.4 and 4.0.0 and was intended to show that sharded clusters offer comparable safety to non-sharded deployments, to test causal consistency support, and to show that when majority read concern and majority write concern are both used, sessions prevent anomalies. The final report resulted in MongoDB adding tests into their continuous integration, but instead of changes to the product, issues have resulted in more carefully-worded documentation to describe the exact steps a user must go through in order to achieve the advertised consistency guarantees. With the default read and write concerns, MongoDB does not achieve many of its consistency claims. The report describes MongoDB write acknowledgement as the following: "… a successful response is merely a suggestion that the write has probably occurred, or might later occur, or perhaps will occur, be visible to some clients, then un-occur, or perhaps nothing will happen whatsoever." MongoDB responded that this is how the [system was designed](https://jira.mongodb.org/browse/SERVER-35316?focusedCommentId=2008354&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-2008354) to function.

MongoDBは2015年から3回にわたってJepsenと協力し、特定のデプロイメントモデルにおける特定の動作を検証してきました。最新の[Jepsenレポート](http://jepsen.io/analyses/mongodb-3-6-4)はバージョン3.6.4と4.0.0を対象としており、シャード化されたクラスタが非シャード化されたデプロイメントと同等の安全性を提供することを示すこと、因果関係のある一貫性のサポートをテストすること、過半数の読み取り懸念と過半数の書き込み懸念の両方を使用する場合、セッションが異常を防ぐことを示すことを目的としていた。最終報告書では、MongoDBが継続的インテグレーションにテストを追加することになりましたが、製品の変更ではなく、宣伝されている一貫性保証を実現するためにユーザーが実行しなければならない正確なステップを説明するために、より慎重に記述されたドキュメントが問題となりました。デフォルトの読み取りと書き込みに関する問題では、MongoDBはその一貫性の主張の多くを達成していません。レポートでは、MongoDBの書き込み確認を以下のように説明しています。"...成功した応答は、書き込みがおそらく発生した、あるいは後で発生するかもしれない、あるいはおそらく発生して一部のクライアントに見えるようになり、その後発生しなくなる、あるいは何も起こらないかもしれない、ということを示唆するに過ぎない。" MongoDBは、これが[システムが設計された](https://jira.mongodb.org/browse/SERVER-35316?focusedCommentId=2008354&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-2008354)機能であると答えた。

Fauna’s goal with Jepsen has been to conduct an exhaustive investigation to identify and fix any errors in the implementation, integrate the resulting tests into continuous integration, and to have a trusted third party verify both public consistency claims and the effectiveness of the core architecture. The current Fauna [Jepsen report](https://fauna.com/blog/faunadbs-official-jepsen-results), which covers versions 2.5.4 and 2.6.0 and represents three months of detailed work, clearly shows Fauna’s commitment to providing users with a seamlessly-correct datastore.

FaunaがJepsenと共に目指したのは、徹底的な調査を行って実装上のエラーを特定・修正し、その結果得られたテストを継続的インテグレーションに統合し、信頼できる第三者に公的な一貫性の主張とコアアーキテクチャの有効性の両方を検証してもらうことだった。バージョン2.5.4と2.6.0を対象とし、3ヶ月間の詳細な作業を経て作成された現在のFauna [Jepsen report](https://fauna.com/blog/faunadbs-official-jepsen-results)は、ユーザーにシームレスに正しいデータストアを提供するというFaunaの姿勢を明確に示している。

> "Fauna is based on peer-reviewed research into transactional systems, combining Calvin’s cross-shard transactional protocol with Raft’s consensus system for individual shards. We believe Fauna’s approach is fundamentally sound…Calvin-based systems like Fauna could play an important future role in the distributed database landscape."

> 「Faunaは、Calvinのクロスシャードトランザクションプロトコルと、Raftの個別シャード用コンセンサスシステムを組み合わせた、トランザクションシステムに関する査読付きの研究に基づいています。Faunaのアプローチは基本的に健全であると信じています。FaunaのようなCalvinベースのシステムは、分散データベースの世界で将来的に重要な役割を果たす可能性があります。" [jepsen.io

— [jepsen.io](http://jepsen.io/analyses/faunadb-2.5.4)

## [](#summary)Summary

まとめ

MongoDB and Fauna both claim to be top-tier technologies for any mission-critical enterprise application. The eventually-consistent nature of MongoDB allows for the loss of committed writes during expected node failures, prevents data consistency from being enforceable in a sharded environment, makes developers responsible for the referential integrity and durability of data, imposes restrictions on which nodes can take writes, and significantly limits the functionality available to sharded cluster deployments. In contrast, the strongly-consistent nature of Fauna provided by the Calvin protocol prevents failures from affecting data integrity, provides always-consistent operations, gives users the ability to read and write on any node, and provides applications with a safe, scalable, distributed environment.

MongoDBとFaunaはどちらも、ミッションクリティカルなエンタープライズアプリケーションにとって最上級の技術であると主張している。MongoDBの最終的に一貫した性質は、予想されるノード障害の際にコミットされた書き込みが失われることを許し、シャード環境ではデータの一貫性を確保できず、データの参照整合性と耐久性について開発者が責任を負うことになり、書き込みを行えるノードに制限が課せられ、シャード化されたクラスタ展開で利用できる機能が大幅に制限されます。一方、Calvinプロトコルによって提供されるFaunaの強力な一貫性は、障害がデータの整合性に影響を与えることを防ぎ、常に一貫した操作を提供し、ユーザーがどのノードでも読み書きできるようにし、アプリケーションに安全でスケーラブルな分散環境を提供しています。

