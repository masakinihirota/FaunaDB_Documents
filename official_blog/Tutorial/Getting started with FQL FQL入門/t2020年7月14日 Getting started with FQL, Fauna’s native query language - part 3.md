Getting started with FQL, Fauna’s native query language - part 3
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3

# Getting started with FQL, Fauna’s native query language - part 3

Faunaのネイティブクエリ言語である FQL の使用を開始する-パート 3

Pier Bover|Jul 14th, 2020|

2020 年 7 月 14 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Welcome back, fellow space developer! We will continue our FQL space journey in this five-part series of articles.

ようこそ、仲間の宇宙開発者！この 5 部構成のシリーズの記事では、FQL 宇宙の旅を続けます。

- [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
- [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
- Part 3: a look into the principles of modeling data with Fauna
- [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
- [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

パート 1：FQL と基本的なFaunaの概念を見る
パート 2：Faunaを使ったインデックスの詳細
パート 3：Faunaを使用したデータのモデリングの原則の調査
パート 4：Faunaで直接実行されるカスタム関数を作成する方法を見てみましょう
パート 5：Faunaの認証と承認について

Today we're going to take a look into the principles of modeling data with Fauna.

今日は、Faunaを使用したデータのモデリングの原則について見ていきます。

## In this article:

今回の記事

- Introduction
- Normalization and denormalization
- Nested data
- References in Fauna
- Arrays of references
- Many-to-many relationships

前書き
正規化と非正規化
ネストされたデータ
Faunaの参照
参照の配列
多対多の関係

## Introduction

前書き

Fauna is a rare breed in the world of databases as it allows you to model and query your data using different paradigms:

Faunaは、さまざまなパラダイムを使用してデータをモデル化およびクエリできるため、データベースの世界では珍しい品種です。

- Relational
- Documents (schemaless)
- Temporal
- Graph-like

関連した
ドキュメント（スキーマレス）
一時的
グラフのような

As we'll see in this article, by having the flexibility to switch between different models, you can avoid common pitfalls inherent in each approach.

この記事で説明するように、異なるモデルを柔軟に切り替えることで、各アプローチに固有の一般的な落とし穴を回避できます。

Today we'll focus on documents and relational modeling techniques.

今日は、ドキュメントとリレーショナルモデリング手法に焦点を当てます。

## Normalization and denormalization

正規化と非正規化

Document-based databases typically require that you resort to data duplication (denormalization) to be able to produce the answers needed for your application and implement certain access patterns.

ドキュメントベースのデータベースでは、通常、アプリケーションに必要な回答を生成し、特定のアクセスパターンを実装できるようにするために、データ重複排除（非正規化）に頼る必要があります。

Here's a very simplistic example. Say we have millions of stored chat messages with this format:

これは非常に単純な例です。この形式で何百万ものチャットメッセージが保存されているとします。

```javascript
{
  author: "Admiral Ackbar",
  message: "It's a trap!",
  timestamp: 1591475572346
}
```

That would make it super fast to retrieve a list of messages with the name of the author in our SpaceChat app.

これにより、SpaceChat アプリで作成者の名前が付いたメッセージのリストを非常に高速に取得できます。

But what if our users now want to update their name? We'd need to perform millions of write operations. This is slow and impractical, but also very expensive since most document-based databases charge you by the number of document operations.

しかし、ユーザーが自分の名前を更新したい場合はどうでしょうか。何百万もの書き込み操作を実行する必要があります。これは遅くて実用的ではありませんが、ほとんどのドキュメントベースのデータベースはドキュメント操作の数によって課金されるため、非常にコストがかかります。

If you're using a database that does not support ACID transactions, such big updates could even be dangerous as there is no guarantee about the final state of the transaction.

ACID トランザクションをサポートしていないデータベースを使用している場合、トランザクションの最終状態についての保証がないため、このような大きな更新は危険でさえあります。

**Quick note:** Fauna offers ACID transactions, so this wouldn't be a problem here. Besides, since Fauna stores each document's complete event history, you could rollback the document to any previous state (as far back as defined by [history_days](https://docs.fauna.com/fauna/current/api/fql/collections) on the collection which can be set to forever/indefinite).

クイックノート： Fauna は ACID トランザクションを提供するため、ここでは問題になりません。さらに、Fauna は各ドキュメントの完全なイベント履歴を保存するため、ドキュメントを以前の状態にロールバックできます（永久/無期限に設定できるコレクションの history_days で定義されている限り）。

In relational databases, this problem is non-existent as data is commonly normalized, or in other words, each bit of data is unique across the whole database. Normalization was born out of the necessity to (1) save money decades ago when storage was extremely expensive, but also (2) help maintain consistent data and avoid the problem of denormalization we just saw.

リレーショナルデータベースでは、データは一般的に正規化されているため、この問題は存在しません。つまり、データの各ビットはデータベース全体で一意です。正規化は、（1）ストレージが非常に高価だった数十年前にお金を節約するだけでなく、（2）一貫したデータを維持し、今見た非正規化の問題を回避する必要性から生まれました。

In a relational database, the name of the user would only exist in a single row of the Users table:

リレーショナルデータベースでは、ユーザーの名前は、Users テーブルの 1 行にのみ存在します。

```javascript
USERS
Id      Name
123     Admiral Ackbar

MESSAGES
Id      Message          authorId
23462   It's a trap!     123
```

Cool, so now you'd only need to update the name in a single place.

かっこいいので、名前を 1 か所で更新するだけで済みます。

Ah, but this introduces another problem. To retrieve a message, now the database needs to read data from multiple places on the disk and join that data back together before returning it to the application. The more tables involved when performing a query, the more CPU and disk IO you will consume. Eventually, this will become slow and expensive once you start having users all around the galaxy.

ああ、でもこれは別の問題を引き起こします。メッセージを取得するには、データベースがディスク上の複数の場所からデータを読み取り、そのデータを結合してからアプリケーションに返す必要があります。クエリの実行時に関係するテーブルが多いほど、消費する CPU とディスク IO も多くなります。最終的には、銀河全体にユーザーがいるようになると、これは遅くて費用がかかります。

In data modeling, it's all about tradeoffs. Sometimes, you will want to design your model for performance, sometimes for querying flexibility, and sometimes for cost.

データモデリングでは、トレードオフがすべてです。パフォーマンス、クエリの柔軟性、コストを考慮してモデルを設計したい場合があります。

## Nested data

ネストされたデータ

So far, we've been working with single entities stored on single document objects:

これまで、単一のドキュメントオブジェクトに格納されている単一のエンティティを処理してきました。

- A pilot
- A planet
- A spaceship

パイロット
惑星
宇宙船

You could get pretty far with simple documents and indexes, but at some point you will need to model more complex data.

単純なドキュメントとインデックスでかなり遠くまで行くことができますが、ある時点で、より複雑なデータをモデル化する必要があります。

It's possible to use a single document to store multiple data entities together for _one-to-one_ and _one-to-few_ relationships. Let's say we wanted to model the weapons carried by our space pilots:

1 つのドキュメントを使用して、1 対 1 および 1 対少数の関係で複数のデータエンティティを一緒に格納することができます。宇宙パイロットが携行する武器をモデル化したいとしましょう。

```javascript
{
  name: "Flash Gordon",
  weapons: [
    {
      type: "LASER_GUN",
      damage: 12
    }
  ]
}
```

It seems almost natural in the document-based paradigm to model hierarchical data this way, but beware. There are some important points that need to be taken into consideration and may not be obvious.

ドキュメントベースのパラダイムでは、このように階層データをモデル化するのはほぼ自然に思えますが、注意してください。考慮に入れる必要があり、明白ではないかもしれないいくつかの重要な点があります。

#### **How much data are we nesting?**

どのくらいのデータをネストしていますか？

We know it's unlikely our pilots will carry more than a dozen weapons. On the other hand, imagine we wanted to model galaxies, stars, planets, etc, for a SpaceMaps app. Since each galaxy can have billions of stars, this might not be a great idea:

私たちのパイロットがダース以上の武器を運ぶ可能性は低いことを私たちは知っています。一方、SpaceMaps アプリ用に銀河、星、惑星などをモデル化したいとします。各銀河には数十億の星が存在する可能性があるため、これは素晴らしいアイデアではないかもしれません。

```javascript
{
  name: "Solar System",
  stars: [
    {
      name: "Sun",
      brightness: −26.74,
      massKg: 2000000000000000000000000000000
    },
    // etc...
  ]
}
```

Galaxies can have billions of stars and your galaxy document would become huge.

銀河には数十億の星が存在する可能性があり、銀河のドキュメントは巨大になります。

Fauna does not impose a size limit on documents, but as they get bigger, performance will start to degrade. The [documentation](https://docs.fauna.com/fauna/current/api/fql/documents#limits) warns us that we could start seeing degraded performance with documents larger than 5MB.

Faunaはドキュメントにサイズ制限を課しませんが、ドキュメントが大きくなると、パフォーマンスが低下し始めます。ドキュメントには、私たちが 5 メガバイトを超える文書とパフォーマンス低下を見始めることができることを私たちに警告しています。

Personally, I would strive to keep my documents much smaller than that. Even 1MB can hold a lot of data if you consider The Odyssey (yes, that ancient Greek book) can fit in a [700kB text file](https://www.gutenberg.org/ebooks/1727).

個人的には、ドキュメントをそれよりもはるかに小さく保つように努めます。オデッセイ（そう、その古代ギリシャの本）が 700kB のテキストファイルに収まると考えると、1MB でも大量のデータを保持できます。

#### **Will the data grow?**

データは増えますか？

This nesting pattern is not a great fit for use cases where the data either could grow indefinitely, or is unbound.

このネストパターンは、データが無期限に大きくなる可能性がある、またはバインドされていないユースケースには適していません。

For example, in SpaceAdvisor, our app for reviewing space hotels and restaurants, we will definitely not want to store reviews inside the properties documents:

たとえば、宇宙のホテルやレストランをレビューするためのアプリである SpaceAdvisor では、プロパティドキュメント内にレビューを保存したくないことは間違いありません。

```javascript
{
  name: "The Nebula Gourmet",
  type: "RESTAURANT",
  reviews: [
    {
      title: "Delicious",
      stars: 5,
      message: "Best filet mignon in the whole quadrant!"
    },
    // etc...
  ]
}
```

Again, one problem here is that documents could potentially become huge and we don't want that. Additionally, accessing heavily nested data often requires more coding, so it should only be done in the context of your access patterns, as we'll discuss in the next few sections.

繰り返しになりますが、ここでの 1 つの問題は、ドキュメントが巨大になる可能性があることです。さらに、高度にネストされたデータにアクセスするには、多くの場合、より多くのコーディングが必要になるため、次のいくつかのセクションで説明するように、アクセスパターンのコンテキストでのみ実行する必要があります。

#### **How are we going to query the data?**

データをどのようにクエリしますか？

Another important consideration before nesting entities in a single document is knowing in advance what access patterns we'll need on those entities. This is critical in document-based databases as your design is usually coupled to your access patterns.

エンティティを単一のドキュメントにネストする前のもう 1 つの重要な考慮事項は、それらのエンティティに必要なアクセスパターンを事前に知っていることです。通常、設計はアクセスパターンに関連付けられているため、これはドキュメントベースのデータベースでは重要です。

For example, you might think that it would be ok to store the planets and their moons together in our SpaceMaps app.

たとえば、SpaceMaps アプリに惑星とその衛星を一緒に保存しても問題ないと思うかもしれません。

```javascript
{
  name: "Earth",
  moons: [
    {
      name: "Luna",
      massKg: 73420000000000000000000
    }
  ]
}
```

A priori, it would seem this pattern is perfect for this use case. After all, it's unlikely a planet will have more than, say, a couple hundred moons in some extreme cases and this number will practically never change.

先験的に、このパターンはこのユースケースに最適であるように思われます。結局のところ、極端な場合には、惑星に数百を超える衛星が存在する可能性は低く、この数は実質的に変化しません。

But what if at some point we wanted to list and sort all the moons in our SpaceMaps app? This nesting pattern wouldn't be appropriate for this use case as we wouldn't be able to index and query the moons properly.

しかし、ある時点で SpaceMaps アプリのすべての衛星を一覧表示して並べ替えたいとしたらどうでしょうか。このネストパターンは、衛星のインデックス作成とクエリを適切に行うことができないため、このユースケースには適していません。

#### **How often are we going to update the data?**

どのくらいの頻度でデータを更新しますか？

Finally, even if your use case perfectly fits the nesting pattern, you have to consider how often you are going to update that document. The more frequently you update a document, the less efficient this pattern becomes.

最後に、ユースケースがネストパターンに完全に適合している場合でも、そのドキュメントを更新する頻度を考慮する必要があります。ドキュメントを頻繁に更新するほど、このパターンの効率は低下します。

Remember that Fauna provides worldwide immediate consistency. Every time you change a document, it needs to be updated to all clusters in the world. There are physical constraints such as the speed of light which make very frequent updates around the world not very practical.

Faunaは世界的な即時の一貫性を提供することを忘れないでください。ドキュメントを変更するたびに、世界中のすべてのクラスターに更新する必要があります。光の速度などの物理的な制約があり、世界中で頻繁に更新することはあまり実用的ではありません。

#### **How fast and how often do we need to retrieve our data?**

データを取得する必要がある速度と頻度はどれくらいですか？

Don't get me wrong: if your use case requires the best possible performance, nesting the data into a document might actually be your best option (assuming it's still under 1 MB). In Fauna, like in any other document-based database, retrieving a single document is the fastest operation there is. Just take the previous points into consideration if you need to do that.

誤解しないでください。ユースケースで可能な限り最高のパフォーマンスが必要な場合は、データをドキュメントにネストするのが実際には最善の選択肢かもしれません（まだ 1 MB 未満であると想定）。Faunaでは、他のドキュメントベースのデータベースと同様に、単一のドキュメントを取得するのが最速の操作です。それを行う必要がある場合は、前のポイントを考慮に入れてください。

## References in Fauna

Faunaの参照

Previously, we saw that each document in Fauna has a reference that identifies it with a unique id inside a collection.

以前、Fauna の各ドキュメントには、コレクション内の一意の ID でドキュメントを識別する参照があることを確認しました。

Here is a pilot document from a previous article:

これは前の記事からのパイロットドキュメントです：

```javascript
{
  "ref": Ref(Collection("Pilots"), "266350546751848978"),
  "ts": 1590270525630000,
  "data": {
    "name": "Flash Gordon"
  }
}
```

The reference to this document has a unique id of **266350546751848978**, but remember that by itself the id is not very useful. It only makes sense when paired with a collection to create a reference.

このドキュメントへの参照の一意の ID は 266350546751848978 ですが、それ自体では ID があまり役に立たないことに注意してください。コレクションと組み合わせて参照を作成する場合にのみ意味があります。

#### **References to other documents**

他のドキュメントへの参照

Obviously, we can also use the [Ref](https://docs.fauna.com/fauna/current/api/fql/functions/ref) type to reference other documents. To demonstrate this, let's revisit our SpaceMaps app.

もちろん、Ref タイプを使用して他のドキュメントを参照することもできます。これを実証するために、SpaceMaps アプリに戻りましょう。

We already have a **Planets** collection from a previous article. For reference, here's the document for Earth:

前回の記事の Planets コレクションはすでにあります。参考までに、Earth のドキュメントは次のとおりです。

```javascript
{
  "ref": Ref(Collection("Planets"), "267081091831038483"),
  "ts": 1590977345595000,
  "data": {
    "name": "Earth",
    "type": "TERRESTRIAL",
    "color": "BLUE"
  }
}
```

Now, let's create a Moons collection:

それでは、Moons コレクションを作成しましょう。

```javascript
CreateCollection({ name: "Moons" });
```

And let's create a moon document with a reference to a planet document:

そして、惑星ドキュメントを参照して月ドキュメントを作成しましょう。

```javascript
Create(
  Collection("Moons"),
  {
    data: {
      name: "Luna",
      planetRef: Ref(Collection("Planets"), "267081091831038483")
    }
  }
)

// Result:

{
  ref: Ref(Collection("Moons"), "267691276872188416"),
  ts: 1591549145540000,
  data: {
    name: "Luna",
    planetRef: Ref(Collection("Planets"), "267081091831038483")
  }
}
```

We just created a _one-to-many_ relationship since it is possible for many moons to share the same planet.

多くの衛星が同じ惑星を共有する可能性があるため、1 対多の関係を作成しました。

We can now retrieve all moons in our database using the [Documents](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function to avoid creating an index like we saw in a previous article:

これで、Documents 関数を使用してデータベース内のすべての衛星を取得し、前の記事で見たようなインデックスの作成を回避できます。

```javascript
Map(
  Paginate(Documents(Collection("Moons"))),
  Lambda("moonRef", Get(Var("moonRef")))
);
```

We could also create an index to find all the moons for a given planet:

また、特定の惑星のすべての衛星を見つけるためのインデックスを作成することもできます。

```javascript
CreateIndex({
  name: "all_Moons_by_planet",
  source: [Collection("Moons")],
  terms: [{ field: ["data", "planetRef"] }],
});

// Query the index:

Map(
  Paginate(
    Match(
      Index("all_Moons_by_planet"),
      Ref(Collection("Planets"), "267081091831038483")
    )
  ),
  Lambda("moonRef", Get(Var("moonRef")))
);
```

**Quick note:** If these FQL commands for indexes are confusing, you might want to revisit the [previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2) where all these are explained in detail.

クイックノート：インデックス用のこれらの FQL コマンドがわかりにくい場合は、これらすべてが詳細に説明されている前の記事に再度アクセスすることをお勧めします。

#### **One-to-one constraints**

1 対 1 の制約

If you'd like to enforce a _one-to-one_ relationship, you can do that by creating an index with a unique constraint like we saw in the previous article:

1 対 1 の関係を強制したい場合は、前の記事で見たように、一意の制約を持つインデックスを作成することでそれを行うことができます。

```javascript
CreateIndex({
  name: "only_one_Moon_per_planet",
  source: [Collection("Moons")],
  terms: [{ field: ["data", "planetRef"] }],
  unique: true,
});
```

Now, if we try to create another moon on planet Earth, we'll get an error:

さて、地球上に別の月を作成しようとすると、エラーが発生します。

```javascript
Create(
  Collection("Moons"),
  {
    data: {
      name: "Luna 2",
      planetRef: Ref(Collection("Planets"), "267081091831038483")
    }
  }
)

// Result:

error: instance not unique
document is not unique.
position: ["create"]
```

#### **Foreign keys**

外部キー

In Fauna, like its purely document-based cousins, there is no out-of-the-box concept of foreign keys like in relational databases. That is, without writing a custom function, Fauna will not verify if a document exists when creating a reference, nor will it warn you if you are deleting a document that is referenced elsewhere; it will not cascade delete related documents.

Faunaでは、純粋にドキュメントベースのいとこのように、リレーショナルデータベースのような外部キーのすぐに使える概念はありません。つまり、カスタム関数を記述しないと、Fauna は参照の作成時にドキュメントが存在するかどうかを確認せず、他の場所で参照されているドキュメントを削除する場合にも警告を表示しません。関連ドキュメントをカスケード削除しません。

This might sound like a deal breaker, but I've found in practice that it's not much of a big deal. Even in the relational world, it's much more common to soft delete rows than to actually delete rows, just in case. Also, many of the big apps and websites you use do not support foreign keys either. They run on purely document-based databases that were the only options available to meet their high global performance needs at the time.

これは取引のブレーカーのように聞こえるかもしれませんが、実際にはそれほど大したことではないことがわかりました。リレーショナルの世界でも、万が一の場合に備えて、実際に行を削除するよりも、行をソフト削除する方がはるかに一般的です。また、使用する大きなアプリや Web サイトの多くは、外部キーもサポートしていません。それらは純粋にドキュメントベースのデータベースで実行され、当時の高いグローバルパフォーマンスのニーズを満たすために利用できる唯一のオプションでした。

Besides, if you do need this kind of functionality for a particular use case, it can be implemented using a custom FQL function.

さらに、特定のユースケースでこの種の機能が必要な場合は、カスタム FQL 関数を使用して実装できます。

## Arrays of references

参照の配列

You could also model your _one-to-few_ relationships by using arrays of references. This could be more convenient in certain situations where the data is frequently accessed together, but you still want to be able to query the entities independently and more efficiently.

参照の配列を使用して、1 対数の関係をモデル化することもできます。これは、データが頻繁に一緒にアクセスされる特定の状況でより便利な場合がありますが、それでもエンティティを独立してより効率的にクエリできるようにする必要があります。

For example, we could store the moon references in our planet document this way:

たとえば、次の方法で惑星ドキュメントに月の参照を保存できます。

```javascript
{
  "name": "Earth",
  "type": "TERRESTRIAL",
  "color": "BLUE",
  "moonRefs": [
    Ref(Collection("Moons"), "267691276872188416")
  ]
}
```

Then, to query a planet with all its moon documents you could use [Map](https://docs.fauna.com/fauna/current/api/fql/functions/map), [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let), and [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select) like we learned previously when querying indexes:

次に、すべての月のドキュメントを含む惑星をクエリするには、インデックスをクエリするときに以前に学習したように、Map、Let、および Select を使用できます。

```javascript
Let(
  {
    planetDoc: Get(Ref(Collection("Planets"), "267081091831038483"))
  },
  {
    planet: Var("planetDoc"),
    moons: Map(
      Select(["data", "moonRefs"], Var("planetDoc")),
      Lambda("moonRef", Get(Var("moonRef")))
    )
  }
)

// Result:

{
  planet: {
    ref: Ref(Collection("Planets"), "267081091831038483"),
    ts: 1591554900130000,
    data: {
      name: "Earth",
      type: "TERRESTRIAL",
      color: "BLUE",
      moonRefs: [Ref(Collection("Moons"), "267691276872188416")]
    }
  },
  moons: [
    {
      ref: Ref(Collection("Moons"), "267691276872188416"),
      ts: 1591553627340000,
      data: {
        name: "Luna",
        planetRef: Ref(Collection("Planets"), "267081091831038483")
      }
    }
  ]
}
```

Or, if you only wanted to get the names and ids instead of the full documents, you could do this instead:

または、完全なドキュメントではなく名前と ID のみを取得したい場合は、代わりに次のようにすることができます。

Let(

```javascript
Let(
  {
    planetDoc: Get(Ref(Collection("Planets"), "267081091831038483"))
  },
  {
    planet: Let({}, {
      id: Select(["ref","id"], Var("planetDoc")),
      name: Select(["data","name"], Var("planetDoc")),
      moons: Map(
        Select(["data", "moonRefs"], Var("planetDoc")),
        Lambda("moonRef", Let(
          {
            moonDoc: Get(Var("moonRef"))
          },
          {
            id: Select(["ref","id"], Var("moonDoc")),
            name: Select(["data","name"], Var("moonDoc"))
          }
        ))
      )
    })
  }
)

// Result:

{
  planet: {
    id: "267081091831038483",
    name: "Earth",
    moons: [
      {
        id: "267691276872188416",
        name: "Luna"
      }
    ]
  }
}
```

This query may seem intimidating, but if you inspect it in more detail, you will see that it is only using FQL functions we've already learned in the previous articles. FQL is a lot closer to a functional programming language than a declarative language like SQL, so it might help to think about it that way.

このクエリは恐ろしいように思えるかもしれませんが、さらに詳しく調べると、以前の記事ですでに学習した FQL 関数のみを使用していることがわかります。FQL は、SQL のような宣言型言語よりも関数型プログラミング言語に非常に近いため、そのように考えると役立つ場合があります。

## Many-to-many relationships

多対多の関係

As we've seen in previous examples, many-to-many relationships can be expressed with indexes and/or arrays of references. Let's look at a use case for that.

前の例で見たように、多対多の関係は、インデックスや参照の配列で表すことができます。そのユースケースを見てみましょう。

There is a bit of chaos in the dock and our boss, the admiral, has tasked us with creating a system for managing spaceship repairs. Armed with our new knowledge about references and relationships in Fauna, we should be able to solve this in no time!

ドックには少し混乱があり、私たちの上司である提督は、宇宙船の修理を管理するためのシステムを作成するように私たちに任せました。Faunaの参照と関係についての新しい知識を身につければ、これをすぐに解決できるはずです！

First, we need to be able to track our personnel:

まず、担当者を追跡できる必要があります。

```javascript
CreateCollection({ name: "DockTechnicians" });
```

Let's add all the people working in the dock:

ドックで働くすべての人を追加しましょう：

```javascript
Create(Collection("DockTechnicians"), {
  data: { name: "Johnny Sparkles" },
});

// etc...
```

We already have a Spaceships collection from our previous articles. For simplicity's sake, we're going to assume all ships are in the dock right now.

以前の記事からの Spaceships コレクションはすでにあります。簡単にするために、すべての船が現在ドックにあると仮定します。

Now, to assign a technician to a ship, we could just maintain an array of spaceships references in the technician document:

これで、技術者を船に割り当てるために、技術者ドキュメントで一連の宇宙船の参照を維持することができます。

```javascript
Update(Ref(Collection("DockTechnicians"), "267703813461246483"), {
  data: {
    workingOn: [Ref(Collection("Spaceships"), "266356873589948946")],
  },
});
```

Waaait a minute!

ちょっと待って！

The admiral specifically said he not only wanted to know which technicians worked on which spaceships, but also which repairs were in process and how long each repair took.

提督は、どの技術者がどの宇宙船で働いているかだけでなく、どの修理が進行中であり、各修理にかかった時間も知りたいと具体的に述べました。

#### **Join collections**

コレクションに参加する

In the relational world, it's very common to model many-to-many relationships with an entity using a join table, or a bridging table.

リレーショナルの世界では、結合テーブルまたはブリッジテーブルを使用してエンティティとの多対多の関係をモデル化するのが非常に一般的です。

This is done in part because, with a rigid schema, you'd need to add more columns to relate a row to other rows. But there is another important reason which actually solves our problem. When modeling a relationship with an independent entity, you can assign data to that relationship.

これは、厳密なスキーマでは、行を他の行に関連付けるために列を追加する必要があるためです。しかし、実際に私たちの問題を解決する別の重要な理由があります。独立したエンティティとの関係をモデル化する場合、その関係にデータを割り当てることができます。

What if we actually had a collection to track the repairs that also associated technicians with spaceships?

技術者と宇宙船を関連付けた修理を追跡するためのコレクションが実際にあった場合はどうなりますか？

```javascript
CreateCollection({ name: "DockRepairs" });
```

And now, let's create the first repair:

そして今、最初の修復を作成しましょう：

```javascript
Create(
  Collection("DockRepairs"),
  {
    data: {
      technicianRefs: [
        Ref(Collection("DockTechnicians"), "267703813461246483")
      ],
      shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
      status: 'PENDING'
    }
  }
)

// Result:

{
  ref: Ref(Collection("DockRepairs"), "267705685715714560"),
  ts: 1591562886860000,
  data: {
    technicianRefs: [
      Ref(Collection("DockTechnicians"), "267703813461246483")
    ],
    shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
    status: "PENDING"
  }
}
```

So now we know the status of a ship repair and which technicians are assigned to it. Neat.

これで、船の修理の状況と、それに割り当てられている技術者がわかりました。きちんとした。

Let's start a repair:

修理を始めましょう：

```javascript
Update(
  Ref(Collection("DockRepairs"), "267705685715714560"),
  {
    data: {
      startTimestamp: Time('2355-02-11T05:23:11Z'),
      status: 'IN_PROCESS'
    }
  }
)

// Result:

{
  ref: Ref(Collection("DockRepairs"), "267705685715714560"),
  ts: 1591563124590000,
  data: {
    technicianRefs: [
      Ref(Collection("DockTechnicians"), "267703813461246483")
    ],
    shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
    status: "IN_PROCESS",
    startTimestamp: Time("2355-02-11T05:23:11Z")
  }
}
```

And now let's finish the repair:

そして今、修理を終えましょう：

```javascript
Update(
  Ref(Collection("DockRepairs"), "267705685715714560"),
  {
    data: {
      endTimestamp: Time('2355-02-11T03:05:35Z'),
      status: 'DONE'
    }
  }
)

// Result:

{
  ref: Ref(Collection("DockRepairs"), "267705685715714560"),
  ts: 1591563210950000,
  data: {
    technicianRefs: [
      Ref(Collection("DockTechnicians"), "267703813461246483")
    ],
    shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
    status: "DONE",
    startTimestamp: Time("2355-02-11T05:23:11Z"),
    endTimestamp: Time("2355-02-11T03:05:35Z")
  }
}
```

Great!

すごい！

Now with this simple index, we can see all repairs and their info:

この単純なインデックスを使用すると、すべての修復とその情報を確認できます。

```javascript
CreateIndex({
  name: "all_DockRepairs",
  source: [Collection("DockRepairs")],
});
```

Not bad, if I say so myself.

私がそう言うなら、悪くはない。

#### **But how long do repairs actually take?**

しかし、修理には実際にどのくらい時間がかかりますか？

We could have added a **duration** property to our documents and stored a value when ending a repair, but where is the fun in that? With FQL, there are other ways to accomplish this.

ドキュメントに duration プロパティを追加し、修復を終了するときに値を保存することもできますが、その面白さはどこにありますか？FQL を使用すると、これを実現する他の方法があります。

For example, we could just determine the duration when querying our data without having to implement it in our application logic:

たとえば、アプリケーションロジックにデータを実装しなくても、データをクエリするときに期間を決定できます。

```javascript
Map(
  Paginate(Match(Index("all_DockRepairs"))),
  Lambda(
    "repairRef",
    Let(
      {
        repairDoc: Get(Var("repairRef")),
      },
      {
        durationMinutes: If(
          Or(
            IsNull(Select(["data", "startTimestamp"], Var("repairDoc"), null)),
            IsNull(Select(["data", "endTimestamp"], Var("repairDoc"), null))
          ),
          null,
          TimeDiff(
            Select(["data", "endTimestamp"], Var("repairDoc")),
            Select(["data", "startTimestamp"], Var("repairDoc")),
            "minutes"
          )
        ),
        repair: Var("repairDoc"),
      }
    )
  )
);

// Result:

{
  data: [
    {
      durationMinutes: 137,
      repair: {
        ref: Ref(Collection("DockRepairs"), "267705685715714560"),
        ts: 1591563210950000,
        data: {
          technicianRefs: [
            Ref(Collection("DockTechnicians"), "267703813461246483"),
          ],
          shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
          status: "DONE",
          startTimestamp: Time("2355-02-11T05:23:11Z"),
          endTimestamp: Time("2355-02-11T03:05:35Z"),
        },
      },
    },
  ];
}
```

Woah.

うわー。

Again, this query may seem complicated, but we already know most of the stuff from previous articles.

繰り返しになりますが、このクエリは複雑に見えるかもしれませんが、以前の記事からほとんどのものをすでに知っています。

Here's the new part:

新しい部分は次のとおりです。

```javascript
If(
  Or(
    IsNull(Select(["data", "startTimestamp"], Var("repairDoc"), null)),
    IsNull(Select(["data", "endTimestamp"], Var("repairDoc"), null))
  ),
  null,
  TimeDiff(
    Select(["data", "endTimestamp"], Var("repairDoc")),
    Select(["data", "startTimestamp"], Var("repairDoc")),
    "minutes"
  )
);
```

What this does is check that **startTimestamp** or **endTimestamp** are not missing from the document. If both exist, then return the time difference in minutes.

これは、startTimestamp または endTimestamp がドキュメントから欠落していないことを確認します。両方が存在する場合は、時差を分単位で返します。

Let's go step-by-step.

ステップバイステップで行きましょう。

- We already know what [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select) does from previous articles. In this case, we are giving it a default value of **null** if the path **"data", "startTimestamp"** does not exist in **Var("repairDoc")**.

Select が以前の記事から何をするかはすでにわかっています。この場合、パス「data」、「startTimestamp」が Var（ "repairDoc"）に存在しない場合、デフォルト値の null を指定します。

- [IsNull](https://docs.fauna.com/fauna/current/api/fql/functions/isnull) will return **true** if a value does not exist and **Select** returns **null**.

値が存在しない場合、IsNull は true を返し、Select は null を返します。

- [Or](https://docs.fauna.com/fauna/current/api/fql/functions/or) will return true if either **startTimestamp** or **endTimestamp** do not exist in the document. If that's the case, then **If** would return **null**.

または、startTimestamp または endTimestamp のいずれかがドキュメントに存在しない場合は true を返します。その場合、If は null を返します。

- If both timestamps do exist in the repair document, we simply calculate the duration using [TimeDiff](https://docs.fauna.com/fauna/current/api/fql/functions/timediff) in minutes.

両方のタイムスタンプが修復ドキュメントに存在する場合は、TimeDiff を使用して期間を分単位で計算するだけです。

#### **Index bindings**

インデックスバインディング

There is another way to solve this. Do you remember index bindings from the [previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)? These are computed values calculated beforehand.

これを解決する別の方法があります。前の記事のインデックスバインディングを覚えていますか？これらは事前に計算された計算値です。

The decision to use index bindings comes down to how often you need to know the duration of the repairs. As explained in the previous article, bindings consume more storage but less CPU, so you have to account for that when deciding to use bindings.

インデックスバインディングを使用するかどうかの決定は、修復の期間を知る必要がある頻度に依存します。前の記事で説明したように、バインディングはより多くのストレージを消費しますが、CPU は少なくなります。したがって、バインディングを使用することを決定するときは、それを考慮する必要があります。

That said, here's a possible index to return the duration using a binding and the same conditional logic. We're also returning a custom object instead of the full document, which might make more sense when listing repairs instead of showing a detail view to your users.

とはいえ、バインディングと同じ条件付きロジックを使用して期間を返すための可能なインデックスは次のとおりです。また、ドキュメント全体ではなくカスタムオブジェクトを返します。これは、ユーザーに詳細ビューを表示する代わりに、修復を一覧表示するときに意味がある場合があります。

```javascript
CreateIndex({
  name: "all_DockRepairs_with_duration",
  source: {
    collection: Collection("DockRepairs"),
    fields: {
      durationMinutes: Query(
        Lambda(
          "repairDoc",
          If(
            Or(
              IsNull(
                Select(["data", "startTimestamp"], Var("repairDoc"), null)
              ),
              IsNull(Select(["data", "endTimestamp"], Var("repairDoc"), null))
            ),
            null,
            TimeDiff(
              Select(["data", "endTimestamp"], Var("repairDoc")),
              Select(["data", "startTimestamp"], Var("repairDoc")),
              "minutes"
            )
          )
        )
      ),
    },
  },
  values: [
    { binding: "durationMinutes" },
    { field: ["ref", "id"] },
    { field: ["data", "status"] },
  ],
});
```

Let's query it:

クエリしてみましょう：

```javascript
Map(
  Paginate(Match(Index("all_DockRepairs_with_duration"))),
  Lambda(
    "result",
    Let(
      {},
      {
        id: Select([1], Var("result")),
        status: Select([2], Var("result")),
        durationMinutes: Select([0], Var("result")),
      }
    )
  )
);

// Result:

{
  data: [
    {
      id: "267705685715714560",
      status: "DONE",
      durationMinutes: 137,
    },
  ];
}
```

## Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In part 4 of this series, we will continue our space adventure by learning how to create FQL functions to extend the basic functionality of Fauna with custom logic.

このシリーズのパート 4 では、カスタムロジックを使用してFaunaの基本機能を拡張する FQL 関数を作成する方法を学習することにより、宇宙の冒険を続けます。

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
