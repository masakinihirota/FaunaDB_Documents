# `fauna-shell` reference

`fauna-shell` is a command line tool that lets you execute Fauna queries interactively, to help you explore the capabilities of Fauna.

This section explains how to install `fauna-shell` and provides a reference for everything that `fauna-shell` can do. See [Configuration](https://docs.fauna.com/fauna/current/integrations/shell/config) for details on configuring `fauna-shell`.

## [](#requirements)Requirements

-   Node.js, versions 10.0.0 through 12.16.3.
    

## [](#known-issues)Known issues

-   With Node.js 12.17.0, or newer, `fauna-shell` can crash when typing a period during query construction.
    

## [](#installation)Installation

To install `fauna-shell`, issue the following command:

terminal

```bash
npm i -g fauna-shell
```

## [](#command-reference)Command reference

  

Information

[`add-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/add-endpoint)

Adds a connection endpoint for Fauna.

[`autocomplete`](https://docs.fauna.com/fauna/current/integrations/shell/autocomplete)

Displays autocomplete installation instructions.

[`cloud-login`](https://docs.fauna.com/fauna/current/integrations/shell/cloud-login)

Adds the Fauna endpoint to the configuration.

[`create-database`](https://docs.fauna.com/fauna/current/integrations/shell/create-database)

Creates a child database in the current database.

[`create-key`](https://docs.fauna.com/fauna/current/integrations/shell/create-key)

Creates a key for the specified database.

[`default-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/default-endpoint)

Sets an endpoint as the default.

[`delete-database`](https://docs.fauna.com/fauna/current/integrations/shell/delete-database)

Deletes a child database from the current database.

[`delete-endpoint`](https://docs.fauna.com/fauna/current/integrations/shell/delete-endpoint)

Deletes a connection endpoint for Fauna.

[`delete-key`](https://docs.fauna.com/fauna/current/integrations/shell/delete-key)

Deletes a key.

[`eval`](https://docs.fauna.com/fauna/current/integrations/shell/eval)

Runs the specified query.

[`help`](https://docs.fauna.com/fauna/current/integrations/shell/help)

Displays help for fauna command.

[`list-databases`](https://docs.fauna.com/fauna/current/integrations/shell/list-databases)

Lists child databases in current database.

[`list-endpoints`](https://docs.fauna.com/fauna/current/integrations/shell/list-endpoints)

Lists Fauna connection endpoints.

[`list-keys`](https://docs.fauna.com/fauna/current/integrations/shell/list-keys)

Lists keys for the current database or its child databases.

[`shell`](https://docs.fauna.com/fauna/current/integrations/shell/shell)

Starts an interactive shell to run Fauna queries.

Was this article helpful?
