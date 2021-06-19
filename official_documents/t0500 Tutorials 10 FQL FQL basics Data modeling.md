Data modeling | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/basics/data_modeling

# Data modeling

データモデリング

Welcome back, fellow space developer! We are continuing our FQL space journey in this five-part tutorial.

宇宙開発者の皆さん、お帰りなさい。この5部構成のチュートリアルでは、FQL Spaceの旅を続けています。

In this third part of the tutorial, we’re going to take a look into the principles of modeling data with Fauna.

このチュートリアルの第3部では、Faunaを使ったデータモデリングの原理を見ていきましょう。

On this page:

このページでは

-   [Introduction](#introduction)
-   [Normalization and denormalization](#normalization)
-   [Nested data](#nested)
    -   [How much data are we nesting?](#nesting_amount)
    -   [Will the data grow?](#data_growth)
    -   [How are we going to query the data?](#query_plan)
    -   [How often are we going to update the data?](#update_frequency)
-   [References in Fauna](#references)
    -   [References to other documents](#other_refs)
    -   [One-to-one constraints](#one-to-one)
-   [Arrays of references](#ref_arrays)
-   [Many-to-many relationships](#many-to-many)
    -   [Join collections](#join_collections)
    -   [Index bindings](#bindings)
-   [Conclusion](#conclusion)

---

- [はじめに](#introduction)
- [正規化と非正規化](#正規化)
- [ネストされたデータ](#nested)
    - [どのくらいのデータを入れ子にしているのか](#nesting_amount)
    - [データは増えるのか](#data_growth)
    - [どのようにデータを照会するのか](#query_plan)
    - [どのくらいの頻度でデータを更新するのか](#update_frequency)
- [Faunaでの参考文献](#references)
    - [他のドキュメントへの参照](#other_refs)
    - [一対一の制約](#one-to-one)
- [参照の配列](#ref_arrays)
- [多対多の関係](#many-to-many)
    - [コレクションの結合](#join_collections)
    - [インデックスバインディング](#bindings)
- [結論](#conclusion)

## [](#introduction)Introduction

はじめに

Fauna is a rare breed in the world of databases as it allows you to model and query your data using different paradigms:

Faunaはデータベースの世界では珍しい品種で、異なるパラダイムを使ってデータをモデル化し、クエリを実行することができます。

-   Relational
-   Documents (schemaless)
-   Temporal
-   Graph-like

---

- リレーショナル
- ドキュメント(スキーマレス)
- 時系列
- グラフ的

Having the flexibility to switch between different models means that you can avoid common pitfalls inherent in each approach.

異なるモデルを柔軟に切り替えることができるということは、それぞれのアプローチに内在する共通の落とし穴を避けることができるということです。

In this part of the tutorial, we focus on documents and relational modeling techniques.

このチュートリアルでは、ドキュメントとリレーショナル・モデリング・テクニックに焦点を当てます。

## [](#normalization)Normalization and denormalization

正規化と非正規化

Document-based databases typically require that you resort to data duplication (denormalization) to be able to produce the answers needed for your application and implement certain access patterns.

ドキュメントベースのデータベースでは、アプリケーションに必要な答えを導き出し、特定のアクセスパターンを実装するために、データの重複（非正規化）に頼らなければならないのが一般的です。

Here’s a very simplistic example. Say we have millions of stored chat messages with this format:

非常に単純な例を挙げてみましょう。何百万ものチャットメッセージが保存されていて、次のようなフォーマットになっているとします。

```json
{
  author: "Admiral Ackbar",
  message: "It's a trap!",
  timestamp: 1591475572346
}
```

That would make it super fast to retrieve a list of messages with the name of the author in our SpaceChat app.

これで、SpaceChat アプリで、作者の名前を含むメッセージのリストを超高速で取得できるようになりました。

But what if our users now want to update their name? We’d potentially need to perform millions of write operations. This is slow and impractical, but also very expensive since most document-based databases charge you by the number of document operations.

しかし、ユーザーが自分の名前を更新したいと思ったらどうでしょう？その場合、何百万回もの書き込み操作が必要になる可能性があります。これは時間がかかり実用的ではありません。また、ほとんどのドキュメントベースのデータベースでは、ドキュメント操作の数に応じて課金されるため、非常に高価です。

If you’re using a database that does not support ACID transactions, big updates could even be dangerous as there is no guarantee about the final state of the transaction.

ACID トランザクションをサポートしていないデータベースを使用している場合、トランザクションの最終状態が保証されていないため、大きな更新は危険でさえあります。

Fauna offers ACID transactions, so we don’t have this problem. Besides, since Fauna stores each document’s complete event history, you could roll back the document to any previous state (as far back as defined by `history_days` on the collection, which can be set to forever/indefinite, or `ttl` on each document).

Fauna は ACID トランザクションを提供しているので、このような問題はありません。さらに、Fauna は各ドキュメントの完全なイベント履歴を保存しているので、ドキュメントを任意の以前の状態にロールバックすることができます（コレクションの `history_days` で定義された範囲内で、永遠/無期限に設定することも、各ドキュメントの `ttl` に設定することもできます）。

In relational databases, this problem is non-existent as data is commonly normalized, or in other words, each bit of data is unique across the whole database. Normalization was born out of the necessity:

リレーショナルデータベースでは、データは一般的に正規化されているので、この問題は存在しません。言い換えれば、データの各ビットはデータベース全体で一意であるということです。正規化は次のような必要性から生まれました。

1.  to save money decades ago when storage was extremely expensive, but also
2.  to help maintain consistent data and avoid the problem of denormalization that we just saw.

---

1.ストレージが非常に高価だった数十年前にコストを削減するため。
2.一貫したデータを維持し、先ほどの非正規化の問題を避けるため。

In a relational database, the name of the user would only exist in a single row of the `Users` table:

リレーショナルデータベースでは、ユーザーの名前は、`Users`テーブルの1行にしか存在しません。

```
USERS
Id      Name
123     Admiral Ackbar

MESSAGES
Id      Message          authorId
23462   It's a trap!     123
```

Cool, so now you’d only need to update the name in a single place.

これで、名前の更新は一箇所で済むようになりました。

Ah, but this introduces another problem. To retrieve a message, now the database needs to read data from multiple places in storage and join that data back together before returning it to the application.

しかし、これには別の問題があります。メッセージを取得するために、データベースはストレージの複数の場所からデータを読み込んで、アプリケーションに返す前にそのデータを結合する必要があるのです。

In data modeling, it’s all about tradeoffs. Sometimes, you want to design your model for performance, for querying flexibility, or for cost.

データモデリングでは、すべてがトレードオフの関係にあります。パフォーマンス、クエリの柔軟性、コストなどを考慮してモデルを設計する必要があります。

## [](#nested)Nested data

ネストされたデータ

So far, we’ve been working with single entities stored on single document objects:

これまでは、単一のドキュメントオブジェクトに格納された単一のエンティティを扱ってきました。

-   A pilot
-   A planet
-   A spaceship

---

- パイロット
- 惑星
- 宇宙船

You could get pretty far with simple documents and indexes, but at some point you need to model more complex data.

単純なドキュメントとインデックスで十分ですが、ある時点でより複雑なデータをモデル化する必要があります。

It’s possible to use a single document to store multiple data entities together for one-to-one and one-to-few relationships. Let’s say we wanted to model the weapons carried by our space pilots:

1つのドキュメントを使って、複数のデータエンティティを1対1または1対複数の関係で保存することができます。例えば、スペースパイロットが持っている武器をモデル化したいとしましょう。

```json
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

ドキュメントベースのパラダイムでは、階層的なデータをこのようにモデル化することはほとんど自然なことのように思えますが、注意が必要です。考慮しなければならない重要なポイントがいくつかありますが、自明ではないかもしれません。

### [](#nesting_amount)How much data are we nesting?

どのくらいのデータを入れ子にするのか？

We know it’s unlikely that our pilots would carry more than a dozen weapons. On the other hand, imagine we wanted to model galaxies, stars, planets, etc, for a SpaceMaps app. Since each galaxy can have billions of stars, this might not be a great idea:

パイロットが十数種類の武器を携帯することはまずないでしょう。一方で、SpaceMapsアプリのために、銀河や星、惑星などのモデルを作りたいとします。それぞれの銀河には何十億もの星があるので、これはあまりいいアイデアではないかもしれません。

```json
{
  name: "Milky Way",
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

If you attempted to list all of the stars in the Milky Way like that, your galaxy document would become huge.

このように天の川のすべての星をリストアップしようとすると、銀河のドキュメントは巨大になってしまいます。

Fauna does not impose a size limit on documents, but as they get bigger, performance could start to degrade. The maximum recommended size of a document is 5MB.

Fauna はドキュメントのサイズに制限を設けていませんが、サイズが大きくなるとパフォーマンスが低下する可能性があります。推奨されるドキュメントの最大サイズは5MBです。

Personally, I would strive to keep my documents much smaller than that. Even 1MB can hold a lot of data if you consider the The Odyssey — yes, _that_ ancient Greek book — can fit in a 700kB text file.

個人的には、ドキュメントのサイズはそれよりもずっと小さくしたいと思っています。例えば、古代ギリシャの書物である『オデッセイ』が700kBのテキストファイルに収まることを考えると、1MBでもかなりのデータ量になります。

### [](#data_growth)Will the data grow?

データは増えるのか？

The nesting pattern is not a great fit for use cases where the data either could grow indefinitely, or is unbound.

ネスティングパターンは、データが無限に成長する可能性があるか、または結合されていないユースケースにはあまり適していません。

For example, in SpaceAdvisor, our app for reviewing space hotels and restaurants, we definitely do not want to store reviews inside the properties documents:

例えば、宇宙関係のホテルやレストランをレビューするアプリ「SpaceAdvisor」では、レビューをプロパティドキュメントの中に保存することは絶対に避けたいです。

```json
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

Again, one problem here is that documents could potentially become huge and we don’t want that. Additionally, accessing heavily nested data often requires more coding, so it should only be done in the context of your access patterns, as we’ll discuss in the next few sections.

ここでも問題となるのは、ドキュメントが巨大化する可能性があり、それは避けたいことです。さらに、ネスト化したデータにアクセスするには、より多くのコーディングが必要になることが多いので、次のいくつかのセクションで説明するように、アクセスパターンの文脈でのみ行うべきです。

### [](#query_plan)How are we going to query the data?

どのようにデータを照会するのか？

Another important consideration, before nesting entities in a single document, is knowing in advance what access patterns that we are going to need on those entities. This is critical in document-based databases as your design is usually coupled to your access patterns.

もう1つの重要な検討事項は、1つのドキュメントにエンティティを入れ子にする前に、それらのエンティティに対してどのようなアクセスパターンが必要かを事前に知っておくことです。ドキュメントベースのデータベースでは、設計とアクセスパターンが結びついていることが多いので、これは非常に重要です。

For example, you might think that it would be okay to store the planets and their moons together in our SpaceMaps app.

例えば、SpaceMapsアプリでは、惑星とその月を一緒に格納しても良いと考えるかもしれません。

```json
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

You might assume that this pattern is perfect for this use case. After all, it’s unlikely that a planet would have more than, say, a couple hundred moons in some extreme cases and this number would practically never change.

このパターンは今回のユースケースにぴったりだと思うかもしれません。ひとつの惑星が、極端な例ではありますが、数百個以上の月を持つことはまずありませんし、その数は実質的に変わることはありません。

But what if at some point we wanted to list and sort all the moons in our SpaceMaps app? This nesting pattern wouldn’t be appropriate for this use case as we wouldn’t be able to index and query the moons properly.

しかし、SpaceMapsアプリの中で、すべての月をリストアップしてソートしたいとしたらどうでしょう？このネスティングパターンは、月のインデックスを作成して適切にクエリを実行することができないため、このユースケースには適していません。

### [](#update_frequency)How often are we going to update the data?

どのくらいの頻度でデータを更新するのか？

Finally, even if your use case perfectly fits the nesting pattern, you have to consider how often you are going to update that document. The more frequently you update a document, the less efficient this pattern becomes.

最後に、ユースケースが入れ子パターンに完全に合致していたとしても、そのドキュメントをどのくらいの頻度で更新するかを検討する必要があります。ドキュメントの更新頻度が高ければ高いほど、このパターンの効率は悪くなります。

## [](#references)References in Fauna

Faunaにおけるリファレンス

Previously, we saw that each document in Fauna has a reference that identifies it with a unique document ID inside a collection.

前回は、Faunaの各ドキュメントには、コレクション内のユニークなドキュメントIDで識別するための参照があることを説明しました。

Here is a pilot document from a previous part of the tutorial:

ここでは、チュートリアルの前のパートでのパイロットドキュメントを紹介します。

```json
{
  "ref": Ref(Collection("Pilots"), "266350546751848978"),
  "ts": 1590270525630000,
  "data": {
    "name": "Flash Gordon"
  }
}
```

The reference to this document has a unique document ID of `266350546751848978`, but remember that, by itself, the document ID is not very useful. It only makes sense when paired with a collection to create a reference to a specific document.

このドキュメントへの参照は、`266350546751848978`というユニークなドキュメントIDを持っていますが、ドキュメントIDはそれだけではあまり役に立たないことを覚えておいてください。コレクションと組み合わせて特定のドキュメントへの参照を作成する場合にのみ意味を持ちます。

### [](#other_refs)References to other documents

他のドキュメントへの参照

Obviously, we can also use the [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) type to reference other documents. To demonstrate this, let’s revisit our SpaceMaps app.

もちろん、[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)タイプを使って他のドキュメントを参照することもできます。これを説明するために、SpaceMapsアプリを見てみましょう。

We already have a `Planets` collection from a previous part of this tutorial. For reference, here’s the document for Earth:

このチュートリアルの前の部分で、すでに「Planets」コレクションを持っています。参考までに、地球のドキュメントを紹介します。

```json
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

Now, let’s create a Moons collection:

では、Moonのコレクションを作ってみましょう。

shell

```shell
CreateCollection({name: "Moons"})
```

And let’s create a moon document with a reference to a planet document:

そして、Planetドキュメントへの参照を持つMoonドキュメントを作成してみましょう。

shell

```shell
Create(
  Collection("Moons"),
  {
    data: {
      name: "Luna",
      planetRef: Ref(Collection("Planets"), "267081091831038483")
      // NOTE: be sure to use the correct document ID for your Earth document
    }
  }
)
```

```json
{
  ref: Ref(Collection("Moons"), "267691276872188416"),
  ts: 1591549145540000,
  data: {
    name: "Luna",
    planetRef: Ref(Collection("Planets"), "267081091831038483")
  }
}
```

We just created a one-to-many relationship since it is possible for many moons to share the same planet.

多くの月が同じ惑星を共有することが可能なので、一対多の関係を作りました。

We can now retrieve all of the moons in our database using the [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function — to avoid creating an index, like we saw in a previous part of the tutorial:

これで、[Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents)関数を使って、データベース内のすべての月を取り出すことができます。このチュートリアルの前の部分で見たように、インデックスを作成する必要はありません。

shell

```shell
Map(
  Paginate(Documents(Collection('Moons'))),
  Lambda("moonRef", Get(Var("moonRef")))
)
```

We could also create an index to find all of the moons for a given planet:

また、インデックスを作成して、ある惑星のすべての月を見つけることもできます。

shell

```shell
CreateIndex({
  name: "all_Moons_by_planet",
  source: [Collection("Moons")],
  terms: [{ field: ["data", "planetRef"] }]
})
```

Then we can query the index:

次に、インデックスにクエリを実行します。

shell

```shell
Map(
  Paginate(
    Match(
      Index("all_Moons_by_planet"),
      Ref(Collection("Planets"), "267081091831038483")
    )
  ),
  Lambda("moonRef", Get(Var("moonRef")))
)
```

If these FQL commands for indexes are confusing, you might want to revisit the [previous part of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/indexes) where all these are explained in detail.

これらのインデックス用のFQLコマンドが分かりにくい場合は、チュートリアルの[前編](https://docs.fauna.com/fauna/current/tutorials/basics/indexes)で詳しく説明していますので、そちらを参照してみてください。

### [](#one-to-one)One-to-one constraints

一対一の制約

If you’d like to enforce a one-to-one relationship, you can do that by creating an index with a unique constraint, like we saw in the [previous part of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/indexes):

1対1の関係を強制したい場合は、[チュートリアルの前編](https://docs.fauna.com/fauna/current/tutorials/basics/indexes)で見たように、ユニーク制約を持つインデックスを作成することで実現できます。

shell

```shell
CreateIndex({
  name: "only_one_Moon_per_planet",
  source: [
    Collection("Moons")
  ],
  terms: [
    {field: ["data", "planetRef"]}
  ],
  unique: true
})
```

Now, if we try to create another moon that is related to planet Earth, we get an error:

ここで、地球に関連する別の月を作成しようとすると、エラーが発生します。

shell

```shell
Create(
  Collection("Moons"),
  {
    data: {
      name: "Luna 2",
      planetRef: Ref(Collection("Planets"), "267081091831038483")
    }
  }
)
```

```
error: instance not unique
document is not unique.
position: ["create"]
```

## [](#ref_arrays)Arrays of references

参照の配列

You could also model your one-to-few relationships by using arrays of references. This could be more convenient in certain situations where the data is frequently accessed together, but you still want to be able to query the entities independently and more efficiently.

参照の配列を使って、一対一の関係をモデル化することもできます。この方法は、データが頻繁に一緒にアクセスされるような状況では便利かもしれませんが、それでもエンティティを独立して、より効率的に照会できるようにしたい場合もあります。

For example, we could store the moon references in our planet document this way:

例えば、惑星のドキュメントに月の参照を格納するには、次のようにします。

```json
{
  "name": "Earth",
  "type": "TERRESTRIAL",
  "color": "BLUE",
  "moonRefs": [
    Ref(Collection("Moons"), "267691276872188416")
  ]
}
```

Then, to query a planet with all its moon documents you could use the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map), [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let), and [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) like we learned previously when querying indexes:

そして、ある惑星とその月のすべてのドキュメントを照会するには、以前インデックスを照会するときに学んだように、[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)、[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let)、[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)を使用します。

shell

```shell
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
```

```json
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

また、ドキュメント全体ではなく、名前とIDだけを取得したい場合は、代わりに次のようにします。

shell

```shell
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
```

```
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

This query may seem intimidating, but if you inspect it in more detail, you find that it is only using FQL functions that we’ve already learned in the previous parts of this tutorial. FQL is a lot closer to a functional programming language than a declarative language like SQL, so it might help to think about it that way.

このクエリは一見難しそうに見えますが、詳しく調べてみると、このチュートリアルの前の部分ですでに学んだFQL関数を使っているだけだということがわかります。FQLは、SQLのような宣言型言語ではなく、関数型プログラミング言語に近いので、そのように考えるといいかもしれません。

## [](#many-to-many)Many-to-many relationships

多対多の関係

As we’ve seen in previous examples, many-to-many relationships can be expressed with indexes and/or arrays of references. Let’s look at a use case for that.

これまでの例で見てきたように、多対多の関係はインデックスや参照の配列で表現することができます。その使用例を見てみましょう。

There is a bit of chaos in the dock and our boss, the admiral, has tasked us with creating a system for managing spaceship repairs. Armed with our new knowledge about references and relationships in Fauna, we should be able to solve this in no time!

ドックではちょっとした混乱があり、上司の提督から宇宙船の修理を管理するシステムの作成を任されています。Faunaでの参照と関係についての新しい知識を持っていれば、すぐに解決できるはずです。

First, we need to be able to track our personnel:

まず、職員を追跡できるようにする必要があります。

shell

```shell
CreateCollection({name: "DockTechnicians"})
```

Let’s add all of the people working in the dock:

ドックで働くすべての人を追加しましょう。

shell

```shell
Create(
  Collection("DockTechnicians"),
  {
    data: {name: "Johnny Sparkles"}
  }
)

// etc...
```

We already have a `Spaceships` collection from our previous parts of the tutorial. For simplicity’s sake, we’re going to assume that all ships are in the dock right now.

チュートリアルの前の部分で、すでに `Spaceships` というコレクションがあります。簡単にするために、今はすべての船がドックに入っていると仮定します。

Now, to assign a technician to a ship, we could just maintain an array of spaceships references in the technician document:

さて、技術者を船に割り当てるには、技術者のドキュメントにスペースシップを参照する配列を保持すればいいわけです。

shell

```shell
Update(
  Ref(Collection("DockTechnicians"), "267703813461246483"),
  {
    data: {
      workingOn: [
        Ref(Collection("Spaceships"), "266356873589948946")
      ]
    }
  }
)
```

Wait a minute!

ちょっと待ってください。

The admiral specifically said he not only wanted to know which technicians worked on which spaceships, but also which repairs were in process and how long each repair took.

提督は、どの技術者がどの宇宙船を担当しているかだけでなく、どの修理が行われていて、それぞれの修理にどれくらいの時間がかかっているかを知りたいと具体的に言っていました。

### [](#join_collections)Join collections

コレクションの結合

In the relational world, it’s very common to model many-to-many relationships with an entity using a join table, or a bridging table.

リレーショナルの世界では、ジョインテーブル（ブリッジングテーブル）を使ってエンティティの多対多の関係をモデル化することがよくあります。

This is done in part because, with a rigid schema, you’d need to add more columns to relate a row to other rows. But there is another important reason which actually solves our problem. When modeling a relationship with an independent entity, you can assign data to that relationship.

これは、厳格なスキーマでは、ある行を他の行に関連付けるために、さらに列を追加しなければならないという理由もあります。しかし、もう1つ重要な理由があり、それによって問題が解決します。独立したエンティティとの関係をモデル化すると、その関係にデータを割り当てることができます。

What if we actually had a collection to track the repairs that also associated technicians with spaceships?

実際に、技術者と宇宙船を関連付ける修理を追跡するコレクションがあったとしたらどうでしょう？

shell

```shell
CreateCollection({name: "DockRepairs"})
```

And now, let’s create the first repair:

それでは、最初の修理を作ってみましょう。

shell

```shell
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
```

```json
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

これで、船の修理の状態と、どの技術者がそれに割り当てられているかがわかりました。すてきですね。

Let’s start a repair:

では、修理を開始しましょう。

shell

```shell
Update(
  Ref(Collection("DockRepairs"), "267705685715714560"),
  {
    data: {
      startTimestamp: Time('2355-02-11T05:23:11Z'),
      status: 'IN_PROCESS'
    }
  }
)
```

```json
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

And now let’s finish the repair:

そして、修理を終了しましょう。

shell

```shell
Update(
  Ref(Collection("DockRepairs"), "267705685715714560"),
  {
    data: {
      endTimestamp: Time('2355-02-11T03:05:35Z'),
      status: 'DONE'
    }
  }
)
```

```json
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

すばらしいですね。

Now with this simple index, we can see all of their repairs and their info:

このシンプルなインデックスで、すべての修理とその情報を見ることができます。

shell

```shell
CreateIndex({
  name: "all_DockRepairs",
  source: [
    Collection("DockRepairs")
  ]
})
```

Not bad! But how long do repairs actually take?

悪くないですね。しかし、修理には実際どのくらいの時間がかかるのでしょうか？

We could have added a duration property to our documents and stored a value when ending a repair, but where is the fun in that? With FQL, there are other ways to accomplish this.

ドキュメントにDurationプロパティを追加して、修理終了時に値を保存することもできましたが、それでは何が楽しいのでしょうか？FQLでは、これを実現する別の方法があります。

For example, we could just determine the duration when querying our data without having to implement it in our application logic:

例えば、アプリケーションロジックに実装しなくても、データを照会するときに期間を決定することができます。

shell

```shell
Map(
  Paginate(Match(Index("all_DockRepairs"))),
  Lambda("repairRef", Let({
    repairDoc: Get(Var("repairRef"))
  },{
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
    repair: Var("repairDoc")
  }))
)
```

```json
{
  data: [
    {
      durationMinutes: 137,
      repair: {
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
    }
  ]
}
```

Whoa.

おっと。

Again, this query may seem complicated, but we already know most of this query works from previous sections in this tutorial.

繰り返しになりますが、このクエリは複雑に見えるかもしれませんが、このチュートリアルの前のセクションで、このクエリの動作のほとんどをすでに知っています。

Here’s the new part:

ここからが新しい部分です。

shell

```shell
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
)
```

What this does is check that `startTimestamp` or `endTimestamp` are not missing from the document. If both exist, then return the time difference in minutes.

これは、`startTimestamp`や`endTimestamp`がドキュメントに欠けていないかどうかをチェックするものです。もし両方とも存在していれば、時間差を分単位で返します。

Let’s go step-by-step.

それでは順を追って説明していきましょう。

-   We already know what the [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function does from previous parts of the tutorial. In this case, we are giving it a default value of `null` if the path `["data", "startTimestamp"]` does not exist in `Var("repairDoc")`.

- これまでのチュートリアルで、[Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数が何をしているのかはすでにわかっています。今回は、パス `["data", "startTimestamp"]` が `Var("repairDoc")` に存在しない場合に、デフォルト値として `null` を与えています。

-   The [`IsNull`](https://docs.fauna.com/fauna/current/api/fql/functions/isnull) function returns `true` if a value does not exist and `Select` returns `null`.

- [`IsNull`](https://docs.fauna.com/fauna/current/api/fql/functions/isnull) 関数は、値が存在しない場合は `true` を返し、`Select` は `null` を返します。

-   The [`Or`](https://docs.fauna.com/fauna/current/api/fql/functions/or) function returns `true` if either `startTimestamp` or `endTimestamp` do not exist in the document. If that’s the case, then `If` would return `null`.

- 関数[`Or`](https://docs.fauna.com/fauna/current/api/fql/functions/or)は、`startTimestamp`と`endTimestamp`のどちらかがドキュメントに存在しない場合に`true`を返します。もしそうならば、`If`は`null`を返します。

-   If both timestamps do exist in the repair document, we simply calculate the duration using the [`TimeDiff`](https://docs.fauna.com/fauna/current/api/fql/functions/timediff) function with the `minutes` unit.

- 両方のタイムスタンプが修復ドキュメントに存在する場合は、単純に、[`TimeDiff`](https://docs.fauna.com/fauna/current/api/fql/functions/timediff)関数を使って、`minutes`単位で期間を計算します。

### [](#bindings)Index bindings

インデックスバインディング

There is another way to solve this. Do you remember index bindings from the previous part of this tutorial? These are computed values calculated beforehand.

この問題を解決する方法はもう一つあります。このチュートリアルの前編で紹介したインデックスバインディングを覚えていますか？これは事前に計算された値です。

The decision to use index bindings comes down to how often you need to know the duration of the repairs. As explained in the [previous part of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/indexes), bindings consume more storage but less CPU, so you have to account for that when deciding to use bindings.

インデックス・バインディングを使うかどうかは、修理の期間を知る必要がある頻度によります。前編のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/basics/indexes)で説明したように、バインディングはストレージを多く消費しますが、CPUの消費量は少ないので、バインディングを使うかどうかを決める際にはその点を考慮する必要があります。

That said, here’s a possible index to return the duration using a binding and the same conditional logic. We’re also returning a custom object instead of the full document, which might make more sense when listing repairs instead of showing a detail view to your users.

とはいえ、バインディングと同じ条件付きロジックを使って期間を返すインデックスの可能性は以下の通りです。また、ドキュメント全体ではなくカスタムオブジェクトを返しています。これは、ユーザーに詳細ビューを表示するのではなく、修理の一覧を表示する際に、より意味のあるものとなるでしょう。

shell

```shell
CreateIndex({
  name: "all_DockRepairs_with_duration",
  source: {
    collection: Collection("DockRepairs"),
    fields: {
      durationMinutes: Query(
        Lambda("repairDoc",
          If(
            Or(
              IsNull(
                Select(["data", "startTimestamp"], Var("repairDoc"), null)
              ),
              IsNull(
                Select(["data", "endTimestamp"], Var("repairDoc"), null)
              )
            ),
            null,
            TimeDiff(
              Select(["data", "endTimestamp"], Var("repairDoc")),
              Select(["data", "startTimestamp"], Var("repairDoc")),
              "minutes"
            )
          )
        )
      )
    }
  },
  values: [
    { binding: "durationMinutes"},
    { field: ["ref", "id"]},
    { field: ["data", "status"]}
  ]
})
```

Let’s query it:

問い合わせてみよう。

shell

```shell
Map(
  Paginate(Match(Index("all_DockRepairs_with_duration"))),
  Lambda("result", Let({},
    {
      id: Select([1], Var("result")),
      status: Select([2], Var("result")),
      durationMinutes: Select([0], Var("result"))
    }
  ))
)
```

```json
{
  data: [
    {
      id: "267705685715714560",
      status: "DONE",
      durationMinutes: 137
    }
  ]
}
```

## [](#conclusion)Conclusion

結論

So that’s it for today. Hopefully you learned something valuable!

というわけで、今日はこれでおしまい。何か貴重なことを学んでいただけたでしょうか？

In [part 4 of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/functions), we continue our space adventure by learning how to create FQL functions to extend the basic functionality of Fauna with custom logic.

チュートリアルのパート4](https://docs.fauna.com/fauna/current/tutorials/basics/functions)では、FQL関数を作成してFaunaの基本機能をカスタムロジックで拡張する方法を学び、宇宙の冒険を続けます。

