Getting Started with GraphQL, Part 4: Updating your Schema
https://fauna.com/blog/getting-started-with-graphql-part-4-updating-your-schema







# Getting Started with GraphQL, Part 4: Updating your Schema






Leo Regnier|Aug 1st, 2019|






Categories:






[Features](https://fauna.com/blog?category=features)[Serverless](https://fauna.com/blog?category=serverless)[GraphQL](https://fauna.com/blog?category=graphql)[Jamstack](https://fauna.com/blog?category=jamstack)[Tutorial](https://fauna.com/blog?category=tutorial)






In previous articles, we explored how to [set up your development environment and query your GraphQL schema](https://fauna.com/blog/getting-started-with-graphql-part-1-importing-and-querying-your-schema), how to [add relationships to your GraphQL queries](https://fauna.com/blog/getting-started-with-graphql-part-2-relations), and lastly, how to [add unique constraints to your GraphQL schema](https://fauna.com/blog/getting-started-with-graphql-part-3-the-unique-directive). In this article, we’ll look at different ways you can update your current schema, and explore what you can do with Fauna’s built-in @embedded directive when it comes to schema design.






The schema is a key piece of any GraphQL API and its correct definition determines a successful interaction between clients and servers. Unlike other APIs, GraphQL uses a strong type system to define the data and the operations that can be performed. Once established, this schema is what enables, among other things, the extensive querying flexibility distinctive of a GraphQL API.






As most pieces of software, the schema needs to evolve over time, and, sooner or later, we will face a scenario in which it needs to be updated. As in other areas, GraphQL offers great flexibility when it comes to schema updates.






Let’s continue our exploration with how we can extend an existing schema through Fauna’s GraphQL API!






## Updating your schema






In the last article, we defined a simple User object type with a unique username field:






```graphql
type User {
  username: String! @unique
}
```






Now, we’re going to extend the User object by adding a new Address object type field to it. If you are familiar with Domain-Driven Design, we want to model the new Address object type as a _value object_. That is, we don’t care about an Address’s particular identity; we just want it to be part of the User object. From the API perspective, this means that we don’t need to query an Address on its own, but we will always do it through the User object. 






During the import process, unless defined otherwise, all object types are considered _entities_ by default. This means that an ID field, as well as top-level CRUD operations, is created automatically for the given object. At the database layer, a Collection, as well as an Index, is associated for the imported object. 






In order to tell to the import process to not create all of these elements automatically, we need to use Fauna’s built-in @embedded directive. If annotated with the @embedded directive, no ID field nor CRUD operations are generated for the given object. At the database layer, the annotated type is an embedded object within the document associated with the parent object type. All of the necessary metadata for the embedded object is stored in this document as well. 






Let’s create a file with the updated schema using the @embedded directive for defining our new Address object type:






```graphql
type User {
  username: String! @unique
  address: Address
}






type Address @embedded {
  street: String!
  city: String!
  state: String!
  zipCode: String!
}
```






Import this schema into Fauna by logging into the Cloud Console. Select the database you created in previous articles and go to the GRAPHQL section from the left menu bar. Click on the UPDATE SCHEMA button and select the file containing the updated schema.






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7hBif0tymPZX2PnnrJSE54/5543465895625eafef3fd86545a7b134/3103-Graphql_p4_1.png)






At the database layer, the update process creates any missing collections, indexes, and functions. If any of those elements already exist, the API overrides its metadata with the new GraphQL schema information. If no new schema information is provided for elements already containing GraphQL metadata, they remain the same.






At this point, it is important to remember that the GraphQL schema information is stored in the form of _metadata_ among the different database elements. During the update process, only this metadata might be overridden with the new given schema definition while the actual data always remains unmodified. This means that the GraphQL schema can be updated safely without worrying about data loss.






Now, let’s create a new User, along with its Address information, by running the following query from Console’s GraphQL Playground:






```graphql
mutation CreateUser {
  createUser(data: {
    username: "jerry"
    address: {
      street: "129 West 81st Street Apt 5A",
      city: "New York"
      state: "NY"
      zipCode: "10024"
    }
  }) {
    username
    address {
      street
      city
      state
      zipCode
    }
  }
}
```






As a result, you should see the following response:






```json
{
  "data": {
    "createUser": {
      "username": "jerry",
      "address": {
        "street": "129 West 81st Street Apt 5A",
        "city": "New York",
        "state": "NY",
        "zipCode": "10024"
      }
    }
  }
}
```






If you query information on any pre-existing user, you should notice that everything works as expected, and that previous data has remained unchanged. We have successfully updated the GraphQL schema definition without affecting any pre-existing data! 






## Overriding your schema 






In this section, we look at how you can override an existing schema. Overriding a schema works very differently from the update process we have described above, and it’s very important to learn the differences between these two types of operations.






When overriding a schema, all previous GraphQL metadata is removed. All database elements, such as collections, indexes and functions, which were previously annotated with GraphQL metadata, are also removed. Unlike the update operation, when overriding a schema, actual data might be erased from the database. Any other elements that do not have GraphQL metadata won’t be affected. Since this is an operation that might cause data loss, you must be careful and understand its effects.






Now, let’s create a new database to explore how the override schema process works. From the Cloud Console home page, click on the NEW DATABASE button:






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5gH9siz6fA7LlxI7pUEZBI/015f99ed42e9f7d4bdc9445018066dd2/3104-Graphql_p4_2.png)






