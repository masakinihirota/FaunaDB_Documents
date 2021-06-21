Databases | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/databases

# Databases

データベース

Databases are defined as documents of type _database_. Databases exist within the system-global root database context.

データベースは、データベースタイプのドキュメントとして定義されます。データベースは、システムグローバルルートデータベースコンテキスト内に存在します。データベースは、データベースタイプのドキュメントとして定義されます。データベースは、システムグローバルルートデータベースコンテキスト内に存在します。

Aside from keys, all other documents exist within the context of a specific database. All queries are limited to a single database as well, and cannot span across databases.

キーを除いて、他のすべてのドキュメントは特定のデータベースのコンテキスト内に存在します。すべてのクエリも単一のデータベースに制限されており、データベースにまたがることはできません。

It is possible to rename a database by updating its `name` field. Renaming a database changes its ref, but preserves inbound references to the database. The data within a database remains accessible via existing keys.

nameフィールドを更新することにより、データベースの名前を変更することができます。データベースの名前を変更すると、その参照は変更されますが、データベースへのインバウンド参照は保持されます。データベース内のデータは、既存のキーを介して引き続きアクセスできます。

When a database is deleted, its associated data becomes inaccessible and is deleted asynchronously.

データベースが削除されると、関連するデータにアクセスできなくなり、非同期で削除されます。

|Field|Type|Definition and Requirements|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Cannot be `events`, `sets`, `self`, `documents`, or `_`.|
|`global_id`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|A read-only string that provides a globally-unique identifier for this database.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - A JSON object to contain any additional metadata about this database.|
|`priority`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|A priority between 1 and 500, inclusive. Defaults to 1.|

The `priority` option is deprecated as of release 2.10.0. You should avoid specifying `priority`. In some future Fauna release, `priority` will be removed. See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) for more details.

|Field|Type|定義と要件|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|events`, `sets`, `self`, `documents`, `_` のいずれかになることはありません。|
|`global_id`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|このデータベースのグローバル一意識別子を提供する読み取り専用文字列。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション-A JSON このデータベースに関する追加のメタデータを含むオブジェクト。|
|`priority`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|1から500までの優先度。デフォルトは1です。|

重要
priorityオプションは、リリース2.10.0で非推奨となりました。priority の指定は避けるべきです。将来の Fauna リリースでは priority は削除される予定です。詳細は「非推奨」を参照してください。

