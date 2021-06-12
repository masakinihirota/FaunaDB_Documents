# Glossary

ACID

## ACID consistency

一貫性

The guarantee that every transaction includes _atomicity_, _consistency_, _isolation_, and _durability_.
すべてのトランザクションが含まれていることを保証アトミック、 一貫性、分離、および耐久性を。

## Atomicity

The guarantee that each transaction is treated as a single block of work,
which either succeeds or fails in its entirety.

各トランザクションが単一の作業ブロックとして扱われ、全体が成功するか失敗するかの保証。

## Class

A _class_ is the **deprecated synonym** of collection.
非推奨

## Cluster

A _cluster_ refers to the group of nodes that work together to provide the services of Fauna. Nodes belong to replicas, and each replica contains a full copy of all data within a Fauna cluster.

クラスタは、Fauna のサービスを提供するために一緒に働くノードのグループを指します。
ノードはレプリカに属し、各レプリカには Fauna クラスター内の
すべてのデータの完全なコピーが含まれています。

## Collection

A _collection_ is a group of data categorized within a database. Data within a collection usually has a common structure, but this is not required. If you’re familiar with traditional databases, you can think of a collection as a table without a structured schema.

コレクションは、データベース内で分類されたデータのグループです。コレクション内のデータは通常、共通の構造を持っていますが、これは必須ではありません。従来のデータベースに慣れている場合は、コレクションを構造化スキーマのないテーブルと考えることができます。

## Consistency

_Consistency_ is the promise that any data written to the database must be valid according to all defined rules, such as unique indexes.

整合性とは、データベースに書き込まれるデータが、一意のインデックスなど、定義されたすべてのルールに従って有効である必要があるという約束です。

## Cursor

A _cursor_ marks a position within a paginated set. When you use the `Paginate` function, and the total number of results exceeds the current page size, an `after` cursor marks the position for the next page of results, and a `before` cursor marks the end of the previous page of results. You use the `after` or `before` cursor in subsequent queries to request additional results.

カーソルマークページ分割セット内の位置。この Paginate 関数を使用し、 結果の合計数が現在のページ サイズを超える場合、after カーソルは結果の次のページの位置を示し、カーソルは結果 before の前のページの終わりを示します。追加の結果を要求するには、後続のクエリで after または before カーソルを使用します。

## Data node

A node in a Fauna replica which is responsible for persisting and retrieving data.

データの永続化と取得を担当する Fauna レプリカ内のノード。

## Database

_Databases_ are containers for data with access control. In Fauna’s multi-tenant system, databases can be hierarchical, with multiple child databases nested within parent databases, each with their own permissions and security settings.

データベースは、アクセス制御付きのデータのコンテナです。Fauna のマルチテナント システムでは、データベースを階層化でき、複数の子データベースが親データベース内にネストされ、それぞれに独自の権限とセキュリティ設定があります。

## Directive

