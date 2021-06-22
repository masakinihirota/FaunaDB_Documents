Getting started with Fauna and Node.js using Fastify | by Fauna Inc | Fauna | Medium
https://medium.com/fauna/fauna-getting-started-with-fauna-and-node-js-using-fastify-36aa51bee782



Fastifyとは

数あるNode.jsのwebフレームワークの一つです。
最も大きな特徴としては高速レスポンスです。



# Getting started with Fauna and Node.js using Fastify

Fastify を使用して Fauna と Node.js を使い始める



Pier Bover|Dec 10th, 2020
2020 年 12 月 10 日



Today we'll be building a small API to see a quick overview on how to use Fauna in Node.js.



今日は、Node.js で Fauna を使用する方法の概要を確認するために、小さな API を構築します。



For reference, here's a Github repository with the finished project that you can use to follow along: [https://github.com/PierBover/getting-started-fauna-nodejs](https://github.com/PierBover/getting-started-fauna-nodejs)



参考までに、完成したプロジェクトを含む Github リポジトリを次に示します。これを使用してフォローできます。



Any recent version of Node will do. If you don't have it installed already, I recommend downloading the LTS installer from the [official website](https://github.com/PierBover/getting-started-fauna-nodejs). This will also install NPM which you need to manage your dependencies.



Node の最近のバージョンならどれでもかまいません。まだインストールしていない場合は、公式 Web サイトから LTS インストーラーをダウンロードすることをお勧めします。これにより、依存関係を管理するために必要な NPM もインストールされます。



For our server we'll be using [Fastify](https://www.fastify.io/) which is easy to use and offers a great developer experience. Also, as its name implies, it's very fast.



implies
意味する



サーバーには、使いやすく、優れた開発者エクスペリエンスを提供する Fastify を使用します。また、その名前が示すように、それは非常に高速です。



One last thing. If you've never used Fauna or FQL before, it would be a good idea to at least take a quick look at this [introductory article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1).



最後に一つだけ
これまでに Fauna または FQL を使用したことがない場合は、少なくともこの紹介記事をざっと見てみるとよいでしょう。



### In this article:

今回の記事

- First steps
- Initializing Fauna
- Preparing our data
- Installing Nodemon and Dotenv
- Creating a custom error class
- Creating users
- Authenticating users
- Retrieving a user
- Deleting a user
- Setting up fine-grained permissions

最初のステップ
Faunaの初期化
データの準備
NodemonとDotenvのインストール
カスタムエラークラスの作成
ユーザーの作成
ユーザーの認証
ユーザーの取得
ユーザーの削除
きめ細かい権限の設定

## First steps

最初のステップ

To get started, create a folder for your project and access it from your terminal. Then initialize NPM with this command:

開始するには、プロジェクト用のフォルダーを作成し、ターミナルからアクセスします。次に、次のコマンドでNPMを初期化します。

```
npm init -y
```



This should create a **package.json** file in your project folder which we can ignore for now.

これにより、プロジェクトフォルダーにpackage.jsonファイルが作成されますが、現時点では無視できます。

Next, we're going to install our first dependencies:

次に、最初の依存関係をインストールします。

```
npm install fastify faunadb
```



Finally, create an **index.js** in your project folder file with this:

最後に、次のコマンドを使用して、プロジェクトフォルダファイルにindex.jsを作成します。

```
const fastify = require('fastify')({ logger: true });



async function start () {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1);
  }
};



start();
```



Let's test everything is working as expected with this command:

このコマンドを使用して、すべてが期待どおりに機能していることをテストしましょう。

```
node index.js
```



You should see something similar to this:

これに似たものが表示されるはずです。

```
{"level":30,"time":1606320862585,"pid":35600,"hostname":"Pier.local","msg":"Server listening at http://127.0.0.1:3000"}
{"level":30,"time":1606320862585,"pid":35600,"hostname":"Pier.local","msg":"server listening on 3000"}
```



You can stop the server at any time with **Control + C** in your terminal.

ターミナルでControl + Cを使用すると、いつでもサーバーを停止できます。

