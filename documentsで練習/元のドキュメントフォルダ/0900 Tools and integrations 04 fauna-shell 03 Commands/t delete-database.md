delete-database | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/delete-database

# `delete-database`

Deletes a child database from the current database.

現在のデータベースから子データベースを削除します。

terminal

```bash
fauna delete-database DBNAME
```

## [](#description)Description

The `delete-database` command deletes a child database. If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

delete-database` コマンドは、子データベースを削除します。コマンドラインで何もオプションを渡さない場合、Fauna は [`fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) で指定されたデフォルトのオプションを使用します。

**WARNING**
This command deletes the database and all of its contents.

**警告**
このコマンドは、データベースとその内容をすべて削除します。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|_DBNAME_|The name of the database to delete.|

---

|引数|説明|
|--|--|
|_DBNAME_|削除するデータベースの名前|

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
|`--domain=<domain>`|Optional - The Fauna server domain, that is, the hostname where Fauna is running. Defaults to `db.fauna.com`.|
|`--endpoint=<endpoint>`|Optional - The name of the endpoint to use for the command.|
|`--port=<port>`|Optional - The connection port. Defaults to 8443.|
|`--scheme=<scheme>`|Optional - The connection scheme. Must be one of `https` or `http`. Defaults to `https`.|
|`--secret=<secret>`|Optional - The secret to use. A secret [authenticates](https://docs.fauna.com/fauna/current/security/) your connection to Fauna, and connects you to a specific database.|
|`--timeout=<timeout>`|Optional - The connection timeout, an integer number of milliseconds. When the specified period has elapsed, `fauna-shell` stops waiting for a response and displays an error.|The default is zero, which means that `fauna-shell` waits until a response is received.|

---

|オプション|説明|
|--|--|

## [](#examples)Examples

Assume that the current database has only one child database, `my_test_db`. To delete it, run:

現在のデータベースには、`my_test_db`という子データベースが一つだけあるとします。これを削除するには、次のように実行します。

shell

```shell
fauna delete-database my_test_db
deleting database 'my_test_db'
database 'my_test_db' deleted
```

To verify that the database was deleted, run `fauna shell` and query the list of child databases; you see that there are now none:

データベースが削除されたことを確認するために、`fauna shell` を実行して、子データベースのリストを照会します。

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Databases())
{ data: [] }
```

## [](#related)Related

-   [`create-database`](https://docs.fauna.com/fauna/current/integrations/shell/create-database)
-   [`list-databases`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)

