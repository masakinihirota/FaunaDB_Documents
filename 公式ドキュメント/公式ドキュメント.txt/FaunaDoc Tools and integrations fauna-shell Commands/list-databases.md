# `list-databases`

Lists child databases in the current database.

terminal

```bash
fauna list-databases
```

## [](#description)Description

The `list-databases` command lists child databases. If you don’t pass any options at the command line, Fauna uses the default options specified in the `fauna-shell` [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

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

## [](#examples)Examples

shell

```shell
fauna list-databases
listing databases
my_test_db
```

To verify this, run `fauna shell` and query for a list of databases; you see that the child database `my_test_db` is listed:

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Databases())
{ data: [ Database("my_test_db") ] }
```

## [](#related)Related

-   [`create-database`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)
    
-   [`delete-database`](https://docs.fauna.com/fauna/current/integrations/shell/delete-database)
    
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

Was this article helpful?