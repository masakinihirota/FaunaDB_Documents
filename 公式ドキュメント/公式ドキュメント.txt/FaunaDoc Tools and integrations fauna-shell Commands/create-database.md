# `create-database`

Creates a child database in the current database.

terminal

```bash
fauna create-database DBNAME
```

## [](#description)Description

The `create-database` command creates a child database within the current database, with the name that you specify. If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

## [](#arguments)Arguments

  

Argument

Description

_DBNAME_

The name of the child database that you are creating.

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

Create a database called `my-test-db`:

shell

```shell
fauna create-database my-test-db
creating database my-test-db

  created database 'my-test-db'

  To start a shell with your new database, run:

  fauna shell 'my-test-db'

  Or, to create an application key for your database, run:

  fauna create-key 'my-test-db'
```

Now, when you run `fauna shell` and query for a list of databases, you can see that the new child database `my-test-db` is listed:

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Databases())
{
  data: [
    Database("my-test-db")
  ]
}
```

## [](#related)Related

-   [`list-databases`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)
    
-   [`delete-database`](https://docs.fauna.com/fauna/current/integrations/shell/delete-database)
    

Was this article helpful?