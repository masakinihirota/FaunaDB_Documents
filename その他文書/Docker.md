# How to use the FaunaDB public Docker image.

# FaunaDB 公開 Docker イメージの使い方。

This document will walk through creating a FaunaDB docker instance using the publicly available docker image. Three different types of deployments will be illustrated.

illustrate
ーを説明する


このドキュメントでは、公開されている docker イメージを使って FaunaDB の docker インスタンスを作成する方法を説明します。3 つの異なるタイプのデプロイメントを説明します。

- A single node FaunaDB - basic developer functionality.
- A three node, single replica instance of FaunaDB - scale out operations.
- A three node, three replicas instance of FaunaDB - distributed operations.

- シングルノードの FaunaDB - 開発者向けの基本機能。
- 3つのノード、1つのレプリカを持つ FaunaDB インスタンス - スケールアウト運用。
- 3つのノード、3つのレプリカを持つ FaunaDB のインスタンス - 分散型の運用。

Finally, we will wrap up with some more general documentation around the various options available when using the public docker image.

wrap up
要約する、まとめる、まとめ上げる、仕上げる、締めくくる
・It took a long time for us to wrap up the project.：われわれがそのプロジェクトを完成させるのに時間がかかった。

最後に、公開されている docker イメージを使用する際に利用できるさまざまなオプションについて、より一般的な説明を行います。

## Requirements

要件

To use the FaunaDB Docker image familiarity with Docker and Docker 17.06.0-ce or higher are required. Additionally, if multi-node deployments are planned, sufficient resources will need to be allocated to the Docker environment. These example work flows were run, on a MacBook Pro with quad-core i7 and 16 GB of RAM. Of those resources, 8 virtual cores and 12 GB of RAM were allocated to Docker.

FaunaDB の Docker イメージを使用するには、Docker と Docker 17.06.0-ce 以降に精通している必要があります。また、複数ノードの導入を予定している場合は、Docker 環境に十分なリソースを割り当てる必要があります。これらのワークフロー例は、クアッドコアの i7 と 16GB の RAM を搭載した MacBook Pro 上で実行されました。これらのリソースのうち、8 つの仮想コアと 12GB の RAM が Docker に割り当てられています。

## How to use

### Pull Docker Image

To get the public docker image of FaunaDB, simply run:

FaunaDB のパブリックな Docker イメージを取得するには、単純に次のように実行します。

```bash
$ docker pull fauna/faunadb:<version>
```

replace `<version>` with a specific FaunaDB version if required. When `:<version>` is omitted the latest version will be downloaded.

`<version>` は必要に応じて特定の FaunaDB バージョンに置き換えてください。:<version>` が省略された場合は、最新バージョンがダウンロードされます。

Results should look similar to this:

結果はこれに似たようなものに見えるでしょう。

結果は以下のようになります。

```bash
$ docker pull fauna/faunadb
Using default tag: latest
latest: Pulling from fauna/faunadb
802b00ed6f79: Pull complete
7a488f14a4a3: Pull complete
1a0452bba0d5: Pull complete
d4eeb2c6934d: Pull complete
b529c6e09405: Pull complete
553a9f92f9b7: Pull complete
399442b34a2b: Pull complete
f161ef4496c1: Pull complete
fcd16b1776f2: Pull complete
13d895f5384e: Pull complete
447ade30dbbd: Pull complete
Digest: sha256:b56b3a0d64bb63a0eac0d647a4aab8bff62e731fba786e75596c19324e545ce8
Status: Downloaded newer image for fauna/faunadb:latest
```

The downloaded image can be validated using the command below:

ダウンロードしたイメージは、以下のコマンドで確認することができます。

```bash
$ docker run fauna/faunadb --help
FaunaDB Enterprise Docker Image



Options:
 --help               Print this message and exit.
 --init               Initialize the node (default action).
 --run                Run and doesn't initialize the node.
 --join host[:port]   Join a cluster through an active node specified in host and port.
 --config <path>      Specify a custom config file. Should be accessible inside the docker image.