## Initializing Fauna

Faunaの初期化

After you've [created a free Fauna account](https://dashboard.fauna.com/accounts/register) and logged into the dashboard, you're ready to create a new database.

あなたがした後自由ファウナアカウントを作成し、ダッシュボードにログインし、新しいデータベースを作成する準備が整いました。

![image3](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6PKTJWr3GeXxGrTIi7AJjT/64dfbf8081b0f982837b627e90e342ba/image3.png)



I will be using **NODEJS_TUTORIAL** but you can use any name you prefer:

私が使用するNODEJS_TUTORIALをしかし、あなたが好む任意の名前を使用することができます。

![image9](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3BGejDtBhodpsADwxRhgeq/0d349e91809641791c61e2c9aef5fbef/image9.png)



### Creating a server key

サーバーキーの作成

To be able to access our database from our code we need to create a server access key.

コードからデータベースにアクセスできるようにするには、サーバーアクセスキーを作成する必要があります。

Go to the security section of the dashboard and create a new key. In the settings give it a role of **Server**:

ダッシュボードのセキュリティセクションに移動し、新しいキーを作成します。設定でサーバーの役割を与えます：

![image10](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/bC0sbs45FK70vMSAsv13o/acfbf027ae5841e594d47df3ff1eac93/image10.png)



After creating this key you'll see the key's secret. This is what you'll use to access Fauna from Node. Store it somewhere safe as Fauna will never show it to you again.

このキーを作成すると、キーの秘密が表示されます。これは、ノードからFaunaにアクセスするために使用するものです。Faunaが二度とあなたにそれを見せないので、それを安全な場所に保管してください。

![image11](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3ZiQYYmR4mXpiLJ8q580EA/951fcc2d298adcc5c906968e942f6a0f/image11.png)



## Preparing our data

データの準備

We're now ready to execute our first FQL queries to create our first collection and index. To do this, we're going to use the shell right from the dashboard:

これで、最初のFQLクエリを実行して、最初のコレクションとインデックスを作成する準備が整いました。これを行うには、ダッシュボードから直接シェルを使用します。

![image8](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5ELpcLagrJi2otJpPE0t3v/f475490deaecb12f1d706938c80dfb02/image8.png)



First, we need a collection to store the documents for our users. To create the Users collection, run this query in the shell:

まず、ユーザーのドキュメントを保存するためのコレクションが必要です。Usersコレクションを作成するには、シェルで次のクエリを実行します。

```
CreateCollection({
  name: "Users"
})
```



Next, we need an index that will allow us to ensure unique usernames:

次に、一意のユーザー名を保証できるインデックスが必要です。

```
CreateIndex({
  name: "Users_by_username",
  source: Collection("Users"),
  terms: [{field: ["data", "username"]}],
  unique: true
})
```



We're good for now. Let's go back to our code.

今のところ元気です。コードに戻りましょう。

## Installing Nodemon and Dotenv

NodemonとDotenvのインストール

Before continuing to work on our API, let's install [Nodemon](https://github.com/remy/nodemon) and [dotenv](https://github.com/motdotla/dotenv) in our development dependencies:

APIの作業を続ける前に、開発の依存関係にNodemonとdotenvをインストールしましょう。

```
npm install nodemon dotenv --save-dev
```



Nodemon will automatically restart our server whenever we make any changes to our JavaScript code.

JavaScriptコードに変更を加えると、Nodemonはサーバーを自動的に再起動します。

Dotenv will allow us to inject environment variables into our server from a .env text file. Sensitive data such as API keys should never be hardcoded into our code or pushed to a Git repository.

Dotenvを使用すると、.envテキストファイルからサーバーに環境変数を挿入できます。APIキーなどの機密データをコードにハードコードしたり、Gitリポジトリにプッシュしたりしないでください。

Create a **.env** file in your project folder with this format:

プロジェクトフォルダに次の形式で.envファイルを作成します。

```
FAUNA_SERVER_SECRET=fnAD7ngvMYACDdHcIxfu2Fcb43-VFFC_McFja-XV
```



