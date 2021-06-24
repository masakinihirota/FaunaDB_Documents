@unique | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique

# `@unique`

Specifies the name of a Fauna index that enforces a uniqueness constraint.

一意性の制約を適用するFaunaインデックスの名前を指定します。

## [](#location)Location

Fields.

## [](#arguments)Arguments

引数

|Argument|Type|Required|Description|
|--|--|--|--|
|`index`|String|No|The name for the unique index to use.|

|引数|Type|必須|説明|
|--|--|--|--|
|`name`|String|No|使用するユニークインデックスの名前。|

## [](#description)Description

説明

The `@unique` directive marks a field as being unique. Unique fields have an associated unique index within the database. The `index` argument controls the name of the unique index. By default, the index name uses this template: `unique_<type name>_<field name>`.

`@unique` ディレクティブは、フィールドが一意であることを示します。ユニークなフィールドには、データベース内のユニークなインデックスが関連付けられます。`index`の引数はユニークインデックスの名前を制御します。デフォルトでは、インデックスの名前は次のテンプレートを使用します： `unique_<タイプ名>_<フィールド名>`.

## [](#example)Example

When the following GraphQL schema has been imported:

次の場合 GraphQL スキーマがインポートされました：

graphql

```graphql
type User {
  name: String! @unique(index: "unique_username")
}
```

The database contains the following index:

データベースには、次のインデックスが含まれています。

shell

```shell
Get(Index("unique_username"))
{ ref: Index("unique_username"),
  ts: 1560525943310000,
  active: true,
  partitions: 1,
  name: 'unique_username',
  source: Collection("User"),
  data: { gql: { ts: Time("2019-06-14T15:25:43.226352Z") } },
  terms: [ { field: [ 'data', 'name' ] } ],
  unique: true }
```

