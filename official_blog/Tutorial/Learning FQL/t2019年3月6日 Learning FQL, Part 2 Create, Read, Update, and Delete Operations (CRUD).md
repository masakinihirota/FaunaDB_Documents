Learning FQL, Part 2: Create, Read, Update, and Delete Operations (CRUD)
https://fauna.com/blog/learning-fql-part-2-create-read-update-and-delete-operations-crud

# Learning FQL, Part 2: Create, Read, Update, and Delete Operations (CRUD)
Chris Anderson

FQLの学習、パート2：作成、読み取り、更新、および削除操作（CRUD）

Mar 6th, 2019

2019年3月6日

Categories:

Tutorial

The most common database queries are used simply to manipulate individual data items. For instance a recipe application allows users to save a new recipe, read an existing recipe, make changes to a recipe, or remove an unwanted recipe. Of course, most applications also include complex queries, such as listing all my favorite recipes, or adding a flag to all the recipes that include ingredients which contain gluten – which will be the focus of other articles in this series.

最も一般的なデータベースクエリは、単に個々のデータ項目を操作するために使用されます。たとえば、レシピアプリケーションを使用すると、ユーザーは新しいレシピを保存したり、既存のレシピを読んだり、レシピに変更を加えたり、不要なレシピを削除したりできます。もちろん、ほとんどのアプリケーションには、私のお気に入りのレシピをすべて一覧表示したり、グルテンを含む材料を含むすべてのレシピにフラグを追加したりするなど、複雑なクエリも含まれています。これは、このシリーズの他の記事の焦点となります。

This article is about basic CRUD operations. There is some setup and context that you need before you can save documents to the database. For instance, you’ll need to define a schema to tell Fauna which types of documents you’ll be dealing with. You’ll also need to ensure your code can connect to the database. Those prerequisites are outside the scope of this article, as here we’ll focus on the common runtime operations on documents: create, read, update, and delete. Check out the first article in the series for help setting up your database schema.

この記事は、基本的なCRUD操作についてです。ドキュメントをデータベースに保存する前に必要なセットアップとコンテキストがいくつかあります。たとえば、処理するドキュメントの種類をFaunaに通知するスキーマを定義する必要があります。また、コードがデータベースに接続できることを確認する必要があります。ここでは、ドキュメントの一般的なランタイム操作（作成、読み取り、更新、削除）に焦点を当てるため、これらの前提条件はこの記事の範囲外です。チェックアウトシリーズの最初の記事をあなたのデータベーススキーマを設定するに助けを。

## Create

作成する

Once you’ve setup your Fauna client driver and created a database in Fauna, you are ready to create a document. In Fauna Shell, your query might look like this:

あなたがしたら、あなたの動植物クライアントドライバの設定をしてファウナでデータベースを作成し、ドキュメントを作成する準備ができました。Faunaシェルでは、クエリは次のようになります。

```
Create(Class("recipes"), {
    data : {
        title : "Lentil Soup",
        ingredients : ["carrots", "lentils", "tomatoes", "onions", "ginger", "garlic", "olive oil"],
        description : "..."
}})

#=> {
    ref: Ref(Class("recipes"), "226111113652077056"),
    ts: 1551895211820000,
    data: { title : "Lentil Soup" ... } }

```

This query references the “recipes” class, to tell the database which kind of document to create. Indexes and other schema objects can work on classes of documents. It is common for each application to define several classes. You can learn more about setting up your schema in the FaunaDB documentation.

このクエリは「レシピ」クラスを参照して、作成するドキュメントの種類をデータベースに通知します。インデックスやその他のスキーマオブジェクトは、ドキュメントのクラスで機能します。各アプリケーションが複数のクラスを定義することは一般的です。スキーマの設定について詳しくは、FaunaDBのドキュメントをご覧ください。

## Read

読む

