Learning FQL, Part 1: Fauna Schema Objects
https://fauna.com/blog/learning-fql-part-1-faunadb-schema-objects

# Learning FQL, Part 1: Fauna Schema Objects

FQLの学習、パート1：動物相スキーマオブジェクト

Chris Anderson|Feb 26th, 2019|

2019年2月26日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

This series introduces the Fauna Query Language, giving examples of patterns and APIs that you’ll interact with as you use the database. This is the first article in the series, and discusses the primitive objects that you’ll work with in Fauna. You can find a [comprehensive glossary of Fauna terms](https://app.fauna.com/documentation/reference/glossary) in the documentation. This article focuses on introducing you to the API objects that you’ll work with most.

このシリーズでは、動物相クエリ言語を紹介し、データベースを使用するときに操作するパターンとAPIの例を示します。これはシリーズの最初の記事であり、Faunaで使用するプリミティブオブジェクトについて説明します。あなたは見つけることができますファウナ用語の包括的な用語集ドキュメントのを。この記事では、最も使用するAPIオブジェクトを紹介することに焦点を当てています。

We’ll explore the Fauna data model in the order that you are likely to encounter it. Databases, Classes (a.k.a. collections), Instances (a.k.a. documents), and Indexes are used by most applications. This article also describes the steps that you will follow to create and query these database objects.

動物相データモデルについて、遭遇する可能性の高い順に説明します。データベース、クラス（別名コレクション）、インスタンス（別名ドキュメント）、およびインデックスは、ほとんどのアプリケーションで使用されます。この記事では、これらのデータベースオブジェクトを作成してクエリを実行するための手順についても説明します。

There are additional objects we'll cover in a future article. Access keys are how you control which processes and users can interact with which databases and documents. User-defined functions are important for applications with additional security constraints. Authorization Tokens are useful for providing data APIs to mobile and web clients. These advanced features are important for certain applications, so we’ll cover them in another blog post. This post focuses on the most common objects you’ll encounter.

今後の記事で取り上げる追加のオブジェクトがあります。アクセスキーは、どのプロセスとユーザーがどのデータベースとドキュメントと対話できるかを制御する方法です。ユーザー定義関数は、追加のセキュリティ制約があるアプリケーションにとって重要です。承認トークンは、モバイルクライアントとWebクライアントにデータAPIを提供するのに役立ちます。これらの高度な機能は特定のアプリケーションにとって重要であるため、別のブログ投稿で取り上げます。この投稿では、遭遇する最も一般的なオブジェクトに焦点を当てています。

## Shell Connection

シェル接続

After you set up a Fauna cluster, or create a Fauna Cloud account, you can use [Fauna Shell to connect to your account and create databases](https://app.fauna.com/documentation/gettingstarted).

Faunaクラスターをセットアップするか、Fauna Cloudアカウントを作成した後、Fauna Shellを使用してアカウントに接続し、データベースを作成できます。

```shell
fauna cloud-login 
fauna create-database my-database 
fauna shell my-database
```

## Databases

データベース

Databases contain the structures that your application works with. Fauna databases can also contain other databases, giving you the ability to organize a tree of nested databases, each of which inherits access control and quality-of-service prioritization from its parent. Read more about [arranging a tree of databases for shared services, SaaS, DBaaS, or multi-tenant workloads](https://fauna.com/blog/secure-hierarchical-multi-tenancy-patterns) to control both security and priority according to your business needs. To avoid confusion and to enable fine-grained security, **your root database should only contain other databases**. That way, you can use key secrets which correspond to particular applications, instead of configuring your code with root access.

データベースには、アプリケーションが機能する構造が含まれています。動物相データベースには他のデータベースを含めることもでき、ネストされたデータベースのツリーを編成することができます。各データベースは、親からアクセス制御とサービス品質の優先順位を継承します。詳細読む共有サービス、SaaSの、DBaaS、またはマルチテナントのワークロードのためのデータベースのツリーを配置するビジネスニーズに応じて、セキュリティや優先順位の両方を制御します。混乱を避け、きめ細かいセキュリティを有効にするために、ルートデータベースには他のデータベースのみを含める必要があります。そうすれば、ルートアクセスでコードを構成する代わりに、特定のアプリケーションに対応するキーシークレットを使用できます。

You’ve already created a database in the shell command above, and connected to it. You can create more databases inside my-database by issuing a query like:

上記のシェルコマンドでデータベースを作成し、接続しました。次のようなクエリを発行することで、my-database内にさらにデータベースを作成できます。

```javascript
CreateDatabase({name : "nested-inside-my-database"}) 
```

This creates  a new database nested inside of my-database. If you wanted to create another sibling database, located at the root of your account, you could either use the command line interface as you did above to create my-database, or you could launch fauna shell without a database name, in which case it connects to the root context. With a root shell connection, you can issue another query like the above to create a peer database:

これにより、my-database内にネストされた新しいデータベースが作成されます。アカウントのルートにある別の兄弟データベースを作成する場合は、上記のようにコマンドラインインターフェイスを使用してmy-databaseを作成するか、データベース名なしで動物相シェルを起動できます。この場合は、ルートコンテキストに接続します。ルートシェル接続を使用すると、上記のような別のクエリを発行して、ピアデータベースを作成できます。

```javascript
CreateDatabase({name : "another-top-level-database"}) 
```

You can see example database creation queries in more programming languages in [the CRUD examples doc](https://app.fauna.com/documentation/crud-examples#create-a-database).

CRUDのサンプルドキュメントで、より多くのプログラミング言語でのサンプルデータベース作成クエリを確認できます。

When creating a database, you have the option to specify an optional priority. Should the underlying Fauna cluster become resource-constrained, due to either a hardware failure or a traffic spike, the highest priority databases will be impacted last. This allows you to run development and production workloads on the same cluster, without worry that less important queries can impact performance in production.

データベースを作成するときに、オプションの優先度を指定するオプションがあります。ハードウェア障害またはトラフィックスパイクのいずれかが原因で、基盤となる動物相クラスターがリソースに制約された場合、最も優先度の高いデータベースが最後に影響を受けます。これにより、重要度の低いクエリが本番環境のパフォーマンスに影響を与えることを心配せずに、同じクラスターで開発ワークロードと本番ワークロードを実行できます。

## Classes (a.k.a. Collections)

クラス（別名コレクション）

Related documents in Fauna are stored within classes (also known as collections), which are similar to tables in relational databases, except that the different items in the class are not all required to have the same fields. Typically, classes correspond to types in your application, for example, blog posts, authors, comments, shopping carts, line items, and invoices. Creating a class is easy as you don’t have to specify constraints or field names. In Fauna Shell, the same query looks like this:

Faunaの関連ドキュメントは、クラス（コレクションとも呼ばれます）内に格納されます。クラス（コレクションとも呼ばれます）は、クラス内のさまざまなアイテムがすべて同じフィールドを持つ必要がないことを除いて、リレーショナルデータベースのテーブルに似ています。通常、クラスは、ブログ投稿、作成者、コメント、ショッピングカート、広告申込情報、請求書など、アプリケーションのタイプに対応します。制約やフィールド名を指定する必要がないため、クラスの作成は簡単です。動物相シェルでは、同じクエリは次のようになります。

```javascript
CreateClass({ name: "spells" })
```

You can [see this query in other languages](https://app.fauna.com/documentation/crud-examples#create-a-class) in the docs.

このクエリは、ドキュメントで他の言語で確認できます。

Classes are the container for documents (also known as instances). Classes are also the scope for indexes. Since documents contain our data, we can create some documents first, and then define an index on the class so we can query them. Alternatively, we could create an index first, and then add data to the class—it’s just a matter of taste.

クラスはドキュメント（インスタンスとも呼ばれます）のコンテナです。クラスはインデックスのスコープでもあります。ドキュメントにはデータが含まれているため、最初にいくつかのドキュメントを作成してから、クラスにインデックスを定義してクエリを実行できます。または、最初にインデックスを作成してから、クラスにデータを追加することもできます。これは好みの問題です。

## Documents (a.k.a. Instances)

ドキュメント（別名インスタンス）

Documents contain your application data, which can be stored in fields with types such as string, number, boolean, date, null, etc. Data can also be structured into objects and arrays, which can be nested. Anything that can be represented in JSON can be stored in Fauna, as well as richer data types. Here’s an example query (formatted for Fauna Shell) that creates a document:

ドキュメントには、文字列、数値、ブール値、日付、nullなどのタイプのフィールドに格納できるアプリケーションデータが含まれています。データは、ネスト可能なオブジェクトや配列に構造化することもできます。JSONで表現できるものはすべて、より豊富なデータ型だけでなく、動物相にも保存できます。ドキュメントを作成するクエリの例（Fauna Shell用にフォーマット）は次のとおりです。

```javascript
Create(Class("spells"), {        
    data : {
        title : "Invisibility",    
        ingredients : ["cauldron", "crystal", "newt", "stardust"],                           description : "..." }
})
```

This document contains a title, ingredients, and a description. Note that these fields are all presented within the data top level field. When retrieving a document, you’ll see other top level fields like ref and ts which track metadata. These fields will also be in the response returned from the Create query above. The most important thing to know is that the ref is how you can load the document in other queries. For instance, if you index the documents by ingredients, the ref for the above document would appear in the result set for “stardust,” and from there you can load the original document. Additionally, if you want to link to this document from another, you can store this document’s ref somewhere in the other document’s data field.

このドキュメントには、タイトル、材料、および説明が含まれています。これらのフィールドはすべて、データの最上位フィールド内に表示されることに注意してください。ドキュメントを取得すると、メタデータを追跡するrefやtsなどの他のトップレベルのフィールドが表示されます。これらのフィールドは、上記のCreateクエリから返される応答にも含まれます。知っておくべき最も重要なことは、refは他のクエリでドキュメントをロードする方法であるということです。たとえば、材料でドキュメントにインデックスを付けると、上記のドキュメントの参照が「stardust」の結果セットに表示され、そこから元のドキュメントを読み込むことができます。さらに、別のドキュメントからこのドキュメントにリンクする場合は、このドキュメントの参照を別のドキュメントのデータフィールドのどこかに保存できます。

Stay tuned for the next post in this series to learn about creating, reading, updating, and deleting documents.

このシリーズの次の投稿に注目して、ドキュメントの作成、読み取り、更新、および削除について学習してください。

## Indexes

インデックス

Fauna’s indexes give you powerful options when it comes to finding and sorting your data, as well as reading historical changes. Documents can be indexed by **term** for scalable lookup. To query an index by term, you must provide an exact match, and multiple documents can be found in the same term. Easy examples are tags, or the ingredients in the spell document above. Looking up all the spells that require “stardust” would be as simple as using stardust as a term in an index query. Term indexes use O(1) lookups, so they stay fast no matter how many distinct terms are included in your set, making them good for usernames, product ids, and even [ngrams for raw text](https://app.fauna.com/documentation/reference/queryapi#ngram) search.

動物相のインデックスは、データの検索と並べ替え、および履歴の変更の読み取りに関して、強力なオプションを提供します。スケーラブルなルックアップのために、ドキュメントに用語ごとにインデックスを付けることができます。用語ごとにインデックスをクエリするには、完全に一致するものを指定する必要があります。同じ用語で複数のドキュメントが見つかります。簡単な例は、タグ、または上記のスペルドキュメントの材料です。「スターダスト」を必要とするすべての呪文を検索することは、インデックスクエリの用語としてスターダストを使用するのと同じくらい簡単です。用語インデックスはO（1）ルックアップを使用するため、セットに含まれる個別の用語の数に関係なく高速であり、ユーザー名、製品ID、さらには生のテキスト検索のngramにも適しています。

Documents may also be sorted by a **value** within a particular term. For instance, the documents within each tag or ingredient set can be sorted by title or publication date. Pagination across the sorted values is designed to be efficient. These indexes are what you would use to query for recent articles by a particular author, or the contents of a user’s inbox sorted by arrival time. If your query can be satisfied by exact lookup instead of range queries, you are likely better off working with terms. For example, if you want to load users by ZIP code, you are better off indexing ZIP code as a term than as a value.

ドキュメントは、特定の用語内の値で並べ替えることもできます。たとえば、各タグまたは成分セット内のドキュメントは、タイトルまたは発行日で並べ替えることができます。ソートされた値全体のページ付けは、効率的になるように設計されています。これらのインデックスは、特定の著者による最近の記事、または到着時間でソートされたユーザーの受信ボックスのコンテンツを照会するために使用するものです。範囲クエリではなく正確なルックアップでクエリを満たすことができる場合は、用語を使用したほうがよいでしょう。たとえば、ユーザーを郵便番号で読み込む場合は、郵便番号を値としてではなく用語としてインデックスに登録することをお勧めします。

Here is an index definition allowing us to list all of the spells with a given ingredient, sorted by their title:

これは、タイトルでソートされた、特定の成分を持つすべての呪文をリストできるようにするインデックス定義です。

```javascript
CreateIndex({ 
    name: "spells_by_ingredient",
    source: Class("spells"),
    terms: [{ field: ["data", "ingredients"] }],
    values: [{ field: ["data", "title"] }] 
})
```

To query this for all the spells using stardust, we use the Match function to find the corresponding term entry, and then Paginate over the result set. Here is the query formatted for Fauna Shell:

スターダストを使用してすべての呪文についてこれを照会するには、Match関数を使用して対応する用語エントリを検索し、結果セットをページングします。動物相シェル用にフォーマットされたクエリは次のとおりです。

```javascript
Paginate(Match(Index("spells_by_ingredient"), "stardust"))
```

Most indexes define a term, which limits the amount of data processed by the Match function. If your index does not define a term, then all documents are indexed under the null term, and sorted according to their ref, which is used as the default value. This can be useful in development as it makes listing all members of a class easy, but it can be a performance hog in production where, generally speaking, you are better off using terms in your indexes, to prevent any one set of values growing too large.

ほとんどのインデックスは、Match関数によって処理されるデータの量を制限する用語を定義します。インデックスで用語が定義されていない場合、すべてのドキュメントはnull用語でインデックスが付けられ、デフォルト値として使用される参照に従って並べ替えられます。これは、クラスのすべてのメンバーを簡単に一覧表示できるため、開発に役立ちますが、一般的に言えば、インデックスで用語を使用して、1つの値のセットも大きくならないようにすることをお勧めします。大。

## Conclusion

結論

These objects (databases, classes, documents, and indexes) are involved in  the bulk of your work with Fauna. If you’d like to learn more about them, the [Fauna reference guide](https://app.fauna.com/documentation/reference/instances) gives you more detail. The next post in this series will dive into working with documents in detail. Future articles in this series will cover data modeling questions, bulk operations, index queries, working with temporal events, and pagination.

これらのオブジェクト（データベース、クラス、ドキュメント、およびインデックス）は、Faunaでの作業の大部分に関係しています。それらについて詳しく知りたい場合は、動物相リファレンスガイドに詳細が記載されています。このシリーズの次の投稿では、ドキュメントの操作について詳しく説明します。このシリーズの今後の記事では、データモデリングの質問、一括操作、インデックスクエリ、一時的なイベントの操作、およびページ付けについて説明します。

