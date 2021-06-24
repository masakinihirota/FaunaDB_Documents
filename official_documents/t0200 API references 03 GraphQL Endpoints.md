GraphQL endpoints | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/endpoints

# GraphQL endpoints

GraphQL エンドポイント

The Fauna GraphQL API provides two endpoints:

Fauna GraphQL APIは2つのエンドポイントを提供します。

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

**NOTE**
GraphQL queries are executed by sending HTTP requests to the [`https://graphql.fauna.com/graphql`](#graphql) endpoint. This documentation does not describe how to implement HTTP requests, as you can do so in many different languages. Common GraphQL HTTP request information is available here: [https://graphql.org/learn/serving-over-http/](https://graphql.org/learn/serving-over-http/)

**注意**
GraphQLのクエリは、[`https://graphql.fauna.com/graphql`](#graphql)というエンドポイントにHTTPリクエストを送ることで実行されます。HTTPリクエストはさまざまな言語で実装できるため、このドキュメントではその実装方法については説明しません。一般的なGraphQLのHTTPリクエストの情報はこちらにあります。[https://graphql.org/learn/serving-over-http/](https://graphql.org/learn/serving-over-http/)

## [](#graphql)`https://graphql.fauna.com/graphql`

The `https://graphql.fauna.com/graphql` endpoint access GraphQL queries, and returns results in JSON format. See [Getting started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start), or the [GraphQL tutorials](https://docs.fauna.com/fauna/current/tutorials/graphql/) to see how queries work.

https://graphql.fauna.com/graphql` エンドポイントはGraphQLのクエリにアクセスして、その結果をJSON形式で返します。クエリの仕組みについては、[Getting started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)や[GraphQL tutorials](https://docs.fauna.com/fauna/current/tutorials/graphql/)を参照してください。

## [](#import)`https://graphql.fauna.com/import`

The `https://graphql.fauna.com/import` endpoint accepts a GraphQL schema definition, which is translated into the equivalent Fauna collections and indexes.

`https://graphql.fauna.com/import` エンドポイントには、GraphQLのスキーマ定義が入力され、それがFaunaのコレクションとインデックスに変換されます。

When a GraphQL schema is imported, the GraphQL API automatically creates the following Fauna schema documents:

GraphQLスキーマをインポートすると、GraphQL APIは以下のFaunaスキーマドキュメントを自動的に作成します。

-   One collection for each declared GraphQL type (using the type’s name), but not for [`@embedded`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_embedded) types.

- ただし、[`@embedded`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_embedded)タイプは除く。

-   One index for each declared query (using the query’s name), but not for queries annotated with the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive. The collection name can be specified with [`@collection`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_collection), and the index name can be specified with [`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index).

- ただし、[`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver)ディレクティブでアノテーションされたクエリは除く。コレクション名は [`@collection`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_collection) で指定でき、インデックス名は [`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index) で指定できます。

-   When a [`@relation`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_relation) directive is used and the relationship is many-to-many (instead of one-to-one, or one-to-many), an associative collection is created, as well as three indexes, one for each side of the relationship, and a third indexing the refs of both sides.

- また、[`@relation`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_relation)指令が使われ、関係が多対多（1対1や1対多ではなく）である場合には、連想コレクションが作成され、関係の各側に1つ、両側部のrefに3つ目のインデックスが作成されます。

-   One user-defined function for each mutation declared with the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive (using the resolver name). Note that you have to provide the implementation for the mutation function via FQL yourself. See [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions) for details.

- [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver)ディレクティブで宣言された各変異に対して、1つのユーザー定義関数が作成されます(リゾルバ名を使用)。変異関数の実装は、FQLを使って自分で行わなければならないことに注意してください。詳細は[ユーザー定義関数](https://docs.fauna.com/fauna/current/api/graphql/functions)を参照してください。

**IMPORTANT**
The `https://graphql.fauna.com/import` endpoint is not for importing data, it is only for importing a GraphQL schema. Use GraphQL [mutations](https://graphql.org/learn/queries/#mutations) to create or update data.

**重要**
https://graphql.fauna.com/import` エンドポイントはデータをインポートするためのものではなく、GraphQLスキーマをインポートするためのものです。データの作成や更新にはGraphQLの[mutations](https://graphql.org/learn/queries/#mutations)を使います。

A basic GraphQL schema looks like:

基本的なGraphQLスキーマは次のようなものです。

```
type User {
  username: String!
}

type Query {
  allUsers: [User!]!
}
```

This query defines a `User` type, which would become a collection in Fauna called `User`:

このクエリは `User` というタイプを定義しており、Fauna では `User` というコレクションになります。

```
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

また、ページングされた `User` の結果を提供する `allUsers` クエリも定義されています。Fauna では、このようなクエリを `allUsers` という名前のインデックスとして実装しています。

```
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

スキーマのインポートからレコードの作成、問い合わせまでのエンドツーエンドの例については、[Getting started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)をご覧ください。

### [](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes)Modes

### [](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes)モードについて

There are three import modes:

インポートには3つのモードがあります。

|Mode|Description|
|--|--|
|`merge`|The `merge` mode creates missing collections, indexes, and functions, and annotates existing Fauna schema documents with GraphQL metadata, if required. This is the default mode.<br><br>Since index definitions cannot be edited after an index has been created, `merge` mode reports an error whenever an index definition would need to be modified to support the new schema.<br><br>**NOTE**<br>Since `merge` incorporates a new schema with an existing schema, it is not possible to remove schema elements using `merge`. If removal is required, use `replace` instead.|
|`replace`|The `replace` mode replaces the current GraphQL metadata stored in collections, indexes, functions, and databases. `replace` is especially useful if you need to remove schema elements (type, inputs, etc.). It does not modify the underlying user-created documents in any way. Like `merge` mode, `replace` mode also creates missing collections, indexes, and functions.<br><br>Since index definitions cannot be edited after an index has been created, `replace` mode reports an error whenever an index definition would need to be modified to support the new schema.<br><br>**IMPORTANT**<br>After the schema has been replaced, the underlying data may no longer work with existing queries. Fields that exist in documents that are not declared in the schema are not accessible via GraphQL queries. Fields that have new types may cause existing queries to fail. If you encounter such problems, either update the schema accordingly, or modify the data via `fauna-shell`, Dashboard, or write a transformation script using one of the available [drivers](https://docs.fauna.com/fauna/current/drivers/).|
|`override`|The `override` mode deletes all collections, indexes, and functions that are annotated with GraphQL metadata, pauses 60 seconds to allow all cluster nodes to process the deletions, then it imports the new schema with `merge` mode. Basically, `override` lets you start over with a fresh schema that has no documents.<br><br>The purpose of `override` mode is to make it easy to experiment with varying schemas without having to worry about how to migrate existing documents from the old schema to the new schema.<br><br>**WARNING**<br>`override` mode causes data loss for any previous GraphQL schema. Any collections, indexes, or documents that are not involved in GraphQL are not affected.|

---

|Mode|Description|
|--|--|
|`merge`|`merge`モードは、不足しているコレクション、インデックス、関数を作成し、必要に応じて既存の Fauna スキーマドキュメントに GraphQL メタデータをアノテーションします。<br><br>インデックスが作成された後にインデックス定義を編集することはできないので、`merge`モードでは、新しいスキーマをサポートするためにインデックス定義を修正する必要がある場合には、エラーが報告されます。<br><br>**NOTE**<br>`merge`は既存のスキーマに新しいスキーマを組み込むので、`merge`を使ってスキーマ要素を削除することはできません。削除が必要な場合には、代わりに `replace` を使用してください。
|`replace`|`replace`モードは、コレクション、インデックス、関数、データベースに格納されている現在のGraphQLメタデータを置き換えるものです。`replace`は、スキーマの要素（型、入力など）を削除する必要がある場合に特に有効です。このモードでは、ユーザーが作成した基礎的なドキュメントは一切変更されません。<br><br>インデックスが作成された後、インデックス定義を編集することはできませんので、新しいスキーマをサポートするためにインデックス定義を修正する必要がある場合、`replace`モードはエラーを報告します。<br><br>**重要**<br>スキーマが置換された後、基礎となるデータは既存のクエリで動作しなくなる可能性があります。スキーマで宣言されていないドキュメントに存在するフィールドは、GraphQL クエリではアクセスできません。新しいタイプのフィールドでは、既存のクエリが失敗することがあります。このような問題が発生した場合は、スキーマを適宜更新するか、`fauna-shell` やダッシュボードを使ってデータを修正するか、利用可能な [driver](https://docs.fauna.com/fauna/current/drivers/)のいずれかを使って変換スクリプトを作成してください。
|`override`|`override`モードでは、GraphQLメタデータでアノテーションされたすべてのコレクション、インデックス、関数を削除し、すべてのクラスタノードが削除を処理できるように60秒間待機した後、`merge`モードで新しいスキーマをインポートします。<br><br>`override`モードの目的は、既存のドキュメントを古いスキーマから新しいスキーマに移行する方法を心配することなく、さまざまなスキーマを簡単に試すことができるようにすることです。<br><br>**WARNING**<br>`override`モードでは、以前のGraphQLスキーマのデータが失われます。ただし、GraphQLに関係のないコレクションやインデックス、ドキュメントは影響を受けません。

Specify the mode using a query parameter. For example:

クエリーパラメーターでモードを指定します。例えば、以下のようになります。

```
POST /import?mode=override
```

If you are using `[curl](https://curl.haxx.se/)`, the command would look like:

[curl](https://curl.haxx.se/)`を使用している場合、コマンドは次のようになります。

```
curl -H 'Authorization: Bearer <FAUNA_SECRET>' https://graphql.fauna.com/import?mode=override --data-binary "@path/to/schema.gql"
```

Where `FAUNA_SECRET` is a [secret](https://docs.fauna.com/fauna/current/security/keys) associated with the database where the schema should be imported, and `path/to/schema.gql` is the path to a file containing your GraphQL schema.

ここで、`FAUNA_SECRET`はスキーマをインポートするデータベースに関連する[secret](https://docs.fauna.com/fauna/current/security/keys)、`path/to/schema.gql`はGraphQLスキーマを含むファイルのパスです。

### [](https://docs.fauna.com/fauna/current/api/graphql/endpoints#handling-import-errors)Handling import errors

### [](https://docs.fauna.com/fauna/current/api/graphql/endpoints#handling-import-errors)インポートエラーの処理

When errors are encountered during schema import, they most often involve index definitions. Once an index has been created, its definition cannot be modified. There are two strategies that you can use to resolve the errors:

スキーマのインポート時にエラーが発生した場合、多くはインデックスの定義に関わるものです。インデックスは一度作成するとその定義を変更することはできません。エラーを解決するためには 2 つの方法があります。

1.  Create replacement indexes that provide the appropriate `terms` and `values` definitions. There are two ways to use the replacement indexes:

適切な `terms` と `values` の定義を提供する置換インデックスを作成する。置換インデックスを使用するには2つの方法があります。

a. Renaming the existing index, and then create a new index using the correct definition and the original index name.

既存のインデックスの名前を変更してから、正しい定義と元のインデックス名を使用して新しいインデックスを作成する。

b.  Create the new index with a new name and correct definition, then update your schema using the [`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index) directive.

新しい名前と正しい定義で新しいインデックスを作成し、[`@index`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_index) 指令を使用してスキーマを更新する。

Once you know that the new index works correctly for your queries and mutations, and that the original index is no longer needed, you can delete the original index.

新しいインデックスがクエリや変異に対して正しく動作し、元のインデックスが不要になったことを確認したら、元のインデックスを削除することができます。

2.  Use `override` mode. This deletes all collections, indexes, and functions defined by the current schema, then the new schema is imported creating the necessary collections, indexes, and functions. The drawback is that all documents are deleted.

`override` モードを使用します。このモードでは、現在のスキーマで定義されたすべてのコレクション、インデックス、および関数が削除され、その後、新しいスキーマがインポートされて、必要なコレクション、インデックス、および関数が作成されます。欠点は，すべてのドキュメントが削除されることです。

Note that it is possible for `override` mode to abort with an error. GraphQL schema often require indexes with specific definitions to model relationships between types. When a new schema requires an index, and an index exists with the desired name but an incompatible definition, the GraphQL API aborts `override` mode to avoid interfering with non-GraphQL queries. You would have to assess whether adjusting your schema, or renaming existing indexes and updating FQL queries, was the better approach.

なお、`override`モードはエラーで中断する可能性があります。GraphQLのスキーマでは、型間の関係をモデル化するために、特定の定義を持つインデックスが必要になることがよくあります。新しいスキーマがインデックスを必要としていて、希望する名前のインデックスが存在するが定義に互換性がない場合、GraphQL APIは非GraphQLのクエリとの干渉を避けるために`override`モードを中止します。スキーマを調整するのか、既存のインデックスの名前を変更してFQLクエリを更新するのか、どちらが良い方法なのかを評価する必要があります。

Authentication

認証

Both endpoints require authentication with a specific Fauna database. This is achieved with a standard [Fauna secret](https://docs.fauna.com/fauna/current/security/keys), which determines the database and permissions to be used.

どちらのエンドポイントでも、特定のFaunaデータベースを使った認証が必要です。これは標準の[Fauna secret](https://docs.fauna.com/fauna/current/security/keys)を使って実現され、使用するデータベースとパーミッションを決定します。

The secret can be provided through the HTTP `Authentication` request header, either as a `[Bearer](https://tools.ietf.org/html/rfc6750)` token, or via `[HTTP Basic](https://tools.ietf.org/html/rfc7617)` authentication.

このシークレットは、HTTP `Authentication` リクエストヘッダで、`[Bearer](https://tools.ietf.org/html/rfc6750)` トークンとして提供するか、`[HTTP Basic](https://tools.ietf.org/html/rfc7617)` 認証によって提供することができます。

### [](#bearer-token)Bearer token

### [](#bearer-token)ベアラートークン

To use the Fauna secret as a `[Bearer](https://tools.ietf.org/html/rfc6750)` token, the `Authorization` header should look like:

Fauna のシークレットを `[Bearer](https://tools.ietf.org/html/rfc6750)` トークンとして使用するには、`Authorization` ヘッダーを以下のようにします。

```http
Authorization: Bearer <secret>
```

For example, if your Fauna secret is `fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM`, then your `Authorization` header would look like:

たとえば、Fauna シークレットが `fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM` の場合、`Authorization` ヘッダーは次のようになります。

```http
Authorization: Bearer fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM
```

If you are using `[curl](https://curl.haxx.se/)`, you can specify the `Authorization` header like so:

[curl](https://curl.haxx.se/)`を使用している場合は、`Authorization`ヘッダーを以下のように指定することができます。

terminal

```bash
curl -H 'Authorization: Bearer fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM' ...
```

### [](#http-basic)HTTP Basic

### [](#http-basic)HTTP ベーシック

To use the Fauna secret with `[HTTP Basic](https://tools.ietf.org/html/rfc7617)` authentication, provide the secret as the username value. You do not need to provide a password. Make sure that you encode the credentials into a Base64 string. For example, if your Fauna secret is `fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM`, you can convert it to HTTP Basic credentials like so:

Fauna のシークレットを `[HTTP Basic](https://tools.ietf.org/html/rfc7617)` 認証で使用するには、ユーザー名の値としてシークレットを指定します。パスワードを指定する必要はありません。認証情報をBase64文字列にエンコードすることを確認してください。たとえば、Fauna シークレットが `fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM` の場合、次のように HTTP Basic クレデンシャルに変換できます。

terminal

```bash
echo -n "fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM:" | base64
Zm5BRE14Unp5ZEFUREtpYkdBY2lRbE5RV0JzLUhKZHBKUzF2SmFJTTo=
```

The trailing colon (`:`) is required as it separates the username and password values.

最後のコロン（`:`）は、ユーザー名とパスワードの値を分けるために必要です。

Then your `Authorization` header would look like:

そうすると、`Authorization`ヘッダーは次のようになります。

```http
Authorization: Basic Zm5BRE14Unp5ZEFUREtpYkdBY2lRbE5RV0JzLUhKZHBKUzF2SmFJTTo=
```

`[curl](https://curl.haxx.se/)` automatically performs the Base64 encoding. Use the `-u` flag and specify the secret with a trailing colon:

`[curl](https://curl.haxx.se/)`では、自動的にBase64エンコードを行います。また、`-u` フラグを使い、最後にコロンをつけてシークレットを指定します。

terminal

```bash
curl -u fnADMxRzydATDKibGAciQlNQWBs-HJdpJS1vJaIM: ...
```

### [](#errors)Errors

Authentication errors result in HTTP 401 error responses, with one of the following messages:

認証エラーが発生した場合、HTTP 401エラーレスポンスとなり、以下のいずれかのメッセージが表示されます。

|Error message|Description|
|--|--|
|`Missing authorization header`|The Authorization header was not included in the request.|
|`Invalid authorization header`|The value for the Authorization header has an invalid format.|
|`Invalid database secret`|The database secret decoded from the Authorization header is not valid.|

|Error message|Description|
|--|--|
|`Missing authorization header`|Authorization ヘッダーがリクエストに含まれていませんでした。
|`Invalid authorization header`|Authorizationヘッダーの値のフォーマットが無効です。
|`Invalid database secret`|Authorizationヘッダーからデコードされたデータベースシークレットが無効です。

For the `/graphql` endpoint, the error message is formatted as JSON:

エンドポイントが `/graphql` の場合、エラーメッセージは JSON 形式で表示されます。

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

import` エンドポイントでは、エラーメッセージはプレーンテキストとしてフォーマットされます。

```http
Status: 401
Content-type: text/plain

Invalid database secret.
```

## [](#next-steps)Next steps

-   [Directives](https://docs.fauna.com/fauna/current/api/graphql/directives/)

-   [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)

-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)

## [](#次のステップ)次のステップ

- [指示語](https://docs.fauna.com/fauna/current/api/graphql/directives/)

- [関係](https://docs.fauna.com/fauna/current/api/graphql/relations)

- [ユーザー定義関数](https://docs.fauna.com/fauna/current/api/graphql/functions)

