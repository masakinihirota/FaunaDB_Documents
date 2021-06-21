fauna help | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/help

# `fauna help`

Displays help for `fauna-shell`.

fauna-shell` のヘルプを表示します。

terminal

```bash
fauna help [COMMAND]
```

## [](#description)Description

The `fauna help` command displays version and usage information for `fauna-shell`, as well as a list of all of `fauna-shell` commands.

fauna help` コマンドは、`fauna-shell` のバージョン情報や使用方法、`fauna-shell` の全コマンドの一覧を表示します。

`fauna help COMMAND` displays help specific to `COMMAND`. You can also use the syntax `fauna COMMAND --help`.

`fauna help COMMAND` は、`COMMAND` に固有のヘルプを表示します。また、`fauna COMMAND --help` という構文も使用できます。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|`COMMAND`|Optional - When specified, the `fauna` tool displays help for the specified command.|

---

|引数|説明|
|--|--|
|`COMMAND`|オプション - 指定された場合、`fauna`ツールは指定されたコマンドのヘルプを表示します。|

## [](#options)Options

None.

## [](#examples)Examples

In the following example, we issue the command to get help about `fauna-shell` in general.

次の例では、`fauna-shell`全般についてのヘルプを得るためにコマンドを発行します。

shell

```shell
fauna help
VERSION
  fauna-shell/0.11.4 darwin-x64 node-v12.16.1

USAGE
  $ fauna [COMMAND]

COMMANDS
  add-endpoint
  autocomplete      display autocomplete installation instructions
  cloud-login
  create-database
  create-key
  default-endpoint
  delete-database
  delete-endpoint
  delete-key
  eval
  help              display help for fauna
  list-databases
  list-endpoints
  list-keys
  run-queries
  shell
```

In the following example, we request help specifically about the `add-endpoint` command.

次の例では、特に `add-endpoint` コマンドについてのヘルプを要求しています。

shell

```shell
fauna help add-endpoint
USAGE
  $ fauna add-endpoint ENDPOINT

ARGUMENTS
  ENDPOINT  FaunaDB server endpoint

OPTIONS
  --alias=alias  FaunaDB server endpoint alias
  --key=key      FaunaDB server endpoint key

DESCRIPTION
  Adds a connection endpoint for FaunaDB

EXAMPLES
  $ fauna add-endpoint https://db.fauna.com:8443
  $ fauna add-endpoint https://localhost:8443/ --alias localhost --key secret
```
