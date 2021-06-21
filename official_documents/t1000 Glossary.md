Glossary | Fauna Documentation
https://docs.fauna.com/fauna/current/glossary

# Glossary

 用語解説

ACID

ACID consistency

ACID一貫性

The guarantee that every transaction includes _atomicity_, _consistency_, _isolation_, and _durability_.

すべてのトランザクションが、_原子性、_一貫性、_分離性、_耐久性を含むことを保証すること。

Atomicity

原子性

The guarantee that each transaction is treated as a single block of work, which either succeeds or fails in its entirety.

各トランザクションが、全体として成功するか失敗するかの単一の作業ブロックとして扱われることを保証すること。

Class

クラス

A _class_ is the **deprecated synonym** of collection.

class_はcollectionの**deprecated同義語**です。

Cluster

クラスター

A _cluster_ refers to the group of nodes that work together to provide the services of Fauna. Nodes belong to replicas, and each replica contains a full copy of all data within a Fauna cluster.

クラスタとは、Faunaのサービスを提供するために一緒に働くノードのグループのこと。ノードはレプリカに所属し、各レプリカにはFaunaクラスタ内のすべてのデータのフルコピーが含まれる。

Collection

コレクション

A _collection_ is a group of data categorized within a database. Data within a collection usually has a common structure, but this is not required. If you’re familiar with traditional databases, you can think of a collection as a table without a structured schema.

コレクションとは、データベースの中で分類されたデータのグループのこと。コレクション内のデータは通常、共通の構造を持っていますが、これは必須ではありません。従来のデータベースに慣れている方は、コレクションを構造化されたスキーマのないテーブルと考えることができます。

Consistency

一貫性

_Consistency_ is the promise that any data written to the database must be valid according to all defined rules, such as unique indexes.

_consistency_とは、データベースに書き込まれたデータが、ユニークインデックスなどの定義されたルールすべてに沿って有効でなければならないという約束のことです。

Cursor

カーソル

A _cursor_ marks a position within a paginated set. When you use the `Paginate` function, and the total number of results exceeds the current page size, an `after` cursor marks the position for the next page of results, and a `before` cursor marks the end of the previous page of results. You use the `after` or `before` cursor in subsequent queries to request additional results.

