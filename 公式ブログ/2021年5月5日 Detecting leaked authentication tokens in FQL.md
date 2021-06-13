# Detecting leaked authentication tokens in FQL

Brecht De Rooms|May 5th, 2021|

2021年5月5日

Categories:

[Authentication](https://fauna.com/blog?category=authentication)

## Introduction

前書き

The [previous post in this series](https://fauna.com/blog/refreshing-authentication-tokens-in-fql) showed you how to implement refresh tokens with a [simple blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple). 

このシリーズの前回の投稿では、簡単なブループリントを使用して更新トークンを実装する方法を示しました。

前回の投稿ファイル
2021年5月5日 Refreshing authentication tokens in FQL.md

This post shows you how to implement an [advanced refresh token](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-advanced) workflow in FQL. 

この投稿では、FQLで高度な更新トークンワークフローを実装する方法を示します。

The accompanying blueprint rotates refresh tokens and detects leaked tokens in pure FQL.

accompanying
添えている

rotates
循環

leaked tokens
？？？不明

付随するブループリントは、更新トークンを循環し、純粋なFQLでリークされたトークンを検出します。

User-defined functions (UDFs) are the key to this implementation. When you create a UDF, you encapsulate an FQL query and store it in the database. Encapsulating your logic in functions has [many advantages](https://docs.fauna.com/fauna/current/tutorials/basics/functions#why), including reusability. Once you load these functions into your database, your FQL queries can reuse the login, logout, refresh, and register logic.

ユーザー定義関数（UDF）は、この実装の鍵です。UDFを作成するときは、FQLクエリをカプセル化し、データベースに保存します。ロジックを関数にカプセル化することには、再利用性など、多くの利点があります。これらの関数をデータベースにロードすると、FQLクエリはログイン、ログアウト、更新、および登録ロジックを再利用できます。

Function    Description
login       Verifies credentials and provides refresh and access tokens
logout      Removes all the access tokens related to a given refresh token or account
refresh     Creates new access token
register    Creates a new account

ログインする	資格情報を確認し、更新トークンとアクセストークンを提供します
ログアウト	    特定の更新トークンまたはアカウントに関連するすべてのアクセストークンを削除します
リフレッシュ	新しいアクセストークンを作成します
登録	       新しいアカウントを作成します


This article assumes basic familiarity with FQL and an understanding of the simple refresh workflow blueprint. To learn more about FQL, visit this [series of articles](https://docs.fauna.com/fauna/current/tutorials/basics/).

assumes
前提

この記事は、FQLの基本的な知識と、単純な更新ワークフローの青写真を理解していることを前提としています。FQLの詳細については、この一連の記事にアクセスしてください。

## Deploying to your own account
自分のアカウントにデプロイする

The blueprint format allows you to set up or tear down the provided resources with the experimental [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate) tool. To deploy the blueprint to your own Fauna account, follow the [“Set up a blueprint” instructions](https://github.com/fauna-labs/fauna-blueprints#set-up-a-blueprint) in the repository README.

ブループリント形式では、実験的な動物相-スキーマ-移行ツールを使用して、提供されたリソースを設定または破棄できます。ブループリントを自分のFaunaアカウントに展開するには、リポジトリREADMEの「ブループリントの設定」の手順に従います。

## Implementation

The previous implementation refreshes only the access token and assumes the refresh token is securely stored. 

以前の実装では、アクセストークンのみが更新され、更新トークンが安全に保存されていることを前提としています。

However, if the refresh token is exposed, a pattern such as [Refresh token rotation](https://auth0.com/docs/tokens/refresh-tokens/refresh-token-rotation) forms an extra line of defense.

ただし、更新トークンが公開されている場合、更新トークンのローテーションなどのパターンは追加の防御線を形成します。


The login logic, register logic, and access roles are similar to the [previous implementation](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple). However, you verify, refresh, and remove tokens differently with the refresh token rotation pattern.

ログインロジック、レジスタロジック、およびアクセスロールは、前の実装と同様です。ただし、トークンの検証、更新、および削除は、更新トークンのローテーションパターンとは異なる方法で行います。

### Token verification

This blueprint implements the refresh logic in a separate ‘RefreshToken‘ function. The implementation does not invalidate refresh tokens by deleting them. Instead, it marks tokens as expired, logged out, or used, enabling detection of leaked tokens. Since a token’s presence does not guarantee that it’s still valid, the RefreshToken function first verifies the refresh token and then rotates the tokens.

このブループリントは、別の「RefreshToken」関数で更新ロジックを実装します。実装は、更新トークンを削除して無効にすることはありません。代わりに、トークンを期限切れ、ログアウト、または使用済みとしてマークし、リークされたトークンの検出を可能にします。トークンの存在はトークンがまだ有効であることを保証しないため、RefreshToken関数は最初に更新トークンを検証し、次にトークンをローテーションします。

[\> fauna/src/refresh.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-advanced/fauna/src/refresh.js)

```javascript
export function RefreshToken (...) {
  return VerifyRefreshToken(
    {
      tokens: RotateAccessAndRefreshToken(...),
      account: Get(CurrentIdentity())
    }, ‘refresh’)
}
```

#### Reuse detection
再利用の検出

The first step in token verification determines whether a refresh token has already been used. 

トークン検証の最初のステップでは、更新トークンがすでに使用されているかどうかを判断します。

Refresh tokens are rotated on use, so they should be used exactly once. 

更新トークンは使用時にローテーションされるため、1回だけ使用する必要があります。

A refresh request initiated with a used token can indicate that a malicious actor is using or has already used a leaked token.

使用済みトークンで開始された更新要求は、悪意のあるアクターがリークされたトークンを使用しているか、すでに使用していることを示している可能性があります。

```javascript
export function VerifyRefreshToken (fqlStatement, action) {
  ...
  If(And(IsTokenUsed(), ...)
  ...
}
```

If a user refreshes multiple browser tabs simultaneously, those tabs can send refresh requests using the same token. This can log out users who open your application in multiple tabs.

ユーザーが複数のブラウザタブを同時に更新する場合、それらのタブは同じトークンを使用して更新要求を送信できます。これにより、複数のタブでアプリケーションを開いたユーザーをログアウトできます。

To avoid this unexpected behavior, [make sure your client never sends simultaneous requests](https://medium.com/@noderaider/my-battle-with-browser-tabs-5c00ae8e3d2c). This implementation avoids the risk by implementing a grace period where a used refresh token is still accepted. The following snippet verifies whether the token has been used outside the grace period.

この予期しない動作を回避するには、クライアントが同時にリクエストを送信しないようにしてください。この実装は、使用済みの更新トークンが引き続き受け入れられる猶予期間を実装することにより、リスクを回避します。次のスニペットは、トークンが猶予期間外に使用されたかどうかを確認します。

```javascript
export function VerifyRefreshToken (fqlStatementOnSuccessfulVerification, action) {
  return If(
    And(IsTokenUsed(), Not(IsWithinGracePeriod())),
    ...,
    ...
  )
}
```

_IsTokenUsed_ uses [CurrentToken()](https://docs.fauna.com/fauna/current/api/fql/functions/currenttoken?lang=javascript) to determine whether the refresh token has been used. When a token is rotated, the value of ‘used’ is set to true.

IsTokenUsedは、CurrentToken（）を使用して、更新トークンが使用されているかどうかを判別します。トークンがローテーションされると、「used」の値がtrueに設定されます。

```javascript
export function IsTokenUsed () {
  return Select([‘data’, ‘used’], Get(CurrentToken()))
}
```

When you request a refresh, the current refresh token sets a future timestamp in the ‘gracePeriodUntil’ property. If you have used the token before, IsGracePeriodExpired verifies whether that usage took place before that timestamp.

更新を要求すると、現在の更新トークンが「gracePeriodUntil」プロパティに将来のタイムスタンプを設定します。以前にトークンを使用したことがある場合、IsGracePeriodExpiredは、その使用がそのタイムスタンプより前に行われたかどうかを確認します。

```javascript
function IsWithinGracePeriod () {
  return GT(Select([‘data’, ‘gracePeriodUntil’], Get(CurrentToken())), Now())
}
```

#### Token expiration

トークンの有効期限

This implementation does not rely on TTL, as it does not delete expired tokens. Keeping expired tokens allows you to understand how often users try to refresh with expired tokens and their age. Instead of relying on TTL, you add an expiration timestamp to the token upon creation. Add the following condition to _VerifyRefreshToken_ to determine whether the refresh token is still valid.

この実装は、期限切れのトークンを削除しないため、TTLに依存しません。期限切れのトークンを保持すると、ユーザーが期限切れのトークンで更新を試みる頻度とその経過時間を理解できます。TTLに依存する代わりに、作成時にトークンに有効期限のタイムスタンプを追加します。次の条件をVerifyRefreshTokenに追加して、更新トークンがまだ有効かどうかを判断します。

```javascript
export function VerifyRefreshToken (fqlStatementOnSuccessfulVerification, action) {
  return If(And(IsTokenUsed(), Not(IsWithinGracePeriod())),
    ...
    If(IsTokenStillValid(),
      ...,
      ...
    )
  )
}
```

#### Verification of logged out tokens

ログアウトしたトークンの検証

For the same reason, logging out tokens does not remove them, but marks them as logged out. The final condition verifies whether the token is logged out.

同じ理由で、トークンをログアウトしてもトークンは削除されませんが、ログアウト済みとしてマークされます。最後の条件は、トークンがログアウトされているかどうかを確認します。

```javascript
export function VerifyRefreshToken (fqlStatementOnSuccessfulVerification, action) {
  return If(And(IsTokenUsed(), Not(IsWithinGracePeriod())),
    ...,
    If(IsTokenStillValid(),
      If(Not(IsTokenLoggedOut()),
        ...,
        ...
      ),
      ...
    )
  )
}
```

#### Logging anomalies

ロギングの異常

Attempts to use expired or logged-out tokens require action to determine what has occurred. This implementation uses the _LogAnomaly_ function to log these events.

期限切れまたはログアウトしたトークンを使用するには、何が発生したかを判別するためのアクションが必要です。この実装では、LogAnomaly関数を使用してこれらのイベントをログに記録します。

```javascript
export function VerifyRefreshToken (fqlStatement, action) {
  return If(And(IsTokenUsed(), Not(IsWithinGracePeriod())),
    LogAnomaly(REFRESH_TOKEN_REUSE_ERROR, action),
    If(IsTokenStillValid(),
      If(Not(IsTokenLoggedOut()),
        fqlStatement,
        LogAnomaly(REFRESH_TOKEN_USED_AFTER_LOGOUT, action)
      ),
      LogAnomaly(REFRESH_TOKEN_EXPIRED, action)
    )
  )
}
```

_LogAnomaly_ writes the event to a separate ‘anomalies’ collection, provides some context, and returns the error. You can adapt the implementation of _LogAnomaly_ to take more restrictive action when token theft is detected, for example, locking the account.

LogAnomalyは、イベントを別の「異常」コレクションに書き込み、コンテキストを提供して、エラーを返します。LogAnomalyの実装を適応させて、トークンの盗難が検出されたときに、アカウントのロックなど、より制限的なアクションを実行できます。

[\> fauna/src/anomalies.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-advanced/fauna/src/anomalies.js)

```javascript
export function LogAnomaly (error, action) {
  return Do(
    Create(Collection(‘anomalies’), {
      data: {
        error: error,
        token: CurrentToken(),
        account: CurrentIdentity(),
        action: action
      }
    }),
    error
  )
}
```

### Refresh tokens

Once you verify the current refresh token, the next step is to provide new tokens. The implementation delegates this to RotateAccessAndRefreshToken.

現在の更新トークンを確認したら、次のステップは新しいトークンを提供することです。実装はこれをRotateAccessAndRefreshTokenに委任します。

[\> fauna/src/refresh.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-advanced/fauna/src/refresh.js)

```javascript
export function RefreshToken (...) {
  return VerifyRefreshToken(
    {
      tokens: RotateAccessAndRefreshToken(...),
      account: Get(CurrentIdentity())
    }, ‘refresh’)
}
```

The function invalidates the current refresh token and creates new access and refresh tokens.

この関数は、現在の更新トークンを無効にし、新しいアクセストークンと更新トークンを作成します。

[\> fauna/src/tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-advanced/fauna/src/tokens.js)

```javascript
export function RotateAccessAndRefreshToken (...) {
  return Do(
    InvalidateRefreshToken(...),
    CreateAccessAndRefreshToken(...)
  )
}
```

As before, invalidating the refresh token does not delete it. Instead, it updates the token to mark it as used and sets the grace period’s expiration time.

以前と同様に、更新トークンを無効にしても削除されません。代わりに、トークンを更新して使用済みとしてマークし、猶予期間の有効期限を設定します。

```javascript
export function InvalidateRefreshToken (refreshTokenRef) {
  return Update(refreshTokenRef, {
    data: {
      used: true,
      gracePeriodUntil: TimeAdd(Now(), GRACE_PERIOD_SECONDS, ‘seconds’)
    }
  })
}
```

Creating the access and refresh token with _CreateAccessAndRefreshToken_ does not change significantly from the [simple refresh tokens blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple).

CreateAccessAndRefreshTokenを使用してアクセストークンと更新トークンを作成しても、単純な更新トークンのブループリントから大幅に変更されることはありません。

```javascript
export function CreateAccessAndRefreshToken (instance, accessTtlSeconds, refreshTtlSeconds) {
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

How you create refresh tokens does change slightly, however. Several properties are added:

ただし、更新トークンの作成方法は少し異なります。いくつかのプロパティが追加されます。

-   **used**: a boolean that indicates whether the refresh token is used.
-   **sessionId**: a unique identifier that identifies all tokens from the same login session regardless of whether they are used, logged out, or no longer valid.
-   **validUntil**: the expiration time of the token (replaces TTL)
-   **loggedOut**: a boolean that indicates whether the token is invalidated due to a logout.

used：更新トークンが使用されているかどうかを示すブール値。
sessionId：使用されているか、ログアウトされているか、または無効になっているかに関係なく、同じログインセッションからのすべてのトークンを識別する一意の識別子。
validUntil：トークンの有効期限（TTLを置き換えます）
logsOut：ログアウトが原因でトークンが無効になっているかどうかを示すブール値。

Although _validUntil_ replaces the functionality of TTL, you can still configure TTL to prevent long-term accumulation and storage of tokens. Once a token’s TTL expires, you can no longer use it to detect whether it has leaked, so it makes little sense to keep them around forever.

がvalidUntilは、 TTLの機能を置き換え、あなたはまだトークンの長期的な蓄積貯蔵を防ぐためのconfigure TTLをすることができます。トークンのTTLが期限切れになると、トークンを使用してリークしたかどうかを検出できなくなるため、トークンを永久に保持することはほとんど意味がありません。

```javascript
export function CreateRefreshToken (...) {
  return Create(Tokens(), {
    instance: accountRef,
    data: {
      type: ‘refresh’,
      used: false,
      sessionId: CreateOrReuseId(),
      validUntil: TimeAdd(Now(), REFRESH_TOKEN_LIFETIME_SECONDS, ‘seconds’),
      loggedOut: false
    },
    ttl: TimeAdd(Now(), REFRESH_TOKEN_RECLAIMTIME_SECONDS, ‘seconds’)
  })
}
```

### Logout

Finally, the Logout functionality changes slightly, retrieving refresh tokens based on the session and whether they are logged out.

最後に、ログアウト機能がわずかに変更され、セッションとログアウトされているかどうかに基づいて更新トークンが取得されます。

[\> fauna/src/logout.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-advanced/fauna/src/refresh.js)

```javascript
export function Logout (all) {
  return VerifyRefreshToken(If(
    all,
    LogoutAll(),
    LogoutOne()
  ), ‘logout’)
}

// Logout the access and refresh token for the refresh token provided (which corresponds to one browser)
function LogoutOne () {
  return Let(
    {
      refreshTokens: Paginate(
        Match(
          Index(‘tokens_by_instance_sessionid_type_and_loggedout’),
          CurrentIdentity(), GetSessionId(), ‘refresh’, false
        ), { size: 100000 })
    },
    q.Map(Var(‘refreshTokens’), Lambda([‘token’], LogoutAccessAndRefreshToken(Var(‘token’))))
  )
}

// Logout all tokens for an accounts (which could be on different machines or different browsers)
function LogoutAll () {
  return Let(
    {
      refreshTokens: Paginate(
        Match(
          Index(‘tokens_by_instance_type_and_loggedout’),
          CurrentIdentity(), ‘refresh’, false),
        { size: 100000 }
      )
    },
    q.Map(Var(‘refreshTokens’), Lambda([‘token’], LogoutAccessAndRefreshToken(Var(‘token’))))
  )
}
```

Once you retrieve the refresh tokens, mark them as logged out by setting the ‘loggedOut’ attribute to true and delete the access tokens.

更新トークンを取得したら、「loggedOut」属性をtrueに設定してログアウトとしてマークし、アクセストークンを削除します。

[\> fauna/src/tokens.js](https://github.com/fauna-labs/fauna-blueprints/blob/main/official/auth/refresh-tokens-advanced/fauna/src/tokens.js)

```javascript
export function LogoutAccessAndRefreshToken (refreshTokenRef) {
  return Do(
    InvalidateAccessToken(refreshTokenRef),
    LogoutRefreshToken(refreshTokenRef)
  )
}

function LogoutRefreshToken (refreshTokenRef) {
  return Update(refreshTokenRef, { data: { loggedOut: true } })
}

function InvalidateAccessToken (refreshTokenRef) {
  return If(
    Exists(Match(Index(‘access_token_by_refresh_token’), refreshTokenRef)),
    Delete(Select([‘ref’], Get(Match(Index(‘access_token_by_refresh_token’), refreshTokenRef)))),
    false
  )
}
```

## Conclusion

結論

The Fauna [advanced refresh tokens blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced) provides an example implementation that you can learn from, customize or use in your own application. In this article, you learned how to implement an advanced refresh token workflow how it improves upon the [simple refresh tokens blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/master/official/auth/refresh-tokens-simple).

動物相の高度な更新トークンのブループリントは、独自のアプリケーションから学習、カスタマイズ、または使用できる実装例を提供します。この記事では、高度な更新トークンワークフローを実装する方法を学び、単純な更新トークンのブループリントをどのように改善するかを学びました。

To implement more common authentication tasks in FQL, see the [registration](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/register-login-logout), [password reset](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/password-reset), and [email verification](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/email-verification) blueprints.

FQLでより一般的な認証タスクを実装するには、登録、パスワードのリセット、および電子メール検証の青写真を参照してください。

Deploy this blueprint to your own Fauna database today by [following the instructions in the README](https://github.com/fauna-labs/fauna-blueprints#set-up-a-blueprint). Share your thoughts in the [Fauna forums](https://forums.fauna.com/) and let us know which blueprints you would like to see next!

READMEの指示に従って、このブループリントを自分の動物相データベースに今すぐ展開してください。動物相フォーラムであなたの考えを共有し、次に見たい青写真を教えてください！
