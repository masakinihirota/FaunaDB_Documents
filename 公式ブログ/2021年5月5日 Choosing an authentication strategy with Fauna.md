# Choosing an authentication strategy with Fauna

Rob Sutter|May 5th, 2021|
2021年5月5日

Categories:

[Authentication](https://fauna.com/blog?category=authentication)

Nearly every app you create requires some level of authentication to identify valid users. The most basic form of authentication requires users to provide credentials such as a username and password to access your application. However, authentication and identity requirements can quickly expand beyond username and password verification. Fauna provides constructs to support basic, Fauna-native authentication. Fauna also offers integration with third-party Identity as a Service (IDaaS) providers like [Okta](https://www.okta.com) that satisfy a broader range of identity requirements for your applications. How you address your identity-related requirements depends on the complexity of those requirements and the resources you have to implement your chosen strategy.

作成するほぼすべてのアプリでは、有効なユーザーを識別するためにある程度の認証が必要です。最も基本的な認証形式では、ユーザーがアプリケーションにアクセスするためにユーザー名やパスワードなどの資格情報を提供する必要があります。ただし、認証とIDの要件は、ユーザー名とパスワードの検証を超えて急速に拡大する可能性があります。Faunaは、基本的なFaunaネイティブ認証をサポートするための構造を提供します。動植物も同様サービス（IDaaS）プロバイダーとして、サードパーティのアイデンティティとの統合を提供していますOktaアプリケーションのID要件の広い範囲を満たします。ID関連の要件にどのように対処するかは、それらの要件の複雑さと、選択した戦略を実装するために必要なリソースによって異なります。

This post explores the pros and cons of each strategy for authenticating with Fauna and guides you in selecting an overall identity strategy for your Fauna applications. You learn how to implement basic Fauna authentication using [blueprints](https://github.com/fauna-labs/fauna-blueprints), Fauna Query Language (FQL) code that you can import and use in your applications. Finally, you review a sample application skeleton for building applications with an IDaaS provider.

この投稿では、Faunaで認証するための各戦略の長所と短所を探り、Faunaアプリケーションの全体的なID戦略を選択する方法を説明します。ブループリント、アプリケーションでインポートして使用できる動物相クエリ言語（FQL）コードを使用して、基本的な動物相認証を実装する方法を学習します。最後に、IDaaSプロバイダーを使用してアプリケーションを構築するためのサンプルアプリケーションスケルトンを確認します。

## Authentication with Fauna
認証

Using Fauna’s built-in authentication allows you to build your application quickly without signing up for additional services, especially if your application has simpler authentication requirements. Start with the FQL [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) function, then add customized functionality with FQL [user-defined functions (UDFs)](https://docs.fauna.com/fauna/current/api/fql/user_defined_functions). Fauna’s built-in authentication allows you to place metadata on the tokens that you create, providing you with full control over the authentication information you store. Tokens are documents, so you can update them with the same ACID transaction benefits that Fauna provides the rest of your data.

Faunaの組み込み認証を使用すると、特にアプリケーションの認証要件が単純な場合に、追加のサービスにサインアップすることなく、アプリケーションをすばやく構築できます。FQLログイン関数から始めて、FQLユーザー定義関数（UDF）でカスタマイズされた機能を追加します。Faunaの組み込み認証を使用すると、作成したトークンにメタデータを配置して、保存する認証情報を完全に制御できます。トークンはドキュメントであるため、Faunaが残りのデータを提供するのと同じACIDトランザクションの利点でトークンを更新できます。

Implementing authentication with Fauna can reduce ongoing subscription expenses by avoiding the cost of an additional service, but does not offer a broader set of identity capabilities if your requirements are more complex. Fauna authentication is also available on all plans, which can save you money on Fauna as well. Finally, authentication using Fauna can be more performant. There are no round-trips to the IdP to verify claims, and requests do not have to include the [JWTs](https://jwt.io/) used by third-party providers.

Faunaで認証を実装すると、追加サービスのコストを回避することで継続的なサブスクリプション費用を削減できますが、要件がより複雑な場合は、より広範なID機能のセットを提供しません。動物相認証はすべてのプランで利用可能であり、動物相の費用も節約できます。最後に、Faunaを使用した認証はよりパフォーマンスが高くなります。クレームを検証するためのIdPへのラウンドトリップはなく、リクエストにサードパーティプロバイダーが使用するJWTを含める必要はありません。

## Authentication with identity providers

IDaaS providers offer advanced functionality like sophisticated account recovery flows, multi-factor authentication, complex authentication policies, and [OAuth2](https://oauth.net/2/) support. They also provide user-friendly dashboards that enable you to manage roles and users without writing additional code. Building and maintaining this functionality yourself can be expensive and requires specialized domain knowledge. Using an IDaaS provider can be a good choice when you have complex identity requirements beyond basic username and password authentication and you don’t want to build these capabilities on your own.

If you already use Auth0 or Okta as your IDaaS provider, you can authenticate your existing users to Fauna by creating an _AccessProvider_. This allows you to add functionality to your existing applications without requiring your users to create new accounts or change their passwords. IdPs also simplify single sign-on (SSO) or social login workflows, reducing signup friction for new users.

Total cost of ownership (TCO), including development and maintenance costs, can be lower over time with IDaaS providers. Writing your own code for authentication can be complicated and consume a lot of development time. This time is spent on functionality that is not differentiated and could be used to create customer value.

## Choosing between Fauna and identity providers

Each authentication strategy has its strengths, but how should you choose a strategy that is best for _your_ application?

### Complexity of your authentication requirements

If you are implementing a system and require the advanced features that an IDaaS platform provides, including a robust user interface, choose an IDaaS provider. If your authentication requirements are simpler or you intend to build your own functionality to satisfy the more advanced identity requirements, you can start by implementing authentication with Fauna using [authentication blueprints](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth) and expand as your requirements grow.

### Existing relationship with an identity provider

If you already use Auth0 or Okta as an IdP for your applications, you should continue to use them with Fauna. You benefit from a familiar experience, and any customization you have done with the provider becomes available to you in Fauna.

### Speed to first delivery

If your authentication requirements are basic, you want to ship the first version of your product as quickly as possible, and you are not already using an IDaaS provider, you should implement authentication in Fauna. Minimizing the amount of new information you need to learn helps you deliver your first version quickly and begin iterating on customer feedback.

### Total cost of ownership versus additional subscriptions

If you have development expertise around identity and want to minimize your number of service subscriptions then you should choose Fauna for authentication. You can implement Fauna authentication on any plan, including the free tier, and you do not need to provide any additional information to a third-party IDaaS provider. Note that if you have a small number of users, you may fall within your IDaaS provider’s free tier. See their pricing for more information.

If TCO concerns are more important, the choice is more nuanced. In this case, you should perform an analysis of the cost to develop and maintain the features you require and compare that cost to the subscription cost of a third-party IDaaS provider.

## Implementing authentication with Fauna blueprints

Blueprints are opinionated FQL implementations of common tasks. You can include blueprints in your application and create resources like UDFs in your database with minimal effort. To learn more about blueprints, including how to include them in your database, see the [GitHub repo](https://github.com/fauna-labs/fauna-blueprints).

Fauna provides blueprints for implementing the following authentication tasks in FQL:

-   [Register, login, and logout](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/register-login-logout)
-   [Email verification with password change](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/email-verification)
-   [Password reset](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/password-reset)
-   [A simple refresh token workflow](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-simple)
-   [An advanced refresh token workflow](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced)

## Implementing third-party authentication

[This blog post](https://fauna.com/blog/setting-up-sso-authentication-in-fauna-with-auth0) walks you through the process of setting up SSO authentication with Auth0 and Fauna. You implement authentication using Auth0’s React SDK, providing integration with social login out of the box.

You can also browse and implement a login flow with Auth0 and React using [this skeleton application](https://github.com/fauna-labs/faunadb-auth-skeleton-with-auth0). The application retrieves the user and access token from Auth0 and directly accesses Fauna with the JWT. For additional details, including setup instructions, see the [GitHub repo](https://github.com/fauna-labs/faunadb-auth-skeleton-with-auth0).

## Conclusion

Regardless of which approach you choose, authentication is a critical component of any application, and identity needs regularly expand beyond basic authentication. In this post, you compared authenticating with Fauna and a third-party IDaaS provider. You learned how to select an authentication strategy for your Fauna applications and how to implement your chosen strategy with sample code.

[Sign up for a free Fauna account](https://fauna.link/register) and start building your next application today!

If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!

## Share this post

[Twitter](https://twitter.com/intent/tweet?url=https://fauna.com/blog/choosing-an-authentication-strategy-with-fauna&text=Choosing%20an%20authentication%20strategy%20with%20Fauna)[LinkedIn](https://www.linkedin.com/shareArticle/?mini=true&url=https://fauna.com/blog/choosing-an-authentication-strategy-with-fauna&title=Choosing%20an%20authentication%20strategy%20with%20Fauna&summary=Nearly%20every%20app%20you%20create%20requires%20some%20level%20of%20authentication%20to%20identify%20valid%20users.%20How%20you%20address%20your%20identity-related%20requirements%20depends%20on%20the%20complexity%20of%20those%20requirements%20and%20the%20resources%20you%20have%20to%20implement%20your%20chosen%20strategy.&source=Fauna.com)

## Subscribe to Fauna blogs & newsletter

Get latest blog posts, development tips & tricks, and latest learning material delivered right to your inbox.

<iframe title="subscribe to newsletter form" src="https://www2.fauna.com/l/517431/2020-11-11/71k42s" class="css-1hfzrsj"></iframe>

[<- Back](https://fauna.com/blog)