カーソルはページ付けされたセットの中の位置を示すものである。Paginate`関数を使ったときに、結果の総数が現在のページサイズを超えると、`after`カーソルは次のページの結果の位置をマークし、`before`カーソルは前のページの結果の終わりをマークします。後続のクエリで `after` または `before` カーソルを使用して追加の結果を要求します。

Data node

データノード

A node in a Fauna replica which is responsible for persisting and retrieving data.

Fauna レプリカの中のノードで、データの永続化と取得を行います。

Database

データベース

_Databases_ are containers for data with access control. In Fauna’s multi-tenant system, databases can be hierarchical, with multiple child databases nested within parent databases, each with their own permissions and security settings.

データベースは、アクセス制御が可能なデータのコンテナです。Fauna のマルチテナントシステムでは、データベースを階層化することができ、親データベースの中に複数の子データベースを入れ子にして、それぞれに権限とセキュリティ設定を持たせることができます。

Directive

ディレクティブ

A _directive_ is a [GraphQL](#GraphQL) feature that provides dynamic control over the execution of a query.

[GraphQL](#GraphQL)の機能のひとつで、クエリの実行を動的に制御するためのもの。

Document

ドキュメント

_Documents_ are single, changeable records within a Fauna database. Because they are changeable, they can have more than one version over time as they are updated by an application. If you are familiar with other database systems, you can think of a document as a row, or record.

ドキュメントとは、Faunaデータベース内の変更可能な単一のレコードのこと。ドキュメントは変更可能なので、アプリケーションによって更新されると、時間の経過とともに複数のバージョンを持つことができます。他のデータベースシステムに慣れている方は、ドキュメントを行（レコード）と考えることができます。

Document ID

ドキュメントID

The unique numeric identifier for a document within a collection or database. See [Ref](#Ref) or [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref).

コレクションやデータベース内のドキュメントを識別するための、一意の数値による識別子。Ref](#Ref)または[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を参照。

Durability

耐久性

Durability guarantees that once a transaction has been committed, it is permanent. If a system crash, power failure, or other unexpected failure occurs, all transactions with committed data are saved.

耐久性とは、一度コミットされたトランザクションが永続的であることを保証するものです。システムクラッシュや停電などの予期せぬ障害が発生しても、コミットされたデータを含むすべてのトランザクションが保存される。

Extract, Transform, Load (ETL)

ETL (Extract, Transform, Load)

ETL is a three-step procedure that is typically used when blending data from multiple sources, such as when copying data from one or more databases into a single database. ETL can define how to extract the data from the sources, how to transform the data into the necessary format, and how to load the data into the destination.

ETLは、複数のソースからのデータをブレンドするとき、例えば1つのデータベースに1つのデータベースからデータをコピーするときなどに、通常使用される3つのステップの手順です。ETLでは、ソースからデータを抽出する方法、データを必要な形式に変換する方法、データを宛先にロードする方法を定義することができます。

Fauna Query Language (FQL)

Fauna クエリ言語 (FQL)

Fauna offers a fully functioning _transactional query language_ called Fauna Query Language (FQL). You can interact with it via the [official drivers](https://docs.fauna.com/fauna/current/drivers/) or the [Fauna Shell](https://docs.fauna.com/fauna/current/start/). The native language drivers provide the ability to write application queries in the programming language of your choice.

Fauna は、Fauna Query Language (FQL) と呼ばれる、完全に機能する _transactional query language_ を提供します。公式ドライバ](https://docs.fauna.com/fauna/current/drivers/)または [Fauna シェル](https://docs.fauna.com/fauna/current/start/)で操作できます。ネイティブ言語のドライバーは、アプリケーションのクエリを好みのプログラミング言語で書く機能を提供しています。

Globally, horizontally scalable

グローバルな水平方向のスケーラビリティ

Fauna is _globally, horizontally scalable_ because it allows each Fauna node to perform the same role as any other Fauna node, with nodes that can be distributed around the world. With each node able to serve any role, there is no single point of failure.

Fauna は _globally, horizontally scalable_ であり、各 Fauna ノードは他の Fauna ノードと同じ役割を果たすことができ、ノードは世界各地に分散していることができる。各ノードがあらゆる役割を果たすことができるため、単一障害点が存在しません。

Granular identity management, authentication, and access control

粒状のアイデンティティ管理、認証、アクセスコントロール

_Granular identity management, authentication, and access control_ built on top of an enterprise-class, multi-tenant foundation, provides a secure platform for companies of all sizes. Fauna has both administrative and application-level identity and security to provide a layer of separation between applications and administration. This provides the application developers more time to focus on building their applications without having to spend time securing the overall datastore.

エンタープライズクラスのマルチテナント基盤の上に構築された、粒状のアイデンティティ管理、認証、アクセスコントロールにより、あらゆる規模の企業に安全なプラットフォームを提供します。Faunaは、管理者レベルとアプリケーションレベルの両方のアイデンティティとセキュリティを備えており、アプリケーションと管理者を分離する層を提供します。これにより、アプリケーション開発者は、データストア全体のセキュリティ確保に時間を費やすことなく、アプリケーションの構築に集中することができます。

GraphQL

GraphQL

_GraphQL_ is an open source data query and manipulation language that provides declarative schema definitions and a composable query syntax. For more information, see [https://graphql.org/](https://graphql.org/).

_GraphQL_は、オープンソースのデータ検索・操作言語で、宣言的なスキーマ定義と合成可能なクエリ構文を提供します。詳細については、[https://graphql.org/](https://graphql.org/)を参照。

Identity

アイデンティティ

An _identity_ typically represents a "user", but could also be used to identify any service, system, or process that needs to run queries with specific privileges. Any document within Fauna can be used as an identity.

アイデンティティは通常「ユーザ」を表しますが、特定の権限でクエリを実行する必要のあるサービス、システム、プロセスを識別するためにも使用できます。Fauna 内のすべてのドキュメントをアイデンティティとして使用できます。

A query’s associated identity, if available, can be retrieved by calling the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) function. There is no associated identity for queries using [anonymous-based access](https://docs.fauna.com/fauna/current/security/).

クエリに関連する ID がある場合は、[`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) 関数を呼び出して取得できます。anonymous-based access](https://docs.fauna.com/fauna/current/security/) を使用したクエリには、関連付けられた ID はありません。

IdP

IdP

Identity provider

ID プロバイダ

An identity provider is a system that creates, maintains, and manages identity information, and provides authentication and authorization services. For more information, see [Auth0](https://www.auth0.com/).

ID プロバイダとは、ID 情報を作成、維持、管理し、認証・認可サービスを提供するシステムです。詳細については、[Auth0](https://www.auth0.com/)を参照。

Index

インデックス

An _index_ is a database entity that facilitates data lookups. Indexes are used to quickly locate data without having to search every individual document (or row of data) in the database.

インデックスとは、データの検索を容易にするデータベースのエンティティです。インデックスは、データベース内の個々のドキュメント（またはデータの行）を検索することなく、データをすばやく見つけるために使用されます。

Instance

インスタンス

An _instance_ is the **deprecated synonym** of document.

インスタンスは、ドキュメントの**廃止された同義語**です。

Instance ID

インスタンスID

An _instance ID_ is the **deprecated synonym** of a [Document ID](#Document-id).

インスタンスID_は、[ドキュメントID](#Document-id)の**非推奨の同義語**です。

JSON

JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format. A human-readable, plain-text format for expressing structured data. For more information, see [http://www.json.org/](http://www.json.org/).

JSON（JavaScript Object Notation）は、軽量のデータ交換フォーマットです。構造化されたデータを表現するための、人間が読めるプレーンテキスト形式です。詳細は[http://www.json.org/](http://www.json.org/)を参照。

JWT

JWT

JSON Web Token

JSON Web Token (ジェイソンウェブトークン)

A JSON Web Token, or _JWT_, is a digitally-signed object that is typically used to communicate verified and trusted information about a user, to essentially indicate that a specific user has been authenticated. For more information, see [https://jwt.io/introduction/](https://jwt.io/introduction/).

JSON Web Token (_JWT_) は、デジタル署名されたオブジェクトで、通常、ユーザーに関する検証済みの信頼できる情報を伝達するために使用され、基本的に特定のユーザーが認証されていることを示します。詳細については、[https://jwt.io/introduction/](https://jwt.io/introduction/)を参照してください。

Sequences

シーケンス

_Sequences_ are arrays and pages that can be mapped and filtered.

シーケンスとは、マッピングやフィルタリングが可能な配列やページのことです。

Log node

ログノード

A node in a Fauna replica which is responsible for coordinating and storing transactions.

Fauna レプリカの中で、トランザクションの調整と保存を担当するノード。

Multitenancy

マルチテナンシー

_Multi-tenancy_ is the ability to have a single Fauna cluster provide individual databases to multiple tenants (e.g., companies, applications, programmers, and/or users) in isolation. Each tenant has complete administrative control, a private security model, and programmatic creativity over their own database(s), free from interference from users of other databases in the cluster.

マルチテナンシーとは、単一の Fauna クラスタが複数のテナント（企業、アプリケーション、プログラマー、ユーザーなど）に個別にデータベースを提供すること。各テナントは、クラスター内の他のデータベースのユーザからの干渉を受けずに、自分のデータベースに対して完全な管理制御、プライベートなセキュリティモデル、プログラムの創造性を持つ。

Mutation

変異

A mutation refers to a query that changes data when using [GraphQL](#GraphQL).

[GraphQL](#GraphQL)を使用する際に、データを変更するクエリのこと。

Node

GraphQL](#GraphQL)を使用する際に、データを変更するクエリのこと。

A _node_ is a computer (or virtual machine) with a unique network address that is running the Fauna database software.

ノード」とは、Faunaデータベースソフトウェアを実行している固有のネットワークアドレスを持つコンピュータ（または仮想マシン）のこと。

Partition

パーティション

A group of nodes containing exactly one node from each replica.

各レプリカからちょうど 1 つのノードを含むノードのグループ。

Ref

リファレンス

Reference

リファレンス

Every document in the database has an identifier called a _reference_, or _ref_ for short. A document’s _ref_ encodes its collection along with a unique id, and is therefore unique to that document within the scope of the database in which it is stored.

データベース内のすべてのドキュメントは、_reference_（略して_ref_）と呼ばれる識別子を持っています。ドキュメントの_ref_には、そのコレクションとユニークなIDがエンコードされており、ドキュメントが保存されているデータベースの範囲内では、そのドキュメントに固有のものとなります。

Replica

A named group of one or more, co-located nodes containing a complete copy of the data.

データの完全なコピーを含む、1つまたは複数の同居するノードの名前付きグループ。

QOS

Quality-of-service management

Quality-of-Service（サービス品質）の管理。

Fauna’s _quality-of-service management_ means that, in a saturated cluster where resources are reaching critical capacity, each tenant receives scheduling proportional to their configured priority. For example, in a saturated cluster with two tenants of priority 500 and 250, the first tenant gets 2/3 of the resources and the other gets 1/3 of the resources. This prevents a single greedy user from significantly impacting other users.

Fauna の _quality-of-service 管理は、リソースが臨界容量に達している飽和状態のクラスターで、各テナントが設定された優先度に比例してスケジューリングを受けることを意味します。例えば、優先度500と250の2つのテナントがいる飽和状態のクラスターでは、最初のテナントが2/3のリソースを取得し、もう1つのテナントが1/3のリソースを取得します。これにより、欲張りな一人のユーザーが他のユーザーに大きな影響を与えることを防ぎます。

The `priority` option is deprecated as of release 2.10.0. You should avoid specifying `priority`. In some future Fauna release, `priority` will be removed. See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) for more details.

`priority`オプションは、リリース2.10.0で非推奨となりました。`priority` の指定は避けるべきです。将来の Fauna リリースでは、`priority` は削除される予定です。詳細は [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) を参照してください。

Query

問い合わせ

A _query_ is the way to ask a database for, or to change, data. Fauna’s native [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) provides a robust set of commands to help you form any kind of query you require. You can also use [GraphQL](#GraphQL) for most kinds of querying too.

クエリーとは、データベースにデータを要求したり、データを変更したりする方法のことです。Fauna のネイティブ言語である [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) には、あらゆる種類のクエリを作成するのに役立つ強力なコマンドセットが用意されています。また、[GraphQL](#GraphQL)を使用しても、ほとんどの種類の問い合わせを行うことができます。

Set

セット

A _set_ is a sorted group of immutable data from a collection. Object data is mapped onto a set, and as documents are created, modified, and deleted, the set is updated. Sets provide a relational view of the data within your collection, such as all the X that are Y.

セットとは、コレクションに含まれる不変的なデータをソートしたものです。オブジェクトデータはセットにマッピングされ、ドキュメントの作成、変更、削除が行われると、セットが更新される。セットは、YであるすべてのXというように、コレクション内のデータのリレーショナルビューを提供します。

Temporal documents

一時的なドキュメント

In Fauna, documents are _temporal_, meaning each creation, modification, or deletion event is assigned a transaction timestamp and inserted into the document history. Approaching documents temporally allows event sourcing, reactive programming, and various audit and stream-oriented data architectures that help the system "just work". Unlike older NoSQL systems, no additional configuration is needed to get your database playing nicely with your incoming and outgoing data.

Faunaでは、ドキュメントは時間的に管理されている。つまり、ドキュメントの作成、変更、削除の各イベントには、トランザクションのタイムスタンプが割り当てられ、ドキュメントの履歴に挿入される。ドキュメントを時間的にアプローチすることで、イベントソーシング、リアクティブプログラミング、様々な監査やストリーム指向のデータアーキテクチャが可能になり、システムが「ただ動く」ようになります。旧来のNoSQLシステムとは異なり、入出庫データとデータベースをうまく連携させるための追加設定は必要ありません。

Transaction log

トランザクションログ

To prepare for unexpected failures, all transaction data received by a log node is written to non-volatile storage for recovery of a replica. The transaction data is written in the order received to optimize for fast writes.

予期せぬ障害に備えて、ログノードが受信したすべてのトランザクションデータは、レプリカのリカバリのために不揮発性ストレージに書き込まれます。トランザクションデータは受信した順に書き込まれ、高速書き込みに最適化されます。

