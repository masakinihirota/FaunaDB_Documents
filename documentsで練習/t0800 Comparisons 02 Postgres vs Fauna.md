Postgres vs Fauna | Fauna Documentation
https://docs.fauna.com/fauna/current/comparisons/compare-faunadb-vs-postgres

# Postgres vs Fauna

PostgresとFaunaの比較

Author: **Evan Weaver**, Fauna CTO  
January 2021

2021年1月

Contents:

目次

-   [Introduction](#introduction)
-   [Terminology](#terminology)
-   [Query APIs](#query-apis)
-   [Indexes](#indexes)
-   [Schema design](#schema-design)
-   [Transaction model](#transaction-model)
-   [Consistency model](#consistency-model)
-   [Security](#security)
-   [Replication and high availability](#replication-and-high-availability)
-   [Scalability](#scalability)
-   [Deployment](#deployment)
-   [Jepsen tests](#jepsen-tests)
-   [Summary](#summary)

---

- はじめに](#introduction)
- 用語解説](#terminology)
- [クエリAPI](#query-apis)
- [インデックス](#indexes)
- スキーマ設計](#schema-design)
- トランザクションモデル](#transaction-model)
- コンシステンシーモデル](#consistency-model)
- セキュリティ](#security)
- レプリケーション＆ハイアベイラビリティ](#replication-and-high-availability)
- スケーラビリティ](#scalability)
- デプロイメント](#deployment)
- Jepsenテスト](#jepsen-tests)
- まとめ](#summary)

## [](#introduction)Introduction

はじめに

Postgres and Fauna are both relational, operational databases. They serve similar use cases in modern applications, and as you will see below, they have many similarities, especially in their positive attributes. At the same time, they differ significantly in architecture, query language support, and deployment model.

PostgresとFaunaはどちらもリレーショナルな運用型データベースです。両者は現代のアプリケーションで同様の使用例を提供しており、以下に示すように、多くの類似点、特にその良い特性を持っています。同時に、アーキテクチャ、問い合わせ言語のサポート、および展開モデルにおいても大きく異なります。

PostgreSQL, also known as Postgres, is one of the most popular open source databases in the world. Derived from the Ingres project, it has been developed by an open source community for over two decades. It is a traditional relational database management system designed for interactive transactions over low latency networks. Many cloud infrastructure vendors now offer Postgres as a service, with varying degrees of support for the full range of Postgres features.

Postgresとして知られているPostgreSQLは、世界で最も人気のあるオープンソースデータベースの1つです。Ingresプロジェクトから派生したこのデータベースは、20年以上にわたってオープンソースコミュニティによって開発されてきました。Postgresは、低遅延ネットワーク上でのインタラクティブなトランザクションのために設計された、伝統的なリレーショナルデータベース管理システムです。現在、多くのクラウドインフラベンダーがPostgresをサービスとして提供しており、Postgresの全機能に対するサポートの程度は様々です。

Postgres’ architecture originated in the pre-internet era, when operational databases were used for predictable business reporting workloads from trusted applications within the same building on a LAN. Various managed infrastructure providers have made proprietary changes to Postgres’ code base to better fit the cloud world, but the fundamentals of the architecture remain. In comparison, Fauna’s architecture originates in the serverless era, and is designed for scalable access from globally distributed applications over the public internet.

Postgresのアーキテクチャは、LAN上の同じ建物内にある信頼できるアプリケーションからの予測可能なビジネスレポートのワークロードに運用データベースが使用されていたインターネット以前の時代に生まれました。様々なマネージドインフラストラクチャプロバイダは、クラウドの世界に合わせてPostgresのコードベースに独自の変更を加えてきましたが、アーキテクチャの基本は残っています。それに比べて、Faunaのアーキテクチャはサーバーレスの時代に生まれたもので、公衆インターネット上のグローバルに分散したアプリケーションからのスケーラブルなアクセスを想定して設計されています。

Postgres and Fauna are both relational databases, supporting serializable transactions, database normalization, foreign keys, indexes, constraints, stored procedures, and other typical relational features. Postgres has some features Fauna lacks, like geo-indexing, whereas Fauna has some features Postgres lacks, like temporality, query streaming, and multi-tenancy. Postgres offers SQL as a query language, while Fauna supports GraphQL and FQL.

Postgres と Fauna はともにリレーショナルデータベースであり、シリアライズ可能なトランザクション、データベースの正規化、外部キー、インデックス、制約、ストアドプロシージャ、およびその他の典型的なリレーショナル機能をサポートしています。Postgres にはジオインデックスのような Fauna にない機能があり、一方、Fauna にはテンポラリ、クエリストリーミング、マルチテナンシーのような Postgres にない機能があります。Postgres はクエリ言語として SQL を提供しているが、Fauna は GraphQL と FQL をサポートしている。

## [](#terminology)Terminology

用語集

Postgres | Fauna | Explanation | 
-- | -- | -- | 
Row or record | Document | An individual record in the database. | 
Table | Collection | A container for documents. | 
Primary | Region | Fauna has no primary or secondary concept, so all regions can serve both reads and writes. | 
Secondary, replica, standby | Region | Fauna has no primary or secondary concept, so all regions can serve both reads and writes. | 
Replication | Replication | Fauna’s replication is semi-synchronous and does not require any operator management. | 
Sharding | n/a | Fauna does not require the operator to manage sharding or partitioning in any way. | 
Primary key | Ref | The unique identifier of a document. | 
Foreign key | Ref | A pointer from one document to another. | 
Index, materialized view | Index | Fauna merges the concepts of indexes and views. Indexes must be explicitly referenced, similar to the concept of hinting. | 
Transaction | Transaction | Both Postgres and Fauna support ACID transactions. | 
Schema, database | Database | Both Postgres and Fauna have a concept of logical databases that include schema (also known as DDL) records describing the collections, indexes, and security properties of the included records. | 
Stored procedure, user-defined function | Function | Fauna supports user-defined functions written in FQL. | 

---

|Postgres | Fauna | 説明 | 
|-- | -- | -- | 
|行またはレコード | 文書 | データベース内の個々のレコードです。| 
|テーブル | コレクション | ドキュメントのコンテナ | 
|プライマリ | リージョン | Fauna にはプライマリやセカンダリの概念がないため、すべてのリージョンが読み取りと書き込みの両方に対応できる。| 
|セカンダリ、レプリカ、スタンバイ | リージョン | Faunaにはプライマリやセカンダリの概念がないので、すべてのリージョンが読み取りと書き込みの両方を行うことができます。| 
|レプリケーション | レプリケーション | Fauna のレプリケーションは準同期型で、オペレーターによる管理は必要ありません。| 
|シャーディング | n/a | Fauna はシャーディングやパーティショニングをオペレーターが管理する必要は一切ありません。| 
|主キー | Ref | ドキュメントの一意の識別子。| 
|外部キー | Ref | あるドキュメントから別のドキュメントへのポインタ。| 
|インデックス、マテリアライズドビュー | インデックス | Fauna はインデックスとビューの概念を統合しています。インデックスは、ヒンティングの概念と同様に、明示的に参照されなければなりません。| 
|トランザクション |トランザクション | Postgres と Fauna は共に ACID トランザクションをサポートします。| 
|スキーマ、データベース | データベース | Postgres と Fauna の両方は、コレクション、インデックス、および含まれるレコードのセキュリティプロパティを記述したスキーマ（DDL としても知られる）レコードを含む論理データベースの概念を持っています。| 
|ストアドプロシージャ、ユーザー定義関数 | 関数 | Fauna は FQL で書かれたユーザー定義関数をサポートします。| 

## [](#query-apis)Query APIs

クエリAPI

Postgres is based on the tabular SQL data model, while Fauna is based on schemaless documents, to better fit modern application development patterns. (As a historical note, initially Postgres did not support SQL, but rather supported the QUEL language, which is similar in semantics but incompatible in syntax. Postgres’ popularity began to grow in the 90s after the addition of SQL support. This has some similarities to how Fauna’s popularity grew with the addition of GraphQL support.)

Postgresは表形式のSQLデータモデルをベースにしていますが、Faunaは最新のアプリケーション開発パターンによりフィットするように、スキーマレスドキュメントをベースにしています。歴史的なメモとして、当初PostgresはSQLをサポートしておらず、意味的には似ているが構文的には互換性のないQUEL言語をサポートしていました）。Postgresの人気は、SQLをサポートした後の90年代に高まりました。これは、GraphQLのサポートが追加されたことでFaunaの人気が高まったことと似ている部分があります)。

Postgres’ query feature set is very rich, with many custom extensions to the SQL standard, including full-text search, the JSONB document data type and other custom types, pgSQL stored procedures, a unique administrative security model, and various analytical capabilities. However, this means it is not directly compatible with any other SQL database, which limits portability. In practice, database workloads are never truly portable across DBMS implementations because of capability, administrative, and performance differences.

Postgresのクエリ機能セットは非常に豊富で、全文検索、JSONBドキュメントデータ型やその他のカスタム型、pgSQLストアドプロシージャ、独自の管理用セキュリティモデル、様々な分析機能など、標準SQLに対する多くのカスタム拡張機能を備えています。しかし、これは他のSQLデータベースと直接互換性がないことを意味しており、移植性に限界があります。実際には、データベースのワークロードは、機能、管理、パフォーマンスの違いにより、DBMSの実装間で真の意味でポータブルになることはありません。

Fauna also has a rich feature set, offering object and array types, document streaming, temporality, attribute-based access control (ABAC), multi-tenancy, integration with third-party identity and authorization providers, and a standard library similar to that of a general-purpose programming language. However, Fauna also is not directly compatible with any other database, unless usage is restricted to the GraphQL API.

Fauna は、オブジェクトや配列の型、ドキュメントストリーミング、一時性、属性ベースのアクセスコントロール（ABAC）、マルチテナンシー、サードパーティのアイデンティティおよび認証プロバイダとの統合、汎用プログラミング言語と同様の標準ライブラリなど、豊富な機能を備えています。しかし、Faunaは、GraphQL APIに限定して使用する場合を除き、他のデータベースとの直接的な互換性はありません。

Postgres’ fundamental query paradigm is that of making declarative, analytical queries against a large dataset. However, for operational, short-request workloads, these queries are restricted to single or small groups of records via WHERE clauses; this, along with the tabular data model, creates an impedance mismatch that ORMs are designed to solve.

Postgresの基本的なクエリパラダイムは、大規模なデータセットに対して宣言的で分析的なクエリを行うことです。しかし、業務上の短いリクエストのワークロードでは、これらのクエリはWHERE句を介して単一のレコードまたは小さなグループに制限されます。

ORMs introduce significant application complexity without removing the need to understand the SQL model and its performance characteristics, and undermine the value of core Postgres features like stored procedures and views that perform complex work outside of the application layer.

ORMは、SQLモデルとその性能特性を理解する必要性を排除することなく、アプリケーションを著しく複雑にし、アプリケーション層の外で複雑な作業を行うストアドプロシージャやビューといったPostgresのコア機能の価値を損ないます。

In comparison, Fauna’s query paradigm is one of customizing an operational data API via procedural programming. Fauna does not require ORMs or other middleware, instead offering a query model that directly matches modern application development paradigms.

それに比べて、Fauna のクエリパラダイムは、手続き型プログラミングによって運用データ API をカスタマイズするものです。Fauna は ORM やその他のミドルウェアを必要とせず、最新のアプリケーション開発パラダイムに直接マッチするクエリモデルを提供します。

You can compare SQL and FQL in detail [here](https://docs.fauna.com/fauna/current/start/fql_for_sql_users).

SQLとFQLの詳細な比較は[こちら](https://docs.fauna.com/fauna/current/start/fql_for_sql_users)をご覧ください。

## [](#indexes)Indexes

インデックス

Postgres and Fauna implement indexes very differently. In Postgres, an index is a materialization of an access pattern that the query planner can implicitly use to accelerate existing queries. In Fauna, an index is more like a relational view: a materialization that the application can query explicitly.

Postgres と Fauna では、インデックスの実装方法が大きく異なります。Postgres では、インデックスは、クエリプランナが既存のクエリを高速化するために暗黙的に使用できるアクセスパターンを具体化したものです。Faunaでは、インデックスはリレーショナルビューのようなもので、アプリケーションが明示的にクエリを実行できる実体化です。

One challenge with index design in Postgres and other relational databases is the implicit nature of their use at runtime. Frequently a developer believes a query is efficiently indexed when it is not. Various tools exist to try to identify unused indexes and unoptimized queries, and even change the storage strategy the index uses, but there is always some degree of trial and error in proper index design.

Postgres やその他のリレーショナルデータベースにおけるインデックス設計の課題の 1 つは、実行時に使用される暗黙の性質です。開発者は、クエリが効率的にインデックス化されていると信じていますが、実際にはインデックス化されていないことがよくあります。使用されていないインデックスや最適化されていないクエリを特定したり、インデックスが使用するストレージ戦略を変更したりするための様々なツールが存在しますが、適切なインデックス設計には常にある程度の試行錯誤が必要です。

In Fauna, it is transparent when an index is queried and when it is not, because the query must refer to it explicitly and rely on its contents directly. This means that existing queries cannot automatically be improved simply by adding an index. However, it also means that there are no discontinuities in the performance profile of the query as the dataset or query changes, simply because the planner started using a different strategy. In relational databases, index hinting is one technique to help mitigate this problem. You can think of Fauna indexes as an always-hinted system.

Faunaでは、クエリがインデックスを明示的に参照し、その内容に直接依存しなければならないため、インデックスがクエリされる場合とされない場合が透過的になります。つまり、インデックスを追加するだけでは、既存のクエリを自動的に改善することはできないということです。しかし、データセットやクエリが変更されても、プランナーが異なる戦略を使い始めたという理由で、クエリのパフォーマンスプロファイルが不連続になることはないということでもあります。リレーショナルデータベースでは、この問題を軽減するための技術として、インデックスヒンティングがあります。Fauna インデックスは、常にヒントを与えるシステムと考えることができます。

Both Postgres and Fauna indexes can enforce unique constraints, and both Postgres and Fauna allow indexing into deeply nested JSON objects and multi-value arrays. Postgres supports built-in geographic and full-text indexing, which Fauna currently lacks, although there are some workarounds via FQL. However, unlike Postgres, Fauna indexes can include multiple collections and create constraints across them, as well as filter and transform indexed data in more complex ways. Fauna can also query historical data, even in indexes.

PostgresとFaunaのインデックスは、一意性制約を強制することができ、PostgresとFaunaの両方で、深く入れ子になったJSONオブジェクトや多値配列へのインデックスが可能です。Postgres はビルトインの地理的インデックスとフルテキストインデックスをサポートしているが、Fauna には現在欠けている。しかし、Postgres とは異なり、Fauna のインデックスには複数のコレクションが含まれ、それらにまたがる制約を作成することができ、さらに複雑な方法でインデックスデータをフィルタリングおよび変換することができます。また、Fauna はインデックスの中でも履歴データを照会することができます。

## [](#schema-design)Schema design

スキーマ設計

Postgres and Fauna schema design is similar. Both systems encourage relational data modeling and normalization. Both systems support foreign keys and unique constraints. Both offer transactional guarantees that preserve data integrity across collections and tables. Compared to non-relational systems, data modeling in Postgres and Fauna is easy, intuitive, and safe.

PostgresとFaunaのスキーマ設計は似ている。両システムとも、リレーショナルデータのモデリングと正規化を推奨しています。両システムとも外部キーと一意性制約をサポートしています。両システムとも、コレクションとテーブル間のデータの整合性を保つトランザクション保証を提供します。非リレーショナルシステムと比較して、PostgresとFaunaのデータモデリングは簡単で、直感的で、安全です。

One difference is that Postgres schemas are declared and enforced at runtime for each table, whereas Fauna is schemaless. Instead, schemas are implied by the shape of the documents. Fauna supports more flexible schema evolution for this reason.

一つの違いは、Postgresのスキーマはテーブルごとに実行時に宣言され、強制されるのに対し、Faunaはスキーマレスです。その代わり、スキーマはドキュメントの形状によって暗示される。このため、Fauna はより柔軟なスキーマ展開をサポートしている。

To enforce specific schemas within Fauna, you can use application-side checks, or use functions (stored procedures) for writes, which lets the database run custom logic before transactions are committed. Declarative schemas are on the Fauna roadmap.

Fauna 内で特定のスキーマを強制するには、アプリケーションサイドのチェックを使用するか、書き込み用の関数（ストアドプロシージャ）を使用して、トランザクションがコミットされる前にデータベースでカスタムロジックを実行することができます。宣言的なスキーマは、Fauna のロードマップにあります。

Another difference is that Fauna also has graph database roots. For example, in Postgres and other relational databases, one-to-many relationships would be constructed via join tables. In Fauna, a join collection works well, but you can also choose to directly refer from one document to another via references (foreign keys) within the documents, and index whatever query patterns you want to pre-materialize. The index functions as a system-managed join table, simplifying the data model.

もうひとつの違いは、Faunaにもグラフデータベースのルーツがあることです。例えば、Postgresなどのリレーショナルデータベースでは、一対多の関係はジョインテーブルによって構築される。Faunaでは、結合集もうまく機能しますが、ドキュメント内の参照（外部キー）を介して、あるドキュメントから別のドキュメントを直接参照することもできますし、どんなクエリパターンでもインデックスを作成して事前に物質化することができます。インデックスはシステム管理されたジョインテーブルとして機能し、データモデルを簡素化する。

In general, Fauna schema design can be considered an evolution of Postgres’ relational model, with better support for modern document and object-oriented programming practices and standards like GraphQL.

一般的に、Faunaのスキーマデザインは、Postgresのリレーショナルモデルを進化させたものと考えることができ、最新のドキュメントやオブジェクト指向のプログラミング手法やGraphQLのような標準をよりよくサポートしています。

## [](#transaction-model)Transaction model

トランザクションモデル

Postgres and Fauna are both transactional databases. Postgres supports interactive sessions transactions over TCP/IP. The application opens a persistent connection to the database that buffers transactional state, and can incrementally build up the transaction over the wire, interleaving database reads, application-side computation, and database writes.

Postgres と Fauna は共にトランザクションデータベースです。PostgresはTCP/IP上のインタラクティブなセッショントランザクションをサポートしています。アプリケーションは、トランザクション状態をバッファリングするデータベースへの持続的な接続を開き、データベースの読み込み、アプリケーション側の計算、データベースの書き込みを織り交ぜながら、有線でトランザクションを段階的に構築することができます。

The persistent connection model has some disadvantages in the cloud era. It expects to interact with long-lived application instances that are physically co-located with the database, not globally-distributed web servers, serverless functions, or embedded clients. Connection overhead is high, leading to cold-start problems. The series of interactions between the client and the server require low-latency network links to be performant. And because the server must maintain persistent resources for each connection, connection exhaustion is possible, leading to complex connection pooling solutions that interleave requests, affecting consistency and availability.

持続的接続モデルには、クラウド時代には不利な点があります。クラウドでは、グローバルに分散したWebサーバーやサーバーレス機能、組み込みクライアントではなく、データベースと物理的に同居している長寿命のアプリケーションインスタンスとのやり取りを想定しています。接続のオーバーヘッドが大きく、コールドスタートの問題が発生する。クライアントとサーバーの間で行われる一連のやり取りは、パフォーマンスを維持するために低レイテンシーのネットワークリンクを必要とします。また、サーバーは各接続に対して永続的なリソースを維持する必要があるため、接続が枯渇する可能性があり、リクエストをインターリーブする複雑なコネクションプーリングソリューションが必要となり、一貫性と可用性に影響を与えます。

Fauna, on the other hand, does not need persistent transaction state. Fauna transactions are stateless, atomic, pure functions over the state of the dataset. Applications using Fauna build up a transaction locally via the Fauna drivers. This transaction is then serialized to JSON and sent to the database as a single HTTPS request, minimizing latency.

一方、Fauna は永続的なトランザクション状態を必要としません。Fauna のトランザクションは、データセットの状態に対するステートレスでアトミックな純粋関数である。Fauna を使用するアプリケーションは、Fauna ドライバを介してローカルにトランザクションを構築します。このトランザクションはJSONにシリアライズされ、単一のHTTPSリクエストとしてデータベースに送信されるため、レイテンシーが最小限に抑えられる。

This also means, however, that the application cannot do local computation during the course of the transaction—instead it must rely on Fauna’s rich standard library of functions for server-side computation in the transaction itself. In practice, this is rarely a point of friction.

その代わり、トランザクション自体のサーバーサイドの計算は、Faunaの豊富な標準関数ライブラリに頼らなければならない。実際には、この点が摩擦になることはほとんどありません。

This model eliminates the need for connection management. It dramatically reduces latency, especially for geographically diverse applications, increases throughput, and simplifies security and network operations.

このモデルでは、接続管理の必要性がありません。特に地理的に多様なアプリケーションの場合、レイテンシーを劇的に削減し、スループットを向上させ、セキュリティとネットワークの運用を簡素化します。

## [](#consistency-model)Consistency model

コンシステンシーモデル

On the CAP theorem continuum, Postgres and Fauna are both CP systems. If forced to choose, they favor consistency over high availability. Both databases offer a strictly serializable consistency model for read/write transactions, and are ACID-compliant. Nevertheless there are some very significant differences that make this comparison not as straightforward as it may seem.

CAP定理の連続体では、PostgresとFaunaはどちらもCPシステムです。選択を迫られた場合、高可用性よりも一貫性を優先します。どちらのデータベースも、読み書き可能なトランザクションに対して厳密にシリアライズ可能な一貫性モデルを提供しており、ACIDに準拠しています。しかし、非常に大きな違いがあるため、この比較は一見すると単純ではありません。

Postgres defaults to the read-committed isolation level, which is much weaker than serializable. Enabling serializable isolation has some performance costs. Additionally, Postgres only offers transactional isolation for transactions that interact with the primary node.

Postgresのデフォルトの分離レベルはread-committedであり、serializableよりもはるかに弱いものです。シリアライザブル・アイソレーションを有効にするとパフォーマンス上のコストが発生します。さらに、Postgresはプライマリ・ノードとやりとりするトランザクションに対してのみトランザクション分離を提供します。

Most applications perform all read-write transactions on the Postgres primary, but route read-only transactions to secondaries to allow for read scale-out and lower latency. These read-only transactions are eventually consistent. The results can be stale or even invalid under common scenarios without any notice to the application. Read-your-own-writes is not guaranteed. Even when Postgres is configured for semi-synchronous replication, this situation does not improve. Postgres will block writes on secondary commits, but will not isolate secondary reads.

ほとんどのアプリケーションは全ての読み書きのトランザクションをPostgresのプライマリで実行しますが、読み取りのスケールアウトと低レイテンシを可能にするために、読み取り専用のトランザクションをセカンダリにルーティングしています。これらの読み取り専用のトランザクションは、最終的には一貫性があります。一般的なシナリオでは、アプリケーションに気づかれることなく、結果が古くなったり、無効になったりすることがあります。Read-your-own-writesは保証されていません。Postgresが準同期レプリケーション用に構成されていても、この状況は改善されません。Postgresはセカンダリコミットに対する書き込みをブロックしますが、セカンダリリードを分離することはできません。

Enabling multi-primary writes in Postgres degrades the isolation model even further, as constraints can no longer be enforced. Avoiding these problems requires using read replicas as hot standbys only, leading to the obvious scalability bottlenecks on the primary node. Postgres’ roots as a single location, vertically scaled RDBMS are clear when the isolation model is combined with replication.

Postgresで複数のプライマリの書き込みを可能にすると、制約が適用できなくなるため、分離モデルはさらに劣化します。これらの問題を回避するためには、リード・レプリカをホット・スタンバイとしてのみ使用する必要があり、プライマリ・ノードの明らかなスケーラビリティ・ボトルネックにつながります。アイソレーション・モデルとレプリケーションを組み合わせれば、シングルロケーションで垂直方向に拡張可能なRDBMSとしてのPostgresのルーツは明らかです。

In contrast, Fauna defaults to strict serializability, the highest possible isolation level. This guarantee is preserved for all read-write transactions, regardless of which region they are performed in. This reduces latency and increases durability. Unlike Postgres, there are no circumstances in which Fauna can lose an acknowledged commit.

これに対し、Faunaではデフォルトで最高の分離レベルである厳密なシリアライザブルを採用しています。この保証は、どのリージョンで実行されるかにかかわらず、すべての読み書き可能なトランザクションに対して維持される。これにより、レイテンシーが減少し、耐久性が向上します。Postgres とは異なり、Fauna が確認済みのコミットを失うような状況はありません。

Fauna read-only transactions default to snapshot isolation, which is similar to Postgres’ read-committed default for all transactions, and are always served from the closest region to the application without further coordination. This minimizes latency. However, Fauna also uses some special techniques that upgrade read-only snapshot isolation to strictly serializable in all normally observable scenarios, without increasing latency.

Fauna の読み取り専用トランザクションのデフォルトはスナップショット隔離で、これは Postgres の全トランザクションに対する読み取りコミットのデフォルトと同様であり、さらに調整することなく常にアプリケーションに最も近いリージョンから提供される。これにより、レイテンシーが最小限に抑えられます。しかし、Faunaはいくつかの特別な技術を用いて、レイテンシーを増加させることなく、通常観察可能なすべてのシナリオにおいて、リードオンリーのスナップショットアイソレーションを厳密にシリアライズ可能なものにアップグレードしています。

Thus, Fauna’s consistency model is stronger than Postgres’ model for horizontally scalable and/or highly available deployments.

このように、Fauna の一貫性モデルは、水平方向のスケーラビリティや高可用のデプロイメントにおいては Postgres のモデルよりも強力である。

## [](#security)Security

セキュリティ

Postgres has a complex security model that has grown in complexity over time. For basic access, it offers the ability to inherit security properties and accounts from the underlying operating system, limiting access to datasets and administrative resources. It allows for creation of administrative accounts directly within the database itself. It offers connections over TCP/IP, with optional encryption via SSL, as well as connections via Unix domain sockets.

Postgresは時間とともに複雑になってきたセキュリティモデルを持っています。基本的なアクセスについては、基礎となるオペレーティングシステムからセキュリティプロパティとアカウントを継承する機能を提供し、データセットと管理リソースへのアクセスを制限しています。また、データベース内で直接管理アカウントを作成することも可能です。TCP/IPでの接続が可能で、オプションでSSLによる暗号化や、Unixドメインソケットでの接続も可能です。

Once access is achieved, various administrative rights can be granted for table access and schema changes. Additionally, row-level security is possible by creating policy predicates that are checked before performing read or write operations.

アクセスが可能になると、テーブルへのアクセスやスキーマの変更など、さまざまな管理者権限を付与することができます。さらに、読み取りまたは書き込み操作を行う前にチェックされるポリシー述語を作成することで、行レベルのセキュリティが可能です。

Postgres security is designed for a small number of administrators of the database itself. It is not designed to manage security at the application user level. This task is completely delegated to the application itself. The developer must decorate every query with appropriate access restrictions, and consider the implications of indirect access and other leak vectors in the dataset. This can lead to many security faults, such as the venerable SQL injection attack, where malformed user data can truncate a query before its security clauses and defeat them.

Postgresのセキュリティは、データベース自体の少数の管理者のために設計されています。アプリケーションのユーザレベルでセキュリティを管理するようには設計されていません。このタスクはアプリケーション自体に完全に委ねられています。開発者は、すべてのクエリを適切なアクセス制限で装飾し、間接アクセスやデータセット内の他のリークベクターの意味を考慮しなければなりません。これは、由緒あるSQLインジェクション攻撃のように、悪質なユーザーデータがセキュリティ条項の前でクエリを切り捨て、それを打ち破ってしまうような、多くのセキュリティ障害を引き起こす可能性があります。

Fauna, on the other hand, was designed with a web-native security model. It is secure by default and does not assume that any access is trusted. All applications must connect to the database over HTTPS with an access key that defines the administrative privileges that application has.

一方、Faunaは、ウェブネイティブなセキュリティモデルで設計されています。Fauna は、デフォルトで安全であり、いかなるアクセスも信頼できるとは想定していません。すべてのアプリケーションは、そのアプリケーションが持つ管理者権限を定義するアクセスキーを使って、HTTPSでデータベースに接続しなければならない。

Additionally, Fauna’s security model additionally assumes user-level security is the common case. Users can be authenticated and identified with third-party providers or with Fauna directly, and be issued a key that limits their access, which is controlled by attribute-based access control policies, which are similar to Postgres’ predicates, but more flexible and composable.

さらに、Faunaのセキュリティモデルでは、さらにユーザーレベルのセキュリティを一般的なケースとして想定しています。ユーザーは、サードパーティプロバイダーまたはFaunaと直接、認証・識別され、アクセスを制限するキーが発行されます。このキーは、Postgresの述語に似ていますが、より柔軟で合成可能な属性ベースのアクセスコントロールポリシーによって制御されます。

Fauna also offers a hierarchical tenancy model that lets datasets within the same database be completely isolated from each other, for example, different customers of a SaaS product. Such a data model in Postgres requires the addition of a tenancy column to every table and a filter clause to every query, introducing complexity and risk.

Faunaはまた、階層的なテナントモデルを提供しており、同じデータベース内のデータセットを、例えばSaaS製品の異なる顧客同士で完全に分離することができます。Postgres のこのようなデータモデルでは、すべてのテーブルにテナント列を追加し、すべてのクエリにフィルタ節を追加する必要があり、複雑さとリスクが生じます。

Additionally, query parsing in Fauna is type safe, and injection attacks are not possible.

さらに、Fauna のクエリ解析は型安全であり、インジェクション攻撃はできません。

## [](#replication-and-high-availability)Replication and high availability

レプリケーションと高可用性

Postgres’ replication is based on a traditional primary and secondary concept. All write transactions must be directed to the primary node. After they commit on the primary node, the write effects are asynchronously replicated to any secondary nodes. (Some previous versions of Postgres required statement-based replication based on triggers and middleware.)

Postgresのレプリケーションは、伝統的なプライマリとセカンダリのコンセプトに基づいています。すべての書き込みトランザクションはプライマリノードに向けられなければなりません。プライマリノードでコミットした後、書き込み効果は非同期的に任意のセカンダリノードにレプリケートされます。(Postgresのいくつかの旧バージョンでは、トリガーやミドルウェアに基づくステートメントベースのレプリケーションが必要でした)

The Postgres replication architecture introduces several issues in a modern cloud environment. The reliance on a primary node creates a single point of failure, reducing availability. It also increases latency because it can not be globally distributed. It is a scalability bottleneck, requiring vertical (per table) partitioning as a workaround, which undermines transactional guarantees. Serializability and read-your-own-writes guarantees are not met when reading from the secondary nodes. Finally, if the primary node fails, it is possible to lose committed writes, as well as suffer a lengthy failover process during which writes are non-performant.

Postgresのレプリケーションアーキテクチャは、最新のクラウド環境にいくつかの問題をもたらします。プライマリノードに依存することで、単一障害点が発生し、可用性が低下します。また、グローバルに分散させることができないため、レイテンシーが増加します。スケーラビリティのボトルネックとなり、回避策として垂直方向（テーブル単位）のパーティショニングが必要となり、トランザクションの保証が損なわれる。また、セカンダリノードからの読み込み時には、シリアライゼーションやRead-your-own-Writesの保証が満たされません。最後に、プライマリノードに障害が発生した場合、コミットされた書き込みが失われる可能性があり、書き込みが実行されない長いフェイルオーバープロセスに悩まされることになります。

Fauna’s replication is based on a Calvin-inspired, global, replicated transaction log. All transactions are journaled to the log before they are committed. Commits to the replica regions are semi-synchronous; the application does not receive an acknowledgement until durability, serializability, and read-your-own-write guarantees are met. This applies regardless of which region the application accesses, and even if the application switches regions between requests.

Faunaのレプリケーションは、Calvinにインスパイアされたグローバルなレプリケートされたトランザクションログに基づいています。すべてのトランザクションは、コミットする前にログにジャーナリングされる。レプリカ領域へのコミットは半同期的に行われ、アプリケーションは、耐久性、シリアライザビリティ、リードユアオウンライトの保証が満たされるまで確認応答を受け取りません。これは、アプリケーションがどの領域にアクセスしても、また、リクエストの間に領域を切り替えても同じです。

There is no concept of a primary or secondary region in Fauna, nor is there a user-visible concept of a node. The Fauna API manages failures of the underlying infrastructure transparently for both reads and writes, and latency is bound by the physical distance to the nearest Fauna region.

Faunaには、プライマリリージョンやセカンダリリージョンという概念はなく、ユーザーが目にすることのできるノードという概念も存在しない。Fauna API は基盤となるインフラの障害を読み取りと書き込みの両方で透過的に管理し、レイテンシーは最も近い Fauna リージョンまでの物理的な距離によって制限される。

## [](#scalability)Scalability

スケーラビリティ

Postgres scalability is bound on two axes: the capacity of the primary node, which principally impacts write transitions (and the read dependencies of those writes), and the number and capacity of the secondary nodes, which can scale reads. Thus, writes are vertically scalable, and reads are both horizontally and vertically scalable. In order to scale in most Postgres clusters, manual provisioning is required, or at minimum, configuration of auto-scaling parameters.

Postgresのスケーラビリティは2つの軸で制限されています。主に書き込みの遷移（およびそれらの書き込みの読み込み依存性）に影響するプライマリノードの容量と、読み込みをスケーリングできるセカンダリノードの数と容量です。したがって、書き込みは垂直方向にスケーラブルであり、読み込みは水平方向と垂直方向の両方にスケーラブルです。ほとんどのPostgresクラスタでスケーリングするためには、手動でプロビジョニングするか、最低でもオートスケーリングパラメータの設定が必要です。

Postgres is not, at heart, an elastic system. Scaling up and down must be a predictive process, because it takes time to shutdown and restart processes on new hardware, VMs, or in new containers, rehydrate caches, and copy data from secondary nodes. Cloud Postgres systems that are serverless or auto-scaled typically rely on making many micro-provisioning decisions on an hourly or minutely basis to simulate an API-style elasticity. This impacts latency, throughput, and potentially availability, depending on configuration. It also leads to wasted, idle resources.

Postgresは本質的には、弾力性のあるシステムではありません。新しいハードウェア、VM、または新しいコンテナでのプロセスのシャットダウンと再起動、キャッシュの再水和、およびセカンダリノードからのデータのコピーに時間がかかるため、スケールアップおよびダウンは予測的なプロセスでなければなりません。サーバーレスまたは自動スケールのクラウドPostgresシステムは、通常、APIスタイルの弾力性をシミュレートするために、1時間または1分単位で多くのマイクロプロビジョニングの決定を行うことに依存しています。これは、構成によっては、レイテンシー、スループット、および潜在的な可用性に影響を与えます。また、無駄なアイドルリソースの発生にもつながります。

Fauna’s writes scale with the transaction log, which is both partitioned and replicated, and thus horizontally and vertically scalable. Fauna’s reads scale with the number and size of the replica regions, which may be heterogeneous given the balance of workloads within Fauna overall. However, these scaling decisions are not visible to the developer at all.

Fauna の書き込みは、パーティション化されて複製されているトランザクションログに合わせてスケーリングされるため、水平方向にも垂直方向にもスケーリングが可能です。Fauna の読み取りは、レプリカ領域の数とサイズに応じてスケーリングされるが、Fauna 全体のワークロードのバランスを考えると、レプリカ領域は異種の可能性がある。しかし、これらのスケーリングの決定は、開発者にはまったく見えない。

Fundamentally, Fauna is a multi-tenant API, not a provisioned, managed resource. All workloads within Fauna share a large pool of underlying hardware that is both multi-region and multi-cloud. The Fauna scheduler within the database kernel tracks resource consumption and implements something akin to cooperative multithreading to isolate queries from each other.

基本的に、Fauna はマルチテナント API であり、プロビジョニングされて管理されたリソースではない。Fauna 内のすべてのワークロードは、マルチリージョンとマルチクラウドに対応した基礎的なハードウェアの大規模なプールを共有しています。データベースカーネル内の Fauna スケジューラは、リソース消費を追跡し、クエリを互いに分離するための協調マルチスレッドのような機能を実装している。

Thus there is no concept of scaling a database up and down within Fauna. All workloads potentially have access to the resources of the entire cluster at any moment in time. The Fauna operational team scales the shared Fauna clusters behind the scenes as overall usage grows. This model minimizes idle resources and waste, and helps guarantee predictable performance regardless of the individual query patterns within a database.

そのため、Fauna にはデータベースのスケールアップやスケールダウンの概念がない。すべてのワークロードは、いつでもクラスタ全体のリソースにアクセスできる可能性がある。Fauna の運用チームは、全体的な使用量の増加に応じて、共有されている Fauna クラスタを舞台裏でスケーリングします。このモデルは、アイドルリソースと無駄を最小限に抑え、データベース内の個々のクエリパターンにかかわらず、予測可能なパフォーマンスを保証するのに役立っている。

## [](#deployment)Deployment

デプロイメント

Postgres is open source, and relies on operator deployment onto provisioned hardware. Many cloud vendors offer managed versions of Postgres that orchestrate this deployment via a dashboard or administrative API.

Postgresはオープンソースであり、プロビジョニングされたハードウェアへのオペレータによる展開に依存しています。多くのクラウドベンダーは、ダッシュボードや管理APIを介してこの展開を指揮するマネージドバージョンのPostgresを提供しています。

This model exposes quite a bit of complexity, but also choice, to the operator. The operator controls which version of Postgres is deployed, coupling operational and performance improvements, bug fixes, and new features together. The operator must also select the underlying hardware for the database, which can dramatically change the performance not only of different types of queries, but also the running costs of the system.

このモデルでは、オペレータにかなりの複雑さと同時に選択肢も与えています。オペレータは、どのバージョンのPostgresをデプロイするかを制御し、運用とパフォーマンスの改善、バグ修正、および新機能を結合します。オペレータは、データベースの基礎となるハードウェアも選択しなければならず、これにより、さまざまなタイプのクエリのパフォーマンスだけでなく、システムのランニングコストも劇的に変化します。

Postgres has a substantial library of first-party and third-party extensions that may or may not be available or configurable. Tuning parameters that are available for things like buffer caches, connection defaults, background tasks behavior (such as the vacuum task that garbage collects deleted records) all affect performance and configuration. Additionally, Postgres failover models vary and require understanding of the host environment’s capabilities and the database’s configuration policies in order to manage hardware faults appropriately from the application.

Postgresには、ファーストパーティおよびサードパーティの拡張機能のかなりのライブラリがありますが、これらの拡張機能は利用可能であるか、または設定可能であるかに関わらず、利用できません。バッファキャッシュ、接続のデフォルト、バックグラウンドタスクの動作（削除されたレコードをガベージコレクションするバキュームタスクなど）などで利用可能なチューニングパラメータは、すべてパフォーマンスと構成に影響を与えます。さらに、Postgres のフェイルオーバーモデルは様々で、アプリケーションからハードウェアの障害を適切に管理するためには、ホスト環境の機能とデータベースの構成ポリシーを理解する必要があります。

In contrast, Fauna abstracts these decisions away. The Fauna operations team manages the cluster overall, continually upgrading the underlying software and hardware to improve performance across the board for all Fauna databases. Fauna databases have no configurability at the operational level beyond region selection, and performance is bound by query patterns and dataset sizes, not by tunable parameters.

対照的に、Fauna はこれらの決定を抽象化している。Fauna の運用チームはクラスタ全体を管理し、基盤となるソフトウェアとハードウェアを継続的にアップグレードして、すべての Fauna データベースのパフォーマンスを全面的に向上させます。Fauna データベースは、リージョンの選択以外に運用レベルでの設定ができず、パフォーマンスは調整可能なパラメータではなく、クエリパターンとデータセットのサイズに制約されます。

Open source has many benefits, but in this case, since Fauna is proprietary, one of its downsides is avoided. There is no feature fragmentation: every Fauna database has access to the same capabilities, including those in the local development edition (which is a copy of the actual cloud software, and not a mock). There is no upgrade cycle or version selection for the operator; compatibility is maintained through API versioning instead.

オープンソースには多くのメリットがありますが、今回はFaunaがプロプライエタリであるため、そのデメリットの1つが回避されています。機能の断片化はありません。ローカル開発版（実際のクラウドソフトウェアのコピーであり、モックではありません）の機能も含め、すべてのFaunaデータベースが同じ機能にアクセスできます。オペレーターはアップグレードサイクルやバージョンの選択をする必要がなく、APIのバージョン管理によって互換性を維持することができます。

## [](#jepsen-tests)Jepsen tests

Jepsenのテスト

Jepsen, and its related tool Elle, is a verification suite for the consistency properties of transactional systems, under normal operation, and under fault conditions. Both Fauna and Postgres have been evaluated under Jepsen at various times in the past.

Jepsen とその関連ツールである Elle は、トランザクションシステムの一貫性の特性を、通常の運用時および障害発生時に検証するためのツールです。Fauna と Postgres の両方が、過去の様々な時期に Jepsen で評価されました。

In both evaluations, the Jepsen team found implementation bugs that affected the consistency properties, which have since been resolved by respective maintainers of the databases. In many Jepsen analyses, the underlying system cannot possibly deliver its claimed capabilities due to fundamental issues in the architectures. Importantly, the Jepsen team found that both Fauna’s and Postgres’ architectures achieve their goals in both theory and practice.

どちらの評価においても、Jepsenチームは一貫性の特性に影響を与える実装上のバグを発見しましたが、それらはデータベースの各メンテナによって解決されました。Jepsenの分析では、アーキテクチャの基本的な問題のために、基盤となるシステムが主張する機能を実現できないことが多い。重要なことは、Jepsenチームは、FaunaとPostgresの両アーキテクチャが、理論的にも実践的にも目標を達成していることを発見したことです。

One important thing to note is that a Jepsen analysis only checks for the properties that the system under testing claims to offer—it is not testing against an absolute standard. Since Postgres does not offer multi-primary write consistency, 100% durability on failover, or serializable reads from secondary nodes, these properties were not checked.

注意すべき点は、Jepsen分析は、テスト対象のシステムが提供すると主張している特性をチェックするだけであり、絶対的な基準に対してテストしているわけではないということです。Postgresは、複数プライマリの書き込み一貫性、フェイルオーバー時の100%耐久性、セカンダリノードからのシリアライズ可能な読み込みを提供していないため、これらの特性はチェックされませんでした。

Fauna does offer these properties, and they were verified as such. Thus, Jepsen ultimately demonstrated that although Fauna is newer than Postgres, it does indeed offer an overall higher level of consistency.

Faunaはこれらのプロパティを提供しており、そのように検証されました。このように、Jepsen氏は最終的に、FaunaはPostgresよりも新しいが、全体的に高いレベルの一貫性を提供していることを証明した。

## [](#summary)Summary

まとめ

Fauna and Postgres share many similar goals and characteristics. Although Postgres is older than Fauna, they are both tested and hardened transactional databases with very strong durability, consistency, and availability properties. Their differences are most apparent in two ways: their query languages and their operational posture.

FaunaとPostgresは多くの類似した目標と特徴を共有しています。Postgresの方がFaunaよりも古いですが、どちらも非常に強力な耐久性、一貫性、可用性の特性を持つ、テストされ、強化されたトランザクションデータベースです。両者の違いは、クエリ言語と運用態勢の2つの点で明らかになります。

Postgres is the archetypal RDBMS, like DB2 or Oracle. It is designed for high-availability, mainframe class hardware, with co-located, trusted applications making SQL queries on a low-latency LAN.

Postgres は、DB2 や Oracle のような典型的な RDBMS です。Postgresは、高可用性を備えたメインフレームクラスのハードウェア用に設計されており、低レイテンシーのLAN上でSQLクエリを実行する、信頼できるアプリケーションが同居しています。

Fauna, on the other hand, is two or even three generations advanced. Designed recently rather than in the 80s and 90s, it reflects modern development and deployment patterns: globally distributed applications that use document and graph APIs to securely access data over the public internet.

一方、Faunaは2世代、あるいは3世代進んでいます。80年代、90年代ではなく、最近になって設計されたFaunaは、現代の開発と展開のパターンを反映しています。つまり、ドキュメントやグラフのAPIを使用して、公共のインターネット上でデータに安全にアクセスするグローバルな分散アプリケーションです。

If you like Postgres, especially its transactional properties and battle-hardened reliability, but want to minimize your operational burden and maximize your productivity in the modern cloud and serverless era, you may like Fauna even more. [Give it a try!](https://dashboard.fauna.com/)

もしあなたがPostgres、特にそのトランザクション特性と戦える信頼性が好きで、現代のクラウドとサーバーレスの時代に運用の負担を最小限にして生産性を最大化したいと思っているなら、Faunaをもっと好きになるかもしれません。[Give it a try!](https://dashboard.fauna.com/)