```

### Create a Single Node FaunaDB Instance

シングルノード FaunaDB インスタンスの作成

The simplest functional form of FaunaDB is a single node instance. While this instance does not provide an environment to experiment with the scale out and distributed behaviors of FaunaDB, it is a great starting point as an environment for development testing.

FaunaDB の最もシンプルな機能形態は、シングルノードのインスタンスである。このインスタンスは、FaunaDB のスケールアウトや分散動作を実験する環境を提供するものではありませんが、開発テスト用の環境としては最適な出発点となります。

The command below starts a single node instance of FaunaDB exposing port 8443 which is the Fauna Query Language endpoint. Keep in mind, this instance is fully ephemeral. All configuration and data will be lost when the image is terminated. We will cover later in this document how to configure an instance to save its data locally.

以下のコマンドは、FaunaDB のシングルノードインスタンスを起動し、Fauna Query Language のエンドポイントであるポート 8443 を公開します。このインスタンスは完全にエフェメラルであることに留意してください。イメージが終了すると、すべての設定とデータは失われます。データをローカルに保存するようにインスタンスを設定する方法については、このドキュメントの後半で説明します。

```bash
$ docker run --rm --name faunadb -p 8443:8443 fauna/faunadb
```

The results of that command should look something like the output below.

このコマンドの結果は、以下の出力のようになるはずです。

```bash
FaunaDB Enterprise Edition 2.5.5-b36dea0
========================================
Starting...
Loaded configuration from /faunadb/enterprise/default.yml...
Network Host ID: 172.17.0.2
Cluster name: fauna
Datacenter name: NoDc
Identified as 7318bdb3-7d3b-4475-8690-9dfe12650dc9 at 172.17.0.2.
Data path: /var/lib/faunadb
Temp path: /var/lib/faunadb/tmp
Snapshot path: /var/lib/faunadb/snapshots
Admin endpoint: 127.0.0.1:8444
API endpoint: 0.0.0.0:8443
FaunaDB is ready.
Initializing the cluster
Loaded configuration from /faunadb/enterprise/default.yml...
Node has initialized the cluster.
```

This command starts the docker image in the fore ground. The instance will quit running if the session is killed `^C` or if the command window is closed. The image can be run in the background or in the detached mode by adding the `-d` option to the command like below.

このコマンドは、フォアグラウンドの docker イメージを起動します。セッションが強制終了した場合や、コマンドウィンドウが閉じられた場合には、インスタンスの実行を終了します。このイメージは、以下のようにコマンドに `-d` オプションを追加することで、バックグラウンドまたはデタッチモードで実行することができます。

```bash
docker run    --rm --name faunadb -p 8443:8443 fauna/faunadb

docker run -d --rm --name faunadb -p 8443:8443 fauna/faunadb
```

Regardless of the command used to start the node instance, a command shell can be opened into the instance. Once there, FaunaDB's status can be checked using the `faunadb-admin` command tools. The sequence should look something like this:

ノードインスタンスの起動に使用したコマンドにかかわらず、インスタンス内にコマンドシェルを開くことができる。その際、`faunadb-admin`コマンドツールを使って FaunaDB の状態を確認することができます。手順は以下のようになります。

```bash
$ docker exec -it faunadb /bin/bash
root@aebc20012c3e:/faunadb# cd enterprise/
root@aebc20012c3e:/faunadb/enterprise# bin/faunadb-admin -k secret status
No configuration file specified; loading defaults...



