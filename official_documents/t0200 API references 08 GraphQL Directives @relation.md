@relation | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/d_relation

# `@relation`

Declares that the current field has a bi-directional relationship with the target type.

bi-directional
双方向の

現在のフィールドがターゲットタイプと双方向の関係にあることを宣言します。

## [](#location)Location

ロケーション

Fields.

## [](#arguments)Arguments

引数

|Argument|Type|Required|Description|
|--|--|--|--|
|`name`|String|No|The name for the relation. Must contain only characters in the set `[a-zA-Z0-9_]`.|

|引数|Type|必須|説明|
|--|--|--|--|
|`name`|String|No|リレーションの名前です。`[a-zA-Z0-9_]`のセット内の文字のみを含む必要があります。|

## [](#description)Description

説明

The `@relation` directive marks the annotated field as participating in a bi-directional relationship with the target type.

`@relation` ディレクティブは、アノテーションされたフィールドがターゲットタイプとの双方向の関係に参加していることを示します。

The `name` argument defines the name of the relationship, and is useful if there is any ambiguity in relationship construction. For example, if the target type has two fields referring to the source type. The `name` argument must be unique. The same `name` should be used in both types participating in the relationship.

`name`はリレーションシップの名前を定義するもので、リレーションシップの構築に曖昧さがある場合に役立ちます。例えば、ターゲットタイプがソースタイプを参照する2つのフィールドを持っている場合などです。`name`の引数は一意でなければなりません。リレーションシップに参加する両方のタイプで同じ `name` を使用する必要があります。

For more information, see the [relations](https://docs.fauna.com/fauna/current/api/graphql/relations) reference.

詳細については、リレーション リファレンスを参照してください。

## [](#example)Example

例

graphql

```graphql
type User {
  name: String!
  posts: [Post!] @relation(name: "user_posts")
  reviews: [Post!] @relation(name: "user_reviews")
}

type Post {
  title: String!
  author: User! @relation(name: "user_posts")
  reviewers: [User!] @relation(name: "user_reviews")
}
```

`User` documents are related to `Post` documents, and vice-versa. Since both types contain references to the peer type, each distinct relationship has a distinct name.

`User`のドキュメントは`Post`のドキュメントと関係があり、その逆もまた然りです。どちらのタイプも相手のタイプへの参照を含んでいるので、それぞれの関係には固有の名前がついています。
