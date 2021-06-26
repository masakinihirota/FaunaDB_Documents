CreateKey | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/createkey?lang=javascript

# `CreateKey

```javascript
CreateKey( param_object )
```

```shell
CreateKey( param_object )
```

## [](#description)Description

The `CreateKey` function creates a new key, based on the settings in `param_object`, which can be used to access the current database. If you provide an optional [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) to a child database, the key is associated with (and provides access to) that database. An admin key must be used when calling `CreateKey`.

`CreateKey`関数は`param_object`の設定に基づいて新しいキーを作成し、現在のデータベースにアクセスするのに使用できます。オプションの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)で子データベースを指定すると、そのキーはそのデータベースに関連付けられ、アクセスできるようになります。CreateKey`を呼び出す際には管理者用のキーを使用する必要があります。

Once the key is created, the key’s secret can be used to connect to Fauna and execute queries within the associated database, with the permissions associated with the key’s `role`.

キーが作成されると、キーのシークレットを使って Fauna に接続し、キーの `role` に関連付けられたパーミッションで、関連付けられたデータベース内でクエリを実行することができます。

If you would prefer to use Fauna’s [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac), you should use the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function instead.

Fauna の [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) を使用したい場合は、代わりに [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) 関数を使用してください。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`param_object`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|The `param_object` fields are described below.|

---

|Argument|Type|Definition and Requirements|
|--|--|--|
|`param_object`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|`param_object`のフィールドは以下の通りです。|

### [](#param_object)`param_object`

|Field Name|Field Type|Definition and Requirements|
|--|--|--|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string), [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) to a user-defined [user-defined role](https://docs.fauna.com/fauna/current/security/roles), or an [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) of user-defined role references|The built-in [access roles](https://docs.fauna.com/fauna/current/security/keys#access-roles) include `admin`, `server`, `server-readonly`, `client`, or one or more user-defined roles.|
|`database`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|Optional - A ref of an existing child database. If not provided, the new key grants access to the current database.|
|`priority`|[Integer](https://docs.fauna.com/fauna/current/api/fql/types#integer)|Optional - A relative weight between 1 and 500, inclusive, indicating how many resources this key should be allowed to utilize. Defaults to 1. A higher number means more resources.<br><br>**IMPORTANT**<br>The `priority` option is deprecated as of release 2.10.0. You should avoid specifying `priority`. In some future Fauna release, `priority` will be removed. See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) for more details.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - Contains user-defined metadata for the key. It is provided for the developer to store key-relevant information.|
|data.`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Optional - A name to apply to the key, to help differentiate this key from any others that may exist. If provided, this field must exist within the `data` field.|

---

