Create, retrieve, update, and delete documents in Fauna | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/crud?lang=javascript

# Create, retrieve, update, and delete documents in Fauna

Faunaでドキュメントを作成、取得、更新、削除する

Fauna allows you to store documents and query them in a relational fashion. This section walks you through a basic example of creating, retrieving, updating, and deleting (CRUD) documents in Fauna, including working with collections. If you are new to Fauna, make sure to check out our [Glossary](https://docs.fauna.com/fauna/current/glossary) for definitions.

Fauna では、ドキュメントを保存し、リレーショナル方式で照会することができます。このセクションでは、Faunaでドキュメントを作成、取得、更新、削除(CRUD)する基本的な例を、コレクションの操作を含めて説明します。初めてFaunaを使う方は、[Glossary](https://docs.fauna.com/fauna/current/glossary)で定義を確認してください。

## [](#introduction)Introduction

イントロダクション

To demonstrate how to perform CRUD operations in Fauna, we are going to use the example of blog posts: creating blog posts, updating them with additional attributes, and querying for specific posts.

Fauna で CRUD 操作を行う方法を示すために、ブログ記事を例にして説明します。ブログ記事の作成、属性を追加した更新、特定の記事の問い合わせを行います。

The steps are:

手順は以下の通りです。

1.  Make sure that the [Requirements](#requirements) are met.

要件](#requirements)を満たしていることを確認する。

2.  [Create a database](#database).

 データベースの作成](#database)を行います。

3.  [Create a collection](#collection),

コレクションを作成](#コレクション)します。

4.  [Create an index](#index).

インデックスの作成]

5.  [Create a post](#post).

ポストの作成

6.  [Retrieve posts](#retrieve).

投稿を検索する

7.  [Update posts](#update).

投稿の更新

8.  [Delete a post](#delete).

投稿を削除する

We have set up this example so you can follow along from start to finish. Feel free to skip straight to [Create a post](#post) if you are just looking for examples of the create, retrieve, update, and delete process.

この例では、最初から最後まで順を追って説明できるように設定しています。作成、取得、更新、削除のプロセスの例だけを見たい場合は、遠慮なく[Create a post](#post)に進んでください。

## [](#requirements)Requirements

要件

This section walks you through setting up your environment, installing a driver, importing the driver, obtaining an admin key, and instantiating the client.

このセクションでは、環境の設定、ドライバーのインストール、ドライバーのインポート、管理者キーの取得、クライアントのインスタンス化について説明します。

### [](#supported-runtimes)Supported runtimes

サポートされるランタイム

Before you install the driver, it’s important to ensure you’re running a compatible version of the language runtime and have satisfied other dependencies.

ドライバをインストールする前に、互換性のあるバージョンの言語ランタイムを実行していること、およびその他の依存関係を満たしていることを確認することが重要です。

The JavaScript driver is supported on:

JavaScript ドライバは以下のランタイムに対応しています。

-   Node.js

    -   LTS (v12)

    -   Stable (v10+)

-   Chrome

-   Firefox

-   Safari

-   Internet Explorer 11

Currently, the driver is tested on Go versions:

現在、ドライバーはGoバージョンでテストされています。

-   1.11

-   1.12

-   1.13

-   1.14

Compatible with:

と互換性があります。

-   Mono (on macOS or Linux)

Shared

共有

-   [Jackson](https://github.com/FasterXML/jackson) for JSON parsing.

JSONの解析には[Jackson](https://github.com/FasterXML/jackson)を使用しています。

-   [Jackson](https://github.com/FasterXML/jackson) for JSON parsing.

 JSONの解析には[Jackson](https://github.com/FasterXML/jackson)を使用しています。

Scala

-   Scala 2.11.x

-   Scala 2.12.x

The following versions of Python are supported:

以下のバージョンのPythonをサポートしています。

-   Python 2.7

-   Python 3.3

-   Python 3.4

-   Python 3.5

-   Python 3.6

-   Python 3.7

-   Python 3.8

### [](#install-the-driver)Install the driver

ドライバーをインストールします。

Node.js

To install the JavaScript driver, run this command in the terminal:

JavaScript ドライバをインストールするには、ターミナルで次のコマンドを実行します。

terminal

```bash
npm install --save faunadb
```

See [`faunadb` on NPM](https://npmjs.com/package/faunadb) for more information. Note that not all Node.js/serverless environments are supported.

詳細は[`faunadb` on NPM](https://npmjs.com/package/faunadb)を参照してください。なお、すべてのNode.js/サーバーレス環境に対応しているわけではありません。

Browsers

The JavaScript driver can be included via CDN:

JavaScriptドライバはCDN経由でインクルードすることができます。

html

```html
<script src="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb.js"></script>
```

The minified version of the driver can also be used via CDN:

また、CDNを介してminifyされたドライバーを利用することもできます。

html

```html
<script src="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb-min.js"></script>
```

See the driver’s repository for more details: [fauna/faunadb-js](https://github.com/fauna/faunadb-js)

詳細はドライバのリポジトリを参照してください。[fauna/faunadb-js](https://github.com/fauna/faunadb-js)

To install the Go driver, run this in the terminal:

Go ドライバをインストールするには、ターミナルで次のように実行します。

terminal

```bash
go get github.com/fauna/faunadb-go/{driver-go-get)/faunadb
```

First install the Nuget package by adding the package reference to your MSBuild project:

まず、MSBuildプロジェクトにパッケージ参照を追加して、Nugetパッケージをインストールします。

```xml
<PackageReference Include="FaunaDB.Client" Version="4.0.0" />
```

or by using your IDE and searching for `FaunaDB.Client`.

または、お使いの IDE で `FaunaDB.Client` を検索してください。

Download from the Maven central repository:

Maven セントラル リポジトリからダウンロードします。

`faunadb-java/pom.xml`

```xml
<dependencies>
  ...
  <dependency>
    <groupId>com.faunadb</groupId>
    <artifactId>faunadb-java</artifactId>
    <version>4.1.1</version>
    <scope>compile</scope>
  </dependency>
  ...
</dependencies>
```

`faunadb-scala/sbt`

terminal

```bash
pip install faunadb
```

### [](#import-the-driver)Import the driver

ドライバのインポート

Import the client and the query language helpers.

クライアントと問い合わせ言語ヘルパーをインポートします。

We recommend that you import this driver with an alias import such as:

このドライバーのインポートには、次のようなエイリアスインポートを行うことをお勧めします。

javascript

```javascript
var faunadb = require('faunadb')
var q = faunadb.query;
```

This is the recommended require stanza. The `faunadb.query` module contains all of the functions to create Fauna query expressions.

これは推奨される require stanza です。faunadb.query` モジュールには、Fauna のクエリ式を作成するためのすべての関数が含まれています。

Similarly with ES6 modules:

ES6 モジュールと同様です。

javascript

```javascript
import faunadb, { query as q } from "faunadb"
```

The CDN package exposes a global `faunadb` variable.

CDN パッケージでは、グローバル変数 `faunadb` を公開しています。

### [](#obtain-an-admin-key)Obtain an admin key

管理者キーの取得

To follow along, you need an admin key, which you can create using the [Fauna Dashboard](https://dashboard.fauna.com/).

Fauna Dashboard](https://dashboard.fauna.com/)で作成できる管理者キーが必要です。

### [](#instantiate-an-admin-client)Instantiate an admin client

アドミンクライアントをインスタンス化します。

javascript

```javascript
var adminClient = new faunadb.Client({ secret: 'YOUR_FAUNADB_ADMIN_SECRET' });
```

## [](#database)Create a database

Create a database called `my_app` in Fauna:

Fauna で `my_app` というデータベースを作成します。

```javascript
adminClient.query(
  q.CreateDatabase({ name: 'my_app' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Database("my_app"),
  ts: 1622574499020000,
  name: 'my_app',
  global_id: 'yoijzam91ybyy'
}
```

```javascript
adminClient.query(
  q.CreateKey({
    database: q.Database('my_app'),
    role: 'server',
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Keys(), "300223718348554752"),
  ts: 1622574499380000,
  database: Database("my_app"),
  role: 'server',
  secret: 'fnAEKpvhlVACAGnxyrjFa-zJiNatObJjyXFc3V8L',
  hashed_secret: '$2a$05$mCeHKqZYZHN5.MGC6RIIRO3M7JSt6UHmoziYWRzezBHrpuUiEdRFi'
}
```

```

javascript

```javascript
var serverClient = new faunadb.Client({ secret: 'YOUR_FAUNADB_SERVER_SECRET' });
```

## [](#collection)Create a collection

Fauna stores documents in the form of nested containers. A database contains collections, and collections contain documents. Each [document](https://docs.fauna.com/fauna/current/glossary#Document) belongs to a specific collection. So in order to create a document for a post, we need to first create a collection for posts.

Faunaは、入れ子構造のコンテナの形でドキュメントを保存します。データベースはコレクションを含み、コレクションはドキュメントを含みます。各[ドキュメント](https://docs.fauna.com/fauna/current/glossary#Document)は、特定のコレクションに属します。つまり、投稿用のドキュメントを作成するには、まず投稿用のコレクションを作成する必要があります。

Create a collection using the `CreateCollection` function with a `param_object` containing the `name` of the collection. We shall name our collection "Posts":

コレクションを作成するには、`CreateCollection`関数を使い、コレクションの`名前`を含む`param_object`を指定します。ここではコレクションの名前を "Posts "とします。

```javascript
serverClient.query(
  q.CreateCollection({ name: 'Posts' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Collection("Posts"),
  ts: 1622574499730000,
  history_days: 30,
  name: 'Posts'
}
```

```javascript
serverClient.query(
  q.CreateIndex({
    name: 'posts_by_title',
    source: q.Collection('Posts'),
    terms: [{ field: ['data', 'title'] }],
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("posts_by_title"),
  ts: 1622574500130000,
  active: true,
  serialized: true,
  name: 'posts_by_title',
  source: Collection("Posts"),
  terms: [ { field: [ 'data', 'title' ] } ],
  partitions: 1
}
```

```javascript
serverClient.query(
  q.CreateIndex({
    name: 'posts_by_tags_with_title',
    source: q.Collection('Posts'),
    terms: [{ field: ['data', 'tags'] }],
    values: [{ field: ['data', 'title'] }],
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("posts_by_tags_with_title"),
  ts: 1622574500460000,
  active: true,
  serialized: true,
  name: 'posts_by_tags_with_title',
  source: Collection("Posts"),
  terms: [ { field: [ 'data', 'tags' ] } ],
  values: [ { field: [ 'data', 'title' ] } ],
  partitions: 1
}
```

```javascript
serverClient.query(
  q.Create(
    q.Collection('Posts'),
    { data: { title: 'What I had for breakfast ..' } },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "300223719783006720"),
  ts: 1622574500780000,
  data: { title: 'What I had for breakfast ..' }
}
```

```javascript
serverClient.query(
  q.Create(
    q.Ref(q.Collection('Posts'), '1'),
    { data: { title: 'The first post' } },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574501060000,
  data: { title: 'The first post' }
}
```

```javascript
serverClient.query(
  q.Map(
    [
      'My cat and other marvels',
      'Pondering during a commute',
      'Deep meanings in a latte',
    ],
    q.Lambda(
      'post_title',
      q.Create(
        q.Collection('Posts'),
        { data: { title: q.Var('post_title') } },
      )
    ),
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[
  {
    ref: Ref(Collection("Posts"), "300223720476115456"),
    ts: 1622574501410000,
    data: { title: 'My cat and other marvels' }
  },
  {
    ref: Ref(Collection("Posts"), "300223720476116480"),
    ts: 1622574501410000,
    data: { title: 'Pondering during a commute' }
  },
  {
    ref: Ref(Collection("Posts"), "300223720476117504"),
    ts: 1622574501410000,
    data: { title: 'Deep meanings in a latte' }
  }
]
```

```javascript
serverClient.query(
  q.Get(q.Ref(q.Collection('Posts'), '1'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574501060000,
  data: { title: 'The first post' }
}
```

```javascript
serverClient.query(
  q.Get(
    q.Match(q.Index('posts_by_title'), 'My cat and other marvels')
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "300223720476115456"),
  ts: 1622574501410000,
  data: { title: 'My cat and other marvels' }
}
```

```javascript
serverClient.query(
  q.Update(
    q.Ref(q.Collection('Posts'), '1'),
    { data: { tags: ['welcome', 'short'] } },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574502370000,
  data: { title: 'The first post', tags: [ 'welcome', 'short' ] }
}
```

```javascript
serverClient.query(
  q.Replace(
    q.Ref(q.Collection('Posts'), '1'),
    { data: { title: 'The replacement first post' } },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574502680000,
  data: { title: 'The replacement first post' }
}
```

```javascript
serverClient.query(
  q.Delete(q.Ref(q.Collection('Posts'), '1'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574502680000,
  data: { title: 'The replacement first post' }
}
```

```javascript
serverClient.query(
  q.Get(q.Ref(q.Collection('Posts'), '1'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Error: [NotFound: instance not found] {
  description: 'Document not found.',
  requestResult: [RequestResult]
}
```
