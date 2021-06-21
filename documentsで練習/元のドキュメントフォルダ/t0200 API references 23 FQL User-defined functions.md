User-defined functions | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/user_defined_functions

# User-defined functions

ユーザー定義関数

The Fauna Query Language provides [many built-in functions](https://docs.fauna.com/fauna/current/api/fql/cheat_sheet) that can be used to query and modify a database. Functions, also known as user-defined functions (or UDFs), provide a mechanism to store and run commonly used Fauna queries.

動物相クエリ言語は 、データベースのクエリと変更に使用できる多くの組み込み関数を提供します。ユーザー定義関数（またはUDF）とも呼ばれる関数は、一般的に使用される動物相クエリを格納および実行するメカニズムを提供します。

This section describes functions, their anatomy, how to create them, and how execute them:

このセクションでは、関数、その構造、作成方法、および実行方法について説明します。

-   [Overview](#overview)
-   [Schema for named functions](#schema)
-   [Signature](#signature)
-   [Permissions](#permissions)
-   [Limitations](#limitations)

- 概要概要
- 名前付き関数のスキーマ
- 署名
- 権限
- 制限事項

## [](#overview)Overview

概要

Fauna supports two different types of functions:

動物相は、2つの異なるタイプの機能をサポートしています。

1.  [Built-in functions](https://docs.fauna.com/fauna/current/api/fql/cheat_sheet): these are used as the building blocks to query or mutate Fauna databases.

組み込み関数：これらは、動物相データベースを照会または変更するための構成要素として使用されます。

2.  User-defined functions (UDFs): these are used to combine functions, built-in or user-defined, into queries that can be executed repeatedly.

ユーザー定義関数（UDF）：これらは、組み込み関数またはユーザー定義関数を組み合わせて、繰り返し実行できるクエリにするために使用されます。

UDFs can be _anonymous_, when declared with the [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function, or can be named by using the [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) function.

UDFは[Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数で宣言すると_anonymous_になり、[`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)関数を使うと名前を付けることができます。

For example, a simple query that uses a built-in function could be:

たとえば、組み込み関数を使用する単純なクエリは次のようになります。

shell

```shell
Add(1, 1)
```

That query always returns the same result (2).

そのクエリは常に同じ結果を返します（2）。

Suppose that we want to add 1 to several numbers. We could use an anonymous function:

いくつかの数に1を加えたいとしましょう。匿名関数を使用できます：

shell

```shell
Map(
  [ 1, 2, 3, 4, 5 ],
  Lambda(
    "number",
    Add(1, Var("number"))
  )
)
```

The result should be:

結果は次のようになります。

```javascript
[ 2, 3, 4, 5, 6 ]
```

That query executes the anonymous Lambda function once per entry in the array that [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) processes.

このクエリは、Map処理する配列のエントリごとに1回匿名Lambda関数を実行します。

For more complex functions, where it might be unwieldy to include the function itself in each query that needs to use it, we can create a named function:

関数自体を使用する必要のある各クエリに含めるのが扱いにくい、より複雑な関数の場合は、名前付き関数を作成できます。

shell

```shell
CreateFunction({
  name: "increment",
  body: Query(Lambda("number", Add(1, Var("number"))))
})
```

Now that the function has been stored and has a name, we can run a query that executes our function like this:

関数が保存され、名前が付けられたので、次のように関数を実行するクエリを実行できます。

shell

```shell
Call(Function("increment"), 50)
```

When we do so, the result should be:

そうすると、結果は次のようになります。

```javascript
51
```

[`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) must be called with "server" or "admin" privileges.

注意
CreateFunction 「サーバー」または「管理者」権限で呼び出す必要があります。

## [](#schema)Schema for named functions

名前付き関数のスキーマ

UDFs are documents that exist within internal "functions" collection of Fauna, which can be referred to by name using the built-in [`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function) function. Each function document is stored within the context of the enclosing database: peer, parent, and child databases store functions independently.

UDFは、動物相の内部「関数」コレクション内に存在するドキュメントであり、組み込みFunction関数を使用して名前で参照できます 。各関数ドキュメントは、囲んでいるデータベースのコンテキスト内に格納されます。ピア、親、および子データベースは、関数を個別に格納します。

UDFは、Faunaの内部の "functions "コレクションの中に存在するドキュメントで、組み込みの[`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function)関数を使って名前で参照することができます。各関数のドキュメントは、そのデータベースのコンテキスト内に格納されます。つまり、ピアデータベース、親データベース、子データベースはそれぞれ独立して関数を格納します。

When a function is deleted, its definition and associated data becomes inaccessible and is deleted asynchronously.

関数が削除されると、その定義と関連データにアクセスできなくなり、非同期で削除されます。

|Field|Type|Definition and Requirements|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The name of the function. Cannot be `events`, `sets`, `self`, `documents`, or `_`.|
|`body`|[Query](https://docs.fauna.com/fauna/current/api/fql/types#query)|The query to be run when the function is executed. Must be wrapped in a `Query` function. See the [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function for more details.|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Optional- When the function is executed, it should be granted the privileges of the specified `role`. Can be one of `admin`, `server`, `server-readonly`, or `client`. See [Permissions](#permissions) for more details.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - A JSON object that can be used to store metadata about a function.|

|Field|Type|定義と要件|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|関数の名前です。event`、`sets`、`self`、`documents`、`_`は使用できません。|
|`body`|[Query](https://docs.fauna.com/fauna/current/api/fql/types#query)|この関数が実行されたときに実行されるクエリです。詳しくは [Lambda`]()をご覧ください。詳細は [Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) 関数を参照してください。|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|オプション- この関数を実行する際には、指定した `role` の権限を付与する必要があります。admin`, `server`, `server-readonly`, `client` のいずれかを指定します。詳しくは[Permissions](#permissions)を参照してください。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション-A JSON 関数に関するメタデータを格納するために使用できるオブジェクト。|

## [](#signature)Signature

署名

The signature of a UDF takes two parameters: an parameter list and a query expression to be executed.

UDFのシグニチャは、パラメータリストと実行されるクエリ式の2つのパラメータを取ります。

The parameter list specifies the name(s) of the parameters passed to the function upon execution. The parameter list could be a single [String](https://docs.fauna.com/fauna/current/api/fql/types#string) name, or an array of string names.

パラメータリストは、実行時に関数に渡されるパラメータの名前を指定します。パラメータリストは、単一の文字列名、または文字列名の配列にすることができます 。

The query expression is any valid FQL query.

クエリ式は、任意の有効なFQLクエリです。

To use named parameters within the query expression, use the `Var` function.

クエリ式内で名前付きパラメーターを使用するには、Var 関数を使用します。

### [](#examples)Examples

例

Consider the following anonymous function (which would result in an error if you attempt to execute it as is; there is no calling context):

次の無名関数を検討してください（そのまま実行しようとするとエラーが発生します。呼び出しコンテキストはありません）。

shell

```shell
Lambda("X", Var("X"))
```

This function’s parameter list is simply `X`, which specifies that this function accepts only one parameter and that the parameter’s name is `X`.

この関数のパラメーターリストは単純ですX。これは、この関数が1つのパラメーターのみを受け入れ、パラメーターの名前がX。であることを指定します 。

The function’s expression is `Var("X")`, which means that the function’s output, or return value, is simply the value of the `X` variable: this function returns the value that was provided to it.

関数の式はですVar("X")。これは、関数の出力または戻り値が単にX変数の値であることを意味します。この関数は、提供された値を返します。

A multi-parameter function might look like this:

マルチパラメータ関数は次のようになります。

shell

```shell
Lambda(
  ["X", "Y", "Z"],
  Format("%s %s %s", Var("X"), Var("Y"), Var("Z"))
)
```

This function accepts an array of parameters, called `X`, `Y`, and `Z`, and then formats the parameter values into a string showing all three values.

この関数は、呼び出されたパラメータの配列を受け取りX、YおよびZ、その後、すべての3つの値を示す文字列にパラメータ値をフォーマットします。

Functions must be executed with the same number of parameters that they are defined to accept.

重要
関数は、受け入れるように定義されているのと同じ数のパラメーターを使用して実行する必要があります。

## [](#permissions)Permissions

権限

By default, UDFs are executed with the privileges of the current query session. For example, if your client code connects to Fauna using a "client" key, any called UDFs would, by default, execute with "client" privileges. See [Keys](https://docs.fauna.com/fauna/current/security/keys) for more details.

デフォルトでは、UDF は現在のクエリセッションの権限で実行されます。たとえば、クライアントコードが「client」キーを使用してFaunaに接続している場合、呼び出されたUDFはデフォルトで「client」権限で実行されます。詳細は[Keys](https://docs.fauna.com/fauna/current/security/keys)を参照してください。

You can specify a `role` for named UDFs, which grants the functions of the named role while the UDF executes. This feature is similar to the Unix [_setuid_](https://en.wikipedia.org/wiki/Setuid) facility. For example, a function whose `role` field is set to `admin` can perform the same query that an "admin" key makes possible, even for sessions authenticated with "client" keys.

名前付きのUDFに``ロール`を指定すると、UDFの実行中に指定されたロールの機能が付与されます。この機能はUnixの[_setuid_](https://en.wikipedia.org/wiki/Setuid)機能に似ています。例えば、`role`フィールドが`admin`に設定された関数は、"client "キーで認証されたセッションであっても、"admin "キーが可能にするのと同じクエリを実行することができます。

## [](#limitations)Limitations

制限事項

-   A 30-second transaction timeout is imposed, which would typically be reached by a UDF that does not complete. When the timeout is reached, the transaction is terminated.

-   If a UDF causes a query process to exhaust available memory, the transaction is terminated.

-   Recursion is possible, but is limited to a depth of 200 calls.

-   In some contexts, such as within [index bindings](https://docs.fauna.com/fauna/current/api/fql/indexes#binding), using ["server read-only" keys](https://docs.fauna.com/fauna/current/security/keys#server-ro-role), or [attribute-based access control](https://docs.fauna.com/fauna/current/security/abac), functions may be restricted from performing write or read operations.

- 30秒のトランザクションタイムアウトが課せられます。これは通常、完了しないUDFによって到達されます。タイムアウトに達すると、トランザクションは終了します。

- UDFによってクエリプロセスが使用可能なメモリを使い果たすと、トランザクションは終了します。

- 再帰は可能ですが、200コールの深さに制限されています。

- インデックスバインディング内、 「サーバー読み取り専用」キーの使用、または 属性ベースのアクセス制御などの一部のコンテキストでは 、関数が書き込みまたは読み取り操作を実行することを制限される場合があります。

