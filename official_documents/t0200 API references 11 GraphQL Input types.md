Input types | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/input

# Input types

入力タイプ

As of release 1.1.0, the Fauna GraphQL API supports [user-defined input types](https://graphql.org/graphql-js/mutations-and-input-types/). For example:

リリース1.1.0の時点で、動物相 GraphQLAPIは、ユーザー定義の入力タイプをサポートし ます。例えば：

graphql

```graphql
input ActiveUserInput {
  username: String!
  timestamp: Time!
}
```

Input types are used to convey complex arguments to queries or field resolvers, or simply to establish a common name for frequently used arguments.

入力タイプは、複雑な引数をクエリまたはフィールドリゾルバに伝達するため、または単に頻繁に使用される引数の共通名を確立するために使用されます。

## [](#naming-considerations)Naming considerations

命名に関する考慮事項

The Fauna GraphQL API automatically creates input types for user-defined types. For example, when you create a `User` type:

動物相 GraphQLAPIは、ユーザー定義型の入力型を自動的に作成します。たとえば、Userタイプを作成する場合：

graphql

```graphql
type User {
  username: String!
}
```

the input type `UserInput` is automatically created for you:

入力タイプUserInputは自動的に作成されます。

graphql

```graphql
input UserInput {
  username: String!
}
```

The Fauna GraphQL API also automatically creates the mutations `createUser` and `updateUser`, both of this use the auto-created `UserInput` input type.

動物相 GraphQLAPIは自動的にミューテーションcreateUserを作成しupdateUser、どちらも自動作成 された UserInput入力型を使用します。

Typically, you would not need to create input types yourself. If you define your own `UserInput` type, which does not include the `username` field, that could prevent the `createUser` and `updateUser` mutations from working correctly.

通常、入力タイプを自分で作成する必要はありません。 フィールドをUserInput含まない独自のタイプを定義するとusername、createUserおよびupdateUserミューテーションが正しく機能しなくなる可能性があります。

However, if you define a query or mutation that is connected to a user-defined Fauna function, using the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive, your function might require a custom input type to pass all of the required data. In this case, a best practice is to name your custom input type using the function name. For example:

しかし、[`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver)ディレクティブを使って、ユーザー定義のFauna関数に接続されるクエリやミューテーションを定義した場合、その関数では、必要なデータをすべて渡すためにカスタム入力タイプが必要になることがあります。このような場合は、関数名を使ってカスタム入力タイプの名前を付けるのがベストです。例えば、以下のようになります。

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