You can see in the above query that the application data is all contained in the data field. FaunaDB makes system fields available as well, so everything you store will be in the data field. One of the system fields is the ref, which is a reference to the object itself. You can acquire a ref via an index query, or from the result of a CRUD operation. We can use this reference in other queries. Let’s run the query we defined above, and use the reference returned to issue a read.

上記のクエリで、アプリケーションデータがすべてデータフィールドに含まれていることがわかります。FaunaDBはシステムフィールドも利用できるようにするため、保存するものはすべてデータフィールドにあります。システムフィールドの1つは、オブジェクト自体への参照であるrefです。インデックスクエリを介して、またはCRUD操作の結果からrefを取得できます。この参照は他のクエリでも使用できます。上で定義したクエリを実行し、返された参照を使用して読み取りを発行しましょう。

The FQL we use to fetch a document is simple, in this case we use the ref value returned from the above Create query. Your return value will have a different id.

ドキュメントのフェッチに使用するFQLは単純です。この場合、上記のCreateクエリから返されたref値を使用します。戻り値のIDは異なります。

```
Get(Ref(Class("recipes"), "226111113652077056"))
```

In the below JavaScript example, soupRef is a reference obtained from running the above query. This example uses JavaScript in addition to FQL, in order to show you how refs can be reused for future queries in your code:

以下のJavaScriptの例では、soupRefは上記のクエリを実行して取得した参照です。この例では、FQLに加えてJavaScriptを使用して、コード内の将来のクエリで参照を再利用する方法を示しています。

```
dbClient.query(makeRecipeQuery).then((createResult) => {
    const soupRef = createResult.ref
    const readSoupQuery = q.Get(soupRef)
    dbClient.query(readSoupQuery).then((soupRecipe) => {
        console.log(soupRecipe.data.title) // “Lentil Soup”
    })
})
```

The actual read query Get(soupRef) is so simple, that it makes a good opportunity to show how data flows through an asynchronous JavaScript example.

実際の読み取りクエリGet（soupRef）は非常に単純なので、非同期JavaScriptの例でデータがどのように流れるかを示す良い機会になります。

The Get function can also be embedded in more complex queries, for instance it is common to iterate over the results of an index match and use Get to load the associated documents. A future article in this series will discuss patterns for bulk operations.

Get関数は、より複雑なクエリに埋め込むこともできます。たとえば、インデックスの一致の結果を繰り返し処理し、Getを使用して関連するドキュメントを読み込むのが一般的です。このシリーズの今後の記事では、一括操作のパターンについて説明します。

## Update

更新

Updating a document we loaded from database is done by directly manipulating it and saving it back. Extending on the above example:

データベースからロードしたドキュメントの更新は、ドキュメントを直接操作して保存し直すことで実行されます。上記の例を拡張します。

```
Update(Ref(Class("recipes"), "226111113652077056"), {
    data : {
        description: “A flavorful take on the hearty classic.”
}})
```

In this query, we only have to specify the data field we wish to change. Any unspecified data fields will not be modified. If you want to remove a field, you can replace it with a null value.

このクエリでは、変更するデータフィールドを指定するだけで済みます。指定されていないデータフィールドは変更されません。フィールドを削除する場合は、null値に置き換えることができます。

## Delete

削除

The new description has been added to the soup recipe. But then our uncle Robert calls and insists the recipe is a family secret and can’t be shared! So to delete it, we issue a query using the same reference we used before:

スープレシピに新しい説明が追加されました。しかし、叔父のロバートが電話をかけて、レシピは家族の秘密であり、共有することはできないと主張します！したがって、それを削除するには、以前に使用したのと同じ参照を使用してクエリを発行します。

```
Delete(Ref(Class("recipes"), "226111113652077056"))
```

You can read the full documentation for Delete here. It is also a common pattern to iterate over an index Match result set and delete all of the documents that it references. Look forward to exploring bulk create, read, update and delete patterns in a future article in this series.

