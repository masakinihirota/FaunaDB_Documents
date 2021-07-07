GraphQL quick start | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start

# GraphQL quick start

![Get started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/get-started-graphql.svg)

GraphQL is an open source data query and manipulation language that provides declarative schema definitions and a composable query syntax. By design, GraphQL eliminates over- and under-fetching of relational data, which minimizes network and memory use for clients.

composable
構成する、組み立てる


GraphQLは、オープンソースのデータ検索・操作言語であり、宣言的なスキーマ定義と合成可能なクエリ構文を提供します。GraphQLは、リレーショナルデータのオーバーフェッチやアンダーフェッチを排除するよう設計されており、クライアントのネットワークやメモリの使用を最小限に抑えます。

## [](#resources)Resources

This tutorial, and other GraphQL topics covered within this documentation, provides details of the Fauna GraphQL API. For more general information about GraphQL, training, or the specification itself, see these resources:

Fauna GraphQL APIの詳細については、このチュートリアルと、このドキュメントで扱っている他のGraphQLトピックを参照してください。GraphQLやトレーニング、仕様そのものに関する一般的な情報については、以下のリソースを参照してください。

-   [https://graphql.org/](https://graphql.org/)

-   [https://www.howtographql.com/](https://www.howtographql.com/)

-   [https://github.com/graphql/graphql-spec](https://github.com/graphql/graphql-spec)

To learn more about the Fauna GraphQL API, see the [GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql/), which includes details on the API’s [endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints), [directives](https://docs.fauna.com/fauna/current/api/graphql/directives/), [input types](https://docs.fauna.com/fauna/current/api/graphql/input), [relations](https://docs.fauna.com/fauna/current/api/graphql/relations), and [user-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions).

Fauna GraphQL APIの詳細については、APIの[エンドポイント](https://docs.fauna.com/fauna/current/api/graphql/endpoints)、[ディレクティブ](https://docs.fauna.com/fauna/current/api/graphql/directives/)、[入力タイプ](https://docs.fauna.com/fauna/current/api/graphql/input)、[リレーション](https://docs.fauna.com/fauna/current/api/graphql/relations)、[ユーザー定義関数](https://docs.fauna.com/fauna/current/api/graphql/functions)の詳細を含む[GraphQLリファレンス](https://docs.fauna.com/fauna/current/api/graphql/)を参照してください。

## [](#graphql-tutorial)GraphQL tutorial

This tutorial demonstrates how to get started with GraphQL, including designing an initial schema, importing that schema into Fauna, adding a few documents, and then running a GraphQL query to retrieve those documents. Start to finish, these steps should only take a few minutes to complete.

このチュートリアルでは、GraphQL を使い始める方法を説明します。初期のスキーマを設計し、そのスキーマを Fauna にインポートし、いくつかのドキュメントを追加し、それらのドキュメントを取得するために GraphQL クエリを実行します。最初から最後まで、わずか数分で完了することができます。

The steps:

-   [Log in to Fauna](#login)
-   [Create a GraphQL database](#database)
-   [Create a GraphQL schema](#schema)
-   [Import the GraphQL schema](#import)
-   [Create a document](#create)
-   [Fetch all documents](#query)

1.  **Log in to Fauna**

    Visit [https://dashboard.fauna.com/](https://dashboard.fauna.com/) in your web browser, and log in.

    Webブラウザで[https://dashboard.fauna.com/](https://dashboard.fauna.com/)にアクセスし、ログインしてください。

    ![The Fauna dashboard](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-cloud-home.png)

    ![The Fauna dashboard](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-cloud-home.png)

2.  **Create a GraphQL database**

GraphQLデータベースの作成

    Let’s create a new database to hold our GraphQL data. Any database would work, but this keeps your GraphQL experiments separate.

    新しいデータベースを作成して、GraphQLのデータを保存しましょう。どんなデータベースでも構いませんが、ここではGraphQLの実験を分離しておきます。

    Click **New Database**, enter `graphql` into the **Database Name** field, and press Return (or click **SAVE**).

    New Database**をクリックし、**Database Name**に`graphql`と入力してReturnを押す（または**SAVE**をクリックする）と、新しいデータベースが作成されます。

    ![The new graphql database](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-graphql-new_db.png)

    ![The new graphql database](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-graphql-new_db.png)

3.  **Create a GraphQL schema**

GraphQLスキーマの作成

    A GraphQL schema defines the "shape" of the data that can be managed and queried, including all of the fields and their types. We are going to start with a very basic schema for a "todo" list, where each todo item is just a title and a flag to indicate whether the item is complete or not. The schema also defines the kinds of queries that we want to run.

    GraphQLスキーマは、すべてのフィールドとそのタイプを含む、管理および問い合わせが可能なデータの「形」を定義します。ここでは、「Todo」リストの非常に基本的なスキーマから始めます。各Todoアイテムは、タイトルと、そのアイテムが完了しているかどうかを示すフラグだけです。このスキーマでは、実行したいクエリの種類も定義します。

    Create a file called `schema.gql` containing the following content (or [download it here](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_attachments/graphql/schema.gql)):

    以下の内容を含む `schema.gql` というファイルを作成してください（または [Download it here](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_attachments/graphql/schema.gql)）。

    graphql

    ```graphql
    type Todo {
       title: String!
       completed: Boolean
    }

    type Query {
       allTodos: [Todo!]
       todosByCompletedFlag(completed: Boolean!): [Todo!]
    }
    ```

4.  **Import the GraphQL schema**

GraphQLスキーマをインポートする。

    Before we can perform any GraphQL queries, we need to import the schema into Fauna. Once we do so, the Fauna GraphQL API automatically creates the necessary classes and indexes to support the schema.

    GraphQL クエリを実行する前に、Fauna にスキーマをインポートする必要があります。インポートすると、Fauna GraphQL APIはスキーマをサポートするために必要なクラスとインデックスを自動的に作成します。

    Click **GRAPHQL** in the left sidebar.

    左サイドバーの **GRAPHQL** をクリックします。

    ![The Import your <mark>GraphQL</mark> schema page](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-graphql-import_schema.png)

    Click **IMPORT SCHEMA**, which opens your browser’s file selector. Select the `schema.gql` file, and click the file selector’s **Open** button. The GraphQL Playground screen is displayed:

    IMPORT SCHEMA**をクリックすると，ブラウザのファイルセレクタが開きます．「schema.gql」を選択して、ファイルセレクタの「開く」ボタンをクリックします。GraphQL Playgroundの画面が表示されます。

    ![The <mark>GraphQL</mark> Playground screen](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-graphql-playground.png)

5.  **Create a document**

ドキュメントの作成

    Even though our schema has been imported, there are no documents yet. Let’s create one. Copy the following GraphQL mutation query into the left panel of the GraphQL Playground screen:

    スキーマがインポートされたにもかかわらず、まだドキュメントがありません。ドキュメントを作成してみましょう。以下のGraphQL mutation queryをGraphQL Playground画面の左パネルにコピーします。

    graphql

    ```graphql
    mutation CreateATodo {
       createTodo(data: {
       title: "Build an awesome app!"
       completed: false
       }) {
           title
           completed
       }
    }
    ```

    Then click the "Play" button (the circle with the right-facing triangle). The query should execute and the response should appear in the right panel:

    次に "Play "ボタン（丸に右向きの三角）をクリックします。クエリが実行され、右側のパネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "createTodo": {
          "title": "Build an awesome app!",
          "completed": false
        }
      }
    }
    ```

    The GraphQL Playground screen should now look like this:

    GraphQL Playgroundの画面は次のようになっているはずです。

    ![Created a document in <mark>GraphQL</mark> Playground](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-graphql-created.png)

6.  **Fetch all documents**

すべてのドキュメントを取得する。

    Now that we have a document that can be fetched, let’s run a query to fetch all documents. Copy the following GraphQL fetch query:

    フェッチ可能なドキュメントができたので、すべてのドキュメントをフェッチするクエリを実行してみましょう。以下のGraphQLのフェッチクエリをコピーしてください。

    graphql

    ```graphql
    query FindAllTodos {
      allTodos {
        data {
          _id
          title
          completed
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button in the GraphQL Playground screen (at the top left, just right of the `CreateATodo` tab). Then paste the query into the left panel, and click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、GraphQL Playgroundの画面（左上の「CreateATodo」タブのすぐ右）で、「new tab」 **`+`** ボタンをクリックします。そして、左のパネルにクエリを貼り付けて、「Play」ボタンをクリックします。クエリが実行され、右側のパネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allTodos": {
          "data": [
            {
              "_id": "235276560024732167",
              "title": "Build an awesome app!",
              "completed": false
            }
          ]
        }
      }
    }
    ```

    GraphQL Playground should now look like this:

    GraphQL Playgroundは以下のようになるはずです。

    ![Results of a document search in <mark>GraphQL</mark> Playground](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start../_images/screen-graphql-queried.png)

## [](#conclusion)Conclusion

結論

You have now seen how to prepare Fauna for GraphQL queries, how to create and import a GraphQL schema, how to use the GraphQL Playground screen to create and query data. You are now ready to continue your GraphQL journey!

ここまでで、Fauna を GraphQL クエリ用に準備する方法、GraphQL スキーマを作成してインポートする方法、GraphQL プレイグラウンド画面を使ってデータを作成したりクエリを実行したりする方法を見てきました。これで、GraphQLの旅を続ける準備が整いました!

## [](#next-steps)Next steps

次のステップ
-   [GraphQL relations](https://docs.fauna.com/fauna/current/tutorials/graphql/relations)
-   [Unique constraints in GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/unique)
-   [GraphQL pagination](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination)
-   [GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql/)

GraphQLの関係
GraphQLの一意の制約
GraphQLページネーション
GraphQLリファレンス
