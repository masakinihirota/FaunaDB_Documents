Getting started with FQL, Fauna’s native query language - part 4
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4

# Getting started with FQL, Fauna’s native query language - part 4

Pier Bover|Jul 28th, 2020|

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Welcome back, fellow space developer! We will continue our FQL space journey in this five-part series of articles.

-   [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
-   [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
-   [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
-   Part 4: a look at how to create custom functions that run straight in Fauna
-   [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

Today, we're going to take a look at how to create custom functions that run straight in Fauna.

## In this article:

-   Introduction
-   Why use UDFs?
-   Your first function
-   Creating transactions with Do
-   Aborting functions and transactions
-   Warping across the galaxy
-   Data aggregation

## Introduction

We've seen in previous articles of this series that FQL is much closer to a functional programming language than other querying languages like SQL or GraphQL.

Much like in any programming language, FQL also allows you to craft complex behaviors by creating functions. We've already seen multiple examples of anonymous functions using [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) in your FQL queries. It's also possible to encapsulate these custom behaviors into the database by creating user-defined functions (UDFs in short) that can be invoked from your queries or even from other UDFs.

UDFs are somewhat similar to stored procedures found in other databases. Of course, the implementation and capabilities of UDFs in Fauna will be very different because of the unique nature of FQL. For example, it's common to use stored procedures to group SQL queries, or to reduce the results sent to the database clients. You wouldn't really need to use an UDF in those situations since these can be accomplished in a regular FQL query executed from the application.

## Why use UDFs?

I mean, other than because UDFs are super cool, there are a couple of reasons why you'd want to move logic into the database.

#### **Avoid code duplication**

If you have multiple clients (web, API, mobile, desktop, microservices) written in multiple programming languages, you will probably want to avoid maintaining different versions of the same business logic. By moving some of that logic to the database, you can avoid code duplication, and thus all the effort and confusion that code duplication usually causes.

#### **Abstraction and decoupling of processes**

As applications grow, you often need to abstract processes and their underlying data. This can be easily accomplished with UDFs. As an added benefit, the process is now decoupled from the rest of your logic. An outdated version of your application (e.g. web or mobile) could keep interacting with Fauna without knowing that an UDF has, in fact, been updated multiple times.

#### **Consistency guarantees**

By having a single version of some business logic running as close to the database as possible, you will ensure your data is consistent. FQL is very expressive which will make this task easier compared to traditional stored procedures written in SQL.

## Your first function

We'll start with a very simple function just to see the basics.

Here's the latest version of our spaceship document from the previous articles:

```javascript
{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1592255653240000,
  "data": {
    "name": "Voyager",
    "pilot": Ref(Collection("Pilots"), "266350546751848978"),
    "type": "Rocket",
    "fuelType": "Plasma",
    "actualFuelTons": 7,
    "maxFuelTons": 10,
    "maxCargoTons": 25,
    "maxPassengers": 5,
    "maxRangeLightyears": 10,
    "celestialPosition": {
      "x": 2234,
      "y": 3453,
      "z": 9805
    },
    "code": "VOYAGER",
    "colors": [
      "RED",
      "YELLOW"
    ]
  }
}
```

With this in mind, let's create a function that receives an id and returns an object:

```javascript
CreateFunction({
  name: "GetSpaceship",
  body: Query(
    Lambda("shipId",
      Let(
        {
          shipDoc: Get(Ref(Collection("Spaceships"),Var("shipId")))
        },
        {
          id: Select(["ref","id"], Var("shipDoc")),
          name: Select(["data","name"], Var("shipDoc"))
        }
      )
  ))
})
```

If you've been following along with this series, there shouldn't be much of a mystery. We've previously covered [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda), [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let), [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select), and [Var](https://docs.fauna.com/fauna/current/api/fql/functions/var) with detail.

As expected, [CreateFunction](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) creates a new function with the specified name and body.

We need to use the [Query](https://docs.fauna.com/fauna/current/api/fql/functions/query) function because we want to define a Lambda that will be executed later, not actually execute the Lambda when creating the function.

This how we'd call the function:

```javascript
Call(Function("GetSpaceship"), "266356873589948946")

// Result:

{
  id: "266356873589948946",
  name: "Voyager"
}
```

Of course you could also use this function anywhere in your FQL queries.

Here's an example on how you could use it in combination with a list of results:

```javascript
Map(
  Paginate(Documents(Collection("Spaceships"))),
  Lambda(
    "shipRef",
    Call(Function("GetSpaceship"), Select(["id"], Var("shipRef")))
  )
)

// Result:

{
  data: [
    {
      id: "266356873589948946",
      name: "Voyager"
    },
    {
      id: "266619264914424339",
      name: "Explorer IV"
    },
    {
      id: "267096263925694994",
      name: "Destroyer"
    },
    // etc...
  ]
}
```

_**Quick tip:** the [Documents](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function allows you to retrieve a list of references from all the documents in a collection without having to set up an index._

## Creating transactions with Do

Unlike many NoSQL databases, Fauna supports ACID transactions. This essentially means that it guarantees the validity of a transaction no matter what: power failure, server crash, gremlins, alien attack... Ok, maybe not in the case of an alien attack, but you get the idea.

Actually, transactions in Fauna are ACIDD (not an actual technical term) as they are also Distributed worldwide to all Fauna clusters.

#### **The Do command**

The [Do](https://docs.fauna.com/fauna/current/api/fql/functions/do) command executes a list of FQL expressions sequentially to form a transaction. Changes committed to the database in each of the expressions are immediately available to the following expressions.

To verify this, let's create a new collection first:

```javascript
CreateCollection({name: "LaserColors"})
```

And then:

```javascript
Do(
  // first create a document
  Create(Ref(Collection("LaserColors"), "123456"), {
    data: {
      name: "Pink"
    }
  }),
  // then update that same document
  Update(Ref(Collection("LaserColors"), "123456"), {
    data: {
      hex: "#ff5c9e"
    }
  })
)

// Result:

{
  ref: Ref(Collection("LaserColors"), "123456"),
  ts: 1592364971590000,
  data: {
    name: "Pink",
    hex: "#ff5c9e"
  }
}
```

As you can see, the document created in the first expression is immediately available.

The **Do** command returns whatever the last command in the sequence returned, so we get the full document with the updated data.

## Aborting functions and transactions

Obviously, whenever something fails, Fauna will let you know about it. You can also define when and how you want a transaction or a function to fail. In Fauna this is done using the [Abort](https://docs.fauna.com/fauna/current/api/fql/functions/abort) function.

Let's create a simple example:

```javascript
Do(
  "Step 1",
  "Step 2",
  Abort("You shall not pass!"),
  "Step 3"
)

// Result:

error: transaction aborted
You shall not pass!
position: ["do",2]
```

Now, if you were executing this (rather useless) query in your application, you'd be getting an exception.

In JavaScript for example:

```javascript
try {
  const result = await client.query(
    q.Do(
      "Step 1",
      "Step 2",
      q.Abort("You shall not pass!"),
      "Step 3"
    )
  );
} catch (error) {
  // do something with the error      
}
```

As expected, this applies to UDFs too:

```javascript
CreateFunction({
  name: "StopIt",
  body: Query(
    Lambda("bool",
      If(
        Var("bool"),
        Abort("Stopped!"),
        "Not stopped!"
      )
    )
  )
})
```

If we pass **true** to the UDF, the execution of the function will be aborted and an exception will be raised:

```javascript
Call(Function("StopIt"), true)

// Result:

Error: [
  {
    "position": [],
    "code": "call error",
    "description": "Calling the function resulted in an error.",
    "cause": [
      {
        "position": [
          "expr",
          "then"
        ],
        "code": "transaction aborted",
        "description": "Stopped!"
      }
    ]
  }
]
```

## Warping across the galaxy

Let's go through a more complex example to give you a better idea on how these concepts work together. We're going to create a **WarpToPlanet** function to propel our ships to infinity and beyond.

#### **Step 1: Check if we have enough fuel**

I have to admit that my celestial navigation math is a bit rusty, especially if wormholes are involved, so we're just going to assume that a spaceship needs **5** tons of fuel to warp anywhere in the galaxy.

To know how much fuel a ship has left, we can use this property:

```javascript
"actualFuelTons": 7
```

Let's make a function that returns **true** if there is enough fuel to create a wormhole and travel through it:

```javascript
CreateFunction({
  name: "HasEnoughFuelToWarp",
  body: Query(
    Lambda("shipRef",
      Let(
        {
          shipDoc: Get(Var("shipRef")),
          actualFuelTons: Select(["data","actualFuelTons"], Var("shipDoc"))
        },
        GTE(Var("actualFuelTons"), 5)
      )
  ))
})
```

This is a very straightforward Lambda:

-   First, we prepare the Let bindings that we need. In this case, we get the document and extract the **actualFuelTons** property from the document.
-   Second, we check that the **actualFuelTons** is greater than or equal to **5**

To test it out, we only need to use a reference to our Voyager ship (which we know has **7** tons of fuel available):

```javascript
Call(
  Function("HasEnoughFuelToWarp"),
  Ref(Collection("Spaceships"), "266356873589948946")
)

// Result:

true
```

#### **Step 2: Open the wormhole and warp**

Now, let's create a simple function to enable lightspeed on the ship by simply updating a bit of data on its document:

```javascript
CreateFunction({
  name: "OpenWormholeAndWarp",
  body: Query(
    Lambda("shipRef",
      Update(
        Var("shipRef"),
        Let({
          shipDoc: Get(Var("shipRef")),
          actualFuelTons: Select(["data","actualFuelTons"], Var("shipDoc"))
        }, {
          data:{
            actualFuelTons: Subtract(Var("actualFuelTons"), 5)
          }
        })
      )
    )
  )
})
```

Easy, right? We're just subtracting 5 from the **actualFuelTons** using the [Subtract](https://docs.fauna.com/fauna/current/api/fql/functions/subtract) function.

Let's test this out on our Destroyer ship which currently has **11** tons of fuel:

```javascript
{
  "ref": Ref(Collection("Spaceships"), "267096263925694994"),
  "ts": 1592513359750000,
  "data": {
    "name": "Destroyer",
    "actualFuelTons": 11
    // etc...
  }
}
```

To invoke the function, we just need a reference to the document of the ship:

```javascript
Call(
  Function("OpenWormholeAndWarp"),
  Ref(Collection("Spaceships"), "267096263925694994")
)

// Result:

{
  ref: Ref(Collection("Spaceships"), "267096263925694994"),
  ts: 1592513503470000,
  data: {
    name: "Destroyer",
    actualFuelTons: 6,
    // etc...
}
```

As expected, Destroyer now has **6** tons of fuel left.

#### **Step 3: Write to the ship's log**

The admiral wouldn't be too happy if we didn't keep a log of what's going on with our ships. We'll create a function that creates a new log entry whenever a ship warps to a new planet.

First, we need a collection to store our logs:

```javascript
CreateCollection({name: "ShipLogs"})
```

And a function to create a new document in that collection:

```javascript
CreateFunction({
  name: "CreateLogEntry",
  body: Query(
    Lambda(["shipRef","planetRef","status"],
      Create(
        Collection("ShipLogs"),
        {
          data: {
            shipRef: Var("shipRef"),
            planetRef: Var("planetRef"),
            status: Var("status")
          }
        }
      )
    )
  )
})
```

#### **Step 4: All together now**

For our last step, let's see how to combine all these functions to create the super ultimate **WarpToPlanet** function:

```javascript
CreateFunction({
  name: "WarpToPlanet",
  body: Query(
    Lambda(["shipRef","planetRef"],
      If(
        Call(Function("HasEnoughFuelToWarp"), Var("shipRef")),
        Do(
          Call(Function("OpenWormholeAndWarp"), Var("shipRef")),
          Call(
            Function("CreateLogEntry"),
            [Var("shipRef"), Var("planetRef"), "WARPED_TO_PLANET"]
          ),
          Let(
            {
              planetDoc: Get(Var("planetRef")),
              planetName: Select(["data","name"],Var("planetDoc")),
              shipDoc: Get(Var("shipRef")),
              shipName: Select(["data","name"],Var("shipDoc")),
            },
            Concat(["Welcome ",Var("shipName")," to ",Var("planetName")])
          )
        ),
       Abort("Not enough fuel!")
      )
    )
  )
})
```

Let's break this down:

-   [If](https://docs.fauna.com/fauna/current/api/fql/functions/if) will evaluate the result of the **HasEnoughFuelToWarp** function. If it returns true, it will execute the **Do** statement. If it returns false, if it will execute the **Abort** function.
-   [Do](https://docs.fauna.com/fauna/current/api/fql/functions/do) is executing a transaction, like we saw earlier.
-   The last expression of the transaction produces a welcome message when a ship arrives on a planet.

Finally, let's test all our hard work!

Let's warp with Voyager to planet Vulkan:

```javascript
Call(
  Function("WarpToPlanet"),
  [
    Ref(Collection("Spaceships"), "266356873589948946"),
    Ref(Collection("Planets"), "268706982578356743"),
  ]
)

// Result:

Welcome Voyager to Vulkan
```

Bravo!

If we check our ship document, we can see the it only has **2** tons of fuel left:

```javascript
{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1592518256580000,
  "data": {
    "name": "Voyager",
    "actualFuelTons": 2,
    // etc...
}
```

And there's also a new document in the **ShipLogs** collection:

```javascript
{
  "ref": Ref(Collection("ShipLogs"), "268707463485719047"),
  "ts": 1592518256580000,
  "data": {
    "shipRef": Ref(Collection("Spaceships"), "266356873589948946"),
    "planetRef": Ref(Collection("Planets"), "268706982578356743"),
    "status": "WARPED_TO_PLANET"
  }
}
```

Honestly, there's not much to do in Vulkan and these Vulkans are quite boring.

Let's go back to Earth:

```javascript
Call(
  Function("WarpToPlanet"),
  [
    Ref(Collection("Spaceships"), "266356873589948946"),
    Ref(Collection("Planets"), "267081091831038483"),
  ]
)

// Result:

Error: [
  {
    "position": [],
    "code": "call error",
    "description": "Calling the function resulted in an error.",
    "cause": [
      {
        "position": [
          "expr",
          "else"
        ],
        "code": "transaction aborted",
        "description": "Not enough fuel!"
      }
    ]
  }
]
```

Oh no! We don't have enough fuel to warp to Earth! Well, at least our function works as expected.

Obviously, the logic of this example is extremely simple, but we've covered a number of important points related to UDFs.

First, to operate the **WarpToPlanet** function, our application doesn't need to know anything about the fuel logic, or even about the structure of the related documents. It only needs to pass two references. When (not if) the implementation of the function changes, we won't need to update any code in our application(s).

And second, to call the **WarpToPlanet** function our application needs to know about spaceships and planets, but it doesn't need to know about the **ShipLogs** collection.

## Data aggregation

Let's see how to use UDFs to aggregate data from multiple documents.

In our first article, the admiral tasked us with feeding his holomap with the position of all spaceships. This worked fine, but now he'd like to be able to go backwards and forwards in time to better understand the movement of the ships.

Obviously, we need to store the position somehow, but the admiral won't tolerate a slow holomap, so it needs to be as fast as possible.

We saw in [the previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3) that reading a single document will give us the best performance. We also saw this pattern presents some dangers, but since the recorded data will never change, and the number of ships is not very large, this is the perfect scenario for storing all the data in a single document.

First, let's create a new collection:

```javascript
CreateCollection({name: "ShipPositionsHistory"})
```

And this would be the function:

```javascript
CreateFunction({
  name: "RecordPositions4",
  body: Query(
    Lambda("bool",
      Do(
        Create(
          Collection("ShipPositionsHistory"),
          Let({
            shipsDocuments: Map(
              Paginate(
                Documents(Collection("Spaceships"))),
                Lambda("shipRef", Get(Var("shipRef"))
              )
            ),
            positions: Map(
              Var("shipsDocuments"),
              Lambda("shipDocument",
                {
                  ref: Select(["ref"], Var("shipDocument")),
                  name: Select(["data","name"], Var("shipDocument")),
                  position: Select(
                    ["data","celestialPosition"],
                    Var("shipDocument")
                  )
                }
              )
            )
          },{
            data: {
              timestamp: Now(),
              positions: Var("positions")
            }
          })
        ),
        "Positions recorded"
      )
    )
  )
})
```

Again, these are the same FQL commands we've seen multiple times.

This function would first get an array of Spaceships documents (denoted with the variable **shipsDocuments** in the Let). Then, it creates a new document into the **ShipPositionsHistory** collection with an array of ships and their positions.

We are performing this inside a transaction with a simple string on the last step. Otherwise, we'd be returning the complete result of the Create function to our application, which might slow things down a bit.

Now, we'd only need to trigger the function periodically:

```javascript
Call(Function("RecordPositions"))

// Result:

Positions recorded
```

If we check our **ShipPositionsHistory** collection, here is our first document:

```javascript
{
  ref: Ref(Collection("ShipPositionsHistory"), "268613645148094983"),
  ts: 1592428784478000,
  data: {
    timestamp: Time("2020-06-17T21:19:44.239194Z"),
    positions: {
      data: [
        {
          ref: Ref(Collection("Spaceships"), "266356873589948946"),
          name: "Voyager",
          position: {
            x: 2234,
            y: 3453,
            z: 9805
          }
        },
        {
          ref: Ref(Collection("Spaceships"), "266619264914424339"),
          name: "Explorer IV",
          position: {
            x: 1134,
            y: 9453,
            z: 3205
          }
        },
        // etc...
      ]
    }
  }
}
```

## Conclusion

So that's it for today. Hopefully you learned something valuable!

In part 5 of this series, we will wrap it all up by going deeper into roles and permissions in Fauna.

If you have any questions, don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

