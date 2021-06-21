GraphQL relations | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/relations

# GraphQL relations

GraphQL 関係

The Fauna GraphQL API recognizes relationships based on the fields in the GraphQL schema imported. The relationship recognition algorithm looks at every field for all non-embedded types, if it finds a field in the source type where its return is also non-embedded type, it tries to find a field in the target type that points back to the source. The resulting relationship cardinality depends on the presence, absence, or cardinality of matching fields found.

動物相 GraphQL APIは、のフィールドに基づいて関係を認識します GraphQLインポートされたスキーマ。関係認識アルゴリズムは、すべての非埋め込みタイプのすべてのフィールドを調べ、戻り値も非埋め込みタイプであるソースタイプのフィールドを見つけた場合、ソースを指すターゲットタイプのフィールドを見つけようとします。 。結果として得られる関係のカーディナリティは、見つかった一致するフィールドの存在、不在、またはカーディナリティによって異なります。

During schema import, the GraphQL API creates the necessary collections and indexes to correlate the data based on the recognized relationships in the schema.

スキーマのインポート中に、 GraphQL APIは、スキーマで認識された関係に基づいてデータを相互に関連付けるために必要なコレクションとインデックスを作成します。

It is important to notice that the cardinality of the relationship depends on the direction observed. A one-to-many relationship from left to right, is interpreted as a many-to-one relationship when evaluated from right to left. The GraphQL API make sure to consistently read from the shared database components that are required to fulfill relational queries regardless of which side of the relationship is queried.

関係のカーディナリティは、観察された方向に依存することに注意することが重要です。左から右への1対多の関係は、右から左への評価では多対1の関係として解釈されます。ザ・GraphQL APIは、リレーションシップのどちら側がクエリされているかに関係なく、リレーショナルクエリを実行するために必要な共有データベースコンポーネントから一貫して読み取るようにします。

If, during import, the relationship recognition fails to recognize a relationship, it returns an error requiring that relationships must be made explicit. Relationships can be made explicit by adding the `@relation` directive, with the same relation name, at both fields involved in the relationship.

インポート中に、関係の認識が関係の認識に失敗した場合、関係を明示的にする必要があるというエラーが返されます。関係に関係する@relation 両方のフィールドに同じ関係名でディレクティブを追加することにより、関係を明示的にすることができます。

