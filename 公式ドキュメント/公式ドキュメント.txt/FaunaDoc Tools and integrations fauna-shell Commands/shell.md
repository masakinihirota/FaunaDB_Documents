# `shell`

Starts an interactive query shell.

terminal

```bash
fauna shell [DBNAME]
```

## [](#description)Description

Starts an interactive query shell for sending queries to Fauna.

## [](#arguments)Arguments

  

Argument

Description

_DBNAME_

Optional - If supplied, the queries that you run are executed in the specified child database.

## [](#options)Options

  

Option

Description

`--domain=<domain>`

Optional - The Fauna server domain, that is, the hostname where Fauna is running. Defaults to `db.fauna.com`.

`--endpoint=<endpoint>`

Optional - The name of the endpoint to use for the command.

`--port=<port>`

Optional - The connection port. Defaults to 8443.

`--scheme=<scheme>`

Optional - The connection scheme. Must be one of `https` or `http`. Defaults to `https`.

`--secret=<secret>`

Optional - The secret to use. A secret [authenticates](https://docs.fauna.com/fauna/current/security/) your connection to Fauna, and connects you to a specific database.

`--timeout=<timeout>`

Optional - The connection timeout, an integer number of milliseconds. When the specified period has elapsed, `fauna-shell` stops waiting for a response and displays an error.

The default is zero, which means that `fauna-shell` waits until a response is received.

## [](#example)Example

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Collections())
{ data: [ Collection("FirstCollection") ] }
```

Was this article helpful?