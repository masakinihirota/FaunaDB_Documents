Product updates - May 2021
https://fauna.com/blog/product-updates-may-2021

# Product updates - May 2021

製品の更新

Summer Schrader|May 28th, 2021

2021 年 5 月

This blog post provides a brief summary of what's new with Fauna this month, but we're always curious to hear what's new with you too, and what else we can do to improve your experience. Reach out [via email](mailto:product@fauna.com), or leave general feedback in our [Comment Box](https://docs.google.com/forms/d/1K4AK0okXPN_Qh6fcw8iJfdQaWs0yv8Nv_u6pQkposfg/edit#responses)!

curious
好奇心

このブログ投稿では、今月の Fauna の新機能の概要を簡単に説明していますが、あなたの新機能や、エクスペリエンスを向上させるために他に何ができるかについても、常に興味を持っています。メールで連絡するか、コメントボックスに一般的なフィードバックを残してください！

## Region Groups is now in Preview!

![Region groups in preview](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/4uMdJKlD4uTRyd1xitOgvf/3f64e15b6187bdadb617a882c9ea0d87/region-groups-in-preview.png)

Want to keep your data in the EU or US? Region groups enable the ability to isolate a database to specific geographic boundaries, to comply with data residency requirements as well as reduce local latencies. To become a preview tester, please [email](mailto:product@fauna.com) us.

## Dashboard webshell impersonation

ダッシュボード Web シェルのなりすまし

![Dashboard webshell impersonation](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/Jao9kCvpWF9AWcd9hlX6N/c2377fca7081aea4851aeed242d50be2/dashboard-webshell-impersonation.png)

The Fauna Dashboard now provides a webshell impersonation feature to help debug [Attribute-based access control (](https://docs.fauna.com/fauna/current/security/abac.html)[ABAC](https://docs.fauna.com/fauna/current/security/abac.html)[)](https://docs.fauna.com/fauna/current/security/abac.html) roles. This feature allows you to impersonate different identity documents or custom roles so you can quickly and easily debug permissions and authorization issues.

動物相ダッシュボードは、属性ベースのアクセス制御（ABAC ）の役割のデバッグに役立つ Web シェルの偽装機能を提供するようになりました。この機能を使用すると、さまざまな ID ドキュメントまたはカスタムロールを偽装できるため、アクセス許可と承認の問題をすばやく簡単にデバッグできます。

## Fauna partners with Cloudflare

![Fauna partners with Cloudflare](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/1tAvaOZyMkaSgwMiwIANOH/07fd5d80d92b1bb7b849ec1feaa10a65/fauna-partners-with-cloudflare.png)

Fauna is now part of Cloudflare Workers' official data strategy for customers who need to query complex datasets at low latencies without configuring distributed infrastructure. Customers of Cloudflare and Fauna might see lower round trip latencies from having their code running in multiple locations. If you're interested in learning how to use Fauna with Cloudflare Workers, visit this [tutorial](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) or [contact](https://www2.fauna.com/cloudflare-contact) us to speak with an expert!

## Other updates to explore

その他のアップデートについて

![Other updates to explore](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/47yUHBp9qFs49l6qB89hdv/ab62c37ab73284190f064c25114cf5ae/other-updates-to-explore.png)

We've made a lot of other changes recently as well. For example:

最近、他にも多くの変更を加えました。例えば：

- Our [docs quickstart](https://www2.fauna.com/e/517431/fauna-current-start-index-html/77xm74/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs) has been revamped to help illustrate how GraphQL and FQL can be used together as different interfaces for the same data.

私たちのクイックスタートドキュメントヘルプに刷新されましたがGraphQLとFQLは、同じデータに対して異なるインターフェイスとして一緒に使用することができる方法を示しています。

- New blogs show you how to [pick the right authentication strategy](https://www2.fauna.com/e/517431/entication-strategy-with-fauna/77xm5z/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs), build with [AWS SAM](https://www2.fauna.com/e/517431/est-api-with-aws-sam-and-fauna/77xm62/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs), and get started with [AWS App Runner](https://www2.fauna.com/e/517431/-with-aws-app-runner-and-fauna/77xm64/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs).

新しいブログはどのようにするかを示し、右認証戦略選ぶ、とビルドAWS SAMを、そしてを始めるAWSのAppランナー。

- The new [Fauna Labs](https://www2.fauna.com/e/517431/fauna-labs/77xm66/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs) GitHub organization is a place for you to find sample code, tooling, proofs of concept, and other experiments.

新しいFaunaLabs GitHub組織は、サンプルコード、ツール、概念実証、およびその他の実験を見つけるための場所です。

- Support for [document streaming](https://www2.fauna.com/e/517431/current-drivers-streaming-html/77xm68/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs) and third-party authentication providers have been added to the [Go driver](https://www2.fauna.com/e/517431/fauna-faunadb-go/77xm6b/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs), and a [preview version of the C# driver](https://www2.fauna.com/e/517431/faunadb-csharp-discussions-146/77xm6d/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs)**,** so these features are now available in all of our supported driver [languages](https://www2.fauna.com/e/517431/fauna-current-drivers-/77xm6g/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs).

サポートストリーミング文書およびサードパーティの認証プロバイダが追加されました囲碁ドライバ、およびC＃のドライバのプレビュー版、これらの機能は、当社のサポートドライバーのすべてで利用できるようになりましたので、言語。

- A new [Community Code of Conduct](https://www2.fauna.com/e/517431/guidelines/77xm6j/1015284883?h=1N4LvB7kSdQijWdMpenH5V7jSsdEFRMMRbR29TSRxTs) has been published to help ensure a positive experience for everyone.

新しいコミュニティ行動規範が公開され、すべての人に前向きな体験を提供できるようになりました。

## We want your feedback!

Let us know what you think of these features and content via [email](mailto:product@fauna.com), or our [Comment Box](https://forms.gle/wpzYQtZhAcse7Rp56).

これらの機能やコンテンツについてのご意見は、メールやコメント欄でお聞かせください。

Even more importantly, help us figure out what's next!

さらに言えば、私たちが次のことを考えるきっかけにもなります。

We plan our product roadmap based on user requests and feedback. So, if there is anything else you'd like to see prioritized in our product roadmap, please vote for it in the Fauna Forums' [Feature Requests](https://forums.fauna.com/c/feature-requests/2) category, or create a new topic and vote for it!

私たちは、ユーザーの要望やフィードバックに基づいて製品ロードマップを計画しています。そのため、製品ロードマップで優先してほしいことがあれば、Fauna Forumsの「機能リクエスト」カテゴリで投票するか、新しいトピックを作成して投票してください。