Datacenter: NoDc (data-and-log)
===============================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   512       Segment-0    172.17.0.2  100.0%  100.0%  4905eff4-449c-4e69-aac0-27685071f499
```

Take notice of the `-k secret` option used in the command above. This is the default security key used by the docker image. It is possible to override this in a config file that will be discussed below.

上のコマンドで使われている`-k secret`オプションに注目してください。これは、docker イメージが使用するデフォルトのセキュリティキーです。これは、後述する設定ファイルで上書きすることができます。

The API endpoint can also be verified using the below sequence:

API エンドポイントの確認は、以下の手順で行うことができます。

```bash
$ curl http://localhost:8443/ping
{ "resource": "Scope write is OK" }
```

At this point the cluster is a fully functional FaunaDB instance.

この時点で、クラスタは完全に機能する FaunaDB インスタンスとなる。

## Create a Three Node, Single Replica Instance of FaunaDB

FaunaDB の 3 ノード、シングルレプリカインスタンスの作成

This example demonstrates how to scale out the previous single node instance into a three node configuration. FaunaDB's auto-sharding will be displayed as the data automatically gets distributed across the available nodes. This example will move from a single node that owns 100% of the data to three nodes that share the data roughly equally.

この例では、以前のシングルノードインスタンスを 3 ノード構成にスケールアウトする方法を示す。データが利用可能なノードに自動的に分散されるため、FaunaDB のオートシャーディングが表示されます。この例では、データを 100％所有する単一ノードから、データをほぼ均等に共有する 3 つのノードに移行する。

To create the first node in the Replica, the same command as the one above is used only slightly changing the docker node name to reflect that it is one of many nodes. The command and the results are below.

レプリカの最初のノードを作成するために、上のコマンドと同じコマンドを使用します。ただ、多くのノードの 1 つであることを反映するために、docker ノード名を少し変更します。コマンドとその結果は以下の通りです。

```bash
$ docker run --rm --name faunadb_node0 -p 8443:8443 fauna/faunadb
FaunaDB Enterprise Edition 2.5.5-b36dea0
========================================
Starting...
Loaded configuration from /faunadb/enterprise/default.yml...
Network Host ID: 172.17.0.2
Cluster name: fauna
Datacenter name: NoDc
Identified as fafa9a6d-c63e-455c-b275-2ea5f32276e3 at 172.17.0.2.
Data path: /var/lib/faunadb
Temp path: /var/lib/faunadb/tmp
Snapshot path: /var/lib/faunadb/snapshots
Admin endpoint: 127.0.0.1:8444
API endpoint: 0.0.0.0:8443
FaunaDB is ready.
Initializing the cluster
Loaded configuration from /faunadb/enterprise/default.yml...
Node has initialized the cluster.
```

To add the second node, modify the command slightly specifying a new name, removing the exposed port and telling it to join the existing node. The actual command and the expected results can be seen below.

2 つ目のノードを追加するには、コマンドを少し修正して新しい名前を指定し、公開されているポートを削除して、既存のノードに参加するように伝えます。実際のコマンドと期待される結果を以下に示します。

```bash
$ docker run --rm --name faunadb_node1 fauna/faunadb --join 172.17.0.2
FaunaDB Enterprise Edition 2.5.5-b36dea0
========================================
Starting...
Loaded configuration from /faunadb/enterprise/default.yml...
Network Host ID: 172.17.0.3
Cluster name: fauna
Datacenter name: NoDc
Identified as 106b3ed6-dd74-40b4-8e96-1251ebcff51e at 172.17.0.3.
Data path: /var/lib/faunadb
Temp path: /var/lib/faunadb/tmp
Snapshot path: /var/lib/faunadb/snapshots
Admin endpoint: 127.0.0.1:8444
API endpoint: 0.0.0.0:8443
FaunaDB is ready.
Joining the cluster
Loaded configuration from /faunadb/enterprise/default.yml...
Node has joined the cluster.



