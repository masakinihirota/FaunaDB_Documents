partial-update-mutation | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/previews/partial_update_mutation

# `partial-update-mutation`

When this preview feature is [enabled](https://docs.fauna.com/fauna/current/api/graphql/previews/#enable), it automatically generates an input type and mutation to support partial document updates.

このプレビュー機能を 有効にすると、ドキュメントの部分的な更新をサポートするための入力タイプとミューテーションが自動的に生成されます。

Enable this preview when querying via the [`/graphql` endpoint](https://docs.fauna.com/fauna/current/api/graphql/endpoints).

/graphqlエンドポイントを介してクエリを実行する場合は、このプレビューを有効にし ます。

For example, if `partial-update-mutation` is enabled and you import the following schema:

たとえば、partial-update-mutationが有効で、次のスキーマをインポートする場合：

graphql

```graphql
type User {
  username: String!
  password: String!
}
```

Then, apart from all of the elements that are generated automatically, an additional new `partialUpdate<Type>` mutation and an additional `PartialUpdate<Type>Input` input type are created as well:

そして、自動的に生成されたすべての要素とは別に、追加の新しい `partialUpdate<Type>` 変異と追加の `PartialUpdate<Type>Input` 入力タイプも作成されます。

graphql

```graphql
type Mutation {
  partialUpdateUser(id: ID!, data: PartialUpdateUserInput!): User
}

type PartialUpdateUserInput {
  username: String
  password: String
}
```

All of the fields are optional in the new input type, and any required fields are validated at runtime when executing the query.

新しい入力タイプでは、すべてのフィールドはオプションであり、必要なフィールドはすべて、クエリの実行時に実行時に検証されます。

