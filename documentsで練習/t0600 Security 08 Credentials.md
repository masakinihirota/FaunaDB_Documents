Credentials | Fauna Documentation
https://docs.fauna.com/fauna/current/security/credentials

# Credentials

A credential document is used to store a cryptographic hash of a password that can be subsequently used to authenticate an identity stored in Fauna — part of Fauna’s identity-based access control.

クレデンシャルドキュメントは、Fauna に保存されているアイデンティティの認証に使用できるパスワードの暗号ハッシュを保存するために使用されます。

An _identity_ typically represents a "user", but could also be used to identify any service, system, or process that needs to run queries with specific privileges. Any document within Fauna can be used as an identity.

アイデンティティは通常「ユーザ」を表しますが、特定の権限でクエリを実行する必要のあるサービス、システム、プロセスを識別するためにも使用できます。Fauna 内の任意のドキュメントをアイデンティティとして使用することができる。

A credential document can be created directly, like any other document in Fauna, or indirectly via a document’s `credentials` field. When a document is created or updated with a `credentials` field, the field value is not stored with the document — instead, it is used to create a credentials document. The `password` within the `credentials` field value is never stored.

クレデンシャルドキュメントは、Fauna の他のドキュメントと同様に直接作成することも、ドキュメントの `credentials` フィールドを介して間接的に作成することもできます。ドキュメントが `credentials` フィールドで作成または更新されると、フィールドの値はドキュメントと一緒には保存されず、代わりにクレデンシャルドキュメントの作成に使用されます。credentials`フィールドの値の中の`password`は決して保存されません。

Once a credential document has been created, the reference to the identity stored in Fauna can be passed to the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function, along with the matching password, to create a [token](https://docs.fauna.com/fauna/current/security/tokens). The token’s secret can then be used to execute queries on behalf of the identity, with the privileges defined by [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) roles.

クレデンシャルドキュメントが作成されると、Fauna に保存されているアイデンティティへの参照が、一致するパスワードとともに [Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) 関数に渡され、[token](https://docs.fauna.com/fauna/current/security/tokens) が作成されます。トークンのシークレットを使用して、[属性ベースのアクセス制御 (ABAC)](https://docs.fauna.com/fauna/current/security/abac)のロールで定義された権限で、ID の代わりにクエリを実行できます。

### Identity-based authentication and access control with Fauna tokens

Fauna トークンによるアイデンティティベースの認証とアクセスコントロール

![How Fauna performs identity-based authentication](https://docs.fauna.com/fauna/current/security/credentials_images/accept_secret-token.svg)

![Fauna がアイデンティティベースの認証を行う方法](https://docs.fauna.com/fauna/current/security/credentials_images/accept_secret-token.svg)

-   The client sends a query to Fauna, and the request includes the secret for a Token as an HTTP bearer token header.

- クライアントは Fauna にクエリを送信し、そのリクエストには HTTP ベアラートークンヘッダとしてトークンのシークレットが含まれています。

-   If the secret exists, Fauna looks up the associated Token document within the database associated with the secret. If not, the response is `Unauthorized`.

- 秘密が存在する場合、Fauna は秘密に関連付けられたデータベースの中から関連する Token の文書を探します。存在しない場合、応答は `Unauthorized` となります。

-   If the Token exists and has not expired (due to `ttl`), Fauna looks up the associated identity document. If not, the response is `Unauthorized`.

- トークンが存在し、(`ttl` による)期限切れでない場合、Fauna は関連する ID 文書を検索します。そうでない場合、応答は `Unauthorized` となります。

-   If the identity document exists and has not expired (due to `ttl`), Fauna applies [ABAC](https://docs.fauna.com/fauna/current/security/abac) roles to determine whether the identity document is permitted to execute the query. If not, the response is `Unauthorized`.

- ID ドキュメントが存在し、有効期限が切れていない場合 (原因は `ttl`)、Fauna は [ABAC](https://docs.fauna.com/fauna/current/security/abac) ロールを適用して、その ID ドキュメントがクエリの実行を許可されているかどうかを判断します。許可されていない場合、応答は `Unauthorized` となります。

-   If the identity document has permission, the query is executed and the response is returned.

- ID 文書に許可がある場合は、クエリが実行され、応答が返されます。

Similarly, once a credential document has been created, the [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify) function can be used to verify the hashed password in the credential document. However, calling `Identify` does not create a token; it is used simply to verify that the stored and provided credentials match.

同様に、クレデンシャルドキュメントが作成されると、[`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)関数を使用して、クレデンシャルドキュメント内のハッシュ化されたパスワードを検証することができます。ただし、`Identify` を呼び出してもトークンは作成されず、単に保存されているクレデンシャルと提供されたクレデンシャルが一致するかどうかを確認するために使用されます。

Credentials are defined as documents within the system _credentials_ collection. Like databases, credentials exist within the system-global root database context. Credentials are tied to a specific database.

クレデンシャルは、システムの _credentials_ コレクション内のドキュメントとして定義されます。データベースと同様に、クレデンシャルはシステム-グローバルルートのデータベースコンテキスト内に存在する。クレデンシャルは、特定のデータベースに関連付けられています。

On this page:

このページでは