```

Adding the third node is identical to the second except for the name change. Again, the actual command and results are below.

3 つ目のノードの追加は、名前の変更以外は 2 つ目と同じです。繰り返しになりますが、実際のコマンドと結果は以下の通りです。

```bash
$ docker run --rm --name faunadb_node2 fauna/faunadb --join 172.17.0.2
FaunaDB Enterprise Edition 2.5.5-b36dea0
========================================
Starting...
Loaded configuration from /faunadb/enterprise/default.yml...
Network Host ID: 172.17.0.4
Cluster name: fauna
Datacenter name: NoDc
Identified as 92cda025-ef34-4da0-b371-4c92f0c6582b at 172.17.0.4.
Data path: /var/lib/faunadb
Temp path: /var/lib/faunadb/tmp
Snapshot path: /var/lib/faunadb/snapshots
Admin endpoint: 127.0.0.1:8444
API endpoint: 0.0.0.0:8443
FaunaDB is ready.
Joining the cluster
Loaded configuration from /faunadb/enterprise/default.yml...
Node has joined the cluster.
```

Check the status of the cluster by starting a shell session on one of the instances and then executing the `faunadb-admin` status command. An example is below.

いずれかのインスタンスでシェルセッションを起動し、`faunadb-admin` status コマンドを実行して、クラスタの状態を確認します。例を以下に示します。

```bash
$ docker exec -it faunadb_node0 /bin/bash
root@3e46d26e19a2:/faunadb# cd enterprise/
root@3e46d26e19a2:/faunadb/enterprise# ./bin/faunadb-admin -k secret status
No configuration file specified; loading defaults...



Datacenter: NoDc (data-and-log)
===============================
Status  State  WorkerID  Log Segment  Address     Owns   Goal   HostID
up      live   512       Segment-0    172.17.0.2  36.8%  36.8%  fafa9a6d-c63e-455c-b275-2ea5f32276e3
up      live   513       none         172.17.0.3  34.2%  34.2%  106b3ed6-dd74-40b4-8e96-1251ebcff51e
up      live   514       none         172.17.0.4  29.1%  29.1%  92cda025-ef34-4da0-b371-4c92f0c6582b
```

The auto-sharding can be seen in the output above. As nodes are added, FaunaDB spreads the data roughly evenly across the available nodes.

オートシャーディングの様子は上の出力で確認できます。ノードが追加されると、FaunaDB はデータを利用可能なノードにほぼ均等に分散させる。

Nodes can also be removed from the cluster using the `faunadb-admin remove` command. This will demonstrate auto-sharding in reverse as seen in the below sequence.

ノードは `faunadb-admin remove` コマンドでクラスタから削除することもできます。これにより、以下のシーケンスで見られるように、オートシャーディングが逆に実行されます。

```bash
root@26ed2e887426:/faunadb/enterprise# ./bin/faunadb-admin -k secret status
No configuration file specified; loading defaults...



Datacenter: NoDc (data-and-log)
===============================
Status  State  WorkerID  Log Segment  Address     Owns   Goal   HostID
up      live   512       Segment-0    172.17.0.2  34.7%  34.7%  3f0fa86b-fdb9-41d6-a57e-4dd7edb915ea
up      live   513       none         172.17.0.3  34.8%  34.8%  1516f5c1-2d2c-433f-854f-387f5726ebc5
up      live   514       none         172.17.0.4  30.5%  30.5%  b131511e-082b-47a5-9902-9e00c04901db
root@26ed2e887426:/faunadb/enterprise# ./bin/faunadb-admin -k secret remove b131511e-082b-47a5-9902-9e00c04901db
No configuration file specified; loading defaults...
Node b131511e-082b-47a5-9902-9e00c04901db is now being removed.
root@26ed2e887426:/faunadb/enterprise# ./bin/faunadb-admin -k secret status
No configuration file specified; loading defaults...