This section describes the [One-to-one](#one2one), [One-to-many](#one2many), [Many-to-one](#many2one), and [Many-to-many](#many2many) relationships, as well as how to [combine multiple relationships](#combine), and [relational mutations](#mutations).

このセクションでは、説明 一対一、一対多、多対1、および多対多の 関係と同様にする方法を、複数の関係組み合わせ、およびリレーショナル変異を。

## [](#one2one)One-to-one

1対1

A one-to-one relationship puts a low cardinality constraint in a relationship between two types. It is represented in a GraphQL schema by two types where each one of them has a field that points to each other.

1対1の関係では、2つのタイプ間の関係にカーディナリティの制約が低くなります。それはで表されますGraphQL それぞれが互いに指すフィールドを持つ2つのタイプによるスキーマ。

In the following example, a `User` can own a `Car`, while a `Car` can be owned by a single `User`. If we try to associate a `User` to different `car`s, we get a unique constraint violation error.

次の例では、User所有することができCarながら、Car単一が所有することができますUser。Userを別 carのに関連付けようとすると、一意の制約違反エラーが発生します。

graphql

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

データベースでは、リレーショナルデータを格納するために単一のコレクションが予想どおりに選択されます。Carコレクションが選択されている場合、そのownerフィールドには関連するUserドキュメントへの参照が含まれますが、ドキュメントにはcarフィールドがありません User。低カーディナリティ制約を適用するためにCar、ownerフィールドを単一の用語としてコレクションに一意のインデックスが作成され ます。

## [](#one2many)One-to-many

1対多

A one-to-many relationship has high cardinality at only one side of the relationship. It is represented in the GraphQL schema by two types where the source has an array field that points to the target type, while the target type has a non-array field that points back to the source type.

1対多の関係では、関係の片側だけで高いカーディナリティがあります。それはで表されますGraphQL ソースがターゲットタイプを指す配列フィールドを持ち、ターゲットタイプがソースタイプを指す非配列フィールドを持っている2つのタイプによるスキーマ。

In the following example, a `User` can have many `Car`s, while a `Car` can be associated with a single `User`.

次の例では、aUserは多くCarのsを持つCar ことができますが、aは単一のに関連付けることができますUser。

graphql

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

フィールドに@relationディレクティブを追加したことに注意してくださいcars。そうしないと、高いカーディナリティ関係を確立する代わりに、フィールドにIDの配列が格納されます。

In the database, the collection with the non-array field is used to store relational data. In this case, the `owner` field in the `Car` documents contain a reference to the associated `User` document. A non-unique index is created on the `Car` collection with the `owner` field as a single term to allow the GraphQL API to read all `Car`s associated with a given `User`. There is no `cars` field in the `User` documents.

データベースでは、非配列フィールドのコレクションを使用してリレーショナルデータを格納します。この場合、ドキュメントのownerフィールドにはCar、関連するUserドキュメントへの参照が含まれています。一意でないインデックスがCarコレクションに作成され、ownerフィールドが単一の用語として使用されます。GraphQLCar特定のに関連付けられているすべてのを読み取るAPI User。ドキュメントにcarsフィールドはありませんUser。

## [](#many2one)Many-to-one

多対1

The many-to-one relationship works the same as the [one-to-many](#one2many) relationship. They are technically the same relationship, but a many-to-one relationship is evaluated from the other side. However, there is one particular derivation difference: the array field can be omitted.

多対1の関係は、1対多の関係と同じように 機能します。それらは技術的には同じ関係ですが、多対1の関係は反対側から評価されます。ただし、派生の違いが1つあります。それは、配列フィールドを省略できることです。

In the following example, a `Car` can be associated with a single `User`, while a `User` is unaware of its association with `Car`s. There is not enough evidence to categorize this relationship as one-to-one since the same `User` can be associated with multiple `Car`s.

次の例では、aCarは単一のUserに関連付けることができますが 、aUserはCarsとの関連付けを認識していません。同じものUserが複数Carのに関連付けられる可能性がある ため、この関係を1対1として分類するのに十分な証拠はありません。

graphql

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

基盤となるデータベースコンポーネントとAPIの動作は、1対多の関係と同じです。

## [](#many2many)Many-to-many

多対多

A many-to-many relationship has high cardinality on both sides of the relationship. It is represented in the GraphQL schema by two types, each with fields that point to each other, where all fields are arrays.

多対多の関係は、関係の両側で高いカーディナリティを持っています。それはで表されますGraphQL 2つのタイプのスキーマ。それぞれが相互にポイントするフィールドを持ち、すべてのフィールドが配列です。

In the following example, a `User` can drive many `Car`s, while a `Car` can be driven by many `User`s.

次の例では、aUserは多くCarのsを駆動できますが、aは多くのs Carによって駆動できますUser。

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

@relationディレクティブがフィールドdriversと drivesフィールドの両方に追加されていることに注意してください。そうしないと、カーディナリティの高い関係を確立する代わりに、IDの配列が格納されます。

In the database, neither relational fields exist in the `User` or `Car` documents. Instead, an associative collection is created to store references to each side of the relationship. Three indexes are created on the associative collection, one with the `User` reference as a term, the other with the `Car` reference as a term, and one with both the `User` and `Car` references as terms. The created indexes are used by the GraphQL API to read the associated documents, depending on which side of the relationship is queried.

データベースでは、Userまたは Carドキュメントにリレーショナルフィールドは存在しません。代わりに、関係の各側への参照を格納するために、連想コレクションが作成されます。連想コレクションには3つのインデックスが作成されます。1つはUser参照を用語として、もう1つは参照を用語として、もうCar1つはUserとCar参照の両方 を用語として使用します。作成されたインデックスは、GraphQL 関係のどちら側が照会されるかに応じて、関連するドキュメントを読み取るためのAPI。

## [](#combine)Combining multiple relationships

複数の関係を組み合わせる

When describing complex types in the GraphQL schema, the API may not be able to precisely recognize relationships. For example:

で複雑なタイプを説明する場合 GraphQLスキーマでは、APIが関係を正確に認識できない場合があります。例えば：

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

上のスキーマでは、`User`型の`own`フィールドが`Car`を参照しています。しかし、`Car`型には`User`型を参照する複数のフィールドがあります。APIはどのフィールドを使って関係を構築すべきか判断できないので、関係を明示するように求めるエラーを返します。

To make a relationship explicit, add the `@relation` directive with the same `name` to both fields that participate in the relationship. For example:

関係を明示的にするには、関係に参加している両方のフィールドに@relation同じディレクティブを追加しnameます。例えば：

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

今APIを認識することが可能であるownsとownerの間の1対1の関係の一部であるとUserしてCar。タイプのdriverフィールドは、Car多対1の関係として認識されます。

When dealing with different relationships between the same types, it’s a good practice to make them explicit by using the `@relation` directive.

同じタイプ間の異なる関係を処理する場合は、@relationディレクティブを使用してそれらを明示的にすることをお勧めします。

## [](#mutations)Relational mutations

関係突然変異

When running mutations on types that contain relationships, you can create their related documents, or influence the relationship to existing documents, in the same transaction by using the relational mutations. There are three types of relational mutations: `create`, `connect`, and `disconnect`.

リレーションシップを含むタイプでミューテーションを実行する場合、リレーショナルミューテーションを使用して、同じトランザクションで関連ドキュメントを作成したり、既存のドキュメントとのリレーションシップに影響を与えたりできます。そこリレーショナル変異の3種類がありますcreate、 connectとdisconnect。

### [](#create)`create`

The `create` mutation allows the creation of documents that are associated with the main target of the mutation. In the following example, we create a new `User` and, in the same transaction, two `Car`s that are associated with the `User`.

create変異は、変異の主なターゲットに関連付けられている文書を作成することができます。次の例では、新しいを作成Userし、同じトランザクションで、にCar関連付けられた2つ のを作成しますUser。

Schema:

graphql

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

graphql

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

応答：

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

`connect`変異は対象となるドキュメントを既存のドキュメントに接続することを可能にします。以下の例では、`Car`を作成して、既存の`User`に接続します。

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

`disconnect`変異は対象となるドキュメントを接続されたドキュメントから切り離すことを可能にします。以下の例では、`User`を更新して、その`Car`の一つから切断します。

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

-   [Endpoints](https://docs.fauna.com/fauna/current/api/graphql/endpoints)
-   [Directives](https://docs.fauna.com/fauna/current/api/graphql/directives/)
-   [User-defined functions](https://docs.fauna.com/fauna/current/api/graphql/functions)

## 次のステップ
- エンドポイント
- 指令
- ユーザー定義関数
