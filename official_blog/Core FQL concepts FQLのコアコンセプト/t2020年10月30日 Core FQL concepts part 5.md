Core FQL concepts part 5: Joins
https://fauna.com/blog/core-fql-concepts-part-5-joins

# Core FQL concepts part 5: Joins

FQL のコアコンセプトパート 5：結合

Pier Bover|Oct 30th, 2020|

2020 年 10 月 30 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Today, in the final article of the Core FQL series, we're going to take an in-depth look at the **Join()** function and its multiple uses.

今日は、Core FQL シリーズの最後の記事で、Join（）関数とその複数の使用法について詳しく見ていきます。

- [Part 1: Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- [Part 2: Temporality in Fauna](https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb)
- [Part 3: Data Aggregation](https://fauna.com/blog/core-fql-concepts-part-3-data-aggregation)
- [Part 4: Range queries](https://fauna.com/blog/core-fql-concepts-part-4-range-queries-and-advanced-filtering)
- Part 5: Joins

パート 1：日付と時刻の操作
パート 2：Faunaのテンポラリティ
パート 3：データ集約
パート 4：範囲クエリ
パート 5：参加

This series assumes you have a grasp on the basics. If you're new to Fauna and/or FQL here's [my introductory series on FQL](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1).

このシリーズは、基本を理解していることを前提としています。Faunaや FQL を初めて使用する場合は、FQL の紹介シリーズをご覧ください。

## In this article:

今回の記事

- Introduction
- Which robot parts are manufactured on Vulcan?
- What is a SetRef?
- Using Join() with Lambda()
- Using multiple joins
- Using Join() with Range()
- Replicating SQL joins in FQL

前書き
どのロボット部品がバルカンで製造されていますか？
SetRef とは何ですか？
Lambda（）で Join（）を使用する
複数の結合を使用する
Range（）で Join（）を使用する
FQL での SQL 結合の複製

# Introduction

前書き

It's important to clarify that **Join()** is not really related to SQL joins. In FQL, the [Join()](https://docs.fauna.com/fauna/current/api/fql/functions/join?lang=javascript) function allows you to query an index with the results of another index and get your data as efficiently as possible.

Join（）は実際には SQL 結合に関連していないことを明確にすることが重要です。FQL では、Join（）関数を使用すると、別のインデックスの結果を使用してインデックスをクエリし、データを可能な限り効率的に取得できます。

We'll be working with this data model:

このデータモデルを使用します。

![Core-FQL-pt-5-1](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7jTwQhoPF6FsIv7aqxYHAj/059a286fa423cd41b56c880089a11df4/Core-FQL-pt-5-1.png)

Each RobotPart belongs to a specific Factory, and each Factory belongs to a specific Planet. Each Robot can “have” one or more RobotParts.

各 RobotPart は特定のファクトリに属し、各ファクトリは特定の惑星に属します。各ロボットは、1 つ以上の RobotPart を「持つ」ことができます。

Let's ignore our robots for now and create these collections:

今のところロボットを無視して、次のコレクションを作成しましょう。

```javascript
> CreateCollection({
  name: "Planets"
})

> CreateCollection({
  name: "Factories"
})

> CreateCollection({
  name: "RobotParts"
})
```

Also, create these two indexes to query our data:

また、次の 2 つのインデックスを作成して、データをクエリします。

```javascript
> CreateIndex({
  name: "Factories_by_planetRef",
  source: Collection("Factories"),
  terms: [
    {field: ["data", "planetRef"]}
  ]
})

> CreateIndex({
  name: "RobotParts_by_factoryRef",
  source: Collection("RobotParts"),
  terms: [
    {field: ["data", "factoryRef"]}
  ]
})
```

Finally, let's create some documents. We'll specify reference ids so the article is easier to follow, but generally you do not need to do that when creating documents.

最後に、いくつかのドキュメントを作成しましょう。記事を読みやすくするために参照 ID を指定しますが、通常、ドキュメントを作成するときに参照 ID を指定する必要はありません。

```javascript
> Create(
  Ref(Collection("Planets"), "1"),
  {
    data: {
      name: "Vulcan"
    }
  }
)
```

```javascript
> Create(
  Ref(Collection("Factories"), "1"),
  {
    data: {
      name: "Robot Corp",
      planetRef: Ref(Collection("Planets"), "1")
    }
  }
)

> Create(
  Ref(Collection("Factories"), "2"),
  {
    data: {
      name: "AGC Industries",
      planetRef: Ref(Collection("Planets"), "1")
    }
  }
)
```

```javascript
> Create(
  Ref(Collection("RobotParts"), "1"),
  {
    data: {
      serial: "Rygen 4",
      factoryRef: Ref(Collection("Factories"), "1"),
      type: "CPU"
    }
  }
)

> Create(
  Ref(Collection("RobotParts"), "2"),
  {
    data: {
      serial: "Zaphire 4",
      factoryRef: Ref(Collection("Factories"), "2"),
      type: "CPU"
    }
  }
)

> Create(
  Ref(Collection("RobotParts"), "3"),
  {
    data: {
      serial: "X92",
      factoryRef: Ref(Collection("Factories"), "1"),
      type: "SENSOR"
    }
  }
)
```

Let's test our indexes to see if everything is working as expected:

インデックスをテストして、すべてが期待どおりに機能しているかどうかを確認しましょう。

```javascript
> Paginate(
  Match(
    Index("Factories_by_planetRef"),
    Ref(Collection("Planets"), "1")
  )
)

{
  data: [
    Ref(Collection("Factories"), "1"),
    Ref(Collection("Factories"), "2")
  ]
}
```

```javascript
> Paginate(
  Match(
    Index("RobotParts_by_factoryRef"),
    Ref(Collection("Factories"), "1")
  )
)

{
  data: [
    Ref(Collection("RobotParts"), "1"),
    Ref(Collection("RobotParts"), "3")
  ]
}
```

# Which robot parts are manufactured on Vulcan?

どのロボット部品がバルカンで製造されていますか？

Without using **Join(),** your first instinct to answer this question might be to do something like this:

Join（）を使用せずに、この質問に答える最初の本能は、次のようなことをすることかもしれません。

```javascript
> Map(
  Paginate(
    Match(
      Index("Factories_by_planetRef"),
      Ref(Collection("Planets"), "1")
    )
  ),
  Lambda(
    "factoryRef",
    Paginate(
      Match(
        Index("RobotParts_by_factoryRef"),
        Var("factoryRef")
      )
    )
  )
)

{
  data: [
    {
      data: [
        Ref(Collection("RobotParts"), "1"),
        Ref(Collection("RobotParts"), "3")
      ]
    },
    {
      data: [Ref(Collection("RobotParts"), "2")]
    }
  ]
}
```

We're first getting all the factories for a given planet. Then, for each factory reference, we're querying the **RobotParts_by_factoryRef** index.

まず、特定の惑星のすべての工場を取得します。次に、ファクトリ参照ごとに、RobotParts_by_factoryRef インデックスをクエリします。

We can get away with this when working with small collections, but the main issue with this approach is that it doesn't scale well.

小さなコレクションで作業する場合はこれを回避できますが、このアプローチの主な問題は、拡張性が低いことです。

What would happen if there were thousands of factories? Well, we'd need to query thousands of indexes to get all the parts for each factory. This can impact performance but also increase our Fauna bill by executing a read operation every time we use **Paginate()** to fetch indexed data.

何千もの工場があったらどうなるでしょうか。各ファクトリのすべてのパーツを取得するには、何千ものインデックスをクエリする必要があります。これはパフォーマンスに影響を与える可能性がありますが、Paginate（）を使用してインデックス付きデータをフェッチするたびに読み取り操作を実行することにより、Faunaの請求額も増加します。

Let's answer the same question but using **Join()** instead:

同じ質問に答えましょうが、代わりに Join（）を使用します。

```javascript
> Paginate(
  Join(
    Match(
      Index("Factories_by_planetRef"),
      Ref(Collection("Planets"), "1")
    ),
    Index("RobotParts_by_factoryRef")
  )
)

{
  data: [
    Ref(Collection("RobotParts"), "1"),
    Ref(Collection("RobotParts"), "2"),
    Ref(Collection("RobotParts"), "3")
  ]
}
```

We'll go into more detail a bit later, but how this works is that **Join()** is using the result of **Match()** to query the **RobotParts_by_factoryRef** index. After that, we're only using **Paginate()** once to fetch data.

後で詳しく説明しますが、これがどのように機能するかは、Join（）が Match（）の結果を使用して RobotParts_by_factoryRef インデックスをクエリしていることです。その後、データをフェッチするために Paginate（）を 1 回だけ使用します。

Note that our results are much cleaner now. Instead of getting nested pages of data we now have exactly the answer to our question: a list of the parts manufactured on Vulcan.

結果がよりクリーンになったことに注意してください。データのネストされたページを取得する代わりに、Vulcan で製造された部品のリストという質問に対する正確な答えが得られました。

As usual, if we wanted to get documents instead of references we could simply use **Map()** with **Get()**:

いつものように、参照の代わりにドキュメントを取得したい場合は、Get（）で Map（）を使用するだけです。

```javascript
> Map(
  Paginate(
    Join(
      Match(
        Index("Factories_by_planetRef"),
        Ref(Collection("Planets"), "1")
      ),
      Index("RobotParts_by_factoryRef")
    )
  ),
  Lambda(
    "robotPartRef",
    Get(Var("robotPartRef"))
  )
)

{
  data: [
    {
      ref: Ref(Collection("RobotParts"), "1"),
      ts: 1603898541205000,
      data: {
        serial: "Rygen 4",
        factoryRef: Ref(Collection("Factories"), "1"),
        type: "CPU"
      }
    },
    {
      ref: Ref(Collection("RobotParts"), "2"),
      ts: 1603898589080000,
      data: {
        serial: "Zaphire 4",
        factoryRef: Ref(Collection("Factories"), "2"),
        type: "CPU"
      }
    },
    {
      ref: Ref(Collection("RobotParts"), "3"),
      ts: 1603898653913000,
      data: {
        serial: "X92",
        factoryRef: Ref(Collection("Factories"), "1"),
        type: "SENSOR"
      }
    }
  ]
}
```

# What is a SetRef ?

SetRef とは何ですか？

To be able to understand what **Join()** does we first need to take a little technical detour.

Join（）が何であるかを理解できるようにするには、最初に少し技術的な回り道をする必要があります。

You've probably seen this type of query multiple times in the documentation, or most of my previous articles:

このタイプのクエリは、ドキュメントまたは以前のほとんどの記事で何度も見たことがあるでしょう。

```javascript
> Paginate(Match(Index("AllTheThings"))
```

Let's examine what's happening here in more detail.

ここで何が起こっているのかをもっと詳しく調べてみましょう。

First, **Index()** returns a reference to an index document. To prove this we can use **Get()** to fetch the actual document of the index:

まず、Index（）はインデックスドキュメントへの参照を返します。これを証明するために、Get（）を使用してインデックスの実際のドキュメントをフェッチできます。

```javascript
> Get(Index("AllTheThings"))

{
  ref: Index("AllTheThings"),
  ts: 1602778923870000,
  active: true,
  serialized: true,
  name: "AllTheThings",
  source: Collection("Things"),
  partitions: 8
}
```

**Match()** still doesn't fetch any data but constructs a [Set](https://docs.fauna.com/fauna/current/api/fql/sets?lang=javascript) and returns a reference to it. This is usually simply called a **SetRef** in the Fauna documentation. Again, we can prove this by making this query:

Match（）はまだデータをフェッチしませんが、Set を作成し、それへの参照を返します。これは通常、Fauna のドキュメントでは単に SetRef と呼ばれています。繰り返しますが、次のクエリを実行することでこれを証明できます。

```javascript
> Match(Index("AllTheThings"))

{
  "@set": {
    match: Index("AllTheThings")
  }
}
```

Finally, **Paginate()** actually returns a page of data. If you think about it, **SetRef** is kinda like a "data recipe" that **Paginate()** uses to do the data-fetching work.

最後に、Paginate（）は実際にデータのページを返します。考えてみれば、SetRef は、Paginate（）がデータフェッチ作業を行うために使用する「データレシピ」のようなものです。

Let's look at our join example again:

結合の例をもう一度見てみましょう。

```javascript
> Paginate(
  Join(
    Match(
      Index("Factories_by_planetRef"),
      Ref(Collection("Planets"), "1")
    ),
    Index("RobotParts_by_factoryRef")
  )
)
```

We can now better understand what's going on here.

ここで何が起こっているのかをよりよく理解できるようになりました。

**Join()** is actually producing a **SetRef** and returning it to **Paginate()**. It is doing that by combining the **SetRef** produced by **Match()** with a reference to an index.

Join（）は実際に SetRef を生成し、それを Paginate（）に返します。これは、Match（）によって生成された SetRef をインデックスへの参照と組み合わせることによって行われます。

# Using Join() with Lambda()

Lambda（）で Join（）を使用する

Instead of using a reference to an index, **Join()** also accepts a lambda function in its second argument. This is useful in a number of scenarios. For example, when we're using indexes that accept multiple filtering terms.

ンデックスへの参照を使用する代わりに、Join（）は 2 番目の引数でラムダ関数も受け入れます。これは、多くのシナリオで役立ちます。たとえば、複数のフィルタリング用語を受け入れるインデックスを使用している場合です。

We've already figured out which parts are manufactured on a given planet. Let's now answer the following question: _Which CPUs are manufactured on Vulcan?_

特定の惑星でどの部品が製造されているかはすでにわかっています。次の質問に答えましょう：どの CPU が Vulcan で製造されていますか？

To answer this we need to create a new index that will allow us to get our parts by factory and also by part type:

これに答えるには、工場ごとおよび部品タイプごとに部品を取得できる新しいインデックスを作成する必要があります。

```javascript
> CreateIndex({
  name: "RobotParts_by_factoryRef_and_type",
  source: Collection("RobotParts"),
  terms: [
    {field: ["data", "factoryRef"]},
    {field: ["data", "type"]}
  ]
})
```

We can now use that index in our join operation with **Lambda()** :

これで、Lambda（）を使用した結合操作でそのインデックスを使用できます。

```javascript
> Paginate(
  Join(
    Match(
      Index("Factories_by_planetRef"),
      Ref(Collection("Planets"), "1")
    ),
    Lambda(
      "factoryRef",
      Match(
        Index("RobotParts_by_factoryRef_and_type"),
        [Var("factoryRef"), "CPU"]
      )
    )
  )
)

{
  data: [
    Ref(Collection("RobotParts"), "1"),
    Ref(Collection("RobotParts"), "2")
  ]
}
```

The **Lambda()** function receives whatever the **Factories_by_planetRef** index is returning. In this case, the references to the factory documents. We're now able to use **Var("factoryRef"), "CPU"** with our second index to filter by factory and part type.

ラムダ（）関数は、どんな受信 Factories_by_planetRef のインデックスが戻っています。この場合、ファクトリドキュメントへの参照。これで、Var（ "factoryRef"）、 "CPU"を 2 番目のインデックスとともに使用して、ファクトリとパーツタイプでフィルタリングできるようになりました。

**Lambda()** is also helpful when our first index returns an array of sorted values. Let's create an index that returns the name and reference of the **Factories** documents:

Lambda（）は、最初のインデックスがソートされた値の配列を返す場合にも役立ちます。工場のドキュメントの名前と参照を返すインデックスを作成しましょう。

```javascript
> CreateIndex({
  name: "Factories_by_planetRef_sorted_name",
  source: Collection("Factories"),
  values: [
    {field: ["data", "name"]},
    {field: ["ref"]}
  ],
  terms: [
    {field: ["data", "planetRef"]}
  ]
})
```

Let's query the index to see what it returns when passing the reference of the Vulcan planet:

バルカン惑星の参照を渡すときに何が返されるかを確認するために、インデックスをクエリしてみましょう。

```javascript
> Paginate(
  Match(
    Index("Factories_by_planetRef_sorted_name"),
    Ref(Collection("Planets"), "1")
  )
)

{
  data: [
    ["AGC Industries", Ref(Collection("Factories"), "2")],
    ["Robot Corp", Ref(Collection("Factories"), "1")]
  ]
}
```

As expected, for each result we're now getting an array of values instead of a document reference.

予想どおり、各結果について、ドキュメント参照の代わりに値の配列を取得しています。

Let's now use **Lambda()** to extract the reference for our join operation:

Lambda（）を使用して、結合操作の参照を抽出してみましょう。

```javascript
> Paginate(
  Join(
    Match(
      Index("Factories_by_planetRef_sorted_name"),
      Ref(Collection("Planets"), "1")
    ),
    Lambda(
      ["name", "factoryRef"],
      Match(
        Index("RobotParts_by_factoryRef"),
        Var("factoryRef")
      )
    )
  )
)

{
  data: [
    Ref(Collection("RobotParts"), "1"),
    Ref(Collection("RobotParts"), "2"),
    Ref(Collection("RobotParts"), "3")
  ]
}
```

# Using multiple joins

複数の結合を使用する

If you've been wondering, yes we can combine multiple joins to answer even more complex questions. While a bit verbose at times, FQL is extremely flexible and powerful.

疑問に思っている場合は、はい、複数の結合を組み合わせて、さらに複雑な質問に答えることができます。時々少し冗長ですが、FQL は非常に柔軟で強力です。

Let's answer this question: _Which robots use CPUs that are manufactured on Vulcan?_

この質問に答えましょう：バルカンで製造された CPU を使用しているロボットはどれですか？

It's now time to finally create our robots from our initial data model:

いよいよ、最初のデータモデルからロボットを作成します。

```javascript
> CreateCollection({
  name: "Robots"
})
```

```javascript
> CreateIndex({
  name: "Robots_by_part",
  source: Collection("Robots"),
  terms: [
    {field: ["data", "partRefs"]}
  ]
})
```

```javascript
> Create(
  Ref(Collection("Robots"), "1"),
  {
    data: {
      model: "Z3P0",
      partRefs: [
        Ref(Collection("RobotParts"), "1"),
        Ref(Collection("RobotParts"), "3")
      ]
    }
  }
)
```

Let's test our index to see what it returns:

インデックスをテストして、何が返されるかを確認しましょう。

```javascript
> Paginate(
  Match(
    Index("Robots_by_part"),
    Ref(Collection("RobotParts"), "1")
  )
)

{
  data: [Ref(Collection("Robots"), "1")]
}
```

As you can see, even though **partRefs** in the robot document is an array, Fauna is smart enough to look for the filtering term inside the array instead of comparing the whole array.

ご覧のとおり、ロボットドキュメントの partRef は配列ですが、Fauna は、配列全体を比較するのではなく、配列内のフィルタリング用語を探すのに十分なほど賢いです。

We're now ready to combine the previous join (which returned a list of part references manufactured in a planet) with a new one that returns a list of robots:

これで、以前の結合（惑星で製造されたパーツ参照のリストを返した）を、ロボットのリストを返す新しい結合と組み合わせる準備ができました。

```javascript
> Map(
  Paginate(
    Join(
      Join(
        Match(
          Index("Factories_by_planetRef"),
          Ref(Collection("Planets"), "1")
        ),
        Lambda(
          "factoryRef",
          Match(
            Index("RobotParts_by_factoryRef_and_type"),
            [Var("factoryRef"), "CPU"]
          )
        )
      ),
      Index("Robots_by_part")
    )
  ),
  Lambda(
    "robotRef",
    Get(Var("robotRef"))
  )
)

{
  data: [
    {
      ref: Ref(Collection("Robots"), "1"),
      ts: 1603899351476000,
      data: {
        model: "Z3P0",
        partRefs: [
          Ref(Collection("RobotParts"), "1"),
          Ref(Collection("RobotParts"), "3")
        ]
      }
    }
  ]
}
```

# Using Join() with Range()

Range（）で Join（）を使用する

**Join()** can also be useful in certain scenarios where we want to combine and/or intersect the results of **Range()** over different indexes of the same collection.

Join（）は、同じコレクションの異なるインデックスで Range（）の結果を結合または交差させたい特定のシナリオでも役立ちます。

In case you didn't read it, we explored how to use **Range()** in a [previous article](https://fauna.com/blog/core-fql-concepts-part-4-range-queries-and-advanced-filtering).

読んでいない方のために、前回の記事で Range（）の使用方法を説明しました。

To test this let's create a new collection and some documents:

これをテストするために、新しいコレクションといくつかのドキュメントを作成しましょう。

```javascript
> CreateCollection({
  name: "Spaceships"
})
```

```javascript
> Create(
  Ref(Collection("Spaceships"), "1"),
  {
    data: {
      name: "Interceptor",
      maxSpeed: 20,
      weight: 100
    }
  }
)

> Create(
  Ref(Collection("Spaceships"), "2"),
  {
    data: {
      name: "Explorer",
      maxSpeed: 10,
      weight: 200
    }
  }
)

> Create(
  Ref(Collection("Spaceships"), "3"),
  {
    data: {
      name: "Transporter",
      maxSpeed: 5,
      weight: 1000
    }
  }
)
```

First, let's create an index to be able to run a range query involving each ship’s **maxSpeed** field:

まず、各船の maxSpeed フィールドを含む範囲クエリを実行できるようにインデックスを作成しましょう。

```javascript
> CreateIndex({
  name: "Spaceships_by_maxSpeed",
  source: Collection("Spaceships"),
  values: [
    {field: ["data", "maxSpeed"]},
    {field: ["ref"]}
  ]
})
```

We can now execute a range query with this index to get the spaceships up to **15** of **maxSpeed**:

これで、このインデックスを使用して範囲クエリを実行し、最大 15 の maxSpeed の宇宙船を取得できます。

```javascript
> Paginate(
  Range(Match(Index("Spaceships_by_maxSpeed")), [], [15])
)

{
  data: [
    [5, Ref(Collection("Spaceships"), "3")],
    [10, Ref(Collection("Spaceships"), "2")]
  ]
}
```

Let's create a second index to be able to execute range queries over the **weight** field:

重みフィールドに対して範囲クエリを実行できるように、2 番目のインデックスを作成しましょう。

```javascript
> CreateIndex({
  name: "Spaceships_by_weight",
  source: Collection("Spaceships"),
  values: [
    {field: ["data", "weight"]},
    {field: ["ref"]}
  ]
})
```

And this is how we'd get all the spaceships up to **500** of **weight** :

そして、これは、我々はまでのすべての宇宙船を取得したい方法です 500 の重量：

```
Paginate(
  Range(Match(Index("Spaceships_by_weight")), [], [500])
)

{
  data: [
    [100, Ref(Collection("Spaceships"), "1")],
    [200, Ref(Collection("Spaceships"), "2")]
  ]
}
```

If we now wanted to know which ships have up to **15** of **maxSeed** and also weight up to **500** we could use [Intersection()](https://docs.fauna.com/fauna/current/api/fql/functions/intersection?lang=javascript) like we saw [in a previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2):

maxSeed が最大 15 で、重量が最大 500 の船を知りたい場合は、前の記事で見たように Intersection（）を使用できます。

```javascript
> Paginate(
  Intersection(
    Range(Match(Index("Spaceships_by_maxSpeed")), [], [15]),
    Range(Match(Index("Spaceships_by_weight")), [], [500])
  )
)

{
  data: []
}
```

Huh? How come we're not getting anything?

え？どうして何も得られないのですか？

The problem is that **Intersection()** is trying to compare two different sets of results returned by our two indexes. Since these results don't really match, it concludes there is no overlapping data.

問題は、Intersection（）が 2 つのインデックスによって返される 2 つの異なる結果セットを比較しようとしていることです。これらの結果は実際には一致しないため、重複するデータはないと結論付けます。

Here's a neat trick. We can use **Join()** to solve this problem by extracting the reference in each case by using a helper index.

これが巧妙なトリックです。ヘルパーインデックスを使用してそれぞれの場合に参照を抽出することにより、Join（）を使用してこの問題を解決できます。

```javascript
> CreateIndex({
  name: "Spaceship_by_ref",
  source: Collection("Spaceships"),
  terms: [
    {field: ["ref"]}
  ]
})
```

We can now do this:

これを行うことができます：

```javascript
> Paginate(
  Intersection(
    Join(
      Range(Match(Index("Spaceships_by_maxSpeed")), [], [15]),
      Lambda(
        ["maxSpeed", "ref"],
        Match(
          Index("Spaceship_by_ref"),
          Var("ref")
        )
      )
    ),
    Join(
      Range(Match(Index("Spaceships_by_weight")), [], [500]),
      Lambda(
        ["weight", "ref"],
        Match(
          Index("Spaceship_by_ref"),
          Var("ref")
        )
      )
    )
  )
)

{
  data: [Ref(Collection("Spaceships"), "2")]
}
```

We're using the results of our range queries with **Join()** and our **Spaceship_by_ref** helper index to produce two sets of references from the **Spaceships** collection. These references can then be intersected to determine which ships satisfy all our conditions, in this case our Explorer ship. All in one read operation!

Join（）と Spaceship_by_ref ヘルパーインデックスを使用した範囲クエリの結果を使用して、Spaceships コレクションから 2 セットの参照を生成しています。次に、これらの参照を交差させて、どの船がすべての条件を満たすかを判断できます。この場合は、エクスプローラー船です。オールインワンの読み取り操作！

# Replicating SQL joins in FQL

FQL での SQL 結合の複製

Fauna is so inherently different from relational SQL databases it doesn't make sense to try to directly replicate SQL queries in idiomatic FQL. We can, however, answer the same questions.

Faunaは、リレーショナル SQL データベースとは本質的に異なるため、慣用的な FQL で SQL クエリを直接複製しようとしても意味がありません。ただし、同じ質問に答えることはできます。

Let's see a simple example. Imagine we had a **Mechanics** table and a **Tools** table and we executed this query:

簡単な例を見てみましょう。私たちが持っていたと想像力学のテーブルやツールのテーブルを、我々は、このクエリを実行：

```plsql
SELECT * FROM Mechanics INNER JOIN Tools ON Mechanics.toolId = Tools.id WHERE Mechanics.toolId NOT NULL;
```

In plain English this query says: _Find all the mechanics that have a_ **_toolId_**_, and then return the data of these mechanics and their tool_.

平易な英語では、このクエリは次のように述べています。toolId を持つすべてのメカニズムを検索し、 これらのメカニズムとそのツールのデータを返します。

To replicate this in Fauna let's create this model where each Mechanic has a Tool:

これをFaunaで複製するために、各メカニックがツールを持っているこのモデルを作成しましょう。

![Core-FQL-pt-5-2](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5QHkfW8gRenHM0wtIMUoHg/d7bdc021cd2b3db68fb19a92071bae80/Core-FQL-pt-5-2.png)

```javascript
> CreateCollection({
  name: "Tools"
})
```

```javascript
> Create(
  Ref(Collection("Tools"), "1"),
  {
    data: {
      name: "Laser cutter"
    }
  }
)

> Create(
  Ref(Collection("Tools"), "2"),
  {
    data: {
      name: "Robo wrench"
    }
  }
)
```

```javascript
>  CreateCollection({
  name: "Mechanics"
})
```

```javascript
> Create(
  Ref(Collection("Mechanics"), "1"),
  {
    data: {
      name: "Anna Laser",
      toolRef: Ref(Collection("Tools"), "1")
    }
  }
)

> Create(
  Ref(Collection("Mechanics"), "2"),
  {
    data: {
      name: "Johnny Sparkles",
      toolRef: Ref(Collection("Tools"), "2")
    }
  }
)
```

## Find all the mechanics that do have a tool

ツールを持っているすべてのメカニズムを見つける

If we wanted to know which documents in the **Mechanics** collection have the **toolRef** field, we could use a simple index combined with a filter.

Mechanics コレクション内のどのドキュメントに toolRef フィールドがあるかを知りたい場合は、フィルターと組み合わせた単純なインデックスを使用できます。

To test this out we're obviously going to need at least one mechanic without a **toolRef**:

これをテストするには、明らかにツールなしで少なくとも 1 人のメカニックが必要になります Ref：

```javascript
> Create(
  Ref(Collection("Mechanics"), "3"),
  {
    data: {
      name: "Peter No Tool"
    }
  }
)
```

Now, let's create an index with some values:

それでは、いくつかの値を使用してインデックスを作成しましょう。

```javascript
> CreateIndex({
    name: "Mechanics_with_toolRef_name",
    source: Collection("Mechanics"),
    values: [
      {field: ["data", "name"]},
      {field: ["data", "toolRef"]},
      {field: ["ref"]}
    ]
})
```

If we query this index we'll see that **Peter No Tool** is right there with a **null** in the **toolRef** value:

私たちは、このインデックスを照会した場合、私たちはいることがわかりますピーター特別な工具がで右があるヌルで toolRef の値：

```javascript
> Paginate(
  Match(
    Index("Mechanics_with_toolRef_name")
  )
)

{
  data: [
    [
      "Anna Laser",
      Ref(Collection("Tools"), "1"),
      Ref(Collection("Mechanics"), "1")
    ],
    [
      "Johnny Sparkles",
      Ref(Collection("Tools"), "2"),
      Ref(Collection("Mechanics"), "2")
    ],
    [
      "Peter No Tool",
      null,
      Ref(Collection("Mechanics"), "3")
    ]
  ]
}
```

We can simply filter him out by checking that the **toolRef** value is indeed a reference using the [IsRef()](https://docs.fauna.com/fauna/current/api/fql/functions/isref?lang=javascript) function:

ToolRef 値が実際に IsRef（）関数を使用して参照であることを確認することで、彼を簡単に除外できます。

```javascript
> Paginate(
  Filter(
    Match(Index("Mechanics_with_toolRef_name")),
    Lambda(
      ["name", "toolRef", "ref"],
      IsRef(Var("toolRef"))
    )
  )
)

{
  data: [
    [
      "Anna Laser",
      Ref(Collection("Tools"), "1"),
      Ref(Collection("Mechanics"), "1")
    ],
    [
      "Johnny Sparkles",
      Ref(Collection("Tools"), "2"),
      Ref(Collection("Mechanics"), "2")
    ]
  ]
}
```

## Getting the mechanics and their tool

力学とそのツールの入手

Ok, we now have filtered the mechanics that do have a **toolRef**. How can we get both the mechanic and tool data at the same time?

さて、toolRef を持っているメカニズムをフィルタリングしました。メカニックとツールの両方のデータを同時に取得するにはどうすればよいですか？

It's really is as simple as iterating the index results with **Map()** and returning a custom object:

Map（）でインデックスの結果を繰り返し、カスタムオブジェクトを返すのと同じくらい簡単です。

```javascript
> Map(
  Paginate(
    Filter(
      Match(Index("Mechanics_with_toolRef_name")),
      Lambda(
        ["name", "toolRef", "ref"],
        IsRef(Var("toolRef"))
      )
    )
  ),
  Lambda(
    ["name", "toolRef", "ref"],
    {
      mechanicDoc: Get(Var("ref")),
      toolDoc: Get(Var("toolRef"))
    }
  )
)

{
  data: [
    {
      mechanicDoc: {
        ref: Ref(Collection("Mechanics"), "1"),
        ts: 1603900312780000,
        data: {
          name: "Anna Laser",
          toolRef: Ref(Collection("Tools"), "1")
        }
      },
      toolDoc: {
        ref: Ref(Collection("Tools"), "1"),
        ts: 1603900232020000,
        data: {
          name: "Laser cutter"
        }
      }
    },
    {
      mechanicDoc: {
        ref: Ref(Collection("Mechanics"), "2"),
        ts: 1603900351375000,
        data: {
          name: "Johnny Sparkles",
          toolRef: Ref(Collection("Tools"), "2")
        }
      },
      toolDoc: {
        ref: Ref(Collection("Tools"), "2"),
        ts: 1603900270177000,
        data: {
          name: "Robo wrench"
        }
      }
    }
  ]
}
```

# Conclusion

結論

This is it. We've reached the fifth and final article in the Core FQL series. If you've made it this far, thanks reading. As always, I hope you learned something valuable!

これだよ。CoreFQL シリーズの 5 番目で最後の記事に到達しました。ここまで進んだら、読んでくれてありがとう。いつものように、あなたが何か価値のあることを学んだことを願っています！

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
