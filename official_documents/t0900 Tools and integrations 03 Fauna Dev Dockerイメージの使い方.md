Fauna Dev | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/dev

# Fauna Dev

Fauna Dev is a Docker image that runs a single Fauna node,
with GraphQL support,
in your own environment for development and testing purposes.

Docker イメージの使い方
開発やテスト目的の環境で使えます。

NOTE
We do not license or support use of Fauna Dev multi-node clusters.

マルチクラスターモードはサポートしてません。

This section includes the following topics:

この章での話題

- [Requirements](#requirements)
- [Installation](#install)
- [Ports](#ports)
- [Run](#run)

## [](#requirements)Requirements

必要条件

Fauna Dev has the following requirements:

- [Docker](https://www.docker.com/)
- CPU: (minimum) Dual-core, x86 CPU running at 2GHz.
- Memory: (minimum) 8GB RAM (physical).
- Storage: Local, block-based storage device (SSD, hard disk, EBS, iSCSI).
  Network file systems, such as CIFS or NFS, are not supported.

## [](#install)Installation

インストール

1.  **Pull the latest Docker container**:

terminal

```bash
docker pull fauna/faunadb:latest
```

2.  **Verify that the container executes correctly**:

terminal

```bash
docker run fauna/faunadb --help
```

下記が表示される

```
FaunaDB Enterprise Docker Image

Options:
--help               Print this message and exit.
--init               Initialize the node (default action).
--no-init            Doesn't initialize the node.
--join host[:port]   Join a cluster through an active node specified in host and port.
--config <path>      Specify a custom config file. Should be accessible inside the docker image.
```

## [](#ports)Ports

ポート

When you run Fauna Dev, you have to expose the ports for the services running inside the Docker container so that your system can access them.

Fauna Dev を実行する場合、システムがアクセスできるように、Docker コンテナー内で実行されているサービスのポートを公開する必要があります。

The port most commonly used for the Fauna Dev database service, as used in examples on this page, is 8443.

このページの例で使用されているように、Fauna Dev データベース サービスで最も一般的に使用されるポートは 8443 です。

The port most commonly used for the GraphQL API is 8084. This means that the [GraphQL endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints) would be:

GraphQL API で最も一般的に使用されるポート は 8084 です。これは、GraphQL エンドポイントが次のようになることを意味します。

- [http://localhost:8084/import](http://localhost:8084/import)
- [http://localhost:8084/graphql](http://localhost:8084/graphql)

ヒント
The Docker container’s database service
and GraphQL endpoints are HTTP services
that run without certificates installed;

make sure that your client code uses the
`http` scheme when making connections.

certificates
証明書

make sure
確認してください

scheme
プログラム

Docker コンテナのデータベースサービスと GraphQL エンドポイントは、
証明書がインストールされていない状態で実行される HTTP サービスです。

http 接続時にクライアントコードがスキームを使用していることを確認してください。

If you adjust the Docker invocations to use different ports,
ensure that your client programs use the ports that you specify.

invocations
起動

ensure
確認する

specify
指定する

別のポートを使用するように Docker 呼び出しを調整する場合は、
クライアントプログラムが指定したポートを使用していることを確認してください。

The `docker` command’s `-p` option lets you specify a mapping from your host computer’s to the container’s ports, using the syntax `hostPort:containerPort`.

docker コマンドの-p オプションは、構文を使用して、コンテナのポートにホストコンピュータのからのマッピングを指定することができます hostPort:containerPort。

`hostPort` and `containerPort` can be a single port number, or a range expressed as `low-high`.

`hostPort`と`containerPort`には、1 つのポート番号を指定するか、`low-high`で表される範囲を指定します。

For example, to connect your host computer’s port 1234 to the container’s port 6789, you would use `-p 1234:6789`.

たとえば、ホスト コンピューターのポート 1234 をコンテナーのポート 6789 に接続するには、

`-p 1234:6789`

See the [Docker docs](https://docs.docker.com/engine/reference/run/#expose-incoming-ports) for more information.

詳細については、Docker のドキュメントを参照して ください。

## [](#run)Run

There are several approaches to running Fauna Dev with Docker:

Docker で Fauna Dev を実行するには、いくつかのアプローチがあります。

1.  As a single developer node, with ephemeral data:

    一時データを使用する単一の開発者ノードとして:

ephemeral
一時的（エフェメラル）

```bash
docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 fauna/faunadb
```

This command starts a Fauna Dev node and initializes the single-node cluster.

このコマンドは、Fauna Dev ノードを開始し、単一ノード クラスターを初期化します。

重要
Using this invocation,
when the Docker container is stopped/killed,
all of the data it contains is lost.

この呼び出しを使用すると、
Docker コンテナーが停止または強制終了されると、
そこに含まれるすべてのデータが失われます。

This can be very useful for testing,
where the database starts with a known state.

これは、
データベースが既知の状態で開始されるテストに非常に役立ちます。

2.  As a single developer node, with persisted data:

単一の開発者ノードとして、永続化されたデータを使用する場合:

```bash
docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 \
-v <host-directory or named-volume>:/var/lib/faunadb \
fauna/faunadb
```

This command starts Fauna Dev with a specified folder or volume bound to the Docker container data folder.

このコマンドは、指定されたフォルダーまたはボリュームを Docker コンテナー データ フォルダーにバインドして Fauna Dev を起動します。

When the Docker container is stopped/killed, all of your data is maintained in the specified folder/volume.

Docker コンテナが停止/強制終了されると、
すべてのデータは指定されたフォルダー/ボリュームに保持されます。

3.  As a single developer node, with persisted data and logs:
    永続化されたデータとログを備えた単一の開発者ノードとして:

persisted
永続

terminal

```bash
docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 \
-v <host-directory or named-volume>:/var/lib/faunadb \
-v <host-directory>:/var/log/faunadb \
fauna/faunadb
```

This command starts Fauna Dev,
binding a local folder/volume to the Docker container’s data folder,
and another local folder/volume to the Docker container’s log folder.

このコマンドは FaunaDev を開始し、
ローカルフォルダー/ボリュームを
Docker コンテナーのデータフォルダーにバインドし、
別のローカルフォルダー/ボリュームを
Docker コンテナーのログフォルダーにバインドします。

When the Docker container is stopped/killed,
all of your data and logs are maintained in the specified folders/volumes.

Docker コンテナーが停止または強制終了されると、
すべてのデータとログが指定されたフォルダー/ボリュームに保持されます。

4.  With managed configuration:
    管理された構成の場合:

```bash
docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 \
-v <host-directory or named-volume>:/var/lib/faunadb \
-v <host-directory>:/var/log/faunadb \
-v <path-to-config-file>:/etc/faunadb.yml \
fauna/faunadb
--config /etc/faunadb.yml
```

This command starts Fauna Dev with path binds for the data,
log, and configuration file,
as well as specifying that the non-default configuration should be used.

このコマンドは、データ、ログ、
および構成ファイルのパスバインドを使用して FaunaDev を開始し、
デフォルト以外の構成を使用するように指定します。

Here is an example configuration file.
Adjust the configuration as appropriate:

構成ファイルの例を次に示します。必要に応じて構成を調整します。

```yaml
---
auth_root_key: secret
cluster_name: fauna
storage_data_path: /var/lib/faunadb
log_path: /var/log/faunadb
shutdown_grace_period_seconds: 0
network_listen_address: 172.17.0.2
network_broadcast_address: 172.17.0.2
network_admin_http_address: 172.17.0.2
network_coordinator_http_address: 172.17.0.2
```

We do not provide documentation for the configuration
because we do not license Fauna for on-premise production use.

on-premise
業務用の、店舗用の

Fauna はオンプレミスの本番環境で使用するライセンスを取得していないため、構成に関するドキュメントは提供していません。
