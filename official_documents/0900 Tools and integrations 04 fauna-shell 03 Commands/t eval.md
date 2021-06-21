eval | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/eval

# `eval`

Runs the specified query.

指定されたクエリを実行します。

terminal

```bash
fauna eval QUERY
```

## [](#description)Description

The `eval` command runs the query that you specify. The query can be read from STDIN, a file, or the command line. The query results can be output to STDOUT or a file, and you can specify the output format.

eval` コマンドは、指定されたクエリを実行します。クエリは、STDIN、ファイル、またはコマンドラインから読み込むことができます。クエリの結果は、STDOUTまたはファイルに出力され、出力フォーマットを指定することができます。

If you don’t pass any options at the command line, Fauna uses the options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

コマンドラインで何もオプションを渡さなかった場合、Fauna は [`fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config) で指定されたオプションを使用します。

## [](#arguments)Arguments

  

|Argument|Description|
|--|--|
|_QUERY_|The query that you want to execute.|

---

|引数|説明|
|--|--|
|_QUERY_|実行したいクエリを指定します。|

## [](#options)Options

|Option|Description|
|--|--|
|`--domain=<domain>`|Optional - The Fauna server domain, that is, the hostname where Fauna is running. Defaults to `db.fauna.com`.|
|`--endpoint=<endpoint>`|Optional - The name of the endpoint to use for the command.|
|`--port=<port>`|Optional - The connection port. Defaults to 8443.|
|`--scheme=<scheme>`|Optional - The connection scheme. Must be one of `https` or `http`. Defaults to `https`.|
|`--secret=<secret>`|Optional - The secret to use. A secret [authenticates](https://docs.fauna.com/fauna/current/security/) your connection to Fauna, and connects you to a specific database.|
|`--timeout=<timeout>`|Optional - The connection timeout, an integer number of milliseconds. When the specified period has elapsed, `fauna-shell` stops waiting for a response and displays an error.|The default is zero, which means that `fauna-shell` waits until a response is received.|
|`--file=<file>`|Optional - The file to read the query (or queries) from.|
|`--format=<format>`|Optional - The output format. Must be one of:|-   `json`: JSON format.|    |-   `shell`: Fauna Shell format, a JavaScript-based notation that is aware of Fauna data types.|    |The default is `json`.|

---

|オプション|説明|
|--|--|
|`--domain=<domain>`|Optional - Fauna サーバーのドメイン、つまり、Fauna が動作しているホスト名。既定値は `db.fauna.com` です。|
|`--endpoint=<エンドポイント>`|Optional - コマンドに使用するエンドポイントの名前です。|
|`--port=<port>`|Optional - 接続ポートです。デフォルトでは8443になります。|
|`--scheme=<scheme>`|Optional - 接続のスキームです。https "または "http "のいずれかでなければなりません。デフォルトでは `https` となります。|
|`--secret=<secret>`|Optional - 使用するシークレットです。秘密は、Fauna への接続を [認証](https://docs.fauna.com/fauna/current/security/) し、特定のデータベースに接続します。|
|`--timeout=<timeout>`|Optional - 接続のタイムアウトをミリ秒単位の整数で指定します。デフォルトは 0 で、`fauna-shell` は応答があるまで待ちます。|
|`--file=<file>`|Optional - クエリを読み込むファイルです。|
|`--format=<format>`|オプション - 出力形式です。以下のいずれかでなければなりません。<br>`json`:JSON形式です。<br>`shell`:Fauna Shell 形式。Faunaデータタイプを意識したJavaScriptベースの記法。<br>デフォルトは `json` です。|

## [](#examples)Examples

1.  The following invocation shows running a query passed as an argument:

次の呼び出しは、引数として渡されたクエリの実行を示しています。

    shell

    ```shell
    fauna eval "Paginate(Collections())"
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]}
    ```

2.  The following invocation shows running a query that exists in a file. The query in the file is identical to the previous example:

次の呼び出しは、ファイルに存在するクエリを実行する様子を示しています。ファイル内のクエリは、前の例と同じです。

    shell

    ```shell
    fauna eval --file=./query.fql
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]}
    ```

3.  The following invocation shows passing a query via STDIN:

次の呼び出しは，STDIN経由でクエリを渡す例です。

    shell

    ```shell
    echo "Paginate(Collections())" | fauna eval --stdin
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]
    ```

4.  The following invocation shows sending query output to a file:

次の呼び出しは，クエリの出力をファイルに送信するものです。

    shell

    ```shell
    fauna eval "Paginate(Collections())" --output=./output.json
    ```

    shell

    ```shell
    cat ./output.json
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]
    ```

5.  The following invocation shows sending query output to a file in Fauna Shell format:

次の呼び出しは、Fauna Shell フォーマットでクエリ出力をファイルに送信する例です。

    shell

    ```shell
    fauna eval "Paginate(Collections())" --format=shell --output=./output.json
    ```

    shell

    ```shell
    cat ./output.json
    { data: [ Collection("FirstCollection") ] }
    ```
