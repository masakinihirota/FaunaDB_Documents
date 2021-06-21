GraphQL reference | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/

# GraphQL reference

reference
機能や仕様などを網羅的に解説

GraphQL リファレンス

![GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql//../_images/graphql-reference.svg)

This section provides reference information for the Fauna GraphQL API.

このセクションでは、動物相の参照情報を提供します GraphQL API。

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

ステップバイステップの GraphQLチュートリアルは、 チュートリアルセクションにあります。

See [Limits](https://docs.fauna.com/fauna/current/api/limits) for details on document size and transaction limits.

参照制限文書のサイズと取引限度額の詳細については、を。

## [](#supported-scalar-types)Supported scalar types

サポートされているスカラー型

The GraphQL API supports the following built-in types:

GraphQL APIは、次の組み込み型をサポートしています。

-   `Boolean`: A value that represents `true` or `false`.

Boolean：trueまたはを表す値false。

-   `Date`: A [Date](https://docs.fauna.com/fauna/current/api/fql/types#date) value. The GraphQL API communicates and renders these as strings in the format `yyyy-MM-dd`, but they are stored as FQL dates.

Date：日付値。GraphQL APIは、これらを通信してフォーマットの文字列としてレンダリングしますが、FQLyyyy-MM-dd日付として保存されます。

-   `Float`: A 64-bit floating point number.

Float：64ビット浮動小数点数。

-   `ID`: A string representing a generic identifier. Compared to the `String` type, an `ID` is not intended to be human-readable.

ID：総称識別子を表す文字列。Stringタイプと比較して 、anIDは人間が読める形式ではありません。

    If the field specification in your schema includes the [`@unique`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique) directive, the identifier must be unique within the current type.

スキーマのフィールド仕様に@uniqueディレクティブが含まれている 場合、識別子は現在のタイプ内で一意である必要があります。

    Fauna provides a unique identifier for a document via the `_id` field, which represents the document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). You would typically use the `ID` type for documents that have an externally-created identifier, such as documents imported from another database).

動物相は_id 、ドキュメントの参照を表すフィールドを介してドキュメントの一意の識別子を提供します。通常ID、別のデータベースからインポートされたドキュメントなど、外部で作成された識別子を持つドキュメントのタイプを使用します。

-   `Int`: A 32-bit signed decimal integer number.
-   `Long`: A 64-bit signed decimal integer number.
-   `String`: A string of UTF-8 characters.
-   `Time`: A [Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp) value. The GraphQL API communicates and renders these as strings in the format `yyyy-MM-ddTHH:mm:ss.SSSZ`, but they are stored as FQL timestamps.

Int：32ビットの符号付き10進整数。
Long：64ビットの符号付き10進整数。
String：UTF-8文字の文字列。
Time：タイムスタンプ値。GraphQL APIは、これらを通信してフォーマットの文字列としてレンダリングしますが、FQLyyyy-MM-ddTHH:mm:ss.SSSZタイムスタンプとして保存されます。

    Fauna provides a document’s most recent modification timestamp via the `_ts` field, which has microsecond resolution.

動物相は、_tsマイクロ秒の解像度を持つフィールドを介して、ドキュメントの最新の変更タイムスタンプを提供します。

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

オンラインでインタラクティブなものがいくつかあります GraphQLインターフェイス。私たちがお勧めするのはGraphQLPlaygroundです。動物相ダッシュボードに埋め込まれています。

For developers, the Fauna GraphQL API should work with most GraphQL libraries. See the next section for known limitations.

開発者にとって、動物相 GraphQL APIはほとんどで動作するはずです GraphQL ライブラリ。既知の制限については、次のセクションを参照してください。

## [](#limitations)Limitations

制限事項

The Fauna GraphQL API is in its initial release. It is functional, and can handle most GraphQL workloads. However, there are some GraphQL features that are currently not supported:

動物相 GraphQLAPIは最初のリリースです。それは機能的であり、ほとんどを処理することができますGraphQLワークロード。ただし、いくつかありますGraphQL 現在サポートされていない機能：

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

また、動物相 GraphQL APIは、定義されたスキーマでのみ機能します。データベースに存在する可能性があり、データベースで参照されていない既存のコレクション、インデックス、または関数GraphQL スキーマ、利用できません GraphQL クエリ。

