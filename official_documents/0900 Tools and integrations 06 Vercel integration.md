Vercel integration | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/vercel

# Vercel integration

Vercelインテグレーション







The Fauna integration for Vercel makes it easy to use Fauna as the database for your Vercel sites and serverless functions.



Vercel 用 Fauna インテグレーションは、Vercel サイトやサーバーレス機能のデータベースとして Fauna を簡単に使用できるようにします。







When you add the integration to your Vercel projects, the integration guides you through the process of connecting your project to a specific Fauna database. Once that is complete, your project can access your Fauna database using FQL or GraphQL to create, retrieve, update, and delete documents.



このインテグレーションを Vercel プロジェクトに追加すると、プロジェクトを特定の Fauna データベースに接続するプロセスが案内されます。接続が完了すると、プロジェクトは FQL や GraphQL を使って Fauna データベースにアクセスし、ドキュメントの作成、取得、更新、削除を行うことができます。





## [](#how-to-add-fauna-to-your-vercel-projects)How to add Fauna to your Vercel projects

VercelプロジェクトにFaunaを追加する方法







It only take a few minutes to get setup:




セットアップには数分しかかかりません。






1.  **Sign in to your Fauna account**

**Fauna アカウントにサインインしてください。








    Visit: [https://dashboard.fauna.com/](https://dashboard.fauna.com/)



訪問します。


    If you do not already have a Fauna account, sign up. It’s free!




    まだFaunaアカウントをお持ちでない方は、ぜひご登録ください。無料でご利用いただけます。







2.  **Sign in to your Vercel account**

**Vercelアカウントにサインインしてください**。






    Visit: [https://vercel.com/](https://vercel.com/)


   訪問してください。[https://vercel.com/](https://vercel.com/)







    If you do not already have a Vercel account, sign up. It’s free!



    まだVercelアカウントをお持ちでない方は、サインアップしてください。無料でご利用いただけます。







3.  **Create a Vercel project**

**Vercelプロジェクトの作成**。







    Skip this step if you already have a project started that should use Fauna.




    すでにFaunaを使用するプロジェクトを開始している場合は、このステップをスキップしてください。







    Use one of the template applications, or start from scratch.



    テンプレートアプリケーションのいずれかを使用するか、最初から作成してください。







4.  **Visit the Fauna integration page**


**Fauna 統合ページを見る**。






    Visit: [https://vercel.com/integrations/fauna](https://vercel.com/integrations/fauna)




    訪問する。[https://vercel.com/integrations/fauna](https://vercel.com/integrations/fauna)






    You can also find the Fauna integration by searching the Integration Marketplace:  
    [https://vercel.com/integrations?category=databases](https://vercel.com/integrations?category=databases)  
    Then click on the `Fauna` integration.







    また、Integration Marketplace(統合マーケットプレイス)を検索して、Fauna 統合を見つけることもできます。 
    [https://vercel.com/integrations?category=databases](https://vercel.com/integrations?category=databases)  
    次に、`Fauna`インテグレーションをクリックします。



5.  **Add the Fauna integration to your project**

**Fauna 統合をプロジェクトに追加します**。







    1.  Click the **Add** button.


**Add** ボタンをクリックします。







        The **Install Fauna** dialog appears:




        **Install Fauna** ダイアログが表示されます。






        ![The Install Fauna dialog on the Vercel site](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-add_fauna.png)



        ![Vercel サイトの Install Fauna ダイアログ](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-add_fauna.png)






    2.  Click the **Select a Vercel Scope** dropdown, and select the scope to use. The lists shows all of your project scopes.



  **Select a Vercel Scope** ドロップダウンをクリックし、使用するスコープを選択します。リストにはプロジェクトの全スコープが表示されます。







    3.  Click the **Continue** button.


**Continue**ボタンをクリックします。






        The dialog updates to show the selected scope, and to ask you to choose which project(s) should include the Fauna integration. You can choose **All Projects** or **Specific Projects** by clicking on the respective radio buttons.



        ダイアログが更新され、選択したスコープが表示されます。また、Fauna の統合を行うプロジェクトを選択するよう求められます。すべてのプロジェクト**または**特定のプロジェクト**を選択するには、それぞれのラジオボタンをクリックします。





        ![The Install Fauna dialog with project selection, on the Vercel site](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-add_fauna-choose_projects.png)




        ![プロジェクトを選択したInstall Faunaダイアログ(Vercelサイト)](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-add_fauna-choose_projects.png)








        If you choose **Specific Projects**, a new dropdown field appears. You can search for matching projects by typing into the dropdown’s field. When you click a project, it is added to a list that appears below the dropdown:



        **特定のプロジェクト**を選択した場合、新しいドロップダウンフィールドが表示されます。ドロップダウンのフィールドに入力することで、一致するプロジェクトを検索することができます。プロジェクトをクリックすると、ドロップダウンの下に表示されるリストにプロジェクトが追加されます。







        ![The Install Fauna dialog with a project selected, on the Vercel site](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-add_fauna-project_selected.png)





        プロジェクトを選択した状態のInstall Faunaダイアログ（Vercelサイト）](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-add_fauna-project_selected.png)





        You can add additional projects that should use the Fauna integration by clicking the dropdown and searching and selecting additional project names. You can click the **X** button beside a project to remove it from the list.



        ドロップダウンをクリックして、プロジェクト名を検索して選択すると、Fauna インテグレーションを使用するプロジェクトを追加することができます。プロジェクトの横にある**X**ボタンをクリックすると、リストから削除することができます。







    4.  Once your project selection is complete, click the **Install** button. A popup window appears:




    4.  プロジェクトの選択が完了したら、**Install**ボタンをクリックします。ポップアップ画面が表示されます。






        -   If you are not logged in, the Fauna login screen appears. Log in.





        - ログインしていない場合は、Faunaのログイン画面が表示されます。ログインします。






        -   When you are logged in to Fauna, the **Install Vercel/Fauna Connector** screen appears:





        - Fauna にログインすると、**Install Vercel/Sauna Connector** 画面が表示されます。







            ![The Install Vercel/Fauna Connector screen](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-install_connector.png)





            ![Install Vercel/Fauna Connector 画面](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-install_connector.png)






            Each project that you have selected appears on this screen asking for permission to access a specific database.





            選択した各プロジェクトがこの画面に表示され、特定のデータベースへのアクセス許可を求められます。







    5.  Use the dropdown beside your Vercel project name to choose which database should be connected to your Vercel project, or select **Create a New Database** which creates a new database named after your Vercel project.

Vercelプロジェクト名の横にあるドロップダウンを使用して、お客様のVercelプロジェクトに接続するデータベースを選択するか、または**Create a New Database**を選択して、お客様のVercelプロジェクトにちなんだ新しいデータベースを作成します。







    6.  Click the **Install** button. It takes a few moments for the Fauna integration to complete its configuration, and then the popup window closes. The integration configuration screen appears:

**Install**ボタンをクリックします。Fauna インテグレーションの設定が完了し、ポップアップウィンドウが閉じます。統合設定画面が表示されます。








        ![The Integration configuration screen, on the Vercel site](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-integration_configuration.png)




        ![統合設定画面（Vercel サイト上）](https://docs.fauna.com/fauna/current/integrations/vercel_images/screen-vercel-integration_configuration.png)






        You can rename the configuration, manage its access, or remove the configuration from here.




        ここから、設定の名前変更、アクセス管理、設定の削除ができます。







    7.  To confirm that the configuration has been installed, click the **Projects** button at the top of the page, click the name of one of the projects that you authorized, click the **Settings** button at the top of the page, then click the **Environment Variables** button in the left sidebar. When you scroll to the bottom, you should find an environment variable entry labeled `FAUNA_ADMIN_KEY`. This is the secret for an admin key that can access the database associated with your project.


設定がインストールされたことを確認するために、ページ上部の**プロジェクト**ボタンをクリックし、認証したプロジェクトの名前をクリックし、ページ上部の**設定**ボタンをクリックし、左サイドバーの**環境変数**ボタンをクリックします。一番下までスクロールすると，「FAUNA_ADMIN_KEY」と書かれた環境変数の項目があります。これは、プロジェクトに関連するデータベースにアクセスするための管理者キーの秘密です。












## [](#thats-it)That’s it!

以上で設定は完了です。







You’re all done setting up the Fauna integration for Vercel!




VercelでのFaunaインテグレーションの設定が完了しました!






The next step is to build your web application or microservice and include FQL queries using the [JavaScript driver](https://docs.fauna.com/fauna/current/drivers/javascript).



次のステップは、ウェブアプリケーションまたはマイクロサービスを構築し、[JavaScript ドライバ](https://docs.fauna.com/fauna/current/drivers/javascript)を使用して FQL クエリを組み込むことです。







See [the Vercel documentation](https://vercel.com/docs) for help there. Check out the rest of the Fauna documentation for help writing queries and managing your data.



Vercelのドキュメント](https://vercel.com/docs)を参照してください。クエリの書き方やデータの管理については、Fauna の他のドキュメントを参照してください。







The admin key created by the integration is directly usable _only_ during Vercel builds, or in serverless functions.





統合によって作成された管理者キーは、Vercel のビルド時、またはサーバーレス機能でのみ直接使用できます。







If you need to use a Fauna secret in browser-executed code, we recommend that you create a serverless function that can call [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) to generate a token. You can then use the token’s secret in client code. You should also consider applying [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) roles so that queries executed with the token secret have user-specific privileges.





ブラウザで実行されるコードで Fauna のシークレットを使用する必要がある場合は、[`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)を呼び出してトークンを生成するサーバーレス関数を作成することをお勧めします。その後、クライアントコードでトークンのシークレットを使用することができます。また、[Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)ロールを適用して、トークンシークレットを使って実行されるクエリがユーザー固有の権限を持つようにすることも検討すべきです。





---

old
これより下は昔の翻訳
個人メモ

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



