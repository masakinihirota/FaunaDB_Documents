default-endpoint | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint

# `default-endpoint`

Sets a Fauna endpoint as the default.

Fauna のエンドポイントをデフォルトで設定します。

terminal

```bash
fauna default-endpoint ENDPOINT_ALIAS
```

## [](#description)Description

The `default-endpoint` command configures an endpoint to be the default.

default-endpoint`コマンドは、エンドポイントをデフォルトに設定します。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|_ENDPOINT_ALIAS_|The name of the endpoint to set as the default.|

---

|引数|説明|
|--|--|
|_ENDPOINT_ALIAS_|デフォルトとして設定するエンドポイントの名前です。|

## [](#example)Example

This [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) contains entries for three endpoints: `localhost`, `cloud`, and `db2`. `db2` is currently the default:

この [fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)には、3つのエンドポイントのエントリが含まれています。localhost`, `cloud`, `db2` の 3 つのエンドポイントのエントリがあります。現在、`db2` がデフォルトとなっています。

```ini
default=db2

[localhost]
domain=127.0.0.1
port=8443
scheme=http
secret=secret

[cloud]
domain=db.fauna.com
scheme=https
secret=fnADS@PxN@2CE@n7z@kDa4_p6Z@fIBaZm@Qt@bYT

[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET
```

Now, we run `fauna default-endpoint` to change the default endpoint to `localhost`:

次に、`fauna default-endpoint` を実行して、デフォルトのエンドポイントを `localhost` に変更します。

shell

```shell
fauna defaut-endpoint localhost
Endpoint 'localhost' set as default endpoint.
```

The contents of the configuration file now confirm that the default endpoint has changed to `localhost`.

これで、設定ファイルの内容から、デフォルトのエンドポイントが「localhost」に変更されたことが確認できました。

To see the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config), perform one of these steps:

[設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)を見るには、以下のいずれかの手順を実行してください。

1.  On Linux, macOS, and other Unix-like operating systems, run the following command in a terminal:

Linux、macOS、その他のUnix系OSでは、ターミナルで以下のコマンドを実行します。

    terminal
    
    ```bash
    cat $HOME/.fauna-shell
    ```

2.  On Windows, run the following command in a command terminal:

Windows の場合、コマンドターミナルで以下のコマンドを実行します。

    ```powershell
    type %userprofile%\.fauna-shell

The output should resemble:

次のような出力が得られます。

```ini
default=localhost

[localhost]
domain=127.0.0.1
port=8443
scheme=http
secret=secret

[cloud]
domain=db.fauna.com
scheme=https
secret=fnADS@PxN@2CE@n7z@kDa4_p6Z@fIBaZm@Qt@bYT

[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET
```

## [](#related)Related

-   [`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)
-   [`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)
-   [`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)

