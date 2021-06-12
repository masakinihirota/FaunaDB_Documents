---
created: 2021-06-04T03:09:31 (UTC +09:00)
tags: []
source: https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint
author: 
---

# add-endpoint | Fauna Documentation

> ## Excerpt
> Fauna is a flexible, developer-friendly, transactional database delivered to you as a secure, web-native API.

---
The following example demonstrates adding a new endpoint. Since the `--alias` and `--key` options were not specified, `fauna-shell` prompts you for them:

```
fauna add-endpoint https://db.fauna.com:8443
Endpoint Key: ******
Endpoint Alias [db.fauna.com]: db2
Endpoint 'db2' saved.
```

When the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) does not exist, running `fauna add-endpoint` automatically creates the configuration file.

1.  On Linux, macOS, and other Unix-like operating systems, run the following command in a terminal:
    
2.  On Windows, run the following command in a command terminal:
    
    ```
    type %userprofile%\.fauna-shell
    ```
    

The configuration file should resemble:

```
default=db2

[db2]
domain=private.example
port=8443
scheme=https
secret=MY_ORGANIZATION_SECRET
```

When you run the `add-endpoint` command again, the new endpoint is added to the configuration file:

```
fauna add-endpoint http://localhost:8443/ --alias=localhost --key=secret
Endpoint 'localhost' saved.
```

```
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
