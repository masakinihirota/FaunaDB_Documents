create-key | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/create-key

# `create-key`

Creates a key for the specified child database.

指定された子データベースのキーを作成します。

terminal

```bash
fauna create-key DBNAME [ROLE]
```

## [](#description)Description

The `create-key` command creates a key to allow access to the specified child database. When you create the key, you have the option to assign it a role: `admin`, `server`, `server-readonly`, `client` or a user-defined ABAC role name. If you don’t specify a role, it defaults to `admin`.

create-key`コマンドは、指定した子データベースへのアクセスを許可するキーを作成します。鍵を作成する際には、`admin`、`server`、`server-readonly`、`client`、またはユーザが定義したABACロール名のいずれかのロールを割り当てることができます。ロールを指定しない場合、デフォルトでは `admin` が割り当てられます。

If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

コマンドラインで何もオプションを渡さない場合、Fauna は [`fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) で指定されたデフォルトのオプションを使用します。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|_DBNAME_|The name of the database you’re creating a key for.|
|_ROLE_|Optional - The key’s role. One of admin, server, server-readonly, client, or an ABAC user-defined role. Defaults to `admin`.|

---

|引数|説明|
|--|--|
|_DBNAME_|キーを作成するデータベースの名前です。|
|_ROLE_|Optional - キーの役割です。admin、server、server-readonly、client、またはABACユーザ定義のロールのうちの1つです。デフォルトは`admin`です。|

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

|Option|Description|
|--|--|
|`--domain=<domain>`|Optional - Fauna サーバーのドメイン、つまり Fauna が動作しているホスト名です。デフォルトは `db.fauna.com` です。
|`--endpoint=<エンドポイント>`|Optional - コマンドに使用するエンドポイントの名前です。
|`--port=<port>`|Optional - 接続ポートです。デフォルトでは8443になります。
|`--scheme=<scheme>`|Optional - 接続のスキームです。https "または "http "のいずれかでなければなりません。デフォルトでは `https` となります。
|`--secret=<secret>`|Optional - 使用するシークレットです。秘密は、Fauna への接続を [認証](https://docs.fauna.com/fauna/current/security/) し、特定のデータベースに接続します。
|`--timeout=<timeout>`|Optional - 接続のタイムアウトをミリ秒単位の整数で指定します。デフォルトは 0 で、`fauna-shell` は応答があるまで待機します。

## [](#example)Example

For the purpose of this example, we have created a database called `my_test_db`.

この例では、`my_test_db`という名前のデータベースを作成しています。

shell

```shell
fauna list-databases
listing databases
my_test_db
```

Now we run `fauna create-key` to create a key for `my_test_db`. Because we are not specifying a role, the key’s role defaults to `admin`.

次に、`fauna create-key` を実行して、`my_test_db` のキーを作成します。ロールを指定していないので、キーのロールはデフォルトで `admin` になります。

shell

```shell
fauna create-key my-test-db
creating key for database 'my-test-db' with role 'admin'
  created key for database 'my-test-db' with role 'admin'.
  secret: fnADr1hqZfACE6CB88ic1TO355X8uhrxx6_ES1VX

  To access 'my-test-db' with this key, create a client using
  the driver library for your language of choice using
  the above secret.
```

Now, you can run `fauna shell` and query for a list of keys, which yields these keys.

ここで、`fauna shell`を実行して、キーのリストを照会すると、これらのキーが得られます。

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

If you then run the command to derive a key from a secret, you see that the key derived corresponds to the last key in the list of four keys above and is associated with the database `my-test-db`.

次に、シークレットからキーを導出するコマンドを実行すると、導出されたキーは、上記の4つのキーのリストの最後のキーに対応し、データベース `my-test-db` に関連付けられていることがわかります。

shell

```shell
fauna shell
> KeyFromSecret("fnADr1hqZfACE6CB88ic1TO355X8uhrxx6_ES1VX")
{
  ref: Ref(Keys(), "265528117038154259"),
  ts: 1589486195555000,
  database: Database("my-test-db"),
  role: 'admin',
  hashed_secret: '$2a$05$nyZcKbL6kiUiIyAoAH5TeeqQS2ka5sb4LHAmD2.iQ8G9F5j0ENww2'
}
```

## [](#related)Related

-   [`list-keys`](https://docs.fauna.com/fauna/current/integrations/shell/list-keys)
    
-   [`delete-key`](https://docs.fauna.com/fauna/current/integrations/shell/delete-key)
    
-   [Configuration](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

