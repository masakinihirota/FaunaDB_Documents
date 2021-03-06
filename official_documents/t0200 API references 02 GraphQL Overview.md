GraphQL reference | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/

# GraphQL reference

reference
機能や仕様などを網羅的に解説

GraphQL リファレンス

![GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql//../_images/graphql-reference.svg)

This section provides reference information for the Fauna GraphQL API.

このセクションでは、Faunaの参照情報を提供します GraphQL API。

-   [Endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints)
-   [Directives](https://docs.fauna.com/fauna/current/api/graphql/directives/)
-   [Input types](https://docs.fauna.com/fauna/current/api/graphql/input)
-   [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)
-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)
-   [Schema previews](https://docs.fauna.com/fauna/current/api/graphql/previews/)

エンドポイント
指令
入力タイプ
関係
ユーザー定義関数
スキーマプレビュー

You can find step-by-step [GraphQL tutorials](https://docs.fauna.com/fauna/current/tutorials/graphql/) in the [Tutorials](https://docs.fauna.com/fauna/current/tutorials/) section.

ステップバイステップの[GraphQLチュートリアル](https://docs.fauna.com/fauna/current/tutorials/graphql/)は、[チュートリアル](https://docs.fauna.com/fauna/current/tutorials/)セクションでご覧いただけます。

See [Limits](https://docs.fauna.com/fauna/current/api/limits) for details on document size and transaction limits.

ドキュメントサイズとトランザクションの制限については、[Limits](https://docs.fauna.com/fauna/current/api/limits)を参照してください。

## [](#supported-scalar-types)Supported scalar types

サポートされているスカラー型

The GraphQL API supports the following built-in types:

GraphQL APIは、次の組み込み型をサポートしています。

- `Boolean`: true "または "false "を表す値です。

Boolean：trueまたはを表す値false。

-   `Date`: A [Date](https://docs.fauna.com/fauna/current/api/fql/types#date) value. The GraphQL API communicates and renders these as strings in the format `yyyy-MM-dd`, but they are stored as FQL dates.

- [`Date`: Date](https://docs.fauna.com/fauna/current/api/fql/types#date)の値です。GraphQL APIでは、これらを `yyyy-MM-dd` 形式の文字列として通信・描画しますが、FQLの日付として保存されます。


-   `Float`: A 64-bit floating point number.

Float：64ビット浮動小数点数。

-   `ID`: A string representing a generic identifier. Compared to the `String` type, an `ID` is not intended to be human-readable.

- `ID`: 汎用の識別子を表す文字列です。`String` 型と比べて、`ID` は人間が読めることを意図していません。

    If the field specification in your schema includes the [`@unique`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique) directive, the identifier must be unique within the current type.

    スキーマのフィールド仕様に[`@unique`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique)ディレクティブが含まれている場合、識別子は現在の型の中で一意でなければなりません。


Fauna provides a unique identifier for a document via the `_id` field, which represents the document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). You would typically use the `ID` type for documents that have an externally-created identifier, such as documents imported from another database).

Faunaでは、ドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を表す`_id`フィールドによって、ドキュメントのユニークな識別子を提供しています。他のデータベースからインポートされたドキュメントなど、外部で作成された識別子を持つドキュメントには、通常 `ID` タイプを使用します。)

-   `Int`: A 32-bit signed decimal integer number.
-   `Long`: A 64-bit signed decimal integer number.
-   `String`: A string of UTF-8 characters.
-   `Time`: A [Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp) value. 


Int：32ビットの符号付き10進整数。
Long：64ビットの符号付き10進整数。
String：UTF-8文字の文字列。
Time：タイムスタンプ値。

The GraphQL API communicates and renders these as strings in the format `yyyy-MM-ddTHH:mm:ss.SSSZ`, but they are stored as FQL timestamps.

GraphQL APIは、これらを通信してフォーマットの文字列としてレンダリングしますが、FQLyyyy-MM-ddTHH:mm:ss.SSSZタイムスタンプとして保存されます。

Fauna provides a document’s most recent modification timestamp via the `_ts` field, which has microsecond resolution.

Faunaは、_tsマイクロ秒の解像度を持つフィールドを介して、ドキュメントの最新の変更タイムスタンプを提供します。

## [](#resources)Resources

For more general information about GraphQL, training, or the specification itself, see these resources:

GraphQLに関するより一般的な情報について 、トレーニング、または仕様自体については、次のリソースを参照してください。

-   [https://graphql.org/](https://graphql.org/)
-   [https://www.howtographql.com/](https://www.howtographql.com/)
-   [https://github.com/graphql/graphql-spec](https://github.com/graphql/graphql-spec)

https://graphql.org/
https://www.howtographql.com/
https://github.com/graphql/graphql-spec

There are a few online, interactive GraphQL interfaces. The one we recommend is [GraphQL Playground](https://graphqlbin.com/v2/). It is embedded into the [Fauna Dashboard](https://dashboard.fauna.com/).

オンラインのインタラクティブなGraphQLインターフェースはいくつかあります。私たちがお勧めするのは、[GraphQL Playground](https://graphqlbin.com/v2/)です。これは[Fauna Dashboard](https://dashboard.fauna.com/)に組み込まれている。

For developers, the Fauna GraphQL API should work with most GraphQL libraries. See the next section for known limitations.

開発者にとって、Fauna GraphQL APIはほとんどで動作するはずです GraphQL ライブラリ。既知の制限については、次のセクションを参照してください。

## [](#limitations)Limitations

制限事項

The Fauna GraphQL API is in its initial release. It is functional, and can handle most GraphQL workloads. However, there are some GraphQL features that are currently not supported:

Fauna GraphQL APIは、初期リリースの状態です。機能的には、ほとんどのGraphQLワークロードを処理することができます。ただし、現在サポートされていないGraphQL機能もあります。

-   Schemas do not support:

スキーマは以下をサポートしていません：

    -   Custom directives
    -   Custom interfaces
    -   Custom scalars
    -   Union types

カスタムディレクティブ
カスタムインターフェイス
カスタムスカラー
共用体タイプ

-   No name can start with an underscore (`_`)

名前をアンダースコア（_）で始めることはできません

-   Subscriptions are not supported.

サブスクリプションはサポートされていません。

Also, Fauna GraphQL API can only work with the defined schema. Any existing collections, indexes, or functions that may exist in a database, that are not referenced in the GraphQL schema, are unavailable to GraphQL queries.

また、Fauna GraphQL APIは定義されたスキーマでのみ動作します。データベースに存在するコレクション、インデックス、関数のうち、GraphQLスキーマで参照されていないものは、GraphQLのクエリでは利用できません。


