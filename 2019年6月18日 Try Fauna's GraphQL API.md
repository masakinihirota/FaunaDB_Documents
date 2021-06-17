Try Fauna's GraphQL API
https://fauna.com/blog/try-faunadbs-graphql-api







# Try Fauna's GraphQL API






Chris Anderson|Jun 18th, 2019|






Categories:






[Tutorial](https://fauna.com/blog?category=tutorial)[GraphQL](https://fauna.com/blog?category=graphql)[Features](https://fauna.com/blog?category=features)[Serverless](https://fauna.com/blog?category=serverless)[Jamstack](https://fauna.com/blog?category=jamstack)






Tip






### The Fauna Cloud Console now has GraphQL Playground!






This blog was written before we added GraphQL Playground to our Cloud Console. Although this tutorial will still work, we recommend that you follow this tutorial series instead:






1.  [Getting started with GraphQL](https://docs.fauna.com/fauna/current/graphql)
2.  [GraphQL Relations](https://docs.fauna.com/fauna/current/howto/graphql/relations)
3.  [Unique Constraints in GraphQL](https://docs.fauna.com/fauna/current/howto/graphql/unique)
4.  [GraphQL Pagination](https://docs.fauna.com/fauna/current/howto/graphql/pagination)






GraphQL is quickly becoming the default language for working with APIs and data, making it easy to stitch sources together, and enabling API consumers to move fast without breaking things. Fauna is proud to [announce our native GraphQL API](https://fauna.com/blog/the-worlds-best-serverless-database-now-with-native-graphql), available today in Fauna Cloud! Instructions to try it are just after the screenshot in this post.






Now you can talk to the database in GraphQL. This means developers who want a backend data API for their app can get started just by importing a basic GraphQL schema, and Fauna will take care of creating the underling collections, indexes, and relationships. Advanced applications can use Fauna’s transaction-oriented FQL to extend GraphQL schemas.






Fauna’s cloud database is fully-managed and free to get started with, so it’s effortless to add a GraphQL backend to your app. Fauna’s strongly consistent [ACID transactions](https://fauna.com/blog/faunadbs-official-jepsen-results) mean you don’t have to guess what’s in the database, cutting down on edge cases, and making it a great fit for everything from user profiles to game worlds to financial services workloads.






**Instantly query Fauna from any GraphQL client**






The easiest way to get a taste of GraphQL on Fauna is to launch [GraphQL Playground](https://www.graphqlbin.com/v2/new) and query the sample database we’ve prepared for you.






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2EqnEfLTqy2JYDZSTaw1DE/993727c73fd2bf697995bab2442245f6/1828-Screen-Shot-2019-06-07-at-3.47.32-PM.png)






To try it out, just configure GraphQL playground to connect to the Fauna Cloud GraphQL API endpoint: [https://graphql.fauna.com/graphql](https://graphql.fauna.com/graphql)






Authorize your client to the sample database by pasting the following into the **HTTP Headers** in the lower left corner:






```
{ "Authorization": "Basic Zm5BRFFVdWNRb0FDQ1VpZDAxeXVIdWt2SnptaVY4STI4a2R6Y0p2UDo=" }
```






Now that you are connected, paste this into the query box and run it:






```
query FindAListByID {
  findListByID(id: "234550211483009539") {
    title
    todos {
      data { 
        title 
        completed 
        \_id
      }
    }
  }
}
```






You should see a handful of todo items pop up in the results area, like in the screenshot above. Under the hood the GraphQL engine is making use of Fauna joins to connect todos and lists, and as a user you don’t have to think about it.






You can inspect the schema by clicking the tab on the right hand side. This blog post includes a read-only authorization key, so don’t worry, you can’t break anything.






If you want to get serious, you’ll need your own database. [Part 1 in our Getting Started with GraphQL series](https://fauna.com/blog/getting-started-with-graphql-part-1-importing-and-querying-your-schema) shows you how to set up a database and import your GraphQL schema. Once you have [signed up for a Fauna Cloud account](https://dashboard.fauna.com/accounts/register), you'll be able to access GraphQL Playground directly within Fauna's cloud console. Enjoy!






![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/ExVhRt3xtC77eSEMEiWoA/aeb04ff416bed498597f8cba25eb30fb/1830-Screen-Shot-2019-06-17-at-1.57.37-PM.png)






If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!
