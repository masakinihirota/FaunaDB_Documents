# Choosing an authentication strategy with Fauna

Rob Sutter|May 5th, 2021|
2021 年 5 月 5 日

Categories:

[Authentication](https://fauna.com/blog?category=authentication)

Nearly every app you create requires some level of authentication to identify valid users.

Nearly
ほとんど

作成するほぼすべてのアプリでは、有効なユーザーを識別するためにある程度の認証が必要です。

The most basic form of authentication requires users to provide credentials such as a username and password to access your application.

最も基本的な認証形式では、ユーザーがアプリケーションにアクセスするためにユーザー名やパスワードなどの資格情報を提供する必要があります。

However, authentication and identity requirements can quickly expand beyond username and password verification.

ただし、認証と ID の要件は、ユーザー名とパスワードの検証を超えて急速に拡大する可能性があります。

Fauna provides constructs to support basic, Fauna-native authentication.

Fauna は、基本的な Fauna ネイティブ認証をサポートするための構造を提供します。

Fauna also offers integration with third-party Identity as a Service (IDaaS) providers like [Okta](https://www.okta.com) that satisfy a broader range of identity requirements for your applications. 

動植物も同様サービス（IDaaS）プロバイダーとして、サードパーティのアイデンティティとの統合を提供しています Okta アプリケーションの ID 要件の広い範囲を満たします。

How you address your identity-related requirements depends on the complexity of those requirements and the resources you have to implement your chosen strategy.

ID 関連の要件にどのように対処するかは、それらの要件の複雑さと、選択した戦略を実装するために必要なリソースによって異なります。

This post explores the pros and cons of each strategy for authenticating with Fauna and guides you in selecting an overall identity strategy for your Fauna applications.

この投稿では、Fauna で認証するための各戦略の長所と短所を探り、Fauna アプリケーションの全体的な ID 戦略を選択する方法を説明します。

You learn how to implement basic Fauna authentication using [blueprints](https://github.com/fauna-labs/fauna-blueprints), Fauna Query Language (FQL) code that you can import and use in your applications. 

ブループリント、アプリケーションでインポートして使用できる動物相クエリ言語（FQL）コードを使用して、基本的な動物相認証を実装する方法を学習します。

Finally, you review a sample application skeleton for building applications with an IDaaS provider.

最後に、IDaaS プロバイダーを使用してアプリケーションを構築するためのサンプルアプリケーションスケルトンを確認します。

## Authentication with Fauna

認証

Using Fauna’s built-in authentication allows you to build your application quickly without signing up for additional services, especially if your application has simpler authentication requirements. 

Fauna の組み込み認証を使用すると、特にアプリケーションの認証要件が単純な場合に、追加のサービスにサインアップすることなく、アプリケーションをすばやく構築できます。

Start with the FQL [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) function, then add customized functionality with FQL [user-defined functions (UDFs)](https://docs.fauna.com/fauna/current/api/fql/user_defined_functions). 

FQL ログイン関数から始めて、FQL ユーザー定義関数（UDF）でカスタマイズされた機能を追加します。

Fauna’s built-in authentication allows you to place metadata on the tokens that you create, providing you with full control over the authentication information you store.


Fauna の組み込み認証を使用すると、作成したトークンにメタデータを配置して、保存する認証情報を完全に制御できます。

Tokens are documents, so you can update them with the same ACID transaction benefits that Fauna provides the rest of your data.




トークンはドキュメントであるため、Fauna が残りのデータを提供するのと同じ ACID トランザクションの利点でトークンを更新できます。

Implementing authentication with Fauna can reduce ongoing subscription expenses by avoiding the cost of an additional service, but does not offer a broader set of identity capabilities if your requirements are more complex. 

Fauna で認証を実装すると、追加サービスのコストを回避することで継続的なサブスクリプション費用を削減できますが、要件がより複雑な場合は、より広範な ID 機能のセットを提供しません。

Fauna authentication is also available on all plans, which can save you money on Fauna as well. Finally, authentication using Fauna can be more performant. There are no round-trips to the IdP to verify claims, and requests do not have to include the [JWTs](https://jwt.io/) used by third-party providers.

動物相認証はすべてのプランで利用可能であり、動物相の費用も節約できます。最後に、Fauna を使用した認証はよりパフォーマンスが高くなります。クレームを検証するための IdP へのラウンドトリップはなく、リクエストにサードパーティプロバイダーが使用する JWT を含める必要はありません。

## Authentication with identity providers

IDaaS providers offer advanced functionality like sophisticated account recovery flows, multi-factor authentication, complex authentication policies, and [OAuth2](https://oauth.net/2/) support.

IDaaS プロバイダーは、高度なアカウント回復フロー、多要素認証、複雑な認証ポリシー、OAuth2 サポートなどの高度な機能を提供します。

They also provide user-friendly dashboards that enable you to manage roles and users without writing additional code. 

また、追加のコードを記述せずに役割とユーザーを管理できるユーザーフレンドリーなダッシュボードも提供します。

Building and maintaining this functionality yourself can be expensive and requires specialized domain knowledge. 

この機能を自分で構築して維持するには、費用がかかる可能性があり、専門的なドメイン知識が必要です。

Using an IDaaS provider can be a good choice when you have complex identity requirements beyond basic username and password authentication and you don’t want to build these capabilities on your own.

IDaaS プロバイダーの使用は、基本的なユーザー名とパスワードの認証以外に複雑な ID 要件があり、これらの機能を独自に構築したくない場合に適しています。

If you already use Auth0 or Okta as your IDaaS provider, you can authenticate your existing users to Fauna by creating an _AccessProvider_. 

すでにAuth0またはOktaをIDaaSプロバイダーとして使用している場合は、_AccessProvider_を作成することで、既存のユーザーをFaunaに対して認証できます。


This allows you to add functionality to your existing applications without requiring your users to create new accounts or change their passwords.

これにより、ユーザーが新しいアカウントを作成したりパスワードを変更したりしなくても、既存のアプリケーションに機能を追加できます。

IdPs also simplify single sign-on (SSO) or social login workflows, reducing signup friction for new users.

IdPは、シングルサインオン（SSO）またはソーシャルログインワークフローも簡素化し、新規ユーザーのサインアップの摩擦を軽減します。

Total cost of ownership (TCO), including development and maintenance costs, can be lower over time with IDaaS providers.

IDaaS プロバイダーを使用すると、開発および保守コストを含む総所有コスト（TCO）を時間の経過とともに低くすることができます。

Writing your own code for authentication can be complicated and consume a lot of development time. 

認証用の独自のコードを書くことは複雑で、多くの開発時間を消費する可能性があります。

This time is spent on functionality that is not differentiated and could be used to create customer value.

この時間は、差別化されておらず、顧客価値の創造に使用できる機能に費やされています。

## Choosing between Fauna and identity providers

動物相とIDプロバイダーのどちらを選択するか

Each authentication strategy has its strengths, but how should you choose a strategy that is best for _your_ application?

各認証戦略にはそれぞれの長所がありますが、_your_アプリケーションに最適な戦略をどのように選択する必要がありますか？

### Complexity of your authentication requirements

If you are implementing a system and require the advanced features that an IDaaS platform provides, including a robust user interface, choose an IDaaS provider. 

システムを実装していて、堅牢なユーザーインターフェイスなど、IDaaS プラットフォームが提供する高度な機能が必要な場合は、IDaaS プロバイダーを選択してください。

If your authentication requirements are simpler or you intend to build your own functionality to satisfy the more advanced identity requirements, you can start by implementing authentication with Fauna using [authentication blueprints](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth) and expand as your requirements grow.

satisfy
満足させる

認証要件がより単純な場合、またはより高度な ID 要件を満たすために独自の機能を構築する場合は、認証ブループリントを使用して Fauna で認証を実装することから始めて、要件の拡大に応じて拡張できます。

### Existing relationship with an identity provider

IDプロバイダーとの既存の関係

If you already use Auth0 or Okta as an IdP for your applications, you should continue to use them with Fauna. 

アプリケーションの IdP として Auth0 または Okta をすでに使用している場合は、引き続き Fauna で使用する必要があります。

You benefit from a familiar experience, and any customization you have done with the provider becomes available to you in Fauna.

慣れ親しんだ経験から恩恵を受け、プロバイダーで行ったカスタマイズはすべて、Fauna で利用できるようになります。

### Speed to first delivery

最初の配達までのスピード

If your authentication requirements are basic, you want to ship the first version of your product as quickly as possible, and you are not already using an IDaaS provider, you should implement authentication in Fauna. Minimizing the amount of new information you need to learn helps you deliver your first version quickly and begin iterating on customer feedback.

認証要件が基本的であり、製品の最初のバージョンをできるだけ早く出荷したいが、まだ IDaaS プロバイダーを使用していない場合は、Fauna で認証を実装する必要があります。
学習する必要のある新しい情報の量を最小限に抑えることで、最初のバージョンを迅速に提供し、顧客からのフィードバックを繰り返し始めることができます。

### Total cost of ownership versus additional subscriptions

総所有コストと追加サブスクリプション

If you have development expertise around identity and want to minimize your number of service subscriptions then you should choose Fauna for authentication. 

ID に関する開発の専門知識があり、サービスサブスクリプションの数を最小限に抑えたい場合は、認証に動物相を選択する必要があります。

You can implement Fauna authentication on any plan, including the free tier, and you do not need to provide any additional information to a third-party IDaaS provider. 

動物相認証は、無料枠を含む任意のプランに実装でき、サードパーティの IDaaS プロバイダーに追加情報を提供する必要はありません。

Note that if you have a small number of users, you may fall within your IDaaS provider’s free tier. See their pricing for more information.

ユーザー数が少ない場合は、IDaaS プロバイダーの無料枠に含まれる可能性があることに注意してください。詳細については、価格をご覧ください。

If TCO concerns are more important, the choice is more nuanced. In this case, you should perform an analysis of the cost to develop and maintain the features you require and compare that cost to the subscription cost of a third-party IDaaS provider.

TCO の懸念がより重要である場合、選択はより微妙です。この場合、必要な機能を開発および保守するためのコストの分析を実行し、そのコストをサードパーティの IDaaS プロバイダーのサブスクリプションコストと比較する必要があります。

## Implementing authentication with Fauna blueprints

Fauna ブループリントを使って認証を実装する。

Blueprints are opinionated FQL implementations of common tasks.

ブループリントは、一般的なタスクの FQL 実装であると考えられています。

You can include blueprints in your application and create resources like UDFs in your database with minimal effort.

アプリケーションにブループリントを含め、最小限の労力でデータベースに UDF などのリソースを作成できます。

To learn more about blueprints, including how to include them in your database, see the [GitHub repo](https://github.com/fauna-labs/fauna-blueprints).

ブループリントをデータベースに含める方法など、ブループリントの詳細については、GitHubを参照してください。 

Fauna provides blueprints for implementing the following authentication tasks in FQL:

Faunaは、FQLで次の認証タスクを実装するための青写真を提供します。

- [Register, login, and logout](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/register-login-logout)
- [Email verification with password change](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/email-verification)
- [Password reset](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/password-reset)
- [A simple refresh token workflow](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-simple)
- [An advanced refresh token workflow](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced)

登録、ログイン、およびログアウト
パスワード変更を伴う電子メール検証
パスワードのリセット
シンプルな更新トークンワークフロー
高度な更新トークンワークフロー

## Implementing third-party authentication

サードパーティ認証の実装 

[This blog post](https://fauna.com/blog/setting-up-sso-authentication-in-fauna-with-auth0) walks you through the process of setting up SSO authentication with Auth0 and Fauna.

このブログ投稿では、Auth0 と Fauna を使用して SSO 認証を設定するプロセスについて説明します。

You implement authentication using Auth0’s React SDK, providing integration with social login out of the box.

Auth0 の ReactSDK を使用して認証を実装し、すぐに使用できるソーシャルログインとの統合を提供します。

You can also browse and implement a login flow with Auth0 and React using [this skeleton application](https://github.com/fauna-labs/faunadb-auth-skeleton-with-auth0). 

このスケルトンアプリケーションを使用して、Auth0 と React でログインフローを参照して実装することもできます。

The application retrieves the user and access token from Auth0 and directly accesses Fauna with the JWT.

アプリケーションは Auth0 からユーザーとアクセストークンを取得し、JWT を使用して Fauna に直接アクセスします。

For additional details, including setup instructions, see the [GitHub repo](https://github.com/fauna-labs/faunadb-auth-skeleton-with-auth0).

セットアップ手順などの詳細については、GitHub リポジトリを参照してください。

## Conclusion

結論

Regardless of which approach you choose, authentication is a critical component of any application, and identity needs regularly expand beyond basic authentication.

選択するアプローチに関係なく、認証はあらゆるアプリケーションの重要なコンポーネントであり、ID のニーズは基本認証を超えて定期的に拡大します。

In this post, you compared authenticating with Fauna and a third-party IDaaS provider. 

この投稿では、Fauna およびサードパーティの IDaaS プロバイダーとの認証を比較しました。

You learned how to select an authentication strategy for your Fauna applications and how to implement your chosen strategy with sample code.

動物相アプリケーションの認証戦略を選択する方法と、選択した戦略をサンプルコードで実装する方法を学びました。

