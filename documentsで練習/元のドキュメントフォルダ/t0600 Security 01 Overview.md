Overview | Fauna Documentation
https://docs.fauna.com/fauna/current/security/

# Overview

概要

This section describes Fauna authentication and access control security features.

このセクションでは、Fauna の認証とアクセスコントロールのセキュリティ機能について説明します。

Fauna’s security design makes it easy to query your databases from any network-connected context, including a web browser. Connections to the database are secured using [HTTPS](https://en.wikipedia.org/wiki/HTTPS). Authentication and access control are implemented using HTTP bearer tokens in the request header for each query.

Fauna のセキュリティ設計では、Web ブラウザなど、ネットワークに接続されたあらゆるコンテキストからデータベースへの問い合わせが簡単にできます。データベースへの接続は[HTTPS](https://en.wikipedia.org/wiki/HTTPS)を使用して保護されます。認証とアクセスコントロールは、各クエリのリクエストヘッダに HTTP ベアラートークンを使用して実装されます。

Fauna provides two security models for access:

Fauna はアクセスに対して 2 つのセキュリティモデルを提供します。

-   ![An identified user](https://docs.fauna.com/fauna/current/security//_images/access-identified.svg) **identity-based access**: With this model, queries have an associated identity, stored within the database or within an external identity provider, that identifies the actor executing each query. Identity-based access is typically used by applications to enforce fine-grained access control, or to modify query behavior based on the identity of the actor that queries the database.

- ![An identified user](https://docs.fauna.com/fauna/current/security//_images/access-identified.svg) **identity-based access**: このモデルでは、クエリには、データベース内または外部の ID プロバイダに保存された、各クエリを実行するアクターを識別する ID が関連付けられています。アイデンティティベースのアクセスは、一般的に、アプリケーションが細かいアクセス制御を実施するため、またはデータベースに問い合わせたアクターのアイデンティティに基づいてクエリの動作を変更するために使用されます。

-   ![An anonymous user](https://docs.fauna.com/fauna/current/security//_images/access-anonymous.svg) **anonymous-based access**: With this model, queries do not have an associated identity. Access is role-based, where the role grants specific privileges. Anonymous-based access is typically used by application developers and background tasks that need either global access, or narrowly-focussed access, where identity is not important.

- ![An anonymous user](https://docs.fauna.com/fauna/current/security//_images/access-anonymous.svg) **匿名ベースのアクセス**。このモデルでは、クエリは関連するアイデンティティを持ちません。匿名ベースのアクセス**: このモデルでは、クエリには関連するIDがありません。アクセスはロールベースで、ロールによって特定の特権が与えられます。匿名ベースのアクセスは、アプリケーション開発者やバックグラウンドタスクが、グローバルなアクセスを必要とする場合や、アイデンティティが重要ではない狭い範囲のアクセスを必要とする場合によく使用されます。

To use these security models, Fauna provides these resources:

これらのセキュリティモデルを使用するために、Fauna は以下のリソースを提供します。

-   **Secrets**: Each secret is an opaque bearer token, associated with a token document or key document within Fauna, that provides access to a specific database. A secret is displayed only once at creation time; it should be stored securely, and needs to be revoked and recreated if lost.

- **Secrets**。各シークレットは不透明なベアラートークンで、Fauna 内のトークン文書またはキー文書に関連付けられており、特定のデータベースへのアクセスを提供します。シークレットは作成時に一度だけ表示されます。シークレットは安全に保管され、紛失した場合は破棄して再作成する必要があります。

-   **Attribute-based access control (ABAC)**: ABAC roles define specific privileges, for query execution, to specific member identities within the database. Such roles provide fine-grained access control, and can modify the query behavior based on document attributes or time of day.

- 属性ベースのアクセスコントロール（ABAC）**。ABACロールは、データベース内の特定のメンバーのアイデンティティに対して、クエリ実行のための特定の特権を定義します。このようなロールは、きめ細かなアクセスコントロールを可能にし、ドキュメントの属性や時間帯に応じてクエリの動作を変更することができます。

-   **Tokens**: A [token](https://docs.fauna.com/fauna/current/security/tokens) grants authorized access to an associated identity. The actual permissions available are controlled with [attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac). The metadata for a token, including its hashed secret, is stored as a document in the internal _tokens_ collection. Tokens are typically created using the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function, which involves a [credential](https://docs.fauna.com/fauna/current/security/credentials) that the identity knows, but can also be created directly for password-less identity-based authentication.

- **トークン**。[トークン](https://docs.fauna.com/fauna/current/security/tokens)は、関連付けられたIDに許可されたアクセスを付与します。実際に利用できる権限は、[属性ベースのアクセス制御（ABAC）](https://docs.fauna.com/fauna/current/security/abac)で制御されます。トークンのメタデータ（ハッシュ化された秘密情報を含む）は、内部の _tokens_ コレクションのドキュメントとして保存されます。トークンは通常、IDが知っている[クレデンシャル](https://docs.fauna.com/fauna/current/security/credentials)を伴う[Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)機能を使って作成されますが、パスワードなしのIDベースの認証のために直接作成することもできます。

-   **JSON Web Tokens (JWTs)**: A [JWT](https://docs.fauna.com/fauna/current/security/external/jwt) grants authorized access to an associated identity that is managed by an external identity provider. The actual permission available are controlled with [attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac). A JWT is created when a user successfully authenticates with an external identity provider. Once a Fauna database has been configured to accept JWTs for specific identity providers, a JWT can then be used to query Fauna.

- [JSON Web Tokens (JWTs)**。JWT](https://docs.fauna.com/fauna/current/security/external/jwt)は、外部の ID プロバイダによって管理されている関連する ID に、許可されたアクセスを与えるものである。実際に利用できる権限は、[属性ベースのアクセス制御（ABAC）](https://docs.fauna.com/fauna/current/security/abac)で制御される。JWT は、ユーザが外部の ID プロバイダとの認証に成功したときに作成される。Fauna データベースが特定の ID プロバイダの JWT を受け入れるように設定されると、JWT を使用して Fauna を照会できるようになります。

-   **Keys**: A [key](https://docs.fauna.com/fauna/current/security/keys) grants anonymous authorized access. The actual permissions granted are controlled with roles, which can be one a four built-in roles, or a user-defined [attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) role. The metadata for a Key, including its hashed secret, is stored as a document in the system _keys_ collection.

- [**キー**。キー](https://docs.fauna.com/fauna/current/security/keys)は、匿名で許可されたアクセスを付与します。実際に付与される権限は、4つの組み込みロール、またはユーザー定義の[属性ベースのアクセスコントロール(ABAC)](https://docs.fauna.com/fauna/current/security/abac)ロールで制御されます。キーのメタデータ（ハッシュ化された秘密情報を含む）は、システムの _keys_ コレクションにドキュメントとして保存されます。

### Identity-based authentication and access control with Fauna tokens

Fauna トークンによるアイデンティティベースの認証とアクセス制御

![How Fauna performs identity-based authentication](https://docs.fauna.com/fauna/current/security//_images/accept_secret-token.svg)

![Fauna がアイデンティティベースの認証を行う方法](https://docs.fauna.com/fauna/current/security//_images/accept_secret-token.svg)

-   The client sends a query to Fauna, and the request includes the secret for a Token as an HTTP bearer token header.

- クライアントは Fauna にクエリを送信し、リクエストには HTTP ベアラートークンヘッダとしてトークンのシークレットが含まれています。

-   If the secret exists, Fauna looks up the associated Token document within the database associated with the secret. If not, the response is `Unauthorized`.

- 秘密が存在する場合、Fauna は秘密に関連付けられたデータベースの中から関連する Token の文書を探します。存在しない場合、応答は `Unauthorized` となります。

-   If the Token exists and has not expired (due to `ttl`), Fauna looks up the associated identity document. If not, the response is `Unauthorized`.

- トークンが存在し、(`ttl` による)期限切れでない場合、Fauna は関連する ID 文書を検索します。そうでない場合、応答は `Unauthorized` となります。

-   If the identity document exists and has not expired (due to `ttl`), Fauna applies [ABAC](https://docs.fauna.com/fauna/current/security/abac) roles to determine whether the identity document is permitted to execute the query. If not, the response is `Unauthorized`.

- ID ドキュメントが存在し、有効期限が切れていない場合 (原因は `ttl`)、Fauna は [ABAC](https://docs.fauna.com/fauna/current/security/abac) ロールを適用して、その ID ドキュメントがクエリの実行を許可されているかどうかを判断します。許可されていない場合、応答は `Unauthorized` となります。

-   If the identity document has permission, the query is executed and the response is returned.

- ID ドキュメントが許可されている場合は、クエリが実行され、レスポンスが返されます。

### Anonymous-based authentication and access control with Fauna keys

Faunaキーによる匿名ベースの認証とアクセスコントロール

![How Fauna accepts the secret for a key](https://docs.fauna.com/fauna/current/security//_images/accept_secret-key.svg)

![Faunaが鍵の秘密を受け取る方法](https://docs.fauna.com/fauna/current/security//_images/accept_secret-key.svg)

-   The client send a query to Fauna, and the request includes the secret for a Key as an HTTP bearer token header.

- クライアントは Fauna にクエリを送信し、そのリクエストには HTTP ベアラートークンヘッダとして鍵の秘密が含まれます。

-   If the secret exists, Fauna looks up the associated Key document. If not, the response is `Unauthorized`.

- 秘密が存在すれば、Fauna は関連する Key ドキュメントを検索します。存在しない場合、応答は `Unauthorized` となります。

-   If the Key exists and has not expired (due to `ttl`), Fauna evaluates the Key’s `role` field within the database associated with the Key. The active role could be a built-in role or an [ABAC](https://docs.fauna.com/fauna/current/security/abac) role, and determines whether the query should be permitted to execute. If not, the response is `Unauthorized`.

- 鍵が存在し、(`ttl` による)有効期限が切れていない場合、Fauna はその鍵に関連付けられたデータベース内の鍵の `role` フィールドを評価します。アクティブなロールは、組み込みロールや[ABAC](https://docs.fauna.com/fauna/current/security/abac)ロールである可能性があり、クエリの実行を許可すべきかどうかを判断します。許可されていない場合，応答は `Unauthorized` となります．

-   If the Key provides permission, the query is executed and the response is returned.

- Keyが許可を与えれば、クエリは実行され、レスポンスが返されます。

In this section:

このセクションでは

-   [Keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Tokens](https://docs.fauna.com/fauna/current/security/tokens)
    -   [Credentials](https://docs.fauna.com/fauna/current/security/credentials)
    -   [Delegates](https://docs.fauna.com/fauna/current/security/delegates)
-   [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)
    -   [Roles](https://docs.fauna.com/fauna/current/security/roles)
    -   [Permissions](https://docs.fauna.com/fauna/current/security/permissions)

---

- キー](https://docs.fauna.com/fauna/current/security/keys)
- トークン](https://docs.fauna.com/fauna/current/security/tokens)
    - [Credentials](https://docs.fauna.com/fauna/current/security/credentials)
    - [Delegate](https://docs.fauna.com/fauna/current/security/delegates)
- 属性ベースのアクセス制御 (ABAC)](https://docs.fauna.com/fauna/current/security/abac)
    - ロール](https://docs.fauna.com/fauna/current/security/roles)
    - [パーミッション](https://docs.fauna.com/fauna/current/security/permissions)

On this page:
-   [Best practices](#best-practices)
    -   [Secrets](#secrets)

このページでは
- ベストプラクティス](#best-practices)
    - シークレット](#secrets)

## [](#best-practices)Best practices

ベスト・プラクティス

This sections describes some of the considerations and best practices for maintaining security when querying Fauna.

このセクションでは、Fauna への問い合わせ時にセキュリティを維持するために考慮すべき点やベスト プラクティスについて説明します。

### [](#secrets)Secrets

シークレット

-   A secret is a password equivalent. Guard your secrets with the same care and attention that you use for passwords.

- 秘密とは、パスワードに相当するものです。シークレットは、パスワードと同様の注意を払って管理してください。

-   Secrets for admin keys provide unrestricted access to a database or any of its child databases. Protect these secrets as you would for any computer’s root password:

- admin キーのシークレットは、データベースやその子データベースへの無制限のアクセスを提供します。これらのシークレットは、他のコンピュータのルートパスワードと同じように保護してください。

    -   Do not embed the admin key secrets into applications.

    - 管理者キーの秘密をアプリケーションに埋め込まないでください。

    -   Share admin key secrets only with individuals that need unrestricted database access.

    - 管理者キーの秘密は、無制限のデータベースアクセスを必要とする個人とだけ共有してください。

    -   Consider creating an `administrators` role and applying membership to specific user documents instead of using admin key secrets.

    - 管理者キーの秘密を使う代わりに、`administrators`ロールを作成して、特定のユーザドキュメントにメンバーシップを適用することを検討してください。

-   The build-in `client` role for keys was intended to make it easy to embed a secret within an application to grant, essentially, unauthenticated access to select documents within a database. We no longer recommend its use, since it is part of the legacy, resource-based permission system, and because [ABAC](https://docs.fauna.com/fauna/current/security/abac) provides far greater flexibility and easier management of document access.

- 鍵用の組み込みの `client` ロールは、アプリケーション内に秘密鍵を簡単に組み込み、基本的にデータベース内の特定のドキュメントへの認証されていないアクセスを許可することを目的としています。これは従来のリソースベースのパーミッションシステムの一部であり、[ABAC](https://docs.fauna.com/fauna/current/security/abac)の方がはるかに柔軟でドキュメントアクセスの管理が容易であるため、今後はこの使用を推奨しません。

## [](#related)Related

関連

-   [Keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Credentials](https://docs.fauna.com/fauna/current/security/credentials)
-   [Tokens](https://docs.fauna.com/fauna/current/security/tokens)
-   [Attribute-based access control](https://docs.fauna.com/fauna/current/security/abac)
-   [User-defined roles](https://docs.fauna.com/fauna/current/security/roles)
-   [Permissions](https://docs.fauna.com/fauna/current/security/permissions)
-   [Delegates](https://docs.fauna.com/fauna/current/security/delegates)
-   [User authentication tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
-   [Attribute-based access control tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

---

- [キー](https://docs.fauna.com/fauna/current/security/keys)
- [クレデンシャル](https://docs.fauna.com/fauna/current/security/credentials)
- [トークン](https://docs.fauna.com/fauna/current/security/tokens)
- [属性ベースのアクセスコントロール](https://docs.fauna.com/fauna/current/security/abac)
- [ユーザー定義のロール](https://docs.fauna.com/fauna/current/security/roles)
- [パーミッション](https://docs.fauna.com/fauna/current/security/permissions)
- [代行](https://docs.fauna.com/fauna/current/security/delegates)
- [ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
- [属性ベースのアクセスコントロールのチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

