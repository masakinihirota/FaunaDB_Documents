GraphQL endpoints | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/endpoints

# GraphQL endpoints

GraphQL エンドポイント

The Fauna GraphQL API provides two endpoints:

動物相 GraphQL APIは2つのエンドポイントを提供します。

|Endpoint|Description|
|---|---|
|[`https://graphql.fauna.com/graphql`](#graphql)|Accepts and executes GraphQL queries, and returns the results.|
|[`https://graphql.fauna.com/import`](#import)|Accepts and imports a GraphQL schema.|

|Endpoint|Description|
|---|---|
|[`https://graphql.fauna.com/graphql`](#graphql)|GraphQLのクエリを受け取り、実行し、その結果を返す。|
|[`https://graphql.fauna.com/import`](#import)|GraphQLスキーマを受け入れ、インポートします。|

These endpoints are hosted at [https://graphql.fauna.com/](https://graphql.fauna.com/).

これらのエンドポイントはhttps://graphql.fauna.com/でホストされています。

GraphQL queries are executed by sending HTTP requests to the [`https://graphql.fauna.com/graphql`](#graphql) endpoint. This documentation does not describe how to implement HTTP requests, as you can do so in many different languages. Common GraphQL HTTP request information is available here: [https://graphql.org/learn/serving-over-http/](https://graphql.org/learn/serving-over-http/)

注意
GraphQLクエリは、https://graphql.fauna.com/graphqlエンドポイントにHTTPリクエストを送信することで実行され ます。このドキュメントでは、さまざまな言語で実装できるため、HTTPリクエストの実装方法については説明していません。一般GraphQLHTTPリクエスト情報はこちらから入手できます：https：//graphql.org/learn/serving-over-http/

## [](#graphql)`https://graphql.fauna.com/graphql`

The `https://graphql.fauna.com/graphql` endpoint access GraphQL queries, and returns results in JSON format. See [Getting started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start), or the [GraphQL tutorials](https://docs.fauna.com/fauna/current/tutorials/graphql/) to see how queries work.

https://graphql.fauna.com/graphqlエンドポイントアクセスGraphQL クエリを実行し、結果を返します JSONフォーマット。参照してください GraphQL入門、または GraphQLチュートリアルのクエリがどのように機能するかを確認するために。

## [](#import)`https://graphql.fauna.com/import`

The `https://graphql.fauna.com/import` endpoint accepts a GraphQL schema definition, which is translated into the equivalent Fauna collections and indexes.

https://graphql.fauna.com/importエンドポイントが受け入れGraphQL スキーマ定義。これは、同等の動物相コレクションとインデックスに変換されます。

When a GraphQL schema is imported, the GraphQL API automatically creates the following Fauna schema documents:

いつ GraphQL スキーマがインポートされ、 GraphQL APIは、次の動物相スキーマドキュメントを自動的に作成します。

-   One collection for each declared GraphQL type (using the type’s name), but not for [`@embedded`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_embedded) types.

宣言されたコレクションごとに1つのコレクション GraphQLタイプ（タイプの名前を使用）。ただし、タイプには使用できません@embedded 。

-   One index for each declared query (using the query’s name), but not for queries annotated with the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive. The collection name can be specified with [`@collection`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_collection), and the index name can be specified with [`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index).

宣言されたクエリごとに1つのインデックス（クエリの名前を使用）。ただし、@resolverディレクティブで注釈が付けられたクエリには対応しません 。コレクション名は 。@collectionで指定でき、インデックス名は@index。で指定できます 。

-   When a [`@relation`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_relation) directive is used and the relationship is many-to-many (instead of one-to-one, or one-to-many), an associative collection is created, as well as three indexes, one for each side of the relationship, and a third indexing the refs of both sides.

場合@relationディレクティブを使用し、関係が連想コレクションが作成され、（代わりに一対一または一対多の）多対多で、ならびに3つのインデックス、関係の各側用であります、および両側の参照にインデックスを付ける3番目。

-   One user-defined function for each mutation declared with the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive (using the resolver name). Note that you have to provide the implementation for the mutation function via FQL yourself. See [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions) for details.

@resolver（リゾルバー名を使用して）ディレクティブで宣言されたミューテーションごとに1つのユーザー定義関数 。FQLを介してミューテーション関数の実装を自分で提供する必要があることに注意してください。詳細については、 ユーザー定義関数を参照してください。

The `https://graphql.fauna.com/import` endpoint is not for importing data, it is only for importing a GraphQL schema. Use GraphQL [mutations](https://graphql.org/learn/queries/#mutations) to create or update data.

重要
https://graphql.fauna.com/importエンドポイントは、データをインポートするためではない、それだけでAをインポートするためのものですGraphQLスキーマ。使用する GraphQL データを作成または更新するためのミューテーション。

A basic GraphQL schema looks like:

基本的な GraphQL スキーマは次のようになります。

graphql

```graphql
type User {
  username: String!
}

type Query {
  allUsers: [User!]!
}
```

This query defines a `User` type, which would become a collection in Fauna called `User`:

このクエリは、次のUserように呼ばれる動物相のコレクションになるタイプを定義しますUser。

```javascript
Get(Collection("User"))
{
  ref: Collection("User"),
  ts: 1618959271660000,
  history_days: 30,
  name: "User",
  data: {
    gql: {
      ts: Time("2021-04-20T22:54:31.557442Z"),
      meta: {
        name: "User",
        fields: [
          {
            name: "username",
            type: {
              NotNull: {
                Named: "String"
              }
            }
          }
        ],
        directives: [
          {
            name: "collection",
            args: {
              name: "User"
            }
          }
        ]
      }
    }
  }
}
```

It also defines an `allUsers` query that provides paginated `User` results. Fauna implements such a query as an index called `allUsers`:

また、allUsersページ付けされたUser 結果を提供するクエリも定義します。動物相は、次のようなインデックスとしてクエリを実装しますallUsers。

```javascript
Get(Index("allUsers"))
{
  ref: Index("allUsers"),
  ts: 1618959271800000,
  active: true,
  serialized: true,
  name: "allUsers",
  source: Collection("User"),
  data: {
    gql: {
      ts: Time("2021-04-20T22:54:31.700473Z"),
      meta: {
        name: "allUsers",
        directives: [
          {
            name: "index",
            args: {
              name: "allUsers"
            }
          }
        ],
        type: {
          NotNull: {
            List: {
              NotNull: {
                Named: "User"
              }
            }
          }
        }
      }
    }
  },
  unique: false,
  partitions: 8
}
```

For end-to-end examples of importing a schema, creating records, and querying them, see [Getting started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start).

スキーマのインポート、レコードの作成、およびそれらのクエリのエンドツーエンドの例については、「GraphQL入門」を参照 してください。

### [](#modes)Modes

There are three import modes:

3つのインポートモードがあります。

Mode

`merge`

The `merge` mode creates missing collections, indexes, and functions, and annotates existing Fauna schema documents with GraphQL metadata, if required. This is the default mode.

このmergeモードでは、欠落しているコレクション、インデックス、および関数が作成され、既存の動物相スキーマドキュメントに注釈が付けられます。GraphQL必要に応じてメタデータ。これがデフォルトのモードです。

Since index definitions cannot be edited after an index has been created, `merge` mode reports an error whenever an index definition would need to be modified to support the new schema.

インデックスの作成後はインデックス定義を編集できないmergeため、新しいスキーマをサポートするためにインデックス定義を変更する必要がある場合は常に、モードでエラーが報告されます。

注意
Since `merge` incorporates a new schema with an existing schema, it is not possible to remove schema elements using `merge`. If removal is required, use `replace` instead.

以来merge、既存のスキーマを使用して新しいスキーマが組み込まれ、使用してスキーマ要素を削除することはできませんmerge。取り外しが必要な場合は、replace代わりに使用してください。

---

`replace`

The `replace` mode replaces the current GraphQL metadata stored in collections, indexes, functions, and databases. `replace` is especially useful if you need to remove schema elements (type, inputs, etc.). It does not modify the underlying user-created documents in any way. Like `merge` mode, `replace` mode also creates missing collections, indexes, and functions.

	
replaceモードは、電流を置き換えますGraphQLコレクション、インデックス、関数、およびデータベースに格納されているメタデータ。replaceスキーマ要素（タイプ、入力など）を削除する必要がある場合に特に役立ちます。基になるユーザー作成ドキュメントは変更されません。mergeモードと同様に、replaceモードでも不足しているコレクション、インデックス、および関数が作成されます。

Since index definitions cannot be edited after an index has been created, `replace` mode reports an error whenever an index definition would need to be modified to support the new schema.

インデックスの作成後はインデックス定義を編集できないreplaceため、新しいスキーマをサポートするためにインデックス定義を変更する必要がある場合は常に、モードでエラーが報告されます。

重要

After the schema has been replaced, the underlying data may no longer work with existing queries. Fields that exist in documents that are not declared in the schema are not accessible via GraphQL queries. Fields that have new types may cause existing queries to fail. If you encounter such problems, either update the schema accordingly, or modify the data via `fauna-shell`, Dashboard, or write a transformation script using one of the available [drivers](https://docs.fauna.com/fauna/current/drivers/).

スキーマが置き換えられると、基になるデータが既存のクエリで機能しなくなる可能性があります。スキーマで宣言されていないドキュメントに存在するフィールドには、GraphQLクエリ。新しいタイプのフィールドがあると、既存のクエリが失敗する可能性があります。このような問題が発生した場合は、それに応じてスキーマを更新するかfauna-shell、ダッシュボードを介してデータを変更するか、使用可能なドライバーの1つを使用して変換スクリプトを記述して ください。

`override`

The `override` mode deletes all collections, indexes, and functions that are annotated with GraphQL metadata, pauses 60 seconds to allow all cluster nodes to process the deletions, then it imports the new schema with `merge` mode. Basically, `override` lets you start over with a fresh schema that has no documents.

このoverrideモードでは、注釈が付けられたすべてのコレクション、インデックス、および関数が削除されますGraphQLメタデータは、60秒間一時停止して、すべてのクラスターノードが削除を処理できるようにしmergeます。その後、モードを使用して新しいスキーマをインポートします。基本的に、overrideドキュメントのない新しいスキーマからやり直すことができます。

The purpose of `override` mode is to make it easy to experiment with varying schemas without having to worry about how to migrate existing documents from the old schema to the new schema.

overrideモードの目的は、既存のドキュメントを古いスキーマから新しいスキーマに移行する方法を気にすることなく、さまざまなスキーマを簡単に試すことができるようにすることです。

警告

`override` mode causes data loss for any previous GraphQL schema. Any collections, indexes, or documents that are not involved in GraphQL are not affected.

override モードは以前のデータ損失を引き起こします GraphQL スキーマ。関係のないコレクション、インデックス、またはドキュメントGraphQL 影響を受けません。

Specify the mode using a query parameter. For example:

クエリパラメータを使用してモードを指定します。例えば：

```http
POST /import?mode=override
```

If you are using `[curl](https://curl.haxx.se/)`, the command would look like:

を使用しているcurl場合、コマンドは次のようになります。

terminal

```bash
curl -H 'Authorization: Bearer <FAUNA_SECRET>' https://graphql.fauna.com/import?mode=override --data-binary "@path/to/schema.gql"
```

Where `FAUNA_SECRET` is a [secret](https://docs.fauna.com/fauna/current/security/keys) associated with the database where the schema should be imported, and `path/to/schema.gql` is the path to a file containing your GraphQL schema.

スキーマをインポートするデータベースに関連付けられてFAUNA_SECRETいるシークレットはどこにあり、path/to/schema.gqlを含むファイルへのパスはどこにありますか GraphQL スキーマ。

### [](#handling-import-errors)Handling import errors

インポートエラーの処理

When errors are encountered during schema import, they most often involve index definitions. Once an index has been created, its definition cannot be modified. There are two strategies that you can use to resolve the errors:

スキーマのインポート中にエラーが発生した場合、ほとんどの場合、インデックス定義が関係しています。インデックスが作成されると、その定義を変更することはできません。エラーを解決するために使用できる2つの戦略があります。

1.  Create replacement indexes that provide the appropriate `terms` and `values` definitions. There are two ways to use the replacement indexes:

適切な提供交換用インデックス作成 termsとvalues定義を。置換インデックスを使用するには、次の2つの方法があります。

    1.  Renaming the existing index, and then create a new index using the correct definition and the original index name.

既存のインデックスの名前を変更してから、正しい定義と元のインデックス名を使用して新しいインデックスを作成します。

    2.  Create the new index with a new name and correct definition, then update your schema using the [`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index) directive.

新しい名前と正しい定義で新しいインデックスを作成してから、@index ディレクティブを使用してスキーマを更新します。

    Once you know that the new index works correctly for your queries and mutations, and that the original index is no longer needed, you can delete the original index.

新しいインデックスがクエリとミューテーションに対して正しく機能し、元のインデックスが不要になったことを確認したら、元のインデックスを削除できます。

2.  Use `override` mode. This deletes all collections, indexes, and functions defined by the current schema, then the new schema is imported creating the necessary collections, indexes, and functions. The drawback is that all documents are deleted.

overrideモードを使用します。これにより、現在のスキーマで定義されているすべてのコレクション、インデックス、および関数が削除され、新しいスキーマがインポートされて、必要なコレクション、インデックス、および関数が作成されます。欠点は、すべてのドキュメントが削除されることです。

    Note that it is possible for `override` mode to abort with an error. GraphQL schema often require indexes with specific definitions to model relationships between types. When a new schema requires an index, and an index exists with the desired name but an incompatible definition, the GraphQL API aborts `override` mode to avoid interfering with non-GraphQL queries. You would have to assess whether adjusting your schema, or renaming existing indexes and updating FQL queries, was the better approach.

overrideモードがエラーで中止される可能性があることに注意してください。 GraphQLスキーマでは、タイプ間の関係をモデル化するために、特定の定義を持つインデックスが必要になることがよくあります。新しいスキーマにインデックスが必要であり、インデックスが目的の名前で存在するが定義に互換性がない場合、GraphQLAPIは、overrideGraphQL以外のクエリへの干渉を回避するために、モードを中止します。スキーマを調整するか、既存のインデックスの名前を変更してFQLクエリを更新することが、より良いアプローチであるかどうかを評価する必要があります。

## [](#authentication)Authentication

認証

Both endpoints require authentication with a specific Fauna database. This is achieved with a standard [Fauna secret](https://docs.fauna.com/fauna/current/security/keys), which determines the database and permissions to be used.

両方のエンドポイントは、特定の動物相データベースによる認証を必要とします。これは、使用するデータベースと権限を決定する標準の 動物相シークレットを使用して実現されます。

The secret can be provided through the HTTP `Authentication` request header, either as a `[Bearer](https://tools.ietf.org/html/rfc6750)` token, or via `[HTTP Basic](https://tools.ietf.org/html/rfc7617)` authentication.

シークレットはAuthentication、Bearerトークンとして、またはHTTP Basic認証を介して、HTTPリクエストヘッダーを介して提供できます。

### [](#bearer-token)Bearer token

ベアラートークン

To use the Fauna secret as a `[Bearer](https://tools.ietf.org/html/rfc6750)` token, the `Authorization` header should look like:

動物相の秘密をBearerトークンとして使用するには、Authorization ヘッダーは次のようになります。

```http
Authorization: Bearer <secret>
```

For example, if your Fauna secret is `fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM`, then your `Authorization` header would look like:

たとえば、動物相の秘密が fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIMである場合、Authorization ヘッダーは次のようになります。

```http
Authorization: Bearer fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM
```

If you are using `[curl](https://curl.haxx.se/)`, you can specify the `Authorization` header like so:

を使用している場合はcurl、次のAuthorizationようにヘッダーを指定できます。

terminal

```bash
curl -H 'Authorization: Bearer fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM' ...
```

### [](#http-basic)HTTP Basic

HTTPベーシック

To use the Fauna secret with `[HTTP Basic](https://tools.ietf.org/html/rfc7617)` authentication, provide the secret as the username value. You do not need to provide a password. Make sure that you encode the credentials into a Base64 string. For example, if your Fauna secret is `fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM`, you can convert it to HTTP Basic credentials like so:

HTTP Basic認証で動物相シークレットを使用するには、ユーザー名の値としてシークレットを指定します。パスワードを入力する必要はありません。クレデンシャルをBase64文字列にエンコードしていることを確認してください。たとえば、動物相の秘密がfnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIMである場合、次のようにHTTP基本認証に変換できます。

terminal

```bash
echo -n "fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM:" | base64
Zm5BRE14Unp5ZEFUREtpYkdBY2lRbE5RV0JzLUhKZHBKUzF2SmFJTTo=
```

The trailing colon (`:`) is required as it separates the username and password values.

末尾のコロン（:）は、ユーザー名とパスワードの値を区切るために必要です。

Then your `Authorization` header would look like:

その場合、Authorizationヘッダーは次のようになります。

```http
Authorization: Basic Zm5BRE14Unp5ZEFUREtpYkdBY2lRbE5RV0JzLUhKZHBKUzF2SmFJTTo=
```

`[curl](https://curl.haxx.se/)` automatically performs the Base64 encoding. Use the `-u` flag and specify the secret with a trailing colon:

curlBase64エンコーディングを自動的に実行します。-uフラグを使用し、末尾にコロンを付けてシークレットを指定します。

terminal

```bash
curl -u fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM: ...
```

### [](#errors)Errors

エラー

Authentication errors result in HTTP 401 error responses, with one of the following messages:

認証エラーにより、HTTP 401エラー応答が発生し、次のいずれかのメッセージが表示されます。

  

|Error message|Description|
|---|---|
|`Missing authorization header`|The Authorization header was not included in the request.|
|`Invalid authorization header`|The value for the Authorization header has an invalid format.|
|`Invalid database secret`|The database secret decoded from the Authorization header is not valid.|

|Error message|説明|
|---|---|
|`Missing authorization header`|Authorizationヘッダーがリクエストに含まれていませんでした。|
|`Invalid authorization header`|Authorizationヘッダーの値のフォーマットが不正です。|
|`Invalid database secret`|Authorizationヘッダーからデコードされたデータベースシークレットが有効でない。|

For the `/graphql` endpoint, the error message is formatted as JSON:

以下のために/graphql、エンドポイント、エラーメッセージは、JSONとしてフォーマットされます。

```http
Status: 200
Content-type: application/json

{
  "errors": [
    { "message": "Invalid database secret." }
  ]
}
```

For the `/import` endpoint, the error message is formatted as plain text:

以下のため/importのエンドポイント、エラーメッセージがプレーンテキストとしてフォーマットされます。

```http
Status: 401
Content-type: text/plain

Invalid database secret.
```

## [](#next-steps)Next steps

次のステップ

-   [Directives](https://docs.fauna.com/fauna/current/api/graphql/directives/)
-   [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)
-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)

指令
関係
ユーザー定義関数