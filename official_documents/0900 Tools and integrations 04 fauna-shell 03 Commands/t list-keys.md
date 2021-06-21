list-keys | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/list-keys

# `list-keys`

Lists the keys that exist in the current database.

現在のデータベースに存在するキーを一覧表示します。

terminal

```bash
fauna list-keys
```

## [](#description)Description

The `list-keys` command lists the keys that you have created in the current database, which can include keys for the current database or its child databases.

list-keys` コマンドは、現在のデータベースに作成したキーをリストアップします。このリストには、現在のデータベースまたはその子データベースのキーを含めることができます。

If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

コマンドラインで何もオプションを渡さない場合、Fauna は [`fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) で指定されたデフォルトのオプションを使用します。

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
|`--endpoint=<エンドポイント>`|オプション - コマンドに使用するエンドポイントの名前です。|
|`--port=<port>`|オプション - 接続ポートです。デフォルトでは8443になります。|
|`--scheme=<scheme>`|オプション - 接続のスキームです。https "または "http "のいずれかでなければなりません。デフォルトでは `https` となります。|
|`--secret=<secret>`|オプション - 使用するシークレットです。秘密は、Fauna への接続を [認証](https://docs.fauna.com/fauna/current/security/) し、特定のデータベースに接続します。|
|`--timeout=<timeout>`|オプション - 接続タイムアウトをミリ秒単位の整数で指定します。指定された時間が経過すると、fauna-shell は応答の待機を停止し、エラーを表示します。<br><br>デフォルトはゼロで、これはfauna-shellが応答を受信するまで待つことを意味します。|

## [](#arguments)Arguments

None.

## [](#options)Options

None.

## [](#example)Example

For the purpose of this example, let’s assume that you have previously created some keys. We can display that list with `fauna list-keys`:

この例では、以前にいくつかのキーを作成したと仮定します。その一覧を表示するには、`fauna list-keys`とします。

shell

```shell
fauna list-keys
listing keys
Key ID               Database             Role
259718958404338186   app1                 server
259719743570706945   app1                 client
265528117038154259   my-test-db           admin
265437820880945683   my_test_db           admin
```

You can verify the existence of these keys from the shell:

これらのキーの存在は、シェルから確認することができます。

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Keys())
{
  data: [
    Ref(Keys(), "259718958404338186"),
    Ref(Keys(), "259719743570706945"),
    Ref(Keys(), "265437820880945683"),
    Ref(Keys(), "265528117038154259")
  ]
}
```

The numeric identifiers in each key’s [reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) matches up with the `Key ID` column in the `list-keys` output.

各キーの[reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)にある数字の識別子は、`list-keys`の出力にある`Key ID`列と一致しています。

## [](#related)Related

-   [`create-key`](https://docs.fauna.com/fauna/current/integrations/shell/create-key)
-   [`delete-key`](https://docs.fauna.com/fauna/current/integrations/shell/delete-key)
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)

