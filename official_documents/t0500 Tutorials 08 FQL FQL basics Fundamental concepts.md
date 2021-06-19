Fundamental concepts | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/basics/

# Fundamental concepts

Fauna is a serverless global database designed for low latency and developer productivity. FQL, its query language, was also designed with these goals in mind. With it, you can create expressive queries that allow you to harness the full power of Fauna.

Faunaは、低レイテンシーと開発者の生産性を考慮して設計されたサーバーレスのグローバルデータベースです。そのクエリ言語であるFQLもまた、これらの目標を念頭に置いて設計されました。FQLを使えば、Faunaのパワーを最大限に活用できる表現力豊かなクエリを作成することができます。

In this five-part tutorial, we cover the basics of FQL with no prior knowledge necessary. If you are skimming and don’t understand something, you probably only need to go back to a previous page.

この5つのパートからなるチュートリアルでは、予備知識なしでFQLの基本を説明します。ざっと読んでわからないところがあれば、前のページに戻るだけでよいでしょう。

This first part of the tutorial begins a journey through space by looking at FQL and fundamental concepts of Fauna.

このチュートリアルの最初のパートでは、FQLとFaunaの基本的なコンセプトを見て、宇宙の旅を始めます。

On this page:

このページでは

-   [Getting started](#requirements)
-   [About documents and collections](#documents)
-   [Your first collections](#collections)
-   [Basic CRUD operations](#crud)
    -   [Create](#crud-create)
    -   [Read](#crud-read)
    -   [Update](#crud-update)
    -   [Delete](#crud-delete)
-   [Your first index](#indexes)
    -   [Using the Documents function to get all the documents of a collection](#documents-function)
    -   [Page size](#page-size)
-   [Using `Lambda` to retrieve a list of documents](#lambdas)
-   [Using `Let` and `Select` to return custom results](#let-select)
    -   [Let](#let)
    -   [Select](#select)
-   [Conclusion](#conclusion)

- はじめに](#requirements)
- ドキュメントとコレクションについて](#documents)
- [最初のコレクション](#コレクション)
- 基本的なCRUD操作](#crud)
    - [作成](#crud-create)
    - 読み込み](#crud-read)
    - [更新](#crud-update)
    - [削除](#crud-delete)
- 最初のインデックス](#indexes)
    - [Documents関数を使ってコレクションのすべてのドキュメントを取得する](#documents-function)
    - [ページサイズ](#page-size)
- [ドキュメントのリストを取得するための `Lambda` の使用](#lambdas)
- [カスタムの結果を返すために `Let` と `Select` を使用する](#let-select)
    - [Let](#let)
    - [セレクト](#select)
- [Conclusion](#conclusion)

## [](#requirements)Getting started

はじめに

Before embarking on our space adventure, you only need to signup for a free account: [https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register)

宇宙への冒険に出発する前に、無料のアカウントにサインアップするだけです。[https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register)

![The Fauna Dashboard signup screen](https://docs.fauna.com/fauna/current/tutorials/basics//../_images/screen-dashboard-signup.png)

Once you have signed up and logged in, create a new database and you’re ready to get started:

サインアップしてログインしたら、新しいデータベースを作成して、すぐに始められます。

![The Dashboard New Database screen](https://docs.fauna.com/fauna/current/tutorials/basics//../_images/screen-dashboard-new_database.png)

It’s also possible to install Fauna on your development machine using an official Docker image if you prefer.

公式の Docker イメージを使用して、開発マシンに Fauna をインストールすることもできます。

## [](#documents)About documents and collections

ドキュメントとコレクションについて

Fauna is a document-oriented database. Instead of organizing data in tables and rows, it uses documents and collections.

Fauna は、ドキュメント指向のデータベースです。テーブルや行でデータを整理するのではなく、ドキュメントとコレクションを使用します。

The smallest units of data in Fauna are schemaless documents which are basically JSON with some extra types. These documents are grouped into collections which are simply buckets of documents.

Faunaのデータの最小単位はスキーマレスドキュメントで、基本的にはJSONにいくつかの型を追加したものです。これらのドキュメントは、単にドキュメントのバケットであるコレクションにグループ化されます。

This is what a simple document looks like:

単純なドキュメントは次のようになります。

```json
{
  "ref": Ref(Collection("Planets"), "264471980339626516"),
  "ts": 1588478985090000,
  "data": {
    "name": "Vulcan"
  }
}
```

-   `ref` is a reference that uniquely identifies the document inside the `Planets` collection with the document ID `264471980339626516`. We’ll go over references and the special [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) type in more detail later.

- `ref` は、`Planets` コレクション内のドキュメントを、ドキュメント ID `264471980339626516` で一意に識別するリファレンスです。リファレンスや特殊な[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)タイプについては、後で詳しく説明します。

-   `ts` is a timestamp (expressed as a [Long](https://docs.fauna.com/fauna/current/api/fql/types#long)) of the document’s last event (e.g., create, read, update, delete) in microseconds.

- ts` は、ドキュメントの最後のイベント (例: 作成、読み取り、更新、削除) のタイムスタンプ (Long](https://docs.fauna.com/fauna/current/api/fql/types#long) で、マイクロ秒単位で表されます。

-   `data` is the actual data of the document. You can create any structure you need and use any of the JSON and Fauna types, including [String](https://docs.fauna.com/fauna/current/api/fql/types#string)s, [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s, [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s to other documents, [nested objects](https://docs.fauna.com/fauna/current/api/fql/types#object), [Array](https://docs.fauna.com/fauna/current/api/fql/types#array)s, etc.

- data`は、ドキュメントの実際のデータです。必要な構造を作成することができ、[String](https://docs.fauna.com/fauna/current/api/fql/types#string)s、[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s、他のドキュメントへの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s、[nested objects](https://docs.fauna.com/fauna/current/api/fql/types#object)、[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)sなど、JSONとFaunaのタイプのいずれかを使用することができます。

At creation, a document cannot exceed 1MB since that is the limit of a Fauna request. You can append more data to a document afterwards.

ドキュメントの作成時には、Faunaリクエストの制限である1MBを超えることはできません。後からドキュメントにデータを追加することができます。

## [](#collections)Your first collections

あなたの最初のコレクション

Obviously, before we begin our space adventure, we need a spaceship and a pilot. How else are we going to travel through space?

宇宙の冒険を始める前には、当然ながら宇宙船とパイロットが必要です。他にどうやって宇宙を旅するのでしょうか？

Let’s create a Spaceships collection using the [`CreateCollection`](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection) function:

それでは、[`CreateCollection`](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection)関数を使って、Spaceshipsコレクションを作ってみましょう。

shell

```shell
CreateCollection({name: "Spaceships"})
```

```json
{
  "ref": Collection("Spaceships"),
  "ts": 1590269343560000,
  "history_days": 30,
  "name": "Spaceships"
}
```

As you can see, the result looks very similar to a document. All data in Fauna is stored in documents. For now, let’s leave the default values and move on.

ご覧のとおり、結果はドキュメントによく似ています。Faunaのデータはすべてドキュメントに格納されています。とりあえず、デフォルトの値を残して先に進みましょう。

Let’s create another a collection for our pilots:

パイロット用のコレクションをもう一つ作ってみましょう。

shell

```shell
CreateCollection({name: "Pilots"})
```

We’re ready now to start creating our first documents.

これで、最初のドキュメントを作成する準備が整いました。

## [](#crud)Basic CRUD operations

基本的なCRUD操作

### [](#crud-create)Create

作成

Let’s create our first document with the [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) function:

それでは、[`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)関数を使って最初のドキュメントを作成してみましょう。

shell

```shell
Create(
  Collection("Pilots"),
  {
    data: {
      name: "Flash Gordon"
    }
  }
)
```

```json
{
  "ref": Ref(Collection("Pilots"), "266350546751848978"),
  "ts": 1590270525630000,
  "data": {
    "name": "Flash Gordon"
  }
}
```

The document you just created has an auto-generated document ID, which will be different from the one shown in the response above. Be sure to take note of your document ID and use it in subsequent examples.

今作成したドキュメントには、自動生成されたドキュメントIDがありますが、これは上の回答で示されたものとは異なります。必ずドキュメントIDをメモして、以降の例で使用してください。

Let’s break this down:

これを分解してみましょう。

-   [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create) is used to create new documents.

- Create](https://docs.fauna.com/fauna/current/api/fql/functions/create)は新しいドキュメントを作成するために使用されます。

-   `Collection("Pilots")` is a reference to the `Pilots` collection.

- `Collection("Pilots")`は`Pilots`コレクションへの参照です。

-   `{data: {name: "Flash Gordon"}}` is the actual data of the document.

- `{data: {name: "Flash Gordon"}}`はドキュメントの実際のデータです。

So now that we have created a pilot, we can create a new spaceship:

さて，パイロットができたので，新しい宇宙船を作ってみましょう．

shell

```shell
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Millennium Hawk",
      pilot: Ref(Collection("Pilots"), "266350546751848978")
      // NOTE: be sure to use your pilot's document ID here
    }
  }
)
```

As you can see, we’re now storing a reference to another document in the pilot property. I will cover references and relationships in much more detail in [part 3 of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/data_modeling).

ご覧のように、pilotプロパティに別のドキュメントへの参照を格納しています。参照とリレーションについては、[チュートリアルのパート3](https://docs.fauna.com/fauna/current/tutorials/basics/data_modeling)でもっと詳しく説明します。

SQL users might be tempted to store the document ID in a `pilot_id` property of the JSON instead of a [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). This would be totally acceptable, but it’s recommended to use native references. Doing so makes your FQL queries much simpler as we’ll see later on.

SQLユーザーは、[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)ではなく、JSONの`pilot_id`プロパティにドキュメントIDを格納したいと思うかもしれません。これは全く問題ありませんが、ネイティブのリファレンスを使用することをお勧めします。そうすることで、後ほど説明するように、FQL クエリが非常にシンプルになります。

### [](#crud-read)Read

To read documents, we use the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function which receives a document reference and returns an actual document:

ドキュメントの読み込みには、ドキュメントの参照を受け取り、実際のドキュメントを返す [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を使用します。

shell

```shell
Get(Ref(Collection("Spaceships"), "266354515987399186"))
  // NOTE: be sure to use your spaceship's document ID here
```

```json
{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274311000000,
  "data": {
    "name": "Millennium Hawk",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

### [](#crud-update)Update

To update a document, we use Update. If we wanted to change the name of our ship, we’d simply run:

ドキュメントを更新するには Update を使います。船の名前を変えたい場合は、単純に次のように実行します。

shell

```shell
Update(
  Ref(Collection("Spaceships"), "266354515987399186"),
  // NOTE: be sure to use your ship's document ID here
  {
    data: {
      name: "Millennium Falcon"
    }
  }
)
```

```json
{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274726650000,
  "data": {
    "name": "Millennium Falcon",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

As you can see, only the name has been updated in the document and the pilot remains untouched. It’s also possible to replace an entire document using [`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace) instead.

ご覧のように、ドキュメントでは名前だけが更新され、パイロットはそのまま残っています。代わりに [`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace) を使ってドキュメント全体を置き換えることも可能です。

### [](#crud-delete)Delete

削除

On second thought, it’s probably better if we don’t use that copyrighted name for our spaceship. We don’t want to get into trouble with the galactic empire.

考えてみると、宇宙船にあの著作権で保護された名前を使わないほうがいいかもしれません。銀河帝国とトラブルになるのは避けたいですからね。

As expected, to delete a document we simply use [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete):

やはり、文書を削除するには [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)を使うしかありません。

shell

```shell
Delete(Ref(Collection("Spaceships"), "266354515987399186"))
```

```json
{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274726650000,
  "data": {
    "name": "Millennium Falcon",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

Let’s create a new spaceship again to continue with our adventure:

冒険を続けるために、再び新しい宇宙船を作ってみよう。

shell

```shell
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Voyager",
      pilot: Ref(Collection("Pilots"), "266350546751848978")
    }
  }
)
```

## [](#indexes)Your first index

あなたの最初のインデックス

Fetching all documents in a database to check if each document fits a particular criteria would be very slow. In the relational world, this would be comparable in concept to a full table scan.

データベース内のすべてのドキュメントを取得して、それぞれのドキュメントが特定の条件に合うかどうかをチェックするのは非常に時間がかかります。リレーショナルの世界では、これはフルテーブルスキャンに匹敵する概念です。

To solve this problem, Fauna implements indexes. These are database entities that organize your data in such a way that they allow for efficient lookup of multiple documents. Whenever you create new documents, the indexes that cover those documents are automatically updated.

この問題を解決するために、Faunaはインデックスを実装しています。これは、複数のドキュメントを効率的に検索できるようにデータを整理するデータベースの実体です。新しいドキュメントを作成すると、そのドキュメントをカバーするインデックスが自動的に更新されます。

In the [next part of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/indexes), we show that indexes can span multiple collections and accept parameters for sorting and filtering.

チュートリアルの次のパート](https://docs.fauna.com/fauna/current/tutorials/basics/indexes)では、インデックスが複数のコレクションにまたがったり、ソートやフィルタリングのためのパラメータを受け入れることができることを紹介します。

For now, let’s create a simple index to list all the documents in a collection:

とりあえず、コレクション内のすべてのドキュメントをリストアップする簡単なインデックスを作成してみましょう。

shell

```shell
CreateIndex({
  name: "all_Pilots",
  source: Collection("Pilots")
})
```

```json
{
  "ref": Index("all_Pilots"),
  "ts": 1590278778420000,
  "active": true,
  "serialized": true,
  "name": "all_Pilots",
  "source": Collection("Pilots"),
  "partitions": 8
}
```

Again, you can see that an index is just another type of document.

繰り返しになりますが、インデックスはドキュメントの一種であることがわかります。

After adding some more pilots to our collection, we can query our new index like this:

コレクションにパイロットを追加した後、次のように新しいインデックスを照会することができます。

shell

```shell
Paginate(Match(Index("all_Pilots")))
```

```json
{
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394"),
    Ref(Collection("Pilots"), "266359371696439826"),
    Ref(Collection("Pilots"), "266359447111074322")
  ]
}
```

Let’s break this down:

これを分解してみましょう。

-   [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) returns a reference to an index.

- [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) はインデックスへの参照を返します。

-   [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) accepts the index reference and returns a set, which is sort of like an abstract representation of the documents covered by the index. At this point, no data has been fetched yet.

- Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)はインデックスへの参照を受け取り、インデックスがカバーするドキュメントの抽象的な表現のようなものであるセットを返します。この時点ではまだデータは取得されていません。

-   [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) takes the set returned by `Match`, reads the matching index entries, and returns a [Page](https://docs.fauna.com/fauna/current/api/fql/types#page) of results. In this case, this is simply an [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) of [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s.

- Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) は `Match` が返したセットを受け取り、マッチするインデックスエントリを読み込んで、結果の [Page](https://docs.fauna.com/fauna/current/api/fql/types#page) を返します。この場合、これは単に [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)の [Array](https://docs.fauna.com/fauna/current/api/fql/types#array)になります。

### [](#documents-function)Using the Documents function to get all the documents of a collection

Documents関数を使ってコレクションの全ドキュメントを取得する

The previous index was actually a very simplistic example that served as an introduction to indexes.

先ほどのインデックスは、実はインデックスの入門編として非常に単純な例でした。

Since retrieving all the documents in a collection is a very common need, you can use the [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function to avoid the need to create a new index for every collection. It produces exactly the same results as the equivalent index.

コレクションのすべてのドキュメントを取得することは非常に一般的なニーズであるため、[`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents)関数を使用することで、コレクションごとに新しいインデックスを作成する必要がなくなります。同等のインデックスと全く同じ結果が得られます。

shell

```shell
Paginate(Documents(Collection('Pilots')))
```

```json
{
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394"),
    Ref(Collection("Pilots"), "266359371696439826"),
    Ref(Collection("Pilots"), "266359447111074322")
  ]
}
```

### [](#page-size)Page size

ページサイズ

By default, Paginate returns pages of 64 items. You can define how many items you’d like to receive with the `size` parameter, up to 100,000 items:

デフォルトでは、Paginateは64アイテムのページを返します。size`パラメータで受け取るアイテム数を定義でき、最大で100,000アイテムまで可能です。

shell

```shell
Paginate(
  Match(Index("all_Pilots")),
  {size: 2}
)
```

```json
{
  "after": [
    Ref(Collection("Pilots"), "266359371696439826")
  ],
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394")
  ]
}
```

Since the number of results, in this case, does not fit in one page, [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) also returns the `after` property to be used as a cursor.

今回の場合、結果の数が1ページに収まらないので、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)では、`after`プロパティも返して、カーソルとして利用しています。

## [](#lambdas)Using `Lambda` to retrieve a list of documents

文書のリストを取得するために`Lambda`を使用する

In some cases, you might want to retrieve a list of references, but generally, you will probably need an actual list of documents.

リファレンスのリストを取得したい場合もあるかもしれませんが、一般的には実際のドキュメントのリストが必要になるでしょう。

Initially, you might think the best way to solve this would be by performing multiple queries from your programming language. That would be an anti-pattern which you absolutely want to avoid. You would introduce unnecessary latency and make your application much slower than it needs to be.

最初は、プログラミング言語から複数のクエリを実行して解決するのが一番良い方法だと思うかもしれません。しかし、これは絶対に避けたいアンチパターンです。不必要なレイテンシーが発生し、アプリケーションが必要以上に遅くなってしまいます。

For example, in this JavaScript example, you’d be waiting first for the query to get the references and then for the queries to get the documents:

例えば、このJavaScriptの例では、まずクエリが参照を取得するのを待ち、次にクエリがドキュメントを取得するのを待つことになります。

```javascript
// Don't do this!
const result = await client.query(q.Paginate(q.Match(q.Index("all_Pilots")));
const refs = result.data;
const promises = result.map(refs.map(ref => client.query(q.Get(ref))));
const pilots = await Promise.all(promises);
```

Or even worse, by waiting for each and every query that gets a document:

さらに悪いことに、ドキュメントを取得するクエリをいちいち待っていることもあります。

```javascript
// Don't do this!
const result = await client.query(q.Paginate(q.Match(q.Index("all_Pilots")));
const refs = result.data;
const pilots = [];
for (const ref of refs) {
  const pilot = await client.query(q.Get(ref));
  pilots.push(pilot);
}
```

The solution is simply to use FQL to solve this neatly in a single query.

これを解決するには、FQLを使って1つのクエリですっきりと解決することです。

Here’s the idiomatic solution of getting an actual list of documents from an array of references:

ここでは、参照の配列から実際のドキュメントのリストを取得するイディオム的なソリューションを紹介します。

shell

```shell
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda('pilotRef', Get(Var('pilotRef')))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Pilots"), "266350546751848978"),
      "ts": 1590270525630000,
      "data": {
        "name": "Flash Gordon"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266359364060709394"),
      "ts": 1590278934520000,
      "data": {
        "name": "Luke Skywalker"
      }
    },
    // etc...
  ]
}
```

We’ve already seen that [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) returns an array of references, right? The only mystery here is the use of [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) and this [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) thing.

[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)が参照の配列を返すことはすでに見ましたよね？ここで唯一の謎は、[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)とこの[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)というものの使い方です。

You’ve probably already used a "map" function in your programming language of choice. It’s a function that accepts an array and returns a new array after performing an action on each item.

プログラミング言語で「Map」関数を使ったことがある人は多いでしょう。これは、配列を受け取って、各項目に対してアクションを実行した後、新しい配列を返す関数です。

Consider this JavaScript example:

JavaScriptの例を見てみましょう。

```javascript
const anotherArray = myArray.map(item => doSomething(item));

// which is equivalent to:

// これは次のものと同じです。

const anotherArray = myArray.map(function (item) {
  return doSomething(item);
});
```

With this in mind, let’s break down this portion of our FQL query:

このことを念頭に置いて、FQLクエリのこの部分を分解してみましょう。

shell

```shell
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda("pilotRef", Get(Var("pilotRef")))
)
```

-   [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) returns an array of references.

- [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)は、参照の配列を返します。

-   [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) accepts an array (from Paginate or other sources), performs an action on each item of this array, and returns a new array with the new items. In this case, the action is performed using Lambda, which is the Fauna equivalent of what you’d call a simple anonymous function in JavaScript. It’s all very similar to the previous JavaScript example.

- [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)は(Paginateや他のソースから)配列を受け取り、この配列の各アイテムに対してアクションを実行し、新しいアイテムを含む新しい配列を返します。この場合、アクションはLambdaを使って実行されます。Lambdaは、JavaScriptで言うところのシンプルな匿名関数に相当するFaunaの機能です。先ほどのJavaScriptの例とよく似ていますね。

-   [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) 'pilotRef' defines a parameter called pilotRef for the anonymous function. You can name this parameter anything that makes sense for you. In this example, the parameter receives a reference, which is why I named it `pilotRef`.

- [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) 'pilotRef' は、無名関数の pilotRef というパラメータを定義します。このパラメータには、意味のある名前を付けることができます。この例では、パラメータは参照を受け取るので、`pilotRef`と名付けました。

-   [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var) is used to evaluate variables. In this case, it evaluates the variable named `pilotRef` and returns the document reference.

- [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)は変数を評価するのに使います．この例では、`pilotRef`という名前の変数を評価して、ドキュメントの参照を返します。

-   [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) receives the reference and returns the actual document.

- [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)は，その参照を受け取って，実際のドキュメントを返します．

If we were to rewrite the previous FQL query with the JavaScript driver, we could do something like this:

先ほどのFQLクエリをJavaScriptドライバで書き換えると、以下のようになります。

```javascript
q.Map(
   q.Paginate(q.Match(q.Index("all_Pilots"))),
  (pilotRef) => q.Get(pilotRef)
)

// Or:

q.Map(
   q.Paginate(q.Match(q.Index("all_Pilots"))),
   q.Lambda("pilotRef", q.Get(q.Var("pilotRef")))
)
```

You can paste JavaScript queries into the Web Shell as well as FQL queries.

FQLクエリだけでなく、JavaScriptクエリもWebシェルに貼り付けることができます。

![The Dashboard shell demonstrating a JavaScript query](https://docs.fauna.com/fauna/current/tutorials/basics//../_images/screen-dashboard-shell-js_query.png)

## [](#let-select)Using `Let` and `Select` to return custom results

`Let` と `Select` を使ってカスタムの結果を返す

Up until now, our documents have been pretty simple. Let’s add some more data to our spaceship:

ここまでのドキュメントはとてもシンプルなものでした。それでは、宇宙船にデータを追加してみましょう。

shell

```shell
Update(
  Ref(Collection("Spaceships"),"266356873589948946"),
  {
    data: {
      type: "Rocket",
      fuelType: "Plasma",
      actualFuelTons: 7,
      maxFuelTons: 10,
      maxCargoTons: 25,
      maxPassengers: 5,
      maxRangeLightyears: 10,
      position: {
        x: 2234,
        y: 3453,
        z: 9805
      }
    }
  }
)
```

```json
{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1590524958830000,
  "data": {
    "name": "Voyager",
    "pilot": Ref(Collection("Pilots"), "266350546751848978"),
    "type": "Rocket",
    "fuelType": "Plasma",
    "actualFuelTons": 7,
    "maxFuelTons": 10,
    "maxCargoTons": 25,
    "maxPassengers": 5,
    "maxRangeLightyears": 10,
    "position": {
      "x": 2234,
      "y": 3453,
      "z": 9805
    }
  }
}
```

Cool.

いいですね。

So now imagine our application were in fact managing a whole fleet and you needed to show a list of ships to the fleet admiral.

では、私たちのアプリケーションが実際に艦隊全体を管理していて、艦隊の提督に船のリストを見せる必要があるとしましょう。

First, we’d need to create an index:

まず、インデックスを作成する必要があります。

shell

```shell
CreateIndex({
  name: "all_Spaceships",
  source: Collection("Spaceships")
})
```

Ok, now we just use [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate), [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map), and [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) (like we saw earlier) to get all of the documents. So we do that but… Oh no!

よし、あとは[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)、[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)、[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)を使って(先ほどのように)すべてのドキュメントを取得すればいいんだ。そうしたら......あれっ！？

The fleet admiral is very unhappy about the slow performance of his holo-map now.

艦隊司令官は、ホロマップのパフォーマンスが遅いことに非常に不満を持っています。

Sending the complete list with thousands of documents across light years of space wasn’t a great idea because it’s a lot of data. We propose breaking down the results with pages, but the admiral absolutely needs to see all ships at once.

何千枚もの文書を含む完全なリストを何光年もの宇宙空間に送るのは、データ量が多いために良いアイデアではありませんでした。結果をページごとに分けることを提案するが、提督は絶対に全艦を一度に見る必要がある。

"By the cosmic gods! I don’t care how much fuel a ship has!" shouts the admiral. "I only want to know its name, id, and position!".

"宇宙の神々に誓って! 宇宙の神々よ、船の燃料量などどうでもいい！」と提督は叫ぶ。"名前とIDと位置を知りたいだけだ！」と提督は叫ぶ。

Of course! Let’s do that:

もちろんだ。そうしよう。

shell

```shell
Map(
  Paginate(Match(Index("all_Spaceships"))),
  Lambda("shipRef",
    Let(
      {
        shipDoc: Get(Var("shipRef"))
      },
      {
        id: Select(["ref", "id"], Var("shipDoc")),
        name: Select(["data", "name"], Var("shipDoc")),
        position: Select(["data", "position"], Var("shipDoc"))
      }
    )
  )
)
```

```json
{
  "data": [
    {
      "id": "266356873589948946",
      "name": "Voyager",
      "position": {
        "x": 2234,
        "y": 3453,
        "z": 9805
      }
    },
    {
      "id": "266619264914424339",
      "name": "Explorer IV",
      "position": {
        "x": 1134,
        "y": 9453,
        "z": 3205
      }
    }
    // etc...
  ]
}
```

Boom! Now the holo-map loads much faster. We can see the satisfaction in the admiral’s smile.

やったー ホロマップの読み込みが格段に速くなりました。提督の満足げな笑顔が目に浮かびます。

Since we already know how Paginate, Map, and Lambda work together, this is the new portion:

Paginate、Map、Lambdaがどのように連携しているかはすでに知っているので、ここからが新しい部分です。

shell

```shell
Let(
  {
    shipDoc: Get(Var("shipRef"))
  },
  {
    id: Select(["ref", "id"], Var("shipDoc")),
    name: Select(["data", "name"], Var("shipDoc")),
    position: Select(["data", "position"], Var("shipDoc"))
  }
)
```

### [](#let)Let

[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) is a function used in FQL to create custom objects. You can even have nested `Let` functions to format the data with total freedom.

[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let)は、FQLでカスタムオブジェクトを作成するために使われる関数です。また、`Let`関数をネストさせて、自由にデータをフォーマットすることもできます。

The first parameter of [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) is used to define variables that are going to be used later on. These are called "bindings". These bindings are available to any nested `Let` objects that you create.

[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let)の最初のパラメータは、後に使用される変数を定義するために使用されます。これを「バインディング」と呼びます。これらのバインディングは、ネストされた `Let` オブジェクトを作成したときに利用できます。

Here we define a `shipDoc` variable which stores the document returned from [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get), which in turn uses the reference from the Lambda parameter:

ここでは、[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)から返されたドキュメントを格納する`shipDoc`変数を定義しています。この変数には、Lambdaパラメータからの参照が使用されています。

```json
{
  shipDoc: Get(Var("shipRef"))
}
```

The second portion is the actual object that defines all of the variables and their values:

2つ目の部分は、すべての変数とその値を定義する実際のオブジェクトです。

```json
{
  id: Select(["ref", "id"], Var("shipDoc")),
  name: Select(["data", "name"], Var("shipDoc")),
  position: Select(["data", "position"], Var("shipDoc"))
}
```

### [](#select)Select

The [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function is used to select data from objects or arrays.

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)は、オブジェクトや配列からデータを選択するための関数です。

shell

```shell
Select(["data", "name"], Var("shipDoc"))
```

Here, we’re selecting the name property from the data property of the document stored in the `shipDoc` binding.

ここでは、`shipDoc`というバインディングに格納されているドキュメントのdataプロパティからnameプロパティを選択しています。

This array-like notation `["data", "name"]` is called a "path". We’re using it here to get to the name property, but it can be used with integers to access array items too.

この配列のような表記 `["data", "name"]` を「パス」と呼びます。ここではnameプロパティにアクセスするために使用していますが、整数を使って配列アイテムにアクセスすることもできます。

## [](#conclusion)Conclusion

結論

So that’s it for today. Hopefully, you learned something valuable!

今日はこれでおしまいです。何か貴重なことを学んでいただけたでしょうか？

In [part 2 of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/indexes), we continue our space adventure by going deeper into indexes.

[チュートリアルのパート2](https://docs.fauna.com/fauna/current/tutorials/basics/indexes)では、インデックスをより深く掘り下げて、宇宙の冒険を続けます。