Datacenter: NoDc (data-and-log)
===============================
Status  State  WorkerID  Log Segment  Address     Owns   Goal   HostID
up      live   512       Segment-0    172.17.0.2  49.7%  49.7%  3f0fa86b-fdb9-41d6-a57e-4dd7edb915ea
up      live   513       none         172.17.0.3  50.3%  50.3%  1516f5c1-2d2c-433f-854f-387f5726ebc5
```

This FaunaDB configuration can also be used to experiment with other single replica multi-node administrative activities that are exposed through the `faunadb-admin` command.

この FaunaDB の設定は、`faunadb-admin`コマンドで公開されている他のシングルレプリカ・マルチノードの管理活動を試すのにも使用できる。

## Create a Three Replica, Single Node per Replica Instance of FaunaDB

## FaunaDB の 3 レプリカ、レプリカごとのシングルノードのインスタンスを作成する

In this example a multi data-center/replica configuration of FaunaDB will be demonstrated. This configuration will be useful in understanding some of the operational attributes of FaunaDB when distributed across multiple replicas. Three replicas will be used in the example. This allows faunaDB's distributed log to reach quorum in the event of a single replica failure.

この例では、FaunaDB のマルチデータセンター/レプリカ構成を実演します。この構成は、複数のレプリカに分散している場合の FaunaDB の運用特性を理解するのに役立つだろう。この例では、3 つのレプリカが使用される。これにより、1 つのレプリカが故障した場合でも、faunaDB の分散ログがクォーラムに達することができます。

Default configurations cannot be used for this deployment. Configuration files specific to the replica's will be required. Below is an example of the configuration file for the node in the first replica. The major change in this yaml versus a default configuration is the use of a unique replica name. Also, specific ip addresses are specified. Depending on how Docker is configured these ip addresses may need to be altered.

この展開では、デフォルトの設定は使用できません。レプリカに固有の設定ファイルが必要になります。以下は、最初のレプリカのノード用の設定ファイルの例です。この yaml がデフォルトの設定と大きく違うのは、一意のレプリカ名を使っていることです。また、特定の IP アドレスが指定されています。Docker の設定方法によっては、これらの IP アドレスを変更する必要があります。

```yaml
auth_root_key: secret
network_datacenter_name: replica_1
storage_data_path: /var/lib/faunadb
log_path: /var/log/faunadb
network_listen_address: 172.17.0.2
network_broadcast_address: 172.17.0.2
network_admin_http_address: 127.0.0.2 #don't expose admin endpoint outside docker by default
network_coordinator_http_address: 0.0.0.0 #expose api endpoint to all interfaces
storage_transaction_log_nodes:
  - [172.17.0.2]
```

Starting this node requires a slightly revised command. Specifically, an argument that links the custom yaml file on the local disk to a location that the docker container can pick up must be passed. Using this `-v` option will be covered in more detail later below.

このノードを起動するには、少し修正したコマンドが必要です。具体的には、ローカルディスク上のカスタム yaml ファイルを、docker コンテナが拾える場所にリンクする引数を渡す必要があります。この `-v` オプションの使い方については、後ほど詳しく説明します。

```bash
docker run --rm --name faunaDB_replica_1 -p 8443:8443 -v <path to yaml file>:/etc/faunadb.yml fauna/faunadb --config /etc/faunadb.yml
```

The yaml files for replica's two and three reflects the same slight changes as the one for the first replica. Namely for replica_2:

replica_2 と replica_3 の yaml ファイルには、最初のレプリカ用のものと同じように、わずかな変更が反映されています。replica_2 の場合です。

```yaml
auth_root_key: secret
network_datacenter_name: replica_2
storage_data_path: /var/lib/faunadb
log_path: /var/log/faunadb
network_listen_address: 172.17.0.3
network_broadcast_address: 172.17.0.3
network_admin_http_address: 127.0.0.3 #don't expose admin endpoint outside docker by default
network_coordinator_http_address: 0.0.0.0 #expose api endpoint to all interfaces
storage_transaction_log_nodes:
  - [172.17.0.3]
```

And for replica_3:

replica_3 についても。

```yaml
auth_root_key: secret
network_datacenter_name: replica_3
storage_data_path: /var/lib/faunadb
log_path: /var/log/faunadb
network_listen_address: 172.17.0.4
network_broadcast_address: 172.17.0.4
network_admin_http_address: 127.0.0.4 #don't expose admin endpoint outside docker by default
network_coordinator_http_address: 0.0.0.0 #expose api endpoint to all interfaces
storage_transaction_log_nodes:
  - [172.17.0.4]
