Documents | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/documents

# Documents

Every record, of any kind, in a Fauna database is stored as an object called a _document_. Documents are made up of fields and their associated value, just like a JSON object. The value for any key can itself be a document.

Faunaデータベース内のあらゆる種類のすべてのレコードは、ドキュメントと呼ばれるオブジェクトとして保存されます。ドキュメントは、フィールドとそれに関連する値で構成されています。JSONオブジェクト。任意のキーの値自体をドキュメントにすることができます。

See the [Limits](https://docs.fauna.com/fauna/current/api/limits) page for details on document size and transaction limits.

注意
ドキュメントサイズとトランザクション制限の詳細 については、制限ページを参照してください。

Every document belongs to a specific [_collection_](https://docs.fauna.com/fauna/current/api/fql/collections), similar to a _table_ in other database systems, which groups similar documents together. Documents within collections are not required to share the same structure. Collections belong to a specific [_database_](https://docs.fauna.com/fauna/current/api/fql/databases), which is the contains of all other schemas in Fauna.

すべてのドキュメントは、他のデータベースシステムの_table_に似た、特定の[_collection_](https://docs.fauna.com/fauna/current/api/fql/collections)に属しており、類似したドキュメントをまとめています。コレクション内のドキュメントは、同じ構造を共有する必要はありません。コレクションは特定の[_database_](https://docs.fauna.com/fauna/current/api/fql/databases)に属しており、これはFaunaの他のすべてのスキーマを含んでいます。

Even the definitions of [Databases](https://docs.fauna.com/fauna/current/api/fql/databases), [Collections](https://docs.fauna.com/fauna/current/api/fql/collections), [Keys](https://docs.fauna.com/fauna/current/security/), [Indexes](https://docs.fauna.com/fauna/current/api/fql/indexes), and user-defined functions, are all documents. They exist within internal Fauna collections of the same name.

Databases](https://docs.fauna.com/fauna/current/api/fql/databases)、[Collection](https://docs.fauna.com/fauna/current/api/fql/collections)、[Key](https://docs.fauna.com/fauna/current/security/)、[Indexes](https://docs.fauna.com/fauna/current/api/fql/indexes)、ユーザー定義関数の定義も、すべてドキュメントです。これらは同じ名前のFaunaコレクションの内部に存在します。

All documents have a set of common characteristics:

すべてのドキュメントには、一連の共通の特性があります。

-   Documents have an identifier called a [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) (or just Ref). A document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) is a compound value comprising its collection along with a unique document ID. A [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) is a unique identifier for the document within the scope of the database in which it is stored.

- ドキュメントには、[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) (または単にRef)と呼ばれる識別子があります。ドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)は、そのコレクションと、ユニークなドキュメントIDからなる複合値です。Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)は、文書が保存されているデータベースの範囲内での、その文書のための一意の識別子です。

-   User-specified documents have a timestamp that identifies when the document was most recently updated. Fauna documents are versioned — each time a document is updated, a new version is stored — and the versions are distinguished using the timestamp. When a query does not specify a timestamp, the latest versions of any documents involved are used. The timestamp — returned in the `ts` field — is of type [Long](https://docs.fauna.com/fauna/current/api/fql/types#long).

- ユーザーが指定したドキュメントには、そのドキュメントが最後に更新された日時を示すタイムスタンプが付いています。Faunaのドキュメントはバージョン管理されており、ドキュメントが更新されるたびに新しいバージョンが保存され、タイムスタンプによってバージョンが区別されます。クエリでタイムスタンプが指定されていない場合は、関連するすべてのドキュメントの最新バージョンが使用されます。ts`フィールドで返されるタイムスタンプは、[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)というタイプです。

    `ts` should not be directly manipulated. Instead, you can use the [`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert) and [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove) functions to manipulate the history of a document at specific timestamps.

    `ts` を直接操作してはいけません。その代わりに、[`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)や[`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)といった関数を使って、特定のタイムスタンプでドキュメントの履歴を操作することができます。

    To track timestamps independent of Fauna operations, include fields in your documents to record timestamps entirely under your control.

Faunaの操作とは無関係にタイムスタンプを追跡するには、ドキュメントにフィールドを含めて、完全に管理下にあるタイムスタンプを記録します。

-   Documents can have an optional `ttl` field (meaning time-to-live), which is a [Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp) that indicates when the document should be removed. When a document is removed, the document’s existence ceases (as if it never existed); temporal queries cannot recover the document.

- ドキュメントは、オプションで `ttl` フィールド（time-to-live の意）を持つことができます。これは、ドキュメントがいつ削除されるべきかを示す [Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp) です。ドキュメントが削除されると、そのドキュメントの存在は（存在しなかったかのように）消滅し、一時的なクエリではそのドキュメントを復元することはできません。

    Removal is handled by a background task, so once a document (including collections, databases, indexes, keys, roles, and tokens) "expires" due to the setting in the `ttl` field, it could be some time (hours or days) before the removal occurs. There is no guarantee that removal actually occurs.

重要1
    削除はバックグラウンドタスクで処理されるため、`ttl`フィールドの設定によってドキュメント（コレクション、データベース、インデックス、キー、ロール、トークンを含む）が「期限切れ」になると、削除が行われるまでに時間（数時間または数日）がかかる可能性があります。実際に削除されることを保証するものではありません。

    As of version 3.0.0, the `ttl` field is honored on read — a document that should have been removed behaves as if it has been removed. However, until removal actually occurs due to background task processing, you can continue to access the history of the document, provided you have its reference, via the [`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events) function.

重要2
    バージョン3.0.0では、`ttl`フィールドは読み込み時に尊重されます。つまり、削除されたはずのドキュメントは、あたかも削除されたかのように振る舞うことができます。しかし、バックグラウンドのタスク処理によって実際に削除されるまでは、そのドキュメントの参照があれば、[`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)関数を使って、そのドキュメントの履歴にアクセスし続けることができます。
    

-   Documents are manipulated with the same query language functions, such as `get`, `create`, `update`, `replace`, or `delete`. Documents returned by queries are represented as JSON objects. Within a query, a document’s fields may be accessed using the [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function.

- ドキュメントは `get`, `create`, `update`, `replace`, `delete` といった同じクエリ言語の関数で操作されます。クエリが返すドキュメントはJSONオブジェクトとして表現されます。クエリの中で、ドキュメントのフィールドにアクセスするには、[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数を使用します。
    

To separate the ref and timestamp from user-defined fields, Fauna wraps each user-specified document in a metadata document for storage, and user-specified data appears in the `data` field. For example, when a blog post document is created, it is stored as:

refとtimestampをユーザー定義フィールドから分離するために、Faunaはユーザー指定の各ドキュメントを保存用のメタデータドキュメントでラップし、ユーザー指定のデータがdataフィールドに表示されます。たとえば、ブログ投稿ドキュメントが作成されると、次のように保存されます。

```json
{
  ref: Ref(Collection("posts"), "227576404750893579"),
  ts: 1553292644000000,
  data: {
    title: 'My blog post',
    tags: [ 'post', 'popular', 'blog' ],
    body: "Lorem ipsum..."
  }
}
```

