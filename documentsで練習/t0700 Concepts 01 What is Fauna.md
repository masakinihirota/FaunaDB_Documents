What is Fauna? | Fauna Documentation
https://docs.fauna.com/fauna/current/concepts/

# What is Fauna?

 Faunaとは何ですか？

Fauna is the data API for client-serverless applications. A web-native GraphQL interface, with support for custom business logic and integration with the serverless ecosystem, enables developers to simplify code and ship faster. The underlying globally-distributed storage and compute fabric is fast, consistent, and reliable, with a modern security infrastructure. Fauna is easy to get started with and offers a 100 percent serverless experience with nothing to manage.

Faunaは、クライアント・サーバーレスアプリケーションのためのデータAPIです。ウェブネイティブなGraphQLインターフェースを採用し、カスタムビジネスロジックのサポートやサーバーレスエコシステムとの統合により、開発者はコードを簡素化して迅速に出荷することができます。基盤となるグローバルに分散されたストレージとコンピュートファブリックは、高速で一貫性があり、信頼性が高く、最新のセキュリティインフラストラクチャを備えています。Faunaは簡単に使い始めることができ、管理するものが何もない100％サーバーレスの体験を提供します。

Fauna transforms the traditional DBMS into a Data API that gives you all of the capabilities of an old-guard database, without sacrificing flexibility, scale, and performance. Fauna core functions are inspired by [Calvin](http://cs.yale.edu/homes/thomson/publications/calvin-sigmod12.pdf): a clock-less, strictly-serializable transactional protocol for multi-region environments.

Fauna は、従来の DBMS を Data API に変換し、柔軟性、スケール、パフォーマンスを犠牲にすることなく、旧来のデータベースの機能をすべて提供します。Faunaのコア機能は、[Calvin](http://cs.yale.edu/homes/thomson/publications/calvin-sigmod12.pdf)にインスパイアされています。マルチリージョン環境のための、クロックレスで厳密にシリアル化可能なトランザクションプロトコルです。

Highlights include:

主な機能は以下のとおりです。

-   Multiple models to manipulate your data (relational, document, and graph).
-   Multiple APIs for data access, including native GraphQL and a DSL-like functional query language, for more productive development.
-   Strong data consistency with isolation levels ranging from snapshot to strict serializability.
-   Built-in auth and key-based security, on by default, that prevents inadvertent data leaks.
-   Built-in multi-tenancy with dynamic QoS.
-   Change data capture, with data temporality, that allows you to track the evolution of your data.

---

- データを操作するための複数のモデル（リレーショナル、ドキュメント、グラフ）。
- データアクセスのための複数のAPI（ネイティブのGraphQLやDSLライクな機能的クエリ言語を含む）により、生産性の高い開発が可能。
- スナップショットから厳密なシリアライズまでの分離レベルによる強力なデータの一貫性。
- 組み込みの認証およびキーベースのセキュリティ（デフォルトでオン）により、不注意によるデータの漏洩を防止。
- 動的なQoSを備えた内蔵のマルチテナンシー
- データの進化を追跡できる、データの一時性を備えた変更データのキャプチャ。

Fauna operates as a multi-cloud database service that spans AWS and GCP, across global regions for added reliability and redundancy.

Faunaは、AWSとGCPにまたがるマルチクラウドデータベースサービスとして動作し、信頼性と冗長性を高めるためにグローバルなリージョンにまたがっています。

See our [Quick start with Fauna](https://docs.fauna.com/fauna/current/start/) guide to get started.

クイックスタート・ウィズ・ファウナ](https://docs.fauna.com/fauna/current/start/)のガイドをご覧ください。

## [](#what-does-the-modern-database-look-like)What does the modern database look like?

現代のデータベースはどんな形をしているのか？

The answer to the above question differs depending on who you ask:

上記の質問に対する答えは、誰に聞くかによって異なります。

![Operations](https://docs.fauna.com/fauna/current/concepts//_images/icon-operations.svg)  
**Developers**

![運用](https://docs.fauna.com/fauna/current/concepts//_images/icon-operations.svg)  
**開発者

-   Simple to get started with capabilities that modern applications need.

- 現代のアプリケーションが必要とする機能を簡単に始められる。

-   Freedom from operating infrastructure such as servers and containers.

- サーバーやコンテナなどの運用インフラからの解放。

-   Keeps data safe and secure without additional middleware.

- 追加のミドルウェアなしで、データを安全に保つことができる。

-   Low-latency access, free from cold starts.

- コールドスタートから解放された低レイテンシーのアクセス。

![App Architecture](https://docs.fauna.com/fauna/current/concepts//_images/icon-app_architecture.svg)  
**App Architects**

![App Architecture](https://docs.fauna.com/fauna/current/concepts//_images/icon-app_architecture.svg)  
**アプリ・アーキテクチャー

-   Guarantees data correctness at all times, across all cloud regions.

- すべてのクラウド・リージョンにおいて、常にデータの正確性を保証します。

-   Models a variety of business data.

- 様々なビジネスデータをモデル化することができます。

-   Scales dynamically to global workloads.

- グローバルなワークロードにダイナミックに対応します。

![Business](https://docs.fauna.com/fauna/current/concepts//_images/icon-business.svg)  
**Businesses**

![ビジネス](https://docs.fauna.com/fauna/current/concepts//_images/icon-business.svg)  
**ビジネスのお客様**

-   Usage-based pricing and adoption path.

- 使用量に応じた価格設定と導入経路。

-   Reliable and cloud-agnostic.

- 信頼性が高く、クラウドに依存しない。

Fauna checks all these boxes and offers more.

Fauna はこれらの条件をすべて満たし、さらに多くの機能を提供します。

## [](#how-does-fauna-address-these-requirements)How does Fauna address these requirements?

Fauna はこれらの要件をどのように満たしているのでしょうか。

Fauna is the world’s first Calvin-inspired database system. The [Calvin paper](http://cs.yale.edu/homes/thomson/publications/calvin-sigmod12.pdf), was published at Yale University in 2012 by Dr. Daniel Abadi and his team of researchers, Thomson, Ren, Diamond et. al.

Faunaは、世界初のCalvinにインスパイアされたデータベースシステムである。Calvin論文](http://cs.yale.edu/homes/thomson/publications/calvin-sigmod12.pdf)は、ダニエル・アバディ博士と彼の研究チーム、トムソン、レン、ダイヤモンドらによって2012年にイェール大学で発表されました。

Calvin is a practical transaction scheduling and data replication layer that uses a deterministic ordering guarantee to significantly reduce the normally-prohibitive contention costs associated with distributed transactions. Unlike previous deterministic database system prototypes, Calvin supports disk-based storage, scales near-linearly on a cluster of commodity machines, and has no single point of failure. By replicating transaction inputs rather than effects, Calvin is also able to support multiple consistency levels—including Paxos-based strong consistency across geographically-distant replicas—at no cost to transactional throughput.

Calvinは、決定論的順序保証を用いて、分散トランザクションに関連する通常は禁止されている競合コストを大幅に削減する、実用的なトランザクションスケジューリングおよびデータレプリケーションレイヤーです。これまでの決定論的なデータベースシステムのプロトタイプとは異なり、Calvinはディスクベースのストレージをサポートし、コモディティマシンのクラスタ上でほぼ直線的にスケールアップし、単一障害点がありません。また，トランザクションの効果ではなく入力を複製することで，トランザクションのスループットを犠牲にすることなく，地理的に離れたレプリカ間でのPaxosベースの強力な一貫性など，複数の一貫性レベルをサポートすることができます．

Unlike other distributed transaction protocols like Spanner and Percolator, Calvin, and Fauna, do not rely on physical clock synchronization to maintain consistency. Fauna also places no constraints on replica distance, and is practical to deploy at global internet latencies.

SpannerやPercolatorのような他の分散型トランザクションプロトコルとは異なり、CalvinとFaunaは一貫性を維持するために物理的なクロック同期に依存していない。また、Fauna はレプリカの距離に制約がなく、グローバルなインターネットのレイテンシでも実用的に展開できます。

What does this mean for a database? Calvin offers the best approach for architecting a distributed transaction engine that operates in highly distributed and unreliable environments such as the Cloud. Fauna delivers strong consistency, at scale, across regions, without suffering from issues related to clocks or distance, and does so without requiring specialized hardware, software, or networks to operate your database.

これは、データベースにとってどのような意味を持つのでしょうか。Calvin は、クラウドのような高度に分散した信頼性の低い環境で動作する分散型トランザクションエンジンを構築するための最適なアプローチを提供します。Faunaは、時計や距離に関する問題に悩まされることなく、地域を超えた大規模で強力な一貫性を実現し、データベースを運用するための特殊なハードウェア、ソフトウェア、ネットワークを必要としません。

Calvin’s clockless transaction ordering provides several technical benefits that translate to unique benefits in different use cases:

Calvinのクロックレス・トランザクション・オーダリングは、さまざまなユースケースで独自のメリットをもたらすいくつかの技術的利点を提供します。

Calvin capability

Calvinの機能

Benefit

メリット

Use Case Examples

ユースケース例

Strictly serializable, multi-region transactions.

厳密にシリアル化されたマルチリージョンのトランザクション。

Provides a consistent, unified, and global view of all data in real time.

すべてのデータをリアルタイムで見ることができる、一貫性のある統一されたグローバルなビューを提供。

Global backend for operational SaaS or mobile apps.

運用型SaaSやモバイルアプリのためのグローバルバックエンド。

Single round consensus for writes.

書き込み時のシングルラウンドコンセンサス。

Lower write latency that is not impacted by multiple round trips across different regions.

異なる地域での複数回のラウンドトリップの影響を受けず、書き込みのレイテンシーを低減します。

Transactional mobile and payment apps where a snappy user experience matters.

迅速なユーザーエクスペリエンスが求められるトランザクション型のモバイルアプリや決済アプリ。

Write serializability independent of the number of keys.

鍵の数に依存しない書き込みのシリアライズ機能。

Unlike some of our competitors, Fauna does not have any restrictions on the number of keys that can be part of a transaction. There is no need to artificially split transactions into multiple batches of keys.

競合他社とは異なり、Fauna はトランザクションに含まれるキーの数に制限を設けていません。トランザクションを複数のキーのバッチに人為的に分割する必要はありません。

Games or business applications where a transaction can impact multiple keys.

1つのトランザクションが複数のキーに影響を与える可能性があるゲームやビジネスアプリケーション。

Serializable reads can be serviced by any replica.

シリアル化可能な読み取りは、どのレプリカでも処理できます。

Reads can be serviced by any region. Results in real-time visibility that provides an accurate view to the end user.

読み取りはどのリージョンでも処理できます。エンドユーザーに正確なビューを提供するリアルタイムの可視性の結果。

Location-based mobile apps that require low-latency, consistent reads, irrespective of geography.

地域に関係なく、低レイテンシーで一貫性のある読み取りを必要とするロケーションベースのモバイルアプリケーション。

No contention between serializable writes and reads.

直列化可能な書き込みと読み込みの間で競合が発生しない。

Leads to lower latency writes and a consistent view of data across the globe.

低レイテンシーの書き込みにつながり、世界中で一貫したデータの表示が可能になります。

Real-time business apps that feature consolidation of data across the globe.

世界中のデータを統合することを特徴とするリアルタイムのビジネスアプリケーション。

### [](#architectural-innovations-at-every-layer)Architectural innovations at every layer

あらゆる層でのアーキテクチャの革新

While Calvin is at the heart of Fauna’s transaction protocol, there are innovations in other important components of the database as well.

Faunaのトランザクションプロトコルの中心はCalvinですが、データベースの他の重要なコンポーネントにも革新的な技術が導入されています。

#### [](#data-model)Data model

データモデル

Fauna implements a semi-structured, schema-free, object-relational data model, a strict superset of the relational, document, object-oriented, and graph paradigms. The data model allows enforcing constraints, creating indexes, and joining across multiple document entities. Objects within Fauna can be visualized as the following hierarchy.

Fauna は、半構造化されたスキーマフリーのオブジェクトリレーショナルデータモデルを実装している。これは、リレーショナル、ドキュメント、オブジェクト指向、およびグラフパラダイムの厳密な上位集合である。このデータモデルでは、制約の適用、インデックスの作成、複数のドキュメントエンティティの結合などが可能である。Faunaのオブジェクトは、以下のような階層構造で表示される。

-   Records are inserted as semi-structured documents, which can include recursively-nested objects and arrays, as well as scalar types.

- レコードは半構造化されたドキュメントとして挿入され、スカラ型だけでなく、再帰的にネストされたオブジェクトや配列を含むことができる。

-   Documents are grouped into collections, which are similar to tables in relational databases.

- ドキュメントは、リレーショナルデータベースのテーブルに似た、コレクションにグループ化されます。

-   Collections are further grouped into databases. Like file system directories, databases can recursively contain other databases.

- コレクションはさらにデータベースに分類されます。ファイルシステムのディレクトリのように、データベースは再帰的に他のデータベースを含むことができます。

Derived relations are built with indexes. An index is a transformation of a set of input instances into one or more result sets composed of terms and values. Indexes are expressed as partially-applied queries and can transform, cover, order their inputs, and enforce constraints.

派生した関係は、インデックスを使って構築されます。インデックスとは、入力インスタンスのセットを、用語と値で構成される1つまたは複数の結果セットに変換するものである。インデックスは部分的に適用されるクエリとして表現され、入力の変換、カバー、順序付け、制約の適用が可能です。

#### [](#query-interface)Query interface

クエリインターフェイス

Fauna offers polyglot APIs that includes native GraphQL capabilities, as well as a proprietary, functional query language (called [FQL](https://docs.fauna.com/fauna/current/api/fql/)) for advanced tasks. Interaction with the database is mediated by drivers that publish embedded DSLs for popular application languages. Developers using Fauna write application-native code in a familiar style, within a transaction context. A single request can encapsulate a transaction that spans multiple records.

Fauna は、ネイティブの GraphQL 機能を含むポリグロット API と、高度なタスクのための独自の関数型クエリ言語（[FQL](https://docs.fauna.com/fauna/current/api/fql/)と呼ばれる）を提供する。データベースとのやりとりは、一般的なアプリケーション言語用の組み込みDSLを公開するドライバによって行われる。Fauna を使用する開発者は、トランザクションコンテキストの中で、アプリケーションネイティブなコードを使い慣れたスタイルで書くことができる。1つのリクエストで、複数のレコードにまたがるトランザクションをカプセル化することができる。

#### [](#clustering)Clustering

Clustering

The use of Calvin also allows Fauna to implement a master-less architecture. With replicas in a cluster, geographically distributed across many locations, Fauna provides Active-Active transactions that allow applications to scale horizontally across the globe without a single line of code.

Calvin を使用することで、Fauna はマスターレスのアーキテクチャを実装することもできます。地理的に多くの場所に分散されたクラスタ内のレプリカにより、FaunaはActive-Activeトランザクションを提供し、アプリケーションはコードを一行も書かずに世界中で水平方向に拡張することができる。

#### [](#security)Security

セキュリティ

Most databases implement schema-level user authentication only, since they were designed for small numbers of internal business users. But modern applications are exposed to millions of untrusted and potentially malicious actors, and must implement identity management, authentication, and row-level security, at a minimum.

ほとんどのデータベースでは、スキーマレベルのユーザー認証しか実装されていません。これは、少数の社内ビジネスユーザーのために設計されたからです。しかし、現代のアプリケーションは、何百万人もの信頼されていない、潜在的に悪意のあるアクターにさらされており、アイデンティティ管理、認証、行レベルのセキュリティを最低限実装する必要があります。

Fauna internalizes these concerns and provides both administrative and application-level identity and security, either through API servers, or directly to untrusted clients like mobile, browser, and embedded applications.

Faunaはこれらの問題を解決し、管理レベルとアプリケーションレベルの両方のアイデンティティとセキュリティを提供します。

## [](#next-steps)Next steps

次のステップ

Now that you know something about what Fauna is about, you should sign up for a free account and take Fauna for a spin! See the [Quick start with Fauna](https://docs.fauna.com/fauna/current/start/) for details.

Fauna がどのようなものかわかったところで、無料アカウントにサインアップして、Fauna を試してみましょう! 詳しくは[Quick start with Fauna](https://docs.fauna.com/fauna/current/start/)をご覧ください。

There is much more to learn about Fauna:

Faunaについては、まだまだ学ぶことがあります。

-   [Tutorials](https://docs.fauna.com/fauna/current/tutorials/)
-   [Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)
-   [GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/)
-   [Drivers](https://docs.fauna.com/fauna/current/drivers/)

---

- [チュートリアル](https://docs.fauna.com/fauna/current/tutorials/)
- [Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)
- [GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/)
- [ドライバ](https://docs.fauna.com/fauna/current/drivers/)

