User-defined functions | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/functions

# User-defined functions

ユーザー定義関数

User-defined functions (UDF) are [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) functions, and they can be exposed through the GraphQL API by using the [`@resolver`](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) directive at fields in the Query and Mutation types. This directive has no effect if placed elsewhere.

ユーザー定義関数（UDF）は、動物相クエリ言語 Lambda関数であり、 GraphQL@resolverクエリおよびクエリのフィールドでディレクティブを使用するAPI 突然変異タイプ。このディレクティブは、他の場所に配置された場合は効果がありません。

The UDF **must** accept an array of arguments, the same number and order as the associated field in the GraphQL schema. While an FQL function can accept a single argument as a scalar value, the GraphQL API **always** passes arguments, even a single argument, as an array. There is no association between the arguments' names in the GraphQL schema and the arguments' names in the UDF definition. When a UDF field is queried, the GraphQL API simply calls the underlying UDF with an array of the given arguments.

UDFは、引数の配列を受け入れる必要があります。これは、の関連フィールドと同じ番号と順序です。GraphQLスキーマ。FQL関数は単一の引数をスカラー値として受け入れることができますが、GraphQLAPIは 、単一の引数であっても、常に引数を配列として渡します。の引数の名前の間に関連付けはありませんGraphQLUDF定義のスキーマと引数の名前。UDFフィールドが照会されると、 GraphQL APIは、指定された引数の配列を使用して、基になるUDFを呼び出すだけです。

