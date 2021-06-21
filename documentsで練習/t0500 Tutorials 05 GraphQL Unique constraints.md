Unique constraints in GraphQL | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/graphql/unique

# Unique constraints in GraphQL

This tutorial assumes that you have successfully completed the [GraphQL quick start](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start) tutorial, and that you still have the [Fauna Dashboard](https://dashboard.fauna.com/) open in a browser tab/window, on the GraphQL Playground screen.

重要
このチュートリアルでは、[GraphQL quick start](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)のチュートリアルが完了しており、GraphQL Playground画面の[Fauna Dashboard](https://dashboard.fauna.com/)がブラウザのタブ/ウィンドウで開かれていることを前提としています。

If your Dashboard session has expired:

ダッシュボードのセッションが終了している場合

1.  [Log in again](https://dashboard.fauna.com/).
2.  Select the `graphql` database.
3.  Click the **GRAPHQL** button in the left navigation.

1.  [Log in again](https://dashboard.fauna.com/)をクリックします。
2.  2. `graphql` データベースを選択します。
3.  3. 左側のナビゲーションにある**GRAPHQL**ボタンをクリックします。

This tutorial explores the `@unique` directive, which allows you to add constraints to your GraphQL schema. When you add `@unique` to a field definition, Fauna handles the creation of an index that enforces this constraint.

このチュートリアルでは、GraphQLスキーマに制約を加えることができる`@unique`ディレクティブについて説明します。フィールド定義に `@unique` を追加すると、Fauna はこの制約を適用したインデックスの作成を処理します。

Let’s define a simple user type, with a uniqueness constraint on the username, and see what happens when the constraint is triggered. The steps:

ここでは、ユーザー名に一意性制約を設定したシンプルなユーザータイプを定義し、制約が発動したときに何が起こるかを見てみましょう。手順を説明します。

-   [Create a new schema file](#schema)
-   [Import the new GraphQL schema into Fauna](#import)
-   [Inspect the constraint](#inspect)
-   [Add a user](#add)
-   [Add a duplicate user](#duplicate)

- [新しいスキーマファイルの作成](#schema)
- [新しい GraphQL スキーマを Fauna にインポートする](#import)
- [制約の検査](#inspect)
- [ユーザーを追加](#add)
- [重複しているユーザーを追加する](#duplicate)

1.  **Create a new schema file**
    
    新しいスキーマファイルを作成します。

    Create the file `schema-unique.gql` with the following content (or [download it here](https://docs.fauna.com/fauna/current/tutorials/graphql/unique../_attachments/graphql/schema-unique.gql)):
    
        以下の内容のファイル`schema-unique.gql`を作成します(または[ここからダウンロード](https://docs.fauna.com/fauna/current/tutorials/graphql/unique../_attachments/graphql/schema-unique.gql)します)。
    

    graphql
    
    ```graphql
    type User {
      username: String! @unique
    }
    ```
    
2.  **Import the new GraphQL schema into Fauna**
    
    新しいGraphQLスキーマをFaunaにインポートします。
    
    Click the **UPDATE SCHEMA** button in the GraphQL Playground screen (in your browser), which opens your browser’s file selector. Select the `schema-unique.gql` file, and click the file selector’s **Open** button.
    
        ブラウザのGraphQL Playground画面で**UPDATE SCHEMA**ボタンをクリックすると、ブラウザのファイルセレクタが開きます。schema-unique.gql` を選択し、ファイルセレクタの **開く** ボタンをクリックします。
    
    This new schema only updates collections (and associated indexes) with the same name. Any other collections are unaffected.

    この新しいスキーマは、同じ名前のコレクション（および関連するインデックス）のみを更新します。その他のコレクションは影響を受けません。
    

3.  **Inspect the constraint**

制約の検査

    Let’s inspect the constraint via Fauna Shell.
    
     Fauna Shellで制約を検査してみましょう。

    Open a terminal and run:
    
        ターミナルを開いて実行します。

    terminal
    
    ```bash
    fauna shell graphql
    ```
    
    After Shell starts, run the following query:

    シェルが起動したら、次のようなクエリを実行します。

    shell
    
    ```shell
    Get(Index("unique_User_username"))
    ```
    
    You should see output similar to:
    
    次のような出力が得られるはずです。
    
    ```json
    { ref: Index("unique_User_username"),
      ts: 1559780318060000,
      active: true,
      partitions: 1,
      name: 'unique_User_username',
      source: Collection("User"),
      data: { gql: { ts: Time("2019-06-06T00:18:37.979330Z") } },
      values: [],
      terms: [ { field: [ 'data', 'username' ] } ],
      unique: true }
    ```
    
    The `unique` field in the result is set to true, and the terms specify which field(s) need to be unique, i.e. `data/username`.

    結果の`unique`フィールドはtrueに設定され、条件はどのフィールドがユニークである必要があるのかを指定します（例：`data/username`）。
    

4.  **Add a user**

ユーザーを追加する

    Copy the following GraphQL query:

以下のGraphQLクエリをコピーします。

    graphql
    
    ```graphql
    mutation CreateAUser {
       createUser(data: {
         username: "Alice"
       }) {
         username
       }
    }
    ```
    
    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Paste the query into the left panel, and click the "Play" button. The query should execute and the response should appear in the right panel:

    
    次に、ブラウザのGraphQL Playground画面で、「新しいタブ」 **`+`** ボタンをクリックします（左上、最後のクエリタブのすぐ右）。左側のパネルにクエリを貼り付けて、「Play」ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。
    

    ```json
    {
      "data": {
        "createUser": {
          "username": "Alice"
        }
      }
    }
    ```
    
5.  **Add a duplicate user**

重複したユーザーを追加する

    Let’s see what happens when a duplicate user is added. Simply click the "Play" button a second time. The query should execute, and an error response should appear in the right panel:

 重複したユーザーを追加するとどうなるか見てみましょう。再生 "ボタンを2回目にクリックしてください。クエリが実行され、右側のパネルにエラーレスポンスが表示されるはずです。

    ```json
    {
      "errors": [
        {
          "message": "Document is not unique.",
          "extensions": {
            "code": "document not unique"
          }
        }
      ]
    }
    ```
    

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated that the `@unique` directive can be used to apply a uniqueness constraint to a field in your GraphQL schema.

このチュートリアルでは、`@unique` ディレクティブを使って、GraphQL スキーマのフィールドに一意性制約を適用できることを紹介しました。

For more information, see the [`@unique`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique) reference.

詳細については、[`@unique`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_unique)のリファレンスを参照してください。

## [](#next-steps)Next steps

次のステップ

-   [GraphQL pagination](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination)
-   [GraphQL relations](https://docs.fauna.com/fauna/current/tutorials/graphql/relations)

- GraphQLのページネーション](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination)
- GraphQLのリレーション](https://docs.fauna.com/fauna/current/tutorials/graphql/relations)

