# `list-endpoints`

Lists the names of Fauna connection endpoints.

terminal

```bash
fauna list-endpoints
```

## [](#description)Description

The `list-endpoints` command lists the names of all of the endpoints that you have configured in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

## [](#arguments)Arguments

None.

## [](#options)Options

None.

## [](#example)Example

The [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) used in the following example contains entries for three endpoints: `localhost`, `cloud`, and `db2`. The default endpoint is `db2`.

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

When you run the `list-endpoints` command, the names of these four endpoints are listed. Note that the default endpoint — `db2` — is indicated with an asterisk.

shell

```shell
fauna list-endpoints
localhost
cloud
db2 *
```

## [](#related)Related

-   [`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)
    
-   [`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)
    
-   [`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)
    
-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

Was this article helpful?