削除の完全なドキュメントはここで読むことができます。インデックスの一致結果セットを反復処理し、参照するすべてのドキュメントを削除することも一般的なパターンです。このシリーズの今後の記事で、パターンの一括作成、読み取り、更新、削除について説明することを楽しみにしています。

## Putting it Together

それを一緒に入れて

Composability is a key design goal of FQL. Composable queries are easy to build programmatically, and the patterns you learn can be reused and nested. Compare-and-swap or check-and-set (CAS) is a common pattern built by combining the functions described in this post. Essentially, a CAS update is an update that only succeeds if no other process has changed the data since it was read. This allows the application to alert the user that someone else is editing a document, instead of the users discovering that they have clobbered each other’s work.

構成可能性は、FQLの主要な設計目標です。構成可能なクエリはプログラムで簡単に作成でき、学習したパターンは再利用してネストできます。コンペアアンドスワップまたはチェックアンドセット（CAS）は、この投稿で説明されている機能を組み合わせて構築された一般的なパターンです。基本的に、CAS更新は、読み取られてから他のプロセスがデータを変更していない場合にのみ成功する更新です。これにより、アプリケーションは、ユーザーがお互いの作業を妨害したことに気付くのではなく、他の誰かがドキュメントを編集していることをユーザーに警告できます。

To implement CAS, first the application reads a document, then makes changes to it, and saves them back with an instruction to only save if the document hasn’t been touched in the meantime. In FQL it looks like this: (assume 1551895211820000 came from the read the application made to populate the UI, and was submitted with the user as part of a form request.)

CASを実装するには、最初にアプリケーションがドキュメントを読み取り、次にドキュメントに変更を加え、その間にドキュメントに触れていない場合にのみ保存するように指示して保存します。FQLでは、次のようになります（1551895211820000は、UIにデータを入力するために作成されたアプリケーションの読み取りから取得され、フォーム要求の一部としてユーザーとともに送信されたと想定します）。

```
If(Equals(1551895211820000, Select("ts", Get(Ref(Class("recipes"), "226111113652077056")))),
    Update(Ref(Class("recipes"), "226111113652077056"), { data : { title : "Best Lentil Soup" } }),
    "Too late, someone else changed the record since you read it.")
```

This query combines Get, and Update, along with control flow operators like If, logical operators like Equals, and data addressing with Select. If the document’s timestamp has changed since it was loaded by the user, the query fails with an error saying the update is too late. The CRUD operations we are familiar with, and the other operators are designed to be familiar from other languages. Select allows you to pull a particular field from a document. In this case we used the timestamp, so any other change to the document (which automatically updates its timestamp) results in a CAS failure, but if you Select the field you plan to update, you can scope your CAS to the title alone. This allows you to do a conditional update on one field, for instance changing the title even if someone else has changed the ingredients in the meantime.

このクエリは、GetとUpdateに加えて、Ifなどの制御フロー演算子、Equalsなどの論理演算子、およびSelectを使用したデータアドレス指定を組み合わせたものです。ユーザーがドキュメントをロードしてからドキュメントのタイムスタンプが変更された場合、クエリは失敗し、更新が遅すぎるというエラーが表示されます。私たちが精通しているCRUD操作、および他の演算子は、他の言語から精通するように設計されています。Selectを使用すると、ドキュメントから特定のフィールドを取得できます。この場合、タイムスタンプを使用したため、ドキュメントに他の変更を加えると（タイムスタンプが自動的に更新されます）、CASが失敗しますが、更新するフィールドを選択すると、CASのスコープをタイトルのみに設定できます。これにより、1つのフィールドで条件付き更新を行うことができます。たとえば、他の誰かがその間に材料を変更した場合でも、タイトルを変更できます。

In the next part of this series we'll cover database Access Keys. Here is a preview of the kinds of patterns you can implement with Fauna database access control.

このシリーズの次のパートでは、データベースのアクセスキーについて説明します。これは、Faunaデータベースのアクセス制御で実装できるパターンの種類のプレビューです。

