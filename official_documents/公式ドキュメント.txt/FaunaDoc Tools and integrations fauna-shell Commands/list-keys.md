# `list-keys`

Lists the keys that exist in the current database.

terminal

```bash
fauna list-keys
```

## [](#description)Description

The `list-keys` command lists the keys that you have created in the current database, which can include keys for the current database or its child databases.

If you don’t pass any options at the command line, Fauna uses the default options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

  

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

## [](#arguments)Arguments

None.

## [](#options)Options

None.

## [](#example)Example

For the purpose of this example, let’s assume that you have previously created some keys. We can display that list with `fauna list-keys`:

shell

```shell
fauna list-keys
listing keys
Key ID               Database             Role
259718958404338186   app1                 server
259719743570706945   app1                 client
265528117038154259   my-test-db           admin
265437820880945683   my_test_db           admin
```

You can verify the existence of these keys from the shell:

shell

```shell
fauna shell
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
Paginate(Keys())
{
  data: [
    Ref(Keys(), "259718958404338186"),
    Ref(Keys(), "259719743570706945"),
    Ref(Keys(), "265437820880945683"),
    Ref(Keys(), "265528117038154259")
  ]
}
```

The numeric identifiers in each key’s [reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) matches up with the `Key ID` column in the `list-keys` output.

## [](#related)Related

-   [`create-key`](https://docs.fauna.com/fauna/current/integrations/shell/create-key)
    
-   [`delete-key`](https://docs.fauna.com/fauna/current/integrations/shell/delete-key)
    
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

Was this article helpful?