Obviously, use the secret you obtained when creating a server key.

もちろん、サーバーキーを作成するときに取得したシークレットを使用してください。

The variables we define in our .env file will be available as environment variables in our code. For example, to access our server secret we will use:

.envファイルで定義した変数は、コードで環境変数として使用できます。たとえば、サーバーシークレットにアクセスするには、次のものを使用します。

```
process.env.FAUNA_SERVER_SECRET
```



To prevent the .env file and node_modules folder to be pushed to our Git repository, create a .gitignore file with this:

.envファイルとnode_modulesフォルダーがGitリポジトリにプッシュされないようにするには、次のコマンドを使用して.gitignoreファイルを作成します。

```
.env
node_modules
```



Let's now add a new script into our **package.json**:

package.jsonに新しいスクリプトを追加しましょう：

```
"scripts": {
  "dev": "nodemon -r dotenv/config index.js"
},
```



We now only need to use this command to start our server with Nodemon and dotenv:

このコマンドを使用するだけで、サーバーをNodemonとdotenvで起動できます。

```
npm run dev
```



## Creating a custom error class

カスタムエラークラスの作成

Before we start working on our server routes, we need to be prepared to receive errors from Fauna. For this, we will create a custom **FaunaError** class that can be easily integrated into Fastify's error handling flow.

サーバールートの作業を開始する前に、Faunaからエラーを受け取る準備をする必要があります。このために、Fastifyのエラー処理フローに簡単に統合できるカスタムFaunaErrorクラスを作成します。

```
Create the file __errors/FaunaError.js__ and paste this:



class FaunaError extends Error {
  constructor (error) {
    super();



    const errors = error.requestResult.responseContent.errors;



    this.code = errors[0].code;
    this.message = errors[0].description;
    this.statusCode = 500;



    if (this.code === 'instance not unique'){
      this.statusCode = 409;
    }



    if (this.code === 'authentication failed') {
      this.statusCode = 401;
    }



    if (this.code === 'unauthorized') {
      this.statusCode = 401;
    }



    if (this.code === 'instance not found') {
      this.statusCode = 404;
    }



    if (this.code === 'permission denied') {
      this.statusCode = 403;
    }
  }
}



module.exports = FaunaError;
```



This class simply determines the HTTP status and description from the error returned by Fauna. You can customize this later on with more errors or add your own error messages. The **statusCode** property will be read by Fastify and returned as the HTTP code of the response.

このクラスは、Faunaによって返されたエラーからHTTPステータスと説明を決定するだけです。後でエラーを追加してこれをカスタマイズしたり、独自のエラーメッセージを追加したりできます。statusCodeのプロパティはFastifyによって読み取られ、レスポンスのHTTPコードとして返されます。

## Creating users

ユーザーの作成

Let's create our first Fastify route which will allow us to create users.

ユーザーを作成できる最初のFastifyルートを作成しましょう。

Don't forget to use the command we previously created to start our server:

以前に作成したコマンドを使用してサーバーを起動することを忘れないでください。

```
npm run dev
```



First we need to add this line in our index.js file before actually starting our server:

サーバーを実際に起動する前に、まずindex.jsファイルにこの行を追加する必要があります。

```
fastify.post('/users', require('./routes/create-user.js'));
```



