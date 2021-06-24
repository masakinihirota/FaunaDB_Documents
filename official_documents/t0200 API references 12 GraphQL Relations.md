GraphQL relations | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/relations

# GraphQL relations

The Fauna GraphQL API recognizes relationships based on the fields in the GraphQL schema imported. The relationship recognition algorithm looks at every field for all non-embedded types, if it finds a field in the source type where its return is also non-embedded type, it tries to find a field in the target type that points back to the source. The resulting relationship cardinality depends on the presence, absence, or cardinality of matching fields found.

Fauna GraphQL API は、インポートされた GraphQL スキーマのフィールドに基づいて関係を認識します。リレーションシップ認識アルゴリズムは、すべての非埋め込み型のフィールドを調べ、ソースの型の中に、そのリターンも非埋め込み型であるフィールドが見つかると、ターゲットの型の中に、ソースを指し示すフィールドを見つけようとします。結果として得られるリレーションシップのカーディナリティは、一致するフィールドの有無やカーディナリティによって決まる。

During schema import, the GraphQL API creates the necessary collections and indexes to correlate the data based on the recognized relationships in the schema.

スキーマのインポート時に、GraphQL APIは、スキーマで認識されたリレーションシップに基づいてデータを関連付けるために必要なコレクションとインデックスを作成します。

It is important to notice that the cardinality of the relationship depends on the direction observed. A one-to-many relationship from left to right, is interpreted as a many-to-one relationship when evaluated from right to left. The GraphQL API make sure to consistently read from the shared database components that are required to fulfill relational queries regardless of which side of the relationship is queried.

cardinality
濃度

ここで重要なのは、関係のカーディナリティは観察された方向に依存するということである。左から右への一対多の関係は、右から左へ評価されると多対一の関係になると解釈される。GraphQL APIは、関係のどちら側に問い合わせがあっても、リレーショナルクエリを実行するために必要な共有データベースコンポーネントから一貫して読み取るようになっている。

If, during import, the relationship recognition fails to recognize a relationship, it returns an error requiring that relationships must be made explicit. Relationships can be made explicit by adding the `@relation` directive, with the same relation name, at both fields involved in the relationship.

インポート時にリレーションシップの認識に失敗した場合は、リレーションシップを明示する必要があるというエラーが返される。関係を明示的にするには、その関係に関わる両方のフィールドに、同じ関係名を持つ`@relation`指示文を追加します。

