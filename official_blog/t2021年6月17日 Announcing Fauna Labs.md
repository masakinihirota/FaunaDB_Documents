Announcing Fauna Labs
https://fauna.com/blog/announcing-fauna-labs

# Announcing Fauna Labs

動物相実験室の発表

Rob Sutter|Jun 17th, 2021|

2021年6月17日

Categories:

[News](https://fauna.com/blog?category=news)

Today [Fauna](https://fauna.com/) is announcing [Fauna Labs](https://github.com/fauna-labs) - a collection of [tooling](#useful-tooling) and [examples](#helpful-examples) to help you build with Fauna more effectively. From Infrastructure as Code (IaC) tools to single sign-on (SSO) application templates, Fauna Labs has everything you need to deliver applications more quickly with Fauna!

本日、FaunaはFauna Labsを発表しました。これは、Faunaをより効果的に構築するのに役立つツールと例のコレクションです。Infrastructure as Code（IaC）ツールからシングルサインオン（SSO）アプリケーションテンプレートまで、Fauna Labsには、Faunaを使用してアプリケーションをより迅速に提供するために必要なすべてが揃っています。

## Useful tooling

便利な工具

Fauna Labs provides tooling to help you manage your databases. Infrastructure as Code (IaC) is an important focus, allowing you to create and replicate collections, roles, indexes, and functions across different environments. Fauna Labs also has a number of templates and application skeletons that help you focus on features and deliver your applications quickly!

Fauna Labsは、データベースの管理に役立つツールを提供します。Infrastructure as Code（IaC）は重要な焦点であり、コレクション、ロール、インデックス、および関数をさまざまな環境で作成および複製できます。Fauna Labsには、機能に集中してアプリケーションを迅速に提供するのに役立つ多数のテンプレートとアプリケーションスケルトンもあります。

### Fauna Serverless Framework plugin

動物相サーバーレスフレームワークプラグイン

The [Fauna plugin](https://github.com/fauna-labs/serverless-fauna) for the [Serverless Framework](https://serverless.com) allows you to manage your databases and resources directly in your _serverless.yml_ file. You can integrate it in your test and CI/CD pipeliness to keep your databases in sync across multiple environments. There's also an [example repository](https://github.com/fauna-labs/serverless-fauna-example) that demonstrates how to create, update, and delete collections, indexes, roles, and user-defined functions (UDFs).

Serverless FrameworkのFaunaプラグインを使用すると、serverless.ymlファイルでデータベースとリソースを直接管理できます。これをテストおよびCI / CDパイプラインに統合して、複数の環境間でデータベースの同期を維持できます。コレクション、インデックス、ロール、およびユーザー定義関数（UDF）を作成、更新、および削除する方法を示すリポジトリの例もあります。

![Serverless plugin deployment screenshot](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/1ytFRhzqmzBaAZHYCPG2I7/122b0fa649a6ec0bf50ada3717c2dbb0/serverless-fauna.png)

### Fauna Schema Migrate tool

動物相スキーマ移行ツール

The [Fauna Schema Migrate](https://github.com/fauna-labs/fauna-schema-migrate) (FSM) tool also allows you to setup and manage your Fauna resources as code. It provides support for schema migrations for larger teams, and shows how to use `Let()` statements to update your databases in a single transaction. You also can use FSM to deploy blueprints, adding common functionality to your Fauna database quickly and consistently.

ファウナスキーマの移行（FSM）ツールは、セットアップにあなたを可能にし、コードとして、あなたの動植物資源を管理します。大規模なチームのスキーマ移行をサポートし、Let()ステートメントを使用して1回のトランザクションでデータベースを更新する方法を示します。また、FSMを使用してブループリントをデプロイし、Faunaデータベースに共通の機能を迅速かつ一貫して追加することもできます。

![Fauna Schema Migrate screenshot](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3lwdeB4cnJX5xKsdyvFTDD/bb63a1f6e60109f091c0336a45b53684/fauna-schema-migrate.png)

### Blueprints

設計図

[Fauna blueprints](https://github.com/fauna-labs/fauna-blueprints) are packages of resources defined in pure FQL that can be loaded using the Fauna Schema Migrate. You can load blueprints into your database to perform common tasks like [email verification](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/email-verification), [password reset](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/password-reset), [rate limiting](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/rate-limiting), and more.

動物相ブループリントは、動物相スキーマ移行を使用してロードできる純粋なFQLで定義されたリソースのパッケージです。ブループリントをデータベースにロードして、電子メールの確認、パスワードのリセット、レート制限などの一般的なタスクを実行できます。

![Screenshot showing nested official blueprints](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6wqqZDnpvm2m2At6EVGMXF/9323a8d29e475a3699b606cdc55219d4/blueprints.png)

## Helpful examples

役立つ例

Reading the [docs](https://docs.fauna.com) is great, but sometimes you need more complete examples to help you understand a concept or get you unstuck. Fauna Labs has a number of examples, from our flagship Fwitter app to an example demonstrating how to use document streaming for real time updates. You'll also find the sample code from Fauna blog posts.

ドキュメントを読むことは素晴らしいことですが、概念を理解したり、行き詰まったりするのに役立つ、より完全な例が必要になる場合があります。Fauna Labsには、主力のFwitterアプリから、リアルタイム更新にドキュメントストリーミングを使用する方法を示す例まで、多数の例があります。また、Faunaのブログ投稿からサンプルコードを見つけることができます。

### Fwitter

Fwitter

[Fwitter](https://github.com/fauna-labs/fwitter) is a Twitter clone that demonstrates Fauna's features and functionality. It uses a frontend-only approach that accesses Fauna directly for data storage, authentication, and authorization. It demonstrates basic concepts, such as storing and retrieving data, as well as more advanced concepts like securing your data with user-defined functions (UDFs) and attribute-based access control (ABAC). For more information on Fwitter, see the repository or [this CSS-Tricks article](https://css-tricks.com/rethinking-twitter-as-a-serverless-app/).

Fwitterは、Faunaの特徴を示すTwitterクローンです。データの保存、認証、承認のために動物相に直接アクセスするフロントエンドのみのアプローチを使用します。データの保存や取得などの基本的な概念に加えて、ユーザー定義関数（UDF）や属性ベースのアクセス制御（ABAC）を使用してデータを保護するなどのより高度な概念を示します。Fwitterの詳細については、リポジトリまたはこのCSS-Tricksの記事を参照してください。

![Fwitter screenshot](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7CAt3vZBAV6Urn5rwfJHHF/2bc889fe0ff3388368556784b2960f52/fwitter.png)

### Fauna authentication skeleton with Auth0

Auth0を使用した動物相認証スケルトン

This [application skeleton](https://github.com/fauna-labs/faunadb-auth-skeleton-with-auth0) gives you a basic React app with a login flow using Auth0. The app creates an [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider.html) and configures your Fauna database to accept JWT tokens from Auth0 for authentication. With Auth0 and Fauna, you can implement [social login](https://auth0.com/learn/social-login), allowing users to login using providers like Twitter or Google and reducing signup friction.

この[アプリケーションスケルトン](https://github.com/fauna-labs/faunadb-auth-skeleton-with-auth0)は、Auth0を使ったログインフローを持つ基本的なReactアプリを提供します。このアプリは、[AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider.html)を作成し、Auth0からのJWTトークンを認証のために受け入れるようにFaunaデータベースを設定します。Auth0とFaunaを使えば、[social login](https://auth0.com/learn/social-login)を実装することができ、ユーザーはTwitterやGoogleなどのプロバイダを使ってログインすることができ、サインアップの摩擦を減らすことができます。

### Streaming example

ストリーミングの例

[This project](https://github.com/fauna-labs/fauna-streaming-example) is an example project that demonstrates Fauna's document streaming features. It's a React app that retrieves a page of references from a collection and opens streams on the documents that are currently present on the screen. When those documents are updated, it displays the new versions in real time.

このプロジェクトは、Faunaのドキュメントストリーミング機能を示すサンプルプロジェクトです。これは、コレクションから参照のページを取得し、現在画面に表示されているドキュメントのストリームを開くReactアプリです。これらのドキュメントが更新されると、新しいバージョンがリアルタイムで表示されます。

![Screen capture of dynamically updating products](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/tuPs36xXcK4EbOhtDNipI/5cb34da0edf4e986108fe71b15f08464/streaming.gif)

## Community contributions

コミュニティの貢献

We created Fauna Labs for our developer community, but we also want to hear your voice and highlight your contributions. That's why we've enabled [GitHub discussions](https://docs.github.com/en/discussions) and connected [GitHub issues](https://docs.github.com/en/issues) to our internal tracking tool. We also welcome your contributions, from pull requests on existing code to new blueprints and even [transferring repositories](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/transferring-a-repository) that you think others will find useful!

Fauna Labs は開発者コミュニティのために作られましたが、お客様の声を聞き、お客様の貢献を強調したいとも考えています。そのため、[GitHub ディスカッション](https://docs.github.com/en/discussions)を有効にし、[GitHub issue](https://docs.github.com/en/issues)を社内のトラッキングツールに接続しています。また、既存のコードに対するプルリクエストから、新しいブループリント、さらには他の人に役立つと思われる[リポジトリーの移管]（ https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/transferring-a-repository ）まで、皆様からの貢献をお待ちしております。

## What comes next?

次は何が来るのか？

See a tool that you'd like to see officially supported? Create an issue and let us know! If there's a specific tool, template, or example that you would like to see, let us know with a [feature request](https://forums.fauna.com/c/feature-requests/2) on the [Fauna community forums](https://forums.fauna.com).

公式にサポートしてもらいたいツールがありますか？問題を作成してお知らせください。見たい特定のツール、テンプレート、または例がある場合は、Faunaコミュニティフォーラムの機能リクエストでお知らせください。

We are currently developing self-paced workshops to help you and your team build more effectively with Fauna. Check back regularly for this and other updates.

私たちは現在、あなたとあなたのチームが動物相をより効果的に構築するのを助けるために、自分のペースで進められるワークショップを開発しています。このアップデートやその他のアップデートを定期的にチェックしてください。

Not sure where to start? Explore the [Fauna Labs repositories](https://github.com/fauna-labs), or clone the [Fwitter app](https://github.com/fauna-labs/fwitter) and start building with Fauna today!

どこから始めればよいかわからない？Fauna Labsリポジトリを探索するか、Fwitterアプリのクローンを作成して、今日からFaunaでビルドを開始してください。