```

The command to start replicas two and three has some subtle differences from the one used for the first replica. First, the API port, 8443, is not exposed for these replicas. Second, the `-v` option is changed to reference the replica specific yaml file. Finally, the `--join` option is added.

2 つ目と 3 つ目のレプリカを起動するコマンドは、1 つ目のレプリカに使ったものとは微妙に異なる点があります。まず，これらのレプリカでは，API ポートの 8443 は公開されません．次に，`-v` オプションは，レプリカ専用の yaml ファイルを参照するように変更されています．最後に，`--join`オプションを追加します．

```bash
docker run --rm --name faunaDB_replica_2 -v <path to yaml file>:/etc/faunadb.yml fauna/faunadb --config /etc/faunadb.yml  --join 172.17.0.2
```

Once all three of the replicas have started, obtain shell access to the instance of the first replica and run a `faunadb-admin status` command. The results should look similar to this:

3 つのレプリカが起動したら、1 つ目のレプリカのインスタンスにシェルアクセスして、`faunadb-admin status`コマンドを実行します。結果は以下のようになるはずです。

```bash
root@03ecfe4c7c18:/faunadb/enterprise# ./bin/faunadb-admin -k secret status
Loaded configuration from /etc/faunadb.yml...



Datacenter: replica_1 (data-and-log)
====================================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   512       Segment-0    172.17.0.2  100.0%  100.0%  6a1a926d-8993-40c0-9473-476a9eb2cc07



Datacenter: replica_2 (inactive)
================================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   513       none         172.17.0.3   0.0%    0.0%   a887f1c2-9ffd-4416-ac83-452a4972919c



Datacenter: replica_3 (inactive)
================================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   514       none         172.17.0.4   0.0%    0.0%   d8e20212-0d85-4d68-b8d4-de87be6b1182
```

Notice that `replica_2` and `replica_3` are joined to the cluster but flagged as inactive. At this point, the cluster is aware of all the replicas and nodes but has not set up the replica relationship among them. This is accomplished with the following command:

ここで、`replica_2`と`replica_3`がクラスターに参加していますが、非アクティブと判定されていることに注目してください。この時点では、クラスターはすべてのレプリカとノードを認識していますが、それらの間のレプリカ関係を設定していません。これは次のようなコマンドで実現します。

```bash
root@03ecfe4c7c18:/faunadb/enterprise# ./bin/faunadb-admin -k secret update-replication replica_1 replica_2 replica_3
Loaded configuration from /etc/faunadb.yml...
Updated replication to replica_1, replica_2, replica_3.
```

Which yields the following results when status is checked again.

この状態で再度確認すると、次のような結果になります。

```bash
root@03ecfe4c7c18:/faunadb/enterprise# ./bin/faunadb-admin -k secret status
Loaded configuration from /etc/faunadb.yml...



Datacenter: replica_1 (data-and-log)
====================================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   512       Segment-0    172.17.0.2  100.0%  100.0%  6a1a926d-8993-40c0-9473-476a9eb2cc07



Datacenter: replica_2 (data-and-log)
====================================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   513       none         172.17.0.3  100.0%  100.0%  a887f1c2-9ffd-4416-ac83-452a4972919c



