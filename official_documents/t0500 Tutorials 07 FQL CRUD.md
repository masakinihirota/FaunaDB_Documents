Create, retrieve, update, and delete documents in Fauna | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/crud?lang=javascript

# Create, retrieve, update, and delete documents in Fauna

Fauna でドキュメントを作成、取得、更新、削除する

Fauna allows you to store documents and query them in a relational fashion. 

fashion
流儀

Faunaでは、ドキュメントを保存し、リレーショナルな方法でクエリを実行することができます。

This section walks you through a basic example of creating, retrieving, updating, and deleting (CRUD) documents in Fauna, including working with collections. If you are new to Fauna, make sure to check out our [Glossary](https://docs.fauna.com/fauna/current/glossary) for definitions.

walk 
案内する

retrieving
retrieveの現在分詞
(…を)取り戻す、 回収する 取得する

make sure
確認する 確かめる

make sure to
ようにする

check out
確認する 確かめる

working
実際(の工作)に役立つ、実用的な

このセクションでは、Fauna でドキュメントを作成、取得、更新、削除(CRUD)する基本的な例を、コレクションの操作を含めて説明します。初めて Fauna を使う方は、[Glossary](https://docs.fauna.com/fauna/current/glossary)で定義を確認してください。

## [](#introduction)Introduction

イントロダクション

To demonstrate how to perform CRUD operations in Fauna, we are going to use the example of blog posts: creating blog posts, updating them with additional attributes, and querying for specific posts.

how to perform
実行方法

FaunaでCRUD操作を行う方法を説明するために、ブログ記事を例にして、ブログ記事の作成、属性を追加した更新、特定の記事の問い合わせを行います。

The steps are:

手順は以下の通りです。

1.  Make sure that the [Requirements](#requirements) are met.
2.  [Create a database](#database).
3.  [Create a collection](#collection),
4.  [Create an index](#index).
5.  [Create a post](#post).
6.  [Retrieve posts](#retrieve).
7.  [Update posts](#update).
8.  [Delete a post](#delete).

met
meet 過去形 過去分詞
〈必要 義務 要求などに〉応じる，〈…を〉満たす.

要件 (#requirements)を満たしていることを確認する。
データベースの作成 (#database)を行います。
コレクションを作成 (#コレクション)します。
インデックスの作成
ポストの作成
投稿を検索する
投稿の更新
投稿を削除する

We have set up this example so you can follow along from start to finish.

follow along
順を追って

この例では、最初から最後まで順を追って説明できるように設定しています。

Feel free to skip straight to [Create a post](#post) if you are just looking for examples of the create, retrieve, update, and delete process.

Feel free to 
お好みでどうぞ、遠慮なく･･･する、遠慮なく･･･する

作成、取得、更新、削除のプロセスの例だけを見たい場合は、遠慮なく[Create a post](#post)に進んでください。

## [](#requirements)Requirements

要件

This section walks you through setting up your environment, installing a driver, importing the driver, obtaining an admin key, and instantiating the client.

instantiating
インスタンスを生成する、例示する

このセクションでは、環境の設定、ドライバーのインストール、ドライバーのインポート、管理者キーの取得、クライアントのインスタンス化について説明します。

### [](#supported-runtimes)Supported runtimes

サポートされるランタイム

Before you install the driver, it’s important to ensure you’re running a compatible version of the language runtime and have satisfied other dependencies.

ensure
確実にする、保証する、確保する

satisfied
満たす

compatible
互換性がある 相性が良い

runtime
実行時 ＜＝＞ 開発時、コンパイル時

ドライバをインストールする前に、互換性のあるバージョンの言語ランタイムを実行していること、およびその他の依存関係を満たしていることを確認してください。

The JavaScript driver is supported on:

JavaScript ドライバは以下のランタイムに対応しています。

- Node.js
  - LTS (v12)
  - Stable (v10+)
- Chrome
- Firefox
- Safari
- Internet Explorer 11

Currently, the driver is tested on Go versions:

現在、ドライバーは Go バージョンでテストされています。

- 1.11
- 1.12
- 1.13
- 1.14

Compatible with:

と互換性があります。

- Mono (on macOS or Linux)

Shared

共有

- [Jackson](https://github.com/FasterXML/jackson) for JSON parsing.

JSON の解析には[Jackson](https://github.com/FasterXML/jackson)を使用しています。

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

詳細は[`faunadb` on NPM](https://npmjs.com/package/faunadb)を参照してください。なお、すべての Node.js/サーバーレス環境に対応しているわけではありません。

Browsers

The JavaScript driver can be included via CDN:

JavaScript ドライバは CDN 経由でインクルードすることができます。

html

```html
<script src="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb.js"></script>
```

The minified version of the driver can also be used via CDN:

また、CDN を介して minify されたドライバーを利用することもできます。

html

```html
<script src="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb-min.js"></script>
```

See the driver’s repository for more details: [fauna/faunadb-js](https://github.com/fauna/faunadb-js)

詳細はドライバのリポジトリを参照してください。[fauna/faunadb-js](https://github.com/fauna/faunadb-js)

### [](#import-the-driver)Import the driver

ドライバのインポート

Import the client and the query language helpers.

クライアントと問い合わせ言語ヘルパーをインポートします。

We recommend that you import this driver with an alias import such as:

このドライバーのインポートには、次のようなエイリアスインポートを行うことをお勧めします。

such as
例えば～,～といった

```javascript
var faunadb = require("faunadb");
var q = faunadb.query;
```

This is the recommended require stanza. The `faunadb.query` module contains all of the functions to create Fauna query expressions.

stanza
一区切り、1カ所での興行期間◆【略】st.
？？？ 節 連

expressions
式、表現

これは推奨される require stanza です。`faunadb.query` モジュールには、Fauna のクエリ式を作成するためのすべての関数が含まれています。

Similarly with ES6 modules:

ES6 モジュールと同様です。

```javascript
import faunadb, { query as q } from "faunadb";
```

The CDN package exposes a global `faunadb` variable.

CDN パッケージでは、グローバル変数 `faunadb` を公開しています。

### [](#obtain-an-admin-key)Obtain an admin key

管理者キーの取得

To follow along, you need an admin key, which you can create using the [Fauna Dashboard](https://dashboard.fauna.com/).

To follow along
ついていく＋沿って
後について行く、話についていく、理解する

フォローするためには、[Fauna Dashboard](https://dashboard.fauna.com/)を使って作成できる管理者キーが必要です。

### [](#instantiate-an-admin-client)Instantiate an admin client

Instantiate
例示化する インスタンスを作成する

アドミンクライアントをインスタンス化します。

```javascript
var adminClient = new faunadb.Client({ secret: "YOUR_FAUNADB_ADMIN_SECRET" });
```

```TypeScript
var adminClient = new faunadb.Client({ secret: "YOUR_FAUNADB_ADMIN_SECRET" as string });
```

※ as stringを付けると警告が消える。

## [](#database)Create a database

Create a database called `my_app` in Fauna:

Fauna で `my_app` というデータベースを作成します。

ここで言うデータベースとは子データベースです。

```javascript
adminClient
  .query(q.CreateDatabase({ name: "my_app" }))
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

プロミスで取得

```none
{
  ref: Database("my_app"),
  ts: 1622574499020000,
  name: 'my_app',
  global_id: 'yoijzam91ybyy'
}
```

### Create a server key to access the `my_app` database

Create a server key. 

サーバーキーを作成します。

The server key has unrestricted access to a single database; 

サーバーキーは単一のデータベースへの無制限のアクセス権を持ちます。

in this case, the server key allows access only to the `my_app` database that we just created.

ここでは、先ほど作成した`my_app`データベースへのアクセスのみを許可します。

キーの作成

```javascript
adminClient
  .query(
    q.CreateKey({
      database: q.Database("my_app"),
      role: "server",
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
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

Save this key’s secret; it is only displayed once, and if you lose it, you would have to generate a new one. 

このキーの秘密は保存しておいてください。このキーは一度しか表示されませんので、紛失した場合は新しいキーを生成する必要があります。

The key is used to perform all of the remaining database setup steps.

このキーは、残りのデータベースセットアップのすべての手順を実行するために使用されます。

Your key will be different than the key you see displayed in the command output in this documentation. The key you saved just above will be different.

あなたのキーは、このドキュメントのコマンド出力に表示されるキーとは異なります。先ほど保存したキーは異なります。

### [](#clientserverkey)Instantiate a client that has server key privileges

### [](#clientserverkey)サーバーキーの権限を持つクライアントのインスタンスを作成します。

Instantiate a client that uses the server key that we just set up, to perform the rest of the tasks in this tutorial.

先ほど設定したサーバーキーを使用するクライアントをインスタンス化し、このチュートリアルの残りのタスクを実行します。

 Be sure to copy the secret returned in the previous step and replace `YOUR_FAUNADB_SERVER_SECRET` with that value.

前のステップで返されたシークレットを必ずコピーして、`YOUR_FAUNADB_SERVER_SECRET`をその値に置き換えてください。

アドミンキー
YOUR_FAUNADB_ADMIN_SECRET

サーバーキー
YOUR_FAUNADB_SERVER_SECRET

```javascript
var serverClient = new faunadb.Client({ secret: 'YOUR_FAUNADB_SERVER_SECRET' });
````

## [](#collection)Create a collection

Fauna stores documents in the form of nested containers. A database contains collections, and collections contain documents. 

Fauna は、入れ子構造のコンテナの形でドキュメントを保存します。

Each [document](https://docs.fauna.com/fauna/current/glossary#Document) belongs to a specific collection. 

データベースはコレクションを含み、コレクションはドキュメントを含みます。

So in order to create a document for a post, we need to first create a collection for posts.

各[ドキュメント](https://docs.fauna.com/fauna/current/glossary#Document)は、特定のコレクションに属します。つまり、投稿用のドキュメントを作成するには、まず投稿用のコレクションを作成する必要があります。

Create a collection using the `CreateCollection` function with a `param_object` containing the `name` of the collection. We shall name our collection "Posts":

コレクションを作成するには、`CreateCollection`関数を使い、コレクションの`名前`を含む`param_object`を指定します。ここではコレクションの名前を "Posts "とします。

```javascript
serverClient
  .query(q.CreateCollection({ name: "Posts" }))
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Collection("Posts"),
  ts: 1622574499730000,
  history_days: 30,
  name: 'Posts'
}
```

## Create an index

インデックスの作成

Before we create any document, let’s ensure that we can easily access them. We do this by creating an index using the `CreateIndex` function. We create this index now to help make the examples clear; in production, you can create an index at any time.

ensure
約束する、裏付ける、確実にする、確かにする、安全にする

ドキュメントを作成する前に、それらに簡単にアクセスできるようにしましょう。これを実現するには、`CreateIndex`関数を使ってインデックスを作成します。本番環境では、いつでもインデックスを作成することができますが、ここでは例をわかりやすくするためにインデックスを作成します。

The customary way to access documents within a collection is by specifying a criteria for one of the fields. To enable criteria-based searches, we need to first create an index using the path of the field within the document.

コレクション内のドキュメントにアクセスする一般的な方法は、フィールドの1つに基準を指定することです。基準ベースの検索を可能にするには、まずドキュメント内のフィールドのパスを使ってインデックスを作成する必要があります。

Create an index on the post’s title:

投稿のタイトルにインデックスを作成します。

```javascript
serverClient
  .query(
    q.CreateIndex({
      name: "posts_by_title",
      source: q.Collection("Posts"),
      terms: [{ field: ["data", "title"] }],
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
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

It is also possible to specify the `values` of the document that should be returned when querying the index. We also create an index for a post’s tags:

また、インデックスを検索する際に返されるドキュメントの `values` を指定することもできます。また、投稿のタグのインデックスも作成しています。

```javascript
serverClient
  .query(
    q.CreateIndex({
      name: "posts_by_tags_with_title",
      source: q.Collection("Posts"),
      terms: [{ field: ["data", "tags"] }],
      values: [{ field: ["data", "title"] }],
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
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

## [](#post)Create a post

投稿の作成

Posts are created by calling the `Create` function with the `ref` of the posts collection and a `param_object` that specifies the structure of the document to be created, as well as permissions for the document. 

ポストは、ポストコレクションの `ref` と、作成されるドキュメントの構造とドキュメントのパーミッションを指定する `param_object` を指定して `Create` 関数を呼び出すことで作成されます。

The post’s data is included in the `param_object`'s `data` field.

ポストのデータは、`param_object`の`data`フィールドに含まれます。

```javascript
serverClient
  .query(
    q.Create(q.Collection("Posts"), {
      data: { title: "What I had for breakfast .." },
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "300223719783006720"),
  ts: 1622574500780000,
  data: { title: 'What I had for breakfast ..' }
}
```

The `Create` function returns the post document just created.

`Create`関数は、作成したばかりのポストドキュメントを返します。

As you can see in the output, the `ref` of the document is an automatically-generated identifier that is unique to the document within its database.

出力を見るとわかるように、ドキュメントの`ref`は自動生成された識別子で、そのデータベース内のドキュメントに固有のものです。

Using the [`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref) function, you can specify a document ID to use instead of the auto-generated number, but it must be unique. For example:

[`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref)関数を使えば、自動生成された番号の代わりにドキュメントのIDを指定することができますが、そのIDは一意でなければなりません。例えば、以下のようになります。

```javascript
serverClient
  .query(
    q.Create(q.Ref(q.Collection("Posts"), "1"), {
      data: { title: "The first post" },
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574501060000,
  data: { title: 'The first post' }
}
```

### [](#create-several-posts)Create several posts

複数の記事を作成する

It can quickly become tedious to repeat the `Create` function for multiple posts.

複数の投稿に対して`Create`関数を繰り返すのは、すぐに面倒になってしまいます。

This is where Fauna’s transaction language really shines. Let’s use a `Map` function to create several posts at once:

ここで、Faunaのトランザクション言語が真価を発揮します。それでは、`Map`関数を使って、一度に複数の投稿を作成してみましょう。

```javascript
serverClient
  .query(
    q.Map(
      [
        "My cat and other marvels",
        "Pondering during a commute",
        "Deep meanings in a latte",
      ],
      q.Lambda(
        "post_title",
        q.Create(q.Collection("Posts"), {
          data: { title: q.Var("post_title") },
        })
      )
    )
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
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

Using the `Map` function, we can restructure the data as an array and wrap the `Create` in a lambda function, which then runs over each document in the collection. 

`Map`関数を使って、データを配列として再構成し、`Create`をラムダ関数でラップして、コレクション内の各ドキュメントを実行します。

The anonymous lambda function specifies a variable `post_title` which is used as a placeholder in the parameters sent to the `create` function. This way, multiple documents in a collection can be created using a single query.

匿名のラムダ関数では、変数 `post_title` を指定します。この変数は `create` 関数に送られるパラメータのプレースホルダとして使用されます。これにより、1つのクエリでコレクション内の複数のドキュメントを作成することができます。

## [](#retrieve)Retrieve posts

投稿を取得する

The easiest way to retrieve a document is by using its reference value:

ドキュメントを取得する最も簡単な方法は、その参照値を使用することです。

```javascript
serverClient
  .query(q.Get(q.Ref(q.Collection("Posts"), "1")))
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574501060000,
  data: { title: 'The first post' }
}
```

You can query for posts with a specific title using the `match` function and the index we created earlier:

先ほど作成したインデックスと`match`関数を使って、特定のタイトルを持つ投稿を検索することができます。

```javascript
serverClient
  .query(q.Get(q.Match(q.Index("posts_by_title"), "My cat and other marvels")))
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "300223720476115456"),
  ts: 1622574501410000,
  data: { title: 'My cat and other marvels' }
}
```

The `match` function returns a logical set of elements, which can be combined with other sets with set-operations like `join`, `intersect`, `subtract`, etc.

`match`関数は、要素の論理的な集合を返します。この集合は、`join`, `intersect`, `subtract` などの集合演算子を使って、他の集合と組み合わせることができます。

## [](#update)Update posts

記事の更新

You can easily modify documents by supplying the new data along with the reference to the document. 

ドキュメントへの参照と一緒に新しいデータを与えることで、ドキュメントを簡単に修正することができます。

For example, we want to add tags to each of our blog posts:

例えば、ブログの各記事にタグを追加したいとします。

```javascript
serverClient
  .query(
    q.Update(q.Ref(q.Collection("Posts"), "1"), {
      data: { tags: ["welcome", "short"] },
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574502370000,
  data: { title: 'The first post', tags: [ 'welcome', 'short' ] }
}
```

The `Update` function updates specific fields in a document. 

`更新`関数は、ドキュメントの特定のフィールドを更新します。

It preserves the old fields if they are not specified in `params`.

古いフィールドが `params` で指定されていなければ、それを維持します。

In the case of nested values (known as objects, due to the JSON data format), the old and the new values are merged.

入れ子になっている値（JSONのデータフォーマットではオブジェクトと呼ばれます）の場合は、古い値と新しい値がマージされます。

If `null` is specified as a value for a field, it is removed.

フィールドの値として `null` が指定されている場合は、削除されます。

### [](#replace)Replace posts

投稿の置き換え

The `Replace` function replaces the document’s data with the fields provided in `params`. Old fields not mentioned in `params` are removed.

mentioned
述べる、語る、－について話す。

`Replace`関数は、ドキュメントのデータを `params` で指定されたフィールドに置き換えます。params` に記述されていない古いフィールドは削除されます。

```javascript
serverClient
  .query(
    q.Replace(q.Ref(q.Collection("Posts"), "1"), {
      data: { title: "The replacement first post" },
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574502680000,
  data: { title: 'The replacement first post' }
}
```

Note that the `title` has been updated, but `tags` has been deleted.

"タイトル "は更新されていますが、"タグ "は削除されていることに注意してください。

## [](#delete)Delete a post

投稿の削除

Lastly, a post can be removed using the `Delete` function:

最後に、`Delete`関数を使って投稿を削除することができます。

```javascript
serverClient
  .query(q.Delete(q.Ref(q.Collection("Posts"), "1")))
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
{
  ref: Ref(Collection("Posts"), "1"),
  ts: 1622574502680000,
  data: { title: 'The replacement first post' }
}
```

Once the post is deleted, attempting to retrieve the post results in an error:

投稿が削除されると、その投稿を取得しようとするとエラーになります。

```javascript
serverClient
  .query(q.Get(q.Ref(q.Collection("Posts"), "1")))
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));
```

```none
Error: [NotFound: instance not found] {
  description: 'Document not found.',
  requestResult: [RequestResult]
}
```
