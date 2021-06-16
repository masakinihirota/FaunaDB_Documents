Core FQL concepts part 2: Temporality in Fauna
https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb

# Core FQL concepts part 2: Temporality in Fauna

FQL のコアコンセプトパート 2：動物相のテンポラリティ

Pier Bover|Sep 16th, 2020|

2020 年 9 月 16 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Today we're going to explore one of Fauna's most unique features: its temporal capabilities.

今日は、動物相の最もユニークな機能の 1 つである時間的機能について説明します。

This series assumes you have a grasp on the basics. If you're new to Fauna and/or FQL here's [my introductory series on FQL](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1).

このシリーズは、基本を理解していることを前提としています。動物相や FQL を初めて使用する場合は、FQL の紹介シリーズをご覧ください。

[](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)

- [Part 1: Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- Part 2: Temporality in Fauna
- Part 3: Data Aggregation

パート 1：日付と時刻の操作
パート 2：動物相のテンポラリティ
パート 3：データ集約

## In this article:

今回の記事

- Document history
- Querying document history
- Filtering history events
- Travelling back in time
- Recovering documents
- Careful with the spacetime continuum
- Use cases and considerations

文書履歴
ドキュメント履歴のクエリ
履歴イベントのフィルタリング
時間を遡る
ドキュメントの回復
時空の連続体に注意してください
ユースケースと考慮事項

# Document history

文書履歴

One of the main temporal features of Fauna is being able to record every change you make to a document. When this is configured, new document snapshots are created for every change and added to the document's history.

動物相の主な時間的特徴の 1 つは、ドキュメントに加えたすべての変更を記録できることです。これを構成すると、変更ごとに新しいドキュメントスナップショットが作成され、ドキュメントの履歴に追加されます。

By default, when creating a collection we get 30 days of minimum document history:

デフォルトでは、コレクションを作成すると、30 日間の最小ドキュメント履歴が取得されます。

```javascript
CreateCollection({name: "MyCollection"})

{
ref: Collection("MyCollection"),
ts: 1598891726415000,
history_days: 30,
name: "MyCollection"
}
```

History will last for at least 30 days with the default **history_days** value, but there are no guarantees when the deletion occurs as Fauna periodically reclaims expired snapshots.

履歴はデフォルトの history_days 値で少なくとも 30 日間続きますが、Fauna が期限切れのスナップショットを定期的に再利用するため、削除がいつ発生するかは保証されません。

We can change the minimum default to any number of days that fits our use case:

最小デフォルトを、ユースケースに適合する任意の日数に変更できます。

```javascript
CreateCollection({
  name: "CollectionWithAYearOfHistory",
  history_days: 365,
});
```

If we wanted to retain all history until the end of times we'd just use a **null** value:

時間の終わりまですべての履歴を保持したい場合は、null 値を使用します。

```javascript
CreateCollection({
  name: "CollectionForever",
  history_days: null,
});
```

It's also possible to expire all history by default by passing a **0** value:

0 の値を渡すことにより、デフォルトですべての履歴を期限切れにすることもできます。

```javascript
CreateCollection({
  name: "CollectionNoHistory",
  history_days: 0,
});
```

## Difference with ttl_days

ttl_days との違い

When creating a new collection it's also possible to configure **ttl_days** (time-to-live days). This setting is not related to its history. Instead, it refers to how long you'd like to keep the current or active version of a document alive. This is most useful for ephemeral data such as sessions, caches, and so on.

新しいコレクションを作成するときに、ttl_days（存続可能日数）を構成することもできます。この設定は、その履歴とは関係ありません。代わりに、ドキュメントの現在のバージョンまたはアクティブなバージョンを存続させたい期間を指します。これは、セッションやキャッシュなどの一時的なデータに最も役立ちます。

Check [the documentation](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection?lang=javascript) for more details.

詳細については、ドキュメントを確認してください。

## Security implications

セキュリティへの影響

It should be noted that having permissions to read a document doesn't automatically grant permission to read or modify its history. Your users will need dedicated permissions to be able to interact with the history of a document.

ドキュメントを読み取るためのアクセス許可を持っていても、その履歴を読み取ったり変更したりするためのアクセス許可が自動的に付与されるわけではないことに注意してください。ユーザーがドキュメントの履歴を操作できるようにするには、専用の権限が必要です。

For more info on authorization in Fauna [check my previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5).

動物相での承認の詳細については、私の以前の記事を確認してください。

# Querying document history

ドキュメント履歴のクエリ

Before we go on, let's create some data:

先に進む前に、いくつかのデータを作成しましょう。

```javascript
> CreateCollection({name: "Lasers"})

> Create(
  Collection('Lasers'),
  {
    data:{
      color:"BLUE",
      crystal: "KYBER"
    }
  }
)

{
  ref: Ref(Collection("Lasers"), "275571113732342290"),
  ts: 1599063943620000,
  data: {
    color: "BLUE",
    crystal: "KYBER"
  }
}
```

Let's also modify the document we just created to get some history:

作成したばかりのドキュメントを変更して、履歴を取得しましょう。

```javascript
> Update(
  Ref(Collection("Lasers"), "275571113732342290"),
  {data:{color:"GREEN"}}
)

> Delete(
  Ref(Collection("Lasers"), "275571113732342290")
)
```

We can query a document's history by using the [Events()](https://docs.fauna.com/fauna/current/api/fql/functions/events?lang=javascript) function. Here's an example of what this history looks like:

Events（）関数を使用して、ドキュメントの履歴を照会できます。この履歴がどのように見えるかの例を次に示します。

```javascript
> Paginate(
  Events(Ref(Collection("Lasers"), "275571113732342290"))
)

{
  data: [
    {
      ts: 1599063943620000,
      action: "create",
      document: Ref(Collection("Lasers"), "275571113732342290"),
      data: {
        color: "BLUE",
        crystal: "KYBER"
      }
    },
    {
      ts: 1599064033700000,
      action: "update",
      document: Ref(Collection("Lasers"), "275571113732342290"),
      data: {
        color: "GREEN"
      }
    },
    {
      ts: 1599064043550000,
      action: "delete",
      document: Ref(Collection("Lasers"), "275571113732342290"),
      data: null
    }
  ]
}
```

As you can see, **Events()** takes a document reference and returns a list of all the changes we've performed on that document. An important point is that this history is available even after the document has been deleted.

ご覧のとおり、Events（）はドキュメント参照を取得し、そのドキュメントに対して実行したすべての変更のリストを返します。重要な点は、この履歴はドキュメントが削除された後でも利用できるということです。

Instead of using **Events(),** we could also use the options of **Paginate()** to retrieve the history of multiple documents at once:

Events（）を使用する代わりに、Paginate（）のオプションを使用して、複数のドキュメントの履歴を一度に取得することもできます。

```javascript
> Paginate(
  Documents(Collection("Lasers")),
  {events: true}
)

{
  data: [
    {
      ts: 1599063943620000,
      action: "add",
      document: Ref(Collection("Lasers"), "275571113732342290")
    },
    {
      ts: 1599064043550000,
      action: "remove",
      document: Ref(Collection("Lasers"), "275571113732342290")
    },
    // etc...
  ]
}
```

In this example, we are getting all the history of all the documents in the **Lasers** collection by combining [Documents()](https://docs.fauna.com/fauna/current/api/fql/functions/documents?lang=javascript) with **{events: true}**.

この例では、Documents（）と{events：true}を組み合わせて、Lasers コレクション内のすべてのドキュメントのすべての履歴を取得しています。

This approach is extremely powerful as you could, for instance, combine multiple indexes to fetch the history of documents based on complex filters, or even from documents from multiple collections. Definitely check out the [Paginate()](https://docs.fauna.com/fauna/current/api/fql/functions/paginate?lang=javascript) documentation for more info on this.

このアプローチは非常に強力です。たとえば、複数のインデックスを組み合わせて、複雑なフィルターに基づいてドキュメントの履歴を取得したり、複数のコレクションのドキュメントから取得したりできます。詳細については、Paginate（）のドキュメントを必ず確認してください。

# Filtering history events

履歴イベントのフィルタリング

When querying the history of a document by using **Events()**, we get an array which can be manipulated just like any other array in Fauna.

Events（）を使用してドキュメントの履歴をクエリすると、Fauna の他の配列と同じように操作できる配列が得られます。

For example here's how we could just get the **update** events:

たとえば、更新イベントを取得する方法は次のとおりです。

```javascript
> Filter(
  Select(
    ["data"],
    Paginate(Events(Ref(Collection("Lasers"), "275571113732342290")))
  ),
  Lambda(
    "event",
    Equals(
      Select(["action"], Var("event")),
      "update"
    )
  )
)

[
  {
    ts: 1599064033700000,
    action: "update",
    document: Ref(Collection("Lasers"), "275571113732342290"),
    data: {
      color: "GREEN"
    }
  }
]
```

We could also filter events by date:

イベントを日付でフィルタリングすることもできます。

```javascript
> Filter(
  Select(
    ["data"],
    Paginate(Events(Ref(Collection("Lasers"), "275571113732342290")))
  ),
  Lambda(
    "event",
    Equals(
      ToDate(
        Epoch(
          Select(["ts"], Var("event")),
          "microseconds"
        )
      ),
      Date('2020-09-02')
    )
  )
)

[
  {
    ts: 1599063943620000,
    action: "create",
    document: Ref(Collection("Lasers"), "275571113732342290"),
    data: {
      color: "BLUE",
      crystal: "KYBER"
    }
  },
  {
    ts: 1599064033700000,
    action: "update",
    document: Ref(Collection("Lasers"), "275571113732342290"),
    data: {
      color: "GREEN"
    }
  },
  {
    ts: 1599064043550000,
    action: "delete",
    document: Ref(Collection("Lasers"), "275571113732342290"),
    data: null
  }
]
```

**Quick note:** We explored working with dates and times [in the previous article](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times). As a quick reminder, we're converting an integer to a **Timestamp** using [Epoch()](https://docs.fauna.com/fauna/current/api/fql/functions/epoch?lang=javascript), and then that timestamp to a **Date,** to be able to compare it with **Date('2020-09-02')**.

クイックノート：前回の記事で日付と時刻の操作について説明しました。簡単に言うと、Epoch（）を使用して整数をタイムスタンプに変換し、次にそのタイムスタンプを日付に変換して、Date（ '2020-09-02'）と比較できるようにします。

We could also use the **Paginate()** options to get the events after or before a certain date:

Paginate（）オプションを使用して、特定の日付の後または前のイベントを取得することもできます。

```javascript
> Paginate(
  Documents(Collection("Lasers")),
  {
    events: true,
    before: Date("2020-09-03")
  }
)

> Paginate(
  Documents(Collection("Lasers")),
  {
    events: true,
    after: Date("2020-09-03")
  }
)
```

# Travelling back in time

時間を遡る

The document history tells us that something happened at some point in time. What if we wanted to know the complete state of a document in the past? For example, after an update event or even in between history events?

文書の履歴は、ある時点で何かが起こったことを示しています。過去のドキュメントの完全な状態を知りたい場合はどうなりますか？たとえば、更新イベントの後、または履歴イベントの合間にも？

We can use the [At()](https://docs.fauna.com/fauna/current/api/fql/functions/at?lang=javascript) function to do exactly that:

At（）関数を使用して、まさにそれを行うことができます。

```javascript
> At(
  1599064033700000,
  Get(Ref(Collection("Lasers"), "275571113732342290"))
)

{
  ref: Ref(Collection("Lasers"), "275571113732342290"),
  ts: 1599064033700000,
  data: {
    color: "GREEN",
    crystal: "KYBER"
  }
}
```

Much like a time machine, **At()** allows us to execute FQL queries in the past. Here we're using the **1599064033700000** timestamp from the **update** event to get the full document when we updated the color to **GREEN**.\*\*

タイムマシンのように、At（）を使用すると、過去に FQL クエリを実行できます。ここでは、使用している 1599064033700000 からタイムスタンプを更新我々はに色を更新したときに、完全なドキュメントを取得するためにイベント GREEN。\*\*

At()\*\* sets the point in time for all reads in FQL for that query. We can use indexes, filter data, etc. It's exactly like querying Fauna at that time.

At（）\*\*は、そのクエリの FQL でのすべての読み取りの時点を設定します。インデックスやフィルターデータなどを使用できます。それは、当時の動物相にクエリを実行するのとまったく同じです。

It doesn't work exactly like a time machine though. We can't really write changes in the past with it. If we try to use **At()** to make any changes at any other time than **Now()** we will get an error.

ただし、タイムマシンとまったく同じようには機能しません。過去の変更を実際に書き込むことはできません。Now（）以外のときに At（）を使用して変更を加えようとすると、エラーが発生します。

Let's create a new document to try this out:

これを試すために新しいドキュメントを作成しましょう：

```javascript
> Create(
  Collection('Lasers'),
  {data:{color:"RED"}}
)

{
  ref: Ref(Collection("Lasers"), "275572558214988288"),
  ts: 1599065321160000,
  data: {
    color: "RED"
  }
}
```

And now let's add a couple of milliseconds to the creation timestamp and try to update the document in the past:

それでは、作成タイムスタンプに数ミリ秒を追加して、過去にドキュメントを更新してみましょう。

```javascript
> At(
  1599065321170000,
  Update(
    Ref(Collection("Lasers"), "275572558214988288"),
    {data: {color: "PURPLE"}}
  )
)

Error: [
  {
    "position": [
      "expr"
    ],
    "code": "invalid write time",
    "description": "Cannot write outside of snapshot time."
  }
]
```

# Altering the spacetime continuum

時空の連続体を変更する

While we cannot use **At()** to alter the past, it is possible to use [Insert()](https://docs.fauna.com/fauna/current/api/fql/functions/insert?lang=javascript) and [Remove()](https://docs.fauna.com/fauna/current/api/fql/functions/remove?lang=javascript) to modify the events in a document's history.

At（）を使用して過去を変更することはできませんが、Insert（）および Remove（）を使用して、ドキュメントの履歴内のイベントを変更することはできます。

To demonstrate this, let's create a new document first:

これを示すために、最初に新しいドキュメントを作成しましょう。

```javascript
> Create(
  Collection('Lasers'),
  {
    data:{
      color:"ORANGE",
      crystal: "QUARTZIUM"
    }
  }
)

{
  ref: Ref(Collection("Lasers"), "275678520646042112"),
  ts: 1599166374745000,
  data: {
    color: "ORANGE",
    crystal: "QUARTZIUM"
  }
}
```

Now let's see what happens if we insert a create event 1 second before we create that document:

次に、ドキュメントを作成する 1 秒前に create イベントを挿入するとどうなるかを見てみましょう。

```javascript
> Insert(
  Ref(Collection("Lasers"), "275678520646042112"),
  TimeSubtract(Epoch(1599166374745000, "microseconds"), 1, "second"),
  "create",
  {
    data: {
      color: "YELLOW",
      crystal: "QUARTZIUM"
    }
  }
)

{
  ts: 1599166373745000,
  action: "create",
  document: Ref(Collection("Lasers"), "275678520646042112"),
  data: {
    color: "YELLOW",
    crystal: "QUARTZIUM"
  }
}
```

Keep in mind that the history is related to a document reference. Be careful not to use the wrong reference with **Insert()** and **Remove()**, otherwise these changes will have unintended consequences.

履歴はドキュメント参照に関連していることに注意してください。Insert（）および Remove（）で誤った参照を使用しないように注意してください。そうしないと、これらの変更が意図しない結果をもたらすことになります。

Let's see how the insertion of the **create** event affected the history of the document:

create イベントの挿入がドキュメントの履歴にどのように影響したかを見てみましょう。

```javascript
> Paginate(Events(Ref(Collection("Lasers"), "275678520646042112")))

{
  data: [
    {
      ts: 1599166373745000,
      action: "create",
      document: Ref(Collection("Lasers"), "275678520646042112"),
      data: {
        color: "YELLOW",
        crystal: "QUARTZIUM"
      }
    },
    {
      ts: 1599166374745000,
      action: "update",
      document: Ref(Collection("Lasers"), "275678520646042112"),
      data: {
        color: "ORANGE"
      }
    }
  ]
}
```

The new **create** event we just inserted is where we expect it to be, one second before the initial document creation, but look what happened with the last event in the array. It used to be a **create** event but it has been now converted to an **update** event.

挿入したばかりの新しい create イベントは、最初のドキュメント作成の 1 秒前の予想される場所ですが、配列内の最後のイベントで何が起こったかを確認してください。以前は作成イベントでしたが、現在は更新イベントに変換されています。

In any case, if we now get the latest version of the document we can see it is unchanged:

いずれにせよ、ドキュメントの最新バージョンを入手した場合、それは変更されていないことがわかります。

```javascript
> Get(Ref(Collection("Lasers"), "275678520646042112"))

{
  ref: Ref(Collection("Lasers"), "275678520646042112"),
  ts: 1599166374745000,
  data: {
    color: "ORANGE",
    crystal: "QUARTZIUM"
  }
}
```

# Recovering deleted documents

削除されたドキュメントの回復

I'm sure I'm not the only one that has wanted to go back in time to restore something that was deleted by accident. Fauna offers a couple of ways to do this.

誤って削除されたものを復元するために時間を遡りたいと思ったのは私だけではないと確信しています。動物相はこれを行うためのいくつかの方法を提供します。

## Removing the delete event

削除イベントの削除

We've seen that deleting a document creates a **delete** event. Could we use **Remove()** to undo that?

ドキュメントを削除すると、削除イベントが発生することを確認しました。Remove（）を使用してそれを元に戻すことはできますか？

First let's delete our orange laser:

まず、オレンジ色のレーザーを削除しましょう。

```javascript
> Delete(Ref(Collection("Lasers"), "275678520646042112"))
```

Now let's get all the delete events for this document:

次に、このドキュメントのすべての削除イベントを取得しましょう。

```javascript
> Filter(
  Select(
    ["data"],
    Paginate(Events(Ref(Collection("Lasers"), "275678520646042112")))
  ),
  Lambda(
    "event",
    Equals(Select(["action"], Var("event")),"delete")
  )
)

[
  {
    ts: 1599177868380000,
    action: "delete",
    document: Ref(Collection("Lasers"), "275678520646042112"),
    data: null
  }
]
```

Cool, so let's use **Remove()** to remove the delete event:

かっこいいので、Remove（）を使用して削除イベントを削除しましょう。

```javascript
> Remove(
  Ref(Collection("Lasers"), "275678520646042112"),
  1599178388870000,
  "delete"
)
```

We can confirm the removal of the **delete** event by checking its history:

削除イベントの削除は、その履歴を確認することで確認できます。

```javascript
> Paginate(Events(Ref(Collection("Lasers"), "275678520646042112")))

{
  data: [
    {
      ts: 1599166373745000,
      action: "create",
      document: Ref(Collection("Lasers"), "275678520646042112"),
      data: {
        color: "YELLOW",
        crystal: "QUARTZIUM"
      }
    },
    {
      ts: 1599166374745000,
      action: "update",
      document: Ref(Collection("Lasers"), "275678520646042112"),
      data: {
        color: "ORANGE"
      }
    }
  ]
}
```

We now can even **Get()** the document as usual:

これで、通常どおりドキュメントを Get（）することもできます。

```javascript
Get(Ref(Collection("Lasers"), "275678520646042112"))

{
  ref: Ref(Collection("Lasers"), "275678520646042112"),
  ts: 1599166374745000,
  data: {
    color: "ORANGE",
    crystal: "QUARTZIUM"
  }
}
```

## Bringing data back from the past

過去のデータを取り戻す

Another option to recover data is basically reading it from the past using **At()** and inserting it again back into the present.

データを回復する別のオプションは、基本的に At（）を使用して過去からデータを読み取り、現在に再度挿入することです。

Let's create a new laser to start with a fresh document:

新しいドキュメントから始めるために、新しいレーザーを作成しましょう。

```javascript
> Create(
  Collection('Lasers'),
  {
    data:{
      color:"BLUE"
    }
  }
)

{
  ref: Ref(Collection("Lasers"), "275752290343715347"),
  ts: 1599236727185000,
  data: {
    color: "BLUE"
  }
}
```

Let's delete our document and check its history:

ドキュメントを削除して、その履歴を確認しましょう。

```javascript
> Delete(Ref(Collection("Lasers"), "275752290343715347"))

> Paginate(Events(Ref(Collection("Lasers"), "275752290343715347")))

{
  data: [
    {
      ts: 1599236727185000,
      action: "create",
      document: Ref(Collection("Lasers"), "275752290343715347"),
      data: {
        olor: "BLUE"
      }
    },
    {
      ts: 1599236793325000,
      action: "delete",
      document: Ref(Collection("Lasers"), "275752290343715347"),
      data: null
    }
  ]
}
```

We could now use the timestamp of the **create** event with **At()** to read it:

At（）で create イベントのタイムスタンプを使用して読み取ることができるようになりました。

```javascript
> At(
  1599236727185000,
  Get(Ref(Collection("Lasers"), "275752290343715347"))
)

{
  ref: Ref(Collection("Lasers"), "275752290343715347"),
  ts: 1599236727185000,
  data: {
    color: "BLUE"
  }
}
```

And finally restore the data before deletion, by simply creating a document with the same reference and data:

そして最後に、同じ参照とデータでドキュメントを作成するだけで、削除する前にデータを復元します。

```javascript
> Let(
  {
    deletedDoc: At(
      1599236727185000,
      Get(Ref(Collection("Lasers"), "275752290343715347"))
    ),
    ref: Select(["ref"], Var("deletedDoc")),
    data: Select(["data"], Var("deletedDoc"))
  },
  Create(
    Var("ref"),
    { data: Var("data") }
  )
)

{
  ref: Ref(Collection("Lasers"), "275752290343715347"),
  ts: 1599237181566000,
  data: {
    color: "BLUE"
  }
}
```

**Quick note:** [Let()](https://docs.fauna.com/fauna/current/api/fql/functions/let?lang=javascript) not only allows us to format output objects but also execute any output query like we're doing here after having collected the necessary data.

クイックノート： Let（）を使用すると、出力オブジェクトをフォーマットできるだけでなく、必要なデータを収集した後、ここで行っているように出力クエリを実行することもできます。

Let's check what happened to the document's history:

ドキュメントの履歴に何が起こったのかを確認しましょう。

```javascript
Paginate(Events(Ref(Collection("Lasers"), "275752290343715347")));

{
  data: [
    {
      ts: 1599236727185000,
      action: "create",
      document: Ref(Collection("Lasers"), "275752290343715347"),
      data: {
        color: "BLUE",
      },
    },
    {
      ts: 1599236793325000,
      action: "delete",
      document: Ref(Collection("Lasers"), "275752290343715347"),
      data: null,
    },
    {
      ts: 1599237181566000,
      action: "create",
      document: Ref(Collection("Lasers"), "275752290343715347"),
      data: {
        color: "BLUE",
      },
    },
  ];
}
```

As you can see, even though we created a new document, the new **create** event has been appended to the previous history for that reference. This is happening because the history is actually associated with a document reference.

ご覧のとおり、新しいドキュメントを作成しましたが、その参照用に新しい作成イベントが以前の履歴に追加されています。これは、履歴が実際にドキュメント参照に関連付けられているために発生しています。

# Use cases and considerations

ユースケースと考慮事項

Now that we've seen an overview of the temporal features in Fauna let's examine a couple of common use cases in more detail.

動物相の時間的特徴の概要を見てきたので、いくつかの一般的な使用例をさらに詳しく調べてみましょう。

## Safe delete

安全な削除

It's very common in databases without history or versioning to follow a couple of patterns to prevent data loss. One of those patterns marks data as deleted but keeps it around in its original place. This practice is usually called "soft delete". Another alternative is to have a "recycle bin", that's a table or a collection where you move the data to be deleted instead of actually deleting it.

履歴やバージョン管理のないデータベースでは、データの損失を防ぐためにいくつかのパターンに従うのが非常に一般的です。これらのパターンの 1 つは、データを削除済みとしてマークしますが、元の場所に保持します。この方法は通常、「ソフト削除」と呼ばれます。もう 1 つの方法は、「ごみ箱」を用意することです。これは、実際にデータを削除するのではなく、削除するデータを移動するテーブルまたはコレクションです。

Both of these patterns have pros and cons, and you can certainly implement them with Fauna. Although, unless you need specific features, the simplest option is certainly to delete documents as usual and use the temporal features we just saw to keep deleted data around for as long as you need it.

これらのパターンには両方とも長所と短所があり、Fauna で確実に実装できます。ただし、特定の機能が必要でない限り、最も簡単なオプションは、通常どおりドキュメントを削除し、先ほど見た一時的な機能を使用して、削除されたデータを必要な限り保持することです。

There are two major points to consider though:

ただし、考慮すべき 2 つの主要なポイントがあります。

1.  Fauna stores every single document change in its history, which occupies storage space. It might be overkill for simple safe delete at scale if you don't need document versioning.

動物相は、ストレージスペースを占有する履歴内のすべてのドキュメントの変更を保存します。ドキュメントのバージョン管理が必要ない場合、大規模で単純な安全な削除を行うのはやり過ぎかもしれません。

2.  Since querying the history returns an array of events, you won't have as much flexibility as you would have by storing the deleted documents in a dedicated collection. For example, by using a "recycle bin" collection approach, you could use indexes and filter deleted documents by user, deletion reason, etc.

履歴をクエリするとイベントの配列が返されるため、削除されたドキュメントを専用のコレクションに保存する場合ほどの柔軟性はありません。たとえば、「ごみ箱」収集アプローチを使用すると、インデックスを使用して、削除されたドキュメントをユーザー、削除理由などでフィルタリングできます。

## Version control

バージョン管理

Another major use case for the temporal features of Fauna is storing and keeping track of content changes. Let's say you're working on SpaceDocs, the next app for collaborative writing of spacey documents. You obviously need a version history feature to keep track of changes.

動物相の時間的特徴のもう 1 つの主要な使用例は、コンテンツの変更を保存および追跡することです。スペースのあるドキュメントを共同で作成するための次のアプリである SpaceDocs に取り組んでいるとしましょう。変更を追跡するには、明らかにバージョン履歴機能が必要です。

Storage shouldn't be a concern here, since you would be storing all of the versions anyway, say in a **DocVersions** collection. But, again, if you used the history to keep older versions around you wouldn't be able to use common FQL features such as indexes. Maybe this would limit the kind of features you can build in the future.

とにかくすべてのバージョンを、たとえば DocVersions コレクションに保存するので、ここではストレージを気にする必要はありません。ただし、履歴を使用して古いバージョンを保持している場合は、インデックスなどの一般的な FQL 機能を使用できません。たぶん、これはあなたが将来構築できる機能の種類を制限するでしょう。

Again, it all depends on your use case.

繰り返しますが、それはすべてあなたのユースケースに依存します。

# Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In the following article of the series, we will continue our space adventure by checking on aggregation queries and other features.

シリーズの次の記事では、集計クエリやその他の機能をチェックして、宇宙の冒険を続けます。

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
