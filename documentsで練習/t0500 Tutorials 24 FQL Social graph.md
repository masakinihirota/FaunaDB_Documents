Social graph | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/social_graph

# Social graph

ソーシャルグラフ

Social graphs are a common feature of many modern mobile, gaming, and web applications. This page will walk you through the process of creating a simple social graph. The example we’ll build here can support features such as timelines, suggested followers, and [Erdős numbers](https://en.wikipedia.org/wiki/Erd%C5%91s_number).

ソーシャルグラフは、最新のモバイル、ゲーム、Webアプリケーションの多くに共通する機能です。このページでは、シンプルなソーシャルグラフを作成する手順を説明します。ここで作成する例では、タイムライン、サジェストフォロワー、[Erdős number](https://en.wikipedia.org/wiki/Erd%C5%91s_number)などの機能をサポートします。

This tutorial assumes that you have completed the [5-minute quick start](https://docs.fauna.com/fauna/current/start/#quick-start).

このチュートリアルは、[5-minute quick start](https://docs.fauna.com/fauna/current/start/#quick-start)を完了していることを前提としています。

You can also complete this tutorial with the [Fauna Shell](https://docs.fauna.com/fauna/current/integrations/shell/). All the commands work the same way in the Dashboard’s Shell and the command-line Fauna Shell.

このチュートリアルは、[Fauna Shell](https://docs.fauna.com/fauna/current/integrations/shell/)でも行うことができます。すべてのコマンドは、ダッシュボードのシェルでもコマンドラインの Fauna シェルでも同じように動作します。

1.  **Open the Fauna Dashboard**

**Fauna ダッシュボードを開きます。**

    Log in to the [Fauna Dashboard](https://dashboard.fauna.com/) and click the database `my_db` in your list of databases.

    Fauna Dashboard](https://dashboard.fauna.com/)にログインし、データベースのリストからデータベース`my_db`をクリックします。

2.  **Open the Dashboard’s Shell**

**ダッシュボードのシェルを開きます**。

    Click **SHELL** in the left sidebar to display the Dashboard’s Shell.

    左サイドバーの**SHELL**をクリックして、ダッシュボードのシェルを表示します。

3.  **Create a collection and index to represent people**

**人を表すコレクションとインデックスを作成する**。

    The first collection that we need to create is `people`, to represent the users in our social graph. Users could be players in a game, subscribers to an author’s articles, or coworkers in a professional network.

    最初に作成するコレクションは`people`で、ソーシャルグラフのユーザーを表します。ユーザーとは、ゲームのプレイヤー、著者の記事の購読者、仕事上のネットワークにおける同僚などです。

    shell

    ```shell
    CreateCollection({ name: "people" })
    ```

    Then, we need to create an index on peoples' names. The index allows us to refer to people with names like "alice" rather than refs like `Ref(Collection("people"), 1)`. Also, let’s use the unique constraint to ensure that multiple users don’t have the same name.

    次に、peopleの名前に対するインデックスを作成する必要があります。このインデックスがあれば、`Ref(Collection("people"), 1)`のような参照ではなく、"alice "のような名前の人を参照することができます。また、ユニーク制約を使って、複数のユーザが同じ名前にならないようにしましょう。

    shell

    ```shell
    CreateIndex({
      name: "people_by_name",
      source: Collection("people"),
      terms: [{ field: ["data", "name"] }],
      unique: true
    })
    ```

4.  **Create a collection and index to represent relationships**

**リレーションシップを表現するコレクションとインデックスを作成する**。

    The connection between people is called a "relationship". Relationships are directional: a person may follow another person without requiring the second person to reciprocate the relationship. Let’s call the first person a "follower" of the "followee".

    人と人とのつながりを「リレーションシップ」と呼びます。関係には方向性があります。ある人が他の人をフォローしても、2番目の人がその関係を返す必要はありません。最初の人を「フォローする人」の「フォローされる人」と呼びましょう。

    shell

    ```shell
    CreateCollection({ name: "relationships" })
    ```

    Then, we need to create an index on the `relationships` collection which is the core of our social graph. This index allows us to easily answer questions such as "who follows person A?" or "who follows person A, but not person B?"

    次に、ソーシャルグラフの中核となる `relationships` コレクションにインデックスを作成する必要があります。このインデックスがあれば、"誰がAさんをフォローしているか？"や "AさんをフォローしていてBさんをフォローしていないのは誰か？"などの質問に簡単に答えることができます。

    shell

    ```shell
    CreateIndex({
      name: "followers_by_followee",
      source: Collection("relationships"),
      terms: [{ field: ["data", "followee"] }],
      values: [{ field: ["data", "follower"] }]
    })
    ```

5.  **Populate the graph**

グラフを表示する

    Now that we have collections representing the people in our graph (`people`) and their relationships to each other (`relationships`), we can begin populating the graph.

    これで、グラフに登場する人たち（`people`）と、その人たちの関係（`relationships`）を表すコレクションができたので、グラフの作成を始めましょう。

    First, let’s create four users: Alice, Bob, Carol, and Dave. Notice that we added an index on the field `["data", "name"]` for the `people` collection. Later on, we can use that index to find the four people in our graph.

    まず、4人のユーザーを作りましょう。Alice, Bob, Carol, Daveです。ここで、`people`コレクションのフィールド`["data", "name"]`にインデックスを追加したことに注目してください。後で、このインデックスを使って、グラフの中の4人を見つけることができます。

    shell

    ```shell
    Foreach(
      ["Alice", "Bob", "Carol", "Dave"],
      Lambda("name",
        Create(Collection("people"), { data: { name: Var("name") } })
      )
    )
    ```

    In the following queries, we use this query pattern:

    以下のクエリでは，このクエリパターンを使用しています。

    shell

    ```shell
    Get(Match(Index("people_by_name"), "Alice"))
    ```

    This query uses the index `people_by_name` to find the first person with the name "Alice". We can be sure that the first person returned is the one we’re looking for because of the _uniqueness constraint_ we set when we created the index.

    このクエリは、インデックス `people_by_name` を使って、"Alice" という名前の最初の人物を探します。インデックスを作成したときに設定した_uniqueness constraint_により、返された最初の人物が探している人物であることが確認できます。

    The first relationship that we are going to create is between Alice and Bob. We’ll create a relationship with Alice as the follower, and Bob as the followee — in plain English, this says "Alice follows Bob."

    これから作成する最初のリレーションは、AliceとBobの間です。Aliceをfollower、Bobをfolloweeとする関係を作ります。わかりやすく言うと、"Alice follows Bob "ということです。

    shell

    ```shell
    Create(
      Collection("relationships"),
      {
        data: {
          follower: Select("ref", Get(Match(Index("people_by_name"), "Alice"))),
          followee: Select("ref", Get(Match(Index("people_by_name"), "Bob")))
        }
      }
    )
    ```

    Next, let’s add a relationship in the other direction: Bob follows Alice.

    次に、逆方向の関係を追加してみましょう。BobはAliceをフォローします。

    shell

    ```shell
    Create(
      Collection("relationships"),
      {
        data: {
          follower: Select("ref", Get(Match(Index("people_by_name"), "Bob"))),
          followee: Select("ref", Get(Match(Index("people_by_name"), "Alice")))
        }
      }
    )
    ```

    Let’s use the index `people_by_name` to find all users named _either_ "Alice" or "Bob" and add a relationship to Carol — i.e. Carol follows both Alice and Bob.

    インデックス `people_by_name` を使って、_either_ "Alice" または "Bob" という名前のすべてのユーザーを見つけ、Carol との関係を追加してみましょう - つまり、Carol は Alice と Bob の両方をフォローします。

    shell

    ```shell
    Let(
      {
        follower: Select("ref", Get(Match(Index("people_by_name"), "Carol")))
      },
      Foreach(
        Paginate(
          Union(
            Match(Index("people_by_name"), "Alice"),
            Match(Index("people_by_name"), "Bob")
          )
        ),
        Lambda("followee",
          Create(
            Collection("relationships"),
            {
              data: {
                followee: Var("followee"),
                follower: Var("follower")
              }
            }
          )
        )
      )
    )
    ```

    Finally, let’s add a relationship meaning, "Dave follows Alice."

    最後に、"Dave follows Alice "という意味のリレーションシップを追加しましょう。

    shell

    ```shell
    Create(
      Collection("relationships"),
      {
        data: {
          followee: Select("ref", Get(Match(Index("people_by_name"), "Alice"))),
          follower: Select("ref", Get(Match(Index("people_by_name"), "Dave")))
        }
      }
    )
    ```

6.  **Explore the graph**

**グラフを見る**

    We now have four users and relationships among them in our social graph:

    現在、ソーシャルグラフには4人のユーザーとその関係があります。

    -   Alice follows Bob,
    -   Bob follows Alice,
    -   Carol follows both Alice and Bob,
    -   Dave follows Alice.

---

    - アリスはボブをフォローしています。
    - BobはAliceをフォローしています。
    - CarolはAliceとBobの両方をフォローしています。
    - DaveはAliceをフォローしています。

    Using our index `followers_by_followee`, we can now answer questions about these relationships.

    インデックス `followers_by_followee` を使って、これらの関係についての質問に答えることができます。

    To find a person’s follower list, we use a `Select` query to extract the `ref` of each follower, like this:

    ある人のフォロワーリストを見つけるには、次のように `Select` クエリを使って各フォロワーの `ref` を抽出します。

    shell

    ```shell
    Select("ref", Get(Match(Index("people_by_name"), "Alice")))
    ```

    1.  **Find Alice’s followers**

    **アリスのフォロワーを検索する**。

        We can use a `ref` as the term in a `Match` query on our relationship index. This query returns all of the _refs_ of Alice’s followers:

        リレーションシップインデックスの `Match` クエリの用語として `ref` を使うことができます。このクエリは、アリスのフォロワーのすべての _refs_ を返します。

        shell

        ```shell
        Paginate(Match(Index("people_by_name"), "Alice"))
        ```

        The result should look something like this (the identifiers for your documents are distinct):

        結果は次のようになるはずです（ドキュメントの識別子は区別されています）。

        ```javascript
        { data: [ Ref(Collection("people"), "236350059641307648") ] }
        ```

        Our application might be able to interpret refs, but they’re hard for a human to comprehend, so let’s `Map` over the set of _refs_, get each person’s document, and select their name out of the document.

        アプリケーションはRefを解釈できるかもしれませんが、人間が理解するのは難しいので、_refs_の集合を`Map`して、各人のドキュメントを取得し、そのドキュメントから名前を選択してみましょう。

        shell

        ```shell
        Map(
          Paginate(Match(Index("people_by_name"), "Alice")),
          Lambda("person",
            Select(["data", "name"], Get(Var("person")))
          )
        )
        ```

        The result should be:

        結果は次のようになります。

        ```javascript
        { data: [ 'Alice' ] }
        ```

        Putting it all together gives us a human-friendly list of the names of Alice’s followers:

        これをすべてまとめると、アリスのフォロワーの名前を人間にわかりやすくリストアップすることができます。

        shell

        ```shell
        Map(
          Paginate(
            Match(
              Index("followers_by_followee"),
              Select("ref", Get(Match(Index("people_by_name"), "Alice")))
            )
          ),
          Lambda("person",
            Select(["data", "name"], Get(Var("person")))
          )
        )
        ```

        The result should be similar to (the order might differ):

        結果は以下のようになるはずです（順番が違うかもしれません）。

        ```javascript
        { data: [ 'Bob', 'Dave', 'Carol' ] }
        ```

    2.  **Find Alice’s OR Bob’s followers**

**アリスのフォロワーまたはボブのフォロワーを探す**

        Now that we’ve seen how to list a single person’s followers, we can use that knowledge to ask questions about the connections between follower lists.

        さて、一人の人のフォロワーをリストアップする方法を見てきましたが、その知識を使って、フォロワーリスト同士のつながりについて質問することができます。

        For example, the union of the follower lists tells us who follows either person. Here, we ask who follows Alice or Bob:

        例えば、フォロワーリストの結合は、どちらかの人を誰がフォローしているかを教えてくれます。ここでは、AliceとBobのどちらをフォローしているかを尋ねています。

        shell

        ```shell
        Map(
          Paginate(
            Union(
              Match(
                Index("followers_by_followee"),
                Select("ref", Get(Match(Index("people_by_name"), "Alice")))
              ),
              Match(
                Index("followers_by_followee"),
                Select("ref", Get(Match(Index("people_by_name"), "Bob")))
              )
            )
          ),
          Lambda("person",
            Select(["data", "name"], Get(Var("person")))
          )
        )
        ```

        The result should be similar to:

        結果は次のようになります。

        ```javascript
        { data: [ 'Alice', 'Bob', 'Dave', 'Carol' ] }
        ```

    3.  **Find Alice’s AND Bob’s followers**

**アリスのフォロワーとボブのフォロワーを見つける**。

        The intersection of follower lists finds common followers among people. This query asks who follows Alice and Bob:

        フォロワーリストの交点は、人々の間の共通のフォロワーを見つけます。このクエリは、AliceとBobをフォローしている人を尋ねます。

        shell

        ```shell
        Map(
          Paginate(
            Intersection(
              Match(
                Index("followers_by_followee"),
                Select("ref", Get(Match(Index("people_by_name"), "Alice")))
              ),
              Match(
                Index("followers_by_followee"),
                Select("ref", Get(Match(Index("people_by_name"), "Bob")))
              )
            )
          ),
          Lambda("person",
            Select(["data", "name"], Get(Var("person")))
          )
        )
        ```

        The result should be:

        結果は次のようになります。

        ```javascript
        { data: [ 'Carol' ] }
        ```

    4.  **Find people who follow Alice, but NOT Bob**

**アリスをフォローしていて、ボブをフォローしていない人を探す**。

        The difference of follower lists tells us who follows some people, but not others. This is how we ask for followers of Alice, but not Bob:

        フォロワーリストの違いは、ある人をフォローしている人と、そうでない人との違いを教えてくれます。これは、Aliceをフォローしているが、Bobをフォローしていない人を探す方法です。

        shell

        ```shell
        Map(
          Paginate(
            Difference(
              Match(
                Index("followers_by_followee"),
                Select("ref", Get(Match(Index("people_by_name"), "Alice")))
              ),
              Match(
                Index("followers_by_followee"),
                Select("ref", Get(Match(Index("people_by_name"), "Bob")))
              )
            )
          ),
          Lambda("person",
            Select(["data", "name"], Get(Var("person")))
          )
        )
        ```

        The result should be similar to:

        結果は次のようになります。

        ```javascript
        { data: [ 'Bob', 'Dave' ] }
        ```

## [](#conclusion)Conclusion

結論

In this tutorial, we have modeled a simple social graph using Fauna’s collections and indexes. We have used the query language to ask questions about the connections in the graph that are useful building blocks of social features in mobile apps, games, and web applications.

このチュートリアルでは、Faunaのコレクションとインデックスを使って、簡単なソーシャルグラフをモデル化しました。クエリ言語を使って、モバイルアプリやゲーム、ウェブアプリケーションのソーシャル機能を構成するのに便利な、グラフ内の接続に関する質問をしてみました。

