Welcome to the Fauna documentation! | Fauna Documentation
https://docs.fauna.com/fauna/current/start/

# Welcome to the Fauna documentation!

# Fauna のドキュメントへようこそ!

Fauna is a general purpose, distributed database supporting multiple data models and strong global consistency, for modern app developers in the serverless era.

consistency
整合性

Fauna は NoSQL

Fauna は、サーバーレス時代の現代のアプリ開発者のために、複数のデータモデルと強力なグローバル一貫性をサポートする汎用の分散型データベースです。

To start querying Fauna from your application code, choose your language:

アプリケーションコードから Fauna へのクエリを開始するには、言語を選択してください。

[![GraphQL](https://docs.fauna.com/fauna/current/start//_images/graphql-logo.svg)](https://docs.fauna.com/fauna/current/api/graphql/endpoints)  
[GraphQL](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

[![GraphQL](https://docs.fauna.com/fauna/current/start//_images/graphql-logo.svg)](https://docs.fauna.com/fauna/current/api/graphql/endpoints)  
[GraphQL](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

[![JavaScript](https://docs.fauna.com/fauna/current/start//_images/javascript.png)](https://docs.fauna.com/fauna/current/drivers/javascript)  
[JS/Node](https://docs.fauna.com/fauna/current/drivers/javascript)

[![JavaScript](https://docs.fauna.com/fauna/current/start//_images/javascript.png)](https://docs.fauna.com/fauna/current/drivers/javascript)  
[JS/Node](https://docs.fauna.com/fauna/current/drivers/javascript)

## [](#quick-start)5-minute quick start

5 分間のクイックスタート

Fauna has two main APIs: GraphQL and FQL (Fauna Query Language). This quick start provides a brief intro to both since you can use them together.

Fauna には 2 つの主要な API があります。GraphQL と FQL (Fauna Query Language) です。このクイックスタートでは、両方を一緒に使うことができるので、簡単に紹介します。

1.  **Sign up for a free account**

**無料のアカウントを取得します。**

Sign up at [https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register).

[https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register)でサインアップします。

When you first log in, you are greeted with a Welcome tutorial. Click anywhere (other than the tutorial panel) to close it. You can return to the tutorial at any time by clicking the question mark **?** button at the top right.

最初のログイン時には、Welcome チュートリアルが表示されます。どこか（チュートリアルパネル以外）をクリックすると、チュートリアルが閉じます。右上のクエスチョンマーク **?** ボタンをクリックすれば、いつでもチュートリアルに戻ることができます。

![The Fauna Dashboard home screen with tutorial prompt](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-home-tutorial.png)

![チュートリアルが表示されたFauna Dashboardのホーム画面](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-home-tutorial.png)

2.  **Create a database**

**データベースの作成**

1.  Click **NEW DATABASE**.

**New DATABASE**をクリックする。

![The Fauna Dashboard new database screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-new_database.png)

![Fauna Dashboard の新規データベース画面](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-new_database.png)

2.  Enter `my_db` into the "Database Name" field.

データベース名」欄に「my_db」と入力する。

3.  Check the "Pre-populate with demo data" checkbox.

Pre-populate with demo data "のチェックボックスにチェックを入れる。

4.  Click **SAVE**.

**SAVE**をクリックする。

    You have created your first Fauna database!

    これで初めてのFaunaデータベースの作成が完了しました。

3.  **Browse your database**

**データベースをブラウズする**

The Overview page for the `my_db` database is displayed. The database has been populated with some collections, indexes, and the corresponding GraphQL schema for a grocery delivery app.

populated

《電子工学》〔基板に部品が〕実装済みの

has been populated

は入力されている

corresponding

対応する

`my_db`データベースの概要ページが表示されています。このデータベースには、いくつかのコレクション、インデックス、そして食料品配送アプリに対応する GraphQL スキーマが入力されています。

1.  **Collections**

**コレクション**の作成

Click **COLLECTIONS** in the left sidebar to browse your collections. You’ll see the documents for each collection on the right. If you are familiar with SQL, collections are like tables and documents are like rows in a table, except that each document can contain its own, distinct fields.

familiar
【名-1】親友、親しい仲間［友人］
【名-2】精通している［詳しい］人〔ある物事に〕、よく出入りする［訪れる］人〔ある場所に〕
【名-3】雇人、用務員、用人 ◆ カトリック教の教皇や司教の
【形-1】おなじみの、精通している、よく知られている、（～に）通じている、（～の）様子を知っている、造詣が深い、心当たりがある
【形-2】聞き慣れた、見慣れた、普通の、珍しくない
【形-3】打ち解けた、なじんだ、親しみがある、親しい、気楽な

except

【接】ただし～を除く
【前-1】～を除いて、～以外は、～をおいて、～以外に
【前-2】～がなければ、～以外では、～を除いては、別にすれば、～の点を除いては、～のほかは
【他動】～を例外として、～を…から省く、～を除外する

左サイドバーの**COLLECTIONS**をクリックすると、コレクションを閲覧できます。右側には、各コレクションのドキュメントが表示されます。SQL に詳しい方なら、コレクションはテーブルのようなもので、ドキュメントはテーブルの行のようなものですが、各ドキュメントには独自の異なるフィールドを含めることができます。

2.  **Indexes**

**Indexes** (インデックス)

Click the **INDEXES** tab in the left sidebar. If you are familiar with SQL, Fauna’s indexes are like SQL views. Most Fauna queries require a companion index to help avoid performing full scans of collections (which could get expensive), but you can have hundreds of indexes without affecting overall performance.

左サイドバーの「**INDEXES**」タブをクリックします。SQL に精通していれば、Fauna のインデックスは SQL のビューのようなものです。ほとんどの Fauna クエリは、コレクションのフルスキャンの実行を避けるためにコンパニオンインデックスを必要としますが、全体のパフォーマンスに影響を与えることなく数百のインデックスを持つことができます。

3.  **Functions**

「**機能**」をクリックします。

Click the **FUNCTIONS** tab in the left sidebar. User-defined functions (UDFs) contain custom business logic that runs on the server, similar to "stored procedures".

左サイドバーの「**FUNCTIONS**」タブをクリックします。ユーザー定義関数(UDF)には、「ストアドプロシージャ」と同様に、サーバー上で実行されるカスタムビジネスロジックが含まれています。

ストアドプロシージャとは

データベース管理システム（DBMS）の機能の一つで、データベースに対する連続した複数の処理を一つのプログラムにまとめ、データと共に保存できるようにしたもの。処理は DBMS 側で行われ、外部からはクエリを発行するのと同じ手順で実行できる。

This UDF might look weird if it’s your first time seeing FQL, the Fauna Query Language, but FQL is actually pretty easy and tons of fun to learn. FQL is also unique in how much power and precision it gives you with respect to predictable cost and performance as you scale.

might
かもしれない

weird
【形-1】風変わりな、変な、妙な、奇妙な、珍妙な、不思議な、不可思議な、超自然的な、この世の物とは思えない、気味が悪い、恐ろしい、不気味な、異様な

actually

実は、実際は

tons of
たくさんの、大量の、山ほどの、ものすごい数［量］の ◆【同】a lot of ; lots of

precision

precision
【名】正確さ、明確さ、的確、精度、精密、細心、几帳面さ
【形】精密な

この UDF は、初めて FQL（Fauna Query Language）を見た人には奇妙に見えるかもしれませんが、FQL は実際にはとても簡単で、学ぶのがとても楽しいものです。また、FQL は、スケールアップしても予測可能なコストとパフォーマンスに関して、どれだけのパワーと精度を与えてくれるかという点でもユニークです。

4.  **Try some FQL**

**FQL を使ってみよう**

Now that we know some basic concepts, let’s query our data.

Now that
今や～だから、～からには
・Now that things are better, we should talk about the problem. : 状況も好転してきたので、問題について話し合うべきだ。
・Now that you put it that way, I sort of agree with you. : 言われてみるとそうですね。
それは本当に◆「ほかはともかく直前の発言について言えば」と取り立てて論じる。thatは主語。しばしば強調される。

基本的な概念を理解したところで、データを照会してみましょう。

1.  Click on **SHELL** in the left sidebar to open the web shell.

左サイドバーの**SHELL**をクリックして、ウェブシェルを開きます。

2.  Copy the following FQL query:

以下の FQL クエリをコピーします。

```shell
Get(Ref(Collection("products"),"202"))
```

3.  Replace the queries in the bottom panel of the shell by selecting them and then and pasting the copied query.

シェルの下部パネルにあるクエリを選択して置き換え、コピーしたクエリを貼り付けます。

4.  Click **RUN QUERY**.

**RUN QUERY**をクリックします。

This query simply gets a document identified by its [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). A document [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) contains a reference to the document’s collection (in this case, "products") and a unique ID for the document in that collection (in this case, "202"). Fauna’s auto-generated Reference IDs are 18-digits long — you can set your own during document creation, as we have done with the pre-populated demo data to ease copy/pasting.

このクエリは単に[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)で特定されるドキュメントを取得するものです。ドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)には、そのドキュメントのコレクション(この場合は「products」)への参照と、そのコレクション内のドキュメントのユニークな ID(この場合は「202」)が含まれています。Fauna の自動生成された参照 ID は 18 桁の長さですが、コピー/ペーストを容易にするために、事前に入力されたデモデータと同様に、ドキュメント作成時に独自に設定することができます。

The upper panel contains the result of the query:

上部パネルには、クエリの結果が表示されます。

![The Fauna Dashboard shell screen with the query result](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-result.png)

![Fauna Dashboardのシェル画面にクエリの結果が表示されます](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-result.png)

5.  Hover your pointer over the **i** icon to the left of "Time elapsed" to see the query execution metrics. For example, here we can learn that this query resulted in one read operation.

"Time elapsed "の左にある**i**アイコンにポインタを合わせると、クエリの実行メトリックスが表示されます。例えば、このクエリでは 1 回の読み取り操作が行われたことがわかります。

![The Fauna Dashboard shell screen with the query result and query statistics tooltip](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-stats.png)

![Fauna Dashboardのシェル画面に表示されるクエリ結果とクエリ統計のツールチップ](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-shell-stats.png)

You can reduce read operations by leveraging indexes and using them as views. Expand the following block to learn more.

インデックスを活用し、それをビューとして使用することで、読み取り操作を減らすことができます。次のブロックを展開して詳細を確認してください。

Using indexes as views

ビューとしてのインデックスの使用

Indexes can be configured to provide any number of document fields. Using indexes, you can often avoid using the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the values that you need, which reduces the number of read operations required.

インデックスは、任意の数のドキュメントフィールドを提供するように構成できます。インデックスを使用すると、必要な値を取得するために[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を使用しなくて済むことが多く、必要な読み取り操作の回数を減らすことができます。

While [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) is used to a retrieve a single document, [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) is required when you want to retrieve details about multiple documents.

1 つのドキュメントを取得するためには[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)を使いますが、複数のドキュメントの詳細を取得したい場合には[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)が必要になります。

Try the following:

以下のようにしてみてください。

shell

```shell
Paginate(Documents(Collection("products")))
```

When an index does not have `terms` and `values` defined, it only returns ref:ref[]s.

インデックスに `terms` と `values` が定義されていない場合、ref:ref[]しか返ってきません。

What if you want the whole document? The most flexible option is the combination of the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) and [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) functions.

ドキュメント全体を取得したい場合は？最も柔軟な方法は、[Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)と[Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)の組み合わせです。

The following query takes the array of [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s from the previous query, then uses the `Map` function to repeatedly apply an anonymous function for each [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in the result. The anonymous function (or [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)) assigns each [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in the array to the variable `product_ref`, then uses the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the referenced document.

次のクエリは、前のクエリから[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)の配列を受け取り、`Map`関数を使って、結果の各[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)に対して匿名関数を繰り返し適用します。この匿名関数（または[Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)）は、配列内の各[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を変数 `product_ref` に割り当て、[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を使用して参照されたドキュメントを取得します。

shell

```shell
Map(
  Paginate(Documents(Collection("products"))),
  Lambda('product_ref', Get(Var('product_ref')))
)
```

Now, hover over the **i** icon to see that this costs 17 read operations. During development, you might use many [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)/[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) queries, so the number of read operations can climb quickly. At some point, you might want to leverage an index for cost-efficiency. Let’s leverage an index to do this.

ここで、**i**アイコンにカーソルを合わせると、17 回の読み取り操作が必要であることがわかります。開発時には、[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)/[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)のクエリを多用することがあるので、読み込み操作の回数はすぐに増えてしまいます。ある時点で、コスト効率のためにインデックスを活用したいと思うかもしれません。そのためにインデックスを活用してみましょう。

Create an index defining which fields from the document that you want to return:

ドキュメントのどのフィールドを返したいかを定義するインデックスを作成します。

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

では、インデックスを使ってページネーションしてみましょう。

shell

```shell
Paginate(Match(Index("product_details")))
```

If you hover over the **i** icon, you can see that using the [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) and [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) functions together costs only eight read operations!

i\*\*アイコンにカーソルを合わせると、[`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex)と[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)の関数を一緒に使うと、たった 8 回の読み取り操作で済むことがわかります!

Combining [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) with [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) might be inexpensive during development, but you should leverage indexes as your usage scales.

[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)と[Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)の組み合わせは、開発中は安価かもしれませんが、使用量が増えてきたらインデックスを活用すべきです。

5.  **Try some GraphQL**

**GraphQL を使ってみよう**

Click **GraphQL** in the left sidebar to access the GraphQL Playground.

左サイドバーの**GraphQL**をクリックすると、GraphQL Playground にアクセスできます。

![The Fauna Dashboard GraphQL](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-playground-initial.png)

![The Fauna Dashboard GraphQL](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-playground-initial.png)

Next, copy/paste the following query into the left panel of the editor, then click the "play" button in the middle.

次に、以下のクエリをエディタの左パネルにコピー＆ペーストし、中央の「play」ボタンをクリックします。

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

このクエリは、[Step #4](#step4)の FQL の例と同じように、Reference ID に基づいて 1 つのドキュメントを取得します。

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

それぞれの GraphQL クエリは、1 つの FQL クエリに変換されます。つまり、GraphQL API は、舞台裏で[n+1](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a)問題を完全に解決してくれたことになります。

## How Fauna solved n+1, or why FQL + GraphQL = ![Emoji: heart rocket](https://docs.fauna.com/fauna/current/start//_images/icon-heart_rocket.png)

Fauna はいかにして n+1 を解決したのか、あるいはなぜ FQL + GraphQL = ![絵文字: ハートロケット](https://docs.fauna.com/fauna/current/start//_images/icon-heart_rocket.png)

While GraphQL famously solves the over-fetching and under-fetching of traditional REST APIs, it sometimes causes another serious problem: too many round trips to the server, AKA the notorious "[n+1](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a) problem". Typically, there are two approaches to solve this:

GraphQL は、従来の REST API のオーバーフェッチやアンダーフェッチを解決することで有名ですが、時として別の深刻な問題を引き起こすことがあります。それは、サーバーへのラウンドトリップが多すぎること、つまり悪名高い「[n+1](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a)問題」です。一般的に、これを解決するには 2 つのアプローチがあります。

- The first is query batching/caching with a data loader, but such tools introduce complexity and don’t solve the entire problem. You still end up with more than one round trip to the server.

- 1 つ目は、データローダを使ったクエリのバッチ処理/キャッシュですが、このようなツールは複雑さをもたらし、問題全体を解決するものではありません。結局、サーバーへのラウンドトリップは 1 回以上になってしまいます。

- The second is to generate one query from each GraphQL query, but this sometimes results in a monster join that can choke traditional SQL databases. Instead of relying on joins, Fauna uses a strategy more akin to what graph databases call index-free adjacency. By nesting Map/Get queries, FQL maps perfectly on the execution plan of a GraphQL query, efficiently walking down the GraphQL tree and retrieving nested documents.

- 2 つ目の方法は、各 GraphQL クエリから 1 つのクエリを生成することですが、これでは従来の SQL データベースを窒息させるようなモンスタージョインになってしまうことがあります。Fauna では結合に頼らず、グラフデータベースの「インデックスフリーの隣接」に近い戦略を採用している。Map/Get クエリを入れ子にすることで、FQL は GraphQL クエリの実行プランに完全にマッピングし、効率的に GraphQL ツリーを歩き、入れ子になったドキュメントを取得します。

In other words, any given query you send to the GraphQL API always incurs only one single request to the database, and does so efficiently. For a more in-depth explanation, with examples, see [our blog post](https://fauna.com/blog/no-more-n-1-problems-with-faunadbs-graphql-api).

言い換えれば、GraphQL API に送信されたクエリは、常にデータベースへの 1 回のリクエストしか発生せず、しかもそれが効率的に行われるということです。例を挙げての詳しい説明は、[ブログ記事](https://fauna.com/blog/no-more-n-1-problems-with-faunadbs-graphql-api)をご覧ください。

## Practice more GraphQL queries and their FQL equivalents

いつくかの GraphQL クエリとそれに相当する FQL を練習します。

## GraphQL

Run these queries using the **GRAPHQL** screen.

**GRAPHQL**画面を使って、これらのクエリを実行してみましょう。

#### Create a product

製品の作成

```graphql
mutation {
  createProduct(
    data: {
      name: "Lemon"
      description: "Organic, per each"
      price: 0.35
      quantity: 100
      store: { connect: "301" }
      backorderLimit: 10
      backordered: false
    }
  ) {
    _id
  }
}
```

#### Read all products

全ての商品を読む

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

#### Update a store

ストアの更新

```graphql
mutation {
  updateStore(id: "301", data: { name: "DC Fruits R Us" }) {
    _id
  }
}
```

#### Read a store

ストアの読み込み

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

#### Delete a product

商品を削除する

graphql

```graphql
mutation {
  deleteProduct(id: "203") {
    _id
  }
}
```

#### Call a UDF to submit an order

注文を送信する UDF を呼び出す

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

---

## FQL

Run these queries using the **SHELL** screen.

**SHELL**画面を使用して、これらのクエリを実行します。

#### Create a product

製品の作成

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

全ての商品を読む

```shell
Map(
  Paginate(
    Documents(Collection("products"))
  ),
  Lambda("each_ref", Get(Var("each_ref")))
)
```

#### Update a store

ストアの更新

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

ストアの読み込み

```shell
Get(Ref(Collection("stores"), "301"))
```

#### Delete a product

商品を削除する

```shell
Delete(Ref(Collection("products"), "208"))
```

#### Call a UDF to submit an order

注文を送信する UDF を呼び出す

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

**次のステップ アプリから Fauna に問い合わせる**。

If you already have an app to connect to Fauna, pick your language of choice:

すでに Fauna に接続するアプリをお持ちの場合は、お好きな言語をお選びください。

[![GraphQL](https://docs.fauna.com/fauna/current/start//_images/graphql-logo.svg)](https://docs.fauna.com/fauna/current/api/graphql/endpoints)  
[GraphQL](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

[![JavaScript](https://docs.fauna.com/fauna/current/start//_images/javascript.png)](https://docs.fauna.com/fauna/current/drivers/javascript)  
[JS/Node](https://docs.fauna.com/fauna/current/drivers/javascript)

Otherwise, clone and run a sample app:

それ以外の場合は、サンプルアプリをクローンして実行してください。

FQL

- [Rethinking Twitter as a Serverless App](https://docs.fauna.com/fauna/current/start/apps/fwitter)
- [https://github.com/netlify/netlify-faunadb-example](https://github.com/netlify/netlify-faunadb-example)

GraphQL

- [https://github.com/molebox/serverless-graphql-potter](https://github.com/molebox/serverless-graphql-potter)

For more sample apps, visit the [awesome-faunadb](https://github.com/n400/awesome-faunadb) list on GitHub.

その他のサンプルアプリについては、GitHub の[awesome-faunadb](https://github.com/n400/awesome-faunadb)リストをご覧ください。
