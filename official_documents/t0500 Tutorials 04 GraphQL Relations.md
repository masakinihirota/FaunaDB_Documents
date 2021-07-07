GraphQL relations | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/graphql/relations

# GraphQL relations

This tutorial assumes that you have successfully completed the [GraphQL quick start](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start) tutorial, and that you still have the [Fauna Dashboard](https://dashboard.fauna.com/) open in a browser tab/window, on the GraphQL Playground screen.

このチュートリアルでは、[GraphQL quick start](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)のチュートリアルが完了しており、GraphQL Playground画面の[Fauna Dashboard](https://dashboard.fauna.com/)がブラウザのタブ/ウィンドウで開かれていることを前提としています。

If your Dashboard session has expired:

ダッシュボードのセッションが終了している場合

1.  [Log in again](https://dashboard.fauna.com/).

 [Log in again](https://dashboard.fauna.com/)をクリックします。

2.  Select the `graphql` database.

 `graphql` データベースを選択します。

3.  Click the **GRAPHQL** button in the left navigation.

左側のナビゲーションにある**GRAPHQL**ボタンをクリックします。

To form bi-directional relations in GraphQL requires using the `@relation` directive. `@relation` connects an attribute in a GraphQL schema to another GraphQL type.

bi-directional
双方向の

GraphQLで双方向の関係を構築するには、`@relation`ディレクティブを使う必要がある。`@relation`は、GraphQLスキーマの属性を別のGraphQLタイプに接続します。

In this tutorial, we are going to extend the current schema (established in the [Get started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start) tutorial). Instead of simply storing todo records, we are going to categorize our todos using lists.

このチュートリアルでは、現在のスキーマ（[Get started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)のチュートリアルで確立したもの）を拡張していきます。単純にTodoのレコードを保存するのではなく、リストを使ってTodoを分類することにします。

The steps:

手順を説明します。

-   [Create a new schema file](#schema-file)

新しいスキーマファイルの作成](#schema-file)

-   [Import the new GraphQL schema into Fauna](#import)

[新しい GraphQL スキーマを Fauna にインポート](#import)

-   [Create a todo list](#create-list)

Todoリストを作成

-   [Create todos in the list](#create-todo)

TODOリストにTODOを作成する

-   [Query the list for related todos](#query-list)

関連するTODをリストに問い合わせる

-   [Query all todos](#query-all)

すべてのTodoを検索

-   [Update the first todo to join the list](#update-todo)

リストに参加する最初のTodoを更新する

-   [Create a list with its own todos](#add-todos)

自身のTODOを持つリストを作成する

1.  **Create a new schema file**

新しいスキーマファイルを作成します。

    Create the file `schema-relations.gql` with the following content (or [download it here](https://docs.fauna.com/fauna/current/tutorials/graphql/relations../_attachments/graphql/schema-relations.gql)):

    以下の内容のファイル`schema-relations.gql`を作成します(または[ここからダウンロード](https://docs.fauna.com/fauna/current/tutorials/graphql/relations../_attachments/graphql/schema-relations.gql)します)。

    graphql

    ```graphql
    type Todo {
      title: String!
      completed: Boolean!
      list: List
    }

    type List {
      title: String!
      todos: [Todo] @relation
    }

    type Query {
      allTodos: [Todo!]
      todosByCompletedFlag(completed: Boolean!): [Todo!]
      allLists: [List!]
    }
    ```

2.  **Import the new GraphQL schema into Fauna**

新しいGraphQLスキーマをFauna**にインポートします。

    Click the **UPDATE SCHEMA** button on the GraphQL Playground screen in your browser, which opens your browser’s file selector. Select the `schema-relations.gql` file, and click the file selector’s **Open** button.

  ブラウザのGraphQL Playground画面で**UPDATE SCHEMA**ボタンをクリックすると、ブラウザのファイルセレクタが開きます。schema-relations.gql`を選択して、ファイルセレクタの**Open**ボタンをクリックします。

    This new schema only updates collections (and associated indexes) with the same name. Any other collections are unaffected.

    この新しいスキーマは、同じ名前のコレクション（および関連するインデックス）のみを更新します。その他のコレクションは影響を受けません。

3.  **Create a todo list**

Todoリストの作成

    With the new schema in place (which preserves any existing todo items), we can now create a list that todo items can belong to.

    新しいスキーマができたので（既存のTodoアイテムはすべて保持されます）、Todoアイテムが所属できるリストを作成します。

    Copy the following GraphQL mutation query:

    以下の GraphQL mutation クエリをコピーします。

    graphql

    ```graphql
    mutation CreateAList {
      createList(data: {
        title: "Development"
      }) {
        title
        _id
      }
    }
    ```

    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Then paste the query into the left panel, and click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、ブラウザのGraphQL Playground画面で、「新しいタブ」**`+`**ボタンをクリックします（左上の、最後のクエリタブのすぐ右）。そして、左のパネルにクエリを貼り付けて、「再生」ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されるはずです。

    ```json
    {
      "data": {
        "createList": {
          "title": "Development",
          "_id": "234458015536775681"
        }
      }
    }
    ```

    Copy the value for `_id` for use in the next step.

    次のステップで使用するために、`_id`の値をコピーします。

4.  **Create a todo related to the list**

リストに関連したTodoを作成する**。

    Now that we have a todo list, how do we create related todos? We use the `connect` field on a todo’s `list` attribute to use its defined relationship to make the connection for us.

    Todoリストができたところで、関連するTodoを作成するにはどうしたらいいでしょうか？todoの`list`属性の`connect`フィールドを使って、定義された関係を利用して接続を行います。

    Copy the following GraphQL mutation query:

    以下の GraphQL mutation クエリをコピーしてください。

    graphql

    ```graphql
    mutation CreateAListedTodo {
      createTodo(data: {
        title: "Learn how to GraphQL with FaunaDB"
        completed: false
        list: { connect: "234458015536775681" }
      }) {
        title
        completed
        list {
          title
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Paste the query into the left panel. Replace `234458015536775681` in the query with the value of `_id` from the [previous step](#create-list). Finally, click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、ブラウザのGraphQL Playground画面で、「新しいタブ」**`+`**ボタンをクリックします（左上の、最後のクエリタブのすぐ右）。左のパネルにクエリを貼り付けます。クエリの中の`234458015536775681`は、[前のステップ](#create-list)で取得した`_id`の値で置き換えてください。最後に "Play "ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "createTodo": {
          "title": "Learn how to GraphQL with FaunaDB",
          "completed": false,
          "list": {
            "title": "Development"
          }
        }
      }
    }
    ```

5.  **Query the list for related todos**

リストに関連するTODOを検索する。

    Now that we have a todo that is related to the list, let’s verify that situation.

    さて、リストに関連するTodoがあるので、その状況を検証してみましょう。

    Copy the following GraphQL query:

    以下のGraphQLクエリをコピーします。

    graphql

    ```graphql
    query FindAListByID {
      findListByID(id: "234458015536775681") {
        title
        todos {
          data {
            title
          completed
          }
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button in GraphQL Playground (at the top left, just right of the last query tab). Paste the query into the left panel. Replace `234458015536775681` in the query with the value of `_id` from the [Create a todo list](#create-list) step. Finally, click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、GraphQL Playgroundの「新しいタブ」 **`+`** ボタンをクリックします（左上の、最後のクエリタブのすぐ右）。左のパネルにクエリを貼り付けます。クエリの中の`234458015536775681`を、[Todoリストの作成](#create-list)ステップで取得した`_id`の値に置き換えます。最後に "Play "ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "findListByID": {
          "title": "Development",
          "todos": {
            "data": [
              {
                "title": "Learn how to GraphQL with FaunaDB",
                "completed": false
              }
            ]
          }
        }
      }
    }
    ```

6.  **Query all todos**

すべてのTodoを検索する

    So, what happened to the todo that we created in [Get started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)? Nothing! It just isn’t associated with a list. Let’s check that this is true.

    さて、[Get started with GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)で作成したTodoはどうなったでしょうか？何もありません。リストに関連付けられていないだけです。これが本当かどうか確認してみましょう。

    Copy the following GraphQL query:

    以下のGraphQLクエリをコピーします。

    graphql

    ```graphql
    query FindAllTodos {
      allTodos {
        data {
          _id
          title
          completed
          list {
            title
          }
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Paste the query into the left panel. Finally, click the "Play" button. The query should execute and the response should appear in the right panel:

   次に、ブラウザのGraphQL Playground画面で、「新しいタブ」**`+`**ボタンをクリックします（左上の、最後のクエリタブのすぐ右）。左のパネルにクエリを貼り付けます。最後に "Play "ボタンをクリックします。クエリが実行され、右側のパネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allTodos": {
          "data": [
            {
              "_id": "234367997153640967",
              "title": "Build an awesome app!",
              "completed": false,
              "list": null
            },
            {
              "_id": "234458197639823873",
              "title": "Learn how to GraphQL with FaunaDB",
              "completed": false,
              "list": {
                "title": "Development"
              }
            }
          ]
        }
      }
    }
    ```

    Notice that the first todo shows that its `list` field is `null`. That means that it is not associated with a list.

    最初のTodoは、その`list`フィールドが`null`であることに注目してください。これは、リストに関連付けられていないことを意味します。

7.  **Update the first todo to join the list**

最初のTodoを更新してリストに参加させる。

    Let’s update the first todo so that it is associated with the "Development" list.

    最初のTodoを更新して、「Development」リストに関連付けるようにしてみましょう。

    Copy the following GraphQL query:

    以下のGraphQLクエリをコピーします。

    graphql

    ```graphql
    mutation UpdateATodo {
      updateTodo(id: "234367997153640967", data: {
        title: "Build an awesome app!"
        completed: true
        list: { connect: "234458015536775681" }
      }) {
        title
        completed
        list {
          title
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Paste the query into the left panel. Replace `234367997153640967` in the query with the id of the todo from the [previous step](#query-all), and replace `234458015536775681` with the value of `_id` from the [Create a todo list](#create-list) step. Finally, click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、ブラウザのGraphQL Playground画面で、「新しいタブ」**`+`**ボタンをクリックします（左上の、最後のクエリタブのすぐ右）。左のパネルにクエリを貼り付けます。クエリの中の`234367997153640967`は、[前のステップ](#query-all)でのTodoのidに、`234458015536775681`は、[Todoリストの作成](#create-list)のステップでの`_id`の値に置き換えてください。最後に "Play "ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "updateTodo": {
          "title": "Build an awesome app!",
          "completed": true,
          "list": {
            "title": "Development"
          }
        }
      }
    }
    ```

    Notice that we used `connect` to associate the todo with the list’s id. We also change the `completed` field to `true`. We didn’t change the title, but we had to provide it because the `title` field is marked as `required` (due to the exclamation mark in the schema).

    connect`を使ってTodoとリストのIDを関連付けていることに注目してください。また、`completed`フィールドを`true`に変更しています。タイトルは変更していませんが、`title` フィールドが `required` とマークされているので、提供しなければなりませんでした (スキーマにエクスクラメーションマークがあるため)。

8.  **Create a list with its own todos**

独自のTODOを持つリストの作成。

    It is possible to bulk-create related documents using the `create` field. `create` gives access to the underlying collection, so you can add (or update) a list with a handful of todos in a single GraphQL mutation query.

    create`フィールドを使って、関連ドキュメントを一括作成することができます。create`では下層のコレクションにアクセスできるので、1つのGraphQL mutationクエリで、いくつかのTodosを持つリストを追加(または更新)することができます。

    Copy the following GraphQL query:

    以下のGraphQLクエリをコピーしてください。

    graphql

    ```graphql
    mutation CreateListWithTodos {
      createList(data: {
        title: "The Basics",
          todos: {
            create: [
              {completed: false, title: "Water"},
              {completed: false, title: "Food"},
              {completed: false, title: "Shelter"}
            ]
          },
      }) {
        _id
        title
        todos {
          data {
            title
          }
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Paste the query into the left panel. Finally, click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、ブラウザのGraphQL Playground画面で、「新しいタブ」**`+`**ボタンをクリックします（左上の、最後のクエリタブのすぐ右）。左のパネルにクエリを貼り付けます。最後に "Play "ボタンをクリックします。クエリが実行され、右側のパネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "createList": {
          "_id": "234460851537445380",
          "title": "The Basics",
          "todos": {
            "data": [
              {
                "title": "Water"
              },
              {
                "title": "Food"
              },
              {
                "title": "Shelter"
              }
            ]
          }
        }
      }
    }
    ```

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated how to setup GraphQL relations, how to create and update documents that use relations, and how to bulk-create related documents.

このチュートリアルでは、GraphQLのリレーションを設定する方法、リレーションを使用するドキュメントを作成・更新する方法、関連ドキュメントを一括作成する方法を紹介しました。

For more information on GraphQL relations, see [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations).

GraphQLのリレーションについては、[Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)を参照してください。

## [](#next-steps)Next steps

次のステップ

-   [GraphQL pagination](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination)
-   [Unique constraints in GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/unique)

- [GraphQLのページネーション](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination)
- GraphQLの一意制約](https://docs.fauna.com/fauna/current/tutorials/graphql/unique)
