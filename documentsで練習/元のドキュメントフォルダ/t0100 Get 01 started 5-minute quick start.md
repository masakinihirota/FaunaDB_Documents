Welcome to the Fauna documentation! | Fauna Documentation
https://docs.fauna.com/fauna/current/start/

# Welcome to the Fauna documentation!

Faunaのドキュメントへようこそ！

Fauna is a general purpose, distributed database supporting multiple data models and strong global consistency, for modern app developers in the serverless era.

consistency
整合性

FaunaはNoSQL

Faunaは、サーバーレス時代の現代のアプリ開発者向けに、複数のデータモデルと強力なグローバル整合性をサポートする汎用の分散データベースです。

To start querying Fauna from your application code, choose your language:

アプリケーションコードからFaunaのクエリを開始するには、言語を選択します。

[![GraphQL](https://docs.fauna.com/fauna/current/start//_images/graphql-logo.svg)](https://docs.fauna.com/fauna/current/api/graphql/endpoints)  
[GraphQL](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

[![JavaScript](https://docs.fauna.com/fauna/current/start//_images/javascript.png)](https://docs.fauna.com/fauna/current/drivers/javascript)  
[JS/Node](https://docs.fauna.com/fauna/current/drivers/javascript)

[![Java](https://docs.fauna.com/fauna/current/start//_images/java.svg)](https://docs.fauna.com/fauna/current/drivers/jvm)  
[Java](https://docs.fauna.com/fauna/current/drivers/jvm)

[![C#](https://docs.fauna.com/fauna/current/start//_images/csharp.png)](https://docs.fauna.com/fauna/current/drivers/csharp)  
[C#](https://docs.fauna.com/fauna/current/drivers/csharp)

[![Go](https://docs.fauna.com/fauna/current/start//_images/golang.png)](https://docs.fauna.com/fauna/current/drivers/go)  
[Go](https://docs.fauna.com/fauna/current/drivers/go)

[![Python](https://docs.fauna.com/fauna/current/start//_images/python.png)](https://docs.fauna.com/fauna/current/drivers/python)  
[Python](https://docs.fauna.com/fauna/current/drivers/python)

[![Scala](https://docs.fauna.com/fauna/current/start//_images/scala.svg)](https://docs.fauna.com/fauna/current/drivers/jvm)  
[Scala](https://docs.fauna.com/fauna/current/drivers/jvm)

Otherwise, try our…

それ以外の場合は、私たちを試してみてください…

## [](#quick-start)5-minute quick start

5分のクイックスタート

Fauna has two main APIs: GraphQL and FQL (Fauna Query Language). This quick start provides a brief intro to both since you can use them together.

Faunaには2つの主要なAPIがあります。 GraphQLおよびFQL（Faunaクエリ言語）。このクイックスタートでは、両方を一緒に使用できるため、両方について簡単に紹介します。

1.  **Sign up for a free account**

無料アカウントにサインアップする

Sign up at [https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register).

When you first log in, you are greeted with a Welcome tutorial. Click anywhere (other than the tutorial panel) to close it. You can return to the tutorial at any time by clicking the question mark **?** button at the top right.

初めてログインすると、ウェルカムチュートリアルが表示されます。（チュートリアルパネル以外の）任意の場所をクリックして閉じます。疑問符をクリックすると、いつでもチュートリアルに戻ることができますか？右上のボタン。

![The Fauna Dashboard home screen with tutorial prompt](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-home-tutorial.png)

2.  **Create a database**

データベースを作成する

1.  Click **NEW DATABASE**.

![The Fauna Dashboard new database screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-new_database.png)

2.  Enter `my_db` into the "Database Name" field.

3.  Check the "Pre-populate with demo data" checkbox.

4.  Click **SAVE**.

You have created your first Fauna database!

これで、最初のFaunaデータベースが作成されました。

3.  **Browse your database**

データベースを閲覧する

The Overview page for the `my_db` database is displayed. The database has been populated with some collections, indexes, and the corresponding GraphQL schema for a grocery delivery app.

corresponding
対応する adj

my_db`データベースの概要ページが表示されています。このデータベースには、いくつかのコレクション、インデックス、そして食料品配送アプリに対応するGraphQLスキーマが入力されています。

![The Fauna Dashboard database overview screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-db_overview.png)

1.  **Collections**

Click **COLLECTIONS** in the left sidebar to browse your collections. You’ll see the documents for each collection on the right. If you are familiar with SQL, collections are like tables and documents are like rows in a table, except that each document can contain its own, distinct fields.

左サイドバーの**コレクション**をクリックすると、コレクションを閲覧できます。右側には、各コレクションのドキュメントが表示されます。SQLに詳しい方なら、コレクションはテーブルのようなもので、ドキュメントはテーブルの行のようなものですが、各ドキュメントには独自の異なるフィールドを含めることができます。

![The Fauna Dashboard collections screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-collections.png)

2.  **Indexes**

インデックス

Click the **INDEXES** tab in the left sidebar. If you are familiar with SQL, Fauna’s indexes are like SQL views. Most Fauna queries require a companion index to help avoid performing full scans of collections (which could get expensive), but you can have hundreds of indexes without affecting overall performance.

companion index
???

affecting
影響 現在分詞

左サイドバーの**INDEXES**タブをクリックします。SQLに精通している方であれば、FaunaのインデックスはSQLのビューのようなものです。ほとんどの Fauna クエリは、コレクションのフルスキャンの実行を避けるためにコンパニオンインデックスを必要としますが、全体のパフォーマンスに影響を与えることなく数百のインデックスを持つことができます。


左側のサイドバーの[インデックス]タブをクリックします。SQLに精通している場合、FaunaのインデックスはSQLビューのようなものです。ほとんどのFaunaクエリには、コレクションのフルスキャンの実行を回避するためのコンパニオンインデックスが必要です（コストがかかる可能性があります）が、全体的なパフォーマンスに影響を与えることなく、数百のインデックスを持つことができます。

![The Fauna Dashboard indexes screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-indexes.png)

3.  **Functions**

Click the **FUNCTIONS** tab in the left sidebar. User-defined functions (UDFs) contain custom business logic that runs on the server, similar to "stored procedures".

stored procedures
ストアドプロシージャ
データベースに対する一連の処理をまとめた手続きにして、関係データベース管理システム (RDBMS) に保存（永続化）したもの。 永続格納モジュール (Persistent Storage Module) とも呼ばれる。


左サイドバーの「**FUNCTIONS**」タブをクリックします。ユーザー定義関数（UDF）は、「ストアドプロシージャ」と同様に、サーバー上で実行されるカスタムビジネスロジックを含みます。


![The Fauna Dashboard functions screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-functions.png)

This UDF might look weird if it’s your first time seeing FQL, the Fauna Query Language, but FQL is actually pretty easy and tons of fun to learn. FQL is also unique in how much power and precision it gives you with respect to predictable cost and performance as you scale.

このUDFは、初めてFQL（Fauna Query Language）を見た人には奇妙に見えるかもしれませんが、FQLは実際にはとても簡単で、学ぶのがとても楽しい言語です。また、FQLは、スケールアップしても予測可能なコストとパフォーマンスに関して、どれほどのパワーと精度を与えてくれるかという点でもユニークです。



4.  **Try some FQL**

Now that we know some basic concepts, let’s query our data.

いくつかの基本的な概念がわかったので、データをクエリしてみましょう。

1.  Click on **SHELL** in the left sidebar to open the web shell.

クリックしてSHELLウェブシェルを開くには、左側のサイドバーにあります。

![The Fauna Dashboard shell screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-initial.png)

2.  Copy the following FQL query:

次のFQLクエリをコピーします。

shell

```shell
Get(Ref(Collection("products"),"202"))
```

3.  Replace the queries in the bottom panel of the shell by selecting them and then and pasting the copied query.

シェルの下部パネルにあるクエリを選択してから、コピーしたクエリを貼り付けて置き換えます。

4.  Click **RUN QUERY**.

This query simply gets a document identified by its [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). A document [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) contains a reference to the document’s collection (in this case, "products") and a unique ID for the document in that collection (in this case, "202"). Fauna’s auto-generated Reference IDs are 18-digits long — you can set your own during document creation, as we have done with the pre-populated demo data to ease copy/pasting.


このクエリは、単純に[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)で識別されるドキュメントを取得します。ドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)には、そのドキュメントのコレクション（この場合は「products」）への参照と、そのコレクション内のドキュメントのユニークなID（この場合は「202」）が含まれています。Faunaの自動生成されたReference IDは18桁の長さですが、コピー/ペーストを容易にするために、事前に入力されたデモデータと同様に、ドキュメント作成時に独自に設定することができます。

The upper panel contains the result of the query:

上のパネルには、クエリの結果が含まれています。

![The Fauna Dashboard shell screen with the query result](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-result.png)

5.  Hover your pointer over the **i** icon to the left of "Time elapsed" to see the query execution metrics. For example, here we can learn that this query resulted in one read operation.

「経過時間」の左側にあるiアイコンにポインタを合わせると、クエリ実行メトリックが表示されます。たとえば、ここでは、このクエリによって1回の読み取り操作が行われたことがわかります。

![The Fauna Dashboard shell screen with the query result and query statistics tooltip](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-stats.png)

You can reduce read operations by leveraging indexes and using them as views. Expand the following block to learn more.

インデックスを活用してビューとして使用することにより、読み取り操作を減らすことができます。詳細については、次のブロックを展開してください。

Using indexes as views

Indexes can be configured to provide any number of document fields. Using indexes, you can often avoid using the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the values that you need, which reduces the number of read operations required.

インデックスは、任意の数のドキュメントフィールドを提供するように構成することができます。インデックスを使用すると、必要な値を取得するために[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を使用しなくて済むことが多く、必要な読み取り操作の回数を減らすことができます。


While [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) is used to a retrieve a single document, [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) is required when you want to retrieve details about multiple documents.


1つのドキュメントを取得するには[Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)を使いますが、複数のドキュメントの詳細を取得したい場合には[Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)が必要になります。


Try the following:

次のことを試してください。

shell

```shell
Paginate(Documents(Collection("products")))
```

When an index does not have `terms` and `values` defined, it only returns ref:ref[]s.

インデックスが `terms` と `values` を定義していない場合は、 ref:ref[]s のみを返します。



What if you want the whole document? The most flexible option is the combination of the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) and [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) functions.


ドキュメント全体を取得したい場合はどうすればよいでしょうか。最も柔軟な方法は、[Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)と[Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)の組み合わせです。


The following query takes the array of [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s from the previous query, then uses the `Map` function to repeatedly apply an anonymous function for each [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in the result. The anonymous function (or [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)) assigns each [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in the array to the variable `product_ref`, then uses the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the referenced document.


次のクエリは、前のクエリで取得した[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)の配列を、`Map`関数を使って、結果の各[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)に対して匿名関数を繰り返し適用します。この匿名関数 (または [Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) は、配列内の各 [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) を変数 `product_ref` に割り当て、次に [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) 関数を使用して、参照されたドキュメントを取得します。

次のクエリは、
前のクエリで取得したReferenceの配列を、
`Map`関数を使って、
結果の各Referenceに対して匿名関数を繰り返し適用します。

この匿名関数または`Lambda`は、
配列内の各Referenceを変数`product_ref`に割り当て、
次に`Get`関数を使用して、
参照されたドキュメントを取得します。



shell

```shell
Map(
Paginate(Documents(Collection("products"))),
Lambda('product_ref', Get(Var('product_ref')))
)
```

Now, hover over the **i** icon to see that this costs 17 read operations. During development, you might use many [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)/[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) queries, so the number of read operations can climb quickly. At some point, you might want to leverage an index for cost-efficiency. Let’s leverage an index to do this.

ここで、**i**アイコンにカーソルを合わせると、17回の読み取り操作が必要であることがわかります。開発段階では、[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)/[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)クエリを多く使用するため、読み取り操作の回数は急速に増加する可能性があります。ある時点で、コスト効率のためにインデックスを活用したいと思うかもしれません。そのためにインデックスを活用してみましょう。




Create an index defining which fields from the document that you want to return:

返すドキュメントのフィールドを定義するインデックスを作成します。

shell

```shell
CreateIndex(
{
name: 'product_details',
source: Collection('products'),
values: [
{ field: ['data', 'name'] },
{ field: ['data', 'description'] },
{ field: ['data', 'price'] }
],
},
)
```

Now, paginate using the index:

次に、インデックスを使用してページを移動します。

shell

```shell
Paginate(Match(Index("product_details")))
```

If you hover over the **i** icon, you can see that using the [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) and [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) functions together costs only eight read operations!

オーバーあなたホバー場合は、私のアイコンは、使用していることがわかります IndexとMatch一緒に機能するだけで8読み取り操作をコスト！

Combining [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) with [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) might be inexpensive during development, but you should leverage indexes as your usage scales.

との組み合わせMapはGet開発中に安価になる可能性がありますが、使用量の拡大に応じてインデックスを活用する必要があります。

5.  **Try some GraphQL**

GraphQLを試してみてください

Click **GraphQL** in the left sidebar to access the GraphQL Playground.

左側のサイドバーでGraphQLをクリックして、GraphQL 遊び場。

![The Fauna Dashboard GraphQL](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-playground-initial.png)

Next, copy/paste the following query into the left panel of the editor, then click the "play" button in the middle.

次に、次のクエリをコピーしてエディタの左側のパネルに貼り付け、中央の[再生]ボタンをクリックします。

graphql

```graphql
query {
findProductByID(id: "202") {
name
description
price
}
}
```

This query fetches a single document based on its Reference ID, just like the FQL example in [Step #4](#step4):

このクエリは、に基づいて単一のドキュメントをフェッチします 参照ID、ステップ4のFQLの例と同じように：

```json
{
"data": {
"findProductByID": {
"name": "pinata",
"description": "Original Classic Donkey Pinata",
"price": 24.99
}
}
}
```

Each GraphQL query is translated into a single FQL query, which means that the GraphQL API has completely solved the [n+1](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a) problem behind the scenes for you.

各 GraphQLクエリは単一のFQLクエリに変換されます。これは、GraphQLAPIが舞台裏でn + 1の問題を完全に解決したことを意味します。

How Fauna solved n+1, or why FQL + GraphQL = ![Emoji: heart rocket](https://docs.fauna.com/fauna/current/start//_images/icon-heart_rocket.png)

Faunaがn+1をどのように解決したか？ また、なぜFQL+GraphQL ＝

While GraphQL famously solves the over-fetching and under-fetching of traditional REST APIs, it sometimes causes another serious problem: too many round trips to the server, AKA the notorious "[n+1](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a) problem". Typically, there are two approaches to solve this:

一方 GraphQL有名なオーバーフェッチと伝統的なREST APIを下-取り出し、それは時々別の深刻な問題を引き起こし解決：AKAサーバにあまりにも多くのラウンドトリップ、悪名高い「N + 1つの問題」。通常、これを解決するには2つのアプローチがあります。

-   The first is query batching/caching with a data loader, but such tools introduce complexity and don’t solve the entire problem. You still end up with more than one round trip to the server.

1つ目は、データローダーを使用したクエリのバッチ処理/キャッシュですが、このようなツールは複雑さをもたらし、問題全体を解決するわけではありません。それでも、サーバーへのラウンドトリップは複数回発生します。

-   The second is to generate one query from each GraphQL query, but this sometimes results in a monster join that can choke traditional SQL databases. Instead of relying on joins, Fauna uses a strategy more akin to what graph databases call index-free adjacency. By nesting Map/Get queries, FQL maps perfectly on the execution plan of a GraphQL query, efficiently walking down the GraphQL tree and retrieving nested documents.

2つ目は、それぞれから1つのクエリを生成することです。 GraphQLクエリを実行しますが、これにより、従来のSQLデータベースを窒息させる可能性のあるモンスター結合が発生する場合があります。Faunaは、結合に依存する代わりに、グラフデータベースがインデックスフリー隣接と呼ぶものに似た戦略を使用します。Map / Getクエリをネストすることにより、FQLはの実行プランに完全にマッピングされます。GraphQL クエリ、効率的に歩きます GraphQL ツリーとネストされたドキュメントの取得。

In other words, any given query you send to the GraphQL API always incurs only one single request to the database, and does so efficiently. For a more in-depth explanation, with examples, see [our blog post](https://fauna.com/blog/no-more-n-1-problems-with-faunadbs-graphql-api).

incurs
発生する

言い換えれば、あなたが送信する任意のクエリは GraphQLAPIは、データベースに対して常に1つのリクエストのみを発生させ、効率的に実行します。例を含むより詳細な説明については、ブログ投稿を参照してください 。

Practice more GraphQL queries and their FQL equivalents

もっと練習する GraphQLクエリとそれに相当するFQL

Run these queries using the **GRAPHQL** screen.

GRAPHQL画面を使用してこれらのクエリを実行します。

Run these queries using the **SHELL** screen.

SHELL画面を使用してこれらのクエリを実行します。

#### Create a product

graphql

```graphql
mutation {
createProduct(data: {
name: "Lemon",
description: "Organic, per each",
price: 0.35,
quantity: 100,
store: { connect: "301" },
backorderLimit: 10,
backordered: false,
}) {
_id
}
}
```

shell

```shell
Create(
Collection("products"),
{
data: {
"name": "Apple",
"description": "Gala, per each",
"price": 0.89,
"quantity": 1000,
"storeId": Ref(Collection("stores"), "301"),
"backorderLimit": 10,
"backordered": false,
}
}
)
```

#### Read all products

すべての製品を読む

graphql

```graphql
query {
allProducts {
data {
_id
name
description
price
quantity
backorderLimit
backordered
}
}
}
```

shell

```shell
Map(
Paginate(
Documents(Collection("products"))
),
Lambda("each_ref", Get(Var("each_ref")))
)
```

#### Update a store

ストアを更新する

graphql

```graphql
mutation {
updateStore(
id: "301",
data: {
name: "DC Fruits R Us"
}
){
_id
}
}
```

shell

```shell
Update(
Ref(Collection("stores"), "301"),
{
data: {
"name": "DC Fruits FTW"
}
}
)
```

#### Read a store

graphql

```graphql
query {
findStoreByID(id: "301") {
_id
name
address {
street
city
state
zipCode
}
}
}
```

shell

```shell
Get(Ref(Collection("stores"), "301"))
```

#### Delete a product

graphql

```graphql
mutation {
deleteProduct(id: "203") {
_id
}
}
```

shell

```shell
Delete(Ref(Collection("products"), "208"))
```

#### Call a UDF to submit an order

UDFに電話して注文を送信する

graphql

```graphql
mutation {
submitOrder(
customerId: "101",
products: [
{
productId: "201",
quantity: 1
}
]
){
_id
}
}
```

shell

```shell
Call(
Function("submit_order"),
"101",
[
{
productId: "204",
quantity: 1
},
{
productId: "205",
quantity: 1
}
]
)
```

6.  **Next steps: Query Fauna from an app**

次のステップ：アプリからFaunaをクエリする

If you already have an app to connect to Fauna, pick your language of choice:

Faunaに接続するアプリを既にお持ちの場合は、選択した言語を選択してください。

[![GraphQL](https://docs.fauna.com/fauna/current/start//_images/graphql-logo.svg)](https://docs.fauna.com/fauna/current/api/graphql/endpoints)  
[GraphQL](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

[![JavaScript](https://docs.fauna.com/fauna/current/start//_images/javascript.png)](https://docs.fauna.com/fauna/current/drivers/javascript)  
[JS/Node](https://docs.fauna.com/fauna/current/drivers/javascript)

[![Java](https://docs.fauna.com/fauna/current/start//_images/java.svg)](https://docs.fauna.com/fauna/current/drivers/jvm)  
[Java](https://docs.fauna.com/fauna/current/drivers/jvm)

[![C#](https://docs.fauna.com/fauna/current/start//_images/csharp.png)](https://docs.fauna.com/fauna/current/drivers/csharp)  
[C#](https://docs.fauna.com/fauna/current/drivers/csharp)

[![Go](https://docs.fauna.com/fauna/current/start//_images/golang.png)](https://docs.fauna.com/fauna/current/drivers/go)  
[Go](https://docs.fauna.com/fauna/current/drivers/go)

[![Python](https://docs.fauna.com/fauna/current/start//_images/python.png)](https://docs.fauna.com/fauna/current/drivers/python)  
[Python](https://docs.fauna.com/fauna/current/drivers/python)

[![Scala](https://docs.fauna.com/fauna/current/start//_images/scala.svg)](https://docs.fauna.com/fauna/current/drivers/jvm)  
[Scala](https://docs.fauna.com/fauna/current/drivers/jvm)

Otherwise, clone and run a sample app:

それ以外の場合は、サンプルアプリのクローンを作成して実行します。

FQL

GraphQL

-   [Rethinking Twitter as a Serverless App](https://docs.fauna.com/fauna/current/start/apps/fwitter)

-   [https://github.com/netlify/netlify-faunadb-example](https://github.com/netlify/netlify-faunadb-example)

-   [https://github.com/molebox/serverless-graphql-potter](https://github.com/molebox/serverless-graphql-potter)

For more sample apps, visit the [awesome-faunadb](https://github.com/n400/awesome-faunadb) list on GitHub.

---

これより下は個人メモ


Welcome to the Fauna documentation! | Fauna Documentation
https://docs.fauna.com/fauna/current/start/

Welcome to the Fauna documentation!
Fauna ドキュメンテーションにようこそ

Fauna is a general purpose, distributed database supporting 
multiple data models and strong global consistency, 
for modern app developers in the serverless era.

Faunaは、
サーバーレス時代の最新のアプリ開発者向けの、
複数のデータモデルと強力なグローバル整合性を
サポートする汎用分散データベースです。

To start querying Fauna from your application code, choose your language:
アプリケーション コードから Fauna のクエリを開始するには
言語を選択してください。

クエリ
データベースに対する命令文
検索エンジンに入力する検索キーワード

GraphQL
JavaScript
JS/Node
Java
C#
Go
Python
Scala

---

5-minute quick start
5分のクイックスタート

Fauna has two main APIs:
GraphQL and FQL (Fauna Query Language).
This quick start provides a brief intro to both
since you can use them together.
Faunaには、GraphQLとFQL(Faunaクエリ言語)
という2つの主要なAPIがあります。
このクイックスタートでは、
両方を一緒に使用できるため、
両方について簡単に紹介します。

2 つの主要な API 
GraphQL
FQL 

---

1.
Sign up for a free account
無料アカウントにサインアップする

---

2.
Create a database
データベースを作成する

---

3
Browse your database
データベースを参照する

The Overview page for the my_db database is displayed. 
The database has been populated 
with some collections, 
indexes, 
and the corresponding GraphQL schema
for a grocery delivery app.
my_dbデータベースの概要ページが表示されます。
データベースには、
いくつかのコレクション、
インデックス、
および食料品配達アプリの対応する
GraphQLスキーマが設定されています。

a
コレクション
Click COLLECTIONS in the left sidebar to browse your collections.
左側のサイドバーで[コレクション]をクリックして、
コレクションを参照します。

You’ll see the documents for each collection on the right.
右側に各コレクションのドキュメントが表示されます。

If you are familiar with SQL,
collections are like tables and documents are like rows in a table,
SQLに精通している場合、
コレクションはテーブルに似ており、
ドキュメントはテーブル内の行に似ていますが、

except that each document can contain its own, distinct fields.
ただし、各ドキュメントには独自の異なるフィールドを含めることができます。

b
索引
Click the INDEXES tab in the left sidebar.
左サイドバーの[INDEXES]タブをクリックします。

If you are familiar with SQL,
Fauna’s indexes are like SQL views.
SQLに精通している場合、
FaunaのインデックスはSQLビューのようなものです。

Most Fauna queries require
a companion index
to help avoid performing full scans of collections
ほとんどのFaunaクエリでは、コレクションのフルスキャン
の実行を回避するためにコンパニオンインデックスが必要ですが、

(which could get expensive),
(コストがかかる可能性があります)

but you can have hundreds of indexes
without affecting overall performance.
が、全体のパフォーマンスに影響を与えることなく、
何百ものインデックスを持つことができます。

a companion index
？？？

index
all customers
all orders
all products
all stores
inventory by product
products by customer
products by price high to low
products by price low to high
products by store

すべてのお客様
すべての注文
すべての商品
すべての店舗
製品別在庫
顧客別商品
価格が高いものから低いものまで
低価格帯から高価格帯までの商品
店舗別商品

c
関数
Click the FUNCTIONS tab in the left sidebar.
左サイドバーの「FUNCTIONS」タブをクリックします。

User-defined functions (UDFs) 
contain custom business logic
that runs on the server, similar to "stored procedures".
ユーザー定義関数（UDF）には、
「ストアドプロシージャ」と同様に、
サーバー上で実行されるカスタムビジネスロジックが含まれています。

UDFs
User-defined functions
ユーザー定義関数

ストアドプロシージャ
stored procedures
SQLによって書かれたいくつかの命令を1つにまとめて部品化したもの

プロシージャ
複数の命令をまとめたもの
戻り値のない関数

This UDF might look weird
if it’s your first time seeing FQL,
the Fauna Query Language,
このUDFは、初めてFQL（Fauna Query Language）を見た人には
奇妙に見えるかもしれませんが、

but FQL is actually pretty easy and tons of fun to learn.
FQLは実際にはとても簡単で、
学ぶのがとても楽しいものです。

FQL is also unique
in how much power and precision it gives you
また、FQLの特徴は
どれだけのパワーと精度を与えてくれるか

with respect to predictable cost and performance as you scale.
予測可能なコストとパフォーマンスを提供します。

might
かもしれない

weird
奇妙

precision
【＠】プレシジョン,《形》精密な,明確さ,《名》精度,正確さ,精密,細心,几帳面さ,絶対精度

predictable

---

4
FQL を試す

Now that we know some basic concepts, let’s query our data.
基本的な概念を理解したところで、データを照会してみましょう。

a
Shellを開く
	Click on SHELL in the left sidebar to open the web shell.

b
	Copy the following FQL query:
	次の FQL クエリをコピーします。

Get(Ref(Collection("products"),"202"))

c
	Replace the queries in the bottom panel
	of the shell by selecting them
	and then and pasting the copied query.
	ボトムパネルのクエリを交換
	シェルの下部パネルのクエリを選択してを選択して、
	コピーしたクエリを貼り付けます。

	pasting
	paste

d
[クエリを実行] をクリックします。

This query simply gets a document identified by its Reference.
このクエリは、単純にReferenceで識別されるドキュメントを取得します。

A document Reference contains a reference
to the document’s collection
ドキュメントのリファレンスには、ドキュメントのコレクション
ドキュメントのコレクションへの参照と

(in this case, "products")
(ここでは「products」)

and a unique ID for the document in that collection
と、そのコレクション内のドキュメントのユニークなID

(in this case, "202").
(この場合は「202」)。

Fauna’s auto-generated Reference IDs are
18-digits long — you can set your own during document creation,
as we have done with the pre-populated demo data to ease copy/pasting.
Faunaの自動生成されたリファレンスIDは以下の通りです。
18桁の長さですが、ドキュメント作成時に独自に設定できます。
コピー／ペーストを容易にするために、
事前に入力されたデモデータで行ったように、
ドキュメント作成時に独自に設定することができます。

The upper panel contains the result of the query:
上部パネルには、クエリの結果が表示されます。

e
Hover your pointer over the [i] icon to the left 
of "Time elapsed" to see the query execution metrics.
For example, here we can learn 
that this query resulted in one read operation.
経過時間」の左にある[i]アイコンにポインタを合わせると 
クエリの実行状況が表示されます。
例えば、ここでは 
このクエリでは、1回の読み取り操作が行われたことがわかります。

You can reduce read operations by leveraging indexes
and using them as views.
インデックスを活用し、それをビューとして使用することで、
読み取り操作を減らすことができます。

Expand the following block to learn more.
詳しくは次のブロックを展開してください。

ビューとしてのインデックスの使用

Indexes can be configured 
to provide any number of document fields.
任意の数のドキュメントフィールドを
提供するように
インデックスは、構成することができます。

Using indexes,
インデックスの使用

you can often avoid using the Get function
to retrieve the values 
必要な値を取得するためにGet関数を使わずに済むこともあります。

that you need,
which reduces the number of read operations required.
を使用せずに、必要な値を取得することができます。
これにより、必要な読み取り操作の回数を減らすことができます。

While Get is used to a retrieve a single document,
Paginate is required when you want to retrieve details about multiple documents.
Getは1つのドキュメントを取得するために使用されますが。
Paginateは、複数のドキュメントの詳細を取得したい場合に必要です。

retrieve
【＠】リトリーブ,【変化】《動》retrieves | retrieving | retrieved,
《他動-1》取り出す,取り戻す,回収する,
《他動-2》（情報を）検索する,《他動-3》～を挽回する,回復する,償う,救う

Try the following:
以下をお試しください。

Paginate(Documents(Collection("products")))

When an index does not have terms and values defined, it only returns ref:ref[]s.
インデックスに用語や値が定義されていない場合は、ref:ref[]のみを返します。

ref:ref[]s
？？？

terms
用語

What if you want the whole document?
ドキュメント全体を見たい場合は？

The most flexible option is the combination of the Map and Get functions.
最も柔軟な方法は、「Map」と「Get」機能を組み合わせることです。

The following query takes the array of References from the previous query,
次のクエリは、前のクエリで取得した References の配列を受け取ります。

then uses the Map function to repeatedly apply an anonymous function
for each Reference in the result.
その後、Map関数を使用して、結果の各Referenceに対して無名関数
を繰り返し適用します。

The anonymous function (or Lambda) assigns each Reference
in the array to the variable product_ref,
無名関数（またはラムダ）は、配列内の各Reference
を変数 product_ref に割り当てます。

then uses the Get function to retrieve the referenced document.
そして、Get関数を使用して、参照されたドキュメントを取得します。

retrieve
取り出す

Map(
Paginate(Documents(Collection("products"))),
Lambda('product_ref', Get(Var('product_ref')))
)

Now, hover over the [i] icon to see that this costs 17 read operations.
ここで、iアイコンにカーソルを合わせると、
17回の読み取り操作が行われていることがわかります。

During development, 
開発段階では、

you might use many Map/Get queries,
多くのMap/Getクエリを使用することがあります。

so the number of read operations can climb quickly.
そのため、読み取り操作の数はすぐに増えてしまいます。

At some point,
ある時点で、
you might want to leverage an index for cost-efficiency.
コスト効率を上げるためにインデックスを活用したいと思うかもしれません。
Let’s leverage an index to do this.
そのために、インデックスを活用してみましょう。

hover over
覆い被さる

leverage
《名》（目的を達成するための）
力,
てこの作用,
てこ装置,
影響力,
財務てこ率,
手段,
武器,
勢力,
行動力,
《自他動-1》借入金で投機する,
てこ入れする,
《自他動-2》利用する,
活用する,
【同】utilize,
技術文書でよく使われる動詞

Create an index defining which fields from the document that you want to return:
ドキュメントの どのフィールドを返したいかを 定義するインデックスを 作成します。
リピートok

CreateIndex(
{
name: 'product_details',
source: Collection('products'),
values: [
{ field: ['data', 'name'] },
{ field: ['data', 'description'] },
{ field: ['data', 'price'] }
],
},
)

Now, paginate using the index:
さて、インデックスを使ってページネーションを行います。

Paginate(Match(Index("product_details")))

If you hover over the [i] icon,
[i]のアイコンにカーソルを合わせると、

you can see that using the Index and Match functions together
costs only eight read operations!
IndexとMatchの機能を一緒に使うと、
8回の読み取り操作で済むことがわかります。

Combining Map with Get might be inexpensive during development,
but you should leverage indexes as your usage scales.
MapとGetの組み合わせは、
開発中は安価かもしれませんが、
使用量が増えてきたらインデックスを活用すべきです。

シェル
--------------------------------------------
１行（下側）実行される。１行目にセミコロンがついていない。
Paginate(Documents(Collection("products")))
Get(Ref(Collection("products"),"202"))

2行実行される。１行目にセミコロンがついている
Paginate(Documents(Collection("products")));
Get(Ref(Collection("products"),"202"))
--------------------------------------------

結果
```
Paginate(Documents(Collection("products")))

{
data: [
Ref(Collection("products"), "201"),
Ref(Collection("products"), "202"),
Ref(Collection("products"), "203"),
Ref(Collection("products"), "204"),
Ref(Collection("products"), "205"),
Ref(Collection("products"), "206"),
Ref(Collection("products"), "207"),
Ref(Collection("products"), "208"),
Ref(Collection("products"), "209")
]
}

>> Time elapsed: 32ms
```

Paginate
《他動》ページ番号をつける

---

5
GraphQL を試してみる

Click GraphQL in the left sidebar to access the GraphQL Playground.
左側のサイドバーで [GraphQL] をクリックして、
GraphQL Playground にアクセスします。

Next, copy/paste the following query into the left panel of the editor, 
then click the "play" button in the middle.
次に、以下のクエリをエディタの左パネルにコピー＆ペーストします。
中央の "play "ボタンをクリックします。

query {
findProductByID(id: "202") {
name
description
price
}
}

This query fetches a single document based on its Reference ID,
just like the FQL example in Step #4:
このクエリは、ステップ 4 の FQL の例と同じように、
参照 ID に基づいて単一のドキュメントを取得します。

Each GraphQL query is translated into a single FQL query,
which means that the GraphQL API has completely
solved the n+1 problem behind the scenes for you.
各 GraphQL クエリは単一の FQL クエリに変換されます。
これは、GraphQL API が舞台裏で n+1 問題を
完全に解決したことを意味します。

ブロック1
How Fauna Solved n+1, or why FQL + GraphQL
While GraphQL famously solves the over-fetching 
and under-fetching of traditional REST APIs,
it sometimes causes another serious problem:
too many round trips to the server,
AKA the notorious "​n+1 problem".
Typically, there are two approaches to solve this:
GraphQLは、従来のREST APIのオーバーフェッチや
アンダーフェッチを解決してくれることで有名ですが、
時として別の深刻な問題を引き起こすことがあります。
それは、サーバーへのラウンドトリップが多すぎること、
別名、悪名高い「n+1問題」です。
一般的に、これを解決するには2つのアプローチがあります。

The first is query batching/caching with a data loader,
but such tools introduce complexity and don’t solve the entire problem.
You still end up with more than one round trip to the server.
1つ目は、データローダを使ったクエリのバッチ処理/キャッシュですが、
このようなツールは複雑さをもたらし、
問題全体を解決するものではありません。
結局、サーバーへのラウンドトリップは1回以上になってしまいます。

The second is to generate one query from each GraphQL query,
but this sometimes results in a monster join 
that can choke traditional SQL databases.
Instead of relying on joins, Fauna uses a strategy more akin
to what graph databases call index-free adjacency.
By nesting Map/Get queries, FQL maps perfectly 
on the execution plan of a GraphQL query,
efficiently walking down the GraphQL tree and retrieving nested documents.
2つ目の方法は、
各GraphQLクエリから1つのクエリを生成することですが、
これでは従来のSQLデータベースを窒息させるような
モンスタージョインになってしまうことがあります。
Faunaでは結合に頼らず、
グラフデータベースの「インデックスフリーの隣接」
に近い戦略を採用している。
Map/Getクエリを入れ子にすることで、
FQLはGraphQLクエリの実行プランに完全にマッピングし、
効率的にGraphQLツリーを歩き、
入れ子になったドキュメントを取得します。

In other words,
言い換えれば、

any given query you send to the GraphQL API
always incurs only one single request to the database,
and does so efficiently.
GraphQLAPIに送信されたクエリは、
常にデータベースへの1回のリクエストしか発生せず、
しかもそれが効率的に行われるということです。

For a more in-depth explanation,
with examples, see our blog post.
例を挙げての詳しい説明は、
ブログ記事をご覧ください。

incurs
【＠】インカー,
【変化】《動》incurs|incurring|incurred,
《他動》～にぶつかる,
受ける,被る,
（好ましくないことを）
招く,負う

ブロック2
Practice more GraphQL queries and their FQL equivalents
もっと練習するGraphQLとそれに相当するFQLを練習する

製品を作成する

GraphQL
mutation {
createProduct(data: {
name: "Lemon",
description: "Organic, per each",
price: 0.35,
quantity: 100,
store: { connect: "301" },
backorderLimit: 10,
backordered: false,
}) {
_id
}
}

結果
300156312289804808

同じFQL

Create(
Collection("products"),
{
data: {
"name": "Apple",
"description": "Gala, per each",
"price": 0.89,
"quantity": 1000,
"storeId": Ref(Collection("stores"), "301"),
"backorderLimit": 10,
"backordered": false,
}
}
)

結果（一部）
300156339133350408

結果
{
ref: Ref(Collection("products"), "300156339133350408"),
ts: 1622510241610000,
data: {
name: "Apple",
description: "Gala, per each",
price: 0.89,
quantity: 1000,
storeId: Ref(Collection("stores"), "301"),
backorderLimit: 10,
backordered: false
}
}

すべての製品を読む

GraphQL

query {
allProducts {
data {
_id
name
description
price
quantity
backorderLimit
backordered
}
}
}

結果

同じFQL
Map(
Paginate(
Documents(Collection("products"))
),
Lambda("each_ref", Get(Var("each_ref")))
)
結果

ストアを更新する

GraphQL
mutation {
updateStore(
id: "301",
data: {
name: "DC Fruits R Us"
}
){
_id
}
}
結果

同じFQL
Update(
Ref(Collection("stores"), "301"),
{
data: {
"name": "DC Fruits FTW"
}
}
)
結果

店舗を読む

GraphQL
query {
findStoreByID(id: "301") {
_id
name
address {
street
city
state
zipCode
}
}
}

結果

同じFQL
Get(Ref(Collection("stores"), "301"))

結果

商品を削除する

GraphQL
mutation {
deleteProduct(id: "203") {
_id
}
}

結果

同じFQL
Delete(Ref(Collection("products"), "208"))

結果

UDF を呼び出して注文を送信する

GraphQL
mutation {
submitOrder(
customerId: "101",
products: [
{
productId: "201",
quantity: 1
}
]
){
_id
}
}

結果

同じFQL
Call(
Function("submit_order"),
"101",
[
{
productId: "204",
quantity: 1
},
{
productId: "205",
quantity: 1
}
]
)
結果

---

6.
Next steps: Query Fauna from an app
次のステップ アプリからFaunaに問い合わせる

