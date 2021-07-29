# How Fauna's GraphQL API Solves the n+1 Problem

# FaunaのGraphQL APIがn+1問題を解決する方法



Leo Regnier|Aug 26th, 2019|

2019年8月26日|。


[Jamstack](https://fauna.com/blog?category=jamstack)[Serverless](https://fauna.com/blog?category=serverless)[GraphQL](https://fauna.com/blog?category=graphql)



Dealing with n+1 problems is a common issue when building a GraphQL server. In this post, we’ll learn what the n+1 problem is, how it's solved in most GraphQL servers, and why you don’t need to care about it with Fauna’s GraphQL API.


n+1問題への対処は、GraphQLサーバーを構築する際によくある問題です。この記事では、n+1問題とは何か、多くのGraphQLサーバではどのように解決されているか、そしてFaunaのGraphQL APIではなぜ気にする必要がないのかを紹介します。


## The n+1 problem



Before diving into the aspects of the n+1 problem, let’s review how GraphQL queries are handled on the server side. When a query hits the server, it is processed by the so-called _resolver_ functions. A resolver is a field-specific function, in charge of fetching the proper data for a given field. This means that for every field present in the query, the server calls its corresponding resolver function in order to fetch the requested data.


n+1問題について説明する前に、GraphQLのクエリがサーバー側でどのように処理されているかを確認しておこう。クエリがサーバーにヒットすると、いわゆる_resolver_関数によって処理される。リゾルバとは、フィールドに特化した関数で、与えられたフィールドに対して適切なデータを取得することを担当します。つまり、クエリに含まれるすべてのフィールドについて、サーバーは対応するリゾルバ関数を呼び出し、要求されたデータを取得するのです。


In most implementations, the order in which the server calls each resolver function is the same as how the fields appear in the query graph. While resolvers for fields at the same level may be called at the same time, values for child fields are resolved after their parent field. This is known as a _breadth-first_ _search_ in graph theory.


ほとんどの実装では、サーバーが各リゾルバ関数を呼び出す順番は、クエリ・グラフでのフィールドの表示順と同じです。同じレベルのフィールドのリゾルバが同時に呼び出されることもありますが、子フィールドの値は親フィールドの後に解決されます。これは、グラフ理論では _breadth-first_ _search_ と呼ばれています。


Now, the n+1 problem occurs when _processing a query involves performing one initial request to a data source along with n subsequent requests in order to fetch all of the data._ In order to understand this more clearly, let’s take a look at an example.

さて、n+1問題とは、「クエリの処理において、データソースへの最初のリクエストを1回実行し、その後、すべてのデータを取得するためにn回のリクエストを実行する」場合に発生する問題です。これをより明確に理解するために、例を見てみましょう。



Suppose we have a schema which establishes a relation between a Book and an Author type:


例えば、「本」と「著者」の関係を構築するスキーマがあるとします。



```javascript
type Book {
  title: String!
  author: Author!
}



type Author {
  firstName: String!
  lastName: String!
}



type Query {
  allBooks: [Book]!
}
```



And we call the allBooks query to get all of the Books along with their Authors:



そして、allBooks クエリを呼び出して、すべての本とその著者を取得します。




```graphql
query {
  allBooks {     # fetches books (1 request)
    title       
    author {     # fetches authors for each book (n requests for n authors)
      firstName
      lastName
    }
  }
}
```



As explained above, the server goes through each field by following the order of the graph, and calls the proper resolver functions in order to process the query. It starts by making one request (1) to fetch the data for the books field, and then make multiple subsequent requests (n) for all of the associated author fields. Thus, as a result, there will be n+1 requests in order to fetch all of the data.



上で説明したように、サーバーはグラフの順序に従って各フィールドを確認し、適切なリゾルバ関数を呼び出して、クエリを処理します。まず、booksフィールドのデータを取得するために1つのリクエスト（1）を行い、その後、関連するすべてのauthorフィールドに対して複数のリクエスト（n）を行います。したがって、結果的にはすべてのデータを取得するためにn+1回のリクエストを行うことになります。



If our data source was a SQL-like database, this might result in the following queries:



もし、データソースがSQLのようなデータベースであれば、次のようなクエリになるかもしれません。




```sql
SELECT * FROM Book
SELECT * FROM Author WHERE authorId = 1
SELECT * FROM Author WHERE authorId = 2
SELECT * FROM Author WHERE authorId = 3
...
```



At this point, you may have noticed that this is a very inefficient and unpredictable way of retrieving data. When working with large sets, this can easily lead to notorious performance issues. Moreover, you might even end up requesting the same element more than once!


この時点で、この方法は非常に非効率的で予測不可能なデータ取得方法であることにお気づきでしょう。大規模なセットを扱う場合、この方法ではパフォーマンス上の問題が発生しやすくなります。さらに、同じ要素を何度もリクエストすることになるかもしれません。



Most data sources already support fetching a selection of elements in a single operation. So, shouldn’t there be a way to rearrange how a query is processed in order to have one request instead of the n subsequent requests?

ほとんどのデータソースでは、1回の操作で複数の要素を取得することができます。そこで、クエリの処理方法を変更して、後続のn回のリクエストではなく、1回のリクエストで済むようにする方法があるのではないでしょうか？



## Batching to the rescue



Fortunately, there’s a solution to this problem through an old well-known technique: batching. Most GraphQL server libraries offer the ability to defer the resolution of a resolver function and batch all of their executions together. In other words, rather than immediately fetching the data for each field one by one, all fields sharing the same batch resolver get their data at once with a single request.

幸いなことに、昔からよく知られているテクニックである「バッチ処理」によって、この問題を解決することができます。ほとんどのGraphQLサーバーライブラリは、リゾルバ関数の解決を延期し、その実行をすべてまとめてバッチ処理する機能を提供しています。つまり、すぐに各フィールドのデータを1つずつ取得するのではなく、同じバッチリゾルバを共有するすべてのフィールドが、1回のリクエストで一度にデータを取得するのです。


Let’s take a look at the previous query and see how it is processed using batching:

先ほどのクエリを見て、バッチを使ってどのように処理されるか見てみましょう。



```graphql
query {
  books {        # fetches books (1 request)
    title       
    author {     # defers the fetching of author (no request)
      firstName
      lastName
    }
  }              # fetches all authors for each book at once (1 request)
}
```



This time, the server goes through the query, fetches the data for the books field, and defers the resolution of the author fields for later. Once all of the author fields have been traversed, a single request is made in order to fetch the data for all of them.


今回、サーバーはクエリを実行し、booksフィールドのデータを取得し、authorフィールドの解決を後回しにします。そして、すべての著者フィールドを検索した後、1回のリクエストですべての著者フィールドのデータを取得します。



If we were working with a SQL-like database for storing the data, we might get the following queries:


もしデータを保存するためにSQLのようなデータベースを使っていたとしたら、次のようなクエリが出てくるかもしれません。



```sql
SELECT * FROM Book
SELECT * FROM Author WHERE authorId IN (1, 2, 3, ...)
```



As you may have already noticed, we have to perform only two queries now to get all of the data! Thanks to batching, we have reduced the number of queries to a constant number and thus avoid potential performance issues.


すでにお気づきかもしれませんが、すべてのデータを取得するためには、たった2つのクエリを実行するだけでよいのです。バッチングのおかげで、クエリの数を一定に減らすことができ、潜在的なパフォーマンスの問題を回避することができます。



Although this a well-known solution for the n+1 problem, we still need to take care and handle each case individually ourselves. Libraries like [Dataloader](https://github.com/graphql/dataloader) or [Apollo's data sources](https://www.apollographql.com/docs/apollo-server/features/data-sources.html) do a great job at easing the implementation of deferred resolvers and batching, and they even provide additional features for handling other cases. However, we cannot escape the fact that we still need to put some code together in order to cover every possible n+1 problem in our server. Since this is such a common issue, you might be wondering if there’s another way to solve all of the potential n+1 problems once and for all...


これはn+1問題に対するよく知られた解決策ですが、それでも私たちは注意して、それぞれのケースを個別に処理する必要があります。Dataloader](https://github.com/graphql/dataloader)や[Apollo's data sources](https://www.apollographql.com/docs/apollo-server/features/data-sources.html)のようなライブラリは、遅延リゾルバやバッチ処理の実装を容易にする素晴らしい仕事をしてくれますし、他のケースを処理するための追加機能も提供しています。しかし、サーバーで起こりうるn+1の問題をすべてカバーするためには、やはりいくつかのコードをまとめなければならないという事実から逃れることはできません。このように一般的な問題であるため、潜在的なn+1問題をすべて解決する別の方法がないかと思うかもしれません...。



## One query to rule them all



With FaunaDB’s GraphQL API, we’ve taken things a step further. First, we have leveraged one of Fauna’s distinctive features: the [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) or FQL. FQL is a powerful and comprehensive language that allows complex and precise manipulation and retrieval of data stored within FaunaDB. While not a general-purpose programming language, it provides much of the functionality expected from one.



FaunaDB の GraphQL API では、さらに一歩進んだ方法を採用しています。まず、Fauna の特徴的な機能のひとつである [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) または FQL を活用しています。FQLは、FaunaDBに格納されているデータを複雑かつ正確に操作・取得することができる、強力で包括的な言語です。FQLは汎用のプログラミング言語ではありませんが、期待される機能の多くを備えています。


With FQL at our disposal, we have used resolvers slightly differently from how they are used normally. Whenever FaunaDB’s GraphQL API server receives a query, all of its fields are first resolved into an FQL expression. That is, instead of immediately fetching the data field-by-field, a built-in resolver automatically generates the equivalent FQL expression for each field. Once an expression has been assigned to all fields, all expressions are combined into one FQL query. As a result, **the complete GraphQL query is translated into a single FQL query**. Finally, this FQL query is executed and all data for all of the fields is fetched at once.

FQLを自由に使えるようになったことで、リゾルバを通常の使い方とは少し違った形で使用している。FaunaDBのGraphQL APIサーバーがクエリを受信すると、まずそのフィールドがすべてFQL式に解決される。つまり、すぐにフィールドごとにデータを取得するのではなく、内蔵のリゾルバが各フィールドに相当するFQL式を自動的に生成するのである。すべてのフィールドに式が割り当てられると、すべての式が1つのFQLクエリにまとめられる。その結果、**完全なGraphQLクエリが1つのFQLクエリ**に変換されます。最後に、このFQLクエリが実行され、すべてのフィールドのすべてのデータが一度に取り出されます。




Let’s take a look at the previous example one last time and see how this works:


最後にもう一度、先ほどの例を見て、この仕組みを確認してみましょう。



```graphql
query {
  books {        # generates an FQL expression for fetching books (no request)
    title       
    author {     # generates an FQL expression for fetching the author (no request)
      firstName
      lastName
    }
  }              # composes all expressions into one single FQL query
}                # and fetches all of the data at once (1 request)
```



In this case, the server simply assigns an FQL expression for the books field, and another FQL expression for the author field. Both expressions are then be composed into one query and the data for the books and author fields is fetched together.


このケースでは、サーバーは単純にbooksフィールドにFQL式を割り当て、authorフィールドにも別のFQL式を割り当てます。この2つの式は1つのクエリにまとめられ、booksフィールドとauthorフィールドのデータがまとめて取得されます。



As mentioned, the complete GraphQL query is translated into a single FQL query similar to the one below:


前述の通り、完全なGraphQLクエリは、以下のような1つのFQLクエリに変換されます。



```javascript
Map(
  Paginate(Match(Index("allBooks"))),
  Lambda("bookRef",
    Let(
      {
        "book": Get(Var("bookRef")),
        "author": Get(Select(["data", "author"], Var("book")))
      },
      {
        "title": Select(["data", "title"], Var("book")),
        "author": {
          "firstName": Select(["data", "firstName"], Var("author")),
          "lastName": Select(["data", "lastName"], Var("author"))
        }
      }
    )
  )
);
```



This means that **any given GraphQL query always incurs only one single request to the database.** By design, we have resolved the n+1 problem in order to cover any possible use case—regardless of what query has to be processed. And all of this is done without you even having to write a single line of code!



つまり、 **どんなGraphQLクエリでも、データベースへのリクエストは常に1回だけ** ということになります。 設計上、n+1の問題を解決することで、どんなクエリを処理するかに関わらず、ありとあらゆるユースケースに対応できるようになっています。そして、これらはすべて、あなたが1行もコードを書くことなく実現できるのです。


## Conclusion



In this post, we have discussed the aspects of the n+1 problem, how batching can help you to keep the number of requests in line, and how this recurrent issue has already been solved for any possible use case within Fauna’s GraphQL API.


今回の記事では、n+1問題の概要、バッチ処理によってリクエスト数を一定に保つ方法、そしてFaunaのGraphQL APIでは、この繰り返し発生する問題をあらゆるユースケースで解決していることを紹介しました。



Throughout this post, we have used a rather simple query to easily illustrate what the n+1 problem is and how it can be solved in different ways. In a real world scenario, GraphQL queries can be vastly complex and even using a traditional optimization technique like batching can require several requests to a data source. In contrast, Fauna’s GraphQL API guarantees that for any GraphQL query you make—no matter the complexity—there is always one single request.



この記事では、n+1問題とは何か、どのような方法で解決できるのかを簡単に説明するために、かなりシンプルなクエリを使用しています。実際のシナリオでは、GraphQLクエリは非常に複雑で、バッチ処理のような伝統的な最適化手法を使っても、データソースに何度もリクエストする必要があります。一方、FaunaのGraphQL APIは、複雑さに関わらず、どのようなGraphQLクエリであっても、リクエストは常に1回であることを保証しています。




If you are interested in learning more about Fauna’s GraphQL API, you can start with this [simple tutorial](https://fauna.com/blog/getting-started-with-graphql-part-1-importing-and-querying-your-schema).


FaunaのGraphQL APIについてもっと知りたいという方は、こちらの[簡単なチュートリアル](https://fauna.com/blog/getting-started-with-graphql-part-1-importing-and-querying-your-schema)から始めてみてください。



If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!


もしあなたが私たちのブログを楽しんでくれて、グローバルな分散システム、サーバーレスデータベース、GraphQL、Jamstackに関連するシステムや課題に取り組みたいのであれば、Faunaは[hiring](https://fauna.com/careers)しています!

