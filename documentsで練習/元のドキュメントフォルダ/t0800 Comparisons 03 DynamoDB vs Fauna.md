DynamoDB vs Fauna (or Dynamo vs Fauna) | Fauna Documentation
https://docs.fauna.com/fauna/current/comparisons/compare-faunadb-vs-dynamodb

# DynamoDB vs Fauna (or Dynamo vs Fauna)

DynamoDB vs Fauna (またはDynamo vs Fauna)

Author: **Taro Woollet-Chiba**, Community Contributor  
August 2020

2020年8月

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
-   [Appendix](#appendix)

---

- [はじめに](#introduction)
- [用語集](#terminology)
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
- [サマリー](#summary)
- [別表](#appendix)

## [](#introduction)Introduction

はじめに

DynamoDB’s roots originate from an Amazon internal project called "Dynamo", a database built to address the many growing e-commerce needs of the online shopping service. Inspired by Dynamo and its techniques, DynamoDB provides a database with most operations and management automated behind the scenes. Of the many NoSQL databases out there, perhaps DynamoDB is the closest to Fauna, where both databases share a similar value proposition as "serverless databases". While DynamoDB’s on-demand pricing/scaling model lends itself to the "serverless" philosophy, it misses the mark on developer experience when it comes to multi-region transactions, schema flexibility, geo-distribution, burst scaling, and required developer operations.

DynamoDBのルーツは、Amazonの社内プロジェクトである「Dynamo」に端を発しています。Dynamoは、オンラインショッピングサービスで増大する多くのEコマースニーズに対応するために構築されたデータベースです。Dynamoとその技術にインスパイアされたDynamoDBは、ほとんどの操作と管理を舞台裏で自動化したデータベースを提供します。世の中にある数多くのNoSQLデータベースの中で、おそらくDynamoDBはFaunaに最も近く、両データベースは「サーバーレスデータベース」として同様の価値提案を共有しています。DynamoDBのオンデマンドの価格設定/スケーリングモデルは「サーバーレス」の理念に適していますが、マルチリージョントランザクション、スキーマの柔軟性、地理的分散、バーストスケーリング、必要な開発者の操作などに関しては、開発者の経験が不足しています。

As for business viability: evolving a schema overtime with DynamoDB can be an arduous experience given the lack of support for relations and joins. As applications grow, they will likely encounter significant technical debt which typically rears its head in features which cannot be changed without recreating the entire table. DynamoDB better serve’s mature and proven businesses, where all data and CRUD is well understood ahead of time. Furthermore, DynamoDB’s query API doesn’t provide extensive functionality for computations, aggregates, etc., requiring either long-term storage (and updating) of such calculated results or a costly layer of server side logic (along with an increased surface area for bugs).

ビジネスの実現性については、リレーションやジョインがサポートされていないため、DynamoDBを使ってスキーマを時間をかけて進化させるのは大変なことです。アプリケーションが成長すると、大きな技術的負債が発生する可能性があります。それは、テーブル全体を再作成しないと変更できない機能に現れます。DynamoDBは、すべてのデータとCRUDが事前によく理解されている、成熟した実証済みのビジネスに適しています。さらに、DynamoDBのクエリAPIは、計算や集約などの広範な機能を提供していないため、そのような計算結果を長期的に保存（および更新）するか、コストのかかるサーバーサイドロジックのレイヤー（およびバグの表面積の増加）が必要になります。

With the recent wave of serverless and GraphQL adoption, Fauna seeks to be an uncompromising data API for client-serverless applications. To further elaborate, Fauna offers an out-of-the-box GraphQL API and functional query language, on top of a strongly consistent distributed database engine capable of modeling relational, document, graph, and time-series data. Fauna’s value proposition improves on traditional database offerings, by converting the underlying database management infrastructure into a Data API that is well-suited for direct client-side usage, allowing backend developers to focus on the server-side logic which matters the most. The notion of database developer operations does not exist with Fauna. Developers are allowed to fully focus on application specific work, without the burden of maintaining throughput and capacity on an API and database.

最近のサーバーレスやGraphQLの普及に伴い、Faunaは、クライアント・サーバーレスアプリケーションのための妥協のないデータAPIを目指しています。さらに詳しく説明すると、Faunaは、リレーショナルデータ、ドキュメントデータ、グラフデータ、時系列データをモデル化できる、強く一貫した分散型データベースエンジンの上に、すぐに使えるGraphQL APIと関数型クエリ言語を提供している。Faunaの価値提案は、従来のデータベース製品よりも優れている。基盤となるデータベース管理インフラを、クライアントサイドで直接使用するのに適したデータAPIに変換することで、バックエンドの開発者は最も重要なサーバーサイドのロジックに集中することができる。Faunaには、データベース開発者のオペレーションという概念はありません。開発者は、APIやデータベースのスループットや容量を維持する負担なく、アプリケーション固有の作業に専念することができます。

## [](#terminology)Terminology

用語集

For clarity, here the terminology that each technology uses to describe itself:

わかりやすくするために、各テクノロジーが使用している用語を紹介します。

|DynamoDB | Fauna | Explanation | 
| -- | -- | -- | 
|Item | Document | An individual record in the database. | 
|Table | Collection | A container for items/documents. | 
|Partition Key | _Not Applicable_ | DynamoDB requires users to choose a partition key that determines how data is grouped and distributed among partitions. How you choose this key impacts DynamoDB’s scalability. In Fauna, optimal distribution is performed automatically for customers by automatically hashing a document’s ID, without impacting scale, ensuring one less thing for users to worry about. | 
|Partition Metadata System | Node | In DynamoDB, the Partition Metadata System contains a mapping of items to their respective partitions. In a Fauna cluster, every node has a consistent copy of this information. | 
|Transaction | Transaction | DynamoDB transactions are only ACID-compliant within a single region. Fauna supports transactions on all cluster configurations across multiple partitions. | 
|Read Capacity Unit (RCU) | _Not Applicable_ | Each DynamoDB RCU allows for one strongly consistent read, or two eventually consistent reads, per second. RCUs are primarily relevant to Provisioned Mode tables, however, they’re still somewhat relevant to tables utilizing On-Demand Mode, as RCUs still operate under the hood and can limit burst scalability. | 
|Write Capacity Unit (WCU) | _Not Applicable_ | A DynamoDB WCU reserves throughput capacity for one write per second. WCUs are primarily relevant to Provisioned Mode tables, however, they’re still somewhat relevant to tables utilizing On-Demand Mode, as WCUs still operate under the hood and can limit burst scalability. | 
|Read Request Unit (RRU) | Read Op | While DynamoDB RCUs vary in relevance to both capacity modes, RRUs are only relevant to On-Demand Mode tables, specifically in regards to the distinct pricing model. Simply put, RRUs are a unit of measurement for expended reads. Similar to RRUs, a Fauna read op is just a billing indicator and does not provision throughput. Where they differ, is how [RRU expenditure can vary](https://aws.amazon.com/dynamodb/pricing/on-demand/#:~:text=Read%20request%20unit%3A%20API%20calls,requires%20one%20read%20request%20unit) based on the desired level of consistency. | 
|Write Request Unit (WRU) | Write Op | DynamoDB WRUs, like RRUs, measure expended writes; though they do not have variable usage determined by strength of consistency. Like WRUs, a Fauna write op is just a billing indicator and does not provision throughput. | 

---

|DynamoDB | Fauna | Explanation | 
| -- | -- | -- | 
|Item|Document|データベース内の個々のレコード。| 
|テーブル|コレクション|アイテム／ドキュメントのコンテナ。| 
|パーティションキー|_Not Applicable_|DynamoDBでは、データのグループ化やパーティション間の分散方法を決定するパーティションキーをユーザーが選択する必要があります。このキーをどのように選択するかは、DynamoDBのスケーラビリティに影響します。Faunaでは、ドキュメントのIDを自動的にハッシュ化することで、スケールに影響を与えることなく、お客様に最適な分散を自動的に行い、ユーザーの心配事を一つ減らすことができます。| 
|パーティション・メタデータ・システム|ノード|DynamoDBでは、パーティション・メタデータ・システムには、アイテムとそれぞれのパーティションのマッピングが含まれています。Faunaクラスターでは、すべてのノードがこの情報の一貫したコピーを持っています。| 
|トランザクション|トランザクション|DynamoDBのトランザクションは、単一のリージョン内でのみACIDに準拠する。Fauna は複数のパーティションにまたがるすべてのクラスタ構成でトランザクションをサポートします。| 
|Read Capacity Unit (RCU)| _Not Applicable_| DynamoDB の各 RCU は、1 秒間に 1 回の強く一貫した読み取り、または 2 回の最終的に一貫した読み取りを可能にします。RCUは主にProvisioned Modeのテーブルに関連しますが、On-Demand Modeのテーブルにも多少関連します。RCUはフードの下で動作し、バーストスケーラビリティを制限する可能性があるからです。| 
|Write Capacity Unit (WCU)|_Not Applicable_|DynamoDBのWCUは、1秒間に1回の書き込みのためのスループット容量を確保します。WCUは主にプロビジョンドモードのテーブルに関連していますが、オンデマンドモードを利用するテーブルにも多少関連があります。| 
|Read Request Unit (RRU) |Read Op| DynamoDBのRCUはどちらのキャパシティモードにも関連していますが、RRUはオンデマンドモードのテーブルにのみ関連しており、特に価格モデルが異なります。簡単に言えば、RRUは消費された読み取りの測定単位です。RRUと同様に、Faunaの読み取り回数は単なる課金指標であり、スループットを提供するものではありません。両者が異なるのは、希望する一貫性のレベルに応じて[RRU消費量]をどのように変化させるかという点です(https://aws.amazon.com/dynamodb/pricing/on-demand/#:~:text=Read%20request%20unit%3A%20API%20calls,requirements%20one%read%20request%20unit)。| 
|Write Request Unit(WRU)|Write Op|DynamoDB WRUはRRUと同様に消費された書き込みを測定しますが、一貫性の強さによって使用量が変化することはありません。WRUと同様に、FaunaのWrite Opは単なる課金指標であり、スループットを提供するものではありません。| 

## [](#query-apis)Query APIs

クエリAPI

Rather than replace SQL with another query language, the DynamoDB creators opted for [a simple API with a handful of operations](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.API.html). Specifically, the API lets developers create and manage tables along with their indexes, perform CRUD operations, stream data changes/mutations, and finally, execute CRUD operations within ACID transactions. While DynamoDB doesn’t support complex querying, this tradeoff leads to reduced latency on a broad set of operations, as the database doesn’t need to process or interpret a query language.

DynamoDBの開発者は、SQLを別のクエリ言語に置き換えるのではなく、「いくつかの操作を持つシンプルなAPI」を選択した(https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.API.html)。具体的には、テーブルとそのインデックスの作成・管理、CRUD操作、データの変更・変異のストリーミング、そしてACIDトランザクション内でのCRUD操作の実行が可能です。DynamoDBは複雑なクエリをサポートしていませんが、データベースがクエリ言語を処理したり解釈したりする必要がないため、このトレードオフが幅広い操作におけるレイテンシーの低減につながります。

Fauna offers its take on a complex query language in the form of the Fauna Query Language (FQL); a flexible, highly-composable, and expressive query language. While FQL is distinctly different from SQL, developers familiar with the popular functional programming paradigm, will feel right at home. Readers well-versed in SQL might be interested in this [in-depth explanation](https://docs.fauna.com/fauna/current/start/fql_for_sql_users) of FQL, written specifically for SQL users.

Faunaは、複雑なクエリ言語をFauna Query Language（FQL）という形で提供しています。FQLは、柔軟性が高く、高度にカスタマイズ可能で、表現力豊かなクエリ言語です。FQLはSQLとは明らかに異なりますが、一般的な関数型プログラミングのパラダイムに慣れている開発者ならば、違和感なく使用できるでしょう。SQLに精通している読者は、SQLユーザーのために特別に書かれたFQLの[in-depth explanation](https://docs.fauna.com/fauna/current/start/fql_for_sql_users)に興味を持つかもしれません。

As mentioned earlier, Fauna offers an out-of-the-box GraphQL API with the same technical promises originally made for Fauna: zero-maintenance, globally-distributed, and serverless. GraphQL’s flexible abstraction on data, enables smooth frontend and backend cohesiveness; where clients/frontend-developers query for the exact data they need, often without having to request the backend team to write server-side or backend code.

先に述べたように、Faunaはすぐに使えるGraphQL APIを提供しており、Faunaのために最初に作られたのと同じ技術的な約束、すなわちゼロメンテナンス、グローバルな分散、サーバーレスを備えている。GraphQL はデータを柔軟に抽象化することで、フロントエンドとバックエンドのスムーズな連携を可能にしている。クライアントやフロントエンドの開発者は、バックエンドチームにサーバーサイドやバックエンドのコードを書くように要求することなく、必要なデータを正確に照会することができる。

## [](#indexes)Indexes

インデックス

Both Fauna and DynamoDB support indexes which can store subsets of data (i.e. projection), optionally, with a specified order and/or uniqueness constraint. However, this is where the similarities end, as Fauna indexes can perform and persist computations, combine data from multiple collections, ensure [strict serializability](https://docs.fauna.com/fauna/current/concepts/isolation_levels) for reads/writes, and more. To further elaborate, Fauna’s indexes can handle multiple sources, sort fields, match fields, and returned values. This differs from DynamoDB where indexes are constructed for a single table and can only match with one attribute, along with the ability to sort on one attribute.

Fauna と DynamoDB はどちらもインデックスをサポートしており、データのサブセット（すなわちプロジェクション）を、任意に指定された順序や一意性の制約とともに保存することができます。しかし、類似点はここまでで、Fauna インデックスは、計算の実行と永続化、複数のコレクションからのデータの結合、リード/ライトの [strict serializability](https://docs.fauna.com/fauna/current/concepts/isolation_levels)の確保などが可能です。さらに詳しく説明すると、Faunaのインデックスは、複数のソース、ソートフィールド、マッチフィールド、戻り値を扱うことができる。これは、単一のテーブルに対してインデックスが構築され、1つの属性にしかマッチせず、1つの属性でソートする機能を持つDynamoDBとは異なる。

Given its indexing flexibility and support for relational data, Fauna is a powerful tool for the evolution of applications over time.

インデックスの柔軟性とリレーショナルデータのサポートを考えると、Faunaは時間とともにアプリケーションを進化させるための強力なツールとなる。

When using indexes in DynamoDB, careful consideration and forethought is required ahead of time to avoid technical debt, unnecessary expenses, or throttling in the worst case. When strongly consistent queries are desired in an index, DynamoDB allows for a maximum of 5 Local Secondary Indexes (LSI), each of which enable sorting on an attribute specified at index creation (i.e. sort key). Developers should know that Local Secondary Indexes can only be created at the same time that a table is created, and cannot be deleted (without deleting the table) afterwards; no such quantity or creation limits exist for Fauna indexes.

DynamoDBでインデックスを使用する際には、技術的負債や不必要な出費、最悪の場合のスロットリングを避けるために、事前に慎重な検討と先見性が求められる。強い一貫性のあるクエリがインデックスに求められる場合、DynamoDBでは最大5つのローカルセカンダリインデックス（LSI）が認められており、それぞれがインデックス作成時に指定された属性（ソートキーなど）でソートできるようになっています。ローカルセカンダリインデックスは、テーブルの作成と同時にしか作成できず、作成後に（テーブルを削除せずに）削除することはできないことを、開発者は知っておく必要があります。

Should eventually consistent queries suffice, DynamoDB offers Global Secondary Indexes (GSI), which allow for querying on a different primary key (and optionally, a different sort key). As for billing, all write operations to a DynamoDB table will be multiplied and applied to relevant indexes, resulting in elevated expenses; Fauna doesn’t charge for [index entry updates](https://docs.fauna.com/fauna/current/concepts/billing#write).

一貫性のあるクエリであれば、DynamoDBにはグローバルセカンダリインデックス（GSI）が用意されており、異なる主キー（オプションで異なるソートキー）でのクエリが可能だ。課金に関しては、DynamoDBテーブルへのすべての書き込み操作は、関連するインデックスに乗算されて適用されるため、結果的に費用が高くなる。Faunaは[インデックスエントリの更新]（ https://docs.fauna.com/fauna/current/concepts/billing#write）に対しては課金しない。

Finally, while GSI throughput is separate from tables, LSI throughput is not. Users of DynamoDB must keep in mind that LSIs are multipliers of traffic, resulting in more dramatic peaks. LSI usage can cripple both Provisioned and On-Demand tables if not properly planned for by manually elevating traffic peaks or adjusting an Auto Scaling plan. This differs from Fauna, where all accommodations for traffic and throughput are not the user’s concern, rather, these factors are handled automatically behind the scenes.

最後に、GSIのスループットはテーブルとは別物ですが、LSIのスループットは別物です。DynamoDBのユーザーは、LSIがトラフィックの乗数であり、より劇的なピークをもたらすことを念頭に置く必要があります。手動でトラフィックのピークを上げたり、Auto Scalingプランを調整したりして適切な計画を立てなければ、LSIの使用はプロビジョンドテーブルとオンデマンドテーブルの両方を破綻させる可能性があります。これはFaunaとは異なり、トラフィックやスループットに対するすべての対応はユーザーの関心事ではなく、これらの要素は舞台裏で自動的に処理されます。

## [](#schema-design)Schema design

スキーマの設計

DynamoDB is _largely_ schemaless, where the few predefined details are the partition key and/or sort key, along with any Local Secondary Indexes. Like many of its NoSQL siblings, DynamoDB lacks support for relational data and is best designed with a denormalized schema in mind, improving read and write performance over traditional relational databases with numerous complex relationships. To satisfy relational needs, DynamoDB places heavy emphasis on denormalization and single-table design, where developers are responsible for maintaining some form of referential integrity among shared/related data. While DynamoDB and its best practices lend itself well to mature applications with proven scope and data needs, it does not bode well for extensive schema evolution.

DynamoDBは大部分がスキーマレスで、パーティションキーやソートキー、ローカルセカンダリインデックスなどが定義されています。多くのNoSQLと同様に、DynamoDBはリレーショナルデータのサポートを欠いており、非正規化されたスキーマを念頭に置いて設計することで、多数の複雑な関係を持つ従来のリレーショナルデータベースよりも読み取りと書き込みのパフォーマンスを向上させることができます。リレーショナルなニーズを満たすために、DynamoDBは非正規化とシングルテーブルの設計を重視しており、開発者は共有/関連データ間の参照整合性を何らかの形で維持する責任を負います。DynamoDBとそのベストプラクティスは、範囲とデータのニーズが証明された成熟したアプリケーションに適していますが、広範囲なスキーマの進化には適していません。

DynamoDB’s value is best realized when migrating from a deployed/overloaded database that already satisfies a product or project’s needs. Even with extensive planning and design ahead of time, it’s far from uncommon to completely iterate on a database model due to a variety of external factors (e.g. a business pivot); if not a complete redesign, then usually an iteration on partition keys to avoid "hot" partitions. Developers risk significant technical debt if they build an application and schema using DynamoDB without confidence in their understanding (and longevity of their understanding) of an application’s scope.

DynamoDBの価値は、製品やプロジェクトのニーズを満たすために導入されたデータベースや過負荷のかかったデータベースから移行する際に最も発揮されます。事前に十分な計画と設計を行っていても、様々な外部要因（例：ビジネスのピボット）によってデータベースモデルを完全に反復することは珍しいことではありません。開発者は、アプリケーションのスコープを理解しているかどうか（そして理解している期間が長いかどうか）の確信がないまま、DynamoDBを使用してアプリケーションとスキーマを構築すると、大きな技術的負債を負うリスクがあります。

Fauna in contrast, inherits much of the iterable relational data modeling of traditional RDBMS, while also meeting the scaling promises of NoSQL (more on this later). While denormalization is a perfectly viable approach, developers are encouraged to take advantage of Fauna’s first-class relational and referential support. In addition to document and relational data, Fauna also accommodates graph-like patterns and time-series data, along with advanced multi-tenant capabilities allowing for parent-child relationships among databases. With Fauna, schema iteration is very forgiving, unlike DynamoDB, and provides relational data capabilities which developers already know and love.

対照的にFaunaは、従来のRDBMSの反復可能なリレーショナルデータモデリングの多くを継承しつつ、NoSQLのスケーリングの約束も満たしています（これについては後述します）。非正規化は完全に実行可能なアプローチだが、開発者は、Fauna の一流のリレーショナルおよびレファレンシャルサポートを活用することが推奨される。ドキュメントやリレーショナルデータに加えて、Fauna はグラフのようなパターンや時系列データにも対応しており、データベース間の親子関係を可能にする高度なマルチテナント機能も備えている。Faunaでは、DynamoDBとは異なり、スキーマの反復は非常に寛容であり、開発者が既に知っているリレーショナルデータの機能を提供します。

Fauna also features built-in GraphQL support. A growing trend in backend engineering is GraphQL schema-first development. Fauna supports uploading GraphQL schemas which generate Fauna resources behind the scenes. Describing relations, whether they be 1:1, 1:N, etc., with Fauna’s GraphQL directives is a breeze, [as described here](https://docs.fauna.com/fauna/current/tutorials/graphql/relations).

また、FaunaはGraphQLをサポートしています。バックエンドエンジニアリングの成長トレンドは、GraphQLスキーマファーストの開発です。Faunaは、舞台裏でFaunaリソースを生成するGraphQLスキーマのアップロードをサポートしています。Fauna の GraphQL ディレクティブを使って、1:1、1:N などの関係を記述することは、[ここで説明されているように](https://docs.fauna.com/fauna/current/tutorials/graphql/relations)、簡単にできます。

## [](#transactional-model)Transactional model

トランザクショナルモデル

Support for serializable multi-item read and write transactions exists in DynamoDB with the caveat that they’re only ACID-compliant within the region they occur in. In particular, developers using multi-region deployments of DynamoDB may witness dirty reads or phantom reads among concurrent transactions in separate regions; writes affecting the same data in separate regions are resolved using "last writer wins" reconciliation, where DynamoDB makes a best effort to determine the last writer. The region limitation is fine for applications which depend on a single-region backend, however when utilizing Global Tables (a multi-region deployment of DynamoDB), successful transactions in one replica table will not provide ACID guarantees for other replica tables, due to the delay between replication/propagation of changes. Such a limitation is not uncommon among applications today, where the solution is usually to direct all transactions to a single region, or to store data based on the location of its origin (e.g. a ride-sharing app might store San Francisco trip/user data in a us-west-2 database, and nowhere else). Keep in mind however, that DynamoDB Global Tables do not allow for designating partial replication among regions (i.e. all replica tables will eventually contain the same data); instead, developers themselves must deploy individual DynamoDB instances in each desired region.

DynamoDBではシリアライズ可能なマルチアイテムのリード/ライトトランザクションがサポートされていますが、これは発生したリージョン内でのみACIDに準拠しているという注意点があります。特に、マルチリージョンのDynamoDBを使用している開発者は、別々のリージョンの同時トランザクション間でダーティリードやファントムリードが発生する可能性があります。別々のリージョンの同じデータに影響を与える書き込みは、DynamoDBが最後のライターを決定するために最善の努力をする「最後のライターが勝つ」調整を使用して解決されます。リージョンの制限は、シングルリージョンのバックエンドに依存するアプリケーションには適していますが、グローバルテーブル（DynamoDBのマルチリージョン展開）を利用する場合、1つのレプリカテーブルのトランザクションが成功しても、変更のレプリケーション/プロパゲーション間の遅延のために、他のレプリカテーブルに対してACID保証を提供することはできません。このような制限は、今日のアプリケーションでは珍しくありません。解決策としては、すべてのトランザクションを単一のリージョンに向けるか、データの発生場所に基づいてデータを保存することが一般的です（例えば、ライドシェアアプリでは、サンフランシスコのトリップ/ユーザーデータをus-west-2データベースに保存し、それ以外の場所には保存しません）。ただし、DynamoDBのグローバルテーブルでは、リージョン間の部分的なレプリケーションを指定することはできません（つまり、すべてのレプリカテーブルには最終的に同じデータが格納されることになります）。

With global distribution in mind, Fauna offers strictly serializable transactions, where the strictness provides the additional guarantee of a real-time serial order for transactions. This is a critical distinction for geo-distribution, where variance in the order of propagated transactions can impact the final state between replicas. Fauna achieves this degree of isolation and distribution with heavy inspiration from [Calvin](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol), a cutting edge approach to distributed transactions and replications.

グローバルな配信を考慮して、Faunaは厳密にシリアライズ可能なトランザクションを提供しています。この厳密さによって、トランザクションのリアルタイムなシリアルオーダーが保証されます。これは、地理的な分散のための重要な違いであり、伝播されるトランザクションの順序のばらつきがレプリカ間の最終状態に影響を与える可能性がある。Faunaは、分散型トランザクションとレプリケーションに対する最先端のアプローチである[Calvin](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol)から多大なインスピレーションを得て、この程度の分離と分散を実現しています。

## [](#consistency-models)Consistency models

コンシステンシーモデル

By default, DynamoDB uses eventually consistent reads unless specified otherwise. Strong consistency is available to some degree but only within the context of a single region (i.e. strongly consistent reads only consider writes from the region they read from). This may cause confusion when working with Global Tables, as developers are allowed to make read requests parameterized with "strong consistency" in one region, while writes from another region will eventually be propagated (often in a second or less). Additionally, strongly consistent reads can result in throttling if developers aren’t careful, as only the leader node can satisfy strongly consistent reads; DynamoDB leader nodes are also the only node responsible for writes in a partition (unlike Fauna where every node is a Query Coordinator and can perform writes, etc.), thus they are the most trafficked node and critical to the function of a partition.

デフォルトでは、DynamoDBは特に指定がない限り、最終的に一貫した読み込みを行います。強い一貫性はある程度利用可能ですが、単一のリージョンのコンテキスト内でのみ利用可能です（つまり、強い一貫性のある読み取りは、読み取ったリージョンからの書き込みのみを考慮します）。開発者は、あるリージョンで "強い一貫性 "をパラメータとした読み取り要求を行うことができますが、他のリージョンからの書き込みは、最終的に（多くの場合、1秒以内に）伝播されてしまうため、これはグローバルテーブルを扱う際に混乱を招く可能性があります。DynamoDBのリーダーノードは、パーティション内で書き込みを担当する唯一のノードでもあります（FaunaではすべてのノードがQuery Coordinatorであり、書き込みなどを行うことができます）。したがって、リーダーノードは最もトラフィックの多いノードであり、パーティションの機能にとって重要です。

Fauna offers strong forms of consistency and isolation across the board in all operations, not only within individual regions but globally. By default, indexes and read-only operations will maintain snapshot or serializable isolation (for lower latencies), however developers are free to re-introduce strict serializability should they desire it. Additionally, indexes which aren’t serialized will re-evaluate their relevant documents (providing strong consistency and isolation) when used within a transaction. Essentially, Fauna requires all writes to be strictly serializable for strong consistency across the globe, while also letting applications utilize slightly weaker forms of isolation and consistency for less-critical functionality, enabling faster reads; should the client or developer need stronger consistency in a read, they have the option to introduce strict serializability. This approach protects against inconsistent write results/transactions, which are far more consequential to a business than a stale read. Again, strong consistency is available as an option for indexes and read-only operations. For more information regarding consistency models and their tradeoffs, [read this piece written by one of the original Calvin authors](https://fauna.com/blog/demystifying-database-systems-correctness-anomalies-under-serializable-isolation).

Faunaは、個々のリージョン内だけでなくグローバルに、すべてのオペレーションにおいて強力な一貫性と分離性を提供しています。デフォルトでは、インデックスと読み取り専用のオペレーションは、スナップショットまたはシリアライズ可能なアイソレーションを維持します（低レイテンシーのため）が、開発者は必要に応じて厳密なシリアライズ機能を自由に導入することができます。さらに、直列化されていないインデックスは、トランザクション内で使用された場合、関連するドキュメントを再評価します(強力な一貫性と分離性を提供します)。基本的に、Faunaは世界中で強力な一貫性を保つために、すべての書き込みを厳密にシリアライズすることを要求する一方で、重要度の低い機能については、アプリケーションにやや弱い形式の分離と一貫性を利用させ、高速な読み取りを可能にしています。このアプローチは、一貫性のない書き込み結果や取引を防ぐもので、古い読み取りよりもはるかにビジネスに影響を与えます。繰り返しになりますが、強い一貫性は、インデックスや読み取り専用の操作のオプションとして利用できます。一貫性モデルとそのトレードオフについての詳細は、[Calvinのオリジナル著者の1人が書いたこの記事を読んでください](https://fauna.com/blog/demystifying-database-systems-correctness-anomalies-under-serializable-isolation)。

## [](#storage)Storage

ストレージ

It remains unclear exactly what storage engines are utilized under the hood of DynamoDB today. At the time of [the Dynamo whitepaper’s publishing](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf), Dynamo utilized a handful of storage engines (most notably the Berkeley Database (BDB) Transactional Data Store and MySQL) through a "pluggable persistence component". Many years have passed since the paper’s publishing however, and there’s no public documentation guaranteeing these storage engines are still in use. Compression, while an AWS [recommended practice](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-use-s3-too.html) for storing large attributes, is not natively implemented.

現在のDynamoDBでは、どのようなストレージエンジンが利用されているのか正確にはわかっていません。Dynamoのホワイトペーパーが発表された時点](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)では、Dynamoは「プラガブルな永続化コンポーネント」を介して一握りのストレージエンジン(特にBerkeley Database (BDB) Transactional Data StoreとMySQL)を利用していました。しかし、この論文が発表されてから何年も経っており、これらのストレージエンジンが現在も使用されていることを保証する公的な文書はありません。圧縮は、大きな属性を保存するためのAWSの[推奨プラクティス](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-use-s3-too.html)ではあるが、ネイティブには実装されていない。

Fauna uses an LSM tree-based storage engine that provides LZ4 compression. By default, Fauna stores the last 30 days of history for each collection (can be as long as desired or even indefinite), and temporal queries may use any point-in-time snapshot within that history. These temporal queries also offer valuable rollback capabilities for applications and their backends, a luxury which often isn’t afforded outside of a full blown database recovery. Finally, temporal storage provides simple recovery after accidental data loss and streamlined integration debugging.

Fauna は LZ4 圧縮を行う LSM ツリーベースのストレージエンジンを使用しています。デフォルトでは、Fauna は各コレクションの過去 30 日間の履歴を保存し（必要に応じて無期限にすることも可能）、一時的なクエリはその履歴内の任意のポイントインタイムスナップショットを使用できる。これらのテンポラルクエリは、アプリケーションとそのバックエンドに貴重なロールバック機能を提供します。これは、本格的なデータベースリカバリ以外では、しばしば許されない贅沢な機能です。最後に、一時的なストレージは、偶発的なデータ損失の後のシンプルなリカバリと、統合のデバッグの合理化を提供します。

## [](#security)Security

セキュリティ

Like many AWS products, DynamoDB inherits the excellent AWS Identity and Access Management (IAM) feature. With it, developers can specify coarse and granular user permissions, applicable to the entire DynamoDB API. Furthermore, developers can specify conditions which must be met before granting permissions (e.g. an IAM policy only grants access to items where the client’s UserID matches an item’s UserId). Authentication and authorization aside, DynamoDB also offers encryption at rest using 256-bit Advanced Encryption Standard (AES-256) and three decryption key types, each with varying customer control. Finally, DynamoDB’s security and compliance is [audited by several third-parties](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Compliance.html), as is standard for many AWS products.

多くのAWS製品と同様に、DynamoDBは優れたAWS Identity and Access Management (IAM)機能を継承しています。この機能により、開発者はDynamoDBのAPI全体に適用される粗いユーザー権限と細かいユーザー権限を指定することができます。さらに、開発者はパーミッションを付与する前に満たさなければならない条件を指定することができます（例えば、IAMポリシーは、クライアントのUserIDがアイテムのUserIDと一致するアイテムへのアクセスのみを付与します）。また、DynamoDBは、256ビットのAES-256（Advanced Encryption Standard）と3種類の復号化キーを用いた暗号化機能を備えており、それぞれのキーは顧客が自由にコントロールできる。最後に、DynamoDBのセキュリティとコンプライアンスは、多くのAWS製品で標準となっているように、[複数のサードパーティによる監査](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Compliance.html)を受けています。

Fauna offers varying levels of access control, however the requirement of authentication is constant; Fauna cannot be left accidentally unprotected. Developers have the freedom to define coarse role-based permissions, more specific identity-based permissions, and even finer attribute-based access control (ABAC). With reserved FQL functions, clients can easily authenticate (e.g. Login) and be provided secure access tokens for database connection. Lastly, Fauna’s multi-tenancy features provide even further protection through the natural database hierarchies that spawn themselves (i.e. authenticated users of a database cannot necessarily access a parent or sibling database). With its out-of-the-box tooling, Fauna meets the authentication and authorization requirements for a wide variety of applications, eliminating the need for equivalent custom solutions.

Faunaは様々なレベルのアクセスコントロールを提供していますが、認証の必要性は常にあります。開発者は、粗いロールベースのパーミッション、より具体的なIDベースのパーミッション、さらに細かい属性ベースのアクセスコントロール（ABAC）などを自由に定義できる。予約されたFQL関数により、クライアントは簡単に認証（例：ログイン）を行い、データベース接続のための安全なアクセストークンを提供することができます。最後に、Fauna のマルチテナンシー機能は、自然なデータベース階層によってさらに保護を強化しています（例：あるデータベースの認証ユーザーは、親や兄弟のデータベースにアクセスできない場合があります）。すぐに使えるツールを備えた Fauna は、さまざまなアプリケーションの認証・認可要件を満たし、同等のカスタムソリューションを必要としません。

## [](#fault-tolerance)Fault tolerance

フォールト・トレランス

DynamoDB relies on AWS Availability Zones (AZ), replication, long-term storage to protect against data loss or service failure. Table partitions consist of three nodes stored in separate AZs, one of which is a Leader Node capable of accepting writes and strongly-consistent reads, while the remaining two nodes simply provide additional replication storage and eventually consistent reads. Customers of DynamoDB should know that Leader Nodes are potential bottlenecks in their application, should they perform too many writes and/or strongly consistent reads to a partition. This differs from Fauna where every node’s read and write capabilities are equal, thus no single node can be a bottleneck.

DynamoDBは、AWSのアベイラビリティーゾーン（AZ）、レプリケーション、長期ストレージを利用して、データの損失やサービス障害から保護しています。テーブルパーティションは、別々のAZに格納された3つのノードで構成されています。そのうちの1つは、書き込みと強い一貫性のある読み取りを受け付けることができるリーダーノードで、残りの2つのノードは単に追加のレプリケーションストレージと最終的に一貫性のある読み取りを提供します。DynamoDBをお使いのお客様は、リーダーノードがアプリケーションのボトルネックになる可能性があることを知っておく必要があります。もし、パーティションへの書き込みや強い一貫性のある読み取りを多く実行する場合です。これは、すべてのノードの読み取り能力と書き込み能力が等しいため、単一のノードがボトルネックになることがないFaunaとは異なる。

Fauna relies on its unique transactional protocol derived from [Calvin](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol) and its multi-cloud topology to achieve fault tolerance.

Faunaは、[Calvin](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol)から派生した独自のトランザクションプロトコルと、マルチクラウドのトポロジーを利用して耐障害性を実現している。

Because Fauna is strongly consistent, all transactions are first made durable in the transaction log before being applied to data nodes, so that hardware outages don’t affect data correctness or data loss. If a node is down, the length of the transaction log is extended so that it can apply the transactions it missed when it comes back online. In Fauna, as long as you receive a commit for a transaction, you are guaranteed total safety against data loss.

Faunaは強い一貫性を持っているため、すべてのトランザクションはデータノードに適用される前にまずトランザクションログで耐久性を持たせ、ハードウェアの停止がデータの正しさやデータの損失に影響しないようにしている。ノードがダウンした場合は、トランザクションログの長さが延長され、オンラインに戻ったときに逃したトランザクションを適用できるようになっています。Faunaでは、トランザクションのコミットを受け取っている限り、データ損失に対する完全な安全性が保証されている。

Also, within Fauna’s architecture, a functioning system must contain at least three replicas. A logical replica contains numerous nodes. All nodes can simultaneously serve as a query coordinator, data replica, and log replica, with no individual node being a single point of failure. Should a node fail or perform poorly as a data replica, temporarily or permanently, Fauna will smartly redirect reads to a non-local copy until that node becomes available again. Because Fauna’s nodes are distributed across multiple cloud platforms, users are shielded from cloud provider outages as well as regional outages within a single provider.

また、Faunaのアーキテクチャでは、機能するシステムには少なくとも3つのレプリカが必要です。論理的レプリカには、多数のノードが含まれています。すべてのノードは、クエリコーディネータ、データレプリカ、ログレプリカの役割を同時に果たすことができ、個々のノードが単一障害点になることはありません。一時的または恒久的にノードが故障したり、データレプリカとしての性能が低下したりした場合、Fauna はそのノードが再び利用可能になるまで、スマートに読み取りを非ローカルコピーにリダイレクトする。Faunaのノードは複数のクラウドプラットフォームに分散されているため、ユーザーはクラウド事業者の障害だけでなく、1つの事業者内の地域的な障害からも保護される。

## [](#scalability)Scalability

スケーラビリティ

Both DynamoDB and Fauna provide abstractions over traditional server hardware specs with "serverless" pricing and consumption models. Along with these new serverless concepts, both databases aim to absorb the responsibility of scaling to customer needs, however DynamoDB still leaves significant operational work and overhead for customers. While DynamoDB is a managed service, you remain responsible for the bulk of the operational heavy lifting. If you’re using DynamoDB, you have to think upfront about volume and scale, continuously manage these parameters, and explicitly provision your capacity to meet your needs.

DynamoDBもFaunaも、従来のサーバーハードウェアのスペックを超えた抽象化を、「サーバーレス」な価格と消費モデルで提供しています。これらの新しいサーバーレスのコンセプトとともに、どちらのデータベースも顧客のニーズに合わせてスケーリングの責任を負うことを目指していますが、DynamoDBはまだ顧客に大きな運用作業とオーバーヘッドを残しています。DynamoDBはマネージドサービスですが、運用の大部分はお客様が責任を持って行います。DynamoDBを利用する場合は、ボリュームとスケールについて前もって考え、これらのパラメータを継続的に管理し、ニーズに合わせて容量を明示的にプロビジョニングする必要があります。

Understanding both the consumption model and data distribution concepts is particularly critical when using DynamoDB, as even though there are scaling features to better accommodate traffic, they all expose windows where throttling or failure is possible; in particular, developers should be familiar with DynamoDB’s Read Capacity Units (RCUs), Write Capacity Units (WCUs), capacity modes, table partitioning behavior, partition limits, and "hot" partitions.

特にDynamoDBを使用する場合は、消費モデルとデータ分散の両方のコンセプトを理解することが重要です。トラフィックをより良く収容するためのスケーリング機能があっても、スロットルや障害が発生する可能性のあるウィンドウが公開されているからです。特に開発者は、DynamoDBのRead Capacity Units（RCU）、Write Capacity Units（WCU）、キャパシティモード、テーブルパーティショニングの動作、パーティション制限、「ホット」パーティションについて熟知しておく必要があります。

In contrast, Fauna is built to auto-scale without any input from customers. You are never responsible for provisioning capacity, or tweaking parameters to achieve a desired level of throughput. It works on a utility model, much like your electrical outlet. Plug-in and go, never worry about running out of resources in peak times. Fauna achieves this by maintaining several consistent, full replicas of customer data. A replica consists of several geographically-aware nodes, each with a partition of the full dataset in a single local environment. As mentioned earlier, all nodes share the same set of capabilities (query coordinator, data replica, and log replica), each able to perform reads and writes. Fauna scales its services behind the scenes by adding more full-copy replicas or adding more nodes to a single replica, which requires no additional downtime, manual configuration, or changes to drivers. As a customer of Fauna, you can assume infinite capacity and march on.

一方、Faunaはお客様の意見を一切聞かずにオートスケールするように作られています。お客様は、容量をプロビジョニングしたり、希望するレベルのスループットを達成するためにパラメータを調整したりする必要はありません。Faunaは、コンセントのようなユーティリティモデルで動作します。プラグインするだけで、ピーク時にリソースが不足する心配はありません。Faunaは、お客様のデータの一貫した完全なレプリカを複数保持することでこれを実現しています。レプリカは、地理的に認識された複数のノードで構成され、それぞれが単一のローカル環境でフルデータセットのパーティションを持っています。前述のように、すべてのノードは同じ機能（クエリコーディネータ、データレプリカ、ログレプリカ）を共有し、それぞれが読み取りと書き込みを行うことができる。Faunaは、フルコピーのレプリカを増やしたり、1つのレプリカにノードを追加したりすることで、舞台裏でサービスを拡張します。これには、追加のダウンタイム、手動による設定、ドライバーの変更は必要ありません。Faunaのお客様は、無限のキャパシティを想定して進めていくことができます。

Fauna is multi-region by default (in fact, it’s global), with uncompromising consistency and isolation, as was elaborated on earlier. Provisioning throughput or capacity is not a concern nor a reality for customers, where the only information of relevance is the pricing/consumption model. Specifically, Fauna’s consumption model primarily focuses on read and write ops, which are almost identical to DynamoDB’s RRUs and WRUs, where they’re simply a metric for representing on-demand usage.

Faunaはデフォルトでマルチリージョン（実際にはグローバル）であり、先に詳しく説明したように、妥協のない一貫性と分離性を備えています。スループットやキャパシティを提供することは、顧客にとっては関心事でもなければ現実でもない。そこでは、価格設定や消費モデルだけが関連する情報となる。具体的には、Faunaの消費モデルは主に読み取りと書き込みの操作に焦点を当てており、これはDynamoDBのRRUとWRUとほぼ同じで、単にオンデマンドの使用量を表すための指標となっている。

## [](#operations)Operations

操作

While the responsibilities of traditional database operations have been abstracted away, DynamoDB customers still have a handful of DynamoDB-specific responsibilities, with the two major items being (1) designing an optimal partition key (including read/write sharding if needed), and (2) specifying one of two capacity modes along with their parameters. Developers can implement and tweak DynamoDB deployments through the AWS CLI, AWS Management Console, AWS SDK, NoSQL Workbench, or directly through the DynamoDB low-level API.

従来のデータベース操作の責任が抽象化されたとはいえ、DynamoDBの顧客には、DynamoDB特有の責任がいくつかあります。主な項目は、(1)最適なパーティションキーの設計（必要に応じてリード/ライトシャーディングを含む）、(2)2つのキャパシティモードのうち1つをそのパラメータとともに指定すること、の2つです。開発者は、AWS CLI、AWS Management Console、AWS SDK、NoSQL Workbench、またはDynamoDBのローレベルAPIを直接使用して、DynamoDBのデプロイメントを実装し、調整することができます。

For the responsibilities which don’t fall under the customer’s jurisdiction, many fundamental operations (e.g. partition splitting) are performed by DynamoDB’s internally developed tool, Auto Admin. Additionally, DynamoDB is known to rely on several AWS services to achieve certain functionality (e.g. Auto Scaling uses CloudWatch, SNS, etc.), though the exact scope of this is unknown.

お客様の管轄ではない責任については、多くの基本的な操作（パーティション分割など）は、DynamoDBの社内開発ツールであるAuto Adminが行います。さらに、DynamoDBは特定の機能を実現するために、いくつかのAWSサービスに依存していることが知られている（例：Auto ScalingはCloudWatch、SNSなどを使用）が、その正確な範囲は不明だ。

Further elaborating on Auto Admin, the tool is akin to an automated database administrator (DBA), responsible for managing DynamoDB’s Partition Metadata System, Partition Repair, Table Provisioning, and more. Although it isn’t consistently documented, it appears that Auto Admin shares some partition splitting and provisioning functionality with DynamoDB’s Adaptive Capacity, where the most obvious example of this is Adaptive Capacity’s ability to isolate frequently accessed items.

さらにAuto Adminについて詳しく説明すると、このツールは自動化されたデータベース管理者（DBA）のようなもので、DynamoDBのPartition Metadata System、Partition Repair、Table Provisioningなどの管理を担当します。一貫したドキュメントはありませんが、Auto AdminはDynamoDBのAdaptive Capacityといくつかのパーティション分割やプロビジョニング機能を共有しているようです。

Much of Fauna’s infrastructure management relies on the same Calvin-inspired protocol and consistency mechanisms provided to customers, with the addition of some internal process scheduling. Changes to a deployment are performed within the safety of a single transaction, where the final state is once again evaluated by Fauna, before being applied. The internal transactions used for scaling Fauna deployments allow for easy-to-reason-with and seamless migration of data between nodes.

Faunaのインフラ管理の多くは、顧客に提供されているCalvinにインスパイアされたプロトコルと一貫性のメカニズムに依存しており、内部プロセスのスケジューリングが追加されています。配置の変更は、単一のトランザクションの安全性の中で実行され、最終的な状態は適用される前に Fauna によって再度評価されます。Fauna のデプロイメントをスケーリングするために使用される内部トランザクションにより、ノード間でのデータの移行が簡単かつシームレスに行われます。

In conclusion, it’s worth highlighting that developer operations occur seamlessly with zero downtime and user maintenance; developers are free to focus on what matters most, building an excellent application.

結論として、開発者のオペレーションは、ダウンタイムやユーザーのメンテナンスを一切必要とせず、シームレスに行われることを強調しておきたい。開発者は、優れたアプリケーションの構築という最も重要なことに自由に集中できるのだ。

## [](#jepsen-tests)Jepsen tests

Jepsenテスト

Jepsen tests along with their associated tools and writing, are widely respected among database engineers. The results of a Jepsen test aren’t a simple pass-fail, but are more akin to diagnoses and postmortems; specifically, comparing a database’s performance to its value propositions and elaborating on promises that aren’t sufficiently met. Although DynamoDB lacks an official Jepsen test, it’s one of the most popular NoSQL databases in use today and as an AWS product, is likely to be heavily audited, tested, and scrutinized.

Jepsenテストとそれに関連するツールや文章は、データベースエンジニアの間で広く評価されています。Jepsenテストの結果は、単純な合格・不合格ではなく、診断や検死に近いものです。具体的には、データベースのパフォーマンスをその価値提案と比較し、十分に満たされていない約束について詳しく説明します。DynamoDBには公式なJepsenテストはありませんが、現在最も利用されているNoSQLデータベースの1つであり、AWSの製品であることから、監査、テスト、精査が行われる可能性が高いと考えられています。

Fauna’s goal with Jepsen has been to conduct an exhaustive investigation to identify and fix any errors in the implementation, integrate the resulting tests into continuous integration, and to have a trusted third party verify both public consistency claims and the effectiveness of the core architecture. [The current Fauna Jepsen report](https://fauna.com/blog/faunadbs-official-jepsen-results), which covers versions 2.5.4 and 2.6.0 and represents three months of detailed work, clearly shows Fauna’s commitment to providing users with a seamlessly-correct datastore.

FaunaがJepsenで目指したのは、実装上のエラーを特定して修正するための徹底的な調査を行い、その結果得られたテストを継続的なインテグレーションに統合し、信頼できる第三者に公的な一貫性の主張とコアアーキテクチャの有効性の両方を検証してもらうことだった。バージョン 2.5.4 と 2.6.0 を対象とし、3 ヶ月に及ぶ詳細な作業を行った [現行の Fauna Jepsen レポート](https://fauna.com/blog/faunadbs-official-jepsen-results)は、シームレスに正しいデータストアをユーザーに提供するという Fauna の姿勢を明確に示している。

> "Fauna is based on peer-reviewed research into transactional systems, combining Calvin’s cross-shard transactional protocol with Raft’s consensus system for individual shards. We believe Fauna’s approach is fundamentally sound…Calvin-based systems like Fauna could play an important future role in the distributed database landscape."

> 「Faunaは、Calvinのクロスシャードトランザクションプロトコルと、Raftの個別シャード用コンセンサスシステムを組み合わせた、トランザクションシステムに関する査読付きの研究に基づいています。Faunaのアプローチは基本的に健全であると信じています。FaunaのようなCalvinベースのシステムは、分散データベースの世界で将来重要な役割を果たす可能性があります。" [jepsen.io

— [jepsen.io](http://jepsen.io/analyses/faunadb-2.5.4)

## [](#summary)Summary

概要

DynamoDB aims to provide a fully managed, multi-region, and multi-master, serverless database for internet-scale applications. However, each one of these value propositions has a caveat. While traditional database resources are managed for customers, provisioning and/or designing around DynamoDB’s abstract capacity units is still required. Multi-region and multi-master deployment is available, but at the cost of strong consistency and isolation. Serverless scaling is achievable, but only if developers design an optimal partition key and strategize throughput escalation.

DynamoDBは、インターネットスケールのアプリケーションのために、フルマネージド、マルチリージョン、マルチマスターのサーバーレスデータベースを提供することを目指しています。しかし、これらの価値提案の一つ一つには注意点があります。従来のデータベースリソースは顧客のために管理されていますが、DynamoDBの抽象的な容量単位を中心としたプロビジョニングおよび/または設計は依然として必要です。マルチリージョン、マルチマスターの導入が可能ですが、強力な一貫性と分離性が犠牲になります。サーバーレス・スケーリングは可能ですが、開発者が最適なパーティション・キーを設計し、スループットの拡大を戦略的に行う場合に限られます。

DynamoDB schemas often have little room to grow given their lack of support for relational data (an almost essential function for evolving applications); the heavy-emphasis on single-table design to support relational-like access patterns, leaves customers with the responsibility of maintaining the correctness of denormalized data. Finally, customers are required to build their applications with numerous inconsistencies, conflicts, and race-conditions in mind, or risk producing odd and unpredictable errors caused by DynamoDB.

DynamoDBのスキーマは、リレーショナルデータ（進化するアプリケーションにはほぼ必須の機能）をサポートしていないため、成長の余地がほとんどありません。また、リレーショナルなアクセスパターンをサポートするためにシングルテーブル設計が重視されているため、非正規化されたデータの正しさを維持する責任はお客様にあります。最後に、お客様は多くの矛盾、衝突、競合条件を念頭に置いてアプリケーションを構築する必要があり、そうしないとDynamoDBに起因する奇妙で予測不可能なエラーが発生するリスクがあります。

On the other hand, Fauna promises a highly flexible, zero-maintenance, globally-distributed datastore as an API; with first-class support for GraphQL, and a data model that lets you work with both documents and relations, Fauna simplifies your initial development as well as ongoing evolution of your application; there is no need to write application logic to handle odd bugs, errors, and race-conditions found in many databases with poor consistency and isolation. Transactional by design, Fauna ensures that you’re not locked into limitations when using transactions — your data is always consistent, and there are no constraints placed on you to shard your data in a specific way, or limit the number of keys you use. With Fauna you never have to worry about typical database tasks such as provisioning, sharding, correctness, replication, etc. Consequently, developers find Fauna more flexible to use, and are completely free from backend heavy lifting that is required when using DynamoDB.

一方、Fauna は、非常に柔軟で、メンテナンス不要のグローバルな分散型データストアを API として提供します。GraphQL の一流のサポートと、ドキュメントとリレーションの両方を扱うことができるデータモデルにより、Fauna は、アプリケーションの初期開発と継続的な進化を簡素化します。データは常に一貫しており、特定の方法でデータをシャードしたり、使用するキーの数を制限するような制約はありません。Faunaでは、プロビジョニング、シャーディング、正確性、レプリケーションなどの典型的なデータベースタスクを心配する必要はありません。その結果、開発者はFaunaをより柔軟に使用することができ、DynamoDBを使用する際に必要となるバックエンドのヘビーリフティングから完全に解放されます。

## [](#appendix)Appendix

別表

**Deep Dive into DynamoDB Scalability Architecture**

**DynamoDBのスケーラビリティ・アーキテクチャへの深入り**。

Behind the scenes DynamoDB distributes data and throughput for a table among partitions, each outfitted with 10GB of storage. Data distribution to partitions relies on a table’s partition key, and throughput is specified with Read Capacity Units (RCUs) and Write Capacity Units (WCUs); where RCUs and WCUs specify the upper limits of a partition’s read and write capacity per second (a single RCU allows for either 2 eventually consistent reads or 1 strongly consistent read). Note that while RCUs and WCUs are specified at the table-level, in actuality, DynamoDB does not directly limit throughput for tables. Instead, these limits apply to a table’s underlying partitions, where RCUs and WCUs are evenly distributed among all. This even distribution of throughput used to be a common concern, as it often led to over-provisioning to meet the needs of "hot" partitions (partitions with disproportionate traffic compared to their peers).

DynamoDBでは、テーブルのデータとスループットを、それぞれ10GBのストレージを持つパーティションに分配しています。パーティションへのデータ分配はテーブルのパーティションキーに依存し、スループットはRead Capacity Units (RCU)とWrite Capacity Units (WCU)で指定されます。RCUとWCUはパーティションの1秒あたりの読み取りと書き込みの上限を指定します（1つのRCUで2つの最終的に一貫した読み取り、または1つの強く一貫した読み取りが可能です）。なお、RCUとWCUはテーブルレベルで指定されていますが、実際にはDynamoDBがテーブルのスループットを直接制限することはありません。その代わり、これらの制限はテーブルの基礎となるパーティションに適用され、RCUとWCUはすべてのパーティションに均等に分配されます。スループットの均等な分配は、「ホット」なパーティション（他のパーティションと比較して不均衡なトラフィックを持つパーティション）のニーズを満たすために過剰にプロビジョニングされることが多いため、かつては一般的な懸念事項でした。

DynamoDB has both Burst Capacity and Adaptive Capacity to address hot partition traffic. Burst Capacity utilizes unused throughput from the past 5 minutes to meet sudden spikes in traffic, and Adaptive Capacity borrows throughput from partition peers for sustained increases in traffic. DynamoDB has also extended Adaptive Capacity’s feature set with the ability to isolate frequently accessed items in their own partitions. Note that partitions have a hard limit of 3000 RCUs and 1000 WCUs, meaning a frequently accessed item which is isolated in its own partition cannot satisfy an access pattern that exceeds the partition’s hard limits. This is unlikely to be an issue for most applications, however should it arise, Global Tables or a similar implementation can resolve it (strongly consistent reads will still be limited however). Despite DynamoDB releasing several features and improvements targeting hot partitions, [they still have a negative impact](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html) on a table’s performance, though this consequence is not as significant as it once was. Essentially, the scaling performance of DynamoDB revolves around the [design quality of a partition key](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html).

DynamoDBには、ホットパーティションのトラフィックに対応するために、Burst CapacityとAdaptive Capacityがあります。バーストキャパシティは、過去5分間の未使用のスループットを利用して急激なトラフィックの増加に対応し、アダプティブキャパシティは、パーティションのピアからスループットを借りて持続的なトラフィックの増加に対応します。また、DynamoDBはAdaptive Capacityの機能を拡張し、アクセス頻度の高いアイテムを独自のパーティションに分離する機能を備えています。パーティションには、3000RCUと1000WCUのハードリミットがあります。つまり、頻繁にアクセスされるアイテムを独自のパーティションに隔離すると、そのパーティションのハードリミットを超えるアクセスパターンを満たすことができません。ほとんどのアプリケーションでは問題にならないと思いますが、万が一問題が発生した場合は、グローバルテーブルや同様の実装で解決することができます（ただし、強い一貫性のある読み取りは制限されます）。DynamoDBがホットパーティションをターゲットにしたいくつかの機能や改善をリリースしたにもかかわらず、[ホットパーティションはテーブルのパフォーマンスにマイナスの影響](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html)を与えていますが、この影響は以前ほど重要ではありません。基本的に、DynamoDBのスケーリング性能は、[パーティションキーの設計品質](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)を中心に展開されます。

To make throughput scaling on tables easier, DynamoDB offers On-Demand Mode and Auto Scaling (under the Provisioned Mode). On-Demand Mode is DynamoDB’s more recent and abstract take on hands-free scaling of throughput, where traffic is well accommodated for, up to double the table’s previously recorded peak. DynamoDB may require 30 minutes before adjusting to a new peak, therefore developers should be wary of traffic which surpasses twice their previous peak, as throttling can occur. One final note regarding On-Demand Mode is the distinct pricing model, where sustained traffic [could result in costs up to 6.94x that of provisioned capacity](https://www.serverless.com/blog/dynamodb-on-demand-serverless). Despite being DynamoDB’s best solution for rapid and automatic scaling, the significantly higher cost suggests On-Demand Mode is best suited only for applications which have unpredictable or unknown workloads. Auto Scaling, which is only available under the Provisioned Mode, is DynamoDB’s first iteration on convenient throughput scaling. It raises or lowers read and write capacity based on sustained usage, leaving spikes in traffic to be handled by a partition’s Burst and Adaptive Capacity features.

テーブルのスループットのスケーリングを容易にするために、DynamoDBにはオンデマンドモードとオートスケーリング（プロビジョンドモードの下）が用意されている。On-Demand Modeは、DynamoDBが最近開発した抽象的なハンズフリースケーリングで、テーブルの以前に記録されたピークの2倍まで、トラフィックが十分に対応できるようになっています。DynamoDBは新しいピークに適応するまでに30分かかることがあるため、開発者は前回のピークの2倍を超えるトラフィックにはスロットリングが発生するので注意が必要だ。オンデマンドモードの最後の注意点は、持続的なトラフィックに対しては「プロビジョニングされた容量の最大6.94倍のコストが発生する可能性がある」(https://www.serverless.com/blog/dynamodb-on-demand-serverless)という料金モデルの違いです。オンデマンドモードは、DynamoDBの高速かつ自動でのスケーリングに最適なソリューションであるにもかかわらず、コストが大幅に高くなることから、予測不可能なワークロードや未知のワークロードを持つアプリケーションにのみ適していると言えます。プロビジョンドモードでのみ利用可能なオートスケーリングは、DynamoDBが初めて採用した便利なスループットスケーリングだ。持続的な使用量に基づいて読み取りと書き込みの容量を増減させ、トラフィックの急増にはパーティションのバースト機能やアダプティブ・キャパシティ機能で対応する。

Additionally, it’s the customer’s responsibility to specify upper and lower bounds to throughput, along with a target utilization rate to specify a consumption ratio which should consistently be met (e.g. 70% of throughput should be used as often as possible). While Auto Scaling and Provisioned Mode are more cost-efficient than DynamoDB’s On-Demand Mode, they don’t handle unforeseen spikes in traffic (which surpass the table’s current overall throughput capacity) as well as On-Demand Mode does. This is due to the watermarks which trigger Auto Scaling’s functionality requiring sustained increases or decreases in traffic. In summary, developers have many parameters and provisioning ops they must keep in mind while using DynamoDB, despite the layers of abstractions (e.g. RCUs and WCUs).

さらに、スループットの上限と下限を指定し、常に満たすべき消費比率を指定する目標利用率もお客様の責任で設定します（例：スループットの70％をできるだけ頻繁に使用する）。オートスケーリングとプロビジョンドモードは、DynamoDBのオンデマンドモードよりもコスト効率が高いが、オンデマンドモードのように（テーブルの現在の全体的なスループット容量を超えた）予期せぬトラフィックの急増には対応できない。これは、Auto Scalingの機能のトリガーとなるウォーターマークが、継続的なトラフィックの増減を必要とするためです。要約すると、開発者はDynamoDBを使用する際に、抽象化された層（RCUやWCUなど）にもかかわらず、多くのパラメータとプロビジョニング作業を念頭に置かなければなりません。

Regarding geo-distribution, DynamoDB offers Global Tables: multi-region deployments of replica tables. Each replica table is capable of accepting both reads and writes, with writes eventually replicating to sibling replica tables (usually under a second). Conflicts in Global Tables are resolved with a "last writer wins" strategy, where all replica tables agree on the latest write and update accordingly. Customers ought to keep in mind that replication under Global Tables will increase throughput traffic among the replica tables, with the primary concern being WCUs as they’re the lower throughput limit (1000 WCUs vs 3000 RCUs).

地域分散に関しては、DynamoDBはグローバルテーブルを提供しています。これは、レプリカテーブルを複数の地域に展開するものです。各レプリカテーブルは、読み取りと書き込みの両方を受け付けることができ、書き込みは最終的に兄弟のレプリカテーブルに複製されます（通常は1秒以内に複製されます）。グローバルテーブルのコンフリクトは、すべてのレプリカテーブルが最新の書き込みに同意し、それに応じて更新する「最後の書き込みが勝つ」戦略で解決されます。グローバルテーブルでのレプリケーションは、レプリカテーブル間のスループットトラフィックを増加させることを念頭に置く必要があります。

