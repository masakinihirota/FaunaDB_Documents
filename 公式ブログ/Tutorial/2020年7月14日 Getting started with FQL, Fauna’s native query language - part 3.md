Getting started with FQL, Fauna’s native query language - part 3
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3

# Getting started with FQL, Fauna’s native query language - part 3

Pier Bover|Jul 14th, 2020|

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Welcome back, fellow space developer! We will continue our FQL space journey in this five-part series of articles.

-   [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
-   [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
-   Part 3: a look into the principles of modeling data with Fauna
-   [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
-   [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

Today we're going to take a look into the principles of modeling data with Fauna.

## In this article:

-   Introduction
-   Normalization and denormalization
-   Nested data
-   References in Fauna
-   Arrays of references
-   Many-to-many relationships

## Introduction

Fauna is a rare breed in the world of databases as it allows you to model and query your data using different paradigms:

-   Relational
-   Documents (schemaless)
-   Temporal
-   Graph-like

As we'll see in this article, by having the flexibility to switch between different models, you can avoid common pitfalls inherent in each approach.

Today we'll focus on documents and relational modeling techniques.

## Normalization and denormalization

Document-based databases typically require that you resort to data duplication (denormalization) to be able to produce the answers needed for your application and implement certain access patterns.

Here's a very simplistic example. Say we have millions of stored chat messages with this format:

```javascript
{
  author: "Admiral Ackbar",
  message: "It's a trap!",
  timestamp: 1591475572346
}
```

That would make it super fast to retrieve a list of messages with the name of the author in our SpaceChat app.

But what if our users now want to update their name? We'd need to perform millions of write operations. This is slow and impractical, but also very expensive since most document-based databases charge you by the number of document operations.

If you're using a database that does not support ACID transactions, such big updates could even be dangerous as there is no guarantee about the final state of the transaction.

**Quick note:** Fauna offers ACID transactions, so this wouldn't be a problem here. Besides, since Fauna stores each document's complete event history, you could rollback the document to any previous state (as far back as defined by [history\_days](https://docs.fauna.com/fauna/current/api/fql/collections) on the collection which can be set to forever/indefinite).

In relational databases, this problem is non-existent as data is commonly normalized, or in other words, each bit of data is unique across the whole database. Normalization was born out of the necessity to (1) save money decades ago when storage was extremely expensive, but also (2) help maintain consistent data and avoid the problem of denormalization we just saw.

In a relational database, the name of the user would only exist in a single row of the Users table:

```javascript
USERS
Id      Name
123     Admiral Ackbar

MESSAGES
Id      Message          authorId
23462   It's a trap!     123
```

Cool, so now you'd only need to update the name in a single place.

Ah, but this introduces another problem. To retrieve a message, now the database needs to read data from multiple places on the disk and join that data back together before returning it to the application. The more tables involved when performing a query, the more CPU and disk IO you will consume. Eventually, this will become slow and expensive once you start having users all around the galaxy.

In data modeling, it's all about tradeoffs. Sometimes, you will want to design your model for performance, sometimes for querying flexibility, and sometimes for cost.

## Nested data

So far, we've been working with single entities stored on single document objects:

-   A pilot
-   A planet
-   A spaceship

You could get pretty far with simple documents and indexes, but at some point you will need to model more complex data.

It's possible to use a single document to store multiple data entities together for _one-to-one_ and _one-to-few_ relationships. Let's say we wanted to model the weapons carried by our space pilots:

```javascript
{
  name: "Flash Gordon",
  weapons: [
    {
      type: "LASER_GUN",
      damage: 12
    }
  ]
}
```

It seems almost natural in the document-based paradigm to model hierarchical data this way, but beware. There are some important points that need to be taken into consideration and may not be obvious.

#### **How much data are we nesting?**

We know it's unlikely our pilots will carry more than a dozen weapons. On the other hand, imagine we wanted to model galaxies, stars, planets, etc, for a SpaceMaps app. Since each galaxy can have billions of stars, this might not be a great idea:

```javascript
{
  name: "Solar System",
  stars: [
    {
      name: "Sun",
      brightness: −26.74,
      massKg: 2000000000000000000000000000000
    },
    // etc...
  ]
}
```

Galaxies can have billions of stars and your galaxy document would become huge.

Fauna does not impose a size limit on documents, but as they get bigger, performance will start to degrade. The [documentation](https://docs.fauna.com/fauna/current/api/fql/documents#limits) warns us that we could start seeing degraded performance with documents larger than 5MB.

Personally, I would strive to keep my documents much smaller than that. Even 1MB can hold a lot of data if you consider The Odyssey (yes, that ancient Greek book) can fit in a [700kB text file](https://www.gutenberg.org/ebooks/1727).

#### **Will the data grow?**

This nesting pattern is not a great fit for use cases where the data either could grow indefinitely, or is unbound.

For example, in SpaceAdvisor, our app for reviewing space hotels and restaurants, we will definitely not want to store reviews inside the properties documents:

```javascript
{
  name: "The Nebula Gourmet",
  type: "RESTAURANT",
  reviews: [
    {
      title: "Delicious",
      stars: 5,
      message: "Best filet mignon in the whole quadrant!"
    },
    // etc...
  ]
}
```

Again, one problem here is that documents could potentially become huge and we don't want that. Additionally, accessing heavily nested data often requires more coding, so it should only be done in the context of your access patterns, as we'll discuss in the next few sections.

#### **How are we going to query the data?**

Another important consideration before nesting entities in a single document is knowing in advance what access patterns we'll need on those entities. This is critical in document-based databases as your design is usually coupled to your access patterns.

For example, you might think that it would be ok to store the planets and their moons together in our SpaceMaps app.

```javascript
{
  name: "Earth",
  moons: [
    {
      name: "Luna",
      massKg: 73420000000000000000000
    }
  ]
}
```

A priori, it would seem this pattern is perfect for this use case. After all, it's unlikely a planet will have more than, say, a couple hundred moons in some extreme cases and this number will practically never change.

But what if at some point we wanted to list and sort all the moons in our SpaceMaps app? This nesting pattern wouldn't be appropriate for this use case as we wouldn't be able to index and query the moons properly.

#### **How often are we going to update the data?**

Finally, even if your use case perfectly fits the nesting pattern, you have to consider how often you are going to update that document. The more frequently you update a document, the less efficient this pattern becomes.

Remember that Fauna provides worldwide immediate consistency. Every time you change a document, it needs to be updated to all clusters in the world. There are physical constraints such as the speed of light which make very frequent updates around the world not very practical.

#### **How fast and how often do we need to retrieve our data?**

Don't get me wrong: if your use case requires the best possible performance, nesting the data into a document might actually be your best option (assuming it's still under 1 MB). In Fauna, like in any other document-based database, retrieving a single document is the fastest operation there is. Just take the previous points into consideration if you need to do that.

## References in Fauna

Previously, we saw that each document in Fauna has a reference that identifies it with a unique id inside a collection.

Here is a pilot document from a previous article:

```javascript
{
  "ref": Ref(Collection("Pilots"), "266350546751848978"),
  "ts": 1590270525630000,
  "data": {
    "name": "Flash Gordon"
  }
}
```

The reference to this document has a unique id of **266350546751848978**, but remember that by itself the id is not very useful. It only makes sense when paired with a collection to create a reference.

#### **References to other documents**

Obviously, we can also use the [Ref](https://docs.fauna.com/fauna/current/api/fql/functions/ref) type to reference other documents. To demonstrate this, let's revisit our SpaceMaps app.

We already have a **Planets** collection from a previous article. For reference, here's the document for Earth:

```javascript
{
  "ref": Ref(Collection("Planets"), "267081091831038483"),
  "ts": 1590977345595000,
  "data": {
    "name": "Earth",
    "type": "TERRESTRIAL",
    "color": "BLUE"
  }
}
```

Now, let's create a Moons collection:

```javascript
CreateCollection({name: "Moons"})
```

And let's create a moon document with a reference to a planet document:

```javascript
Create(
  Collection("Moons"),
  {
    data: {
      name: "Luna",
      planetRef: Ref(Collection("Planets"), "267081091831038483")
    }
  }
)

// Result:

{
  ref: Ref(Collection("Moons"), "267691276872188416"),
  ts: 1591549145540000,
  data: {
    name: "Luna",
    planetRef: Ref(Collection("Planets"), "267081091831038483")
  }
}
```

We just created a _one-to-many_ relationship since it is possible for many moons to share the same planet.

We can now retrieve all moons in our database using the [Documents](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function to avoid creating an index like we saw in a previous article:

```javascript
Map(
  Paginate(Documents(Collection('Moons'))),
  Lambda("moonRef", Get(Var("moonRef")))
)
```

We could also create an index to find all the moons for a given planet:

```javascript
CreateIndex({
  name: "all_Moons_by_planet",
  source: [Collection("Moons")],
  terms: [{ field: ["data", "planetRef"] }]
})

// Query the index:

Map(
  Paginate(
    Match(
      Index("all_Moons_by_planet"),
      Ref(Collection("Planets"), "267081091831038483")
    )
  ),
  Lambda("moonRef", Get(Var("moonRef")))
)
```

**Quick note:** If these FQL commands for indexes are confusing, you might want to revisit the [previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2) where all these are explained in detail.

#### **One-to-one constraints**

If you'd like to enforce a _one-to-one_ relationship, you can do that by creating an index with a unique constraint like we saw in the previous article:

```javascript
CreateIndex({
  name: "only_one_Moon_per_planet",
  source: [
    Collection("Moons")
  ],
  terms: [
    {field: ["data", "planetRef"]}
  ],
  unique: true
})
```

Now, if we try to create another moon on planet Earth, we'll get an error:

```javascript
Create(
  Collection("Moons"),
  {
    data: {
      name: "Luna 2",
      planetRef: Ref(Collection("Planets"), "267081091831038483")
    }
  }
)

// Result:

error: instance not unique
document is not unique.
position: ["create"]
```

#### **Foreign keys**

In Fauna, like its purely document-based cousins, there is no out-of-the-box concept of foreign keys like in relational databases. That is, without writing a custom function, Fauna will not verify if a document exists when creating a reference, nor will it warn you if you are deleting a document that is referenced elsewhere; it will not cascade delete related documents.

This might sound like a deal breaker, but I've found in practice that it's not much of a big deal. Even in the relational world, it's much more common to soft delete rows than to actually delete rows, just in case. Also, many of the big apps and websites you use do not support foreign keys either. They run on purely document-based databases that were the only options available to meet their high global performance needs at the time.

Besides, if you do need this kind of functionality for a particular use case, it can be implemented using a custom FQL function.

## Arrays of references

You could also model your _one-to-few_ relationships by using arrays of references. This could be more convenient in certain situations where the data is frequently accessed together, but you still want to be able to query the entities independently and more efficiently.

For example, we could store the moon references in our planet document this way:

```javascript
{
  "name": "Earth",
  "type": "TERRESTRIAL",
  "color": "BLUE",
  "moonRefs": [
    Ref(Collection("Moons"), "267691276872188416")
  ]
}
```

Then, to query a planet with all its moon documents you could use [Map](https://docs.fauna.com/fauna/current/api/fql/functions/map), [Let](https://docs.fauna.com/fauna/current/api/fql/functions/let), and [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select) like we learned previously when querying indexes:

```javascript
Let(
  {
    planetDoc: Get(Ref(Collection("Planets"), "267081091831038483"))
  },
  {
    planet: Var("planetDoc"),
    moons: Map(
      Select(["data", "moonRefs"], Var("planetDoc")),
      Lambda("moonRef", Get(Var("moonRef")))
    )
  }
)

// Result:

{
  planet: {
    ref: Ref(Collection("Planets"), "267081091831038483"),
    ts: 1591554900130000,
    data: {
      name: "Earth",
      type: "TERRESTRIAL",
      color: "BLUE",
      moonRefs: [Ref(Collection("Moons"), "267691276872188416")]
    }
  },
  moons: [
    {
      ref: Ref(Collection("Moons"), "267691276872188416"),
      ts: 1591553627340000,
      data: {
        name: "Luna",
        planetRef: Ref(Collection("Planets"), "267081091831038483")
      }
    }
  ]
}
```

Or, if you only wanted to get the names and ids instead of the full documents, you could do this instead:

```javascript
Let(
  {
    planetDoc: Get(Ref(Collection("Planets"), "267081091831038483"))
  },
  {
    planet: Let({}, {
      id: Select(["ref","id"], Var("planetDoc")),
      name: Select(["data","name"], Var("planetDoc")),
      moons: Map(
        Select(["data", "moonRefs"], Var("planetDoc")),
        Lambda("moonRef", Let(
          {
            moonDoc: Get(Var("moonRef"))
          },
          {
            id: Select(["ref","id"], Var("moonDoc")),
            name: Select(["data","name"], Var("moonDoc")) 
          }
        ))
      )
    })
  }
)

// Result:

{
  planet: {
    id: "267081091831038483",
    name: "Earth",
    moons: [
      {
        id: "267691276872188416",
        name: "Luna"
      }
    ]
  }
}
```

This query may seem intimidating, but if you inspect it in more detail, you will see that it is only using FQL functions we've already learned in the previous articles. FQL is a lot closer to a functional programming language than a declarative language like SQL, so it might help to think about it that way.

## Many-to-many relationships

As we've seen in previous examples, many-to-many relationships can be expressed with indexes and/or arrays of references. Let's look at a use case for that.

There is a bit of chaos in the dock and our boss, the admiral, has tasked us with creating a system for managing spaceship repairs. Armed with our new knowledge about references and relationships in Fauna, we should be able to solve this in no time!

First, we need to be able to track our personnel:

```javascript
CreateCollection({name: "DockTechnicians"})
```

Let's add all the people working in the dock:

```javascript
Create(
  Collection("DockTechnicians"),
  {
    data: {name: "Johnny Sparkles"}
  }
)

// etc...
```

We already have a Spaceships collection from our previous articles. For simplicity's sake, we're going to assume all ships are in the dock right now.

Now, to assign a technician to a ship, we could just maintain an array of spaceships references in the technician document:

```javascript
Update(
  Ref(Collection("DockTechnicians"), "267703813461246483"),
  {
    data: {
      workingOn: [
        Ref(Collection("Spaceships"), "266356873589948946")
      ]
    }
  }
)
```

Waaait a minute!

The admiral specifically said he not only wanted to know which technicians worked on which spaceships, but also which repairs were in process and how long each repair took.

#### **Join collections**

In the relational world, it's very common to model many-to-many relationships with an entity using a join table, or a bridging table.

This is done in part because, with a rigid schema, you'd need to add more columns to relate a row to other rows. But there is another important reason which actually solves our problem. When modeling a relationship with an independent entity, you can assign data to that relationship.

What if we actually had a collection to track the repairs that also associated technicians with spaceships?

```javascript
CreateCollection({name: "DockRepairs"})
```

And now, let's create the first repair:

```javascript
Create(
  Collection("DockRepairs"),
  {
    data: {
      technicianRefs: [
        Ref(Collection("DockTechnicians"), "267703813461246483")
      ],
      shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
      status: 'PENDING'
    }
  }
)

// Result:

{
  ref: Ref(Collection("DockRepairs"), "267705685715714560"),
  ts: 1591562886860000,
  data: {
    technicianRefs: [
      Ref(Collection("DockTechnicians"), "267703813461246483")
    ],
    shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
    status: "PENDING"
  }
}
```

So now we know the status of a ship repair and which technicians are assigned to it. Neat.

Let's start a repair:

```javascript
Update(
  Ref(Collection("DockRepairs"), "267705685715714560"),
  {
    data: {
      startTimestamp: Time('2355-02-11T05:23:11Z'),
      status: 'IN_PROCESS'
    }
  }
)

// Result:

{
  ref: Ref(Collection("DockRepairs"), "267705685715714560"),
  ts: 1591563124590000,
  data: {
    technicianRefs: [
      Ref(Collection("DockTechnicians"), "267703813461246483")
    ],
    shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
    status: "IN_PROCESS",
    startTimestamp: Time("2355-02-11T05:23:11Z")
  }
}
```

And now let's finish the repair:

```javascript
Update(
  Ref(Collection("DockRepairs"), "267705685715714560"),
  {
    data: {
      endTimestamp: Time('2355-02-11T03:05:35Z'),
      status: 'DONE'
    }
  }
)

// Result:

{
  ref: Ref(Collection("DockRepairs"), "267705685715714560"),
  ts: 1591563210950000,
  data: {
    technicianRefs: [
      Ref(Collection("DockTechnicians"), "267703813461246483")
    ],
    shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
    status: "DONE",
    startTimestamp: Time("2355-02-11T05:23:11Z"),
    endTimestamp: Time("2355-02-11T03:05:35Z")
  }
}
```

Great!

Now with this simple index, we can see all repairs and their info:

```javascript
CreateIndex({
  name: "all_DockRepairs",
  source: [
    Collection("DockRepairs")
  ]
})
```

Not bad, if I say so myself.

#### **But how long do repairs actually take?**

We could have added a **duration** property to our documents and stored a value when ending a repair, but where is the fun in that? With FQL, there are other ways to accomplish this.

For example, we could just determine the duration when querying our data without having to implement it in our application logic:

```javascript
Map(
  Paginate(Match(Index("all_DockRepairs"))),
  Lambda("repairRef", Let({
    repairDoc: Get(Var("repairRef"))
  },{
    durationMinutes: If(
      Or(
        IsNull(Select(["data", "startTimestamp"], Var("repairDoc"), null)),
        IsNull(Select(["data", "endTimestamp"], Var("repairDoc"), null))
      ),
      null,
      TimeDiff(
        Select(["data", "endTimestamp"], Var("repairDoc")),
        Select(["data", "startTimestamp"], Var("repairDoc")),
        "minutes"
      )
    ),
    repair: Var("repairDoc")
  }))
)

// Result:

{
  data: [
    {
      durationMinutes: 137,
      repair: {
        ref: Ref(Collection("DockRepairs"), "267705685715714560"),
        ts: 1591563210950000,
        data: {
          technicianRefs: [
            Ref(Collection("DockTechnicians"), "267703813461246483")
          ],
          shipRef: Ref(Collection("Spaceships"), "266356873589948946"),
          status: "DONE",
          startTimestamp: Time("2355-02-11T05:23:11Z"),
          endTimestamp: Time("2355-02-11T03:05:35Z")
        }
      }
    }
  ]
}
```

Woah.

Again, this query may seem complicated, but we already know most of the stuff from previous articles.

Here's the new part:

```javascript
If(
  Or(
    IsNull(Select(["data", "startTimestamp"], Var("repairDoc"), null)),
    IsNull(Select(["data", "endTimestamp"], Var("repairDoc"), null))
  ),
  null,
  TimeDiff(
    Select(["data", "endTimestamp"], Var("repairDoc")),
    Select(["data", "startTimestamp"], Var("repairDoc")),
    "minutes"
  )
)
```

What this does is check that **startTimestamp** or **endTimestamp** are not missing from the document. If both exist, then return the time difference in minutes.

Let's go step-by-step.

-   We already know what [Select](https://docs.fauna.com/fauna/current/api/fql/functions/select) does from previous articles. In this case, we are giving it a default value of **null** if the path **"data", "startTimestamp"** does not exist in **Var("repairDoc")**.
    
-   [IsNull](https://docs.fauna.com/fauna/current/api/fql/functions/isnull) will return **true** if a value does not exist and **Select** returns **null**.
    
-   [Or](https://docs.fauna.com/fauna/current/api/fql/functions/or) will return true if either **startTimestamp** or **endTimestamp** do not exist in the document. If that's the case, then **If** would return **null**.
-   If both timestamps do exist in the repair document, we simply calculate the duration using [TimeDiff](https://docs.fauna.com/fauna/current/api/fql/functions/timediff) in minutes.

#### **Index bindings**

There is another way to solve this. Do you remember index bindings from the [previous article](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)? These are computed values calculated beforehand.

The decision to use index bindings comes down to how often you need to know the duration of the repairs. As explained in the previous article, bindings consume more storage but less CPU, so you have to account for that when deciding to use bindings.

That said, here's a possible index to return the duration using a binding and the same conditional logic. We're also returning a custom object instead of the full document, which might make more sense when listing repairs instead of showing a detail view to your users.

```javascript
CreateIndex({
  name: "all_DockRepairs_with_duration",
  source: {
    collection: Collection("DockRepairs"),
    fields: {
      durationMinutes: Query(
        Lambda("repairDoc",
          If(
            Or(
              IsNull(
                Select(["data", "startTimestamp"], Var("repairDoc"), null)
              ),
              IsNull(
                Select(["data", "endTimestamp"], Var("repairDoc"), null)
              )
            ),
            null,
            TimeDiff(
              Select(["data", "endTimestamp"], Var("repairDoc")),
              Select(["data", "startTimestamp"], Var("repairDoc")),
              "minutes"
            )
          )
        )
      )
    }
  },
  values: [
    { binding: "durationMinutes"},
    { field: ["ref", "id"]},
    { field: ["data", "status"]}
  ]
})
```

Let's query it:

```javascript
Map(
  Paginate(Match(Index("all_DockRepairs_with_duration"))),
  Lambda("result", Let({},
    {
      id: Select([1], Var("result")),
      status: Select([2], Var("result")),
      durationMinutes: Select([0], Var("result"))
    }
  ))
)

// Result:

{
  data: [
    {
      id: "267705685715714560",
      status: "DONE",
      durationMinutes: 137
    }
  ]
}
```

## Conclusion

So that's it for today. Hopefully you learned something valuable!

In part 4 of this series, we will continue our space adventure by learning how to create FQL functions to extend the basic functionality of Fauna with custom logic.

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)