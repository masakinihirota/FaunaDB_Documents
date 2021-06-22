New in Fauna: Add Fauna to your Vercel applications in minutes
https://fauna.com/blog/new-in-fauna-add-fauna-to-your-vercel-applications-in-minutes

# New in Fauna: Add Fauna to your Vercel applications in minutes

# Faunaの新機能。Fauna をあなたの Vercel アプリケーションに数分で追加できます。

Nishant Madichetti|Jun 18th, 2021|

2021年6月18日

Categories:

[News](https://fauna.com/blog?category=news)[Features](https://fauna.com/blog?category=features)

[ニュース](https://fauna.com/blog?category=news)[機能](https://fauna.com/blog?category=features)

We are excited to announce the release of a seamless new integration between Vercel and Fauna to help you quickly add a serverless database to your Vercel-based applications. If you use Vercel to develop, preview, and ship applications, you can now easily associate a Fauna database with an application directly from the Vercel integration marketplace.

Vercel ベースのアプリケーションにサーバーレスデータベースを迅速に追加するための、Vercel と Fauna のシームレスな新しい統合がリリースされたことをお知らせします。Vercel を使用してアプリケーションの開発、プレビュー、出荷を行っている場合、Vercel インテグレーション マーケットプレイスから直接 Fauna データベースをアプリケーションに簡単に関連付けることができるようになりました。

Vercel is a powerful platform that enables you to deploy any frontend application, especially those built on Next.js, instantly without configuration and dynamically scales with your usage. Fauna compliments Vercel with a data API that lets you add a serverless datastore to your projects in minutes, scales as you grow, and gives you access to features such as built-in 3rd party authentication, document streaming and temporality that enable modern application experiences - zero database operations required!

Vercelは、あらゆるフロントエンドアプリケーション、特にNext.jsで構築されたアプリケーションを、設定なしで即座に展開でき、使用状況に応じて動的に拡張できる強力なプラットフォームです。FaunaはVercelを補完するデータAPIを提供しています。これにより、サーバーレスのデータストアを数分でプロジェクトに追加することができ、成長に合わせて拡張することができます。また、内蔵されたサードパーティ認証、ドキュメントストリーミング、テンポラリなどの機能にアクセスすることができ、最新のアプリケーション体験を実現します（データベース操作は不要です）。

Developers use Vercel in conjunction with Fauna to build new digital experiences that are fast and responsive as well as modernize existing business applications. While this is a powerful combination of platforms, thus far, developers have had to go through a manual process to associate a Fauna database with their Vercel project. To simplify this, we partnered with Vercel to introduce a console-level integration that will make developers' lives easier regardless of whether they are getting started or are ready to deploy their application in production. With this integration in place, Fauna is the easiest and most scalable choice of databases to use with Vercel.

開発者は、VercelとFaunaを併用することで、高速で応答性の高い新しいデジタルエクスペリエンスを構築したり、既存のビジネスアプリケーションを近代化したりしています。これは強力なプラットフォームの組み合わせですが、これまで開発者は、FaunaデータベースをVercelプロジェクトに関連付けるために、手動でプロセスを実行する必要がありました。これを簡単にするために、私たちはVercelと提携してコンソールレベルの統合を導入しました。これにより、開発を始めたばかりの人も、アプリケーションを本番にデプロイする準備ができている人も、開発者の生活が楽になります。この統合により、Fauna は Vercel と一緒に使用する最も簡単でスケーラブルなデータベースとなりました。

Check out this [video](https://www.youtube.com/watch?v=YS3FbyPxxO0) to learn more about how DIGITALAX uses Fauna with Vercel to power their applications.

[ビデオ](https://www.youtube.com/watch?v=YS3FbyPxxO0)では、DIGITALAXがFaunaとVercelを使ってどのようにアプリケーションを強化しているかを紹介しています。

> “Fauna and Vercel allow DIGITALAX to continue to move fast, scale as needed and remain free from operational overheads— absolutely essential as we continue to build out core layers for web3 digital fashion and metaverse infrastructure.”

> FaunaとVercelのおかげで、DIGITALAXは迅速に、必要に応じて拡張し、運用上のオーバーヘッドから解放され続けています。

Emma-Jane MacKinnon-Lee (CEO/Founder)

Emma-Jane MacKinnon-Lee (CEO/創業者)

## Using the Fauna Console Integration for Vercel

## Vercel向けFaunaコンソールインテグレーションの利用

Vercel customers can install Fauna right from the integrations marketplace by clicking [here](https://vercel.com/integrations/fauna). To integrate Fauna, hit the Add button. Then you can choose to “Add a Fauna database” to all your projects or to a specific set of projects.

Vercel のお客様は、[ここ](https://vercel.com/integrations/fauna)をクリックすると、統合マーケットプレイスからすぐに Fauna をインストールできます。Fauna を統合するには、[Add] ボタンをクリックします。すべてのプロジェクトまたは特定のプロジェクトに「Fauna データベースを追加」を選択できます。

![console](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3FAOAGGXFOELg56mEdSriW/9ad557a7e25d6dc70db189e7e0f5d030/console.png)

![コンソール](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/3FAOAGGXFOELg56mEdSriW/9ad557a7e25d6dc70db189e7e0f5d030/console.png)

![install](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/4uVQm4d0qJR5ezxAHcKga/30a33a25ba02cdd361566ba1f1b5c916/install.png)

![インストール](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/4uVQm4d0qJR5ezxAHcKga/30a33a25ba02cdd361566ba1f1b5c916/install.png)

If you’re an existing Fauna customer, you can use the integration with your existing Fauna credentials. If you are new to Fauna, you can get started instantly with Fauna’s [free tier](https://dashboard.fauna.com/accounts/register). Once you are logged into Fauna, you can create a new database or select an existing one to associate with your Vercel project. You have the ability to associate multiple projects to the same database or different databases. Once you click ‘Install,' the database keys will be automatically added to your Vercel environment in the background. And with that you are all set and integrated!

Fauna をご利用中のお客様は、既存の Fauna 認証情報を使用して統合をご利用いただけます。Fauna を初めてご利用になる場合は、Fauna の [free tier](https://dashboard.fauna.com/accounts/register)ですぐに始めることができます。Fauna にログインすると、新しいデータベースを作成するか、既存のデータベースを選択して Vercel プロジェクトに関連付けることができます。また、複数のプロジェクトを同じデータベースや異なるデータベースに関連付けることもできます。インストール」をクリックすると、バックグラウンドでデータベースキーがお客様のVercel環境に自動的に追加されます。これで、すべての設定と統合が完了しました。

![installing vercel](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6l7BpF7x8Rr7YIQLf2DaQ2/c656c28c5d00c38039197d42a1c7402d/image1.png)

![Vercelのインストール](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6l7BpF7x8Rr7YIQLf2DaQ2/c656c28c5d00c38039197d42a1c7402d/image1.png)

We are excited to see what you’re going to build with Vercel and Fauna. Drop us a note in our community [forums](https://forums.fauna.com/) if you need help! Next up on our roadmap is a Vercel starter kit as well as a one-click Next.js template to get you going even faster! Stay tuned, and please drop us a note in the forums if you have any feedback!

私たちは、皆さんがVercelとFaunaを使って何を作ろうとしているのか楽しみにしています。困ったことがあったら、私たちのコミュニティ [forums](https://forums.fauna.com/)に連絡してくださいね。次のロードマップでは、Vercelスターターキットや、ワンクリックで使えるNext.jsテンプレートをご用意していますので、ぜひご利用ください。今後もご期待ください。また、ご意見・ご感想がございましたら、フォーラムまでお寄せください。