-   [Definition](#definition)
-   [Operations on credentials](#operations)

---

- [定義](#definition)
- クレデンシャルの操作](#operations)

## [](#definition)Definition

定義

```javascript
{
  ref: Ref(Credentials(), "266165112685986314"),
  ts: 1590093681910000,
  instance: Ref(Collection("users"), "123456"),
  hashed_password: '$2a$05$pSOerPcfQdpeO0fPqtXXYeqRc0KSY/0QvaAoNjf5PN69zOdrzKx76'
}
```

|Field name|Value type|Description|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference for this credential.|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|The timestamp, with microsecond resolution, associated with the creation of the credential.|
|`instance`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference to the identity that provided this credential.|
|`hashed_password`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The credential’s hashed password.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - User-defined metadata for the credential.|

---

|フィールド名|値のタイプ|説明|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|このクレデンシャルのリファレンス。|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|クレデンシャルの作成に関連したマイクロ秒単位のタイムスタンプです。|
|`instance`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|このクレデンシャルを提供したIDへの参照。|
|`hashed_password`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|クレデンシャルのハッシュ化されたパスワード。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - クレデンシャルのユーザー定義メタデータ。|

## [](#operations)Operations on credentials

クレデンシャルの操作

-   Create a credential document by adding the `credentials` field to a document, when it is created or updated:

- ドキュメントの作成や更新の際に、`credentials`フィールドを追加することで、クレデンシャルドキュメントを作成します。

    shell

    ```shell
    Create(
      Collection("users"),
      {
        data: { <document data goes here> },
        credentials: {
          password: "abc123"
        }
      }
    )
    ```

-   You can also create a credential document directly:

- クレデンシャル・ドキュメントを直接作成することもできます。

    shell

    ```shell
    Create(
      Credentials(),
      {
        instance: Ref(Collection("users"), "123456"),
        password: "abc123"
      }
    )
    ```

-   Update the password for a document with the following query:

- 次のようなクエリでドキュメントのパスワードを更新します。

    shell

    ```shell
    Update(
      Ref(Collection("users"), "2"),
      { credentials: { password: "myNewPassword" } }
    )
    ```

    Note that this query results in the creation or update of the associated credentials document without the current password.

    このクエリは、現在のパスワードなしで、関連するcredentialsドキュメントの作成または更新を行うことに注意してください。

    Revising a password does not immediately invalidate any [tokens](https://docs.fauna.com/fauna/current/security/tokens) in use. You would need to call the [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function to invalidate tokens, and force users to login again with the new password.

    パスワードを変更しても、使用中の[トークン](https://docs.fauna.com/fauna/current/security/tokens)がすぐに無効になるわけではありません。トークンを無効にして、ユーザーに新しいパスワードで再度ログインさせるには、[`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)関数を呼び出す必要があります。

-   Update the password in a credential document with the following query:

- 以下のクエリでクレデンシャルドキュメントのパスワードを更新します。

    shell

    ```shell
    Update(Ref(Credentials(), "123456"), {
      current_password: "abc123",
      password: "correct horse battery staple"
    })
    ```

    Note that in this query, the current password is required in order to update the password.

    このクエリでは、パスワードを更新するためには現在のパスワードが必要であることに注意してください。

    Revising a password does not immediately invalidate any [tokens](https://docs.fauna.com/fauna/current/security/tokens) in use. You would need to call the [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function to invalidate tokens, and force users to login again with the new password.

    パスワードを変更しても、使用中の[トークン](https://docs.fauna.com/fauna/current/security/tokens)がすぐに無効になるわけではありません。トークンを無効にして、ユーザに新しいパスワードで再度ログインさせるには、[`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)関数を呼び出す必要があります。

-   Credentials can be deleted by using the [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete) function. Deleting a credential does not affect any [tokens](https://docs.fauna.com/fauna/current/security/tokens) currently in use.

- クレデンシャルは、[`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)関数を使って削除することができます。クレデンシャルを削除しても、現在使用中の [tokens](https://docs.fauna.com/fauna/current/security/tokens)には影響しません。

-   Modify a credential’s optional user-defined metadata (the `data` field) by using the [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update) function.

- [`更新`](https://docs.fauna.com/fauna/current/api/fql/functions/update)関数を使用して、クレデンシャルのオプションのユーザー定義メタデータ（`data`フィールド）を変更します。

## [](#related)Related

関連

-   [Keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Tokens](https://docs.fauna.com/fauna/current/security/tokens)
-   [Attribute-based access control](https://docs.fauna.com/fauna/current/security/abac)
-   [User-defined roles](https://docs.fauna.com/fauna/current/security/roles)
-   [Permissions](https://docs.fauna.com/fauna/current/security/permissions)
-   [Delegates](https://docs.fauna.com/fauna/current/security/delegates)
-   [User authentication tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
-   [Attribute-based access control tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

---

- [キー](https://docs.fauna.com/fauna/current/security/keys)
- [トークン](https://docs.fauna.com/fauna/current/security/tokens)
- [属性ベースのアクセスコントロール](https://docs.fauna.com/fauna/current/security/abac)
- [ユーザー定義のロール](https://docs.fauna.com/fauna/current/security/roles)
- [パーミッション](https://docs.fauna.com/fauna/current/security/permissions)
- [代行](https://docs.fauna.com/fauna/current/security/delegates)
- [ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
- [属性ベースのアクセスコントロールのチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