See the [index.js file in the repository](https://github.com/PierBover/getting-started-fauna-nodejs/blob/main/index.js#L5) for the exact location.

正確な場所については、リポジトリ内のindex.jsファイルを参照してください。

Now create the file **routes/create-user.js** in your project folder with this code:

次に、次のコードを使用して、プロジェクトフォルダーにroutes /create-user.jsファイルを作成します。

```
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');



// We do this so that our FQL code is cleaner
const {Create, Collection} = faunadb.query;



module.exports = {
  // Validation schema for the Fastify route
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {type: 'string'},
        password: {
          type: 'string',
          minLength: 10
        }
      }
    }
  },
  async handler (request, reply) {



    const {username, password} = request.body;



    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET
    });



    try {



      // Create a new user document with credentials
      const result = await client.query(
        Create(
          Collection('Users'),
          {
            data: {username},
            credentials: {password}
          }
        )
      );



      // Return the created document
      reply.send(result);



    } catch (error) {
      throw new FaunaError(error);
    }
  }
};
```



Since this is a public route, we're using our server secret to be able to execute queries.

これはパブリックルートであるため、サーバーシークレットを使用してクエリを実行できるようにしています。

Once our users have logged in, we will be using their own secret to execute queries. A user will only be able to perform the actions we have allowed in our authorization rules. More on this later.

ユーザーがログインすると、独自のシークレットを使用してクエリを実行します。ユーザーは、承認ルールで許可されているアクションのみを実行できます。これについては後で詳しく説明します。

Note that unlike other database clients, we are going to instantiate a new client on every request. We can safely do that because each query is simply an HTTP request, and the Fauna client is a very lightweight wrapper on top of the HTTP engine.

他のデータベースクライアントとは異なり、リクエストごとに新しいクライアントをインスタンス化することに注意してください。各クエリは単なるHTTPリクエストであり、FaunaクライアントはHTTPエンジン上にある非常に軽量なラッパーであるため、これを安全に行うことができます。

If for any reason Fauna returned an error, we'd only need to catch it and throw a new instance of our FaunaError class. Fastify will take care of the rest.

何らかの理由でFaunaがエラーを返した場合は、それをキャッチして、FaunaErrorクラスの新しいインスタンスをスローするだけで済みます。Fastifyが残りの処理を行います。

To test this route we can use any HTTP client. I will be using Postman (which you can [download here](https://www.postman.com/downloads/)) but you can use whatever you're most comfortable with (eg: cURL, Insomnia, etc).

このルートをテストするには、任意のHTTPクライアントを使用できます。私はPostman（ここからダウンロードできます）を使用しますが、最も使いやすいもの（cURL、Insomniaなど）を使用できます。

Let's make a **POST** request to:

次の宛先にPOSTリクエストを作成しましょう。

```
http://localhost:3000/users
```



With this body:

この体で：

```
{
  "username": "pier",
  "password": "supersecretpassword"
}
```



Don't forget to add the **Content-Type** header:

Content-Typeヘッダーを追加することを忘れないでください：

![image7](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/467NwIXPXYX4VUdGlGC0mN/e38c777dfbcb36421585f91eb5735241/image7.png)



If everything worked as expected, in the response's body there should be a JSON representation of the document we just created in the **Users** collection:

すべてが期待どおりに機能した場合、応答の本文には、Usersコレクションで作成したばかりのドキュメントのJSON表現があるはずです。

```
{
  "ref": {
    "@ref": {
      "id": "283319645586326016",
      "collection": {
        "@ref": {
          "id": "Users",
          "collection": {
            "@ref": {
              "id": "collections"
            }
          }
        }
      }
    }
  },
  "ts": 1606435813770000,
  "data": {
    "username": "pier"
  }
}
```



If you're feeling mischievous you could try sending wrong requests and see how Fastify's validation reacts. For example, try to create a user without a password, or a password shorter than 10 characters.

いたずらを感じている場合は、間違ったリクエストを送信して、Fastifyの検証がどのように反応するかを確認してください。たとえば、パスワードなしのユーザー、または10文字未満のパスワードを作成してみてください。

You could also try to create the same user twice and see how a Fauna error is returned. Our **Users_by_username** index will not allow two documents with the same **username**.

同じユーザーを2回作成して、Faunaエラーがどのように返されるかを確認することもできます。私たちのUsers_by_usernameのインデックスは同じとの二つの文書を許可しませんユーザー名を。

## Authenticating users

ユーザーの認証

Let's now create an endpoint to authenticate our users. First add this to the index.js file:

次に、ユーザーを認証するためのエンドポイントを作成しましょう。まず、これをindex.jsファイルに追加します。

```
fastify.post('/login', require('./routes/login.js'));
```



Also create the file **routes/login.js** with this:

また、次のようにファイルroutes /login.jsを作成します。

```
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');



const {Login, Match, Index} = faunadb.query;



module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {type: 'string'},
        password: {type: 'string'}
      }
    }
  },
  async handler (request, reply) {



    const {username, password} = request.body;



    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET
    });



    try {



      // Authenticate with Fauna
      const result = await client.query(
        Login(
          Match(Index('Users_by_username'), username),
          {password}
          )
        );



      // If the authentication was successful
      // return the secret to the client
      reply.send({
        secret: result.secret
      });



    } catch (error) {
      throw new FaunaError(error);
    }
  }
};
```



As you can see, we're using our **Users_by_username** index with the [Login()](https://docs.fauna.com/fauna/current/api/fql/functions/login?lang=javascript) function. To understand better how this works, check this article I wrote about [authentication and authorization with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5).

ご覧のとおり、Login（）関数でUsers_by_usernameインデックスを使用しています。これがどのように機能するかをよりよく理解するには、Faunaによる認証と承認について書いたこの記事を確認してください。

Let's try this out by making a **POST** request to:

次の宛先にPOSTリクエストを送信して、これを試してみましょう。

```
http://localhost:3000/login
```



With this body:

この体で：

```
{
  "username": "pier",
  "password": "supersecretpassword"
}
```



Our API should return this response with the user's secret:

APIは、ユーザーの秘密とともにこの応答を返す必要があります。

```
{
  "secret": "fnED7o254PACAAPuFGfOAAIDnuZTNlU5Z7dD3LdjPKycDCyUkeI"
}
```



At this point, our client should store the secret somewhere and use it to make further requests to our API. We'll see how this works in the next route.

この時点で、クライアントはシークレットをどこかに保存し、それを使用してAPIにさらにリクエストを送信する必要があります。これが次のルートでどのように機能するかを見ていきます。

Beware, for simplicity's sake we're using a very basic form of authentication. You should decide very carefully which authentication strategy will work better for your use case and always use HTTPS when interacting with your servers.

簡単にするために、非常に基本的な形式の認証を使用していることに注意してください。どの認証戦略がユースケースに適しているかを慎重に決定し、サーバーと対話するときは常にHTTPSを使用する必要があります。

## Retrieving a user

ユーザーの取得

Let's now create an endpoint to be able to read a single user. Unlike the previous routes, this is going to be a private route.

次に、単一のユーザーを読み取ることができるエンドポイントを作成しましょう。以前のルートとは異なり、これはプライベートルートになります。

### Private hook

プライベートフック

The best way to solve private routes in Fastify is using a hook. Hooks are custom bits of code that can be triggered at certain points in the request/response flow. Check the [Fastify docs](https://www.fastify.io/docs/latest/Hooks/) for more info on how to use them.

Fastifyでプライベートルートを解決する最良の方法は、フックを使用することです。フックは、要求/応答フローの特定のポイントでトリガーできるコードのカスタムビットです。それらの使用方法の詳細については、Fastifyのドキュメントを確認してください。

Our hook will check for the presence of a **fauna-secret** header on the routes we've marked as private. We also need to create a [decorator](https://www.fastify.io/docs/latest/Decorators/) to let Fastify know we will be modifying the request object.

フックは、プライベートとしてマークしたルートにFaunaの秘密のヘッダーが存在するかどうかを確認します。また、リクエストオブジェクトを変更することをFastifyに通知するデコレータを作成する必要があります。

Add this to our **index.js** file:

これをindex.jsファイルに追加します。

```
fastify.addHook('onRequest', async (request, reply) => {



  // If the route is not private we ignore this hook
  if (!reply.context.config.isPrivate) return;



  const faunaSecret = request.headers['fauna-secret'];



  // If there is no header
  if (!faunaSecret) {
    reply.status(401).send();
    return;
  }



  // Add the secret to the request object
  request.faunaSecret = faunaSecret;
});



fastify.decorateRequest('faunaSecret', '');
```



We don't really need to validate the secret. Fauna will return an error if we're using an invalid secret.

秘密を検証する必要はありません。無効なシークレットを使用している場合、Faunaはエラーを返します。

### The route

ルート

Add this to the **index.js** file:

これをindex.jsファイルに追加します。

```
fastify.get('/users/:userId', require('./routes/get-user.js'));
```



Also create the **routes/get-user.js** file with this:

また、次のコマンドを使用してroutes /get-user.jsファイルを作成します。

```
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');



const {Get, Ref, Collection} = faunadb.query;



module.exports = {
  config: {
    isPrivate: true
  },
  schema: {
    params: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: {
          type: 'string',
          pattern: "[0-9]+"
        }
      }
    }
  },
  async handler (request, reply) {



    const userId = request.params.userId;



    const client = new faunadb.Client({
      secret: request.faunaSecret
    });



    try {



        // Get the user document
        const result = await client.query(
            Get(
                Ref(
                    Collection('Users'),
                    userId
                )
            )
        );



        // Return the document
        reply.send(result);



    } catch (error) {
        throw new FaunaError(error);
    }
  }
};
```



We've added the **isPrivate** property in the **config** section of the route to mark this route as private for our hook.

ルートのconfigセクションにisPrivateプロパティを追加して、このルートをフックのプライベートとしてマークしました。

Also note that we're now using the user provided secret to communicate with Fauna (added to the request object in our hook). Our user will now be subjected to the Fauna authorization rules instead of using the omnipotent server secret.

また、ユーザー提供のシークレットを使用してFaunaと通信していることにも注意してください（フックのリクエストオブジェクトに追加されています）。これで、ユーザーは、全能のサーバーシークレットを使用する代わりに、Fauna認証ルールの対象になります。

If you now try this route you will get an error because our user does not have permission to read the Users collection.

このルートを試してみると、ユーザーにはユーザーコレクションを読み取る権限がないため、エラーが発生します。

Let's create a new custom role in Fauna to solve this.

これを解決するために、Faunaで新しいカスタムロールを作成しましょう。

### Setting up authorization in Fauna

Faunaでの承認の設定

It's also possible to configure authorization rules exclusively using the shell and FQL queries, but for this tutorial we will be using the dashboard.

シェルクエリとFQLクエリのみを使用して承認ルールを構成することもできますが、このチュートリアルではダッシュボードを使用します。

Go to the **Security** section of the dashboard, open the **Roles** tab, and click on **New Custom Role**.

ッシュボードの[セキュリティ]セクションに移動し、[役割]タブを開いて、[新しいカスタム役割]をクリックします。

![image12](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/76FGxYaizmsftBIbRORrys/2e8d8a256e962f21b319d7f38f3963a1/image12.png)



Give it the name of **User**, add the **Users** collection, and click on the **Read** permission:

ユーザーの名前を付け、ユーザーコレクションを追加して、読み取り権限をクリックします。

![image2](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7w4X9ZoT79B5m2skwzb96b/1e948832507c5df1cb9985e73bfd2d5a/image2.png)



We also need to tell Fauna who belongs to this role.

また、この役割に属するFaunaにも伝える必要があります。

Go to the **Membership** tab and select the **Users** collection as a member of this role:

[メンバーシップ]タブに移動し、このロールのメンバーとしてユーザーコレクションを選択します。

![image1](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5vfTpEv9iap3wNJX11pjds/885401e2a07fa50db51e9722c02a2f2f/image1.png)



Click save and we're done.

[保存]をクリックすると完了です。

Basically we've told Fauna that anyone logged in with a token based on a document from the **Users** collection can now read any document in the **Users** collection.

基本的に、私たちは、誰でもからの文書に基づいてトークンでログインしていることファウナを言ったユーザー今では、任意のドキュメント読むことができるコレクションユーザーのコレクションを。

You can read the [authorization article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5) I mentioned earlier to understand better how this works.

これがどのように機能するかをよりよく理解するために、前述の承認の記事を読むことができます。

### Testing our route

ルートのテスト

I'm going to use the document id **283319645586326016** of the user I created previously. You can check the id of your users' documents in the **Collections** section of the dashboard.

以前に作成したユーザーのドキュメントID283319645586326016を使用します。ダッシュボードの[コレクション]セクションで、ユーザーのドキュメントのIDを確認できます。

![image13](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5GwAwNj6noCIyxzWToCM4a/2e26c839f92a2e78175154df9cd920f6/image13.png)



Before making the request, be sure to add the user's secret (the one you got after logging in) into a custom **fauna-secret** HTTP header:

リクエストを行う前に、必ずユーザーのシークレット（ログイン後に取得したもの）をカスタムのfauna- secretHTTPヘッダーに追加してください。

![image4](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5GR3sZW4OB5jcA53oWz1Ix/3f1439908f0f3da13ca2c263deffbe7a/image4.png)



Now do a **GET** request to:

次に、GETリクエストを実行します。

```
http://localhost:3000/users/283319645586326016
```



You should get your document back:

ドキュメントを元に戻す必要があります。

```
{
  "ref": {
    "@ref": {
      "id": "283319645586326016",
      "collection": {
        "@ref": {
          "id": "Users",
          "collection": {
            "@ref": {
              "id": "collections"
            }
          }
        }
      }
    }
  },
  "ts": 1606435813770000,
  "data": {
    "username": "pier"
  }
}
```



### Deleting a user

ユーザーの削除

Deleting is very similar to reading a user.

削除は、ユーザーの読み取りと非常によく似ています。

First, we will need to add the **Delete** permission to the User custom role:

まず、ユーザーカスタムロールに削除権限を追加する必要があります。

![image5](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7dIpAOO5aLHnQGeh8r0yc2/4ab489b96b5ccfbeb3e2770745c3aef4/image5.png)



Don't forget to save after modifying the role permissions.

役割の権限を変更した後は、保存することを忘れないでください。

Second, add the route to **index.js** :

次に、ルートをindex.jsに追加します。

```
fastify.delete('/users/:userId', require('./routes/delete-user.js'));
```



Finally create the **routes/delete-user.js** file with this:

最後に、次のコマンドを使用してroutes /delete-user.jsファイルを作成します。

```
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');



const {Delete, Ref, Collection} = faunadb.query;



module.exports = {
  config: {
    isPrivate: true
  },
  async handler (request, reply) {



    const userId = request.params.userId;



    const client = new faunadb.Client({
      secret: request.faunaSecret
    });



    try {



      // Delete the user document
      const resultDelete = await client.query(
        Delete(
          Ref(
            Collection('Users'),
            userId
          )
        )
      );



      // Return the deleted document
      reply.send(resultDelete);



    } catch (error) {
      throw new FaunaError(error);
    }
  }
};
```



To test this, make a **DELETE** request to:

これをテストするには、次の宛先にDELETEリクエストを送信します。

```
http://localhost:3000/users/283319645586326016
```



You should get the deleted document back.

削除したドキュメントを元に戻す必要があります。

An important point to mention is that any authentication tokens based on the deleted document will now be invalid. If you try to use any secret for the deleted user you will get a 401 error.

言及すべき重要な点は、削除されたドキュメントに基づく認証トークンはすべて無効になるということです。削除されたユーザーにシークレットを使用しようとすると、401エラーが発生します。

## Setting up fine-grained permissions

きめ細かい権限の設定

There's one last thing we need to take care of. Our authorization rules are way too permissive and allow any user to read and delete any other user in the **Users** collection. To fix this we're going to set up fine-grained permissions so that a user can only read and delete itself.

最後にもう1つ注意が必要なことがあります。私たちの承認ルールはあまりにも寛容であり、すべてのユーザーがユーザーコレクション内の他のユーザーを読み取って削除することを許可しています。これを修正するために、ユーザーが自分自身を読み取って削除することしかできないように、きめ細かいアクセス許可を設定します。

Go back to your custom role in the dashboard. In the **Privileges** tab open the dropdown of **Users** collection. This will reveal extra options for the permissions on this collection.

ダッシュボードのカスタムロールに戻ります。[権限]タブで、[ユーザー]コレクションのドロップダウンを開きます。これにより、このコレクションの権限に関する追加のオプションが表示されます。

Now click on the **</>** symbol under the **Read** permission which will open a small FQL editor:

次に、読み取り権限の下にある</>記号をクリックすると、小さなFQLエディターが開きます。

![image6](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/aHGgmqzIbGe3saV0FTFGw/208b6c4959868eb5cab909e703c0ef6f/image6.png)



Although you could write very complex FQL logic here, for now simply paste this:

ここに非常に複雑なFQLロジックを記述できますが、今のところはこれを貼り付けるだけです。

```
Lambda("ref", Equals(
  Identity(),
  Var("ref")
))
```



We're defining an anonymous FQL function that will return **true** if the logged in user is the same as the document we want to read. If it isn't, it will return **false** and access will not be granted.

ログインしたユーザーが読みたいドキュメントと同じである場合にtrueを返す匿名のFQL関数を定義しています。そうでない場合はfalseを返し、アクセスは許可されません。

Do the same for the **Delete** permission and click save for the custom role.

削除権限についても同じことを行い、カスタムロールの[保存]をクリックします。

To test this simply log in with a second user and try to read or delete the first user. Your API should now return a **403** error:

これをテストするには、2番目のユーザーでログインし、最初のユーザーの読み取りまたは削除を試みます。APIは403エラーを返すはずです：

```
{
    "statusCode": 403,
    "code": "permission denied",
    "error": "Forbidden",
    "message": "Insufficient privileges to perform the action."
}
```



## Conclusion

結論

If you've made it this far, good job!

あなたがこれまでにそれを成し遂げたならば、良い仕事です！

Here are some articles you could check to keep on learning about Fauna:

Faunaについて学び続けるためにチェックできるいくつかの記事があります：

**Getting started with FQL**

FQL入門

- Part 1: [Fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
- Part 2: [Deep dive into indexes](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
- Part 3: [Modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
- Part 4: [Running custom functions in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
- Part 5: [Authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

パート1：基本的なFaunaの概念
パート2：インデックスの詳細
パート3：Faunaを使用したデータのモデリング
パート4：Faunaでのカスタム関数の実行
パート5：Faunaでの認証と承認

**Core FQL concepts**

FQLのコアコンセプト

- Part 1: [Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- Part 2: [Temporality in Fauna](https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb)
- Part 3: [Data aggregation](https://fauna.com/blog/core-fql-concepts-part-3-data-aggregation)
- Part 4: [Range queries and advanced filtering](https://fauna.com/blog/core-fql-concepts-part-4-range-queries-and-advanced-filtering)
- Part 5: [Joins](https://fauna.com/blog/core-fql-concepts-part-5-joins)

パート1：日付と時刻の操作
パート2：Faunaのテンポラリティ
パート3：データ集約
パート4：範囲クエリと高度なフィルタリング
パート5：参加

Thanks for reading and, as always, if you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)



If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!



## Share this post



[Twitter](https://twitter.com/intent/tweet?url=https://fauna.com/blog/getting-started-with-fauna-and-node-js-using-fastify&text=Getting%20started%20with%20Fauna%20and%20Node.js%20using%20Fastify)[LinkedIn](https://www.linkedin.com/shareArticle/?mini=true&url=https://fauna.com/blog/getting-started-with-fauna-and-node-js-using-fastify&title=Getting%20started%20with%20Fauna%20and%20Node.js%20using%20Fastify&summary=Learn%20how%20to%20build%20a%20small%20API%20that%20illustrates%20how%20to%20use%20Fauna%20in%20Node.js.%20&source=Fauna.com)



## Subscribe to Fauna blogs & newsletter



Get latest blog posts, development tips & tricks, and latest learning material delivered right to your inbox.



<iframe title="subscribe to newsletter form" src="https://www2.fauna.com/l/517431/2020-11-11/71k42s" class="css-1hfzrsj"></iframe>



[<- Back](https://fauna.com/blog)



[](https://fauna.com/)
