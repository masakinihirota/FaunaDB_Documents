@resolver | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver

# `@resolver`

Specifies the name of a Fauna user-defined function to use instead of a default field value resolver.

デフォルトのフィールド値リゾルバーの代わりに使用するFaunaユーザー定義関数の名前を指定します。

## [](#location)Location

Fields within the Query or Mutation types.

クエリ内のフィールドまたは 突然変異 タイプ。

## [](#arguments)Arguments

引数

|Argument|Type|Required|Default|Description|
|--|--|--|--|--|
|`name`|String|No|The field’s name.|The name for the resolver function.|
|paginated|Boolean|No|false|When `true`, the resolver accepts three arguments, `size`, `afterCursor`, and `beforeCursor`, and then returns a [Page](https://docs.fauna.com/fauna/current/api/fql/types#page) of results. See the [Example](#example) below, and the [UDF that returns a database page](https://docs.fauna.com/fauna/current/api/graphql/functions).|

|引数|Type|必須|既定|説明|
|--|--|--|--|--|
|`name`|String|No|フィールドの名前。|リゾルバー関数の名前。|
|paginated|ブール値|番号|false|`true`の場合、リゾルバは`size`, `afterCursor`, `beforeCursor`の3つの引数を受け取り、結果を[ページ](https://docs.fauna.com/fauna/current/api/fql/types#page)として返します。下記の[例](#example)や、[データベースのページを返すUDF](https://docs.fauna.com/fauna/current/api/graphql/functions)を参照してください。|

## [](#description)Description

説明

The `@resolver` directive marks a Query or Mutation that has an associated user-defined function in the database. Queries to fields annotated with the `@resolver` directive are resolved by calling the underlying user-defined function, which is a [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function.

`@resolver` ディレクティブは、データベース内で関連するユーザ定義関数を持つクエリやミューテーションをマークします。これは[Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)の関数です。

The name of the function is controlled by the `name` argument, which defaults to the name of the field. The `paginated` argument controls pagination support for the values returned by the user-defined function.

関数の名前は `name` 引数で制御され、デフォルトではフィールドの名前が使われます。`paginated` 引数は、ユーザ定義関数が返す値のページネーションのサポートを制御します。


When a schema is imported into the GraphQL API, resolvers for your schemas fields are automatically generated. When you apply the `@resolver` directive to a query field, the named resolver is used instead of the automatically-generated resolver for the field.

スキーマがGraphQL APIにインポートされると、スキーマのフィールドに対するリゾルバが自動的に生成されます。クエリのフィールドに `@resolver` ディレクティブを適用すると、そのフィールド用に自動生成されたリゾルバの代わりに、名前の付いたリゾルバが使われます。

The GraphQL API always passes arguments to resolver’s user-defined function as an array. Even if your schema only ever passes one argument to your resolver, you must implement the resolver’s user-defined function to accept the arguments as an array. See the `function_names` function in the [Example](#example) section.


GraphQL APIでは、リゾルバのユーザー定義関数への引数は常に配列として渡されます。たとえスキーマがリゾルバに渡す引数がひとつだけであっても、リゾルバのユーザー定義関数が引数を配列として受け取るように実装する必要があります。Example](#example)セクションの `function_names` 関数を参照してください。


User-defined functions cannot be created directly with GraphQL queries. When you import a schema that refers to a resolver that does not exist, the GraphQL API creates "stub" functions that throw resolver-specific errors reminding you to implement them. For example, if your GraphQL schema referred to an unimplemented resolver called `prune_order`, the GraphQL API would create the following function:


ユーザー定義関数は、GraphQLクエリでは直接作成できません。存在しないリゾルバを参照しているスキーマをインポートすると、GraphQL APIは「スタブ」関数を作成し、リゾルバ固有のエラーを投げて、実装するように促す。例えば、あなたのGraphQLスキーマが `prune_order` という未実装のリゾルバを参照している場合、GraphQL APIは以下のような関数を作成します。

```shell
Get(Function("prune_order"))
```

```
{
  ref: Function("prune_order"),
  ts: 1613415645650000,
  name: 'prune_order',
  data: {
    gql: {
      ts: Time("2021-02-15T19:00:45.526Z"),
      meta: {
        location: 'Mutation',
        field: {
          name: 'pruneOrder',
          directives: [
            {
              name: 'resolver',
              args: { name: 'prune_order', paginated: false }
            }
          ],
          type: { NotNull: { Named: 'Order' } },
          arguments: [
            { name: 'customerId', type: { NotNull: { Named: 'ID' } } }
          ]
        }
      }
    }
  },
  body: Query(Lambda("_", Abort("Function prune_order was not implemented yet. Please access your database and provide an implementation for the prune_order function.")))
}
```

To implement the resolver, you should use the [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update) function to replace the function’s `body` field definition.

リゾルバーを実装するには、Update関数を使用して関数のbodyフィールド定義を置き換える必要があります。

Any functions created by the GraphQL API include a `data` field that contains metadata about the resolver: if you delete the function and recreate it with the desired `body` function, you would lose the GraphQL metadata, which would prevent the resolver from functioning.

重要
GraphQL APIで作成された関数には、リゾルバに関するメタデータを含む`data`フィールドが含まれています。この関数を削除して、目的の`body`関数で再作成すると、GraphQLメタデータが失われてしまい、リゾルバが機能しなくなります。

For more information, see [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions).

詳細については、ユーザー定義関数を参照してください。

## [](#example)Example

The following two FQL queries each create a function:

次の2つのFQLクエリは、それぞれ関数を作成します。

```shell
CreateFunction({
  name: "say_hello",
  body: Query(Lambda([], "hello"))
})
```

```shell
CreateFunction({
  name: "function_names",
  body: Query(Lambda(["size", "afterCursor", "beforeCursor"],
    Map(
      Paginate(Functions()),
      Lambda("ref",
        Select("name", Get(Var("ref")))
      )
    )
  ))
})
```

The first function, called `say_hello`, only returns the string `hello`. The second function, called `function_names`, returns the list of functions defined in the database. For a more in-depth example, see [A UDF that returns a database page](https://docs.fauna.com/fauna/current/api/graphql/functions#paginated).

最初の関数は `say_hello` という名前で、`hello` という文字列だけを返します。2つ目の関数は`function_names`という名前で、データベースで定義されている関数のリストを返します。より詳細な例については，[A UDF that returns a database page](https://docs.fauna.com/fauna/current/api/graphql/functions#paginated)を参照してください．

We can use these function in GraphQL queries by using the following schema:

これらの関数は、次のようなスキーマを使って、GraphQLのクエリで使用することができます。

```graphql
type Query {
  sayHello: String! @resolver(name: "say_hello")
  functionNames: [String!] @resolver(name: "function_names", paginated: true)
}
```

With the functions and the schema in place, we can call the first function with this GraphQL query:

関数とスキーマの準備ができたら、次のGraphQLクエリで最初の関数を呼び出してみましょう。

```graphql
{
  sayHello
}
```

which should produce the following response:

これにより、次の応答が生成されます。

```json
{
  "data": {
    "sayHello": "hello"
  }
}
```

Calling the second function would look like this:

2番目の関数の呼び出しは次のようになります。

graphql

```graphql
{
  functionNames {
    data
  }
}
```

And the response would look like:

そして、応答は次のようになります。

```json
{
  "data": {
    "functionNames": {
      "data": [
        "function_names",
        "say_hello"
      ]
    }
  }
}
```

