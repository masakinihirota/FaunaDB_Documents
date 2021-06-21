Temporality | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/temporality

# Temporality

時間性

In this tutorial, we explore Fauna’s temporal features.

このチュートリアルでは、Faunaの時間性機能について説明します。

Temporal queries show you exactly how data has changed over time. You can ask for instances that have been updated in the last few days, and even scope whole queries to a point in the past, querying a snapshot of the database before and after particular transactions were processed.

時間的なクエリは、データが時間とともにどのように変化したかを正確に示します。過去数日間に更新されたインスタンスを検索したり、クエリ全体を過去の時点にスコープして、特定のトランザクションが処理される前と後のデータベースのスナップショットをクエリすることもできます。

This tutorial assumes that you have completed the [5-minute quick start](https://docs.fauna.com/fauna/current/start/#quick-start).

このチュートリアルは、[5分間のクイックスタート](https://docs.fauna.com/fauna/current/start/#quick-start)を完了していることを前提としています。

1.  **Open the Fauna Dashboard**

**Fauna ダッシュボードを開く**。

    Log in to the [Fauna Dashboard](https://dashboard.fauna.com/) and click the database `my_db` in your list of databases.

    Fauna Dashboard](https://dashboard.fauna.com/)にログインし、データベースのリストからデータベース `my_db` をクリックします。

2.  **Open the Dashboard’s Shell**

**ダッシュボードのシェルを開きます**。

    Click **SHELL** in the left sidebar to display the Dashboard’s Shell.

    左サイドバーの**SHELL**をクリックして、ダッシュボードのシェルを表示します。

3.  **Create a collection and 2 indexes**

**コレクションと2つのインデックスを作成します**。

    We need a collection to store our data, and 2 indexes that help us explore the data. For our temporal features exploration, we’ll create a collection of shapes, a collection index that makes it easy to review all of our shapes, and a term-based index that makes it easy to lookup a shape by its name. Run the following queries in the shell.

    データを保存するためのコレクションと、データの探索に役立つ2つのインデックスが必要です。時間的特徴を調べるために、形状のコレクション、すべての形状を簡単に確認できるコレクションインデックス、形状の名前を簡単に検索できる用語ベースのインデックスを作成します。シェルで以下のクエリを実行します。

    shell

    ```shell
    CreateCollection({ name: "shapes" })
    ```

    shell

    ```shell
    CreateIndex({ name: "all_shapes", source: Collection("shapes") })
    ```

    shell

    ```shell
    CreateIndex({
      name: "shapes_by_name",
      source: Collection("shapes"),
      unique: true,
      terms: [{ field: ["data", "name"] }]
    })
    ```

4.  **Create the first set of shape documents**

**最初のシェイプドキュメントを作成する**。

    Now we can create some shapes. Each shape has a name and a color.

    それでは、いくつかのシェイプを作成してみましょう。それぞれの図形には名前と色がついています。

    shell

    ```shell
    Foreach(
      [
        ["triangle", "yellow"],
        ["square", "green"],
        ["circle", "blue"]
      ],
      Lambda("shape",
        Create(Collection("shapes"), { data: {
          name: Select(0, Var("shape")),
          color: Select(1, Var("shape"))
        }})
      )
    )
    ```

5.  **Create a second set of shape documents**

**2つ目のシェイプドキュメントを作成する**。

    After a short delay, run the following query to create some additional shapes. The delay only needs to be a few seconds; the delay gives this second set of shapes a different creation timestamp.

    少し時間をおいてから、次のクエリを実行して、さらにいくつかのシェイプを作成します。遅延は数秒程度でよい。この遅延により、2つ目の図形セットには異なる作成タイムスタンプが与えられる。

    shell

    ```shell
    Foreach(
      [
        ["pentagon", "black"],
        ["hexagon", "cyan"],
        ["octagon", "red"]
      ],
      Lambda("shape",
        Create(Collection("shapes"), { data: {
          name: Select(0, Var("shape")),
          color: Select(1, Var("shape"))
        }})
      )
    )
    ```

6.  **Review the shapes**

**形状の確認**

    With our shapes created, let’s query Fauna to see our shape documents, and access their creation timestamps.

    シェイプを作成したので、Faunaに問い合わせてシェイプドキュメントを確認し、その作成タイムスタンプにアクセスしてみましょう。

    shell

    ```shell
    Map(
      Paginate(
        Match(Index("all_shapes"))
      ),
      Lambda("X", Get(Var("X")))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    shell

    ```shell
    { data:
       [ { ref: Ref(Collection("shapes"), "232990372366647808"),
           ts: 1558455784100000,
           data: { name: 'square', color: 'green' } },
         { ref: Ref(Collection("shapes"), "232990372366648832"),
           ts: 1558455784100000,
           data: { name: 'circle', color: 'blue' } },
         { ref: Ref(Collection("shapes"), "232990372366649856"),
           ts: 1558455784100000,
           data: { name: 'triangle', color: 'yellow' } },
         { ref: Ref(Collection("shapes"), "232990436517478912"),
           ts: 1558455845280000,
           data: { name: 'pentagon', color: 'black' } },
         { ref: Ref(Collection("shapes"), "232990436517479936"),
           ts: 1558455845280000,
           data: { name: 'octagon', color: 'red' } },
         { ref: Ref(Collection("shapes"), "232990436517480960"),
           ts: 1558455845280000,
           data: { name: 'hexagon', color: 'cyan' } } ] }
    ```

    The `ts` field for each document is a [Long](https://docs.fauna.com/fauna/current/api/fql/types#long), with microsecond resolution, that represents the most recent event that modified the document. Fauna versions documents: each modification stores a new copy of the updated document.

    各ドキュメントの `ts` フィールドは [Long](https://docs.fauna.com/fauna/current/api/fql/types#long) で、マイクロ秒の分解能で、ドキュメントを変更した最新のイベントを表します。Faunaバージョンのドキュメント：修正されるごとに、更新されたドキュメントの新しいコピーが保存されます。

    Notice that the timestamps for each group of shapes are the same. Fauna processes each transaction so that all write effects appear to occur at the same moment. The values you see in your output should be different than shown here.

    各グループの図形のタイムスタンプは同じであることに注意してください。Fauna は、すべての書き込み効果が同じ瞬間に発生したように見えるように各トランザクションを処理します。出力に表示される値は、ここで示したものとは異なるはずです。

7.  **Change some data**

**一部のデータを変更する。**

    Since Fauna’s temporal features let you see how data has changed over time, let’s make some changes. Suppose we no longer want the black pentagon, and the circle should have been white. We can make those changes with the following queries:

    Faunaの時間的機能により、データが時間とともにどのように変化したかを見ることができるので、少し変更してみよう。例えば、黒い五角形はもういらないし、円は白にすべきだったとします。このような変更は、以下のクエリで行うことができます。

    shell

    ```shell
    Delete(Ref(Collection("shapes"), "232990436517478912"))
    ```

    shell

    ```shell
    Update(
      Select("ref", Get(Match(Index("shapes_by_name"), "circle"))),
      { data: { color: "white" }}
    )
    ```

8.  **Review the shapes**

**図形のレビュー**

    Let’s run the review query again, so that we can see the effect of our changes.

    レビュークエリを再度実行して、変更の効果を確認してみましょう。

    shell

    ```shell
    Map(
      Paginate(
        Match(Index("all_shapes"))
      ),
      Lambda("X", Get(Var("X")))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    shell

    ```shell
    { data:
       [ { ref: Ref(Collection("shapes"), "232990372366647808"),
           ts: 1558455784100000,
           data: { name: 'square', color: 'green' } },
         { ref: Ref(Collection("shapes"), "232990372366648832"),
           ts: 1558456119830000,
           data: { name: 'circle', color: 'white' } },
         { ref: Ref(Collection("shapes"), "232990372366649856"),
           ts: 1558455784100000,
           data: { name: 'triangle', color: 'yellow' } },
         { ref: Ref(Collection("shapes"), "232990436517479936"),
           ts: 1558455845280000,
           data: { name: 'octagon', color: 'red' } },
         { ref: Ref(Collection("shapes"), "232990436517480960"),
           ts: 1558455845280000,
           data: { name: 'hexagon', color: 'cyan' } } ] }
    ```

    Good! The black pentagon is no longer listed, and our circle shape is now white.

    よかった! 黒い五角形のリストがなくなり、円の形が白になりました。

9.  **Temporal feature #1: Snapshots**

**時系列機能 #1: スナップショット**

    Fauna’s _snapshot_ feature lets you query your database to see the state of your data at a particular point in time. To review a snapshot of our shapes _after_ the first group was created, but _before_ the second group was created, we wrap our review query in the `At` command, and use the smaller of the two timestamps.

    Fauna の _snapshot_ 機能を使うと、データベースを照会して、特定の時点でのデータの状態を確認することができます。1つ目のグループが作成された後、2つ目のグループが作成される前のシェイプのスナップショットを確認するには、レビュークエリを `At` コマンドで囲み、2つのタイムスタンプのうち小さい方を使用します。

    The timestamp in the query below needs to be updated, since it reflects the time when this tutorial was written. Any timestamp between when you created the first group of shapes and the creation of the second group of shapes would work for this demonstration. However, it is easiest to replace `1558455784100000` in the query below with the timestamp reported in _your output_ for the square shape.

    以下のクエリのタイムスタンプは、このチュートリアルが書かれた時間を反映しているので、更新する必要があります。最初の図形グループを作成してから、2つ目の図形グループを作成するまでの間のタイムスタンプであれば、このデモで使用できます。しかし、以下のクエリの`1558455784100000`を、_your output_で報告された四角い図形のタイムスタンプに置き換えるのが最も簡単です。

    shell

    ```shell
    At(
      1558455784100000,
      Map(
        Paginate(
          Match(Index("all_shapes"))
        ),
        Lambda("X", Get(Var("X")))
      )
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    shell

    ```shell
    { data:
       [ { ref: Ref(Collection("shapes"), "232990372366647808"),
           ts: 1558455784100000,
           data: { name: 'square', color: 'green' } },
         { ref: Ref(Collection("shapes"), "232990372366648832"),
           ts: 1558455784100000,
           data: { name: 'circle', color: 'blue' } },
         { ref: Ref(Collection("shapes"), "232990372366649856"),
           ts: 1558455784100000,
           data: { name: 'triangle', color: 'yellow' } } ] }
    ```

    Only the first group of shapes is returned, since at the timestamp we specified, the second group had not been created, nor had the circle been updated to be white.

    指定したタイムスタンプの時点では、2つ目のグループは作成されておらず、円も白に更新されていなかったため、最初の図形グループのみが返されます。

    `At` is inclusive, which means that any documents created before, and up to and including the specified timestamp are evaluated in the provided query expression.

    At`は包括的な表現で、指定したタイムスタンプ以前に作成されたすべてのドキュメントと、指定したタイムスタンプまでのドキュメントが、指定したクエリ式で評価されることを意味します。

10.  **Temporal feature #2: Events**

**時系列の特徴2：イベント**

    Fauna never changes a stored document. Any updates you make creates a new copy of the document containing the changes, and the original document remains unchanged. That means, for the circle shape, Fauna has two copies of the circle shape, one when it was blue, and the other when it was white.

    Faunaは、保存されているドキュメントを変更することはありません。あなたが更新すると、その変更を含むドキュメントの新しいコピーが作成され、元のドキュメントは変更されません。つまり、円の図形の場合、Faunaは青の時と白の時の2つのコピーを持っていることになります。

    We can see the history of a document by using the `Events` command.

    ドキュメントの履歴を見るには`Events`コマンドを使います。

    shell

    ```shell
    Paginate(
      Events(
        Select(
          "ref",
          Get(Match(Index("shapes_by_name"), "circle"))
        )
      )
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    shell

    ```shell
    { data:
       [ { ts: 1558455784100000,
           action: 'create',
           instance: Ref(Collection("shapes"), "232990372366648832"),
           data: { name: 'circle', color: 'blue' } },
         { ts: 1558456119830000,
           action: 'update',
           instance: Ref(Collection("shapes"), "232990372366648832"),
           data: { color: 'white' } } ] }
    ```

    To explain the query, it is helpful to start at the right:

    このクエリを説明するには、右から順に説明するのが便利です。

    -   `Get(Match(Index("shapes_by_name"), "circle"))` retrieves the circle shape.
    -   `Select("ref", Get(…))` extracts the `ref` field from the circle’s document.
    -   `Events(Select(…))` retrieves the set of events for the specified reference.
    -   `Paginate(Events(…))` returns the materialized set of events.

---

    - `Get(Match(Index("shapes_by_name"), "circle"))` は円の形状を取得します。
    - `Select("ref", Get(...))` は、円のドキュメントから `ref` フィールドを抽出します。
    - `Events(Select(...))` は、指定された参照に対応するイベントのセットを取得します。
    - `Paginate(Events(...))`は実体化したイベントの集合を返します。

        `Events` can provide the set of modifications for any kind of document within Fauna. For user documents, the actions include `create`, `insert`, `remove`, `replace`, `update`, and delete. For indexes and databases, the actions include `add` and `remove`.

        `Events` はFauna内のあらゆる種類のドキュメントに対する修正のセットを提供することができる。ユーザドキュメントの場合、アクションには `create`, `insert`, `remove`, `replace`, `update`, and delete があります。インデックスやデータベースの場合、アクションには `add` と `remove` があります。

Since documents are stored immutably within Fauna, events are stored as snapshots of the associated document. Directly manipulating document history, using the [`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert) and [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove) functions, does not currently affect subsequent event snapshots.

Faunaではドキュメントは不変的に保存されるので、イベントは関連するドキュメントのスナップショットとして保存されます。[`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)や[Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)関数を使ってドキュメントの履歴を直接操作しても、現在のところ後続のイベントスナップショットには影響しません。

## [](#conclusion)Conclusion

結論

In this tutorial, we have modeled some simple documents with differing timestamps, and learned how to query the state of the database at a snapshot, and how to see the history of a particular document.

このチュートリアルでは、タイムスタンプの異なるいくつかの簡単なドキュメントをモデル化し、スナップショット時のデータベースの状態を問い合わせる方法と、特定のドキュメントの履歴を確認する方法を学びました。

## [](#related)Related

関連

-   [`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)
-   [`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)
-   [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)
