Configuration | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/config

# Configuration

コンフィギュレーション

The configuration for `fauna-shell` is an [INI-format file](https://en.wikipedia.org/wiki/INI_file) that stores the configuration for _endpoints_. An endpoint specifies the domain, secret, and other options that can be used to run queries against any Fauna instance within the database associated with the secret.

`fauna-shell` の設定は [INI-format file](https://en.wikipedia.org/wiki/INI_file) で、_endpoint_ の設定を格納しています。エンドポイントは、ドメイン、シークレット、その他のオプションを指定し、シークレットに関連付けられたデータベース内の任意の Fauna インスタンスに対してクエリを実行するために使用されます。

For Linux, macOS, and other UNIX-like systems, the configuration file is located in `$HOME/.fauna-shell`. For Windows, the configuration file is located in `%userprofile%\.fauna-shell`.

Linux、macOS、その他のUNIX系システムでは、設定ファイルは `$HOME/.fauna-shell` にあります。Windowsでは、設定ファイルは `%userprofile%%.fauna-shell` にあります。

A configuration file that defines multiple endpoints that would connect to a variety of Fauna instances might look like:

様々な Fauna インスタンスに接続するための複数のエンドポイントを定義する設定ファイルは次のようになります。

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

Summary of INI configuration:

INI設定の概要です。

-   Each section, identified by the square brackets, provides the name for an endpoint — called an endpoint alias — and lists the properties that provide the endpoint’s configuration.

- 角括弧で囲まれた各セクションでは、エンドポイントの名前（エンドポイント・エイリアスと呼ばれます）と、そのエンドポイントの設定を行うプロパティの一覧が示されています。

-   A property uses the format `name=value`, which specifies the name of a property and its configured value.

- プロパティは、`name=value`という形式で、プロパティの名前とその構成値を指定します。

-   When a property name is re-used in a section, the last definition is used.

- プロパティの名前がセクション内で再利用される場合は、最後の定義が使用されます。

## [](#global-properties)Global properties

グローバルプロパティ

|Configuration key|Description|
|--|--|
|`default=<endpoint alias>`|Optional - Specifies the default endpoint to use when one is not specified with `--endpoint`. If `default` does not exist in the configuration file, and `--endpoint` is not used, an error occurs.|

|設定キー|説明文|
|--|--|
|`default=<endpoint alias>`|オプション - `--endpoint` で指定されていない場合に使用するデフォルトのエンドポイントを指定します。設定ファイルに `default` が存在せず、`--endpoint` が使用されていない場合は、エラーになります。|

## [](#endpoint-specific-properties)Endpoint-specific properties

エンドポイント固有の特性

|Property|Description|
|--|--|
|`domain=<Fauna hostname>`|Optional - The hostname of this endpoint’s Fauna instance. Defaults to `db.fauna.com`.|
|`scheme=<scheme>`|Optional - One of `https` or `http`. Defaults to `https`.|
|`port=<port>`|Optional - The UNIX port number of this endpoint’s Fauna instance. Defaults to 443.|
|`secret=<secret>`|The secret for a specific database.|

---

|\プロパティ|説明|
|--|--|
|`domain=<Fauna hostname>`|Optional - このエンドポイントの Fauna インスタンスのホスト名です。既定値は `db.fauna.com` です。|
|`scheme=<scheme>`|Optional - `https` または `http` のいずれかです。既定値は `https` です。|
|`port=<port>`|Optional - このエンドポイントの Fauna インスタンスの UNIX ポート番号を指定します。既定値は443です。|
|`secret=<secret>`|特定のデータベースのシークレットを指定します。|

The list of properties is not strictly enforced; additional properties can be included to help differentiate between endpoints, but these properties have no effect in `fauna-shell`.

プロパティのリストは厳密には強制されません。エンドポイントを区別するために追加のプロパティを含めることができますが、これらのプロパティは `fauna-shell` では何の効果もありません。

