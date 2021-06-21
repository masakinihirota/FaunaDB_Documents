list-endpoints | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints

# `list-endpoints`

Lists the names of Fauna connection endpoints.

Faunaの接続エンドポイントの名前を一覧表示します。

terminal

```bash
fauna list-endpoints
```

## [](#description)Description

The `list-endpoints` command lists the names of all of the endpoints that you have configured in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

`list-endpoints`コマンドは、[`fauna-shell` コンフィグレーションファイル](https://docs.fauna.com/fauna/current/integrations/shell/config)で設定したすべてのエンドポイントの名前を一覧表示します。

## [](#arguments)Arguments

None.

## [](#options)Options

None.

## [](#example)Example

The [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) used in the following example contains entries for three endpoints: `localhost`, `cloud`, and `db2`. The default endpoint is `db2`.

以下の例で使用している [fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) には、3つのエンドポイントのエントリが含まれています。`localhost`, `cloud`, `db2` の 3 つのエンドポイントのエントリがあります。デフォルトのエンドポイントは `db2` です。

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

When you run the `list-endpoints` command, the names of these four endpoints are listed. Note that the default endpoint — `db2` — is indicated with an asterisk.

`list-endpoints`コマンドを実行すると、これら4つのエンドポイントの名前がリストアップされます。なお、デフォルトのエンドポイントである`db2`にはアスタリスクが付いています。

shell

```shell
fauna list-endpoints
localhost
cloud
db2 *
```

## [](#related)Related

-   [`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)
-   [`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)
-   [`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)

