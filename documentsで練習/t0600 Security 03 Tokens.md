Tokens | Fauna Documentation
https://docs.fauna.com/fauna/current/security/tokens

# Tokens

トークン

Fauna tokens provide identity-based access to a database.

Fauna トークンは、データベースへのアイデンティティベースのアクセスを提供します。

An _identity_ typically represents a "user", but could also be used to identify any service, system, or process that needs to run queries with specific privileges. Any document within Fauna can be used as an identity.

アイデンティティは通常「ユーザ」を表しますが、特定の権限でクエリを実行する必要のあるサービス、システム、プロセスを識別するためにも使用できます。Fauna 内の任意のドキュメントをアイデンティティとして使用できます。

When an identity stored in Fauna is successfully authenticated, using the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function, a new token is created. Tokens can also be created directly when identity-based access is required, but authentication is unnecessary or handling outside of Fauna.

Fauna に格納されているアイデンティティが [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) 関数を使用して認証に成功すると、新しいトークンが作成されます。トークンは、アイデンティティベースのアクセスが必要だが、認証が不要な場合や、Fauna の外で処理する場合に、直接作成することもできます。

When a token is created, you must copy the token’s secret out of the query result when it is first created, and store it securely. It is impossible to recover the token’s secret if it is discarded or lost, because the token only stores the BCrypt hash of the secret.

トークンが作成されたら、最初に作成されたときのクエリ結果からトークンのシークレットをコピーして、安全に保管する必要があります。トークンは秘密のBCryptハッシュだけを保存しているので、トークンが破棄されたり紛失したりしても、秘密を復元することは不可能です。

A token’s secret is then included as a bearer token in Fauna queries:

トークンの秘密は、Fauna のクエリにベアラートークンとして含まれます。

### Identity-based authentication and access control with Fauna tokens

Fauna トークンによるアイデンティティベースの認証とアクセス制御