Datacenter: replica_3 (data-and-log)
====================================
Status  State  WorkerID  Log Segment  Address     Owns    Goal    HostID
up      live   514       none         172.17.0.4  100.0%  100.0%  d8e20212-0d85-4d68-b8d4-de87be6b1182
```

It may take a little while for the "Owns" value to equal the "Goal" value but in a small docker environment this time should be quite short.

「Owns」の値が「Goal」の値と同じになるまで少し時間がかかるかもしれませんが、小規模な Docker 環境ではこの時間はかなり短くなるはずです。

At this point the distributed FaunaDB is ready to go.

この時点で、分散した FaunaDB の準備が整いました。

## Advance Configuration Options

事前設定オプション

As mentioned above, the FaunaDB clusters in the examples have all been ephemeral. The data and the configuration disappear when the instances are removed. The FaunaDB docker image can be used with local configuration files and disk storage in the cases where it is desirable to save cluster data across restarts. The `-v` option was used in the multi replica example above to specify local yaml configuration files. Below are some additional ways to use the `-v` option.

前述の通り、例に挙げた FaunaDB クラスタはすべて一過性のものだった。インスタンスが削除されると、データも設定も消えてしまう。FaunaDB の docker イメージは、再起動をまたいでクラスタデータを保存することが望ましい場合には、ローカルの設定ファイルやディスクストレージを使用することができる。上記のマルチレプリカの例では、ローカルの yaml 設定ファイルを指定するために `-v` オプションを使用しました。以下では、`-v`オプションのその他の使い方をご紹介します。

### Persisted data

データの永続化

Data can be persisted to a local directory using the `-v` command option. Below, the option is used to map a host directory or named volume to the folder `/var/lib/faunadb`. All data stored in FaunaDB will be persisted to that location.

`-v` コマンドオプションを使って、データをローカルディレクトリに永続化することができます。以下では、このオプションを使用して、ホストディレクトリまたは名前付きボリュームを `/var/lib/faunadb` フォルダにマッピングしています。FaunaDB に保存されたすべてのデータはその場所に永続化される。

```bash
$ docker run --rm --name faunadb -p 8443:8443 \
    -v <host-directory or named-volume>:/var/lib/faunadb \
    fauna/faunadb:<version>
```

`/var/lib/faunadb` is the default location for data storage in the FaunaDB docker image.

/var/lib/faunadb` は、FaunaDB docker イメージのデータ保存先としてデフォルトで使用されています。

### FaunaDB logs

FaunaDB のログ

A similar approach can be used to persist the FaunaDB logs. A directory or a volume can be mapped to the default log storage location in the FaunaDB docker image located at `/var/log/faunadb`.

FaunaDB のログを永続化するには、同様のアプローチが使用できます。ディレクトリやボリュームを、FaunaDB docker イメージ内のデフォルトのログ保存場所である `/var/log/faunadb` にマッピングすることができます。

```bash
$ docker run --rm --name faunadb -p 8443:8443 \
    -v <host-directory or named-volume>:/var/lib/faunadb \
    -v <host-directory>:/var/log/faunadb \
    fauna/faunadb:<version>
```

### FaunaDB config

FaunaDB コンフィグ

Granular control of the FaunaDB configuration for an instance can also be achieved through a combination of a custom yaml file and use of the `-v` option. Building on the example above, the below yaml file provides custom values for secret, replica name, data and log storage paths. The command below maps local directories to these new storage and log paths and also points to the custom yaml file.

カスタム yaml ファイルと `-v` オプションを使用することで、インスタンスの FaunaDB 設定を詳細に制御することもできます。上の例を参考にして、以下の yaml ファイルでは、secret、レプリカ名、データおよびログの保存パスにカスタム値を設定しています。以下のコマンドは、ローカルディレクトリをこれらの新しいストレージとログのパスにマップし、カスタム yaml ファイルをポイントします。

```bash
$ docker run --rm --name faunadb -p 8443:8443 \
    -v <host-directory or named-volume>:/storage/data \
    -v <host-directory>:/storage/log \
    -v <path-to-config-file>:/etc/faunadb.yml \
    fauna/faunadb:<version> --config /etc/faunadb.yml
```

This is an example config file

以下は設定ファイルの例です。

```yaml
auth_root_key: my_secret
network_datacenter_name: my_replica
storage_data_path: /storage/data
log_path: /storage/log
shutdown_grace_period_seconds: 0
network_listen_address: 172.17.0.2
network_broadcast_address: 172.17.0.2
network_admin_http_address: 172.17.0.2
network_coordinator_http_address: 172.17.0.2
storage_transaction_log_nodes:
  - [172.17.0.2]
```

For more information about the above configurations and others go to [How to Operate FaunaDB](https://app.fauna.com/documentation/howto/operations/).

上記の設定などの詳細については[FaunaDB の操作方法](https://app.fauna.com/documentation/howto/operations/)をご覧ください。
