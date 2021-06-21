Fauna Add-on for Netlify | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/netlify

# Fauna Add-on for Netlify

Fauna アドオン for Netlify

The Fauna Add-on for Netlify makes it easy to use Fauna as the database for your Netlify sites and functions.

Fauna Add-on for Netlifyは、Netlifyサイトや機能のデータベースとしてFaunaを簡単に使用できるようにします。

Fauna is a serverless cloud database that offers fast global access to data via modern APIs, like GraphQL, without sacrificing data consistency. Ubiquitous, flexible, and secure, Fauna helps modern developers build applications fearlessly. It is an ideal companion for your serverless web applications hosted by Netlify, an excellent choice for web site hosting and development.

Fauna はサーバーレスのクラウドデータベースで、データの一貫性を犠牲にすることなく、GraphQL のような最新の API を通じてデータへの高速なグローバルアクセスを提供します。ユビキタス、フレキシブル、セキュアな Fauna は、現代の開発者が恐れることなくアプリケーションを構築するのに役立ちます。Webサイトのホスティングと開発に優れた選択肢であるNetlifyがホストするサーバーレスWebアプリケーションの理想的なコンパニオンです。

Fauna’s pricing model provides a generous free tier, which makes it ideal for developing your web application; you only pay when you exceed the thresholds for free service. See [the pricing page](https://fauna.com/pricing) for details.

Fauna の価格モデルは、ウェブアプリケーションの開発に理想的な寛大な無料ティアを提供し、無料サービスのしきい値を超えた場合にのみ支払いを行います。詳細は[価格ページ](https://fauna.com/pricing)をご覧ください。

Fauna’s multi-tenancy features make it easy to create and manage per-client databases, which simplifies your application development considerably. Just create a database for a specific client, and create and store a key for that database; when the client logs in, use the stored key to access the client’s database. You don’t need to worry about connection pooling, or data segregation; Fauna is accessed via HTTPS and there is no cross-database data contamination.

Fauna のマルチテナント機能により、クライアントごとのデータベースの作成と管理が容易になり、アプリケーションの開発が大幅に簡素化されます。特定のクライアント用にデータベースを作成し、そのデータベース用のキーを作成して保存するだけで、クライアントがログインしたときに、保存されたキーを使ってクライアントのデータベースにアクセスすることができます。コネクションプーリングやデータの分離を気にする必要はありません。Fauna は HTTPS でアクセスされ、データベース間のデータ汚染はありません。

When you setup the Fauna Add-on for Netlify, a Netlify-specific database is created in Fauna, an access token is created and stored in a private environment variable (the Netlify UI never displays it), and the [JavaScript](https://docs.fauna.com/fauna/current/drivers/javascript) driver is installed. Everything you need to get started building a Netlify function that uses Fauna for persistent data storage.

Netlify 用 Fauna アドオンをセットアップすると、Netlify 専用のデータベースが Fauna に作成され、アクセストークンが作成されてプライベート環境変数に保存され（Netlify の UI には表示されない）、[JavaScript](https://docs.fauna.com/fauna/current/drivers/javascript)ドライバがインストールされる。Fauna を永続的なデータストレージとして使用する Netlify 関数の構築を開始するために必要なものがすべて揃っています。

## [](#how-to-use-the-fauna-add-on-for-netlify)How to use the Fauna Add-on for Netlify

Netlify用Faunaアドオンの使用方法

It only takes a few minutes to get setup.

セットアップには数分しかかかりません。

1.  **Sign up for a Netlify account**

**Netlifyアカウントにサインアップする**。

    You can skip this step if you already have a Netlify account.

    すでにNetlifyのアカウントをお持ちの方は、このステップをスキップできます。

    Visit: [https://app.netlify.com/signup](https://app.netlify.com/signup)

    訪問してください。[https://app.netlify.com/signup](https://app.netlify.com/signup)

2.  **Install the Netlify command-line tool**

**Netlifyコマンドラインツールをインストールする**。

    You can skip this step if you have previously installed `netlify-cli`.

    事前に`netlify-cli`をインストールしていれば、このステップは省略できます。

    In a terminal, run the following command:

    ターミナルで以下のコマンドを実行してください。

    terminal

    ```bash
    npm i netlify-cli -g
    ```

3.  **Create a folder for your Netlify project**

**Netlifyプロジェクト用のフォルダを作成する**。

    If you already have a Netlify project created, `cd` into that folder in your terminal, then skip to the next step.

    すでにNetlifyプロジェクトが作成されている場合は、ターミナルでそのフォルダに`cd`を入れて、次のステップに進みます。

    In your terminal, run the following commands:

    ターミナルで、以下のコマンドを実行してください。

    terminal

    ```bash
    mkdir my_project
    cd my_project
    ```

4.  **Initialize your Netlify project**

**Netlifyプロジェクトを初期化する。

    If you have already initialized your Netlify project, skip to the next step.

    もし、すでにNetlifyプロジェクトを初期化している場合は、次のステップに進んでください。

    In your terminal, run the following command:

    ターミナルで、以下のコマンドを実行してください。

    terminal

    ```bash
    netlify init
    ```

5.  **Add the Fauna Add-on for Netlify**

**NetlifyのFaunaアドオンを追加する**。

    In your terminal, run the following command:

    ターミナルで以下のコマンドを実行します。

    terminal

    ```bash
    netlify addons:create fauna
    ```

6.  **Authenticate the Add-on**

**アドオンを認証する**

    In your terminal, run the following command:

    ターミナルで以下のコマンドを実行します。

    terminal

    ```bash
    netlify addons:auth fauna
    ```

    This step prompts you to sign up with Fauna, or login if you already have an account. Once logged in, you are prompted to name your database and import it into your account. This allows you to interact with your database directly using the Fauna Dashboard.

    このステップでは、Fauna にサインアップするか、すでにアカウントを持っている場合はログインするよう促されます。ログインすると、データベースに名前を付けて自分のアカウントにインポートするよう促されます。これにより、Fauna ダッシュボードを使ってデータベースを直接操作できるようになります。

The database created for your project receives an auto-generated name, which looks like `c7d7da35-e79a-4cad-88cd-83a152b50793`. You can freely rename the database, via the [Fauna Dashboard](https://dashboard.fauna.com/) or `fauna-shell`, to make it easier to identify to which project it belongs.

プロジェクト用に作成されたデータベースは、自動生成された名前を受け取ります。その名前は `c7d7da35-e79a-4cad-88cd-83a152b50793` のようなものです。データベースの名前は、[Fauna Dashboard](https://dashboard.fauna.com/) や `fauna-shell` で自由に変更することができ、どのプロジェクトに属しているかを簡単に識別することができます。

## [](#thats-it)That’s it!

以上で設定は完了です。

You’re all done setting up the Fauna Add-on for Netlify.

これで、Netlify 用 Fauna アドオンの設定はすべて完了です。

The next step is to build your web application or microservice. See [the Netlify documentation](https://www.netlify.com/docs/) for help there. Check out the rest of the Fauna documentation for help writing queries and managing your data.

次のステップは、あなたのウェブアプリケーションやマイクロサービスを構築することです。そこでは[Netlify documentation](https://www.netlify.com/docs/)を参照してください。クエリの書き方やデータの管理については、Fauna ドキュメントの他の部分をチェックしてください。

