Directives | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/

# Directives

指令

Directives are extensions to standard GraphQL syntax that can enhance GraphQL queries. Every directive name is prefixed with the "at" sign (`@`). This section describes the directives provided by the Fauna GraphQL API.

ディレクティブは、標準的なGraphQLの構文を拡張したもので、GraphQLのクエリを強化することができます。すべてのディレクティブ名の前には、"at "記号（@）が付きます。ここでは、Fauna GraphQL API が提供するディレクティブについて説明します。

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

コレクション	
このタイプの基礎となるコレクションの名前を指定する。

埋め込み	
現在の型を、参照する型に埋め込むことを指定します。

インデックス	
このフィールドの基礎となるインデックスの名前を指定します。

関連性	
タイプ間の双方向の関係を宣言します。

リゾルバ	
このフィールドを解決するためのユーザー定義の関数を指定します。

ユニーク	
一意性制約を適用するインデックスの名前を指定します。

## [](#next-steps)Next steps

-   [Endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints)
    
-   [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)
    
-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)

