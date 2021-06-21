delete-key | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/delete-key

# `delete-key`

Deletes a key.

キーを削除します。

terminal

```bash
fauna delete-key KEYNAME
```

## [](#description)Description

The `delete-key` command deletes a key.

delete-key` コマンドは、キーを削除します。

If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

コマンドラインで何もオプションを渡さない場合、Fauna は [`fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) で指定されたデフォルトのオプションを使用します。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|_KEYNAME_|The name of the key to delete.|

---

|引数|説明|
|--|--|
|_KEYNAME_|削除するキーの名前です。|

## [](#options)Options

|Option|Description|
|--|--|
|`--domain=<domain>`|Optional - The Fauna server domain, that is, the hostname where Fauna is running. Defaults to `db.fauna.com`.|
|`--endpoint=<endpoint>`|Optional - The name of the endpoint to use for the command.|
|`--port=<port>`|Optional - The connection port. Defaults to 8443.|
|`--scheme=<scheme>`|Optional - The connection scheme. Must be one of `https` or `http`. Defaults to `https`.|
|`--secret=<secret>`|Optional - The secret to use. A secret [authenticates](https://docs.fauna.com/fauna/current/security/) your connection to Fauna, and connects you to a specific database.|
|`--timeout=<timeout>`|Optional - The connection timeout, an integer number of milliseconds. When the specified period has elapsed, `fauna-shell` stops waiting for a response and displays an error.|The default is zero, which means that `fauna-shell` waits until a response is received.|

---

|オプション|説明|
|--|--|
|`--domain=<domain>`|Optional - Fauna サーバーのドメイン、つまり、Fauna が動作しているホスト名。既定値は `db.fauna.com` です。|
|`--endpoint=<エンドポイント>`|Optional - コマンドに使用するエンドポイントの名前です。|
|`--port=<port>`|Optional - 接続ポートです。デフォルトでは8443になります。|
|`--scheme=<scheme>`|Optional - 接続のスキームです。https "または "http "のいずれかでなければなりません。デフォルトでは `https` となります。|
|`--secret=<secret>`|Optional - 使用するシークレットです。秘密は、Fauna への接続を [認証](https://docs.fauna.com/fauna/current/security/) し、特定のデータベースに接続します。|
|`--timeout=<timeout>`|Optional - 接続のタイムアウトをミリ秒単位の整数で指定します。デフォルトは 0 で、`fauna-shell` は応答があるまで待機します。|

## [](#example)Example

For this example, we already have 4 keys:

この例では、すでに4つのキーがあります。

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

Now, delete the first key in the list:

では、リストの最初のキーを削除します。

shell

```shell
fauna delete-key 259718958404338186
deleting key 259718958404338186
key 259718958404338186 deleted
```

When you list the keys again, you see that the key you deleted is now gone:

再びキーをリストアップすると、削除したキーがなくなっていることがわかります。

shell

```shell
fauna list-keys
listing keys
Key ID               Database             Role
259719743570706945   app1                 client
265528117038154259   my-test-db           admin
265437820880945683   my_test_db           admin
```

## [](#related)Related

-   [`list-keys`](https://docs.fauna.com/fauna/current/integrations/shell/list-keys)
-   [`create-key`](https://docs.fauna.com/fauna/current/integrations/shell/create-key)
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
