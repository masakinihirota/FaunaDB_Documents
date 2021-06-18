Welcome to the Fauna documentation! | Fauna Documentation
https://docs.fauna.com/fauna/current/start/

# Welcome to the Fauna documentation!

動物相のドキュメントへようこそ！

Fauna is a general purpose, distributed database supporting multiple data models and strong global consistency, for modern app developers in the serverless era.

consistency
整合性

FaunaはNoSQL

Faunaは、サーバーレス時代の現代のアプリ開発者向けに、複数のデータモデルと強力なグローバル整合性をサポートする汎用の分散データベースです。

To start querying Fauna from your application code, choose your language:

アプリケーションコードから動物相のクエリを開始するには、言語を選択します。

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

動物相には2つの主要なAPIがあります。 GraphQLおよびFQL（動物相クエリ言語）。このクイックスタートでは、両方を一緒に使用できるため、両方について簡単に紹介します。

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

これで、最初の動物相データベースが作成されました。

3.  **Browse your database**

データベースを閲覧する

    The Overview page for the `my_db` database is displayed. The database has been populated with some collections, indexes, and the corresponding GraphQL schema for a grocery delivery app.

corresponding
対応する adj

my_dbデータベースの概要ページが表示されます。データベースには、いくつかのコレクション、インデックス、および対応するものが入力されています GraphQL 食料品配達アプリのスキーマ。

    ![The Fauna Dashboard database overview screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-db_overview.png)

    1.  **Collections**

        Click **COLLECTIONS** in the left sidebar to browse your collections. You’ll see the documents for each collection on the right. If you are familiar with SQL, collections are like tables and documents are like rows in a table, except that each document can contain its own, distinct fields.

左側のサイドバーの[コレクション]をクリックして、コレクションを参照します。右側に各コレクションのドキュメントが表示されます。SQLに精通している場合、コレクションはテーブルに似ており、ドキュメントはテーブルの行に似ていますが、各ドキュメントに独自の個別のフィールドを含めることができる点が異なります。

        ![The Fauna Dashboard collections screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-collections.png)

    2.  **Indexes**

インデックス

        Click the **INDEXES** tab in the left sidebar. If you are familiar with SQL, Fauna’s indexes are like SQL views. Most Fauna queries require a companion index to help avoid performing full scans of collections (which could get expensive), but you can have hundreds of indexes without affecting overall performance.

companion index
???

affecting
影響 現在分詞

左側のサイドバーの[インデックス]タブをクリックします。SQLに精通している場合、FaunaのインデックスはSQLビューのようなものです。ほとんどのFaunaクエリには、コレクションのフルスキャンの実行を回避するためのコンパニオンインデックスが必要です（コストがかかる可能性があります）が、全体的なパフォーマンスに影響を与えることなく、数百のインデックスを持つことができます。

        ![The Fauna Dashboard indexes screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-indexes.png)

    3.  **Functions**

        Click the **FUNCTIONS** tab in the left sidebar. User-defined functions (UDFs) contain custom business logic that runs on the server, similar to "stored procedures".

stored procedures
ストアドプロシージャ
データベースに対する一連の処理をまとめた手続きにして、関係データベース管理システム (RDBMS) に保存（永続化）したもの。 永続格納モジュール (Persistent Storage Module) とも呼ばれる。

左側のサイドバーの[機能]タブをクリックします。ユーザー定義関数（UDF）には、「ストアドプロシージャ」と同様に、サーバー上で実行されるカスタムビジネスロジックが含まれています。

        ![The Fauna Dashboard functions screen](https://docs.fauna.com/fauna/current/start//_images/screen-dashboard-functions.png)

        This UDF might look weird if it’s your first time seeing FQL, the Fauna Query Language, but FQL is actually pretty easy and tons of fun to learn. FQL is also unique in how much power and precision it gives you with respect to predictable cost and performance as you scale.

このUDFは、動物相クエリ言語であるFQLを初めて見た場合は奇妙に見えるかもしれませんが、FQLは実際には非常に簡単で、学ぶのがとても楽しいです。FQLは、スケーリング時に予測可能なコストとパフォーマンスに関して、どれだけのパワーと精度を提供するかもユニークです。

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

このクエリは、リファレンスで識別されるドキュメントを取得するだけです。ドキュメント 参照には、ドキュメントのコレクション（この場合は「製品」）への参照と、そのコレクション内のドキュメントの一意のID（この場合は「202」）が含まれます。動物相の自動生成参照 IDの長さは18桁です。事前に入力されたデモデータを使用してコピー/貼り付けを容易にするため、ドキュメントの作成時に独自のIDを設定できます。

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

インデックスは、任意の数のドキュメントフィールドを提供するように構成できます。インデックスを使用すると、多くの場合、Get関数を使用して必要な値を取得することを回避できます。これにより、必要な読み取り操作の数が減ります。

        While [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) is used to a retrieve a single document, [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) is required when you want to retrieve details about multiple documents.

一方でGet、単一のドキュメントを取得するために使用され、 Paginateあなたが複数のドキュメントの詳細を取得する際に必要とされます。

        Try the following:

次のことを試してください。

        shell

        ```shell
        Paginate(Documents(Collection("products")))
        ```

        When an index does not have `terms` and `values` defined, it only returns ref:ref\[\]s.

インデックスが持っていないときtermsとvalues定義され、それが唯一のリターンは、REF：REFを[]秒。

        What if you want the whole document? The most flexible option is the combination of the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) and [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) functions.

ドキュメント全体が必要な場合はどうなりますか？最も柔軟なオプションは、MapとGet関数の組み合わせです。

        The following query takes the array of [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s from the previous query, then uses the `Map` function to repeatedly apply an anonymous function for each [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in the result. The anonymous function (or [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)) assigns each [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in the array to the variable `product_ref`, then uses the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the referenced document.

次のクエリは、前のクエリから参照の配列を取得し、そのMap関数を使用して、結果の各参照に無名関数を繰り返し適用します。匿名関数（または Lambda）は、配列内の各参照を変数 product_refに割り当て、そのGet関数を使用して参照されたドキュメントを取得します。

        shell

        ```shell
        Map(
          Paginate(Documents(Collection("products"))),
          Lambda('product_ref', Get(Var('product_ref')))
        )
        ```

        Now, hover over the **i** icon to see that this costs 17 read operations. During development, you might use many [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)/[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) queries, so the number of read operations can climb quickly. At some point, you might want to leverage an index for cost-efficiency. Let’s leverage an index to do this.

ここで、iアイコンにカーソルを合わせると、17回の読み取り操作が必要であることがわかります。開発中は、多くのMap/Get クエリを使用する可能性があるため、読み取り操作の数は急速に増加する可能性があります。ある時点で、コスト効率のためにインデックスを活用したい場合があります。これを行うためにインデックスを活用しましょう。

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

次のステップ：アプリから動物相をクエリする

    If you already have an app to connect to Fauna, pick your language of choice:

動物相に接続するアプリを既にお持ちの場合は、選択した言語を選択してください。

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



    