Attribute-based access control (ABAC) | Fauna Documentation
https://docs.fauna.com/fauna/current/security/abac

# Attribute-based access control (ABAC)

 属性ベースのアクセスコントロール(ABAC)

Attribute-based access control (ABAC) is a flexible, fine-grained strategy for managing identity-based operations within Fauna. ABAC extends the default [Fauna authentication and authorization mechanisms](https://docs.fauna.com/fauna/current/security/).

属性ベースのアクセスコントロール(ABAC)は、Fauna内でIDベースの操作を管理するための、柔軟できめ細かい戦略である。ABAC は、デフォルトの [Fauna authentication and authorization mechanism](https://docs.fauna.com/fauna/current/security/) を拡張します。

ABAC is an extension of traditional role-based access control (RBAC), where roles can define privileges that can be dynamically determined based on any attribute of the actor attempting to access or modify data (e.g. have they completed a specific training?), any attribute of the data to be accessed or modified (for example, is the document in "review" state?), or contextual information available during a transaction (e.g. is the current time between 10am and 2pm?).

ABACは、従来のロールベースのアクセスコントロール（RBAC）を拡張したもので、ロールは、データにアクセスまたは修正しようとする行為者の属性（例：特定のトレーニングを完了しているか）、アクセスまたは修正されるデータの属性（例：ドキュメントが「レビュー」状態であるか）、またはトランザクション中に利用可能なコンテキスト情報（例：現在の時刻が午前10時から午後2時の間であるか）に基づいて動的に決定される権限を定義することができます。

A _role_ defines a set of [_privileges_](#privileges) — specific actions that can be executed on specific resources — and [_membership_](#membership) — specific identities that should have the specified privileges.

ロールは、[_privileges_](#privileges)-特定のリソースに対して実行できる特定のアクション-と[_membership_](#membership)-指定された特権を持つべき特定のID-のセットを定義します。

![ABAC role overview](https://docs.fauna.com/fauna/current/security/abac_images/abac-roles.svg)

![ABACロール概要](https://docs.fauna.com/fauna/current/security/abac_images/abac-roles.svg)

Changes to identities or resources are reflected immediately, as ABAC is evaluated for every query. For example, if Carol’s manager membership is removed, she can no longer access manager-specific resources.

ABACはクエリごとに評価されるため、IDやリソースの変更は即座に反映されます。例えば、Carol のマネージャーメンバーシップが削除された場合、彼女はマネージャー固有のリソースにアクセスできなくなります。

The identity of an actor is determined by the [token](https://docs.fauna.com/fauna/current/security/tokens) included in the query sent to Fauna. When the token is valid, and the token’s associated identity is listed in a role’s membership, the query’s operations are evaluated against the privileges defined by the role; if the required privileges are granted, the query is permitted to execute.

アクターのアイデンティティは、Fauna に送信されるクエリに含まれる [token](https://docs.fauna.com/fauna/current/security/tokens)によって決定されます。トークンが有効であり、トークンに関連付けられたアイデンティティがロールのメンバーシップにリストされている場合、クエリの操作はロールで定義された特権と比較して評価され、必要な特権が付与されている場合は、クエリの実行が許可されます。

ABAC roles configure membership and privileges for the current database. It is not possible to define roles that affect child databases.

ABACロールは、現在のデータベースのメンバーシップと特権を設定します。子データベースに影響するロールを定義することはできません。

If you have defined ABAC roles that should also apply to child databases, you must establish those roles in each child database that requires them.

子データベースにも適用されるABACロールを定義した場合は、ロールを必要とする各子データベースにロールを設定する必要があります。

Beginning with Fauna 2.11.0, the Fauna access control logic has been changed to use [attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) roles, or the [key-based permission system](https://docs.fauna.com/fauna/current/security/keys), but never both.

Fauna 2.11.0 以降、Fauna のアクセス制御ロジックは、[属性ベースのアクセス制御 (ABAC)](https://docs.fauna.com/fauna/current/security/abac) ロールまたは [キーベースの許可システム](https://docs.fauna.com/fauna/current/security/keys) を使用するように変更されましたが、両方を使用することはありません。

If a resource is a [member](#membership) of an ABAC role, the ABAC role specifies all [privileges](#privileges) for that resource. Otherwise, the key-based permission system determines whether read/write/execute privileges are enabled.

リソースがABACロールの[メンバー](#membership)である場合、ABACロールはそのリソースのすべての[特権](#privileges)を指定します。それ以外の場合は、キーベースのパーミッションシステムによって、読み取り/書き込み/実行の各特権が有効かどうかが決定されます。

For example, when an ABAC role includes a user-defined function as a member, that function cannot be called unless the ABAC privileges permit the `call` action.

例えば、ABACロールがユーザー定義関数をメンバーとして含む場合、ABAC権限が`call`アクションを許可しない限り、その関数を呼び出すことはできません。

On this page:

このページでは

-   [Privileges](#privileges)
-   [Membership](#membership)
-   [Predicate functions](#predicates)
-   [Example](#example)
-   [Overlapping roles](#overlapping)
-   [Summary](#summary)

---

- [Privileges](#privileges)
- [メンバーシップ](#membership)
- [述語機能](#predicates)
- [例](#example)
- [役割の重複](#overlapping)
- [要約](#summary)

## [](#privileges)Privileges

A _privilege_ specifies a resource in Fauna, where the resource could be a database, collection, document, key, index, function, etc., and a set of pre-defined actions to permit.

Privilege_はFaunaのリソースを指定するもので、リソースにはデータベース、コレクション、ドキュメント、キー、インデックス、関数などがあり、事前に定義されたアクションのセットを許可する。

Privileges associated with containers (e.g. databases, collections, etc.) also apply to the resources within the container.

コンテナ（データベース、コレクションなど）に関連する特権は、コンテナ内のリソースにも適用される。

The actions available vary according to the target resource:

利用可能なアクションは、対象となるリソースによって異なります。

-   Core schemas (Databases, Collections, Indexes, Functions, Keys, etc.): `create` and `delete`

- コアスキーマ（データベース、コレクション、インデックス、関数、キーなど）：`create`と`delete`。

-   Documents: `create`, `read`, `write`, `delete`, `history_read`, `history_write`

- ドキュメント ドキュメント: `create`, `read`, `write`, `delete`, `history_read`, `history_write`.

-   User-defined functions: `call`

- ユーザ定義関数。コール `call`

For example:

例えば、以下のようになります。

shell

```shell
CreateRole({
  name: "access_todos",
  membership: [{ resource: Collection("users") }],
  privileges: [{
    resource: Collection("todos"),
    actions: {
      create: true,
      delete: true,
      write: true
    }
  }]
})
```

Action permissions operate as a whitelist: they define permitted actions. The default is that no actions are permitted.

アクションパーミッションはホワイトリストのように動作し、許可されるアクションを定義します。デフォルトでは、アクションは許可されません。

Action permissions can use a [predicate function](#predicates) to determine permissions dynamically. For example, an action might be permissible only during a specific period of the day.

アクションパーミッションは、[述語関数](#predicates)を使用して、パーミッションを動的に決定することができます。例えば、あるアクションは1日のうちの特定の時間帯にのみ許可されるというようなことです。

For a given resource, there may be multiple privileges defined in separate roles. When a query attempts to operate on a resource, permission is granted to process the action if **any** privilege grants the action.

1つのリソースに対して、複数の権限が別々のロールに定義されている場合があります。クエリがリソースを操作しようとしたときに、**あらゆる**特権がアクションを許可する場合、アクションを処理する権限が与えられます。

## [](#membership)Membership

メンバーシップ

_Membership_ describes the set of documents that should have the role’s privileges.

_Membership_は、そのロールの権限を持つべきドキュメントのセットを記述します。

Membership is managed with a collection; documents in the collection are members of the role. Typically, a "document" would refer to a "user", but a document can be any record within Fauna. For example, Fauna access keys can be assigned a role, which is useful for background processes.

メンバーシップはコレクションで管理され、コレクション内のドキュメントがロールのメンバーとなります。通常、"ドキュメント "は "ユーザ "を指すが、ドキュメントはFauna内のどのレコードでもよい。例えば、Fauna のアクセスキーにはロールを割り当てることができ、これはバックグラウンドプロセスに便利です。

Membership can also be controlled with a [predicate function](#predicates) for dynamic membership evaluation. For example, membership for some users might be available only during a specific period of the day.

メンバーシップは、動的なメンバーシップ評価のために、[述語関数](#predicates)を使って制御することもできます。例えば、あるユーザーのメンバーシップは、1日のうちの特定の時間帯にのみ利用できるようにすることができます。

Multiple roles can be associated with a Fauna resource, and users can be associated with multiple roles. Attribute-based access is computed for every Fauna transaction (including index filtering), and updates to the role configuration take effect immediately. Additionally, action permissions can be computed dynamically via Lambda functions.

1つのFaunaリソースに複数のロールを関連付けることができ、ユーザーは複数のロールに関連付けることができます。属性ベースのアクセスは、すべてのFaunaトランザクション（インデックスフィルタリングを含む）に対して計算され、ロール構成の更新は即座に反映される。さらに、アクションパーミッションは、Lambda関数を介して動的に計算することができます。

For example:

たとえば、以下のようになります。

shell

```shell
CreateRole({
  name: "can_manage_todos",
  membership: [
    {
      resource: Collection("users"),
      predicate: Query(Lambda(ref =>
        Select(["data", "vip"], Get(ref))
      ))
    }
  ],
  privileges: [
    // ...
  ]
})
```

## [](#predicates)Predicate functions

述語関数

A predicate function is an FQL Lambda function that operates in a read-only fashion, accepting command-specific arguments, and returning `true` or `false` to indicate whether the action is permitted or prohibited.

述語関数とは、読み取り専用で動作するFQLのラムダ関数で、コマンド固有の引数を受け取り、アクションが許可されているか禁止されているかを示すために、`true`または`false`を返します。

The actions and their associated arguments are:

アクションとそれに関連する引数は以下の通りです。

-   `create`: the new data that is about to be created.

- create`: これから作成される新しいデータです。

-   `read`, `history_read`, `delete`: the ref to the underlying document.

- read`, `history_read`, `delete`: ドキュメントへの参照です。

-   `read` for indexes: the terms being used to match against the index.

- インデックスの場合は `read`: インデックスとのマッチングに使用される用語です。

-   `write`, `history_write`: the old data, the new data, and a reference to the document to be written.

- write`, `history_write`: 古いデータ、新しいデータ、書き込まれるドキュメントへの参照。

-   `call`: the parameters to be passed to the user-defined function.

- call`: ユーザ定義関数に渡すパラメータです。

For example:

例えば、以下のようになります。

shell

```shell
CreateRole({
  name: "can_manage_todos",
  membership: [
    // ...
  ],
  privileges: [
    {
      resource: Collection("todos"),
      actions: {
        create: Query(Lambda(newData =>
          Select(["data", "vip"], Get(Identity()))
        )),
        // ...
      }
    }
  ]
})
```

## [](#example)Example

例

Here is a complete role example:

完全なロールの例を示します。

shell

```shell
CreateRole({
  name: "users",
  membership: [
    {
      // This role will be assigned to all users
      // as long as they are active
      resource: Collection("users"),
      predicate: Query(ref =>
        Select(["data", "isActive"], Get(ref), false)
      )
    }
  ],
  privileges: [
    {
      resource: Collection("todos"),
      actions: {
        write:
          // The following function enforces that you can write to your
          // own data but, you can't change the owner of the data
          Query((oldData, newData) =>
            And(
              Equals(
                Identity(),
                Select(["data", "owner"], oldData)
              ),
              Equals(
                Select(["data", "owner"], oldData),
                Select(["data", "owner"], newData),
              )
            )
          )
      }
    }
  ]
})
```

## [](#overlapping)Overlapping roles

重ね合わせロール

When a document is a member of two or more roles, Fauna does its best to optimize for the most common access pattern, to avoid evaluating roles — especially predicates — unnecessarily.

ドキュメントが2つ以上のロールのメンバーである場合、Faunaは最も一般的なアクセスパターンに最適化して、ロール（特に述語）を不必要に評価しないようにします。

The general approach is that once permission to perform a specific action for a specific resource has been granted, no further determinations for that resource+action need to be performed — the first granted access wins.

一般的なアプローチとしては、特定のリソースに対して特定のアクションを実行する許可が与えられれば、そのリソースとアクションに対してそれ以上の決定を行う必要はなく、最初に許可されたアクセスが優先される。

Internally, there is a single permission table that is populated during role processing. The table stores the resolution of permissions, keyed on the combination of resource identifier and requested action, involved in the current query.

内部的には、ロールの処理中に入力される1つのパーミッション・テーブルがあります。このテーブルには、現在の問い合わせに関係する、リソース識別子と要求されたアクションの組み合わせをキーとした、権限の解決が格納されています。

During role processing, if a resource+action permission evaluates to `true`, or can be trivially determined to be `true`, the permission is granted and no further evaluations for that specific resource+action are performed.

ロール処理中に、リソース+アクションのパーミッションが評価されて`true`になるか、`true`であることが自明に判断できる場合には、パーミッションが付与され、その特定のリソース+アクションに対するさらなる評価は行われません。

However, when all actions for a resource involve predicates, the predicates are evaluated sequentially until one of them returns `true`, or access is denied. The permission subsystem keeps track of which predicates are most successful and evaluates them first.

しかし、あるリソースに対するすべてのアクションが述語を含む場合、述語はそのうちの1つが `true` を返すか、またはアクセスが拒否されるまで、順次評価されます。パーミッション・サブシステムは、どの述語が最も成功したかを記録し、それらを最初に評価します。

The maximum number of overlapping roles is 64. When you attempt to create the 65th overlapping role, you get an error when calling the [`CreateRole`](https://docs.fauna.com/fauna/current/api/fql/functions/createrole) function.

重複するロールの最大数は64です。65番目の重複するロールを作成しようとすると、[`CreateRole`](https://docs.fauna.com/fauna/current/api/fql/functions/createrole)関数を呼び出す際にエラーが発生します。

## [](#summary)Summary

まとめ

All of this flexibility can be very useful, and it can also become very complex. Fauna does not favor any particular approach to using ABAC, but we provide the following suggestions that may be useful:

このような柔軟性は非常に便利であると同時に、非常に複雑になる可能性もあります。Fauna は ABAC を使用するための特定のアプローチを支持しませんが、役に立つ可能性のある以下の提案を提供します。

-   It is possible to lock yourself out using your current secret/token. You can recover access via the [Fauna Dashboard](https://dashboard.fauna.com/).

- 現在のシークレット/トークンを使って自分をロックアウトすることが可能です。Fauna Dashboard](https://dashboard.fauna.com/)でアクセスを回復することができます。

-   Only define as many roles as you need.

- 必要な数のロールのみを定義してください。

-   Only use predicates when necessary.

- 述語は必要な場合のみ使用してください。

-   Only provide role membership to those users that need it.

- 必要なユーザーにのみロールメンバーシップを提供してください。

## [](#related)Related

関連

-   [Keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Tokens](https://docs.fauna.com/fauna/current/security/tokens)
-   [Credentials](https://docs.fauna.com/fauna/current/security/credentials)
-   [User-defined roles](https://docs.fauna.com/fauna/current/security/roles)
-   [Permissions](https://docs.fauna.com/fauna/current/security/permissions)
-   [Delegates](https://docs.fauna.com/fauna/current/security/delegates)
-   [User authentication tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
-   [Attribute-based access control tutorial](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

---

- [キー](https://docs.fauna.com/fauna/current/security/keys)
- [トークン](https://docs.fauna.com/fauna/current/security/tokens)
- [クレデンシャル](https://docs.fauna.com/fauna/current/security/credentials)
- [ユーザー定義のロール](https://docs.fauna.com/fauna/current/security/roles)
- [パーミッション](https://docs.fauna.com/fauna/current/security/permissions)
- [代行](https://docs.fauna.com/fauna/current/security/delegates)
- [ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)
- [属性ベースのアクセスコントロールのチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/abac)

