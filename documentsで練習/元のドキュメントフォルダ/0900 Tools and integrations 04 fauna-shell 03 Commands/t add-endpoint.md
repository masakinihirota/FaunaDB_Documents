add-endpoint | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint

# `add-endpoint`

Adds a connection endpoint for Fauna.

Faunaの接続エンドポイントを追加します。

terminal

```bash
fauna add-endpoint ENDPOINT [--alias=endpoint alias] [--key=secret]
```

## [](#description)Description

説明

The `add-endpoint` command adds a connection endpoint for Fauna to the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config). If you don’t specify a key or alias, `fauna-shell` prompts you for them and then writes them to the `fauna-shell` configuration file.

`add-endpoint` コマンドは、[`fauna-shell` コンフィグレーションファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)に Fauna 用の接続エンドポイントを追加します。キーやエイリアスを指定しない場合、`fauna-shell` はそれらを求めるプロンプトを表示し、`fauna-shell` コンフィギュレーションファイルに書き込みます。

## [](#arguments)Arguments

引数

|Argument|Description|
|--|--|
|`ENDPOINT`|The URL of the endpoint that you want to add.<br><br>`fauna-shell` automatically identifies the URL’s `scheme`, `domain`, and `port`, and includes those values in the new endpoint entry that it creates within the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).|

---

|引数|説明|
|--|--|
|`ENDPOINT`|追加したいエンドポイントのURLです。<br><br>`fauna-shell` は URL の `scheme`, `domain`, `port` を自動的に識別し、これらの値を [設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) 内に作成する新しいエンドポイントエントリに含めます。|

## [](#options)Options

|Option|Description|
|--|--|
|`--alias=<endpoint alias>`|Optional - The endpoint alias, a name that identifies a particular endpoint.|
|`--key=<secret>`|Optional - The secret associated with a specific database at the endpoint, that provides the [authentication](https://docs.fauna.com/fauna/current/security/) to run queries in Fauna.|

---

|Option|Description|
|--|--|
|`--alias=<エンドポイント・エイリアス>`|Optional - エンドポイント・エイリアスは、特定のエンドポイントを識別するための名前です。|
|`--key=<secret>`|Optional - エンドポイントの特定のデータベースに関連付けられたシークレットで、Fauna でクエリを実行するための [authentication](https://docs.fauna.com/fauna/current/security/)を提供します。|

## [](#examples)Examples

The following example demonstrates adding a new endpoint. Since the `--alias` and `--key` options were not specified, `fauna-shell` prompts you for them:

次の例では，新しいエンドポイントを追加しています．オプションの `--alias` と `--key` が指定されていないので、`fauna-shell` がオプションの指定を求めてきます。

terminal

```bash
fauna add-endpoint https://db.fauna.com:8443
Endpoint Key: ******
Endpoint Alias [db.fauna.com]: db2
Endpoint 'db2' saved.
```

When the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) does not exist, running `fauna add-endpoint` automatically creates the configuration file.

`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config)が存在しない場合、`fauna add-endpoint`を実行すると、自動的にコンフィグレーションファイルが作成されます。

To see the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config), perform one of these steps:

[設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)を見るには、以下のいずれかの手順を実行してください。

1.  On Linux, macOS, and other Unix-like operating systems, run the following command in a terminal:

Linux、macOSなどのUnix系OSでは、ターミナルで以下のコマンドを実行します。

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
default=db2

[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET
```

When you run the `add-endpoint` command again, the new endpoint is added to the configuration file:

再度 `add-endpoint` コマンドを実行すると、新しいエンドポイントがコンフィギュレーションファイルに追加されます。

terminal

```bash
fauna add-endpoint http://localhost:8443/ --alias=localhost --key=secret
Endpoint 'localhost' saved.
```

```ini
default=db2

[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET

[localhost]
domain=127.0.0.1
port=8443
scheme=http
secret=secret
```

## [](#related)Related

-   [`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)

-   [`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)

-   [`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)

-   [Configuration](https://docs.fauna.com/fauna/current/integrations/shell/config)

