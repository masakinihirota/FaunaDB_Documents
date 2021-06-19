Index tutorials | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/indexes/

# Index tutorials

索引 チュートリアル

This section assumes that you have successfully completed the [Quick start with Fauna](https://docs.fauna.com/fauna/current/start/) tutorial, and that you still have the [Fauna Dashboard](https://dashboard.fauna.com/) open in a browser tab/window.

このセクションでは、[Quick start with Fauna](https://docs.fauna.com/fauna/current/start/)のチュートリアルが完了し、[Fauna Dashboard](https://dashboard.fauna.com/)がブラウザのタブ/ウィンドウで開かれていることを前提としています。

If your Fauna Dashboard session has expired, [log in again](https://dashboard.fauna.com/).

Fauna Dashboard のセッションが終了している場合は、[log in again](https://dashboard.fauna.com/)してください。

Indexes are the fundamental tool for querying your documents in Fauna.

インデックスは、Fauna で文書を照会するための基本的なツールです。

Since Fauna does not currently provide table scans, indexes are required for any queries where you do not already know all of the Refs involved.

現在、Fauna はテーブルスキャンを提供していないため、関連するすべての Ref を把握していないクエリでは、インデックスが必要です。

Indexes are also key to searching, sorting, and combining results from multiple collections (typically called "joins").

また、インデックスは、複数のコレクションからの結果を検索、ソート、結合（一般的に「結合」と呼ばれる）する際の鍵となります。

This section provides a number of tutorials that demonstrate how to use indexes in various ways.

このセクションでは、様々な方法でインデックスを使用する方法を示す多くのチュートリアルを提供しています。

The length of the field values specified for the `terms` or `values` fields must not exceed 32k bytes. The maximum size of an index entry, which is comprised of the `terms` and `values` content (and some overhead to distinguish multiple fields), must not exceed 64k bytes. If an index entry is too large, the query that created/updated the index entry fails.

terms`や`values`のフィールドに指定するフィールド値の長さは32kバイトを超えてはいけません。インデックスエントリの最大サイズは、`terms`と`values`の内容（および複数のフィールドを区別するための若干のオーバーヘッド）で構成され、64kバイトを超えてはなりません。インデックスエントリのサイズが大きすぎると、そのインデックスエントリを作成/更新したクエリが失敗します。

## [](#preparation)Preparation

準備

Each of the tutorials uses a common set of collections and documents.

各チュートリアルでは、共通のコレクションとドキュメントのセットを使用します。

### [](#create-collections)Create collections

コレクションの作成

A collection is like an SQL table: it groups similar kinds of documents together. Unlike SQL, the documents in a Fauna collection are not required to include the same fields.

コレクションとは、SQLテーブルのようなもので、似た種類のドキュメントをまとめたものです。SQL とは異なり、Fauna コレクションのドキュメントには同じフィールドが含まれている必要はありません。

For our tutorials, we’re going to create a `Letters` collection, storing the letters of the alphabet plus some counting fields, plus a `People` collection, storing `person` documents that include first and last names, plus a `letter` identifier.

チュートリアルでは、アルファベットの文字といくつかのカウントフィールドを格納する`Letters`コレクションと、姓名と`letter`識別子を含む`person`ドキュメントを格納する`People`コレクションを作成することにします。

Let’s create the collections:

それでは、コレクションを作成してみましょう。

1.  In the [Fauna Dashboard](https://dashboard.fauna.com/), make sure that you are using the `my_db` database.

Fauna Dashboard](https://dashboard.fauna.com/)で、`my_db`データベースを使用していることを確認してください。

    If you were already viewing the Dashboard click the **Dashboard Home** button at the top left.

    ダッシュボードを既に表示している場合は、左上の**ダッシュボード・ホーム**ボタンをクリックする。
    

    Click `my_db` in the list of databases.

    データベースの一覧から`my_db`をクリックする。
    

2.  Click the **NEW COLLECTION** button.

**NEW COLLECTION**ボタンをクリックします。
    

3.  Specify `Letters` for the **Collection Name** field.

**コレクション名** に `Letters` を指定する。
    

4.  Click the **SAVE** button.

**SAVE**ボタンをクリックする。

5.  Click the **NEW COLLECTION** button.

**NEW COLLECTION** ボタンをクリックします。

6.  Specify `People` for the **Collection Name** field.

コレクション名**」に「People」を指定する。
    

7.  Click the **SAVE** button.

**SAVE**ボタンをクリックする。
    

The collections have been created. If you were using the Shell (either in the [Fauna Dashboard](https://dashboard.fauna.com/), or `fauna-shell` in a terminal window), the following queries would create the collections:

コレクションの作成が完了しました。シェル（[Fauna Dashboard](https://dashboard.fauna.com/)またはターミナルウィンドウの `fauna-shell`）を使用していた場合、以下のクエリでコレクションが作成されます。

shell

```shell
CreateCollection({ name: "Letters" })
```

shell

```shell
CreateCollection({ name: "People" })
```

### [](#create-indexes)Create indexes

インデックスの作成

An index is a lookup table, which makes finding documents faster, and more efficient compared to inspecting every document.

インデックスとはルックアップテーブルのことで、すべてのドキュメントを調べるのに比べて、ドキュメントをより速く、より効率的に見つけることができます。

We need to create a few indexes to lookup documents within the collections that we just created:

先ほど作成したコレクション内のドキュメントを検索するために、いくつかのインデックスを作成する必要があります。

1.  In the [Fauna Dashboard](https://dashboard.fauna.com/), click **Indexes** in the left navigation panel.

Fauna Dashboard](https://dashboard.fauna.com/)で、左のナビゲーションパネルにある「**インデックス**」をクリックします。
    

2.  Click the **NEW INDEX** button.

**新しいインデックス**ボタンをクリックします。

3.  Select the `Letters` collection for the **Source Collection** field.

**Source Collection** フィールドで `Letters` コレクションを選択します。

4.  Specify `all_letters` for the **Index Name** field.

 Index Name**フィールドに`all_letters`を指定します。

5.  Click the **SAVE** button.

**SAVE**ボタンをクリックする。

6.  Click the **NEW INDEX** button.

**NEW INDEX** ボタンをクリックします。
    

7.  Select the `People` collection for the **Source Collection** field.

Source Collection**フィールドに`People`コレクションを選択します。
    

8.  Specify `all_people` for the **Index Name** field.

 Index Name**フィールドに`all_people`を指定する。
    

9.  Click the **SAVE** button.

SAVE**ボタンをクリックする。
    

The indexes have been created. If you were using the Shell (either in the [Fauna Dashboard](https://dashboard.fauna.com/), or `fauna-shell` in a terminal window), the following queries would create the indexes:

インデックスの作成が完了しました。シェル（[Fauna Dashboard](https://dashboard.fauna.com/)、またはターミナルウィンドウの `fauna-shell`）を使用していた場合、以下のクエリでインデックスが作成されます。

shell

```shell
CreateIndex({ name: "all_letters", source: Collection("Letters") })
```

shell

```shell
CreateIndex({ name: "all_people", source: Collection("People") })
```

The indexes that we have created are called "collection indexes", because that have no `terms` defined to help us search for specific fields, and no `values` defined to report specific fields in the results. These indexes just make it easy to fetch all of the documents in a collection.

作成したインデックスは「コレクション・インデックス」と呼ばれています。これは、特定のフィールドを検索するための「用語」が定義されておらず、結果の中で特定のフィールドを報告するための「値」も定義されていないからです。これらのインデックスは、コレクション内のすべてのドキュメントを簡単に取得するためのものです。

You can use the [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function instead of collection indexes.

コレクションインデックスの代わりに [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) 関数を使用することもできます。

### [](#create-documents)Create documents

ドキュメントの作成

A document is equivalent to an SQL record; it stores values for named fields (in SQL, "columns"). The notable differences are:

ドキュメントは SQL のレコードに相当し、名前の付いたフィールド(SQL では「カラム」)の値を格納します。特筆すべき違いは以下の通りです。

-   Fauna documents do not have to have the same field structure as any other document in the same collection.

- Fauna ドキュメントは、同じコレクション内の他のドキュメントと同じフィールド構造を持つ必要はありません。

-   Fields in Fauna documents can contain documents/nested data.

- Fauna ドキュメントのフィールドは、ドキュメント/ネストされたデータを含むことができる。
    

Let’s create some documents for the `Letters` collection. Copy the following query, paste it into your Shell, and run it:

それでは、`Letters`コレクションにいくつかのドキュメントを作成してみましょう。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Map(
  [
    [ "101", { letter: "A", extra: "First" } ],
    [ "102", { letter: "B", extra: "second" } ],
    [ "103", { letter: "C", extra: "third" } ],
    [ "104", { letter: "D", extra: "4th" } ],
    [ "105", { letter: "E", extra: "fifth" } ],
    [ "106", { letter: "F", extra: "sixth" } ],
    [ "107", { letter: "G", extra: "seventh" } ],
    [ "108", { letter: "H", extra: "eighth" } ],
    [ "109", { letter: "I", extra: "9th" } ],
    [ "110", { letter: "J", extra: "tenth" } ],
    [ "111", { letter: "K", extra: 11 } ],
    [ "112", { letter: "L", extra: "" } ],
    [ "113", { letter: "M" } ],
    [ "114", { letter: "N", extra: "14th" } ],
    [ "115", { letter: "O", extra: "fifteenth" } ],
    [ "116", { letter: "P", extra: "16th" } ],
    [ "117", { letter: "Q", extra: "seventeenth" } ],
    [ "118", { letter: "R", extra: "18th" } ],
    [ "119", { letter: "S", extra: "19th" } ],
    [ "120", { letter: "T", extra: "20th" } ],
    [ "121", { letter: "U", extra: "21st" } ],
    [ "122", { letter: "V", extra: "22nd" } ],
    [ "123", { letter: "W", extra: "twenty-third" } ],
    [ "124", { letter: "X", extra: 24 } ],
    [ "125", { letter: "Y", extra: "24 + 1" } ],
    [ "126", { letter: "Z" } ]
  ],
  Lambda(
    ["dID", "data"],
    Create(Ref(Collection("Letters"), Var("dID")), { data: Var("data") })
  )
)
```

The points of interest for this query:

このクエリの注目点。

-   We’re using the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) function to process an array of arrays, with the inner array containing a document ID and an object representing the document we wish to create in Fauna.

- ここでは、[Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)関数を使用して、配列の配列を処理しています。内部の配列には、ドキュメント ID と、Fauna で作成したいドキュメントを表すオブジェクトが含まれています。

    We’re using the document ID to create documents with a known numeric identifier, rather than the number that Fauna would auto-generate for us. Specified document IDs can make working with particular documents notably easier.

    ドキュメント ID は、Fauna が自動生成する番号ではなく、既知の数値識別子でドキュメントを作成するために使用します。ドキュメントIDを指定することで、特定のドキュメントの操作が非常に簡単になります。

-   We’re using a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function to process each item in the document array, where each item contains a document ID and the data for the corresponding document.

- ドキュメント配列の各アイテムを処理するために、[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数を使用しています。各アイテムには、ドキュメントIDと対応するドキュメントのデータが含まれています。

-   Each invocation of the Lambda function creates a new document in the `Letters` collection, using the [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var) function to apply the value of the `dID` variable as the document ID, and the `data` variable as the document’s data.

- Lambda関数を呼び出すたびに、`Letters`コレクションに新しいドキュメントが作成されます。[`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)関数を使って、`dID`変数の値をドキュメントIDとして適用し、`data`変数をドキュメントのデータとして適用しています。

When you run this query, the result should be similar to:

このクエリを実行すると、結果は次のようになるはずです。

```javascript
[
  {
    "ref": Ref(Collection("Letters"), "101"),
    "ts": 15652991764850000,
    "data": {
      "letter": "A",
      "extra": "First"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "102"),
    "ts": 15652991764850000,
    "data": {
      "letter": "B",
      "extra": "second"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "103"),
    "ts": 15652991764850000,
    "data": {
      "letter": "C",
      "extra": "third"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "104"),
    "ts": 15652991764850000,
    "data": {
      "letter": "D",
      "extra": "4th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "105"),
    "ts": 15652991764850000,
    "data": {
      "letter": "E",
      "extra": "fifth"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "106"),
    "ts": 15652991764850000,
    "data": {
      "letter": "F",
      "extra": "sixth"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "107"),
    "ts": 15652991764850000,
    "data": {
      "letter": "G",
      "extra": "seventh"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "108"),
    "ts": 15652991764850000,
    "data": {
      "letter": "H",
      "extra": "eighth"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "109"),
    "ts": 15652991764850000,
    "data": {
      "letter": "I",
      "extra": "9th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "110"),
    "ts": 15652991764850000,
    "data": {
      "letter": "J",
      "extra": "tenth"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "111"),
    "ts": 15652991764850000,
    "data": {
      "letter": "K",
      "extra": 11
    }
  },
  {
    "ref": Ref(Collection("Letters"), "112"),
    "ts": 15652991764850000,
    "data": {
      "letter": "L",
      "extra": ""
    }
  },
  {
    "ref": Ref(Collection("Letters"), "113"),
    "ts": 15652991764850000,
    "data": {
      "letter": "M"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "114"),
    "ts": 15652991764850000,
    "data": {
      "letter": "N",
      "extra": "14th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "115"),
    "ts": 15652991764850000,
    "data": {
      "letter": "O",
      "extra": "fifteenth"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "116"),
    "ts": 15652991764850000,
    "data": {
      "letter": "P",
      "extra": "16th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "117"),
    "ts": 15652991764850000,
    "data": {
      "letter": "Q",
      "extra": "seventeenth"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "118"),
    "ts": 15652991764850000,
    "data": {
      "letter": "R",
      "extra": "18th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "119"),
    "ts": 15652991764850000,
    "data": {
      "letter": "S",
      "extra": "19th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "120"),
    "ts": 15652991764850000,
    "data": {
      "letter": "T",
      "extra": "20th"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "121"),
    "ts": 15652991764850000,
    "data": {
      "letter": "U",
      "extra": "21st"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "122"),
    "ts": 15652991764850000,
    "data": {
      "letter": "V",
      "extra": "22nd"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "123"),
    "ts": 15652991764850000,
    "data": {
      "letter": "W",
      "extra": "twenty-third"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "124"),
    "ts": 15652991764850000,
    "data": {
      "letter": "X",
      "extra": 24
    }
  },
  {
    "ref": Ref(Collection("Letters"), "125"),
    "ts": 15652991764850000,
    "data": {
      "letter": "Y",
      "extra": "24 + 1"
    }
  },
  {
    "ref": Ref(Collection("Letters"), "126"),
    "ts": 1565299176485000,
    "data": {
      "letter": "Z"
    }
  }
]
```

Now, let’s create some documents for the `People` collection. Copy the following query, paste it into your Shell, and run it:

さて、`People`コレクションにいくつかのドキュメントを作成してみましょう。以下のクエリをコピーして、シェルに貼り付けて実行してください。

shell

```shell
Map(
  [
    {
      first: "Alan",    last: "Perlis",
      degrees: ['BA', 'MA', 'PhD'], letter: "A",
    },
    {
      first: "Alan",    last: "Turing",
      degrees: ['BA', 'MA', 'MS', 'PhD'], letter: "B",
    },
    {
      first: "Grace",   last: "Hopper",
      degrees: ['BA', 'MA', 'PhD'], letter: "C",
    },
    {
      first: "Leslie",  last: "Lamport",
      degrees: ['BS', 'MA', 'PhD'],
    },
    {
      first: "Marvin",  last: "Minsky",
      degrees: ['BA', 'PhD'], letter: 1,
    },
    {
      first: "Stephen", last: "Cook",
      degrees: ['BS', 'PhD'], letter: "F",
    },
    {
      first: "Tim",     last: "Cook",
      degrees: ['BS', 'MBA'], letter: "G",
    }
  ],
  Lambda(
    "person",
    Create(Collection("People"), { data: Var("person") })
  )
)
```

This query is very similar to the query we used to create documents in the `Letters` collection. The `People` documents that we have created just differ in structure.

このクエリは、`Letters`コレクションのドキュメントを作成する際に使用したクエリと非常によく似ています。今回作成した `People` ドキュメントは構造が異なるだけです。

You may have noticed that both queries vary the definition of the last field. These variations are used in the tutorials to highlight behavioral differences.

どちらのクエリも最後のフィールドの定義を変えていることにお気づきでしょうか。これらの違いは、動作の違いを強調するためにチュートリアルで使用されています。

When you run this query, the result should be similar to:

このクエリを実行すると、結果は次のようになるはずです。

```javascript
[
  {
    "ref": Ref(Collection("People"), "240166254282805769"),
    "ts": 1565299238420000,
    "data": {
      "first": 'Alan',
      "last": 'Perlis',
      "degrees": [ 'BA', 'MA', 'PhD' ],
      "letter": 'A'
    }
  },
  {
    "ref": Ref(Collection("People"), "240166254282801673"),
    "ts": 1565299238420000,
    "data": {
      "first": "Alan",
      "last": "Turing",
      "degrees": [ 'BA', 'MA', 'MS', 'PhD' ],
      "letter": "B"
    }
  },
  {
    "ref": Ref(Collection("People"), "240166254282806793"),
    "ts": 1565299238420000,
    "data": {
      "first": "Grace",
      "last": "Hopper",
      "degrees": [ 'BA', 'MA', 'PhD' ],
      "letter": "C"
    }
  },
  {
    "ref": Ref(Collection("People"), "240166254282803721"),
    "ts": 1565299238420000,
    "data": {
      "first": "Leslie",
      "last": "Lamport",
      "degrees": [ 'BS', 'MA', 'PhD' ]
    }
  },
  {
    "ref": Ref(Collection("People"), "240166254282804745"),
    "ts": 1565299238420000,
    "data": {
      "first": "Marvin",
      "last": "Minsky",
      "degrees": [ 'BA', 'PhD' ],
      "letter": 1
    }
  },
  {
    "ref": Ref(Collection("People"), "240166254282807817"),
    "ts": 1565299238420000,
    "data": {
      "first": "Stephen",
      "last": "Cook",
      "degrees": [ 'BS', 'PhD' ],
      "letter": "F"
    }
  },
  {
    "ref": Ref(Collection("People"), "240166254282802697"),
    "ts": 1565299238420000,
    "data": {
      "first": "Tim",
      "last": "Cook",
      "degrees": [ 'BS', 'MBA' ],
      "letter": "G"
    }
  }
]
```

Now that we have our collections and documents created, we’re all set to start working through the index tutorials.

コレクションとドキュメントの作成が完了したので、インデックスのチュートリアルを開始する準備が整いました。

## [](#next-steps)Next steps

次のステップ

-   [Pagination](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
-   [Sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
-   [Search](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
-   [Search and sort](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
-   [Bindings](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

---

- [ページネーション](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
- [Sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
- [検索](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
- [検索とソート](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
- [バインディング](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

The tutorials are listed in order of increasing complexity, but they can be followed in any order.

チュートリアルは、複雑なものから順に掲載されていますが、どのような順序でも実行できます。

