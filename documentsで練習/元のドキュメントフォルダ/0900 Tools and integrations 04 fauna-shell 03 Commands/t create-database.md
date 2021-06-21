create-database | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/create-database

# `create-database`

Creates a child database in the current database.

現在のデータベースに子データベースを作成します。

terminal

```bash
fauna create-database DBNAME
```

## [](#description)Description

説明

The `create-database` command creates a child database within the current database, with the name that you specify. If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

create-database` コマンドは、現在のデータベースの中に、指定した名前の子データベースを作成します。コマンドラインで何もオプションを渡さない場合、Fauna は [`fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) で指定されたデフォルトのオプションを使用します。

## [](#arguments)Arguments

引数
  

|Argument|Description|
|--|--|
|_DBNAME_|The name of the child database that you are creating.|

---

|引数|説明|
|--|--|
|_DBNAME_|作成している子データベースの名前。|

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

|Option|Description|
|--|--|
|`--domain=<domain>`|Optional - Fauna サーバーのドメイン、つまり Fauna が動作しているホスト名です。デフォルトは `db.fauna.com` です。|
|`--endpoint=<エンドポイント>`|Optional - コマンドに使用するエンドポイントの名前です。|
|`--port=<port>`|Optional - 接続ポートです。デフォルトでは8443になります。|
|`--scheme=<scheme>`|Optional - 接続のスキームです。https "または "http "のいずれかでなければなりません。デフォルトでは `https` となります。|
|`--secret=<secret>`|Optional - 使用するシークレットです。秘密は、Fauna への接続を [認証](https://docs.fauna.com/fauna/current/security/) し、特定のデータベースに接続します。|
|`--timeout=<timeout>`|Optional - 接続のタイムアウトをミリ秒単位の整数で指定します。|デフォルトは 0 で、`fauna-shell` は応答があるまで待ちます。|

## [](#examples)Examples

Create a database called `my-test-db`:

my-test-db`というデータベースを作成します。

shell

```shell
fauna create-database my-test-db
creating database my-test-db

  created database 'my-test-db'

  To start a shell with your new database, run:

  fauna shell 'my-test-db'

  Or, to create an application key for your database, run:

  fauna create-key 'my-test-db'
```

Now, when you run `fauna shell` and query for a list of databases, you can see that the new child database `my-test-db` is listed:

これで、`fauna shell`を実行してデータベースのリストを照会すると、新しい子データベース `my-test-db` がリストアップされているのがわかります。

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Databases())
{
  data: [
    Database("my-test-db")
  ]
}
```

## [](#related)Related

-   [`list-databases`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)
    
-   [`delete-database`](https://docs.fauna.com/fauna/current/integrations/shell/delete-database)
    