|Field Name|Field Type|Definition and Requirements|
|--|--|--|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string), [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) to a [user-defined role](https://docs.fauna.com/fauna/current/security/roles), or an [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) of user-defined role references|組み込みの [access role](https://docs.fauna.com/fauna/current/security/keys#access-roles) には `admin`, `server`, `server-readonly`, `client`, or one or more user-defined role があります。
|`database`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|Optional - 既存の子データベースのRefです。|`database`|[Ref]()|Optional - 既存の子データベースの ref.
|`priority`|[Integer](https://docs.fauna.com/fauna/current/api/fql/types#integer)|Optional - 1から500までの相対的な重みで、このキーがどれだけのリソースを利用することが許されるかを示します。デフォルトは1です。<br><br>**IMPORTANT**<br>`priority`オプションはリリース2.10.0で非推奨となりました。priority`の指定は避けるべきです。将来の Fauna リリースでは、`priority` は削除される予定です。詳しくは [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) を参照してください。
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - キーに関するユーザー定義のメタデータを含みます。開発者がキーに関連する情報を保存するために提供されています。
|data.`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Optional - キーに適用する名前で、このキーを他のキーと区別するのに役立ちます。|data.`name`[String]() - オプション - このキーを他のキーと区別するために適用する名前です。

## [](#returns)Returns

An object containing the metadata about the results of `CreateKey` operations.

|Field Name|Field Type|Definition and Requirements|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) is an automatically-generated, unique identifier within the database to the key that was created.|
|`database`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) of the database that the key belongs to.|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The access role for this key.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Returned only when provided as a `CreateKey` parameter, and when returned, its value is identical to the value provided.|
|data.`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Returned only when provided as a `CreateKey` parameter, and when returned, its value is identical to the value provided.|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|The timestamp, with microsecond resolution, associated with the creation of the key.|
|`secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The key’s authentication secret. It is only present at creation. You must copy the key’s secret and store it securely for future use.|
|`hashed_secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The key’s hashed authentication secret.|

---

|Field Name|Field Type|Definition and Requirements|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)は、作成されたキーに対してデータベース内で自動的に生成された一意の識別子です。|
|`database`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|キーが属するデータベースの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)です。|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|このキーに対するアクセスロール。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|CreateKey`パラメータとして提供されたときにのみ返され、返されたときにはその値は提供された値と同じになります。|
|data.`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|CreateKey` パラメータとして提供されたときにのみ返され、返されたときにはその値は提供された値と同じになります。|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|キーの作成に関連するマイクロ秒単位のタイムスタンプです。|
|`secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|キーの認証シークレットです。これは作成時にのみ存在します。|`secret`|[String]()｜鍵の認証秘密です。|
|`hashed_secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|鍵のハッシュ化された認証秘密です。|

## [](#examples)Examples

The following query creates a key for the `prydain` database with an access role of `server`:

The following query creates a key for the `prydain` database with an access role of `server`:

```javascript
client.query(
  q.CreateKey({
    database: q.Database('prydain'),
    role: 'server',
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Keys(), "268220607958614528"),
  ts: 1592053954950000,
  database: Database("prydain"),
  role: 'server',
  secret: 'fnADuOk4ytACAMKkYwdY6_SYMpAit84dtYsUsXFF',
  hashed_secret: '$2a$05$7w6fYT43jPB0A.R7i8JayuTLn6kXxsL2Y5nkNjrWZurL9L9pgxo/y'
}
```

```shell
CreateKey({
  database: Database('prydain'),
  role: 'server',
})
```

```none
{
  ref: Ref(Keys(), "302043905096942080"),
  ts: 1624310364730000,
  database: Database("prydain"),
  role: 'server',
  secret: 'fnAEMRNU1eACAAzEarJdoBSJp5w7-VrGNSXTUMBi',
  hashed_secret: '$2a$05$piVqzNsKHfKEFmivgNkhJexOVNaRxfberO1tHj.LqLow9w0ZWygtm'
}
```

The following query creates a key for the current database with a user-defined role:

次のクエリは、ユーザー定義の役割を持つ現在のデータベースのキーを作成します。

```javascript
client.query(
  q.CreateKey({
    role: q.Role('employees'),
    data: {
      name: 'For employees',
    },
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```
{
  ref: Ref(Keys(), "285195918840431104"),
  ts: 1608242872990000,
  role: Role("employees"),
  data: { name: 'For employees' },
  secret: 'fnAD9TgtWeACAHKpRO6F72OxRD1dRvBLqixtBPPX',
  hashed_secret: '$2a$05$/Ft/mYSFoGkSUfOzOEmhSeDu1TSHd8TTVu0JRCemqTef8Szku3dOa'
}
```

## [](#related-functions)Related functions

-   [`AccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider)

-   [`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)

-   [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)

-   [`Credentials`](https://docs.fauna.com/fauna/current/api/fql/functions/credentials)

-   [`CurrentIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/currentidentity)

-   [`HasCurrentIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hascurrentidentity)

-   [`CurrentToken`](https://docs.fauna.com/fauna/current/api/fql/functions/currenttoken)

-   [`HasCurrentToken`](https://docs.fauna.com/fauna/current/api/fql/functions/hascurrenttoken)

-   [`HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity)

-   [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)

-   [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity)

-   [`KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)

-   [`Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys)

-   [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)

-   [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)

-   [`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)

## [](#related-topics)Related topics

-   [Fauna keys](https://docs.fauna.com/fauna/current/security/keys)

-   [Fauna tokens](https://docs.fauna.com/fauna/current/security/tokens)

-   [External authentication](https://docs.fauna.com/fauna/current/security/external/)

-   [Fauna credentials](https://docs.fauna.com/fauna/current/security/credentials)

-   [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)

-   [Cookbook: keys](https://docs.fauna.com/fauna/current/cookbook/#key)

-   [Authentication tutorials](https://docs.fauna.com/fauna/current/tutorials/authentication/)

