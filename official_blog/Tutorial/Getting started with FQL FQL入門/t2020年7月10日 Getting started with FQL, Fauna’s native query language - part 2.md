Getting started with FQL, Fauna’s native query language - part 2
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2

# Getting started with FQL, Fauna’s native query language - part 2

Faunaのネイティブクエリ言語である FQL の使用を開始する-パート 2

Pier Bover|Jul 10th, 2020|

2020 年 7 月 10 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Welcome back, fellow space developer! In [part 1](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1) of this five-part series we got our first look at FQL and some fundamental Fauna concepts.

ようこそ、仲間の宇宙開発者！でパート 1 この 5 回シリーズの我々は、FQL といくつかの基本的な動植物の概念で私たちの第一印象を得ました。

- [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
- Part 2: a deep dive into indexes with Fauna
- [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
- [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
- [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

パート 1：FQL と基本的なFaunaの概念を見る
パート 2：Faunaを使ったインデックスの詳細
パート 3：Faunaを使用したデータのモデリングの原則の調査
パート 4：Faunaで直接実行されるカスタム関数を作成する方法を見てみましょう
パート 5：Faunaの認証と承認について

Today we're going to take a more in-depth look into Fauna's indexes.

今日は、Faunaのインデックスをさらに詳しく見ていきます。

## In this article:

今回の記事では

- Recap
- What can indexes do?
- Indexing across multiple collections
- Sorting results
- Filtering results
- Enforcing unique values
- Combining multiple indexes
- Index bindings

要約
インデックスは何ができますか？
複数のコレクションにわたるインデックス作成
結果の並べ替え
結果のフィルタリング
一意の値を適用する
複数のインデックスを組み合わせる
インデックスバインディング

## Recap

要約

We briefly introduced indexes in the previous article, but here's a recap of the FQL commands we learned.

前回の記事で簡単にインデックスを紹介しましたが、これが私たちが学んだ FQL コマンドの要約です。

First, we created a simple index to be able to retrieve all our pilots from the Pilots collection:

前回の記事で簡単にインデックスを紹介しましたが、これが私たちが学んだ FQL コマンドの要約です。

```javascript
CreateIndex({
  name: "all_Pilots",
  source: Collection("Pilots"),
});
```

Then, we retrieved a list of references:

次に、参照のリストを取得しました。

```javascript
Paginate(Match(Index("all_Pilots")));
```

Finally, we learned how to use Map, Lambda, and Var to retrieve a list of documents:

最後に、Map、Lambda、Var を使用してドキュメントのリストを取得する方法を学びました。

```javascript
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda("pilotRef", Get(Var("pilotRef")))
);
```

## What can indexes do?

インデックスは何ができますか？

So far, we've seen that indexes allow you to retrieve all the documents in a collection, but indexes are much more powerful than that.

これまでのところ、インデックスを使用するとコレクション内のすべてのドキュメントを取得できることがわかりましたが、インデックスはそれよりもはるかに強力です。

With indexes you can:

インデックスを使用すると、次のことができます。

- Enforce unique constraints
- Sort and filter results
- Create computed values from document data

固有の制約を適用する
結果の並べ替えとフィルタリング
ドキュメントデータから計算値を作成する

#### **Indexes vs SQL views**

インデックスと SQL ビュー

If you're coming from the relational world, it can make sense to think about indexes similar to views on a relational database. Views are stored queries that can retrieve data from multiple tables, calculate computed data, join tables to create virtual entities, filter, etc. In a way, Fauna's indexes perform similar functions, as we will explore in this article.

リレーショナルの世界から来ている場合は、リレーショナルデータベースのビューに似たインデックスについて考えるのが理にかなっています。ビューは、複数のテーブルからデータを取得したり、計算データを計算したり、テーブルを結合して仮想エンティティを作成したり、フィルター処理したりできる保存されたクエリです。ある意味で、Fauna のインデックスは、この記事で説明するように、同様の機能を実行します。

## Indexing across multiple collections

複数のコレクションにわたるインデックス作成

Until now, our indexes have been created on documents from a single collection, but you can configure an index to include documents from multiple collections.

これまで、インデックスは単一のコレクションのドキュメントに対して作成されていましたが、複数のコレクションのドキュメントを含めるようにインデックスを構成できます。

There are many reasons why you might want to do that. Maybe, when designing your database, you'd like to group some collections under a single virtual collection, so to speak. In the relational world, combining database entities under a single entity is known as polymorphism.

あなたがそれをしたいと思うかもしれない理由はたくさんあります。データベースを設計するときに、いわば単一の仮想コレクションの下にいくつかのコレクションをグループ化したいと思うかもしれません。リレーショナルの世界では、単一のエンティティの下でデータベースエンティティを組み合わせることがポリモーフィズムとして知られています。

To test this, let's create a new collection to store our land vehicles:

これをテストするために、陸上車両を保管するための新しいコレクションを作成しましょう。

```javascript
CreateCollection({ name: "Speeders" });
```

Now, with this index, you'd be able to retrieve all the vehicles in the database:

これで、このインデックスを使用して、データベース内のすべての車両を取得できるようになります。

```javascript
CreateIndex({
  name: "all_Vehicles",
  source: [Collection("Spaceships"), Collection("Speeders")],
});
```

When indexing multiple collections, keep in mind that the indexed fields need to be of the same type (string, number, etc) across collections. In the rest of the examples, we'll use indexes with a single collection for simplicity's sake.

複数のコレクションにインデックスを付ける場合、インデックス付けされたフィールドはコレクション全体で同じタイプ（文字列、数値など）である必要があることに注意してください。残りの例では、簡単にするために、単一のコレクションでインデックスを使用します。

## Sorting results

結果の並べ替え

Indexes also allow us to sort results. Let's create a new index to get all our pilots sorted by their name:

インデックスを使用すると、結果を並べ替えることもできます。新しいインデックスを作成して、すべてのパイロットを名前で並べ替えてみましょう。

```javascript
CreateIndex({
  name: "all_Pilots_sorted_by_name",
  source: Collection("Pilots"),
  values: [{ field: ["data", "name"] }, { field: ["ref"] }],
});
```

Here, we're using a **values** object which defines the **output** values for the index.

ここでは、インデックスの出力値を定義する values オブジェクトを使用しています。

In this case, we are defining two output values:

この場合、2 つの出力値を定義しています。

- **"data", "name"** a path referring to the name property of the document.

「data」、「name」は、ドキュメントの name プロパティを参照するパスです。

- **"ref"** another path which will output a reference to the matched document. In a moment, we'll see why we need this.

一致したドキュメントへの参照を出力する別のパスを「参照」します。すぐに、なぜこれが必要なのかがわかります。

When using a **values** object, Fauna will always sort the results in ascending order by default:

値オブジェクトを使用する場合、Fauna はデフォルトで常に結果を昇順で並べ替えます。

```javascript
Paginate(Match(Index("all_Pilots_sorted_by_name")))

// Results:

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

As you can see, Fauna will output two values per result as defined in the **values** object of the index, and these results are now ordered by those values.

ご覧のとおり、Fauna は、インデックスの values オブジェクトで定義されているように、結果ごとに 2 つの値を出力します。これらの結果は、これらの値の順に並べられています。

#### **Reverse order**

逆順

If we wanted to get the pilots sorted by their name in descending order, we'd need a new index with the **reverse** setting:

パイロットを名前の降順で並べ替える場合は、逆の設定で新しいインデックスが必要になります。

```javascript
CreateIndex({
  name: "all_Pilots_sorted_by_name_desc",
  source: Collection("Pilots"),
  values: [{ field: ["data", "name"], reverse: true }, { field: ["ref"] }],
});
```

#### **Getting documents from sorting results**

結果の並べ替えからドキュメントを取得する

You can add as many output values as needed without any performance penalty, but we might need to get a document from these types of results:

パフォーマンスを低下させることなく、必要な数の出力値を追加できますが、次のタイプの結果からドキュメントを取得する必要がある場合があります。

```javascript
["Buck Rogers", Ref(Collection("Pilots"), "266359371696439826")];
```

So how do we actually get documents?

では、実際にどのようにしてドキュメントを取得するのでしょうか。

One option would be using the Select function like we learned in the previous article:

1 つのオプションは、前の記事で学習したような選択機能を使用することです。

```javascript
Map(
  Paginate(Match(Index("all_Pilots_sorted_by_name"))),
  Lambda("pilotResult", Get(Select([1], Var("pilotResult"))))
);
```

Since Fauna uses zero-based arrays, the trick here is selecting the reference in the second item with **1**, then using Get to return a document.

Fauna はゼロベースの配列を使用するため、ここでの秘訣は、2 番目の項目で 1 を使用して参照を選択し、Get を使用してドキュメントを返すことです。

Another option would be to simply configure our Lambda to expect an array with two values:

もう 1 つのオプションは、2 つの値を持つ配列を期待するように Lambda を単純に構成することです。

```javascript
Map(
  Paginate(Match(Index("all_Pilots_sorted_by_name"))),
  Lambda(["name", "pilotRef"], Get(Var("pilotRef")))
);
```

In both cases, we'd get the same result:

どちらの場合も、同じ結果が得られます。

```javascript
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

## Filtering results

結果のフィルタリング

Another useful feature of indexes is being able to search and filter results.

インデックスのもう 1 つの便利な機能は、結果を検索およびフィルタリングできることです。

To test this, let's create a Planets collection:

これをテストするために、Planets コレクションを作成しましょう。

```javascript
CreateCollection({ name: "Planets" });
```

Then, create some planets with three different types: **TERRESTRIAL**, **GAS**, and **ICE**:

次に、3 つの異なるタイプ（TERRESTRIAL、GAS、および ICE）でいくつかの惑星を作成します。

```javascript
Create(Collection("Planets"), {
  data: {
    name: "Mercury",
    type: "TERRESTRIAL",
  },
});

Create(Collection("Planets"), {
  data: {
    name: "Saturn",
    type: "GAS",
  },
});

// etc..
```

Finally, let's create an index to filter our planets by type:

最後に、惑星をタイプでフィルタリングするためのインデックスを作成しましょう。

```javascript
CreateIndex({
  name: "all_Planets_by_type",
  source: Collection("Planets"),
  terms: [{ field: ["data", "type"] }],
});
```

As we saw earlier, the **terms** object is used as the search **input** for the index, whereas the **values** object defines which data the index will return. With this index, the **values** object is not defined, so the index will return the ref by default.

whereas
ーであるのに対して

前に見たように、terms オブジェクトはインデックスの検索入力として使用されますが、values オブジェクトはインデックスが返すデータを定義します。このインデックスでは、values オブジェクトが定義されていないため、インデックスはデフォルトで ref を返します。

In this case, we're telling Fauna that the search term will use a **field** of the document found at the path **"data", "type"**.

この場合、検索語はパス「data」、「type」にあるドキュメントのフィールドを使用することを Fauna に伝えています。

We can now query our index by passing a parameter to Match:

これで、Match にパラメーターを渡すことでインデックスをクエリできます。

```javascript
Map(
  Paginate(Match(Index("all_Planets_by_type"), "GAS")),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

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

#### **Filtering on an array value**

配列値でのフィルタリング

If we wanted to match an item inside an array instead of filtering on a single string, we would only need to pass the term Fauna needs to search inside the array.

単一の文字列でフィルタリングするのではなく、配列内のアイテムを照合する場合は、Faunaが配列内で検索する必要があるという用語を渡すだけで済みます。

To test this, let's add some colors to our ships:

これをテストするために、船にいくつかの色を追加しましょう。

```javascript
Update(Ref(Collection("Spaceships"), "266356873589948946"), {
  data: {
    colors: ["RED", "YELLOW"],
  },
});

// etc...
```

If we now wanted to filter ships based on a single color, we could create this index which uses the **colors** array as a filtering term:

単一の色に基づいて船をフィルタリングする場合は、colors 配列をフィルタリング用語として使用するこのインデックスを作成できます。

```javascript
CreateIndex({
  name: "all_Spaceships_by_color",
  source: Collection("Spaceships"),
  terms: [{ field: ["data", "colors"] }],
});
```

And then query it:

そしてそれを照会します：

```javascript
Map(
  Paginate(Match(Index("all_Spaceships_by_color"), "WHITE")),
  Lambda(
    "shipRef",
    Let(
      {
        shipDoc: Get(Var("shipRef")),
      },
      {
        name: Select(["data", "name"], Var("shipDoc")),
        colors: Select(["data", "colors"], Var("shipDoc")),
      }
    )
  )
);

// Result:

{
  data: [
    {
      name: "Explorer IV",
      colors: ["BLUE", "WHITE", "RED"],
    },
    {
      name: "Navigator",
      colors: ["WHITE", "GREY"],
    },
    {
      name: "Le Super Spaceship",
      colors: ["PINK", "MAGENTA", "WHITE"],
    },
  ];
}
```

Fauna is smart enough to understand that if the field used in the **terms** object is an array, then it should search for an item inside that array instead of an exact match on the full array.

Faunaは、用語オブジェクトで使用されるフィールドが配列である場合、完全な配列で完全に一致するのではなく、その配列内のアイテムを検索する必要があることを理解するのに十分賢いです。

#### **About full text search**

全文検索について

At this time, it's only possible to filter documents using indexes with exact matches. This feature is on Fauna's roadmap, but no official timeframes have been provided yet.

現時点では、完全に一致するインデックスを使用してドキュメントをフィルタリングすることしかできません。この機能は Fauna のロードマップにありますが、公式の時間枠はまだ提供されていません。

It's certainly possible to solve this in other ways. FQL has a number of functions that will allow you to implement full text search.

これを他の方法で解決することは確かに可能です。FQL には、全文検索を実装できるようにする多くの機能があります。

Let's create an index first to get all planets:

最初にインデックスを作成して、すべての惑星を取得しましょう。

```javascript
CreateIndex({
  name: "all_Planets",
  source: Collection("Planets"),
});
```

Now, we could combine [Filter](https://docs.fauna.com/fauna/current/api/fql/functions/filter), [ContainsStr](https://docs.fauna.com/fauna/current/api/fql/functions/containsstr), and [LowerCase](https://docs.fauna.com/fauna/current/api/fql/functions/lowercase) to make a case insensitive search of the string "ur" on the planets' names:

これで、Filter、ContainsStr、LowerCase を組み合わせて、惑星の名前で文字列「ur」の大文字と小文字を区別しない検索を行うことができます。

```javascript
Map(
  Filter(
    Paginate(Match(Index("all_Planets"))),
    Lambda(
      "planetRef",
      ContainsStr(
        LowerCase(Select(["data", "name"], Get(Var("planetRef")))),
        "ur"
      )
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
);

// Result:

{
  data: [
    {
      ref: Ref(Collection("Planets"), "267081079730471443"),
      ts: 1590977548370000,
      data: {
        name: "Mercury",
        type: "TERRESTRIAL",
        color: "GREY",
      },
    },
    {
      ref: Ref(Collection("Planets"), "267081181884842515"),
      ts: 1590977684790000,
      data: {
        name: "Saturn",
        type: "GAS",
        color: "YELLOW",
      },
    },
    {
      ref: Ref(Collection("Planets"), "267081222719537683"),
      ts: 1590977359690000,
      data: {
        name: "Uranus",
        type: "ICE",
        color: "BLUE",
      },
    },
  ];
}
```

#### **Sorting and filtering at the same time**

並べ替えとフィルタリングを同時に行う

You can certainly do both at the same time by combining **terms** and **values** in the same index:

同じインデックス内の用語と値を組み合わせることで、両方を同時に実行できます。

```javascript
CreateIndex({
  name: "all_Planets_by_type_sorted_by_name",
  source: Collection("Planets"),
  terms: [{ field: ["data", "type"] }],
  values: [{ field: ["data", "name"] }, { field: ["ref"] }],
});
```

And then:

その後：

```javascript
Map(
  Paginate(Match(Index("all_Planets_by_type_sorted_by_name"), "TERRESTRIAL")),
  Lambda("planetResult", Get(Select([1], Var("planetResult"))))
)

// Result:

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

## Enforcing unique values

一意の値を適用する

Another important function of indexes, besides retrieving documents, is enforcing a unique constraint on the documents that can be created.

ドキュメントの取得に加えて、インデックスのもう 1 つの重要な機能は、作成できるドキュメントに一意の制約を適用することです。

For example, to add a unique code to our spaceships:

たとえば、宇宙船に一意のコードを追加するには、次のようにします。

```javascript
CreateIndex({
  name: "all_Spaceships_by_code",
  source: Collection("Spaceships"),
  terms: [{ field: ["data", "code"] }],
  unique: true,
});
```

This index accomplishes two purposes:

このインデックスは 2 つの目的を達成します。

- We're configuring it to accept a filtering term with the **terms** object.

用語オブジェクトでフィルタリング用語を受け入れるように構成しています。

- We're ensuring the defined terms are unique across the documents matched by this index by using **unique: true**.

unique：true を使用して、このインデックスに一致するドキュメント全体で定義された用語が一意であることを確認します。

We're using a single term here for simplicity's sake, but you could create a unique constraint over multiple terms much like you'd do in SQL by creating constraints over multiple columns.

ここでは簡単にするために単一の用語を使用していますが、複数の列に制約を作成することで、SQL の場合と同じように、複数の用語に一意の制約を作成できます。

Let's test this by creating a new spaceship:

新しい宇宙船を作成して、これをテストしてみましょう。

```javascript
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Rocinante",
      code: "ROCINANTE"
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "267072793181422099"),
  "ts": 1590959313500000,
  "data": {
    "name": "Rocinante",
    "code": "ROCINANTE"
  }
}
```

So far so good. Let's create another one with the same code:

ここまでは順調ですね。同じコードで別のものを作成しましょう：

```javascript
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Rocinante 2",
      code: "ROCINANTE"
    }
  }
)

// Result:

error: instance not unique
document is not unique.
position: ["create"]
```

As expected, Fauna throws an error since there is already a ship with the **ROCINANTE** code.

予想通り、ROCINANTE コードの船がすでにあるため、Fauna はエラーをスローします。

**Quick tip:** when using unique constraints, we know in advance that an index can only return a single document. So, instead of using Paginate, we can simply use Get to get a single document:

クイックヒント：一意の制約を使用する場合、インデックスが返すことができるのは 1 つのドキュメントのみであることを事前に知っています。したがって、Paginate を使用する代わりに、Get を使用して単一のドキュメントを取得できます。

```javascript
Get(Match(Index("all_Spaceships_by_code"), 'ROCINANTE'))

// Result:

{
  "ref": Ref(Collection("Spaceships"), "267072793181422099"),
  "ts": 1591022503995000,
  "data": {
    "name": "Rocinante",
    "code": "ROCINANTE"
  }
}
```

## Combining multiple indexes

複数のインデックスを組み合わせる

FQL has a number of functions that allow you to combine results from indexes and other sources in different ways:

FQL には、インデックスやその他のソースからの結果をさまざまな方法で組み合わせることができる多くの関数があります。

- [Union](https://docs.fauna.com/fauna/current/api/fql/functions/union) will add the results from all indexes.

Union は、すべてのインデックスからの結果を追加します。

- [Intersection](https://docs.fauna.com/fauna/current/api/fql/functions/intersection) will return the results that are similar from each index and discard the rest.

交差点は、各インデックスから類似した結果を返し、残りを破棄します。

- [Difference](https://docs.fauna.com/fauna/current/api/fql/functions/difference) will return the results that are unique in the first index and discard the rest.

差異は、最初のインデックスで一意の結果を返し、残りを破棄します。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/38l48GcW85CQhmWL0jmdyD/2268aab1259272f8d5fe309ea352a342/8398-FQL-2-1.png)

To be able to test these, let's add some colors to our planets (please excuse any scientific inaccuracies).

これらをテストできるようにするために、私たちの惑星にいくつかの色を追加しましょう（科学的な不正確さは許してください）。

```javascript
// Earth

Update(Ref(Collection("Planets"), "267081091831038483"), {
  data: { color: "BLUE" },
});

// Etc...
```

Let's also create a new index:

また、新しいインデックスを作成しましょう。

```javascript
CreateIndex({
  name: "all_Planets_by_color",
  source: Collection("Planets"),
  terms: [{ field: ["data", "color"] }],
});
```

#### **OR filtering with Union**

または Union によるフィルタリング

Union will combine whatever results each index returns. We're just using two indexes here, but you could use any number of indexes.

Union は、各インデックスが返す結果をすべて結合します。ここでは 2 つのインデックスを使用していますが、任意の数のインデックスを使用できます。

_"Hey Fauna, get me the planets that are of type_ **_GAS_** _or are_ **_YELLOW_**_"_

「ねえFauna、 ガス 型または 黄色の惑星を私にくれ」

```javascript
Map(
  Paginate(
    Union(
      Match(Index("all_Planets_by_type"), "GAS"),
      Match(Index("all_Planets_by_color"), "YELLOW")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

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

As you can see, Union will skip duplicates since Saturn being a gas giant appears in the results of both indexes.

ご覧のとおり、両方のインデックスの結果にガス巨人である土星が表示されるため、Union は重複をスキップします。

#### **AND filtering with Intersection**

AND 交差によるフィルタリング

Intersection will return only the results that are the same in all indexes. Again, you could use any number of indexes.

交差は、すべてのインデックスで同じ結果のみを返します。ここでも、任意の数のインデックスを使用できます。

_"Hey Fauna, get me the planets that are of type_**_TERRESTRIAL_** _and are_ **_BLUE_**_"_

「ねえ動植物は、型のある惑星私に取得地上 としている BLUE」

```javascript
Map(
  Paginate(
    Intersection(
      Match(Index("all_Planets_by_type"), "TERRESTRIAL"),
      Match(Index("all_Planets_by_color"), "BLUE")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

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

#### **NOT filtering with Difference**

違いでフィルタリングしない

Difference will compare the first index you provide with the rest of the indexes, and return the results that exist only in the first index.

差分は、指定した最初のインデックスを残りのインデックスと比較し、最初のインデックスにのみ存在する結果を返します。

_"Hey Fauna, get me the planets that are_ **_TERRESTRIAL_** _but are not_ **_BLUE_** _nor_ **_RED_**_"_

「ねえ動植物は、私にある惑星を取得 地上 ではなく、ある BLUE も RED を」

```javascript
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

// Result:

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

## Index bindings

インデックスバインディング

With index bindings, it's possible to create pre-computed values based on some document data, using pretty much any FQL expression.

インデックスバインディングを使用すると、ほとんどすべての FQL 式を使用して、一部のドキュメントデータに基づいて事前に計算された値を作成できます。

These values are calculated beforehand, which makes retrieving these values super efficient as the operation consumes little CPU.

これらの値は事前に計算されているため、CPU の消費量が少ないため、これらの値の取得は非常に効率的です。

The downside is that these computed values consume storage space. Before deciding to use a binding at scale, you should consider if the performance boost is worth the storage cost for your use case.

欠点は、これらの計算値がストレージスペースを消費することです。バインディングを大規模に使用することを決定する前に、パフォーマンスの向上がユースケースのストレージコストに見合うかどうかを検討する必要があります。

Let's see a couple examples on how to use index bindings.

インデックスバインディングの使用方法に関するいくつかの例を見てみましょう。

Remember our spaceship from the previous article?

前回の記事の宇宙船を覚えていますか？

```javascript
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
  "celestialPosition": {
    "x": 2234,
    "y": 3453,
    "z": 9805
  },
  "code": "VOYAGER"
}
```

So here comes our boss, the fleet admiral. He has 100 ships in the dock that need refueling and wants to know which ships could be filled faster so that he can fill them first and empty the dock as fast as possible.

それで、ここに私たちの上司、艦隊提督が来ます。彼はドックに 100 隻の船があり、給油が必要であり、どの船をより早く満たすことができるかを知りたいので、最初にそれらを満たし、できるだけ早くドックを空にすることができます。

Easy, right? To do that, we'd only need to sort our ships by **pendingFuelTons**.

簡単ですよね？そのためには、pendingFuelTons で船を並べ替えるだけで済みます。

But Pier, **pendingFuelTons** is not in the document! We're doomed!

しかし、Pier、pendingFuelTons はドキュメントに含まれていません！私たちは運命にあります！

Don't panic my friend, we have the perfect tool to solve this problem.

私の友人を慌てる必要はありません。私たちはこの問題を解決するための完璧なツールを持っています。

Index bindings allow you to create computed values dynamically based on the data of the document. In this case, we could just calculate the value **pendingFuelTons** by subtracting **actualFuelTons** from **maxFuelTons**.

インデックスバインディングを使用すると、ドキュメントのデータに基づいて動的に計算値を作成できます。この場合、私たちは値計算でき pendingFuelTons を差し引くことにより actualFuelTons をから maxFuelTons。

So let's create our index:

それでは、インデックスを作成しましょう。

```javascript
CreateIndex({
  name: "all_Spaceships_by_pendingFuelTons",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      pendingFuelTons: Query(
        Lambda(
          "shipDoc",
          Subtract(
            Select(["data", "maxFuelTons"], Var("shipDoc")),
            Select(["data", "actualFuelTons"], Var("shipDoc"))
          )
        )
      ),
    },
  },
  values: [{ binding: "pendingFuelTons" }, { field: ["data", "name"] }],
});
```

The only new FQL function we're using here is Subtract, which simply subtracts the second number from the first.

ここで使用している唯一の新しい FQL 関数は、減算です。これは、最初の数値から 2 番目の数値を単純に減算します。

So let's query our new index:

それでは、新しいインデックスをクエリしてみましょう。

```javascript
Paginate(Match(Index("all_Spaceships_by_pendingFuelTons")))

// Result:

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

As you can see, Fauna is sorting first by the new computed value **pendingFuelTons** and then by the ship name.

ご覧のとおり、Fauna は最初に新しい計算値 pendingFuelTons でソートし、次に船名でソートしています。

Cool!

イイネ！

#### **Filtering by the first letter**

最初の文字によるフィルタリング

Let's create another example. What if we wanted to get all the planets that started with the letter **M**? Our planet documents do not have a **firstLetter** property, but we can solve this with bindings too.

別の例を作成しましょう。文字 M で始まるすべての惑星を取得したい場合はどうなりますか？私たちの惑星のドキュメントには firstLetter プロパティがありませんが、バインディングを使用してこれを解決することもできます。

We can create a new index with a binding for the first letter of the name and add a **terms** object to be able to filter the documents by **firstLetter**:

名前の最初の文字をバインドして新しいインデックスを作成し、terms オブジェクトを追加して、firstLetter でドキュメントをフィルタリングできるようにすることができます。

```javascript
CreateIndex({
  name: "all_Planets_by_firstLetter",
  source: {
    collection: Collection("Planets"),
    fields: {
      firstLetter: Query(
        Lambda(
          "planetDoc",
          SubString(Select(["data", "name"], Var("planetDoc")), 0, 1)
        )
      ),
    },
  },
  terms: [{ binding: "firstLetter" }],
});
```

As you can see in the **terms** object, we're now telling Fauna that the value we want to use for filtering is an index binding instead of a document field.

用語オブジェクトでわかるように、フィルタリングに使用する値はドキュメントフィールドではなくインデックスバインディングであることを Fauna に伝えています。

Great, so let's query the index as usual and pass the letter **M**:

すばらしいので、いつものようにインデックスをクエリして、文字 M を渡します。

```javascript
Map(
  Paginate(Match(Index("all_Planets_by_firstLetter"), "M")),
  Lambda("planetDoc", Get(Var("planetDoc")))
)

// Result:

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

簡単ですよね？

These bindings are very powerful. We can access all the FQL commands available to produce computed values.

これらのバインディングは非常に強力です。計算値を生成するために使用できるすべての FQL コマンドにアクセスできます。

#### **Filtering by any letter**

任意の文字によるフィルタリング

As a final example, let's see how we could check if an array produced by a binding includes a search term.

最後の例として、バインディングによって生成された配列に検索語が含まれているかどうかを確認する方法を見てみましょう。

**Quick note:** The NGram function is currently undocumented, but will be officially supported in a future release. You can [check more details here](https://fauna.com/blog/boosting-developer-productivity-with-string-functions).

クイックノート： NGram 関数は現在文書化されていませんが、将来のリリースで正式にサポートされる予定です。詳細はこちらで確認できます。

```javascript
CreateIndex({
  name: "filter_Spaceships_by_letter",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      nameLetters: Query(
        Lambda("shipDoc", NGram(Select(["data", "name"], Var("shipDoc")), 1, 1))
      ),
    },
  },
  terms: [{ binding: "nameLetters" }],
});
```

And query it:

そしてそれを照会します：

```javascript
Map(
  Paginate(Match(Index("filter_Spaceships_by_letter"), "V")),
  Lambda(
    "shipRef",
    Let(
      {
        shipDoc: Get(Var("shipRef")),
      },
      {
        name: Select(["data", "name"], Var("shipDoc")),
      }
    )
  )
);

// Result:

{
  data: [
    {
      name: "Voyager",
    },
    {
      name: "Explorer IV",
    },
  ];
}
```

This works because the NGram function produces an array of letters which can be queried by the index.

これが機能するのは、NGram 関数が、インデックスで照会できる文字の配列を生成するためです。

```javascript
NGram("FaunaDB", 1, 1)[
  // Result:

  ("F", "a", "u", "n", "a", "D", "B")
];
```

Or:

または：

```javascript
NGram("FaunaDB", 2, 3)[
  // Result:

  ("Fa", "Fau", "au", "aun", "un", "una", "na", "naD", "aD", "aDB", "DB")
];
```

You can create all sorts of binding values. For example, you could extract the day of the week from a timestamp using [DayOfWeek](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek) to get all events that happened on a Friday.

あらゆる種類のバインディング値を作成できます。たとえば、DayOfWeek を使用してタイムスタンプから曜日を抽出し、金曜日に発生したすべてのイベントを取得できます。

#### **Binding and unique constraints**

バインディングと固有の制約

If you're wondering, yes, you can use unique constraints over bindings too.

疑問に思っている場合は、はい、バインディングに対して一意の制約を使用することもできます。

Imagine we wanted to have keycards with ids for accessing our ships. We know that pilots have a history of forgetting their keycard ids, so these ids should be memorable and obvious. What if we create them based on the ships' names? And, since keycards would only be available for a single ship, these ids should be unique.

船にアクセスするための ID を持つキーカードが必要だったと想像してみてください。パイロットにはキーカード ID を忘れた歴史があることを私たちは知っているので、これらの ID は記憶に残る明白なものでなければなりません。船の名前に基づいて作成するとどうなりますか？また、キーカードは 1 隻の船でしか利用できないため、これらの ID は一意である必要があります。

```javascript
CreateIndex({
  name: "all_Keycards",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      keyCardId: Query(
        Lambda(
          "shipDoc",
          UpperCase(
            ReplaceStr(Select(["data", "name"], Var("shipDoc")), " ", "_")
          )
        )
      ),
    },
  },
  values: [{ binding: "keyCardId" }],
  unique: true,
});
```

If we query this index, you'll see how it all makes sense:

このインデックスをクエリすると、すべてがどのように意味があるかがわかります。

```javascript
Paginate(Match(Index("all_Keycards")));

// Result:

{
  data: [
    "DESTROYER",
    "EXPLORER_IV",
    "LE_SUPER_SPACESHIP",
    "NAVIGATOR",
    "ROCINANTE",
    "VOYAGER",
  ];
}
```

If we now try to create a new ship by using a name we've already used, we get an error. The **all_Keycards** index will prevent two keycards from having the same **keyCardId,** even if we have no unique constraints on the names of the spaceships themselves:

すでに使用している名前を使用して新しい船を作成しようとすると、エラーが発生します。all_Keycards のインデックスが同じことから 2 キーカードを防ぐことができます、keyCardId を我々は宇宙船自身の名前にはユニークな制約がない場合でも：

```javascript
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Le Super Spaceship"
    }
  }
)

// Result:

error: instance not unique
document is not unique.
position: ["create"]
```

## Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In part 3 of this series, we will continue our space adventure by learning how to model data in Fauna.

このシリーズのパート 3 では、Faunaでデータをモデル化する方法を学び、宇宙の冒険を続けます。

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb

**Next up: [Part 3 - a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)**

次のステップ：パート 3-Faunaを使用したデータのモデリングの原則の調査
