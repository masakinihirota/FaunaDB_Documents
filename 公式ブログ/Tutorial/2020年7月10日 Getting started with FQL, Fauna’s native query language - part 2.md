Getting started with FQL, Fauna’s native query language - part 2
https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2

# Getting started with FQL, Fauna’s native query language - part 2

Pier Bover|Jul 10th, 2020|

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)

Welcome back, fellow space developer! In [part 1](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1) of this five-part series we got our first look at FQL and some fundamental Fauna concepts.

-   [Part 1: a look at FQL and fundamental Fauna concepts](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
-   Part 2: a deep dive into indexes with Fauna
-   [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
-   [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
-   [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

Today we're going to take a more in-depth look into Fauna's indexes.

## In this article:

-   Recap
-   What can indexes do?
-   Indexing across multiple collections
-   Sorting results
-   Filtering results
-   Enforcing unique values
-   Combining multiple indexes
-   Index bindings

## Recap

We briefly introduced indexes in the previous article, but here's a recap of the FQL commands we learned.

First, we created a simple index to be able to retrieve all our pilots from the Pilots collection:

```javascript
CreateIndex({
  name: "all_Pilots",
  source: Collection("Pilots")
})
```

Then, we retrieved a list of references:

```javascript
Paginate(
  Match(
    Index("all_Pilots")
  )
)
```

Finally, we learned how to use Map, Lambda, and Var to retrieve a list of documents:

```javascript
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda('pilotRef', Get(Var('pilotRef')))
)
```

## What can indexes do?

So far, we've seen that indexes allow you to retrieve all the documents in a collection, but indexes are much more powerful than that.

With indexes you can:

-   Enforce unique constraints
-   Sort and filter results
-   Create computed values from document data

#### **Indexes vs SQL views**

If you're coming from the relational world, it can make sense to think about indexes similar to views on a relational database. Views are stored queries that can retrieve data from multiple tables, calculate computed data, join tables to create virtual entities, filter, etc. In a way, Fauna's indexes perform similar functions, as we will explore in this article.

## Indexing across multiple collections

Until now, our indexes have been created on documents from a single collection, but you can configure an index to include documents from multiple collections.

There are many reasons why you might want to do that. Maybe, when designing your database, you'd like to group some collections under a single virtual collection, so to speak. In the relational world, combining database entities under a single entity is known as polymorphism.

To test this, let's create a new collection to store our land vehicles:

```javascript
CreateCollection({name: "Speeders"})
```

Now, with this index, you'd be able to retrieve all the vehicles in the database:

```javascript
CreateIndex({
  name: "all_Vehicles",
  source: [
    Collection("Spaceships"),
    Collection("Speeders")
  ]
})
```

When indexing multiple collections, keep in mind that the indexed fields need to be of the same type (string, number, etc) across collections. In the rest of the examples, we'll use indexes with a single collection for simplicity's sake.

## Sorting results

Indexes also allow us to sort results. Let's create a new index to get all our pilots sorted by their name:

```javascript
CreateIndex({
  name: "all_Pilots_sorted_by_name",
  source: Collection("Pilots"),
  values: [
    { field: ["data", "name"] },
    { field: ["ref"] }
  ]
})
```

Here, we're using a **values** object which defines the **output** values for the index.

In this case, we are defining two output values:

-   **"data", "name"** a path referring to the name property of the document.
-   **"ref"** another path which will output a reference to the matched document. In a moment, we'll see why we need this.

When using a **values** object, Fauna will always sort the results in ascending order by default:

```javascript
Paginate(Match(Index("all_Pilots_sorted_by_name")))

// Results:

{
  "data": [
    [
      "Buck Rogers",
      Ref(Collection("Pilots"), "266359371696439826")
    ],
    [
      "Flash Gordon",
      Ref(Collection("Pilots"), "266350546751848978")
    ],
    [
      "Jean-Luc Picard",
      Ref(Collection("Pilots"), "266359447111074322")
    ],
    // etc...
  ]
}
```

As you can see, Fauna will output two values per result as defined in the **values** object of the index, and these results are now ordered by those values.

#### **Reverse order**

If we wanted to get the pilots sorted by their name in descending order, we'd need a new index with the **reverse** setting:

```javascript
CreateIndex({
  name: "all_Pilots_sorted_by_name_desc",
  source: Collection("Pilots"),
  values: [
    { field: ["data", "name"], reverse: true},
    { field: ["ref"] }
  ]
})
```

#### **Getting documents from sorting results**

You can add as many output values as needed without any performance penalty, but we might need to get a document from these types of results:

```javascript
["Buck Rogers", Ref(Collection("Pilots"), "266359371696439826")]
```

So how do we actually get documents?

One option would be using the Select function like we learned in the previous article:

```javascript
Map(
  Paginate(Match(Index("all_Pilots_sorted_by_name"))),
  Lambda("pilotResult", Get(Select([1], Var("pilotResult"))))
)
```

Since Fauna uses zero-based arrays, the trick here is selecting the reference in the second item with **1**, then using Get to return a document.

Another option would be to simply configure our Lambda to expect an array with two values:

```javascript
Map(
  Paginate(Match(Index("all_Pilots_sorted_by_name"))),
  Lambda(["name", "pilotRef"], Get(Var("pilotRef")))
)
```

In both cases, we'd get the same result:

```javascript
{
  "data": [
    {
      "ref": Ref(Collection("Pilots"), "266359371696439826"),
      "ts": 1590278941740000,
      "data": {
        "name": "Buck Rogers"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266350546751848978"),
      "ts": 1590270525630000,
      "data": {
        "name": "Flash Gordon"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266359447111074322"),
      "ts": 1590279013675000,
      "data": {
        "name": "Jean-Luc Picard"
      }
    }
    // etc...
  ]
}
```

## Filtering results

Another useful feature of indexes is being able to search and filter results.

To test this, let's create a Planets collection:

```javascript
CreateCollection({name: "Planets"})
```

Then, create some planets with three different types: **TERRESTRIAL**, **GAS**, and **ICE**:

```javascript
Create(Collection("Planets"),
  {
    data: {
      name: "Mercury",
      type: "TERRESTRIAL"
    }
  }
)

Create(Collection("Planets"),
  {
    data: {
      name: "Saturn",
      type: "GAS"
    }
  }
)

// etc..
```

Finally, let's create an index to filter our planets by type:

```javascript
CreateIndex({
  name: "all_Planets_by_type",
  source: Collection("Planets"),
  terms: [
    { field: ["data", "type"]}
  ]
})
```

As we saw earlier, the **terms** object is used as the search **input** for the index, whereas the **values** object defines which data the index will return. With this index, the **values** object is not defined, so the index will return the ref by default.

In this case, we're telling Fauna that the search term will use a **field** of the document found at the path **"data", "type"**.

We can now query our index by passing a parameter to Match:

```javascript
Map(
  Paginate(Match(Index("all_Planets_by_type"), "GAS")),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081152090604051"),
      "ts": 1590967285200000,
      "data": {
        "name": "Jupiter",
        "type": "GAS"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081181884842515"),
      "ts": 1590967313610000,
      "data": {
        "name": "Saturn",
        "type": "GAS"
      }
    }
  ]
}
```

#### **Filtering on an array value**

If we wanted to match an item inside an array instead of filtering on a single string, we would only need to pass the term Fauna needs to search inside the array.

To test this, let's add some colors to our ships:

```javascript
Update(
  Ref(Collection("Spaceships"), "266356873589948946"),
  {
    data: {
      colors: ["RED","YELLOW"]
    }
  }
)

// etc...
```

If we now wanted to filter ships based on a single color, we could create this index which uses the **colors** array as a filtering term:

```javascript
CreateIndex({
  name: "all_Spaceships_by_color",
  source: Collection("Spaceships"),
  terms: [
    { field: ["data","colors"]}
  ]
})
```

And then query it:

```javascript
Map(
  Paginate(Match(Index("all_Spaceships_by_color"), "WHITE")),
  Lambda("shipRef", Let({
    shipDoc: Get(Var("shipRef"))
  },{
    name: Select(["data","name"], Var("shipDoc")),
    colors: Select(["data","colors"], Var("shipDoc"))
  }))
)

// Result:

{
  data: [
    {
      name: "Explorer IV",
      colors: ["BLUE", "WHITE", "RED"]
    },
    {
      name: "Navigator",
      colors: ["WHITE", "GREY"]
    },
    {
      name: "Le Super Spaceship",
      colors: ["PINK", "MAGENTA", "WHITE"]
    }
  ]
}
```

Fauna is smart enough to understand that if the field used in the **terms** object is an array, then it should search for an item inside that array instead of an exact match on the full array.

#### **About full text search**

At this time, it's only possible to filter documents using indexes with exact matches. This feature is on Fauna's roadmap, but no official timeframes have been provided yet.

It's certainly possible to solve this in other ways. FQL has a number of functions that will allow you to implement full text search.

Let's create an index first to get all planets:

```javascript
CreateIndex({
  name: "all_Planets",
  source: Collection("Planets")
})
```

Now, we could combine [Filter](https://docs.fauna.com/fauna/current/api/fql/functions/filter), [ContainsStr](https://docs.fauna.com/fauna/current/api/fql/functions/containsstr), and [LowerCase](https://docs.fauna.com/fauna/current/api/fql/functions/lowercase) to make a case insensitive search of the string "ur" on the planets' names:

```javascript
Map(
  Filter(
    Paginate(Match(Index("all_Planets"))),
    Lambda("planetRef",
      ContainsStr(
        LowerCase(Select(["data","name"],Get(Var("planetRef")))),
        "ur"
      )
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

{
  data: [
    {
      ref: Ref(Collection("Planets"), "267081079730471443"),
      ts: 1590977548370000,
      data: {
        name: "Mercury",
        type: "TERRESTRIAL",
        color: "GREY"
      }
    },
    {
      ref: Ref(Collection("Planets"), "267081181884842515"),
      ts: 1590977684790000,
      data: {
        name: "Saturn",
        type: "GAS",
        color: "YELLOW"
      }
    },
    {
      ref: Ref(Collection("Planets"), "267081222719537683"),
      ts: 1590977359690000,
      data: {
        name: "Uranus",
        type: "ICE",
        color: "BLUE"
      }
    }
  ]
}
```

#### **Sorting and filtering at the same time**

You can certainly do both at the same time by combining **terms** and **values** in the same index:

```javascript
CreateIndex({
  name: "all_Planets_by_type_sorted_by_name",
  source: Collection("Planets"),
  terms: [
    { field: ["data", "type"]}
  ],
  values: [
    { field: ["data", "name"]},
    { field: ["ref"] }
  ]
})
```

And then:

```javascript
Map(
  Paginate(Match(Index("all_Planets_by_type_sorted_by_name"), "TERRESTRIAL")),
  Lambda("planetResult", Get(Select([1], Var("planetResult"))))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081091831038483"),
      "ts": 1590967227710000,
      "data": {
        "name": "Earth",
        "type": "TERRESTRIAL"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081096484618771"),
      "ts": 1590967232165000,
      "data": {
        "name": "Mars",
        "type": "TERRESTRIAL"
      }
    },
    // etc ...
  ]
}
```

## Enforcing unique values

Another important function of indexes, besides retrieving documents, is enforcing a unique constraint on the documents that can be created.

For example, to add a unique code to our spaceships:

```javascript
CreateIndex({
  name: "all_Spaceships_by_code",
  source: Collection("Spaceships"),
  terms: [
    {field: ["data", "code"]}
  ],
  unique: true
})
```

This index accomplishes two purposes:

-   We're configuring it to accept a filtering term with the **terms** object.
-   We're ensuring the defined terms are unique across the documents matched by this index by using **unique: true**.

We're using a single term here for simplicity's sake, but you could create a unique constraint over multiple terms much like you'd do in SQL by creating constraints over multiple columns.

Let's test this by creating a new spaceship:

```javascript
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Rocinante",
      code: "ROCINANTE"
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "267072793181422099"),
  "ts": 1590959313500000,
  "data": {
    "name": "Rocinante",
    "code": "ROCINANTE"
  }
}
```

So far so good. Let's create another one with the same code:

```javascript
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Rocinante 2",
      code: "ROCINANTE"
    }
  }
)

// Result:

error: instance not unique
document is not unique.
position: ["create"]
```

As expected, Fauna throws an error since there is already a ship with the **ROCINANTE** code.

**Quick tip:** when using unique constraints, we know in advance that an index can only return a single document. So, instead of using Paginate, we can simply use Get to get a single document:

```javascript
Get(Match(Index("all_Spaceships_by_code"), 'ROCINANTE'))

// Result:

{
  "ref": Ref(Collection("Spaceships"), "267072793181422099"),
  "ts": 1591022503995000,
  "data": {
    "name": "Rocinante",
    "code": "ROCINANTE"
  }
}
```

## Combining multiple indexes

FQL has a number of functions that allow you to combine results from indexes and other sources in different ways:

-   [Union](https://docs.fauna.com/fauna/current/api/fql/functions/union) will add the results from all indexes.
-   [Intersection](https://docs.fauna.com/fauna/current/api/fql/functions/intersection) will return the results that are similar from each index and discard the rest.
-   [Difference](https://docs.fauna.com/fauna/current/api/fql/functions/difference) will return the results that are unique in the first index and discard the rest.

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/38l48GcW85CQhmWL0jmdyD/2268aab1259272f8d5fe309ea352a342/8398-FQL-2-1.png)

To be able to test these, let's add some colors to our planets (please excuse any scientific inaccuracies).

```javascript
// Earth

Update(Ref(Collection("Planets"), "267081091831038483"),
  {data: {color: "BLUE"}}
)

// Etc...
```

Let's also create a new index:

```javascript
CreateIndex({
  name: "all_Planets_by_color",
  source: Collection("Planets"),
  terms: [
    { field: ["data", "color"]}
  ]
})
```

#### **OR filtering with Union**

Union will combine whatever results each index returns. We're just using two indexes here, but you could use any number of indexes.

_"Hey Fauna, get me the planets that are of type_ **_GAS_** _or are_ **_YELLOW_**_"_

```javascript
Map(
  Paginate(
    Union(
      Match(Index("all_Planets_by_type"), "GAS"),
      Match(Index("all_Planets_by_color"), "YELLOW")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081152090604051"),
      "ts": 1590977605890000,
      "data": {
        "name": "Jupiter",
        "type": "GAS",
        "color": "BROWN"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081181884842515"),
      "ts": 1590977684790000,
      "data": {
        "name": "Saturn",
        "type": "GAS",
        "color": "YELLOW"
      }
    }
  ]
}
```

As you can see, Union will skip duplicates since Saturn being a gas giant appears in the results of both indexes.

#### **AND filtering with Intersection**

Intersection will return only the results that are the same in all indexes. Again, you could use any number of indexes.

_"Hey Fauna, get me the planets that are of type_**_TERRESTRIAL_** _and are_ **_BLUE_**_"_

```javascript
Map(
  Paginate(
    Intersection(
      Match(Index("all_Planets_by_type"), "TERRESTRIAL"),
      Match(Index("all_Planets_by_color"), "BLUE")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081091831038483"),
      "ts": 1590977345595000,
      "data": {
        "name": "Earth",
        "type": "TERRESTRIAL",
        "color": "BLUE"
      }
    }
  ]
}
```

#### **NOT filtering with Difference**

Difference will compare the first index you provide with the rest of the indexes, and return the results that exist only in the first index.

_"Hey Fauna, get me the planets that are_ **_TERRESTRIAL_** _but are not_ **_BLUE_** _nor_ **_RED_**_"_

```javascript
Map(
  Paginate(
    Difference(
      Match(Index("all_Planets_by_type"), "TERRESTRIAL"),
      Match(Index("all_Planets_by_color"), "BLUE"),
      Match(Index("all_Planets_by_color"), "RED")
    )
  ),
  Lambda("planetRef", Get(Var("planetRef")))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081079730471443"),
      "ts": 1590977548370000,
      "data": {
        "name": "Mercury",
        "type": "TERRESTRIAL",
        "color": "GREY"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081085891904019"),
      "ts": 1590977561660000,
      "data": {
        "name": "Venus",
        "type": "TERRESTRIAL",
        "color": "GREY"
      }
    }
  ]
}
```

## Index bindings

With index bindings, it's possible to create pre-computed values based on some document data, using pretty much any FQL expression.

These values are calculated beforehand, which makes retrieving these values super efficient as the operation consumes little CPU. The downside is that these computed values consume storage space. Before deciding to use a binding at scale, you should consider if the performance boost is worth the storage cost for your use case.

Let's see a couple examples on how to use index bindings.

Remember our spaceship from the previous article?

```javascript
{
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
  "code": "VOYAGER"
}
```

So here comes our boss, the fleet admiral. He has 100 ships in the dock that need refueling and wants to know which ships could be filled faster so that he can fill them first and empty the dock as fast as possible.

Easy, right? To do that, we'd only need to sort our ships by **pendingFuelTons**.

But Pier, **pendingFuelTons** is not in the document! We're doomed!

Don't panic my friend, we have the perfect tool to solve this problem.

Index bindings allow you to create computed values dynamically based on the data of the document. In this case, we could just calculate the value **pendingFuelTons** by subtracting **actualFuelTons** from **maxFuelTons**.

So let's create our index:

```javascript
CreateIndex({
  name: "all_Spaceships_by_pendingFuelTons",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      pendingFuelTons: Query(
        Lambda("shipDoc",
          Subtract(
            Select(["data","maxFuelTons"], Var("shipDoc")),
            Select(["data","actualFuelTons"], Var("shipDoc"))
          )
        )
      )
    }
  },
  values: [
    { binding: "pendingFuelTons"},
    { field: ["data", "name"]}
  ]
})
```

The only new FQL function we're using here is Subtract, which simply subtracts the second number from the first.

So let's query our new index:

```javascript
Paginate(Match(Index("all_Spaceships_by_pendingFuelTons")))

// Result:

{
  "data": [
    [
      3,
      "Explorer IV"
    ],
    [
      3,
      "Voyager"
    ],
    [
      10,
      "Navigator"
    ],
    [
      18,
      "Destroyer"
    ]
    // etc...
  ]
}
```

As you can see, Fauna is sorting first by the new computed value **pendingFuelTons** and then by the ship name.

Cool!

#### **Filtering by the first letter**

Let's create another example. What if we wanted to get all the planets that started with the letter **M**? Our planet documents do not have a **firstLetter** property, but we can solve this with bindings too.

We can create a new index with a binding for the first letter of the name and add a **terms** object to be able to filter the documents by **firstLetter**:

```javascript
CreateIndex({
  name: "all_Planets_by_firstLetter",
  source: {
    collection: Collection("Planets"),
    fields: {
      firstLetter: Query(
        Lambda("planetDoc",
          SubString(Select(["data", "name"], Var("planetDoc")), 0, 1)
        )
      )
    }
  },
  terms: [
    { binding: "firstLetter"}
  ]
})
```

As you can see in the **terms** object, we're now telling Fauna that the value we want to use for filtering is an index binding instead of a document field.

Great, so let's query the index as usual and pass the letter **M**:

```javascript
Map(
  Paginate(Match(Index("all_Planets_by_firstLetter"), "M")),
  Lambda("planetDoc", Get(Var("planetDoc")))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Planets"), "267081079730471443"),
      "ts": 1590977548370000,
      "data": {
        "name": "Mercury",
        "type": "TERRESTRIAL",
        "color": "GREY"
      }
    },
    {
      "ref": Ref(Collection("Planets"), "267081096484618771"),
      "ts": 1590977464930000,
      "data": {
        "name": "Mars",
        "type": "TERRESTRIAL",
        "color": "RED"
      }
    }
  ]
}
```

Easy, right?

These bindings are very powerful. We can access all the FQL commands available to produce computed values.

#### **Filtering by any letter**

As a final example, let's see how we could check if an array produced by a binding includes a search term.

**Quick note:** The NGram function is currently undocumented, but will be officially supported in a future release. You can [check more details here](https://fauna.com/blog/boosting-developer-productivity-with-string-functions).

```javascript
CreateIndex({
  name: "filter_Spaceships_by_letter",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      nameLetters: Query(
        Lambda("shipDoc",
          NGram(Select(["data","name"], Var("shipDoc")),1,1)
        )
      )
    }
  },
  terms: [
    { binding: "nameLetters"}
  ]
})
```

And query it:

```javascript
Map(
  Paginate(Match(Index("filter_Spaceships_by_letter"), "V")),
  Lambda("shipRef", Let({
    shipDoc: Get(Var("shipRef"))
  },{
    name: Select(["data","name"], Var("shipDoc"))
  }))
)

// Result:

{
  data: [
    {
      name: "Voyager"
    },
    {
      name: "Explorer IV"
    }
  ]
}
```

This works because the NGram function produces an array of letters which can be queried by the index.

```javascript
NGram("FaunaDB",1,1)

// Result:

["F", "a", "u", "n", "a", "D", "B"]
```

Or:

```javascript
NGram("FaunaDB",2,3)

// Result:

["Fa", "Fau", "au", "aun", "un", "una", "na", "naD", "aD", "aDB", "DB"]
```

You can create all sorts of binding values. For example, you could extract the day of the week from a timestamp using [DayOfWeek](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek) to get all events that happened on a Friday.

#### **Binding and unique constraints**

If you're wondering, yes, you can use unique constraints over bindings too.

Imagine we wanted to have keycards with ids for accessing our ships. We know that pilots have a history of forgetting their keycard ids, so these ids should be memorable and obvious. What if we create them based on the ships' names? And, since keycards would only be available for a single ship, these ids should be unique.

```javascript
CreateIndex({
  name: "all_Keycards",
  source: {
    collection: Collection("Spaceships"),
    fields: {
      keyCardId: Query(
        Lambda("shipDoc",
          UpperCase(
            ReplaceStr(Select(["data", "name"], Var("shipDoc")), " ", "_")
          )
        )
      )
    }
  },
  values: [
    { binding: "keyCardId"}
  ],
  unique: true
})
```

If we query this index, you'll see how it all makes sense:

```javascript
Paginate(Match(Index("all_Keycards")))

// Result:

{
  data: [
    "DESTROYER",
    "EXPLORER_IV",
    "LE_SUPER_SPACESHIP",
    "NAVIGATOR",
    "ROCINANTE",
    "VOYAGER"
  ]
}
```

If we now try to create a new ship by using a name we've already used, we get an error. The **all\_Keycards** index will prevent two keycards from having the same **keyCardId,** even if we have no unique constraints on the names of the spaceships themselves:

```javascript
Create(
  Collection("Spaceships"),
  {
    data: {
      name: "Le Super Spaceship"
    }
  }
)

// Result:

error: instance not unique
document is not unique.
position: ["create"]
```

## Conclusion

So that's it for today. Hopefully you learned something valuable!

In part 3 of this series, we will continue our space adventure by learning how to model data in Fauna.

If you have any questions don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/PierB)

**Next up: [Part 3 - a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)**