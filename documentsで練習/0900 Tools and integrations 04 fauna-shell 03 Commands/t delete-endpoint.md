delete-endpoint | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint

# `delete-endpoint`

Deletes an endpoint entry from the configuration file.

設定ファイルからエンドポイントのエントリーを削除します。

terminal

```bash
fauna delete-endpoint ENDPOINT_ALIAS
```

## [](#description)Description

The `delete-endpoint` command deletes a specific endpoint entry from the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

delete-endpoint` コマンドは、[fauna-shell` 設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)から特定のエンドポイントエントリを削除します。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|_ENDPOINT_ALIAS_|The alias of the endpoint to be deleted.|

---

|引数|説明|
|--|--|
|_ENDPOINT_ALIAS_|削除するエンドポイントのエイリアスです。|

## [](#example)Example

For the following example, the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) contains an entry for the endpoint whose alias is `localhost`:

以下の例では、[fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config)に、エイリアスが `localhost` のエンドポイントのエントリがあります。

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

We then run `fauna delete-endpoint` to delete the endpoint whose alias is `localhost`.

次に、`fauna delete-endpoint` を実行して、エイリアスが `localhost` のエンドポイントを削除します。

shell

```shell
fauna delete-endpoint localhost
Are you sure you want to delete the 'localhost' endpoint? [y/n]: y
```

We can now see that the `localhost` endpoint entry is no longer in the `fauna-shell` configuration file.

これで、`localhost` エンドポイントのエントリが `fauna-shell` 設定ファイルになくなったことがわかります。

To see the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config), perform one of these steps:

[設定ファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)を見るには、以下の手順のいずれかを実行してください。

1.  On Linux, macOS, and other Unix-like operating systems, run the following command in a terminal:

Linux、macOS、その他のUnix系OSでは、ターミナルで次のコマンドを実行します。

    terminal
    
    ```bash
    cat $HOME/.fauna-shell
    ```

2.  On Windows, run the following command in a command terminal:

Windows の場合、コマンドターミナルで以下のコマンドを実行します。

    ```powershell
    type %userprofile%\.fauna-shell
    ```

The output should resemble:

次のような出力が得られます。

```ini
default=db2

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
-   [`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)
-   [`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
