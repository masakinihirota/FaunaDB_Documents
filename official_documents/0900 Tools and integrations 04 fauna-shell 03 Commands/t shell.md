shell | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/shell

# `shell`

Starts an interactive query shell.

インタラクティブなクエリシェルを起動します。

terminal

```bash
fauna shell [DBNAME]
```

## [](#description)Description

Starts an interactive query shell for sending queries to Fauna.

Fauna にクエリを送信するためのインタラクティブなクエリシェルを起動します。

## [](#arguments)Arguments

  
|Argument|Description|
|--|--|
|_DBNAME_|Optional - If supplied, the queries that you run are executed in the specified child database.|

---

|引数|説明|
|--|--|
|_DBNAME_|オプション - 指定した場合、実行したクエリは指定した子データベースで実行されます。|

## [](#options)Options

|Option|Description|
|--|--|
|`--domain=<domain>`|Optional - The Fauna server domain, that is, the hostname where Fauna is running. Defaults to `db.fauna.com`.|
|`--endpoint=<endpoint>`|Optional - The name of the endpoint to use for the command.|
|`--port=<port>`|Optional - The connection port. Defaults to 8443.|
|`--scheme=<scheme>`|Optional - The connection scheme. Must be one of `https` or `http`. Defaults to `https`.|
|`--secret=<secret>`|Optional - The secret to use. A secret [authenticates](https://docs.fauna.com/fauna/current/security/) your connection to Fauna, and connects you to a specific database.|
|`--timeout=<timeout>`|Optional - The connection timeout, an integer number of milliseconds. When the specified period has elapsed, `fauna-shell` stops waiting for a response and displays an error.<br><br>The default is zero, which means that `fauna-shell` waits until a response is received.|

---

|オプション|説明|
|--|--|
|`--domain=<domain>`|オプション - Fauna サーバーのドメイン、つまり、Fauna が動作しているホスト名。既定値は `db.fauna.com` です。|
|`--endpoint=<endpoint>`|オプション - コマンドに使用するエンドポイントの名前を指定します。|
|`--port=<port>`|オプション - 接続ポートです。デフォルトは8443です。|
|`--scheme=<scheme>`|オプション - 接続方式です。https`または`http`のいずれかでなければなりません。デフォルトは `https` です。|
|`--secret=<secret>`|オプション - 使用するシークレットです。秘密は、Faunaへの接続を[認証](https://docs.fauna.com/fauna/current/security/)し、特定のデータベースに接続するために使用します。|
|`--timeout=<timeout>`|オプション - 接続タイムアウトをミリ秒単位の整数で指定します。指定した時間が経過すると、`fauna-shell` は応答の待機を停止し、エラーを表示します。<br><br>デフォルトはゼロで、`fauna-shell` は応答を受信するまで待機します。|

## [](#example)Example

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Collections())
{ data: [ Collection("FirstCollection") ] }
```
