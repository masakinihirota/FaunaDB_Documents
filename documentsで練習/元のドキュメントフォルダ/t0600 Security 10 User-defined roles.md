User-defined roles | Fauna Documentation
https://docs.fauna.com/fauna/current/security/roles

# User-defined roles

ユーザー定義のロール

User-defined roles provide configurable, domain-specific security rules. They are the core schema for [attribute-based access control](https://docs.fauna.com/fauna/current/security/abac). Roles are created with the `CreateRole` function, and have the following structure:

ユーザー定義のロールは、設定可能なドメイン固有のセキュリティルールを提供する。ロールは[属性ベースのアクセス制御](https://docs.fauna.com/fauna/current/security/abac)の中核となるスキーマです。ロールは`CreateRole`関数で作成され、以下のような構造になっています。

|Field name|Value type|Description|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The role’s name.|
|`privileges`|VarArgs|One or more [privilege configuration objects](#pco).|
|`membership`|VarArgs|Optional. One or more [membership configuration objects](#mco).|

---

|フィールド名|値のタイプ|説明|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|ロールの名前です。
|`privileges`|VarArgs|一つ以上の[権限設定オブジェクト](#pco)です。
|`membership`|VarArgs|Optional. |`membership`|VarArgs|オプション。1つまたは複数の[メンバーシップ設定オブジェクト](#mco).|

User-defined roles can only be managed with an admin key.

重要
ユーザー定義のロールは、admin キーでのみ管理できます。

Beginning with Fauna 2.11.0, the Fauna access control logic has been changed to use [attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) roles, or the [key-based permission system](https://docs.fauna.com/fauna/current/security/keys), but never both.

重要
Fauna 2.11.0以降、Faunaのアクセス制御ロジックは[属性ベースのアクセス制御(ABAC)](https://docs.fauna.com/fauna/current/security/abac)ロール、または[鍵ベースの権限システム](https://docs.fauna.com/fauna/current/security/keys)を使用するように変更されましたが、両方を使用することはありません。

If a resource is a [member](https://docs.fauna.com/fauna/current/security/abac#membership) of an ABAC role, the ABAC role specifies all [privileges](https://docs.fauna.com/fauna/current/security/abac#privileges) for that resource. Otherwise, the key-based permission system determines whether read/write/execute privileges are enabled.

重要
リソースがABACロールの[メンバー](https://docs.fauna.com/fauna/current/security/abac#membership)である場合、ABACロールはそのリソースのすべての[権限](https://docs.fauna.com/fauna/current/security/abac#privileges)を指定します。それ以外の場合は、鍵ベースの権限システムによって、読み取り/書き込み/実行のいずれの権限が有効かが決定されます。

For example, when an ABAC role includes a user-defined function as a member, that function cannot be called unless the ABAC privileges permit the `call` action.

重要
例えば、ABACロールがユーザー定義関数をメンバーとして含む場合、ABAC権限が`call`アクションを許可しない限り、その関数を呼び出すことはできません。

## [](#pco)Privilege configuration object

特権構成オブジェクト

A privilege configuration object defines, for a given resource, what actions are permitted.

特権設定オブジェクトは、与えられたリソースに対して、どのようなアクションが許可されるかを定義します。

|Field name|Value type|Description|
|--|--|--|
|`resource`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|A reference to a collection (user-defined or system), index, or user-defined function.<br>A user-defined collection would be expressed as `Collection("<collection_name>")`.<br>A system collection would be one of [`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)$, [`Collections`](https://docs.fauna.com/fauna/current/api/fql/functions/collections), [`Credentials`](https://docs.fauna.com/fauna/current/api/fql/functions/credentials), [`Databases`](https://docs.fauna.com/fauna/current/api/fql/functions/databases), [`Functions`](https://docs.fauna.com/fauna/current/api/fql/functions/functions), [`Indexes`](https://docs.fauna.com/fauna/current/api/fql/functions/indexes), [`Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys), [`Roles`](https://docs.fauna.com/fauna/current/api/fql/functions/roles), [`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens).|
|`actions`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|An object containing key-value pairs, where the keys are [action names](#actions), and the values are either a boolean value to indicate whether access is permitted, or a predicate function that can compute whether access is permitted.|

|フィールド名|値のタイプ|説明|
|--|--|--|
|`resource`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|コレクション（ユーザー定義またはシステム）、インデックス、またはユーザー定義関数への参照。<br>ユーザー定義のコレクションは、`Collection("<コレクション名>")`と表現されます。<br>システムのコレクションは、[`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders) **課金**、[`Collections`](https://docs.fauna.com/fauna/current/api/fql/functions/collections)、[`Credentials`](https://docs.fauna.com/fauna/current/api/fql/functions/credentials)、[`Databases`](https://docs.fauna.com/fauna/current/api/fql/functions/databases)、[`Functions`](https://docs.fauna.com/fauna/current/api/fql/functions/functions)、[`Indexes`](https://docs.fauna.com/fauna/current/api/fql/functions/indexes)、[`Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys)、[`Roles`](https://docs.fauna.com/fauna/current/api/fql/functions/roles)、[`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens).|
|`actions`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|キーと値のペアを含むオブジェクトです。キーは[アクション名](#actions)で、値はアクセスが許可されているかどうかを示すブール値か、アクセスが許可されているかどうかを計算できる述語関数のいずれかです。|

The available actions are:

利用可能なアクションは以下の通りです。

-   `create`: permits the creation of new documents.
-   `delete`: permits the deletion of existing documents.
-   `read`: permits the reading of documents, from collections or indexes.
-   `write`: permits writing to existing documents within a collection.
-   `history_read`: permits reading historical versions of documents, from collections or indexes.
-   `history_write`: permits inserting events into the history for an existing document.
-   `unrestricted_read`: permits the reading of an index without considering any other `read` permissions.
-   `call`: permits the calling of user-defined functions.

---

- create`: 新しいドキュメントの作成を許可する。
- delete`: 既存のドキュメントの削除を許可します。
- read`: コレクションやインデックスからのドキュメントの読み込みを許可します。
- write`: コレクション内の既存のドキュメントへの書き込みを許可します。
- History_read`: コレクションやインデックスからドキュメントの履歴バージョンを読み取ることを許可します。
- history_write`: 既存のドキュメントの履歴にイベントを挿入することを許可します。
- unrestricted_read`: 他の `read` パーミッションを考慮せずに、インデックスの読み取りを許可します。
- call`: ユーザ定義関数の呼び出しを許可します。

When configuring read access to an index, both the `read` and `unrestricted_read` actions are permitted. The `read` action grants access to the index’s data. However, an additional `read` permission check is performed before allowing access to the indexed document, which filters out references that the user cannot read. The `unrestricted_read` action disables the additional check, returning all of the documents associated with the index.

インデックスへの読み取りアクセスを設定する際には、 `read` と `unrestricted_read` の両方のアクションが許可されます。read`アクションは、インデックスのデータへのアクセスを許可します。しかし、インデックス化されたドキュメントへのアクセスを許可する前に、追加の `read` 権限チェックが実行され、ユーザが読むことのできない参照が除外されます。unrestricted_read`アクションは、この追加チェックを無効にして、インデックスに関連付けられたドキュメントをすべて返します。

An action’s value can be a boolean, to indicate whether the action is permitted or not, or a read-only lambda predicate function. Lambda predicate functions must be created using a [`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query), using the same format that the [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) function accepts. The predicate function takes different parameters depending on the configured action. Predicates must return a boolean value where `true` grants the action, and `false` denies it.

アクションの値は、そのアクションが許可されているかどうかを示すブール値か、読み取り専用のラムダ述語関数になります。ラムダ述語関数は、[`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)を使って、[`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)関数が受け付けるのと同じフォーマットで作成する必要があります。プレディケート関数は、設定されたアクションに応じて異なるパラメータを取ります。述語は、`true`がアクションを許可し、`false`がアクションを拒否するブール値を返さなければなりません。

The parameters to a predicate function are:

述語関数のパラメータは以下の通りです。

|Action|Argument(s)|Description|
|--|--|--|
|`create`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|An object containing the new document’s data.|
|`delete`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference to the document to be deleted.|
|`read`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref), or index terms|A reference to the document to be read, or one or more terms to be matched against the target index.|
|`write`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object), <br>[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|Three parameters:<br>1.  An object containing the original document data.<br>2.  An object containing the new document data (to be written).<br>3.  A reference to the document to be written.|
|`history_read`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The reference to the document to be read.|
|`history_write`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)<br>[Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp)<br>[String](https://docs.fauna.com/fauna/current/api/fql/types#string)<br>[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Four parameters:<br>1.  The reference to the document to be written.<br>2.  The timestamp to write to, which may create or update an event depending on existence of a matching timestamp.<br>3.  The action string.<br>4.  An object containing the new document data.|
|`unrestricted_read`|Index terms|The terms matched against the target index.|
|`call`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|The parameters that are to be passed to the user-defined function.|

---

|アクション|引数|説明|
|--|--|--|
|`create`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|新しいドキュメントのデータを含むオブジェクトです。|
|`delete`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|削除されるドキュメントへの参照です。|
|`read`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref), or index terms|読み込まれるドキュメントへの参照、または対象となるインデックスに対してマッチされる1つ以上の用語。|
|`write`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object), <br>[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|3つのパラメータ:<br>1.  オリジナルのドキュメントデータを含むオブジェクト。<br>2.新しいドキュメントデータ（書き込まれる）を含むオブジェクト。<br>3.書き込まれるドキュメントへの参照。|
|`history_read`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|読まれるドキュメントへの参照です。|
|`history_write`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)<br>[Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp)<br>[String](https://docs.fauna.com/fauna/current/api/fql/types#string)<br>[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|4つのパラメータ：<br>1.  書き込まれるドキュメントへの参照。<br>2. 一致するタイムスタンプの存在に応じて、イベントを作成または更新する可能性のある、書き込み先のタイムスタンプ。<br>3. アクション文字列。<br>4. 新しいドキュメントデータを含むオブジェクト。|
|`unrestricted_read`|Index terms|対象のインデックスに対してマッチした用語。|
|`call`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|ユーザー定義関数に渡されるパラメータ。|

## [](#mco)Membership configuration object

メンバーシップ設定オブジェクト

A membership configuration object dynamically defines which authenticated resources are members of a given role.

メンバーシップ設定オブジェクトは、どの認証済みリソースが特定のロールのメンバーであるかを動的に定義します。

|Field name|Value type|Description|
|--|--|--|
|`resource`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|A reference to a collection in which its documents are members of the configured role.|
|`predicate`|[`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)|Optional. A read-only lambda predicate function that takes the reference of the authenticated resource and returns a boolean value that indicates whether the referenced resource is a member of the configured role.|

---

|フィールド名|値のタイプ|説明|
|--|--|--|
|`resource`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|設定されたロールのメンバーであるドキュメントを含む、コレクションへの参照です。|
|`predicate`|[`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)|オプションです。認証されたリソースの参照を取り、参照されたリソースが構成されたロールのメンバーであるかどうかを示すブール値を返す読み取り専用のラムダ述語関数です。|

## [](#related)Related

-   [Keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Tokens](https://docs.fauna.com/fauna/current/security/tokens)
-   [Credentials](https://docs.fauna.com/fauna/current/security/credentials)
-   [Attribute-based access control](https://docs.fauna.com/fauna/current/security/abac)
-   [Permissions](https://docs.fauna.com/fauna/current/security/permissions)
-   [Delegates](https://docs.fauna.com/fauna/current/security/delegates)
-   [User authentication tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
-   [Attribute-based access control tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

---

- [キー](https://docs.fauna.com/fauna/current/security/keys)
- [トークン](https://docs.fauna.com/fauna/current/security/tokens)
- [クレデンシャル](https://docs.fauna.com/fauna/current/security/credentials)
- [属性ベースのアクセスコントロール](https://docs.fauna.com/fauna/current/security/abac)
- [パーミッション](https://docs.fauna.com/fauna/current/security/permissions)
- [代行](https://docs.fauna.com/fauna/current/security/delegates)
- [ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
- [属性ベースのアクセスコントロールのチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

