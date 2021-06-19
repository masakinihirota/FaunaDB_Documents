Pagination | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/indexes/pagination

# Pagination

ページネーション

Pagination refers to the process of splitting large result sets into smaller "pages". Doing so relieves the server, and the client, from dealing with potentially huge result sets in one step. The tradeoff is that more work needs to be done if you do need to process large result sets.

ページ分割とは、大きな結果セットをより小さな「ページ」に分割するプロセスのことです。ページ分割を行うことで、サーバーやクライアントは巨大な結果セットを一度に処理する必要がなくなります。その代わり、大きな結果セットを処理する必要がある場合には、より多くの作業が必要になります。

Currently, when you want to process all of the documents in a collection, for searching, sorting, or simply fetching one or more fields, an index is typically required (the only exception would be when you would track each document’s Ref independently, in your code).

現在、コレクション内のすべてのドキュメントを検索、ソート、または単に1つまたは複数のフィールドを取得するために処理したい場合、通常はインデックスが必要です（唯一の例外は、コード内で各ドキュメントのRefを個別に追跡する場合です）。

This tutorial demonstrates several pagination scenarios:

このチュートリアルでは、いくつかのページネーションのシナリオを紹介します。

-   [Basic pagination](#basic)
-   [All documents, for small collections](#query-small)
-   [All documents, for large collections](#query-large)
-   [Paginating indexes with multiple values](#multiple)

---

- 基本的なページネーション](#basic)
- すべてのドキュメント、小さなコレクション用](#query-small)
- 大規模なコレクションのすべてのドキュメント](#query-large)
- 複数の値を持つインデックスのページ分割](#multiple)

This tutorial assumes that you have successfully [prepared](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation) your database by creating the necessary collections and documents.

このチュートリアルでは、必要なコレクションやドキュメントを作成し、データベースの[準備](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation)が完了していることを前提としています。

## [](#basic)Basic pagination

基本的なページネーション

The easiest way to demonstrate pagination is to use a "collection index", this is, an index that has no defined `terms` or `values` fields. Such indexes record each member document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). That makes collection indexes useful for retrieving all of the collection’s documents.

ページ処理を実演する最も簡単な方法は、"コレクションインデックス "を使用することです。これは、`terms`や`values`フィールドが定義されていないインデックスです。このようなインデックスは、各メンバー文書の[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を記録します。そのため、コレクションインデックスは、コレクションのすべてのドキュメントを検索するのに便利です。

If you are using the Web Shell in the Fauna Dashboard, the [Fauna Dashboard](https://dashboard.fauna.com/) automatically created a collection index called `all_letters`. If you are using `fauna-shell`, you need to create the index. Copy the following query, paste it into the Web Shell, and run it:

Fauna DashboardでWeb Shellを使用している場合、[Fauna Dashboard](https://dashboard.fauna.com/)は自動的に`all_letters`というコレクションインデックスを作成します。fauna-shell` を使用している場合は、インデックスを作成する必要があります。以下のクエリをコピーしてWeb Shellに貼り付けて実行してください。

shell

```shell
CreateIndex({
  name: "all_letters",
  source: Collection("Letters")
})
```

There are several different ways that we can use collection indexes to fetch documents. For the following examples, copy a query and paste it into the Shell, and run it.

コレクションインデックスを使ってドキュメントを取得するには、いくつかの異なる方法があります。以下の例では、クエリをコピーしてシェルに貼り付け、実行してみてください。

## [](#query-small)All documents, for small collections

すべてのドキュメント、小さなコレクションを対象とする

Our `Letters` collection contains 26 documents, one for each letter in the alphabet. We can fetch them all in one query, using the index that we created in [the previous section](#basic):

私たちの `Letters` コレクションには、アルファベットの各文字に対応した26のドキュメントが含まれています。前のセクション](#basic)で作成したインデックスを使って、1つのクエリですべての文書を取得することができます。

shell

```shell
Paginate(Match(Index("all_letters")))
```

This query uses the [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) function to specify that we’re working with the `all_letters` index. The [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function is used to "search" the index, producing a set of results; no search criteria is provided because the index has no `terms` specified with which to search. The [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) function is used to traverse the result set’s entries.

このクエリでは、[Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex)関数を使って、`all_letters`というインデックスを使っていることを指定しています。Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) 関数はインデックスを「検索」して、一連の結果を生成します。インデックスには検索するための「用語」が指定されていないので、検索条件は提供されません。Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)関数は，結果セットのエントリをトラバースするために使用されます．

When you run this query, the result should look similar to:

このクエリを実行すると、結果は次のようになります。

```javascript
{
  "data": [
    Ref(Collection("Letters"), "101"),
    Ref(Collection("Letters"), "102"),
    Ref(Collection("Letters"), "103"),
    Ref(Collection("Letters"), "104"),
    Ref(Collection("Letters"), "105"),
    Ref(Collection("Letters"), "106"),
    Ref(Collection("Letters"), "107"),
    Ref(Collection("Letters"), "108"),
    Ref(Collection("Letters"), "109"),
    Ref(Collection("Letters"), "110"),
    Ref(Collection("Letters"), "111"),
    Ref(Collection("Letters"), "112"),
    Ref(Collection("Letters"), "113"),
    Ref(Collection("Letters"), "114"),
    Ref(Collection("Letters"), "115"),
    Ref(Collection("Letters"), "116"),
    Ref(Collection("Letters"), "117"),
    Ref(Collection("Letters"), "118"),
    Ref(Collection("Letters"), "119"),
    Ref(Collection("Letters"), "120"),
    Ref(Collection("Letters"), "121"),
    Ref(Collection("Letters"), "122"),
    Ref(Collection("Letters"), "123"),
    Ref(Collection("Letters"), "124"),
    Ref(Collection("Letters"), "125"),
    Ref(Collection("Letters"), "126")
  ]
}
```

The result demonstrates that the index contains references to the documents. These references are useful, we can pick one to fetch the details for a specific document.

この結果は、インデックスがドキュメントへの参照を含んでいることを示しています。これらの参照は便利なもので，一つを選んで特定のドキュメントの詳細を取得することができます．

shell

```shell
Get(Ref(Collection("Letters"), "103"))
```

When that query is executed, the result should be similar to:

このクエリを実行すると、結果は次のようになります。

```javascript
{
  "ref": Ref(Collection("Letters"), "103"),
  "ts": 1565299176485000,
  "data": {
    "letter": "C",
    "extra": "third"
  }
}
```

What if we wanted to see the contents of every document, and not just the refs? That’s where pagination is needed. We would change our `Paginate` query to look like this:

もし、参照だけでなく、すべてのドキュメントの内容を見たいとしたらどうでしょうか？そこで必要になるのがページネーションです。そこで、`Paginate`クエリを次のように変更します。

shell

```shell
Map(
  Paginate(Match(Index("all_letters"))),
  Lambda("X", Get(Var("X")))
)
```

The points of interest for this query:

このクエリの注目すべき点です。

-   We use the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) function to process each of the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) results with a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function.

- [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)という関数を使って、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)の結果をそれぞれ[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)という関数で処理しています。

-   We use the variable named `X`, just to provide a variable name via [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var). You can use any variable name you like.

- X`という変数を使っていますが、これは[`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)で変数名を指定しているだけです。好きな変数名を使うことができます。

-   We only need one variable for the `Lambda` function, because our index only returns one value for each document in the collection: the document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). If our index specified a `values` field, we would need to use one variable per field defined by the `values` field.

- `Lambda`関数に必要な変数は1つだけです。なぜなら、このインデックスはコレクション内の各ドキュメントに対して、ドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)という1つの値しか返さないからです。もしインデックスが `values` フィールドを指定していたら、`values` フィールドで定義されたフィールドごとに1つの変数を使用する必要があるでしょう。

