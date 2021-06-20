add-endpoint | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint


# `add-endpoint`






Adds a connection endpoint for Fauna.






terminal






```bash
fauna add-endpoint ENDPOINT [--alias=endpoint alias] [--key=secret]
```






## [](#description)Description






The `add-endpoint` command adds a connection endpoint for Fauna to the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config). If you don’t specify a key or alias, `fauna-shell` prompts you for them and then writes them to the `fauna-shell` configuration file.






## [](#arguments)Arguments













Argument






Description






`ENDPOINT`






The URL of the endpoint that you want to add.






`fauna-shell` automatically identifies the URL’s `scheme`, `domain`, and `port`, and includes those values in the new endpoint entry that it creates within the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).






## [](#options)Options













Option






Description






`--alias=<endpoint alias>`






Optional - The endpoint alias, a name that identifies a particular endpoint.






`--key=<secret>`






Optional - The secret associated with a specific database at the endpoint, that provides the [authentication](https://docs.fauna.com/fauna/current/security/) to run queries in Fauna.






## [](#examples)Examples






The following example demonstrates adding a new endpoint. Since the `--alias` and `--key` options were not specified, `fauna-shell` prompts you for them:






terminal






```bash
fauna add-endpoint https://db.fauna.com:8443
Endpoint Key: ******
Endpoint Alias [db.fauna.com]: db2
Endpoint 'db2' saved.
```






When the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) does not exist, running `fauna add-endpoint` automatically creates the configuration file.






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







The configuration file should resemble:






```ini
default=db2






[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET
```






When you run the `add-endpoint` command again, the new endpoint is added to the configuration file:






terminal






```bash
fauna add-endpoint http://localhost:8443/ --alias=localhost --key=secret
Endpoint 'localhost' saved.
```






```ini
default=db2






[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET






[localhost]
domain=127.0.0.1
port=8443
scheme=http
secret=secret
```






## [](#related)Related






-   [`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)






-   [`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)






-   [`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)






-   [Configuration](https://docs.fauna.com/fauna/current/integrations/shell/config)







