# User authentication

This tutorial assumes that you have completed 
the [Quick Start with Fauna](https://docs.fauna.com/fauna/current/start/) tutorial.
このチュートリアルは、Faunaチュートリアルのクイック スタートを完了していることを前提としています 。

Fauna offers built-in identity,
authentication,
and password management.
This tutorial walks you through how to create user identities,
authenticate them,
and manage their sessions.
Faunaは、
組み込みのID、
認証、
およびパスワード管理を提供します。
このチュートリアルでは、
ユーザーIDを作成し、
認証し、
セッションを管理する方法について説明します。

This tutorial is divided into several sections:
このチュートリアルは、いくつかのセクションに分かれています。

- [Setup](#setup)
- [Create users](#create)
- [User login](#login)
- [User logout](#logout)
- [Change a user’s password](#change_password)
- [Check credentials](#check)
- [Third-party delegation](#delegation)
セットアップ
ユーザーを作成する
ユーザーログイン
ユーザーログアウト
ユーザーのパスワードを変更する
資格情報を確認する
サードパーティの委任

## [](#setup)Setup

This setup section describes all of the preparatory work
we need to do to prepare for authenticating our users.
It includes:
このセットアップセクションでは、
ユーザーの認証を準備するために必要なすべての準備作業について説明します。
以下が含まれます:

- [Create a database](#setup-database)
- [Create a server key](#setup-server-key)
- [Create a client key](#setup-client-key)
- [Create a collection to store user documents](#create-user-collection)
- [Create a public index for our users](#create-user-index)

データベースを作成する
サーバー キーを作成する
クライアント キーを作成する
ユーザー ドキュメントを格納するコレクションを作成する
ユーザー向けの公開インデックスを作成する

### [](#setup-database)Create a database

When we want to authenticate users,
it is typically in the context of a specific application.
With that in mind,
let’s create an application-specific database called "app1".
Copy the following query,
paste it into the Shell,
and run it:

ユーザーを認証する場合、
通常は特定のアプリケーションのコンテキストで行います。
それを念頭に置いて、
「app1」
というアプリケーション固有のデータベースを作成しましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
CreateDatabase({
  name: "app1"
})
```

CreateDatabase({ name: "app1"})

ここではexampleとうデータベース上でapp1とうデータベースを作った上で
その中でapp1という孫のデータベースを作っている。

理論上無制限にデータベースを作れるので
このように同じ名前の子や孫のデータベースを
作ってしまうと混乱の元なので
名前をしっかり決める必要がある。

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Database("app1"), ts: 1576008456740000, name: 'app1' }
```

### [](#setup-server-key)Create a server key
サーバー キーを作成する

Our application is going to need access to our new database.
We don’t want to give it permission to every database,
so let’s create a "server" key,
which provides full access to a specific database.
Copy the following query,
paste it into the Shell,
and run it:
私たちのアプリケーションは、
新しいデータベースにアクセスする必要があります。
すべてのデータベースへのアクセス許可を与えたくないので、
特定のデータベースへの完全なアクセスを提供する「サーバー」
キーを作成しましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
CreateKey({
  name: "Server key for app1",
  database: Database("app1"),
  role: "server",
})
```

作成されたもの
{
  ref: Ref(Keys(), "300547004926263821"),
  ts: 1622882809490000,
  database: Database("app1"),
  role: 'server',
  secret: 'fnAEK8HomvACDTx7E038c6MsMv7Tx9Amvz827cX4',
  hashed_secret: '$2a$05$hysnc6UkfLqPHtJKTCfTFu.ajPRIcZfax3ltW7qBc32hBA22RxFAC'
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Ref(Keys(), "251405600267698688"),
  ts: 1576017914170000,
  name: 'Server key for app1',
  database: Database("app1"),
  role: 'server',
  secret: 'fnADfSwPQoACAFAfWX9f6NFrBumWqIMsL8Qkt3wY',
  hashed_secret:
   '$2a$05$pC8bzQqEw3EM4TbsPJ6tjOzqnTV2rRZEQhT7sxI1SsdkCfk14n9qq' }
```

重要
When you run the query,
you will see different values.
Make sure that you copy the value for the `secret` field;
it is a key that authorizes access to Fauna,
specifically to the associated database.
**It is only ever displayed once**.
If you lose it,
a new key would have to be generated.

クエリを実行すると、
さまざまな値が表示されます。
secretフィールドの値を必ずコピーしてください。
これはFaunaへのアクセス、
特に関連するデータベースへのアクセスを許可するキーです。
これは一度だけ表示されます。
紛失した場合は、
新しいキーを生成する必要があります。

### [](#setup-client-key)Create a client key
クライアント キーを作成する
通常はブラウザがアクセスするためのキー

We need to allow our application’s public clients,
typically a web browser,
to access our "app1" database,
and we need to embed a key into the public client to permit that access.
So,
let’s create a "client" key.
Copy the following query,
paste it into the Shell,
and run it:
アプリケーションのパブリッククライアント(通常はWebブラウザー)
が"app1"データベースにアクセスできるようにする必要があり、
そのアクセスを許可するためにパブリッククライアントにキーを埋め込む必要があります。
それでは、
「クライアント」
キーを作成しましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
CreateKey({
  name: "Client key for app1",
  database: Database("app1"),
  role: "client",
})
```

作成されたもの

{
  ref: Ref(Keys(), "300547164366438922"),
  ts: 1622882961546000,
  database: Database("app1"),
  role: 'client',
  secret: 'fnAEK8INulACCsHxEm6c4WBXOD9uyzeApY9FZWia',
  hashed_secret: '$2a$05$tCQjiunxGUZ1dYmXc3gfMup1y3f64PQ5tU67Bn3JWEZYCWwxTWZ3.'
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Ref(Keys(), "251406008027447808"),
  ts: 1576018302900000,
  name: 'Client key for app1',
  database: Database("app1"),
  role: 'client',
  secret: 'fnADfSxuQuAQAe6JBbRY58Fm37ZA-0HhFtVm64T0',
  hashed_secret:
   '$2a$05$qKd8N/LsdLQ9kQKGmtYa/OjgNCQNlzG5sNO9xT1jWSiBuPMNGREJW' }
```

重要
When you run the query,
you will see different values.
Make sure that you copy the value for the `secret` field;
it is a key that authorizes access to Fauna,
specifically to the associated database.
**It is only ever displayed once**.
If you lose it,
a new key would have to be generated.

クエリを実行すると、
さまざまな値が表示されます。
secretフィールドの値を必ずコピーしてください。
これはFaunaへのアクセス、
特に関連するデータベースへのアクセスを許可するキーです。
これは一度だけ表示されます。
紛失した場合は、
新しいキーを生成する必要があります。	

### [](#create-user-collection)Create a collection to store user documents
ユーザー ドキュメントを格納するコレクションを作成する

Now that we have our app-specific database,
and keys to access it,
now we can create a collection where we can store user documents.
アプリ固有のデータベースとそれにアクセスするためのキーができたので、
ユーザードキュメントを保存できるコレクションを作成できます。

Let’s use our server key to access the new database.
First,
type `.exit` into the Shell and press Return.
サーバーキーを使用して新しいデータベースにアクセスしましょう。
まず、
.exitシェルに入力してを押しReturnます。

Then start the shell using the secret for the server key:
次に、サーバー キーのシークレットを使用してシェルを起動します。

terminal

```bash
fauna shell --secret=fnADfSwPQoACAFAfWX9f6NFrBumWqIMsL8Qkt3wY
```

シェル起動
fauna shell --secret=fnAEK8HomvACDTx7E038c6MsMv7Tx9Amvz827cX4

重要
Be sure to replace `fnADfSwPQoACAFAfWX9f6NFrBumWqIMsL8Qkt3wY` with the `secret` that you acquired for the server key.

書き換えてください

Now,
let’s create the collection to store users.
Copy the following query,
paste it into the Shell,
and run it:
では、
ユーザーを格納するコレクションを作成しましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
CreateCollection({ name: "users" })
```

結果
{
  ref: Collection("users"),
  ts: 1622886207020000,
  history_days: 30,
  name: 'users'
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Collection("users"),
  ts: 1576019188350000,
  history_days: 30,
  name: 'users' }
```

### [](#create-user-index)Create a public index for our users
ユーザー向けの公開インデックスを作成する

We need an index to make it possible to lookup our users by their email address.
We need this index to be public,
since unauthenticated users would be using the client key when they attempt to login.
So,
let’s create the index.
Copy the following query,
paste it into the Shell,
and run it:
メールアドレスでユーザーを検索できるようにするには、
インデックスが必要です。
認証されていないユーザーがログインを試みるときにクライアントキーを使用するため、
このインデックスを公開する必要があります。
それでは、
インデックスを作成してみましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
CreateIndex({
  name: "users_by_email",
  permissions: { read: "public"},
  source: Collection("users"),
  terms: [{field: ["data", "email"]}],
  unique: true,
})
```

結果
{
  ref: Index("users_by_email"),
  ts: 1622886463786000,
  active: true,
  serialized: true,
  name: 'users_by_email',
  permissions: { read: 'public' },
  source: Collection("users"),
  terms: [ { field: [ 'data', 'email' ] } ],
  unique: true,
  partitions: 1
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Index("users_by_email"),
  ts: 1576019648660000,
  active: false,
  serialized: true,
  name: 'users_by_email',
  permissions: { read: 'public' },
  source: Collection("users"),
  terms: [ { field: [ 'data', 'email' ] } ],
  unique: true,
  partitions: 1 }
```

At this point, the setup is complete!
これで設定は完了です！

## [](#create)Create users
ユーザーを作成する

When a new user signs up,
we can create a new user document that contains their email address and password.
More specifically,
a BCrypt hash of the user’s password is stored;
Fauna does not store credentials in plain text.
新しいユーザーがサインアップすると、
メールアドレスとパスワードを含む新しいユーザードキュメントを作成できます。
具体的には、
ユーザーのパスワードのBCryptハッシュが保存されます。
Faunaは資格情報をプレーンテキストで保存しません。

Let’s create our first user.
Copy the following query,
paste it into the Shell,
and run it:
最初のユーザーを作成しましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
Create(
  Collection("users"),
  {
    credentials: { password: "secret password" },
    data: {
      email: "alice@site.example",
    },
  }
)
```

結果

{
  ref: Ref(Collection("users"), "300551619029762568"),
  ts: 1622887209935000,
  data: { email: 'alice@site.example' }
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Ref(Collection("users"), "251407645221585408"),
  ts: 1576019864330000,
  data: { email: 'alice@site.example' } }
```

## [](#login)User login
ユーザーログイン

When a user wants to login,
they would provide their email address and password.
Then we use the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function to authenticate their access,
and if valid,
provide them with a token that they can use to access resources.
ユーザーがログインするときは、
メールアドレスとパスワードを入力します。
次に、
Login関数を使用してアクセスを認証し、
有効な場合は、
リソースへのアクセスに使用できるトークンを提供します。

A token only provides access according 
to the privileges granted by
an [attribute-based access control (ABAC) role]
(https://docs.fauna.com/fauna/current/security/abac).

These differ from [keys](https://docs.fauna.com/fauna/current/security/keys),
which are used to provide coarser,
database-level access.
トークンは、
属性ベースのアクセス制御(ABAC)
ロールによって付与された権限に従ってのみアクセスを提供します。

これらは、
より粗いデータベースレベルのアクセスを
提供するために使用されるキーとは異なります。

The following query calls `Login` on the result of looking up the user via the `users_by_email` index,
with the password that they provided.
Copy the query,
paste it into the Shell,
and run it:
次のクエリはLogin、
ユーザーusers_by_emailが提供したパスワードを使用して、
インデックスを介してユーザーを検索した結果を呼び出します。
クエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
Login(
  Match(Index("users_by_email"), "alice@site.example"),
  { password: "secret password" },
)
```

結果
{
  ref: Ref(Tokens(), "300552330096411146"),
  ts: 1622887887980000,
  instance: Ref(Collection("users"), "300551619029762568"),
  secret: 'fnEEK8bAd9ACCgQrweId8AYJCoMQ5WvH-FHg2RfPVdB387X7jB4'      
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Ref(Tokens(), "251407817091580416"),
  ts: 1576020028130000,
  instance: Ref(Collection("users"), "251407645221585408"),
  secret: 'fnEDfS4T34ACAAN9IwrU8aQA5SxTgyqYaUfiAqLqzQjQH9Qcr94' }
```

重要
When you run the query,
you will see different values.
Make sure that you copy the value for the `secret` field;
it is a token that authorizes access to Fauna,
specifically to the associated database.
**It is only ever displayed once**.
If you lose it,
a new token would have to be generated.
クエリを実行すると、
さまざまな値が表示されます。
secretフィールドの値を必ずコピーしてください。
これはFaunaへのアクセス、
特に関連するデータベースへのアクセスを許可するトークンです。
これは一度だけ表示されます。
紛失した場合は、
新しいトークンを生成する必要があります。

If the user cannot be found,
or if their credentials are invalid,
an error would be returned:
ユーザーが見つからない場合、または資格情報が無効な場合、エラーが返されます。

shell

```shell
Login(
  Match(Index("users_by_email"), "bob@not.a.member"),
  { password: "secret password" },
)
```

結果
Error: authentication failed
{
  errors: [
    {
      position: [],
      code: 'authentication failed',
      description: 'The document was not found or provided password was incorrect.'
    }
  ]
}
↑
ログインを失敗している。

shell

```shell
[ { position: [],
    code: 'authentication failed',
    description:
     'The document was not found or provided password was incorrect.' } ]
```

The token provided for a successful login is all that is required to perform authenticated queries;
it represents both the identity and authorization for the user.
The token can now be used in any subsequent queries for resources.
認証されたクエリを実行するために必要なのは、
ログインに成功するために提供されるトークンだけです。
これは、
ユーザーのIDと承認の両方を表します。
トークンは、
リソースに対する後続のクエリで使用できるようになりました。

Your app should use the value in the `secret` field to create another client instance,
which should be used to perform queries as that user.
アプリはsecretフィールドの値を使用して、
そのユーザーとしてクエリを実行するために
使用する必要がある別のクライアントインスタンスを作成する必要があります。

If your application is using HTTP requests to interact with Fauna,
you can use the token as a username+password via the `Basic-Auth` header,
for every query made by that specific user.
For example,
you could use `curl`:
アプリケーションがFaunaと対話するために
HTTPリクエストを使用しているBasic-Auth場合、
その特定のユーザーが行うすべてのクエリに対して、
ヘッダーを介してトークンをユーザー名+パスワードとして使用できます。
たとえば、
次を使用できますcurl。

terminal

```bash
curl https://db.fauna.com/tokens/self -u fnEDfS4T34ACAAN9IwrU8aQA5SxTgyqYaUfiAqLqzQjQH9Qcr94:
```

curl https://db.fauna.com/tokens/self -u fnEEK8bAd9ACCgQrweId8AYJCoMQ5WvH-FHg2RfPVdB387X7jB4:

最後にコロンが必要
最後にコロンが必要
最後にコロンが必要

結果
06-05 19:55:17> curl https://db.fauna.com/tokens/self -u fnEEK8bAd9ACCgQrweId8AYJCoMQ5WvH-FHg2RfPVdB387X7jB4:
{
  "resource": {
    "ref": {
      "@ref": {
        "id": "300552330096411146",
        "class": { "@ref": { "id": "tokens" } }
      }
    },
    "ts": 1622887887980000,
    "instance": {
      "@ref": {
        "id": "300551619029762568",
        "class": {
          "@ref": {
            "id": "users",
            "class": { "@ref": { "id": "classes" } }
          }
        }
      }
    },
    "hashed_secret": "$2a$05$14SA/p.UGQMkU8uXmhhS/ur27f34FB448KcB/ckbK98/kl4SdUDv2"
  }
}

注意
HTTP Basic Auth wants credentials in the form "username:password".
Since we’re using a secret that represents both,
we just add a colon (`:`) to the end of the secret.

HTTP基本認証では、
「ユーザー名:パスワード」
の形式の資格情報が必要です。
両方を表すシークレットを使用しているため、
シークレット:の最後にコロン()
を追加するだけです。

Running that command should show output similar to:
そのコマンドを実行すると、次のような出力が表示されます。

shell

```shell
{
  "resource": {
    "ref": {
      "@ref": {
        "id": "251407817091580416",
        "class": { "@ref": { "id": "tokens" } }
      }
    },
    "ts": 1576020028130000,
    "instance": {
      "@ref": {
        "id": "251407645221585408",
        "class": {
          "@ref": {
            "id": "users",
            "class": { "@ref": { "id": "classes" } }
          }
        }
      }
    },
    "hashed_secret": "$2a$05$hljpg/MZ7FsbTv.5kIJP7umPKeuPr8Xwd0uWQ63KY/7ZPdUUwy1SO"
  }
}
```

If the secret that you use is invalid:
使用するシークレットが無効な場合:

terminal

```bash
curl https://db.fauna.com/tokens/self \
  -u not_a_valid_secret:
```

You would see the following error:
次のエラーが表示されます。

shell

```shell
{
  "errors": [ { "code": "unauthorized", "description": "Unauthorized" } ]
}
```

If your application is using one of the native
[Drivers](https://docs.fauna.com/fauna/current/drivers/),
you should create a new client instance using the user’s token as the `secret`.
Some drivers can create _session clients_
in which the underlying HTTP connection is shared,
so that you can intermingle queries using different tokens easily.
アプリケーションがネイティブDriversのいずれかを使用している場合は、
ユーザーのトークンをsecret.一部のドライバーは、
基になるHTTP接続が共有されるセッションクライアントを作成できるため、
さまざまなトークンを使用してクエリを簡単に混在させることができます。

Multiple tokens can be created per user,
which allows a user to log in from multiple sources.
ユーザーごとに複数のトークンを作成できるため、
ユーザーは複数のソースからログインできます。

## [](#logout)User logout
ユーザーログアウト

When you call
[`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout),
the token associated with the current session is invalidated,
effectively logging out the user.
A new token would need to be created for any future access.
を呼び出すLogoutと、現在のセッションに関連付けられているトークンが無効になり、ユーザーが実質的にログアウトされます。今後のアクセスには、新しいトークンを作成する必要があります。

`Logout` takes a single parameter `all_tokens`.
When `all_tokens` is `true`,
all tokens associated with the current user are invalidated,
logging the user out completely.
When `all_tokens` is `false`,
only the current token is invalidated;
any other active tokens are still valid.
Logout単一のパラメータを取りますall_tokens。
ときall_tokensでtrue、
現在のユーザーに関連付けられているすべてのトークンは、
完全にユーザーをログアウトし、
無効化されます。
ときall_tokensであるfalse、
唯一の現在のトークンは無効化されます。
他のアクティブなトークンは引き続き有効です。

You should only call `Logout` when connecting
to Fauna with a token received from calling `Login`.
In your client application code,
that query would look similar to this JavaScript code:
呼び出しLogoutから受け取ったトークンを使用して
Faunaに接続する場合にのみ呼び出す必要がありますLogin。
クライアントアプリケーションコードでは、
そのクエリは次のJavaScriptコードのようになります。

```javascript
client.query(q.Logout(true));
```

When you execute this query,
a response of `true` indicates that log out was successful,
and `false` indicates that log out failed.
このクエリを実行すると、
の応答はtrueログアウトが成功したfalseことを示し、
ログアウトに失敗したことを示します。

## [](#change_password)Change a user’s password
ユーザーのパスワードを変更する

You can change a user’s password by calling the
[`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)
or
[`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace)
functions with a new password in the `credentials` field.
ユーザーのパスワードを変更するには、
フィールドに新しいパスワードを指定してUpdateまたは
Replace関数を呼び出しcredentialsます。

When a password is updated,
**any existing tokens remain valid**.
If required,
invalidate any previous session by calling `Logout` as [described above](#logout).
パスワードが更新されても、
既存のトークンはすべて有効なままです。
必要に応じて、
上記のように呼び出しLogoutて、
以前のセッションを無効にします。

Let’s change our user’s password.
We are using the user ref,
displayed when the user document was created.
Copy the following query,
paste it into the Shell,
and run it:
ユーザーのパスワードを変更しましょう。
ユーザードキュメントの作成時に表示される
ユーザーリファレンスを使用しています。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
Update(
  Ref(Collection("users"), "251407645221585408"),
  {
    credentials: { password: "new password" },
  }
)
```

Update(
  Ref(Collection("users"), "300551619029762568"),
  {
    credentials: { password: "new password" },
  }
)

結果
... {
  ref: Ref(Collection("users"), "300551619029762568"),
  ts: 1622890971540000,
  data: { email: 'alice@site.example' }
}

注意
You need to use the ref for the user that you created.
The numerical portion of the ref that you see here differs
from the value received from your query.

作成したユーザーのrefを使用する必要があります。
ここに表示される参照の数値部分は、
クエリから受け取った値とは異なります。

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Ref(Collection("users"), "251407645221585408"),
  ts: 1576023407790000,
  data: { email: 'alice@site.example' } }
```

Let’s see if the original token still works:

terminal

```bash
curl https://db.fauna.com/tokens/self \
  -u fnEDfS4T34ACAAN9IwrU8aQA5SxTgyqYaUfiAqLqzQjQH9Qcr94:
```

curl https://db.fauna.com/tokens/self -u fnEEK8bAd9ACCgQrweId8AYJCoMQ5WvH-FHg2RfPVdB387X7jB4:

And it does:
そして、それはします：

shell

```shell
{
  "resource": {
    "ref": {
      "@ref": {
        "id": "251407817091580416",
        "class": { "@ref": { "id": "tokens" } }
      }
    },
    "ts": 1576020028130000,
    "instance": {
      "@ref": {
        "id": "251407645221585408",
        "class": {
          "@ref": {
            "id": "users",
            "class": { "@ref": { "id": "classes" } }
          }
        }
      }
    },
    "hashed_secret": "$2a$05$hljpg/MZ7FsbTv.5kIJP7umPKeuPr8Xwd0uWQ63KY/7ZPdUUwy1SO"
  }
}
```

Let’s get a new token based on the new password.
Copy the following query,
paste it into the Shell,
and run it:
新しいパスワードに基づいて新しいトークンを取得しましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
Login(
  Match(Index("users_by_email"), "alice@site.example"),
  { password: "new password" },
)
```

結果
{
  ref: Ref(Tokens(), "300555855793750538"),
  ts: 1622891250335000,
  instance: Ref(Collection("users"), "300551619029762568"),
  secret: 'fnEEK8n1W8ACCgQrweId8AYJtAdNb-KBLgOB4O8n1PvcXUEEEiU'      
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Ref(Tokens(), "251411540589150720"),
  ts: 1576023579110000,
  instance: Ref(Collection("users"), "251407645221585408"),
  secret: 'fnEDfTF20UACaan9IwQU8AIQiYcTZyxXaK9j91QCnhXc27TXoPQ' }
```

When you run the query,
you will see different values.
Make sure that you copy the value for the `secret` field;
it is a token that authorizes access to Fauna,
specifically to the associated database.
**It is only ever displayed once**.
If you lose it,
a new token would have to be generated.

クエリを実行すると、
さまざまな値が表示されます。
secretフィールドの値を必ずコピーしてください。
これはFaunaへのアクセス、
特に関連するデータベースへのアクセスを許可するトークンです。
これは一度だけ表示されます。
紛失した場合は、
新しいトークンを生成する必要があります。

Let’s verify that the new token works:

terminal

```bash
curl https://db.fauna.com/tokens/self -u fnEDfTF20UACaan9IwQU8AIQiYcTZyxXaK9j91QCnhXc27TXoPQ:
```

curl https://db.fauna.com/tokens/self -u fnEEK8n1W8ACCgQrweId8AYJtAdNb-KBLgOB4O8n1PvcXUEEEiU:

And it does:
そして、それはします：

shell

```shell
{
  "resource": {
    "ref": {
      "@ref": {
        "id": "251411540589150720",
        "class": { "@ref": { "id": "tokens" } }
      }
    },
    "ts": 1576023579110000,
    "instance": {
      "@ref": {
        "id": "251407645221585408",
        "class": {
          "@ref": {
            "id": "users",
            "class": { "@ref": { "id": "classes" } }
          }
        }
      }
    },
    "hashed_secret": "$2a$05$l/WOFu6h9V3/vflDp6yGWOf/XDgCEJVG/G3JQmn6M9hzftYwivi0m"
  }
}
```

## [](#check)Check credentials
資格情報を確認する

You can verify whether a user’s credentials are valid,
without creating a token,
by calling the [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify) function.
Identify関数を呼び出すことで、
トークンを作成せずにユーザーの資格情報が有効かどうかを確認できます。

Let’s test whether the old and new credentials for our user are valid.
Copy the following query,
paste it into the Shell,
and run it:
ユーザーの古い資格情報と新しい資格情報が有効かどうかをテストしましょう。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
[
  Identify(
    Ref(Collection("users"), "251407645221585408"),
    "secret password",
  ),
  Identify(
    Ref(Collection("users"), "251407645221585408"),
    "new password",
  ),
]
```

[
  Identify(
    Ref(Collection("users"), "300551619029762568"),
    "secret password",
  ),
  Identify(
    Ref(Collection("users"), "300551619029762568"),
    "new password",
  ),
]

結果
[ false, true ]

When you run this query, the result should be:
このクエリを実行すると、結果は次のようになります。

shell

```shell
[ false, true ]
```

## [](#delegation)Third-party delegation
サードパーティの委任

Third-party delegation is the scenario 
where a third party uses our APIs to provide services to our users.
サードパーティの委任は、
サードパーティがAPIを使用してユーザーにサービスを提供するシナリオです。

Using the authentication features of Fauna,
we can provide unique tokens for each third-party client that allow the third party to access resources on behalf of our users,
while providing a way for the user to revoke the third-party client’s access.
Faunaの認証機能を使用して、
サードパーティクライアントごとに固有のトークンを提供し、
サードパーティがユーザーに代わってリソースにアクセスできるようにすると同時に、
ユーザーがサードパーティクライアントのアクセスを取り消す方法を提供できます。

First,
we create an index that allows us to list all of a user’s tokens.
`Login` allows us to attach data to a token by adding extra fields.
We’ll use this capability to identify our tokens with the name of the third-party service that will use the tokens.
Copy the following query,
paste it into the Shell,
and run it:
まず、
ユーザーのすべてのトークンをリストできるインデックスを作成します。
Login余分なフィールドを追加することで、
トークンにデータを添付できます。
この機能を使用して、
トークンを使用するサードパーティサービスの名前でトークンを識別します。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
CreateIndex({
  name: "tokens_by_instance",
  permissions: { read: "public" },
  source: Tokens(),
  terms: [{ field: "instance" }],
  values: [{field: ["data", "name"]}]
})
```

実行結果
{
  ref: Index("tokens_by_instance"),
  ts: 1622924016096000,
  active: true,
  serialized: true,
  name: 'tokens_by_instance',
  permissions: { read: 'public' },
  source: Tokens(),
  terms: [ { field: 'instance' } ],
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 1
}

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
{ ref: Index("tokens_by_instance"),
  ts: 1576024400110000,
  active: false,
  serialized: true,
  name: 'tokens_by_instance',
  permissions: { read: 'public' },
  source: Tokens(),
  terms: [ { field: 'instance' } ],
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 1 }
```

Now we can create a token for each third-party service that our user uses.
And we can do it all in a single query.
Copy the following query,
paste it into the Shell,
and run it:
これで、
ユーザーが使用するサードパーティサービスごとにトークンを作成できます。
そして、
すべてを1つのクエリで実行できます。
次のクエリをコピーしてシェルに貼り付け、
実行します。

shell

```shell
Map(
  [
    "Desktop App",
    "Mobile App",
    "Web Service"
  ],
  Lambda(
    "service",
    Login(
      Match(Index("users_by_email"), "alice@site.example"),
      {
        password: "new password",
        data: { name: Var("service") }
      }
    )
  )
)
```

実行結果

[
  {
    ref: Ref(Tokens(), "300590356926302733"),
    ts: 1622924153170000,
    data: { name: 'Desktop App' },
    instance: Ref(Collection("users"), "300551619029762568"),        
    secret: 'fnEEK-lWR4AKDQQrweId8AYJ4ZrD9Gtj5ozHNBNSJO7cROgB2oo'    
  },
  {
    ref: Ref(Tokens(), "300590356926300685"),
    ts: 1622924153170000,
    data: { name: 'Mobile App' },
    instance: Ref(Collection("users"), "300551619029762568"),        
    secret: 'fnEEK-lWR4ACDQQrweId8AYJwEQkLqUv8IazBVZZHtQba8uSz2Q'    
  },
  {
    ref: Ref(Tokens(), "300590356926301709"),
    ts: 1622924153170000,
    data: { name: 'Web Service' },
    instance: Ref(Collection("users"), "300551619029762568"),        
    secret: 'fnEEK-lWR4AGDQQrweId8AYJu9bIfJ2PTqcRJcsF68P56RWlPS4'    
  }
]

When you run this query, the result should be similar to:
このクエリを実行すると、結果は次のようになります。

shell

```shell
[ { ref: Ref(Tokens(), "251412696160797184"),
    ts: 1576024681170000,
    data: { name: 'Desktop App' },
    instance: Ref(Collection("users"), "251407645221585408"),
    secret: 'fnEDfTKD3rACAAN9IwrU8AIAa-IOXEqSP5rSkGjdQ_0eG9rBet0' },
  { ref: Ref(Tokens(), "251412696160799232"),
    ts: 1576024681170000,
    data: { name: 'Mobile App' },
    instance: Ref(Collection("users"), "251407645221585408"),
    secret: 'fnEDfTKD3rAKAAN9IwrU8AIA0su3H1YuSdUlgG5EQPRsqRcVyzQ' },
  { ref: Ref(Tokens(), "251412696160798208"),
    ts: 1576024681170000,
    data: { name: 'Web Service' },
    instance: Ref(Collection("users"), "251407645221585408"),
    secret: 'fnEDfTKD3rAGAAN9IwrU8AIAWe9UYsSvsOHgw0LHSnXj5CErYuo' } ]
```

Finally,
in client application code,
we can list all of the currently
logged-in user’s tokens by querying the index that we built,
when connecting to Fauna using the user’s token.
The following code is written in JavaScript:
最後に、
クライアントアプリケーションコードでは、
ユーザーのトークンを使用してFaunaに接続するときに、
作成したインデックスをクエリすることにより、
現在ログインしているユーザーのすべてのトークンを一覧表示できます。
次のコードはJavaScriptで記述されています。

```javascript
client.query(
  q.Paginate(
    q.Match(
      q.Index("tokens_by_instance"),
      q.Select("instance", q.Identity())
      )
    )
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.log("Error:", err))
```

When you execute this query in your client application code,
after the user has logged in successfully,
the output should be:
このクエリをクライアントアプリケーションコードで実行すると、
ユーザーが正常にログインした後、
出力は次のようになります。

shell

```shell
{ data: [ 'Desktop App', 'Mobile App', 'Web Service' ] }
```

Was this article helpful?
