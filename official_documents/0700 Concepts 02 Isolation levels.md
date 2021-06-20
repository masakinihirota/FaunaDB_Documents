Isolation levels | Fauna Documentation
https://docs.fauna.com/fauna/current/concepts/isolation_levels

# Isolation levels

 隔離レベル

_Isolation levels_ refers to how a database maintains the integrity of transactions. When a transaction is being processed, the isolation level that is in effect determines whether, or how, the transaction might be affected by other concurrent database operations.

隔離レベルとは、データベースがトランザクションの整合性を維持する方法のことです。トランザクションが処理されているとき、そのトランザクションが他の並行したデータベース操作によって影響を受けるかどうか、あるいはどのように影響を受けるかは、有効な分離レベルによって決まります。

Fauna supports three isolation levels:

Fauna は 3 つの分離レベルをサポートしています。

-   [Serializability](#serializability)
-   [Strict Serializability](#strict-serializability)
-   [Snapshot](#snapshot)

---

- [シリアライザブル](#serializability)
- [厳密な連続性](#strict-serializability)
- [スナップショット](#snapshot)

The following table summarizes Fauna’s consistency levels under different conditions:

次の表は、さまざまな条件でのFaunaの一貫性レベルをまとめたものです。

|Index Reads|Read‑Write|Read‑Only|
|--|--|--|
|None (documents only)|Strict Serializability|Serializable \*|
|Only serialized or unique indexes|Strict Serializability|Serializable \*|
|Non-serialized indexes|Snapshot Isolation|Snapshot Isolation|

---

|Index Reads|Read-Write|Read-Only|
|--|--|--|
|None (ドキュメントのみ)|Strict Serializability|Serializable \*|
|シリアル化された、またはユニークなインデックスのみ|Strict Serializability|Serializable \*|
|シリアル化されていないインデックス|Snapshot Isolation|Snapshot Isolation|

\* Read-only transactions are, by default, serializable in Fauna for non-index reads. Reads can opt-in to strict serializability by using the `linearized` endpoint, or by including a no-op write in the transaction.

\* Faunaでは、インデックス以外の読み取りについては、デフォルトで読み取り専用のトランザクションがシリアライズされます。読み取りは、`linearized`エンドポイントを使用するか、トランザクションにno-op書き込みを含めることで、厳密なシリアライザビリティを選択することができます。

## [](#serializability)Serializability

シリアライザブル

Serializability guarantees that the execution of a set of transactions on multiple items is equivalent to some serial-ordered execution of those transactions. Serializability has been regarded as the gold standard of isolation. A system that guarantees serializability is able to process transactions concurrently, but guarantees that the final result is equivalent to having processed the transactions serially, one after the other with no concurrency. This is an incredibly powerful guarantee that has withstood the test of time, enabling robust and bug-free applications to be built on top of it.

シリアライザビリティとは、複数のアイテムに対する一連のトランザクションの実行が、それらのトランザクションを直列に並べた実行と同等であることを保証するものです。シリアライザビリティは分離の金字塔とされています。Serializabilityを保証するシステムは、トランザクションを同時に処理することができますが、最終的な結果は、同時性のないトランザクションを次々に処理したのと同じであることを保証します。これは非常に強力な保証であり、時の試練に耐え、堅牢でバグのないアプリケーションをその上に構築することができます。

What makes serializable isolation so powerful is that the application developer doesn’t have to reason about concurrency at all. The developer just has to focus on the correctness of individual transactions in isolation. As long as each individual transaction doesn’t violate the semantics of an application, the developer is ensured that running many of them concurrently will also not violate the semantics of the application.

シリアライザブル・アイソレーションがこれほど強力なのは、アプリケーションの開発者が並行性について考える必要が全くないからです。開発者は隔離された個々のトランザクションの正しさに注目すればよいのです。個々のトランザクションがアプリケーションのセマンティクスに違反していない限り、開発者は多くのトランザクションを同時に実行してもアプリケーションのセマンティクスに違反しないことが保証されます。

## [](#strict-serializability)Strict Serializability

厳密なシリアライゼーション

Although serializability works fine in the context of a single database server, it is not as consistent as it seems when it comes to a distributed global database.

シリアライザビリティは、単一のデータベースサーバのコンテキストでは問題なく動作しますが、分散したグローバルデータベースになると、見た目ほど一貫性がありません。

The first limitation of serializability is that it does not constrain how the equivalent serial order of transactions is picked. Given a set of concurrently executing transactions, the system guarantees that they will be processed equivalently to a serial order, but it doesn’t guarantee any particular serial order. As a result, two replicas that are given an identical set of concurrent transactions to process may end up in very different final states, because they chose to process the transactions in different equivalent serial orders. Therefore, replication of databases that guarantee "only" serializability cannot occur by simply replicating the input and having each replica process the input simultaneously. Instead, one replica must process the workload first, and a detailed set of state changes generated from that initial processing is replicated (thereby increasing the amount of data that must be sent over the network, and causing other replicas to lag behind the primary).

シリアライザブルの第一の限界は、トランザクションの等価な直列順序をどのように選択するかを制約していないことです。同時に実行されるトランザクションのセットが与えられた場合、システムはそれらがシリアル順に等価に処理されることを保証しますが、特定のシリアル順を保証するものではありません。その結果、同一の同時実行トランザクションのセットを与えられて処理する2つのレプリカは、等価なシリアル・オーダーとは異なるトランザクションの処理を選択したため、最終的な状態が全く異なるものになる可能性があります。したがって、「唯一の」直列性を保証するデータベースの複製は、単に入力を複製して各レプリカに同時に処理させるだけでは実現できません。代わりに、1つのレプリカが最初にワークロードを処理し、その最初の処理から生成された状態変化の詳細なセットが複製されます（それによって、ネットワーク上で送信しなければならないデータ量が増え、他のレプリカがプライマリに遅れる原因となります）。

The second, but related, limitation of serializability is that the picked order of transactions doesn’t have to be at all related to the order of transactions that were submitted to the system. A transaction Y that was submitted after transaction X may be processed in an equivalent serial order with Y before X.

2つ目の関連した直列化の制限は、ピックアップされたトランザクションの順序が、システムに送信されたトランザクションの順序と全く関連している必要がないことです。トランザクションXの後に送信されたトランザクションYは、Xの前にYという同等のシリアル順序で処理されるかもしれません。

Strict serializability adds a simple extra constraint on top of serializability. If transaction Y starts after transaction X completes, which means that X and Y are not (by definition) concurrent, then a system that guarantees strict serializability guarantees that both:

厳密な直列性は、直列性の上に単純な追加の制約を加える。トランザクションXが完了した後にトランザクションYが開始された場合、つまりXとYが（定義上）並行していない場合、厳密なシリアライザビリティを保証するシステムは以下の両方を保証します。

1.  the final state is equivalent to processing transactions in a serial order, and
2.  X must be before Y in that serial order.

---

1. 最終的な状態は、トランザクションを連続した順序で処理することと同等である。
2.  最終的な状態は、シリアルな順序でトランザクションを処理した場合と同等である。

For an application that applies transactions serially, these guarantees would seem obvious: when Y comes after X, X is before Y. However, strict serializability is particularly difficult to attain in distributed databases. In a typical distributed database, the factors influencing whether strict serializability can be maintained, or is even possible, include: replication strategy, clock drift, network jitter, variable CPU workloads, etc.

トランザクションを連続的に適用するアプリケーションでは、これらの保証は、YがXの後に来るとき、XはYの前にあるという当たり前のことに思えます。一般的な分散データベースでは、厳密な直列性を維持できるかどうか、あるいは可能かどうかに影響を与える要因として、レプリケーション戦略、クロックドリフト、ネットワークジッター、変動するCPUワークロードなどがあります。

## [](#snapshot)Snapshot

ナップショット

Fauna indexes maintain a virtual snapshot of participating documents. When an index is used in a transaction, the documents associated with the index are evaluated, guaranteeing isolation for read and write queries.

Fauna インデックスは、参加しているドキュメントの仮想的なスナップショットを維持します。インデックスがトランザクションで使用されると、インデックスに関連するドキュメントが評価され、読み取りと書き込みのクエリの分離が保証される。

For an analysis of Fauna’s serializability performance, see the [Jepsen report on Fauna from March 5, 2019](http://jepsen.io/analyses/faunadb-2.5.4), which validated that Fauna meets its expected isolation levels, and more.

Faunaのシリアライズ性能の分析については、Faunaが期待される分離レベルを満たしていることを検証した[2019年3月5日のFaunaに関するJepsenレポート](http://jepsen.io/analyses/faunadb-2.5.4)などを参照してください。