Give a name for the new database and save it:






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/9Z8VhzEeBCJowbvLtlYUH/821752b8a2a73c3ce86be69f41cf9fcc/3105-Graphql_p4_3.png)






Once the new database is ready, let’s reuse the previous file in order to import the GraphQL schema we have used before:






```graphql
type User {
  username: String! @unique
  address: Address
}






type Address @embedded {
  street: String!
  city: String!
  state: String!
  zipCode: String!
}
```






From the Cloud Console, select GRAPHQL from the left menu bar, click the IMPORT SCHEMA button, and choose the GraphQL schema file listed above:






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6z9s09BCz4WRRk77uC4Kq9/55edb5a0f9b1278ac173409cebe701bf/3106-Graphql_p4_4.png)






Once the schema is imported, let’s create a new User as follows:






```graphql
mutation CreateUser {
  createUser(data: {
    username: "george"
    address: {
      street: "1344 Queens Blvd",
      city: "Long Island City"
      state: "NY"
      zipCode: "11101"
    }
  }) {
    username
    address {
      street
      city
      state
      zipCode
    }
  }
}
```






You should see the following response:






```json
{
  "data": {
    "createUser": {
      "username": "george",
      "address": {
        "street": "1344 Queens Blvd",
        "city": "Long Island City",
        "state": "NY",
        "zipCode": "11101"
      }
    }
  }
}
```






Now that we have an initial schema and some data already loaded into the database, let’s see what happens when we override the current GraphQL schema.






Create a new file containing the following schema, which does not include the User nor the Address object type:






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






From the GRAPHQL view in the Cloud Console, select the OVERRIDE SCHEMA button. You should see a warning message explaining the effects of the override operation:






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6tiQfrNowZrrpCLw55ravp/676fd7385d8d06941a165871f1850c94/3107-Graphql_p4_5.png)






Select OVERRIDE and choose the schema file mentioned above. The operation takes around one minute to complete; this extra time is necessary to allow all cluster nodes to process the deletions.






Once the override is finished, let’s try to create a new User again:






```graphql
mutation CreateUser {
  createUser(data: {
    username: "elaine"
    address: {
      street: "16 West 75th Street Apt 2G",
      city: "New York"
      state: "NY"
      zipCode: "10023"
    }
  }) {
    username
    address {
      street
      city
      state
      zipCode
    }
  }
}
```






Since the User and Address objects are no longer present in the overridden schema, you should get an error response:






```json
{
  "data": null,
  "errors": [
    {
      "message": "Cannot query field 'createUser' on type 'Mutation'. Did you mean 'createTodo'? (line 2, column 3):\n  createUser(data: {username: \"george\", address: {street: \"1344 Queens Blvd\", city: \"Long Island City\", state: \"NY\", zipCode: \"11101\"}}) {\n  ^",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ]
    }
  ]
}
```






If you try to find the User collection, you will notice that it has been removed along with all of its documents:






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/guxv4jMD5dn3gcqgqPpPR/b1aaa641313afd3ea493c058ec2b1923/3108-Graphql_p4_6.png)






We have now learned how the data is affected when overriding a GraphQL schema!






## Conclusion






In this post, we have explored the two different ways that a GraphQL schema can be updated. We have learned the important differences between these two methods, as well as how Fauna’s built-in @embedded directive can help you to model the schema in more advanced ways.






Stay tuned for more about GraphQL and Fauna, as we explore how to import a schema for an existing database, how to write custom mutations, how to paginate over a list of objects, and much more!


































