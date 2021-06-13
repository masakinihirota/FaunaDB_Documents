# Refreshing authentication tokens in FQL

Brecht De Rooms|May 5th, 2021|

2021年5月5日

Categories:

[Authentication](https://fauna.com/blog?category=authentication)

## Introduction

前書き

Authenticated users access Fauna using [tokens](https://docs.fauna.com/fauna/current/api/fql/functions/tokens?lang=javascript). [Refresh tokens](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/) reduce the risk of providing long-term access to your users. In this post, you learn how to implement refresh tokens in FQL using a [simple refresh flow blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple).

認証されたユーザーは、トークンを使用して動物相にアクセスします。更新トークンは、ユーザーに長期アクセスを提供するリスクを軽減します。この投稿では、単純なリフレッシュフローブループリントを使用してFQLにリフレッシュトークンを実装する方法を学習します。

User-defined functions (UDFs) are the key to this implementation. When you create a UDF, you encapsulate an FQL query and store it in the database. Encapsulating your logic in functions has [many advantages](https://docs.fauna.com/fauna/current/tutorials/basics/functions#why), including reusability. Once you define these functions in your database, your FQL queries can reuse the login, logout, refresh, and register logic.

ユーザー定義関数（UDF）は、この実装の鍵です。UDFを作成するときは、FQLクエリをカプセル化し、データベースに保存します。ロジックを関数にカプセル化することには、再利用性など、多くの利点があります。データベースでこれらの関数を定義すると、FQLクエリはログイン、ログアウト、更新、および登録ロジックを再利用できます。

Function  Description
register  Creates a new account
login     Verifies credentials and provides refresh and access tokens
refresh   Creates a new access token
logout    Removes all the access tokens related to a given refresh token or account

登録	        新しいアカウントを作成します
ログインする	資格情報を確認し、更新トークンとアクセストークンを提供します
リフレッシュ	新しいアクセストークンを作成します
ログアウト	  特定の更新トークンまたはアカウントに関連するすべてのアクセストークンを削除します

This article assumes basic familiarity with FQL. To learn more about FQL, visit this [series of articles](https://docs.fauna.com/fauna/current/tutorials/basics/).

この記事は、FQLの基本的な知識があることを前提としています。FQLの詳細については、この一連の記事にアクセスしてください。

## Deploying to your own account

The blueprint format allows you to set up or tear down the provided resources with the experimental [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate) tool. To deploy the blueprint to your own Fauna account, follow the [“Set up a blueprint” instructions](https://github.com/fauna-labs/fauna-blueprints#set-up-a-blueprint) in the repository README.

## Implementation

To register a user, you must create a collection for users or accounts. Fauna does not provide a default user collection. Instead, you can use any document to log in and receive a token with privileges to access other documents. In this post, you create an /accounts/ collection and grant login and data access permissions via /accounts/ documents.

### Register

Create a collection named /accounts/ to store documents containing account information.

[\> fauna/resources/collections/accounts.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/collections/accounts.fql)

```
CreateCollection({
  name: ‘accounts’
})
```

An _account_ document contains only an email and a password. An email property is a user-defined property, so it must be nested under the data property.

```
Create(Collection(‘accounts’), {
  data: {
    email: ‘your email’
  }
})))
```

Next, you need a place to store passwords. Since passwords are sensitive, Fauna provides a safe ‘credentials.password’ field to store them. Fauna stores [credentials](https://docs.fauna.com/fauna/current/security/credentials.html) separately from the rest of the document.

To store a password when you create the user, use the following FQL.

```
Create(Collection(‘accounts’), {
  credentials: { password: ‘your user password’ },
  data: {
    email: ‘your email’
  }
})))
```

Fauna hashes the password before storage and never returns it to a client. You verify a password with the [Identify](https://docs.fauna.com/fauna/current/api/fql/functions/identify?lang=javascript) or [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) functions. You learn how to use these functions in the [login section](https://docs.google.com/document/d/1R3s1ju2y8OHy8bazHUdXzr7IHyCTBNBZeHPM5sQO1k0/edit#heading=h.twozxdzuliu).

To run the query, paste the following FQL into the shell in the [Fauna dashboard](https://dashboard.fauna.com/).

```
Create(Collection(‘accounts’), {
  credentials: { password: ‘your user password’ },
  data: {
    email: ‘your email’
  }
})))
```

You can also wrap the query in a UDF. Use [CreateFunction](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction?lang=javascript) to create a new UDF, providing a name, body, and role. Wrap [Query](https://docs.fauna.com/fauna/current/api/fql/functions/query?lang=javascript) and [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda?lang=javascript) statements around the function body. _Lambda_ allows you to specify parameters, and _Query_ defers the Lambda execution.

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

### Login

Now that you can create accounts, you need login functionality. When a user logs in, they receive access to their application data. In Fauna, you grant a user identity-based access by providing a token.

To implement refresh tokens, use [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create?lang=javascript) to generate a token document in the Tokens collection manually. When you create tokens manually, you have fine-grained control over these tokens.

```
Create(Tokens(), { 
  instance: ‘<account reference>’ }
)
```

For example, you can implement behavior similar to the built-in Login function as follows.

```
If(
  Identify(‘<account reference>’,’your user password’),
  Create(Tokens(), { instance:’<account reference>’, ‘293325523599229445’)}),
  Abort(‘The document was not found or provided password was incorrect.’)
)
```

**Note:** The rest of this implementation composes queries in the host language (JavaScript). Composition helps you manage the complexity of advanced queries. To learn more, review [this example application](https://docs.fauna.com/fauna/current/start/apps/fwitter.html).

For example, the following snippet creates a UDF but delegates the main logic to the _LoginAccount_ function defined elsewhere.

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

_LoginAccount_ is a JavaScript function that returns the rest of the FQL that forms the complete query. The only pure FQL functions in _LoginAccount_ are [If](https://docs.fauna.com/fauna/current/api/fql/functions/if?lang=javascript) and [And](https://docs.fauna.com/fauna/current/api/fql/functions/and?lang=javascript). The rest of this query consists of JavaScript functions that return more FQL. Use similar abstractions to compose queries that you can test independently. Once composed, the query runs as a single statement.

[\> fauna/src/login.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/login.js)

```javascript
export function LoginAccount(email, password, accessTtlSeconds, refreshTtlSeconds) {
  return If(
    And(
      VerifyAccountExists(email),
      IdentifyAccount(email, password)
    ),
    CreateTokensForAccount(email, password, accessTtlSeconds, refreshTtlSeconds),
    false
  )
}
```

To verify that an account exists, match the email to an [index](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/indexes/accounts-by-email.fql) and use [Exists](https://docs.fauna.com/fauna/current/api/fql/functions/exists?lang=javascript) to confirm that there is at least one result.

```javascript
function VerifyAccountExists(email) {
  return Exists(Match(Index(‘accounts_by_email’), email))
}
```

After verifying that the account exists, check the password with the [Identify](https://docs.fauna.com/fauna/current/api/fql/functions/identify?lang=javascript) function. Use the same index to retrieve the account, or extract account retrieval into a separate function for reusability.

```javascript
function IdentifyAccount(email, password) {
  return Identify(Select([‘ref’], GetAccountByEmail(email)), password)
}

function GetAccountByEmail(email) {
  return Get(Match(Index(‘accounts_by_email’), email))
}
```

The LoginAccount query uses both _VerifyAccountExists_ and _IdentifyAccount_ in one query. You might worry that the query searches the index twice, which would be inefficient. However, Fauna recognizes that these calls are equivalent and deduplicates them for you, so that you can focus on writing clean, reusable code.

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

You can find the implementation of that function in a separate [tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/tokens.js) file. The function uses [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let?lang=javascript) to organize the query, creates the refresh token with _CreateRefreshToken_, and binds it to the _refresh_ variable. It then passes on the reference of the refresh token to create the access token (CreateAccessToken). In the second parameter of the let, you can place a return value, here a JSON structure that returns both access and refresh token.

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

Access tokens have a default TTL of 10 minutes will have a type property set to _access_. Access tokens also reference the refresh token that created them, allowing you to retrieve them using an _index_.

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

### Access role

Your login function now returns access and refresh tokens. Next, you write a custom role to grant access your data, in this case, a collection named _dinos_.

[\> fauna/resources/collections/dinos.fql](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/collections/dinos.fql)

```
CreateCollection({ name: ‘dinos’ })
```

[\> fauna/resources/roles/loggedin.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/resources/roles/loggedin.js)

The following role provides privileges to all tokens linked to any account using Fauna’s built-in [membership](https://docs.fauna.com/fauna/current/security/abac.html) functionality.

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

Use a membership [predicate](https://docs.fauna.com/fauna/current/security/abac.html#predicates) to specify which tokens or accounts receive privileges. A role grants privileges to a token only if the FQL predicate evaluates to true. For example, you can write a predicate that verifies that an access token is used to execute a query.

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

```javascript
export function IsCalledWithAccessToken() {
  return Equals(Select([‘data’, ‘type’], Get(CurrentToken()), false), ‘access’)
}
```

The privileges in the following example provide read access to the ‘dinos’ collection.

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

Currently, the refresh token has no privileges. To call this function, you must define another role. This time the membership predicate verifies that the query is called with a refresh token.

The refresh role has a similar predicate but does not provide access to data. Instead, it receives one privilege to call the refresh function.

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

The _refresh_ function creates new access and refresh tokens. You can implement it by reusing the previously defined _CreateAccessAndRefreshToken_.

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

To remove all tokens linked to an instance, you can use the built-in [Logout](https://docs.fauna.com/fauna/current/api/fql/functions/logout?lang=javascript) function. When false is passed, use the custom functionality implemented by _LogoutAccessAndRefreshToken_.

```javascript
export function Logout (all) {
  return If(
    all,
    Logout(true),
    LogoutAccessAndRefreshToken()
  )
}
```

[\> fauna/src/tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-simple/fauna/src/tokens.js)

To log out one session, remove the refresh token and all access tokens minted by that refresh token. Since access tokens keep references to the refresh tokens that created them, you can retrieve all access tokens created by a refresh token using an index. You then paginate over these tokens deleting each one. Delete the refresh token itself with _Delete(CurrentToken())_, which is equivalent to _Logout(false)_.

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

The Fauna [simple refresh tokens blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple) provides an example implementation that you can learn from, customize or use in your application. In this post, you learned how to implement and use the blueprint.

For a more advanced refresh workflow, see [detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql) and the [accompanying blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-advanced).

Deploy this blueprint to your own Fauna database today by [following the instructions in the README](https://github.com/fauna-brecht/fauna-blueprints#set-up-a-blueprint). Share your thoughts in the [Fauna forums](https://forums.fauna.com/) and let us know which blueprints you would like to see next!

この投稿のシリーズの次のファイル
2021年5月5日 Detecting leaked authentication tokens in FQL.md

