# `cloud-login`

Creates a Fauna endpoint in the configuration file based on your Fauna credentials.

terminal

```bash
fauna cloud-login
```

## [](#description)Description

The `cloud-login` command prompts you for your Fauna credentials, and if you authenticate successfully, creates a `cloud` endpoint in the [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) that you can use to query your top-level Fauna database.

You can provide a secret instead of an email address. When you do so, you are not prompted for a password, and a `cloud` endpoint is created in the configuration file that connects you to the database associated with the secret.

When multi-factor authentication (MFA) is enabled for your account in the Dashboard, the `cloud-login` function asks you for the current (time-based) multi-factor authentication code — you can see the current code in your authenticator app. If you do not enter the correct code, `cloud-login` exits with an error.

If the `cloud` endpoint already exists when you run `cloud-login`, you are asked if you wish to overwrite the existing `cloud` endpoint configuration.

## [](#arguments)Arguments

None.

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

The following example demonstrates the use of `cloud-login`, and the prompts for email/secret and password:

shell

```shell
fauna cloud-login
For email login, enter your email below, and then your password.
For login with 3rd-party identity providers like Github or Netlify,
please acquire a key from Dashboard > Security and enter it below
instead.

Email or secret key: <your email address>
Password: ***********
Enter your multi-factor authentication code: ******
```

After a successful login, your [configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config) now contains a `cloud` endpoint that includes the secret to access your top-level database.

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
default=cloud

[cloud]
domain=db.fauna.com
scheme=https
secret=fnADS@PxN@2CE@n7z@kDa4_p6Z@fIBaZm@Qt@bYT
```

Every secret provided by Fauna is unique, so the secret you see when you run `cloud-login` is guaranteed to differ from the one above. The secret above has been modified; it cannot be used to access a real database.

## [](#related)Related

-   [`Configuration`](https://docs.fauna.com/fauna/current/integrations/shell/config)
    

Was this article helpful?