Sort with indexes | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/indexes/sort

# Sort with indexes

Fauna’s sorting is accomplished using indexes, specifically by ordering of an index’s `values`. The `values` field in an index defines one or more fields that are returned in the result set, and the fields can be in ascending or descending order.

Faunaのソートはインデックスを使って行われ、特にインデックスの `values` の順序によって行われます。インデックスの `values` フィールドは、結果セットで返される1つまたは複数のフィールドを定義し、そのフィールドは昇順または降順にすることができます。

This tutorial demonstrates how to achieve various sorting goals using indexes:

このチュートリアルでは，インデックスを使って様々なソートの目的を達成する方法を紹介します．

-   [Sort a single field](#single)
-   [Sort multiple fields](#multiple)
-   [Sort considerations](#considerations)

---

- 単一フィールドのソート](#single)
- 複数のフィールドのソート](#multiple)
- 考慮事項を並べ替える](#considerations)

This tutorial assumes that you have successfully [prepared](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation) your database by creating the necessary collections and documents.

このチュートリアルでは、必要なコレクションやドキュメントを作成し、データベースの[準備](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation)が完了していることを前提としています。

## [](#single)Sort a single field

単一のフィールドをソートする

To sort a single field, we need to construct an appropriate index. For this example, let’s sort the documents in the `People` collection by the `first` field. Copy the following query, paste it into the Shell, and run it:

単一のフィールドをソートするには、適切なインデックスを作成する必要があります。今回の例では、`People`コレクションのドキュメントを`first`フィールドでソートしてみましょう。以下のクエリをコピーしてシェルに貼り付け，実行してください．

shell

```shell
CreateIndex({
  name: "people_sort_by_first_asc",
  source: Collection("People"),
  values: [
    { field: ["data", "first"] },
    { field: ["ref"] }
  ]
})
```

The points of interest for this query:

このクエリの注目点です。

-   It is a good practice to name an index after its collection, its purpose, which field(s) are involved in the purpose, and the sort direction.

- インデックスの名前は、そのコレクション、目的、どのフィールドがその目的に関わっているか、そしてソート方向にちなんでつけるのが良い方法です。

-   We specify two fields for `values`:

- ここでは `values` に2つのフィールドを指定しています。

    1.  The `first` field, which exists in the document’s `data` field.

ドキュメントの `data` フィールドに存在する `first` フィールドです。

    2.  The document’s `ref`, so that we can easily retrieve the document.

ドキュメントの `ref` を指定して、ドキュメントを簡単に取得できるようにします。

When you run the query, the result should be similar to:

このクエリを実行すると、以下のような結果が得られるはずです。

```javascript
{
  "ref": Index("people_sort_by_first_asc"),
  "ts": 1565314335810000,
  "active": true,
  "serialized": true,
  "name": "people_sort_by_first_asc",
  "source": Collection("People"),
  "values": [
    {
      "field": [
        "data",
        "first"
      ]
    },
    {
      "field": [
        "ref"
      ]
    }
  ],
  "partitions": 8
}
```

Before we see the sorted results, let’s see the order we get when using the collection index (created when we [prepared our tutorial data](https://docs.fauna.com/fauna/current/tutorials/indexes/)). Copy the following query, paste it into the Shell, and run it:

ソートされた結果を見る前に、コレクション・インデックスを使用した場合の順序を見てみましょう（[チュートリアル・データの準備](https://docs.fauna.com/fauna/current/tutorials/indexes/)の際に作成しました）。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Map(
  Paginate(Match(Index("all_people"))),
  Lambda(
    "X",
    Select(["data", "first"], Get(Var("X")))
  )
)
```

The points of interest for this query are:

このクエリの注目すべき点は

-   We use the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) function to process each of the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) results with a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function.

- [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)関数を使用して、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)の各結果を[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数で処理しています。

-   We use the variable named `X`, just to provide a variable name via [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var). You can use any variable name you like.

- `X`という変数を使っていますが、これは[`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)で変数名を指定しているだけです。好きな変数名を使うことができます。

-   We only need one variable for the `Lambda` function, because our index only returns one value for each document in the collection: the document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). If our index specified a `values` field, we would need to use one variable per field defined by the `values` field.

- `Lambda`関数に必要な変数は1つだけです。なぜなら、このインデックスはコレクション内の各ドキュメントに対して、ドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)という1つの値しか返さないからです。もしインデックスが `values` フィールドを指定していたら，`values` フィールドで定義されるフィールドごとに1つの変数を使用する必要があります．

-   The `Lambda` function calls the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve the document specified by the `X` variable. To avoid returning everything in each document, the [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function is used to extract just the `first` field from each document.

- `Lambda`関数は，[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を呼び出して，`X`変数で指定された文書を取得します．各ドキュメントのすべてを返さないようにするために，[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数を使って，各ドキュメントから `first` フィールドだけを抽出します．

When you run the query, the output should be similar to:

このクエリを実行すると、以下のような出力になります。

```javascript
{
  "data": [
    "Alan",
    "Tim",
    "Leslie",
    "Marvin",
    "Alan",
    "Grace",
    "Stephen"
  ]
}
```

The order you see depends on the order of each document’s ref during the creation query.

表示される順番は、作成クエリの際の各ドキュメントのrefの順番に依存します。

Now, let’s use our new index to see the names in order. Copy the following query, paste it into the Shell, and run it:

それでは、新しいインデックスを使って、名前を順番に見てみましょう。次のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Paginate(Match(Index("people_sort_by_first_asc")))
```

There was no need to use `Map` this time: our index contains the value of the `first` field, so there is no need to use the `Get` function to retrieve the document. This also reduces the number of read operations, which could save you some money.

今回は`Map`を使う必要はありませんでした。インデックスには`first`フィールドの値が含まれているので、`Get`関数を使ってドキュメントを取得する必要はありません。また、読み取り操作の回数も減るので、コスト削減にもつながります。

When you run this query, the output should be similar to:

このクエリを実行すると、次のような出力が得られるはずです。

```javascript
{
  "data": [
    [
      "Alan",
      Ref(Collection("People"), "240166254282801673")
    ],
    [
      "Alan",
      Ref(Collection("People"), "240166254282805769")
    ],
    [
      "Grace",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Leslie",
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Marvin",
      Ref(Collection("People"), "240166254282804745")
    ],
    [
      "Stephen",
      Ref(Collection("People"), "240166254282807817")
    ],
    [
      "Tim",
      Ref(Collection("People"), "240166254282802697")
    ]
  ]
}
```

What if we want to show the list in reverse order? For that, we need to construct another index. Copy the following query, paste it into the Shell, and run it:

もし、リストを逆順に表示したい場合はどうすればよいでしょうか？そのためには，別のインデックスを作成する必要があります．以下のクエリをコピーしてシェルに貼り付け，実行してみましょう．

shell

```shell
CreateIndex({
  name: "people_sort_by_first_desc",
  source: Collection("People"),
  values: [
    { field: ["data", "first"], reverse: true },
    { field: ["ref"] }
  ]
})
```

This query creates an index almost identical to the first index that we created. The only two differences are:

このクエリでは、最初に作成したインデックスとほぼ同じインデックスが作成されます。違いは2つだけです。

1.  The index name indicates "desc"ending order.

インデックス名が "desc" ending orderになっている。

2.  The first field in `values` sets `reverse` to `true`. This causes the index to sort by the `first` field in descending order.

 `values` の最初のフィールドは `reverse` を `true` に設定しています。これにより、インデックスは `first` フィールドで降順にソートされます。

Let’s run a revised version of our "sort" query that uses descending order. Copy the following query, paste it into the shell, and run it:

それでは、降順を使用する「sort」クエリの改訂版を実行してみましょう。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Paginate(Match(Index("people_sort_by_first_desc")))
```

When you run this query, the result should be similar to:

このクエリを実行すると、次のような結果が得られるはずです。

```javascript
{
  "data": [
    [
      "Tim",
      Ref(Collection("People"), "240166254282802697")
    ],
    [
      "Stephen",
      Ref(Collection("People"), "240166254282807817")
    ],
    [
      "Marvin",
      Ref(Collection("People"), "240166254282804745")
    ],
    [
      "Leslie",
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Grace",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Alan",
      Ref(Collection("People"), "240166254282801673")
    ],
    [
      "Alan",
      Ref(Collection("People"), "240166254282805769")
    ]
  ]
}
```

## [](#multiple)Sort multiple fields

複数のフィールドをソートする

To sort on multiple fields, there are a couple of approaches. In this section, we demonstrate using a single index to sort multiple fields.

複数のフィールドでソートするには、いくつかの方法があります。このセクションでは，1つのインデックスを使って複数のフィールドをソートする方法を説明します．

For this demonstration, we’ll sort by `last` and then `first`. To do so, we need to create an appropriate index. Copy the following query, paste it into the Shell, and run it:

ここでは，「last」，「first」の順でソートすることにします．そのためには，適切なインデックスを作成する必要があります．以下のクエリをコピーしてシェルに貼り付け，実行してみてください．

shell

```shell
CreateIndex({
  name: "people_sort_by_last_first_asc",
  source: Collection("People"),
  values: [
    { field: ["data", "last"] },
    { field: ["data", "first"] },
    { field: ["ref"] }
  ]
})
```

Now let’s see the results. Copy the following query, paste it into the Shell, and run it:

それでは、結果を見てみましょう。以下のクエリをコピーし、シェルに貼り付けて実行してみてください。

shell

```shell
Paginate(Match(Index("people_sort_by_last_first_asc")))
```

When you run this query, the result should be similar to:

このクエリを実行すると、次のような結果が得られるはずです。

```javascript
{
  "data": [
    [
      "Cook",
      "Stephen",
      Ref(Collection("People"), "240166254282807817")
    ],
    [
      "Cook",
      "Tim",
      Ref(Collection("People"), "240166254282802697")
    ],
    [
      "Hopper",
      "Grace",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Lamport",
      "Leslie",
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Minsky",
      "Marvin",
      Ref(Collection("People"), "240166254282804745")
    ],
    [
      "Perlis",
      "Alan",
      Ref(Collection("People"), "240166254282805769")
    ],
    [
      "Turing",
      "Alan",
      Ref(Collection("People"), "240166254282801673")
    ]
  ]
}
```

What if we want the `first` name to be in descending order? We need another index. Copy the following query, paste it into the Shell, and run it:

`first`の名前を降順にしたい場合はどうすればいいでしょうか？別のインデックスが必要です。次のクエリをコピーして，シェルに貼り付け，実行してみましょう。

shell

```shell
CreateIndex({
  name: "people_sort_by_last_asc_first_desc",
  source: Collection("People"),
  values: [
    { field: ["data", "last"] },
    { field: ["data", "first"], reverse: true },
    { field: ["ref"] }
  ]
})
```

Now, let’s see the results. Copy the following query, paste it into the Shell, and run it:

では、結果を見てみましょう。以下のクエリをコピーし、シェルに貼り付けて実行してみてください。

shell

```shell
Paginate(Match(Index("people_sort_by_last_asc_first_desc")))
```

When you run this query, the result should be similar to:

このクエリを実行すると、次のような結果が得られるはずです。

```javascript
{
  "data": [
    [
      "Cook",
      "Tim",
      Ref(Collection("People"), "240166254282802697")
    ],
    [
      "Cook",
      "Stephen",
      Ref(Collection("People"), "240166254282807817")
    ],
    [
      "Hopper",
      "Grace",
      Ref(Collection("People"), "240166254282806793")
    ],
    [
      "Lamport",
      "Leslie",
      Ref(Collection("People"), "240166254282803721")
    ],
    [
      "Minsky",
      "Marvin",
      Ref(Collection("People"), "240166254282804745")
    ],
    [
      "Perlis",
      "Alan",
      Ref(Collection("People"), "240166254282805769")
    ],
    [
      "Turing",
      "Alan",
      Ref(Collection("People"), "240166254282801673")
    ]
  ]
}
```

The only notable difference is that, this time, the "Tim Cook" document appears before the "Stephen Cook" document.

唯一の注目すべき違いは、今回は「ティム・クック」のドキュメントが「スティーブン・クック」のドキュメントの前に表示されていることです。

## [](#considerations)Sort considerations

ソートの考慮事項

So far, we’ve looked at the "happy path" for sorting. Our indexes have been fully populated, all documents have had consistent values in the indexes fields, and the results have returned as we expected.

ここまでは、ソートの「ハッピーパス」を見てきました。インデックスが完全に入力され、すべてのドキュメントのインデックスフィールドの値が一貫しており、期待通りの結果が返されています。

What happens when we’re not on the "happy path"? When we created our `Letters` collection, the `extra` field was notably less consistent than the other fields.

では、「ハッピーパス」ではない場合はどうなるでしょうか？Letters`コレクションを作成したとき、`extra`フィールドの一貫性が他のフィールドに比べて著しく低いことがわかりました。

Let’s create an index to sort on the `extra` field and see what sort of results are achieved. Copy the following query, paste it into the Shell, and run it:

それでは、`extra`フィールドでソートするインデックスを作成して、どのような結果が得られるか見てみましょう。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
CreateIndex({
  name: "letters_sort_by_extra_asc",
  source: Collection("Letters"),
  values: [
    { field: ["data", "extra"] },
    { field: ["ref"] }
  ]
})
```

Now, let’s see the results. Copy the following query, paste it into the Shell, and run it:

では、結果を見てみましょう。以下のクエリをコピーし、シェルに貼り付けて実行してみてください。

shell

```shell
Map(
  Paginate(Match(Index("letters_sort_by_extra_asc"))),
  Lambda(
    ["extra", "ref"],
    Var("extra")
  )
)
```

The points of interest for this query:

このクエリの注目点です。

-   Our `letters_sort_by_extra_asc` index contains two fields in `values`, so our `Lambda` function must accept two variables.

- インデックスの `letters_sort_by_extra_asc` には `values` に2つのフィールドが含まれているので、`Lambda` 関数は2つの変数を受け取る必要があります。

-   Since our index contains the `extra` field in `values`, we don’t have to fetch the document to return that field. So, we don’t need to call the `Get` function, we can just return the value of the `extra` variable with the `Var` function.

- このインデックスは `values` に `extra` フィールドを含んでいるので、そのフィールドを返すためにドキュメントをフェッチする必要はありません。したがって，`Get`関数を呼び出す必要はなく，`Var`関数で`extra`変数の値を返せばよいのです．

When you run this query, the output should be similar to:

このクエリを実行すると、次のような出力が得られるはずです。

```javascript
  "data": [
    11,
    24,
    "",
    "14th",
    "16th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "24 + 1",
    "4th",
    "9th",
    "eighth",
    "fifteenth",
    "fifth",
    "First",
    "second",
    "seventeenth",
    "seventh",
    "sixth",
    "tenth",
    "third",
    "twenty-third",
    null,
    null
  ]
}
```

When Fauna orders `values` in indexes, it organizes the output by type and then sorts values of the same type, as explained in the section [how precedence works with data types](https://docs.fauna.com/fauna/current/api/fql/types#precedence) in [Data types](https://docs.fauna.com/fauna/current/api/fql/types).

Fauna がインデックスで `値` を並べるときには、[データ型](https://docs.fauna.com/fauna/current/api/fql/types)の [データ型での優先順位の働き](https://docs.fauna.com/fauna/current/api/fql/types#precedence)で説明したように、出力を型別に整理してから同じ型の値を並べます。

So our output contains [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s first, then [String](https://docs.fauna.com/fauna/current/api/fql/types#string)s, then [Null](https://docs.fauna.com/fauna/current/api/fql/types#null)s.

したがって、出力にはまず[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)が含まれ、次に[String](https://docs.fauna.com/fauna/current/api/fql/types#string)が含まれ、次に[Null](https://docs.fauna.com/fauna/current/api/fql/types#null)が含まれます。

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated how to sort documents, by single and multiple fields, using indexes. We’ve also seen how variation in field values can affect sort results.

このチュートリアルでは、インデックスを使って、単一または複数のフィールドでドキュメントをソートする方法を紹介しました。また、フィールドの値の違いがソートの結果にどのように影響するかについても説明しました。

While it may be a bit more work than you might expect, especially if you are familiar with SQL sorting, Fauna’s sorting can be comparable provided that you create all of the indexes required for your sorting situations.

特にSQLでのソートに慣れている人にとっては、想像以上に手間がかかるかもしれませんが、ソートの状況に応じて必要なインデックスをすべて作成すれば、Faunaのソートも遜色ありません。

## [](#next-steps)Next steps

次のステップ

-   [Pagination](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
-   [Search](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
-   [Search and sort](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
-   [Bindings](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

---

- ページネーション](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
- [検索](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
- [検索とソート](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
- バインディング](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