The UDF result type must be a GraphQL-compatible type. If an object is returned, an equivalent type must exist in the GraphQL schema to allow users to select which fields to return. [Embedded](https://docs.fauna.com/fauna/current/api/graphql/directives/d_embedded) types can be used to map return types that are not associated with any existing type.

UDF結果タイプはGraphQL互換タイプである必要があります。オブジェクトが返される場合、同等の型がに存在する必要がありますGraphQLユーザーが返すフィールドを選択できるようにするスキーマ。 埋め込み型を使用して、既存の型に関連付けられていない戻り型をマップできます。

UDFs with pagination support must return a database page. In addition to the function arguments, the API calls the UDF with three additional arguments appended the query’s arguments:

ページ付けをサポートするUDFは、データベースページを返す必要があります。関数の引数に加えて、APIはクエリの引数に追加された3つの追加の引数を使用してUDFを呼び出します。

-   `size`: the requested page size
-   `after`: a marker for the page of results following the current page, if available (`null` if not).
-   `before`: a marker for the page of result before the current page, if available (`null` if not).

- size：要求されたページサイズ
- after：現在のページに続く結果のページのマーカー（利用可能なnull場合）（利用できない場合）。
- before：現在のページより前の結果のページのマーカー（使用可能なnull場合）（使用できない場合）。

A UDF’s implementation must account for these additional arguments and call the appropriate form of the FQL [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) function to return a database page to the GraphQL API.

UDFの実装では、これらの追加の引数を考慮し、適切な形式のFQLPaginate関数を呼び出して、データベースページをGraphQL API。

When a schema is [imported](https://docs.fauna.com/fauna/current/api/graphql/endpoints#import) that involves the `@resolver` directive, the import logic checks for an existing UDF having the specified name. If no UDF exists with the specified name, a "template" UDF is created for you. The template UDF aborts the query with an error, since the actual logic to handle the field has not been implemented.

ディレクティブを含むスキーマがインポートされる@resolverと、インポートロジックは指定された名前を持つ既存のUDFをチェックします。指定された名前のUDFが存在しない場合は、「テンプレート」UDFが作成されます。フィールドを処理する実際のロジックが実装されていないため、テンプレートUDFはエラーでクエリを中止します。

Once a template UDF has been created, you can update the UDF with the actual functionality. For example:

テンプレートUDFが作成されたら、実際の機能でUDFを更新できます。例えば：

shell

```shell
Update(
  Function("my_function"),
  {
    "body": Query(
      Lambda(["param1", "param2"],
       // your logic here
     )
  }
)
```

If you attempt to run [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) using the template UDF’s name, you receive an error because the UDF already exists.

CreateFunctionテンプレートUDFの名前を使用して実行しようとすると、UDFがすでに存在するため、エラーが発生します。

## [](#examples)Examples

例

-   [A UDF that returns a scalar type:](#scalar)
-   [A UDF that returns an embedded object](#embedded)
-   [A UDF that returns a database page](#paginated)

- スカラー型を返すUDF：
- 埋め込みオブジェクトを返すUDF
- データベースページを返すUDF

### [](#scalar)A UDF that returns a scalar type:

スカラー型を返すUDF：

The following is a UDF, using Fauna Shell syntax, that returns a scalar type:

以下は、Fauna Shell構文を使用したUDFで、スカラー型を返します。

shell

```shell
CreateFunction({
  name: "say_hello",
  body: Query(Lambda(["name"],
    Concat(["Hello ", Var("name")])
  ))
})
```

A GraphQL schema that uses the UDF:

A GraphQL UDFを使用するスキーマ：

graphql

```graphql
type Query {
  sayHello(name: String!): String! @resolver(name: "say_hello")
}
```

With these in place, when you run the following query:

これらを適切に配置して、次のクエリを実行すると、次のようになります。

graphql

```graphql
{
  sayHello(name: "Jane")
}
```

The result should be:

結果は次のようになります。

```json
{
  "data": {
    "sayHello": "Hello Jane"
  }
}
```

### [](#embedded)A UDF that returns an embedded object

埋め込みオブジェクトを返すUDF

The following is a UDF, in Fauna Shell syntax, that returns an embedded object:

以下は、Fauna Shell構文のUDFで、埋め込みオブジェクトを返します。

shell

```shell
CreateFunction({
  name: "sample_obj",
  body: Query(Lambda([], {
    time: Time("now"),
    sample: true
  }))
})
```

A GraphQL schema that uses the UDF:

A GraphQL UDFを使用するスキーマ：

graphql

```graphql
type SampleObj @embedded {
  time: Time!
  sample: Boolean!
}

type Query {
  sampleObj: SampleObj! @resolver(name: "sample_obj")
}
```

With these in place, when you run the following query:

これらを適切に配置して、次のクエリを実行すると、次のようになります。

graphql

```graphql
{
  sampleObj {
    time
    sample
  }
}
```

The result should be:

結果は次のようになります。

```json
{
  "data": {
    "sampleObj": {
      "time": "2019-06-14T17:42:54.001987Z",
      "sample": true
    }
  }
}
```

### [](#paginated)A UDF that returns a database page

データベースページを返すUDF

The following is a UDF (along with a Collection and Index), in Fauna Shell syntax, that handles paginated results, so that repeated querying can retrieve all of the paginated results.

以下は、Fauna Shell構文のUDF（およびコレクションとインデックス）であり、ページ付けされた結果を処理します。これにより、クエリを繰り返すと、ページ付けされたすべての結果を取得できます。

shell

```shell
CreateCollection({
  name: "users"
})
```

shell

```shell
CreateIndex({
  name: "vip_users",
  source: Collection("users"),
  terms: [{ field: [ "data", "vip" ] }]
})
```

shell

```shell
CreateFunction({
  name: "vip_users",
  body: Query(Lambda(["size", "after", "before"],
    Let(
      {
        match: Match(Index("vip_users"), true),
        page: If(
          Equals(Var("before"), null),
          If(
            Equals(Var("after"), null),
              Paginate(Var("match"), { size: Var("size") }),
              Paginate(Var("match"), { size: Var("size"), after: Var("after") })
          ),
          Paginate(Var("match"), { size: Var("size"), before: Var("before") }),
        )
      },
      Map(Var("page"), Lambda("ref", Get(Var("ref"))))
    )
  ))
})
```

The function accepts the following parameters:

この関数は、次のパラメーターを受け入れます。

-   `size`: The maximum number of items to include in a [Page](https://docs.fauna.com/fauna/current/api/fql/types#page) of results.

size：結果のページに含めるアイテムの最大数。

-   `after`: a marker representing the next page of results. If there are no more results, `after` is `null`. If there are more results following the current page, the `after` points to the first item in the following page.

after：結果の次のページを表すマーカー。これ以上結果がない場合は、afterですnull。現在のページの後にさらに結果がある場合afterは、次のページの最初の項目を指します。

-   `before`: a marker representing the previous page of results. If there are no previous results, `before` is `null`. If there are previous results before the current page, the `before` points to `size` items before the current page, or the first available item if the current page does not start on a multiple of `size`.

- `before`: 結果の前のページを表すマーカーです。前の結果がない場合、`before` は `null` となります。現在のページより前の結果がある場合、`before` は現在のページより前の `size` のアイテムを指し、現在のページが `size` の倍数で始まっていない場合は、最初の利用可能なアイテムを指します。

The function’s complexity comes from handling the `null` cases for `after` and `before`. In each case, a the result of a [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) call is assigned to the `page` variable, which is used in the [`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map) function call (at the end) to fetch the details for the page of results.

機能の複雑さは、取り扱いから来るnullのための例を afterしてbefore。いずれの場合も、Paginate 呼び出しの結果がpage変数に割り当てられます。この変数は、Map 結果のページの詳細をフェッチするために（最後に）関数呼び出しで使用されます。

A GraphQL schema that uses the UDF:

A GraphQL UDFを使用するスキーマ：

graphql

```graphql
type User @collection(name: "users") {
  username: String!
  vip: Boolean!
}

type Query {
  vips: [User!] @resolver(name: "vip_users", paginated: true)
}
```

With these in place, when you run the following query:

これらを適切に配置して、次のクエリを実行すると、次のようになります。

graphql

```graphql
{
  vips(
    _size: 2
    _cursor: "2DOB2DRyMjM1MTcwOTY5MDA0NTQwNDIzgWV1c2Vyc4FnY2xhc3Nlc4CAgIA="
  ) {
    data {
      username
    }
    after
    before
  }
}
```

Notice that our query includes `_size` and `_cursor` as arguments to the resolver, and `after` and `before` in the results. The `_cursor` parameter is a value acquired after performing the initial query (not shown here), which provided the value in the `after` or `before` fields in the results. A cursor includes both the position and direction, which the GraphQL API uses to populate the `after` and `before` parameters passed to the underlying FQL function.

今回のクエリでは、リゾルバへの引数として `_size` と `_cursor` が含まれており、結果には `after` と `before` が含まれていることに注目してください。`cursor`パラメータは、最初のクエリ（ここでは表示されていません）を実行した後に取得した値で、結果の`after`または`before`フィールドの値を提供しています。カーソルには、位置と方向の両方が含まれており、GraphQL APIはこれを使って、下層のFQL関数に渡される `after` と `before` のパラメータを生成します。

The result should be:

結果は次のようになります。

```json
{
  "data": {
    "vips": {
      "data": [
        { "username": "Mary" },
        { "username": "Ted" }
      ],
      "after": null,
      "before": "2DKB2DRyMjM1MTcwOTY5MDA0NTQwNDIzgWV1c2Vyc4FnY2xhc3Nlc4CAgIA="
    }
  }
}
```

From the results, we can see that `after` is `null`, which means that there are no more following pages of results, but that `before` is defined. A subsequent query can pass the value of `before` as the `_cursor` argument to receive the page of results prior to the current results.

結果を見ると、`after`は`null`であり、これは後続の結果ページがないことを意味しますが、`before`は定義されていることがわかります。後続のクエリでは、`before` の値を `_cursor` の引数として渡すことで、現在の結果の前のページの結果を受け取ることができます。

## [](#next-steps)Next steps
-   [Endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints)
-   [Directives](https://docs.fauna.com/fauna/current/api/graphql/directives/)
-   [Relations](https://docs.fauna.com/fauna/current/api/graphql/relations)

## 次のステップ
- エンドポイント
- 指令
- 関係

