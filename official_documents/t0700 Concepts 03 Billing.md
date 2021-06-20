Billing | Fauna Documentation
https://docs.fauna.com/fauna/current/concepts/billing

# Billing

課金について

Fauna billing is primarily based on the resources that you use in your queries. Fauna provides a generous free tier and you are only billed if you exceed the free tier’s limits. You can also choose to purchase higher tiers that provide predictable pricing, or support. See the [pricing page](https://fauna.com/pricing) for more information.

Fauna の課金は、主にお客様がクエリで使用するリソースに基づいて行われます。Faunaでは豊富な無料ティアを提供しており、無料ティアの制限を超えた場合にのみ課金されます。また、予測可能な価格やサポートを提供する上位のティアを購入することもできます。詳しくは[価格ページ](https://fauna.com/pricing)をご覧ください。

This page describes how resource usage is counted.

このページでは、リソースの使用量がどのようにカウントされるかを説明しています。

On November 19, 2020, Fauna, Inc. introduced new billing plans. Users with accounts created prior to this date remain on their existing plans until February 1, 2021, or move to a new plan when they update their billing settings. Users who signup on this date, or later, are automatically assigned to a new billing plan.

重要
2020年11月19日、Fauna, Inc.は新しい課金プランを導入しました。この日以前にアカウントを作成したユーザーは、2021年2月1日までは既存のプランのまま、または課金設定を更新すると新しいプランに移行します。また、この日以降にサインアップしたユーザーは、自動的に新しい課金プランに割り当てられます。

This page describes the way billing works both before and after the transition date, with "legacy billing" in the left column, and "current billing" in the right column.

このページでは、移行日前と移行日後の課金の仕組みについて、左列に「従来の課金」、右列に「現在の課金」を記載しています。

## [](#definitions)Definitions

定義

Document

ドキュメント

A document is any record stored within a Fauna database, which includes user-provided documents and Fauna schema documents, such as those describing databases, collections, indexes, keys, user-defined functions, roles, etc.

ドキュメントとは、Fauna データベースに保存されている記録のことで、ユーザーが提供したドキュメントや、データベース、コレクション、インデックス、キー、ユーザー定義関数、ロールなどを記述した Fauna スキーマドキュメントが含まれる。

Query

クエリ

An expression of one or more FQL functions intended to achieve, or return, a specific result. Queries are executed as an all-or-nothing transaction by Fauna.

特定の結果を得る、または返すことを目的とした 1 つまたは複数の FQL 関数の表現。クエリは、Fauna によってすべてか無かのトランザクションとして実行される。

## [](#resources)Resources

リソース

For billing purposes, use of the following resources is counted:

課金のため、以下のリソースの使用がカウントされます。

-   [Read operations](#read)
-   [Write operations](#write)
-   [Compute operations](#compute)
-   [Streaming operations](#streaming)
-   [Storage](#storage)
-   [Data transfer](#data)

---

-  [読み込み操作](#read)
-  [書き込み操作](#write)
-  [コンピュート操作](#compute)
-  [ストリーミング操作](#streaming)
-  [ストレージ](#storage)
-  [データ転送](#data)

### [](#read)Read operations

読み取り操作

-   One read operation is counted when any document is read from storage.

- ストレージからドキュメントが読み込まれると、1回の読み取り操作がカウントされます。

    When a query involves a distinct document multiple times, the document is only read once, not once per instance in the query.

    1つのクエリが別のドキュメントを複数回含む場合、そのドキュメントは1回しか読み込まれず、クエリのインスタンスごとに1回読み込まれるわけではありません。

-   One read operation is counted when a page of tuples is fetched from an index.

- 1つの読み取り操作は、タプルのページがインデックスからフェッチされたときにカウントされます。

    When a query involves a distinct page from an index multiple times, the index page is only read once, not once per use in the query.

    クエリがインデックスの個別のページを複数回含む場合、インデックス・ページの読み取りは1回のみで、クエリの使用ごとに1回読み取られるわけではありません。

-   Read operations are always counted, whether the query fails or not.

- 読み取り操作は、クエリが失敗してもしなくても、常にカウントされます。

-   If a query has to be retried due to conflicts with other concurrent queries that are writing to the same documents, the query is retried and incurs read operations again.

- 同じドキュメントに書き込んでいる他の同時実行クエリとの競合により、クエリの再実行が必要になった場合、クエリは再実行され、読み取り操作が再び発生します。

-   Read operations are not counted for the portions of a query involved in write operations. For example, if you [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) a document, the result is incidentally read after the write completes, but does not accrue read operations.

- 書き込み操作が行われたクエリの部分については、読み込み操作はカウントされません。例えば、ドキュメントを[Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)した場合、書き込みが完了した後にその結果が偶発的に読み込まれますが、読み取り操作は発生しません。

See the `x-read-ops` response header in the [Per query metrics](#perquery) section.

Per query metrics](#perquery)セクションの `x-read-ops` レスポンスヘッダを参照してください。

-   One read operation is counted when up to 4KB of any document is read from storage. A 20KB document requires 5 read operations, a 4.1KB document requires 2 read operations.

- 4KBまでのドキュメントがストレージから読み込まれると、1回の読み取り操作がカウントされます。20KBのドキュメントの場合は5回の読み取り操作が必要で、4.1KBのドキュメントの場合は2回の読み取り操作が必要です。

    When a query involves a distinct document multiple times, the document is only read once, not once per instance in the query.

    1つのクエリに複数の文書が含まれる場合、その文書の読み取りは1回のみで、クエリのインスタンスごとに1回読み取られるわけではありません。

-   One read operation is counted when up to 4KB of tuples is fetched from an index.

- 4KBまでのタプルをインデックスからフェッチした場合、1回の読み取り操作がカウントされます。

    Additionally, one read operation per index partition is counted. An index with no [terms](https://docs.fauna.com/fauna/current/api/fql/indexes#term) defined has 8 partitions, so 7 additional read operations are counted above the number required to read a page from the index.

    さらに、インデックス・パーティションごとに1つの読み取り操作がカウントされます。terms](https://docs.fauna.com/fauna/current/api/fql/indexes#term)が定義されていないインデックスには8つのパーティションがあるため、インデックスから1ページを読み取るのに必要な数よりもさらに7つの読み取り操作がカウントされます。

    When a query involves a distinct page from an index multiple times, the index page is only read once, not once per use in the query.

    クエリがインデックスの別個のページを複数回含む場合、インデックス・ページの読み取りは1回のみで、クエリでの使用ごとに1回読み取られるわけではありません。

-   Read operations for authentication or identity checks are counted according to the size of the token or key; one read operation is counted when up to 4KB is read.

- 認証や身元確認のための読み取り操作は、トークンや鍵のサイズに応じてカウントされ、最大4KBの読み取りで1回の読み取り操作がカウントされます。

-   Read operations are always counted, whether the query fails or not.

- 読み取り操作は、問い合わせが失敗したかどうかにかかわらず、常にカウントされます。

-   If a query has to be retried due to conflicts with other concurrent queries that are writing to the same documents, the query is retried and incurs read operations again.

- 同じドキュメントに書き込んでいる他の同時実行クエリと競合してクエリを再実行しなければならない場合、クエリは再実行され、読み取り操作が再び発生します。

-   Read operations are not counted for the portions of a query involved in write operations. For example, if you [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) a document, the result is incidentally read after the write completes, but does not accrue read operations.

- 書き込み操作が行われたクエリの部分については、読み込み操作はカウントされません。例えば、ドキュメントを[Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)した場合、その結果は書き込みが完了した後に偶発的に読み込まれますが、読み取り操作は発生しません。

See the `x-byte-read-ops` response header in the [Per query metrics](#perquery) section.

Per query metrics](#perquery)セクションの`x-byte-read-ops`レスポンスヘッダを参照してください。

**For both legacy and current billing**:

**レガシーと現行の課金の両方に対応**。

-   The following functions perform reads:
    -   `CurrentIdentity`
    -   `CurrentToken`
    -   [`Exists`](https://docs.fauna.com/fauna/current/api/fql/functions/exists)
    -   [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)
    -   `HasCurrentIdentity`
    -   `HasCurrentToken`
    -   [`HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity) **Deprecated**
    -   [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)
    -   [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) **Deprecated**
    -   [`KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)
    -   [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)
    -   [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)
-   The following functions perform reads when they operate on [Set](https://docs.fauna.com/fauna/current/api/fql/types#set) [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s:
    -   [`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)
    -   [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)
    -   [`Range`](https://docs.fauna.com/fauna/current/api/fql/functions/range)
    -   [`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

---

- 読み取りを行うのは以下の関数です。
    - CurrentIdentity` （カレントアイデンティティ
    - 現在のトークン
    - [Exists`](https://docs.fauna.com/fauna/current/api/fql/functions/exists)
    - [Get](https://docs.fauna.com/fauna/current/api/fql/functions/get)
    - `HasCurrentIdentity` (現在のID)
    - `HasCurrentToken` (現在のトークン)
    - [HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity) **非推奨**
    - [Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)
    - [Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) **非推奨**
    - [KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)
    - [ログイン](https://docs.fauna.com/fauna/current/api/fql/functions/login)
    - [Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)
- 以下の関数は、[Set](https://docs.fauna.com/fauna/current/api/fql/types#set) [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)sを操作するときに読み取りを行います。
    - [`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)
    - [パギネート(Paginate)](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)
    - [範囲(Range)](https://docs.fauna.com/fauna/current/api/fql/functions/range)
    - [還元](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

### [](#write)Write operations

## Legacy billing

-   One write operation is counted when any document is written to storage.
-   Index writes, for documents that are created, updated, or deleted, do not incur write operations.
-   For queries that fail for any reason, write operations are not counted.

See the `x-write-ops` response header in the [Per query metrics](#perquery) section.

---

## 古い課金

- ドキュメントがストレージに書き込まれると、1回の書き込み操作が発生します。
- 作成、更新、または削除されたドキュメントに対するインデックスの書き込みには、書き込み操作は発生しません。
- 何らかの理由で失敗したクエリでは、書き込み操作はカウントされません。

Per query metrics](#perquery)セクションの `x-write-ops` レスポンスヘッダーを参照してください。

## Current billing

-   One write operation is counted when up to 1KB of any document is written to storage. A 20KB document requires 20 write operations, a 1.1KB document requires 2 write operations.
-   Index writes, for documents that are created, updated, or deleted, do incur write operations: one write operation is counted when up to 1k of document data is indexed.
    You can save some write operations by creating an index before the associated documents. When an index is created after documents are created, one write operation per index entry is counted.
-   For queries that fail for any reason, write operations are not counted.

---

## 現行の課金

- 1回の書き込み操作は、任意の文書のうち最大1KBをストレージに書き込むときにカウントされます。20KBのドキュメントには20回の書き込み操作が必要で、1.1KBのドキュメントには2回の書き込み操作が必要です。
- インデックスの書き込みは、作成、更新、または削除されるドキュメントに対して行われますが、書き込み操作は発生しません。最大1kのドキュメントデータにインデックスが作成されると、1つの書き込み操作がカウントされます。
    関連するドキュメントの前にインデックスを作成することで、書き込み操作の一部を節約することができます。ドキュメントが作成された後にインデックスが作成された場合、インデックスエントリごとに1つの書き込み操作がカウントされます。
- 何らかの理由で失敗したクエリについては、書き込み操作はカウントされません。

See the `x-byte-write-ops` response header in the [Per query metrics](#perquery) section.

Per query metrics](#perquery)セクションの`x-byte-write-ops`レスポンスヘッダを参照してください。

**For both legacy and current billing**: - The following functions perform writes:

**レガシーと現行の課金の両方に対応**。- 以下の機能で書き込みを行います。

-   [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)
-   [`CreateClass`](https://docs.fauna.com/fauna/current/api/fql/functions/createclass) **Deprecated**
-   `CreateAccessProvider`
-   [`CreateDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/createdatabase)
-   [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)
-   [`CreateIndex`](https://docs.fauna.com/fauna/current/api/fql/functions/createindex)
-   [`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)
-   [`CreateRole`](https://docs.fauna.com/fauna/current/api/fql/functions/createrole)
-   [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)
-   [`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)
-   [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)
-   [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)
-   [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)
-   [`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace)
-   [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)

---

-  [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)
-  [`CreateClass`](https://docs.fauna.com/fauna/current/api/fql/functions/createclass) **非推奨**.
- `CreateAccessProvider` (クリエートアクセスプロバイダ)
-  [`CreateDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/createdatabase)
-  [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)
-  [`CreateIndex`](https://docs.fauna.com/fauna/current/api/fql/functions/createindex)
-  [`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)
-  [`CreateRole`](https://docs.fauna.com/fauna/current/api/fql/functions/createrole)
-  [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)
-  [`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)
-  [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)
-  [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)
-  [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)
-  [`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace)
-  [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)

### [](#compute)Compute operations

計算機操作

## Legacy billing

- Compute operations are not counted nor billed.

## 古い課金

- 計算機操作はカウントされず、課金もされません。

## Current billing

-   One compute operation is counted per fifty function calls, or portion thereof.

    User-defined functions might call many functions with each invocation; all function calls are counted. Compute operations might grow rapidly when using functions such as [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) and [`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce), or when calling a UDF recursively.

See the `x-compute-ops` response header in the [Per query metrics](#perquery) section.

## 現行の課金

- 50回の関数呼び出し（またはその一部）につき、1つの計算処理がカウントされます。

    ユーザー定義関数は、呼び出しのたびに多くの関数を呼び出すかもしれませんが、すべての関数呼び出しがカウントされます。Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)や[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)などの関数を使用した場合や、UDFを再帰的に呼び出した場合には、計算処理が急激に増加する可能性があります。

Per query metrics](#perquery)セクションの`x-compute-ops`レスポンスヘッダを参照してください。

### [](#streaming)Streaming operations

## Legacy billing

-   Streaming operations are not counted nor billed.

## 古い課金

- ストリーミング操作はカウントされず、課金もされません。

## Current billing

-   While streaming is in preview, streaming operations are not counted nor billed.

    When streaming moves to production, one streaming operation is counted for each minute that a stream is active.

## 現行の課金

- ストリーミングがプレビュー中の場合、ストリーミング操作はカウントされず、課金もされません。

    ストリーミングが本番に移行すると、ストリームがアクティブである1分ごとに1回のストリーミング操作がカウントされます。

### [](#storage)Storage

## Legacy billing

-   Documents are stored on disk, and the amount of space occupied is charged monthly.

-   Indexes are also stored on disk, and contribute to the storage that is charged monthly. The size of indexes varies with the size of the data that is indexed.

## 古い課金

- ドキュメントはディスクに保存され、その容量に応じて毎月課金されます。

- インデックスもディスク上に保存され、月々の課金対象となるストレージに貢献します。インデックスのサイズは、インデックスの対象となるデータのサイズによって異なります。

## Current billing

-   Documents are stored on disk, and the amount of space occupied is charged monthly.

-   Indexes are also stored on disk, and contribute to the storage that is charged monthly. The size of indexes varies with the size of the data that is indexed.

## 現行の課金

- ドキュメントはディスクに保存され、その容量に応じて毎月課金されます。

- インデックスもディスク上に保存され、月々の課金対象となるストレージに貢献します。インデックスのサイズは、インデックスの対象となるデータのサイズによって異なります。

Storage reporting is a continuous process, where the storage occupied in each database is determined approximately once per week. The billed amount for storage is determined by taking an average of the weekly storage reports in a calendar month.

ストレージの報告は継続的に行われ、各データベースで使用されているストレージは約1週間に1度決定されます。ストレージの請求額は、週ごとのストレージレポートの平均を取って決定されます。

There can be some inaccuracy in storage reporting due to replica topology changes. When this occurs, the reported storage is less than the actual, resulting in lower billing.

レプリカのトポロジーが変更されると、ストレージのレポートが不正確になることがあります。このような場合、報告されたストレージは実際のものより少なくなり、結果として請求額が低くなります。

One non-obvious contributor to storage is that Fauna stores all revisions to a document separately: each update contributes to the storage total. Deleting unused documents directly reduces required storage. Setting a document’s `ttl` field, or a collection’s `history_days` or `ttl_days` fields, can indirectly reduce storage.

ストレージに影響を与える要因としては、Faunaがドキュメントのすべてのリビジョンを個別に保存していることが挙げられますが、各アップデートがストレージの合計に影響を与えます。使われていない文書を削除することで、必要なストレージを直接減らすことができる。ドキュメントの `ttl` フィールドや、コレクションの `history_days` や `ttl_days` フィールドを設定すると、間接的にストレージを減らすことができます。

Removal is handled by a background task, so once a document (including collections, databases, indexes, keys, roles, and tokens) "expires" due to the setting in the `ttl` field, it could be some time (hours or days) before the removal occurs. There is no guarantee that removal actually occurs.

重要
削除はバックグラウンドタスクで処理されるため、`ttl`フィールドの設定によりドキュメント（コレクション、データベース、インデックス、キー、ロール、トークンを含む）が「期限切れ」になると、削除が行われるまでに時間（数時間または数日）がかかる可能性があります。実際に削除されることを保証するものではありません。

As of version 3.0.0, the `ttl` field is honored on read — a document that should have been removed behaves as if it has been removed. However, until removal actually occurs due to background task processing, you can continue to access the history of the document, provided you have its reference, via the [`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events) function.

重要
バージョン3.0.0では、`ttl`フィールドは読み込み時に尊重され、削除されたはずのドキュメントが削除されたかのように動作します。しかし、バックグラウンドタスクの処理によって実際に削除されるまでは、そのドキュメントの参照があれば、[`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)関数を使って、そのドキュメントの履歴にアクセスし続けることができます。

### [](#data)Data transfer

## Legacy billing

The amount of data transfer required to provide query responses is charged monthly.

If the client executing queries is co-located within the same cloud provider and region as a Fauna replica, data transfer is not billed for those queries.

See the `x-query-bytes-out` header in the [Per query metrics](#perquery) section. Note that it does not tell you whether the data transfer was billed or not.

## 古い課金

クエリの応答を提供するために必要なデータ転送量は毎月課金されます。

クエリを実行するクライアントが、Fauna レプリカと同じクラウドプロバイダー、同じリージョン内に配置されている場合、そのクエリに対するデータ転送量は課金されません。

Per query metrics](#perquery)セクションの `x-query-bytes-out` ヘッダーを参照してください。データ転送が課金されたかどうかはわかりませんのでご注意ください。

## Current billing

Data transfer is, effectively, included in the cost calculation for read, write, and compute operations. There is no separate billing for data transfer.

## 現行の課金

データ転送は、事実上、読み取り、書き込み、および計算処理のコスト計算に含まれます。データ転送のための個別の請求はありません。

## [](#perquery)Per query metrics

クエリごとのメトリクス

Fauna FQL queries are performed over HTTP connections, and responses include headers that indicate the resources used in the current query.

Fauna FQL クエリは HTTP 接続で実行され、レスポンスには現在のクエリで使用されているリソースを示すヘッダーが含まれます。

For example, for the following FQL query performed with the [JavaScript driver](https://docs.fauna.com/fauna/current/drivers/javascript):

たとえば、[JavaScript ドライバ](https://docs.fauna.com/fauna/current/drivers/javascript)で実行される次のような FQL クエリの場合です。

```javascript
client.query(
  q.Map(
    q.Paginate(q.Match(q.Index('all_letters'))),
    q.Lambda("X", q.Get(q.Var("X")))
  )
)
.then((ret) => console.log(ret))
```

The following response headers were included with the query result:

クエリの結果には、以下のようなレスポンスヘッダーが含まれていました。

```json
{
  'alt-svc': 'clear',
  'content-length': '4459',
  'content-type': 'application/json;charset=utf-8',
  date: 'Tue, 17 Nov 2020 22:57:46 GMT',
  via: '1.1 google',
  'x-byte-read-ops': '34',
  'x-byte-write-ops': '0',
  'x-compute-ops': '2',
  'x-faunadb-build': '20.11.00.rc8-01f9c94',
  'x-query-bytes-in': '120',
  'x-query-bytes-out': '4459',
  'x-query-time': '7',
  'x-read-ops': '27',
  'x-storage-bytes-read': '3047',
  'x-storage-bytes-write': '0',
  'x-txn-retries': '0',
  'x-txn-time': '1605653866258457',
  'x-write-ops': '0'
}
```

The query reads from a collection containing all 26 letters of the English alphabet, and it used the `all_letters` index to do so. The metrics associated with billing include:

このクエリは、英語のアルファベット26文字すべてを含むコレクションを読み込むもので、そのために `all_letters` インデックスを使用しています。課金に関連するメトリクスは以下の通りです。

## Legacy billing

-   `x-read-ops` is 27, which is one read operation per letter (26 in total), and one read operation for the index. This value contributes to the read operations billing.

-   `x-query-bytes-in` is 120, which is the length of the query expressed in the Fauna wire protocol. This value contributes to the data transfer billing.

-   `x-query-bytes-out` is 4,459, which represents the number of characters in the response itemizing all of the letter documents. This value contributes to the data transfer billing.

-   `x-write-ops` and `x-storage-bytes-write` are both 0, as no writes were performed during the query. The value for `x-write-ops` contributes to the write operations billing.

## 古い課金

- x-read-ops`は27で、1文字につき1回の読み取り操作（合計26回）と、インデックスの読み取り操作が1回となります。この値は、読み取り操作の課金に貢献します。

- x-query-bytes-in` は 120 で、これは Fauna Wire プロトコルで表現されたクエリの長さです。この値はデータ転送の課金に寄与する。

- x-query-bytes-out`は4,459で、レタードキュメントをすべて箇条書きにしたレスポンスの文字数を表しています。この値はデータ転送の課金に寄与します。

- x-write-ops`と`x-storage-bytes-write`はともに0で、これはクエリ中に書き込みが行われなかったことを示している。x-write-ops` の値は書き込み操作の課金に寄与する。

## Current billing

-   `x-byte-read-ops` is 34, which is one read operation per letter (26 in total), and 8 read operations for the index (since an index with no `terms` specified has 8 partitions). This value contributes to the read operations billing.

-   `x-byte-write-ops` is 0, as no writes were performed during the query. This value contributes to the write operations billing.

-   `x-compute-ops` is 2. The `Map`, `Paginate`, and `Index` functions are called once each, `Lambda` and its `Get` and `Var` functions are called 26 times each, for a total of 81 function calls. The compute operations is function calls / 50, rounded up. This value contributes to the compute operations billing.

## 現行の課金

- x-byte-read-ops`は34で、1文字につき1回の読み取り操作（合計26回）と、インデックスに対する8回の読み取り操作（`terms`が指定されていないインデックスは8つのパーティションを持つため）となります。この値は、読み取り操作の課金に貢献します。

- x-byte-write-ops`は0で、これはクエリ中に書き込みが行われなかったためです。この値は書き込み操作の課金に寄与する。

- Map`, `Paginate`, `Index` の各関数はそれぞれ1回ずつ、`Lambda` とその `Get`, `Var` の各関数はそれぞれ26回ずつ、合計81回の関数呼び出しが行われています。計算量は，関数呼び出し数÷50で，切り上げられます．この値は、計算処理の課金に貢献します。

You can use this information to accurately determine the resource cost of running your queries, especially if your application(s) execute them frequently.

特にアプリケーションが頻繁にクエリを実行する場合は、この情報を使ってクエリ実行のリソースコストを正確に把握することができます。

TIP
The Web Shell provides this information as a tooltip for each query result (hover your pointer over the `i` in the white circle):

TIP
Web シェルでは、この情報を各検索結果のツールチップとして提供しています（白丸の `i` にポインタを合わせてください）。

![Billable operations in the Web Shell](https://docs.fauna.com/fauna/current/concepts/billing_images/dashboard-shell-operations.png)

![Web Shellでの課金処理](https://docs.fauna.com/fauna/current/concepts/billing_images/dashboard-shell-operations.png)

**IMPORTANT**
The Fauna GraphQL API does not currently provide per-query billing headers. You would have to correlate your API usage with the reporting available in the [Fauna Dashboard](https://dashboard.fauna.com/). Unfortunately, the reporting there is not real-time, lagging behind query usage by several hours (at least).

**重要**
Fauna GraphQL API は現在、クエリごとの課金ヘッダーを提供していません。そのため、API の使用状況を [Fauna Dashboard](https://dashboard.fauna.com/) で提供されているレポートと関連付ける必要があります。残念ながら、ダッシュボードのレポートはリアルタイムではなく、クエリの使用状況から数時間遅れて表示されます。

