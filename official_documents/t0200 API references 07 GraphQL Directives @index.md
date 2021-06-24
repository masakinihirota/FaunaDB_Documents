@index | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/d_index

# `@index`

Specifies the name of the index used to collate documents of the current type, instead of a index named after the field’s name.

collate
照合する

フィールド名にちなんだインデックスではなく、現在のタイプのドキュメントを照合するために使用されるインデックスの名前を指定します。

## [](#location)Location

Fields within a Query type.

クエリタイプ内のフィールド。

## [](#arguments)Arguments

引数

|Argument|Type|Required|Description|
|--|--|--|--|
|`name`|String|Yes|The name for the database index to use for this GraphQL query field.|

|引数|Type|必須|説明|
|--|--|--|--|
|`name`|String|Yes|このGraphQLクエリフィールドに使用するデータベースインデックスの名前です。|

## [](#description)Description

説明

The `@index` directive controls the name of the underlying database index for the annotated field. By default, the GraphQL API uses the name of the query field as the name of the index within the database.

directive
指示する 

`index` ディレクティブは、アノテーションされたフィールドの基礎となるデータベースインデックスの名前を制御します。デフォルトでは、GraphQL APIはクエリフィールドの名前をデータベース内のインデックスの名前として使用します。

## [](#example)Example

例

Given the following GraphQL schema:

次のことを考えると GraphQL スキーマ：

graphql

```graphql
type User {
  name: String
}

type Query {
  allUsers: [User!] @index(name: "all_users")
}
```

The database indexes would be:

データベースインデックスは次のようになります。

shell

```shell
Paginate(Indexes())
{ data: [ Index("all_users") ] }
```
