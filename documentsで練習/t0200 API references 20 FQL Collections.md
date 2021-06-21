Collections | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/collections

# Collections

コレクション

A database’s schema is defined by its _collections_, which are similar to tables in other databases. Collections are containers for holding documents. To create a collection, use the [`CreateCollection`](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection) function.

データベースのスキーマは、他のデータベースのテーブルと同様のコレクションによって定義されます。コレクションは、ドキュメントを保持するためのコンテナです。コレクションを作成するには、CreateCollection 関数を使用します。

Once the collection has been created, it is possible to create documents within the collection using the Fauna Query Language or the [GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/).

コレクションが作成されると、Fauna QueryLanguageまたはGraphQLAPIを使用してコレクション内にドキュメントを作成でき ます。

A collection cannot be created and used in the same transaction.

重要
コレクションを作成して同じトランザクションで使用することはできません。

It is possible to rename a collection by updating its `name` field. Renaming a collection changes its ref, but preserves inbound references to the collection. Documents within the collection remain associated with the collection.

nameフィールドを更新することにより、コレクションの名前を変更することができます。コレクションの名前を変更すると、その参照は変更されますが、コレクションへのインバウンド参照は保持されます。コレクション内のドキュメントは、コレクションに関連付けられたままになります。

When a collection is deleted, associated documents become inaccessible and are deleted asynchronously.

コレクションが削除されると、関連するドキュメントにアクセスできなくなり、非同期で削除されます。

|Field|Type|Definition and Requirements|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Cannot be `events`, `sets`, `self`, `documents`, or `_`.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - A JSON object, for storing additional metadata about the collection.|
|`history_days`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|Optional - Document history is retained for at least this many days. When the number of days has elapsed, events older than the specified time window are removed. The current version of a document is retained. Defaults to 30 days.|
|`ttl_days`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|Optional - Documents are deleted this many days after their last write. Defaults to `null`, which means that documents are always retained.|
|`permissions`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional.|

|Field|Type|定義と要件|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|`events`, `sets`, `self`, `documents`, `_` のいずれかになることはありません。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション-A JSON コレクションに関する追加のメタデータを格納するためのオブジェクト。|
|`history_days`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|オプション- 資料履歴は少なくともこの数日間保持されます。日数が経過すると、指定した時間枠より古いイベントが削除されます。ドキュメントの現在のバージョンが保持されます。デフォルトは30日です。|
|`ttl_days`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|オプション-ドキュメントは、最後に書き込んだ後、この数日で削除されます。デフォルトはnull、です。これは、ドキュメントが常に保持されることを意味します。|
|`permissions`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション。|

Each collection has two configuration fields that control the retention of documents. By default, document history is stored for 30 days. Set `history_days` to another value to keep more, or less, history. Setting `history_days` to `null` retains history indefinitely. Increasing retention increases storage utilization. See [Billing](https://docs.fauna.com/fauna/current/concepts/billing) for storage implications.

各コレクションには、ドキュメントの保持を制御する2つの構成フィールドがあります。デフォルトでは、ドキュメント履歴は30日間保存されます。セットする history_days多かれ少なかれ履歴を保持するために別の値に。履歴を無期限history_daysにnull保持するように設定 します。保持を増やすと、ストレージの使用率が上がります。ストレージへの影響については、請求を参照してください 。

By setting a collection’s `ttl_days`, documents within the collection are removed (as if they never existed) if they have not been updated within the configured number of days.

コレクションのを設定することによりttl_days、構成された日数以内に更新されなかった場合、コレクション内のドキュメントは（存在しなかったかのように）削除されます。

Removal is handled by a background task, so once a document (including collections, databases, indexes, keys, roles, and tokens) "expires" due to the setting in the `ttl_days` field, it could be some time (hours or days) before the removal occurs. There is no guarantee that removal actually occurs.

重要1
削除はバックグラウンドタスクによって処理されるため、ttl_daysフィールドでの設定によりドキュメント（コレクション、データベース、インデックス、キー、ロール、トークンを含む）が「期限切れ」になると、削除が発生します。削除が実際に行われるという保証はありません。

For more immediate removal, use the `ttl` field on documents that should have limited lifespans. See [Documents](https://docs.fauna.com/fauna/current/api/fql/documents) for details.

重要2
より迅速に削除するには、ttl寿命が制限されているはずのドキュメントのフィールドを使用します。詳細については、ドキュメントを参照してください。

