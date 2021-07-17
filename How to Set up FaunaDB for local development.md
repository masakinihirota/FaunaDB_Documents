How to Set up FaunaDB for local development - DEV Community
https://dev.to/englishcraig/how-to-set-up-faunadb-for-local-development-5ha7

# How to Set up FaunaDB for local development

ローカル開発のための FaunaDB のセットアップ方法

2020年12月6日 ・10 min read

2020年12月6日 ・10分読む

If you're feeling impatient and want to skip to the end, all the code is available at this [repo](https://github.com/cfranklin11/faunadb-local).

最後まで読み飛ばしたいという方は、こちらの[repo](https://github.com/cfranklin11/faunadb-local)で全てのコードが公開されていますので、ご利用ください。

___

## [](#what-is-faunadb-and-why-should-i-try-it)What is FaunaDB, and why should I try it?

FaunaDB とは何か、そしてなぜそれを試す必要があるのか。

[FaunaDB](https://docs.fauna.com/fauna/current/introduction) is a serverless database that is an ideal choice for serverless applications, because it has the same benefits as the latter: auto-scaling, pay-for-what-you-use billing, not requiring server configuration or maintenance. FaunaDB accomplishes this by executing database operations via calls to its HTTP API rather than maintaining a connection to a database server. There are other options available for serverless database services. DynamoDB from AWS is one of the most commonly referenced when looking up information about serverless databases, but I find a basic key-value data store to be too limiting when trying to model an application's business domain, as it makes modelling relationships among entities very difficult. Relational databases are ideal for this, and AWS has another serverless option, Aurora Serverless, which combines the advantages of serverless architecture with the expressiveness of relational databases and SQL queries. Although I haven't used it myself, Aurora Serverless seems to be a good option. It comes with a large caveat, however, in that Aurora Serverless requires all applications and services that access its databases to be in the same Amazon Virtual Private Cloud. This means committing yourself even further to vendor lock-in, as any move away from using AWS, even partially, would mean having to completely change your database infrastructure. Also, my knowledge of ops stuff is pretty basic, and setting up an Amazon VPC is just the sort of extra complication that I wanted to avoid by going serverless in the first place. FaunaDB isn't strictly a relational database, but it still offers some of the same advantages by allowing for the inclusion of all the usual entity relationships (e.g. one-to-one, one-to-many). Also, FaunaDB databases can be called from any application hosted on any cloud service, giving you more flexibility in how and where you deploy applications, thus reducing vendor lock-in.

[FaunaDB](https://docs.fauna.com/fauna/current/introduction)は、サーバーレスアプリケーションに理想的な選択肢であるサーバーレスデータベースです。なぜなら、後者と同じ利点を持っているからです。
自動スケーリング、
使用した分だけ支払う課金、
サーバーの構成やメンテナンスを必要としません。
FaunaDBは、
データベースサーバーへの接続を維持するのではなく、
HTTP APIへの呼び出しによってデータベース操作を実行することでこれを実現しています。
サーバーレスのデータベースサービスには、
他にも選択肢があります。
AWSのDynamoDBは、
サーバーレスデータベースに関する情報を調べる際に最もよく参照されるものの1つですが、
アプリケーションのビジネスドメインをモデル化しようとすると、
エンティティ間の関係をモデル化することが非常に難しくなるため、
基本的なキーバリューデータストアでは制限が多すぎると感じます。
AWSにはAurora Serverlessというサーバーレスのオプションがあり、
サーバーレスアーキテクチャの利点と、
リレーショナルデータベースやSQLクエリの表現力を組み合わせています。
私自身は使ったことがありませんが、
AuroraServerlessは良い選択肢になりそうです。
しかし、
AuroraServerlessには大きな注意点があり、
データベースにアクセスするすべてのアプリケーションやサービスが、
同じAmazon Virtual Private Cloud内にある必要があります。
これは、
ベンダーロックインにさらにコミットすることを意味し、
AWSを部分的にでも使用しない場合は、
データベースインフラを完全に変更しなければなりません。
また、
私のオペレーションに関する知識は非常に基本的なものであり、
AmazonVPCを設定することは、
そもそもサーバーレスにすることで避けたかった余計な煩雑さに他なりません。
FaunaDBは厳密にはリレーショナルデータベースではありませんが、
通常のエンティティリレーションシップ（一対一、
一対多など）
をすべて含めることができるので、
同じような利点があります。
また、
FaunaDBデータベースは、
任意のクラウドサービス上でホストされている任意のアプリケーションから呼び出すことができるため、
アプリケーションをどこにどのように展開するかの柔軟性が高まり、
ベンダーロックインを減らすことができます。





FaunaDB supports two different ways of querying its databases: FaunaDB Query Language (FQL) and GraphQL (GQL). For now, the GQL interface is somewhat limited, making FQL a better option if you need the sort of functionality that you can get from SQL. If you're not sure, or if you anticipate only needing basic queries, I recommend starting with the GQL interface, because it's much simpler to work with (if you already know GQL, then there's not much more to learn), and it offers the benefit of having a schema file as the source of truth about the structure of your database. If you start with GQL and find out later that you need more-complex queries, you can mix in FQL functions by defining custom resolvers, so you shouldn't ever need to completely migrate to FQL. Since I prefer the GQL interface (and it's all I've worked with so far), that's what I'll use for this tutorial.

FaunaDBは、
データベースへの2種類のクエリ方法をサポートしています。
FaunaDBQueryLanguage（FQL）
と
GraphQL（GQL）
です。
今のところ、
GQLのインターフェースはやや限定的で、
SQLで得られるような機能が必要な場合はFQLの方が良いでしょう。
なぜなら、
GQLの方がはるかにシンプルに作業でき（GQLをすでに知っていれば、
それ以上学ぶことはありません）、
データベースの構造に関する
真実の情報源としてスキーマファイルがあるという利点があるからです。
GQLから始めて、
後になってより複雑なクエリが必要になったとしても、
カスタムリゾルバを定義することでFQLの関数を混ぜることができるので、
FQLに完全に移行する必要はありません。
私はGQLインターフェイスが好きなので
（そしてこれまで私が使ってきたのはGQLだけなので）、
このチュートリアルではGQLを使用します。

If you want more information on how FaunaDB works in general, feel free to check out their [Getting Started](https://docs.fauna.com/fauna/current/start/) guide, but it's not necessary for following the rest of this tutorial.

FaunaDB がどのように動作するかについてもっと情報が必要な場合は、彼らの [Getting Started](https://docs.fauna.com/fauna/current/start/) ガイドを自由にチェックしてください。

## [](#requirements)Requirements

必要条件

To start, make sure you have the following installed on your machine:

まず、以下のものがあなたのマシンにインストールされていることを確認してください。

-   [Docker](https://docs.docker.com/get-docker/), so we can run an instance of FaunaDB in a container.
-   [`fauna-shell`](https://docs.fauna.com/fauna/current/integrations/shell/) to be able to interact with local FaunaDB databases.
-   An API testing tool (e.g. [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/download/)) to easily send GraphQL queries (or you can use `curl` if you _really_ want to). For the examples below, I will use Insomnia, because its GraphQL support is a bit better than Postman's (for example, it can fetch a GraphQL schema from an API endpoint).
-   [Python](https://www.python.org/downloads/) if you want to set up integration testing.

- [Docker](https://docs.docker.com/get-docker/)では、コンテナ内で FaunaDB のインスタンスを実行することができます。
- [`fauna-shell`](https://docs.fauna.com/fauna/current/integrations/shell/)ローカルの FaunaDB データベースと対話できるようにする。
- API テストツール (例: [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/download/)) GraphQL クエリを簡単に送信できます (本当に必要なら `curl` を使用してもかまいません)。以下の例では、GraphQLのサポートがPostmanよりも少し優れているため、Insomniaを使用します（例えば、APIエンドポイントからGraphQLスキーマを取得することができます）。
- [Python](https://www.python.org/downloads/)統合テストを設定したい場合。

## [](#setting-up-local-faunadb)Setting up local FaunaDB

ローカルのFaunaDBを設定する。

### [](#running-faunadb-in-a-docker-container)Running FaunaDB in a Docker container

FaunaDB を Docker コンテナで起動する。

FaunaDB is kind enough to provide us with an [official Docker image](https://hub.docker.com/r/fauna/faunadb), which greatly simplifies running it on our local environment. Run the following commands in your terminal to get an instance of FaunaDB running:  

FaunaDB は親切にも [official Docker image](https://hub.docker.com/r/fauna/faunadb) を提供してくれているので、ローカル環境での実行が非常に簡単になります。ターミナルで以下のコマンドを実行すると、FaunaDB のインスタンスが起動します。 

```
docker pull fauna/faunadb
docker run --name faunadb -p 8443:8443 -p 8084:8084 fauna/faunadb
```

We expose port `8443` for standard database interactions and `8084` for calls to the GraphQL API. As with other database images, you can use other Docker container options for data persistence and such. See the [FaunaDB documentation](https://docs.fauna.com/fauna/current/integrations/dev#run) for alternatives.

標準的なデータベースとのやり取りにはポート `8443` を、GraphQL API の呼び出しにはポート `8084` を公開しています。他のデータベースイメージと同様に、データの永続化などのために他の Docker コンテナオプションを使用することができます。代替手段については [FaunaDB documentation](https://docs.fauna.com/fauna/current/integrations/dev#run)を参照してください。

### [](#create-a-database-in-the-faunadb-instance)Create a database in the FaunaDB instance

FaunaDB インスタンスにデータベースを作成します。

Now that we have FaunaDB up and running, the easiest way to interact with it is to use `fauna-shell`. In a new tab or window, run the following to create a database and an API key for it.  

FaunaDB が起動したので、`fauna-shell` を使用するのが一番簡単な操作方法です。新しいタブまたはウィンドウで以下を実行して、データベースとその API キーを作成します。 

```
fauna add-endpoint http://localhost:8443/ --alias localhost --key secret
fauna create-database development_db --endpoint=localhost
fauna create-key development_db --endpoint=localhost
```

You can change the alias for the endpoint (currently `localhost`) and the name of the database (currently `development_db`) to anything you want. If one doesn't already exist, create a `.env` file in the root of the project, copy the API key printed by `fauna create-key`, and assign its value to `FAUNADB_KEY` in `.env` like below:  

エンドポイントのエイリアス(現在は `localhost`)とデータベースの名前(現在は `development_db`)は好きなものに変更できます。まだ存在しない場合は、プロジェクトのルートに `.env` ファイルを作成し、`fauna create-key` で出力された API キーをコピーして、その値を `.env` の `FAUNADB_KEY` に以下のように割り当ててください。 

```
FAUNADB_KEY=<copied API key>
```

## [](#using-graphql-with-faunadb)Using GraphQL with FaunaDB

FaunaDBでGraphQLを使う。

### [](#create-a-graphql-schema)Create a GraphQL schema

GraphQLスキーマの作成

A full introduction to GraphQL is outside the scope of this tutorial, so if you want more information, you can check out the [official introduction](https://graphql.org/learn/). Also, if you want to get a better view of the GraphQL queries that FaunaDB creates by default for entities, check out their [getting started](https://docs.fauna.com/fauna/current/start/graphql) page.

GraphQLの完全な紹介はこのチュートリアルの範囲外ですので、より詳しい情報が必要な場合は、[official introduction](https://graphql.org/learn/)をご覧ください。また、FaunaDBがエンティティに対してデフォルトで作成するGraphQLクエリについてもっとよく知りたい場合は、[getting started](https://docs.fauna.com/fauna/current/start/graphql)のページを参照してください。

To keep things simple, we'll create a basic schema file for a blogging platform, where we have users who write posts. Such a schema for FaunaDB looks like this:  

物事をシンプルにするために、記事を書くユーザーがいるブログプラットフォーム用の基本的なスキーマファイルを作成します。FaunaDB のスキーマは次のようなものです。 

```
type User {
  username: String! @unique
  password: String!
  posts: [Post!] @relation
}

type Post {
  title: String!
  text: String!
  author: User!
}

type Query {
  allUsers: [User!]
  allPosts: [Post!]
}
```

This schema creates collections (FaunaDB's version of data tables) of users and posts, with a couple general-purpose query fields. It doesn't matter where you save this file, but it's best to name it following GraphQL conventions to take advantage of tools such as linters (I use `schema.gql`, but there are a few other acceptable alternatives). Most of this is standard GraphQL schema syntax, but notice the FaunaDB directives that start with `@`. These give extra information to FaunaDB about the structure of collections and documents.

このスキーマは、ユーザーと投稿のコレクション (FaunaDB 版のデータテーブル) を作成し、いくつかの汎用的なクエリフィールドを備えています。このファイルをどこに保存するかは問題ではありませんが、リンターなどのツールを利用するためにはGraphQLの規則に従った名前を付けるのがベストです(私は`schema.gql`を使用していますが、他にもいくつかの許容できる代替案があります)。ほとんどの部分は標準的な GraphQL スキーマの構文ですが、`@` で始まる FaunaDB のディレクティブに注目してください。これらは、コレクションやドキュメントの構造に関する追加情報をFaunaDBに与える。

-   `@unique` indicates that the value for this attribute must be unique within the collection. FaunaDB will return an error response if we try to create a `user` with a duplicate `username`.
-   `@relation` indicates a bi-directional relationship between two collections. In this case, a `user` has many `posts`, and a `post` has one `user`, which we call its `author`. Notice that we only need to use the `relation` directive on the "many" side of the relationship. FaunaDB has more information on how to model [different relationships](https://docs.fauna.com/fauna/current/api/graphql/relations) among collections.

- `unique` は、この属性の値がコレクション内で一意でなければならないことを示す。重複する `username` を持つ `user` を作成しようとすると、FaunaDB はエラーレスポンスを返します。
- `@relation` は2つのコレクション間の双方向の関係を示します。このケースでは、`user`は多くの`posts`を持ち、`post`は1つの`user`を持ち、それを`author`と呼びます。relation` ディレクティブは、リレーションシップの "many" 側でのみ使用する必要があることに注意してください。コレクション間の[異なる関係](https://docs.fauna.com/fauna/current/api/graphql/relations)をモデル化する方法については、FaunaDBに詳しい情報があります。

These are the directives that I use most, but there are others for more-advanced use cases. You can see all the available directives [here](https://docs.fauna.com/fauna/current/api/graphql/directives/).

これらのディレクティブは私が最もよく使うものですが、より高度なユースケースのために他のディレクティブもあります。利用可能なすべてのディレクティブを[ここ](https://docs.fauna.com/fauna/current/api/graphql/directives/)で見ることができます。

Also, by default, FaunaDB creates a few basic queries and mutations for each collection that you create (e.g. `createUser`, `updateUser`, `findUserById`), but doesn't add any queries for multiple records, so we add `allUsers` and `allPosts` queries for convenience.

また、デフォルトでは、FaunaDB は作成した各コレクションに対していくつかの基本的なクエリとミューテーションを作成しますが (例: `createUser`, `updateUser`, `findUserById`)、複数のレコードに対するクエリは追加されていないので、便宜上 `allUsers` と `allPosts` のクエリを追加します。

### [](#import-the-graphql-schema-to-the-faunadb-database)Import the GraphQL schema to the FaunaDB database

GraphQLスキーマをFaunaDBデータベースにインポートします。

From now on, we're going to interact with the FaunaDB database via HTTP calls to its GraphQL API, which should be running on `http://localhost:8084`. The simplest way to do this is with an API testing tool like Insomnia, but for an application, you'll obviously want to automate these calls with an HTTP library like `requests` for Python or `axios` for Node.

今後、FaunaDB データベースとのやりとりは、`http://localhost:8084` で実行されているはずの GraphQL API への HTTP コールを介して行うことになる。最も簡単な方法はInsomniaのようなAPIテストツールを使うことだが、アプリケーションの場合はPythonの`requests`やNodeの`axios`のようなHTTPライブラリを使ってこれらの呼び出しを自動化したいところだ。

Our first call will be to import our GraphQL schema. Open Insomnia, and create a request that will `POST` to `http://localhost:8084/import`. Remember that secret key that we saved? Use it in the `Authorization` header with the format `Bearer <FaunaDB secret key>`. Finally, let's add our schema file to the request (in the case of Insomnia, select "Binary File" from the body options, then "Choose File" to upload the schema).

最初の呼び出しは、GraphQLスキーマのインポートです。Insomniaを開いて、`http://localhost:8084/import`に`POST`するリクエストを作成します。保存しておいたシークレットキーを覚えていますか？Bearer `<FaunaDB secret key>`というフォーマットで`Authorization`ヘッダーに使用します。最後に、スキーマファイルをリクエストに追加しましょう（Insomniaの場合は、ボディのオプションから「Binary File」を選択し、「Choose File」でスキーマをアップロードします）。

### [](#create-and-query-records-in-the-database)Create and query records in the database

データベース内のレコードの作成と問い合わせ

Since the FaunaDB instance has a standard GraphQL API layer accessed at `http://localhost:8084/graphql`, you can use GraphQL tooling to export the schema and documentation, and load it in an interactive tool like GraphiQL or GraphQL Playground. The easiest solution, however, is to use Insomnia's GraphQL documentation feature by selecting "GraphQL Query" for the request body, then clicking "schema" and selecting "Refresh Schema". This will give you access to auto-generated documentation for your GraphQL API without needing any extra setup.

FaunaDBインスタンスには、`http://localhost:8084/graphql`でアクセスできる標準的なGraphQL APIレイヤーがあるので、GraphQLツールを使ってスキーマやドキュメントをエクスポートし、GraphiQLやGraphQL Playgroundなどの対話型ツールで読み込むことができます。もっとも簡単な方法は、InsomniaのGraphQLドキュメント機能を使うことです。リクエストボディで「GraphQL Query」を選択し、「schema」をクリックして「Refresh Schema」を選択します。これにより、特別な設定をしなくても、GraphQL APIの自動生成されたドキュメントにアクセスできるようになります。

To start, we will want to create some data that we will then be able to query. The following mutations will create two users with two posts each. We return the IDs in the response for future reference, or you can use the `allUsers` query to get them again later.  

まず最初に、クエリを実行するためのデータを作成しましょう。以下の例では、2つの投稿を持つ2人のユーザーを作成しています。今後の参考のために、レスポンスにIDを返しています。また、`allUsers`クエリを使って後でIDを取得することもできます。 

```
mutation createBob {
  createUser(data: {
    username: "burgerbob",
    password: "password1234",
    posts: {
      create: [
        {
          title: "Burgers Are Great!",
          text: "Burgers have meat, and bread, and..."
        },
        {
          title: "Top 10 Burgers",
          text: "1. Cheeseburger, 2. Hamburger..."
        },
      ]
    }
  }) {
    _id
    posts {
      data { _id }
    }
  }
}

mutation createLinda {
  createUser(data: {
    username: "momsense",
    password: "password1234",
    posts: {
      create: [
        {
          title: "Why Baked Ziti Is Overrated",
          text: "Baked ziti is really not that great..."
        },
        {
          title: "Top 10 Wines to Pair with Burgers",
          text: "1. Pinot Noir, 2. Merlot..."
        },
      ]
    }
  }) {
    _id
    posts {
      data { _id }
    }
  }
}
```

Now that we have some records in the database, we can query them with the built-in `find<Collection>ByID` query or fetch all of a collection's records with one of the `all<Collection>` queries that we included in the schema. If you're using Insomnia, explore the schema documentation and try out different queries.

データベースにいくつかのレコードができたので、組み込みの `find<Collection>ByID` クエリを使ってクエリを実行したり、スキーマに含まれている `all<Collection>` クエリを使ってコレクションのレコードをすべて取得することができます。Insomniaを使っている方は、スキーマのドキュメントを読んで、いろいろなクエリを試してみてください。

## [](#bonus-using-faunadb-while-testing-a-python-application-with-pytest)Bonus: Using FaunaDB while testing a Python application (with Pytest)

A common challenge when testing application code is handling database transactions in integration tests. Thankfully, we have frameworks like Rails and Django that, with a little configuration, can handle database setup and teardown for us. Unfortunately, such frameworks' database connectors generally have limited support for NoSQL databases like FaunaDB, and even then, it's only for the most-popular options like MongoDB. So, how can we use our local FaunaDB instance for integration tests without corrupting our development database?

teardown

〈米話〉〔機器などの〕分解
〈米話〉〔建物などの〕取り壊し、解体

アプリケーションコードをテストする際によくある課題は、統合テストでのデータベーストランザクションの処理です。
ありがたいことに、Rails や Django のようなフレームワークでは、少しの設定でデータベースのセットアップとティアダウンを処理してくれます。
しかし残念なことに、こうしたフレームワークのデータベースコネクタでは、FaunaDB のような NoSQL データベースのサポートが限られており、さらには MongoDB のような最も人気のあるオプションしかサポートされていません。
では、開発用のデータベースを破壊することなく、ローカルの FaunaDB インスタンスを統合テストに使用するにはどうすればよいのだろうか。

When setting up integration tests, I wanted to start by making sure that I didn't accidentally change data in my development database. Since FaunaDB identifies the specific database that you're calling with the API token that you use, the easiest way to avoid accidental calls is to make sure that the token for your development database isn't available in the code. Assuming that you're using environment variables for your tokens and secrets, the easiest way to hide the dev API token is to make it blank in `os.environ` before every test. Pytest allows us to automatically run code before tests with `conftest.py` files. What's more, these files can be nested to run different pre-test code in different test modules. So, we can define a `conftest.py` file at the root of our `tests` directory with the following code to prevent unwanted FaunaDB calls:  

統合テストを設定する際には、まず開発用データベースのデータを誤って変更していないかどうかを確認したかった。
FaunaDB は、使用する API トークンで呼び出している特定のデータベースを識別するので、誤った呼び出しを避ける最も簡単な方法は、開発データベースのトークンがコード内で利用できないようにすることです。
トークンやシークレットに環境変数を使用していると仮定すると、開発用の API トークンを隠す最も簡単な方法は、毎回のテストの前に `os.environ` で空白にすることです。
Pytest では、`conftest.py` ファイルを使って、テストの前に自動的にコードを実行することができます。
さらに、これらのファイルをネストして、異なるテストモジュールで異なるテスト前のコードを実行することができます。
そこで、`tests` ディレクトリのルートに `conftest.py` ファイルを定義し、次のようなコードを記述することで、不要な FaunaDB の呼び出しを防ぐことができます。 

```
# src/tests/conftest.py
import os

os.environ["FAUNADB_KEY"] = ""
```

I tried doing the same thing using a Pytest fixture or `unittest`'s `patch`, which can work as well, but require you to use them before every test or at least before every test suite, and such details are easy to forget when writing tests for the next feature. The code above, however, is guaranteed to run before any tests, making it a foolproof way of keeping our development data safe.

Pytest のフィクスチャや `unittest` の `patch` を使って同じことをしようとしましたが、これらは同様に動作しますが、すべてのテストの前、あるいは少なくともすべてのテストスイートの前に使用する必要があります。しかし、上記のコードはテストの前に実行されることが保証されているので、開発データを安全に保つための確実な方法です。

Now that we've prevented unwanted calls to our dev database, how do we set up and call our test database for integration tests? Why, with another `conftest.py` of course! I have `tests` separated into `unit` and `integration` submodules. Inside `integration` we can include the following `conftest.py`:  

開発用データベースへの不要な呼び出しを防いだところで、 統合テスト用のテストデータベースをどのようにセットアップして呼び出すのでしょうか？もちろん、別の `conftest.py` を使います。私は `tests` を `unit` と `integration` というサブモジュールに分けています。`integration`の中には、次のような`conftest.py`を入れることができます。 

```
# src/tests/integration/conftest.py

import os
from unittest.mock import patch

import pytest

# Names of module & FaunaDB client class depend
# on your application code
from src.app.faunadb import FaunadbClient

# モジュールと FaunaDB クライアントクラスの名前は
# あなたのアプリケーションコードに依存します
from src.app.faunadb import FaunadbClient

# Use "session" scope and autouse to run once before all tests.
# This is to make sure that the "localhost" endpoint exists.
@pytest.fixture(scope="session", autouse=True)
def _setup_faunadb():
    os.system(
        "npx fauna add-endpoint http://faunadb:8443/ --alias localhost --key secret"
    )

# Scope "function" means that this only applies to the test function
# that uses it

# スコープ "function "は、これを使用するテスト関数にのみ適用されることを意味します。
# 使っているテスト関数にのみ適用されることを意味します。

@pytest.fixture(scope="function")
def faunadb_client():
    # We create and delete the database for each test,
    # because it's reasonably quick, and simpler than manually deleting
    # all data.
    
    # テストごとにデータベースの作成と削除を行います。
    # すべてのデータを手動で削除するよりも簡単で、合理的だからです。
    # すべてのデータを削除するよりも簡単だからです。

    os.system("npx fauna create-database test --endpoint localhost")

    # Creating an API key produces output in the terminal
    # that includes the following line: secret: <API token>
    # APIキーを作成すると、ターミナルに次の行を含む出力が表示されます。
    # secret: <API token>

    create_key_output = (
      os.popen("npx fauna create-key test --endpoint=localhost").read()
    )
    faunadb_key = (
        re.search("secret: (.+)", create_key_output).group(1).strip()
    )

    client = FaunadbClient(faunadb_key=faunadb_key)
    client.import_schema()

    # For any test that uses this fixture, we patch the environment
    # variable for the FaunaDB API key and return the client. This way,
    # all FaunaDB calls will use the test DB, and the test function
    # will have a valid client to make DB calls for test setup
    # or assertions.

    # このフィクスチャを使用するテストでは、FaunaDB APIの環境変数にパッチを当てます。
    # 環境変数に FaunaDB API キーをパッチし、クライアントを返す。こうすることで
    # すべての FaunaDB 呼び出しはテスト DB を使用し、テスト関数は
    # はテスト設定のための DB 呼び出しを行うための有効なクライアントを持つことになる。
    # またはアサーションを行うための有効なクライアントを持つことになる。

    with patch.dict(
      "os.environ", {**os.environ, 'FAUNADB_KEY': faunadb_key}
    ):
        yield client

    os.system("npx fauna delete-database test --endpoint localhost")
```

You might need to modify the code above depending on the specifics of your app and tests (for example, I patch my app's `settings` module rather than `os.environ` directly), but I've been using a similar file for a few weeks, and it's been working well. Now, if you wanted to test user creation with actual database transactions, you could run something like the following:  

アプリやテストの内容によっては、上記のコードを修正する必要があるかもしれませんが（例えば、私は`os.environ`に直接パッチを当てるのではなく、アプリの`settings`モジュールにパッチを当てています）、私は数週間前から同じようなファイルを使っていて、うまく機能しています。さて、実際のデータベース・トランザクションを使ってユーザー作成をテストしたい場合は、次のようなものを実行します。 

```
# src/tests/integration/test_user.py

def test_user_creation(faunadb_client):
  username = "burgerbob"
  created_user = faunadb_client.create_user(
    username=username,
    password="password1234"
  )
  assert created_user['username'] == username

  all_users = faunadb_client.all_users()
  assert len(all_users) == 1
```

If you want to see the full test and FaunaDB client code, I have an example in the [repo](https://github.com/cfranklin11/faunadb-local) for this tutorial.

完全なテストと FaunaDB クライアントのコードを見たい場合は、このチュートリアルの [repo](https://github.com/cfranklin11/faunadb-local)にサンプルがあります。

## [](#conclusion)Conclusion

There you have it: a full FaunaDB setup for local development and testing (as long as you're using Python). Thanks to its GraphQL interface, service-agnostic architecture, and its ability to model complex data relationships, I think FaunaDB is a solid choice for data persistence for any serverless application. The documentation for setting up a local instance of FaunaDB, however, is a bit sparse. So, I had to figure it out by piecing together disparate posts and code samples, but, as you can see, it's not too complicated once you know the necessary commands and configuration. So, give FaunaDB a try for your next serverless project.

ローカルでの開発とテストのための完全な FaunaDB セットアップができました。GraphQL インターフェイス、サービスに依存しないアーキテクチャ、複雑なデータ関係をモデル化する能力のおかげで、FaunaDB はあらゆるサーバーレスアプリケーションのデータ永続化のための堅実な選択肢だと思います。しかし、FaunaDBのローカルインスタンスをセットアップするためのドキュメントは、少し疎らです。そのため、私はバラバラの投稿やコードサンプルをつなぎ合わせて理解しなければなりませんでしたが、ご覧の通り、必要なコマンドと設定を知っていれば、それほど複雑ではありません。というわけで、次のサーバーレスプロジェクトでは、FaunaDBを試してみてください。

## Discussion (7)

Do you know how to have a fixed db secret key?

固定されたデータベースの秘密鍵を持つ方法を知っていますか？

A secret key is associated is the database that it was created for, so if you create a key for a database, it will be valid for as long as that database exists. It sounds like maybe you're asking for a secret key that's useable for multiple databases or that's valid even after destroying and recreating a database. This would mean having a secret key that applies to the Fauna instance, independent of any databases within it, and as far as I know, that's not possible.

秘密鍵は、作成されたデータベースに関連付けられていますので、あるデータベースのために秘密鍵を作成すると、そのデータベースが存在する限り有効です。複数のデータベースに使用できる秘密鍵や、データベースを破棄して再作成しても有効な秘密鍵を求めているのではないでしょうか。これは、Fauna インスタンスに適用される秘密鍵を、その中のデータベースとは無関係に持つことを意味しますが、私の知る限り、それは不可能です。

Thanks for your reply, I was interested in a fixed secret to use it for testing purposes. I found another way which to regex match the create-key output and extract the secret key and write it to test.env
Here's the script in case anybody finds it useful

お返事ありがとうございます。私はテスト目的で使用するために、固定の秘密に興味がありました。そこで、create-keyの出力を正規表現でマッチさせて秘密鍵を抽出し、test.envに書き込むという方法を見つけました。
以下にそのスクリプトを紹介します。

https://gist.github.com/unlocomqx/9d7a8510ab857d660edb309eff2b9e1a

---

Perfect to have a shorter round trip when developing.
It's also easy to persist your data:

開発時の往復時間を短縮するのに最適です。
また、データの永続化も容易です。

docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 \
-v :/var/lib/faunadb \
fauna/faunadb

great article, may I ask you about your experience with FaunaDB? what are the things you don't like or have issues with?

素晴らしい記事ですが、FaunaDBの使用経験についてお聞きしてもよろしいでしょうか？ 気に入らない点や問題点は何でしょうか？

Thanks. I've been migrating a side project to be fully serverless, which includes moving from a traditional Postgres DB to Fauna, so I've gotten to know it a lot better since writing this post. I still like it a lot and see no reason to prefer DynamoDB from a strictly technical perspective.

ありがとうございます。私はサイドプロジェクトを完全にサーバーレスに移行しており、それには従来のPostgres DBからFaunaへの移行も含まれていますので、この記事を書いてからFaunaをよりよく知ることができました。私は今でもFaunaをとても気に入っており、厳密な技術的観点からはDynamoDBを好む理由はありません。

One thing I've changed my mind on is Fauna's GQL interface vs using FQL. My project's data model is very simple, but I have some reasonably complicated queries, and I quickly found the GQL interface to be too limited when trying to filter documents by more than one field. There are ways to work around this either by creating a ton of different one-use GQL queries or filtering data in-memory. 

ひとつ気になったのは、FaunaのGQLインターフェースとFQLの使用についてです。私のプロジェクトのデータモデルは非常にシンプルですが、それなりに複雑なクエリを持っているので、複数のフィールドでドキュメントをフィルタリングしようとすると、GQLインターフェイスでは制限が多すぎることがすぐにわかりました。この問題を回避するには、1回しか使わないGQLクエリを大量に作成するか、データをインメモリでフィルタリングする方法があります。

Rather than make these compromises, I've dug into FQL for interacting with Fauna, and if you're willing to get past the initial learning curve, it's really powerful and reasonably pleasant to work with.

このような妥協をするのではなく、私はFaunaと対話するためにFQLを利用しています。最初の学習曲線を乗り越えようと思えば、FQLは本当に強力で、快適に作業することができます。

One thing I've had some trouble with since adopting FQL, though, is how best to fetch data, because Fauna gives you a few different ways of doing it, and each has tradeoffs in terms of performance, complexity, and cost. Also, the way they base fetching and filtering on the use of indexes was new for me and took some getting used to. I'm still figuring out which approach works best for my use case.

しかし、FQLを採用してから困ったことのひとつが、データをどのように取得するのがベストなのかということです。Faunaにはいくつかの異なる方法が用意されていますが、それぞれにパフォーマンス、複雑さ、コストの面でトレードオフがあります。また、データの取得とフィルタリングをインデックスの使用に基づいて行う方法は、私にとっては新鮮で、慣れるまでに少し時間がかかりました。どの方法が私のユースケースに最適なのか、まだ理解できていません。
