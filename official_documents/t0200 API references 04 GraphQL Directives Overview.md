Directives | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/

# Directives

指令

Directives are extensions to standard GraphQL syntax that can enhance GraphQL queries. Every directive name is prefixed with the "at" sign (`@`). This section describes the directives provided by the Fauna GraphQL API.

ディレクティブは標準の拡張です GraphQL 強化できる構文 GraphQLクエリ。すべてのディレクティブ名の前には「アットマーク」（@）が付いています。このセクションでは、Faunaによって提供される指令について説明しますGraphQL API。

[`@collection`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_collection)
Specifies the name of the underlying collection for this type.

[`@embedded`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_embedded)
Specifies that the current type be embedded in the referencing type.

[`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index)
Specifies the name of the underlying index for this field.

[`@relation`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_relation)
Declares bi-directional relationships between types.

[`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver)
Specifies a user-defined function for resolving this field.

[`@unique`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique)
Specifies the name of an index to enforce a uniqueness constraint.

@collection	
このタイプの基になるコレクションの名前を指定します。

@embedded	
現在のタイプが参照タイプに埋め込まれることを指定します。

@index	
このフィールドの基になるインデックスの名前を指定します。

@relation	
タイプ間の双方向の関係を宣言します。

@resolver	
このフィールドを解決するためのユーザー定義関数を指定します。

@unique	
一意性制約を適用するためのインデックスの名前を指定します。

## [](#next-steps)Next steps

-   [Endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints)
    
-   [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)
    
-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)

