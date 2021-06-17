Getting Started with GraphQL, Part 3: The Unique Directive
https://fauna.com/blog/getting-started-with-graphql-part-3-the-unique-directive







# Getting Started with GraphQL, Part 3: The Unique Directive






Chris Anderson|Apr 30th, 2019|






Categories:






[Jamstack](https://fauna.com/blog?category=jamstack)[Features](https://fauna.com/blog?category=features)[Tutorial](https://fauna.com/blog?category=tutorial)[Serverless](https://fauna.com/blog?category=serverless)[GraphQL](https://fauna.com/blog?category=graphql)






Tip






### The Fauna Cloud Console now has GraphQL Playground!






This blog was written before we added GraphQL Playground to our Cloud Console. Although this tutorial will still work, we recommend that you follow this tutorial series instead:






1.  [Getting started with GraphQL](https://docs.fauna.com/fauna/current/start/)
2.  [GraphQL Relations](https://docs.fauna.com/fauna/current/howto/graphql/relations)
3.  [Unique Constraints in GraphQL](https://docs.fauna.com/fauna/current/howto/graphql/unique)
4.  [GraphQL Pagination](https://docs.fauna.com/fauna/current/howto/graphql/pagination)






In the previous two articles we explored how to [set up your development environment](javascript:void(0)) and query your GraphQL schema, then [added relationships to your GraphQL queries](javascript:void(0)). In this article we’ll look at the @unique directive, which allows you to add constraints to your GraphQL schema.






To define a simple user type with a uniqueness constraint on the username, you simply add the @unique directive to the username field, and Fauna handles creating the index to enforce this constraint.






```graphql
type User {
 username: String! @unique
}
```






Import this schema into Fauna by creating a database, provisioning a key secret, and uploading it via curl (for detailed instructions see [the first article in this series](https://fauna.com/blog/getting-started-with-graphql-part-1-importing-and-querying-your-schema)). Alternatively, you can just reuse the secret from the previous article, and your schema will be safely extended with a User type:






```shell
curl -u <key-secret>: https://graphql.fauna.com/import --data-binary "@<graphql-schema-filename>"
```






Now you can inspect the schema via Fauna Shell or GraphQL Playground. Remember to configure the Authorization header in your GraphQL Playground for the current database.






You can list the classes and indexes in your database by launching the shell and issuing this query. To launch the shell directly into your current database, use the --secret command line flag:






```shell
fauna shell --secret=<key-secret>
```






If you started with an empty database, you’ll only have one class and one index:






```javascript
> Paginate(Union(Classes(), Indexes()))
```






```json
{ data: [ Class("User"), Index("unique_User_username") ] }
```






Now let’s inspect the index with the following query in the Fauna Shell:






```javascript
> Get(Index("unique_User_username"))
```






```json
{ ref: Index("unique_User_username"),
  ts: 1556578547300000,
 active: true,
 partitions: 1,
 name: 'unique_User_username',
 source: Class("User"),
 data: { gql: {} },
 values: [],
 terms: [ { field: [ 'data', 'username' ] } ],
 unique: true }
```






We can see in this response that the Fauna index is maintaining a uniqueness constraint on the username field. Trying to create users with duplicate usernames will result in an error. We'll try doing that in GraphQL Playground in a moment.






Now let’s switch to the GraphQL Playground (make sure you configure it with the correct Authorization header), and inspect the generated schema. Here are the relevant domain objects (inspect the schema yourself to see some additional boilerplate):






```graphql
type Mutation {
 createUser(data: UserInput!): User!
 updateUser(
   id: ID!
   data: UserInput!
 ): User
 deleteUser(id: ID!): User
}






type Query {
 findUserByID(id: ID!): User
}






type User {
 _id: ID!
 _ts: Long!
 username: String!
}






input UserInput {
 username: String!
}
```






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5vRDFwDUUCwgJroykjSzZ0/cbb76af44f88b81c00a34409d3b8e1cf/1782-Screen-Shot-2019-04-30-at-9.35.43-AM.png)






Create a new user by pasting the following query and pressing the "Play" button:






```graphql
mutation CreateAUser {
   createUser(data: {
     username: "Alice"
   }) {
     username
   }
}
```






You should receive the following response:






```json
{
  "data": {
    "createUser": {
      "username": "Alice"
    }
  }
}
```






Now, let's try adding a duplicate user. Simply click the "Play" button to run the same query again. This time, you should get an error:






```json
{
  "errors": {
    "message": "Instance is not unique.",
    "extensions": {
      "code": "instance not unique"
    }
  }
}
```






This tutorial has demonstrated how to apply uniqueness constraints to your data with the @unique directive. Stay tuned for more about GraphQL and Fauna, as we explore schema updates, access control, and custom schema elements.


































