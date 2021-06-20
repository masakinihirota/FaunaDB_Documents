Search and sort with indexes | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort

# Search and sort with indexes

インデックスを使った検索とソート

Searching and sorting is fairly easy, especially if you have been following the [search](https://docs.fauna.com/fauna/current/tutorials/indexes/search) and [sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort) tutorials. Search is accomplished by matching inputs against an index’s `terms` field, and sort is accomplished by ordered of an index’s `values` field. That’s great if the search and sort can be handled by a single index.

検索とソートは、特に [search](https://docs.fauna.com/fauna/current/tutorials/indexes/search) と [sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort) のチュートリアルに従っていれば、かなり簡単です。検索はインデックスの `terms` フィールドに入力をマッチさせることで実現され、ソートはインデックスの `values` フィールドの順序で実現されます。検索とソートが1つのインデックスで処理できるなら、それは素晴らしいことです。

What if we need to, say, search for the people with the last name "Cook" or "Turing" and sort the results by the `letter` field? This tutorial demonstrates how to combine multiple indexes to achieve searching and sorting.

例えば、"Cook "や "Turing "という名字の人を検索して、その結果を`letter`フィールドでソートする必要があるとしたらどうでしょうか？このチュートリアルでは、複数のインデックスを組み合わせて検索やソートを実現する方法を紹介します。

This tutorial assumes that you have successfully [prepared](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation) your database by creating the necessary collections and documents.

このチュートリアルでは、必要なコレクションやドキュメントを作成することで、データベースの[準備](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation)が成功していることを前提としています。

To achieve our goal, we need to compose our sort index a little bit differently than we saw in the [sort tutorial](https://docs.fauna.com/fauna/current/tutorials/indexes/sort). Copy the following query, paste it into the Shell, and run it:

目的を達成するためには、[sort tutorial](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)で見たのとは少し違った方法で、ソートインデックスを構成する必要があります。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Do(
  CreateIndex({
    name: "people_search_by_last",
    source: Collection("People"),
    terms: [
      { field: ["data", "last"] }
    ]
  }),
  CreateIndex({
    name: "people_sort_by_letter_asc",
    source: Collection("People"),
    terms: [
      { field: ["ref"] }
    ],
    values: [
      { field: ["data", "letter"] },
      { field: ["ref"] }
    ]
  })
)
```

The points of interest for this query:

このクエリの注目点です。

-   We’re using the [`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do) function to combine the creation of both indexes into a single query. `Do` executes each intermediate query in order, and returns the result from the last query.

- [`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do)関数を使って、両方のインデックスの作成を1つのクエリにまとめています。Do` は各中間クエリを順に実行し、最後のクエリの結果を返します。

-   The `people_search_by_last` specifies the `last` field, which is inside the `data` field, as our search `terms`. The `values` field is not specified, so the index contains a [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) to each document, by default.

- `people_search_by_last`では、`data`フィールドの内部にある`last`フィールドを検索の`terms`として指定しています。また、`values`フィールドは指定しないので、デフォルトでは各ドキュメントに対する[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)がインデックスに含まれることになります。

-   The `people_sort_by_letter_asc` specifies the `letter` field, which is inside the document’s `data` field, as well as the document’s `Ref`, as the result/sort criteria. It also uses the document’s `Ref` as the `terms`, which is the important bit.

- `people_sort_by_letter_asc`では、結果/ソート基準として、文書の `data` フィールド内の `letter` フィールドと、文書の `Ref` を指定します。また、重要な点として、ドキュメントの `Ref` を `terms` として使用しています。

When you run the query, the result should be similar to:

このクエリを実行すると、結果は次のようになります。

```javascript
{
  "ref": Index("people_sort_by_letter_asc"),
  "ts": 1565365919920000,
  "active": true,
  "serialized": true,
  "name": "people_sort_by_letter_asc",
  "source": Collection("People"),
  "terms": [
    {
      "field": [
        "ref"
      ]
    }
  ],
  "values": [
    {
      "field": [
        "data",
        "letter"
      ]
    },
    {
      "field": [
        "ref"
      ]
    }
  ],
  "partitions": 1
}
```

We only see the output for the second index, because that’s all that `Do` returns.

2つ目のインデックスの出力のみが表示されていますが、これは `Do` が返す結果がそれだけだからです。

A query that can use these indexes to return the results we want could look like this:

これらのインデックスを使って欲しい結果を返すことができるクエリは次のようになります。

shell

```shell
Map(
  Paginate(
    Join(
      Union(
        Match(Index('people_search_by_last'), 'Turing'),
        Match(Index('people_search_by_last'), 'Cook'),
      ),
      Index('people_sort_by_letter_asc')
    )
  ),
  Lambda(
    ["letter", "ref"],
    Get(Var("ref"))
  )
)
```

The points of interest for this query are:

このクエリの注目すべき点は

-   The [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union) function is used to combine the matches for `Turing` and the matches for `Cook` into a single set.

- [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)関数は、`Turing`のマッチと`Cook`のマッチを1つのセットにまとめるために使用されます。

-   The [`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join) function takes the values in the first set (the result of the `Union`) and matches them with the `terms` field in the `people_sort_by_letter_asc` index.

- [`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join)関数は、最初のセット（`Union`の結果）の値を取り込んで、`people_sort_by_letter_asc`インデックスの`terms`フィールドとマッチさせます。

    Since the values from the `Union` call are document Refs, `Join` works a bit like `Match`, but with multiple terms at once rather than a singular set of terms.

    Union`の呼び出しによる値はドキュメントのRefなので、`Join`は`Match`と少し似たような動作をしますが、単一の用語セットではなく、複数の用語を一度に扱うことになります。

-   The [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function has to accept two variables, because the result of the `Join` is the `values` from the `people_sort_by_letter_asc` index, which includes both the documents `letter` value and its Ref.

- 関数 [Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) は 2 つの変数を受け入れる必要があります。これは、`Join` の結果が `people_sort_by_letter_asc` インデックスの `values` であり、ドキュメントの `letter` の値とその Ref の両方を含むからです。

Copy the query, paste it into the Shell, and run it. The result should look similar to:

このクエリをコピーしてシェルに貼り付け、実行してみてください。結果は次のようになるはずです。

```javascript
{
  "data": [
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
}
```

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated how to perform a search and sort in a single query. The main point is that the index used for sorting should have the document’s Ref specified in its `terms` field. Then, any of FQL’s Set functions can by used to combine result sets for matching indexes in a variety of ways:

このチュートリアルでは、検索とソートを1つのクエリで行う方法を紹介しました。主なポイントは、ソートに使用するインデックスの `terms` フィールドにドキュメントの Ref を指定することです。次に、FQLのSet関数のいずれかを使用して、さまざまな方法で、一致するインデックスの結果セットを組み合わせることができます。

-   [`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)
-   [`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)
-   [`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)
-   [`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)
-   [`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join)
-   [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)
-   [`Singleton`](https://docs.fauna.com/fauna/current/api/fql/functions/singleton)
-   [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

## [](#next-steps)Next steps

-   [Pagination](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
-   [Sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
-   [Search](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
-   [Bindings](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)