![How Fauna performs identity-based authentication](https://docs.fauna.com/fauna/current/security/tokens_images/accept_secret-token.svg)

![Fauna がアイデンティティベースの認証を行う方法](https://docs.fauna.com/fauna/current/security/tokens_images/accept_secret-token.svg)

-   The client sends a query to Fauna, and the request includes the secret for a Token as an HTTP bearer token header.

- クライアントは Fauna にクエリを送信し、そのリクエストには HTTP ベアラートークンヘッダとしてトークンの秘密が含まれます。

-   If the secret exists, Fauna looks up the associated Token document within the database associated with the secret. If not, the response is `Unauthorized`.

- 秘密が存在する場合、Fauna は秘密に関連付けられたデータベースの中から関連する Token の文書を探します。存在しない場合、応答は `Unauthorized` となります。

-   If the Token exists and has not expired (due to `ttl`), Fauna looks up the associated identity document. If not, the response is `Unauthorized`.

- トークンが存在し、(`ttl` による)期限切れでない場合、Fauna は関連する ID 文書を検索します。そうでない場合、応答は `Unauthorized` となります。

-   If the identity document exists and has not expired (due to `ttl`), Fauna applies [ABAC](https://docs.fauna.com/fauna/current/security/abac) roles to determine whether the identity document is permitted to execute the query. If not, the response is `Unauthorized`.

- ID ドキュメントが存在し、有効期限が切れていない場合 (原因は `ttl`)、Fauna は [ABAC](https://docs.fauna.com/fauna/current/security/abac) ロールを適用して、その ID ドキュメントがクエリの実行を許可されているかどうかを判断します。許可されていない場合、応答は `Unauthorized` となります。

-   If the identity document has permission, the query is executed and the response is returned.

- ID 文書が許可されている場合は、クエリが実行され、レスポンスが返されます。

A token’s secret can be used in multiple queries until its token becomes invalid or is deleted.

トークンのシークレットは、そのトークンが無効になるか削除されるまで、複数のクエリーで使用することができます。

By itself, a token does not grant any privileges to the identity. The privileges available to an identity are defined by [Attributed-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)).

トークンは、それ自体では ID に何の権限も与えません。アイデンティティが利用できる特権は、[ABAC (Attributed-based Access Control)](https://docs.fauna.com/fauna/current/security/abac) で定義されます。)

During the execution of a query, the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) function can be used to access the stored identity for the active token.

クエリの実行中には、[`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity)関数を使って、アクティブなトークンに対して保存されているアイデンティティにアクセスすることができます。

Multiple tokens can exist for a particular identity. This feature could be used to provide identity-based access on multiple devices at once.

特定の ID に対して複数のトークンを存在させることができます。この機能は、複数のデバイスで一度にIDベースのアクセスを提供するために使用できます。

A token is deleted by calling the [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function, and all tokens for an identity stored in Fauna can be deleted at once. Once a token is deleted, its associated secret is immediately invalidated.

トークンは [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) 関数を呼び出すことで削除され、Fauna に保存されている ID のすべてのトークンを一度に削除できます。トークンが削除されると、それに関連するシークレットは直ちに無効になります。

Tokens are defined as documents within the system _tokens_ collection. Like databases, tokens exist within the system-global root database context. Tokens are tied to a specific database.

トークンは、システムの _tokens_ コレクション内のドキュメントとして定義されます。データベースと同様に、トークンはシステム-グローバルルートのデータベースコンテキスト内に存在します。トークンは、特定のデータベースに関連付けられています。

Once you have a token, you can use its secret in [GraphQL queries](https://docs.fauna.com/fauna/current/api/graphql/endpoints#authentication).

トークンを取得すると、そのシークレットを[GraphQLクエリ]（ https://docs.fauna.com/fauna/current/api/graphql/endpoints#authentication）で使用することができます。

A token’s secret is a password equivalent. Guard secrets with the same care and attention that you use for passwords.

トークンのシークレットは、パスワードに相当するものです。シークレットは、パスワードと同じように大切に守ってください。

On this page:

このページでは

-   [Definition](#definition)
-   [Operations on tokens](#operations)

---

- [定義](#definition)
- [トークンの操作](#operations)

## [](#definition)Definition

定義

```javascript
{
  ref: Ref(Tokens(), "266165140418724353"),
  ts: 1590093708340000,
  instance: Ref(Collection("users"), "123456"),
  hashed_secret: '$2a$05$Zsg5cWmMxfj4cbeeaiOVAe1eTrxxgAtQSO53m6Lw3vjp10vcefm2i'
}
```

|Field name|Value type|Description|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference for this token.|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|The timestamp, with microsecond resolution, associated with the creation of the token.|
|`instance`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference to the identity document associated with the token.|
|`secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The token’s authentication secret. **Not stored: only present on creation of a token, not recoverable if lost or discarded.**|
|`hashed_secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The token’s hashed authentication secret.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - User-defined metadata for the token.|

---

|フィールド名|値のタイプ|説明|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|このトークンのリファレンスです。|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|このトークンの生成に関連するマイクロ秒単位のタイムスタンプです。|
|`instance`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|このトークンに関連付けられたIDドキュメントへの参照。|
|`secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|トークンの認証シークレットです。|`secret`|[String]()|トークンの認証秘密です。***保存されません：トークンの作成時にのみ存在し、紛失や廃棄しても復元できません。|
|`hashed_secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|トークンのハッシュ化された認証シークレットです。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション - トークンに対するユーザー定義のメタデータ。|

## [](#operations)Operations on tokens

トークンの操作

-   Create a token with the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function. A successful login requires a reference to a document that has a [`credentials`](https://docs.fauna.com/fauna/current/security/credentials) object that defines the document’s password, and passing the same password to `Login`.

- トークンは[`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)という関数で作成します。ログインに成功するためには、ドキュメントのパスワードを定義した[`credentials`](https://docs.fauna.com/fauna/current/security/credentials)オブジェクトを持つドキュメントを参照し、同じパスワードを`Login`に渡すことが必要です。

-   Creation of a token can also be done directly, without a [`credentials`](https://docs.fauna.com/fauna/current/security/credentials) field on the to-be-authenticated document and without providing a password, by running the following query:

- トークンの作成は、認証されるべきドキュメントに[`credentials`](https://docs.fauna.com/fauna/current/security/credentials)フィールドがなくても、またパスワードを提供しなくても、次のようなクエリを実行することで直接行うこともできます。

    shell

    ```shell
    Create(Tokens(), { instance: <document ref> })
    ```

    Where `<document ref>` is a [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) to the document that should be authenticated.

    ここで、`<document ref>`は、認証されるべきドキュメントへの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)です。

    A token is typically created in a query that uses a [key](https://docs.fauna.com/fauna/current/security/keys) for authentication. Direct token creation while using a [client key](https://docs.fauna.com/fauna/current/security/keys#client-role) requires a password. For all other key types, the password is optional.

    トークンは通常、認証に[key](https://docs.fauna.com/fauna/current/security/keys)を使用するクエリの中で作成されます。クライアントキー](https://docs.fauna.com/fauna/current/security/keys#client-role)を使用しているときにトークンを直接作成するには、パスワードが必要です。その他のタイプのキーでは、パスワードはオプションです。

-   To logout a user, call the [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function while using a token. The token in use is deleted. `Logout` accepts a boolean value that, when `true`, deletes all tokens associated with the authenticated document for the current session (that is using a token). Once a token is deleted, its associated secret immediately becomes invalid.

- ユーザーをログアウトするには、トークンを使用しながら [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) 関数を呼び出します。使用中のトークンは削除されます。`Logout` にはブール値を指定します。`true` を指定すると、現在のセッションの認証されたドキュメント（トークンを使用している）に関連するすべてのトークンが削除されます。トークンが削除されると、それに関連するシークレットは直ちに無効になります。

-   Tokens can be deleted by using the [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete) function. Deleting a token immediately invalidates its associated secret.

- トークンを削除するには、[`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)関数を使用します。トークンを削除すると、その関連するシークレットは直ちに無効になります。

-   Modify a token’s optional user-defined metadata (the `data` field) by using the [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update) function.

- トークンのオプションであるユーザー定義のメタデータ（`data`フィールド）を変更するには、[`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)関数を使用します。

## [](#related)Related

関連

-   [Keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Credentials](https://docs.fauna.com/fauna/current/security/credentials)
-   [Attribute-based access control](https://docs.fauna.com/fauna/current/security/abac)
-   [User-defined roles](https://docs.fauna.com/fauna/current/security/roles)
-   [Permissions](https://docs.fauna.com/fauna/current/security/permissions)
-   [Delegates](https://docs.fauna.com/fauna/current/security/delegates)
-   [User authentication tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
-   [Attribute-based access control tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

---

- [キー](https://docs.fauna.com/fauna/current/security/keys)
- [クレデンシャル](https://docs.fauna.com/fauna/current/security/credentials)
- [属性ベースのアクセスコントロール](https://docs.fauna.com/fauna/current/security/abac)
- [ユーザー定義の役割](https://docs.fauna.com/fauna/current/security/roles)
- [パーミッション](https://docs.fauna.com/fauna/current/security/permissions)
- [代行](https://docs.fauna.com/fauna/current/security/delegates)
- [ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
- [属性ベースのアクセスコントロールのチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

