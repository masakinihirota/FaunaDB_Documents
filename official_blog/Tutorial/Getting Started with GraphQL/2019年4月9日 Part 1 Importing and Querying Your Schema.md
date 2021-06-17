Getting Started with GraphQL, Part 1: Importing and Querying Your Schema
https://fauna.com/blog/getting-started-with-graphql-part-1-importing-and-querying-your-schema













# Getting Started with GraphQL, Part 1: Importing and Querying Your Schema


GraphQL入門、パート1：スキーマのインポートとクエリ



Chris Anderson|Apr 9th, 2019|

2019年4月9日




Categories:






[Features](https://fauna.com/blog?category=features)[Tutorial](https://fauna.com/blog?category=tutorial)[Jamstack](https://fauna.com/blog?category=jamstack)[GraphQL](https://fauna.com/blog?category=graphql)[Serverless](https://fauna.com/blog?category=serverless)






Tip

ヒント




### The Fauna Cloud Console now has GraphQL Playground!


Fauna CloudConsoleにGraphQLPlaygroundが追加されました！



This blog was written before we added GraphQL Playground to our Cloud Console. Although this tutorial will still work, we recommend that you follow this tutorial series instead:


このブログは、GraphQLPlaygroundをクラウドコンソールに追加する前に作成されました。このチュートリアルは引き続き機能しますが、代わりにこのチュートリアルシリーズに従うことをお勧めします。


https://docs.fauna.com/fauna/current/start/
1.  [Getting started with GraphQL](https://docs.fauna.com/fauna/current/start/)
2.  [GraphQL Relations](https://docs.fauna.com/fauna/current/howto/graphql/relations)
3.  [Unique Constraints in GraphQL](https://docs.fauna.com/fauna/current/howto/graphql/unique)
4.  [GraphQL Pagination](https://docs.fauna.com/fauna/current/howto/graphql/pagination)

GraphQLの使用を開始する
GraphQLリレーション
GraphQLの一意の制約
GraphQLページネーション




GraphQL is a common language that backend and frontend developers can use to specify the shape and content of the data they request. By decoupling backend development from frontend API requirements, GraphQL removes tons of friction from the development process and allows frontend developers to make progress without waiting on backend changes. Similarly, it allows backend developers to focus on the logical aspects of providing a data API, not the procedural headaches involved in formatting the data for the front end. Because it’s such a compelling technology, there is an abundance of GraphQL middleware, caches, developer tools, and other components.






Fauna is proud to join this ecosystem with the beta release of our GraphQL API. This post shows you how to get started. Simply supply a GraphQL schema definition and Fauna is ready to handle your queries. Thanks especially to [Erick Pintor](https://github.com/erickpintor) and the engineering team for their hard work on this feature.






This series will continue and cover more advanced features like relations. If you start writing code today, please join our [community Slack](https://publicslack.com/slacks/fauna-community/invites/new) and let us know how it’s going. These are beta features, so your feedback today would have a big impact on the production release.






## Steps to get started






By following these steps, you’ll be up and running with the Fauna GraphQL API. It should take about 15 minutes, or less if you are already familiar with the tools.






### 1. GraphQL schema definition file






First you need a GraphQL schema definition file. You’ll upload this file to our GraphQL endpoint URL. Here is a simple example:






```graphql
type Todo {
   title: String!
   completed: Boolean
}
type Query {
   allTodos: [Todo!]
   todosByCompletedFlag(completed: Boolean!): [Todo!]
}
```






To follow along at home, put this in a file called schema.gql. We’ll use curl to upload it to the Fauna GraphQL import API.






### 2\. Create a database using Fauna Shell and a provision a key






To create a database with [Fauna Shell](https://docs.fauna.com/fauna/current/quickstart.html), and import your GraphQL schema, issue the following commands and copy the key secret (it doesn't matter what name you give your database, just be consistent):






```shell
$ fauna create-database graphql
created database 'graphql'
$ fauna create-key 'graphql'
creating key for database 'graphql' with role 'admin'
 created key for database 'graphql' with role 'admin'.
 secret: <key-secret>
 To access 'graphql' with this key, create a client using
 the driver library for your language of choice using
 the above secret.
```






Alternatively, you can create a database via [dashboard.fauna.com](https://dashboard.fauna.com/), and provision a server secret. Copy this secret for the next command.






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/4C2mBILmfrF9VvQNQpqzFL/eaf39829e522dab796abd73865c91bd3/6936-GetStarted-Graphql-p1-1.png)






### 3\. Import the graphql file into Fauna’s GraphQL endpoint






The Fauna GraphQL API can import your schema definition, creating all of the classes and indexes as necessary. The key secret you just provisioned (followed by the : character) is sent as an HTTP header to scope the query to the database you just created. Run this command to import your schema:






```shell
$ curl -u <key-secret>: https://graphql.fauna.com/import --data-binary "@schema.gql"
Schema imported successfully.
Use the following HTTP header to connect to the Fauna GraphQL API:






{ "Authorization": "Basic <encoded secret>" }
```






You can see in the result that the GraphQL schema was imported successfully. Looking at the database in the Shell, you can see the generated schema:






```javascript
graphql> Paginate(Union(Classes(), Indexes()))
{ data:
  [ Class("Todo"),
    Index("todosByCompletedFlag"),
    Index("allTodos") ] }
```






You can see Fauna has generated a schema to support your GraphQL environment. The Fauna Shell can be useful for understanding the underlying indexes and classes, but everyday work can be done via GraphQL. Once we are connected via the GraphQL explorer, we can view the schema in GraphQL form.






### 4\. Open GraphQL Playground






Open GraphQL Playground  [https://electronjs.org/apps/graphql-playground](https://electronjs.org/apps/graphql-playground), and connect it to [https://graphql.fauna.com/graphql](https://graphql.fauna.com/graphql).






You'll have to configure GraphQL Playground to send a base64 encoded "Authorization" header with your secret in it. This is provided as part of the response to importing a schema.






In GraphQL Playground, configure the headers tab with:






```json
{
   "Authorization": "Basic <encoded-secret>"
}
```






### 5\. Inspect the GraphQL schema






Fauna adds a few metadata attributes to the GraphQL schema that you provided, and you can see this in GraphQL Playground:






```graphql
directive @collection(name: String!) on OBJECT
directive @index(name: String!) on FIELD
directive @embedded on OBJECT
directive @relation(relation: String) on FIELD
directive @unique(unique: String) on FIELD
scalar Date






scalar Long






type Mutation {
  createTodo(data: TodoInput!): Todo!
  updateTodo(
    id: ID!
    data: TodoInput!
  ): Todo
  deleteTodo(id: ID!): Todo
}






type Query {
  findTodoByID(id: ID!): Todo
  todosByCompletedFlag(
    _size: Int
    _cursor: String
    completed: Boolean!
  ): TodoPage!
  allTodos(
    _size: Int
    _cursor: String
  ): TodoPage!
}






scalar Time






type Todo {
  _id: ID!
  _ts: Long!
  title: String!
  completed: Boolean
}






input TodoInput {
  title: String!
  completed: Boolean
}






type TodoPage {
  data: [Todo]!
  after: String
  before: String
}
```






One of my favorite things about GraphQL is first class support for inspecting the schema, and seeing exactly how Fauna models objects and inputs in GraphQL is a powerful aid in development.






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2wPvLoAo2vtKpTulZfC9M4/0fb4bd03326757e66b40d41b4ca398dd/6937-GetStarted-Graphql-p1-2.png)






### 6\. Run GraphQL Queries






Once connected, you can run queries like the following to create a todo:






```graphql
mutation CreateATodo {
   createTodo(data: {
   title: "Build an awesome app!"
   completed: false
   }) {
       title
       completed
   }
}
```






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7DVzHIRGFDcJpeSRIEj8SX/62c3c5ac3e5c8ab26b067a7876f6e1da/6938-GetStarted-Graphql-p1-3.png)






Once you have created a few todos, you can list them with this query:






```graphql
query FindAllTodos {
  allTodos {
    data {
      _id
      title
      completed
    }
  }
}
```






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6MYM2Ancrq7pQ8nLlVsst5/bbecd8e77f0e40813068eaf535e4e64b/6939-GetStarted-Graphql-p1-4.png)






Or you can look up an individual todo by its ID. Take one of the IDs from the last query's result, and paste it in place of in the following query:






```graphql
query FindATodoByID {
   findTodoByID(id: "<id>") {
       title
       completed
   }
}
```






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2DeZNuYNTTw07hEQZxIVcx/d79d419779ebdcf92cec346b8c631962/6940-GetStarted-Graphql-p1-5.png)






You can also update a todo by its ID. Just paste one of the IDs in place of  in this query:






```graphql
mutation UpdateATodo {
   updateTodo(id: "<id>", data: {
       title: "Build two awesome apps!"
       completed: true
   }) {
       title
       completed
   }
}
```






Similarly, delete a todo, based on its id, with this query:






```graphql
mutation DeleteATodo {
   deleteTodo(id: "<id>") {
       title
   }
}
```






### Automatic index generation






When a parameter is defined with a flag, it can be used as an index term. For example, this query lists all todos that are completed:






```graphql
query FindAllCompletedTodos {
  todosByCompletedFlag(completed: true) {
      data {
        title
      }
  }
}
```






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2BLMtq5QD8g9z4p3Ncldbz/c64de9e3eede2d1d3a26d609869d29cd/6941-GetStarted-Graphql-p1-6.png)






In [Part 2](javascript:void(0)) of this series, we’ll look at relationships by expanding our example to include lists, so that we can query for all of the todos in a list, retrieving their title and other metadata in a compact GraphQL representation that’s right for your app.










































