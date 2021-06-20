Logins for GitHub or Netlify users | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/login

# Logins for GitHub or Netlify users

GitHubまたはNetlifyユーザーのためのログイン

Currently, [Fauna Shell](https://docs.fauna.com/fauna/current/integrations/shell/) does not support GitHub or Netlify logins. If you signed up for Fauna using your GitHub or Netlify credentials, the [`fauna cloud-login`](https://docs.fauna.com/fauna/current/integrations/shell/cloud-login) command asks you for credentials that it cannot currently authenticate.

現在、[Fauna Shell](https://docs.fauna.com/fauna/current/integrations/shell/)は GitHub または Netlify のログインをサポートしていません。GitHub または Netlify の認証情報を使用して Fauna にサインアップした場合、[`fauna cloud-login`](https://docs.fauna.com/fauna/current/integrations/shell/cloud-login) コマンドは、現在認証できない認証情報を尋ねてきます。

Use the following steps to complete the authentication for Fauna Shell.

以下の手順で、Fauna Shell の認証を完了します。

1.  [Login to your Fauna account](https://dashboard.fauna.com/accounts/login).

[Login to your Fauna account](https://dashboard.fauna.com/accounts/login)を実行します。

2.  Decide whether to authenticate with an existing database, or create a new database.

既存のデータベースで認証するか、新しいデータベースを作成するかを決める。

    1.  For an existing database, click its name.

既存のデータベースの場合は、データベース名をクリックします。

    2.  For a new database:

新しいデータベースを作成する場合

        1.  Click the **NEW DATABASE** button.

NEW DATABASE**」ボタンをクリックします。

        2.  In the **New Database** form, specify a name for your database and press Return (or click **SAVE**).

**新規データベース** フォームで、データベースの名前を指定し、Returnを押します（または**SAVE**をクリックします）。

3.  In the left sidebar, click **SECURITY**.

左側のサイドバーで「**SECURITY**」をクリックします。

4.  Click the **NEW KEY** button.

**新キー**ボタンをクリックします。

5.  In the **New key** form, make sure that the **Database** field is set to `my_app`.

新しいキー**フォームで、**Database**フィールドが`my_app`に設定されていることを確認する。

6.  In the **New key** form, make sure that the **Role** field is set to `Admin`.

**New key** フォームで、**Role** フィールドが `Admin` に設定されていることを確認します。

7.  In the **New key** form, specify a name for your access key and press Return (or click **SAVE**).

**New key** フォームで、アクセスキーの名前を指定し、Returnを押します（または**SAVE**をクリックします）。

8.  Copy the key’s secret that appears near the top of the screen.

画面上部に表示されているキーのシークレットをコピーします。

    **IMPORTANT**
    The secret only appears once. If you lose it, the key must be revoked and a new key must be created.

**重要**
シークレットは一度しか表示されません。紛失した場合は、キーを無効にして新しいキーを作成する必要があります。

9.  In a terminal window, run:

ターミナルウィンドウで、次のように実行します。

    terminal

    ```bash
    fauna cloud-login
    ```

    ```done
    For email login, enter your email below, and then your password.
    For login with 3rd-party identity providers like Github or Netlify,
    please acquire a key from Home > [database] > Security and enter it
    below instead.

    メールでのログインの場合は、以下にメールを入力し、次にパスワードを入力します。
    Github や Netlify のようなサードパーティの ID プロバイダを使ってログインする場合。
    ホーム > [データベース] > セキュリティからキーを取得し、以下に入力してください。
    以下に入力してください。

    Email or secret key:
    電子メールまたは秘密鍵
    ```

    At the prompt, paste the key that you copied from the Shell, and press Return.

    プロンプトが表示されたら、シェルからコピーしたキーを貼り付けて、Returnを押します。

That’s it! You can now access the database that you created via Fauna Shell.

これで完了です。これで、Fauna Shellで作成したデータベースにアクセスできるようになりました。

See [Keys](https://docs.fauna.com/fauna/current/security/keys) and [Tokens](https://docs.fauna.com/fauna/current/security/tokens) for more details on authentication options.

認証オプションの詳細については、[Keys](https://docs.fauna.com/fauna/current/security/keys)および[Token](https://docs.fauna.com/fauna/current/security/tokens)を参照してください。

