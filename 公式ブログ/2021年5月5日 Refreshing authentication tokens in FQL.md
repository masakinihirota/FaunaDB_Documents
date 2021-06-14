解説
Blueprint を利用して FaunaDB の認証を勉強する。

Blueprint は青写真、基礎的な設計書という意味。

FQL
Fauna の SQL のようなもの、サーバレス専用のデータベース操作言語

詳しく知るにはドキュメントのチュートリアルに FQL の項目があり
FQL basics に学習手順がある。

Fundamental concepts | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/basics/

# Refreshing authentication tokens in FQL

FQL の認証トークンを更新する

Brecht De Rooms|May 5th, 2021|

2021 年 5 月 5 日

Categories:

[Authentication](https://fauna.com/blog?category=authentication)

## Introduction

前書き

Authenticated users access Fauna using [tokens](https://docs.fauna.com/fauna/current/api/fql/functions/tokens?lang=javascript). [Refresh tokens](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/) reduce the risk of providing long-term access to your users. In this post, you learn how to implement refresh tokens in FQL using a [simple refresh flow blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple).

認証されたユーザーは、トークンを使用して動物相にアクセスします。更新トークンは、ユーザーに長期アクセスを提供するリスクを軽減します。この投稿では、単純なリフレッシュフローブループリントを使用して FQL にリフレッシュトークンを実装する方法を学習します。

User-defined functions (UDFs) are the key to this implementation. When you create a UDF, you encapsulate an FQL query and store it in the database. Encapsulating your logic in functions has [many advantages](https://docs.fauna.com/fauna/current/tutorials/basics/functions#why), including reusability. Once you define these functions in your database, your FQL queries can reuse the login, logout, refresh, and register logic.

ユーザー定義関数（UDF）は、この実装の鍵です。UDF を作成するときは、FQL クエリをカプセル化し、データベースに保存します。ロジックを関数にカプセル化することには、再利用性など、多くの利点があります。データベースでこれらの関数を定義すると、FQL クエリはログイン、ログアウト、更新、および登録ロジックを再利用できます。

Function Description
register Creates a new account
login Verifies credentials and provides refresh and access tokens
refresh Creates a new access token
logout Removes all the access tokens related to a given refresh token or account

登録 新しいアカウントを作成します
ログインする 資格情報を確認し、更新トークンとアクセストークンを提供します
リフレッシュ 新しいアクセストークンを作成します
ログアウト 特定の更新トークンまたはアカウントに関連するすべてのアクセストークンを削除します

This article assumes basic familiarity with FQL. To learn more about FQL, visit this [series of articles](https://docs.fauna.com/fauna/current/tutorials/basics/).

この記事は、FQL の基本的な知識があることを前提としています。FQL の詳細については、この一連の記事にアクセスしてください。

## Deploying to your own account

自分のアカウントにデプロイする

The blueprint format allows you to set up or tear down the provided resources with the experimental [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate) tool. To deploy the blueprint to your own Fauna account, follow the [“Set up a blueprint” instructions](https://github.com/fauna-labs/fauna-blueprints#set-up-a-blueprint) in the repository README.

ブループリント形式では、実験的な動物相-スキーマ-移行ツールを使用して、提供されたリソースを設定または破棄できます。ブループリントを自分の Fauna アカウントに展開するには、リポジトリ README の「ブループリントの設定」の手順に従います。

## Implementation

実装

To register a user, you must create a collection for users or accounts. Fauna does not provide a default user collection. Instead, you can use any document to log in and receive a token with privileges to access other documents. In this post, you create an /accounts/ collection and grant login and data access permissions via /accounts/ documents.

ユーザーを登録するには、ユーザーまたはアカウントのコレクションを作成する必要があります。動物相はデフォルトのユーザーコレクションを提供しません。代わりに、任意のドキュメントを使用してログインし、他のドキュメントにアクセスする権限を持つトークンを受け取ることができます。この投稿では、/ accounts /コレクションを作成し、/ accounts /ドキュメントを介してログインとデータアクセスのアクセス許可を付与します。

### Register

登録

Create a collection named /accounts/ to store documents containing account information.

アカウント情報を含むドキュメントを保存する/ accounts /という名前のコレクションを作成します。

[\> fauna/resources/collections/accounts.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/collections/accounts.fql)

```
CreateCollection({
  name: ‘accounts’
})
```

An _account_ document contains only an email and a password. An email property is a user-defined property, so it must be nested under the data property.

アカウントのドキュメントでは、メールアドレスとパスワードが含まれています。電子メールプロパティはユーザー定義のプロパティであるため、データプロパティの下にネストする必要があります。

```
Create(Collection(‘accounts’), {
  data: {
    email: ‘your email’
  }
})))
```

Next, you need a place to store passwords.

次に、パスワードを保存する場所が必要です。

Since passwords are sensitive, Fauna provides a safe ‘credentials.password’ field to store them.

パスワードは機密性が高いため、Fauna はパスワードを保存するための安全な「credentials.password」フィールドを提供します。

Fauna stores [credentials](https://docs.fauna.com/fauna/current/security/credentials.html) separately from the rest of the document.

動物相は、ドキュメントの他の部分とは別にクレデンシャルを保存します。

To store a password when you create the user, use the following FQL.

ユーザーの作成時にパスワードを保存するには、次の FQL を使用します。

```
Create(Collection(‘accounts’), {
  credentials: { password: ‘your user password’ },
  data: {
    email: ‘your email’
  }
})))
```

Fauna hashes the password before storage and never returns it to a client. You verify a password with the [Identify](https://docs.fauna.com/fauna/current/api/fql/functions/identify?lang=javascript) or [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) functions. You learn how to use these functions in the [login section](https://docs.google.com/document/d/1R3s1ju2y8OHy8bazHUdXzr7IHyCTBNBZeHPM5sQO1k0/edit#heading=h.twozxdzuliu).

動物相は保存前にパスワードをハッシュし、クライアントにパスワードを返すことはありません。パスワードは、識別機能またはログイン機能を使用して確認します。ログインセクションでこれらの機能の使用方法を学びます。

To run the query, paste the following FQL into the shell in the [Fauna dashboard](https://dashboard.fauna.com/).

クエリを実行するには、次の FQL を Fauna ダッシュボードのシェルに貼り付けます。

```
Create(Collection(‘accounts’), {
  credentials: { password: ‘your user password’ },
  data: {
    email: ‘your email’
  }
})))
```

You can also wrap the query in a UDF.

クエリを UDF でラップすることもできます。

Use [CreateFunction](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction?lang=javascript) to create a new UDF, providing a name, body, and role. Wrap [Query](https://docs.fauna.com/fauna/current/api/fql/functions/query?lang=javascript) and [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda?lang=javascript) statements around the function body. _Lambda_ allows you to specify parameters, and _Query_ defers the Lambda execution.

CreateFunction を使用して、名前、本文、および役割を指定して、新しい UDF を作成します。Query ステートメントと Lambda ステートメントを関数本体にラップします。Lambda を使用するとパラメーターを指定でき、Query は Lambda の実行を延期します。

[\> fauna/resources/functions/register.fql](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/functions/register.fql)

```
CreateFunction({
  name: ‘register’,
  body: Query(Lambda([‘email’, ‘password’],
    Create(Collection(‘accounts’), {
      credentials: { password: Var(‘password’) },
      data: {
        email: Var(‘email’)
      }
    }))),
  role: Role(‘server’)
})
```

**Note:** By default, the UDF receives the permissions of the client that called the UDF. Specify a role to provide the UDF with more granular permissions.

注：デフォルトでは、UDF は UDF を呼び出したクライアントの権限を受け取ります。より詳細な権限を UDF に提供する役割を指定します。

### Login

Now that you can create accounts, you need login functionality.

アカウントを作成できるようになったので、ログイン機能が必要です。

When a user logs in, they receive access to their application data.

ユーザーがログインすると、アプリケーションデータにアクセスできます。

In Fauna, you grant a user identity-based access by providing a token.

動物相では、トークンを提供することにより、ユーザー ID ベースのアクセスを許可します。

To implement refresh tokens, use [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create?lang=javascript) to generate a token document in the Tokens collection manually. When you create tokens manually, you have fine-grained control over these tokens.

更新トークンを実装するには、[作成]を使用して、Tokens コレクションにトークンドキュメントを手動で生成します。トークンを手動で作成すると、これらのトークンをきめ細かく制御できます。

```
Create(Tokens(), {
  instance: ‘<account reference>’ }
)
```

For example, you can implement behavior similar to the built-in Login function as follows.

たとえば、組み込みのログイン関数と同様の動作を次のように実装できます。

```
If(
  Identify(‘<account reference>’,’your user password’),
  Create(Tokens(), { instance:’<account reference>’, ‘293325523599229445’)}),
  Abort(‘The document was not found or provided password was incorrect.’)
)
```

**Note:** The rest of this implementation composes queries in the host language (JavaScript). Composition helps you manage the complexity of advanced queries. To learn more, review [this example application](https://docs.fauna.com/fauna/current/start/apps/fwitter.html).

注：この実装の残りの部分は、ホスト言語（JavaScript）でクエリを作成します。構成は、高度なクエリの複雑さを管理するのに役立ちます。詳細については、このサンプルアプリケーションを確認してください。

For example, the following snippet creates a UDF but delegates the main logic to the _LoginAccount_ function defined elsewhere.

delegates
委譲する

たとえば、次のスニペットは UDF を作成しますが、メインロジックを他の場所で定義されている LoginAccount 関数に委任します。

[\> fauna/resources/functions/login.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/functions/login.js)

```javascript
export default CreateFunction({
  name: ‘login’,
  body: Query(Lambda([‘email’, ‘password’],
    LoginAccount(Var(‘email’), Var(‘password’))
  )),
  role: ‘server’
})
```

_LoginAccount_ is a JavaScript function that returns the rest of the FQL that forms the complete query.

LoginAccount は、完全なクエリを形成する残りの FQL を返す JavaScript 関数です。

The only pure FQL functions in _LoginAccount_ are [If](https://docs.fauna.com/fauna/current/api/fql/functions/if?lang=javascript) and [And](https://docs.fauna.com/fauna/current/api/fql/functions/and?lang=javascript).

LoginAccount の純粋な FQL 関数は、If と And だけです。

The rest of this query consists of JavaScript functions that return more FQL.

consists
～から成り立つ（自）

このクエリの残りの部分は、より多くの FQL を返す JavaScript 関数で構成されています。

Use similar abstractions to compose queries that you can test independently.

同様の抽象化を使用して、個別にテストできるクエリを作成します。

Once composed, the query runs as a single statement.

作成されると、クエリは単一のステートメントとして実行されます。

[\> fauna/src/login.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/login.js)

```javascript
export function LoginAccount(
  email,
  password,
  accessTtlSeconds,
  refreshTtlSeconds
) {
  return If(
    And(VerifyAccountExists(email), IdentifyAccount(email, password)),
    CreateTokensForAccount(
      email,
      password,
      accessTtlSeconds,
      refreshTtlSeconds
    ),
    false
  );
}
```

To verify that an account exists, match the email to an [index](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/indexes/accounts-by-email.fql) and use [Exists](https://docs.fauna.com/fauna/current/api/fql/functions/exists?lang=javascript) to confirm that there is at least one result.

アカウントが存在することを確認するには、電子メールをインデックスと照合し、Exists を使用して少なくとも 1 つの結果があることを確認します。

```javascript
function VerifyAccountExists(email) {
  return Exists(Match(Index(‘accounts_by_email’), email))
}
```

After verifying that the account exists, check the password with the [Identify](https://docs.fauna.com/fauna/current/api/fql/functions/identify?lang=javascript) function.

アカウントが存在することを確認した後、識別機能でパスワードを確認してください。

Use the same index to retrieve the account, or extract account retrieval into a separate function for reusability.

retrieve（vt）
取り出す

retrieval（名）
検索

同じインデックスを使用してアカウントを取得するか、アカウントの取得を別の関数に抽出して再利用します。

```javascript
function IdentifyAccount(email, password) {
  return Identify(Select([‘ref’], GetAccountByEmail(email)), password)
}

function GetAccountByEmail(email) {
  return Get(Match(Index(‘accounts_by_email’), email))
}
```

The LoginAccount query uses both _VerifyAccountExists_ and _IdentifyAccount_ in one query.

LoginAccount クエリは、1 つのクエリで VerifyAccountExists と IdentifyAccount の両方を使用します。

You might worry that the query searches the index twice, which would be inefficient.

inefficient
非効率

クエリがインデックスを 2 回検索するのではないかと心配するかもしれませんが、これは非効率的です。

However, Fauna recognizes that these calls are equivalent and deduplicates them for you, so that you can focus on writing clean, reusable code.

ただし、Fauna はこれらの呼び出しが同等であることを認識し、それらを重複排除するため、クリーンで再利用可能なコードの記述に集中できます。

```javascript
function CreateTokensForAccount(email, password, accessTtlSeconds, refreshTtlSeconds) {
  return Let(
    {
      account: GetAccountByEmail(email),
      accountRef: Select([‘ref’], Var(‘account’)),
      tokens: CreateAccessAndRefreshToken(Var(‘accountRef’), accessTtlSeconds, refreshTtlSeconds)
    },
    {
      tokens: Var(‘tokens’),
      account: Var(‘account’)
    },
  )
}
```

You can find the implementation of that function in a separate [tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/tokens.js) file.

その関数の実装は、別の tokens.js ファイルにあります。

The function uses [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let?lang=javascript) to organize the query, creates the refresh token with _CreateRefreshToken_, and binds it to the _refresh_ variable.

この関数は、Let を使用してクエリを整理し、CreateRefreshToken を使用して更新トークンを作成し、それを更新変数にバインドします。

It then passes on the reference of the refresh token to create the access token (CreateAccessToken).

そして、リフレッシュ・トークンの参照を渡してアクセストークンを作成します（CreateAccessToken）。

In the second parameter of the let, you can place a return value, here a JSON structure that returns both access and refresh token.

let の 2 番目のパラメータには、戻り値を置くことができます。ここでは、アクセストークンとリフレッシュトークンの両方を返す JSON 構造を使用しています。

[\> fauna/src/tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/tokens.js)

```javascript
export function CreateAccessAndRefreshToken(instance, accessTtlSeconds, refreshTtlSeconds) {
  return Let(
    {
      refresh: CreateRefreshToken(instance, refreshTtlSeconds),
      access: CreateAccessToken(instance, Select([‘ref’], Var(‘refresh’)), accessTtlSeconds)
    },
    {
      refresh: Var(‘refresh’),
      access: Var(‘access’)
    }
  )
}
```

Refresh tokens have a default time to live (TTL) of 8 hours and have their type property set to _refresh_.

更新トークンのデフォルトの存続時間（TTL）は 8 時間で、type プロパティは refresh に設定されています。

```javascript
export const REFRESH_TOKEN_LIFETIME_SECONDS = 28800 // 8 hours

export function CreateRefreshToken(accountRef, ttlSeconds) {
  return Create(Tokens(), {
    instance: accountRef,
    data: {
      type: ‘refresh’
    },
    ttl: TimeAdd(Now(), ttlSeconds || REFRESH_TOKEN_LIFETIME_SECONDS, ‘seconds’),
  })
}
```

Access tokens have a default TTL of 10 minutes will have a type property set to _access_.

アクセストークンのデフォルト TTL は 10 分で、type プロパティが access に設定されます。

Access tokens also reference the refresh token that created them, allowing you to retrieve them using an _index_.

アクセストークンは、それらを作成した更新トークンも参照するため、インデックスを使用してトークンを取得できます。

```javascript
export const ACCESS_TOKEN_LIFETIME_SECONDS = 600

export function CreateAccessToken(accountRef, refreshTokenRef, ttlSeconds) {
  return Create(Tokens(), {
    instance: accountRef,
    data: {
      type: ‘access’,
      refresh: refreshTokenRef
    },
    ttl: TimeAdd(Now(), ttlSeconds || ACCESS_TOKEN_LIFETIME_SECONDS, ‘seconds’)
  })
}
```

Each token has different privileges based on the roles that you assign.

各トークンには、割り当てた役割に基づいて異なる特権があります。

### Access role

Your login function now returns access and refresh tokens.

ログイン関数は、アクセストークンと更新トークンを返すようになりました。

Next, you write a custom role to grant access your data, in this case, a collection named _dinos_.

次に、データへのアクセスを許可するカスタムロール（この場合は dinos という名前のコレクション）を記述します。

[\> fauna/resources/collections/dinos.fql](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/collections/dinos.fql)

```
CreateCollection({ name: ‘dinos’ })
```

[\> fauna/resources/roles/loggedin.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/roles/loggedin.js)

The following role provides privileges to all tokens linked to any account using Fauna’s built-in [membership](https://docs.fauna.com/fauna/current/security/abac.html) functionality.

次の役割は、Fauna の組み込みメンバーシップ機能を使用して任意のアカウントにリンクされているすべてのトークンに特権を提供します。

```
CreateRole({
  name: ‘loggedin’,
  membership: [
    {
      resource: Collection(‘accounts’)
    }
  ],
  privileges: [
    ...
  ]
})
```

Use a membership [predicate](https://docs.fauna.com/fauna/current/security/abac.html#predicates) to specify which tokens or accounts receive privileges.

predicate
述語

メンバーシップ述語を使用して、特権を受け取るトークンまたはアカウントを指定します。

A role grants privileges to a token only if the FQL predicate evaluates to true.

evaluates
ーを評価する

ロールは、FQL 述部が true と評価された場合にのみ、トークンに特権を付与します。

For example, you can write a predicate that verifies that an access token is used to execute a query.

例えば、アクセストークンがクエリの実行に使用されているかどうかを検証する述語を書くことができます。

```
CreateRole({
  name: ‘loggedin’,
  membership: [
    {
      resource: Collection(‘accounts’)
      predicate: Query(Lambda(ref => IsCalledWithAccessToken()))
    }
  ],
  privileges: [
    ...
  ]
})
```

You retrieve the token reference with [CurrentToken](https://docs.fauna.com/fauna/current/api/fql/functions/currenttoken?lang=javascript), use [Get](https://docs.fauna.com/fauna/current/api/fql/functions/get?lang=javascript) to fetch the entire document, then verify whether it has the _access_ type with [Equals](https://docs.fauna.com/fauna/current/api/fql/functions/equals?lang=javascript).

CurrentToken を使用してトークン参照を取得し、Get を使用してドキュメント全体をフェッチしてから、アクセスタイプが Equals であるかどうかを確認します。

```javascript
export function IsCalledWithAccessToken() {
  return Equals(Select([‘data’, ‘type’], Get(CurrentToken()), false), ‘access’)
}
```

The privileges in the following example provide read access to the ‘dinos’ collection.

次の例の特権は、「dinos」コレクションへの読み取りアクセスを提供します。

```javascript
import { IsCalledWithAccessToken } from “../../src/tokens”

export default CreateRole({
  name: ‘loggedin’,
  membership: [
    {
      resource: Collection(‘accounts’),
      predicate: Query(Lambda(ref => IsCalledWithAccessToken()))
    }
  ],
  privileges: [
    {
      resource: Collection(‘dinos’),
      actions: {
        read: true
      }
    }
  ]
})
```

### Refresh role

役割の更新

Currently, the refresh token has no privileges.

現在、更新トークンには特権がありません。

To call this function, you must define another role.

この関数を呼び出すには、別のロールを定義する必要があります。

This time the membership predicate verifies that the query is called with a refresh token.

今回、メンバーシップ述部は、クエリが更新トークンで呼び出されたことを確認します。

The refresh role has a similar predicate but does not provide access to data.

リフレッシュロールにも同様の述語がありますが、データへのアクセスは提供されません。

Instead, it receives one privilege to call the refresh function.

代わりに、更新関数を呼び出すための 1 つの特権を受け取ります。

[\> fauna/resources/roles/refresh.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/roles/refresh.js)

```javascript
export default CreateRole({
  name: ‘refresh’,
  membership: [
    {
      resource: Collection(‘accounts’),
      predicate: Query(Lambda(ref => IsCalledWithRefreshToken()))
    }
  ],
  privileges: [
    {
      resource: q.Function(‘refresh’),
      actions: {
        call: true
      }
    }
  ]
})
```

### Refresh

The _refresh_ function creates new access and refresh tokens.

リフレッシュ機能は、新たなアクセスとリフレッシュトークンを作成します。

You can implement it by reusing the previously defined _CreateAccessAndRefreshToken_.

以前に定義した CreateAccessAndRefreshToken を再利用することで実装できます。

[\> fauna/resources/functions/refresh.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/functions/refresh.js)

```javascript
export default CreateFunction({
  name: ‘refresh’,
  body: Query(Lambda([], {
    tokens: CreateAccessAndRefreshToken(
      CurrentIdentity(),
      ACCESS_TOKEN_LIFETIME_SECONDS,
      REFRESH_TOKEN_LIFETIME_SECONDS),
    account: Get(CurrentIdentity())
  })),
  role: ‘server’
})
```

### Logout

Create a custom _Logout_ function to delete both the access and refresh tokens.

カスタムログアウト関数を作成して、アクセストークンと更新トークンの両方を削除します。

[\> fauna/resources/functions/logout.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/functions/logout.js)

```javascript
import faunadb from ‘faunadb’
import { Logout } from ‘../../src/logout’
const q = faunadb.query
const { Query, Lambda, CreateFunction, Var } = q

export default CreateFunction({
  name: ‘logout’,
  body: Query(Lambda([‘all’], Logout(Var(‘all’)))),
  role: ‘server’
})
```

To remove all tokens linked to an instance, you can use the built-in [Logout](https://docs.fauna.com/fauna/current/api/fql/functions/logout?lang=javascript) function.

インスタンスにリンクされているすべてのトークンを削除するには、組み込みのログアウト機能を使用できます。

When false is passed, use the custom functionality implemented by _LogoutAccessAndRefreshToken_.

false が渡された場合は、LogoutAccessAndRefreshToken によって実装されたカスタム機能を使用します。

```javascript
export function Logout(all) {
  return If(all, Logout(true), LogoutAccessAndRefreshToken());
}
```

[\> fauna/src/tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/tokens.js)

To log out one session, remove the refresh token and all access tokens minted by that refresh token.

minted
作られた

1 つのセッションをログアウトするには、リフレッシュ・トークンと、そのリフレッシュ・トークンによって生成されたすべてのアクセストークンを削除します。

Since access tokens keep references to the refresh tokens that created them, you can retrieve all access tokens created by a refresh token using an index.

アクセストークンは、それらを作成した更新トークンへの参照を保持するため、インデックスを使用して、更新トークンによって作成されたすべてのアクセストークンを取得できます。

You then paginate over these tokens deleting each one.

次に、これらのトークンをページングして、各トークンを削除します。

Delete the refresh token itself with _Delete(CurrentToken())_, which is equivalent to _Logout(false)_.

更新トークン自体を Delete（CurrentToken（））で削除します。これは、Logout（false）と同等です。

```javascript
export function LogoutAccessAndRefreshToken () {
  return Do(
    LogoutAccessTokensForRefreshToken(CurrentToken()),
    Delete(CurrentToken())
  )
}

function LogoutAccessTokensForRefreshToken (refreshTokenRef) {
  return q.Map(
    Paginate(Match(Index(‘access_token_by_refresh_token’), refreshTokenRef)),
    Lambda([’t’], Delete(Var(’t’)))
  )
}
```

## Conclusion

結論

The Fauna [simple refresh tokens blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple) provides an example implementation that you can learn from, customize or use in your application.

動物相の単純な更新トークンのブループリントは、アプリケーションから学習、カスタマイズ、または使用できる実装例を提供します。

In this post, you learned how to implement and use the blueprint.

この投稿では、ブループリントを実装して使用する方法を学びました。

For a more advanced refresh workflow, see [detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql) and the [accompanying blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-advanced).

より高度な更新ワークフローについては、FQL でのリークされた認証トークンの検出とそれに付随するブループリントを参照してください。

Deploy this blueprint to your own Fauna database today by [following the instructions in the README](https://github.com/fauna-brecht/fauna-blueprints#set-up-a-blueprint).

README の指示に従って、このブループリントを自分の動物相データベースに今すぐ展開してください。

Share your thoughts in the [Fauna forums](https://forums.fauna.com/) and let us know which blueprints you would like to see next!

動物相フォーラムであなたの考えを共有し、次に見たい青写真を教えてください！

※
この投稿のシリーズの次のファイル
2021 年 5 月 5 日 Detecting leaked authentication tokens in FQL.md
