Getting started with Fauna and Node.js using Fastify | by Fauna Inc | Fauna | Medium
https://medium.com/fauna/fauna-getting-started-with-fauna-and-node-js-using-fastify-36aa51bee782

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

## First steps

To get started, create a folder for your project and access it from your terminal. Then initialize NPM with this command:

```
npm init -y
```

This should create a **package.json** file in your project folder which we can ignore for now.

Next, we're going to install our first dependencies:

```
npm install fastify faunadb
```

Finally, create an **index.js** in your project folder file with this:

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

```
node index.js
```

You should see something similar to this:

```
{"level":30,"time":1606320862585,"pid":35600,"hostname":"Pier.local","msg":"Server listening at http://127.0.0.1:3000"}
{"level":30,"time":1606320862585,"pid":35600,"hostname":"Pier.local","msg":"server listening on 3000"}
```

You can stop the server at any time with **Control + C** in your terminal.

## Initializing Fauna

After you've [created a free Fauna account](https://dashboard.fauna.com/accounts/register) and logged into the dashboard, you're ready to create a new database.

![image3](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6PKTJWr3GeXxGrTIi7AJjT/64dfbf8081b0f982837b627e90e342ba/image3.png)

I will be using **NODEJS_TUTORIAL** but you can use any name you prefer:

![image9](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3BGejDtBhodpsADwxRhgeq/0d349e91809641791c61e2c9aef5fbef/image9.png)

### Creating a server key

To be able to access our database from our code we need to create a server access key.

Go to the security section of the dashboard and create a new key. In the settings give it a role of **Server**:

![image10](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/bC0sbs45FK70vMSAsv13o/acfbf027ae5841e594d47df3ff1eac93/image10.png)

After creating this key you'll see the key's secret. This is what you'll use to access Fauna from Node. Store it somewhere safe as Fauna will never show it to you again.

![image11](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3ZiQYYmR4mXpiLJ8q580EA/951fcc2d298adcc5c906968e942f6a0f/image11.png)

## Preparing our data

We're now ready to execute our first FQL queries to create our first collection and index. To do this, we're going to use the shell right from the dashboard:

![image8](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5ELpcLagrJi2otJpPE0t3v/f475490deaecb12f1d706938c80dfb02/image8.png)

First, we need a collection to store the documents for our users. To create the Users collection, run this query in the shell:

```
CreateCollection({
  name: "Users"
})
```

Next, we need an index that will allow us to ensure unique usernames:

```
CreateIndex({
  name: "Users_by_username",
  source: Collection("Users"),
  terms: [{field: ["data", "username"]}],
  unique: true
})
```

We're good for now. Let's go back to our code.

## Installing Nodemon and Dotenv

Before continuing to work on our API, let's install [Nodemon](https://github.com/remy/nodemon) and [dotenv](https://github.com/motdotla/dotenv) in our development dependencies:

```
npm install nodemon dotenv --save-dev
```

Nodemon will automatically restart our server whenever we make any changes to our JavaScript code.

Dotenv will allow us to inject environment variables into our server from a .env text file. Sensitive data such as API keys should never be hardcoded into our code or pushed to a Git repository.

Create a **.env** file in your project folder with this format:

```
FAUNA_SERVER_SECRET=fnAD7ngvMYACDdHcIxfu2Fcb43-VFFC_McFja-XV
```

Obviously, use the secret you obtained when creating a server key.

The variables we define in our .env file will be available as environment variables in our code. For example, to access our server secret we will use:

```
process.env.FAUNA_SERVER_SECRET
```

To prevent the .env file and node_modules folder to be pushed to our Git repository, create a .gitignore file with this:

```
.env
node_modules
```

Let's now add a new script into our **package.json**:

```
"scripts": {
  "dev": "nodemon -r dotenv/config index.js"
},
```

We now only need to use this command to start our server with Nodemon and dotenv:

```
npm run dev
```

## Creating a custom error class

Before we start working on our server routes, we need to be prepared to receive errors from Fauna. For this, we will create a custom **FaunaError** class that can be easily integrated into Fastify's error handling flow.

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

## Creating users

Let's create our first Fastify route which will allow us to create users.

Don't forget to use the command we previously created to start our server:

```
npm run dev
```

First we need to add this line in our index.js file before actually starting our server:

```
fastify.post('/users', require('./routes/create-user.js'));
```

