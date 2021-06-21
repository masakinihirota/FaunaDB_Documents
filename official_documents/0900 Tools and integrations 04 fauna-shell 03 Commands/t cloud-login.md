cloud-login | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/cloud-login

# `cloud-login`

Creates a Fauna endpoint in the configuration file based on your Fauna credentials.

Faunaの認証情報に基づいて、設定ファイルにFaunaのエンドポイントを作成します。

terminal

```bash
fauna cloud-login
```

## [](#description)Description

説明

The `cloud-login` command prompts you for your Fauna credentials, and if you authenticate successfully, creates a `cloud` endpoint in the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) that you can use to query your top-level Fauna database.

cloud-login` コマンドは、Fauna の認証情報の入力を求めます。認証に成功すると、[設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)に `cloud` エンドポイントが作成され、トップレベルの Fauna データベースへの問い合わせに使用することができます。

You can provide a secret instead of an email address. When you do so, you are not prompted for a password, and a `cloud` endpoint is created in the configuration file that connects you to the database associated with the secret.

メールアドレスではなく、シークレットを指定することもできます。そうすると、パスワードの入力は求められず、設定ファイルに `cloud` エンドポイントが作成されて、そのシークレットに関連付けられたデータベースに接続されます。

When multi-factor authentication (MFA) is enabled for your account in the Dashboard, the `cloud-login` function asks you for the current (time-based) multi-factor authentication code — you can see the current code in your authenticator app. If you do not enter the correct code, `cloud-login` exits with an error.

ダッシュボードでアカウントの多要素認証（MFA）が有効になっている場合、`cloud-login`機能は現在の（時間ベースの）多要素認証コードの入力を求めます。現在のコードはauthenticatorアプリで確認できます。正しいコードを入力しないと、`cloud-login`はエラーで終了します。

If the `cloud` endpoint already exists when you run `cloud-login`, you are asked if you wish to overwrite the existing `cloud` endpoint configuration.

cloud-login`を実行したときに、`cloud`エンドポイントがすでに存在している場合は、既存の`cloud`エンドポイントの構成を上書きするかどうかを尋ねられます。

## [](#arguments)Arguments

引数

None.

## [](#options)Options

|Option|Description|
|--|--|
|`--domain=<domain>`|Optional - The Fauna server domain, that is, the hostname where Fauna is running. Defaults to `db.fauna.com`.|
|`--endpoint=<endpoint>`|Optional - The name of the endpoint to use for the command.|
|`--port=<port>`|Optional - The connection port. Defaults to 8443.|
|`--scheme=<scheme>`|Optional - The connection scheme. Must be one of `https` or `http`. Defaults to `https`.|
|`--secret=<secret>`|Optional - The secret to use. A secret [authenticates](https://docs.fauna.com/fauna/current/security/) your connection to Fauna, and connects you to a specific database.|
|`--timeout=<timeout>`|Optional - The connection timeout, an integer number of milliseconds. When the specified period has elapsed, `fauna-shell` stops waiting for a response and displays an error.|The default is zero, which means that `fauna-shell` waits until a response is received.

---

|オプション|説明|
|--|--|
|`--domain=<domain>`|Optional - Fauna サーバーのドメイン、つまり Fauna が動作しているホスト名です。デフォルトは `db.fauna.com` です。
|`--endpoint=<エンドポイント>`|Optional - コマンドに使用するエンドポイントの名前です。
|`--port=<port>`|Optional - 接続ポートです。デフォルトでは8443になります。
|`--scheme=<scheme>`|Optional - 接続のスキームです。https "または "http "のいずれかでなければなりません。デフォルトでは `https` となります。
|`--secret=<secret>`|Optional - 使用するシークレットです。秘密は、Fauna への接続を [認証](https://docs.fauna.com/fauna/current/security/) し、特定のデータベースに接続します。
|`--timeout=<timeout>`|Optional - 接続のタイムアウトをミリ秒単位の整数で指定します。|デフォルトは 0 で、`fauna-shell` は応答があるまで待ちます。

## [](#examples)Examples

The following example demonstrates the use of `cloud-login`, and the prompts for email/secret and password:

次の例では、`cloud-login`を使用して、email/secretとパスワードを入力するプロンプトを表示しています。

shell

```shell
fauna cloud-login
For email login, enter your email below, and then your password.
For login with 3rd-party identity providers like Github or Netlify,
please acquire a key from Dashboard > Security and enter it below
instead.

Email or secret key: <your email address>
Password: ***********
Enter your multi-factor authentication code: ******
```

After a successful login, your [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) now contains a `cloud` endpoint that includes the secret to access your top-level database.

ログインに成功すると，[設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)には，トップレベルのデータベースにアクセスするためのシークレットを含む`cloud`エンドポイントが含まれるようになります．

To see the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config), perform one of these steps:

[設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)を見るには、以下のいずれかの手順を実行します。

1.  On Linux, macOS, and other Unix-like operating systems, run the following command in a terminal:

Linux、macOS、およびその他のUnix系OSでは、ターミナルで次のコマンドを実行します。

    terminal
    
    ```bash
    cat $HOME/.fauna-shell
    ```
    
2.  On Windows, run the following command in a command terminal:

Windowsでは、コマンドターミナルで次のコマンドを実行します。

    ```powershell
    type %userprofile%\.fauna-shell
    ```
    

The configuration file should resemble:

設定ファイルは以下のようになります。

```ini
default=cloud

[cloud]
domain=db.fauna.com
scheme=https
secret=fnADS@PxN@2CE@n7z@kDa4_p6Z@fIBaZm@Qt@bYT
```

**NOTE**
Every secret provided by Fauna is unique, so the secret you see when you run `cloud-login` is guaranteed to differ from the one above. The secret above has been modified; it cannot be used to access a real database.

**注意**
Faunaが提供するシークレットはすべてユニークなので、`cloud-login`を実行したときに表示されるシークレットは上記のものとは異なることが保証されています。上記のシークレットは変更されているので、実際のデータベースへのアクセスには使用できません。

## [](#related)Related

-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

