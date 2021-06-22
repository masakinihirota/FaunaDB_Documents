Core FQL concepts, part 1: Working with dates and times
https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times

# Core FQL concepts, part 1: Working with dates and times

FQL のコアコンセプト、パート 1：日付と時刻の操作

Pier Bover|Aug 31st, 2020|

2020 年 8 月 31 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)[Serverless](https://fauna.com/blog?category=serverless)[Jamstack](https://fauna.com/blog?category=jamstack)

Welcome! This is the first article in a new series exploring some core concepts of FQL, the native query language of Fauna.

ようこそ！これは、Fauna のネイティブクエリ言語である FQL のいくつかのコアコンセプトを探求する新しいシリーズの最初の記事です。

This series will assume you have a grasp on the basics. If you're new to Fauna and/or FQL here's [my introductory series on FQL](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1).

このシリーズは、基本を理解していることを前提としています。Faunaや FQL を初めて使用する場合は、FQL の紹介シリーズをご覧ください。

Today we'll explore how to work with dates and timestamps.

今日は、日付とタイムスタンプの操作方法について説明します。

- [Part 1: Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- [Part 2: Temporality in Fauna](https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb)
- Part 3: Data Aggregation

## In this article:

今回の記事

- Date and time basics
- Printing date and time
- Time operations
- Sorting time results

日付と時刻の基本
日付と時刻の印刷
時間操作
時間の結果の並べ替え

# Date and time basics

日付と時刻の基本

Fauna has two native date types:

Faunaには 2 つのネイティブ日付タイプがあります。

- [Date](https://docs.fauna.com/fauna/current/api/fql/types#date) to store a calendar date

日付カレンダーの日付を格納します

- [Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp) to store a UTC date and time, with nanosecond precision

UTC の日付と時刻をナノ秒の精度で保存するためのタイムスタンプ

The most common way to create a new **Date** is by simply passing an ISO date string to the [Date()](https://docs.fauna.com/fauna/current/api/fql/functions/date) function:

新しい日付を作成する最も一般的な方法は、ISO 日付文字列を Date（）関数に渡すことです。

```javascript
Date("2020-08-15");
```

Similarly, we can create a new **Timestamp** value by passing an UTC ISO time and date string to the [Time()](https://docs.fauna.com/fauna/current/api/fql/functions/time) function:

同様に、UTC ISO の時刻と日付の文字列を Time（）関数に渡すことで、新しいタイムスタンプ値を作成できます。

```javascript
Time("2020-08-15T18:39:45Z");
```

Timestamps in Fauna are always stored in UTC time. If we pass an ISO string with a time zone offset it is automatically converted:

Faunaのタイムスタンプは常に UTC 時間で保存されます。タイムゾーンオフセット付きの ISO 文字列を渡すと、自動的に変換されます。

```javascript
> Time('2020-08-15T00:00:00+04:00')
Time("2020-08-14T20:00:00Z")
```

As you can see, the day of the date has changed because the string we passed was 4 hours ahead of UTC time.

ご覧のとおり、渡した文字列が UTC 時刻より 4 時間進んでいたため、日付が変わってしまいました。

It's also possible to use [Epoch()](https://docs.fauna.com/fauna/current/api/fql/functions/epoch) to create a timestamp based on a UNIX time:

Epoch（）を使用して、UNIX 時間に基づいてタイムスタンプを作成することもできます。

```javascript
> Epoch(1597533145964, "millisecond")
Time("2020-08-15T23:12:25.964Z")
```

Since FaunaFB timestamps can store up to nanosecond precision, the **Epoch()** function requires a second argument to determine the unit of the created **Timestamp**.

FaunaFB タイムスタンプは最大ナノ秒の精度を格納できるため、Epoch（）関数には、作成されたタイムスタンプの単位を決定するための 2 番目の引数が必要です。

We can also use [Now()](https://docs.fauna.com/fauna/current/api/fql/functions/now) to create a new **Timestamp** (the Fauna type, not the UNIX time) at the current moment in microseconds (1 millisecond = 1000 microseconds):

Now（）を使用して、現在の瞬間にマイクロ秒（1 ミリ秒= 1000 マイクロ秒）で新しいタイムスタンプ（UNIX 時間ではなくFaunaタイプ）を作成することもできます。

```javascript
> Now()
Time("2020-08-15T23:04:14.455004Z")
```

**Quick note:** The **Timestamp** produced by **Now()** is based on the transaction time. If you call it multiple times in the same transaction the result will always be the same:

クイックノート：タイムスタンプによって生成今は（）トランザクション時間に基づいています。同じトランザクションで複数回呼び出すと、結果は常に同じになります。

```javascript
> Let(
  {
    now1: Now(),
    now2: Now()
  },
  {
    ts1: Var("now1"),
    ts2: Var("now2")
  }
)
{
  ts1: Time("2020-08-15T23:27:41.885588Z"),
  ts2: Time("2020-08-15T23:27:41.885588Z")
}
```

## Converting between Date and Timestamp types

日付タイプとタイムスタンプタイプ間の変換

To convert a **Timestamp** to a **Date** we use the [ToDate()](https://docs.fauna.com/fauna/current/api/fql/functions/todate) function. All of these examples produce the same result:

タイムスタンプを日付に変換するには、ToDate（）関数を使用します。これらの例はすべて同じ結果を生成します。

```javascript
> ToDate(Time("2020-08-15T23:12:25Z"))
Date("2020-08-15")

> ToDate(Epoch(1597533145964, "millisecond"))
Date("2020-08-15")

> ToDate(Now())
Date("2020-08-15")
```

Likewise, to convert a **Date** to a **Timestamp** we use the [ToTime()](https://docs.fauna.com/fauna/current/api/fql/functions/totime) function:

同様に、日付をタイムスタンプに変換するには、ToTime（）関数を使用します。

```javascript
> ToTime(Date("2020-08-15"))
Time("2020-08-15T00:00:00Z")
```

## Comparing dates

日付の比較

As expected, we can use **Date** and **Timestamp** types with all of the comparison functions available to us in FQL:

予想どおり、FQL で使用できるすべての比較関数で Date 型と Timestamp 型を使用できます。

```javascript
>Equals(Now(), Now())
true
```

We can even use [LT()](https://docs.fauna.com/fauna/current/api/fql/functions/lt) and [LTE()](https://docs.fauna.com/fauna/current/api/fql/functions/lte) to know which date is "larger", or more recent:

予想どおり、FQL で使用できるすべての比較関数で Date 型と Timestamp 型を使用できます。

```javascript
> LT(Now(), Date("1970-11-05"))
true
```

# Printing dates and times

日付と時刻の印刷

Once you have your **Date** or **Timestamp** values stored in Fauna, you probably need to read those in your programming language, or at least present those values directly to your users in a more human way.

あなたが持ってたら日付またはタイムスタンプ動植物に格納された値を、あなたはおそらく、より人間的な方法でユーザーに直接使用するプログラミング言語のもの、または少なくとも存在するものの値を読み取る必要があります。

The [Format()](https://docs.fauna.com/fauna/current/api/fql/functions/format) function is your bread and butter tool to do that. It's extremely powerful, so we're only going to scratch the surface here.

フォーマット（）関数は、それを行うためにあなたのパンとバターのツールです。非常に強力なので、ここでは表面を削るだけです。

For example, you might want to get the number of milliseconds since 1970 (UNIX time) which is the type of value you get when doing **Date.now()** in JavaScript:

たとえば、JavaScript で Date.now（）を実行するときに取得する値のタイプである、1970 年（UNIX 時間）からのミリ秒数を取得したい場合があります。

```javascript
> Format('%tQ', Now())
1597939216796
```

It's also very common to use ISO date strings:

ISO 日付文字列を使用することも非常に一般的です。

```javascript
> Format('%t', Now())
2020-08-20T16:13:13.654455Z
```

You might also want to print the date in some other format than **YYYY-MM-DD**:

YYYY-MM-DD 以外の形式で日付を印刷することもできます。

```javascript
> Format('%tD', Now())
08/20/20
```

And again, in the European format:

そして再び、ヨーロッパのフォーマットで：

```javascript
> Format('%td/%tm/%ty', Now(), Now(), Now())
20/08/20
```

As I said, **Format()** is extremely powerful. [Check the docs](https://docs.fauna.com/fauna/current/api/fql/functions/format) for all of the available options to format strings.

私が言ったように、Format（）は非常に強力です。文字列をフォーマットするために利用可能なすべてのオプションについては、ドキュメントを確認してください。

# Time operations

時間操作

Fauna has many powerful capabilities to work with dates. Let's see a couple of practical examples.

Faunaには、日付を処理するための多くの強力な機能があります。いくつかの実用的な例を見てみましょう。

For the rest of the article we'll just assume that all planets across the galaxy follow Earth's time. My apologies to any Vulkans reading this article.

この記事の残りの部分では、銀河全体のすべての惑星が地球の時間に従うと仮定します。この記事を読んでいる Vulkans に謝罪します。

## Addition

添加

A couple of weeks ago, the fleet installed a teleporter to beam personnel from the home base to spaceships. Obviously people started abusing it since it was too much fun, so the admiral has tasked us to build a little system to make appointments and control the teleporting traffic.

数週間前、艦隊はテレポーターを設置して、本拠地から宇宙船に人員をビームしました。明らかに、それがあまりにも楽しかったので人々はそれを悪用し始めました、それで提督は私たちに約束をしてテレポートトラフィックを制御するための小さなシステムを構築するように命じました。

First, let's create a new collection to track the teleportations:

まず、テレポーテーションを追跡するための新しいコレクションを作成しましょう。

```javascript
> CreateCollection({name:"Teleportations"})
{
  ref: Collection("Teleportations"),
  ts: 1597715786192000,
  history_days: 30,
  name: 'eleportations'
}
```

Let’s also create a new collection to track the pilots:

パイロットを追跡するための新しいコレクションも作成しましょう。

```javascript
> CreateCollection({name:"Pilots"})
{
  ref: Collection("Pilots"),
  ts: 1597715790726000,
  history_days: 30,
  name: 'Pilots'
}
```

Let's schedule a teleportation 10 days from now:

今から 10 日後にテレポートをスケジュールしましょう：

```javascript
> Create(
  Collection("Teleportations"),
  {
    data: {
      personRef: Ref(Collection("Pilots"), "266350546751848978"),
      status: 'SCHEDULED',
      ts: TimeAdd(Now(), 10, "days")
    }
  }
)
{
  ref: Ref(Collection("Teleportations"), "274157476972069395"),
  ts: 1597715794460000,
  data: {
    personRef: Ref(Collection("Pilots"), "266350546751848978"),
    status: "SCHEDULED",
    ts: Time("2020-08-28T01:56:34.304009Z")
  }
}
```

This is the interesting part:

これは興味深い部分です：

```javascript
TimeAdd(Now(), 10, "days");
```

The [TimeAdd()](https://docs.fauna.com/fauna/current/api/fql/functions/timeadd) function takes a **Date** or a **Timestamp** and adds a number of units to it. If you're using dates you have to use days, but with timestamps you can use any unit down to nanoseconds. Check [the documentation](https://docs.fauna.com/fauna/current/api/fql/functions/timeadd) to see all of the available units.

TimeAdd（）関数は、かかる日付やタイムスタンプを、それに単位数を追加します。日付を使用している場合は日を使用する必要がありますが、タイムスタンプを使用すると、ナノ秒までの任意の単位を使用できます。ドキュメントをチェックして、使用可能なすべてのユニットを確認してください。

If the teleporter were to undergo some maintenance, we could just reschedule the pending teleportations by adding the duration of the repairs.

テレポーターに何らかのメンテナンスが必要な場合は、修理期間を追加することで、保留中のテレポートを再スケジュールすることができます。

For example, here's how we could add 8 hours to the scheduled timestamp:

たとえば、スケジュールされたタイムスタンプに 8 時間を追加する方法は次のとおりです。

```javascript
> Let(
  {
    ref: Ref(Collection("Teleportations"), "274157476972069395"),
    ts: Select(["data", "ts"], Get(Var("ref")))
  },
  Update(
    Var("ref"),
    {
      data: {
        ts: TimeAdd(Var("ts"), 8, "hours")
      }
    }
  )
)
{
  ref: Ref(Collection("Teleportations"), "274157476972069395"),
  ts: 1597716265635000,
  data: {
    personRef: Ref(Collection("Pilots"), "266350546751848978"),
    status: "SCHEDULED",
    ts: Time("2020-08-28T09:56:34.304009Z")
  }
}
```

**Quick tip:** The [Let()](https://docs.fauna.com/fauna/current/api/fql/functions/let) function is commonly used to return a custom object, but it actually executes any FQL expression in its second parameter. Here we're using it to execute the update after having collected the necessary data first.

クイックヒント：レッツ（）関数は、一般的にカスタムオブジェクトを返すために使用されますが、それは実際にその二番目のパラメータで任意の FQL 式を実行します。ここでは、最初に必要なデータを収集した後、これを使用して更新を実行しています。

## Subtraction

減算

We can just as easily subtract units of time by using [TimeSubtract()](https://docs.fauna.com/fauna/current/api/fql/functions/timesubtract) which works exactly like **TimeAdd()**:

私たちは、同じように簡単に使用することで、時間の単位を引くことができます TimeSubtract（）とまったく同じように動作します TimeAdd を（） ：

```javascript
TimeSubtract(Now(), 4, "hours");
```

## Calculating time offsets

時間オフセットの計算

Sometimes pilots want to use the teleporter before their scheduled time, and we can't really allow that. We could at least show them how much time is left before they can use it.

パイロットが予定時刻より前にテレポーターを使用したい場合がありますが、それを実際に許可することはできません。少なくとも、使用できるようになるまでの残り時間を示すことができます。

As its name implies, we use [TimeDiff()](https://docs.fauna.com/fauna/current/api/fql/functions/timediff) to calculate differences between two times:

その名前が示すように、TimeDiff（）を使用して 2 つの時間の差を計算します。

```javascript
> TimeDiff(
  Date("2020-08-15"),
  Date("2020-08-20"),
  "days"
)
5
```

Again, if you're using dates you must use day units. You can calculate the offset in any another unit, like say hours, by converting dates to timestamps using **ToTime()**:

繰り返しますが、日付を使用している場合は、日単位を使用する必要があります。ToTime（）を使用して日付をタイムスタンプに変換することにより、時間などの別の単位でオフセットを計算できます。

```javascript
> TimeDiff(
  ToTime(Date("2020-08-15")),
  Now(),
  "hours"
)
74
```

Another interesting thing to know about **TimeDiff()** is that it always rounds to the lowest whole value:

TimeDiff（）について知っておくべきもう 1 つの興味深い点は、常に最小の全体値に丸められることです。

```javascript
>
Let(
  {
    ts1: Now(),
    ts2: TimeAdd(Now(), 119, "minutes")
  },
  TimeDiff(Var("ts1"), Var("ts2"), "hours")
)
1
```

119 minutes is almost two hours, and yet Fauna returns one hour.

119 分はほぼ 2 時間ですが、Faunaは 1 時間戻ります。

Ok, with this in mind let's calculate how much time a pilot has to wait before teleporting:

さて、これを念頭に置いて、パイロットがテレポートする前にどれだけの時間を待たなければならないかを計算しましょう：

```javascript
> Let(
  {
    ref: Ref(Collection("Teleportations"), "274157476972069395"),
    ts: Select(["data", "ts"], Get(Var("ref")))
  },
  TimeDiff(Now(), Var("ts"), "minutes")
)
14845
```

Phew! 14,845 minutes is a lot of waiting!

ふぅ！14,845 分は待たされます！

Obviously, we would need to massage that data into hours and minutes before showing it to our user. We could also create a simple user-defined-function (or UDF) like we saw [in a previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4) to do that for us.

明らかに、ユーザーに表示する前に、そのデータを数時間と数分にマッサージする必要があります。以前の記事で見たような単純なユーザー定義関数（または UDF）を作成して、それを行うこともできます。

Or, we could just do it right in our FQL query:

または、FQL クエリで正しく実行することもできます。

```javascript
> Let(
  {
    ref: Ref(Collection("Teleportations"), "274157476972069395"),
    ts: Select(["data", "ts"], Get(Var("ref"))),
    timeDiffHours: TimeDiff(Now(), Var("ts"), "hours"),
    hoursInMinutes: Multiply(Var("timeDiffHours"), 60),
    timeDiffMinutes: TimeDiff(Now(), Var("ts"), "minutes"),
    remainingMinutes: Subtract(Var("timeDiffMinutes"), Var("hoursInMinutes"))
  },
  Format(
    "You have to wait %s hours and %s minutes",
    Var("timeDiffHours"),
    Var("remainingMinutes")
  )
)
You have to wait 246 hours and 45 minutes
```

Since we know **timeDiffHours** is rounded to the lowest value, we just need to find a way to calculate the remaining minutes. To do that we simply convert these hours into minutes (by multiplying the hours to 60) and subtract that to the total time in minutes.

timeDiffHours は最小値に丸められることがわかっているので、残りの分を計算する方法を見つける必要があります。これを行うには、これらの時間を分に変換し（時間を 60 に掛けて）、それを分単位の合計時間に減算します。

# Sorting time results

時間の結果の並べ替え

Sorting index results by date or timestamps is no different than sorting by any other type of value. Let's create an index that sorts all the documents in the **Teleportations** collection by the **ts** property:

インデックス結果を日付またはタイムスタンプで並べ替えるのは、他のタイプの値で並べ替えるのと同じです。Teleportations コレクション内のすべてのドキュメントを ts プロパティで並べ替えるインデックスを作成しましょう。

```javascript
> CreateIndex({
  name: "all_Teleportations_by_ts",
  source: Collection("Teleportations"),
  values: [
    { field: ["data", "ts"] },
    { field: ["ref"] }
  ]
})
```

We already saw [in a previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2) how indexes and sorting works, so I won't go into much detail here.

前回の記事でインデックスと並べ替えがどのように機能するかをすでに見てきたので、ここではあまり詳しく説明しません。

Here's a possible query to get the results from that index:

そのインデックスから結果を取得するための可能なクエリは次のとおりです。

```javascript
> Paginate(Match(Index("all_Teleportations_by_ts")))
{
  data: [
    [
      Time("2020-08-19T12:56:31.102631Z"),
      Ref(Collection("Teleportations"), "274138599280083456")
    ],
    [
      Time("2020-08-28T09:56:34.304009Z"),
      Ref(Collection("Teleportations"), "274157476972069395")
    ]
    // etc...
  ]
}
```

By default, Fauna sorts values in ascending order, and it's no different here as we're getting older results first.

デフォルトでは、Fauna は値を昇順で並べ替えますが、最初に古い結果が得られるため、ここでも違いはありません。

If we wanted to get the most recent results first, we'd need an index with a reverse order:

最初に最新の結果を取得したい場合は、逆の順序のインデックスが必要になります。

```javascript
> CreateIndex({
  name: "all_Teleportations_by_ts_desc",
  source: Collection("Teleportations"),
  values: [
    { field: ["data", "ts"], reverse: true },
    { field: ["ref"] }
  ]
})
```

# Filtering time values

時間値のフィルタリング

There are a couple of strategies we can follow depending on our use case. Obviously, all of these techniques involve using indexes. If you're new to FQL [here's my introductory article on indexes](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2).

ユースケースに応じて、従うことができる戦略がいくつかあります。明らかに、これらの手法はすべてインデックスの使用を伴います。FQL を初めて使用する場合は、インデックスに関する私の紹介記事をご覧ください。

## Filter by exact date

正確な日付でフィルタリング

The easiest use case is to filter by an exact date. Since our **Teleportations** documents use a timestamp we would need to add a date before we can do that.

最も簡単な使用例は、正確な日付でフィルタリングすることです。当社以来 Teleportations 文書にタイムスタンプを使用して、我々はそれを行うことができます前に、日付を追加する必要があります。

So, let's create a simple query that updates all the documents with a date property:

それでは、date プロパティですべてのドキュメントを更新する簡単なクエリを作成しましょう。

```javascript
> Map(
  Paginate(Match(Index("all_Teleportations_by_ts"))),
  Lambda(
    ["ts","ref"],
    Update(
      Var("ref"),
      {data: {date:ToDate(Var("ts"))}}
    )
  )
)
{
  data: [
    {
      ref: Ref(Collection("Teleportations"), "274138599280083456"),
      ts: 1597854857396000,
      data: {
        personRef: Ref(Collection("Pilots"), "266350546751848978"),
        status: "SCHEDULED",
        ts: Time("2020-08-19T12:56:31.102631Z"),
        date: Date("2020-08-19")
      }
    },
    // etc...
  ]
}
```

Great, so now we can create a simple index to filter by date

これで、日付でフィルタリングするための簡単なインデックスを作成できるようになりました。

```javascript
> CreateIndex({
  name: "all_Teleporations_by_date",
  source: Collection("Teleportations"),
  terms: [
    { field: [“data”, "date"]}
  ]
})
```

And here's how we'd get all the teleportations for a given date:

そして、特定の日付のすべてのテレポートを取得する方法は次のとおりです。

```javascript
> Paginate(Match(Index("all_Teleporations_by_date"), Date("2020-08-19")))
{
  data: [Ref(Collection("Teleportations"), "274138599280083456")]
}
```

## Filter by day of the week

曜日でフィルタリングする

What if we wanted to know which teleportations happened on, say, a Wednesday?

たとえば水曜日にどのテレポーテーションが起こったか知りたいとしたらどうでしょうか？

Again, we could just add the day of the week to our documents and filter using that:

繰り返しになりますが、曜日をドキュメントに追加し、それを使用してフィルタリングすることができます。

```javascript
> Map(
  Paginate(Match(Index("all_Teleportations_by_ts"))),
  Lambda(
    ["ts","ref"],
    Update(
      Var("ref"),
      {data: {weekday: DayOfWeek(Var("ts"))}}
    )
  )
)
{
  data: [
    {
      ref: Ref(Collection("Teleportations"), "274138599280083456"),
      ts: 1597855390458000,
      data: {
        personRef: Ref(Collection("Pilots"), "266350546751848978"),
        status: "SCHEDULED",
        ts: Time("2020-08-19T12:56:31.102631Z"),
        date: Date("2020-08-19"),
        weekday: 3
      }
    },
    // etc...
  ]
}
```

[DayOfWeek()](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek) takes a timestamp and returns an integer from 1 to 7. Monday would be 1, Tuesday 2, and so on.

DayOfWeek（）はタイムスタンプを受け取り、1 から 7 までの整数を返します。月曜日は 1、火曜日は 2 などになります。

Now we just need to create a new index::

ここで、新しいインデックスを作成する必要があります::

```javascript
> CreateIndex({
  name: "all_Teleportations_by_weekday",
  source: Collection("Teleportations"),
  terms: [
    {field: ["data", "weekday"]}
  ]
})
```

And here's how we would find all the teleportations that happened on a Wednesday:

そして、水曜日に起こったすべてのテレポートを見つける方法は次のとおりです。

```javascript
> Paginate(Match(Index("all_Teleportations_by_weekday"), 3))
{
  data: [Ref(Collection("Teleportations"), "274138599280083456")]
}
```

## Filter by a time range

時間範囲でフィルタリングする

#### **Introduction to ranges queries in Fauna**

Faunaの範囲クエリの概要

Before being able to filter by a time range, we need to take a little detour to explain how range queries work in Fauna.

時間範囲でフィルタリングできるようになる前に、Faunaで範囲クエリがどのように機能するかを説明するために少し回り道をする必要があります。

Let's create a quick collection and fill it with some documents first:

簡単なコレクションを作成し、最初にいくつかのドキュメントを入力してみましょう。

```javascript
> CreateCollection({name: "Numbers"})

> Create(Collection("Numbers"), {data: {value: 1}})
> Create(Collection("Numbers"), {data: {value: 2}})
> Create(Collection("Numbers"), {data: {value: 3}})
// etc...
```

Let's now create an index that sorts and returns the **value** property of those documents:

次に、これらのドキュメントの value プロパティを並べ替えて返すインデックスを作成しましょう。

```javascript
> CreateIndex({
  name: "Numbers_by_value",
  source: Collection("Numbers"),
  values:[
    {field: ["data", "value"]}
  ]
})
```

This index is simply returning the **value** of all the documents in the collection:

このインデックスは、コレクション内のすべてのドキュメントの値を返すだけです。

```javascript
> Paginate(Match(Index("Numbers_by_value")))
{
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

This is what happens when we use[Range()](https://docs.fauna.com/fauna/current/api/fql/functions/range) with this index:

これは、このインデックスで Range（）を使用するとどうなるかです。

```javascript
> Paginate(
  Range(Match(Index("Numbers_by_value")), 2, 6)
)
{
  data: [2, 3, 4, 5, 6]
}
```

Makes sense, right? **Range()** filters those index results within the bounds of 2 and 6.

理にかなっていますよね？Range（）は、これらのインデックス結果を 2 と 6 の範囲内でフィルタリングします。

There are a couple of nuances lost in this simple example though. What happens when the index returns an array instead of a single value?

ただし、この単純な例では、いくつかのニュアンスが失われています。インデックスが単一の値ではなく配列を返すとどうなりますか？

Let's create some test data and an index to test this out:

これをテストするために、いくつかのテストデータとインデックスを作成しましょう。

```javascript
> CreateCollection({name: "NumbersMultiple"})

> Create(Collection("NumbersMultiple"), {data: {a: 1, b: 8}})
> Create(Collection("NumbersMultiple"), {data: {a: 2, b: 4}})
// etc...

> CreateIndex({
  name: "NumbersMultiple_by_a_and_b",
  source: Collection("NumbersMultiple"),
  values: [
    {field: ["data", "a"]},
    {field: ["data", "b"]}
  ]
})
```

Check what happens when using **Range()** now:

Range（）を今すぐ使用するとどうなるかを確認してください。

```javascript
> Paginate(
  Range(Match(Index("NumbersMultiple_by_a_and_b")), 2, 6)
)
{
  data: [
    [2, 4],
    [3, 50],
    [4, 0],
    [5, 6],
    [6, 9]
  ]
}
```

As you can see, **Range()** is pretty much ignoring the second value. When receiving an array, **Range()** only takes into account the first value that can be fit into the bounds and ignores the rest.

ご覧のとおり、Range（）は 2 番目の値をほとんど無視しています。配列を受け取るとき、Range（）は境界に収まることができる最初の値のみを考慮し、残りを無視します。

We will go into more detail on how range queries work in a future article, but we're now ready to tackle our time filtering problem.

範囲クエリがどのように機能するかについては、今後の記事で詳しく説明しますが、これで時間フィルタリングの問題に取り組む準備が整いました。

#### **Filtering by a date range**

日付範囲によるフィルタリング

We could maybe reuse the previous **all_Teleporations_by_date** index like this:

前の all_Teleporations_by_date インデックスを次のように再利用できます。

```javascript
> Paginate(
  Range(
    Match(Index("all_Teleporations_by_date")),
    Date("2020-01-01"),
    Date("2021-01-01")
  )
)
{
  data: []
}
```

Huh? How come that doesn't work?

え？どうしてそれがうまくいかないのですか？

If you scroll up a bit, you can see that the **all_Teleporations_by_date** index doesn't have a **values** object, so it just returns an array with references. **Range()** didn't return anything simply because it couldn't compare dates with references.

少し上にスクロールすると、all_Teleporations_by_date インデックスに values オブジェクトがないため、参照を含む配列が返されるだけであることがわかります。Range（）は、日付を参照と比較できなかったという理由だけで何も返しませんでした。

To fix this we need to create a new index with a **values** object, that returns values that **Range()** can use to filter:

これを修正するために、我々は持つ新しいインデックスを作成する必要がある値を返す値があることという、オブジェクトを範囲は、（）フィルタを使用することができます。

```javascript
> CreateIndex({
  name: "all_Teleporations_by_ts_range",
  source: Collection("Teleportations"),
  values: [
    { field: ["data", "ts"]},
    { field: "ref"}
  ]
})
```

And then query it:

そしてそれを照会します：

```javascript
> Paginate(
  Range(
    Match(Index("all_Teleporations_by_ts_range")),
    Now(),
    TimeAdd(Now(), 100, "days")
  )
)
{
  data: [
    [
      Time("2020-08-19T12:56:31.102631Z"),
      Ref(Collection("Teleportations"), "274138599280083456")
    ],
    [
      Time("2020-08-28T09:56:34.304009Z"),
      Ref(Collection("Teleportations"), "274157476972069395")
    ]
  ]
}
```

Take note that we need to pass timestamps for this to work. Otherwise, we won't get any results since the comparison wouldn't be possible:

これを機能させるには、タイムスタンプを渡す必要があることに注意してください。そうしないと、比較ができないため、結果が得られません。

```javascript
> Paginate(
  Range(
    Match(Index("all_Teleporations_by_ts_range")),
    Date("2020-01-01"),
    Date("2021-01-01")
  )
)
{
  data: []
}
```

We could, of course, simply cast those dates to timestamps, so that **Range()** is comparing timestamps with timestamps:

もちろん、これらの日付をタイムスタンプにキャストするだけで、Range（）がタイムスタンプとタイムスタンプを比較することもできます。

```javascript
> Paginate(
  Range(
    Match(Index("all_Teleporations_by_ts_range")),
    ToTime(Date("2020-01-01")),
    ToTime(Date("2021-01-01"))
  )
)
{
  data: [
    [
      Time("2020-08-19T12:56:31.102631Z"),
      Ref(Collection("Teleportations"), "274138599280083456")
    ],
    [
      Time("2020-08-28T09:56:34.304009Z"),
      Ref(Collection("Teleportations"), "274157476972069395")
    ]
  ]
}
```

# Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In the following article of the series, we will continue our space adventure by checking out all the temporality features in Fauna.

シリーズの次の記事では、Faunaのすべての一時的な機能をチェックすることによって、宇宙の冒険を続けます。

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