-   The `Lambda` function simply calls the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the document specified by the `X` variable.

- `Lambda`関数は，単に[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を呼び出して，`X`変数で指定された文書を取得します．

When you run this query, the result should be similar to:

このクエリを実行すると、結果は次のようになるはずです。

```javascript
{
  "data": [
    {
      "ref": Ref(Collection("Letters"), "101"),
      "ts": 1565299176485000,
      "data": {
        "letter": "A",
        "extra": "First"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "102"),
      "ts": 1565299176485000,
      "data": {
        "letter": "B",
        "extra": "second"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "103"),
      "ts": 1565299176485000,
      "data": {
        "letter": "C",
        "extra": "third"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "104"),
      "ts": 1565299176485000,
      "data": {
        "letter": "D",
        "extra": "4th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "105"),
      "ts": 1565299176485000,
      "data": {
        "letter": "E",
        "extra": "fifth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "106"),
      "ts": 1565299176485000,
      "data": {
        "letter": "F",
        "extra": "sixth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "107"),
      "ts": 1565299176485000,
      "data": {
        "letter": "G",
        "extra": "seventh"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "108"),
      "ts": 1565299176485000,
      "data": {
        "letter": "H",
        "extra": "eighth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "109"),
      "ts": 1565299176485000,
      "data": {
        "letter": "I",
        "extra": "9th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "110"),
      "ts": 1565299176485000,
      "data": {
        "letter": "J",
        "extra": "tenth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "111"),
      "ts": 1565299176485000,
      "data": {
        "letter": "K",
        "extra": 11
      }
    },
    {
      "ref": Ref(Collection("Letters"), "112"),
      "ts": 1565299176485000,
      "data": {
        "letter": "L",
        "extra": ""
      }
    },
    {
      "ref": Ref(Collection("Letters"), "113"),
      "ts": 1565299176485000,
      "data": {
        "letter": "M"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "114"),
      "ts": 1565299176485000,
      "data": {
        "letter": "N",
        "extra": "14th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "115"),
      "ts": 1565299176485000,
      "data": {
        "letter": "O",
        "extra": "fifteenth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "116"),
      "ts": 1565299176485000,
      "data": {
        "letter": "P",
        "extra": "16th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "117"),
      "ts": 1565299176485000,
      "data": {
        "letter": "Q",
        "extra": "seventeenth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "118"),
      "ts": 1565299176485000,
      "data": {
        "letter": "R",
        "extra": "18th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "119"),
      "ts": 1565299176485000,
      "data": {
        "letter": "S",
        "extra": "19th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "120"),
      "ts": 1565299176485000,
      "data": {
        "letter": "T",
        "extra": "20th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "121"),
      "ts": 1565299176485000,
      "data": {
        "letter": "U",
        "extra": "21st"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "122"),
      "ts": 1565299176485000,
      "data": {
        "letter": "V",
        "extra": "22nd"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "123"),
      "ts": 1565299176485000,
      "data": {
        "letter": "W",
        "extra": "twenty-third"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "124"),
      "ts": 1565299176485000,
      "data": {
        "letter": "X",
        "extra": 24
      }
    },
    {
      "ref": Ref(Collection("Letters"), "125"),
      "ts": 1565299176485000,
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
}
```

Note that the results are in sorted order. That’s because we provided specific ids for each `Letters` document rather than using Fauna’s auto-generated ids. When multiple documents are created in a single transaction, Fauna opportunistically runs portions of the transaction’s queries in parallel. This can result in seemingly random document ids that can appear to sort documents chaotically.

結果がソートされていることに注意してください。これは、Fauna の自動生成された ID を使用せず、各 `Letters` ドキュメントに特定の ID を提供したためです。1 つのトランザクションで複数のドキュメントが作成されると、Fauna はそのトランザクションのクエリの一部を適宜、並行して実行します。そのため、ドキュメントのIDがランダムになり、ドキュメントが無秩序にソートされているように見えることがあります。

For example, let’s query the `People` documents to see their order. Copy the following query, paste it into the Shell, and run it:

たとえば、`People`ドキュメントにクエリを実行して、その順序を確認してみましょう。以下のクエリをコピーしてシェルに貼り付け、実行してください。

shell

```shell
Map(
  Paginate(Match(Index("all_people"))),
  Lambda("X", Get(Var("X")))
)
```

When you run the query, the output should be similar to:

このクエリを実行すると、以下のような出力が得られるはずです。

```javascript
{
  data: [
    {
      ref: Ref(Collection("People"), "240166254282804745"),
      ts: 1565299238420000,
      data: {
        first: "Marvin",
        last: "Minsky",
        degrees: ["BA", "PhD"],
        letter: 1
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282807817"),
      ts: 1565299238420000,
      data: {
        first: "Stephen",
        last: "Cook",
        degrees: ["BS", "PhD"],
        letter: "F"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282806793"),
      ts: 1565299238420000,
      data: {
        first: "Grace",
        last: "Hopper",
        degrees: ["BA", "MA", "PhD"],
        letter: "C"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282802697"),
      ts: 1565299238420000,
      data: {
        first: "Tim",
        last: "Cook",
        degrees: ["BS", "MBA"],
        letter: "G"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282805769"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Perlis",
        degrees: ["BA", "MA", "PhD"],
        letter: "A"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282803721"),
      ts: 1565299238420000,
      data: {
        first: "Leslie",
        last: "Lamport",
        degrees: ["BS", "MA", "PhD"]
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282801673"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Turing",
        degrees: ["BA", "MA", "MS", "PhD"],
        letter: "B"
      }
    }
  ]
}
```

Follow the [sort tutorial](https://docs.fauna.com/fauna/current/tutorials/indexes/sort) to see how to return the documents in order.

ドキュメントを順番に返す方法は、[sort tutorial](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)に従ってください。

## [](#query-large)All documents, for large collections

すべてのドキュメント、大規模なコレクションの場合

The `Paginate` function defaults to returning up to 64 documents in a "page", which is a subset of the results.

`Paginate`関数のデフォルトでは、結果のサブセットである「ページ」の中に最大64個のドキュメントを返すようになっています。

`Paginate` works this way to prevent a common problem encountered with SQL databases when a user executes a query such as `SELECT * FROM TABLE x;`: the user doesn’t know how large each record might be, nor how many records might exist. This could result in fetching exceedingly large records, exceedingly large numbers of records, or both. These scenarios tax the database server, and the client code, consuming resources to store, transmit, and report results, and can often result in database server outages and/or client non-responsiveness.

Paginate`がこのように動作するのは、SQLデータベースでユーザーが `SELECT * FROM TABLE x;` のようなクエリを実行したときに発生する一般的な問題を防ぐためです。これは、ユーザーが各レコードのサイズやレコードの数を把握していないためです。そのため、非常に大きなレコード、非常に多くのレコード、またはその両方を取得することになります。これらのシナリオは、データベースサーバーやクライアントコードに負担をかけ、結果の保存、送信、報告のためにリソースを消費し、データベースサーバーの停止やクライアントの無反応につながることがよくあります。

So, what happens when you have more documents than `Paginate` would return? First, the default page size of 64 can be adjusted, up to the maximum value of 100,000 documents. If your collection has fewer documents than the maximum, you could return all of a collection’s documents in a single query. For collections with more than 100,000 documents, multiple queries are required.

では、`Paginate`が返すよりも多くの文書がある場合はどうなるのでしょうか。まず、デフォルトのページサイズである64を、最大値である100,000文書まで調整することができます。コレクションの文書数が最大値よりも少ない場合は、1つのクエリでコレクションのすべての文書を返すことができます。100,000以上のドキュメントを持つコレクションの場合は、複数のクエリが必要になります。

We can simulate what happens by making `Paginate`'s page size smaller by specifying the `size` parameter:

`size`パラメータを指定して`Paginate`のページサイズを小さくすることで、この現象をシミュレートすることができます。

shell

```shell
Map(
  Paginate(Match(Index("all_letters")), { size: 3 }),
  Lambda("X", Get(Var("X")))
)
```

Note that we’re using the collection index that we created in the [Basic pagination](#basic) section.

基本的なページネーション](#basic)のセクションで作成したコレクションインデックスを使用していることに注意してください。

When you run this query, the results should be similar to:

このクエリを実行すると、次のような結果になるはずです。

```javascript
{
  "after": [
    Ref(Collection("Letters"), "104")
  ],
  "data": [
    {
      "ref": Ref(Collection("Letters"), "101"),
      "ts": 1565299176485000,
      "data": {
        "letter": "A",
        "extra": "First"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "102"),
      "ts": 1565299176485000,
      "data": {
        "letter": "B",
        "extra": "second"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "103"),
      "ts": 1565299176485000,
      "data": {
        "letter": "C",
        "extra": "third"
      }
    }
  ]
}
```

These results show that our query returned the first 3 documents, in the same order as the [previous](#query-small) results.

これらの結果は、私たちのクエリが最初の3つのドキュメントを、[previous](#query-small)の結果と同じ順番で返したことを示しています。

Notice the inclusion of the `after` field. This is a _cursor_, a marker the points to the entry that would start the next _page_ of results. The cursor’s structure is determined by the `values` field of the index, which for our `all_letters` index is just each document’s Ref.

`after`というフィールドが含まれていることに注目してください。これは _cursor_ であり、結果の次の _page_ を開始するエントリを指し示すマーカーです。カーソルの構造はインデックスの `values` フィールドによって決定されますが、今回の `all_letters` インデックスでは、各ドキュメントの Ref.

If we wanted to fetch the next page of results, we need to specify `after` in the `Paginate` function call:

次のページの結果を取得したい場合には、`Paginate`関数の呼び出しで`after`を指定する必要があります。

shell

```shell
Map(
  Paginate(
    Match(Index("all_letters")),
    {
      size: 3,
      after: [ Ref(Collection("Letters"), "104") ]
    }
  ),
  Lambda("X", Get(Var("X")))
)
```

When you run this query, the results should be similar to:

このクエリを実行すると、結果は以下のようになるはずです。

```javascript
{
  "before": [
    Ref(Collection("Letters"), "104")
  ],
  "after": [
    Ref(Collection("Letters"), "107")
  ],
  "data": [
    {
      "ref": Ref(Collection("Letters"), "104"),
      "ts": 1565299176485000,
      "data": {
        "letter": "D",
        "extra": "4th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "105"),
      "ts": 1565299176485000,
      "data": {
        "letter": "E",
        "extra": "fifth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "106"),
      "ts": 1565299176485000,
      "data": {
        "letter": "F",
        "extra": "sixth"
      }
    }
  ]
}
```

As you can see, we now have the next group of 3 documents from our [document collection](#query-small).

ご覧のように、[ドキュメントコレクション](#query-small)から3つのドキュメントの次のグループが表示されています。

Notice that, this time, there is now a `before` field in the results. Like `after`, `before` is a cursor that points to the first entry in the current page, so that Fauna can use the `size` parameter to determine which results to include in the previous page.

今回は、結果の中に `before` フィールドがあることに注目してください。after` と同様に、`before` は現在のページの最初のエントリを指すカーソルで、Fauna は `size` パラメータを使用して、前のページに含める結果を決定することができます。

The `size` parameter can be different sizes in different queries. If we repeat the previous query with `size` adjust to 1:

size`パラメータは、クエリごとに異なるサイズにすることができます。size` を 1 に調整して前のクエリを繰り返すと、次のようになります。

shell

```shell
Map(
  Paginate(
    Match(Index("all_letters")),
    {
      size: 1,
      after: [ Ref(Collection("Letters"), "104") ]
    }
  ),
  Lambda("X", Get(Var("X")))
)
```

the result would be similar to:

とすると、結果は次のようになります。

```javascript
{
  "before": [
    Ref(Collection("Letters"), "104")
  ],
  "after": [
    Ref(Collection("Letters"), "105")
  ],
  "data": [
    {
      "ref": Ref(Collection("Letters"), "104"),
      "ts": 1565299176485000,
      "data": {
        "letter": "D",
        "extra": "4th"
      }
    }
  ]
}
```

So, now you might be wondering, "what happens when we run out of pages?". Let’s run the previous query again, but adjust the `size` parameter to 100 (far more than the number of `Letters` documents in our collection):

さて、「ページ数が足りなくなったらどうなるんだろう」と疑問に思うかもしれませんね。先ほどのクエリをもう一度実行してみましょう。ただし、`size`パラメータを100に調整してください（コレクション内の`Letters`ドキュメントの数よりもはるかに多い数です）。

shell

```shell
Map(
  Paginate(
    Match(Index("all_letters")),
    {
      size: 100,
      after: [ Ref(Collection("Letters"), "104") ]
    }
  ),
  Lambda("X", Get(Var("X")))
)
```

The result should be similar to:

結果は以下のようになるはずです。

```javascript
{
  "before": [
    Ref(Collection("Letters"), "104")
  ],
  "data": [
    {
      "ref": Ref(Collection("Letters"), "104"),
      "ts": 1565299176485000,
      "data": {
        "letter": "D",
        "extra": "4th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "105"),
      "ts": 1565299176485000,
      "data": {
        "letter": "E",
        "extra": "fifth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "106"),
      "ts": 1565299176485000,
      "data": {
        "letter": "F",
        "extra": "sixth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "107"),
      "ts": 1565299176485000,
      "data": {
        "letter": "G",
        "extra": "seventh"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "108"),
      "ts": 1565299176485000,
      "data": {
        "letter": "H",
        "extra": "eighth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "109"),
      "ts": 1565299176485000,
      "data": {
        "letter": "I",
        "extra": "9th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "110"),
      "ts": 1565299176485000,
      "data": {
        "letter": "J",
        "extra": "tenth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "111"),
      "ts": 1565299176485000,
      "data": {
        "letter": "K",
        "extra": 11
      }
    },
    {
      "ref": Ref(Collection("Letters"), "112"),
      "ts": 1565299176485000,
      "data": {
        "letter": "L",
        "extra": ""
      }
    },
    {
      "ref": Ref(Collection("Letters"), "113"),
      "ts": 1565299176485000,
      "data": {
        "letter": "M"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "114"),
      "ts": 1565299176485000,
      "data": {
        "letter": "N",
        "extra": "14th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "115"),
      "ts": 1565299176485000,
      "data": {
        "letter": "O",
        "extra": "fifteenth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "116"),
      "ts": 1565299176485000,
      "data": {
        "letter": "P",
        "extra": "16th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "117"),
      "ts": 1565299176485000,
      "data": {
        "letter": "Q",
        "extra": "seventeenth"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "118"),
      "ts": 1565299176485000,
      "data": {
        "letter": "R",
        "extra": "18th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "119"),
      "ts": 1565299176485000,
      "data": {
        "letter": "S",
        "extra": "19th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "120"),
      "ts": 1565299176485000,
      "data": {
        "letter": "T",
        "extra": "20th"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "121"),
      "ts": 1565299176485000,
      "data": {
        "letter": "U",
        "extra": "21st"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "122"),
      "ts": 1565299176485000,
      "data": {
        "letter": "V",
        "extra": "22nd"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "123"),
      "ts": 1565299176485000,
      "data": {
        "letter": "W",
        "extra": "twenty-third"
      }
    },
    {
      "ref": Ref(Collection("Letters"), "124"),
      "ts": 1565299176485000,
      "data": {
        "letter": "X",
        "extra": 24
      }
    },
    {
      "ref": Ref(Collection("Letters"), "125"),
      "ts": 1565299176485000,
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
}
```

We have received all of the letters after the first 3. Notice that the `after` field is no longer present. When `after` is not included, that means that there are no pages after these results. When `before` is not included, there are no pages before these results. That makes it easy for application code to determine when to stop issuing queries when fetching lots of records.

最初の3文字以降のすべての文字を受信しました。 after`のフィールドがなくなっていることに注目してください。after`が含まれていないということは、これらの結果の後にはページがないということです。また、`before`が含まれていない場合、これらの結果の前にはページがないことになります。これにより、アプリケーションコードは、大量のレコードを取得する際に、いつクエリの発行を停止するかを簡単に判断することができます。

## [](#multiple)Paginating indexes with multiple values

複数の値を持つインデックスのページ分割

Paginating with a collection index is straightforward. Collection indexes have no `values` specified, so the index stores a Ref for each document from the index’s source collection.

コレクションインデックスを使ったページングは簡単です。コレクションインデックスには `values` が指定されていないので、インデックスはインデックスのソースコレクションの各ドキュメントのRefを格納します。

How would you handle pagination for an index with `values` specified? Let’s find out! Here, we create a new index for the `People` collection that specifies multiple fields in `values`. Copy the following query, paste it into the Shell, and run it:

では、`values` が指定されているインデックスのページネーションはどのように扱うのでしょうか。それを見てみましょう。ここでは、`People`コレクションに対して、`values`に複数のフィールドを指定した新しいインデックスを作成します。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
CreateIndex({
  name: "all_people_all_fields",
  source: Collection("People"),
  values: [
    { field: ["data", "first"] },
    { field: ["data", "last"] },
    { field: ["data", "degrees"] },
    { field: ["data", "letter"] },
    { field: ["ref"] }
  ]
})
```

This index records all of the fields from our `People` documents as well as each document’s Ref.

このインデックスは、`People`ドキュメントのすべてのフィールドと、各ドキュメントのRefを記録しています。

Now, let’s see the results. Copy the following query, paste it into the Shell, and run it:

では、結果を見てみましょう。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Paginate(Match(Index("all_people_all_fields")))
```

When you run the query, the result should be similar to:

このクエリを実行すると、次のような結果が得られるはずです。

```javascript
{
  data: [
    [
      "Alan",
      "Perlis",
      "BA",
      "A",
      Ref(Collection("People"), "240166254282805769")
    ],
    [
      "Alan",
      "Perlis",
      "MA",
      "A",
      Ref(Collection("People"), "240166254282805769")
    ],
    [
      "Alan",
      "Perlis",
      "PhD",
      "A",
      Ref(Collection("People"), "240166254282805769")
    ],
    [
      "Alan",
      "Turing",
      "BA",
      "B",
      Ref(Collection("People"), "240166254282801673")
    ],
    [
      "Alan",
      "Turing",
      "MA",
      "B",
      Ref(Collection("People"), "240166254282801673")
    ],
    [
      "Alan",
      "Turing",
      "MS",
      "B",
      Ref(Collection("People"), "240166254282801673")
    ],
    [
      "Alan",
      "Turing",
      "PhD",
      "B",
      Ref(Collection("People"), "240166254282801673")
    ],
    [
      "Grace",
      "Hopper",
      "BA",
      "C",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Grace",
      "Hopper",
      "MA",
      "C",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Grace",
      "Hopper",
      "PhD",
      "C",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Leslie",
      "Lamport",
      "BS",
      null,
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Leslie",
      "Lamport",
      "MA",
      null,
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Leslie",
      "Lamport",
      "PhD",
      null,
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Marvin",
      "Minsky",
      "BA",
      1,
      Ref(Collection("People"), "240166254282804745")
    ],
    [
      "Marvin",
      "Minsky",
      "PhD",
      1,
      Ref(Collection("People"), "240166254282804745")
    ],
    [
      "Stephen",
      "Cook",
      "BS",
      "F",
      Ref(Collection("People"), "240166254282807817")
    ],
    [
      "Stephen",
      "Cook",
      "PhD",
      "F",
      Ref(Collection("People"), "240166254282807817")
    ],
    [
      "Tim",
      "Cook",
      "BS",
      "G",
      Ref(Collection("People"), "240166254282802697")
    ],
    [
      "Tim",
      "Cook",
      "MBA",
      "G",
      Ref(Collection("People"), "240166254282802697")
    ]
  ]
}
```

Notice that, because we are indexing the `degrees` field (which is an array), an index entry with each distinct `degrees` value has been created. This feature makes it easy to match any item in an array field.

ここで注目していただきたいのは、（配列である）`degrees`フィールドのインデックスを作成しているので、それぞれの`degrees`値のインデックスエントリが作成されていることです。この機能により、配列フィールドのどの項目にも簡単にマッチさせることができます。

That worked well. Simple. Easy. So, what’s the problem? Let’s try operating on each document, like we’ve done previously. Copy the following query, paste is into the Shell, and run it:

うまくいきましたね。簡単。簡単ですね。さて、問題は何でしょうか？前にやったように、ドキュメントごとに操作してみましょう。以下のクエリをコピーして、シェルに貼り付けて実行してみてください。

shell

```shell
Map(
  Paginate(Match(Index("all_people_all_fields"))),
  Lambda("X", Get(Var("X")))
)
```

This query is also very similar to previous queries. So, it should work fine. When you run the query, the result should be similar to:

このクエリは、これまでのクエリと非常によく似ています。そのため、問題なく動作するはずです。このクエリを実行すると、結果は次のようになるはずです。

```javascript
Error: [
  {
    "position": [
      "map",
      "expr",
      "get"
    ],
    "code": "invalid argument",
    "description": "Ref or Set expected, Array provided."
  }
]
```

What went wrong? The "shape" of our index is different. Since the index contains all of the fields in each document, as well as the document’s Ref, the `Lambda` function needs to accept exactly the same variables as defined in the index’s `values`.

何が悪かったのでしょうか？インデックスの「形」が違うのです。インデックスには各ドキュメントのすべてのフィールドとドキュメントのRefが含まれているので、`Lambda`関数はインデックスの`values`で定義されているのと全く同じ変数を受け入れる必要があります。

The fix is easy. Copy the following query, paste it into the shell, and run it:

修正方法は簡単です。次のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Map(
  Paginate(Match(Index("all_people_all_fields"))),
  Lambda(
    ["W", "X", "Y", "Z", "ref"],
    Get(Var("ref"))
  )
)
```

This query changes the `Lambda` function to accept the variables `X`, `Y`, `Z`, and `ref`. This matches the number of fields in the index. We’re not going to use the values from the document’s fields, so they can have generic variable names. But we are going to use the document’s Ref, so we give that variable the name `ref` so that we know what it contains.

このクエリは、変数 `X`, `Y`, `Z`, `ref` を受け入れるように `Lambda` 関数を変更します。これは、インデックスのフィールド数と一致します。ドキュメントのフィールドの値を使用するつもりはありませんので、一般的な変数名にすることができます。しかし、ドキュメントのRefを使用する予定なので、その変数には`ref`という名前をつけて、何が含まれているかわかるようにしています。

When you run the query, the result should be similar to:

このクエリを実行すると、結果は次のようになります。

```javascript
{
  data: [
    {
      ref: Ref(Collection("People"), "240166254282805769"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Perlis",
        degrees: ["BA", "MA", "PhD"],
        letter: "A"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282805769"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Perlis",
        degrees: ["BA", "MA", "PhD"],
        letter: "A"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282805769"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Perlis",
        degrees: ["BA", "MA", "PhD"],
        letter: "A"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282801673"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Turing",
        degrees: ["BA", "MA", "MS", "PhD"],
        letter: "B"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282801673"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Turing",
        degrees: ["BA", "MA", "MS", "PhD"],
        letter: "B"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282801673"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Turing",
        degrees: ["BA", "MA", "MS", "PhD"],
        letter: "B"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282801673"),
      ts: 1565299238420000,
      data: {
        first: "Alan",
        last: "Turing",
        degrees: ["BA", "MA", "MS", "PhD"],
        letter: "B"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282806793"),
      ts: 1565299238420000,
      data: {
        first: "Grace",
        last: "Hopper",
        degrees: ["BA", "MA", "PhD"],
        letter: "C"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282806793"),
      ts: 1565299238420000,
      data: {
        first: "Grace",
        last: "Hopper",
        degrees: ["BA", "MA", "PhD"],
        letter: "C"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282806793"),
      ts: 1565299238420000,
      data: {
        first: "Grace",
        last: "Hopper",
        degrees: ["BA", "MA", "PhD"],
        letter: "C"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282803721"),
      ts: 1565299238420000,
      data: {
        first: "Leslie",
        last: "Lamport",
        degrees: ["BS", "MA", "PhD"]
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282803721"),
      ts: 1565299238420000,
      data: {
        first: "Leslie",
        last: "Lamport",
        degrees: ["BS", "MA", "PhD"]
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282803721"),
      ts: 1565299238420000,
      data: {
        first: "Leslie",
        last: "Lamport",
        degrees: ["BS", "MA", "PhD"]
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282804745"),
      ts: 1565299238420000,
      data: {
        first: "Marvin",
        last: "Minsky",
        degrees: ["BA", "PhD"],
        letter: 1
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282804745"),
      ts: 1565299238420000,
      data: {
        first: "Marvin",
        last: "Minsky",
        degrees: ["BA", "PhD"],
        letter: 1
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282807817"),
      ts: 1565299238420000,
      data: {
        first: "Stephen",
        last: "Cook",
        degrees: ["BS", "PhD"],
        letter: "F"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282807817"),
      ts: 1565299238420000,
      data: {
        first: "Stephen",
        last: "Cook",
        degrees: ["BS", "PhD"],
        letter: "F"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282802697"),
      ts: 1565299238420000,
      data: {
        first: "Tim",
        last: "Cook",
        degrees: ["BS", "MBA"],
        letter: "G"
      }
    },
    {
      ref: Ref(Collection("People"), "240166254282802697"),
      ts: 1565299238420000,
      data: {
        first: "Tim",
        last: "Cook",
        degrees: ["BS", "MBA"],
        letter: "G"
      }
    }
  ]
}
```

Always remember: `Lambda` functions must accept the same number of variables, and in the same order, as the "tuples" (or items) in the set being processed (our index represents the set of documents in the source collection).

常に覚えておいてほしいのは、`Lambda`関数は、処理されるセットの「タプル」（またはアイテム）と同じ数の変数を、同じ順序で受け入れなければならないということです（私たちのインデックスは、ソースコレクションのドキュメントのセットを表しています）。

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated several different scenarios for paginating query results, how to access following pages, and how to deal with indexes with multiple fields defined in `values`. These strategies should help you query your documents in collections large and small!

このチュートリアルでは、クエリ結果をページ分割するためのいくつかの異なるシナリオ、次のページへのアクセス方法、そして `values` で定義された複数のフィールドを持つインデックスの扱い方を紹介しました。これらの戦略は、大小のコレクションのドキュメントを照会するのに役立つはずです。

## [](#next-steps)Next steps

次のステップ

-   [Sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
-   [Search](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
-   [Search and sort](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
-   [Bindings](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

---

- [ソート](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
- [検索](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
- [検索とソート](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
- [綴じ込み](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

