Evolving the structure of your Fauna database
https://fauna.com/blog/evolving-the-structure-of-your-fauna-database

ファウナデータベースの構造を進化させる

# Evolving the structure of your Fauna database

あなたのFaunaデータベースの構造を進化させる



Rob Sutter|Jun 25th, 2021|

2021年6月25日

Categories:



[Tutorial](https://fauna.com/blog?category=tutorial)



Modern applications change frequently as you deliver features and fixes to customers. These changes in data access patterns require changes to the structure and content of your data, even when using a schemaless database like Fauna.

最近のアプリケーションは、顧客に機能や修正を提供する際に頻繁に変更されます。このようなデータアクセスパターンの変更は、Fauna のようなスキーマレスデータベースを使用している場合でも、データの構造やコンテンツの変更を必要とします。


In this series, you learn how to implement migrations in [Fauna](https://fauna.com/), the data API for modern applications. This post introduces a high-level strategy for planning and running migrations. In the second post, you learn how to implement the migration patterns using [user-defined functions (UDFs)](https://docs.fauna.com/fauna/current/api/fql/user_defined_functions) written in the [Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/). The third post presents special considerations for migrating your data when you access Fauna via [the Fauna GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/). In the final post, you learn strategies and patterns for migrating your data and explore the impact migrations have on your [indexes](https://docs.fauna.com/fauna/current/api/fql/indexes).

このシリーズでは、モダンアプリケーション用のデータAPIである[Fauna](https://fauna.com/)にマイグレーションを実装する方法を学びます。この記事では、マイグレーションを計画・実行するためのハイレベルな戦略を紹介します。2回目の記事では、[Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)で記述された[ユーザー定義関数 (UDF)](https://docs.fauna.com/fauna/current/api/fql/user_defined_functions)を使用して、移行パターンを実装する方法を学びます。3番目の記事では、[Fauna GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/)を介してFaunaにアクセスする際のデータ移行に関する特別な考慮事項を紹介します。最後の記事では、データを移行するための戦略とパターンを学び、移行が[インデックス]に与える影響を探ります(https://docs.fauna.com/fauna/current/api/fql/indexes)。


## Planning for migration

移行の計画


Planning is the most important element of a successful database migration. Preparing to evolve your data _before_ you need to perform a migration reduces the risk of a migration and decreases the implementation time. Consider the four following key areas to prepare your database:

データベースの移行を成功させるためには、計画が最も重要な要素です。移行を実行する必要がある前にデータを進化させるための準備をすることで、移行のリスクを減らし、導入期間を短縮することができます。データベースを準備するために、以下の4つの重要な領域を考慮してください。


1.  Encapsulate your data by limiting all access to your data to UDFs.
2.  Migrate in steps to minimize the risk and allow for continuous uptime.
3.  Choose a data update strategy based on your application's specific needs.
4.  Assess the impact on your indexes to minimize performance impact.


1.  データへのすべてのアクセスをUDFに制限することで、データをカプセル化する。
2.  リスクを最小限に抑え、継続的な稼働を可能にするため、段階的に移行を行う。
3.  アプリケーションの特定のニーズに基づいてデータ更新戦略を選択する。
4.  4. パフォーマンスへの影響を最小限に抑えるために、インデックスへの影響を評価する。



## Encapsulating your data

データのカプセル化




Always accessing your data via UDFs is generally a best practice with Fauna. Only allow clients to call specific UDFs, and prevent client-side calls to primitive operations like [Create](https://docs.fauna.com/fauna/current/api/fql/functions/create), [Match](https://docs.fauna.com/fauna/current/api/fql/functions/match), [Update](https://docs.fauna.com/fauna/current/api/fql/functions/update), and [Delete](https://docs.fauna.com/fauna/current/api/fql/functions/delete). This separates your business logic from the presentation layer, which provides several benefits. UDFs can be unit-tested independently of the client, ensuring correctness. Because UDFs encapsulate your business rules, you can write them once and call them from different clients, platforms, and programming languages.

Fauna では、常に UDF を使用してデータにアクセスすることが一般的なベスト プラクティスです。クライアントが特定のUDFを呼び出すことのみを許可し、[Create](https://docs.fauna.com/fauna/current/api/fql/functions/create)、[Match](https://docs.fauna.com/fauna/current/api/fql/functions/match)、[Update](https://docs.fauna.com/fauna/current/api/fql/functions/update)、[Delete](https://docs.fauna.com/fauna/current/api/fql/functions/delete)などのプリミティブな操作をクライアントサイドで呼び出さないようにします。これにより、ビジネスロジックがプレゼンテーション層から分離され、いくつかの利点が得られます。UDFは、クライアントとは独立してユニットテストを行うことができ、正確性が保証されます。UDFはビジネスルールをカプセル化するため、一度書いたUDFをさまざまなクライアント、プラットフォーム、プログラミング言語から呼び出すことができます。


The following diagram represents a client side call to the FQL [`Create()` primitive](https://docs.fauna.com/fauna/current/api/fql/functions/create) to create a document in a collection called _notifications_.


次の図は、_notifications_というコレクションにドキュメントを作成するために、FQLの[`Create()`プリミティブ](https://docs.fauna.com/fauna/current/api/fql/functions/create)をクライアント側で呼び出している様子を表しています。



![Client side create primitive](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2nnwJu7T77LfiY4BZujj8c/7bfc42b237f4bca3a7ebba31dd7c01ef/client-side-create-primitive.png)


![クライアント側の作成プリミティブ](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2nnwJu7T77LfiY4BZujj8c/7bfc42b237f4bca3a7ebba31dd7c01ef/client-side-create-primitive.png)




Suppose you receive a new requirement to add a field to each document that indicates whether a notification is urgent? You can modify the client code and publish a new version, but what about users who do not upgrade? What if the field is required to work with a downstream dependency? How do you handle existing documents and outdated clients? This single change can cascade and create additional complexity, which can lead to errors. That complexity multiplies when you combine multiple changes.


通知が緊急であるかどうかを示すフィールドを各ドキュメントに追加するという新しい要件を受け取ったとします。クライアントコードを修正して新バージョンを公開することはできますが、アップグレードしないユーザーはどうなるでしょうか？そのフィールドが、下流の依存関係で動作するために必要とされる場合はどうでしょうか？既存のドキュメントや古いクライアントの扱いはどうするのか？このように、たった一つの変更が連鎖してさらなる複雑さを生み、それがエラーにつながることもあります。複数の変更を組み合わせると、その複雑さは倍増します。


Instead, create a UDF, _create\_notification_, and call that UDF directly from your client code with an [FQL `Call()` statement](https://docs.fauna.com/fauna/current/api/fql/functions/call).


代わりに、UDF、_create\_notification_を作成し、[FQL `Call()` ステートメント](https://docs.fauna.com/fauna/current/api/fql/functions/call)でクライアントコードから直接そのUDFを呼び出してください。



![Initial create notification UDF](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/5SjIRVq2nScxdlZ6M4loyj/c0425085fffac41bba913c32acbcbdc3/initial-create-notification-udf.png)



With this change, newer versions of the UDF can accept calls from any version of the client. If the UDF expects a field and it is not provided, the UDF can set a reasonable default or calculated value and continue to completion. The second post in this series constructs a more complete example and shows how to test for existence of fields in UDF calls.


この変更により、新しいバージョンのUDFは、あらゆるバージョンのクライアントからの呼び出しを受け入れることができます。UDFがフィールドを期待しているのに提供されていない場合、UDFは妥当なデフォルト値または計算値を設定し、完了まで続けることができます。このシリーズの第2回目の投稿では、より完全な例を作成し、UDFコール内のフィールドの存在をテストする方法を示します。


UDF-first development provides a number of other benefits, including support for attribute-based access control (ABAC), feature flags, versioning, and more. See [this guide](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4) for additional information on UDFs.


UDFファーストの開発には、属性ベースのアクセスコントロール（ABAC）のサポート、機能フラグ、バージョニングなど、他にも多くの利点があります。UDFの詳細については、[このガイド](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-4)を参照してください。


## Migrating in steps

段階的な移行



Migrating in steps minimizes the risk of migrations and can allow for continuous uptime. Where possible, each step should change only one aspect of your database structure or data. A general pattern for updating the data type of a field has three steps: populating the values of the new field from existing data, confirming zero defects, and optionally removing any deprecated fields.

段階的に移行することで、移行のリスクを最小限に抑え、継続して稼働させることが可能になります。可能であれば、各ステップでは、データベースの構造やデータの1つの側面のみを変更する必要があります。フィールドのデータ型を更新する一般的なパターンは、既存のデータから新しいフィールドの値を入力し、不具合がないことを確認し、オプションとして非推奨のフィールドを削除するという3つのステップがあります。




### Populating new field values

新しいフィールドの値の投入

The first step in a migration is creating a UDF that populates the value of your new field from existing data according to your business logic. The new value can be calculated using existing fields in the document, a calculated value, or other reasonable default.

移行の最初のステップは、ビジネスロジックに従って既存のデータから新しいフィールドの値を投入するUDFの作成です。新しい値は、ドキュメント内の既存のフィールド、計算値、またはその他の妥当なデフォルト値を使用して計算することができます。



Consider a field _ipRange_ that stores a range of IP addresses in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) as an [FQL string](https://docs.fauna.com/fauna/current/api/fql/types#string). You can create a new field _ipRanges_ that stores the existing value as an [FQL array](https://docs.fauna.com/fauna/current/api/fql/types#array) without modifying the existing _ipRange_ field.

CIDR表記](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)のIPアドレスの範囲を[FQL文字列](https://docs.fauna.com/fauna/current/api/fql/types#string)として格納するフィールド_ipRange_があるとします。既存の_ipRange_フィールドを変更することなく、既存の値を[FQL配列](https://docs.fauna.com/fauna/current/api/fql/types#array)として格納する新しいフィールド_ipRanges_を作成することができます。



You should call this UDF any time you access documents that have not yet been migrated, regardless of which [data update strategy](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#choosing-a-data-update-strategy) you choose.

どの[データ更新戦略](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#choosing-a-data-update-strategy)を選択したかに関わらず、まだ移行されていないドキュメントにアクセスする際には、必ずこのUDFを呼び出す必要があります。



### Confirming zero defects

不具合ゼロを確認する



Next, create a second UDF that compares the value of your new field to the existing values. This UDF ensures that your data is migrated correctly. When you call this UDF varies based on your chosen [data update strategy](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#choosing-a-data-update-strategy). Regardless of the strategy you choose, this UDF gives you the confidence that your migration succeeded on the document level. It also allows you to remove deprecated fields in the next step without worrying about data loss.

次に、新しいフィールドの値を既存の値と比較する2つ目のUDFを作成します。このUDFは、データが正しく移行されたことを確認します。このUDFをいつ呼び出すかは、選択した[データ更新ストラテジー](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#choosing-a-data-update-strategy)によって異なります。選択した戦略にかかわらず、このUDFによって、ドキュメントレベルでの移行が成功したという確信が得られます。また、データの損失を心配することなく、次のステップで非推奨のフィールドを削除することができます。



### Removing deprecated fields



Removing deprecated fields is the final step in a migration. This step is strictly optional, but recommended. Removing deprecated fields reduces your data storage costs, particularly if those fields are indexed. It also removes unnecessary complexity from your data model. This is particularly helpful if you access Fauna via GraphQL, as you must explicitly define each field in your schema.

廃止されたフィールドの削除は移行の最終ステップです。この手順は厳密には任意ですが、推奨します。非推奨フィールドを削除することで、データの保存コストを削減することができます (特にインデックスが付いている場合)。また、データモデルから不必要な複雑さを取り除くことができます。これは、GraphQLでFaunaにアクセスする場合、スキーマで各フィールドを明示的に定義する必要があるため、特に有効です。


## Choosing a data update strategy

データ更新戦略の選択



You choose when to update your data, and how much of your data to update, based on your own use case and access patterns. There are three general data update strategies: just-in-time, immediate, and throttled batch updates.


データをいつ更新するか、どの程度更新するかは、自分のユースケースやアクセスパターンに基づいて選択します。一般的なデータ更新方法としては、ジャストインタイム更新、即時更新、スロットル付きバッチ更新の 3 種類があります。


### Just-in-time updates

ジャストインタイム更新



Just-in-time (JIT) updates wait until the first time a document is retrieved or altered to apply outstanding migrations. JIT updates check whether the specified document has been migrated and, if not, calls the UDF you specify before proceeding. The UDF-first pattern described in [Encapsulating your data](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#encapsulating-your-data) enables JIT updates without requiring the client to know a change has been made.

ジャストインタイム(JIT)アップデートは、ドキュメントが最初に取得または変更されるまで待って、未処理のマイグレーションを適用します。JITアップデートでは、指定されたドキュメントがマイグレーションされているかどうかをチェックし、マイグレーションされていない場合は、指定されたUDFを呼び出してから処理を進めます。Encapsulating your data](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#encapsulating-your-data)で説明されているUDF-firstパターンは、クライアントに変更が行われたことを知らせることなく、JITアップデートを可能にします。


![Post migration create notification UDF](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/1VA17L8jNVOZVNuqQP5Ptm/1e000b6cb1cbce7f4e89e4e2fd9a480d/post-migration-create-notification-udf.png)



JIT updates are most appropriate for use cases where documents are accessed one at a time or in very small groups. They are especially good for documents with the optional `ttl` (time-to-live) field set, as these documents may age out of your database before they need to be migrated.

JITアップデートは、ドキュメントが一度に1つずつ、または非常に小さなグループでアクセスされるユースケースに最も適しています。特に、オプションの `ttl` (time-to-live) フィールドが設定されているドキュメントに適しています。なぜなら、これらのドキュメントは、マイグレーションが必要になる前にデータベースから消えてしまう可能性があるからです。



If you regularly retrieve many documents in a single query, JIT updates can degrade the performance of your query. In this case, you should choose between immediate and throttled batch updates.

1つのクエリで多くのドキュメントを定期的に取得する場合、JITアップデートはクエリのパフォーマンスを低下させる可能性があります。このような場合は、即時更新とスロットル付きのバッチ更新を選択する必要があります。



### Immediate updates

即時更新



Immediate updates greedily apply your migration UDF to every matching document in your database in a single Fauna transaction. This simplifies future document retrieval, and maintains the performance of queries that return large data sets.

即時更新では、1 回の Fauna トランザクションでデータベース内の一致するすべてのドキュメントに移行 UDF を貪欲に適用します。これにより、将来的なドキュメントの検索が容易になり、大規模なデータセットを返すクエリのパフォーマンスが維持されます。



However, immediate updates require you to access and modify every document affected by your migration at once. If you infrequently access large portions of your data, this can create unnecessary costs. If you have indexes over the existing or new fields, these indexes must also be re-written along with your updated documents.

しかし、即時更新では、移行の影響を受けるすべてのドキュメントに一度にアクセスして修正する必要があります。データの大部分に頻繁にアクセスしない場合は、不必要なコストが発生する可能性があります。既存または新規のフィールドにインデックスを設定している場合、これらのインデックスも更新されたドキュメントと一緒に書き直す必要があります。



See [Assessing the impact on your indexes](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#assessing-the-impact-on-your-indexes) for additional consideration for indexes and migrations.

インデックスと移行に関するその他の検討事項については、[Assessing the impact on your indexes](https://fauna.com/blog/evolving-the-structure-of-your-fauna-database#assessing-the-impact-on-your-indexes)を参照してください。



### Throttled batch updates

スロットル付きバッチアップデート



Throttled batch updates provide the benefits of JIT and immediate updates, but do so at the cost of additional complexity. Throttled batch updates use an external program to apply your migration UDF to groups (or "batches") of documents at a slower rate. You manipulate that rate by modifying either the number of documents in each batch or the period of time between each batch. This enables you to tune the time to completion, allowing you to migrate your entire data set without imposing any performance penalties.


スロットル付きバッチアップデートは、JITおよび即時アップデートの利点を提供しますが、複雑さが増します。スロットル付きバッチアップデートでは、外部プログラムを使用して、マイグレーションUDFをドキュメントのグループ（または「バッチ」）に遅い速度で適用します。この速度は、各バッチに含まれるドキュメントの数または各バッチ間の期間を変更することで調整できます。これにより、完了までの時間を調整することができ、パフォーマンスに影響を与えることなくデータセット全体を移行することができます。



If a request is made to access or alter a document that has not been migrated while your batch is still processing, you apply your migration UDF to that document first, just as you do with a JIT update.

バッチの処理中に、移行されていないドキュメントへのアクセスや変更のリクエストがあった場合、JITアップデートと同様に、まずそのドキュメントに移行UDFを適用します。



## Assessing the impact on your indexes

インデックスへの影響を評価する



You cannot modify the `terms` or `values` of indexes, including [binding objects](https://docs.fauna.com/fauna/current/api/fql/indexes#binding), once they have been created. If you have an index over a previously existing field and want to use it for the newly migrated field, you must create a new index.

[バインディングオブジェクト](https://docs.fauna.com/fauna/current/api/fql/indexes#binding)を含むインデックスが作成された後は、そのインデックスの「条件」や「値」を変更することはできません。以前に存在していたフィールドに対するインデックスがあり、それを新しく移行したフィールドに使用したい場合は、新しいインデックスを作成する必要があります。



Fauna also limits concurrent index builds to 24 per account, not per database. Attempting to exceed this limit results in an HTTP 429 error that your application must handle. Additionally, index builds for collections with more than 128 documents are handled by a background task. This means that your transaction will complete successfully quickly, but you will not be able to query the index until it has finished building.

また、Fauna ではインデックスの同時作成をデータベースごとではなく、アカウントごとに 24 個までに制限しています。この制限を超えると、アプリケーションが処理しなければならない HTTP 429 エラーが発生します。さらに、128以上のドキュメントを持つコレクションのインデックス構築は、バックグラウンドタスクで処理されます。つまり、トランザクションはすぐに完了しますが、インデックスの構築が完了するまでは、インデックスへの問い合わせができません。



## Conclusion

結論


Successful data migrations depend heavily on planning. Use UDFs to encapsulate business logic, including performing any necessary data migrations. Break your migration in small steps with duplicated results to reduce risk at each stage. Finally, assess the impact on your indexes and develop a strategy for updating your data.

データ移行を成功させるには、計画性が重要です。UDFを使用して、必要なデータ移行の実行を含むビジネスロジックをカプセル化します。各段階でのリスクを減らすために、結果を重複させて移行を小さなステップに分けましょう。最後に、インデックスへの影響を評価し、データを更新するための戦略を立てます。




In the next post in this series, you learn how to implement the previous migration pattern using UDFs written in FQL.

次回の記事では、FQLで書かれたUDFを使って、先ほどの移行パターンを実装する方法をご紹介します。



If you enjoyed our blog, and want to work on systems and challenges related to globally distributed systems, serverless databases, GraphQL, and Jamstack, Fauna is [hiring](https://fauna.com/careers)!


もしあなたが私たちのブログを楽しんでくれて、グローバルな分散システム、サーバーレスデータベース、GraphQL、Jamstackに関連するシステムや課題に取り組みたいと思っているなら、Faunaは[hiring](https://fauna.com/careers)です!



