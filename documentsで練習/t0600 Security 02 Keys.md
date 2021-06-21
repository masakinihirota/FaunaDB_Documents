Keys | Fauna Documentation
https://docs.fauna.com/fauna/current/security/keys

# Keys

Fauna keys provide anonymous-based access to a database.

Faunaキーは、データベースへの匿名ベースのアクセスを提供します。

Anyone who possesses the secret for a Fauna key can access the database associated with the key and perform any operations that are permitted by the key’s role (see [Access roles](#access-roles)). Keys are typically used by database owners or administrators to manage database structure and contents with few restrictions, and by background tasks that automate various database procedures at regular intervals.

Faunaキーの秘密鍵を持っている人は、そのキーに関連付けられたデータベースにアクセスして、キーのロール（[アクセスロール](#access-roles)を参照）で許可された操作を実行できます。キーは通常、データベースの所有者や管理者がデータベースの構造や内容をほとんど制限なく管理するために使用されます。また、さまざまなデータベースの手順を一定の間隔で自動化するバックグラウンドタスクでも使用されます。

When a key is created, you must copy the key’s secret out of the query result when it is first created, and store it securely. It is impossible to recover the key’s secret if it is discarded or lost, because the key only stores the BCrypt hash of the secret.

鍵を作成する際には、最初に作成したときの問い合わせ結果から鍵の秘密をコピーして、安全に保管する必要があります。鍵には秘密のBCryptハッシュしか保存されていないので、鍵を破棄したり紛失したりしても、鍵の秘密を復元することは不可能です。

A key’s secret is then included as a bearer token in Fauna queries:

鍵の秘密は、Fauna のクエリにベアラートークンとして含まれます。

### Anonymous-based authentication and access control with Fauna keys

### Fauna キーによる匿名ベースの認証とアクセス制御

![How Fauna accepts the secret for a key](https://docs.fauna.com/fauna/current/security/keys_images/accept_secret-key.svg)

![Fauna が鍵の秘密を受け取る方法](https://docs.fauna.com/fauna/current/security/keys_images/accept_secret-key.svg)

-   The client send a query to Fauna, and the request includes the secret for a Key as an HTTP bearer token header.

- クライアントは Fauna にクエリを送信し、そのリクエストには HTTP ベアラートークンヘッダとして鍵の秘密が含まれます。

-   If the secret exists, Fauna looks up the associated Key document. If not, the response is `Unauthorized`.

- 秘密が存在すれば、Fauna は関連する Key ドキュメントを検索します。存在しない場合、応答は `Unauthorized` となります。

-   If the Key exists and has not expired (due to `ttl`), Fauna evaluates the Key’s `role` field within the database associated with the Key. The active role could be a built-in role or an [ABAC](https://docs.fauna.com/fauna/current/security/abac) role, and determines whether the query should be permitted to execute. If not, the response is `Unauthorized`.

- 鍵が存在し、(`ttl` による)有効期限が切れていない場合、Fauna はその鍵に関連付けられたデータベース内の鍵の `role` フィールドを評価します。アクティブなロールは、組み込みロールや[ABAC](https://docs.fauna.com/fauna/current/security/abac)ロールである可能性があり、クエリの実行を許可すべきかどうかを判断します。許可されていない場合，応答は `Unauthorized` となります．

-   If the Key provides permission, the query is executed and the response is returned.

- 鍵が許可した場合は、クエリが実行され、レスポンスが返されます。

A key’s secret can be used in multiple queries until its key becomes invalid or is deleted.

キーのシークレットは、そのキーが無効になるか削除されるまで、複数のクエリで使用することができます。

Keys are defined as documents within the system _keys_ collection. Like databases, keys exist within the system-global root database context. Keys are tied to a specific database and allow access to its contents. If no database is specified, the key grants access to the database in which it was created. The level of access that a key provides depends on its _role_.

キーは、システムの_keys_コレクション内のドキュメントとして定義されます。データベースと同様に、キーはシステム-グローバル・ルート・データベース・コンテキスト内に存在します。キーは特定のデータベースに関連付けられ、その内容へのアクセスを許可します。データベースが指定されていない場合、キーはそのキーが作成されたデータベースへのアクセスを許可します。キーが提供するアクセスのレベルは、その _role_ に依存します。

Once you have key, you can use its secret to [authenticate GraphQL queries](https://docs.fauna.com/fauna/current/api/graphql/endpoints#authentication).

キーを取得すると、そのシークレットを使って[GraphQLクエリの認証](https://docs.fauna.com/fauna/current/api/graphql/endpoints#authentication)を行うことができます。

A key’s secret is a password equivalent. Guard secrets with the same care and attention that you use for passwords.

キーのシークレットは、パスワードに相当します。パスワードと同じように、シークレットも大切に扱ってください。

Beginning with Fauna 2.11.0, the Fauna access control logic has been changed to use [attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) roles, or the [key-based permission system](https://docs.fauna.com/fauna/current/security/keys), but never both.

Fauna 2.11.0 以降、Fauna のアクセス制御ロジックは [属性ベースのアクセス制御 (ABAC)](https://docs.fauna.com/fauna/current/security/abac) ロール、または [鍵ベースの許可システム](https://docs.fauna.com/fauna/current/security/keys) を使用するように変更されたが、両方を使用することはない。

If a resource is a [member](https://docs.fauna.com/fauna/current/security/abac#membership) of an ABAC role, the ABAC role specifies all [privileges](https://docs.fauna.com/fauna/current/security/abac#privileges) for that resource. Otherwise, the key-based permission system determines whether read/write/execute privileges are enabled.

リソースがABACロールの[メンバー](https://docs.fauna.com/fauna/current/security/abac#membership)である場合、ABACロールはそのリソースのすべての[権限](https://docs.fauna.com/fauna/current/security/abac#privileges)を指定します。それ以外の場合は、鍵ベースの権限システムによって、読み取り/書き込み/実行のいずれの権限が有効かが決定されます。

For example, when an ABAC role includes a user-defined function as a member, that function cannot be called unless the ABAC privileges permit the `call` action.

例えば、ABACロールがユーザー定義関数をメンバーとして含む場合、ABAC権限が`call`アクションを許可しない限り、その関数を呼び出すことはできません。

On this page:

このページでは

-   [Access roles](#access-roles)
    -   [Admin role](#admin-role)
    -   [Server role](#server-role)
    -   [Server read-only role](#server-ro-role)
    -   [User-defined role](#user-defined-role)
    -   [Client role](#client-role) Deprecated
    -   [Scoped keys](#scoped-keys)
-   [Definition](#definition)
-   [Operations on keys](#operations)

---

- [アクセスロール](#access-roles)
    - [管理者ロール](#admin-role)
    - [サーバーロール](#server-role)
    - [サーバー読み取り専用のロール](#server-ro-role)
    - [ユーザー定義ロール](#user-defined-role)
    - [クライアントの役割](#client-role) 非推奨
    - [スコープされたキー](#scoped-keys)
- [定義](#definition)
- [キーの操作](#operations)

## [](#access-roles)Access roles

アクセスロール

Keys belong to one of four built-in roles, either `admin`, `server`, `server-readonly`, or `client`, or to one or more used-defined roles.

キーは `admin`, `server`, `server-readonly`, `client` の4つの組み込みロールのいずれか、または1つ以上の使用定義されたロールに属します。

### [](#admin-role)Admin role

アドミンロール

Keys with the `admin` role are used for managing their associated database, including the database’s access providers, child databases, documents, functions, indexes, keys, tokens, and user-defined roles.

admin`ロールのキーは、データベースのアクセスプロバイダ、子データベース、ドキュメント、関数、インデックス、キー、トークン、ユーザー定義のロールなど、関連するデータベースの管理に使用されます。

Since a key with the `admin` role can be used, in its associated database, to create and destroy child databases, and to modify any document content or access controls, **they should be very well protected**.

admin`ロールのキーは、関連するデータベース内で、子データベースの作成や破棄、ドキュメントの内容やアクセスコントロールの変更に使用できるため、**非常によく保護されている必要があります**。

Admin keys for Fauna accounts are managed in the [Fauna Dashboard](https://dashboard.fauna.com/).

Fauna アカウントの管理キーは [Fauna Dashboard](https://dashboard.fauna.com/)で管理されます。

### [](#server-role)Server role

サーバーロール

Keys with the `server` role are used for managing their associated database, including the database’s documents, functions, and indexes.

server`ロールの鍵は、データベースのドキュメント、関数、インデックスなど、関連するデータベースの管理に使用されます。

Unlike the `admin` role, user-defined roles and child databases cannot be managed with a `server` role. Other keys defined in a `server` key’s associated database can be managed with the `server` role, but not keys defined in a parent or child database.

admin`ロールとは異なり、ユーザー定義のロールや子データベースは`server`ロールでは管理できません。server`キーの関連データベースで定義された他のキーは、`server`ロールで管理できますが、親や子のデータベースで定義されたキーは管理できません。

Otherwise, the `server` role is equivalent in all other respects to the `admin` role. **They should be very well protected**.

それ以外の点では、`server`ロールは`admin`ロールと同等です。**非常によく保護されているはずです**。

### [](#server-ro-role)Server read-only role

サーバー読み取り専用のロール

Keys with the `server-readonly` role allow read-only access to all data within the database that they are assigned to. Because they provide unrestricted read access, they should be well protected and only used in trusted or server-side environments.

`server-readonly`ロールのキーは、割り当てられたデータベース内のすべてのデータに対して読み取り専用のアクセスを許可します。無制限の読み取りアクセスを提供するため、十分に保護し、信頼できる環境またはサーバー側の環境でのみ使用する必要があります。

### [](#user-defined-role)User-defined role

ユーザー定義のロール

Keys can specify one or more user-defined roles. The privileges for such a key are specified by the associated [role(s)](https://docs.fauna.com/fauna/current/security/roles).

キーには、1 つ以上のユーザー定義の役割を指定できます。このようなキーの権限は、関連する[role(s)](https://docs.fauna.com/fauna/current/security/roles)によって指定されます。

Keys having user-defined roles are, essentially, equivalent to [tokens](https://docs.fauna.com/fauna/current/security/tokens), in that there are no specific privileges provided by default, but there is no associated identity.

ユーザー定義のロールを持つ鍵は、デフォルトで提供される特定の特権がないという点で、本質的には[トークン](https://docs.fauna.com/fauna/current/security/tokens)と同等ですが、関連するIDはありません。

### [](#client-role)Client role Deprecated

クライアントロール 非推奨

Keys with the `client` role are restricted to actions and resources that are specifically marked with the `public` permission. Because their access is controlled, they are suitable for embedding in untrusted environments, such as mobile clients.

client`ロールを持つキーは、`public`パーミッションで特別にマークされたアクションやリソースに制限されます。アクセスが制御されているため、モバイルクライアントなどの信頼できない環境への組み込みに適しています。

Typically they are used as part of an application’s user authentication flow, or to access public data, such as an application’s logged-out view.

一般的には、アプリケーションのユーザ認証フローの一部として使用されたり、アプリケーションのログアウトビューなどの公開データにアクセスするために使用されたりします。

Client keys and roles, and `public` permissions are deprecated as of the 2.12.0 release. You should use the [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) system instead,

クライアントキーとロール、および `public` パーミッションは、2.12.0 リリースで非推奨となりました。代わりに [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) システムを使用する必要があります。

See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#public) for more details.

詳しくは[Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#public)をご覧ください。

### [](#scoped-keys)Scoped keys

スコープ付きのキー

There are several situations where you might want to impersonate access to a database, because regular access is more difficult or you are lacking information. For example:

通常のアクセスが困難な場合や、情報が不足している場合など、データベースへのアクセスを偽装したい場合がいくつかあります。例えば、以下のような場合です。

-   You have a reporting tool that needs to gather information from all of your child databases. To access a child database, you would typically need to use a secret associated with each child database. With hundreds or thousands of child databases, managing those secrets is challenging.

- レポートツールで、すべての子データベースから情報を収集する必要がある場合。子データベースにアクセスするには、通常、各子データベースに関連付けられたシークレットを使用する必要があります。数百から数千の子データベースがある場合、これらのシークレットを管理するのは困難です。

-   Your application performs queries on behalf of users, and you need to test that functionality and/or access controls are working correctly. However, you don’t have access to any user’s password in order to call [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login).

- アプリケーションがユーザーに代わってクエリを実行し、機能やアクセス制御が正しく機能しているかどうかをテストする必要があります。しかし、[`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)を呼び出すために、ユーザのパスワードにアクセスすることはできません。

-   Similarly, your applications provides different functionality for users with differing roles, and you need to test the functionality and access controls.

- 同様に、アプリケーションが異なる役割を持つユーザに対して異なる機能を提供している場合、その機能やアクセス制御をテストする必要があります。

To facilitate these use cases, Fauna accepts a _scoped_ key. A scoped key allows you to use a secret that you already possess to impersonate access to Fauna in several ways. However, it is not possible to use a scoped key to gain additional privileges.

このようなユースケースを容易にするために、Fauna は _scoped_ key を受け入れます。スコープされたキーを使用すると、すでに所有している秘密を使用して、いくつかの方法で Fauna へのアクセスを偽装することができます。ただし、スコープ付きキーを使用して追加の権限を得ることはできません。

A scoped key is formed from the secret of a key that you already possess, plus some additional information that provides three impersonation alternatives:

スコープされたキーは、すでに所有しているキーのシークレットに加えて、3つのなりすまし方法を提供するいくつかの追加情報から形成されます。

1.  `secret[:child_database]:role`

role` (秘密鍵)

    Where:

    -   `secret` is the key’s secret. An admin key is required to access a child database.

    - secret`はキーのシークレットです。子データベースにアクセスするにはadminキーが必要です。

    -   `child_database` is the name of a child database (optional). When specified, the `secret` for an admin key must be used. When not specified, the `secret` from an admin or server key can be used.

    - child_database` は子データベースの名前です（オプション）。指定すると、管理者キーの `secret` を使用しなければなりません。指定されていない場合は、管理者キーまたはサーバキーの `secret` を使用できます。

    -   `role` is the name of a system role to use, one of `admin`, `server`, `server-readonly`, or `client`.

    - role` は使用するシステムロールの名前で、`admin`, `server`, `server-readonly`, `client` のいずれかです。

    This kind of scoped key would typically be used to impersonate access to a child database.

    この種のスコープドキーは、通常、子データベースへのアクセスを偽装するために使用されます。

    For example: `fnACysRJGIACAHiL_5f0UxHlPFIZgq876ptMNJ72:posts:admin`

    例えば、`fnACysRJGIACAHiL_5f0UxHlPFIZgq876ptMNJ72:posts:admin`のようになります。

    Provided that the secret belong to an `admin` key, this scoped key provides full access to the child database called `posts`.

    秘密が `admin` キーに属していれば，このスコープ付きキーで `posts` という子データベースに完全にアクセスできます．

2.  `secret[:child_database]:@doc/collection/id`

    Where:

    -   `secret` is the key’s secret. An admin key is required to access a child database.

    - secret`はキーのシークレットです。子データベースにアクセスするには管理者キーが必要です。

    -   `child_database` is the name of a child database (optional). When specified, the `secret` for an admin key must be used. When not specified, the `secret` from an admin or server key can be used.

    - `child_database` は、子データベースの名前です (オプション)。指定すると、管理者キーの `secret` を使用しなければなりません。指定しない場合には、管理者キーまたはサーバキーの `secret` を使用することができる。

    -   `collection` is the name of a collection in the current database, or if `child_database` is specified, in the child database.

    - `collection` は現在のデータベースにあるコレクションの名前で、`child_database` が指定されている場合は子データベースにあるコレクションの名前である。

    -   `id` is the document ID for the document to authorize as.

    - `id` は、認証するドキュメントのドキュメント ID です。

    This kind of scoped key would be used to impersonate a specific user.

    この種のスコープドキーは、特定のユーザになりすますために使用します。

    For example: `fnACysRJGIACAHiL_5f0UxHlPFIZgq876ptMNJ72:@doc/users/1234`

    例えば、`fnACysRJGIACAHiL_5f0UxHlPFIZgq876ptMNJ72:@doc/users/1234`のようになります。

    This scoped key would have the same privileges as the authenticated `Ref(Collection("users"), 1234)` document.

    このスコープドキーは、認証された `Ref(Collection("users"), 1234)` ドキュメントと同じ権限を持つことになります。

3.  `secret[:child_database]:@role/name`

    Where:

    -   `secret` is the key’s secret. An admin key is required to access a child database.

    - `secret`はキーのシークレットです。子データベースにアクセスするには、adminキーが必要です。

    -   `child_database` is the name of a child database (optional). When specified, the `secret` for an admin key must be used. When not specified, the `secret` from an admin or server key can be used.

    - `child_database` は子データベースの名前です（オプション）。指定すると、管理者キーの `secret` を使用しなければなりません。指定されていない場合は、管理者キーまたはサーバキーの `secret` を使用できます。

    -   `name` is the name of an [ABAC role](https://docs.fauna.com/fauna/current/security/abac) to authorize as.

    - `name`は、認証する[ABACロール](https://docs.fauna.com/fauna/current/security/abac)の名前です。

    This kind of scoped key would be used to impersonate any user having the privileges of the specified role.

    この種のスコープドキーは、指定されたロールの権限を持つすべてのユーザになりすますために使用されます。

    For example: `fnACysRJGIACAHiL_5f0UxHlPFIZgq876ptMNJ72:@role/developers`

    例えば、`fnACysRJGIACAHiL_5f0UxHlPFIZgq876ptMNJ72:@role/developers`のようになります。

    This scoped key would have the same privileges as any member document with the `developers` role.

    このスコープドキーは、`developers`ロールを持つメンバードキュメントと同じ権限を持つことになります。

The Dashboard Shell’s "Run As" feature uses scoped keys.

ダッシュボードシェルの「名前を付けて実行」機能では、スコープ付きキーを使用します。

![The Dashboard’s Run As feature](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-disabled.png)

![ダッシュボードの「名前を付けて実行」機能](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-disabled.png)

![The Dashboard’s Run As feature with the Admin role enabled](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-admin.png)

![管理者ロールを有効にしたダッシュボードの「名前を付けて実行」機能](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-admin.png)

![The Dashboard’s Run As feature with the list of available roles](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-select.png)

![利用可能なロールのリストが表示されたダッシュボードの「実行」機能](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-select.png)

![The Dashboard’s Run As feature using a specific identity document](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-document.png)

![特定のIDドキュメントを使用したダッシュボードのRun As機能](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-document.png)

![The Dashboard’s Run As feature’s identity document form](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-document-form.png)

![ダッシュボードのRun As機能のIDドキュメントフォーム](https://docs.fauna.com/fauna/current/security/keys_images/screen-dashboard-run_as-enabled-document-form.png)

"Run As" allows you to run a query using different roles, which simplifies evaluating your [user-defined roles](https://docs.fauna.com/fauna/current/security/roles):

"Run As "を使用すると、異なるロールを使用してクエリを実行することができ、[ユーザー定義のロール](https://docs.fauna.com/fauna/current/security/roles)の評価を簡素化することができます。

-   `Admin`: equivalent to using a key with the [Admin role](#admin-role).

- Admin`: [Adminロール](#admin-role)を持つキーを使用するのと同じです。

-   `Server`: equivalent to using a key with the [Server role](#server-role).

- Server`: [Server role](#server-role)でキーを使うのと同じです。

-   A user-defined role: roles can be selected based on their name.

- ユーザー定義のロール: ロールはその名前に基づいて選択することができます。

-   `Specify a document`: allows you to specify an identity document.

- Specify a document`: IDドキュメントを指定することができます。

Once specified, queries that you execute in the Dashboard Shell run using the selected role or identity document.

指定すると、ダッシュボードシェルで実行するクエリは、選択されたロールまたはIDドキュメントを使用して実行されます。

## [](#definition)Definition

Definition

```javascript
{
  ref: Ref(Keys(), "265969362433737234"),
  ts: 1589906999970000,
  name: 'A server key for my_app',
  role: 'server',
  hashed_secret: '$2a$05$o6GjiF54FaZ6IBy4Qaxiz.NybQ0BcFGaze4WZ178VaTMUT.voXw5G'
}
```

|Field name|Value type|Description|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference for this key.|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long)|The timestamp, with microsecond resolution, associated with the creation of the key.|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|Optional - The key’s user-defined name.|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The key’s role. Either `admin`, `server`, `server-readonly`, `client`**Deprecated**, or one or more user-defined roles.<br>Client keys and roles, and `public` permissions are deprecated as of the 2.12.0 release. You should use the [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) system instead,|See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#public) for more details.|
|`secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The key’s authentication secret. **Only present on creation of a key, not recoverable if lost or discarded.**|
|`hashed_secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The key’s hashed authentication secret.|
|`priority`<br>**Deprecated**|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|A priority between 1 and 500, inclusive. Defaults to 1.<br>The `priority` option is deprecated as of release 2.10.0. You should avoid specifying `priority`. In some future Fauna release, `priority` will be removed. See [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority) for more details.|
|`database`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|Optional - A reference for the database associated with this key. When not provided, the key is associated with the database in which it was created (the current database).|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - User-defined metadata for the key.|

---

|フィールド名|値のタイプ|説明|
|--|--|--|
|`ref`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) |このキーのリファレンスです。|
|`ts`|[Long](https://docs.fauna.com/fauna/current/api/fql/types#long) |このキーの作成に関連するマイクロ秒単位のタイムスタンプです。|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string) |オプション - キーのユーザー定義の名前です。|
|`role`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string) |キーの役割。admin、server、server-readonly、client**非推奨**、または1つ以上のユーザー定義のロールのいずれかです。<br>**重要** クライアントキーとロール、およびパブリックパーミッションは、2.12.0リリースで非推奨となりました。代わりに、属性ベースのアクセスコントロール（ABAC）システムを使用する必要があります。詳細は「非推奨」を参照してください。|
|`secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string) |鍵の認証秘密。**鍵の作成時にのみ存在し、紛失や廃棄した場合は復元できない。**|
|`hashed_secret`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string) |キーのハッシュ化された認証シークレットです。|
|`priority`<br>**非推奨**|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number) |1～500の間で指定します。デフォルトでは1に設定されています。<br>**重要** priority`オプションはリリース2.10.0で非推奨となりました。priority` の指定は避けるべきです。将来の Fauna リリースでは、`priority` は削除される予定です。詳しくは [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations#priority)を参照してください。|
|`database`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) |オプション - このキーに関連付けられているデータベースの参照です。提供されない場合、キーは作成されたデータベース（現在のデータベース）に関連付けられます。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object) |オプション - キーに関するユーザー定義のメタデータです。|

## [](#operations)Operations on keys

キーの操作

-   Create keys with the [`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey) function.

- CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)関数でキーを作成します。

    You cannot create a key with greater privileges that the key you are already using.

    既に使用しているキーよりも大きな権限を持つキーを作成することはできません。

-   List keys in the current database by running the query:

- クエリを実行して、現在のデータベースのキーを一覧表示します。

    shell

    ```shell
    Paginate(Keys())
    ```

-   Delete keys, which immediately makes their associated secrets invalid, using the [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete) function.

- Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)関数を使って、キーを削除し、関連するシークレットを直ちに無効にします。

-   Rename a key, or modify its optional user-defined metadata (the `data` field) by using the [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update) function.

- キーの名前を変更したり、オプションでユーザー定義のメタデータ（`data`フィールド）を変更するには、[`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)関数を使用します。

## [](#related)Related

関連

- [Credentials](https://docs.fauna.com/fauna/current/security/credentials)

[クレデンシャル](https://docs.fauna.com/fauna/current/security/credentials)

- [Tokens](https://docs.fauna.com/fauna/current/security/tokens)

[トークン](https://docs.fauna.com/fauna/current/security/tokens)

- [Attribute-based access control](https://docs.fauna.com/fauna/current/security/abac)

[属性ベースのアクセスコントロール](https://docs.fauna.com/fauna/current/security/abac)

- [User-defined roles](https://docs.fauna.com/fauna/current/security/roles)

[ユーザー定義の役割](https://docs.fauna.com/fauna/current/security/roles)

- [Permissions](https://docs.fauna.com/fauna/current/security/permissions)

[パーミッション](https://docs.fauna.com/fauna/current/security/permissions)

- [Delegates](https://docs.fauna.com/fauna/current/security/delegates)

[代行](https://docs.fauna.com/fauna/current/security/delegates)

- [User authentication tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/user)

[ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)

- [Attribute-based access control tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

[属性ベースのアクセスコントロールのチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

