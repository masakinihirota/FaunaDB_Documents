Getting started with FQL, Fauna’s native query language - part 4
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4

# Getting started with FQL, Fauna’s native query language - part 4

Pier Bover|Jul 28th, 2020|

2020 年 7 月 28 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Welcome back, fellow space developer! We will continue our FQL space journey in this five-part series of articles.

ようこそ、仲間の宇宙開発者！この 5 部構成のシリーズの記事では、FQL 宇宙の旅を続けます。

- [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
- [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
- [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
- Part 4: a look at how to create custom functions that run straight in Fauna
- [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

パート 1：FQL と基本的なFaunaの概念を見る
パート 2：Faunaを使ったインデックスの詳細
パート 3：Faunaを使用したデータのモデリングの原則の調査
パート 4：Faunaで直接実行されるカスタム関数を作成する方法を見てみましょう
パート 5：Faunaの認証と承認について

Today, we're going to take a look at how to create custom functions that run straight in Fauna.

今日は、Fauna で直接実行されるカスタム関数を作成する方法を見ていきます。

## In this article:

今回の記事

- Introduction
- Why use UDFs?
- Your first function
- Creating transactions with Do
- Aborting functions and transactions
- Warping across the galaxy
- Data aggregation

前書き
なぜ UDF を使用するのですか？
あなたの最初の機能
Do でトランザクションを作成する
機能とトランザクションの中止
銀河を横切ってワープする
データ集約

## Introduction

前書き

We've seen in previous articles of this series that FQL is much closer to a functional programming language than other querying languages like SQL or GraphQL.

このシリーズの以前の記事で、FQL は SQL や GraphQL などの他のクエリ言語よりも関数型プログラミング言語にはるかに近いことがわかりました。

Much like in any programming language, FQL also allows you to craft complex behaviors by creating functions. We've already seen multiple examples of anonymous functions using [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) in your FQL queries. It's also possible to encapsulate these custom behaviors into the database by creating user-defined functions (UDFs in short) that can be invoked from your queries or even from other UDFs.

他のプログラミング言語と同じように、FQL では関数を作成して複雑な動作を作成することもできます。FQL クエリで Lambda を使用する無名関数の例はすでに複数見られます。クエリまたは他の UDF から呼び出すことができるユーザー定義関数（略して UDF）を作成することにより、これらのカスタム動作をデータベースにカプセル化することもできます。

UDFs are somewhat similar to stored procedures found in other databases. Of course, the implementation and capabilities of UDFs in Fauna will be very different because of the unique nature of FQL. For example, it's common to use stored procedures to group SQL queries, or to reduce the results sent to the database clients. You wouldn't really need to use an UDF in those situations since these can be accomplished in a regular FQL query executed from the application.

UDF は、他のデータベースにあるストアドプロシージャにいくぶん似ています。もちろん、FQL の独自の性質により、Faunaでの UDF の実装と機能は大きく異なります。たとえば、ストアドプロシージャを使用して、SQL クエリをグループ化したり、データベースクライアントに送信される結果を減らしたりするのが一般的です。これらの状況では、アプリケーションから実行される通常の FQL クエリで実行できるため、UDF を実際に使用する必要はありません。

## Why use UDFs?

なぜ UDF を使用するのですか？

I mean, other than because UDFs are super cool, there are a couple of reasons why you'd want to move logic into the database.

つまり、UDF が非常に優れているという理由以外に、ロジックをデータベースに移動する理由がいくつかあります。

#### **Avoid code duplication**

コードの重複を避ける

If you have multiple clients (web, API, mobile, desktop, microservices) written in multiple programming languages, you will probably want to avoid maintaining different versions of the same business logic. By moving some of that logic to the database, you can avoid code duplication, and thus all the effort and confusion that code duplication usually causes.

複数のプログラミング言語で記述された複数のクライアント（Web、API、モバイル、デスクトップ、マイクロサービス）がある場合は、同じビジネスロジックの異なるバージョンを維持することを避けたいと思うでしょう。そのロジックの一部をデータベースに移動することで、コードの重複を回避できます。したがって、コードの重複が通常引き起こすすべての労力と混乱を回避できます。

#### **Abstraction and decoupling of processes**

プロセスの抽象化と分離

As applications grow, you often need to abstract processes and their underlying data. This can be easily accomplished with UDFs. As an added benefit, the process is now decoupled from the rest of your logic. An outdated version of your application (e.g. web or mobile) could keep interacting with Fauna without knowing that an UDF has, in fact, been updated multiple times.

アプリケーションが成長するにつれて、多くの場合、プロセスとその基礎となるデータを抽象化する必要があります。これは、UDF を使用して簡単に実行できます。追加の利点として、プロセスは残りのロジックから切り離されています。アプリケーションの古いバージョン（Web やモバイルなど）は、UDF が実際に複数回更新されていることを知らなくても、Fauna と対話し続ける可能性があります。

#### **Consistency guarantees**

一貫性の保証

By having a single version of some business logic running as close to the database as possible, you will ensure your data is consistent. FQL is very expressive which will make this task easier compared to traditional stored procedures written in SQL.

一部のビジネスロジックの単一バージョンをデータベースのできるだけ近くで実行することにより、データの一貫性を確保できます。FQL は非常に表現力があり、SQL で記述された従来のストアドプロシージャと比較して、このタスクが簡単になります。

## Your first function

あなたの最初の機能

We'll start with a very simple function just to see the basics.

基本を確認するために、非常に単純な関数から始めます。

Here's the latest version of our spaceship document from the previous articles:

これは、以前の記事からの宇宙船ドキュメントの最新バージョンです。

```javascript
{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1592255653240000,
  "data": {
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
    "code": "VOYAGER",
    "colors": [
      "RED",
      "YELLOW"
    ]
  }
}
```

With this in mind, let's create a function that receives an id and returns an object:

これを念頭に置いて、ID を受け取り、オブジェクトを返す関数を作成しましょう。

```javascript
CreateFunction({
  name: "GetSpaceship",
  body: Query(
    Lambda(
      "shipId",
      Let(
        {
          shipDoc: Get(Ref(Collection("Spaceships"), Var("shipId"))),
        },
        {
          id: Select(["ref", "id"], Var("shipDoc")),
          name: Select(["data", "name"], Var("shipDoc")),
        }
      )
    )
  ),
});
```

If you've been following along with this series, there shouldn't be much of a mystery. We've previously covered [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda), [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let), [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select), and [Var](https://docs.fauna.com/fauna/current/api/fql/functions/var) with detail.

このシリーズを続けていれば、謎はあまりないはずです。これまで、Lambda、Let、Select、Var について詳しく説明しました。

As expected, [CreateFunction](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) creates a new function with the specified name and body.

予想どおり、CreateFunction は、指定された名前と本文で新しい関数を作成します。

We need to use the [Query](https://docs.fauna.com/fauna/current/api/fql/functions/query) function because we want to define a Lambda that will be executed later, not actually execute the Lambda when creating the function.

関数の作成時に実際に Lambda を実行するのではなく、後で実行される Lambda を定義するため、Query 関数を使用する必要があります。

This how we'd call the function:

これは、関数を呼び出す方法です。

```javascript
Call(Function("GetSpaceship"), "266356873589948946")

// Result:

{
  id: "266356873589948946",
  name: "Voyager"
}
```

Of course you could also use this function anywhere in your FQL queries.

もちろん、この関数は FQL クエリのどこでも使用できます。

Here's an example on how you could use it in combination with a list of results:

果のリストと組み合わせて使用 ​​ する方法の例を次に示します。

```javascript
Map(
  Paginate(Documents(Collection("Spaceships"))),
  Lambda(
    "shipRef",
    Call(Function("GetSpaceship"), Select(["id"], Var("shipRef")))
  )
);

// Result:

{
  data: [
    {
      id: "266356873589948946",
      name: "Voyager",
    },
    {
      id: "266619264914424339",
      name: "Explorer IV",
    },
    {
      id: "267096263925694994",
      name: "Destroyer",
    },
    // etc...
  ];
}
```

_**Quick tip:** the [Documents](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function allows you to retrieve a list of references from all the documents in a collection without having to set up an index._

クイックヒント：ドキュメントの機能を使用すると、インデックスを設定しなくても、コレクション内のすべての文書から参照のリストを取得することができます。

## Creating transactions with Do

Do でトランザクションを作成する

Unlike many NoSQL databases, Fauna supports ACID transactions. This essentially means that it guarantees the validity of a transaction no matter what: power failure, server crash, gremlins, alien attack... Ok, maybe not in the case of an alien attack, but you get the idea.

多くの NoSQL データベースとは異なり、Fauna は ACID トランザクションをサポートしています。これは本質的に、停電、サーバークラッシュ、グレムリン、エイリアン攻撃など、トランザクションの有効性を保証することを意味します。エイリアン攻撃の場合はそうではないかもしれませんが、あなたはその考えを理解しています。

Actually, transactions in Fauna are ACIDD (not an actual technical term) as they are also Distributed worldwide to all Fauna clusters.

実際、Fauna でのトランザクションは、すべての Fauna クラスターに世界中で配布されるため、ACIDD（実際の技術用語ではありません）です。

#### **The Do command**

Do コマンド

The [Do](https://docs.fauna.com/fauna/current/api/fql/functions/do) command executes a list of FQL expressions sequentially to form a transaction. Changes committed to the database in each of the expressions are immediately available to the following expressions.

実行（Do）コマンドは、トランザクションを形成するために、順次 FQL 式のリストを実行します。各式でデータベースにコミットされた変更は、次の式ですぐに利用できます。

To verify this, let's create a new collection first:

これを確認するために、最初に新しいコレクションを作成しましょう。

```javascript
CreateCollection({ name: "LaserColors" });
```

And then:

その後：

```javascript
Do(
  // first create a document
  Create(Ref(Collection("LaserColors"), "123456"), {
    data: {
      name: "Pink"
    }
  }),
  // then update that same document
  Update(Ref(Collection("LaserColors"), "123456"), {
    data: {
      hex: "#ff5c9e"
    }
  })
)

// Result:

{
  ref: Ref(Collection("LaserColors"), "123456"),
  ts: 1592364971590000,
  data: {
    name: "Pink",
    hex: "#ff5c9e"
  }
}
```

As you can see, the document created in the first expression is immediately available.

ご覧のとおり、最初の式で作成されたドキュメントはすぐに利用できます。

The **Do** command returns whatever the last command in the sequence returned, so we get the full document with the updated data.

実行（Do） 、我々は、更新されたデータとの完全なドキュメントを取得するように、シーケンスの最後のコマンドは、返されたどんなコマンドが返します。

## Aborting functions and transactions

機能とトランザクションの中止

Obviously, whenever something fails, Fauna will let you know about it. You can also define when and how you want a transaction or a function to fail. In Fauna this is done using the [Abort](https://docs.fauna.com/fauna/current/api/fql/functions/abort) function.

明らかに、何かが失敗したときはいつでも、Faunaはあなたにそれについて知らせます。トランザクションまたは関数をいつどのように失敗させるかを定義することもできます。Faunaでは、これは中止機能を使用して行われます。

Let's create a simple example:

簡単な例を作成しましょう：

```javascript
Do(
  "Step 1",
  "Step 2",
  Abort("You shall not pass!"),
  "Step 3"
)

// Result:

error: transaction aborted
You shall not pass!
position: ["do",2]
```

Now, if you were executing this (rather useless) query in your application, you'd be getting an exception.

さて、アプリケーションでこの（かなり役に立たない）クエリを実行していると、例外が発生します。

In JavaScript for example:

たとえば JavaScript の場合：

```javascript
try {
  const result = await client.query(
    q.Do("Step 1", "Step 2", q.Abort("You shall not pass!"), "Step 3")
  );
} catch (error) {
  // do something with the error
}
```

As expected, this applies to UDFs too:

予想どおり、これは UDF にも当てはまります。

```javascript
CreateFunction({
  name: "StopIt",
  body: Query(
    Lambda("bool", If(Var("bool"), Abort("Stopped!"), "Not stopped!"))
  ),
});
```

If we pass **true** to the UDF, the execution of the function will be aborted and an exception will be raised:

UDF に true を渡すと、関数の実行が中止され、例外が発生します。

```javascript
Call(Function("StopIt"), true);

// Result:

Error: [
  {
    position: [],
    code: "call error",
    description: "Calling the function resulted in an error.",
    cause: [
      {
        position: ["expr", "then"],
        code: "transaction aborted",
        description: "Stopped!",
      },
    ],
  },
];
```

## Warping across the galaxy

銀河を横切ってワープする

Let's go through a more complex example to give you a better idea on how these concepts work together. We're going to create a **WarpToPlanet** function to propel our ships to infinity and beyond.

より複雑な例を見て、これらの概念がどのように連携するかについてより良いアイデアを提供しましょう。WarpToPlanet 関数を作成して、船を無限に、そしてそれを超えて推進します。

#### **Step 1: Check if we have enough fuel**

ステップ 1：十分な燃料があるかどうかを確認します

I have to admit that my celestial navigation math is a bit rusty, especially if wormholes are involved, so we're just going to assume that a spaceship needs **5** tons of fuel to warp anywhere in the galaxy.

特にワームホールが関係している場合、私の天体航法の計算は少し錆びていることを認めなければなりません。したがって、宇宙船が銀河のどこかで反り返るには 5 トンの燃料が必要であると仮定します。

To know how much fuel a ship has left, we can use this property:

船がどれだけの燃料を残しているかを知るために、このプロパティを使用できます。

```javascript
"actualFuelTons": 7
```

Let's make a function that returns **true** if there is enough fuel to create a wormhole and travel through it:

ワームホールを作成して通過するのに十分な燃料がある場合に true を返す関数を作成しましょう。

```javascript
CreateFunction({
  name: "HasEnoughFuelToWarp",
  body: Query(
    Lambda(
      "shipRef",
      Let(
        {
          shipDoc: Get(Var("shipRef")),
          actualFuelTons: Select(["data", "actualFuelTons"], Var("shipDoc")),
        },
        GTE(Var("actualFuelTons"), 5)
      )
    )
  ),
});
```

This is a very straightforward Lambda:

これは非常に単純なラムダです。

- First, we prepare the Let bindings that we need. In this case, we get the document and extract the **actualFuelTons** property from the document.

まず、必要な Let バインディングを準備します。この場合、ドキュメントを取得し、ドキュメントから actualFuelTons プロパティを抽出します。

- Second, we check that the **actualFuelTons** is greater than or equal to **5**

次に、actualFuelTons が 5 以上であることを確認します

To test it out, we only need to use a reference to our Voyager ship (which we know has **7** tons of fuel available):

それをテストするには、ボイジャー船への参照を使用するだけで済みます（7 トンの燃料が利用可能であることがわかっています）。

```javascript
Call(
  Function("HasEnoughFuelToWarp"),
  Ref(Collection("Spaceships"), "266356873589948946")
);

// Result:

true;
```

#### **Step 2: Open the wormhole and warp**

ステップ 2：ワームホールを開いてワーム

Now, let's create a simple function to enable lightspeed on the ship by simply updating a bit of data on its document:

それでは、ドキュメントのデータを少し更新するだけで、船の光速を有効にする簡単な関数を作成しましょう。

```javascript
CreateFunction({
  name: "OpenWormholeAndWarp",
  body: Query(
    Lambda(
      "shipRef",
      Update(
        Var("shipRef"),
        Let(
          {
            shipDoc: Get(Var("shipRef")),
            actualFuelTons: Select(["data", "actualFuelTons"], Var("shipDoc")),
          },
          {
            data: {
              actualFuelTons: Subtract(Var("actualFuelTons"), 5),
            },
          }
        )
      )
    )
  ),
});
```

Easy, right? We're just subtracting 5 from the **actualFuelTons** using the [Subtract](https://docs.fauna.com/fauna/current/api/fql/functions/subtract) function.

簡単ですよね？減算関数を使用して、actualFuelTons から 5 を減算しているだけです。

Let's test this out on our Destroyer ship which currently has **11** tons of fuel:

現在 11 トンの燃料を搭載している駆逐艦でこれをテストしてみましょう。

```javascript
{
  "ref": Ref(Collection("Spaceships"), "267096263925694994"),
  "ts": 1592513359750000,
  "data": {
    "name": "Destroyer",
    "actualFuelTons": 11
    // etc...
  }
}
```

To invoke the function, we just need a reference to the document of the ship:

invoke
行使する

関数を呼び出すには、船のドキュメントへの参照が必要です。

```javascript
Call(
  Function("OpenWormholeAndWarp"),
  Ref(Collection("Spaceships"), "267096263925694994")
)

// Result:

{
  ref: Ref(Collection("Spaceships"), "267096263925694994"),
  ts: 1592513503470000,
  data: {
    name: "Destroyer",
    actualFuelTons: 6,
    // etc...
}
```

As expected, Destroyer now has **6** tons of fuel left.

予想通り、デストロイヤーには 6 トンの燃料が残っています。

#### **Step 3: Write to the ship's log**

ステップ 3：船のログに書き込む

The admiral wouldn't be too happy if we didn't keep a log of what's going on with our ships. We'll create a function that creates a new log entry whenever a ship warps to a new planet.

私たちが船で何が起こっているのかを記録していなければ、提督はあまり幸せではなかったでしょう。船が新しい惑星にワープするたびに新しいログエントリを作成する関数を作成します。

First, we need a collection to store our logs:

まず、ログを保存するためのコレクションが必要です。

```javascript
CreateCollection({ name: "ShipLogs" });
```

And a function to create a new document in that collection:

そして、そのコレクションに新しいドキュメントを作成する関数：

```javascript
CreateFunction({
  name: "CreateLogEntry",
  body: Query(
    Lambda(
      ["shipRef", "planetRef", "status"],
      Create(Collection("ShipLogs"), {
        data: {
          shipRef: Var("shipRef"),
          planetRef: Var("planetRef"),
          status: Var("status"),
        },
      })
    )
  ),
});
```

#### **Step 4: All together now**

ステップ 4：今すぐ一緒に

For our last step, let's see how to combine all these functions to create the super ultimate **WarpToPlanet** function:

最後のステップとして、これらすべての関数を組み合わせて、超究極の WarpToPlanet 関数を作成する方法を見てみましょう。

```javascript
CreateFunction({
  name: "WarpToPlanet",
  body: Query(
    Lambda(
      ["shipRef", "planetRef"],
      If(
        Call(Function("HasEnoughFuelToWarp"), Var("shipRef")),
        Do(
          Call(Function("OpenWormholeAndWarp"), Var("shipRef")),
          Call(Function("CreateLogEntry"), [
            Var("shipRef"),
            Var("planetRef"),
            "WARPED_TO_PLANET",
          ]),
          Let(
            {
              planetDoc: Get(Var("planetRef")),
              planetName: Select(["data", "name"], Var("planetDoc")),
              shipDoc: Get(Var("shipRef")),
              shipName: Select(["data", "name"], Var("shipDoc")),
            },
            Concat(["Welcome ", Var("shipName"), " to ", Var("planetName")])
          )
        ),
        Abort("Not enough fuel!")
      )
    )
  ),
});
```

Let's break this down:

これを分解しましょう：

- [If](https://docs.fauna.com/fauna/current/api/fql/functions/if) will evaluate the result of the **HasEnoughFuelToWarp** function. If it returns true, it will execute the **Do** statement. If it returns false, if it will execute the **Abort** function.

HasEnoughFuelToWarp 関数の結果を評価する場合。true を返すと、Do ステートメントが実行されます。false を返す場合、Abort 関数を実行する場合。

- [Do](https://docs.fauna.com/fauna/current/api/fql/functions/do) is executing a transaction, like we saw earlier.

前に見たように、Do はトランザクションを実行しています。

- The last expression of the transaction produces a welcome message when a ship arrives on a planet.

トランザクションの最後の表現は、船が惑星に到着したときにウェルカムメッセージを生成します。

Finally, let's test all our hard work!

最後に、私たちのすべてのハードワークをテストしましょう！

Let's warp with Voyager to planet Vulkan:

ボイジャーで惑星ヴァルカンにワープしましょう：

```javascript
Call(
  Function("WarpToPlanet"),
  [
    Ref(Collection("Spaceships"), "266356873589948946"),
    Ref(Collection("Planets"), "268706982578356743"),
  ]
)

// Result:

Welcome Voyager to Vulkan
```

Bravo!

ブラボー！

If we check our ship document, we can see the it only has **2** tons of fuel left:

船の書類を確認すると、燃料が 2 トンしか残っていないことがわかります。

```javascript
{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1592518256580000,
  "data": {
    "name": "Voyager",
    "actualFuelTons": 2,
    // etc...
}
```

And there's also a new document in the **ShipLogs** collection:

また、ShipLogs コレクションには新しいドキュメントがあります。

```javascript
{
  "ref": Ref(Collection("ShipLogs"), "268707463485719047"),
  "ts": 1592518256580000,
  "data": {
    "shipRef": Ref(Collection("Spaceships"), "266356873589948946"),
    "planetRef": Ref(Collection("Planets"), "268706982578356743"),
    "status": "WARPED_TO_PLANET"
  }
}
```

Honestly, there's not much to do in Vulkan and these Vulkans are quite boring.

正直なところ、Vulkan で行うことはあまりなく、これらの Vulkan は非常に退屈です。

Let's go back to Earth:

地球に戻りましょう：

```javascript
Call(Function("WarpToPlanet"), [
  Ref(Collection("Spaceships"), "266356873589948946"),
  Ref(Collection("Planets"), "267081091831038483"),
]);

// Result:

Error: [
  {
    position: [],
    code: "call error",
    description: "Calling the function resulted in an error.",
    cause: [
      {
        position: ["expr", "else"],
        code: "transaction aborted",
        description: "Not enough fuel!",
      },
    ],
  },
];
```

Oh no! We don't have enough fuel to warp to Earth! Well, at least our function works as expected.

なんてこった！
地球にワープするのに十分な燃料がありません！まあ、少なくとも私たちの機能は期待通りに機能します。

Obviously, the logic of this example is extremely simple, but we've covered a number of important points related to UDFs.

明らかに、この例のロジックは非常に単純ですが、UDF に関連するいくつかの重要なポイントについて説明しました。

First, to operate the **WarpToPlanet** function, our application doesn't need to know anything about the fuel logic, or even about the structure of the related documents. It only needs to pass two references. When (not if) the implementation of the function changes, we won't need to update any code in our application(s).

まず、WarpToPlanet 関数を操作するために、アプリケーションは燃料ロジックについて、または関連ドキュメントの構造についてさえ何も知る必要はありません。2 つの参照を渡すだけで済みます。関数の実装が変更された場合（そうでない場合）、アプリケーションのコードを更新する必要はありません。

And second, to call the **WarpToPlanet** function our application needs to know about spaceships and planets, but it doesn't need to know about the **ShipLogs** collection.

次に、WarpToPlanet 関数を呼び出すために、アプリケーションは宇宙船と惑星について知る必要がありますが、ShipLogs コレクションについて知る必要はありません。

## Data aggregation

データ集約

Let's see how to use UDFs to aggregate data from multiple documents.

UDF を使用して複数のドキュメントからデータを集約する方法を見てみましょう。

In our first article, the admiral tasked us with feeding his holomap with the position of all spaceships. This worked fine, but now he'd like to be able to go backwards and forwards in time to better understand the movement of the ships.

私たちの最初の記事で、提督は彼のホロマップにすべての宇宙船の位置を与えることを私たちに任せました。これは問題なく機能しましたが、船の動きをよりよく理解するために、時間内に前後に移動できるようにしたいと考えています。

Obviously, we need to store the position somehow, but the admiral won't tolerate a slow holomap, so it needs to be as fast as possible.

もちろん、どうにかして位置を保存する必要がありますが、提督は遅いホロマップを許容しないので、できるだけ速くする必要があります。

We saw in [the previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3) that reading a single document will give us the best performance. We also saw this pattern presents some dangers, but since the recorded data will never change, and the number of ships is not very large, this is the perfect scenario for storing all the data in a single document.

私たちは、で見た前の記事単一のドキュメントを読むこと私たちに最高のパフォーマンスを与えること。また、このパターンにはいくつかの危険性があることもわかりましたが、記録されたデータは決して変わらず、船の数もそれほど多くないため、これはすべてのデータを 1 つのドキュメントに保存するのに最適なシナリオです。

First, let's create a new collection:

まず、新しいコレクションを作成しましょう。

```javascript
CreateCollection({ name: "ShipPositionsHistory" });
```

And this would be the function:

そして、これは関数になります：

```javascript
CreateFunction({
  name: "RecordPositions4",
  body: Query(
    Lambda(
      "bool",
      Do(
        Create(
          Collection("ShipPositionsHistory"),
          Let(
            {
              shipsDocuments: Map(
                Paginate(Documents(Collection("Spaceships"))),
                Lambda("shipRef", Get(Var("shipRef")))
              ),
              positions: Map(
                Var("shipsDocuments"),
                Lambda("shipDocument", {
                  ref: Select(["ref"], Var("shipDocument")),
                  name: Select(["data", "name"], Var("shipDocument")),
                  position: Select(
                    ["data", "celestialPosition"],
                    Var("shipDocument")
                  ),
                })
              ),
            },
            {
              data: {
                timestamp: Now(),
                positions: Var("positions"),
              },
            }
          )
        ),
        "Positions recorded"
      )
    )
  ),
});
```

Again, these are the same FQL commands we've seen multiple times.

繰り返しますが、これらは私たちが何度も見たのと同じ FQL コマンドです。

This function would first get an array of Spaceships documents (denoted with the variable **shipsDocuments** in the Let). Then, it creates a new document into the **ShipPositionsHistory** collection with an array of ships and their positions.

この関数は、最初に Spaceships ドキュメントの配列を取得します（Let の変数 shipsDocuments で示されます）。次に、一連の船とその位置を含む新しいドキュメントを ShipPositionsHistory コレクションに作成します。

We are performing this inside a transaction with a simple string on the last step. Otherwise, we'd be returning the complete result of the Create function to our application, which might slow things down a bit.

これは、最後のステップで単純な文字列を使用してトランザクション内で実行しています。そうしないと、Create 関数の完全な結果がアプリケーションに返され、処理が少し遅くなる可能性があります。

Now, we'd only need to trigger the function periodically:

これで、関数を定期的にトリガーするだけで済みます。

```javascript
Call(Function("RecordPositions"))

// Result:

Positions recorded
```

If we check our **ShipPositionsHistory** collection, here is our first document:

ShipPositionsHistory コレクションを確認すると、最初のドキュメントは次のようになります。

```javascript
{
  ref: Ref(Collection("ShipPositionsHistory"), "268613645148094983"),
  ts: 1592428784478000,
  data: {
    timestamp: Time("2020-06-17T21:19:44.239194Z"),
    positions: {
      data: [
        {
          ref: Ref(Collection("Spaceships"), "266356873589948946"),
          name: "Voyager",
          position: {
            x: 2234,
            y: 3453,
            z: 9805
          }
        },
        {
          ref: Ref(Collection("Spaceships"), "266619264914424339"),
          name: "Explorer IV",
          position: {
            x: 1134,
            y: 9453,
            z: 3205
          }
        },
        // etc...
      ]
    }
  }
}
```

## Conclusion

結論

So that's it for today. Hopefully you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In part 5 of this series, we will wrap it all up by going deeper into roles and permissions in Fauna.

このシリーズのパート 5 では、Faunaの役割と権限について詳しく説明し、すべてをまとめます。

If you have any questions, don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

ご不明な点がございましたら、Twitter でお気軽にお問い合わせください：@pierb