A _directive_ is a [GraphQL](#GraphQL) feature that provides dynamic control over the execution of a query.

ディレクティブがある GraphQL のクエリの実行の上に動的制御を提供する機能。

## Document

_Documents_ are single, changeable records within a Fauna database. Because they are changeable, they can have more than one version over time as they are updated by an application. If you are familiar with other database systems, you can think of a document as a row, or record.

ドキュメントは、Fauna データベース内の単一の変更可能なレコードです。それらは変更可能であるため、アプリケーションによって更新されると、時間の経過とともに複数のバージョンを持つことができます。他のデータベース システムに精通している場合は、ドキュメントを行またはレコードと考えることができます。

## Document ID

The unique numeric identifier for a document within a collection or database. See [Ref](#Ref) or [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref).

コレクションまたはデータベース内のドキュメントの一意の数値識別子。Ref または Reference を参照してください。

## Durability

耐久性

Durability guarantees that once a transaction has been committed, it is permanent. If a system crash, power failure, or other unexpected failure occurs, all transactions with committed data are saved.

耐久性トランザクションがコミットされると、永続的であることを保証します。システム クラッシュ、電源障害、またはその他の予期しない障害が発生した場合、コミットされたデータを含むすべてのトランザクションが保存されます。

## Extract, Transform, Load (ETL)

ETL is a three-step procedure that is typically used when blending data from multiple sources, such as when copying data from one or more databases into a single database. ETL can define how to extract the data from the sources, how to transform the data into the necessary format, and how to load the data into the destination.

ETL は通常、1 つ以上のデータベースから単一のデータベースにデータをコピーするときなど、複数のソースからのデータをブレンドするときに使用される 3 段階の手順です。ETL は、ソースからデータを抽出する方法、データを必要な形式に変換する方法、およびデータを宛先にロードする方法を定義できます。

## Fauna Query Language (FQL)

Fauna offers a fully functioning _transactional query language_ called Fauna Query Language (FQL). You can interact with it via the [official drivers](https://docs.fauna.com/fauna/current/drivers/) or the [Fauna Shell](https://docs.fauna.com/fauna/current/start/). The native language drivers provide the ability to write application queries in the programming language of your choice.

Fauna は、 Fauna クエリ言語 (FQL) と呼ばれる完全に機能するトランザクション クエリ言語を提供します。公式ドライバーまたは Fauna Shell を介して操作でき ます。ネイティブ言語ドライバーは、選択したプログラミング言語でアプリケーション クエリを作成する機能を提供します。

## Globally, horizontally scalable

Fauna is _globally, horizontally scalable_ because it allows each Fauna node to perform the same role as any other Fauna node, with nodes that can be distributed around the world. With each node able to serve any role, there is no single point of failure.

Fauna は、各 Fauna ノードが他の Fauna ノードと同じ役割を果たし、ノードが世界中に分散できるため、グローバルに水平方向にスケーラブルです。各ノードが任意の役割を果たすことができるため、単一障害点はありません。

## Granular identity management, authentication, and access control

_Granular identity management, authentication, and access control_ built on top of an enterprise-class, multi-tenant foundation, provides a secure platform for companies of all sizes. Fauna has both administrative and application-level identity and security to provide a layer of separation between applications and administration. This provides the application developers more time to focus on building their applications without having to spend time securing the overall datastore.

エンタープライズ クラスのマルチテナント基盤の上に構築されたきめ細かな ID 管理、認証、およびアクセス制御は、あらゆる規模の企業に安全なプラットフォームを提供します。Fauna は、管理レベルとアプリケーション レベルの ID とセキュリティの両方を備えており、アプリケーションと管理を分離するレイヤーを提供します。これにより、アプリケーション開発者は、データストア全体を保護するのに時間を費やすことなく、アプリケーションの構築に集中する時間を増やすことができます。

## GraphQL

_GraphQL_ is an open source data query and manipulation language that provides declarative schema definitions and a composable query syntax. For more information, see [https://graphql.org/](https://graphql.org/).

GraphQL は、宣言型スキーマ定義と構成可能なクエリ構文を提供するオープン ソースのデータ クエリおよび操作言語です。詳細については、https://graphql.org/ を参照してください。

## Identity

An _identity_ typically represents a "user", but could also be used to identify any service, system, or process that needs to run queries with specific privileges. Any document within Fauna can be used as an identity.

A query’s associated identity, if available, can be retrieved by calling the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) function. There is no associated identity for queries using [anonymous-based access](https://docs.fauna.com/fauna/current/security/).

アイデンティティは、一般的に「ユーザー」を表し、だけでなく、任意のサービス、システム、または特定の権限を持つクエリを実行するために必要なプロセスを識別するために使用することができます。Fauna 内の任意のドキュメントを ID として使用できます。

クエリに関連付けられた ID があれば、それを呼び出すことで取得できます。 Identity 関数。匿名ベースのアクセスを使用するクエリに関連付けられた ID はありません。

## IdP

Identity provider
アイデンティティープロバイダー

An identity provider is a system that creates, maintains, and manages identity information, and provides authentication and authorization services. For more information, see [Auth0](https://www.auth0.com/).

ID プロバイダーは、ID 情報を作成、維持、および管理し、認証および許可サービスを提供するシステムです。詳細については、Auth0 を参照してください。

## Index

An _index_ is a database entity that facilitates data lookups. Indexes are used to quickly locate data without having to search every individual document (or row of data) in the database.

インデックスは、データ検索を容易にデータベース・エンティティです。インデックスを使用すると、データベース内の個々のドキュメント (またはデータの行) をすべて検索しなくても、データをすばやく見つけることができます。

## Instance

An _instance_ is the **deprecated synonym** of document.

インスタンスがあり、非推奨の同義語文書の。

## Instance ID

An _instance ID_ is the **deprecated synonym** of a [Document ID](#Document-id).

インスタンス ID は、ある非推奨の同義語のドキュメント ID。

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format. A human-readable, plain-text format for expressing structured data. For more information, see [http://www.json.org/](http://www.json.org/).

JSON(JavaScript Object Notation) は軽量のデータ交換フォーマットです。構造化データを表現するための人が読めるプレーンテキスト形式。詳細については、http://www.json.org/ を参照してください。

## JWT JSON Web Token

A JSON Web Token, or _JWT_, is a digitally-signed object that is typically used to communicate verified and trusted information about a user, to essentially indicate that a specific user has been authenticated. For more information, see [https://jwt.io/introduction/](https://jwt.io/introduction/).

JSON Web Token または JWT は、特定のユーザーが認証されたことを本質的に示すために、ユーザーに関する検証済みの信頼できる情報を伝達するために通常使用されるデジタル署名されたオブジェクトです。詳細については、https://jwt.io/introduction/ を参照して ください。

## Sequences

_Sequences_ are arrays and pages that can be mapped and filtered.

シーケンスは、マッピングおよびフィルタリングできる配列とページです。

## Log node

A node in a Fauna replica which is responsible for coordinating and storing transactions.

トランザクションの調整と保存を担当する Fauna レプリカ内のノード。

## Multitenancy

_Multi-tenancy_ is the ability to have a single Fauna cluster provide individual databases to multiple tenants (e.g., companies, applications, programmers, and/or users) in isolation. Each tenant has complete administrative control, a private security model, and programmatic creativity over their own database(s), free from interference from users of other databases in the cluster.

マルチテナンシーは、単一の Fauna クラスタが個別のデータベースを複数のテナント (たとえば、企業、アプリケーション、プログラマー、および/またはユーザー) に分離して提供する機能です。各テナントは、クラスタ内の他のデータベースのユーザーからの干渉を受けることなく、独自のデータベースに対する完全な管理制御、プライベート セキュリティ モデル、およびプログラムによる創造性を備えています。

## Mutation

A mutation refers to a query that changes data when using [GraphQL](#GraphQL).

ミューテーションとは、GraphQL の使用時にデータを変更するクエリを指します。

## Node

A _node_ is a computer (or virtual machine) with a unique network address that is running the Fauna database software.

ノードは、Fauna データベースソフトウェアを実行している固有のネットワークアドレスとコンピュータ（または仮想マシン）です。

## Partition

A group of nodes containing exactly one node from each replica.

各レプリカのノードを 1 つだけ含むノードのグループ。

## Ref Reference

Every document in the database has an identifier called a _reference_, or _ref_ for short. A document’s _ref_ encodes its collection along with a unique id, and is therefore unique to that document within the scope of the database in which it is stored.

データベース内のすべてのドキュメントには、reference、または略して ref と呼ばれる識別子があります。ドキュメントの ref は、そのコレクションを一意の ID とともにエンコードするため、格納されているデータベースのスコープ内でそのドキュメントに対して一意です。

## Replica

A named group of one or more, co-located nodes containing a complete copy of the data.

## QOS

Quality-of-service management

Fauna’s _quality-of-service management_ means that, in a saturated cluster where resources are reaching critical capacity, each tenant receives scheduling proportional to their configured priority. For example, in a saturated cluster with two tenants of priority 500 and 250, the first tenant gets 2/3 of the resources and the other gets 1/3 of the resources. This prevents a single greedy user from significantly impacting other users.

Fauna のサービス品質管理とは、リソースが限界容量に達している飽和クラスターでは、各テナントが、構成された優先度に比例したスケジュールを受け取ることを意味します。たとえば、優先度 500 と 250 の 2 つのテナントを持つ飽和クラスターでは、最初のテナントがリソースの 2/3 を取得し、もう 1 つはリソースの 1/3 を取得します。これにより、1 人の貪欲なユーザーが他のユーザーに大きな影響を与えることを防ぎます。

The `priority` option is deprecated as of release 2.10.0. You should avoid specifying `priority`. In some future Fauna release, `priority` will be removed. See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) for more details.

この priority オプションは、リリース 2.10.0 で非推奨になりました。の指定は避けるべき priority です。今後の Fauna のリリースで priority は、削除される予定です。詳細については、非推奨を参照 してください。

## Query

A _query_ is the way to ask a database for, or to change, data. Fauna’s native [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) provides a robust set of commands to help you form any kind of query you require. You can also use [GraphQL](#GraphQL) for most kinds of querying too.

クエリは、データをするためのデータベースを依頼する、または変更する方法です。Fauna のネイティブ Fauna クエリ言語は、必要なあらゆる種類のクエリを作成するのに役立つ一連の堅牢なコマンドを提供します。ほとんどの種類のクエリにも GraphQL を使用できます。

## Set

A _set_ is a sorted group of immutable data from a collection. Object data is mapped onto a set, and as documents are created, modified, and deleted, the set is updated. Sets provide a relational view of the data within your collection, such as all the X that are Y.

セットには、コレクションから不変のデータのソートグループです。オブジェクト データはセットにマップされ、ドキュメントが作成、変更、および削除されると、セットが更新されます。セットは、Y であるすべての X など、コレクション内のデータのリレーショナル ビューを提供します。

## Temporal documents

In Fauna, documents are _temporal_, meaning each creation, modification, or deletion event is assigned a transaction timestamp and inserted into the document history. Approaching documents temporally allows event sourcing, reactive programming, and various audit and stream-oriented data architectures that help the system "just work". Unlike older NoSQL systems, no additional configuration is needed to get your database playing nicely with your incoming and outgoing data.

Fauna では、ドキュメントは一時的です。つまり、作成、変更、または削除の各イベントにはトランザクション タイムスタンプが割り当てられ、ドキュメント履歴に挿入されます。一時的にドキュメントにアプローチすることで、イベント ソーシング、リアクティブ プログラミング、さまざまな監査およびストリーム指向のデータ アーキテクチャが可能になり、システムが「ただ動く」のに役立ちます。古い NoSQL システムとは異なり、データベースを送受信データとうまく連携させるために追加の構成は必要ありません。

## Transaction log

To prepare for unexpected failures, all transaction data received by a log node is written to non-volatile storage for recovery of a replica. The transaction data is written in the order received to optimize for fast writes.

予期しない障害に備えるために、ログ ノードによって受信されたすべてのトランザクション データは、レプリカの回復のために不揮発性ストレージに書き込まれます。トランザクション データは、高速書き込みを最適化するために、受信した順序で書き込まれます。

Was this article helpful?
