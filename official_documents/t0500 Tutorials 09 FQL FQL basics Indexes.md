Indexes | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/basics/indexes

# Indexes

Welcome back, fellow space developer! In [part 1](https://docs.fauna.com/fauna/current/tutorials/basics/) of this five-part tutorial, we got our first look at FQL and some fundamental Fauna concepts.

宇宙開発者の皆さん、お帰りなさい。この5部構成のチュートリアルの[パート1](https://docs.fauna.com/fauna/current/tutorials/basics/)では、FQLとFaunaの基本的なコンセプトについて初めて見ました。

In this second part of the tutorial, we’re going to take a more in-depth look into Fauna indexes.

このチュートリアルの第2部では、Faunaのインデックスについてより詳しく見ていきましょう。

On this page:

このページでは

-   [Recap](#recap)
-   [What can indexes do?](#indexes)
    -   [Indexes vs SQL views](#views)
-   [Indexing across multiple collections](#multiple_collections)
-   [Sorting results](#sorting)
    -   [Reverse order](#reverse)
    -   [Getting documents from sorting results](#retrieving)
-   [Filtering results](#filtering)
    -   [Filtering on an array value](#filter_array)
    -   [Sorting and filtering at the same time](#sort_and_filter)
-   [Enforcing unique values](#unique)
-   [Combining multiple indexes](#combining)
    -   [OR filtering with Union](#union)
    -   [AND filtering with Intersection](#intersection)
    -   [NOT filtering with Difference](#difference)
-   [Index bindings](#bindings)
    -   [Filtering by the first letter](#first_letter)
    -   [Filtering by any letter](#any_letter)
    -   [Binding and unique constraints](#constraints)
-   [Conclusion](#conclusion)

---

- [Recap](#recap)
- [インデックスは何ができるのか](#インデックス)
    - [インデックスとSQLビューの比較](#ビュー)
- [複数のコレクションにまたがるインデックス](#multiple_collections)
- [結果のソート](#sorting)
    - [逆順](#reverse)
    - [ソート結果からドキュメントを取得する](#retrieving)
- [結果のフィルタリング](#filtering)
    - [配列の値でフィルタリングする](#filter_array)
    - [ソートとフィルタリングを同時に行う](#sort_and_filter)
- [一意の値を強制する](#unique)
- [複数のインデックスを組み合わせる](#combining)
    - [UnionによるORフィルタリング](#union)
    - [交差点を使ったANDフィルタリング](#intersection)
    - [差を使ったNOTフィルタリング](#difference)
- [インデックスの結合](#bindings)
    - [最初の文字でフィルタリングする](#first_letter)
    - [任意の文字でのフィルタリング](#any_letter)
    - [束縛とユニーク制約](#constraints)
- [結論](#conclusion)

## [](#recap)Recap

復習

We briefly introduced indexes in the [previous part of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/), but here’s a recap of the FQL commands we learned.

[チュートリアルの前編](https://docs.fauna.com/fauna/current/tutorials/basics/)でインデックスを簡単に紹介しましたが、ここでは学んだFQLコマンドの復習をします。

First, we created a simple index to be able to retrieve all our pilots from the Pilots collection:

まず、Pilotsコレクションからすべてのパイロットを取得できるように、簡単なインデックスを作成しました。

shell

```shell
CreateIndex({
  name: "all_Pilots",
  source: Collection("Pilots")
})
```

Then, we retrieved a list of references:

続いて、リファレンスのリストを取得しました。

shell

```shell
Paginate(
  Match(
    Index("all_Pilots")
  )
)
```

Finally, we learned how to use the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map), [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda), and [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var) functions to retrieve a list of documents:

最後に、[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)、[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)、[`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)関数を使って、ドキュメントのリストを取得する方法を学びました。

shell

```shell
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda('pilotRef', Get(Var('pilotRef')))
)
```

## [](#indexes)What can indexes do?

インデックスは何ができるのか？

So far, we’ve seen that indexes allow you to retrieve all of the documents in a collection, but indexes are much more powerful than that.

これまで、インデックスを使うと、コレクション内のすべてのドキュメントを取得できることを見てきましたが、インデックスはそれ以上に強力です。

With indexes you can:

インデックスを使うと、以下のことができます。

-   enforce unique constraints,
-   sort and filter results,
-   create computed values from document data.

---

- 一意性制約の適用。
- 結果のソートやフィルタリング
- ドキュメントデータから計算値を作成することができます。

### [](#views)Indexes vs SQL views

インデックスとSQLビューの比較

If you’re coming from the relational world, it can make sense to think about indexes similar to views on a relational database. Views are stored queries that can retrieve data from multiple tables, calculate computed data, join tables to create virtual entities, filter, etc. In a way, Fauna indexes perform similar functions, as we explore in this part of the tutorial.

リレーショナルの世界から来た人は、インデックスをリレーショナルデータベースのビューに似ていると考えると納得できるかもしれません。ビューは、複数のテーブルからデータを取得したり、計算されたデータを算出したり、テーブルを結合して仮想エンティティを作成したり、フィルタリングしたりすることができるストアドクエリです。Faunaのインデックスも同じような機能を持っており、このチュートリアルではその機能について説明します。

## [](#multiple_collections)Indexing across multiple collections

複数のコレクションのインデックス作成

Until now, our indexes have been created on documents from a single collection, but you can configure an index to include documents from multiple collections.

これまでのインデックスは、1つのコレクションのドキュメントを対象に作成されていましたが、複数のコレクションのドキュメントを含むようにインデックスを設定することができます。

There are many reasons why you might want to do that. Maybe, when designing your database, you’d like to group some collections under a single virtual collection, so to speak. In the relational world, combining database entities under a single entity is known as polymorphism.

そのようにしたい理由はたくさんあります。例えば、データベースを設計する際に、いくつかのコレクションを、いわば1つの仮想コレクションの下にまとめたいと思うかもしれません。リレーショナルの世界では、データベースのエンティティを1つのエンティティの下にまとめることを多相性といいます。

To test this, let’s create a new collection to store our land vehicles:

試しに、陸上車両を格納する新しいコレクションを作ってみましょう。

shell

```shell
CreateCollection({name: "Speeders"})
```

Now, with this index, you can retrieve all of the vehicles in the database:

このインデックスを使って、データベース内のすべての車両を取り出すことができます。

shell

```shell
CreateIndex({
  name: "all_Vehicles",
  source: [
    Collection("Spaceships"),
    Collection("Speeders")
  ]
})
```

When indexing multiple collections, keep in mind that the indexed fields need to be of the same type (string, number, etc) across collections. In the rest of the examples, we’ll use indexes with a single collection for simplicity’s sake.

複数のコレクションにインデックスを作成する場合、インデックスを作成するフィールドは、コレクション間で同じ型（文字列、数値など）である必要があることに注意してください。残りの例では、簡単にするために、単一のコレクションにインデックスを使用します。

## [](#sorting)Sorting results

結果の並べ替え

Indexes also allow us to sort results. Let’s create a new index to get all our pilots sorted by their name:

インデックスを使用すると、結果をソートすることもできます。新しいインデックスを作成して、すべてのパイロットを名前でソートしてみましょう。

shell

```shell
CreateIndex({
  name: "all_Pilots_sorted_by_name",
  source: Collection("Pilots"),
  values: [
    { field: ["data", "name"] },
    { field: ["ref"] }
  ]
})
```

Here, we’re using a values object which defines the output values for the index.

ここでは、インデックスの出力値を定義するvaluesオブジェクトを使用しています。

In this case, we are defining two output values:

この例では、2つの出力値を定義しています。

-   `["data", "name"]` a path referring to the name property of the document.

- `["data", "name"]` ドキュメントのnameプロパティを参照するパスです。

-   `["ref"]` another path which returns a reference to the matched document. In a moment, we’ll see why we need this.

- `["ref"]` マッチしたドキュメントへの参照を返す別のパスです。これがなぜ必要なのかは、後ほど説明します。

When using a values object, Fauna always sorts the results in ascending order by default:

values オブジェクトを使用する場合、Fauna はデフォルトで常に結果を昇順でソートします。

shell

```shell
Paginate(Match(Index("all_Pilots_sorted_by_name")))
```

```json
{
  "data": [
    [
      "Buck Rogers",
      Ref(Collection("Pilots"), "266359371696439826")
    ],
    [
      "Flash Gordon",
      Ref(Collection("Pilots"), "266350546751848978")
    ],
    [
      "Jean-Luc Picard",
      Ref(Collection("Pilots"), "266359447111074322")
    ],
    // etc...
  ]
}
```

As you can see, there are two values per result as defined in the `values` object of the index, and these results are now ordered by those values.

ご覧のように、インデックスの `values` オブジェクトで定義されているように、1つの結果には2つの値があり、これらの結果はそれらの値で順序付けられています。

### [](#reverse)Reverse order

逆順

If we want to get the pilots sorted by their name in descending order, we need a new index with the reverse setting:

パイロットを名前の降順で並べたい場合は、逆順を設定した新しいインデックスが必要です。

shell

```shell
CreateIndex({
  name: "all_Pilots_sorted_by_name_desc",
  source: Collection("Pilots"),
  values: [
    { field: ["data", "name"], reverse: true},
    { field: ["ref"] }
  ]
})
```

### [](#retrieving)Getting documents from sorting results

ソート結果からのドキュメント取得

You can add as many output values as needed without any performance penalty, but we might need to get a document from these types of results:

必要な数の出力値を追加してもパフォーマンスに影響はありませんが、このようなタイプの結果からドキュメントを取得する必要があるかもしれません。

```json
["Buck Rogers", Ref(Collection("Pilots"), "266359371696439826")]
```

So how do we actually get documents?

では、実際にドキュメントを取得するにはどうすればよいのでしょうか。

One option would be using the [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function, like we learned in the [previous part](https://docs.fauna.com/fauna/current/tutorials/basics/) of the tutorial:

一つの方法としては、チュートリアルの[前編](https://docs.fauna.com/fauna/current/tutorials/basics/)で学んだように、[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数を使うことです。

shell

```shell
Map(
  Paginate(Match(Index("all_Pilots_sorted_by_name"))),
  Lambda("pilotResult", Get(Select([1], Var("pilotResult"))))
)
```

Since Fauna uses zero-based arrays, the trick here is selecting the reference in the second item with `[1]`, then using the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to return a document.

Fauna はゼロベースの配列を使用しているので、ここでのトリックは、2 番目の項目の参照を `[1]` で選択し、[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) 関数を使用してドキュメントを返すことです。

Another option would be to simply configure our Lambda to expect an array with two values:

別の方法としては、単純に2つの値を持つ配列を期待するようにLambdaを設定することもできます。

shell

```shell
Map(
  Paginate(Match(Index("all_Pilots_sorted_by_name"))),
  Lambda(["name", "pilotRef"], Get(Var("pilotRef")))
)
```

In both cases, the result is the same:

どちらのケースでも、結果は同じです。

```json
{
  "data": [
    {
      "ref": Ref(Collection("Pilots"), "266359371696439826"),
      "ts": 1590278941740000,
      "data": {
        "name": "Buck Rogers"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266350546751848978"),
      "ts": 1590270525630000,
      "data": {
        "name": "Flash Gordon"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266359447111074322"),
      "ts": 1590279013675000,
      "data": {
        "name": "Jean-Luc Picard"
      }
    }
    // etc...
  ]
}
```

## [](#filtering)Filtering results

結果のフィルタリング

Another useful feature of indexes is being able to search and filter results.

インデックスのもう一つの便利な機能は、結果を検索したりフィルタリングしたりできることです。

To test this, let’s create a Planets collection:

これをテストするために、Planetsコレクションを作ってみましょう。

shell

```shell
CreateCollection({name: "Planets"})
```

Then, create some planets with three different types: `TERRESTRIAL`, `GAS`, and `ICE`:

次に、3つの異なるタイプの惑星を作成します。そして、「TERRESTRIAL」、「GAS」、「ICE」という3つのタイプの惑星を作ります。

shell

```shell
Create(Collection("Planets"),
  {
    data: {
      name: "Mercury",
      type: "TERRESTRIAL"
    }
  }
)

Create(Collection("Planets"),
  {
    data: {
      name: "Saturn",
      type: "GAS"
    }
  }
)

// etc..
```

Finally, let’s create an index to filter our planets by type:

最後に，惑星をタイプ別にフィルタリングするためのインデックスを作成しましょう．

shell

```shell
CreateIndex({
  name: "all_Planets_by_type",
  source: Collection("Planets"),
  terms: [
    { field: ["data", "type"]}
  ]
})
```

As we saw earlier, the `terms` object is used as the search input for the index, whereas the `values` object defines which data the index returns. With this index, the `values` object is not defined, so the index only returns the indexed document’s reference, by default.

先ほど見たように、`terms` オブジェクトはインデックスの検索入力として使用され、`values` オブジェクトはインデックスがどのデータを返すかを定義します。このインデックスでは、`values` オブジェクトが定義されていないので、デフォルトではインデックス付けされたドキュメントの参照のみが返されます。

In this case, we’re telling Fauna that the search term uses a field of the document found at the path `["data", "type"]`.

この例では、検索語がパス `["data", "type"]` にあるドキュメントのフィールドを使用していることを Fauna に伝えています。

We can now query our index by passing a parameter to Match:

これで、Matchにパラメータを渡してインデックスを照会できるようになりました。

shell

```shell
Map(
  Paginate(Match(Index("all_Planets_by_type"), "GAS")),
  Lambda("planetRef", Get(Var("planetRef")))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081152090604051"),
      "ts": 1590967285200000,
      "data": {
        "name": "Jupiter",
        "type": "GAS"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081181884842515"),
      "ts": 1590967313610000,
      "data": {
        "name": "Saturn",
        "type": "GAS"
      }
    }
  ]
}
```

### [](#filter_array)Filtering on an array value

配列の値でフィルタリングする

If we want to match an item inside an array, instead of filtering on a single string, we need to pass the term required to search inside the array.

配列内の項目にマッチさせたい場合、単一の文字列でフィルタリングするのではなく、配列内を検索するために必要な用語を渡す必要があります。

To test this, let’s add some colors to our ships:

これを試すために、船に色をつけてみましょう。

shell

```shell
Update(
  Ref(Collection("Spaceships"), "266356873589948946"),
  // NOTE: be sure to use the document ID of one of your spaceships here
  {
    data: {
      colors: ["RED","YELLOW"]
    }
  }
)

// etc...
```

If we now want to filter ships based on a single color, we could create the following index, which uses the `colors` array as a filtering term:

ここで、単一の色に基づいて船をフィルタリングしたい場合、次のようなインデックスを作成することができます。このインデックスは、フィルタリング用語として `colors` 配列を使用しています。

shell

```shell
CreateIndex({
  name: "all_Spaceships_by_color",
  source: Collection("Spaceships"),
  terms: [
    { field: ["data","colors"]}
  ]
})
```

And then query it:

そして、それを問い合わせます。

shell

```shell
Map(
  Paginate(Match(Index("all_Spaceships_by_color"), "WHITE")),
  Lambda("shipRef", Let({
    shipDoc: Get(Var("shipRef"))
  },{
    name: Select(["data","name"], Var("shipDoc")),
    colors: Select(["data","colors"], Var("shipDoc"))
  }))
)
```

```json
{
  data: [
    {
      name: "Explorer IV",
      colors: ["BLUE", "WHITE", "RED"]
    },
    {
      name: "Navigator",
      colors: ["WHITE", "GREY"]
    },
    {
      name: "Le Super Spaceship",
      colors: ["PINK", "MAGENTA", "WHITE"]
    }
  ]
}
```

Fauna is smart enough to understand that if the field used in the terms object is an array, then it should search for an item inside that array instead of an exact match on the full array.

Fauna は賢いので、条件オブジェクトで使用されているフィールドが配列の場合、配列全体での完全一致ではなく、その配列内のアイテムを検索することを理解しています。

### [](#sort_and_filter)Sorting and filtering at the same time

ソートとフィルタリングの同時実行

You can certainly do both at the same time by combining `terms` and `values` in the same index:

確かに、`terms`と`values`を同じインデックスに組み合わせることで、両方を同時に行うことができます。

shell

```shell
CreateIndex({
  name: "all_Planets_by_type_sorted_by_name",
  source: Collection("Planets"),
  terms: [
    { field: ["data", "type"]}
  ],
  values: [
    { field: ["data", "name"]},
    { field: ["ref"] }
  ]
})
```

And then:

そして次に

shell

```shell
Map(
  Paginate(
    Match(Index("all_Planets_by_type_sorted_by_name"), "TERRESTRIAL")
  ),
  Lambda("planetResult", Get(Select([1], Var("planetResult"))))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081091831038483"),
      "ts": 1590967227710000,
      "data": {
        "name": "Earth",
        "type": "TERRESTRIAL"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081096484618771"),
      "ts": 1590967232165000,
      "data": {
        "name": "Mars",
        "type": "TERRESTRIAL"
      }
    },
    // etc ...
  ]
}
```

## [](#unique)Enforcing unique values

ユニークな値を強制する

Another important function of indexes, besides retrieving documents, is enforcing a unique constraint on the documents that can be created.

インデックスのもう一つの重要な機能は、ドキュメントを取得することの他に、作成可能なドキュメントに一意の制約を強制することです。

For example, to add a unique code to our spaceships:

例えば，宇宙船にユニークなコードを加えるためには

shell

```shell
CreateIndex({
  name: "all_Spaceships_by_code",
  source: Collection("Spaceships"),
  terms: [
    {field: ["data", "code"]}
  ],
  unique: true
})
```

This index accomplishes two purposes:

このインデックスには2つの目的があります。

-   We’re configuring it to accept a filtering term with the `terms` object.
-   We’re ensuring the defined terms are unique across the documents matched by this index by using `unique: true`.

---

- まず、`terms` オブジェクトを使って、フィルタリング用語を受け入れるように設定します。
- unique: true` を使用して、定義された用語がこのインデックスでマッチしたドキュメントの中で一意であることを確認しています。

We’re using a single term here for simplicity’s sake. Uniqueness is based on the combination of the `terms` and `values` fields in an index, so you could create a unique constraint over multiple `terms` and/or `values`, much like you’d do in SQL by creating constraints over multiple columns.

ここでは、単純化のために単一の用語を使用しています。一意性はインデックスの`terms`と`values`フィールドの組み合わせに基づいているので、SQLで複数のカラムに対する制約を作成するのと同じように、複数の`terms`や`values`に対する一意の制約を作成することができます。

Let’s test this by creating a new spaceship:

新しいスペースシップを作ってテストしてみましょう。

shell

```shell
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Rocinante",
      code: "ROCINANTE"
    }
  }
)
```

```json
{
  "ref": Ref(Collection("Spaceships"), "267072793181422099"),
  "ts": 1590959313500000,
  "data": {
    "name": "Rocinante",
    "code": "ROCINANTE"
  }
}
```

So far so good. Let’s try to create another one with the same code:

ここまでは順調です。同じコードで別のものを作ってみましょう。

shell

```shell
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Rocinante 2",
      code: "ROCINANTE"
    }
  }
)
```

```json
error: instance not unique
document is not unique.
position: ["create"]
```

As expected, the response is an error since there is already a ship with the `ROCINANTE` code.

予想通り、`ROCINANTE`コードのシップがすでに存在しているため、レスポンスはエラーとなります。

When using unique constraints, we know in advance that an index can only return a single document. So, instead of using the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) function, we can simply use the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to get a single document:

ユニーク制約を使用する場合、インデックスは1つのドキュメントしか返せないことが事前にわかっています。そのため、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)関数を使う代わりに、単純に[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を使って1つのドキュメントを取得することができます。

shell

```shell
Get(Match(Index("all_Spaceships_by_code"), 'ROCINANTE'))
```

```json
{
  "ref": Ref(Collection("Spaceships"), "267072793181422099"),
  "ts": 1591022503995000,
  "data": {
    "name": "Rocinante",
    "code": "ROCINANTE"
  }
}
```

## [](#combining)Combining multiple indexes

複数のインデックスを組み合わせる

FQL has a number of functions that allow you to combine results from indexes and other sources in different ways:

FQLには、インデックスやその他のソースからの結果をさまざまな方法で組み合わせることができる関数がいくつかあります。

-   [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union) combines the results from all indexes.

- [`ユニオン`](https://docs.fauna.com/fauna/current/api/fql/functions/union)は、すべてのインデックスからの結果を結合します。

-   [`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection) returns the matching results from each index and discards the rest.

- `Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection) 各インデックスからマッチする結果を返し、それ以外は破棄します。

-   [`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference) returns the results that are unique in the first index and discards the rest.

- [`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)は、最初のインデックスでユニークな結果を返し、残りを捨てます。

![Visualization of how the set functions combine index results](https://docs.fauna.com/fauna/current/tutorials/basics/indexes../_images/set_operations.svg)

To be able to test these, let’s add some colors to our planets (please excuse any scientific inaccuracies).

これらをテストするために、惑星に色を付けてみましょう（科学的に不正確な点はご容赦ください）。

shell

```shell
// Earth
Update(Ref(Collection("Planets"), "267081091831038483"),
  // NOTE: be sure to use your planet's document ID here
  {data: {color: "BLUE"}}
)

// Etc...
```

Let’s also create a new index:

新しいインデックスも作ってみましょう。

shell

```shell
CreateIndex({
  name: "all_Planets_by_color",
  source: Collection("Planets"),
  terms: [
    { field: ["data", "color"]}
  ]
})
```

### [](#union)OR filtering with Union

OR Union によるフィルタリング

The [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union) function combines all of the results from each index. We’re just using two indexes here, but you could use any number of indexes.

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)関数は、各インデックスから得られたすべての結果を結合します。ここでは2つのインデックスを使用していますが、任意の数のインデックスを使用することができます。

"Hey Fauna, get me the planets that are of type GAS or are YELLOW":

「ヘイ ファウナ、ガス型か黄色の惑星を持ってきてくれ」。

shell

```shell
Map(
  Paginate(
    Union(
      Match(Index("all_Planets_by_type"), "GAS"),
      Match(Index("all_Planets_by_color"), "YELLOW")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081152090604051"),
      "ts": 1590977605890000,
      "data": {
        "name": "Jupiter",
        "type": "GAS",
        "color": "BROWN"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081181884842515"),
      "ts": 1590977684790000,
      "data": {
        "name": "Saturn",
        "type": "GAS",
        "color": "YELLOW"
      }
    }
  ]
}
```

As you can see, `Union` skips duplicates, since Saturn is a gas giant and appears in the results of both indexes.

土星はガス惑星であり、両方のインデックスの結果に現れるので、見ての通り、`Union`は重複をスキップします。

### [](#intersection)AND filtering with Intersection

ANDによるIntersectionのフィルタリング

The [`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection) function returns only the results that are the same in all indexes. Again, you could use any number of indexes.

[`intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)関数は、すべてのインデックスで同じ結果のみを返します。繰り返しますが、インデックスはいくつでも使用できます。

"Hey Fauna, get me the planets that are of type TERRESTRIAL and are BLUE":

「ヘイ ファウナ、「TERRESTRIAL」タイプで「青」の惑星を教えてくれ。」

shell

```shell
Map(
  Paginate(
    Intersection(
      Match(Index("all_Planets_by_type"), "TERRESTRIAL"),
      Match(Index("all_Planets_by_color"), "BLUE")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081091831038483"),
      "ts": 1590977345595000,
      "data": {
        "name": "Earth",
        "type": "TERRESTRIAL",
        "color": "BLUE"
      }
    }
  ]
}
```

### [](#difference)NOT filtering with Difference

NOT 差分によるフィルタリング

The [`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference) function compares the first index that you provide with the rest of the indexes, and returns the results that exist only in the first index.

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)関数は、指定した最初のインデックスと残りのインデックスを比較し、最初のインデックスにのみ存在する結果を返します。

"Hey Fauna, get me the planets that are TERRESTRIAL but are not BLUE nor RED":

「ヘイ、ファウナ、テレストラルでありながら青でも赤でもない惑星を教えてくれ。」

shell

```shell
Map(
  Paginate(
    Difference(
      Match(Index("all_Planets_by_type"), "TERRESTRIAL"),
      Match(Index("all_Planets_by_color"), "BLUE"),
      Match(Index("all_Planets_by_color"), "RED")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081079730471443"),
      "ts": 1590977548370000,
      "data": {
        "name": "Mercury",
        "type": "TERRESTRIAL",
        "color": "GREY"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081085891904019"),
      "ts": 1590977561660000,
      "data": {
        "name": "Venus",
        "type": "TERRESTRIAL",
        "color": "GREY"
      }
    }
  ]
}
```

## [](#bindings)Index bindings

インデックスバインディング

With index bindings, it’s possible to create pre-computed values based on some document data, using pretty much any FQL expression.

インデックスバインディングを使うと、ほとんどのFQL式を使って、ドキュメントデータに基づいて事前に計算された値を作成することができます。

These values are calculated beforehand, which makes retrieving these values super efficient as the operation consumes little CPU. The down side is that these computed values consume storage space. Before deciding to use a binding at scale, you should consider whether the performance boost is worth the storage cost for your use case.

これらの値は事前に計算されているので、この操作はほとんど CPU を消費しないため、これらの値を非常に効率的に取得できます。しかし、これらの計算された値はストレージスペースを消費するという欠点があります。バインディングを大規模に使用することを決定する前に、パフォーマンスの向上がユースケースにおけるストレージのコストに見合うかどうかを検討する必要があります。

Let’s see a couple examples on how to use index bindings.

インデックスバインディングの使い方の例をいくつか見てみましょう。

Remember our spaceship, from the [previous part](https://docs.fauna.com/fauna/current/tutorials/basics/) of this tutorial?

このチュートリアルの[前編](https://docs.fauna.com/fauna/current/tutorials/basics/)で紹介したスペースシップを覚えていますか？

```json
{
  "name": "Voyager",
  "pilot": Ref(Collection("Pilots"), "266350546751848978"),
  "type": "Rocket",
  "fuelType": "Plasma",
  "actualFuelTons": 7,
  "maxFuelTons": 10,
  "maxCargoTons": 25,
  "maxPassengers": 5,
  "maxRangeLightyears": 10,
  "position": {
    "x": 2234,
    "y": 3453,
    "z": 9805
  },
  "code": "VOYAGER"
}
```

So here comes our boss, the fleet admiral. He has 100 ships in the dock that need refueling and wants to know which ships could be filled faster so that he can fill them first and empty the dock as fast as possible.

さて、ここに我々のボスである艦隊提督がやってきました。ドックには100隻の補給が必要な船があり、どの船が早く補給できるかを知りたいので、先に補給してドックをできるだけ早く空にしたいとのことです。

Easy, right? To do that, we’d only need to sort our ships by `pendingFuelTons`.

簡単でしょう？そのためには、船を `pendingFuelTons` でソートすればよいのです。

But `pendingFuelTons` is not in the ship documents! We’re doomed!

しかし、`pendingFuelTons`は船のドキュメントにはありません! これは絶望的だ!

Don’t panic my friend, we have the perfect tool to solve this problem.

この問題を解決するのに最適なツールがあります。

Index bindings allow you to create computed values dynamically based on the data of the document. In this case, we could just calculate the value `pendingFuelTons` by subtracting `actualFuelTons` from `maxFuelTons`.

インデックスバインディングを使えば、ドキュメントのデータに基づいて動的に計算値を作成することができます。今回の例では、`maxFuelTons`から`actualFuelTons`を引くことで`pendingFuelTons`という値を算出することができます。

So let’s create our index:

それでは、インデックスを作成してみましょう。

shell

```shell
CreateIndex({
  name: "all_Spaceships_by_pendingFuelTons",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      pendingFuelTons: Query(
        Lambda("shipDoc",
          Subtract(
            Select(["data","maxFuelTons"], Var("shipDoc")),
            Select(["data","actualFuelTons"], Var("shipDoc"))
          )
        )
      )
    }
  },
  values: [
    { binding: "pendingFuelTons"},
    { field: ["data", "name"]}
  ]
})
```

The only new FQL function we’re using here is [`Subtract`](https://docs.fauna.com/fauna/current/api/fql/functions/subtract), which simply subtracts the second number from the first.

ここで使っている唯一の新しいFQL関数は[`Subtract`](https://docs.fauna.com/fauna/current/api/fql/functions/subtract)で、これは単純に1番目の数字から2番目の数字を引くものです。

So let’s query our new index:

それでは、新しいインデックスに問い合わせてみましょう。

shell

```shell
Paginate(Match(Index("all_Spaceships_by_pendingFuelTons")))
```

```json
{
  "data": [
    [
      3,
      "Explorer IV"
    ],
    [
      3,
      "Voyager"
    ],
    [
      10,
      "Navigator"
    ],
    [
      18,
      "Destroyer"
    ]
    // etc...
  ]
}
```

As you can see, the results are sorted first by the new computed value `pendingFuelTons` and then by the ship name.

ご覧の通り、結果はまず新しい計算値 `pendingFuelTons` でソートされ、次に船の名前でソートされます。

Cool!

かっこいいですね。

### [](#first_letter)Filtering by the first letter

最初の文字でフィルタリングする

Let’s create another example. What if we wanted to get all of the planets that started with the letter `M`? Our planet documents do not have a `firstLetter` property, but we can solve this with bindings too.

別の例を作ってみましょう。M`という文字で始まる惑星をすべて取得したいとしたらどうでしょうか。惑星のドキュメントには `firstLetter` プロパティがありませんが、これもバインディングで解決できます。

We can create a new index with a binding for the first letter of the name, and add a `terms` object to be able to filter the documents by `firstLetter`:

名前の最初の文字を表すバインディングで新しいインデックスを作成し、`terms` オブジェクトを追加することで、`firstLetter` でドキュメントをフィルタリングすることができます。

shell

```shell
CreateIndex({
  name: "all_Planets_by_firstLetter",
  source: {
    collection: Collection("Planets"),
    fields: {
      firstLetter: Query(
        Lambda("planetDoc",
          SubString(Select(["data", "name"], Var("planetDoc")), 0, 1)
        )
      )
    }
  },
  terms: [
    { binding: "firstLetter"}
  ]
})
```

As you can see in the `terms` object, the value that we want to use for filtering is an index binding instead of a document field.

この `terms` オブジェクトを見ればわかるように、フィルタリングに使いたい値は、ドキュメントフィールドではなく、インデックスのバインディングです。

Great, so let’s query the index as usual and pass the letter `M`:

それでは、いつものようにインデックスを照会して、`M`という文字を渡してみましょう。

shell

```shell
Map(
  Paginate(Match(Index("all_Planets_by_firstLetter"), "M")),
  Lambda("planetDoc", Get(Var("planetDoc")))
)
```

```json
{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081079730471443"),
      "ts": 1590977548370000,
      "data": {
        "name": "Mercury",
        "type": "TERRESTRIAL",
        "color": "GREY"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081096484618771"),
      "ts": 1590977464930000,
      "data": {
        "name": "Mars",
        "type": "TERRESTRIAL",
        "color": "RED"
      }
    }
  ]
}
```

Easy, right?

簡単でしょう？

These bindings are very powerful. We can access all the FQL commands available to produce computed values.

このバインディングは非常に強力です。計算値を生成するために利用できるすべての FQL コマンドにアクセスできます。

### [](#any_letter)Filtering by any letter

任意の文字でのフィルタリング

As a final example, let’s see how we could check if an array produced by a binding includes a search term.

最後の例として、バインディングで生成した配列に検索語が含まれているかどうかをチェックする方法を見てみましょう。

The `NGram` function is currently undocumented. We hope to officially support it in a future release. You can [check more details here](https://fauna.com/blog/boosting-developer-productivity-with-string-functions).

なお、``NGram`関数は現在ドキュメント化されていません。将来のリリースで正式にサポートしたいと考えています。詳細は[こちらで確認できます](https://fauna.com/blog/boosting-developer-productivity-with-string-functions)。

shell

```shell
CreateIndex({
  name: "filter_Spaceships_by_letter",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      nameLetters: Query(
        Lambda("shipDoc",
          NGram(Select(["data","name"], Var("shipDoc")),1,1)
        )
      )
    }
  },
  terms: [
    { binding: "nameLetters"}
  ]
})
```

And query it:

そしてそれを照会する。

shell

```shell
Map(
  Paginate(Match(Index("filter_Spaceships_by_letter"), "V")),
  Lambda("shipRef", Let({
    shipDoc: Get(Var("shipRef"))
  },{
    name: Select(["data","name"], Var("shipDoc"))
  }))
)
```

```json
{
  data: [
    {
      name: "Voyager"
    },
    {
      name: "Explorer IV"
    }
  ]
}
```

This works because the `NGram` function produces an array of letters which can be queried by the index.

これが動作するのは、`NGram`関数が文字の配列を生成し、それをインデックスで照会できるからです。

shell

```shell
NGram("FaunaDB",1,1)
```

```json
["F", "a", "u", "n", "a", "D", "B"]
```

Or:

あるいは

shell

```shell
NGram("FaunaDB",2,3)
```

```json
["Fa", "Fau", "au", "aun", "un", "una", "na", "naD", "aD", "aDB", "DB"]
```

You can create all sorts of binding values. For example, you could extract the day of the week from a timestamp using the [`DayOfWeek`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek) function to get all of the events that happened on a Friday.

あらゆる種類の結合値を作ることができます。例えば、[`DayOfWeek`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek)関数を使ってタイムスタンプから曜日を抽出し、金曜日に起こったイベントをすべて取得することができます。

### [](#constraints)Binding and unique constraints

結合と一意性の制約

If you’re wondering, yes, you can use unique constraints over bindings too.

疑問に思われるかもしれませんが、そうなんです、バインディングにもユニークな制約を使うことができます。

Imagine we wanted to have key cards with ids for accessing our ships. We know that pilots have a history of forgetting their key card ids, so these ids should be memorable and obvious. What if we create them based on the ships' names? And, since key cards would only be available for a single ship, these ids should be unique.

例えば、自分の船にアクセスするためのID付きのキーカードが欲しいとします。パイロットはキーカードのIDを忘れてしまうことがあるので、これらのIDは記憶に残り、明白なものでなければなりません。そこで、船の名前を元にしたIDを作ってみてはどうでしょうか。また、キーカードは1つの船にしか使えないので、このIDはユニークなものであるべきだと考えています。

shell

```shell
CreateIndex({
  name: "all_Keycards",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      keyCardId: Query(
        Lambda("shipDoc",
          UpperCase(
            ReplaceStr(Select(["data", "name"], Var("shipDoc")), " ", "_")
          )
        )
      )
    }
  },
  values: [
    { binding: "keyCardId"}
  ],
  unique: true
})
```

If we query this index, the results should make sense:

このインデックスにクエリを実行すると、結果は納得のいくものになるはずです。

shell

```shell
Paginate(Match(Index("all_Keycards")))
```

```json
{
  data: [
    "DESTROYER",
    "EXPLORER_IV",
    "LE_SUPER_SPACESHIP",
    "NAVIGATOR",
    "ROCINANTE",
    "VOYAGER"
  ]
}
```

If we now try to create a new ship by using a name we’ve already used, we get an error. The `all_Keycards` index prevents two key cards from having the same `keyCardId`, even if we have no unique constraints on the names of the spaceships themselves:

ここで、すでに使った名前を使って新しい船を作ろうとすると、エラーが発生します。all_Keycards` インデックスは、宇宙船の名前にユニークな制約がなくても、2つのキーカードが同じ `keyCardId` を持つことを防ぎます。

shell

```shell
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Le Super Spaceship"
    }
  }
)
```

```json
error: instance not unique
document is not unique.
position: ["create"]
```

## [](#conclusion)Conclusion

結論

So that’s it for today. Hopefully you learned something valuable!

というわけで、今日はここまでです。何か貴重なことを学んでいただけたでしょうか？

In [part 3 of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/data_modeling), we continue our space adventure by learning how to model data.

[チュートリアルのパート3](https://docs.fauna.com/fauna/current/tutorials/basics/data_modeling)では、データをモデル化する方法を学ぶことで、宇宙の冒険を続けます。

