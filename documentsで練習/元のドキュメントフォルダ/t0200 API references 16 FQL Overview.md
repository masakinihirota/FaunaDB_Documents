Fauna Query Language (FQL) | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/

# Fauna Query Language (FQL)

Faunaクエリ言語（FQL）

![Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql//../_images/fauna-query-language.svg)

The Fauna Query Language (FQL) is the native API for querying Fauna. This section provides reference documentation for FQL’s data types and functions.

Faunaクエリ言語（FQL）は、FaunaをクエリするためのネイティブAPIです。このセクションでは、FQLのデータ型と関数のリファレンスドキュメントを提供します。

While not a general-purpose programming language, it provides much of the functionality expected from one. It allows for complex, precise manipulation and retrieval of data stored within Fauna.

汎用プログラミング言語ではありませんが、1つに期待される機能の多くを提供します。これにより、Faunaに保存されているデータの複雑で正確な操作と取得が可能になります。

The language is _expression-oriented_: all [functions](https://docs.fauna.com/fauna/current/api/fql/functions/), control structures, and [Literal](https://docs.fauna.com/fauna/current/api/fql/types#literal) return values. So it is easy, for example, to group multiple results together by combining them into an [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Object](https://docs.fauna.com/fauna/current/api/fql/types#object), or map over a [collection](https://docs.fauna.com/fauna/current/api/fql/collections) and compute a result—possibly fetching more data—for each member.

言語は式指向です：すべての 関数、制御構造、および リテラルの戻り値。そのため、たとえば、複数の結果を配列または オブジェクトに結合してグループ化したり、コレクションにマッピングして各メンバーの結果を計算したり（場合によってはより多くのデータをフェッチしたり）するのは簡単です。

FQL operates primarily on the schema types provided by Fauna, which include [documents](https://docs.fauna.com/fauna/current/api/fql/documents), [collections](https://docs.fauna.com/fauna/current/api/fql/collections), [indexes](https://docs.fauna.com/fauna/current/api/fql/indexes), [sets](https://docs.fauna.com/fauna/current/api/fql/sets), and [databases](https://docs.fauna.com/fauna/current/api/fql/databases).

FQLは主に、ドキュメント、 コレクション、インデックス、セット、データベースなど、 Faunaが提供するスキーマタイプで動作します。

A query is executed by submitting it to a Fauna cluster, which computes and returns the result. Query execution is _transactional_: No changes are committed if something goes wrong. If a query fails, an error response is returned instead of a result.

クエリは、結果を計算して返すFaunaクラスターに送信することによって実行されます。クエリの実行はトランザクションです：問題が発生しても変更はコミットされません。クエリが失敗すると、結果ではなくエラー応答が返されます。

FQL syntax varies with each supported language, as each [language-specific driver](https://docs.fauna.com/fauna/current/drivers/) provides an API that embeds itself into the host language, to make it easier to include local data structures in queries, and for processing query results.

FQL構文は、サポートされている言語ごとに異なります。言語固有の各 ドライバーは、それ自体をホスト言語に埋め込むAPIを提供し、クエリにローカルデータ構造を含めやすくし、クエリ結果を処理しやすくします。

When there are language-specific alternatives for the example queries, use the language switcher at the top of the page to view queries and responses in the selected language.

クエリの例に言語固有の選択肢がある場合は、ページの上部にある言語スイッチャーを使用して、選択した言語でクエリと応答を表示します。

