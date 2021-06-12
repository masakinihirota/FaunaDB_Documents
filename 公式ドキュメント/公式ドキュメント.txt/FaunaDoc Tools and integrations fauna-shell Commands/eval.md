# `eval`

Runs the specified query.

terminal

```bash
fauna eval QUERY
```

## [](#description)Description

The `eval` command runs the query that you specify. The query can be read from STDIN, a file, or the command line. The query results can be output to STDOUT or a file, and you can specify the output format.

If you don’t pass any options at the command line, Fauna uses the options specified in the [`fauna-shell` configuration file](https://docs.fauna.com/fauna/current/integrations/shell/config).

## [](#arguments)Arguments

  

Argument

Description

_QUERY_

The query that you want to execute.

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

`--file=<file>`

Optional - The file to read the query (or queries) from.

`--format=<format>`

Optional - The output format. Must be one of:

-   `json`: JSON format.
    
-   `shell`: Fauna Shell format, a JavaScript-based notation that is aware of Fauna data types.
    

The default is `json`.

## [](#examples)Examples

1.  The following invocation shows running a query passed as an argument:
    
    shell
    
    ```shell
    fauna eval "Paginate(Collections())"
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]}
    ```
    
2.  The following invocation shows running a query that exists in a file. The query in the file is identical to the previous example:
    
    shell
    
    ```shell
    fauna eval --file=./query.fql
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]}
    ```
    
3.  The following invocation shows passing a query via STDIN:
    
    shell
    
    ```shell
    echo "Paginate(Collections())" | fauna eval --stdin
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]
    ```
    
4.  The following invocation shows sending query output to a file:
    
    shell
    
    ```shell
    fauna eval "Paginate(Collections())" --output=./output.json
    ```
    
    shell
    
    ```shell
    cat ./output.json
    {"data":[{"@ref":{"id":"FirstCollection","collection":{"@ref":{"id":"collections"}}}}]
    ```
    
5.  The following invocation shows sending query output to a file in Fauna Shell format:
    
    shell
    
    ```shell
    fauna eval "Paginate(Collections())" --format=shell --output=./output.json
    ```
    
    shell
    
    ```shell
    cat ./output.json
    { data: [ Collection("FirstCollection") ] }
    ```
    

Was this article helpful?