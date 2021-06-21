GraphQL pagination | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/graphql/pagination

# GraphQL pagination

This tutorial assumes that you have successfully completed the [GraphQL quick start](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start) tutorial, and that you still have the [Fauna Dashboard](https://dashboard.fauna.com/) open in a browser tab/window, on the GraphQL Playground screen.

このチュートリアルでは、[GraphQL quick start](https://docs.fauna.com/fauna/current/tutorials/graphql/quick_start)のチュートリアルが完了しており、GraphQL Playground画面の[Fauna Dashboard](https://dashboard.fauna.com/)がブラウザのタブ/ウィンドウで開かれていることを前提としています。

If your Dashboard session has expired:

ダッシュボードのセッションが終了している場合

1.  [Log in again](https://dashboard.fauna.com/).

 [Log in again](https://dashboard.fauna.com/)をクリックします。

2.  Select the `graphql` database.

`graphql` データベースを選択します。

3.  Click the **GRAPHQL** button in the left navigation.

左側のナビゲーションにある **GRAPHQL** ボタンをクリックします。

Databases can contain a _lot_ of data. Queries that attempt to return a large fraction of the data can strain the resources of the database server and client application. This tutorial demonstrates how to use pagination, where only a small group of results is returned for any one query and subsequent queries can fetch the next or previous group.

データベースには多くのデータが含まれています。データの大部分を返そうとするクエリは、データベースサーバーとクライアントアプリケーションのリソースを圧迫します。このチュートリアルでは、ページネーションを使用する方法を説明します。ページネーションでは、1つのクエリに対して一部の結果のみが返され、後続のクエリで次または前のグループを取得することができます。

The steps:

手順を説明します。

-   [Create a new schema file](#schema)

- [新しいスキーマファイルを作成する](#schema)

-   [Import the new GraphQL schema into Fauna](#import)

- [新しい GraphQL スキーマを Fauna にインポートする](#import)

-   [Create some records](#create)

- [いくつかのレコードを作成](#create)

-   [Query for all letters](#all)

- [すべての文字を検索](#all)

-   [Query for a small group of letters](#small)

- [小さな文字のグループを問い合わせる](#small)

-   [Query for groups of letters using cursors](#next)

- [カーソルを使って文字のグループを検索する](#next)

1.  **Create a new schema file**

新しいスキーマファイルの作成

    Create the file `schema-paginate.gql` with the following content (or [download it here](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination../_attachments/graphql/schema-paginate.gql)):

    以下の内容のファイル`schema-paginate.gql`を作成します（または[ここからダウンロード](https://docs.fauna.com/fauna/current/tutorials/graphql/pagination../_attachments/graphql/schema-paginate.gql)）。

    graphql

    ```graphql
    type Letter {
      letter: String!
    }

    type Query {
      allLetters: [Letter!]
    }
    ```

2.  **Import the new GraphQL schema into Fauna**

新しい GraphQL スキーマを Fauna にインポートします。

    Click the **UPDATE SCHEMA** button in the GraphQL Playground screen (in your browser), which opens your browser’s file selector. Select the `schema-paginate.gql` file, and click the file selector’s **Open** button.

    GraphQL Playground画面(ブラウザ)で**UPDATE SCHEMA**ボタンをクリックすると、ブラウザのファイルセレクタが開きます。schema-paginate.gql`を選択して、ファイルセレクタの**開く**ボタンをクリックします。

    This new schema only updates collections (and associated indexes) with the same name. Any other collections are unaffected.

    この新しいスキーマは、同じ名前のコレクション（および関連するインデックス）のみを更新します。その他のコレクションは影響を受けません。

3.  **Create some records**

いくつかのレコードを作成する。

    Let’s create some documents. Bulk creation of documents is easiest to do using FQL.

    ドキュメントを作成しましょう。ドキュメントの一括作成は、FQLを使って行うのが一番簡単です。

    Open a terminal and run:

    ターミナルを開き、次のように実行します。

    terminal

    ```bash
    fauna shell graphql
    ```

    After Fauna Shell starts, run the following query:

    Fauna Shell が起動したら、次のクエリを実行します。

    shell

    ```shell
    Map(
      ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
      Lambda("X", Create(Collection("Letter"), { data: { letter: Var("X") }}))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    ```json
    [ { ref: Ref(Collection("Letter"), "234438806828235266"),
        ts: 1559837118920000,
        data: { letter: 'a' } },
      { ref: Ref(Collection("Letter"), "234438806828228098"),
        ts: 1559837118920000,
        data: { letter: 'b' } },
      { ref: Ref(Collection("Letter"), "234438806828241410"),
        ts: 1559837118920000,
        data: { letter: 'c' } },
      { ref: Ref(Collection("Letter"), "234438806828231170"),
        ts: 1559837118920000,
        data: { letter: 'd' } },
      { ref: Ref(Collection("Letter"), "234438806828237314"),
        ts: 1559837118920000,
        data: { letter: 'e' } },
      { ref: Ref(Collection("Letter"), "234438806828224002"),
        ts: 1559837118920000,
        data: { letter: 'f' } },
      { ref: Ref(Collection("Letter"), "234438806828242434"),
        ts: 1559837118920000,
        data: { letter: 'g' } },
      { ref: Ref(Collection("Letter"), "234438806828238338"),
        ts: 1559837118920000,
        data: { letter: 'h' } },
      { ref: Ref(Collection("Letter"), "234438806828233218"),
        ts: 1559837118920000,
        data: { letter: 'i' } },
      { ref: Ref(Collection("Letter"), "234438806828230146"),
        ts: 1559837118920000,
        data: { letter: 'j' } },
      { ref: Ref(Collection("Letter"), "234438806828243458"),
        ts: 1559837118920000,
        data: { letter: 'k' } },
      { ref: Ref(Collection("Letter"), "234438806828244482"),
        ts: 1559837118920000,
        data: { letter: 'l' } },
      { ref: Ref(Collection("Letter"), "234438806828240386"),
        ts: 1559837118920000,
        data: { letter: 'm' } },
      { ref: Ref(Collection("Letter"), "234438806828227074"),
        ts: 1559837118920000,
        data: { letter: 'n' } },
      { ref: Ref(Collection("Letter"), "234438806828226050"),
        ts: 1559837118920000,
        data: { letter: 'o' } },
      { ref: Ref(Collection("Letter"), "234438806828234242"),
        ts: 1559837118920000,
        data: { letter: 'p' } },
      { ref: Ref(Collection("Letter"), "234438806828245506"),
        ts: 1559837118920000,
        data: { letter: 'q' } },
      { ref: Ref(Collection("Letter"), "234438806828220930"),
        ts: 1559837118920000,
        data: { letter: 'r' } },
      { ref: Ref(Collection("Letter"), "234438806828221954"),
        ts: 1559837118920000,
        data: { letter: 's' } },
      { ref: Ref(Collection("Letter"), "234438806828239362"),
        ts: 1559837118920000,
        data: { letter: 't' } },
      { ref: Ref(Collection("Letter"), "234438806828225026"),
        ts: 1559837118920000,
        data: { letter: 'u' } },
      { ref: Ref(Collection("Letter"), "234438806828232194"),
        ts: 1559837118920000,
        data: { letter: 'v' } },
      { ref: Ref(Collection("Letter"), "234438806828246530"),
        ts: 1559837118920000,
        data: { letter: 'w' } },
      { ref: Ref(Collection("Letter"), "234438806828236290"),
        ts: 1559837118920000,
        data: { letter: 'x' } },
      { ref: Ref(Collection("Letter"), "234438806828229122"),
        ts: 1559837118920000,
        data: { letter: 'y' } },
      { ref: Ref(Collection("Letter"), "234438806828222978"),
        ts: 1559837118920000,
        data: { letter: 'z' } } ]
    ```

4.  **Query for all letters**

すべての文字を検索する

    Let’s verify that GraphQL Playground can see all of the letters.

    GraphQL Playgroundがすべての文字を見ることができるか検証してみましょう。

    Copy the following GraphQL query:

    以下のGraphQLクエリをコピーします。

    graphql

    ```graphql
    query FindAllLetters {
      allLetters {
        data {
          _id
          letter
        }
      }
    }
    ```

    Then click the "new tab" **`+`** button on the GraphQL Playground screen in your browser (at the top left, just right of the last query tab). Paste the query into the left panel, and click the "Play" button. The query should execute and the response should appear in the right panel:

    次に、ブラウザのGraphQL Playground画面で、「新しいタブ」 **`+`** ボタンをクリックします（左上、最後のクエリタブのすぐ右）。左側のパネルにクエリを貼り付けて、「Play」ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allLetters": {
          "data": [
            {
              "_id": "234439110495830537",
              "letter": "a"
            },
            {
              "_id": "234439110495831561",
              "letter": "f"
            },
            {
              "_id": "234439110495832585",
              "letter": "g"
            },
            {
              "_id": "234439110495833609",
              "letter": "i"
            },
            {
              "_id": "234439110495834633",
              "letter": "c"
            },
            {
              "_id": "234439110495835657",
              "letter": "l"
            },
            {
              "_id": "234439110495836681",
              "letter": "h"
            },
            {
              "_id": "234439110495837705",
              "letter": "d"
            },
            {
              "_id": "234439110495838729",
              "letter": "b"
            },
            {
              "_id": "234439110495839753",
              "letter": "j"
            },
            {
              "_id": "234439110495840777",
              "letter": "w"
            },
            {
              "_id": "234439110495841801",
              "letter": "m"
            },
            {
              "_id": "234439110495842825",
              "letter": "n"
            },
            {
              "_id": "234439110495843849",
              "letter": "o"
            },
            {
              "_id": "234439110495844873",
              "letter": "p"
            },
            {
              "_id": "234439110495845897",
              "letter": "s"
            },
            {
              "_id": "234439110495846921",
              "letter": "k"
            },
            {
              "_id": "234439110495847945",
              "letter": "e"
            },
            {
              "_id": "234439110495848969",
              "letter": "r"
            },
            {
              "_id": "234439110495849993",
              "letter": "y"
            },
            {
              "_id": "234439110495851017",
              "letter": "q"
            },
            {
              "_id": "234439110495852041",
              "letter": "x"
            },
            {
              "_id": "234439110495853065",
              "letter": "u"
            },
            {
              "_id": "234439110495854089",
              "letter": "v"
            },
            {
              "_id": "234439110495855113",
              "letter": "z"
            },
            {
              "_id": "234439110495856137",
              "letter": "t"
            }
          ]
        }
      }
    }
    ```

5.  **Query for a small group of letters**

小さなグループの手紙を検索する

    How should we query for only a small group of letters? When we defined the `allLetters` query, the GraphQL API automatically created an index for the documents in the `Letter` collection. Any queries which involve lists of values automatically accept a `_size` parameter, specifying the maximum number of documents to return, and a `_cursor` parameter, specifying a marker that describes the position and direction within the result set.

    少量の手紙のグループだけを検索するにはどうすればよいでしょうか。allLetters`というクエリを定義したときに、GraphQL APIは自動的に`Letter`コレクションのドキュメントに対するインデックスを作成しました。値のリストを含むクエリはすべて、返すドキュメントの最大数を指定する `_size` パラメータと、結果セット内の位置と方向を示すマーカーを指定する `_cursor` パラメータを自動的に受け入れます。

    Modify the query to look like this:

    クエリを次のように変更します。

    graphql

    ```graphql
    query FindAllLetters {
      allLetters(_size: 5) {
        data {
          _id
          letter
        }
      }
    }
    ```

    Then click the "Play" button. The query should execute and the response should appear in the right panel:

    次に「Play」ボタンをクリックします。クエリが実行され、右のパネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allLetters": {
          "data": [
            {
              "_id": "234439110495830537",
              "letter": "a"
            },
            {
              "_id": "234439110495831561",
              "letter": "f"
            },
            {
              "_id": "234439110495832585",
              "letter": "g"
            },
            {
              "_id": "234439110495833609",
              "letter": "i"
            },
            {
              "_id": "234439110495834633",
              "letter": "c"
            }
          ]
        }
      }
    }
    ```

    By specifying `_size: 5`, we are telling GraphQL that we only want 5 records, and that’s how many we received. Had we specified 1,000 instead, we would only receive 26 documents, since that’s as many as the collection contains. If you don’t specify `_size`, you get at most 50 results.

    _size: 5`を指定することで、GraphQLに「5つのレコードだけが欲しい」と伝えており、それだけの数を受け取っています。代わりに 1,000 を指定していたら、コレクションに含まれる数と同じなので、26 個のドキュメントしか受け取ることができません。また、`_size` を指定しなかった場合は、最大でも 50 件の結果を得ることができます。

6.  **Query for groups of letters using cursors**

カーソルを使って文字のグループを検索する。

    How would we get the next group of letters? First, we need to modify the query a little to retrieve the cursor information:

    次のグループの文字を取得するにはどうすればよいでしょうか。まず、カーソルの情報を取得するために、クエリを少し変更する必要があります。

    graphql

    ```graphql
    query FindSomeLetters {
      allLetters(_size: 5) {
        data {
          _id
          letter
        }
        before
        after
      }
    }
    ```

    Then click the "Play" button. The query should execute and the response should appear in the right panel:

    そして、"Play "ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allLetters": {
          "data": [
            {
              "_id": "234439110495830537",
              "letter": "a"
            },
            {
              "_id": "234439110495831561",
              "letter": "f"
            },
            {
              "_id": "234439110495832585",
              "letter": "g"
            },
            {
              "_id": "234439110495833609",
              "letter": "i"
            },
            {
              "_id": "234439110495834633",
              "letter": "c"
            }
          ],
          "before": null,
          "after": "2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA=="
        }
      }
    }
    ```

    By asking for `before` and `after` in the query, GraphQL includes those values in the result. These represent cursors, which are markers that define a position in the results, as well as the direction involved.

    クエリの中で `before` と `after` を求めることで、GraphQL はそれらの値を結果に含めます。これらの値はカーソルを表しています。カーソルとは、結果の中での位置とそれに関連する方向を定義する目印です。

    The `before` cursor is `null`, which tells us that there are no groups of documents before the current results. The `after` cursor tells us that there are more results after the `c` result. Let’s see those results. Modify the query to look like this:

    `before`のカーソルは`null`で、現在の結果の前にドキュメントのグループがないことを示しています。after`のカーソルは、`c`の結果の後にさらに結果があることを示しています。これらの結果を見てみましょう。クエリを次のように修正します。

    graphql

    ```graphql
    query FindSomeLetters {
      allLetters(_size: 5, _cursor: "2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==") {
        data {
          _id
          letter
        }
        before
        after
      }
    }
    ```

    Replace `2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==` with the value of the `after` cursor from the previous query’s output. Then click the "Play" button. The query should execute and the response should appear in the right panel:

    2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==` を、前のクエリの出力にある `after` カーソルの値で置き換えます。そして、「Play」ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allLetters": {
          "data": [
            {
              "_id": "234439110495835657",
              "letter": "l"
            },
            {
              "_id": "234439110495836681",
              "letter": "h"
            },
            {
              "_id": "234439110495837705",
              "letter": "d"
            },
            {
              "_id": "234439110495838729",
              "letter": "b"
            },
            {
              "_id": "234439110495839753",
              "letter": "j"
            }
          ],
          "before": "2DKB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==",
          "after": "2DOB2DRyMjM0NDM5MTEwNDk1ODQwNzc3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA=="
        }
      }
    }
    ```

    Notice that we have a new group of letters, the `before` cursor now indicates that there are letters before this group, and because the `after` cursor is not `null`, there are more letters after this group.

    また、`after`カーソルが`null`ではないので、このグループの後にはさらに多くの文字があることがわかります。

    What happens if we change `_size` when we’re not at the start of the result set? Let’s try that! Modify the query so that `_size` is now 30:

    結果セットの先頭ではないときに `_size` を変更するとどうなるでしょうか。それを試してみましょう。クエリを修正して、`_size`を30にしてみましょう。

    graphql

    ```graphql
    query FindSomeLetters {
      allLetters(_size: 30, _cursor: "2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==") {
        data {
          _id
          letter
        }
        before
        after
      }
    }
    ```

    Replace `2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==` with the value of the `after` cursor from the previous query’s output. Then click the "Play" button. The query should execute and the response should appear in the right panel:

    2DOB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==` を、前のクエリの出力にある `after` カーソルの値で置き換えます。そして、「Play」ボタンをクリックします。クエリが実行され、右パネルにレスポンスが表示されます。

    ```json
    {
      "data": {
        "allLetters": {
          "data": [
            {
              "_id": "234439110495835657",
              "letter": "l"
            },
            {
              "_id": "234439110495836681",
              "letter": "h"
            },
            {
              "_id": "234439110495837705",
              "letter": "d"
            },
            {
              "_id": "234439110495838729",
              "letter": "b"
            },
            {
              "_id": "234439110495839753",
              "letter": "j"
            },
            {
              "_id": "234439110495840777",
              "letter": "w"
            },
            {
              "_id": "234439110495841801",
              "letter": "m"
            },
            {
              "_id": "234439110495842825",
              "letter": "n"
            },
            {
              "_id": "234439110495843849",
              "letter": "o"
            },
            {
              "_id": "234439110495844873",
              "letter": "p"
            },
            {
              "_id": "234439110495845897",
              "letter": "s"
            },
            {
              "_id": "234439110495846921",
              "letter": "k"
            },
            {
              "_id": "234439110495847945",
              "letter": "e"
            },
            {
              "_id": "234439110495848969",
              "letter": "r"
            },
            {
              "_id": "234439110495849993",
              "letter": "y"
            },
            {
              "_id": "234439110495851017",
              "letter": "q"
            },
            {
              "_id": "234439110495852041",
              "letter": "x"
            },
            {
              "_id": "234439110495853065",
              "letter": "u"
            },
            {
              "_id": "234439110495854089",
              "letter": "v"
            },
            {
              "_id": "234439110495855113",
              "letter": "z"
            },
            {
              "_id": "234439110495856137",
              "letter": "t"
            }
          ],
          "before": "2DKB2DRyMjM0NDM5MTEwNDk1ODM1NjU3gWdMZXR0ZXJzgWdjbGFzc2VzgICAgA==",
          "after": null
        }
      }
    }
    ```

    Since we asked for 30 results, and we only had 26 altogether, and we started at the 6th result, we see all of the remaining letters in the results. The `before` cursor tells us that there are letters before this group. Since the `after` cursor is `null`, there are no letters after this group.

    30個の結果を求めたところ、全部で26個しかなく、6番目の結果から始めたので、結果の中の残りのすべての文字が見えます。before`カーソルは、このグループの前にも文字があることを示しています。after` カーソルが `null` なので、このグループの後には文字がありません。

## [](#conclusion)Conclusion

This tutorial has demonstrated how pagination works in GraphQL, shown you how to constrain the number of results, and how to issue subsequent queries to return different groups from a larger result set.

このチュートリアルでは、GraphQLでページネーションがどのように機能するかを説明し、結果の数を制限する方法と、より大きな結果セットから異なるグループを返すために後続のクエリを発行する方法を紹介しました。

## [](#next-steps)Next steps

次のステップ

-   [Unique constraints in GraphQL](https://docs.fauna.com/fauna/current/tutorials/graphql/unique)

-   [GraphQL relations](https://docs.fauna.com/fauna/current/tutorials/graphql/relations)

- GraphQLの一意性制約](https://docs.fauna.com/fauna/current/tutorials/graphql/unique)

- GraphQLのリレーション](https://docs.fauna.com/fauna/current/tutorials/graphql/relations)

