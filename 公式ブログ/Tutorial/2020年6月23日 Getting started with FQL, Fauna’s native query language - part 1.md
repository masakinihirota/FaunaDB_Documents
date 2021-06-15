Getting started with FQL, Fauna’s native query language - part 1
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1

# Getting started with FQL, Fauna’s native query language - part 1

Pier Bover|Jun 23rd, 2020|

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)[Serverless](https://fauna.com/blog?category=serverless)[Jamstack](https://fauna.com/blog?category=jamstack)

Fauna is a serverless global database designed for low latency and developer productivity. FQL, its query language, was also designed with these goals in mind. With it, you can create expressive queries that will allow you to harness the full power of Fauna.

Faunaは、低レイテンシと開発者の生産性のために設計されたサーバーレスグローバルデータベースです。クエリ言語であるFQLも、これらの目標を念頭に置いて設計されました。これを使用すると、動物相の力を最大限に活用できる表現力豊かなクエリを作成できます。

In this five-part series of articles, we’ll go through the basics of FQL with no need of prior knowledge. If you are skimming and don’t understand something, you probably only need to go back to a previous section.

Faunaは、低レイテンシと開発者の生産性のために設計されたサーバーレスグローバルデータベースです。クエリ言語であるFQLも、これらの目標を念頭に置いて設計されました。これを使用すると、動物相の力を最大限に活用できる表現力豊かなクエリを作成できます。

- Part 1: a look at FQL and fundamental Fauna concepts
- [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
- [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
- [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
- [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

パート1：FQLと基本的な動物相の概念を見る
パート2：動物相を使ったインデックスの詳細
パート3：動物相を使用したデータのモデリングの原則の調査
パート4：動物相で直接実行されるカスタム関数を作成する方法を見てみましょう
パート5：動物相の認証と承認について

In this article:

- Should you learn FQL if you're already using GraphQL?
- Getting started
- About documents and collections
- Your first collections
- Basic CRUD operations
- Your first index
- Using Lambda() to retrieve a list of documents
- Using Let() and Select() to return custom results

記事上で：

すでにGraphQLを使用している場合、FQLを学ぶ必要がありますか？
入門
ドキュメントとコレクションについて
あなたの最初のコレクション
基本的なCRUD操作
あなたの最初のインデックス
Lambda（）を使用してドキュメントのリストを取得する
Let（）とSelect（）を使用してカスタム結果を返す

## Should you learn FQL if you're already using GraphQL?

すでにGraphQLを使用している場合、FQLを学ぶ必要がありますか？

If you're using Fauna's native GraphQL API, you might be wondering if it makes sense to invest time in learning FQL. The answer is yes, absolutely.

FaunaのネイティブGraphQLAPIを使用している場合、FQLの学習に時間を費やすことが理にかなっているのか疑問に思われるかもしれません。答えは絶対にイエスです。

As an agnostic querying language, GraphQL is a great option for using Fauna straight from your client(s), but FQL will allow you to go beyond data querying and define more sophisticated behaviors right in the database. For example, you can define custom functions in FQL, similar in concept to SQL stored procedures, which can be triggered from GraphQL. See the [official docs](https://docs.fauna.com/fauna/current/api/graphql/functions) for more info on this.

不可知論的なクエリ言語として、GraphQLはクライアントから直接Faunaを使用するための優れたオプションですが、FQLを使用すると、データクエリを超えて、データベース内でより高度な動作を定義できます。たとえば、GraphQLからトリガーできるSQLストアドプロシージャと概念が似ているカスタム関数をFQLで定義できます。詳細については、公式ドキュメントを参照してください。

## Getting started

入門

Before embarking on our space adventure, you only need to [signup for a free Fauna account](https://dashboard.fauna.com/accounts/register). Fauna has a very generous free tier which is more than enough for learning, development, or even light production workloads.

私たちの宇宙冒険に着手する前に、あなたは無料の動物相アカウントにサインアップする必要があるだけです。動物相には非常に寛大な無料枠があり、学習、開発、さらには軽い生産ワークロードにも十分すぎるほどです。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/TbBjn9VERebQCYQ1SRY0A/e77c430767161853aca79cc41a909cf6/7651-FQL-p1-1.png)

Once inside the dashboard, create a new database and you’re good to go.

ダッシュボードに入ったら、新しいデータベースを作成すれば準備完了です。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2sLOjbK7PnqEcMH1x7RRLV/ad819b49ad855f03c6bb3a0ac257955b/7652-FQL-p1-2.png)

It’s also possible to install Fauna on your development machine using [an official Docker image](https://docs.fauna.com/fauna/current/start/dev) if you prefer.

必要に応じて、公式のDockerイメージを使用して開発マシンにFaunaをインストールすることもできます。

## About documents and collections

ドキュメントとコレクションについて

Fauna is a NoSQL database. Instead of organizing data in tables and rows, it uses documents and collections.

動物相はNoSQLデータベースです。データをテーブルと行に整理する代わりに、ドキュメントとコレクションを使用します。

The smallest units of data in Fauna are schemaless [documents](https://docs.fauna.com/fauna/current/api/fql/documents) which are basically JSON with some extra [Fauna types](https://docs.fauna.com/fauna/current/api/fql/types). These documents are grouped into collections which are simply buckets of documents.

動物相のデータの最小単位はスキーマレスドキュメントであり、基本的にJSONであり、いくつかの追加の動物相タイプがあります。これらのドキュメントは、単なるドキュメントのバケットであるコレクションにグループ化されます。

This is what a simple document looks like:

単純なドキュメントは次のようになります。

```javascript
{
  "ref": Ref(Collection("Planets"), "264471980339626516"),
  "ts": 1588478985090000,
  "data": {
    "name": "Vulcan"
  }
}
```

- **ref** is a reference that uniquely identifies the document inside a **Planets** collection with the id **264471980339626516**. We’ll go over references and the special [Ref type](https://docs.fauna.com/fauna/current/api/fql/functions/ref) in more detail later.

refは、IDが264471980339626516のPlanetsコレクション内のドキュメントを一意に識別する参照です。参照と特別なRefタイプについては、後で詳しく説明します。

- **ts** is a timestamp of the document's last event (e.g., create, read, update, delete) in microseconds.

tsは、ドキュメントの最後のイベント（作成、読み取り、更新、削除など）のタイムスタンプ（マイクロ秒単位）です。

- **data** is the actual data of the document. You can create any structure you need and use any of the JSON and Fauna types. Strings, numbers, references to other documents, nested objects, arrays, etc.

tsは、ドキュメントの最後のイベント（作成、読み取り、更新、削除など）のタイムスタンプ（マイクロ秒単位）です。

At creation, a document cannot exceed 1MB since that is the limit of a Fauna request. You can append more data to a document afterwards.

作成時に、ドキュメントは1MBを超えることはできません。これは、動物相リクエストの制限であるためです。後でドキュメントにさらにデータを追加できます。

## Your first collections

あなたの最初のコレクション

Obviously, before we begin our space adventure, we need a spaceship and a pilot. How else are we going to travel through space?

明らかに、宇宙の冒険を始める前に、宇宙船とパイロットが必要です。他にどのように宇宙を旅するのでしょうか？

Let’s create a Spaceships collection using the [CreateCollection](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection) function:

CreateCollection関数を使用してSpaceshipsコレクションを作成しましょう。

```javascript
CreateCollection({name: "Spaceships"})

// Result:

{
  "ref": Collection("Spaceships"),
  "ts": 1590269343560000,
  "history_days": 30,
  "name": "Spaceships"
}
```

As you can see, the result looks very similar to a document. Pretty much all data in Fauna is stored in documents. For now, let’s leave the default values and move on.

ご覧のとおり、結果はドキュメントと非常によく似ています。動物相のほとんどすべてのデータはドキュメントに保存されます。とりあえず、デフォルト値のままにして先に進みましょう。

Let’s create another a collection for our pilots:

パイロット用に別のコレクションを作成しましょう。

```javascript
CreateCollection({ name: "Pilots" });
```

We're ready now to start creating our first documents.

これで、最初のドキュメントの作成を開始する準備が整いました。

## Basic CRUD operations

基本的なCRUD操作

### **Create**

作成する

Let’s create our first document with the [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create) function:

Create関数を使用して最初のドキュメントを作成しましょう。

```javascript
Create(
  Collection("Pilots"),
  {
    data: {
      name: "Flash Gordon"
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Pilots"), "266350546751848978"),
  "ts": 1590270525630000,
  "data": {
    "name": "Flash Gordon"
  }
}
```

Let's break this down:

これを分解しましょう：

- Create is used to create new documents in Fauna.

Createは、Faunaで新しいドキュメントを作成するために使用されます。

- **Collection("Pilots")** is a reference to the **Pilots** collection.

Collection（ "Pilots"）は、Pilotsコレクションへの参照です。

- **{data: {name: "Flash Gordon"}}** is the actual data of the document.

{data：{name： "Flash Gordon"}}は、ドキュメントの実際のデータです。

So now that we’ve created a pilot, we can create a new spaceship:

パイロットを作成したので、新しい宇宙船を作成できます。

```javascript
Create(Collection("Spaceships"), {
  data: {
    name: "Millennium Hawk",
    pilot: Ref(Collection("Pilots"), "266350546751848978"),
  },
});
```

As you can see, we're now storing a reference to another document in the pilot property. I will cover references and relationships in much more detail in part three of this series.

ご覧のとおり、パイロットプロパティに別のドキュメントへの参照を保存しています。このシリーズのパート3では、参照と関係についてさらに詳しく説明します。

**Quick tip:** SQL users might be tempted to store the actual id in a pilot_id property of the JSON instead of a reference. This would be totally valid but it's recommended to use native Fauna references. This will make your FQL queries much simpler as we’ll see later on.

クイックヒント： SQLユーザーは、実際のIDを参照ではなくJSONのpilot_idプロパティに格納したくなる場合があります。これは完全に有効ですが、ネイティブの動物相参照を使用することをお勧めします。これにより、後で説明するように、FQLクエリがはるかに簡単になります。

### **Read**
読み込む

To read documents, we use the [Get function](https://docs.fauna.com/fauna/current/api/fql/functions/get) which receives a document reference and returns an actual document:

ドキュメントを読み取るには、ドキュメント参照を受け取り、実際のドキュメントを返すGet関数を使用します。

```javascript
Get(
  Ref(Collection("Spaceships"), "266354515987399186")
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274311000000,
  "data": {
    "name": "Millennium Hawk",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

### **Update**

更新

To update a document, we use [Update](https://docs.fauna.com/fauna/current/api/fql/functions/update). If we wanted to change the name of our ship, we’d simply run:

ドキュメントを更新するには、Updateを使用します。船の名前を変更したい場合は、次のコマンドを実行するだけです。

```javascript
Update(
  Ref(Collection("Spaceships"), "266354515987399186"),
  {
    data: {
      name: "Millennium Falcon"
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274726650000,
  "data": {
    "name": "Millennium Falcon",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

As you can see, only the name has been updated in the document and the pilot remains untouched. It’s also possible to replace an entire document using [Replace](https://docs.fauna.com/fauna/current/api/fql/functions/replace) instead.

ご覧のとおり、ドキュメントでは名前のみが更新されており、パイロットは変更されていません。代わりにReplaceを使用してドキュメント全体を置き換えることもできます。

### **Delete**

削除

On second thought, it’s probably better if we don’t use that copyrighted name for our spaceship. We don’t want to get into trouble with the galactic empire.

考え直してみると、その著作権で保護された名前を宇宙船に使用しない方がおそらく良いでしょう。私たちは銀河帝国とトラブルに巻き込まれたくありません。

As expected, to delete a document we simply use [Delete](https://docs.fauna.com/fauna/current/api/fql/functions/delete):

予想どおり、ドキュメントを削除するには、単にDeleteを使用します。

```javascript
Delete (
  Ref(Collection("Spaceships"), "266354515987399186")
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274726650000,
  "data": {
    "name": "Millennium Falcon",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

Let’s create a new spaceship again to continue with our adventure:

冒険を続けるために、新しい宇宙船をもう一度作成しましょう。

```javascript
Create(Collection("Spaceships"), {
  data: {
    name: "Voyager",
    pilot: Ref(Collection("Pilots"), "266350546751848978"),
  },
});
```

## Your first index

あなたの最初のインデックス

Fetching all documents in a database to check if each document fits a particular criteria would be very slow. In the relational world, this would be comparable in concept to a full table scan.

データベース内のすべてのドキュメントをフェッチして、各ドキュメントが特定の基準に適合しているかどうかを確認すると、非常に時間がかかります。リレーショナルの世界では、これは概念的には全表スキャンに匹敵します。

To solve this problem, Fauna implements [indexes](https://docs.fauna.com/fauna/current/api/fql/indexes). These are database entities that organise your data in such a way that they allow for efficient lookup of multiple documents. Whenever you create new documents, Fauna will know which indexes it needs to update in the background.

この問題を解決するために、Faunaはインデックスを実装しています。これらは、複数のドキュメントを効率的に検索できるようにデータを整理するデータベースエンティティです。新しいドキュメントを作成するたびに、Faunaはバックグラウンドで更新する必要のあるインデックスを認識します。

As we’ll see in the next article, indexes can span multiple collections and accept parameters for sorting and filtering.

次の記事で説明するように、インデックスは複数のコレクションにまたがり、並べ替えとフィルタリングのパラメーターを受け入れることができます。

For now, let’s create a simple index to list all the documents in a collection:

今のところ、コレクション内のすべてのドキュメントを一覧表示する簡単なインデックスを作成しましょう。

```javascript
CreateIndex({
  name: "all_Pilots",
  source: Collection("Pilots")
})

// Result:

{
  "ref": Index("all_Pilots"),
  "ts": 1590278778420000,
  "active": true,
  "serialized": true,
  "name": "all_Pilots",
  "source": Collection("Pilots"),
  "partitions": 8
}
```

Again, you can see that an index is just another type of document.

繰り返しになりますが、インデックスは単なる別のタイプのドキュメントであることがわかります。

After adding some more pilots to our collection, we can query our new index like this:

コレクションにパイロットを追加した後、次のように新しいインデックスをクエリできます。

```javascript
Paginate(
  Match(
    Index("all_Pilots")
  )
)

// Result:

{
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394"),
    Ref(Collection("Pilots"), "266359371696439826"),
    Ref(Collection("Pilots"), "266359447111074322")
  ]
}
```

Let’s break this down:

これを分解しましょう：

- [Index](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) returns a reference to an index

インデックスはインデックスへの参照を返します

- [Match](https://docs.fauna.com/fauna/current/api/fql/functions/match) accepts that reference and constructs a set, which is sort of like an abstract representation of the data. At this point, no data has been fetched from Fauna yet.

Matchはその参照を受け入れ、データの抽象的な表現のようなセットを構築します。この時点では、動物相からデータはまだフェッチされていません。

- [Paginate](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) 
takes the output from Match, fetches data from Fauna, and returns a [Page](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#page) of results. In this case, this is simply an array of references.

Paginateは、Matchから出力を取得し、Faunaからデータをフェッチして、結果のページを返します。この場合、これは単に参照の配列です。

### **Using the Documents function to get all the documents of a collection**

ドキュメント関数を使用してコレクションのすべてのドキュメントを取得する

The previous index was actually a very simplistic example that served as an introduction to indexes.

以前のインデックスは、実際には非常に単純な例であり、インデックスの概要として役立ちました。

Since retrieving all the documents in a collection is a very common need, Fauna provides us with the [Documents](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function to avoid the need to create a new index for every collection. It produces exactly the same results as the equivalent index.

コレクション内のすべてのドキュメントを取得することは非常に一般的なニーズであるため、Faunaは、コレクションごとに新しいインデックスを作成する必要をなくすために、Documents関数を提供します。同等のインデックスとまったく同じ結果が得られます。

```javascript
Paginate(Documents(Collection('Pilots')))

// Result:

{
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394"),
    Ref(Collection("Pilots"), "266359371696439826"),
    Ref(Collection("Pilots"), "266359447111074322")
  ]
}
```

### **Page size**

ページサイズ

By default, Paginate returns pages of 64 items. You can define how many items you’d like to receive with the **size** parameter up to 100,000 items:

デフォルトでは、Paginateは64アイテムのページを返します。最大100,000アイテムのサイズパラメータを使用して、受け取るアイテムの数を定義できます。

```javascript
Paginate(
  Match(Index("all_Pilots")),
  {size: 2}
)

// Result:

{
  "after": [
    Ref(Collection("Pilots"), "266359371696439826")
  ],
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394")
  ]
}
```

Since the number of results, in this case, does not fit in one page, Fauna also returns the **after** property to be used as a cursor. You can read more about [using cursors in the docs](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor).

この場合、結果の数が1ページに収まらないため、Faunaはカーソルとして使用するafterプロパティも返します。カーソルの使用について詳しくは、ドキュメントをご覧ください。

## Using Lambda() to retrieve a list of documents

Lambda（）を使用してドキュメントのリストを取得する

In some cases, you might want to retrieve a list of references, but generally, you will probably need an actual list of documents.

場合によっては、参照のリストを取得したい場合がありますが、通常は、実際のドキュメントのリストが必要になります。

Initially, you might think the best way to solve this would be by performing multiple queries from your programming language. That would be an anti-pattern which you absolutely want to avoid. You would introduce unnecessary latency and make your application much slower than it needs to be.

最初は、これを解決する最善の方法は、プログラミング言語から複数のクエリを実行することだと思うかもしれません。それは絶対に避けたいアンチパターンになります。不必要な待ち時間が発生し、アプリケーションが必要以上に遅くなります。

For example, in this JavaScript example, you'd be waiting first for the query to get the references and then for the queries to get the documents:

たとえば、このJavaScriptの例では、最初にクエリが参照を取得するのを待ってから、クエリがドキュメントを取得するのを待っています。

```javascript
// Don't do this!
const result = await client.query(q.Paginate(q.Match(q.Index("all_Pilots")));
const refs = result.data;
const promises = result.map(refs.map(ref => client.query(q.Get(ref))));
const pilots = await Promise.all(promises);
```

Or even worse, by waiting for each and every query that gets a document:

さらに悪いことに、ドキュメントを取得するすべてのクエリを待つことによって：

```javascript
// Don't do this!
// これをしないで！
const result = await client.query(q.Paginate(q.Match(q.Index("all_Pilots")));
const refs = result.data;
const pilots = [];
for (const ref of refs) {
  const pilot = await client.query(q.Get(ref));
  pilots.push(pilot);
}
```

The solution is simply to use FQL to solve this neatly in a single query.

解決策は、FQLを使用して、これを1つのクエリで適切に解決することです。

Here's the idiomatic solution of getting an actual list of documents from an array of references:

参照の配列からドキュメントの実際のリストを取得する慣用的な解決策は次のとおりです。

```javascript
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda('pilotRef', Get(Var('pilotRef')))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Pilots"), "266350546751848978"),
      "ts": 1590270525630000,
      "data": {
        "name": "Flash Gordon"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266359364060709394"),
      "ts": 1590278934520000,
      "data": {
        "name": "Luke Skywalker"
      }
    },
    // etc...
  ]
}
```

We’ve already seen that Paginate returns an array of references, right? The only mystery here is Map and this Lambda thing.

Paginateが参照の配列を返すことはすでに見てきましたよね？ここでの唯一の謎は、マップとこのラムダのものです。

You’ve probably already used a map function in your programming language of choice. It’s a function that accepts an array and returns a new array after performing an action on each item.

おそらく、選択したプログラミング言語でマップ関数をすでに使用しているでしょう。これは、配列を受け入れ、各アイテムに対してアクションを実行した後に新しい配列を返す関数です。

Consider this JavaScript example:

このJavaScriptの例を考えてみましょう。

```javascript
const anotherArray = myArray.map((item) => doSomething(item));

// which is equivalent to:
// と同等の効果があります。

const anotherArray = myArray.map(function (item) {
  return doSomething(item);
});
```

With this in mind, let’s break down this part of our FQL query:

これを念頭に置いて、FQLクエリのこの部分を分解してみましょう。

```javascript
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda("pilotRef", Get(Var("pilotRef")))
);
```

- Paginate returns an array of references.

Paginateは参照の配列を返します。

- [Map](https://docs.fauna.com/fauna/current/api/fql/functions/map) accepts an array (from Paginate or other sources), performs an action on each item of this array, and returns a new array with the new items. In this case, the action is performed using [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda), which is the Fauna equivalent of what you'd call a simple anonymous function in JavaScript. It's all very similar to the previous JavaScript example.

Mapは（Paginateまたは他のソースからの）配列を受け入れ、この配列の各アイテムに対してアクションを実行し、新しいアイテムを含む新しい配列を返します。この場合、アクションはLambdaを使用して実行されます。これは、JavaScriptで単純な無名関数と呼ぶものと同等の動物相です。これはすべて、前のJavaScriptの例と非常によく似ています。

- **Lambda('pilotRef'** defines a parameter called pilotRef for the anonymous function. You can name this parameter anything that makes sense for you. Fauna doesn’t care. In this example, the parameter will receive a reference which is why I named it pilotRef.

Lambda（ 'pilotRef'は、無名関数のpilotRefというパラメーターを定義します。このパラメーターには、意味のある名前を付けることができます。動物相は関係ありません。この例では、パラメーターは参照を受け取るため、pilotRefという名前を付けました。 。

- [Var](https://docs.fauna.com/fauna/current/api/fql/functions/var) is used to evaluate variables. In this case, it evaluates **"pilotRef"** and returns the document reference.

Varは、変数を評価するために使用されます。この場合、「pilotRef」を評価し、ドキュメント参照を返します。

- Finally, Get will receive the reference and return the actual document.

最後に、Getは参照を受け取り、実際のドキュメントを返します。

If we were to rewrite the previous FQL query with the JavaScript Fauna driver, we could do something like this:

以前のFQLクエリをJavaScriptFaunaドライバーで書き直す場合、次のようなことができます。

```javascript
q.Map(q.Paginate(q.Match(q.Index("all_Pilots"))), (pilotRef) =>
  q.Get(pilotRef)
);

// Or:

q.Map(
  q.Paginate(q.Match(q.Index("all_Pilots"))),
  q.Lambda("pilotRef", q.Get(q.Var("pilotRef")))
);
```

**Quick tip:** you can paste JavaScript queries into the Fauna shell as well as FQL queries.

クイックヒント： JavaScriptクエリをFaunaシェルとFQLクエリに貼り付けることができます。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3xvvAIDkV7aNfn4vxhgIMu/2f6ae8bb103904b0bd8f47fa42774c17/7654-FQL-p1-4.png)

## Using Let() and Select() to return custom results

Let（）とSelect（）を使用してカスタム結果を返す

Up until now, our documents have been pretty minimalistic. Let's add some more data to our spaceship:

これまで、私たちのドキュメントはかなりミニマルでした。宇宙船にさらにデータを追加しましょう。

```javascript
Update(
  Ref(Collection("Spaceships"),"266356873589948946"),
  {
    data: {
      type: "Rocket",
      fuelType: "Plasma",
      actualFuelTons: 7,
      maxFuelTons: 10,
      maxCargoTons: 25,
      maxPassengers: 5,
      maxRangeLightyears: 10,
      position: {
        x: 2234,
        y: 3453,
        z: 9805
      }
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1590524958830000,
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
    }
  }
}
```

Cool.
イイネ！

So now imagine our application were in fact managing a whole fleet and you needed to show a list of ships to the fleet admiral.

さて、私たちのアプリケーションが実際に艦隊全体を管理していて、艦隊提督に船のリストを表示する必要があると想像してみてください。

First, we'd need to create an index:

まず、インデックスを作成する必要があります。

```javascript
CreateIndex({
  name: "all_Spaceships",
  source: Collection("Spaceships"),
});
```

Ok, now we just use Paginate, Map, and Lambda like we saw earlier to get all the documents. So we do that but... Oh no!

さて、これで、前に見たようにPaginate、Map、Lambdaを使用してすべてのドキュメントを取得します。だから私たちはそれをしますが...ああ、いや！

The fleet admiral is very unhappy about the slow performance of his holomap now.

艦隊提督は、彼のホロマップのパフォーマンスが遅いことに非常に不満を持っています。

Sending the complete list with thousands of documents across lightyears of space wasn't a great idea because it's a lot of data. We propose breaking down the results with pages, but the admiral _absolutely_ needs to see all ships at once.

光年のスペースにわたって何千ものドキュメントを含む完全なリストを送信することは、大量のデータであるため、良い考えではありませんでした。結果をページで分類することを提案しますが、提督は絶対にすべての船を一度に見る必要があります。

_"By the cosmic gods! I don't care how much fuel a ship has!"_ shouts the admiral. _"I only want to know its name, id, and position!"._

「宇宙の神々によって！船がどれだけの燃料を持っているかは気にしない！」提督は叫びます。「名前、ID、位置だけを知りたい！」

Of course! Let's do that:

もちろん！そうしよう：

```javascript
Map(
  Paginate(Match(Index("all_Spaceships"))),
  Lambda("shipRef",
    Let(
      {
        shipDoc: Get(Var("shipRef"))
      },
      {
        id: Select(["ref", "id"], Var("shipDoc")),
        name: Select(["data", "name"], Var("shipDoc")),
        position: Select(["data", "position"], Var("shipDoc"))
      }
    )
  )
)

// Result:

{
  "data": [
    {
      "id": "266356873589948946",
      "name": "Voyager",
      "position": {
        "x": 2234,
        "y": 3453,
        "z": 9805
      }
    },
    {
      "id": "266619264914424339",
      "name": "Explorer IV",
      "position": {
        "x": 1134,
        "y": 9453,
        "z": 3205
      }
    }
    // etc...
  ]
}
```

Boom! Now the holomap loads much faster. We can see the satisfaction in the admiral's smile.

ブーム！これで、ホロマップの読み込みがはるかに速くなりました。提督の笑顔に満足感が伝わってきます。

Since we already know how Paginate, Map, and Lambda work together, this is the new part:

Paginate、Map、Lambdaがどのように連携するかはすでにわかっているので、これが新しい部分です。

```javascript
Let(
  {
    shipDoc: Get(Var("shipRef")),
  },
  {
    id: Select(["ref", "id"], Var("shipDoc")),
    name: Select(["data", "name"], Var("shipDoc")),
    position: Select(["data", "position"], Var("shipDoc")),
  }
);
```

### **Let**

let

[Let](https://docs.fauna.com/fauna/current/api/fql/functions/let) is a function used in FQL to create custom objects. You can even have nested Let functions to format the data with total freedom.

Letは、カスタムオブジェクトを作成するためにFQLで使用される関数です。ネストされたLet関数を使用して、データを完全に自由にフォーマットすることもできます。

The first part of Let is used to define variables that will be used later on. The docs call these variables "bindings". These bindings will be available to any nested Let objects you create.

Letの最初の部分は、後で使用される変数を定義するために使用されます。ドキュメントでは、これらの変数を「バインディング」と呼んでいます。これらのバインディングは、作成したネストされたLetオブジェクトで使用できます。

Here we define a **shipDoc** variable which will store the document returned from Get, which in turn will use the reference from the Lambda parameter:

ここでは、Getから返されたドキュメントを格納するshipDoc変数を定義します。この変数は、Lambdaパラメーターからの参照を使用します。

```javascript
{
  shipDoc: Get(Var("shipRef"));
}
```

The second part is the actual object that will be returned by Let:

2番目の部分は、Letによって返される実際のオブジェクトです。

```javascript
{
  id: Select(["ref", "id"], Var("shipDoc")),
  name: Select(["data", "name"], Var("shipDoc")),
  position: Select(["data", "position"], Var("shipDoc"))
}
```

### **Select**

選択する

[Select](https://docs.fauna.com/fauna/current/api/fql/functions/select) is used to select data from objects or arrays.

Selectは、オブジェクトまたは配列からデータを選択するために使用されます。

```javascript
Select(["data", "name"], Var("shipDoc"));
```

Here, we're telling Fauna to select the **name** property from the **data** property of the document stored in the **shipDoc** binding.

ここでは、shipDocバインディングに格納されているドキュメントのデータプロパティからnameプロパティを選択するようにFaunaに指示しています。

This array-like notation **"data", "name"** is called a path in Fauna lingo. We're using it here to get to the **name** property, but it can be used with integers to access array items too.

この配列のような表記「データ」、「名前」は、動物相の用語ではパスと呼ばれます。ここではnameプロパティにアクセスするために使用していますが、整数とともに使用して配列アイテムにアクセスすることもできます。

## Conclusion

結論

So that's it for today. Hopefully, you learned something valuable!

今日は以上です。うまくいけば、あなたは何か価値のあることを学びました！

In part 2 of the series, we will continue our space adventure by going deeper into indexes.

シリーズのパート2では、インデックスをさらに深く掘り下げて、宇宙の冒険を続けます。

If you have any questions, don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/pierb)

ご不明な点がございましたら、Twitterでお気軽にお問い合わせください：@pierb

**Next up:** [Part 2 - a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
