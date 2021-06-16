Core FQL concepts part 4: Range queries and advanced filtering
https://fauna.com/blog/core-fql-concepts-part-4-range-queries-and-advanced-filtering

# Core FQL concepts part 4: Range queries and advanced filtering

FQL のコアコンセプトパート 4：範囲クエリと高度なフィルタリング

Pier Bover|Oct 22nd, 2020|

2020 年 10 月 22 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

I briefly introduced [Range()](https://docs.fauna.com/fauna/current/api/fql/functions/range?lang=javascript) in [a previous article](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times) and, as promised, we're going to take a deeper look at it today.

前回の記事で Range（）を簡単に紹介しましたが、約束どおり、今日はさらに詳しく見ていきます。

- [Part 1: Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- [Part 2: Temporality in Fauna](https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb)
- [Part 3: Data Aggregation](https://fauna.com/blog/core-fql-concepts-part-3-data-aggregation)
- Part 4: Range queries

パート 1：日付と時刻の操作
パート 2：動物相のテンポラリティ
パート 3：データ集約
パート 4：範囲クエリ

This series assumes that you have a grasp on the basics. If you're new to Fauna and/or FQL here's [my introductory series on FQL](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1).

このシリーズは、基本を理解していることを前提としています。動物相や FQL を初めて使用する場合は、FQL の紹介シリーズをご覧ください。

## In this article:

今回の記事

- Introduction to range queries
- Multi-items boundaries
- Range and then filter
- Index and then range
- Combine indexes
- Range with index bindings

範囲クエリの概要
複数アイテムの境界
範囲とフィルター
インデックスを付けてから範囲
インデックスを組み合わせる
インデックスバインディングのある範囲

# Introduction to range queries

範囲クエリの概要

The idea of range queries is to be able to filter results by providing two boundaries, expressed as start and end values. Since Fauna needs to be able to compare values to determine when a result should be included, these boundaries have to be scalar values such as numbers, strings, or dates, but not other [FQL types](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript) such as booleans.

範囲クエリの考え方は、開始値と終了値として表される 2 つの境界を提供することにより、結果をフィルタリングできるようにすることです。動物相は、結果を含めるタイミングを決定するために値を比較できる必要があるため、これらの境界は、数値、文字列、日付などのスカラー値である必要がありますが、ブール値などの他の FQL タイプである必要はありません。

Let's create some data to see how **Range()** works:

Range（）がどのように機能するかを確認するために、いくつかのデータを作成してみましょう。

```javascript
> CreateCollection({
  name: "Alphabet"
})
```

And let's add some documents with a **Map()** :

そして、Map（）を使用していくつかのドキュメントを追加しましょう：

```javascript
> Map(
  [
    {letter: "A", position: 1},
    {letter: "B", position: 2},
    {letter: "C", position: 3},
    {letter: "D", position: 4},
    {letter: "E", position: 5},
    {letter: "F", position: 6},
    {letter: "G", position: 7},
    {letter: "H", position: 8},
    {letter: "I", position: 9},
    {letter: "J", position: 10}
  ],
  Lambda(
    "data",
    Create(
      Collection("Alphabet"),
      {data: Var("data")}
    )
  )
)
```

We're also going to need an index to be able to query our documents:

また、ドキュメントをクエリできるようにするためのインデックスも必要になります。

```javascript
> CreateIndex({
    name: "Alphabet_by_letter_position",
    source: Collection("Alphabet"),
    values: [
      {field: ['data', 'letter']},
      {field: ['data', 'position']}
    ]
})
```

Do note that we've configured the index to return some values. **Range()** needs those values to be able to compare them with the boundaries. Check the [CreateIndex()](https://docs.fauna.com/fauna/current/api/fql/functions/createindex?lang=javascript) docs for more info on the **values** field.

一部の値を返すようにインデックスを構成していることに注意してください。Range（）は、それらの値を境界と比較できるようにするためにそれらの値を必要とします。値フィールドの詳細については、CreateIndex（）ドキュメントを確認してください。

By default, this is what our index returns:

デフォルトでは、これはインデックスが返すものです。

```javascript
> Paginate(Match(Index("Alphabet_by_letter_position")))

{
  data: [
    ["A", 1],
    ["B", 2],
    ["C", 3],
    ["D", 4],
    ["E", 5],
    ["F", 6],
    ["G", 7],
    ["H", 8],
    ["I", 9],
    ["J", 10]
  ]
}
```

We're now ready to make our first range query. For each boundary, **Range()** accepts either a single scalar value or an array. Let's use these the single values of **A** and **E** for now:

これで、最初の範囲クエリを作成する準備が整いました。Range（）は、境界ごとに、単一のスカラー値または配列のいずれかを受け入れます。今のところ、これらの A と E の単一の値を使用しましょう。

```javascript
>  Paginate(
  Range(
    Match(Index("Alphabet_by_letter_position")),
    "A",
    "E"
  )
)

{
  data: [
    ["A", 1],
    ["B", 2],
    ["C", 3],
    ["D", 4],
    ["E", 5]
  ]
}
```

As we can see, **Range()** has filtered the results that fall within the defined boundaries by comparing the start and end values with the first item of each result.

ご覧のとおり、Range（）は、開始値と終了値を各結果の最初の項目と比較することにより、定義された境界内にある結果をフィルタリングしました。

![core-fql-4-1](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3crWb3tSdHaDN8swbm7Qv4/ef325d921377c8e2342c541825337b45/core-fql-4-1.png)

Because the string **"A"** is superior or equal to the start value of **"A"** then **"A", 1** is included in the results. Likewise, because the string **"F"** is superior to the end value of **"E"** then **"F", 6** is not included in the results.

文字列「A」は「A」、次に「A」の開始値以上であるため、結果には 1 が含まれます。同様に、文字列「F」は「E」、次に「F」の終了値よりも優れているため、6 は結果に含まれません。

Instead of a single value for the boundaries, we could also use an array with a single item. The result would be the same:

境界の単一の値の代わりに、単一のアイテムを持つ配列を使用することもできます。結果は同じになります。

```javascript
>  Paginate(
  Range(
    Match(Index("Alphabet_by_letter_position")),
    ["A"],
    ["E"]
  )
)

{
  data: [
    ["A", 1],
    ["B", 2],
    ["C", 3],
    ["D", 4],
    ["E", 5]
  ]
}
```

It's also possible to use an empty array to tell Fauna to use the first or last result as start or end values, respectively, for the boundaries. In this case we'll get everything between the first result up to **"C"**:

空の配列を使用して、境界の開始値または終了値としてそれぞれ最初または最後の結果を使用するように Fauna に指示することもできます。この場合、最初の結果から「C」までのすべてを取得します。

```javascript
> Paginate(
  Range(
    Match(Index("Alphabet_by_letter_position")),
    [],
    "C"
  )
)

{
  data: [
    ["A", 1],
    ["B", 2],
    ["C", 3]
  ]
}
```

# Multi-item boundaries

複数アイテムの境界

An interesting aspect of **Range()** is that we can use an array with multiple values for our boundaries. The results might not be what you're expecting though!

Range（）の興味深い側面は、境界に複数の値を持つ配列を使用できることです。結果はあなたが期待しているものではないかもしれません！

See this example:

この例を参照してください。

```javascript
> Paginate(
  Range(
    Match(Index("Alphabet_by_letter_position")),
    ["A", 3],
    ["G", 4]
  )
)

{
  data: [
    ["B", 2],
    ["C", 3],
    ["D", 4],
    ["E", 5],
    ["F", 6]
  ]
}
```

The first time I ran that query I was confused since I expected each item in the start/end arrays to act as its own range filter, so to speak, but that's not how **Range()** works.

初めてそのクエリを実行したとき、開始/終了配列の各項目が、いわば独自の範囲フィルターとして機能することを期待していたため、混乱しましたが、それは Range（）の動作方法ではありません。

Each start/end array is actually used as a single value to determine which results are superior or inferior.

各開始/終了配列は、実際には、どの結果が優れているか劣っているのかを判断するための単一の値として使用されます。

![core-fql-4-2](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7wllDq4SWzHugVos5Yccnj/0d3461d7fa3e4ddca0ec0d6747090b66/core-fql-4-2.png)

As you can see, Fauna considers **"F", 6** to be inferior to the upper limit of **"G", 4**, but how does that work?

ご覧のとおり、動物相は「F」6 が「G」4 の上限よりも劣っていると見なしていますが、それはどのように機能しますか？

Think of it this way. If you were sorting strings alphabetically, which one would come first: **"A8"** or **"Z1"**? Obviously **"A8"** because **A** comes before **Z**, right? Since the first character has the highest priority when sorting we don't care about the second one to determine which string comes first.

このように考えてください。文字列をアルファベット順に並べ替える場合、最初に来るのは「A8」と「Z1」のどちらですか。明らかに「A8」ので、A が前に来る Z、右？ソート時には最初の文字が最も優先されるため、2 番目の文字を気にせずに最初に来る文字列を決定します。

This also explains why Fauna considers **"G", 7** to be superior to **"G", 4** and excludes it from the results. The first item is the same (the string **"G"**) so only the second item affects the comparison.

これはまた、動物相が「G」7 を「G」4 よりも優れていると見なし、結果から除外する理由を説明しています。最初の項目は同じ（文字列"G"）であるため、2 番目の項目のみが比較に影響します。

Let's see another example. Imagine we had a collection of people with their age and name and we had an index that returned these results:

別の例を見てみましょう。年齢と名前を持つ人々のコレクションがあり、これらの結果を返すインデックスがあると想像してください。

```javascript
> Paginate(Match(Index("People_by_age_name")))

{
  data: [
    [27, "Alex"],
    [33, "Abigail"],
    [39, "Adam"],
    [41, "Pier"],
    [50, "Anna"],
    [64, "Charles"]
  ]
}
```

If we now wanted to get all the people between **30** and **60** we could execute the following query:

私たちは今の間のすべての人々を取得したい場合は 30 と 60、私たちは、次のクエリを実行できます。

```javascript
> Paginate(
  Range(
    Match(Index("People_by_age_name")),
    30, 60
  )
)

{
  data: [
    [33, "Abigail"],
    [39, "Adam"],
    [41, "Pier"],
    [50, "Anna"]
  ]
}
```

So far so good.

ここまでは順調ですね。

What if we now wanted to refine those results and get the names between **A** and **B**?

これらの結果を絞り込み、A と B の間の名前を取得したい場合はどうなりますか？

We wouldn't be able to use **Range()** to solve this for the reasons I explained before:

前に説明した理由により、Range（）を使用してこれを解決することはできません。

```javascript
> Paginate(
  Range(
    Match(Index("People_by_age_name")),
    [30, "A"],
    [60, "B"]
  )
)

{
  data: [
    [33, "Abigail"],
    [39, "Adam"],
    [41, "Pier"],
    [50, "Anna"]
  ]
}
```

Even though the string **"Pier"** obviously comes after the string **"B"**, Fauna is only taking the age into consideration to determine that **41, "Pier"** is inferior to the upper bound of **60, "B"**.

文字列「Pier」は明らかに文字列「B」の後にありますが、動物相は年齢のみを考慮して、41「Pier」が上限の 60「B」より劣っていると判断しています。

![core-fql-4-3](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/10YF67sYKfzSNo3tVx8ErW/4a52848f3aa510be221d6375730ac182/core-fql-4-3.png)

# Range and then filter

範囲とフィルター

So how would we actually get all the people between **30** and **60** but also with names between **"A"** and **"B"**?

だから、どのように我々は、実際の間のすべての人になるだろう 30 と 60 の間の名前でもを「A」と「B」？

The solution is to simply iterate over the results of **Range()** and then express any needed condition using FQL:

解決策は、Range（）の結果を単純に反復し、FQL を使用して必要な条件を表現することです。

```javascript
> Paginate(
  Filter(
    Range(
      Match(Index("People_by_age_name")),
      [30],
      [60]
    ),
    Lambda(
      ["age", "name"],
      And(
        GTE(Var("name"), "A"),
        LTE(Var("name"), "B"),
      )
    )
  )
)

{
  data: [
    [33, "Abigail"],
    [39, "Adam"],
    [50, "Anna"]
  ]
}
```

Here we're using [GTE()](https://docs.fauna.com/fauna/current/api/fql/functions/gte?lang=javascript) (greater than or equal) and [LTE()](https://docs.fauna.com/fauna/current/api/fql/functions/lte?lang=javascript) (less than or equal) to compare the name and making sure both conditions return **true** with [And()](https://docs.fauna.com/fauna/current/api/fql/functions/and?lang=javascript).

ここでは、GTE（）（以上）と LTE（）（以下）を使用して名前を比較し、And（）で両方の条件が true を返すことを確認しています。

We could refine this query even further by, for example, only listing people that also have an **"n"** or an **"i"** in their names:

たとえば、名前に「n」または「i」が含まれているユーザーのみをリストすることで、このクエリをさらに絞り込むことができます。

```javascript
>  Paginate(
  Filter(
    Range(
      Match(Index("People_by_age_name")),
      [30],
      [60]
    ),
    Lambda(
      ["age", "name"],
      And(
        GTE(Var("name"), "A"),
        LTE(Var("name"), "B"),
        Or(
          ContainsStr(Var("name"), "n"),
          ContainsStr(Var("name"), "i")
        )
      )
    )
  )
)

{
  data: [
    [33, "Abigail"],
    [50, "Anna"]
  ]
}
```

[ContainsStr()](https://docs.fauna.com/fauna/current/api/fql/functions/containsstr?lang=javascript) will return **true** when a string contains the string defined in its second parameter, in this case an **"n"** or an **"i"**.

containsStr （）は、文字列に 2 番目のパラメータ（この場合は「n」または「i」）で定義された文字列が含まれている場合に true を返します。

These conditions can be as complex as you need them, we're really just scratching the surface. Here are some useful FQL functions you should check out to compare values and express conditions:

これらの条件は、必要に応じて複雑になる可能性があります。実際には、表面を傷つけているだけです。値を比較して条件を表現するためにチェックする必要があるいくつかの便利な FQL 関数を次に示します。

- [And()](https://docs.fauna.com/fauna/current/api/fql/functions/and?lang=javascript)
- [Any()](https://docs.fauna.com/fauna/current/api/fql/functions/any?lang=javascript)
- [Or()](https://docs.fauna.com/fauna/current/api/fql/functions/or?lang=javascript)
- [Equal()](https://docs.fauna.com/fauna/current/api/fql/functions/equal?lang=javascript)
- [GT()](https://docs.fauna.com/fauna/current/api/fql/functions/gt?lang=javascript) (greater than)
- [GTE()](https://docs.fauna.com/fauna/current/api/fql/functions/gte?lang=javascript) (greater than or equal)
- [LT()](https://docs.fauna.com/fauna/current/api/fql/functions/lt?lang=javascript) (less than)
- [LTE()](https://docs.fauna.com/fauna/current/api/fql/functions/lte?lang=javascript) (less than or equal)
- [ContainsStr()](https://docs.fauna.com/fauna/current/api/fql/functions/containsstr?lang=javascript)
- [ContainsStrRegex()](https://docs.fauna.com/fauna/current/api/fql/functions/containsstrregex?lang=javascript)
- [ContainsValue()](https://docs.fauna.com/fauna/current/api/fql/functions/containsvalue?lang=javascript)

そして（）
どれか（）
または（）
等しい（）
GT（）（より大きい）
GTE（）（以上）
LT（）（未満）
LTE（）（以下）
containsStr（）
含む StrRegex（）
containsValue（）

# Index and then range

インデックスを付けてから範囲

So far, in this article we've only used indexes that return all of the documents in a collection and then filtered those results using **Range()**. We can of course use indexes with terms that already select a number of documents before filtering with a range.

これまでのところ、この記事では、コレクション内のすべてのドキュメントを返すインデックスのみを使用し、Range（）を使用してそれらの結果をフィルタリングしました。もちろん、範囲でフィルタリングする前に、すでにいくつかのドキュメントを選択している用語でインデックスを使用することもできます。

Let's create a new collection:

新しいコレクションを作成しましょう：

```javascript
> CreateCollection({
  name: "RobotRepairs"
})
```

And an index that allows us to filter by **type** and also provide the necessary terms to be able to use **Range()** :

また、タイプでフィルタリングし、Range（）を使用できるようにするために必要な用語を提供できるインデックス：

```javascript
> CreateIndex({
  name: "RobotRepairs_startTs_endTs_type_by_type",
  source: Collection("RobotRepairs"),
  values: [
    {field: ["data", "startTs"]},
    {field: ["data", "endTs"]},
    {field: ["data", "type"]},
    {field: ["ref"]}
  ],
  terms: [
    {field: ["data", "type"]}
  ]
})
```

Now, let's also insert a couple of documents with this format:

それでは、次の形式のドキュメントもいくつか挿入してみましょう。

```javascript
> Create(
  Collection("RobotRepairs"),
  {
    data: {
      startTs: Time("2020-09-25T10:00:00Z"),
      endTs: Time("2020-09-27T18:00:00Z"),
      type: "CPU_REPLACE"
    }
  }
)
```

This is what this index returns when filtering by **"CPU_REPLACE"** :

これは、「CPU_REPLACE」でフィルタリングしたときにこのインデックスが返すものです。

```javascript
> Paginate(
  Match(
    Index("RobotRepairs_startTs_endTs_type_by_type"),
    "CPU_REPLACE"
  )
)

{
  data: [
    [
      Time("2020-09-22T11:00:00Z"),
      Time("2020-09-23T13:00:00Z"),
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278203011981902355")
    ],
    [
      Time("2020-09-25T10:00:00Z"),
      Time("2020-09-27T18:00:00Z"),
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278203042867708435")
    ],
    [
      Time("2020-10-01T17:00:00Z"),
      Time("2020-10-01T19:00:00Z"),
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278202807195009555")
    ]
  ]
}
```

So now, we could first filter by repair type, and then use **Range()** to only get the repairs done between two timestamps:

これで、最初に修復タイプでフィルタリングし、次に Range（）を使用して、2 つのタイムスタンプの間にのみ修復を実行できます。

```javascript
> Paginate(
  Range(
    Match(
      Index("RobotRepairs_startTs_endTs_type_by_type"),
      "CPU_REPLACE"
    ),
    [
      Time("2020-10-01T00:00:00Z"),
      Time("2020-10-01T00:00:00Z")
    ],
    [
      Time("2020-10-02T00:00:00Z"),
      Time("2020-10-02T00:00:00Z")
    ]
  )
)

{
  data: [
    [
      Time("2020-10-01T17:00:00Z"),
      Time("2020-10-01T19:00:00Z"),
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278202807195009555")
    ]
  ]
}
```

To get actual documents instead of arrays with values, we'd need to use **Map()** with **Lambda()** and **Get()** :

値を持つ配列の代わりに実際のドキュメントを取得するには、Lambda（）および Get（）で Map（）を使用する必要があります。

```javascript
> Map(
  Paginate(
    Range(
      Match(
        Index("RobotRepairs_startTs_endTs_type_by_type"),
        "CPU_REPLACE"
      ),
      [
        Time("2020-10-01T00:00:00Z"),
        Time("2020-10-01T00:00:00Z")
      ],
      [
        Time("2020-10-02T00:00:00Z"),
        Time("2020-10-02T00:00:00Z")
      ]
    )
  ),
  Lambda(
    ["startTs", "endTs", "type", "ref"],
    Get(Var("ref"))
  )
)

{
  data: [
    {
      ref: Ref(Collection("RobotRepairs"), "278202807195009555"),
      ts: 1601580160340000,
      data: {
        startTs: Time("2020-10-01T17:00:00Z"),
        endTs: Time("2020-10-01T19:00:00Z"),
        type: "CPU_REPLACE"
      }
    }
  ]
}
```

# Range with index bindings

インデックスバインディングのある範囲

In [a previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2), we learned about index bindings, which are pre-computed values on index results.

では前の記事、私たちはインデックスの結果について事前に計算された値であり、インデックス・バインディング、学びました。

Let's create a new index, that returns the duration of each repair, using a binding for a particular repair type:

特定の修復タイプのバインディングを使用して、各修復の期間を返す新しいインデックスを作成しましょう。

```javascript
>  CreateIndex({
  name: "RobotRepairs_duration_type_by_type",
  source: {
    collection: Collection("RobotRepairs"),
    fields: {
      durationMinutes: Query(
        Lambda("doc",
          TimeDiff(
            Select(["data", "startTs"], Var("doc")),
            Select(["data", "endTs"], Var("doc")),
            "minutes"
          )
        )
      )
    }
  },
  values: [
    {binding: "durationMinutes"},
    {field: ["data", "type"]},
    {field: ["ref"]}
  ],
  terms: [
    {field: ["data", "type"]}
  ]
})
```

This is what this index returns by default:

これは、このインデックスがデフォルトで返すものです。

```javascript
> Paginate(
  Match(
    Index("RobotRepairs_duration_type_by_type"),
    "CPU_REPLACE"
  )
)

{
  data: [
    [
      120,
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278202807195009555")
    ],
    [
      1560,
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278203011981902355")
    ],
    [
      3360,
      "CPU_REPLACE",
      Ref(Collection("RobotRepairs"), "278203042867708435")
    ]
  ]
}
```

We could now use Range() to only get the repairs that lasted less than 1 day (or 1,440 minutes):

Range（）を使用して、1 日（または 1,440 分）未満の修復のみを取得できるようになりました。

```javascript
> Paginate(
  Range(
    Match(Index("RobotRepairs_duration_type_by_type"), "CPU_REPLACE"),
    [],
    [1440]
  )
)

{
  data: [
    [
       120,
       "CPU_REPLACE",
       Ref(Collection("RobotRepairs"), "278202807195009555")]
  ]
}
```

# Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
