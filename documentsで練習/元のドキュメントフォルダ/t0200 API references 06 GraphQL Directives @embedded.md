@embedded | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/directives/d_embedded

# `@embedded`

埋め込み

Specifies that the type should be embedded within any types referring to this type.

このタイプを参照するすべてのタイプにタイプを埋め込む必要があることを指定します。

## [](#location)Location

ロケーション

Types.

タイプ。

## [](#arguments)Arguments

引数

None.

無し。

## [](#description)Description

説明

The `@embedded` directive marks the annotated as an embedded type. Embedded types do not have their own associated collection; the data for an embedded type is stored within the parent type.

@embedded` ディレクティブは、アノテーションを埋め込み型としてマークします。埋め込み型は独自の関連コレクションを持たず、埋め込み型のデータは親型の中に格納されます。

## [](#example)Example

例

Given the following GraphQL schema:

次のことを考えると GraphQL スキーマ：

graphql

```graphql
type User {
  name: String
  address: Address
}

type Address @embedded {
  street: String!
  city: String!
  zipCode: String!
}
```

You could create a user and address with the following mutation:

次の変更を加えて、ユーザーとアドレスを作成できます。

graphql

```graphql
mutation {
  createUser(
    data: {
      name: "Mary"
      address: {
        street: "Market street, 1023"
        city: "San Francisco"
        zipCode: "91044"
      }
    }
  ) {
    _id
  }
}
```

The resulting document within Fauna would look like:

動物相内の結果のドキュメントは次のようになります。

```javascript
Get(Ref(Collection("User")
{ ref: Ref(Collection("User"), "235155496629174791"),
  ts: 1560520607525000,
  data:
   { name: 'Mary',
     address:
      { street: 'Market street, 1023',
        city: 'San Francisco',
        zipCode: '91044' } } }
```

