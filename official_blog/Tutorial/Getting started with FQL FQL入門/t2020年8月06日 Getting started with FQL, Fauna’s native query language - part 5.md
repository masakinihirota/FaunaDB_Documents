Getting started with FQL, Fauna’s native query language - part 5
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5



# Getting started with FQL, Fauna’s native query language - part 5

動物相のネイティブクエリ言語であるFQLの使用を開始する-パート5

Pier Bover|Aug 6th, 2020|

2020年8月6日

Categories:



[Tutorial](https://fauna.com/blog?category=tutorial)



Welcome back, fellow space developer!

ようこそ、仲間の宇宙開発者！

-   [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
-   [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
-   [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
-   [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
-   Part 5: a look at authentication and authorization in Fauna

パート1：FQLと基本的な動物相の概念を見る
パート2：動物相を使ったインデックスの詳細
パート3：動物相を使用したデータのモデリングの原則の調査
パート4：動物相で直接実行されるカスタム関数を作成する方法を見てみましょう
パート5：動物相の認証と承認について

Today, in the final article of this series, we're going to take a look at authentication and authorization in Fauna.

今日は、このシリーズの最後の記事で、動物相での認証と承認について見ていきます。

## In this article:

今回の記事

-   Introduction
-   About tokens, keys, and secrets
-   Introduction to roles and privileges
-   Creating a server key
-   Basics of authentication
-   Authentication in your application
-   Your first custom role
-   Fine-grained privileges
-   Fine-grained memberships
-   Privileges over UDFs

前書き
トークン、キー、シークレットについて
役割と特権の概要
サーバーキーの作成
認証の基本
アプリケーションでの認証
あなたの最初のカスタムロール
きめ細かい特権
きめ細かいメンバーシップ
UDFに対する特権

## Introduction

前書き

Authentication and authorization are commonly implemented in the application layer. Fauna follows a different approach by centralizing those right at the database.

認証と承認は通常、アプリケーション層で実装されます。動物相は、それらをデータベースに一元化することにより、異なるアプローチに従います。

This means that any piece of code can now become a client of your database without having to reimplement authentication or authorization:

これは、認証や承認を再実装しなくても、コードのどの部分でもデータベースのクライアントになることができることを意味します。

-   Mobile apps
-   Server applications
-   Cloud functions
-   Microservices
-   Frontend web apps
-   Desktop apps
-   Etc.

モバイルアプリ
サーバーアプリケーション
クラウド機能
マイクロサービス
フロントエンドWebアプリ
デスクトップアプリ
等。

Before we get to the code, let me introduce a couple of core concepts.

コードに入る前に、いくつかのコアコンセプトを紹介しましょう。

## About tokens, keys, and secrets

トークン、キー、シークレットについて

Fauna is secure by default. To execute queries, you will always need to pass a secret which is associated either with an application key or an access token.

動物相はデフォルトで安全です。クエリを実行するには、アプリケーションキーまたはアクセストークンのいずれかに関連付けられているシークレットを常に渡す必要があります。

#### **Secrets**

秘密

Whenever you instantiate a Fauna client in your application, you will need to use a secret. A secret looks very much like a password:

アプリケーションでFaunaクライアントをインスタンス化するときは常に、シークレットを使用する必要があります。シークレットはパスワードに非常によく似ています。

```
fnADviINFNACBaG5LTgmxtf2fwpdqohworOfFGJ_
```



#### **Application keys**

アプリケーションキー

Like their name implies, application keys are used by your applications. Each key has its own secret and can be used any number of times on multiple applications.

その名前が示すように、アプリケーションキーはアプリケーションによって使用されます。各キーには独自の秘密があり、複数のアプリケーションで何度でも使用できます。

You create keys manually using FQL, or via Fauna's dashboard. Keys do not expire until you manually delete them.

FQLを使用して手動で、またはFaunaのダッシュボードを介してキーを作成します。キーは、手動で削除するまで有効期限が切れません。

#### **Access tokens**

アクセストークン

Tokens are somewhat similar to keys, but are used by users instead of applications. Tokens and their secrets are usually generated for you when authenticating successfully with Fauna, so a single user could use multiple secrets in different devices simultaneously.

トークンはキーにいくぶん似ていますが、アプリケーションではなくユーザーによって使用されます。トークンとそのシークレットは通常、Faunaで正常に認証されるときに生成されるため、1人のユーザーが異なるデバイスで複数のシークレットを同時に使用できます。

Tokens can be deleted manually, or upon logging a user out. It's also possible to define an optional time-to-live setting to determine how long a token will be valid.

トークンは手動で、またはユーザーのログアウト時に削除できます。オプションの存続可能時間設定を定義して、トークンが有効である期間を決定することもできます。

## Introduction to roles and privileges


役割と特権の概要

Fauna features a fine-grained authorization system based on attributes, also known as [ABAC](https://docs.fauna.com/fauna/current/security/abac).

動物相は、ABACとしても知られる属性に基づくきめ細かい認証システムを備えています。

#### **Custom roles and privileges**

カスタムの役割と特権

Roles grant privileges to keys and tokens to access resources in the database. The most important types of resources that you can grant access to are:

ロールは、データベース内のリソースにアクセスするためのキーとトークンに特権を付与します。アクセスを許可できる最も重要な種類のリソースは次のとおりです。

-   Collections
-   Indexes
-   User-defined functions (UDFs in short)

コレクション
インデックス
ユーザー定義関数（略してUDF）

These privileges can range from _"this role can read and delete any document of this collection"_ to more sophisticated behaviors such as _"this role can modify this document if the logged in user is its author"_.

これらの権限は、「このロールはこのコレクションの任意のドキュメントを読み取って削除できる」から、「ログインしたユーザーがその作成者である場合、このロールはこのドキュメントを変更できる」などのより高度な動作にまで及ぶ可能性があります。

#### **Server role**

サーバーの役割

All Fauna databases include a special server role that can access all resources. Beware: if you're using a key with this role, you should store its secret safely and never commit it to your GIT repository.

すべての動物相データベースには、すべてのリソースにアクセスできる特別なサーバーの役割が含まれています。注意：このロールでキーを使用している場合は、そのシークレットを安全に保存し、GITリポジトリにコミットしないでください。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6ugrxCGmR64zsHQGzuw8S2/64b86d39c7314af8054843e2257bb5f0/8608-FQL-part5-1.png)



## Creating a server key

サーバーキーの作成

As explained before, if you're accessing Fauna from a server-side environment, you will need an application key and its secret.

前に説明したように、サーバー側の環境からFaunaにアクセスする場合は、アプリケーションキーとそのシークレットが必要になります。

The easiest way to create keys is from the security tab in Fauna's dashboard:

キーを作成する最も簡単な方法は、Faunaのダッシュボードの[セキュリティ]タブからです。

Select the **Server** role in the dropdown which will grant this key access to everything in the database.

ドロップダウンでサーバーの役割を選択します。これにより、このキーにデータベース内のすべてへのアクセスが許可されます。

Finally, click **SAVE**:

最後に、[保存]をクリックします。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/64e0LvRq0nhYFBmLsioMPv/25939914898e021355f44c262db78190/8609-FQL-part5-2.png)



After creating your key, Fauna will show you its secret, which you'll use in your code. Don't forget to store it somewhere safe. It will never be displayed again.

キーを作成した後、Faunaはその秘密を表示します。これをコードで使用します。安全な場所に保管することを忘れないでください。二度と表示されることはありません。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6bS1deLySKHjoUJYbnfL2A/75100457b326d114f2c99bb6447d597b/8610-FQL-part5-3.png)



You can also create keys with FQL using the [CreateKey](https://docs.fauna.com/fauna/current/api/fql/functions/createkey) function:

CreateKey関数を使用してFQLでキーを作成することもできます。

```javascript
CreateKey({
  role: "server"
})



// Result:



{
  ref: Key("269237655682679301"),
  ts: 1593023887265000,
  role: "server",
  secret: "fnADvIY4qyACBa1k0EGH_N4YGXiFTLuj7q_7aBjP",
  hashed_secret: "$2a$05$MPFpLVrMFV5Oszfe9lqwG.FvH.LvVeryNOH4DEd4qbOiZ5N7uzk82"
}
```



#### **About client-side keys**

クライアント側のキーについて

If you're accessing Fauna from a client-side environment (e.g., frontend web app), you should never use a key with a server role. Anyone would be able to read the key from your JavaScript code and gain full access to the database.

クライアント側の環境（フロントエンドWebアプリなど）からFaunaにアクセスしている場合は、サーバーの役割を持つキーを使用しないでください。誰でもJavaScriptコードからキーを読み取り、データベースへのフルアクセスを取得できます。

Again, **don't use server keys in your frontend web app**.

繰り返しますが、フロントエンドWebアプリでサーバーキーを使用しないでください。

That said, it's certainly possible to query Fauna directly from your frontend apps or mobile apps by creating keys with custom roles. Depending on the security features you desire, you could go with a frontend-only approach and move the authentication flow server-side. The Fauna team is currently working on guidance on the best security practices regarding different authentication scenarios.

とはいえ、カスタムロールのキーを作成することで、フロントエンドアプリやモバイルアプリから直接動物相にクエリを実行することは確かに可能です。必要なセキュリティ機能に応じて、フロントエンドのみのアプローチを採用し、認証フローをサーバー側に移動することができます。動物相チームは現在、さまざまな認証シナリオに関するセキュリティのベストプラクティスに関するガイダンスに取り組んでいます。

For simplicity's sake, from now on we're just going to assume short-lived access tokens are generated server-side. These tokens could then be used from any type of application.

簡単にするために、これからは、短期間のアクセストークンがサーバー側で生成されると仮定します。これらのトークンは、任意のタイプのアプリケーションから使用できます。

## Basics of authentication

認証の基本

Let's see how to solve one of the most common authentication scenarios: logging in a user with an email and a password.

最も一般的な認証シナリオの1つである電子メールとパスワードを使用してユーザーにログインする方法を解決する方法を見てみましょう。

Before we get into the details, let's create a new collection for our users:

詳細に入る前に、ユーザー向けの新しいコレクションを作成しましょう。

```javascript
CreateCollection({name: "SpaceUsers"})
```



#### **Where to store the password?**

パスワードはどこに保存しますか？

You might be tempted to store a hashed password in the user document like you've probably done with other databases:

他のデータベースで行ったように、ハッシュ化されたパスワードをユーザードキュメントに保存したくなるかもしれません。

```javascript
// Don't do this!



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

独自の認証システムを導入したい場合は確かにそうすることができますが、Faunaには、より使いやすく、より安全な、より優れた方法がすでに含まれています。

Ok, so where do we store the password, and how do we use it?

では、パスワードはどこに保存し、どのように使用するのでしょうか。

I mentioned earlier that access tokens are used by users. The way to tell Fauna that an entity (such as a user document) _"has a password"_ is by adding a credentials object to the metadata of a document.

アクセストークンはユーザーによって使用されることを前述しました。エンティティ（ユーザードキュメントなど）が「パスワードを持っている」ことをFaunaに伝える方法は、ドキュメントのメタデータに資格情報オブジェクトを追加することです。

With this in mind, let's create our first user:

これを念頭に置いて、最初のユーザーを作成しましょう。

```javascript
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



// Result:



{
  ref: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ts: 1592960287940000,
  data: {
    email: "darth@empire.com"
  }
}
```



As you can see, the **credentials** object is not part of the document's data and it's never returned when accessing the document. Because of that, you won't be able to expose the hashed credentials by mistake.

ご覧のとおり、credentialsオブジェクトはドキュメントのデータの一部ではなく、ドキュメントにアクセスしたときに返されることはありません。そのため、ハッシュされたクレデンシャルを誤って公開することはできません。

It really doesn't matter _where_ these credentials are stored. All the encryption and verification of passwords is solved for you when using Fauna's authentication system.

これらの資格情報がどこに保存されているかは実際には問題ではありません。Faunaの認証システムを使用すると、パスワードの暗号化と検証がすべて解決されます。

#### **Logging in**

ログイン

Since credentials are associated with documents, we will need to find a user's document in the **SpaceUsers** collection to be able to log them in.

クレデンシャルはドキュメントに関連付けられているため、ログインできるようにするには、SpaceUsersコレクションでユーザーのドキュメントを見つける必要があります。

Let's create an index to do just that, and make sure there can only be one user for each email address by setting **unique** to **true**:

それを行うためのインデックスを作成し、uniqueをtrueに設定して、メールアドレスごとにユーザーが1人だけになるようにします。

```javascript
CreateIndex({
  name: "SpaceUsers_by_email",
  source: Collection("SpaceUsers"),
  terms: [{field: ["data", "email"]}],
  unique: true
})
```



Now, we can use the [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) function in combination with the **SpaceUsers\_by\_email** index.

これで、ログイン機能をSpaceUsers_by_emailインデックスと組み合わせて使用できるようになりました。

```javascript
Login(
  Match(Index("SpaceUsers_by_email"), "darth@empire.com"),
  {
    password: "iamyourfather",
    ttl: TimeAdd(Now(), 3, 'hour')
  }
)



// Result:



{
  ref: Ref(Ref("tokens"), "269770764488540678"),
  ts: 1593532299503000,
  ttl: Time("2020-06-30T18:51:39.033543Z"),
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  secret: "fnEDvmsUvCACBgOyQyF20AITzhwm2fKyWe7M8Qwz11CFnU1sgQ0"
}
```



The **Login** function first takes a reference to a document or a set produced by Match. Its second argument is an object with the password and an optional time-to-live.

ログイン機能は、最初の文書またはマッチによって産生さセットへの参照を取ります。2番目の引数は、パスワードとオプションの有効期間を持つオブジェクトです。

If everything is ok, a new access token will be created and returned to us with a secret we can use in our application.

すべて問題がなければ、新しいアクセストークンが作成され、アプリケーションで使用できるシークレットとともに返されます。

Obviously, if the credentials are wrong, Fauna will return an error:

明らかに、資格情報が間違っている場合、Faunaはエラーを返します：

```javascript
Login(
  Match(Index("SpaceUsers_by_email"), "darth@empire.com"),
  {password: "darksidemaster"}
)



// Result:



error: authentication failed
The document was not found or provided password was incorrect.
```



## Authentication in your application

アプリケーションでの認証

Let's see how we'd actually authenticate our users in a server-side JavaScript application. The approach should be very similar if you're using Fauna with [other programming languages](https://docs.fauna.com/fauna/current/drivers/).

サーバーサイドJavaScriptアプリケーションで実際にユーザーを認証する方法を見てみましょう。他のプログラミング言語でFaunaを使用している場合、アプローチは非常に似ているはずです。

First, we'd need to import Fauna's driver and define a couple of constants:

まず、Faunaのドライバーをインポートし、いくつかの定数を定義する必要があります。

```javascript
const faunadb = require('faunadb');
const q = faunadb.query;
const SERVER_SECRET = "BQOyQyF20AITt7nMIqW1XzW...";
```



We're hardcoding the secret here for simplicity's sake. Even in a server-side project, you should get the secret from an environment config and avoid committing it to Git with your code.

簡単にするために、ここでは秘密をハードコーディングしています。サーバー側のプロジェクトでも、環境構成からシークレットを取得し、コードを使用してGitにコミットしないようにする必要があります。

Then, we instantiate our client using the secret from our server key:

次に、サーバーキーのシークレットを使用してクライアントをインスタンス化します。

```javascript
const client = new faunadb.Client({
  secret: SERVER_SECRET
});
```



Finally, here's an example of an authentication function:

最後に、認証機能の例を次に示します。

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



After a successful login, we'll get an access token document with its secret like we saw previously:

ログインに成功すると、前に見たように、その秘密が記載されたアクセストークンドキュメントを取得します。

```javascript
{
  ref: Ref(Ref("tokens"), "269174603208720901"),
  ts: 1592963755720000,
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  secret: "fnEDvEzgHtACBQOyQyF20AITt7nMIqW1XzWCqykziZa53WyVm8E"
}
```



Now that we have a token for our user, we should be using its secret for any subsequent queries to Fauna on behalf of our user.

behalf
～に代わって

ユーザーのトークンができたので、ユーザーに代わってFaunaへの後続のクエリにそのシークレットを使用する必要があります。

You have many options for storing the secret. Here are some examples:

シークレットを保存するための多くのオプションがあります。ここではいくつかの例を示します。

-   **Pure client-side:** If you intend on accessing Fauna client-side you could send the secret back to the client and store it in memory.

純粋なクライアント側： Faunaクライアント側にアクセスする場合は、シークレットをクライアントに返送してメモリに保存できます。

-   **Partial backend with cookie:** If you're working on a server API you could store the secret in a session and send it back to the client using a secure cookie.

Cookieを使用した部分的なバックエンド：サーバーAPIで作業している場合は、シークレットをセッションに保存し、安全なCookieを使用してクライアントに送り返すことができます。

-   **Partial backend with httpOnly cookie:** You could also combine the above two approaches by creating two types of tokens in Fauna. One that could be used as a refresh token and stored in an httpOnly cookie, and another short-lived one that could be used and stored in the frontend.

httpOnly cookieを使用した部分的なバックエンド： Faunaで2種類のトークンを作成することにより、上記の2つのアプローチを組み合わせることもできます。1つは更新トークンとして使用してhttpOnlyCookieに保存できるもので、もう1つは使用してフロントエンドに保存できる短期間のものです。

-   **Full blown backend:** You could also decide you never want your clients receiving the secret and store the session in some cache and send back just a session id.

本格的なバックエンド：クライアントがシークレットを受信しないように決定し、セッションをキャッシュに保存して、セッションIDのみを返送することもできます。

These examples have very different security implications which are far too vast and complex to discuss in this introductory article. You will have to decide carefully how you want to manage secrets for your particular use case.

これらの例は、セキュリティへの影響が大きく異なり、この紹介記事で説明するには広すぎて複雑すぎます。特定のユースケースのシークレットをどのように管理するかを慎重に決定する必要があります。

#### **Logging out**

ログアウト

To log out, we use the [Logout](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function which will destroy the token we created when logging in.

ログアウトするには、ログイン時に作成したトークンを破棄するログアウト関数を使用します。

This could be our logout function:

これは、ログアウト機能である可能性があります。

```javascript
async function logout (deleteAllTokens = false) {
  return await client.query(q.Logout(deleteAllTokens));
}
```



Note that we don't need to pass any reference to the token since we instantiated the client with a token's secret.

トークンのシークレットを使用してクライアントをインスタンス化したため、トークンへの参照を渡す必要がないことに注意してください。

**Logout** takes a single boolean parameter to determine if all the tokens associated with a user should be deleted or only the one being used with the current secret. If we had used **q.Logout(true)** our user Darth would now be logged out from all his devices. Take that, evil Sith lord!

ログアウトは、単一のブールパラメータを使用して、ユーザーに関連付けられているすべてのトークンを削除するか、現在のシークレットで使用されているトークンのみを削除するかを決定します。q.Logout（true）を使用した場合、ユーザーDarthはすべてのデバイスからログアウトされます。それを取って、邪悪なシス卿！

Also note that **Logout** is actually a convenience function. You could also delete tokens manually with a reference to the token's document:

また、ログアウトは実際には便利な機能であることに注意してください。トークンのドキュメントを参照して、トークンを手動で削除することもできます。

```javascript
Delete(Ref(Ref("tokens"), "269174603208720901"))
```



#### **Advanced authentication**

高度な認証

You can keep using Fauna's authentication system even for custom scenarios without having to roll your own system from scratch.

独自のシステムを最初から作成しなくても、カスタムシナリオでもFaunaの認証システムを引き続き使用できます。

For example, you can create your own tokens with:

たとえば、次のコマンドを使用して独自のトークンを作成できます。

```javascript
Create(Tokens(), {
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ttl: TimeAdd(Now(), 3, 'hour')
})



// Result:



{
  ref: Ref(Ref("tokens"), "269776756060193286"),
  ts: 1593538013760000,
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ttl: Time("2020-06-30T20:26:53.134950Z"),
  secret: "fnEDvnCHwaACBgOyQyF20AITOp_00s0UzldXKztxeEdM0Z48bxw"
}
```



And, then, use these other FQL functions to customize your authentication logic:

次に、これらの他のFQL関数を使用して、認証ロジックをカスタマイズします。

-   [Identify](https://docs.fauna.com/fauna/current/api/fql/functions/identify) to check if a password is valid against a document's credentials.

パスワードがドキュメントのクレデンシャルに対して有効かどうかを確認するために識別します。

-   [HasIdentity](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity) to check if a current Fauna client is associated with a document or not.

現在のFaunaクライアントがドキュメントに関連付けられているかどうかを確認するHasIdentity。

## Your first custom role

あなたの最初のカスタムロール

Our users can now log in, but they can't access any resource in our database. We need to create a role to give them access to collections, indexes, etc.

これで、ユーザーはログインできますが、データベース内のどのリソースにもアクセスできません。コレクションやインデックスなどにアクセスできるようにするロールを作成する必要があります。

Keep in mind that you can also manage roles from the dashboard. If you go to the security tab and click on **Manage Roles**, you'll find the roles section:

ダッシュボードからロールを管理することもできることに注意してください。[セキュリティ]タブに移動して[役割の管理]をクリックすると、次のような役割のセクションが表示されます。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/42MmINkwJC30qm8dNmJgeB/a26c712916e2fe75a273faec55eb894e/8611-FQL-part5-4.png)



Let's start with something simple. We'll just create a **User** role with a single privilege:

privilege
特権

簡単なことから始めましょう。単一の権限を持つユーザーロールを作成するだけです。

```javascript
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



The **SpaceUsers** collection is now a member of the **User** role. Any token associated with a document from that collection will inherit the role's privileges, including previously created tokens.

SpaceUsersのコレクションは現在のメンバーであるユーザー役割。そのコレクションのドキュメントに関連付けられているトークンは、以前に作成されたトークンを含め、ロールの特権を継承します。

We've also granted a single read-only privilege on any document from the **Spaceships** collection. Check the docs for [the complete list of actions](https://docs.fauna.com/fauna/current/security/roles#actions) we can use to define privileges.

また、Spaceshipsコレクションのすべてのドキュメントに対して単一の読み取り専用特権を付与しました。特権を定義するために使用できるアクションの完全なリストについては、ドキュメントを確認してください。

Darth will now be able to retrieve any **Spaceships** document, but he won't be able to create new documents in that collection or modify existing ones.

ダースはSpaceshipsドキュメントを取得できるようになりますが、そのコレクションに新しいドキュメントを作成したり、既存のドキュメントを変更したりすることはできません。

He won't be able to use any indexes either, but he will be able to use **Get** to retrieve a specific spaceship document and also list all spaceship documents using the [Documents](https://docs.fauna.com/fauna/current/api/fql/documents) function we saw in previous articles:

彼はインデックスも使用できませんが、Getを使用して特定の宇宙船ドキュメントを取得し、以前の記事で見たDocuments関数を使用してすべての宇宙船ドキュメントを一覧表示することもできます。

```javascript
Map(
  Paginate(Documents(Collection("Spaceships"))),
  Lambda("ref", Get(Var("ref")))
)
```



#### **Updating roles**

役割の更新

Let's update the role with another privilege by using **Update**. Remember that we need to pass all privileges, including the ones we had previously set, because **Update** will replace the entire array.

Updateを使用して、別の権限でロールを更新しましょう。Updateはアレイ全体を置き換えるため、以前に設定したものを含め、すべての特権を渡す必要があることに注意してください。

```javascript
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



Note that existing keys and tokens belonging to a role will be affected by the updated privileges.

ロールに属する既存のキーとトークンは、更新された特権の影響を受けることに注意してください。

## Fine-grained privileges

きめ細かい特権

It's also possible to create custom behaviors for privileges instead of simply using **true** or **false**.

単にtrueまたはfalseを使用する代わりに、特権のカスタム動作を作成することもできます。

For example, we might want Darth to be able to access his own **SpaceUsers** document, but we certainly don't want him poking around all users' documents to obtain their email addresses and spam them to join his empire.

たとえば、ダースが自分のSpaceUsersドキュメントにアクセスできるようにしたい場合がありますが、すべてのユーザーのドキュメントを調べてメールアドレスを取得し、スパムを送信して帝国に参加させたくないのは確かです。

We do that by using a **Lambda** to define any type of behavior we might need:

これを行うには、Lambdaを使用して、必要になる可能性のあるあらゆるタイプの動作を定義します。

```javascript
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



In this case, we've used this **Lambda** function on the read action for the **SpaceUsers** collection:

この場合、SpaceUsersコレクションの読み取りアクションでこのLambda関数を使用しました。

```javascript
Query(
  Lambda("ref",
    Equals(
      Identity(),
      Var("ref")
    )
  )
)
```



-   We need to use **Query** because we don't want **Lambda** to execute when we're only updating the role itself.

ロール自体を更新するだけのときにLambdaを実行したくないので、Queryを使用する必要があります。

-   Whenever a **SpaceUsers** document is accessed, Fauna will trigger the **Lambda** and pass a reference of the document it's checking. Access will be granted only if that **Lambda** returns **true**.

SpaceUsersドキュメントにアクセスするたびに、FaunaはLambdaをトリガーし、チェックしているドキュメントの参照を渡します。そのLambdaがtrueを返した場合にのみ、アクセスが許可されます。

-   [Identity](https://docs.fauna.com/fauna/current/api/fql/functions/identity) will return a reference to the document associated with the current token in use. In our example, it would return the document in the **SpaceUsers** collection for the current logged in user.

Identityは、現在使用中のトークンに関連付けられているドキュメントへの参照を返します。この例では、現在ログインしているユーザーのSpaceUsersコレクション内のドキュメントを返します。

-   [Equals](https://docs.fauna.com/fauna/current/api/fql/functions/equals) will return **true** or **false** when comparing the reference returned by **Identity** to the reference of the document we're trying to read.

Identityから返された参照を、読み取ろうとしているドキュメントの参照と比較すると、Equalsはtrueまたはfalseを返します。


In plain English: _"if the document in_ **_SpaceUsers_** _is the same as the document we've logged in with, return true, otherwise return false"_.

平易な英語：「 SpaceUsers のドキュメントがログインに使用したドキュメントと同じ場合はtrueを返し、そうでない場合はfalseを返します」。

To test this, let's create a new user:

これをテストするために、新しいユーザーを作成しましょう。

```javascript
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



// Result:



{
  ref: Ref(Collection("SpaceUsers"), "269412903498547719"),
  ts: 1593191016630000,
  data: {
    email: "yoda@jedi.com"
  }
}
```



So now, if we try to access Yoda's document using Darth's token in our application, we will get an error:

したがって、アプリケーションでダースのトークンを使用してYodaのドキュメントにアクセスしようとすると、エラーが発生します。

```javascript
try {
  const result = await client.query(
    q.Get(q.Ref(q.Collection("SpaceUsers"), "269412903498547719"))
  )
} catch (error) {
  console.log(error);
}



// Result:



[PermissionDenied: permission denied] {
  name: 'PermissionDenied',
  message: 'permission denied',
  description: 'Insufficient privileges to perform the action.',
 ...
```



But it will work fine if we try to access Darth's document:

しかし、ダースのドキュメントにアクセスしようとすると、正常に機能します。

```javascript
q.Get(q.Ref(q.Collection("SpaceUsers"), "269412903498547719"))



// Result:



{
  ref: Ref(Collection("SpaceUsers"), "269170966886613509"),
  ts: 1592960287940000,
  data: { email: 'darth@empire.com' }
}
```



## Fine-grained memberships

きめ細かいメンバーシップ

Just as we can use **Lambda** to define custom behaviors to check if a role can do something, we can also create fine-grained memberships and determine which documents on a collection are members of a role.

我々が使用できるのと同じようにラムダを役割は何かを行うことができますかどうかを確認するために、カスタム動作を定義するために、我々はまた、きめ細かいメンバーシップを作成し、コレクションの文書がロールのメンバーであるかを決定することができます。

Let's create a new user to test this:

これをテストするための新しいユーザーを作成しましょう。

```javascript
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



// Result:



{
  ref: Ref(Collection("SpaceUsers"), "269417695003279879"),
  ts: 1593195586136000,
  data: {
    email: "han@solo.com",
    isPilot: true
  }
}
```



Now, let's create a new **Pilot** role that will only grant permissions to users with the **isPilot** property. We do that by adding a predicate function to the membership object:

次に、isPilotプロパティを持つユーザーにのみアクセス許可を付与する新しいパイロットロールを作成しましょう。これを行うには、メンバーシップオブジェクトに述語関数を追加します。

```javascript
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



We've added a privilege that simply allows creating documents in the **Spaceships** collection.

Spaceshipsコレクションにドキュメントを作成するだけの権限を追加しました。

Let’s look at the membership predicate function:

メンバーシップ述語関数を見てみましょう。

```javascript
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



-   **Lambda** will receive a reference to a document and will return whatever **Select** returns.

Lambdaはドキュメントへの参照を受け取り、Selectが返すものはすべて返します。

-   **Select** will return the value of **isPilot** from the document. If the path **"data","isPilot"** doesn't exist in the document, it will return **false**.

Selectは、ドキュメントからisPilotの値を返します。パス「data」、「isPilot」がドキュメントに存在しない場合、falseが返されます。

In plain English: _"if the document in_ **_SpaceUsers_** _contains_ **_isPilot_** _and is set to_ **_true_**_, the logged in user will be able to create documents in the_ **_SpaceShips_** _collection_**_“._**

平易な英語で：「における文書ならば SpaceUsersが 含ま isPilotを してに設定されている 真、ログインしているユーザーに文書を作成することができます 宇宙船の コレクション「。

As expected, if we try to create a new ship with Darth's token, we will get an error because the **User** role doesn't have that privilege:

予想どおり、ダースのトークンを使用して新しい船を作成しようとすると、ユーザーロールにその特権がないため、エラーが発生します。

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



// Result:



[PermissionDenied: permission denied] {
  name: 'PermissionDenied',
  message: 'permission denied',
  description: 'Insufficient privileges to perform the action.',
  ...
```



But if we do it with Han's token instead:

しかし、代わりにハンのトークンでそれを行う場合：

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



// Result:



{
  ref: Ref(Collection("Spaceships"), "269419218694308358"),
  ts: 1593197039260000,
  data: { name: 'Millennium Falcon' }
}
```



## Privileges over UDFs

UDFに対する特権

We can grant privileges on UDFs just as we can on collections and indexes.

コレクションやインデックスと同じように、UDFに特権を付与できます。

Let's create a simple function that opens the hatch of a spaceship and also writes an entry to the log:

宇宙船のハッチを開き、ログにエントリを書き込む簡単な関数を作成しましょう。

```javascript
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



This function will:

この関数は次のようになります。

1.  Receive a reference to a ship
2.  Modify the ship's document and set **hatchIsOpen** to **true**.
3.  Create a new document in the **ShipLogs** collection.
4.  Return **"Hatch open!"** at the end.

船への参照を受け取る
船のドキュメントを変更し、hatchIsOpenをtrueに設定します。
ShipLogsコレクションに新しいドキュメントを作成します。
「ハッチオープン！」を返します。最後に。

If this function is unclear, I recommend going back to [part 4](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4) where we go through functions and transactions.

この関数が不明な場合は、パート4に戻って関数とトランザクションを確認することをお勧めします。

We'd call this function by simply passing a reference of the spaceship:

宇宙船の参照を渡すだけで、この関数を呼び出します。

```javascript
Call(
  Function("OpenHatch"),
  Ref(Collection("Spaceships"), "266356873589948946")
)
```



Now, let's update the privileges to our **Pilot** role:

それでは、パイロットロールの権限を更新しましょう。

```javascript
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



Other than granting our pilots the privilege to call the **OpenHatch** function, we're also granting privileges to the resources that the function needs to execute.

パイロットにOpenHatch関数を呼び出す特権を付与する以外に、関数を実行するために必要なリソースにも特権を付与します。

The problem is that by setting **call** to **true,** any pilot would be able to open any hatch of any ship. They could open the hatch of another spaceship by mistake while warping through a wormhole and break the space-time continuum!

問題は、呼び出しをtrueに設定することにより、パイロットは船のハッチを開くことができるということです。彼らはワームホールをワープしながら誤って別の宇宙船のハッチを開け、時空の連続性を壊す可能性があります！

That's not good. Let's make sure pilots can only open the hatch of their own ships.

それは良いことではありません。パイロットが自分の船のハッチしか開けないようにしましょう。

First, let's assign Han to his spaceship:

まず、ハンを彼の宇宙船に割り当てましょう：

```javascript
Update(
  Ref(Collection("Spaceships"), "269419218694308358"),
  {
    data: {
      pilotRef: Ref(Collection("SpaceUsers"), "269417695003279879")
    }
  }
)
```



Now, let's update our role so that Han can only warp his own ship.

それでは、ハンが自分の船だけをワープできるように、役割を更新しましょう。

```javascript
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



This is our **Lambda**:

これは私たちのラムダです：

```javascript
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



This **Lambda** is going to receive the same arguments we are using to call the function. So then, we just need to get the spaceship document and check whether the logged in user is the same as the pilot.

このLambdaは、関数の呼び出しに使用しているのと同じ引数を受け取ります。したがって、宇宙船のドキュメントを取得して、ログインしたユーザーがパイロットと同じかどうかを確認する必要があります。

If we test this using Han's token on the Falcon:

ファルコンでハンのトークンを使用してこれをテストすると、次のようになります。

```javascript
const result = await client.query(
  q.Call(
    q.Function("OpenHatch"),
    q.Ref(q.Collection("Spaceships"), "269419218694308358")
  )
)
console.log(result);



// Result:



Hatch open!
```



As expected, a document was created in the logs with the proper references:

予想どおり、ドキュメントは適切な参照を使用してログに作成されました。

```javascript
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



If we try to call the same function with a different ship reference, we will get an error though:

ただし、異なる船の参照を使用して同じ関数を呼び出そうとすると、エラーが発生します。

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



// Result:



[PermissionDenied: permission denied] {
  name: 'PermissionDenied',
  message: 'permission denied',
  description: 'Insufficient privileges to perform the action.',
...
```



## Final conclusion (to this 5 part series)

最終結論（この5部シリーズへ）

With this article, we've finally reached the end of the series. What an adventure. We've travelled through the galaxy, worked with famous pilots, created spaceships, feeded futuristic holographic UIs with data… and hopefully, also learned some FQL along the way!

この記事で、ようやくシリーズの終わりに到達しました。なんて冒険だ。私たちは銀河を旅し、有名なパイロットと協力し、宇宙船を作成し、未来のホログラフィックUIにデータを供給しました…そして、うまくいけば、途中でいくつかのFQLも学びました！

We've gone through many common scenarios and problems, but if you ever get stuck you can always get help from [Fauna's community](https://community.fauna.com/).

私たちは多くの一般的なシナリオと問題を経験してきましたが、行き詰まった場合はいつでも動物相のコミュニティから助けを得ることができます。

Don't forget you can also hit me up on Twitter: [@pierb](https://twitter.com/PierB)

私たちは多くの一般的なシナリオと問題を経験してきましたが、行き詰まった場合はいつでも動物相のコミュニティから助けを得ることができます。

Farewell, fellow space developer!

さようなら、仲間の宇宙開発者！

