Getting started with FQL, Fauna’s native query language - part 5
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5



# Getting started with FQL, Fauna’s native query language - part 5



Pier Bover|Aug 6th, 2020|



Categories:



[Tutorial](https://fauna.com/blog?category=tutorial)



Welcome back, fellow space developer!



-   [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
-   [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
-   [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
-   [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
-   Part 5: a look at authentication and authorization in Fauna



Today, in the final article of this series, we're going to take a look at authentication and authorization in Fauna.



## In this article:



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



## Introduction



Authentication and authorization are commonly implemented in the application layer. Fauna follows a different approach by centralizing those right at the database.



This means that any piece of code can now become a client of your database without having to reimplement authentication or authorization:



-   Mobile apps
-   Server applications
-   Cloud functions
-   Microservices
-   Frontend web apps
-   Desktop apps
-   Etc.



Before we get to the code, let me introduce a couple of core concepts.



## About tokens, keys, and secrets



Fauna is secure by default. To execute queries, you will always need to pass a secret which is associated either with an application key or an access token.



#### **Secrets**



Whenever you instantiate a Fauna client in your application, you will need to use a secret. A secret looks very much like a password:



```
fnADviINFNACBaG5LTgmxtf2fwpdqohworOfFGJ_
```



#### **Application keys**



Like their name implies, application keys are used by your applications. Each key has its own secret and can be used any number of times on multiple applications.



You create keys manually using FQL, or via Fauna's dashboard. Keys do not expire until you manually delete them.



#### **Access tokens**



Tokens are somewhat similar to keys, but are used by users instead of applications. Tokens and their secrets are usually generated for you when authenticating successfully with Fauna, so a single user could use multiple secrets in different devices simultaneously.



Tokens can be deleted manually, or upon logging a user out. It's also possible to define an optional time-to-live setting to determine how long a token will be valid.



## Introduction to roles and privileges



Fauna features a fine-grained authorization system based on attributes, also known as [ABAC](https://docs.fauna.com/fauna/current/security/abac).



#### **Custom roles and privileges**



Roles grant privileges to keys and tokens to access resources in the database. The most important types of resources that you can grant access to are:



-   Collections
-   Indexes
-   User-defined functions (UDFs in short)



These privileges can range from _"this role can read and delete any document of this collection"_ to more sophisticated behaviors such as _"this role can modify this document if the logged in user is its author"_.



#### **Server role**



All Fauna databases include a special server role that can access all resources. Beware: if you're using a key with this role, you should store its secret safely and never commit it to your GIT repository.



![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6ugrxCGmR64zsHQGzuw8S2/64b86d39c7314af8054843e2257bb5f0/8608-FQL-part5-1.png)



## Creating a server key



As explained before, if you're accessing Fauna from a server-side environment, you will need an application key and its secret.



The easiest way to create keys is from the security tab in Fauna's dashboard:



Select the **Server** role in the dropdown which will grant this key access to everything in the database.



Finally, click **SAVE**:



![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/64e0LvRq0nhYFBmLsioMPv/25939914898e021355f44c262db78190/8609-FQL-part5-2.png)



After creating your key, Fauna will show you its secret, which you'll use in your code. Don't forget to store it somewhere safe. It will never be displayed again.



![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6bS1deLySKHjoUJYbnfL2A/75100457b326d114f2c99bb6447d597b/8610-FQL-part5-3.png)



You can also create keys with FQL using the [CreateKey](https://docs.fauna.com/fauna/current/api/fql/functions/createkey) function:



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



If you're accessing Fauna from a client-side environment (e.g., frontend web app), you should never use a key with a server role. Anyone would be able to read the key from your JavaScript code and gain full access to the database.



Again, **don't use server keys in your frontend web app**.



That said, it's certainly possible to query Fauna directly from your frontend apps or mobile apps by creating keys with custom roles. Depending on the security features you desire, you could go with a frontend-only approach and move the authentication flow server-side. The Fauna team is currently working on guidance on the best security practices regarding different authentication scenarios.



For simplicity's sake, from now on we're just going to assume short-lived access tokens are generated server-side. These tokens could then be used from any type of application.



## Basics of authentication



Let's see how to solve one of the most common authentication scenarios: logging in a user with an email and a password.



Before we get into the details, let's create a new collection for our users:



```javascript
CreateCollection({name: "SpaceUsers"})
```



#### **Where to store the password?**



You might be tempted to store a hashed password in the user document like you've probably done with other databases:



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



Ok, so where do we store the password, and how do we use it?



I mentioned earlier that access tokens are used by users. The way to tell Fauna that an entity (such as a user document) _"has a password"_ is by adding a credentials object to the metadata of a document.



With this in mind, let's create our first user:



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



It really doesn't matter _where_ these credentials are stored. All the encryption and verification of passwords is solved for you when using Fauna's authentication system.



#### **Logging in**



Since credentials are associated with documents, we will need to find a user's document in the **SpaceUsers** collection to be able to log them in.



Let's create an index to do just that, and make sure there can only be one user for each email address by setting **unique** to **true**:



```javascript
CreateIndex({
  name: "SpaceUsers_by_email",
  source: Collection("SpaceUsers"),
  terms: [{field: ["data", "email"]}],
  unique: true
})
```



Now, we can use the [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) function in combination with the **SpaceUsers\_by\_email** index.



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



If everything is ok, a new access token will be created and returned to us with a secret we can use in our application.



Obviously, if the credentials are wrong, Fauna will return an error:



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



Let's see how we'd actually authenticate our users in a server-side JavaScript application. The approach should be very similar if you're using Fauna with [other programming languages](https://docs.fauna.com/fauna/current/drivers/).



First, we'd need to import Fauna's driver and define a couple of constants:



```javascript
const faunadb = require('faunadb');
const q = faunadb.query;
const SERVER_SECRET = "BQOyQyF20AITt7nMIqW1XzW...";
```



We're hardcoding the secret here for simplicity's sake. Even in a server-side project, you should get the secret from an environment config and avoid committing it to Git with your code.



Then, we instantiate our client using the secret from our server key:



```javascript
const client = new faunadb.Client({
  secret: SERVER_SECRET
});
```



Finally, here's an example of an authentication function:



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



```javascript
{
  ref: Ref(Ref("tokens"), "269174603208720901"),
  ts: 1592963755720000,
  instance: Ref(Collection("SpaceUsers"), "269170966886613509"),
  secret: "fnEDvEzgHtACBQOyQyF20AITt7nMIqW1XzWCqykziZa53WyVm8E"
}
```



Now that we have a token for our user, we should be using its secret for any subsequent queries to Fauna on behalf of our user.



You have many options for storing the secret. Here are some examples:



-   **Pure client-side:** If you intend on accessing Fauna client-side you could send the secret back to the client and store it in memory.
-   **Partial backend with cookie:** If you're working on a server API you could store the secret in a session and send it back to the client using a secure cookie.
-   **Partial backend with httpOnly cookie:** You could also combine the above two approaches by creating two types of tokens in Fauna. One that could be used as a refresh token and stored in an httpOnly cookie, and another short-lived one that could be used and stored in the frontend.
-   **Full blown backend:** You could also decide you never want your clients receiving the secret and store the session in some cache and send back just a session id.



These examples have very different security implications which are far too vast and complex to discuss in this introductory article. You will have to decide carefully how you want to manage secrets for your particular use case.



#### **Logging out**



To log out, we use the [Logout](https://docs.fauna.com/fauna/current/api/fql/functions/logout) function which will destroy the token we created when logging in.



This could be our logout function:



```javascript
async function logout (deleteAllTokens = false) {
  return await client.query(q.Logout(deleteAllTokens));
}
```



Note that we don't need to pass any reference to the token since we instantiated the client with a token's secret.



**Logout** takes a single boolean parameter to determine if all the tokens associated with a user should be deleted or only the one being used with the current secret. If we had used **q.Logout(true)** our user Darth would now be logged out from all his devices. Take that, evil Sith lord!



Also note that **Logout** is actually a convenience function. You could also delete tokens manually with a reference to the token's document:



```javascript
Delete(Ref(Ref("tokens"), "269174603208720901"))
```



#### **Advanced authentication**



You can keep using Fauna's authentication system even for custom scenarios without having to roll your own system from scratch.



For example, you can create your own tokens with:



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



-   [Identify](https://docs.fauna.com/fauna/current/api/fql/functions/identify) to check if a password is valid against a document's credentials.
-   [HasIdentity](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity) to check if a current Fauna client is associated with a document or not.



## Your first custom role



Our users can now log in, but they can't access any resource in our database. We need to create a role to give them access to collections, indexes, etc.



Keep in mind that you can also manage roles from the dashboard. If you go to the security tab and click on **Manage Roles**, you'll find the roles section:



![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/42MmINkwJC30qm8dNmJgeB/a26c712916e2fe75a273faec55eb894e/8611-FQL-part5-4.png)



Let's start with something simple. We'll just create a **User** role with a single privilege:



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



We've also granted a single read-only privilege on any document from the **Spaceships** collection. Check the docs for [the complete list of actions](https://docs.fauna.com/fauna/current/security/roles#actions) we can use to define privileges.



Darth will now be able to retrieve any **Spaceships** document, but he won't be able to create new documents in that collection or modify existing ones.



He won't be able to use any indexes either, but he will be able to use **Get** to retrieve a specific spaceship document and also list all spaceship documents using the [Documents](https://docs.fauna.com/fauna/current/api/fql/documents) function we saw in previous articles:



```javascript
Map(
  Paginate(Documents(Collection("Spaceships"))),
  Lambda("ref", Get(Var("ref")))
)
```



#### **Updating roles**



Let's update the role with another privilege by using **Update**. Remember that we need to pass all privileges, including the ones we had previously set, because **Update** will replace the entire array.



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



## Fine-grained privileges



It's also possible to create custom behaviors for privileges instead of simply using **true** or **false**.



For example, we might want Darth to be able to access his own **SpaceUsers** document, but we certainly don't want him poking around all users' documents to obtain their email addresses and spam them to join his empire.



We do that by using a **Lambda** to define any type of behavior we might need:



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
-   Whenever a **SpaceUsers** document is accessed, Fauna will trigger the **Lambda** and pass a reference of the document it's checking. Access will be granted only if that **Lambda** returns **true**.
-   [Identity](https://docs.fauna.com/fauna/current/api/fql/functions/identity) will return a reference to the document associated with the current token in use. In our example, it would return the document in the **SpaceUsers** collection for the current logged in user.
-   [Equals](https://docs.fauna.com/fauna/current/api/fql/functions/equals) will return **true** or **false** when comparing the reference returned by **Identity** to the reference of the document we're trying to read.



In plain English: _"if the document in_ **_SpaceUsers_** _is the same as the document we've logged in with, return true, otherwise return false"_.



To test this, let's create a new user:



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



Just as we can use **Lambda** to define custom behaviors to check if a role can do something, we can also create fine-grained memberships and determine which documents on a collection are members of a role.



Let's create a new user to test this:



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



Let’s look at the membership predicate function:



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
-   **Select** will return the value of **isPilot** from the document. If the path **"data","isPilot"** doesn't exist in the document, it will return **false**.



In plain English: _"if the document in_ **_SpaceUsers_** _contains_ **_isPilot_** _and is set to_ **_true_**_, the logged in user will be able to create documents in the_ **_SpaceShips_** _collection_**_“._**



As expected, if we try to create a new ship with Darth's token, we will get an error because the **User** role doesn't have that privilege:



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



We can grant privileges on UDFs just as we can on collections and indexes.



Let's create a simple function that opens the hatch of a spaceship and also writes an entry to the log:



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



1.  Receive a reference to a ship
2.  Modify the ship's document and set **hatchIsOpen** to **true**.
3.  Create a new document in the **ShipLogs** collection.
4.  Return **"Hatch open!"** at the end.



If this function is unclear, I recommend going back to [part 4](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4) where we go through functions and transactions.



We'd call this function by simply passing a reference of the spaceship:



```javascript
Call(
  Function("OpenHatch"),
  Ref(Collection("Spaceships"), "266356873589948946")
)
```



Now, let's update the privileges to our **Pilot** role:



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



The problem is that by setting **call** to **true,** any pilot would be able to open any hatch of any ship. They could open the hatch of another spaceship by mistake while warping through a wormhole and break the space-time continuum!



That's not good. Let's make sure pilots can only open the hatch of their own ships.



First, let's assign Han to his spaceship:



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



If we test this using Han's token on the Falcon:



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



With this article, we've finally reached the end of the series. What an adventure. We've travelled through the galaxy, worked with famous pilots, created spaceships, feeded futuristic holographic UIs with data… and hopefully, also learned some FQL along the way!



We've gone through many common scenarios and problems, but if you ever get stuck you can always get help from [Fauna's community](https://community.fauna.com/).



Don't forget you can also hit me up on Twitter: [@pierb](https://twitter.com/PierB)



Farewell, fellow space developer!