This section describes the [One-to-one](#one2one), [One-to-many](#one2many), [Many-to-one](#many2one), and [Many-to-many](#many2many) relationships, as well as how to [combine multiple relationships](#combine), and [relational mutations](#mutations).

このセクションでは、[一対一](#one2one)、[一対多](#one2many)、[多対一](#many2one)、[多対多](#many2many)のリレーションと、[複数のリレーションを組み合わせる](#combine)、[リレーションの変異](#mutations)の方法について説明します。

## [](#one2one)One-to-one

一対一の関係

A one-to-one relationship puts a low cardinality constraint in a relationship between two types. It is represented in a GraphQL schema by two types where each one of them has a field that points to each other.

1対1の関係は、2つのタイプ間の関係に低いカーディナリティの制約を加えるものである。GraphQLのスキーマでは、2つの型で表現され、それぞれの型がお互いを指すフィールドを持ちます。

In the following example, a `User` can own a `Car`, while a `Car` can be owned by a single `User`. If we try to associate a `User` to different `car`s, we get a unique constraint violation error.

以下の例では、`User`は`Car`を所有できますが、`Car`は一人の`User`が所有できます。ある`User`を異なる`Car`に関連付けようとすると、一意性制約違反のエラーが発生します。

```graphql
type User {
  name: String!
  car: Car
}

type Car {
  plate: String!
  owner: User
}
```

In the database, a single collection is predictably chosen to store relational data. If the `Car` collection is selected, its `owner` field contains a reference the associated `User` document while there is no `car` field in the `User` documents. A unique index is created on the `Car` collection with the `owner` field as a single term to enforce the low cardinality constraint.

データベースでは、リレーショナルデータを格納するために単一のコレクションが予想通りに選択されます。`Car`コレクションが選択された場合、その`owner`フィールドには関連する`User`ドキュメントへの参照が含まれますが、`User`ドキュメントには`car`フィールドは存在しません。`Car`コレクションに対して、`owner`フィールドを1つの用語にしたユニークなインデックスを作成して、低いカーディナリティの制約を適用します。

## [](#one2many)One-to-many

一対多の関係

A one-to-many relationship has high cardinality at only one side of the relationship. It is represented in the GraphQL schema by two types where the source has an array field that points to the target type, while the target type has a non-array field that points back to the source type.

一対多の関係は、関係の片側だけが高いカーディナリティを持ちます。GraphQLスキーマでは2つの型で表現され、ソース型はターゲット型を指す配列フィールドを持ち、ターゲット型はソース型を指す非配列フィールドを持ちます。

In the following example, a `User` can have many `Car`s, while a `Car` can be associated with a single `User`.

以下の例では、`User`は多くの`Car`を持つことができ、`Car`は1つの`User`に関連付けることができます。

```graphql
type User {
  name: String!
  cars: [Car!] @relation
}

type Car {
  plate: String!
  owner: User!
}
```

Please note that we added the `@relation` directive to the `cars` field, otherwise the field would be stored an array of IDs instead of establishing a high cardinality relationship.

そうしないと、このフィールドは高いカーディナリティのリレーションを確立する代わりに、IDの配列として格納されてしまうからです。

In the database, the collection with the non-array field is used to store relational data. In this case, the `owner` field in the `Car` documents contain a reference to the associated `User` document. A non-unique index is created on the `Car` collection with the `owner` field as a single term to allow the GraphQL API to read all `Car`s associated with a given `User`. There is no `cars` field in the `User` documents.

データベースでは、配列ではないフィールドを持つコレクションがリレーショナルデータの格納に使用されます。この場合、`Car`ドキュメントの`owner`フィールドには、関連する`User`ドキュメントへの参照が格納されます。GraphQL APIで特定の`User`に関連する全ての`Car`を読み取ることができるように、`Car`コレクションには`owner`フィールドを1つの用語とする固有でないインデックスが作成されます。`User` のドキュメントには `cars` フィールドはありません。

## [](#many2one)Many-to-one

多対多

The many-to-one relationship works the same as the [one-to-many](#one2many) relationship. They are technically the same relationship, but a many-to-one relationship is evaluated from the other side. However, there is one particular derivation difference: the array field can be omitted.

多対一の関係は、[一対多](#one2many)の関係と同じように機能します。これらは技術的には同じ関係ですが、多対一の関係は反対側から評価されます。ただし、派生的には特に違いがあり、配列フィールドを省略することができます。

In the following example, a `Car` can be associated with a single `User`, while a `User` is unaware of its association with `Car`s. There is not enough evidence to categorize this relationship as one-to-one since the same `User` can be associated with multiple `Car`s.

以下の例では、`Car`は一人の`User`と関連付けることができ、`User`は`Car`との関連付けを意識しないということになります。同じ`User`が複数の`Car`に関連付けられることがあるので、この関係を一対一に分類するには十分な証拠がない。

```graphql
type User {
  name: String!
}

type Car {
  plate: String!
  owner: User!
}
```

The underlying database components and API behavior are identical to a one-to-many relationship.

基本となるデータベースコンポーネントとAPIの動作は、一対多のリレーションと同じです。

## [](#many2many)Many-to-many

多対多の関係

A many-to-many relationship has high cardinality on both sides of the relationship. It is represented in the GraphQL schema by two types, each with fields that point to each other, where all fields are arrays.

多対多の関係は、関係の両側で高いカーディナリティを持ちます。GraphQLスキーマでは2つのタイプで表現され、それぞれがお互いを指し示すフィールドを持ち、すべてのフィールドが配列である。

In the following example, a `User` can drive many `Car`s, while a `Car` can be driven by many `User`s.

以下の例では、`User`は多数の`Car`を運転することができ、`Car`は多数の`User`によって運転されることができる。

graphql

```graphql
type User {
  name: String!
  drives: [Car!] @relation
}

type Car {
  plate: String!
  drivers: [User!] @relation
}
```

Note that the `@relation` directive was added to both the `drivers` and `drives` fields, otherwise they would be stored arrays of IDs instead of establishing a high-cardinality relationship.

`drivers` と `drives` の両方のフィールドに `@relation` ディレクティブが追加されていることに注意してください。そうしないと、高いカーダナリティの関係を確立する代わりに、IDの配列が格納されてしまいます。

In the database, neither relational fields exist in the `User` or `Car` documents. Instead, an associative collection is created to store references to each side of the relationship. Three indexes are created on the associative collection, one with the `User` reference as a term, the other with the `Car` reference as a term, and one with both the `User` and `Car` references as terms. The created indexes are used by the GraphQL API to read the associated documents, depending on which side of the relationship is queried.

データベースでは、`User`や`Car`のドキュメントにはリレーショナル・フィールドは存在しません。代わりに，関係の各側への参照を格納するために連想コレクションが作成されます．連想コレクションには3つのインデックスが作成されます。1つは`User`の参照を用語とし、もう1つは`Car`の参照を用語とし、もう1つは`User`と`Car`の両方の参照を用語としています。作成されたインデックスは、関係性のどちら側に問い合わせがあったかに応じて、関連するドキュメントを読み取るためにGraphQL APIで使用されます。

## [](#combine)Combining multiple relationships

複数のリレーションを組み合わせる

When describing complex types in the GraphQL schema, the API may not be able to precisely recognize relationships. For example:

GraphQLスキーマに複雑な型を記述する場合、APIが関係を正確に認識できない場合がある。例えば、以下のように

graphql

```graphql
type User {
  name: String!
  owns: Car!
}

type Car {
  plate: String!
  owner: User!
  driver: User!
}
```

In the schema above, there is the `owns` field in the `User` type that refers to a `Car`. However, there are multiple fields in the `Car` type that refer back to the `User` type. The API is not able to decide which field should be used to form the relationship, so it returns an error asking that the relationship be made explicit.

上のスキーマでは、`User`型の中に`Car`を参照する`own`フィールドがあります。しかし、`Car`型には`User`型を参照する複数のフィールドがあります。APIはどのフィールドを使って関係を構築すべきか判断できないので、関係を明示するように求めるエラーを返します。

To make a relationship explicit, add the `@relation` directive with the same `name` to both fields that participate in the relationship. For example:

explicit
明示的に

リレーションシップを明示的にするには、リレーションシップに参加する両方のフィールドに同じ `name` の `@relation` ディレクティブを追加します。例えば、以下のようになります。

graphql

```graphql
type User {
  name: String!
  owns: Car! @relation(name: "car_owner")
}

type Car {
  plate: String!
  owner: User! @relation(name: "car_owner")
  driver: User!
}
```

Now the API is able to recognize `owns` and `owner` as being part of a one-to-one relationship between `User` and `Car`. The `driver` field in the `Car` type is recognized as a many-to-one relationship.

これでAPIは、`owns`と`owner`を、`User`と`Car`の1対1の関係の一部として認識できるようになりました。また、`Car`型の`driver`フィールドは多対一の関係として認識されます。

When dealing with different relationships between the same types, it’s a good practice to make them explicit by using the `@relation` directive.

同じ型の間で異なる関係を扱う場合には、`@relation` ディレクティブを使って明示的にするのが良い方法です。

## [](#mutations)Relational mutations

リレーショナルミューテーション

When running mutations on types that contain relationships, you can create their related documents, or influence the relationship to existing documents, in the same transaction by using the relational mutations. There are three types of relational mutations: `create`, `connect`, and `disconnect`.

リレーションシップを含むタイプに対してミューテーションを実行する場合、リレーショナルミューテーションを使用することで、同じトランザクション内で関連するドキュメントを作成したり、既存のドキュメントのリレーションシップに影響を与えたりすることができます。リレーショナルミューテーションには3つのタイプがあります。リレーショナルミューテーションには、`create`、`connect`、`disconnect`の3種類があります。

### [](#create)`create`

The `create` mutation allows the creation of documents that are associated with the main target of the mutation. In the following example, we create a new `User` and, in the same transaction, two `Car`s that are associated with the `User`.

`create`のミューテーションでは、ミューテーションのメインターゲットに関連したドキュメントを作成することができます。以下の例では、新しい`User`を作成し、同じトランザクション内で`User`に関連付けられた2つの`Car`を作成します。

Schema:

```graphql
type User {
  name: String!
  cars: [Car!] @relation
}

type Car {
  plate: String!
  owner: User!
}
```

Query:

```graphql
mutation {
  createUser(data: {
    name: "Jane"
    cars: {
      create: [
        { plate: "AAA-1234" }
        { plate: "BBB-123" }
      ]
    }
  }) {
    _id
    name
    cars {
      data {
        plate
      }
    }
  }
}
```

Response:

```json
{
  "data": {
    "createUser": {
      "_id": "235184188140028419",
      "name": "Jane",
      "cars": {
        "data": [
          { "plate": "AAA-1234" },
          { "plate": "BBB-123" }
        ]
      }
    }
  }
}
```

### [](#connect)`connect`

The `connect` mutation allows the connection of the target document to an existing document. In the following example, we create a `Car` and connect it to an existing `User`.

`connect`というミューテーションは、対象となるドキュメントを既存のドキュメントに接続することができます。以下の例では、`Car`を作成して、既存の`User`に接続します。

Query:

graphql

```graphql
mutation {
  createCar(data: {
    plate: "CCC-123"
    owner: {
      connect: "235184188140028419"
    }
  }) {
    _id
    plate
    owner {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "createCar": {
      "_id": "235184601841009156",
      "plate": "CCC-123",
      "owner": {
        "name": "Jane",
      }
    }
  }
}
```

### [](#disconnect)`disconnect`

The `disconnect` mutation allows the disconnection of the target document from a connected document. In the following example, we update a `User` and disconnect it from one of its `Car`s.

`disconnect`という変異は、接続されているドキュメントから対象のドキュメントを切り離すことができます。次の例では、`User`を更新して、その`Car`の一つから切断します。

Query:

graphql

```graphql
mutation {
  updateUser(id: "235184188140028419", data: {
    name: "Jane"
    cars: {
      disconnect: "235184411358790151"
    }
  }) {
    _id
    cars {
      data {
        plate
      }
    }
  }
}
```

Response:

```json
{
  "data": {
    "updateUser": {
      "_id": "235184188140028419",
      "cars": {
        "data": [
          { "plate": "AAA-1234" },
          { "plate": "BBB-123" }
        ]
      }
    }
  }
}
```

## [](#next-steps)Next steps

次のステップ

-   [Endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

-   [Directives](https://docs.fauna.com/fauna/current/api/graphql/directives/)

-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)

---

- [エンドポイント](https://docs.fauna.com/fauna/current/api/graphql/endpoints)

- [ディレクティブ](https://docs.fauna.com/fauna/current/api/graphql/directives/)

- [ユーザー定義関数](https://docs.fauna.com/fauna/current/api/graphql/functions)

