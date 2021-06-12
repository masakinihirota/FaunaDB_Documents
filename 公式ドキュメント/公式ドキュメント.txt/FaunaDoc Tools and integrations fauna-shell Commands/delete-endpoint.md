# `delete-endpoint`

Deletes an endpoint entry from the configuration file.

terminal

```bash
fauna delete-endpoint ENDPOINT_ALIAS
```

## [](#description)Description

The `delete-endpoint` command deletes a specific endpoint entry from the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

## [](#arguments)Arguments

  

Argument

Description

_ENDPOINT\_ALIAS_

The alias of the endpoint to be deleted.

## [](#example)Example

For the following example, the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) contains an entry for the endpoint whose alias is `localhost`:

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

We then run `fauna delete-endpoint` to delete the endpoint whose alias is `localhost`.

shell

```shell
fauna delete-endpoint localhost
Are you sure you want to delete the 'localhost' endpoint? [y/n]: y
```

We can now see that the `localhost` endpoint entry is no longer in the `fauna-shell` configuration file.

To see the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config), perform one of these steps:

1.  On Linux, macOS, and other Unix-like operating systems, run the following command in a terminal:
    
    terminal
    
    ```bash
    cat $HOME/.fauna-shell
    ```
    
2.  On Windows, run the following command in a command terminal:
    
    ```powershell
    type %userprofile%\.fauna-shell
    ```
    

The output should resemble:

```ini
default=db2

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

## [](#related)Related

-   [`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)
    
-   [`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)
    
-   [`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)
    
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

Was this article helpful?