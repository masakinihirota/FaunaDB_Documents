Search with indexes | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/indexes/search

# Search with indexes

インデックスを使った検索

Searching documents in Fauna is accomplished using indexes, specifically by matching inputs against an index’s `terms` field.

Fauna では、インデックスを使って文書を検索します。具体的には、インデックスの `terms` フィールドに入力を照合します。

Note that Fauna does not currently have a full-text or wildcard search capabilities. Also, indexes without defined `terms` cannot be used for searching.

現在、Fauna にはフルテキスト検索やワイルドカード検索の機能はありませんのでご注意ください。また、`terms` が定義されていないインデックスは検索に使用できません。

This tutorial shows you how to create indexes that help you search your documents:

このチュートリアルでは、ドキュメントの検索に役立つインデックスの作成方法を紹介します。

-   [Exact match](#exact)
-   [Array field matches](#array)
-   [`term1` or `term2` matches](#match-or)

---

- 完全一致](#exact)
- フィールドマッチの配列](#array)
- term1`または`term2`にマッチするもの](#match-or)

This tutorial assumes that you have successfully [prepared](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation) your database by creating the necessary collections and documents.

このチュートリアルでは、必要なコレクションやドキュメントを作成して、データベースの[準備](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation)が完了していることを前提としています。

## [](#exact)Exact match

完全一致

Let’s say that we want to search our `People` collection for documents where the `first` name is "Alan". To do that, we need to create an index with the `first` field defined as one of the `terms`. Copy the following query, paste it into the Shell, and run it:

例えば、`People`コレクションで、`first`の名前が "Alan "であるドキュメントを検索したいとします。そのためには、`first` フィールドを `terms` のひとつとして定義したインデックスを作成する必要があります。以下のクエリをコピーしてシェルに貼り付け，実行してみてください．

shell

```shell
CreateIndex({
  name: "people_search_by_first",
  source: Collection("People"),
  terms: [
    {
      field: ["data", "first"]
    }
  ]
})
```

The points of interest for this query:

このクエリの注目点です。

-   It is a good practice to name an index after its collection, its purpose, which field(s) are involved in the purpose, and the sort direction.

- インデックスの名前には、そのコレクション、目的、どのフィールドがその目的に関わっているか、そして、ソート方向の名前を付けるのが良い方法です。

-   We specify a single `terms` field, which includes the value in each document’s `first` field which exists in the document’s `data` field.

- ここでは、単一の `terms` フィールドを指定しています。このフィールドには、各ドキュメントの `first` フィールドの値のうち、ドキュメントの `data` フィールドに存在する値が含まれています。

When you run this query, the result should be similar to:

このクエリを実行すると、結果は次のようになるはずです。

```javascript
{
  "ref": Index("people_search_by_first"),
  "ts": 1565320196190000,
  "active": true,
  "serialized": true,
  "name": "people_search_by_first",
  "source": Collection("People"),
  "terms": [
    {
      "field": [
        "data",
        "first"
      ]
    }
  ],
  "partitions": 1
}
```

Now that the index has been created, we can use it to search our documents. Copy the following query, paste it into the Shell, and run it:

インデックスが作成されたので、これを使ってドキュメントを検索してみましょう。次のクエリをコピーして、シェルに貼り付け、実行してみましょう。

shell

```shell
Map(
  Paginate(
    Match(Index("people_search_by_first"), "Alan")
  ),
  Lambda(
    "person",
    Get(Var("person"))
  )
)
```

The points of interest for this query:

このクエリの注目点です。

-   We’re using the [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function to locate all of the entries in the `people_by_first_name` index that have the first name `Alan`.

- [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)関数を使用して、`people_by_first_name`インデックスの中から、ファーストネームが`Alan`であるすべてのエントリを探しています。

-   We’re using the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) function to iterate on all of the results returned by `Match`.

- [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)関数を使って、`Match`から返されたすべての結果を繰り返し処理しています。

-   We’re using the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) function to iterate on all of the results from `Paginate`, in order to pass them to a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function. The `Lambda` uses the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to read the specified document by using the [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) returned by the index.

- [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)関数を使って、`Paginate`から得られたすべての結果を繰り返し処理して、[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数に渡しています。Lambda`は[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を用いて，インデックスが返す[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を利用して，指定されたドキュメントを読み込みます．

When you run this query, the result should be similar to:

このクエリを実行すると、以下のような結果が得られるはずです。

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

## [](#array)Array field matches

配列フィールドマッチ

When a document has a field containing an array of items, and that field is indexed, Fauna creates distinct index entries for each item in the field’s array. That makes it easy to search for any item in the array.

ドキュメントにアイテムの配列を含むフィールドがあり、そのフィールドにインデックスが付けられている場合、Faunaはフィールドの配列の各アイテムに個別のインデックスエントリを作成します。これにより、配列内の任意の項目を簡単に検索することができます。

Our `People` documents contain the `degrees` field, which is an array with varying numbers of items. We can search on the `degrees` field items by creating an appropriate index. Copy the following query, paste it into the Shell, and run it:

私たちの `People` ドキュメントには `degrees` フィールドが含まれており、これはさまざまな数のアイテムを持つ配列です。適切なインデックスを作成することで、`degrees`フィールドの項目を検索することができます。以下のクエリをコピーしてシェルに貼り付け，実行してみてください．

shell

```shell
CreateIndex({
  name: "people_search_by_degrees",
  source: Collection("People"),
  terms: [
    {
      field: ["data", "degrees"]
    }
  ]
})
```

The only difference between this index and the [Exact match](#exact) index is that we’re defining the `degrees` field as one of the `terms`.

このインデックスと[Exact match](#exact)インデックスの唯一の違いは、 `degrees` フィールドを `terms` のひとつとして定義していることです。

After the index has been created, we can use it to search for our documents. Let’s find out which `People` documents have an `MBA` degree. Copy the following query, paste it into the Shell, and run it.

インデックスが作成されたら、それを使ってドキュメントを検索することができます。では、どの`People`ドキュメントが`MBA`の学位を持っているかを調べてみましょう。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Map(
  Paginate(
    Match(Index("people_search_by_degrees"), "MBA")
  ),
  Lambda(
    "person",
    Get(Var("person"))
  )
)
```

This query differs from the [Exact match](#exact) query only in the index that we are using, and the search term, `MBA`.

このクエリが[Exact match](#exact)クエリと異なるのは、使用しているインデックスと、検索語である`MBA`だけです。

When you run this query, the result should be similar to:

このクエリを実行すると、以下のような結果が得られるはずです。

```javascript
{
  data: [
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

## [](#match-or)`term1` or `term2` matches

`term1` or `term2` matches

Suppose we want to search for people where the first name is `Alan` or the first name is `Tim`. To do that, we need to use one of Fauna’s Set functions, [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union).

例えば、ファーストネームが `Alan` または `Tim` の人を検索したいとします。そのためには、FaunaのSet関数の1つである[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)を使う必要があります。

Copy the following query, paste it into the Shell, and run it:

以下のクエリをコピーしてシェルに貼り付け、実行してみましょう。

shell

```shell
Map(
  Paginate(
    Union(
      Match(Index("people_search_by_first"), "Alan"),
      Match(Index("people_search_by_first"), "Tim")
    )
  ),
  Lambda("person", Get(Var("person")))
)
```

In this query, `Union` combines the results of the first `Match` with the results of the second `Match`, giving us the Alan-or-Tim results that we’re looking for.

このクエリでは、`Union` が最初の `Match` の結果と 2 番目の `Match` の結果を組み合わせて、探している Alan-or-Tim の結果を得ています。

When you run this query, the result should be similar to:

このクエリを実行すると、結果は次のようになるはずです。

```javascript
{
  "data": [
    {
      "ref": Ref(Collection("People"), "240166254282801673"),
      "ts": 1565299238420000,
      "data": {
        "first": "Alan",
        "last": "Turing",
        "letter": "B"
      }
    },
    {
      "ref": Ref(Collection("People"), "240166254282802697"),
      "ts": 1565299238420000,
      "data": {
        "first": "Tim",
        "last": "Cook",
        "letter": "G"
      }
    },
    {
      "ref": Ref(Collection("People"), "240166254282805769"),
      "ts": 1565299238420000,
      "data": {
        "first": "Alan",
        "last": "Perlis",
        "letter": "A"
      }
    }
  ]
}
```

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated how to search documents by exact, array, or union matches, using indexes. While it may be a bit more work than you might expect, especially if you are familiar with SQL searching, Fauna’s searching can provide similar results provided that you create all of the indexes required for your searching situations.

このチュートリアルでは、インデックスを使って、完全一致、配列一致、結合一致でドキュメントを検索する方法を紹介しました。SQLによる検索に慣れている方には少し大変かもしれませんが、Faunaの検索は、検索状況に応じて必要なインデックスをすべて作成すれば、同様の結果を得ることができます。

## [](#next-steps)Next steps

次のステップ

-   [Pagination](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
-   [Sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
-   [Search and sort](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
-   [Bindings](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)

---

- [ページネーション](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
- [ソート](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
- [検索とソート](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)
- [バインディング](https://docs.fauna.com/fauna/current/tutorials/indexes/bindings)
