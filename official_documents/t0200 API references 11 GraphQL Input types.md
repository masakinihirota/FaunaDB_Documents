Input types | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/input

# Input types

入力タイプ

As of release 1.1.0, the Fauna GraphQL API supports [user-defined input types](https://graphql.org/graphql-js/mutations-and-input-types/). For example:

リリース1.1.0では、Fauna GraphQL APIは[ユーザー定義の入力タイプ](https://graphql.org/graphql-js/mutations-and-input-types/)をサポートしています。たとえば、以下のようになります。

```graphql
input ActiveUserInput {
  username: String!
  timestamp: Time!
}
```

Input types are used to convey complex arguments to queries or field resolvers, or simply to establish a common name for frequently used arguments.

convey
伝える

入力タイプは、複雑な引数をクエリやフィールドリゾルバに伝えるため、あるいは単に頻繁に使用される引数の共通名を確立するために使用されます。

## [](#naming-considerations)Naming considerations

命名に関する考慮事項

The Fauna GraphQL API automatically creates input types for user-defined types. For example, when you create a `User` type:

Fauna GraphQL API は、ユーザー定義の型に対する入力型を自動的に作成します。例えば、`User` 型を作成すると、次のようになります。

```graphql
type User {
  username: String!
}
```

the input type `UserInput` is automatically created for you:

入力タイプUserInputは自動的に作成されます。

```graphql
input UserInput {
  username: String!
}
```

The Fauna GraphQL API also automatically creates the mutations `createUser` and `updateUser`, both of this use the auto-created `UserInput` input type.


Fauna GraphQL APIでは、`createUser`と`updateUser`というミューテーションも自動的に作成され、どちらも自動作成された`UserInput`という入力タイプを使用します。


Typically, you would not need to create input types yourself. If you define your own `UserInput` type, which does not include the `username` field, that could prevent the `createUser` and `updateUser` mutations from working correctly.


通常は、入力タイプを自分で作成する必要はありません。`username`フィールドを含まない独自の`UserInput`型を定義すると、`createUser`と`updateUser`の変異が正しく動作しなくなる可能性があります。


However, if you define a query or mutation that is connected to a user-defined Fauna function, using the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive, your function might require a custom input type to pass all of the required data. In this case, a best practice is to name your custom input type using the function name. For example:

ただし、[`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver)ディレクティブを使用して、ユーザー定義のFauna関数に接続されるクエリやミューテーションを定義した場合、その関数では、必要なデータをすべて渡すためにカスタムの入力タイプが必要になることがあります。このような場合は、関数名を使ってカスタム入力タイプの名前を付けるのがベストです。例えば、以下のようになります。


graphql

```graphql
input ActiveUserInput {
  username: String!
  timestamp: Time!
}

type Query {
  active(user: ActiveUserInput!): Boolean! @resolver
}
```

