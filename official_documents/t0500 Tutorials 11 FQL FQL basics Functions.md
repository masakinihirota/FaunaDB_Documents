Functions | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/basics/functions



# Functions






Welcome back, fellow space developer! We are continuing our FQL space journey in this five-part tutorial.





宇宙開発者の皆さん、お帰りなさい。全5回のチュートリアルで、FQL Spaceの旅を続けています。





In this fourth part, we’re going to take a look at how to create custom functions that run in Fauna.




第4回目の今回は、Faunaで動作するカスタム関数の作成方法をご紹介します。







On this page:

このページでは


-   [Introduction](#introduction)
-   [Why use UDFs?](#why)
    -   [Avoid code duplication](#dry)
    -   [Abstraction and decoupling of processes](#abstraction)
    -   [Consistency guarantees](#consistency)
    -   [Security](#security)
-   [Your first function](#first)
-   [Creating transactions with Do](#transactions)
    -   [The Do function](#do)
-   [Aborting functions and transactions](#abort)
-   [Warping across the galaxy](#warp)
    -   [Step 1: Check if we have enough fuel](#step1)
    -   [Step 2: Open the wormhole and warp](#step2)
    -   [Step 3: Write to the ship’s log](#step3)
    -   [Step 4: All together now](#step4)
-   [Data aggregation](#aggregation)
-   [Conclusion](#conclusion)

---

- はじめに](#introduction)
- [なぜUDFを使うのか](#why)
    - [コードの重複を避ける](#dry)
    - [プロセスの抽象化とデカップリング](#abstraction)
    - 一貫性の保証](#consistency)
    - セキュリティ](#security)
- [最初の関数](#first)
- Doによるトランザクションの作成](#transactions)
    - [Do関数](#do)
- [関数やトランザクションを中止する](#abort)
- [銀河系を渡るワープ](#warp)
    - [ステップ1：燃料が足りているか確認](#step1)
    - [ステップ2：ワームホールを開けてワープする](#step2)
    - [ステップ3：船のログに書き込む](#step3)
    - [ステップ4：これで全員集合](#step4)
- データ集計](#aggregation)
- 結論](#conclusion)







## [](#introduction)Introduction

イントロダクション




We’ve seen in previous sections of this tutorial that FQL is much closer to a functional programming language than other querying languages, such as SQL or GraphQL.






このチュートリアルの前のセクションでは、FQLがSQLやGraphQLなどの他のクエリ言語よりもはるかに関数型プログラミング言語に近いことを説明しました。





Much like in any programming language, FQL also allows you to craft complex behaviors by creating functions. We’ve already seen multiple examples of anonymous functions using the [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function in your FQL queries. It’s also possible to encapsulate these custom behaviors into the database by creating user-defined functions (UDFs) that can be invoked from your queries, or even from other UDFs.




他のプログラミング言語と同様に、FQLでも関数を作成することで複雑な動作をさせることができます。すでに、FQLのクエリで[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数を使った無名関数の例を複数見てきました。ユーザー定義関数(UDF)を作成することで、これらのカスタム動作をデータベースにカプセル化することも可能です。UDFは、クエリや他のUDFから呼び出すことができます。





UDFs are somewhat similar to stored procedures found in other databases. Of course, the implementation and capabilities of UDFs in Fauna are be very different because of the unique nature of FQL. For example, it’s common to use stored procedures to group SQL queries, or to reduce the results sent to the database clients. You wouldn’t really need to use an UDF in those situations since these can be accomplished in a regular FQL query executed from the application.



UDFは、他のデータベースにあるストアドプロシージャに似ています。もちろん、FQLのユニークな性質により、FaunaにおけるUDFの実装と機能は大きく異なります。たとえば、SQLクエリをグループ化したり、データベースのクライアントに送信される結果を減らすためにストアドプロシージャを使用するのが一般的です。このような場合、アプリケーションから実行される通常のFQLクエリで実現できるので、UDFを使用する必要はありません。





## [](#why)Why use UDFs?


なぜUDFを使うのか？



I mean, other than because UDFs are super cool, there are a couple of reasons why you’d want to move logic into the database.




つまり、UDFが超クールであること以外に、ロジックをデータベースに移動させたい理由がいくつかあります。









### [](#dry)Avoid code duplication



コードの重複を避ける




If you have multiple clients (web, API, mobile, desktop, microservices) written in multiple programming languages, you probably want to avoid maintaining different versions of the same business logic. By moving some of that logic to the database, you can avoid code duplication, and thus all of the effort and confusion that code duplication usually causes.





複数のプログラミング言語で書かれた複数のクライアント(Web、API、モバイル、デスクトップ、マイクロサービス)を持っている場合、同じビジネスロジックの異なるバージョンを維持することは避けたいと思うでしょう。ロジックの一部をデータベースに移行することで、コードの重複を避けることができ、その結果、コードの重複が引き起こす労力や混乱を回避することができます。






### [](#abstraction)Abstraction and decoupling of processes

プロセスの抽象化とデカップリング






As applications grow, you often need to abstract processes and their underlying data. This can be easily accomplished with UDFs. As an added benefit, the process is now decoupled from the rest of your logic. An outdated version of your application (e.g. web or mobile) could keep interacting with Fauna without knowing that an UDF has, in fact, been updated multiple times.




アプリケーションの規模が大きくなると、プロセスやその基礎となるデータを抽象化する必要が出てきます。これはUDFで簡単に実現できます。追加の利点としては、プロセスが残りのロジックから切り離されることです。古いバージョンのアプリケーション（ウェブやモバイルなど）は、UDFが実際には何度も更新されていることを知らずに、Faunaとのやり取りを続けることができます。






### [](#consistency)Consistency guarantees



一貫性の保証






By having a single version of some business logic running as close to the database as possible, you will ensure your data is consistent. FQL is very expressive which will make this task easier compared to traditional stored procedures written in SQL.





いくつかのビジネスロジックの単一バージョンをできるだけデータベースの近くで実行することで、データの一貫性を確保できます。FQL の表現力は非常に高く、従来の SQL で書かれたストアドプロシージャに比べて、この作業が容易になります。






### [](#security)Security


セキュリティ






UDFs allow you to encapsulate logic that consists of multiple reads and/or writes. This allows you to write security rules that provide access to this logic as one unit. A user can either execute the function or not, but not just part of the logic. This comes in handy when querying Fauna from a less secure environment such as a frontend application or a mobile client.




UDFを使うと、複数の読み書きで構成されるロジックをカプセル化することができます。これにより、このロジックへのアクセスを提供するセキュリティルールを1つのユニットとして記述することができます。ユーザーは関数を実行することもできますが、ロジックの一部だけを実行することはできません。この機能は、フロントエンドアプリケーションやモバイルクライアントなど、安全性の低い環境からFaunaに問い合わせを行う場合に便利です。





## [](#first)Your first function


あなたの最初の関数






We’ll start with a very simple function, just to see the basics.






まずは基本的なことを確認するために、非常にシンプルな関数から始めます。




Here’s the latest version of our spaceship document from the previous parts of the tutorial:




ここでは、チュートリアルの前の部分で作ったスペースシップドキュメントの最新版を紹介します。






```json
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
    "position": {
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






With this in mind, let’s create a function that receives a ship ID and returns an object:




この点を踏まえて、船のIDを受け取り、オブジェクトを返す関数を作ってみましょう。




shell






```shell
CreateFunction({
  name: "GetSpaceship",
  body: Query(
    Lambda("shipId",
      Let(
        {
          shipDoc: Get(Ref(Collection("Spaceships"),Var("shipId")))
        },
        {
          id: Select(["ref","id"], Var("shipDoc")),
          name: Select(["data","name"], Var("shipDoc"))
        }
      )
  ))
})
```






If you’ve been following along with this tutorial, there shouldn’t be much of a mystery. We’ve previously covered the [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda), [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let), [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select), and [`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var) functions in detail.






このチュートリアルについてきていれば、それほど不思議なことはないはずです。以前、[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)、[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let)、[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)、[`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)の各関数について詳しく説明しました。




As expected, the [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) function creates a new function with the specified name and body.





予想通り，[`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)関数は，指定された名前とボディを持つ新しい関数を作成します．







We need to use the [`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query) function because we want to define a `Lambda` that will be executed later, not actually execute the `Lambda` when creating the function.







関数を作成するときに実際に`Lambda`を実行するのではなく、後で実行される`Lambda`を定義したいので、[`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)関数を使用する必要があります。






This how we’d call the function:




このようにして、関数を呼び出します。








shell






```shell
Call(Function("GetSpaceship"), "266356873589948946")
  // NOTE: be sure to use the correct document ID for your
  // GetSpaceship function here
```






```json
{
  id: "266356873589948946",
  name: "Voyager"
}
```






Of course, you could also use this function anywhere in your FQL queries.






もちろん、この関数はFQLクエリのどこにでも使うことができます。




Here’s an example demonstrating how you could use it in combination with a list of results:






ここでは、結果のリストと組み合わせて使用する例を紹介します。







shell






```shell
Map(
  Paginate(Documents(Collection("Spaceships"))),
  Lambda(
    "shipRef",
    Call(Function("GetSpaceship"), Select(["id"], Var("shipRef")))
  )
)
```






```json
{
  data: [
    {
      id: "266356873589948946",
      name: "Voyager"
    },
    {
      id: "266619264914424339",
      name: "Explorer IV"
    },
    {
      id: "267096263925694994",
      name: "Destroyer"
    },
    // etc...
  ]
}
```






The [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function allows you to retrieve a list of references from all of the documents in a collection, without having to set up an index.





[`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents)関数を使うと、インデックスを設定しなくても、コレクション内のすべてのドキュメントから参照のリストを取得することができます。






## [](#transactions)Creating transactions with Do



Doによるトランザクションの作成





Unlike many document-oriented databases, Fauna provides ACID transactions. This essentially means that it guarantees the validity of a transaction, no matter what: power failure, server crash, gremlins, alien attack… Okay, maybe not in the case of an alien attack, but you get the idea.




多くのドキュメント指向データベースとは異なり、Fauna は ACID トランザクションを提供する。これは本質的に、停電、サーバークラッシュ、グレムリン、エイリアンの攻撃......まあ、エイリアンの攻撃の場合は違うかもしれないが、考え方はわかるだろう。






Actually, transactions in Fauna are ACIDD (not an actual technical term) as they are also globally distributed.


実際、Fauna のトランザクションはグローバルに分散されているので ACIDD (実際の技術用語ではありません) です。







### [](#do)The Do function


Do関数







The [`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do) function executes a list of FQL expressions sequentially to form a transaction. Changes committed to the database in each of the expressions are immediately available to the following expressions.



[`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do) 関数は、FQL 式のリストを順次実行してトランザクションを形成します。各式でデータベースにコミットされた変更は、次の式ですぐに利用できます。





To verify this, let’s create a new collection first:





これを確認するために、まず新しいコレクションを作成してみましょう。







shell






```shell
CreateCollection({name: "LaserColors"})
```






And then:




そして、次のように







shell






```shell
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
```






```json
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





ご覧の通り、最初の式で作成したドキュメントがすぐに利用できます。





The `Do` function returns whatever the last command in the sequence returned, so we get the full document with the updated data.





「Do」関数は、一連のコマンドの中で最後に返されたものを返すので、更新されたデータを含む完全なドキュメントを得ることができます。






## [](#abort)Aborting functions and transactions

関数やトランザクションを中止する







Obviously, whenever something fails, Fauna lets you know about it. You can also define when and how you want a transaction or a function to fail. This is done using the [`Abort`](https://docs.fauna.com/fauna/current/api/fql/functions/abort) function.




当然のことながら、何か失敗するとFaunaはそのことを知らせてくれます。トランザクションや関数が失敗するタイミングや方法を定義することもできます。これには [`Abort`](https://docs.fauna.com/fauna/current/api/fql/functions/abort) 関数を使用します。






Let’s create a simple example:



簡単な例を作ってみましょう。






shell






```shell
Do(
  "Step 1",
  "Step 2",
  Abort("You shall not pass!"),
  "Step 3"
)
```






```
error: transaction aborted
You shall not pass!
position: ["do",2]
```






Now, if you were executing this (rather useless) query in your application, you’d be getting an exception.




さて、この（かなり無駄な）クエリをアプリケーションで実行すると、例外が発生するでしょう。







In JavaScript, for example:






例えば、JavaScriptの場合です。





```javascript
try {
  const result = await client.query(
    q.Do(
      "Step 1",
      "Step 2",
      q.Abort("You shall not pass!"),
      "Step 3"
    )
  );
} catch (error) {
  // do something with the error
}
```






As expected, this applies to UDFs too:





予想通り、これはUDFにも適用されます。








shell






```shell
CreateFunction({
  name: "StopIt",
  body: Query(
    Lambda("bool",
      If(
        Var("bool"),
        Abort("Stopped!"),
        "Not stopped!"
      )
    )
  )
})
```






If we pass true to the UDF, the execution of the function is aborted and an exception is raised:





UDFにtrueを渡すと，関数の実行は中止され，例外が発生します．






shell






```shell
Call(Function("StopIt"), true)
```






```
Error: [
  {
    "position": [],
    "code": "call error",
    "description": "Calling the function resulted in an error.",
    "cause": [
      {
        "position": [
          "expr",
          "then"
        ],
        "code": "transaction aborted",
        "description": "Stopped!"
      }
    ]
  }
]
```






## [](#warp)Warping across the galaxy



銀河系を渡るワープ






Let’s go through a more complex example to give you a better idea about how these concepts work together. We’re going to create a `WarpToPlanet` function to propel our ships, to infinity and beyond.





これらのコンセプトがどのように機能するかを理解してもらうために、より複雑な例を見てみましょう。ここでは、無限の彼方へと船を走らせるために、`WarpToPlanet`関数を作成します。







### [](#step1)Step 1: Check if we have enough fuel



ステップ1: 十分な燃料があるかどうかの確認




I have to admit that my celestial navigation math is a bit rusty, especially if wormholes are involved, so we’re just going to assume that a spaceship needs 5 tons of fuel to warp anywhere in the galaxy.





ここでは、宇宙船が銀河系内のどこかにワープするには5トンの燃料が必要だと仮定します。






To know how much fuel a ship has left, we can use this property:





船にどれだけの燃料が残っているかを知るには、このプロパティを使います。






```json
"actualFuelTons": 7
```






Let’s make a function that returns true if there is enough fuel to create a wormhole and travel through it:



ワームホールを作ってそこを通過するのに十分な燃料がある場合にtrueを返す関数を作ってみましょう。







shell






```shell
CreateFunction({
  name: "HasEnoughFuelToWarp",
  body: Query(
    Lambda("shipRef",
      Let(
        {
          shipDoc: Get(Var("shipRef")),
          actualFuelTons: Select(["data","actualFuelTons"], Var("shipDoc"))
        },
        GTE(Var("actualFuelTons"), 5)
      )
  ))
})
```






This is a very straightforward [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda):






これはとてもわかりやすい[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)です。






-   First, we prepare the [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) bindings that we need. In this case, we get the document and extract the `actualFuelTons` property from the document.




- まず、必要な[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let)バインディングを用意します。ここでは、ドキュメントを取得して、そのドキュメントから `actualFuelTons` プロパティを抽出します。






-   Second, we check that `actualFuelTons` is greater than or equal to 5.



- 次に、`actualFuelTons` が 5 以上であるかどうかを調べます。









To test it out, we only need to use a reference to our Voyager ship (which we know has 7 tons of fuel available):






これをテストするには、ボイジャー船（7トンの燃料を持っていることがわかっている）への参照を使うだけです。


shell






```shell
Call(
  Function("HasEnoughFuelToWarp"),
  Ref(Collection("Spaceships"), "266356873589948946")
)
```






```json
true
```






### [](#step2)Step 2: Open the wormhole and warp


ステップ2: ワームホールを開けてワープする







Now, let’s create a simple function to enable light speed on the ship by simply updating a bit of data on its document:



それでは、船のドキュメントのデータを更新するだけで、船の光速航行を可能にする簡単な関数を作ってみましょう。






shell






```shell
CreateFunction({
  name: "OpenWormholeAndWarp",
  body: Query(
    Lambda("shipRef",
      Update(
        Var("shipRef"),
        Let({
          shipDoc: Get(Var("shipRef")),
          actualFuelTons: Select(["data","actualFuelTons"], Var("shipDoc"))
        }, {
          data:{
            actualFuelTons: Subtract(Var("actualFuelTons"), 5)
          }
        })
      )
    )
  )
})
```






Easy, right? We’re just subtracting 5 from `actualFuelTons` using the [`Subtract`](https://docs.fauna.com/fauna/current/api/fql/functions/subtract) function.



簡単でしょう？関数 [Subtract`](https://docs.fauna.com/fauna/current/api/fql/functions/subtract) を使って、`actualFuelTons` から 5 を引くだけです。







Let’s test this out on our Destroyer ship which currently has 11 tons of fuel:






それでは、現在11トンの燃料を持っているデストロイヤー船でテストしてみましょう。






```json
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



この関数を呼び出すには、船のドキュメントへの参照が必要です。






shell






```shell
Call(
  Function("OpenWormholeAndWarp"),
  Ref(Collection("Spaceships"), "267096263925694994")
)
```






```json
{
  ref: Ref(Collection("Spaceships"), "267096263925694994"),
  ts: 1592513503470000,
  data: {
    name: "Destroyer",
    actualFuelTons: 6,
    // etc...
}
```






As expected, Destroyer now has 6 tons of fuel left.





予想通り、Destroyerには6トンの燃料が残っています。







### [](#step3)Step 3: Write to the ship’s log



ステップ3: 艦船のログに書き込む




The admiral wouldn’t be too happy if we didn’t keep a log of what’s going on with our ships. We are going to create a function that creates a new log entry whenever a ship warps to a new planet.



艦船で何が起こっているかをログに残さないと、提督はあまり嬉しくないでしょう。ここでは、船が新しい惑星にワープするたびに、新しいログを作成する関数を作ってみよう。







First, we need a collection to store our logs:



まず、ログを保存するためのコレクションが必要です。






shell






```shell
CreateCollection({name: "ShipLogs"})
```






And a function to create a new document in that collection:



そして、そのコレクションに新しいドキュメントを作成するための関数です。






shell






```shell
CreateFunction({
  name: "CreateLogEntry",
  body: Query(
    Lambda(["shipRef","planetRef","status"],
      Create(
        Collection("ShipLogs"),
        {
          data: {
            shipRef: Var("shipRef"),
            planetRef: Var("planetRef"),
            status: Var("status")
          }
        }
      )
    )
  )
})
```






### [](#step4)Step 4: All together now

Step 4: All together now







For our last step, let’s see how to combine all these functions to create the super ultimate WarpToPlanet function:





最後のステップとして、これらの関数を組み合わせて、超究極のWarpToPlanet関数を作る方法を見てみましょう。




shell






```shell
CreateFunction({
  name: "WarpToPlanet",
  body: Query(
    Lambda(["shipRef","planetRef"],
      If(
        Call(Function("HasEnoughFuelToWarp"), Var("shipRef")),
        Do(
          Call(Function("OpenWormholeAndWarp"), Var("shipRef")),
          Call(
            Function("CreateLogEntry"),
            [Var("shipRef"), Var("planetRef"), "WARPED_TO_PLANET"]
          ),
          Let(
            {
              planetDoc: Get(Var("planetRef")),
              planetName: Select(["data","name"],Var("planetDoc")),
              shipDoc: Get(Var("shipRef")),
              shipName: Select(["data","name"],Var("shipDoc")),
            },
            Concat(["Welcome ",Var("shipName")," to ",Var("planetName")])
          )
        ),
       Abort("Not enough fuel!")
      )
    )
  )
})
```






Let’s break this down:





これを分解してみましょう。





-   The [`If`](https://docs.fauna.com/fauna/current/api/fql/functions/if) function evaluates the result of the `HasEnoughFuelToWarp` function. If it returns `true`, it executes the [`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do) function. If it returns `false`, it executes the [`Abort`](https://docs.fauna.com/fauna/current/api/fql/functions/abort) function.




- [`If`](https://docs.fauna.com/fauna/current/api/fql/functions/if) 関数は、`HasEnoughFuelToWarp` 関数の結果を評価します。[`If`](https://docs.fauna.com/fauna/current/api/fql/functions/do)関数は`HasEnoughFuelToWarp`関数の結果を評価し、`true`を返せば[`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do)関数を実行します。`false`を返した場合は、[`Abort`](https://docs.fauna.com/fauna/current/api/fql/functions/abort)関数を実行します。







-   The [`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do) function executes a transaction, like we saw earlier.



- [`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do)関数は、先ほど見たようなトランザクションを実行します。







-   The last expression of the transaction produces a welcome message when a ship arrives on a planet.



- トランザクションの最後の式では、船が惑星に到着したときに歓迎のメッセージを生成します。







Finally, let’s test all of our hard work!




最後に、私たちが一生懸命作ったものをテストしてみましょう!







Let’s warp with Voyager to planet Vulkan:




ボイジャーで惑星Vulkanにワープしてみましょう。







shell






```shell
Call(
  Function("WarpToPlanet"),
  [
    Ref(Collection("Spaceships"), "266356873589948946"),
    Ref(Collection("Planets"), "268706982578356743"),
  ]
)
```






```json
Welcome Voyager to Vulkan
```






Bravo!






If we check our ship document, we can see the it only has 2 tons of fuel left:




船のドキュメントを見てみると、燃料が2トンしか残っていないことがわかります。






```json
{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1592518256580000,
  "data": {
    "name": "Voyager",
    "actualFuelTons": 2,
    // etc...
}
```






And there’s also a new document in the `ShipLogs` collection:





そして、`ShipLogs`コレクションにも新しいドキュメントが追加されました。






```json
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






Honestly, there’s not much to do on Vulkan and these Vulkans are quite boring.





正直なところ、Vulkanにはあまりやることがなく、このVulkanはかなり退屈なものです。







Let’s go back to Earth:






地球に戻ろう。





shell






```shell
Call(
  Function("WarpToPlanet"),
  [
    Ref(Collection("Spaceships"), "266356873589948946"),
    Ref(Collection("Planets"), "267081091831038483"),
  ]
)
```






```json
Error: [
  {
    "position": [],
    "code": "call error",
    "description": "Calling the function resulted in an error.",
    "cause": [
      {
        "position": [
          "expr",
          "else"
        ],
        "code": "transaction aborted",
        "description": "Not enough fuel!"
      }
    ]
  }
]
```






Oh no! We don’t have enough fuel to warp to Earth! Well, at least our function works as expected.




やばい！地球にワープするための燃料が足りない！？まあ、少なくともこの関数は期待通りに動作しています。







Obviously, the logic of this example is extremely simple, but we’ve covered a number of important points related to UDFs.






もちろん、この例のロジックは非常にシンプルですが、UDFに関する重要なポイントをいくつか取り上げています。






First, to operate the `WarpToPlanet` function, our application doesn’t need to know anything about the fuel logic, or even about the structure of the related documents. It only needs to pass two references. When (not if) the implementation of the function changes, we won’t need to update any code in our application(s).








まず、`WarpToPlanet`関数を動作させるために、アプリケーションは燃料のロジックや、関連するドキュメントの構造について何も知る必要がありません。必要なのは2つの参照を渡すことだけです。この関数の実装が変更されても、アプリケーションのコードを更新する必要はありません。




And second, to call the `WarpToPlanet` function our application needs to know about spaceships and planets, but it doesn’t need to know about the `ShipLogs` collection.





次に，`WarpToPlanet`関数を呼び出すために，アプリケーションは宇宙船と惑星について知っている必要がありますが，`ShipLogs`コレクションについて知っている必要はありません．





## [](#aggregation)Data aggregation



データのアグリゲーション




Let’s see how to use UDFs to aggregate data from multiple documents.



UDFを使って複数のドキュメントからデータを集約する方法を見てみましょう。





In first section of this tutorial, the admiral tasked us with feeding his holo-map with the position of all spaceships. This worked fine, but now he’d like to be able to go backwards and forwards in time to better understand the movement of the ships.




このチュートリアルの最初のセクションでは、提督からホロマップにすべての宇宙船の位置を入力するように指示がありました。これはうまくいきましたが、今度は船の動きをよりよく理解するために、時間をさかのぼったり、さかのぼったりできるようにしたいそうです。






Obviously, we need to store the position somehow, but the admiral won’t tolerate a slow holo-map, so it needs to be as fast as possible.



もちろん、何らかの方法で位置を保存する必要がありますが、提督はホロマップが遅いことを許さないので、できるだけ速くする必要があります。








We saw in the tutorial section that reading a single document gives us the best performance. We also saw that this pattern presents some dangers, but since the recorded data never changes, and the number of ships is not very large, this is the perfect scenario for storing all of the data in a single document.





チュートリアルのセクションでは、1つのドキュメントを読むのが最も良いパフォーマンスを発揮することを説明しました。このパターンにはいくつかの危険性があることもわかりましたが、記録されたデータが変更されることはなく、艦船の数もそれほど多くないので、すべてのデータを1つのドキュメントに保存するには最適なシナリオです。









First, let’s create a new collection:






まず、新しいコレクションを作ってみましょう。





shell






```shell
CreateCollection({name: "ShipPositionsHistory"})
```






And this would be the function:





そして、これが関数になります。




shell






```shell
CreateFunction({
  name: "RecordPositions",
  body: Query(
    Lambda("bool",
      Do(
        Create(
          Collection("ShipPositionsHistory"),
          Let({
            shipsDocuments: Map(
              Paginate(
                Documents(Collection("Spaceships"))),
                Lambda("shipRef", Get(Var("shipRef"))
              )
            ),
            positions: Map(
              Var("shipsDocuments"),
              Lambda("shipDocument",
                {
                  ref: Select(["ref"], Var("shipDocument")),
                  name: Select(["data","name"], Var("shipDocument")),
                  position: Select(
                    ["data","position"],
                    Var("shipDocument")
                  )
                }
              )
            )
          },{
            data: {
              timestamp: Now(),
              positions: Var("positions")
            }
          })
        ),
        "Positions recorded"
      )
    )
  )
})
```






Again, these are the same FQL commands that we’ve seen multiple times.





繰り返しになりますが、これらは何度も見てきた同じFQLコマンドです。






This function would first get an array of `Spaceships` documents (denoted with the variable `shipsDocuments` in the [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) function). Then, it creates a new document within the `ShipPositionsHistory` collection with an array of ships and their positions.





この関数は、まず `Spaceships` ドキュメントの配列を取得します ([Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) 関数では、変数 `shipsDocuments` で示されています)。次に、`ShipPositionsHistory`コレクションの中に、船とその位置の配列を含む新しいドキュメントを作成します。




We are performing this inside a transaction with a simple string as the last step. Otherwise, we’d be returning the complete result of the [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) function to our application, which might slow things down a bit.




この処理は、最後のステップとして単純な文字列を使ったトランザクションの中で行っています。そうしないと、[`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)関数の完全な結果をアプリケーションに返してしまうことになり、処理が少し遅くなってしまいます。








Now, we only need to trigger the function periodically:





これで、この関数を定期的に起動するだけでよくなります。






shell






```shell
Call(Function("RecordPositions"))
```






```json
Positions recorded
```






If we check our `ShipPositionsHistory` collection, here is our first document:




`ShipPositionsHistory`コレクションを確認すると、最初のドキュメントがあります。






```json
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






## [](#conclusion)Conclusion


結論



So that’s it for today. Hopefully you learned something valuable!




というわけで、今日はこれでおしまい。何か貴重なことを学んでいただけたでしょうか？





In [part 5 of the tutorial](https://docs.fauna.com/fauna/current/tutorials/basics/authentication), we wrap it all up by going deeper into roles and permissions in Fauna.




[チュートリアルのパート5](https://docs.fauna.com/fauna/current/tutorials/basics/authentication)では、Faunaのロールとパーミッションをより深く掘り下げて、すべてをまとめます。















