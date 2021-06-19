Authentication and authorization | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/basics/authentication

# Authentication and authorization

認証と認可

Welcome back, fellow space developer!

宇宙開発者の皆さん、お帰りなさい。

In the final part of the tutorial, we’re going to take a look at authentication and authorization in Fauna.

チュートリアルの最終回では、Faunaでの認証と認可についてご紹介します。

On this page:

このページでは

-   [Introduction](#introduction)
-   [About tokens, keys, and secrets](#auth_documents)
    -   [Secrets](#secrets)
    -   [Application keys](#keys)
-   [Introduction to roles and privileges](#access_control)
    -   [Custom roles and privileges](#custom_roles)
    -   [Server role](#role-server)
-   [Creating a server key](#server-key)
    -   [About client-side keys](#role-client)
-   [Basics of authentication](#basics)
    -   [Where to store the password?](#password_store)
    -   [Logging in](#login)
-   [Authentication in your application](#app_auth)
    -   [Logging out](#logout)
    -   [Advanced authentication](#advanced)
-   [Your first custom role](#custom_role)
    -   [Updating roles](#update_roles)
-   [Fine-grained privileges](#privileges)
-   [Fine-grained memberships](#memberships)
-   [Privileges for UDFs](#udf_privileges)
-   [Conclusion](#conclusion)

---

- [はじめに](#introduction)
- トークン、キー、シークレットについて](#auth_documents)
    - シークレット](#secrets)
    - アプリケーションキー](#keys)
- [ロールと権限の紹介](#access_control)
    - [カスタムロールと権限](#custom_roles)
    - [サーバーロール](#role-server)
- [サーバーキーの作成](#server-key)
    - [クライアント側の鍵について](#role-client)
- [認証の基本](#basics)
    - [パスワードをどこに保存するか](#password_store)
    - [ログイン](#login)
- [アプリケーションでの認証](#app_auth)
    - [ログアウト](#logout)
    - 高度な認証](#advanced)
- [最初のカスタムロール](#custom_role)
    - [ロールの更新](#update_roles)
- 細かな権限](#privileges)
- メンバーシップ](#memberships)
- [UDFの特権](#udf_privileges)
- 結論](#conclusion)

## [](#introduction)Introduction

はじめに

Authentication and authorization are commonly implemented in the application layer. Fauna follows a different approach by centralizing those right at the database.

認証と認可は一般的にアプリケーション層に実装される。Fauna はこれらをデータベースに集中させるという異なるアプローチをとっている。

This means that any piece of code can now become a client of your database without having to recreate authentication or authorization logic:

つまり、どのようなコードであっても、認証や認可のロジックを再構築することなく、データベースのクライアントになることができるのだ。

-   Mobile apps,
-   Server applications,
-   Cloud functions,
-   Microservices,
-   Frontend web apps,
-   Desktop apps,
-   etc.

---

- モバイルアプリケーション。
- サーバーアプリケーション。
- クラウド機能。
- Microservices
- フロントエンドのWebアプリ。
- デスクトップアプリ
- その他

Before we get to the code, let me introduce a couple of core concepts.

コードの説明に入る前に、いくつかの核となる概念を紹介します。

## [](#auth_documents)About tokens, keys, and secrets

トークン、キー、シークレットについて

Fauna is secure by default. To execute queries, you always need to pass a secret, which is associated either with an application key or an access token.

Fauna はデフォルトで安全です。クエリを実行するには、アプリケーションキーまたはアクセストークンに関連付けられたシークレットを渡す必要があります。

### [](#secrets)Secrets

シークレット

Whenever you instantiate a Fauna client in your application, you need to use a secret. A secret looks very much like a password:

アプリケーションで Fauna クライアントをインスタンス化する際には、必ずシークレットを使用する必要があります。シークレットはパスワードによく似ています。

```
fnADviINFNACBaG5LTgmxtf2fwpdqohworOfFGJ_
```

## [](#keys)Application keys

アプリケーションキー

Like their name implies, application keys are used by your applications. Each key has its own secret and can be used any number of times on multiple applications.

アプリケーションキーは、その名の通り、アプリケーションで使用されます。各キーは独自のシークレットを持ち、複数のアプリケーションで何度でも使用することができます。

You create keys manually using FQL, or via the [Fauna Dashboard](https://dashboard.fauna.com/). Keys do not expire until you manually delete them.

キーは、FQL を使って手動で作成するか、[Fauna Dashboard](https://dashboard.fauna.com/)で作成します。キーは、手動で削除するまで有効期限がありません。

## [](#tokens)Access tokens

アクセストークン

Tokens are somewhat similar to keys, but are used by users instead of applications. Tokens and their secrets are usually generated for you when you authenticate successfully with Fauna, so a single user could use multiple secrets in different devices simultaneously.

トークンは鍵と似ていますが、アプリケーションではなくユーザーが使用します。トークンとそのシークレットは、通常、Fauna での認証に成功したときに生成されるので、一人のユーザーが複数のデバイスで複数のシークレットを同時に使用することができます。

Tokens can be deleted manually, or when a user logs out. It’s also possible to define an optional time-to-live setting to determine how long a token is valid.

トークンは手動で削除することも、ユーザーがログアウトしたときに削除することもできます。また、トークンの有効期間を決めるために、オプションでtime-to-life設定を定義することもできます。

## [](#access_control)Introduction to roles and privileges

ロールと権限の紹介

Fauna features a fine-grained authorization system based on attributes, also known as ABAC (attribute-based access control).

Fauna では、ABAC (attribute-based access control) と呼ばれる、属性に基づいたきめ細かな認証システムを採用しています。

### [](#custom_roles)Custom roles and privileges

カスタムロールと特権

Roles grant privileges to keys and tokens to access resources in the database. The most important types of resources that you can grant access to are:

ロールは、データベース内のリソースにアクセスする権限をキーやトークンに付与します。アクセス権を付与できる最も重要なリソースの種類は次のとおりです。

-   Documents
-   Collections
-   Indexes
-   User-defined functions (UDFs in short)

---

- ドキュメント
- コレクション
- インデックス
- ユーザー定義関数（略してUDF）。

These privileges can range from "this role can read and delete any document of this collection" to more sophisticated behaviors such as "this role can modify this document if the logged in user is its author".

これらの権限は、「このロールは、このコレクションのすべてのドキュメントを読み取り、削除することができます」というものから、「ログインしているユーザーがそのドキュメントの作成者である場合、このロールはこのドキュメントを変更することができます」というような、より高度な動作まであります。

### [](#role-server)Server role

サーバーロール

All Fauna databases include a special server role that can access all of a database’s resources. Beware: if you’re using a key with this role, you should store its secret safely and never commit it to your Git repository.

すべてのFaunaデータベースには、データベースのすべてのリソースにアクセスできる特別なサーバーロールが用意されています。注意: このロールでキーを使用する場合は、そのシークレットを安全に保管し、Git リポジトリには絶対にコミットしないでください。

![The Keys screen in the Dashboard](https://docs.fauna.com/fauna/current/tutorials/basics/authentication../_images/screen-dashboard-keys.png)

## [](#server-key)Creating a server key

サーバーキーの作成

As explained before, if you’re accessing Fauna from a server-side environment, you need an application key and its secret.

前述の通り、サーバーサイド環境から Fauna にアクセスする場合、アプリケーションキーとそのシークレットが必要です。

The easiest way to create keys is from the security tab in the [Fauna Dashboard](https://dashboard.fauna.com/):

鍵を作成する最も簡単な方法は、[Fauna Dashboard](https://dashboard.fauna.com/)のセキュリティタブからです。

![The New Key screen in the Dashboard](https://docs.fauna.com/fauna/current/tutorials/basics/authentication../_images/screen-dashboard-new_key.png)

Select the `Server` role in the dropdown, which grants this key access to everything in the database, then click **Save**.

ドロップダウンで `Server` ロールを選択し、このキーにデータベース内のすべてのものへのアクセス権を与え、 **Save** をクリックします。

After creating your key, Fauna provides its secret, which you use in your code. Don’t forget to store it somewhere safe. It is never displayed again.

キーの作成後、Fauna はコードで使用するためのシークレットを提供します。このキーを安全な場所に保管することをお忘れなく。二度と表示されません。

![The Secret screen in the Dashboard](https://docs.fauna.com/fauna/current/tutorials/basics/authentication../_images/screen-dashboard-key_secret.png)

The secret included in the screenshot is no longer valid.

スクリーンショットに含まれるシークレットはもはや有効ではありません。

You can also create keys with FQL using the CreateKey function:

また、FQLではCreateKey関数を使って鍵を作成することができます。

shell

```shell
CreateKey({
  role: "server"
})
```

```json
{
  ref: Key("269237655682679301"),
  ts: 1593023887265000,
  role: "server",
  secret: "fnAD2jBXDQACCiJKYnAPmZtQE4ZxXwVerQ-B29jb",
  hashed_secret: "$2a$05$MPFpLVrMFV5Qszfe2lqwG.FvH.LvVeRyNoH4DQd4qbOiZ9N7uzk82"
}
```

### [](#role-client)About client-side keys

クライアント側のキーについて

If you’re accessing Fauna from a client-side environment (e.g., frontend web app), you should never use a key with a server role. Anyone would be able to read the key from your JavaScript code and gain full access to the database.

クライアントサイドの環境(フロントエンドのウェブアプリなど)から Fauna にアクセスする場合は、サーバーロールを持つキーを絶対に使用しないでください。誰でもあなたの JavaScript コードからキーを読み取り、データベースに完全にアクセスすることができてしまいます。

Again, don’t use server keys in your frontend web app.

繰り返しになりますが、フロントエンドのウェブアプリでサーバーキーを使用しないでください。

That said, it’s certainly possible to query Fauna directly from your frontend apps or mobile apps by creating keys with custom roles. Depending on the security features that you desire, you could go with a frontend-only approach and move the authentication flow server-side.

とはいえ、カスタムロールを持つキーを作成すれば、フロントエンドアプリやモバイルアプリから直接Faunaに問い合わせることは可能です。必要なセキュリティ機能に応じて、フロントエンドのみで認証フローをサーバーサイドに移す方法もあります。

For simplicity’s sake, from now on we’re just going to assume short-lived access tokens are generated server-side. These tokens could then be used from any type of application.

ここでは説明を簡単にするために、短命のアクセストークンがサーバーサイドで生成されるものと仮定します。これらのトークンは、どのタイプのアプリケーションからでも使用することができます。

## [](#basics)Basics of authentication

認証の基本

Let’s see how to solve one of the most common authentication scenarios: logging in a user with an email and a password.

最も一般的な認証シナリオのひとつである、電子メールとパスワードによるユーザーのログインを解決する方法を見てみましょう。

Before we get into the details, let’s create a new collection for our users:

詳細を説明する前に、ユーザー用の新しいコレクションを作成しましょう。

shell

```shell
CreateCollection({name: "SpaceUsers"})
```

### [](#password_store)Where to store the password?

パスワードをどこに保存するか?

You might be tempted to store a hashed password in the user document like you’ve probably done with other databases:

他のデータベースで行っているように、ハッシュ化したパスワードをユーザードキュメントに保存したいと思うかもしれません。

shell

```shell
Create(
  Collection("SpaceUsers"),
  {
    data: {
      email: "darth@empire.com",
      password: "$2y$12$XUxxWc.81aq4CKsV/..."
    }
  }
)
```

You could certainly do that if you wanted to roll your own authentication system, but Fauna already includes a better way which is easier to use and more secure.

独自の認証システムを構築したい場合はこのようにすることもできますが、Fauna にはより使いやすく、より安全な方法がすでに用意されています。

Ok, so where do we store the password, and how do we use it?

さて、ではパスワードはどこに保存して、どうやって使うのでしょうか？

I mentioned earlier that access tokens are used by users. The way to tell Fauna that an entity (such as a user document) "has a password" is by adding a credentials object to the metadata of a document.

先ほど、アクセストークンはユーザーが使うものだと言いました。あるエンティティ（ユーザードキュメントなど）が「パスワードを持っている」ことをFaunaに伝えるには、ドキュメントのメタデータに資格情報オブジェクトを追加します。

With this in mind, let’s create our first user:

これを念頭に置いて、最初のユーザーを作ってみましょう。

shell

```shell
Create(
  Collection("SpaceUsers"),
  {
    data: {
      email: "darth@empire.com"
    },
    credentials: {
      password: "iamyourfather"
    }
  }
)
```

```json
{
  ref: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ts: 1592960287940000,
  data: {
    email: "darth@empire.com"
  }
}
```

As you can see, the credentials object is not part of the document’s data and it’s never returned when accessing the document. Because of that, you won’t be able to expose the hashed credentials by mistake.

ご覧のように、クレデンシャルオブジェクトはドキュメントのデータの一部ではなく、ドキュメントへのアクセス時に返されることはありません。そのため、誤ってハッシュ化されたクレデンシャルを公開することはありません。

It really doesn’t matter where these credentials are stored. All the encryption and verification of passwords is solved for you when using Fauna’s authentication system.

これらの認証情報がどこに保存されているかは本当に重要ではありません。Fauna の認証システムを使用すれば、パスワードの暗号化や検証はすべて解決します。

### [](#login)Logging in

ログインする

Since credentials are associated with documents, we need to find a user’s document in the `SpaceUsers` collection to be able to log them in.

認証情報はドキュメントに関連付けられているので、ログインするためには、`SpaceUsers`コレクションからユーザーのドキュメントを見つける必要があります。

Let’s create an index to do just that, and make sure there can only be one user for each email address by setting unique to true:

そのためのインデックスを作成し、uniqueをtrueに設定して各メールアドレスに1人のユーザーしか存在しないようにしましょう。

shell

```shell
CreateIndex({
  name: "SpaceUsers_by_email",
  source: Collection("SpaceUsers"),
  terms: [{field: ["data", "email"]}],
  unique: true
})
```

Now, we can use the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function in combination with the `SpaceUsers_by_email` index.

これで、[`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)関数と`SpaceUsers_by_email`インデックスを組み合わせて使えるようになりました。

shell

```shell
Login(
  Match(Index("SpaceUsers_by_email"), "darth@empire.com"),
  {
    password: "iamyourfather",
    ttl: TimeAdd(Now(), 3, 'hour')
  }
)
```

```json
{
  ref: Ref(Ref("tokens"), "269770764488540678"),
  ts: 1593532299503000,
  ttl: Time("2020-06-30T18:51:39.033543Z"),
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  secret: "fnEDvQsUvCaCBgOyQyF10AITzhwm2fkyWe7m8Qwz15CFnu1sGQ9"
}
```

The `Login` function first takes a reference to a document or a set produced by the [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function. Its second argument is an object with the password and an optional time-to-live.

`Login`関数はまず、[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)関数によって生成されたドキュメントやセットへの参照を受け取ります。2番目の引数は、パスワードを含むオブジェクトと、オプションで余命時間を指定します。

If everything is okay, a new access token is created and returned to us with a secret that we can use in our application.

問題がなければ、新しいアクセストークンが作成され、アプリケーションで使用できるシークレットとともに返されます。

Obviously, if the credentials are wrong, Fauna returns an error:

当然のことながら、認証情報が間違っている場合は、Fauna はエラーを返します。

shell

```shell
Login(
  Match(Index("SpaceUsers_by_email"), "darth@empire.com"),
  {password: "darksidemaster"}
)
```

```json
error: authentication failed
The document was not found or provided password was incorrect.
```

## [](#app_auth)Authentication in your application

当然のことながら、認証情報が間違っている場合は、Fauna はエラーを返します。

Let’s see how we’d actually authenticate our users in a server-side JavaScript application. The approach should be very similar if you’re using Fauna with other programming languages.

それでは、サーバーサイドのJavaScriptアプリケーションで、実際にどのようにユーザーを認証するかを見てみましょう。他のプログラミング言語で Fauna を使用している場合でも、アプローチは非常に似ています。

First, we’d need to import Fauna’s driver and define a couple of constants:

まず、Fauna のドライバをインポートし、いくつかの定数を定義する必要があります。

javascript

```javascript
const faunadb = require('faunadb');
const q = faunadb.query;
const SERVER_SECRET = "BQOyQyF20AITt7nMIqW1XzW...";
```

We’re hard-coding the secret here for simplicity’s sake. Even in a server-side project, you should get the secret from an environment config and avoid committing it to Git with your code.

ここでは、単純化のためにシークレットをハードコーディングしています。サーバーサイドのプロジェクトであっても、シークレットは環境設定から取得し、コードと一緒に Git にコミットしないようにしましょう。

Then, we instantiate our client using the secret from our server key:

次に、サーバーキーのシークレットを使ってクライアントのインスタンスを作成します。

javascript

```javascript
const client = new faunadb.Client({
  secret: SERVER_SECRET
});
```

Finally, here’s an example of an authentication function:

最後に、認証機能の例をご紹介します。

javascript

```javascript
async function authenticate (email, password) {
  return await client.query(
    q.Login(
      q.Match(q.Index('SpaceUsers_by_email'), email),
      {password: password}
    )
  );
}
```

After a successful login, we receive an access token document with its secret, like we saw previously:

ログインに成功すると、先ほどのようにアクセストークンのドキュメントとそのシークレットを受け取ります。

```json
{
  ref: Ref(Ref("tokens"), "269174603208720901"),
  ts: 1592963755720000,
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  secret: "fnEDvezg4tACBqOyQyF2QAiTt2nMIqW5XzWcQykZiZx59Wyvm8e"
}
```

Now that we have a token for our user, we should be using its secret for any subsequent queries to Fauna on behalf of our user.

ユーザー用のトークンができたので、ユーザーに代わって Fauna に問い合わせるときにはそのシークレットを使用する必要があります。

You have many options for storing the secret. Here are some examples:

シークレットを保存するには、さまざまなオプションがあります。以下にいくつかの例を示します。

-   Pure client-side: If you intend on accessing Fauna client-side, you could send the secret back to the client and store it in memory.

- 純粋なクライアントサイド：クライアントサイドで Fauna にアクセスする場合は、シークレットをクライアントに送り返してメモリに保存します。

-   Partial backend with cookie: If you’re working on a server API, you could store the secret in a session and send it back to the client using a secure cookie.

- クッキーを使った部分的なバックエンド。サーバーAPIで作業している場合、セッションに秘密を保存し、安全なクッキーを使ってクライアントに送り返すことができます。

-   Partial backend with httpOnly cookie: You could also combine the above two approaches by creating two types of tokens in Fauna. One that could be used as a refresh token and stored in an httpOnly cookie, and another short-lived one that could be used and stored in the frontend.

- httpOnlyクッキーによるパーシャルバックエンド。Faunaで2種類のトークンを作成することで、上記の2つのアプローチを組み合わせることもできる。ひとつはリフレッシュトークンとして使われ、httpOnlyクッキーに保存されるもの、もうひとつはフロントエンドで使われ保存される短命のものです。

-   Full blown backend: You could also decide that you never want your clients receiving the secret and store the session in some cache and send back just a session ID.

- 本格的なバックエンド。また、クライアントには秘密を知らせないようにして、セッションをキャッシュに保存し、セッションIDだけを送り返すこともできます。

These examples have very different security implications which are far too vast and complex to discuss in this introductory tutorial. You have to decide carefully how you want to manage secrets for your particular use case.

これらの例では、セキュリティ上の意味合いが大きく異なり、この入門チュートリアルで説明するには膨大で複雑です。これらの例では、セキュリティ上の意味合いが大きく異なります。

### [](#logout)Logging out

ログアウト

To log out, we use the [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function, which destroys the token that we created when logging in.

ログアウトするには、[`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)関数を使用します。この関数は、ログイン時に作成したトークンを破棄します。

This could be our logout function:

これがログアウト機能になります。

javascript

```javascript
async function logout (deleteAllTokens = false) {
  return await client.query(q.Logout(deleteAllTokens));
}
```

We don’t need to pass any reference to the token, since we instantiated the client with a token’s secret.

トークンのシークレットを使ってクライアントをインスタンス化しているので、トークンへの参照を渡す必要はありません。

`Logout` takes a single boolean parameter to determine if all of the tokens associated with a user should be deleted, or only the one being used with the current secret. If we had used `q.Logout(true)`, our user Darth would now be logged out from all his devices. Take that, evil Sith Lord!

`Logout` は 1 つのブール型パラメータを取り、ユーザーに関連付けられたすべてのトークンを削除するか、現在のシークレットで使用されているトークンのみを削除するかを決定します。もしも `q.Logout(true)` を使っていたら、ユーザーである Darth はすべてのデバイスからログアウトされてしまいます。邪悪なシス卿よ、これでどうだ!

Also note that `Logout` is actually a convenience function. You could also delete tokens manually with a reference to the token’s document:

また、`Logout` は実際には便利な関数であることに注意してください。トークンのドキュメントを参照して、トークンを手動で削除することもできます。

shell

```shell
Delete(Ref(Ref("tokens"), "269174603208720901"))
```

## [](#advanced)Advanced authentication

高度な認証

You can keep using Fauna’s authentication system even for custom scenarios without having to roll your own system from scratch.

Fauna の認証システムは、ゼロから独自のシステムを構築することなく、カスタムシナリオでも使用することができます。

For example, you can create your own tokens with:

たとえば、独自のトークンを作成するには、次のようにします。

shell

```shell
Create(Tokens(), {
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  // NOTE: be sure to use the correct document ID here
  ttl: TimeAdd(Now(), 3, 'hour')
})
```

```json
{
  ref: Ref(Ref("tokens"), "269776756060193286"),
  ts: 1593538013760000,
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ttl: Time("2020-06-30T20:26:53.134950Z"),
  secret: "fnEdvqCHWaACbg3yQ4F20aITOP_50s0uzQdXKZt6eEdMhZ48Bxw"
}
```

And, then, use these other FQL functions to customize your authentication logic:

そして、これらの他のFQL関数を使って、認証ロジックをカスタマイズしていきます。

-   The [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify) function checks whether a password is valid against a document’s credentials.

- [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify) 関数は、ドキュメントの認証情報に対して、パスワードが有効かどうかをチェックします。

-   The [`HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity) function checks whether the current Fauna token is associated with a document or not.

- [`HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity)関数は、現在のFaunaトークンがドキュメントに関連付けられているかどうかをチェックします。

## [](#custom_role)Your first custom role

あなたの最初のカスタムロール

Our users can now log in, but they can’t access any resource in our database. We need to create a role to give them access to collections, indexes, etc.

ユーザーはログインできるようになりましたが、データベースのどのリソースにもアクセスできません。ユーザーがコレクションやインデックスなどにアクセスできるようにするためには、ロールを作成する必要があります。

Keep in mind that you can also manage roles from the dashboard. If you go to the security tab and click on Roles, you’ll find the roles section:

ダッシュボードからもロールを管理できることを覚えておいてください。セキュリティ」タブで「ロール」をクリックすると、「ロール」セクションが表示されます。

![The Roles screen in the Dashboard](https://docs.fauna.com/fauna/current/tutorials/basics/authentication../_images/screen-dashboard-roles.png)

Let’s start with something simple and create a `User` role with a single privilege:

まずはシンプルに、1つの権限を持つ`User`ロールを作成してみましょう。

shell

```shell
CreateRole({
  name: "User",
  membership: {
    resource: Collection("SpaceUsers")
  },
  privileges: [
    {resource: Collection("Spaceships"), actions: {read: true}}
  ]
})
```

The `SpaceUsers` collection is now a member of the `User` role. Any token associated with a document from that collection inherits the role’s privileges, including previously-created tokens.

SpaceUsers`コレクションが`User`ロールのメンバーになりました。そのコレクションのドキュメントに関連付けられたトークンは、以前に作成されたトークンも含めて、そのロールの権限を継承します。

We’ve also granted a single read-only privilege on any document from the Spaceships collection. For more information on privileges, see [Privileges](https://docs.fauna.com/fauna/current/security/abac#privileges).

また、「Spaceships」コレクションのすべてのドキュメントに対して、1つの読み取り専用の特権を付与しました。特権の詳細については、[特権](https://docs.fauna.com/fauna/current/security/abac#privileges)を参照してください。

Darth is now be able to retrieve any Spaceships document, but he won’t be able to create new documents in that collection or modify existing ones.

ダースは、Spaceshipsのあらゆるドキュメントを取得できるようになりましたが、そのコレクションに新しいドキュメントを作成したり、既存のドキュメントを変更したりすることはできません。

He won’t be able to use any indexes either, but he can use the [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) function to retrieve a specific spaceship document and also list all spaceship documents using the [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function that we saw in previous sections of this tutorial:

インデックスも使えませんが、[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)関数を使って特定のスペースシップドキュメントを取得したり、このチュートリアルの前のセクションで紹介した[`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents)関数を使ってすべてのスペースシップドキュメントをリストアップすることができます。

shell

```shell
Map(
  Paginate(Documents(Collection("Spaceships"))),
  Lambda("ref", Get(Var("ref")))
)
```

### [](#update_roles)Updating roles

ロールを更新する

Let’s update the role with another privilege by using the [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update) function. Remember that we need to pass all privileges, including the ones we had previously set, because `Update` replaces the entire array.

それでは、[`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)関数を使って、別の権限を持つロールを更新してみましょう。なお、`Update`は配列全体を置き換えるので、以前に設定したものも含めて、すべての権限を渡す必要があることを覚えておいてください。

shell

```shell
Update(
  Role("User"),
  {
    privileges: [
      { resource: Collection("Spaceships"), actions: { read: true } },
      { resource: Collection("Planets"), actions: { read: true } }
    ]
  }
)
```

Existing keys and tokens belonging to a role are affected by the updated privileges.

ロールに属する既存のキーやトークンは、更新された特権の影響を受けます。

## [](#privileges)Fine-grained privileges

きめ細かな権限の設定

It’s also possible to create custom behaviors for privileges instead of simply using `true` or `false`.

単純に `true` や `false` を使用するのではなく、特権に対してカスタムの動作を作成することも可能です。

For example, we might want Darth to be able to access his own `SpaceUsers` document, but we certainly don’t want him poking around all of the users' documents to obtain their email addresses and spam them to join his empire.

例えば、ダースが自分の`SpaceUsers`ドキュメントにアクセスできるようにしたいとします。しかし、ダースがすべてのユーザーのドキュメントを詮索してメールアドレスを取得し、スパムを送って自分の帝国に参加させるようなことは絶対にしたくありません。

We do that by using a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function to define any type of behavior we might need:

そのためには、[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数を使って、必要となるあらゆる種類の動作を定義します。

shell

```shell
Update(
  Role("User"),
  {
    privileges: [
      { resource: Collection("Spaceships"), actions: { read: true } },
      { resource: Collection("Planets"), actions: { read: true } },
      {
        resource: Collection("SpaceUsers"),
        actions: {
          read: Query(
            Lambda("ref",
              Equals(
                Identity(),
                Var("ref")
              )
            )
          )
        }
      }
    ]
  }
)
```

In this case, we’ve used this `Lambda` function on the read action for the `SpaceUsers` collection:

この例では、`SpaceUsers`コレクションの読み取りアクションで、この`Lambda`関数を使用しています。

shell

```shell
Query(
  Lambda("ref",
    Equals(
      Identity(),
      Var("ref")
    )
  )
)
```

-   We need to use the [`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query) function because we don’t want the `Lambda` function to execute when we’re only updating the role itself.

- ロール自体を更新しているだけなのに、`Lambda`関数を実行させたくないので、[`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)関数を使用する必要があります。

-   Whenever a `SpaceUsers` document is accessed, Fauna triggers the `Lambda` and passes a reference of the document that it’s checking. Access is granted only if the `Lambda` returns `true`.

- `SpaceUsers` ドキュメントにアクセスするたびに、Fauna は `Lambda` をトリガーして、チェックしているドキュメントの参照を渡します。アクセスは `Lambda` が `true` を返した場合にのみ許可されます。

-   The [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) returns a reference to the document associated with the current token in use. In our example, it would return the document in the `SpaceUsers` collection for the current, logged in user.

- [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity)は、現在使用しているトークンに関連するドキュメントへの参照を返します。この例では、`SpaceUsers`コレクションの中の、現在ログインしているユーザのドキュメントを返します。

-   The [`Equals`](https://docs.fauna.com/fauna/current/api/fql/functions/equals) function returns `true` or `false` when comparing the reference returned by `Identity` to the reference of the document that we’re trying to read.

- [`Equals`](https://docs.fauna.com/fauna/current/api/fql/functions/equals)関数は、`Identity`が返した参照と、読み取ろうとしているドキュメントの参照を比較して、`true`または`false`を返します。

In plain English: "if the document in the `SpaceUsers` collection is the same as the document we’ve logged in with, return `true`, otherwise return \`false\`".

わかりやすく言うと "簡単に言うと、「`SpaceUsers`コレクション内のドキュメントが、ログインしたドキュメントと同じであればtrueを返し、そうでなければfalseを返す」ということです。

To test this, let’s create a new user:

これをテストするために、新しいユーザーを作ってみましょう。

shell

```shell
Create(
  Collection("SpaceUsers"),
  {
    data: {
      email: "yoda@jedi.com"
    },
    credentials: {
      password: "thereisnotry"
    }
  }
)
```

```json
{
  ref: Ref(Collection("SpaceUsers"), "269412903498547719"),
  ts: 1593191016630000,
  data: {
    email: "yoda@jedi.com"
  }
}
```

So now, if we try to access Yoda’s document using Darth’s token in our application, we get an error:

これで、アプリケーションでDarthのトークンを使ってYodaのドキュメントにアクセスしようとすると、エラーが発生します。

javascript

```javascript
try {
  const result = await client.query(
    q.Get(q.Ref(q.Collection("SpaceUsers"), "269412903498547719"))
  )
} catch (error) {
  console.log(error);
}
```

```json
[PermissionDenied: permission denied] {
  name: 'PermissionDenied',
  message: 'permission denied',
  description: 'Insufficient privileges to perform the action.',
 ...
```

But it works fine if we try to access Darth’s document:

しかし、Darthのドキュメントにアクセスしようとすると、正常に動作します。

javascript

```javascript
q.Get(q.Ref(q.Collection("SpaceUsers"), "269170966886613509"))
```

```json
{
  ref: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ts: 1592960287940000,
  data: { email: 'darth@empire.com' }
}
```

## [](#memberships)Fine-grained memberships

きめ細かなメンバシップ

Just as we can use the [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function to define custom behaviors to check whether a role can do something, we can also create fine-grained memberships and determine which documents in a collection are members of a role.

[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数を使って、ロールが何かをできるかどうかをチェックするカスタムビヘイビアを定義できるように、きめ細かなメンバーシップを作成して、コレクション内のどのドキュメントがロールのメンバーであるかを判断することもできます。

Let’s create a new user to test this:

これをテストするために、新しいユーザを作ってみましょう。

shell

```shell
Create(
  Collection("SpaceUsers"),
  {
    data: {
      email: "han@solo.com",
      isPilot: true
    },
    credentials: {
      password: "dontgetcocky"
    }
  }
)
```

```json
{
  ref: Ref(Collection("SpaceUsers"), "269417695003279879"),
  ts: 1593195586136000,
  data: {
    email: "han@solo.com",
    isPilot: true
  }
}
```

Now, let’s create a new `Pilot` role that only grant permissions to users with the `isPilot` property. We do that by adding a predicate function to the membership object:

次に、`isPilot` プロパティを持つユーザにのみパーミッションを付与する新しい `Pilot` ロールを作成してみましょう。このロールを作成するには、メンバーシップ・オブジェクトに述語関数を追加します。

shell

```shell
CreateRole({
  name: "Pilot",
  membership: {
    resource: Collection("SpaceUsers"),
    predicate:
      Query(
        Lambda(
          "ref",
          Select(["data","isPilot"], Get(Var("ref")), false)
        )
      )
  },
  privileges: [
    {resource: Collection("Spaceships"), actions: {create: true}}
  ]
})
```

We’ve added a privilege that simply allows creating documents in the `Spaceships` collection.

単純に`Spaceships`コレクションにドキュメントを作成することを許可する権限を追加しました。

Let’s look at the membership predicate function:

メンバーシップ述語関数を見てみましょう。

shell

```shell
Query(
  Lambda(
    "ref",
    Select(
      ["data","isPilot"],
      Get(Var("ref")),
      false
    )
  )
)
```

-   The [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function receives a reference to a document and returns whatever the [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function returns.

- [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数は、ドキュメントへの参照を受け取り、[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数が返す値をそのまま返します。

-   The [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function returns the value of `isPilot` from the document. If the path `["data","isPilot"]` doesn’t exist in the document, it returns `false`.

- [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数は、ドキュメントから `isPilot` の値を返します。パス `["data", "isPilot"]` がドキュメント内に存在しない場合は `false` を返します。

In plain English: "if the document in the `SpaceUsers` collection contains the `isPilot` field, and it is set to `true`, the logged-in user can create documents in the `SpaceShips` collection".

わかりやすく言うと "SpaceUsers`コレクションのドキュメントに`isPilot`フィールドが含まれていて、それが`true`に設定されていれば、ログインしたユーザーは`SpaceShips`コレクションのドキュメントを作成することができる」ということになります。

As expected, if we try to create a new ship with Darth’s token, we receive an error because the `User` role doesn’t have that privilege:

予想通り、Darthのトークンで新しい船を作成しようとすると、`User`ロールにはその権限がないため、エラーが発生します。

javascript

```javascript
try {
  const result = await client.query(
    q.Create(
      q.Collection("Spaceships"),
      {
        data: {
          name: "Imperial Destroyer"
        }
      }
    )
  )
  console.log(result);
} catch (error) {
  console.log(error);
}
```

```json
[PermissionDenied: permission denied] {
  name: 'PermissionDenied',
  message: 'permission denied',
  description: 'Insufficient privileges to perform the action.',
  ...
```

But if we do it with Han’s token instead:

しかし、代わりにハンのトークンで行うと

javascript

```javascript
const result = await client.query(
  q.Create(
    q.Collection("Spaceships"),
    {
      data: {
        name: "Millennium Falcon"
      }
    }
  )
)
```

```json
{
  ref: Ref(Collection("Spaceships"), "269419218694308358"),
  ts: 1593197039260000,
  data: { name: 'Millennium Falcon' }
}
```

## [](#udf_privileges)Privileges for UDFs

UDFの特権

We can grant privileges for UDFs, just as we can on collections and indexes.

コレクションやインデックスと同じように、UDFにも特権を与えることができます。

Let’s create a simple function that opens the hatch of a spaceship and also writes an entry to the log:

宇宙船のハッチを開けて、ログにエントリを書き込む簡単な関数を作ってみましょう。

shell

```shell
CreateFunction({
  name: "OpenHatch",
  body: Query(
    Lambda("shipRef",
      Do(
        Update(
          Var("shipRef"),
          Let({
            shipDoc: Get(Var("shipRef")),
          }, {
            data:{
              hatchIsOpen: true
            }
          })
        ),
        Create(
          Collection("ShipLogs"),
          {
            data: {
              spaceshipRef: Var("shipRef"),
              status: "HATCH_OPENED",
              pilotRef: Identity()
            }
          }
        ),
        "Hatch open!"
      )
    )
  )
})
```

This function:

この関数は

-   receives a reference to a ship,
-   modifies the ship’s document and set `hatchIsOpen` to `true`,
-   creates a new document in the `ShipLogs` collection,
-   returns "Hatch open!" at the end.

---

- 船への参照を受け取る。
- 船のドキュメントを変更し、`hatchIsOpen` を `true` に設定します。
- ShipLogs`コレクションに新しいドキュメントを作成します。
- 最後に "Hatch open!" を返します。

If this function is unclear, I recommend going back to part 4 where we go through functions and transactions.

この関数がよくわからない場合は、関数とトランザクションについて説明しているパート4に戻ることをお勧めします。

We’d call this function by simply passing a reference of the spaceship:

スペースシップのリファレンスを渡すだけで、この関数を呼び出すことができます。

shell

```shell
Call(
  Function("OpenHatch"),
  Ref(Collection("Spaceships"), "266356873589948946")
)
```

Now, let’s update the privileges to our Pilot role:

それでは、Pilotロールに権限を更新してみましょう。

shell

```shell
Update(Role("Pilot"), {
  privileges: [
    {
      resource: Collection("Spaceships"),
      actions: {create: true, write: true}
    },
    { resource: Collection("ShipLogs"), actions: {create: true} },
    { resource: Function("OpenHatch"), actions: {call: true} }
  ]
})
```

Other than granting our pilots the privilege to call the `OpenHatch` function, we’re also granting privileges to the resources that the function needs to execute.

パイロットに `OpenHatch` 関数を呼び出す権限を与えるだけでなく、関数の実行に必要なリソースにも権限を与えています。

The problem is that by setting the `call` privilege to `true`, any pilot would be able to open any hatch of any ship. They could open the hatch of another spaceship by mistake while warping through a wormhole and break the space-time continuum!

問題は、`call`権限を`true`に設定することで、どんなパイロットでも、どんな船のどんなハッチでも開けることができるということです。ワームホールを通ってワープしているときに、誤って他の宇宙船のハッチを開けてしまい、時空連続体を壊してしまうかもしれません。

That’s not good. Let’s make sure pilots can only open the hatch of their own ships.

それはよくないですね。そこで、パイロットは自分の船のハッチしか開けられないようにしよう。

First, let’s assign Han to his spaceship:

まず、ハンを自分の宇宙船に割り当てよう。

shell

```shell
Update(
  Ref(Collection("Spaceships"), "269419218694308358"),
  {
    data: {
      pilotRef: Ref(Collection("SpaceUsers"), "269417695003279879")
    }
  }
)
```

Now, let’s update our role so that Han can only warp his own ship.

では、ハンが自分の船しかワープできないように、役割を更新してみましょう。

shell

```shell
Update(Role("Pilot"), {
  privileges: [
    {
      resource: Collection("Spaceships"),
      actions: {create: true, write: true}
    },
    { resource: Collection("ShipLogs"), actions: {create: true} },
    {
      resource: Function("OpenHatch"),
      actions: {
        call: Query(
          Lambda(
            "shipRef",
            Let(
              {
                shipDoc: Get(Var("shipRef")),
                pilotRef: Select(["data","pilotRef"], Var("shipDoc"), null)
              },
              Equals(Identity(), Var("pilotRef"))
            )
          )
        )
      }
    }
  ]
})
```

This is our `Lambda` function:

これが私たちの`Lambda`関数です。

shell

```shell
Lambda(
  "shipRef",
  Let(
    {
      shipDoc: Get(Var("shipRef")),
      pilotRef: Select(["data","pilotRef"], Var("shipDoc"), null)
    },
    Equals(Identity(), Var("pilotRef"))
  )
)
```

This `Lambda` function is going to receive the same arguments that we are using to call the function. So, we just need to get the spaceship document and check whether the logged-in user is the same as the pilot.

この`Lambda`関数は、関数を呼び出すのに使っているのと同じ引数を受け取ることになります。つまり、スペースシップのドキュメントを取得して、ログインしたユーザーがパイロットと同じかどうかをチェックすればいいのです。

If we test this using Han’s token on the Falcon:

ファルコン号のハンのトークンを使ってテストしてみると

javascript

```javascript
const result = await client.query(
  q.Call(
    q.Function("OpenHatch"),
    q.Ref(q.Collection("Spaceships"), "269419218694308358")
  )
)
console.log(result);
```

```json
Hatch open!
```

As expected, a document was created in the logs with the proper references:

予想通り、ログには適切な参照先が記載されたドキュメントが作成された。

```json
{
  "ref": Ref(Collection("ShipLogs"), "269686129668653575"),
  "ts": 1593451585430000,
  "data": {
    "spaceshipRef": Ref(Collection("Spaceships"), "269419218694308358"),
    "status": "HATCH_OPENED",
    "pilotRef": Ref(Collection("SpaceUsers"), "269417695003279879")
  }
}
```

If we try to call the same function with a different ship reference, we receive an error:

同じ関数を異なるシップリファレンスで呼ぼうとすると、エラーが発生する。

javascript

```javascript
try {
  const result = await client.query(
    q.Call(
      q.Function("OpenHatch"),
      q.Ref(q.Collection("Spaceships"), "266356873589948946")
    )
  )
} catch (error) {
  console.log(error);
}
```

```json
[PermissionDenied: permission denied] {
  name: 'PermissionDenied',
  message: 'permission denied',
  description: 'Insufficient privileges to perform the action.',
...
```

## [](#conclusion)Conclusion

結論

With this part, we’ve finally reached the end of the tutorial. What an adventure! We’ve traveled through the galaxy, worked with famous pilots, created spaceships, fed futuristic holographic UIs with data… and hopefully, also learned some FQL along the way!

このパートで、ついにチュートリアルの終わりを迎えました。何という冒険でしょう。銀河系を旅し、有名なパイロットと仕事をし、宇宙船を作り、未来的なホログラフィックのUIにデータを送り......そして願わくば、その過程でFQLも学んでいただきたいと思います。

We’ve gone through many common scenarios and problems, but if you ever get stuck you can always get help from the [community in the Fauna forums](https://community.fauna.com/).

ここでは、よくあるシナリオや問題点を説明しましたが、もし行き詰まったときは、[Faunaフォーラムのコミュニティ](https://community.fauna.com/)でいつでも助けを求めることができます。

