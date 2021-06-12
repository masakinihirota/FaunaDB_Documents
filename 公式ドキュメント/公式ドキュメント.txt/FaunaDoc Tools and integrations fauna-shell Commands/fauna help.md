# `fauna help`

Displays help for `fauna-shell`.

terminal

```bash
fauna help [COMMAND]
```

## [](#description)Description

The `fauna help` command displays version and usage information for `fauna-shell`, as well as a list of all of `fauna-shell` commands.

`fauna help COMMAND` displays help specific to `COMMAND`. You can also use the syntax `fauna COMMAND --help`.

## [](#arguments)Arguments

  

Argument

Description

`COMMAND`

Optional - When specified, the `fauna` tool displays help for the specified command.

## [](#options)Options

None.

## [](#examples)Examples

In the following example, we issue the command to get help about `fauna-shell` in general.

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

Was this article helpful?