See the [index.js file in the repository](https://github.com/PierBover/getting-started-fauna-nodejs/blob/main/index.js#L5) for the exact location.

Now create the file **routes/create-user.js** in your project folder with this code:

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

Once our users have logged in, we will be using their own secret to execute queries. A user will only be able to perform the actions we have allowed in our authorization rules. More on this later.

Note that unlike other database clients, we are going to instantiate a new client on every request. We can safely do that because each query is simply an HTTP request, and the Fauna client is a very lightweight wrapper on top of the HTTP engine.

If for any reason Fauna returned an error, we'd only need to catch it and throw a new instance of our FaunaError class. Fastify will take care of the rest.

To test this route we can use any HTTP client. I will be using Postman (which you can [download here](https://www.postman.com/downloads/)) but you can use whatever you're most comfortable with (eg: cURL, Insomnia, etc).

Let's make a **POST** request to:

```
http://localhost:3000/users
```

With this body:

```
{
  "username": "pier",
  "password": "supersecretpassword"
}
```

Don't forget to add the **Content-Type** header:

![image7](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/467NwIXPXYX4VUdGlGC0mN/e38c777dfbcb36421585f91eb5735241/image7.png)

If everything worked as expected, in the response's body there should be a JSON representation of the document we just created in the **Users** collection:

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

You could also try to create the same user twice and see how a Fauna error is returned. Our **Users_by_username** index will not allow two documents with the same **username**.

## Authenticating users

Let's now create an endpoint to authenticate our users. First add this to the index.js file:

```
fastify.post('/login', require('./routes/login.js'));
```

Also create the file **routes/login.js** with this:

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

Let's try this out by making a **POST** request to:

```
http://localhost:3000/login
```

With this body:

```
{
  "username": "pier",
  "password": "supersecretpassword"
}
```

Our API should return this response with the user's secret:

```
{
  "secret": "fnED7o254PACAAPuFGfOAAIDnuZTNlU5Z7dD3LdjPKycDCyUkeI"
}
```

At this point, our client should store the secret somewhere and use it to make further requests to our API. We'll see how this works in the next route.

Beware, for simplicity's sake we're using a very basic form of authentication. You should decide very carefully which authentication strategy will work better for your use case and always use HTTPS when interacting with your servers.

## Retrieving a user

Let's now create an endpoint to be able to read a single user. Unlike the previous routes, this is going to be a private route.

### Private hook

The best way to solve private routes in Fastify is using a hook. Hooks are custom bits of code that can be triggered at certain points in the request/response flow. Check the [Fastify docs](https://www.fastify.io/docs/latest/Hooks/) for more info on how to use them.

Our hook will check for the presence of a **fauna-secret** header on the routes we've marked as private. We also need to create a [decorator](https://www.fastify.io/docs/latest/Decorators/) to let Fastify know we will be modifying the request object.

Add this to our **index.js** file:

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

### The route

Add this to the **index.js** file:

```
fastify.get('/users/:userId', require('./routes/get-user.js'));
```

Also create the **routes/get-user.js** file with this:

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

Also note that we're now using the user provided secret to communicate with Fauna (added to the request object in our hook). Our user will now be subjected to the Fauna authorization rules instead of using the omnipotent server secret.

If you now try this route you will get an error because our user does not have permission to read the Users collection.

Let's create a new custom role in Fauna to solve this.

### Setting up authorization in Fauna

It's also possible to configure authorization rules exclusively using the shell and FQL queries, but for this tutorial we will be using the dashboard.

Go to the **Security** section of the dashboard, open the **Roles** tab, and click on **New Custom Role**.

![image12](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/76FGxYaizmsftBIbRORrys/2e8d8a256e962f21b319d7f38f3963a1/image12.png)

Give it the name of **User**, add the **Users** collection, and click on the **Read** permission:

![image2](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7w4X9ZoT79B5m2skwzb96b/1e948832507c5df1cb9985e73bfd2d5a/image2.png)

We also need to tell Fauna who belongs to this role.

Go to the **Membership** tab and select the **Users** collection as a member of this role:

![image1](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5vfTpEv9iap3wNJX11pjds/885401e2a07fa50db51e9722c02a2f2f/image1.png)

Click save and we're done.

Basically we've told Fauna that anyone logged in with a token based on a document from the **Users** collection can now read any document in the **Users** collection.

You can read the [authorization article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5) I mentioned earlier to understand better how this works.

### Testing our route

I'm going to use the document id **283319645586326016** of the user I created previously. You can check the id of your users' documents in the **Collections** section of the dashboard.

![image13](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5GwAwNj6noCIyxzWToCM4a/2e26c839f92a2e78175154df9cd920f6/image13.png)

Before making the request, be sure to add the user's secret (the one you got after logging in) into a custom **fauna-secret** HTTP header:

![image4](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5GR3sZW4OB5jcA53oWz1Ix/3f1439908f0f3da13ca2c263deffbe7a/image4.png)

Now do a **GET** request to:

```
http://localhost:3000/users/283319645586326016
```

You should get your document back:

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

Deleting is very similar to reading a user.

First, we will need to add the **Delete** permission to the User custom role:

![image5](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7dIpAOO5aLHnQGeh8r0yc2/4ab489b96b5ccfbeb3e2770745c3aef4/image5.png)

Don't forget to save after modifying the role permissions.

Second, add the route to **index.js** :

```
fastify.delete('/users/:userId', require('./routes/delete-user.js'));
```

Finally create the **routes/delete-user.js** file with this:

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

```
http://localhost:3000/users/283319645586326016
```

You should get the deleted document back.

An important point to mention is that any authentication tokens based on the deleted document will now be invalid. If you try to use any secret for the deleted user you will get a 401 error.

## Setting up fine-grained permissions

There's one last thing we need to take care of. Our authorization rules are way too permissive and allow any user to read and delete any other user in the **Users** collection. To fix this we're going to set up fine-grained permissions so that a user can only read and delete itself.

Go back to your custom role in the dashboard. In the **Privileges** tab open the dropdown of **Users** collection. This will reveal extra options for the permissions on this collection.

Now click on the **</>** symbol under the **Read** permission which will open a small FQL editor:

![image6](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/aHGgmqzIbGe3saV0FTFGw/208b6c4959868eb5cab909e703c0ef6f/image6.png)

Although you could write very complex FQL logic here, for now simply paste this:

```
Lambda("ref", Equals(
  Identity(),
  Var("ref")
))
```

We're defining an anonymous FQL function that will return **true** if the logged in user is the same as the document we want to read. If it isn't, it will return **false** and access will not be granted.

Do the same for the **Delete** permission and click save for the custom role.

To test this simply log in with a second user and try to read or delete the first user. Your API should now return a **403** error:

```
{
    "statusCode": 403,
    "code": "permission denied",
    "error": "Forbidden",
    "message": "Insufficient privileges to perform the action."
}
```

## Conclusion

If you've made it this far, good job!

Here are some articles you could check to keep on learning about Fauna:

**Getting started with FQL**

- Part 1: [Fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
- Part 2: [Deep dive into indexes](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
- Part 3: [Modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
- Part 4: [Running custom functions in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
- Part 5: [Authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

**Core FQL concepts**

- Part 1: [Working with dates and times](https://fauna.com/blog/core-fql-concepts-part-1-working-with-dates-and-times)
- Part 2: [Temporality in Fauna](https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb)
- Part 3: [Data aggregation](https://fauna.com/blog/core-fql-concepts-part-3-data-aggregation)
- Part 4: [Range queries and advanced filtering](https://fauna.com/blog/core-fql-concepts-part-4-range-queries-and-advanced-filtering)
- Part 5: [Joins](https://fauna.com/blog/core-fql-concepts-part-5-joins)

Thanks for reading and, as always, if you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!

## Share this post

[Twitter](https://twitter.com/intent/tweet?url=https://fauna.com/blog/getting-started-with-fauna-and-node-js-using-fastify&text=Getting%20started%20with%20Fauna%20and%20Node.js%20using%20Fastify)[LinkedIn](https://www.linkedin.com/shareArticle/?mini=true&url=https://fauna.com/blog/getting-started-with-fauna-and-node-js-using-fastify&title=Getting%20started%20with%20Fauna%20and%20Node.js%20using%20Fastify&summary=Learn%20how%20to%20build%20a%20small%20API%20that%20illustrates%20how%20to%20use%20Fauna%20in%20Node.js.%20&source=Fauna.com)

## Subscribe to Fauna blogs & newsletter

Get latest blog posts, development tips & tricks, and latest learning material delivered right to your inbox.

<iframe title="subscribe to newsletter form" src="https://www2.fauna.com/l/517431/2020-11-11/71k42s" class="css-1hfzrsj"></iframe>

[<- Back](https://fauna.com/blog)

[](https://fauna.com/)
