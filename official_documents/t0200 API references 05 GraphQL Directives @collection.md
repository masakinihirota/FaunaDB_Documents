@collection | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/d_collection

# `@collection`

Specifies the name of the Fauna collection to use instead of a collection named after the GraphQL type.

Specifies
ーを指定する

GraphQLのタイプ名を冠したコレクションではなく、使用するFaunaコレクションの名前を指定します。

## [](#location)Location

Types.

## [](#arguments)Arguments

引数

|Argument|Type|Required|Description|
|--|--|--|--|
|`name`|String|Yes|The name for the database collection to use for this GraphQL type.|

|引数|Type|必須|説明|
|--|--|--|--|
|`name`|String|Yes|このGraphQLタイプに使用するデータベースコレクションの名前です。|

## [](#description)Description

説明

The `@collection` directive controls the name of the underlying database collection for the annotated type. By default, the GraphQL API uses the name of a type as the name of the collection in the database.

`collection` ディレクティブは、アノテーションされた型の基礎となるデータベースコレクションの名前を制御します。デフォルトでは、GraphQL APIは型の名前をデータベース内のコレクションの名前として使用します。

## [](#example)Example

Given the following GraphQL schema:

次のようなGraphQLスキーマが与えられます。

```graphql
type User @collection(name: "users") {
  name: String
}
```

The database collections would be:

データベースコレクションは、次のようになります。

```shell
Paginate(Collections())
{ data: [ Collection("users") ] }
```

感想
このドキュメントではよくわからない。

