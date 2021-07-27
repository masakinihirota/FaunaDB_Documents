fauna-shell reference | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/

# `fauna-shell` reference

`fauna-shell` リファレンス

`fauna-shell` is a command line tool that lets you execute Fauna queries interactively, to help you explore the capabilities of Fauna.

`fauna-shell` は、Fauna クエリをインタラクティブに実行できるコマンドラインツールで、Fauna の機能を探求するのに役立ちます。

This section explains how to install `fauna-shell` and provides a reference for everything that `fauna-shell` can do. See [Configuration](https://docs.fauna.com/fauna/current/integrations/shell/config) for details on configuring `fauna-shell`.

このセクションでは、`fauna-shell` のインストール方法を説明し、`fauna-shell` でできることすべてについてのリファレンスを提供します。fauna-shell` の設定については [Configuration](https://docs.fauna.com/fauna/current/integrations/shell/config) を参照してください。

For more information, see our [Introducing Fauna Shell](https://fauna.com/blog/introducing-fauna-shell) blog post.

さらに詳しい情報は、[Introducing Fauna Shell](https://fauna.com/blog/introducing-fauna-shell)のブログ記事をご覧ください。

## [](#requirements)Requirements

要件

- Node.js, versions 10.0.0 through 12.16.3.

- Node.js, バージョン 10.0.0 から 12.16.3.

## [](#known-issues)Known issues

既知の問題

- With Node.js 12.17.0, or newer, `fauna-shell` can crash when typing a period during query construction.

- Node.js 12.17.0 以降では、`fauna-shell`がクエリ構築中にピリオドを入力するとクラッシュする可能性があります。

## [](#installation)Installation

インストール

To install `fauna-shell`, issue the following command:

fauna-shell` をインストールするには、以下のコマンドを実行してください。

terminal

```bash
npm i -g fauna-shell
```

## [](#command-reference)Command reference

コマンドリファレンス

Information

情報

[`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)

[`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)

Adds a connection endpoint for Fauna.

Fauna に接続エンドポイントを追加します。

[`autocomplete`](https://docs.fauna.com/fauna/current/integrations/shell/autocomplete)

オートコンプリート(autocomplete)](https://docs.fauna.com/fauna/current/integrations/shell/autocomplete)

Displays autocomplete installation instructions.

オートコンプリートのインストール手順を表示します。

[`cloud-login`](https://docs.fauna.com/fauna/current/integrations/shell/cloud-login)

[`cloud-login`](https://docs.fauna.com/fauna/current/integrations/shell/cloud-login)

Adds the Fauna endpoint to the configuration.

Fauna のエンドポイントを設定に追加します。

[`create-database`](https://docs.fauna.com/fauna/current/integrations/shell/create-database)

[creat-database`](https://docs.fauna.com/fauna/current/integrations/shell/create-database)

Creates a child database in the current database.

現在のデータベースに子データベースを作成します。

[`create-key`](https://docs.fauna.com/fauna/current/integrations/shell/create-key)

[create-key`](https://docs.fauna.com/fauna/current/integrations/shell/create-key)

Creates a key for the specified database.

指定されたデータベースのキーを作成します。

[`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)

default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)

Sets an endpoint as the default.

エンドポイントをデフォルトで設定します。

[`delete-database`](https://docs.fauna.com/fauna/current/integrations/shell/delete-database)

[delete-database`](https://docs.fauna.com/fauna/current/integrations/shell/delete-database)

Deletes a child database from the current database.

現在のデータベースから子データベースを削除します。

[`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)

[`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)

Deletes a connection endpoint for Fauna.

Fauna の接続エンドポイントを削除します。

[`delete-key`](https://docs.fauna.com/fauna/current/integrations/shell/delete-key)

[`delete-key`](https://docs.fauna.com/fauna/current/integrations/shell/delete-key)

Deletes a key.

キーを削除します。

[`eval`](https://docs.fauna.com/fauna/current/integrations/shell/eval)

[eval`](https://docs.fauna.com/fauna/current/integrations/shell/eval)

Runs the specified query.

指定されたクエリを実行します。

[`help`](https://docs.fauna.com/fauna/current/integrations/shell/help)

[help`](https://docs.fauna.com/fauna/current/integrations/shell/help)

Displays help for fauna command.

fauna コマンドのヘルプを表示します。

[`list-databases`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)

[`リストデータベース`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)

Lists child databases in current database.

現在のデータベースの子データベースをリストアップします。

[`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)

[list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)

Lists Fauna connection endpoints.

Fauna 接続のエンドポイントを一覧表示します。

[`list-keys`](https://docs.fauna.com/fauna/current/integrations/shell/list-keys)

[`list-keys`](https://docs.fauna.com/fauna/current/integrations/shell/list-keys)

Lists keys for the current database or its child databases.

現在のデータベースまたはその子データベースのキーを一覧表示します。

[`shell`](https://docs.fauna.com/fauna/current/integrations/shell/shell)

[shell`](https://docs.fauna.com/fauna/current/integrations/shell/shell)

Starts an interactive shell to run Fauna queries.

Fauna クエリを実行するためのインタラクティブシェルを起動します。
