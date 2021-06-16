# Fauna Integration for Vercel
Vercel の Fauna 統合

The Fauna Integration for Vercel makes it easy
to use Fauna as the database
for your Vercel sites and serverless functions.
VercelのFauna統合により、
FaunaをVercelサイトおよびサーバーレス機能の
データベースとして簡単に使用できます。



Fauna is a serverless cloud database
that offers fast global access to data via modern APIs,
like GraphQL,
without sacrificing data consistency.
Ubiquitous,
flexible,
and secure,
Fauna helps modern developers build applications fearlessly.
It is an ideal companion
for your serverless web applications hosted by Vercel,
an excellent choice for web site hosting and development.
Faunaは、次のような最新のAPIを介してデータへの
高速なグローバルアクセスを提供する
サーバーレスクラウドデータベースです。
GraphQL、データの一貫性を犠牲にすることなく。
ユビキタスで柔軟で安全なFaunaは、
現代の開発者が恐れることなくアプリケーションを構築するのに役立ちます。
VercelがホストするサーバーレスWebアプリケーションの
理想的なコンパニオンであり、
Webサイトのホスティングと開発に最適です。



Fauna’s pricing model provides a generous free tier,
which makes it ideal for developing your web application;
you only pay when you exceed the thresholds for free service.
See [the pricing page](https://fauna.com/pricing) for details.
Faunaの価格モデルには寛大な無料利用枠があり、
Webアプリケーションの開発に最適です。
無料サービスのしきい値を超えた場合にのみ料金が発生します。
詳しくは料金ページをご覧ください。


Fauna’s multi-tenancy features make it easy to create and manage per-client databases,
which simplifies your application development considerably.
Just create a database for a specific client,
and create and store a key for that database;
when the client logs in,
use the stored key to access the client’s database.
You don’t need to worry about connection pooling,
or data segregation;
Fauna is accessed via HTTPS
and there is no cross-database data contamination.
Faunaのマルチテナント機能により、
クライアントごとのデータベースの作成と管理が容易になり、
アプリケーション開発が大幅に簡素化されます。
特定のクライアント用のデータベースを作成し、
そのデータベースのキーを作成して保存するだけです。
クライアントがログインしたら、
保存されたキーを使用してクライアントのデータベースにアクセスします。
接続プーリングやデータの分離について心配する必要はありません。
FaunaはHTTPS経由でアクセスされ、
データベース間のデータ汚染はありません。


## [](#how-to-use-the-fauna-integration-for-vercel)How to use the Fauna Integration for Vercel
Vercel の Fauna Integration の使用方法

It only takes a few minutes to get setup. There are three phases:
セットアップには数分しかかかりません。次の 3 つのフェーズがあります。

1.  [Fauna setup](#fauna-setup)
2.  [Vercel setup](#vercel-setup)
3.  [App setup](#app-setup)
動物の設定
ヴェルセル設定
アプリの設定

### [](#fauna-setup)Fauna setup
Faunaの設定

1.  **Sign in to your Fauna account**
Fauna アカウントにサインインする

    Visit: [https://dashboard.fauna.com/](https://dashboard.fauna.com/)

2.  **Create a database for all of your Vercel projects.**
すべての Vercel プロジェクト用のデータベースを作成します。

    Skip this step if you have performed it previously.
以前に実行したことがある場合は、この手順をスキップしてください。

    - Click the **New Database** button,
    - Enter `vercel` as the database name,
    - Click **Save**.
[新しいデータベース] ボタンをクリックし、
vercelデータベース名として入力し、
[保存] をクリックします。



3.  **Create an admin key for the Vercel database**
Vercel データベースの管理キーを作成する

    Skip this step if you have performed it previously.
以前に実行したことがある場合は、この手順をスキップしてください。

    - Click **Security** in the left navigation bar,
    - Click **New Key**,
    - Ensure that the **Database** field is set to Vercel,
    - Ensure that the **Role** field is set to Admin,
    - Enter Vercel into the **Key Name** field,
    - Click **Save**,
    - Copy the displayed secret, and store it somewhere safe.
The secret is only shown **once**!
左側のナビゲーション バーで[セキュリティ]をクリックし、
[新しいキー] をクリックし、
データベースフィールドが Vercel に設定されていることを確認します。
Roleフィールドが Admin に設定されていることを確認します。
[キー名]フィールドにVercel と入力し、
[保存] をクリックし、
表示されたシークレットをコピーして、安全な場所に保管してください。
秘密は一度だけ！

4.  **Create a project-specific database for a Vercel project.**
Vercel プロジェクト用にプロジェクト固有のデータベースを作成します。

    - Click **DB Overview** in the left navigation bar,
    - Beside the "Child databases" heading, click **New Database**,
    - Enter `faunadb-vercel-sample-app` as the database name,
    - Click the "Pre-populate with demo data" checkbox,
    - Click **Save**.
左側のナビゲーション バーでDB 概要をクリックし、
[子データベース] 見出しの横にある [新しいデータベース] をクリックします。
faunadb-vercel-sample-appデータベース名として入力し、
[デモ データを事前入力] チェックボックスをクリックし、
[保存] をクリックします。

## [](#vercel-setup)Vercel setup
設定

1.  **Sign up for a Vercel account**
    You can skip this step if you already have a Vercel account.
    Visit: [https://vercel.com/](https://vercel.com/)
Vercel アカウントにサインアップする
Vercel アカウントを既にお持ちの場合は、この手順をスキップできます。
アクセス: https://vercel.com/

2.  **Install the Vercel CLI**
Vercel CLI のインストール

    In a terminal window, run these commands:
ターミナル ウィンドウで、次のコマンドを実行します。

    shell

    ```shell
    npm i -g now
    now login
    ```

3.  **Add the Fauna integration to your Vercel account**
Fauna 統合を Vercel アカウントに追加します。

    - Visit [https://vercel.com/integrations/faunadb](https://vercel.com/integrations/faunadb),
    - Click **Add**,
    - Click which Vercel account to use,
    - Click **Add**,
    - In the **Admin Key Secret** field, paste the key that you created in step 3, in the [Fauna setup](#fauna-setup) procedure,
    - Click **Save Secret**,
    - Click the **Select a project** select box,
    - Enter your project name (`faunadb-vercel-sample-app`) and press Return,
    - Under **Link To Project**, click the `faunadb-vercel-sample-app` button.
訪問https://vercel.com/integrations/faunadb、

[追加] をクリックし、
使用する Vercel アカウントをクリックし、
[追加] をクリックし、
[ Admin Key Secret]フィールドに、
Fauna セットアップ手順のステップ 3 で作成したキーを貼り付けます。
[シークレットを保存] をクリックし、
[プロジェクトの選択] 選択ボックスをクリックし、
プロジェクト名 ( faunadb-vercel-sample-app) を入力して、 を押しますReturn。
下にリンクするプロジェクト、クリックfaunadb-vercel-sample-appボタンを。

## [](#app-setup)App setup
設定

1.  **Clone and deploy the sample app**
サンプル アプリを複製してデプロイする

    In a terminal, run these commands:
ターミナルで、次のコマンドを実行します。

    shell

    ```shell
    git clone https://github.com/fauna/faunadb-zeit-sample-app
    cd faunadb-zeit-sample-app
    now --prod
    ```

2.  **Navigate to your project’s web page**
プロジェクトの Web ページに移動します。

The URL is displayed after the previous command completes.
It is also copied for you,
so you can open a new browser tab/window,
and paste the URL into the browser’s location bar.
前のコマンドが完了すると、
URLが表示されます。
これもコピーされるため、
新しいブラウザタブ/ウィンドウを開き、
URLをブラウザのロケーションバーに貼り付けることができます。

You should see the same list of collections
that are displayed in the [Fauna Dashboard](https://dashboard.fauna.com/).
Fauna Dashboard に
表示されるのと同じコレクションのリストが表示され ます。

## [](#thats-it)That’s it!
それでおしまい！

You’re all done setting up the Fauna Integration for Vercel.
Vercel の Fauna Integration の設定はすべて完了です。

The next step is to build your web application or microservice.
次のステップは、Web アプリケーションまたはマイクロサービスを構築することです。

See [the Vercel documentation](https://vercel.com/docs) for help there.
Check out the rest of the Fauna documentation
for help writing queries and managing your data.
そこにあるヘルプについては、
Vercelのドキュメントを参照してください。
クエリの作成とデータの管理については、
Faunaの残りのドキュメントを確認してください。

Was this article helpful?

