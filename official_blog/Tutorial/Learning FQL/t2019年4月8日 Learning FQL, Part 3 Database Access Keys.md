Learning FQL, Part 3: Database Access Keys
https://fauna.com/blog/learning-fql-part-3-database-access-keys

# Learning FQL, Part 3: Database Access Keys

FQL の学習、パート 3：データベースアクセスキー

Chris Anderson|Apr 8th, 2019|

2019 年 4 月 8 日

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

In the previous two posts in this series, we covered Fauna schema basics, and basic CRUD operations (create, read, update, and delete). Fauna Shell handles access control for you, so you haven’t had to do any key management. This article will cover key creation and use. The basic operations discussed here can be combined with Fauna’s [multi-tenancy patterns](https://fauna.com/blog/secure-hierarchical-multi-tenancy-patterns) to automate SaaS application provisioning, user account creation, and other application lifecycle steps.

このシリーズの前の 2 つの投稿では、Faunaスキーマの基本と基本的な CRUD 操作（作成、読み取り、更新、削除）について説明しました。Fauna Shell がアクセス制御を処理するため、キー管理を行う必要はありません。この記事では、キーの作成と使用について説明します。ここで説明する基本的な操作は、Fauna のマルチテナンシーパターンと組み合わせて、SaaS アプリケーションのプロビジョニング、ユーザーアカウントの作成、およびその他のアプリケーションライフサイクルの手順を自動化できます。

## Access Keys

アクセスキー

Fauna [keys correspond to a database and an access control level](https://docs.fauna.com/fauna/current/reference/security.html#access-keys). Admin keys can provision and manage nested databases, while server keys can manage the data in a particular database. There are also access tokens, which allow end users to authenticate connections from mobile devices and web clients.

Faunaキーは、データベースとアクセス制御レベルに対応しています。管理者キーはネストされたデータベースをプロビジョニングおよび管理でき、サーバーキーは特定のデータベースのデータを管理できます。エンドユーザーがモバイルデバイスや Web クライアントからの接続を認証できるようにするアクセストークンもあります。

When you are embedding a key into application code for queries or schema management, you’ll use a server key. To manage keys for a particular child database, you must connect with an admin key connection that corresponds to the parent database. In this case, Fauna Shell is currently connected to the root database with an admin key, so we can create a server key for the child database, called "my-database", that we created in an earlier article.

クエリまたはスキーマ管理のためにアプリケーションコードにキーを埋め込む場合は、サーバーキーを使用します。特定の子データベースのキーを管理するには、親データベースに対応する管理キー接続に接続する必要があります。この場合、Fauna Shell は現在管理者キーでルートデータベースに接続されているため、以前の記事で作成した「my-database」と呼ばれる子データベースのサーバーキーを作成できます。

```javascript
CreateKey({
  database: Database("my-database"),
  role: "server",
});
```

The return value contains the key secret:

戻り値には、キーシークレットが含まれています。

```javascript
=> { ref: Ref(id=200669511526908416, class=Ref(id=keys)),
  ts: 1527632209151020,
  database: Ref(id=caledonia, class=Ref(id=databases)),
  role: 'server',
  secret: 'fnACyOvbh9ACAOtRQDQSefokn4iuMf9zn_FakPAx',
  hashed_secret: '$2a$05$dszFRic/tkKzsG0rrUj3Fu7.nSoYuJL7BdnHXepx4XTzfcWtVEZRC' }
```

Once a key is created, its secret field is what you’ll store and use in your application configuration, and use to connect to the individual database to perform data operations. This server key can create classes and indexes, as well as run queries and modify data. If you want a key with other privileges, you can read about the other options for key roles in the [access keys documentation](https://docs.fauna.com/fauna/current/reference/security.html#access-keys): admin, server, server-readonly, and client. The query to provision those types of keys will look like what you see above, with a different role specified.

キーが作成されると、そのシークレットフィールドは、アプリケーション構成に保存して使用し、個々のデータベースに接続してデータ操作を実行するために使用するものです。このサーバーキーは、クラスとインデックスを作成したり、クエリを実行したり、データを変更したりできます。他の権限を持つキーが必要な場合は、アクセスキーのドキュメントで、キーロールの他のオプション（管理者、サーバー、サーバー読み取り専用、およびクライアント）について読むことができます。これらのタイプのキーをプロビジョニングするためのクエリは、上記のようになり、異なる役割が指定されています。

## Server Connection

サーバー接続

By using the server key secret we just provisioned, we can connect to our database. If you are using Fauna Shell, this happens automatically, but you still need to know about it when you are writing code. The secret is used in code that creates client connections to Fauna. Since Fauna connections are stateless, there is no harm in maintaining multiple client objects in your application—for instance an admin client for provisioning new SaaS tenants, and a server client for each tenant, to interact with the data.

プロビジョニングしたサーバーキーシークレットを使用することで、データベースに接続できます。Fauna Shell を使用している場合、これは自動的に行われますが、コードを作成するときにそれについて知る必要があります。シークレットは、Fauna へのクライアント接続を作成するコードで使用されます。Fauna 接続はステートレスであるため、アプリケーションで複数のクライアントオブジェクトを維持しても害はありません。たとえば、新しい SaaS テナントをプロビジョニングするための管理クライアントや、データと対話するための各テナントのサーバークライアントなどです。

```javascript
var serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});
```

Where FAUNADB_SERVER_SECRET looks something like the 'fnACyOvbh9ACAOtRQDQSefokn4iuMf9zn_FakPAx' as returned above. It’s up to you and your hosting provider, the best way to manage environment variables, but it is a best practice not to paste secrets into production code.

ここで、FAUNADB_SERVER_SECRET は、上記で返された「fnACyOvbh9ACAOtRQDQSefokn4iuMf9zn_FakPAx」のようになります。環境変数を管理するための最良の方法は、あなたとあなたのホスティングプロバイダー次第ですが、本番コードにシークレットを貼り付けないことがベストプラクティスです。

This server client is what you’ll use for schema changes and data queries within the database my-database. If you are using Fauna Shell, you can connect to the database by running `fauna shell my-database`.

このサーバークライアントは、データベース my-database 内のスキーマ変更とデータクエリに使用するものです。Fauna Shell を使用している場合は、を実行してデータベースに接続できます fauna shell my-database。

The server client connection we created in the code above is useful for defining indexes and interacting with data in the database. It can’t be used to create new child databases. It should not be distributed to end users or user agents, because it has the capability to read the entire database as well as update or delete arbitrary data.

上記のコードで作成したサーバークライアント接続は、インデックスを定義し、データベース内のデータを操作するのに役立ちます。新しい子データベースの作成には使用できません。データベース全体を読み取り、任意のデータを更新または削除する機能があるため、エンドユーザーまたはユーザーエージェントに配布しないでください。

For more details about [working with Access Keys check out the Fauna docs](https://docs.fauna.com/fauna/current/reference/security.html).

アクセスキーの操作の詳細については、Fauna のドキュメントをご覧ください。

## Client Keys and Public Read Permissions

クライアントキーとパブリック読み取りアクセス許可

Sometimes you want to connect to the database as an untrusted user. Client keys connect to a particular database, but only give access to public resources, which must be explicitly tagged by developers. For example you might create an index with public data in the values, and allow anonymous users to query it. For this pattern you’d create an index that is publicly readable, and a client key that can read it.

信頼できないユーザーとしてデータベースに接続したい場合があります。クライアントキーは特定のデータベースに接続しますが、パブリックリソースへのアクセスのみを許可します。パブリックリソースには、開発者が明示的にタグ付けする必要があります。たとえば、値に公開データを含むインデックスを作成し、匿名ユーザーがそれをクエリできるようにすることができます。このパターンでは、一般に読み取り可能なインデックスと、それを読み取ることができるクライアントキーを作成します。

To create a publicly queryable index, you can set it’s “read” permission to “public” (in this case we’re in a shell session for my-databases, which you can reach with fauna shell my-database):

パブリックにクエリ可能なインデックスを作成するには、その「読み取り」権限を「パブリック」に設定します（この場合、my-databases のシェルセッションにあり、Faunaシェル my-database でアクセスできます）。

```javascript
CreateIndex({
  name: "all_spell_titles",
  permissions: {
    read: "public",
  },
  source: Class("spells"),
  values: [{ field: ["data", "title"] }],
});
```

To create a key that can query this index, we just issue a query to create a client key, and share the resulting key secret with our client applications. Client keys can only read public resources.

このインデックスをクエリできるキーを作成するには、クエリを発行してクライアントキーを作成し、結果のキーシークレットをクライアントアプリケーションと共有します。クライアントキーはパブリックリソースのみを読み取ることができます。

```javascript
CreateKey({
  database: Database("my-database"),
  role: "client",
});
```

This pattern allows you to open certain data resources to queries from anonymous clients, without exposing the rest of the database. This can be useful if you plan to have mobile devices or web browsers query the database directly. It can also be helpful if you are offering data to partner companies.

このパターンを使用すると、データベースの残りの部分を公開することなく、匿名クライアントからのクエリに対して特定のデータリソースを開くことができます。これは、モバイルデバイスまたは Web ブラウザでデータベースに直接クエリを実行する場合に役立ちます。パートナー企業にデータを提供する場合にも役立ちます。

## Conclusion

結論

These patterns give developers and administrators fine-grained control over data in Fauna. Whether you are provisioning databases for SaaS customers, business units, development teams, or projects, you can give just the right level of access to just those who need it, without worrying about impacts to the rest of the cluster.

これらのパターンにより、開発者と管理者はFaunaのデータをきめ細かく制御できます。SaaS の顧客、ビジネスユニット、開発チーム、またはプロジェクトのデータベースをプロビジョニングする場合でも、クラスターの他の部分への影響を心配することなく、データベースを必要とする人だけに適切なレベルのアクセスを提供できます。

Admin keys can be used to manage the database tenancy tree and to provision other keys. Server keys can define the database schema and issue queries. Client keys can query public resources. These capabilities are enough to get started with Fauna access keys.

管理キーを使用して、データベーステナンシーツリーを管理し、他のキーをプロビジョニングできます。サーバーキーは、データベーススキーマを定義し、クエリを発行できます。クライアントキーはパブリックリソースを照会できます。これらの機能は、Fauna アクセスキーの使用を開始するのに十分です。

More complex applications may require that users may only view and edit their own data, or perhaps multiple users collaborate on data, with different users working on different parts of the database. In a future article we’ll talk about how to authenticate users with tokens, and how to work with role-based application control. If you’d like to jump ahead, these patterns are illustrated in the application development series [Building a Serverless JAMStack app with Fauna Cloud.](https://fauna.com/blog/building-a-serverless-jamstack-app-with-faunadb-cloud-part-2)

より複雑なアプリケーションでは、ユーザーが自分のデータのみを表示および編集する必要がある場合や、複数のユーザーがデータベースのさまざまな部分で作業するさまざまなユーザーとデータを共同編集する必要がある場合があります。将来の記事では、トークンを使用してユーザーを認証する方法と、ロールベースのアプリケーション制御を操作する方法について説明します。先に進みたい場合は、これらのパターンは、アプリケーション開発シリーズ「FaunaCloud を使用したサーバーレス JAMStack アプリの構築」に示されています。
