# Getting started with FQL, Fauna’s native query language - part 1

Pier Bover|Jun 23rd, 2020|

Categories:

[Tutorial](https://fauna.com/blog?category=tutorial)[Serverless](https://fauna.com/blog?category=serverless)[Jamstack](https://fauna.com/blog?category=jamstack)

Fauna is a serverless global database designed for low latency and developer productivity. FQL, its query language, was also designed with these goals in mind. With it, you can create expressive queries that will allow you to harness the full power of Fauna.

In this five-part series of articles, we’ll go through the basics of FQL with no need of prior knowledge. If you are skimming and don’t understand something, you probably only need to go back to a previous section.

- Part 1: a look at FQL and fundamental Fauna concepts
- [Part 2: a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)
- [Part 3: a look into the principles of modeling data with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-3)
- [Part 4: a look at how to create custom functions that run straight in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)
- [Part 5: a look at authentication and authorization in Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-5)

In this article:

- Should you learn FQL if you're already using GraphQL?
- Getting started
- About documents and collections
- Your first collections
- Basic CRUD operations
- Your first index
- Using Lambda() to retrieve a list of documents
- Using Let() and Select() to return custom results

## Should you learn FQL if you're already using GraphQL?

If you're using Fauna's native GraphQL API, you might be wondering if it makes sense to invest time in learning FQL. The answer is yes, absolutely.

As an agnostic querying language, GraphQL is a great option for using Fauna straight from your client(s), but FQL will allow you to go beyond data querying and define more sophisticated behaviors right in the database. For example, you can define custom functions in FQL, similar in concept to SQL stored procedures, which can be triggered from GraphQL. See the [official docs](https://docs.fauna.com/fauna/current/api/graphql/functions) for more info on this.

## Getting started

Before embarking on our space adventure, you only need to [signup for a free Fauna account](https://dashboard.fauna.com/accounts/register). Fauna has a very generous free tier which is more than enough for learning, development, or even light production workloads.

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/TbBjn9VERebQCYQ1SRY0A/e77c430767161853aca79cc41a909cf6/7651-FQL-p1-1.png)

Once inside the dashboard, create a new database and you’re good to go.

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2sLOjbK7PnqEcMH1x7RRLV/ad819b49ad855f03c6bb3a0ac257955b/7652-FQL-p1-2.png)

It’s also possible to install Fauna on your development machine using [an official Docker image](https://docs.fauna.com/fauna/current/start/dev) if you prefer.

## About documents and collections

Fauna is a NoSQL database. Instead of organizing data in tables and rows, it uses documents and collections.

The smallest units of data in Fauna are schemaless [documents](https://docs.fauna.com/fauna/current/api/fql/documents) which are basically JSON with some extra [Fauna types](https://docs.fauna.com/fauna/current/api/fql/types). These documents are grouped into collections which are simply buckets of documents.

This is what a simple document looks like:

```javascript
{
  "ref": Ref(Collection("Planets"), "264471980339626516"),
  "ts": 1588478985090000,
  "data": {
    "name": "Vulcan"
  }
}
```

- **ref** is a reference that uniquely identifies the document inside a **Planets** collection with the id **264471980339626516**. We’ll go over references and the special [Ref type](https://docs.fauna.com/fauna/current/api/fql/functions/ref) in more detail later.
- **ts** is a timestamp of the document's last event (e.g., create, read, update, delete) in microseconds.
- **data** is the actual data of the document. You can create any structure you need and use any of the JSON and Fauna types. Strings, numbers, references to other documents, nested objects, arrays, etc.

At creation, a document cannot exceed 1MB since that is the limit of a Fauna request. You can append more data to a document afterwards.

## Your first collections

Obviously, before we begin our space adventure, we need a spaceship and a pilot. How else are we going to travel through space?

Let’s create a Spaceships collection using the [CreateCollection](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection) function:

```javascript
CreateCollection({name: "Spaceships"})

// Result:

{
  "ref": Collection("Spaceships"),
  "ts": 1590269343560000,
  "history_days": 30,
  "name": "Spaceships"
}
```

As you can see, the result looks very similar to a document. Pretty much all data in Fauna is stored in documents. For now, let’s leave the default values and move on.

Let’s create another a collection for our pilots:

```javascript
CreateCollection({ name: "Pilots" });
```

We're ready now to start creating our first documents.

## Basic CRUD operations

### **Create**

Let’s create our first document with the [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create) function:

```javascript
Create(
  Collection("Pilots"),
  {
    data: {
      name: "Flash Gordon"
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Pilots"), "266350546751848978"),
  "ts": 1590270525630000,
  "data": {
    "name": "Flash Gordon"
  }
}
```

Let's break this down:

- Create is used to create new documents in Fauna.
- **Collection("Pilots")** is a reference to the **Pilots** collection.
- **{data: {name: "Flash Gordon"}}** is the actual data of the document.

So now that we’ve created a pilot, we can create a new spaceship:

```javascript
Create(Collection("Spaceships"), {
  data: {
    name: "Millennium Hawk",
    pilot: Ref(Collection("Pilots"), "266350546751848978"),
  },
});
```

As you can see, we're now storing a reference to another document in the pilot property. I will cover references and relationships in much more detail in part three of this series.

**Quick tip:** SQL users might be tempted to store the actual id in a pilot_id property of the JSON instead of a reference. This would be totally valid but it's recommended to use native Fauna references. This will make your FQL queries much simpler as we’ll see later on.

### **Read**

To read documents, we use the [Get function](https://docs.fauna.com/fauna/current/api/fql/functions/get) which receives a document reference and returns an actual document:

```javascript
Get(
  Ref(Collection("Spaceships"), "266354515987399186")
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274311000000,
  "data": {
    "name": "Millennium Hawk",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

### **Update**

To update a document, we use [Update](https://docs.fauna.com/fauna/current/api/fql/functions/update). If we wanted to change the name of our ship, we’d simply run:

```javascript
Update(
  Ref(Collection("Spaceships"), "266354515987399186"),
  {
    data: {
      name: "Millennium Falcon"
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274726650000,
  "data": {
    "name": "Millennium Falcon",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

As you can see, only the name has been updated in the document and the pilot remains untouched. It’s also possible to replace an entire document using [Replace](https://docs.fauna.com/fauna/current/api/fql/functions/replace) instead.

### **Delete**

On second thought, it’s probably better if we don’t use that copyrighted name for our spaceship. We don’t want to get into trouble with the galactic empire.

As expected, to delete a document we simply use [Delete](https://docs.fauna.com/fauna/current/api/fql/functions/delete):

```javascript
Delete (
  Ref(Collection("Spaceships"), "266354515987399186")
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266354515987399186"),
  "ts": 1590274726650000,
  "data": {
    "name": "Millennium Falcon",
    "pilot": Ref(Collection("Pilots"), "266350546751848978")
  }
}
```

Let’s create a new spaceship again to continue with our adventure:

```javascript
Create(Collection("Spaceships"), {
  data: {
    name: "Voyager",
    pilot: Ref(Collection("Pilots"), "266350546751848978"),
  },
});
```

## Your first index

Fetching all documents in a database to check if each document fits a particular criteria would be very slow. In the relational world, this would be comparable in concept to a full table scan.

To solve this problem, Fauna implements [indexes](https://docs.fauna.com/fauna/current/api/fql/indexes). These are database entities that organise your data in such a way that they allow for efficient lookup of multiple documents. Whenever you create new documents, Fauna will know which indexes it needs to update in the background.

As we’ll see in the next article, indexes can span multiple collections and accept parameters for sorting and filtering.

For now, let’s create a simple index to list all the documents in a collection:

```javascript
CreateIndex({
  name: "all_Pilots",
  source: Collection("Pilots")
})

// Result:

{
  "ref": Index("all_Pilots"),
  "ts": 1590278778420000,
  "active": true,
  "serialized": true,
  "name": "all_Pilots",
  "source": Collection("Pilots"),
  "partitions": 8
}
```

Again, you can see that an index is just another type of document.

After adding some more pilots to our collection, we can query our new index like this:

```javascript
Paginate(
  Match(
    Index("all_Pilots")
  )
)

// Result:

{
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394"),
    Ref(Collection("Pilots"), "266359371696439826"),
    Ref(Collection("Pilots"), "266359447111074322")
  ]
}
```

Let’s break this down:

- [Index](https://docs.fauna.com/fauna/current/api/fql/functions/iindex) returns a reference to an index
- [Match](https://docs.fauna.com/fauna/current/api/fql/functions/match) accepts that reference and constructs a set, which is sort of like an abstract representation of the data. At this point, no data has been fetched from Fauna yet.
- [Paginate](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) takes the output from Match, fetches data from Fauna, and returns a [Page](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#page) of results. In this case, this is simply an array of references.

### **Using the Documents function to get all the documents of a collection**

The previous index was actually a very simplistic example that served as an introduction to indexes.

Since retrieving all the documents in a collection is a very common need, Fauna provides us with the [Documents](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function to avoid the need to create a new index for every collection. It produces exactly the same results as the equivalent index.

```javascript
Paginate(Documents(Collection('Pilots')))

// Result:

{
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394"),
    Ref(Collection("Pilots"), "266359371696439826"),
    Ref(Collection("Pilots"), "266359447111074322")
  ]
}
```

### **Page size**

By default, Paginate returns pages of 64 items. You can define how many items you’d like to receive with the **size** parameter up to 100,000 items:

```javascript
Paginate(
  Match(Index("all_Pilots")),
  {size: 2}
)

// Result:

{
  "after": [
    Ref(Collection("Pilots"), "266359371696439826")
  ],
  "data": [
    Ref(Collection("Pilots"), "266350546751848978"),
    Ref(Collection("Pilots"), "266359364060709394")
  ]
}
```

Since the number of results, in this case, does not fit in one page, Fauna also returns the **after** property to be used as a cursor. You can read more about [using cursors in the docs](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor).

## Using Lambda() to retrieve a list of documents

In some cases, you might want to retrieve a list of references, but generally, you will probably need an actual list of documents.

Initially, you might think the best way to solve this would be by performing multiple queries from your programming language. That would be an anti-pattern which you absolutely want to avoid. You would introduce unnecessary latency and make your application much slower than it needs to be.

For example, in this JavaScript example, you'd be waiting first for the query to get the references and then for the queries to get the documents:

```javascript
// Don't do this!
const result = await client.query(q.Paginate(q.Match(q.Index("all_Pilots")));
const refs = result.data;
const promises = result.map(refs.map(ref => client.query(q.Get(ref))));
const pilots = await Promise.all(promises);
```

Or even worse, by waiting for each and every query that gets a document:

```javascript
// Don't do this!
const result = await client.query(q.Paginate(q.Match(q.Index("all_Pilots")));
const refs = result.data;
const pilots = [];
for (const ref of refs) {
  const pilot = await client.query(q.Get(ref));
  pilots.push(pilot);
}
```

The solution is simply to use FQL to solve this neatly in a single query.

Here's the idiomatic solution of getting an actual list of documents from an array of references:

```javascript
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda('pilotRef', Get(Var('pilotRef')))
)

// Result:

{
  "data": [
    {
      "ref": Ref(Collection("Pilots"), "266350546751848978"),
      "ts": 1590270525630000,
      "data": {
        "name": "Flash Gordon"
      }
    },
    {
      "ref": Ref(Collection("Pilots"), "266359364060709394"),
      "ts": 1590278934520000,
      "data": {
        "name": "Luke Skywalker"
      }
    },
    // etc...
  ]
}
```

We’ve already seen that Paginate returns an array of references, right? The only mystery here is Map and this Lambda thing.

You’ve probably already used a map function in your programming language of choice. It’s a function that accepts an array and returns a new array after performing an action on each item.

Consider this JavaScript example:

```javascript
const anotherArray = myArray.map((item) => doSomething(item));

// which is equivalent to:

const anotherArray = myArray.map(function (item) {
  return doSomething(item);
});
```

With this in mind, let’s break down this part of our FQL query:

```javascript
Map(
  Paginate(Match(Index("all_Pilots"))),
  Lambda("pilotRef", Get(Var("pilotRef")))
);
```

- Paginate returns an array of references.
- [Map](https://docs.fauna.com/fauna/current/api/fql/functions/map) accepts an array (from Paginate or other sources), performs an action on each item of this array, and returns a new array with the new items. In this case, the action is performed using [Lambda](https://docs.fauna.com/fauna/current/api/fql/functions/lambda), which is the Fauna equivalent of what you'd call a simple anonymous function in JavaScript. It's all very similar to the previous JavaScript example.
- **Lambda('pilotRef'** defines a parameter called pilotRef for the anonymous function. You can name this parameter anything that makes sense for you. Fauna doesn’t care. In this example, the parameter will receive a reference which is why I named it pilotRef.
- [Var](https://docs.fauna.com/fauna/current/api/fql/functions/var) is used to evaluate variables. In this case, it evaluates **"pilotRef"** and returns the document reference.
- Finally, Get will receive the reference and return the actual document.

If we were to rewrite the previous FQL query with the JavaScript Fauna driver, we could do something like this:

```javascript
q.Map(q.Paginate(q.Match(q.Index("all_Pilots"))), (pilotRef) =>
  q.Get(pilotRef)
);

// Or:

q.Map(
  q.Paginate(q.Match(q.Index("all_Pilots"))),
  q.Lambda("pilotRef", q.Get(q.Var("pilotRef")))
);
```

**Quick tip:** you can paste JavaScript queries into the Fauna shell as well as FQL queries.

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3xvvAIDkV7aNfn4vxhgIMu/2f6ae8bb103904b0bd8f47fa42774c17/7654-FQL-p1-4.png)

## Using Let() and Select() to return custom results

Up until now, our documents have been pretty minimalistic. Let's add some more data to our spaceship:

```javascript
Update(
  Ref(Collection("Spaceships"),"266356873589948946"),
  {
    data: {
      type: "Rocket",
      fuelType: "Plasma",
      actualFuelTons: 7,
      maxFuelTons: 10,
      maxCargoTons: 25,
      maxPassengers: 5,
      maxRangeLightyears: 10,
      position: {
        x: 2234,
        y: 3453,
        z: 9805
      }
    }
  }
)

// Result:

{
  "ref": Ref(Collection("Spaceships"), "266356873589948946"),
  "ts": 1590524958830000,
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
    "position": {
      "x": 2234,
      "y": 3453,
      "z": 9805
    }
  }
}
```

Cool.

So now imagine our application were in fact managing a whole fleet and you needed to show a list of ships to the fleet admiral.

First, we'd need to create an index:

```javascript
CreateIndex({
  name: "all_Spaceships",
  source: Collection("Spaceships"),
});
```

Ok, now we just use Paginate, Map, and Lambda like we saw earlier to get all the documents. So we do that but... Oh no!

The fleet admiral is very unhappy about the slow performance of his holomap now.

Sending the complete list with thousands of documents across lightyears of space wasn't a great idea because it's a lot of data. We propose breaking down the results with pages, but the admiral _absolutely_ needs to see all ships at once.

_"By the cosmic gods! I don't care how much fuel a ship has!"_ shouts the admiral. _"I only want to know its name, id, and position!"._

Of course! Let's do that:

```javascript
Map(
  Paginate(Match(Index("all_Spaceships"))),
  Lambda("shipRef",
    Let(
      {
        shipDoc: Get(Var("shipRef"))
      },
      {
        id: Select(["ref", "id"], Var("shipDoc")),
        name: Select(["data", "name"], Var("shipDoc")),
        position: Select(["data", "position"], Var("shipDoc"))
      }
    )
  )
)

// Result:

{
  "data": [
    {
      "id": "266356873589948946",
      "name": "Voyager",
      "position": {
        "x": 2234,
        "y": 3453,
        "z": 9805
      }
    },
    {
      "id": "266619264914424339",
      "name": "Explorer IV",
      "position": {
        "x": 1134,
        "y": 9453,
        "z": 3205
      }
    }
    // etc...
  ]
}
```

Boom! Now the holomap loads much faster. We can see the satisfaction in the admiral's smile.

Since we already know how Paginate, Map, and Lambda work together, this is the new part:

```javascript
Let(
  {
    shipDoc: Get(Var("shipRef")),
  },
  {
    id: Select(["ref", "id"], Var("shipDoc")),
    name: Select(["data", "name"], Var("shipDoc")),
    position: Select(["data", "position"], Var("shipDoc")),
  }
);
```

### **Let**

[Let](https://docs.fauna.com/fauna/current/api/fql/functions/let) is a function used in FQL to create custom objects. You can even have nested Let functions to format the data with total freedom.

The first part of Let is used to define variables that will be used later on. The docs call these variables "bindings". These bindings will be available to any nested Let objects you create.

Here we define a **shipDoc** variable which will store the document returned from Get, which in turn will use the reference from the Lambda parameter:

```javascript
{
  shipDoc: Get(Var("shipRef"));
}
```

The second part is the actual object that will be returned by Let:

```javascript
{
  id: Select(["ref", "id"], Var("shipDoc")),
  name: Select(["data", "name"], Var("shipDoc")),
  position: Select(["data", "position"], Var("shipDoc"))
}
```

### **Select**

[Select](https://docs.fauna.com/fauna/current/api/fql/functions/select) is used to select data from objects or arrays.

```javascript
Select(["data", "name"], Var("shipDoc"));
```

Here, we're telling Fauna to select the **name** property from the **data** property of the document stored in the **shipDoc** binding.

This array-like notation **"data", "name"** is called a path in Fauna lingo. We're using it here to get to the **name** property, but it can be used with integers to access array items too.

## Conclusion

So that's it for today. Hopefully, you learned something valuable!

In part 2 of the series, we will continue our space adventure by going deeper into indexes.

If you have any questions, don't hesitate to hit me up on Twitter: [@pierb](https://twitter.com/pierb)

**Next up:** [Part 2 - a deep dive into indexes with Fauna](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-2)

If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!

## Share this post

[Twitter](https://twitter.com/intent/tweet?url=https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1&text=Getting%20started%20with%20FQL%2C%20Fauna%E2%80%99s%20native%20query%20language%20-%20part%201)[LinkedIn](https://www.linkedin.com/shareArticle/?mini=true&url=https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1&title=Getting%20started%20with%20FQL%2C%20Fauna%E2%80%99s%20native%20query%20language%20-%20part%201&summary=Fauna%20is%20a%20serverless%20global%20database%20designed%20for%20low%20latency%20and%20developer%20productivity.%20FQL%2C%20its%20query%20language%2C%20was%20also%20designed%20with%20these%20goals%20in%20mind.%20With%20it%2C%20you%20can%20create%20expressive%20queries%20that%20will%20allow%20you%20to%20harness%20the%20full%20power...&source=Fauna.com)

## Subscribe to Fauna blogs & newsletter

Get latest blog posts, development tips & tricks, and latest learning material delivered right to your inbox.

<iframe title="subscribe to newsletter form" src="https://www2.fauna.com/l/517431/2020-11-11/71k42s" class="css-1hfzrsj"></iframe>

[<- Back](https://fauna.com/blog)
