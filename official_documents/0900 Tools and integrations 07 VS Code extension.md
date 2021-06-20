Fauna extension for Visual Studio Code | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/vs_code

# Fauna extension for Visual Studio Code

Fauna extension for Visual Studio Code

The Fauna extension for VS Code allows you to browse you Fauna databases, indexes, collections, documents, and user-defined functions within VS Code. You can also edit Fauna documents, and run Fauna Query Language queries within VS Code.

VS Code用のFauna拡張機能を使用すると、VS Code内でFaunaデータベース、インデックス、コレクション、ドキュメント、ユーザー定義関数を参照することができます。また、VS Code 内で Fauna ドキュメントを編集したり、Fauna Query Language クエリを実行することもできます。

[Visual Studio Code](https://code.visualstudio.com/), or VS Code, is Microsoft’s free code editor, which is optimized for building and debugging modern web and cloud applications. VS Code is available for Windows, Linux, and macOS. It includes built-in debugging support, Git integration, syntax highlighting, intelligent code completion, snippets, code refactoring, and customization via extensions.

[Visual Studio Code](https://code.visualstudio.com/)、またはVS Codeは、Microsoftの無料コードエディタで、最新のWebおよびクラウドアプリケーションの構築とデバッグに最適化されています。VS Codeは、Windows、Linux、およびmacOSで利用できます。VS Codeには、ビルトインのデバッグサポート、Gitとの統合、シンタックスハイライト、インテリジェントなコード補完、スニペット、コードリファクタリング、エクステンションによるカスタマイズなどの機能が搭載されています。

This section covers the following topics:

このセクションでは、以下のトピックについて説明します。

-   [Requirements](#requirements)
-   [Installation](#install)
-   [Configuration](#configure)
    -   [Acquire a Fauna key](#key)
    -   [Add the key to VS Code](#setup_key)
-   [Features](#features)
    -   [Browse the database](#browse)
    -   [Create a query document](#create)
    -   [Run a query](#query)
    -   [Upload a GraphQL schema](#schema)

---

- [必要条件](#requirements)
- [インストール](#install)
- [設定](#configure)
    - [Fauna キーの取得](#key)
    - [VSコードにキーを追加](#setup_key)
- [機能](#features)
    - [データベースの参照](#browse)
    - [クエリドキュメントの作成](#create)
    - [クエリを実行する](#query)
    - [GraphQLスキーマのアップロード](#schema)

## [](#requirements)Requirements

条件

-   A Fauna account. If you have not already done so, [sign up for a Fauna account](https://docs.fauna.com/fauna/current/start/#signup).
-   [Visual Studio Code](https://code.visualstudio.com/), version 1.4.0 (or higher).
-   A GraphQL extension installed in VS Code, to provide file type information for the Fauna extension for VS Code.

---

- Faunaアカウントを持っていること。まだお持ちでない場合は、[sign up for a Fauna account](https://docs.fauna.com/fauna/current/start/#signup)をご利用ください。
- Visual Studio Code](https://code.visualstudio.com/)のバージョン 1.4.0 (またはそれ以上)。
- VS Code にインストールされている GraphQL 拡張機能で、VS Code の Fauna 拡張機能にファイルタイプ情報を提供する。

## [](#install)Installation

インストール

This section describes how to install the Fauna extension for VS Code.

ここでは、VS Code 用 Fauna 拡張機能のインストール方法について説明します。

1.  Run VS Code.
2.  Select **View**  **Extensions**.
3.  Type `graphql` into the "Search Extensions in Marketplace" field.
4.  Click the **Install** button beside the first entry presented.
5.  Type `fauna` into the "Search Extensions in Marketplace" field.
6.  Click the **Install** button for the "Fauna" entry in the results.

---

1.  VS Codeを起動します。
2.  2. **View** **Extensions** を選択します。
3.  Search Extensions in Marketplace」の欄に「graphql」と入力する。
4.  最初に表示されたエントリの横にある**Install**ボタンをクリックする。
5.  5. "Search Extensions in Marketplace "フィールドに`fauna`と入力する。
6.  6. 結果として表示された「Fauna」のエントリの**Install**ボタンをクリックする。

    If prompted to do so, restart VS Code.

    プロンプトが表示されたら、VS Codeを再起動してください。

## [](#configure)Configuration

設定

This section describes how to configure the Fauna extension for VS Code.

ここでは、VS Code に Fauna 拡張機能を設定する方法を説明します。

### [](#key)Acquire a Fauna key

Fauna キーの取得

Accessing a Fauna database involves an authentication token called an "admin key". See [Keys](https://docs.fauna.com/fauna/current/security/keys) for more information. Perform the following steps to acquire an admin key:

Fauna データベースにアクセスするには、"admin key "と呼ばれる認証トークンを使用します。詳細は [キー](https://docs.fauna.com/fauna/current/security/keys)を参照してください。以下の手順で管理キーを取得します。

1.  Log in to [Fauna Dashboard](https://dashboard.fauna.com/).
2.  Click on an existing database, the one that the Fauna extension for VS Code should access. Or create a new database.
3.  Click the **Security** link in the left sidebar.
4.  Click the **New Key** button.
5.  Select the database that the key should access.
6.  Ensure that the **Role** field is set to `Admin` (the Fauna extension for VS Code does not currently support `Server` keys).
7.  Optional: Set the **Key Name** field to `VS Code`.
8.  Click **Save**.
9.  The key’s "secret" is displayed. Make sure that you copy the key at this point, and store it in a safe place: the key is only displayed once. If you lose it, the key would have to be revoked, and a new key would have to be created.

---

1.  [Fauna Dashboard](https://dashboard.fauna.com/)にログインします。
2.  既存のデータベース(VS Code 用 Fauna 拡張機能がアクセスするデータベース)をクリックします。または、新しいデータベースを作成します。
3.  左側のサイドバーにある**Security**リンクをクリックします。
4.  **New Key**ボタンをクリックします。
5.  キーがアクセスするデータベースを選択します。
6.  **Role** フィールドが `Admin` に設定されていることを確認します（VS Code の Fauna 拡張機能は現在 `Server` キーをサポートしていません）。
7.  オプションです。**Key Name** フィールドを `VS Code` に設定します。
8.  Save**をクリックします。
9.  キーの "シークレット "が表示されます。この時点で必ずキーをコピーし、安全な場所に保管してください。キーは一度しか表示されません。鍵は一度しか表示されません。紛失した場合は、鍵を無効にして、新しい鍵を作成する必要があります。

### [](#setup_key)Add the key to VS Code

VS Code にキーを追加する

Now that you have an admin key to access a Fauna database, the Fauna extension for VS Code needs to be configured. There are two approaches to configuring the key, within the VS Code configuration as a global key: for all projects, or in a project-specific `.faunarc` file. Choose **one** of the following approaches:

Fauna データベースにアクセスするための管理キーを取得したら、VS Code 用の Fauna 拡張機能を設定する必要があります。キーを設定するには 2 つの方法があります。VS Code の設定内で、すべてのプロジェクト用のグローバルキーとして設定する方法と、プロジェクト固有の `.faunarc` ファイルに設定する方法です。次のいずれかの方法を選択してください。

1.  Use the VS Code configuration:
    1.  In VS Code, Select **Code**  **Preferences**  **Settings**.
    2.  In the Settings tab, click **Extensions**, and then **Fauna**.
    3.  Paste the secret, that you acquired in the [previous section](#key), into the **Secret Key** field.
    4.  Restart VS Code.
    The key is a credential that provides full access to your database. Do not commit it to your `.vscode` configuration.
2.  Use the `.faunarc` file:
    1.  Create the file `.faunarc` in your project’s root folder, containing the following content:
        ```ini
        FAUNA_KEY=<YOUR KEY SECRET>
        ```
        Replace `<YOUR KEY SECRET>` with the secret that you acquired in the [previous section](#key).
    2.  Add `.faunarc` to your project’s `.gitignore` file.

You should now see the Fauna logo in the left sidebar.

---

1.  VS Codeの設定を使用する。
    1.  VS Codeで「**Code** **Preferences** **Settings**」を選択します。
    2.  設定」タブで、「**拡張子**」をクリックし、「**Fauna**」をクリックします。
    3.  3. 前項で取得したシークレットキー(#key)を **Secret Key** 欄に貼り付けます。
    4.  VS Codeを再起動します。
    キーは、データベースへのフルアクセスを提供するクレデンシャルです。.vscode`の設定にコミットしないでください。
2.  2. `.faunarc` ファイルを使用します。
    1.  プロジェクトのルートフォルダに、以下の内容のファイル`.faunarc`を作成します。
        ``ini
        fauna_key=<your key secret>.
        ```
        <YOUR KEY SECRET>`は、[前のセクション]で取得したシークレット(#key)に置き換えてください。
    2.  2. プロジェクトの `.gitignore` ファイルに `.faunarc` を追加してください。

これで左サイドバーにFaunaのロゴが表示されるようになります。

## [](#features)Features

特徴

With the extension installed, click on the Fauna logo in the left sidebar. Then you can use the following features:

拡張機能をインストールした状態で、左サイドバーにあるFaunaのロゴをクリックします。次のような機能があります。

### [](#browse)Browse the database

データベースの閲覧

![Browsing a database with the Fauna extension for VS Code](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-browse.png)

![VS Code 用 Fauna 拡張機能でデータベースをブラウズする](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-browse.png)

The Fauna extension for VS Code displays a sidebar on the left that lists the child databases, collections, documents, indexes, and functions that exist in the database associated with the configured key.

VS Code 用拡張機能 Fauna は、設定されたキーに関連付けられたデータベースに存在する子データベース、コレク ション、ドキュメント、インデックス、および関数を一覧表示するサイドバーを左に表示します。

When you click on a document, index, or function, the Fauna extension for VS Code opens a new tab to show that resource’s definition.

ドキュメント、インデックス、または関数をクリックすると、VS Code 用 Fauna 拡張機能は新しいタブを開き、そのリソースの定義を表示します。

Browsing is read-only at this time. See [Run a query](#query) for a work-around.

現時点では、閲覧は読み取り専用です。回避方法は、[クエリの実行](#query)を参照してください。

### [](#create)Create a query document

クエリドキュメントの作成

The Fauna extension for VS Code can be used to create a "query" document, that contains the FQL functions comprising a query. Choose **one** of the following approaches:

VS Code の Fauna 拡張機能を使用して、クエリを構成する FQL 関数を含む「クエリ」ドキュメントを 作成することができます。次のいずれかの方法を選択してください。

1.  Use the command palette:
    1.  Open the command palette with a keyboard shortcut: Command+Shift+P (macOS), or Control+Shift+P (Windows/Linux).
    2.  Type `Fauna: Create Query` and press Return.
        A new editing tab opens, containing the example query `Paginate(Collections())`.
        ![Creating a query file](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-create.png)
2.  Create a "query" file with the `.fql` extension:
    1.  Create a new file by typing Command+N (macOS) or Control+N (Windows/Linux).
    2.  Save the file with a `.fql` extension.

---

1.  コマンドパレットを使う。
    1.  キーボードショートカットでコマンドパレットを開きます。Command+Shift+P（macOS）、またはControl+Shift+P（Windows/Linux）。
    2.  2. `Fauna.Create Query` と入力してリターンキーを押します。Create Query` と入力し、Return を押します。
        新しい編集タブが開き、例のクエリ `Paginate(Collections())` が表示されます。
        ![クエリファイルの作成](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-create.png)
2.  拡張子が `.fql` の "query" ファイルを作成します。
    1.  1. Command+N (macOS) または Control+N (Windows/Linux) を入力して，新しいファイルを作成する．
    2.  2. ファイルの拡張子を「.fql」にして保存します。

### [](#query)Run a query

クエリの実行

The Fauna extension for VS Code} can be used to run a Fauna Query Language query, based on the contents of a ["query document"](#create):

VS Code}のFauna拡張機能を使用すると、["query document"](#create)の内容に基づいて、Fauna Query Languageのクエリを実行することができます。

1.  Open the command palette with a keyboard shortcut: Command+Shift+P (macOS), or Control+Shift+P (Windows/Linux).
2.  Type `Fauna: Run Query` and press Return.

---

1.  キーボードショートカットでコマンドパレットを開きます。Command+Shift+P（macOS）、またはControl+Shift+P（Windows/Linux）。
2. `Fauna.Run Query` と入力してリターンキーを押します。Run Query` と入力し、Return を押します。

    The query is executed, and an output pane appears to display the result of the query.

    クエリが実行され、クエリの結果を表示する出力ペインが表示されます。

    ![Running a query file](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-query.png)

    ![クエリファイルの実行](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-query.png)

You can use the query file to create, update, or delete any resources within the associated database.

クエリファイルを使用して、関連付けられたデータベース内の任意のリソースを作成、更新、または削除することができます。

### [](#schema)Upload a GraphQL schema

GraphQL スキーマのアップロード

1.  Open a `.graphql` or `.gql` file containing your GraphQL schema. See [the GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql/) for details.
2.  Open the command palette with the keyboard shortcut Command+Shift+P (macOS), or Control+Shift+P (Windows/Linux).
3.  Fauna allows two [modes](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes) of uploading schemas. Use the appropriate command:
    -   Type `Fauna: Upload GraphQL Schema` to upload in the default `merge` mode.
    -   Type `Fauna: Merge GraphQL Schema` to explicitly use `merge` mode.
    -   Type `Fauna: Override GraphQL Schema` to uploading in `override` mode.

--

1.  GraphQLのスキーマを含む`.graphql`または`.gql`ファイルを開きます。詳細は[the GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql/)を参照してください。
2.  2. キーボードショートカットCommand+Shift+P（macOS）、またはControl+Shift+P（Windows/Linux）でコマンドパレットを開く。
3.  Fauna では、スキーマをアップロードする際に 2 つの [モード](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes)を使用できます。適切なコマンドを使用してください。
    - Type `Fauna: Fauna: Upload GraphQL Schema` と入力すると、デフォルトの `merge` モードでアップロードされます。
    - Fauna: Merge GraphQL Schema` と入力すると、明示的に `merge` モードでアップロードします。
    - タイプ `Fauna: type `Fauna: Override GraphQL Schema` `override` モードでアップロードする。

        `override` mode causes data loss for any previous GraphQL schema. Any collections, indexes, or documents that are not involved in GraphQL are not affected.

        `override` モードでは、以前の GraphQL スキーマのデータが失われます。GraphQLに関係のないコレクション、インデックス、ドキュメントは影響を受けません。

    ![The upload schema command](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-upload_schema.gif)

    ![スキーマのアップロードコマンド](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-upload_schema.gif)

## [](#conclusion)Conclusion

結論

This section has described how to install the Fauna extension for VS Code, how to acquire an admin key, and how to configure the Fauna extension for VS Code with the key. The section has also described how to browse the associated database, how to create a query file, and how to execute a query.

本節では、Fauna extension for VS Code のインストール方法、管理者キーの取得方法、およびキーを使用した Fauna extension for VS Code の設定方法について説明しました。また、関連するデータベースを参照する方法、クエリファイルを作成する方法、クエリを実行する方法についても説明しました。

## [](#next-steps)Next steps

-   [Tutorials](https://docs.fauna.com/fauna/current/tutorials/)
-   [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/)
-   [Drivers](https://docs.fauna.com/fauna/current/drivers/)

---

- [チュートリアル](https://docs.fauna.com/fauna/current/tutorials/)
- [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/)
- [ドライバ](https://docs.fauna.com/fauna/current/drivers/)

---

old
これより下は昔の翻訳

# Fauna extension for Visual Studio Code
Visual Studio Code の Fauna 拡張機能

The Fauna extension for VS Code allows you to browse you Fauna databases,
indexes,
collections,
documents,
and user-defined functions within VS Code.
VSCodeのFauna拡張機能を使用すると、
VSCode内のFaunaデータベース、
インデックス、
コレクション、
ドキュメント、
およびユーザー定義関数を参照できます。

You can also edit Fauna documents,
and run Fauna Query Language queries within VS Code.
Faunaドキュメントを編集し、
VSCode内でFaunaクエリ言語クエリを実行することもできます。

[Visual Studio Code](https://code.visualstudio.com/),
or VS Code,
is Microsoft’s free code editor,
which is optimized for building and debugging modern web and cloud applications.
VS Code is available for Windows,
Linux,
and macOS.
VisualStudioCodeまたはVSCodeは、
Microsoftの無料のコードエディターであり、
最新のWebおよびクラウドアプリケーションの構築とデバッグ用に最適化されています。
VSCodeはWindows、
Linux、
macOSで利用できます。

It includes built-in debugging support,
Git integration,
syntax highlighting,
intelligent code completion,
snippets,
code refactoring,
and customization via extensions.
これには、
組み込みのデバッグサポート、
Git統合、
構文の強調表示、
インテリジェントなコード補完、
スニペット、
コードリファクタリング、
拡張機能によるカスタマイズが含まれます。

This section covers the following topics:
このセクションでは、次のトピックについて説明します。
-   [Requirements](#requirements)
-   [Installation](#install)
-   [Configuration](#configure)
-   [Acquire a Fauna key](#key)
-   [Add the key to VS Code](#setup_key)
-   [Features](#features)
-   [Browse the database](#browse)
-   [Create a query document](#create)
-   [Run a query](#query)
-   [Upload a GraphQL schema](#schema)
要件
インストール
構成
	動物の鍵を入手する
	VS Code にキーを追加する
特徴
	データベースを参照する
	クエリ ドキュメントを作成する
	クエリを実行する
	GraphQL スキーマをアップロードする

## [](#requirements)Requirements
要件

-   A Fauna account.
If you have not already done so,
[sign up for a Fauna account](https://docs.fauna.com/fauna/current/start/#signup).
-   [Visual Studio Code](https://code.visualstudio.com/), version 1.4.0 (or higher).
-   A GraphQL extension installed in VS Code,
to provide file type information for the Fauna extension for VS Code.
動物のアカウント。
Faunaアカウントにサインアップしていない場合は、
サインアップしてください。
Visual Studio Code、バージョン 1.4.0 (またはそれ以降)。
GraphQLVSCodeにインストールされた拡張機能。
VSCodeのFauna拡張機能のファイルタイプ情報を提供します。

## [](#install)Installation
インストール

This section describes how to install the Fauna extension for VS Code.
このセクションでは、
VS Code 用の Fauna 拡張機能をインストールする方法について説明します。

1.  Run VS Code.
2.  Select **View**  **Extensions**.
3.  Type `graphql` into the "Search Extensions in Marketplace" field.
4.  Click the **Install** button beside the first entry presented.
5.  Type `fauna` into the "Search Extensions in Marketplace" field.
6.  Click the **Install** button for the "Fauna" entry in the results.
If prompted to do so, restart VS Code.
VS Code を実行します。
ビューを選択  拡張機能。
入力しgraphql、「マーケットプレースで検索する拡張機能」フィールドに。
表示された最初のエントリの横にある[インストール] ボタンをクリックします。
入力しfauna、「マーケットプレースで検索する拡張機能」フィールドに。
結果の [ Fauna] エントリの[インストール] ボタンをクリックします。
プロンプトが表示されたら、VS Code を再起動します。

## [](#configure)Configuration
構成

This section describes how to configure the Fauna extension for VS Code.
このセクションでは、
VSCodeのFauna拡張機能を構成する方法について説明します。

### [](#key)Acquire a Fauna key
動物の鍵を入手する

Accessing a Fauna database involves an authentication token called an "admin key".
See [Keys](https://docs.fauna.com/fauna/current/security/keys) for more information.
Perform the following steps to acquire an admin key:
Faunaデータベースへのアクセスには、
「管理キー」
と呼ばれる認証トークンが含まれます。
詳細については、
キーを参照してください。
管理キーを取得するには、
次の手順を実行します。

1.  Log in to [Fauna Dashboard](https://dashboard.fauna.com/).
2.  Click on an existing database,
the one that the Fauna extension for VS Code should access.
Or create a new database.
3.  Click the **Security** link in the left sidebar.
4.  Click the **New Key** button.
5.  Select the database that the key should access.
6.  Ensure that the **Role** field is set to `Admin` 
(the Fauna extension for VS Code does not currently support `Server` keys).
7.  Optional: Set the **Key Name** field to `VS Code`.
8.  Click **Save**.
9.  The key’s "secret" is displayed.
Make sure that you copy the key at this point,
and store it in a safe place: the key is only displayed once. If you lose it,
the key would have to be revoked, and a new key would have to be created.
Fauna Dashboard にログインします。
VSCodeのFauna拡張機能がアクセスする既存のデータベースをクリックします。
または、
新しいデータベースを作成します。
左側のサイドバーにある[セキュリティ]リンクをクリックします。
[新しいキー] ボタンをクリックします。
キーがアクセスするデータベースを選択します。
Roleフィールドが設定されていることを確認します
Admin(VSCodeのFauna拡張機能は現在Serverキーをサポートしていません)。
オプション: セットする[キー名]フィールドをVS Code.
[保存] をクリックします。
鍵の「秘密」が表示されます。この時点でキーをコピーし、
安全な場所に保管してください。キーは一度だけ表示されます。紛失した場合は、キーを無効にし、新しいキーを作成する必要があります。

### [](#setup_key)Add the key to VS Code
VS Code にキーを追加する

Now that you have an admin key to access a Fauna database,
the Fauna extension for VS Code needs to be configured.
There are two approaches to configuring the key,
within the VS Code configuration as a global key: for all projects,
or in a project-specific `.faunarc` file.
Choose **one** of the following approaches:
Faunaデータベースにアクセスするための管理キーを取得したので、
VSCodeのFauna拡張機能を構成する必要があります。
VSCode構成内でグローバルキーとしてキーを構成するには、
すべてのプロジェクトに対して、
またはプロジェクト固有の.faunarcファイルでキーを構成する2つの方法があります。
次のいずれかの方法を選択します。

1.  Use the VS Code configuration:

1.  In VS Code, Select **Code**  **Preferences**  **Settings**.

2.  In the Settings tab, click **Extensions**, and then **Fauna**.

3.  Paste the secret, that you acquired in the [previous section](#key), into the **Secret Key** field.

4.  Restart VS Code.
VS Code 構成を使用します。

VSのコードでは、選択してコードを  環境設定  設定.

[設定] タブで、[拡張機能] をクリックし、次に [ Fauna ] をクリックします。

前のセクションで取得したシークレットを [シークレット キー]フィールドに貼り付けます。

VS Code を再起動します。

The key is a credential that provides full access to your database. Do not commit it to your `.vscode` configuration.
キーは、データベースへのフル アクセスを提供する資格です。.vscode構成にコミットしないでください。

2.  Use the `.faunarc` file:
1.  Create the file `.faunarc` in your project’s root folder, containing the following content:

```ini
FAUNA_KEY=<YOUR KEY SECRET>
```
Replace `<YOUR KEY SECRET>` with the secret that you acquired in the [previous section](#key).
2.  Add `.faunarc` to your project’s `.gitignore` file.
You should now see the Fauna logo in the left sidebar.
.faunarcファイルを使用します。
.faunarcプロジェクトのルート フォルダーに、次のコンテンツを含むファイルを作成します。
FAUNA_KEY=<YOUR KEY SECRET>
前のセクションで<YOUR KEY SECRET>取得したシークレットに置き換えます 。
.faunarcプロジェクトの.gitignoreファイルに追加します。
左サイドバーに Fauna ロゴが表示されます。

## [](#features)Features
特徴

With the extension installed,
click on the Fauna logo in the left sidebar.
Then you can use the following features:
拡張機能をインストールした状態で、
左側のサイドバーにあるFaunaロゴをクリックします。
その後、
次の機能を使用できます。

### [](#browse)Browse the database
データベースを参照する

![Browsing a database with the Fauna extension for VS Code](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-browse.png)

The Fauna extension for VS Code displays a sidebar
on the left that lists the child databases,
collections,
documents,
indexes,
and functions that exist in the database associated with the configured key.
VSCodeのFauna拡張機能は、
構成されたキーに関連付けられたデータベースに存在する子データベース、
コレクション、
ドキュメント、
インデックス、
および関数をリストするサイドバーを左側に表示します。

When you click on a document,
index,
or function,
the Fauna extension for VS Code opens a new tab
to show that resource’s definition.
ドキュメント、
インデックス、
または関数をクリックすると、
VSCodeのFauna拡張機能によって新しいタブが開き、
そのリソースの定義が表示されます。

Browsing is read-only at this time. See [Run a query](#query) for a work-around.
現時点では、
ブラウジングは読み取り専用です。
回避策については、
クエリの実行を参照してください。

### [](#create)Create a query document
クエリ ドキュメントを作成する

The Fauna extension for VS Code can be used to create a "query" document,
that contains the FQL functions comprising a query.
Choose **one** of the following approaches:
VSCodeのFauna拡張機能を使用して、
クエリを構成するFQL関数を含む「クエリ」
ドキュメントを作成できます。
次のいずれかの方法を選択します。

1.  Use the command palette:
コマンド パレットを使用します。

1.  Open the command palette with a keyboard shortcut: Command+Shift+P (macOS), or Control+Shift+P (Windows/Linux).
キーボード ショートカットでコマンド パレットを開きます: Command+ Shift+P (macOS) またはControl+ Shift+P (Windows/Linux)。

2.  Type `Fauna: Create Query` and press Return.

A new editing tab opens, containing the example query `Paginate(Collections())`.
を入力Fauna: Create Queryして押しReturnます。
クエリ例を含む新しい編集タブが開きます Paginate(Collections())。

![Creating a query file](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-create.png)

2.  Create a "query" file with the `.fql` extension:
次の.fql拡張子を持つ「クエリ」ファイルを作成します。

1.  Create a new file by typing Command+N (macOS) or Control+N (Windows/Linux).
Command+N(macOS)
またはControl+N(Windows/Linux)
を入力して、
新しいファイルを作成します。

2.  Save the file with a `.fql` extension.

.fql拡張子を付けてファイルを保存します。

### [](#query)Run a query
クエリを実行する

The Fauna extension for VS Code} can be used to run a Fauna Query Language query,
based on the contents of a ["query document"](#create):
VSCodeのFauna拡張機能}を使用して、
「クエリドキュメント」
の内容に基づいてFaunaクエリ言語クエリを実行できます。

1.  Open the command palette with a keyboard shortcut: Command+Shift+P (macOS), or Control+Shift+P (Windows/Linux).
キーボード ショートカットでコマンド パレットを開きます: Command+ Shift+P (macOS) またはControl+ Shift+P (Windows/Linux)。

2.  Type `Fauna: Run Query` and press Return.
を入力Fauna: Run Queryして押しReturnます。

The query is executed,
and an output pane appears to display the result of the query.
クエリが実行され、クエリの結果を表示する出力ペインが表示されます。

![Running a query file](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-query.png)

You can use the query file to create, update, or delete any resources within the associated database.
クエリ ファイルを使用して、関連するデータベース内の任意のリソースを作成、更新、または削除できます。

### [](#schema)Upload a GraphQL schema
アップロードする GraphQL スキーマ

1.  Open a `.graphql` or `.gql` file containing your GraphQL schema. See [the GraphQL reference](https://docs.fauna.com/fauna/current/api/graphql/) for details.
オープンA.graphqlまたは.gqlあなたを含むファイルGraphQLスキーマ。詳細について は、GraphQL リファレンスを参照してください。

2.  Open the command palette with the keyboard shortcut Command+Shift+P (macOS), or Control+Shift+P (Windows/Linux).
キーボード ショートカットCommand+ Shift+P (macOS) またはControl+ Shift+P (Windows/Linux) を使用してコマンド パレットを開きます。

3.  Fauna allows two [modes](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes) of uploading schemas. Use the appropriate command:
Fauna では、2 つのモードでスキーマをアップロードでき ます。適切なコマンドを使用します。

-   Type `Fauna: Upload GraphQL Schema` to upload in the default `merge` mode.
-   Type `Fauna: Merge GraphQL Schema` to explicitly use `merge` mode.
-   Type `Fauna: Override GraphQL Schema` to uploading in `override` mode.
入力して、デフォルト モードでアップロードします。Fauna: Upload GraphQL Schemamerge
モードを明示的に使用するには、タイプします。Fauna: Merge GraphQL Schemamerge
モードでアップロードするように入力します。Fauna: Override GraphQL Schemaoverride

`override` mode causes data loss for any previous GraphQL schema. Any collections, indexes, or documents that are not involved in GraphQL are not affected.
override モードにより、以前のデータが失われます GraphQL スキーマ。に関与していないコレクション、インデックス、またはドキュメントGraphQL 影響を受けません。

![The upload schema command](https://docs.fauna.com/fauna/current/integrations/vs_code_images/screen-vscode-upload_schema.gif)

## [](#conclusion)Conclusion
結論

This section has described how to install the Fauna extension for VS Code,
how to acquire an admin key,
and how to configure the Fauna extension for VS Code with the key.
The section has also described how to browse the associated database,
how to create a query file,
and how to execute a query.

このセクションでは、
VSCodeのFauna拡張機能をインストールする方法、
管理キーを取得する方法、
およびキーを使用してVSCodeのFauna拡張機能を
構成する方法について説明しました。
このセクションでは、
関連するデータベースを参照する方法、
クエリファイルを作成する方法、
およびクエリを実行する方法についても説明しました。

## [](#next-steps)Next steps
次のステップ

-   [Tutorials](https://docs.fauna.com/fauna/current/tutorials/)
-   [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/)
-   [Drivers](https://docs.fauna.com/fauna/current/drivers/)
チュートリアル
Faunaのクエリ言語
ドライバー
Was this article helpful?

