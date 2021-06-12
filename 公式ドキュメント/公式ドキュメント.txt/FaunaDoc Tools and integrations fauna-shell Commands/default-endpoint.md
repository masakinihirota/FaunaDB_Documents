# `default-endpoint`

Sets a Fauna endpoint as the default.

terminal

```bash
fauna default-endpoint ENDPOINT_ALIAS
```

## [](#description)Description

The `default-endpoint` command configures an endpoint to be the default.

## [](#arguments)Arguments

  

Argument

Description

_ENDPOINT\_ALIAS_

The name of the endpoint to set as the default.

## [](#example)Example

This [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) contains entries for three endpoints: `localhost`, `cloud`, and `db2`. `db2` is currently the default:

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

Now, we run `fauna default-endpoint` to change the default endpoint to `localhost`:

shell

```shell
fauna defaut-endpoint localhost
Endpoint 'localhost' set as default endpoint.
```

The contents of the configuration file now confirm that the default endpoint has changed to `localhost`.

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
default=localhost

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

## [](#related)Related

-   [`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)
    
-   [`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)
    
-   [`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)
    
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

Was this article helpful?