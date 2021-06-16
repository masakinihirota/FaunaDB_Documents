Core FQL concepts part 3: Data aggregation
https://fauna.com/blog/core-fql-concepts-part-3-data-aggregation

# Core FQL concepts part 3: Data aggregation

FQL のコアコンセプトパート 3：データ集約

Pier Bover|Oct 1st, 2020|

2020 年 10 月 1 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Today we're going to explore some of the aggregate functions of FQL and a number of techniques for data aggregation.

今日は、FQL の集計関数のいくつかと、データ集計のいくつかの手法について説明します。

- [Part 1: Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- [Part 2: Temporality in Fauna](https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb)
- Part 3: Data Aggregation

パート 1：日付と時刻の操作
パート 2：動物相のテンポラリティ
パート 3：データ集約

This series assumes you have a grasp on the basics. If you're new to Fauna and/or FQL here's [my introductory series on FQL](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1).

このシリーズは、基本を理解していることを前提としています。動物相や FQL を初めて使用する場合は、FQL の紹介シリーズをご覧ください。

## In this article:

今回の記事

- Introduction
- Basic aggregate functions
- Retrieving data for aggregation
- Grouping results
- Ultimate robots report

前書き
基本的な集計関数
集計のためにデータを取得する
結果のグループ化
究極のロボットレポート

# Introduction

前書き

The basic idea of data aggregation is to perform one or more calculations over a set of values. Common aggregation tasks include computing the total, average, range, standard deviation, etc. In other words, you can answer questions such as "How many spaceships are currently stationed in our Moon base?" or "What's the average duration of spaceship repairs?".

データ集約の基本的な考え方は、値のセットに対して 1 つ以上の計算を実行することです。一般的な集計タスクには、合計、平均、範囲、標準偏差などの計算が含まれます。つまり、「現在、月面基地に配置されている宇宙船の数」などの質問に答えることができます。または「宇宙船の修理の平均期間はどれくらいですか？」

Before we get into the nuts and bolts, let's prepare some data that we can aggregate.

要点を説明する前に、集計できるデータをいくつか準備しましょう。

First, let's create a collection and a simple index to retrieve all of the references of its documents:

まず、コレクションと単純なインデックスを作成して、そのドキュメントのすべての参照を取得しましょう。

```javascript
> CreateCollection({
  name: "Robots"
})

> CreateIndex({
  name: "all_Robots",
  source: Collection("Robots")
})
```

Also, let’s create some documents:

また、いくつかのドキュメントを作成しましょう。

```javascript
> Create(
  Collection("Robots"),
  {
    data: {
      name: "R3-D3",
      type: "ASTROMECH",
      weightKg: 20
    }
  }
)

> Create(
  Collection("Robots"),
  {
    data: {
      name: "BB-9",
      type: "ASTROMECH",
      weightKg: 10
    }
  }
)

> Create(
  Collection("Robots"),
  {
    data: {
      name: "David",
      type: "ANDROID",
      weightKg: 90
    }
  }
)

> Create(
  Collection("Robots"),
  {
    data: {
      name: "T1000",
      type: "ANDROID",
      weightKg: 150
    }
  }
)

> Create(
  Collection("Robots"),
  {
    data: {
      name: "ASIMO",
      type: "HUMANOID",
      weightKg: 48
    }
  }
)
```

# Basic aggregate functions

基本的な集計関数

## Count

カウント

To be able to count the elements in an array, we use the [Count()](https://docs.fauna.com/fauna/current/api/fql/functions/count?lang=javascript) function:

配列内の要素をカウントできるようにするには、Count（）関数を使用します。

```javascript
> Count(["A", "B", "C"])

3
```

Many functions in FQL that accept arrays as input also work with other types. For example, **Count()** also works with a **SetRef** returned by [Documents()](https://docs.fauna.com/fauna/current/api/fql/functions/documents?lang=javascript) or [Match()](https://docs.fauna.com/fauna/current/api/fql/functions/match?lang=javascript) :

配列を入力として受け入れる FQL の多くの関数は、他のタイプでも機能します。たとえば、Count（）は、Documents（）または Match（）によって返される SetRef でも機能します。

```javascript
> Count(Documents(Collection("Robots")))

5

> Count(Match(Index("all_Robots")))

5
```

**Documents()** is a helper function that performs exactly the same function as the **all_Robots** index, and returns the set of references for all documents in a collection.

Documents（）は、all \_ Robots インデックスとまったく同じ機能を実行し、コレクション内のすべてのドキュメントの参照セットを返すヘルパー関数です。

We can also count how many items are returned in a page by the **Paginate()** function:

Paginate（）関数によって、ページに返されるアイテムの数を数えることもできます。

```javascript
> Count(Paginate(Match(Index("all_Robots"))))

{
  data: [5]
}
```

You might be wondering why the result is not exactly a number but an object with a **data** property. Fauna is actually returning a **Page** because we used the **Page** returned by **Paginate()** instead of an array.

結果が正確に数値ではなく、データプロパティを持つオブジェクトである理由を疑問に思われるかもしれません。動植物が実際に戻っているページを、我々が使用しているためページで返されるページ付け（）の代わりに、配列を。

Many FQL functions that use arrays as inputs behave this way when receiving a page. Consult [the docs](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript) for more information on this.

配列を入力として使用する多くの FQL 関数は、ページを受信するときにこのように動作します。詳細については、ドキュメントを参照してください。

## Min/max values

最小/最大値

To determine the max value in an array we use the [Max()](https://docs.fauna.com/fauna/current/api/fql/functions/max?lang=javascript) function:

配列の最大値を決定するには、Max（）関数を使用します。

```javascript
> Max([22, 4, 63])

63
```

It also works with strings or dates:

文字列または日付でも機能します。

```javascript
> Max(["A", "B", "C"])

C

> Max([
  Date("2000-01-01"),
  Date("2010-01-01"),
  Date("2020-01-01")
])

Date("2020-01-01")
```

As you probably have guessed, we use [Min()](https://docs.fauna.com/fauna/current/api/fql/functions/min?lang=javascript) to determine the minimum value and it works in the exact same fashion:

ご想像のとおり、Min（）を使用して最小値を決定し、まったく同じように機能します。

```javascript
> Min([22, 4, 63])

4
```

On top of numbers, strings, and dates, both **Min()** and **Max()** work with other Fauna types. Check [the documentation](https://docs.fauna.com/fauna/current/api/fql/functions/max?lang=javascript) for more information.

数値、文字列、日付に加えて、Min（）と Max（）の両方が他の動物相タイプで機能します。詳細については、ドキュメントを確認してください。

## Summing values

値の合計

To sum a list of values we use the [Sum()](https://docs.fauna.com/fauna/current/api/fql/functions/sum?lang=javascript) function:

値のリストを合計するには、Sum（）関数を使用します。

```javascript
> Sum([1,2,3,4,5])

15
```

Obviously, it only works with numbers. If you want to concatenate strings, you would use the [Concat()](https://docs.fauna.com/fauna/current/api/fql/functions/concat?lang=javascript) function.

明らかに、それは数字でのみ機能します。文字列を連結する場合は、Concat（）関数を使用します。

## Unique values

一意の値

Another useful FQL function for aggregation queries is [Distinct()](https://docs.fauna.com/fauna/current/api/fql/functions/distinct?lang=javascript) which returns the unique values in an array:

集計クエリに役立つもう 1 つの FQL 関数は、配列内の一意の値を返す Distinct（）です。

```javascript
> Distinct(["A", "B", "A", "C", "C"])

["A", "B", "C"]
```

As we'll see later, this becomes quite handy for grouping results.

後で見るように、これは結果をグループ化するのに非常に便利になります。

# Retrieving data for aggregation

集計のためにデータを取得する

In relational databases, aggregate functions are used on a column of data (either from a table or the results of a query). Fauna uses documents as its underlying storage, so these calculations are done over arrays. The approach is very similar to what you'd do in regular programming using functional style techniques, which FQL naturally lends itself to.

リレーショナルデータベースでは、集計関数はデータの列で使用されます（テーブルまたはクエリの結果のいずれかから）。動物相はその基礎となるストレージとしてドキュメントを使用するため、これらの計算は配列に対して行われます。このアプローチは、FQL が自然に役立つ機能スタイルの手法を使用した通常のプログラミングで行う方法と非常によく似ています。

Let's answer the following question: what's the total weight of all our robots?

次の質問に答えましょう：私たちのすべてのロボットの総重量はどれくらいですか？

## Using indexes

インデックスの使用

The first approach to getting data for aggregation is using indexes. This is the most cost-effective approach as it consumes a single read operation per page returned. Indexes do not read every document they index on every query. Instead, they return data that has been pre-written, so to speak.

集計用のデータを取得するための最初のアプローチは、インデックスを使用することです。これは、返されるページごとに 1 回の読み取り操作を消費するため、最も費用効果の高いアプローチです。インデックスは、すべてのクエリでインデックスを作成するすべてのドキュメントを読み取るわけではありません。代わりに、いわば事前に書き込まれたデータを返します。

You can check how many operations a query has performed by hovering over the little icon on the sidebar of the shell results:

シェル結果のサイドバーにある小さなアイコンにカーソルを合わせると、クエリが実行した操作の数を確認できます。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/60Qh252XaS6AcjE4BrYyuP/883ddd445d0684e0a759895a5e2ae971/8864-Core-FQL-Part3-1.png)

First, let's create an index that returns all of the weights of all our robots:

まず、すべてのロボットのすべての重みを返すインデックスを作成しましょう。

```javascript
> CreateIndex({
  name: "Robots_weights",
  source: Collection("Robots"),
  values: [
    {field: ["data", "weightKg"]}
  ]
})
```

By default, this is what our index returns:

デフォルトでは、これはインデックスが返すものです。

```javascript
> Paginate(Match(Index("Robots_weights")))

{
  data: [10, 20, 48, 90, 150]
}
```

So now can just use **Sum()** with the results of the index:

これで、インデックスの結果で Sum（）を使用できるようになりました。

```javascript
> Sum(Paginate(Match(Index("Robots_weights"))))

{
  data: [318]
}
```

## Aggregating the result of Map/Get

Map / Get の結果を集計する

The second approach is to iterate over a number of documents and extract the relevant data into an array.

2 番目のアプローチは、多数のドキュメントを反復処理し、関連するデータを配列に抽出することです。

This approach is certainly more flexible, as you won't need to create a new index for every value that you want to aggregate, but it consumes a read operation every time you **Get()** a document. You should evaluate which approach fits your use case better and choose between efficiency and flexibility.

このアプローチは、集計するすべての値に対して新しいインデックスを作成する必要がないため、確かにより柔軟ですが、ドキュメントを Get（）するたびに読み取り操作を消費します。どのアプローチがユースケースにより適しているかを評価し、効率と柔軟性のどちらかを選択する必要があります。

Before we actually sum all of the weights, let's see how to collect those values into an array:

実際にすべての重みを合計する前に、これらの値を配列に収集する方法を見てみましょう。

```javascript
> Let(
  {
    docs: Map(
      Paginate(Documents(Collection("Robots"))),
      Lambda("ref", Get(Var("ref")))
    ),
    weights: Map(
      Var("docs"),
      Lambda("doc", Select(["data", "weightKg"], Var("doc")))
    )
  },
  Var("weights")
)

{
  data: [20, 10, 90, 150, 48]
}
```

1.  First we get all of the documents and put them into the **docs** binding. Again, we could have used our **all_Robots** index instead of the **Documents()** helper.

まず、すべてのドキュメントを取得して、ドキュメントバインディングに配置します。繰り返しになりますが、Documents（）ヘルパーの代わりに all_Robots インデックスを使用することもできます。

2.  Then we create a **weights** array by iterating over those documents with **Map()** and selecting the **weightKg** value.

次に、Map（）を使用してこれらのドキュメントを反復処理し、weightKg 値を選択して、重み配列を作成します。

We can now just use **Sum()** to calculate the total weight:

これで、Sum（）を使用して総重量を計算できます。

```javascript
> Let(
  {
    docs: Map(
      Paginate(Documents(Collection("Robots"))),
      Lambda("ref", Get(Var("ref")))
    ),
    weights: Map(
      Var("docs"),
      Lambda("doc", Select(["data", "weightKg"], Var("doc")))
    )
  },
  Sum(Var("weights"))
)

{
  data: [318]
}
```

# Grouping results

結果のグループ化

## How many robots of each type are there?

各タイプのロボットはいくつありますか？

To be able to answer that question, we first need to find out which robot types there are in our collection. To avoid reading all of the documents, we create an index that returns all of the types:

その質問に答えられるようにするには、まずコレクションにどのロボットタイプがあるかを調べる必要があります。すべてのドキュメントを読まないようにするために、すべてのタイプを返すインデックスを作成します。

```javascript
> CreateIndex({
  name: "Robots_types",
  source: Collection("Robots"),
  values: [
    {field: ["data", "type"]}
  ]
})
```

This is what this index returns:

これは、このインデックスが返すものです。

```javascript
> Paginate(Match(Index("Robots_types")))

{
  data: ["ANDROID", "ANDROID", "ASTROMECH", "ASTROMECH", "HUMANOID"]
}
```

We can now use **Distinct()** to get only the unique types:

Distinct（）を使用して、一意の型のみを取得できるようになりました。

```javascript
> Distinct(Paginate(Match(Index("Robots_types"))))

{
  data: ["ANDROID", "ASTROMECH", "HUMANOID"]
}
```

Great. Now we need to find a way to be able to count how many robots there are for each of those types.

すごい。次に、これらのタイプごとにロボットがいくつあるかを数える方法を見つける必要があります。

One way to do that could be using another index that filters robots per type:

これを行う 1 つの方法は、タイプごとにロボットをフィルタリングする別のインデックスを使用することです。

```javascript
> CreateIndex({
  name: "Robots_by_type",
  source: Collection("Robots"),
  terms: [
    {field: ["data", "type"]}
  ]
})
```

If we now combine everything into a single query, we get this:

すべてを 1 つのクエリにまとめると、次のようになります。

```javascript
> Let(
  {
    types: Distinct(Paginate(Match(Index("Robots_types"))))
  },
  Map(
    Var("types"),
    Lambda(
       "type",
      Let(
        {
          refs: Match(Index("Robots_by_type"), Var("type"))
        },
        {
          type: Var("type"),
          total: Count(Var("refs"))
        }
      )
    )
  )
)

{
  data: [
    { type: 'ANDROID', total: 2 },
    { type: 'ASTROMECH', total: 2 },
    { type: 'HUMANOID', total: 1 }
  ]
}
```

We got our answer and used four read operations, one for each index that we queried.

回答を得て、クエリしたインデックスごとに 1 つずつ、合計 4 つの読み取り操作を使用しました。

## What is the average weight of each robot type?

各ロボットタイプの平均重量はいくらですか？

To answer this question, we won't be able to get away by counting elements on an array. We'll need a new index to be able to get the weights for each robot type:

この質問に答えるために、配列上の要素を数えることによって逃げることはできません。各ロボットタイプの重みを取得できるようにするには、新しいインデックスが必要です。

```javascript
> CreateIndex({
  name: "Robots_weights_by_type",
  source: Collection("Robots"),
  terms: [
    {field: ["data", "type"]}
  ],
  values: [
    {field: ["data", "weightKg"]}
  ]
})
```

Which returns this:

これはこれを返します：

```javascript
> Paginate(Match(Index("Robots_weights_by_type"), "ASTROMECH"))

{
  data: [10, 20]
}
```

We can now compose the query to answer our question:

これで、質問に答えるためのクエリを作成できます。

```javascript
> Let(
  {
    types: Distinct(Paginate(Match(Index("Robots_types"))))
  },
  Map(
    Var("types"),
    Lambda(
      "type",
      {
        type: Var("type"),
        averageWeight: Mean(
          Match(Index("Robots_weights_by_type"), Var("type"))
        )
      }
    )
  )
)

{
  data: [
    { type: 'ANDROID', averageWeight: 120 },
    { type: 'ASTROMECH', averageWeight: 15 },
    { type: 'HUMANOID', averageWeight: 48 }
  ]
}
```

In this query, we're returning an array of weights for each type using the **Robots_weights_by_type** index, and then using [Mean()](https://docs.fauna.com/fauna/current/api/fql/functions/mean?lang=javascript) to calculate the average weight.

このクエリでは、Robots_weights_by_type インデックスを使用して各タイプの重みの配列を返し、次に Mean（）を使用して平均重みを計算します。

Just as before, we are only using 4 read operations (one for each index), which works for any number of documents in the collection.

以前と同様に、4 つの読み取り操作（インデックスごとに 1 つ）のみを使用しています。これは、コレクション内の任意の数のドキュメントに対して機能します。

# Ultimate robots report

究極のロボットレポート

So let's combine everything that we've learned so far to create the ultimate robots report:

それでは、これまでに学んだことをすべて組み合わせて、究極のロボットレポートを作成しましょう。

```javascript
> Let(
  {
    types: Paginate(Match(Index("Robots_types"))),
    uniqueTypes: Distinct(Select(["data"], Var("types"))),
    weights: Paginate(Match(Index("Robots_weights"))),
  },
  {
    totalRobots: Count(Select(["data"], Var("types"))),
    totalWeight: Sum(Select(["data"], Var("weights"))),
    types: Map(
      Var("uniqueTypes"),
      Lambda(
        "type",
        Let(
          {
            typeWeights: Paginate(
              Match(Index("Robots_weights_by_type"), Var("type"))
            ),
          },
          {
            type: Var("type"),
            total: Count(Select(["data"], Var("typeWeights"))),
            totalWeight: Sum(Select(["data"], Var("typeWeights"))),
            averageWeight: Mean(Select(["data"], Var("typeWeights")))
          }
        )
      )
    )
  }
)

{
  totalRobots: 5,
  totalWeight: 318,
  types: [
    { type: 'ANDROID', total: 2, totalWeight: 240, averageWeight: 120 },
    { type: 'ASTROMECH', total: 2, totalWeight: 30, averageWeight: 15 },
    { type: 'HUMANOID', total: 1, totalWeight: 48, averageWeight: 48 }
  ]
}
```

# Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In the following article we will do a deep dive into advanced index queries.

次の記事では、高度なインデックスクエリについて詳しく説明します。

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
