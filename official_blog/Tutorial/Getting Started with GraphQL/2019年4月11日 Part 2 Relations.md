Getting Started with GraphQL, Part 2: Relations
https://fauna.com/blog/getting-started-with-graphql-part-2-relations




















# Getting Started with GraphQL, Part 2: Relations






Chris Anderson|Apr 11th, 2019|






Categories:






[Tutorial](https://fauna.com/blog?category=tutorial)[GraphQL](https://fauna.com/blog?category=graphql)[Serverless](https://fauna.com/blog?category=serverless)[Features](https://fauna.com/blog?category=features)[Jamstack](https://fauna.com/blog?category=jamstack)






Tip






### The Fauna Cloud Console now has GraphQL Playground!






This blog was written before we added GraphQL Playground to our Cloud Console. Although this tutorial will still work, we recommend that you follow this tutorial series instead:






1.  [Getting started with GraphQL](https://docs.fauna.com/fauna/current/start/)
2.  [GraphQL Relations](https://docs.fauna.com/fauna/current/howto/graphql/relations)
3.  [Unique Constraints in GraphQL](https://docs.fauna.com/fauna/current/howto/graphql/unique)
4.  [GraphQL Pagination](https://docs.fauna.com/fauna/current/howto/graphql/pagination)






In the previous post, we explored [how to set up your development environment and query your GraphQL schema](javascript:void(0)). Assuming that you are already connected to your database via Fauna Shell and GraphQL Playground, this article focuses on adding relationships to your GraphQL queries.






> Fauna’s GraphQL API automatically turns your schema definition into Fauna relations so that relational queries are easy.






Follow along on your workstation in GraphQL Playground to explore Fauna's native GraphQL API.






### The @relation directive






The @relation directive connects an attribute to another GraphQL type, so that you can model your domain. By default, document references are embedded in the source object, but when the @relation directive is used, indexes are created and queried automatically. In this app, each todo belongs to a particular list. Also, we add a query to find all of the lists including their related todos. Note that Fauna’s GraphQL API takes care of connecting the List and Todo types, so the GraphQL you expect to write just works.






```graphql
type Todo {
    title: String!
    completed: Boolean!
    list: List
}






type List {
    title: String!
    todos: [Todo] @relation
}






type Query {
    allTodos: [Todo!]
    todosByCompletedFlag(completed: Boolean!): [Todo!]
    allLists: [List!]
}
```






Import this schema into Fauna by creating a database, provisioning a key secret, and uploading it via curl (for detailed instructions see the first article in this series). Alternatively, you can just reuse the secret from the previous article, and your schema will be safely upgraded:






```shell
curl -u <key-secret>: https://graphql.fauna.com/import --data-binary "@<graphql-schema-filename>"
```






Now you can inspect the schema via Fauna Shell or GraphQL Playground. Remember to configure the Authorization header in your GraphQL Playground for the current database.






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/dqoIEe9LHLaQ3bnSw7G2x/d4a415b14d13222c8e7c495a1b77be58/6942-GetStarted-Graphql-p2-1.png)






The generated schema adds some new types for the @relation directive: ListTodosRelation and TodoListRelation. These types correspond to indexes or document references in Fauna and are transparently managed by the Fauna GraphQL API.






```graphql
input ListTodosRelation {
 create: [TodoInput]
 connect: [ID]
 disconnect: [ID]
}






input TodoListRelation {
 create: ListInput
 connect: ID
 disconnect: Boolean
}
```






When you create an object, you can connect it to existing objects, or create new related objects. Additionally, when modifying an object you can disconnect related objects by id. Continue reading for examples.






### Create a todo list






The first thing we need to do is create a list and add all of our existing todos to it. Let’s create the list via GraphQL:






```graphql
mutation CreateAList {
   createList(data: {
     title: "Build an awesome app!"
   }) {
     title
     _id
   }
}
```






Note the id from this result, as you'll need it in the Fauna Shell.






### Migrate existing todos to the list






To migrate the existing todos, it’s easiest to use Fauna Shell and issue a bulk update using the id returned from the above CreateAList query:






```shell
$ fauna shell graphql # or whatever your database is named
```






In Fauna Shell issue this query (using your id):






```javascript
> Map(
  Paginate(Match(Index("allTodos"))), 
  todoID =>
    Update(todoID, { 
      data: { 
        list: Ref(Class("List"), "228661410636235268") 
      }
    }))
```






And the results should look something like:






```javascript
{ data:
   [ { ref: Ref(Class("Todo"), "228474048686850572"),
       ts: 1554334241180000,
       data:
        { title: 'Build an awesome app!',
          completed: true,
          list: Ref(Class("List"), "228661410636235268") } },
     { ref: Ref(Class("Todo"), "228474165045232141"),
       ts: 1554334241180000,
       data:
        { title: 'Connect the front end.',
          completed: false,
          list: Ref(Class("List"), "228661410636235268") } },
     { ref: Ref(Class("Todo"), "228474207247270411"),
       ts: 1554334241180000,
       data:
        { title: 'Implement RBAC for Access control.',
          completed: false,
          list: Ref(Class("List"), "228661410636235268") } } ] }
```






### Query todos in a list






This query lists all of the todos in a particular list, as well as the list’s title:






```graphql
query FindAListByID {
    findListByID(id: "228661410636235268") {
        title
        todos {
          data { title completed }
        }
    }
}
```






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/QRx9xQ99lJevMqK2UdvOh/2c3b1feab10dcdb9522bea03d7786690/6943-GetStarted-Graphql-p2-2.png)






In the screenshot, we can see that all of the todo titles and their completed status have been returned as part of the result set. Fauna’s GraphQL API automatically turns your schema definition into Fauna relations so that relational queries are easy.






### Move a todo to a new list






We can move one of our todo items from one list to another list. First create a new list using the CreateAList query above, and copy its id. Then choose a todo to update, and use its id together with the list id, in a query to set the connect field on the list attribute:






```graphql
mutation UpdateATodo {
    updateTodo(id: "228474048686850572", data: {
        title: "Build an awesome app!"
        completed: true,
        list: { connect: "228668866541126147" }
    }) {
        title
        completed
    }
}
```






Note the connect field which is supplied as part of the generated Fauna schema. This is how the Fauna GraphQL API manages references between documents.






### Query all lists with todos






The last query is similar to the FindAListByID query above, except instead of finding one list, it finds them all. I like this query because it shows the power of relations in Fauna’s GraphQL API. Each list includes the todos, without the developer having to concern themselves with any underlying database design issues like joins or indexes. Here’s the query:






```graphql
query FindAllLists {
    allLists {
      data { 
        _id
        title
        todos { 
          data {
            title 
            completed 
          }
        }
      }
    }
}
```






You can see in the screenshot that our new list has some todo items assigned to it, and their title and completed state are inlined into the response. Thanks GraphQL, for making app development super simple!






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2wtKw7EHdxoC4I2mKmFFdI/dacffb0f053141f8792347dad33c0f7d/6944-GetStarted-Graphql-p2-3.png)






### Create a list with some todos






Similarly to the connect field, the create field gives access to the underlying collection. So you can add a list together with a handful of todos in a single GraphQL mutation. Here is a query which does that:






```graphql
mutation CreateListWithTodos {
    createList(data: {
        title: "The Basics",
          todos: { create: [ 
            {completed: false, title: "Water"}, 
            {completed: false, title: "Food"},
            {completed: false, title: "Shelter"}]},
    }) {
        _id
        title
        todos {
          data {
            title
          }
        }
    }
}
```






If you rerun your FindAllLists query, above, you’ll see the new list with its todos. 






### Add todos to an existing list using the create API






The create capability can also be used in the context of a mutation. One way to add new todos to a list (while changing its other fields if you like) looks like this:






```graphql
 mutation UpdateAList {
    updateList(id: "228833728394166795", data: {
        title: "The Very Basics"
        todos: {
          create : [{title : "Fire", completed: true}]
        }
    }) {
        title
        todos { 
            data {
               title
            }
        }
    }
}
```






In [Part 3](javascript:void(0)) of this series, we'll look at how to add constraints to our schema using the @unique directive.





















